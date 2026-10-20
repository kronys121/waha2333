// Render the animation to video/partNN.mp4, one part per level, each with its slice of the narration.
// Work is split into ~50 s chunks (out/chunks), each rendered in a fresh browser; finished chunks are
// skipped on re-run, so an interrupted render resumes where it stopped.
//   node scripts/render.mjs              all parts, 2 chunks at a time
//   node scripts/render.mjs 3 5 --jobs 1 only parts 3 and 5
//   node scripts/render.mjs --page horus/index.html   the Horus video (horus/video/partNN.mp4)
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir, rename, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { serve, root } from './serve.mjs';

const FPS = 30;
const CHUNK = 1500; // frames per chunk
const args = process.argv.slice(2);
const jobsIdx = args.indexOf('--jobs');
const jobs = jobsIdx >= 0 ? Number(args[jobsIdx + 1]) : 2;
const pageIdx = args.indexOf('--page');
const pagePath = pageIdx >= 0 ? args[pageIdx + 1] : 'src/video/index.html';
const wanted = args.filter((a, i) => /^\d+$/.test(a) && i !== jobsIdx + 1 && i !== pageIdx + 1).map(Number);
const exists = (p) => access(p).then(() => true, () => false);
const chunkDir = join(root, 'out', pagePath.startsWith('src') ? 'chunks' : 'chunks_' + pagePath.split('/')[0]);

function run(cmd, argv, opts = {}) {
  const p = spawn(cmd, argv, { stdio: ['pipe', 'inherit', 'inherit'], ...opts });
  p.done = new Promise((ok, fail) => p.on('close', (c) => (c === 0 ? ok() : fail(new Error(`${cmd} exit ${c}`)))));
  return p;
}

const { server, port } = await serve();
const url = `http://localhost:${port}/${pagePath}`;

// part boundaries: the start of every level card shot
const probeBrowser = await chromium.launch();
const probe = await probeBrowser.newPage();
await probe.goto(url);
await probe.waitForFunction(() => window.__ready === true);
const { cuts, end, audio, outPrefix } = await probe.evaluate(() => {
  const idx = [0, 73, 131, 189, 232, 284, 340, 392];
  const cuts = window.LEVEL_STARTS || idx.map((i) => (i === 0 ? 0 : window.CUES[i] - 0.15));
  return { cuts, end: window.END_TIME, audio: window.AUDIO || 'audio/narration.mp3', outPrefix: window.OUT_PREFIX || 'video/part' };
});
await probeBrowser.close();
const frameOf = (t) => Math.round(t * FPS);
let parts = cuts.map((c, i) => ({ n: i + 1, f0: frameOf(c), f1: frameOf(i + 1 < cuts.length ? cuts[i + 1] : end) }));
if (wanted.length) parts = parts.filter((p) => wanted.includes(p.n));
await mkdir(chunkDir, { recursive: true });
await mkdir(join(root, outPrefix, '..'), { recursive: true });

// chunk list
const chunks = [];
for (const p of parts) {
  p.chunks = [];
  for (let f = p.f0, k = 0; f < p.f1; f += CHUNK, k++) {
    const c = { part: p.n, k, f0: f, f1: Math.min(p.f1, f + CHUNK), file: join(chunkDir, `p${p.n}_c${String(k).padStart(2, '0')}.mp4`) };
    p.chunks.push(c); chunks.push(c);
  }
}

async function renderChunk(c) {
  if (await exists(c.file)) return;
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    page.on('pageerror', (e) => console.error(`p${c.part}c${c.k} pageerror`, e.message));
    await page.goto(url);
    await page.waitForFunction(() => window.__ready === true);
    const tmp = c.file.replace('.mp4', '.tmp.mp4');
    const ff = run('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-g', '60', tmp]);
    const t0 = Date.now();
    for (let f = c.f0; f < c.f1; f++) {
      const data = await page.evaluate((t) => window.frameJpeg(t, 0.93), f / FPS);
      const buf = Buffer.from(data.slice(data.indexOf(',') + 1), 'base64');
      if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    }
    ff.stdin.end();
    await ff.done;
    await rename(tmp, c.file);
    console.log(`part ${c.part} chunk ${c.k}: ${c.f1 - c.f0} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  } finally {
    await browser.close();
  }
}

const queue = [...chunks];
await Promise.all(Array.from({ length: Math.min(jobs, queue.length) }, async () => {
  while (queue.length) await renderChunk(queue.shift());
}));
server.close();

// assemble each part: concat video chunks, add its slice of the narration
for (const p of parts) {
  const list = join(chunkDir, `p${p.n}.txt`);
  await writeFile(list, p.chunks.map((c) => `file '${c.file}'`).join('\n') + '\n');
  const start = p.f0 / FPS, dur = (p.f1 - p.f0) / FPS;
  const out = join(root, `${outPrefix}${String(p.n).padStart(2, '0')}.mp4`);
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list,
    '-ss', start.toFixed(3), '-t', dur.toFixed(3), '-i', join(root, audio),
    '-filter_complex', '[1:a]apad[a]', '-map', '0:v', '-map', '[a]',
    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-t', dur.toFixed(3), '-movflags', '+faststart', out]).done;
  console.log(`assembled ${out}`);
}
