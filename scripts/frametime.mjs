// Time one frame per beat and list the slowest: node scripts/frametime.mjs --page orks/index.html [fromT toT]
import { chromium } from 'playwright';
import { serve } from './serve.mjs';

const args = process.argv.slice(2);
const pi = args.indexOf('--page');
const pagePath = args[pi + 1];
const rest = args.filter((a, i) => i !== pi && i !== pi + 1).map(Number);
const [from, to] = [rest[0] ?? 0, rest[1] ?? 1e9];
const { server, port } = await serve();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
page.on('pageerror', (e) => console.error('pageerror', e.message));
await page.goto(`http://localhost:${port}/${pagePath}`);
await page.waitForFunction(() => window.__ready === true);
const res = await page.evaluate(([a, b]) => {
  const out = [];
  for (const { t0, sc } of STAGES) {
    if (t0 < a || t0 > b || !sc._st) continue;
    const shot = ENGINE.SHOTS.find((x) => Math.abs(x.t0 - t0) < 1e-6);
    sc._st.forEach((s, i) => { const e = i + 1 < sc._st.length ? sc._st[i + 1] : shot.t1 - t0; const t = t0 + (s + e) / 2; window.frameAt(t); const q = performance.now(); window.frameAt(t + 0.033); out.push([Math.round(performance.now() - q), sc.k, i, +t.toFixed(1)]); });
  }
  return out.sort((x, y) => y[0] - x[0]);
}, [from, to]);
for (const r of res.slice(0, 12)) console.log(`${r[0]} ms  p${r[1]}.${r[2]}  t=${r[3]}`);
await browser.close();
server.close();
