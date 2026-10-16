// Level 3: Боевой брат (262 - 377 s)

const CO = { // company trim colours (pauldron rims)
  1: '#f4f4f4', 5: '#2a2a33', 7: '#8a4fd0', 8: '#9a9aa6', 9: '#7fc0ff', 10: '#f2c230',
};
const brother = (co, over) => pal('ultra', { rim: CO[co], ...over });
const deadTyranid = (ctx, x, y, s, flip) => drawRig(ctx, rig('tyranid'), x, y, s, { lean: flip ? -1.45 : 1.45, flip }, pal(TYRANID_PAL, { eye: '#3a2a3a' }));

shot(cue(131), (ctx, s) => levelCard(ctx, 3, s.lt));

// ---- 3.1 the scout hid; the brother stands where he is shot at
shot(cue(133), (ctx, s) => {
  const t = s.lt;
  bgWild(ctx, t);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 960, 1080); ctx.clip();
  human(ctx, 480, 980, 0.9, { expr: 'grit' }, SCOUT, HUMAN_PAL.scout);
  for (let i = 0; i < 5; i++) circ(ctx, 320 + i * 80, 950 - (i % 2) * 40, 72, '#4a7a3a', 6);
  sticker(ctx, 'СКАУТ ПРЯТАЛСЯ', 480, 150, { size: 50, scale: pop(t, 0.1) });
  ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(960, 0, 960, 1080); ctx.clip();
  fillRect(ctx, 960, 0, 960, 1080, 'rgba(255,120,60,0.15)');
  marine(ctx, 1440, 1000, 0.8, { ...idlePose(t), expr: 'neutral' }, { weapon: 'bolter' }, brother(10));
  for (let i = 0; i < 7; i++) tracer(ctx, 2000, 300 + i * 90, 1440 + (i - 3) * 60, 560 + (i % 3) * 80, t + i * 0.13, 2.2, '#ff5a3a');
  sticker(ctx, 'БРАТ СТОИТ ТАМ,\nГДЕ СТРЕЛЯЮТ', 1440, 170, { size: 46, bg: '#fff', scale: pop(t, at(s, 134)) });
  ctx.restore();
  ctx.fillStyle = INK; ctx.fillRect(954, 0, 12, 1080);
  if (t > at(s, 135)) stamp(ctx, 'ОБЯЗАН', 1440, 760, t, at(s, 135) + 0.4, { size: 70 });
});

// ---- 3.2 reserve companies; the 8th captain is Lord Executioner
shot(cue(136), (ctx, s) => {
  const t = s.lt;
  const z = kf(t, [[at(s, 139), 1], [at(s, 139) + 1.2, 1.9]]);
  ctx.save(); camera(ctx, lerp(960, 960, 0), lerp(560, 430, (z - 1) / 0.9), z);
  bgStoneRoom(ctx, t, { windows: false, wall: '#7a7a8a' });
  rect(ctx, 760, 260, 400, 520, '#7a4a2a', 10, 8);
  rect(ctx, 790, 290, 340, 460, '#8a5a3a', 8, 5);
  circ(ctx, 1110, 540, 16, C.gold, 5);
  rect(ctx, 800, 320, 320, 150, '#c9a24a', 10, 6);
  ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = font(t > at(s, 141) ? 50 : 34);
  if (t > at(s, 141)) { ctx.fillText('ПАЛАЧ', 960, 370); ctx.font = font(28, 'Oswald', '700'); ctx.fillText('Приём по вторникам', 960, 428); }
  else { ctx.fillText('КАПИТАН 8 РОТЫ', 960, 365); ctx.fillText('ЛОРД-ПАЛАЧ', 960, 420); }
  marine(ctx, 400, 1000, 0.75, idlePose(t), { weapon: 'none' }, brother(9));
  ctx.restore();
  sticker(ctx, 'РЕЗЕРВНЫЕ РОТЫ', 960, 110, { size: 56, scale: pop(t, 0.1) });
});

