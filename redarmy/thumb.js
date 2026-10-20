// Red Army thumbnail: the hero at ranks 1, 4 and 8 growing to the right, Reichstag and smoke behind, title on top.
function drawThumb(ctx) {
  const st = { t: 3, lt: 3, dur: 10, beat: 0, bt: 0, bdur: 10, cam: { x: 960, y: 540, z: 1 } };
  ctx.fillStyle = '#16100c'; ctx.fillRect(0, 0, W, H);
  let g = ctx.createRadialGradient(1500, 560, 40, 1500, 560, 950);
  g.addColorStop(0, 'rgba(210,60,30,0.75)'); g.addColorStop(1, 'rgba(210,60,30,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  g = ctx.createRadialGradient(360, 640, 40, 360, 640, 700);
  g.addColorStop(0, 'rgba(230,200,150,0.35)'); g.addColorStop(1, 'rgba(230,200,150,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalAlpha = 0.45; reichstag(ctx, 1500, 1010, 1.1, true, 3); ctx.restore();
  for (let i = 0; i < 4; i++) smokeFX(ctx, 300 + i * 450, 900, 3 + i, 1.8, i, '30,24,20', 0.45);
  fireFX(ctx, 1800, 1010, 1.2, 3, 2); fireFX(ctx, 120, 1010, 0.8, 3, 5);
  ctx.fillStyle = '#0e0a08'; ctx.fillRect(0, 1010, W, 70);
  const y = 1030;
  hero(ctx, 1, 330, y, 0.78, { expr: 'happy' });
  hero(ctx, 4, 870, y, 0.95, { expr: 'grit', gunA: -0.12 });
  hero(ctx, 8, 1500, y, 1.18, { expr: 'sad' });
  for (const [x, yy] of [[590, 780], [1170, 740]]) {
    ctx.fillStyle = '#c9a24a'; ctx.strokeStyle = INK; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(x - 50, yy - 18); ctx.lineTo(x + 10, yy - 18); ctx.lineTo(x + 10, yy - 40); ctx.lineTo(x + 60, yy); ctx.lineTo(x + 10, yy + 40); ctx.lineTo(x + 10, yy + 18); ctx.lineTo(x - 50, yy + 18); ctx.closePath(); ctx.fill(); ctx.stroke();
  }
  // years under each stage
  ctx.save(); ctx.textAlign = 'center'; ctx.font = '700 54px "Oswald"'; ctx.lineJoin = 'round'; ctx.lineWidth = 12; ctx.strokeStyle = '#000'; ctx.fillStyle = '#efe6d2';
  [[330, '1941'], [870, '1942'], [1500, '1945']].forEach(([x, s]) => { ctx.strokeText(s, x, 1060); ctx.fillText(s, x, 1060); });
  ctx.restore();
  filmLook(ctx, 'warm', 3);
  vignette(ctx, 0.4);
  ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  ctx.font = '700 120px "Oswald"'; ctx.lineWidth = 24; ctx.strokeStyle = '#000'; ctx.fillStyle = '#f0e6d0';
  ctx.strokeText('КАЖДЫЙ УРОВЕНЬ', 960, 100); ctx.fillText('КАЖДЫЙ УРОВЕНЬ', 960, 100);
  ctx.font = '700 150px "Oswald"'; ctx.fillStyle = '#e8321e'; ctx.shadowColor = 'rgba(255,60,30,0.6)'; ctx.shadowBlur = 30;
  ctx.strokeText('СОЛДАТА КРАСНОЙ АРМИИ', 960, 250); ctx.fillText('СОЛДАТА КРАСНОЙ АРМИИ', 960, 250);
  ctx.restore();
}
