// Tiny static server for the repo root, shared by preview and render scripts.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

export const root = resolve(new URL('..', import.meta.url).pathname);
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2' };

export function serve() {
  return new Promise((ok) => {
    const server = createServer(async (req, res) => {
      try {
        const p = join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
        if (!p.startsWith(root)) throw new Error('outside root');
        res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' });
        res.end(await readFile(p));
      } catch { res.writeHead(404); res.end(); }
    }).listen(0, () => ok({ server, port: server.address().port }));
  });
}