// ---- 3.3 rumour: the 7th captain is Chief Quartermaster. Everyone laughs.
shot(cue(143), (ctx, s) => {
  const t = s.lt;
  const laugh = at(s, 147) - 0.1;
  bgStoneRoom(ctx, t, { banners: true });
  for (let i = 0; i < 4; i++) {
    const x = 330 + i * 420;
    const shake = t > laugh ? Math.sin(t * 30 + i) * 6 : 0;
    marine(ctx, x, 1010, 0.55, { ...idlePose(t, i), bob: shake, head: t > laugh ? Math.sin(t * 20 + i) * 0.08 : 0 }, { weapon: 'none' }, brother(8));
    if (t > laugh) outlinedText(ctx, 'ХА', x + 80, 560 - ((t * 120 + i * 40) % 120), 46, { color: C.gold });
  }
  if (t > at(s, 148)) youArrow(ctx, 330 + 2 * 420, 640, t);
  if (t < laugh) bubble(ctx, 'а у капитана седьмой...', 600, 300, 610, 440, { size: 40, scale: pop(t, at(s, 144)) });
  if (t > at(s, 145) + 1.0) sticker(ctx, 'ГЛАВНЫЙ ПРОВИАНТМЕЙСТЕР', 1200, 200, { size: 54, scale: pop(t, at(s, 145) + 1.0) });
  if (t > at(s, 146)) sticker(ctx, '= ГЛАВНЫЙ ПО ЕДЕ', 1250, 320, { size: 46, bg: '#fff', scale: pop(t, at(s, 146)) });
});

// ---- 3.4 the Codex split into chapters; your chapter: draw fire
shot(cue(149), (ctx, s) => {
  const t = s.lt;
  bgStoneRoom(ctx, t, { wall: '#6a5a8a', floor: '#4a3e60' });
  book(ctx, 960, 380, 0.75, 'КОДЕКС\nАСТАРТЕС');
  for (let i = 0; i < 4; i++) {
    const x = 300 + i * 440;
    marine(ctx, x, 1020, 0.55, idlePose(t, i), { weapon: i === 2 ? 'bolter' : 'none' }, brother(7));
    const p = clamp((t - 1.2 - i * 0.25) / 0.8);
    if (p > 0) {
      const px = lerp(960, x + 110, p), py = lerp(380, 640, p) - Math.sin(p * Math.PI) * 120;
      ctx.save(); ctx.translate(px, py); ctx.rotate((1 - p) * 4);
      rect(ctx, -40, -50, 80, 100, C.paper, 4, 4);
      ctx.restore();
    }
  }
  const mine = at(s, 152);
  if (t > mine) {
    youArrow(ctx, 1180, 640, t);
    sticker(ctx, 'ТАКТИЧЕСКОЕ ОТДЕЛЕНИЕ:\nПРИТЯГИВАТЬ ОГОНЬ', 1180, 140, { size: 40, bg: '#fff', scale: pop(t, mine) });
  }
  if (t > at(s, 155) - 0.3) {
    const sc = pop(t, at(s, 155) - 0.3);
    for (let r = 3; r >= 1; r--) circ(ctx, 1180, 760, r * 40 * sc, r % 2 ? '#d8402f' : '#fff', 5);
    stamp(ctx, 'МИШЕНЬ', 1580, 560, t, at(s, 155), { size: 70 });
  }
});

// ---- 3.5 the Codex knows everything: measure the ford with a branch
shot(cue(156), (ctx, s) => {
  const t = s.lt;
  bgWild(ctx, t);
  // river
  rect(ctx, -200, 900, 2400, 200, '#4a8ad0', 0, 6);
  for (let i = 0; i < 12; i++) { ctx.strokeStyle = '#9fd0ff'; ctx.lineWidth = 6; const x = (i * 220 + t * 80) % 2400 - 200; ctx.beginPath(); ctx.moveTo(x, 960 + (i % 3) * 40); ctx.lineTo(x + 80, 960 + (i % 3) * 40); ctx.stroke(); }
  marine(ctx, 700, 900, 0.75, { ...idlePose(t), armR: -0.9 + Math.sin(t * 3) * 0.1 }, { weapon: 'none' }, brother(7));
  ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 16; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(900, 640); ctx.lineTo(1000, 1000 + Math.sin(t * 3) * 10); ctx.stroke();
  ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(930, 740); ctx.lineTo(990, 700); ctx.stroke();
  paper(ctx, 1450, 400, 720, 380, 'КОДЕКС, ПУНКТ 14.7', ['Как переходить реку:', 'сначала измерь глубину', 'брода упавшей веткой'], { lineSize: 44 });
  stamp(ctx, 'ЭТО ПУНКТ', 1450, 700, t, at(s, 160), { size: 70 });
});

