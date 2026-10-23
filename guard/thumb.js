// Guard thumbnail: a staircase from a hive-world boy with the primer to a towering Lord-General against a burning planet.
function drawThumb(ctx) {
  let g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#2a1a2a'); g.addColorStop(0.5, '#a8442a'); g.addColorStop(1, '#e8a050');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  planet(ctx, 1560, 330, 260, '#8a2a14', '#e0601a', { seed: 5 });
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const rg = ctx.createRadialGradient(1560, 330, 120, 1560, 330, 760); rg.addColorStop(0, 'rgba(255,190,80,0.7)'); rg.addColorStop(1, 'rgba(255,120,40,0)'); ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H); ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.5; for (let i = 0; i < 9; i++) { const sx = 40 + i * 120, sh = 260 + (i * 97) % 220; shape(ctx, [[sx, 980], [sx + 30, 980 - sh], [sx + 50, 940 - sh - 60], [sx + 70, 980 - sh], [sx + 100, 980]], '#3a2420', 4); } ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.55; valkyrie(ctx, 640, 330, 0.42, 1); valkyrie(ctx, 900, 420, 0.32, 1); ctx.restore();
  ctx.fillStyle = '#5a3a28'; ctx.fillRect(0, 970, W, 110);
  // [x, feetY, scale, draw]: each level looks different
  const L = [
    [80, 1062, 0.3, (x, y, s) => { worker(ctx, x, y, s, { expr: 'neutral', armR: -0.9 }, 0, { hat: 'none' }); primer(ctx, x + 75 * s, y - 330 * s, 0.32 * s, 0, 0.2); }],
    [210, 1057, 0.38, (x, y, s) => { hero(ctx, 2, x, y, s, pose.fire(0.05)); lasBeam(ctx, x + 300 * s, y - 380 * s, x + 520 * s, y - 400 * s, 1); }],
    [370, 1052, 0.46, (x, y, s) => hero(ctx, 3, x, y, s, { expr: 'grit', gunA: -0.5 })],
    [545, 1047, 0.54, (x, y, s) => { hero(ctx, 4, x, y, s, { expr: 'angry', armR: -1.4 }); sword(ctx, x + 110 * s, y - 270 * s, 0.4 * s, 0.1, 0, 0); }],
    [745, 1042, 0.62, (x, y, s) => hero(ctx, 5, x, y, s, { expr: 'grit', armR: -1.55, head: -0.05 })],
    [975, 1037, 0.72, (x, y, s) => { hero(ctx, 6, x, y, s, { expr: 'sad', armR: -0.9, head: 0.12 }); helmetProp(ctx, x + 125 * s, y - 330 * s, 0.34 * s, 6, true, -0.1); }],
    [1240, 1032, 0.86, (x, y, s) => hero(ctx, 7, x, y, s, { ...pose.salute(), expr: 'neutral' })],
    [1640, 1130, 1.45, (x, y, s) => { hero(ctx, 8, x, y, s, { expr: 'neutral', head: 0.04, armL: -0.2, armR: 0.2 }); }],
  ];
  for (const i of [7, 6, 5, 4, 3, 2, 1, 0]) {
    const [x, y, s, fn] = L[i];
    if (i < 7) { const w = 380 * s + 50; rect(ctx, x - w / 2, y - 6, w, 200, i % 2 ? '#6a6a5a' : '#5a5a4a', 6, 5); ctx.save(); ctx.fillStyle = '#e8d8a8'; ctx.font = `700 ${Math.round(22 + i * 3)}px "Old Standard TT"`; ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillText(ROMAN8[i], x, y + 2); ctx.restore(); }
    fn(x, y, s);
  }
  ctx.save(); ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.textAlign = 'left';
  ctx.font = '700 92px "Old Standard TT"'; ctx.lineWidth = 20; ctx.strokeStyle = '#140a06'; ctx.fillStyle = '#fff6e0';
  ctx.strokeText('КАЖДЫЙ УРОВЕНЬ', 60, 90); ctx.fillText('КАЖДЫЙ УРОВЕНЬ', 60, 90);
  ctx.font = '700 138px "Old Standard TT"'; ctx.fillStyle = '#f0c040'; ctx.lineWidth = 26; ctx.shadowColor = 'rgba(255,200,80,0.6)'; ctx.shadowBlur = 30;
  ctx.strokeText('ГВАРДЕЙЦА', 50, 215); ctx.fillText('ГВАРДЕЙЦА', 50, 215);
  ctx.restore();
}
