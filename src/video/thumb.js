// YouTube thumbnail: the eight levels lined up by height, title on top.
function drawThumb(ctx) {
  const t = 0.4;
  // sunburst background
  ctx.fillStyle = '#1d3f9a'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(1500, 560);
  for (let i = 0; i < 24; i++) {
    ctx.rotate(Math.PI / 12);
    ctx.fillStyle = i % 2 ? '#2d5bd1' : '#2551bd';
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(2400, -320); ctx.lineTo(2400, 320); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
  const g = ctx.createRadialGradient(1700, 620, 40, 1700, 620, 520);
  g.addColorStop(0, 'rgba(255,220,120,0.85)'); g.addColorStop(1, 'rgba(255,220,120,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // floor
  ctx.fillStyle = '#16244f'; ctx.fillRect(0, 1000, W, 80);
  ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, 1000); ctx.lineTo(W, 1000); ctx.stroke();

  const y = 1010;
  const cast = [
    [100, (x) => human(ctx, x, y, 0.8, { expr: 'happy' }, HERO_KID)],
    [255, (x) => human(ctx, x, y, 0.85, { expr: 'grit' }, TEEN, TEEN_PAL)],
    [415, (x) => human(ctx, x, y, 0.95, { expr: 'grit' }, SCOUT, HUMAN_PAL.scout)],
    [620, (x) => marine(ctx, x, y, 0.6, {}, { weapon: 'bolter' }, brother(7))],
    [855, (x) => marine(ctx, x, y, 0.66, {}, SGT, sgtPal(5))],
    [1105, (x) => drawRig(ctx, rig('terminator'), x, y, 0.66, {}, VET_PAL)],
    [1385, (x) => marine(ctx, x, y, 0.78, {}, LT, LT_PAL)],
    [1690, (x) => marine(ctx, x, y, 0.9, { expr: 'happy' }, MASTER, MASTER_PAL)],
  ];
  cast.forEach(([x, draw], i) => {
    shadow(ctx, x, y, 90 + i * 15, 0.35);
    draw(x);
  });
  // level numbers
  cast.forEach(([x], i) => {
    ctx.save(); ctx.translate(x, 1040);
    ctx.fillStyle = C.gold; ctx.strokeStyle = INK; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(0, 0, 34, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = INK; ctx.font = font(44); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(String(i + 1), 0, 3);
    ctx.restore();
  });
  // title
  outlinedText(ctx, 'КАЖДЫЙ УРОВЕНЬ', 960, 110, 150, { stroke: 30 });
  outlinedText(ctx, 'УЛЬТРАМАРИНОВ', 960, 260, 150, { stroke: 30, color: C.gold });
}