// ---- 3.6 the Behemoth: a hive fleet that eats planets
shot(cue(161), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, 540, kf(t, [[0, 1.1], [9, 1]]));
  bgSpace(ctx, t, { nebula: 'rgba(120,40,160,0.35)' });
  const eat = clamp((t - at(s, 164)) / 4);
  planet(ctx, 1300, 600, 300, '#5aa83a', '#3a8a3a', { eaten: eat, seed: 5 });
  for (let i = 0; i < 5; i++) hiveShip(ctx, kf(t, [[0, -600 - i * 200], [3, 200 + i * 120]]), 200 + i * 140, 0.55 - i * 0.05, t + i);
  ctx.restore();
  sticker(ctx, 'БЕГЕМОТ', 400, 110, { size: 70, bg: '#7b3fa0', color: '#fff', scale: pop(t, 0.1) });
  sticker(ctx, 'ФЛОТ-УЛЕЙ ТИРАНИДОВ', 500, 230, { size: 44, bg: '#fff', scale: pop(t, at(s, 162)) });
  if (t > at(s, 165)) sticker(ctx, 'ВКЛЮЧАЯ ТРАВУ', 1300, 960, { size: 50, scale: pop(t, at(s, 165)) });
});

// ---- 3.7 the southern fortress: you are late
shot(cue(166), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, 580, 1);
  bgSnow(ctx, t);
  const land = 1.0;
  dropPod(ctx, 400, Math.min(980, -300 + t * 1300), 0.8, t > land + 0.4);
  for (const [x, f] of [[800, false], [1150, true], [1600, false]]) deadTyranid(ctx, x, 1030, 0.4, f);
  if (t > land + 0.3) marine(ctx, 560, 1040, 0.6, idlePose(t), { weapon: 'bolter' }, brother(7));
  for (let i = 0; i < 3; i++) human(ctx, 1350 + i * 160, 1040, 0.8, { ...idlePose(t, i), expr: 'angry', look: -1 }, { hair: ['short', 'buzz', 'bun'][i] }, pal(HUMAN_PAL.serf, { shirt: '#5a6a4a' }));
  ctx.restore();
  sticker(ctx, 'ЮЖНАЯ КРЕПОСТЬ', 960, 100, { size: 56, scale: pop(t, 0.2) });
  if (t > at(s, 170)) { clockFace(ctx, 1650, 300, 110, t, 6); stamp(ctx, 'ОПОЗДАЛ', 1250, 300, t, at(s, 170) + 0.2, { size: 80 }); }
});

// ---- 3.8 the lower tunnels: claws like scythes
shot(cue(171), (ctx, s) => {
  const t = s.lt;
  const come = at(s, 175) - 0.2;
  const hit = at(s, 177) + 1.2;
  ctx.save(); camera(ctx, 960, 560, kf(t, [[0, 1], [come, 1.05], [come + 1, 1.2]]), t > hit && t < hit + 0.4 ? 14 : 0, t);
  bgTunnel(ctx, t, { eyes: t > 0.4 ? 10 : 0 });
  if (t > come) {
    for (let i = 0; i < 3; i++) {
      const p = clamp((t - come - i * 0.35) / 1.4);
      const sc = lerp(0.12, 0.75, p);
      drawRig(ctx, rig('tyranid'), lerp(960, 1300 + i * 200, p) - i * 60, lerp(600, 1030, p), sc, { ...walkPose(t + i, 1.4, 0.4), armL: Math.sin(t * 6 + i) * 0.4 }, TYRANID_PAL);
    }
  }
  const sq = [[300, 0.75], [560, 0.8], [180, 0.65]];
  sq.forEach(([x, sc], i) => {
    marine(ctx, x, 1060, sc, { ...idlePose(t, i), flip: true }, { weapon: 'bolter' }, brother(7));
    if (t > 0.6 && t < come + 2.5) muzzleFlash(ctx, x - 160 * sc * -1 + 140 * sc, 1060 - 470 * sc, sc, t + i * 0.3);
  });
  for (let r = 2; r >= 1; r--) circ(ctx, 560, 1060 - 330 * 0.8, r * 22, r % 2 ? '#d8402f' : '#fff', 4);
  ctx.restore();
  if (t > at(s, 174) && t < come + 1) sticker(ctx, 'ОГНЯ У ТИРАНИДОВ НЕТ', 960, 120, { size: 50, bg: '#fff', scale: pop(t, at(s, 174)) });
  if (t > hit) stamp(ctx, 'БОЛЬНЕЕ', 1400, 300, t, hit, { size: 80 });
});

