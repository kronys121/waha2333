// Stalin thumbnail: a staircase from the boy in Gori to the Generalissimus in white, the Kremlin behind.
function drawThumb(ctx) {
  let g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#1a1214'); g.addColorStop(0.55, '#7a2018'); g.addColorStop(1, '#c86a3a');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalAlpha = 0.55; kremlinWall(ctx, -100, 2020, 880, 200); spasskaya(ctx, 1500, 900, 0.85); ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const rg = ctx.createRadialGradient(1500, 160, 20, 1500, 160, 500); rg.addColorStop(0, 'rgba(255,80,60,0.5)'); rg.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H); ctx.restore();
  ctx.fillStyle = '#3a1a14'; ctx.fillRect(0, 970, W, 110);
  const L = [[70, 1062, 0.5], [190, 1057, 0.42], [320, 1052, 0.48], [470, 1047, 0.56], [640, 1042, 0.64], [840, 1037, 0.74], [1080, 1032, 0.86], [1600, 1180, 1.5]];
  for (const i of [7, 6, 5, 4, 3, 2, 1, 0]) {
    const [x, y, s] = L[i];
    if (i < 7) { const w = 200 * s + 60; rect(ctx, x - w / 2, y - 6, w, 200, i % 2 ? '#5a4a44' : '#4a3a36', 6, 5); ctx.save(); ctx.fillStyle = '#e8d8a8'; ctx.font = `700 ${Math.round(22 + i * 3)}px "Old Standard TT"`; ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillText(ROMAN8[i], x, y + 2); ctx.restore(); }
    stalin(ctx, i + 1, x, y, s, { expr: i === 7 ? 'neutral' : 'neutral', time: 1.3, smoke: false });
  }
  ctx.save(); ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.textAlign = 'left';
  ctx.font = '700 92px "Old Standard TT"'; ctx.lineWidth = 20; ctx.strokeStyle = '#140a06'; ctx.fillStyle = '#fff6e0';
  ctx.strokeText('КАЖДЫЙ УРОВЕНЬ', 60, 90); ctx.fillText('КАЖДЫЙ УРОВЕНЬ', 60, 90);
  ctx.font = '700 150px "Old Standard TT"'; ctx.fillStyle = '#e8c040'; ctx.lineWidth = 26; ctx.shadowColor = 'rgba(255,200,80,0.5)'; ctx.shadowBlur = 30;
  ctx.strokeText('СТАЛИНА', 50, 225); ctx.fillText('СТАЛИНА', 50, 225);
  ctx.restore();
}
