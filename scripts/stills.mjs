// Renders style frames to style/<style>-<scene>.png
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2' };

const server = createServer(async (req, res) => {
  try {
    const p = join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!p.startsWith(root)) throw new Error('outside root');
    res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' });
    res.end(await readFile(p));
  } catch { res.writeHead(404); res.end(); }
}).listen(0);
const port = server.address().port;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
page.on('pageerror', (e) => console.error('pageerror', e.message));
for (const style of ['cartoon', 'grimdark', 'pixel']) {
  for (const scene of ['hive', 'battle']) {
    await page.goto(`http://localhost:${port}/src/index.html?style=${style}&scene=${scene}&t=1.3`);
    await page.waitForFunction(() => window.__ready === true);
    await page.locator('#c').screenshot({ path: join(root, 'style', `${style}-${scene}.png`) });
    console.log('ok', style, scene);
  }
}
// clean character close-ups without UI
for (const style of ['cartoon', 'grimdark']) {
  await page.goto(`http://localhost:${port}/src/index.html?style=${style}&scene=battle&t=1.3&ui=0`);
  await page.waitForFunction(() => window.__ready === true);
  await page.screenshot({ path: join(root, 'style', `${style}-marine-clean.png`), clip: { x: 560, y: 220, width: 800, height: 860 } });
  console.log('ok clean', style);
}
await browser.close();
server.close();
