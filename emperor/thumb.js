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
  const ER = (o) => rig('marine', { plain: true, weapon: 'none', helmet: 'off', hair: 'long', cape: true, laurel: true, ...o });
  const BRONZE = pal(EMPEROR, { armor: '#a8783a', armorDark: '#7a5424', trim: '#e8c14a', rim: '#e8c14a', helm: '#a8783a', lens: '#ffd060', cape: '#5a2a1a' });
  const WINGED = pal(EMPEROR, { wing: '#f4e6b0', wingShade: '#d8c080' });
  const SEER = pal(EMPEROR, { eyeIris: '#7fe0ff' });
  const WAR = pal(EMPEROR, { armor: '#d8a83a', armorDark: '#9a7020', cape: '#8a1a14' });
  const GOD = pal(EMPEROR, { skin: '#b8a48a', hair: '#4a3a30', armor: '#d8b850', armorDark: '#a08030' });
  const throne = (x, y, s) => { shape(ctx, [[x - 260 * s, y], [x - 230 * s, y - 640 * s], [x - 120 * s, y - 760 * s], [x, y - 800 * s], [x + 120 * s, y - 760 * s], [x + 230 * s, y - 640 * s], [x + 260 * s, y]], '#b08a2a', 6); rect(ctx, x - 200 * s, y - 330 * s, 400 * s, 330 * s, '#8a6a20', 20 * s, 6); };
  // [x, feetY, scale, draw]: each level looks different
  const L = [
    [90, 1060, 0.3, (x, y, s) => { boy(ctx, x, y, s, { expr: 'happy', armR: -2.5 }); goldLight(ctx, x + 28, y - 125, 10, 3, 1); }],
    [200, 1055, 0.42, (x, y, s) => wanderer(ctx, 'barb', x, y, s, { expr: 'neutral' })],
    [345, 1050, 0.36, (x, y, s) => drawRig(ctx, rig('marine', { plain: true, weapon: 'bolter' }), x, y, s, { expr: 'grit' }, BRONZE)],
    [500, 1045, 0.62, (x, y, s) => { person(ctx, x - 20 * s, y, s, { expr: 'happy', armR: -0.8 }, { coat: true, hat: 'none' }, pal(EP.sage, { coat: '#f0ece0', shirt: '#f0ece0', pants: '#d8d0c0', hair: '#1a1008' })); capsulePod(ctx, x + 120 * s, y, 0.45 * s, 0, 3, false); }],
    [720, 1040, 0.58, (x, y, s) => { drawRig(ctx, ER({ wings: true }), x, y, s, { expr: 'neutral' }, WINGED); haloGlow(ctx, x, y - 560 * s, 130 * s); }],
    [1010, 1035, 0.62, (x, y, s) => { throne(x, y, s * 1.1); drawRig(ctx, ER({ eyeGlow: true, glowEyes: true }), x, y, s, { bob: 60, expr: 'grit' }, SEER); ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g2 = ctx.createRadialGradient(x, y - 420 * s, 10, x, y - 420 * s, 420 * s); g2.addColorStop(0, 'rgba(140,220,255,0.45)'); g2.addColorStop(1, 'rgba(140,220,255,0)'); ctx.fillStyle = g2; ctx.fillRect(x - 420 * s, y - 840 * s, 840 * s, 840 * s); ctx.restore(); }],
    [1255, 1040, 0.92, (x, y, s) => { drawRig(ctx, ER({}), x, y, s, { expr: 'angry', armR: -2.6 }, WAR); sword(ctx, x + 175 * s, y - 470 * s, 0.75 * s, 0.1, 1, 3); }],
    [1720, 1130, 1.5, (x, y, s) => { beam(ctx, x, y - 560 * s, 300, 900, 0.6); throne(x, y, s); drawRig(ctx, ER({}), x, y, s, { bob: 60, blink: 1, head: 0.06, expr: 'neutral' }, GOD); }],
  ];
  // biggest at the back, smallest in front
  for (const i of [7, 6, 4, 5, 3, 2, 1, 0]) {
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
