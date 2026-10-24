// Ork thumbnail: a staircase from a tiny spore-born ork to the Prophet of the Waaagh in mega armour.
function drawThumb(ctx) {
  let g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#1a0a14'); g.addColorStop(0.5, '#a83a1a'); g.addColorStop(1, '#f0a040');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const rg = ctx.createRadialGradient(1600, 500, 80, 1600, 500, 800); rg.addColorStop(0, 'rgba(160,255,90,0.35)'); rg.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H); ctx.restore();
  ctx.fillStyle = '#4a2a1a'; ctx.fillRect(0, 970, W, 110);
  const t = 1.3;
  const L = [
    [60, 1062, 0.42, (x, y, s) => orkX(ctx, x, y, s * 0.7, { expr: 'roar', armR: -2.4, armL: 2.4, time: t }, { weapon: 'none' }, OKP2.yoof)],
    [170, 1057, 0.4, (x, y, s) => orkX(ctx, x, y, s, { expr: 'angry', time: t }, { weapon: 'choppa' })],
    [310, 1052, 0.46, (x, y, s) => orkX(ctx, x, y, s, { expr: 'roar', fire: 1, time: t }, { weapon: 'shoota', scars: true })],
    [480, 1047, 0.52, (x, y, s) => orkX(ctx, x, y, s, { expr: 'angry', time: t }, { weapon: 'none', armour: 'eavy', pad: true, checks: true, scars: true, helm: 'horns', bulk: 0.5 }, OKP.nob)],
    [690, 1042, 0.58, (x, y, s) => orkX(ctx, x, y, s, { expr: 'happy', time: t }, { weapon: 'kustom', armour: 'eavy', pad: true, checks: true, scars: true, helm: 'iron', bulk: 1, teethNeck: true }, OKP.boss)],
    [950, 1037, 0.5, (x, y, s) => megaBoss(ctx, x, y, s, { expr: 'roar', klaw: 0.8, time: t }, { helm: 'horns' })],
    [1240, 1032, 0.6, (x, y, s) => megaBoss(ctx, x, y, s, { expr: 'angry', klaw: 0.3, time: t }, { helm: 'none', plate: true, jaw: 'iron', pole: 2 })],
    [1650, 1140, 1.0, (x, y, s) => { megaBoss(ctx, x, y, s, { expr: 'roar', klaw: 1, time: t }, { helm: 'none', plate: true, jaw: 'iron', cape: true, pole: 2 }, OKP.prophet); }],
  ];
  for (const i of [7, 6, 5, 4, 3, 2, 1, 0]) {
    const [x, y, s, fn] = L[i];
    if (i < 7) { const w = (i >= 5 ? 520 : 380) * s + 50; rect(ctx, x - w / 2, y - 6, w, 200, i % 2 ? '#6a6a5a' : '#5a5a4a', 6, 5); ctx.save(); ctx.fillStyle = '#e8d8a8'; ctx.font = `700 ${Math.round(22 + i * 3)}px "Old Standard TT"`; ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillText(ROMAN8[i], x, y + 2); ctx.restore(); }
    fn(x, y, s);
  }
  ctx.save(); ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.textAlign = 'left';
  ctx.font = '700 92px "Old Standard TT"'; ctx.lineWidth = 20; ctx.strokeStyle = '#140a06'; ctx.fillStyle = '#fff6e0';
  ctx.strokeText('КАЖДЫЙ УРОВЕНЬ', 60, 90); ctx.fillText('КАЖДЫЙ УРОВЕНЬ', 60, 90);
  ctx.font = '700 150px "Old Standard TT"'; ctx.fillStyle = '#9cff4c'; ctx.lineWidth = 26; ctx.shadowColor = 'rgba(160,255,90,0.6)'; ctx.shadowBlur = 30;
  ctx.strokeText('ОРКА', 50, 225); ctx.fillText('ОРКА', 50, 225);
  ctx.restore();
}
