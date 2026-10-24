// Screenshot a canvas page once it sets window.__ready: node scripts/snap.mjs <page.html> <out.png>
import { chromium } from 'playwright';
import { join } from 'node:path';
import { serve, root } from './serve.mjs';

const [page_, out] = process.argv.slice(2);
const { server, port } = await serve();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
page.on('pageerror', (e) => console.error('pageerror', e.message));
await page.goto(`http://localhost:${port}/${page_}`);
await page.waitForFunction(() => window.__ready === true, null, { timeout: 20000 });
await page.locator('#c').screenshot({ path: join(root, out) });
await browser.close();
server.close();
console.log('saved', out);