// ---- 3.9 news: the First Company died to the last man
shot(cue(179), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, 600, kf(t, [[0, 1.3], [8, 1.05]]));
  bgHall(ctx, t);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const x = 960 + Math.cos(a) * 330, y = 1000 + Math.sin(a) * 70;
    drawRig(ctx, rig('terminator'), x, y, 0.36, { flip: Math.cos(a) < 0 }, pal(MARBLE, { lens: '#3a3a3a' }), { flat: true });
  }
  for (let i = 0; i < 12; i++) deadTyranid(ctx, 200 + i * 150, 1100 + (i % 2) * 40, 0.3, i % 2);
  ctx.restore();
  tint(ctx, '#0a0a20', 0.35);
  vignette(ctx, 0.7);
  sticker(ctx, 'ПЕРВАЯ РОТА', 960, 120, { size: 64, bg: '#fff', scale: pop(t, 0.6) });
  if (t > at(s, 182)) sticker(ctx, 'КРУГОМ, СПИНА К СПИНЕ', 960, 960, { size: 48, scale: pop(t, at(s, 182)) });
});

// ---- 3.10 memorial feast: the names are read for a long time
shot(cue(183), (ctx, s) => {
  const t = s.lt;
  bgStoneRoom(ctx, t, { wall: '#4a4a66', floor: '#3a3a50', banners: true, windows: false });
  rect(ctx, 100, 760, 1720, 60, '#7a4a2a', 6, 6);
  for (let i = 0; i < 9; i++) candle(ctx, 200 + i * 190, 760, t);
  // scroll unrolling
  const len = kf(t, [[0, 120], [4, 900]]);
  rect(ctx, 760, 140, 400, len, C.paper, 6, 6);
  ctx.fillStyle = '#5a4a4a';
  const scroll = (t * 60) % 60;
  for (let y = 180; y < 140 + len - 20; y += 30) ctx.fillRect(800, y - scroll * 0 , 220 + ((y * 7) % 90), 10);
  const hl = at(s, 184) + 0.5;
  if (t > hl) {
    rect(ctx, 780, 140 + len - 90, 360, 50, '#ffe06a', 6, 4);
    ctx.fillStyle = INK; ctx.font = font(30); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('СОСЕДСКИЙ ПАРЕНЬ', 960, 140 + len - 65);
  }
  tint(ctx, '#0a0a20', 0.2);
  sticker(ctx, 'ПИР ПАМЯТИ', 300, 110, { size: 56, scale: pop(t, 0.1) });
});

// ---- 3.11 the statue is a memorial now
shot(cue(186), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, kf(t, [[0, 500], [5, 600]]), kf(t, [[0, 1.3], [5, 1.1]]));
  bgCave(ctx, t, { statue: true, statueX: 960, statueScale: 0.8, statueOpts: { flowers: true, t, plaque: 'ПАМЯТИ ГЕРОЯ' } });
  ctx.restore();
  tint(ctx, '#1a1a3a', 0.25);
  sticker(ctx, 'ТЕПЕРЬ ЭТО ПАМЯТНИК', 960, 110, { size: 56, bg: '#fff', scale: pop(t, 0.3) });
}, { fade: 0.4 });
