// Render the animation to video/partNN.mp4, one part per level, each with its slice of the narration.
//   node scripts/render.mjs              all parts, 2 at a time
//   node scripts/render.mjs 3 5 --jobs 1 render only parts 3 and 5
//   node scripts/render.mjs --test 5     first 5 seconds of part 1 into out/test.mp4 (speed check)
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { serve, root } from './serve.mjs';

const FPS = 30;
const args = process.argv.slice(2);
const jobsIdx = args.indexOf('--jobs');
const jobs = jobsIdx >= 0 ? Number(args[jobsIdx + 1]) : 2;
const testIdx = args.indexOf('--test');
const testSec = testIdx >= 0 ? Number(args[testIdx + 1]) : 0;
const wanted = args.filter((a, i) => /^\d+$/.test(a) && i !== jobsIdx + 1 && i !== testIdx + 1).map(Number);

const { server, port } = await serve();
const browser = await chromium.launch();
const url = `http://localhost:${port}/src/video/index.html`;

// part boundaries come from the page: the start of every level card shot
const probe = await browser.newPage();
await probe.goto(url);
await probe.waitForFunction(() => window.__ready === true);
const { cuts, end } = await probe.evaluate(() => {
  const idx = [0, 73, 131, 189, 232, 284, 340, 392];
  return { cuts: idx.map((i) => (i === 0 ? 0 : window.CUES[i] - 0.15)), end: window.END_TIME };
});
await probe.close();
const frameOf = (t) => Math.round(t * FPS);
let parts = cuts.map((c, i) => ({ n: i + 1, f0: frameOf(c), f1: frameOf(i + 1 < cuts.length ? cuts[i + 1] : end) }));
if (testSec) parts = [{ n: 1, f0: 0, f1: testSec * FPS, test: true }];
else if (wanted.length) parts = parts.filter((p) => wanted.includes(p.n));

await mkdir(join(root, 'video'), { recursive: true });
await mkdir(join(root, 'out'), { recursive: true });

async function renderPart(p) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('pageerror', (e) => console.error(`part ${p.n} pageerror`, e.message));
  await page.goto(url);
  await page.waitForFunction(() => window.__ready === true);
  const out = p.test ? join(root, 'out', 'test.mp4') : join(root, 'video', `part${String(p.n).padStart(2, '0')}.mp4`);
  const start = p.f0 / FPS, dur = (p.f1 - p.f0) / FPS;
  const ff = spawn('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-',
    '-ss', start.toFixed(3), '-t', dur.toFixed(3), '-i', join(root, 'audio', 'narration.mp3'),
    '-filter_complex', '[1:a]apad[a]', '-map', '0:v', '-map', '[a]',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', String(FPS),
    '-c:a', 'aac', '-b:a', '192k', '-t', dur.toFixed(3), '-movflags', '+faststart', out,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((ok, fail) => ff.on('close', (c) => (c === 0 ? ok() : fail(new Error(`ffmpeg exit ${c}`)))));
  const t0 = Date.now();
  for (let f = p.f0; f < p.f1; f++) {
    const data = await page.evaluate((t) => window.frameJpeg(t, 0.93), f / FPS);
    const buf = Buffer.from(data.slice(data.indexOf(',') + 1), 'base64');
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if ((f - p.f0) % 300 === 0) console.log(`part ${p.n}: ${f - p.f0}/${p.f1 - p.f0} frames, ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end();
  await done;
  await page.close();
  console.log(`part ${p.n} done: ${out} (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
}

const queue = [...parts];
await Promise.all(Array.from({ length: Math.min(jobs, queue.length) }, async () => {
  while (queue.length) await renderPart(queue.shift());
}));
await browser.close();
server.close();
