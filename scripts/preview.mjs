// Render single frames for review: node scripts/preview.mjs 12.5 40 ... -> out/preview/t<time>.png
// With --sheet, also writes out/preview/sheet.png (grid of all requested frames). --page horus/index.html for the Horus video.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { serve, root } from './serve.mjs';

const args = process.argv.slice(2);
const sheet = args.includes('--sheet');
const pageIdx = args.indexOf('--page');
const pagePath = pageIdx >= 0 ? args[pageIdx + 1] : 'src/video/index.html';
const times = args.filter((a, i) => a !== '--sheet' && i !== pageIdx && i !== pageIdx + 1).map(Number);
const outDir = join(root, 'out', 'preview');
await mkdir(outDir, { recursive: true });
const { server, port } = await serve();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
page.on('pageerror', (e) => console.error('pageerror', e.message));
page.on('console', (m) => { if (m.type() === 'error') console.error('console', m.text()); });
await page.goto(`http://localhost:${port}/${pagePath}`);
await page.waitForFunction(() => window.__ready === true);
const files = [];
for (const t of times) {
  await page.evaluate((tt) => window.frameAt(tt), t);
  const f = join(outDir, `t${t.toFixed(2)}.png`);
  await page.locator('#c').screenshot({ path: f });
  files.push(f);
}
if (sheet && files.length) {
  const cols = 3, w = 640, h = 360;
  const rows = Math.ceil(files.length / cols);
  await page.setViewportSize({ width: cols * w, height: rows * (h + 30) });
  const imgs = await Promise.all(files.map(async (f) => 'data:image/png;base64,' + (await import('node:fs')).readFileSync(f).toString('base64')));
  await page.setContent(`<body style="margin:0;background:#222;display:grid;grid-template-columns:repeat(${cols},${w}px);font:20px sans-serif;color:#fff">${imgs.map((s, i) => `<div><img src="${s}" width="${w}" height="${h}" style="display:block"><div style="height:30px">t=${times[i]}</div></div>`).join('')}</body>`);
  await page.screenshot({ path: join(outDir, 'sheet.png'), fullPage: true });
}
await browser.close();
server.close();
console.log('done', files.length);
