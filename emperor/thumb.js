// Emperor thumbnail: the eight levels on a rising golden staircase, from the shaman boy to the God-Emperor on the Throne.
function drawThumb(ctx) {
  const st = { t: 3, lt: 3, bt: 3, dof: 0, cam: { x: 960, y: 540, z: 1 } };
  let g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#8ab0d8'); g.addColorStop(0.55, '#f2dcae'); g.addColorStop(1, '#e8c47a');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  beam(ctx, 1640, 1080, 380, 1300, 0.75);
  ctx.save(); ctx.globalAlpha = 0.5;
  for (let i = 0; i < 4; i++) tent(ctx, 120 + i * 200, 920, 0.6, '#a88a5a');
  for (let i = 0; i < 6; i++) { const x = 1150 + i * 140, h = 260 + (i % 3) * 120; rect(ctx, x, 920 - h, 110, h, '#c8b088', 4, 4); shape(ctx, [[x - 10, 920 - h], [x + 55, 920 - h - 80], [x + 120, 920 - h]], '#c9a24a', 4); }
  ctx.restore();
  ctx.fillStyle = '#c8a868'; ctx.fillRect(0, 900, W, 180);
  const N = 8, sc = [0.62, 0.64, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46], bw = [140, 140, 220, 230, 235, 240, 250, 260];
  let x = 150; const xs = [];
  for (let i = 0; i < N; i++) { xs.push(x); x += (bw[i] + (bw[i + 1] || 0)) / 2 + 14; }
  const off = W - 20 - bw[N - 1] / 2 - xs[N - 1];
  const draws = [
    (cx, y) => { boy(ctx, cx, y, sc[0], { expr: 'happy', armR: -2.5 }); goldLight(ctx, cx + 60, y - 270, 18, 3, 1); },
    (cx, y) => wanderer(ctx, 'sage', cx, y, sc[1], { expr: 'neutral' }),
    (cx, y) => { banner2(ctx, cx - 110, y, 0.7, '#c9a24a', 3); EMP(ctx, cx, y, sc[2], { expr: 'grit' }); },
    (cx, y) => { EMP(ctx, cx - 20, y, sc[3], { expr: 'happy' }); capsulePod(ctx, cx + 90, y, 0.32, 0, 3, false); },
    (cx, y) => EMP(ctx, cx, y, sc[4], { expr: 'neutral' }),
    (cx, y) => { rect(ctx, cx - 110, y - 300, 220, 300, '#a8842a', 20, 6); EMP(ctx, cx, y, sc[5], { expr: 'grit', bob: 60 }); },
    (cx, y) => { EMP(ctx, cx, y, sc[6], { expr: 'grit', armR: -2.4 }); sword(ctx, cx + 70, y - 300, 0.35, -0.3, 1, 3); },
    (cx, y) => { rect(ctx, cx - 120, y - 330, 240, 330, '#8a6a2a', 20, 6); godEmperor(ctx, cx, y, sc[7], { bob: 60, head: 0.15 }); haloGlow(ctx, cx, y - 300, 80); },
  ];
  const EMP = (c, x2, y2, s2, p) => emperor(c, x2, y2, s2, p);
  for (let i = 0; i < N; i++) {
    const cx = xs[i] + off, top = 1050 - (i + 1) * 38, w = bw[i];
    rect(ctx, cx - w / 2, top, w, 1100 - top, i % 2 ? '#d8b050' : '#c9a24a', 6, 5);
    ctx.save(); ctx.fillStyle = '#5a3a14'; ctx.font = '700 40px "Old Standard TT"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(ROMAN8[i], cx, top + 30); ctx.restore();
    draws[i](cx, top + 4);
  }
  ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  ctx.font = '700 118px "Old Standard TT"'; ctx.lineWidth = 24; ctx.strokeStyle = '#1a1006'; ctx.fillStyle = '#fff6e0';
  ctx.strokeText('КАЖДЫЙ УРОВЕНЬ', 960, 100); ctx.fillText('КАЖДЫЙ УРОВЕНЬ', 960, 100);
  ctx.font = '700 168px "Old Standard TT"'; ctx.fillStyle = '#f0c040'; ctx.shadowColor = 'rgba(255,200,80,0.6)'; ctx.shadowBlur = 30;
  ctx.strokeText('ИМПЕРАТОРА', 960, 250); ctx.fillText('ИМПЕРАТОРА', 960, 250);
  ctx.restore();
}
