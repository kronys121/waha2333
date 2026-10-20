// Render the middle frame of every beat for review: node scripts/beats.mjs --page wehrmacht/index.html [fromT toT]
// Writes out/beats/bNNN.png and contact sheets out/beats/sheetN.png (12 frames each).
import { chromium } from 'playwright';
import { mkdir, rm } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { serve, root } from './serve.mjs';

const args = process.argv.slice(2);
const pi = args.indexOf('--page');
const pagePath = pi >= 0 ? args[pi + 1] : 'wehrmacht/index.html';
const rest = args.filter((a, i) => i !== pi && i !== pi + 1).map(Number);
const [from, to] = [rest[0] ?? 0, rest[1] ?? 1e9];
const outDir = join(root, 'out', 'beats');
await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
const { server, port } = await serve();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
page.on('pageerror', (e) => console.error('pageerror', e.message));
await page.goto(`http://localhost:${port}/${pagePath}`);
await page.waitForFunction(() => window.__ready === true);
const mids = await page.evaluate(([a, b]) => {
  const out = [];
  const sh = ENGINE.SHOTS || SHOTS;
  for (const { t0 } of STAGES) { if (t0 < a || t0 > b) continue; window.frameAt(t0 + 0.05); }
  for (const { t0, sc } of STAGES) {
    if (t0 < a || t0 > b || !sc._st) continue;
    const shot = sh.find((x) => Math.abs(x.t0 - t0) < 1e-6);
    const dur = shot.t1 - t0;
    sc._st.forEach((s, i) => { const e = i + 1 < sc._st.length ? sc._st[i + 1] : dur; out.push([+(t0 + (s + e) / 2).toFixed(2), sc.k, i]); });
  }
  return out;
}, [from, to]);
const files = [];
for (const [t, k, i] of mids) {
  await page.evaluate((tt) => window.frameAt(tt), t);
  const f = join(outDir, `b${String(files.length).padStart(3, '0')}.png`);
  await page.locator('#c').screenshot({ path: f, type: 'png' });
  files.push([f, `${t}s p${k}.${i}`]);
}
const cols = 4, w = 480, h = 270;
for (let s = 0; s * 12 < files.length; s++) {
  const chunk = files.slice(s * 12, s * 12 + 12);
  await page.setViewportSize({ width: cols * w, height: Math.ceil(chunk.length / cols) * (h + 24) });
  const imgs = chunk.map(([f, l]) => [`data:image/png;base64,${readFileSync(f).toString('base64')}`, l]);
  await page.setContent(`<body style="margin:0;background:#222;display:grid;grid-template-columns:repeat(${cols},${w}px);font:18px sans-serif;color:#fff">${imgs.map(([src, l]) => `<div><img src="${src}" width="${w}" height="${h}" style="display:block"><div style="height:24px">${l}</div></div>`).join('')}</body>`);
  await page.screenshot({ path: join(outDir, `sheet${s}.png`) });
  await page.goto(`http://localhost:${port}/${pagePath}`); await page.waitForFunction(() => window.__ready === true);
}
await browser.close(); server.close();
console.log('beats', files.length, 'sheets', Math.ceil(files.length / 12));
