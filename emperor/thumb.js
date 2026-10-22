// Emperor thumbnail: growth from a tiny shaman boy to a towering God-Emperor that fills the right side of the frame.
function drawThumb(ctx) {
  let g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#7aa4d0'); g.addColorStop(0.55, '#f2dcae'); g.addColorStop(1, '#e8c47a');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const rg = ctx.createRadialGradient(1520, 420, 40, 1520, 420, 900); rg.addColorStop(0, 'rgba(255,240,190,0.95)'); rg.addColorStop(1, 'rgba(255,220,140,0)');
  ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
  beam(ctx, 1520, 1080, 520, 1300, 0.55);
  ctx.save(); ctx.globalAlpha = 0.45; for (let i = 0; i < 4; i++) tent(ctx, 80 + i * 170, 960, 0.5, '#a88a5a'); ctx.restore();
  ctx.fillStyle = '#c8a868'; ctx.fillRect(0, 960, W, 120);
  const EMP = (c, x2, y2, s2, p) => emperor(c, x2, y2, s2, p);
  // [x, feetY, scale, draw]
  const L = [
    [90, 1060, 0.3, (x, y, s) => { boy(ctx, x, y, s, { expr: 'happy', armR: -2.5 }); goldLight(ctx, x + 28, y - 125, 10, 3, 1); }],
    [200, 1055, 0.42, (x, y, s) => wanderer(ctx, 'sage', x, y, s, { expr: 'neutral' })],
    [340, 1050, 0.36, (x, y, s) => EMP(ctx, x, y, s, { expr: 'grit' })],
    [505, 1045, 0.46, (x, y, s) => EMP(ctx, x, y, s, { expr: 'happy' })],
    [710, 1040, 0.58, (x, y, s) => EMP(ctx, x, y, s, { expr: 'neutral' })],
    [960, 1035, 0.74, (x, y, s) => EMP(ctx, x, y, s, { expr: 'grit' })],
    [1250, 1040, 0.95, (x, y, s) => EMP(ctx, x, y, s, { expr: 'grit' })],
    [1600, 1130, 1.55, (x, y, s) => drawRig(ctx, rig('marine', { plain: true, weapon: 'none', helmet: 'off', hair: 'long', cape: true, laurel: true }), x, y, s, { expr: 'neutral' }, EMPEROR)],
  ];
  // biggest at the back, smallest in front
  for (let i = L.length - 1; i >= 0; i--) {
    const [x, y, s, fn] = L[i];
    if (i < 7) { const w = 380 * s + 40; rect(ctx, x - w / 2, y - 6, w, 200, i % 2 ? '#d8b050' : '#c9a24a', 6, 5); ctx.save(); ctx.fillStyle = '#5a3a14'; ctx.font = `700 ${Math.round(22 + i * 3)}px "Old Standard TT"`; ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillText(ROMAN8[i], x, y + 2); ctx.restore(); }
    fn(x, y, s);
  }
  ctx.save(); ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.textAlign = 'left';
  ctx.font = '700 92px "Old Standard TT"'; ctx.lineWidth = 20; ctx.strokeStyle = '#1a1006'; ctx.fillStyle = '#fff6e0';
  ctx.strokeText('КАЖДЫЙ УРОВЕНЬ', 60, 90); ctx.fillText('КАЖДЫЙ УРОВЕНЬ', 60, 90);
  ctx.font = '700 138px "Old Standard TT"'; ctx.fillStyle = '#f0c040'; ctx.lineWidth = 26; ctx.shadowColor = 'rgba(255,200,80,0.6)'; ctx.shadowBlur = 30;
  ctx.strokeText('ИМПЕРАТОРА', 50, 215); ctx.fillText('ИМПЕРАТОРА', 50, 215);
  ctx.restore();
}
