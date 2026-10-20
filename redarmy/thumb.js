// Red Army thumbnail: all 8 ranks on a rising staircase, bright sky, title on top.
function drawThumb(ctx) {
  let g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#9cc4e4'); g.addColorStop(0.6, '#f4e2bc'); g.addColorStop(1, '#f0d49a');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  g = ctx.createRadialGradient(1650, 520, 30, 1650, 520, 700);
  g.addColorStop(0, 'rgba(255,240,190,0.9)'); g.addColorStop(1, 'rgba(255,240,190,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // distance: birches on the left, Reichstag with the flag on the right
  ctx.save(); ctx.globalAlpha = 0.5;
  for (let i = 0; i < 6; i++) birch(ctx, 40 + i * 110, 900, 360 + (i % 3) * 60, 1);
  reichstag(ctx, 1560, 900, 0.9, true, 3);
  ctx.restore();
  ctx.fillStyle = '#b8a070'; ctx.fillRect(0, 900, W, 180);
  // staircase of ranks
  const N = 8, sc = (i) => 0.5 + i * 0.075, stepH = 34, base = 1050;
  const xs = []; let x = 0;
  for (let i = 0; i < N; i++) { if (i) x += 205 * (sc(i - 1) + sc(i)) / 2 + 26; xs.push(x); }
  const off = (W - xs[N - 1]) / 2 + 20;
  const poses = [{ expr: 'happy' }, { expr: 'neutral' }, { expr: 'grit' }, { expr: 'grit', gunA: -0.12 }, { expr: 'happy' }, { expr: 'neutral' }, { expr: 'grit' }, { expr: 'sad' }];
  for (let i = 0; i < N; i++) {
    const cx = xs[i] + off, top = base - (i + 1) * stepH, w = 230 * sc(i) + 40;
    rect(ctx, cx - w / 2, top, w, base + 40 - top, i % 2 ? '#c8282a' : '#b3262a', 6, 5);
    ctx.save(); ctx.fillStyle = '#f6d36a'; ctx.font = '700 40px "Oswald"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(String(i + 1), cx, top + 30); ctx.restore();
    hero(ctx, i + 1, cx, top + 4, sc(i), poses[i]);
  }
  ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  ctx.font = '700 120px "Oswald"'; ctx.lineWidth = 24; ctx.strokeStyle = '#1a1210'; ctx.fillStyle = '#fff6e0';
  ctx.strokeText('КАЖДЫЙ УРОВЕНЬ', 960, 95); ctx.fillText('КАЖДЫЙ УРОВЕНЬ', 960, 95);
  ctx.font = '700 150px "Oswald"'; ctx.fillStyle = '#e8321e';
  ctx.strokeText('СОЛДАТА КРАСНОЙ АРМИИ', 960, 240); ctx.fillText('СОЛДАТА КРАСНОЙ АРМИИ', 960, 240);
  ctx.restore();
}
