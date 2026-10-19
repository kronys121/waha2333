// Horus thumbnail: three stages of Horus rising to the right, Emperor's glow behind, title on top.
function drawThumb(ctx) {
  ctx.fillStyle = '#07060a'; ctx.fillRect(0, 0, W, H);
  // split light: gold on the left, blood red on the right
  let g = ctx.createRadialGradient(380, 620, 40, 380, 620, 800);
  g.addColorStop(0, 'rgba(255,210,120,0.55)'); g.addColorStop(1, 'rgba(255,210,120,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  g = ctx.createRadialGradient(1560, 640, 40, 1560, 640, 900);
  g.addColorStop(0, 'rgba(200,30,20,0.7)'); g.addColorStop(1, 'rgba(200,30,20,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  embers(ctx, 3.2, 90, '#ff7a3a', 7);
  eyeOfHorus(ctx, 1560, 380, 1.6, 'rgba(120,20,20,0.55)', 'rgba(60,0,0,0.6)');
  ctx.fillStyle = '#0c0808'; ctx.fillRect(0, 1010, W, 70);
  const y = 1020;
  horus(ctx, 330, y, 0.62, { expr: 'happy' }, 'lw');
  horus(ctx, 860, y, 0.78, { expr: 'neutral' }, 'wm');
  horus(ctx, 1540, y, 1.02, { expr: 'angry' }, 'x');
  // arrows between stages
  for (const [x, yy] of [[580, 760], [1160, 700]]) {
    ctx.fillStyle = '#c9a24a'; ctx.strokeStyle = INK; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(x - 50, yy - 18); ctx.lineTo(x + 10, yy - 18); ctx.lineTo(x + 10, yy - 40); ctx.lineTo(x + 60, yy); ctx.lineTo(x + 10, yy + 40); ctx.lineTo(x + 10, yy + 18); ctx.lineTo(x - 50, yy + 18); ctx.closePath(); ctx.fill(); ctx.stroke();
  }
  vignette(ctx, 0.55);
  // title
  ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  ctx.font = '700 130px "Old Standard TT"';
  ctx.lineWidth = 26; ctx.strokeStyle = '#000'; ctx.fillStyle = '#f0e6d0';
  ctx.strokeText('КАЖДЫЙ УРОВЕНЬ', 960, 110); ctx.fillText('КАЖДЫЙ УРОВЕНЬ', 960, 110);
  ctx.font = '700 200px "Old Standard TT"'; ctx.fillStyle = '#d0281a';
  ctx.shadowColor = 'rgba(255,60,30,0.6)'; ctx.shadowBlur = 40;
  ctx.strokeText('ХОРУСА', 960, 270); ctx.shadowBlur = 0; ctx.fillText('ХОРУСА', 960, 270);
  ctx.restore();
  grain(ctx, 0.08);
}
