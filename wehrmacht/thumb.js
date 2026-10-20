// Wehrmacht thumbnail: all 8 ranks on a rising stone staircase, town on the left, ruins on the right, title on top.
function drawThumb(ctx) {
  const st = { t: 3, lt: 3, bt: 3, cam: { x: 960, y: 540, z: 1 } };
  let g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#9cc4e4'); g.addColorStop(0.6, '#eee2c4'); g.addColorStop(1, '#e0cc9a');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalAlpha = 0.55;
  spire(ctx, 300, 900, 0.9); for (let i = 0; i < 3; i++) fachwerk(ctx, -60 + i * 260, 900, 220, 180);
  for (let i = 0; i < 3; i++) ruinsWall(ctx, 1250 + i * 230, 900, 220, 380 + (i % 2) * 120, 60 + i, '#8a7a6a');
  smokeFX(ctx, 1600, 700, 3, 1.4, 2, '60,56,52', 0.35);
  ctx.restore();
  ctx.fillStyle = '#b8a880'; ctx.fillRect(0, 900, W, 180);
  const N = 8, sc = (i) => 0.5 + i * 0.075, stepH = 34, base = 1050;
  const xs = []; let x = 0;
  for (let i = 0; i < N; i++) { if (i) x += 205 * (sc(i - 1) + sc(i)) / 2 + 26; xs.push(x); }
  const off = (W - xs[N - 1]) / 2 + 20;
  const poses = [{ expr: 'happy' }, { expr: 'happy' }, { expr: 'neutral' }, { expr: 'grit' }, { expr: 'grit' }, { expr: 'neutral' }, { expr: 'neutral' }, { expr: 'sad' }];
  for (let i = 0; i < N; i++) {
    const cx = xs[i] + off, top = base - (i + 1) * stepH, w = 230 * sc(i) + 40;
    rect(ctx, cx - w / 2, top, w, base + 40 - top, i % 2 ? '#7a7e74' : '#6e7268', 6, 5);
    ctx.save(); ctx.fillStyle = '#f0e2b0'; ctx.font = '700 40px "Oswald"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(String(i + 1), cx, top + 30); ctx.restore();
    hero(ctx, i + 1, cx, top + 4, sc(i), poses[i], i === 3 ? { toque: false } : {});
  }
  ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  ctx.font = '700 120px "Oswald"'; ctx.lineWidth = 24; ctx.strokeStyle = '#1a1210'; ctx.fillStyle = '#fff6e0';
  ctx.strokeText('КАЖДЫЙ УРОВЕНЬ', 960, 95); ctx.fillText('КАЖДЫЙ УРОВЕНЬ', 960, 95);
  ctx.font = '700 150px "Oswald"'; ctx.fillStyle = '#f0b830';
  ctx.strokeText('СОЛДАТА ВЕРМАХТА', 960, 240); ctx.fillText('СОЛДАТА ВЕРМАХТА', 960, 240);
  ctx.restore();
}
