// Export the sound-event list and level/end times of a page: node scripts/export_events.mjs emperor/index.html out.json
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
import { serve } from './serve.mjs';
const [pagePath, out] = process.argv.slice(2);
const { server, port } = await serve();
const b = await chromium.launch(); const p = await b.newPage();
p.on('pageerror', (e) => console.error('pageerror', e.message));
await p.goto(`http://localhost:${port}/${pagePath}`); await p.waitForFunction(() => window.__ready === true);
const ev = await p.evaluate(() => ({ sfx: window.SFX, levels: window.LEVEL_STARTS, end: window.END_TIME, paras: window.PARA.map((_, k) => PT(k)) }));
writeFileSync(out, JSON.stringify(ev));
console.log('events', ev.sfx.length);
await b.close(); server.close();
