// Render the Wehrmacht thumbnail: wehrmacht/video/thumbnail.png (1920x1080) and wehrmacht/video/thumbnail_1280.jpg (YouTube size).
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { serve, root } from './serve.mjs';

const { server, port } = await serve();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
page.on('pageerror', (e) => console.error('pageerror', e.message));
await page.goto(`http://localhost:${port}/wehrmacht/thumb.html`);
await page.waitForFunction(() => window.__ready === true);
const png = join(root, 'wehrmacht', 'video', 'thumbnail.png');
await page.locator('#c').screenshot({ path: png });
await browser.close();
server.close();
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', png, '-vf', 'scale=1280:720', '-q:v', '2', join(root, 'wehrmacht', 'video', 'thumbnail_1280.jpg')]);
console.log('done');
