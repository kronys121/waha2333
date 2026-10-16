// Level 5: Ветеран (466 - 572 s)

const VET_PAL = pal('ultra', { helm: '#f4f4f4', rim: '#f4f4f4' });
const TERM = () => rig('terminator');
const GUILLIMAN = { weapon: 'none', helmet: 'off', laurel: true, cape: true, hair: 'short' };
const GUILLIMAN_PAL = pal('ultra', { hair: '#c8a060', trim: '#f2c230', rim: '#f2c230' });

shot(cue(232), (ctx, s) => levelCard(ctx, 5, s.lt));

// ---- 5.1 First Company recruits: centuries of service OR eight helmets
shot(cue(234), (ctx, s) => {
  const t = s.lt;
  bgStoneRoom(ctx, t, { banners: true });
  paper(ctx, 960, 560, 1000, 680, '1 РОТА: НАБОР', ['Требования:', '[ ] Столетия службы', '[ ] или донести восемь шлемов'], { lineSize: 50, rot: -0.02 });
  checkMark(ctx, 600, 690, 0.9, t, at(s, 235) + 0.4);
  drawRig(ctx, TERM(), 1650, 1060, 0.45, idlePose(t), VET_PAL);
});

// ---- 5.2 terminator armour: stand in an explosion like in the rain
shot(cue(236), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, 560, 1, t > at(s, 238) ? 6 : 0, t);
  bgWild(ctx, t, { night: 1 });
  drawRig(ctx, TERM(), 960, 1020, 0.95, idlePose(t), VET_PAL);
  if (t > at(s, 238)) for (let i = 0; i < 8; i++) explosion(ctx, 960 + Math.cos(i * 2.3) * 420, 600 + Math.sin(i * 1.7) * 300, 0.7, t + i * 0.37, i + 1);
  ctx.restore();
  sticker(ctx, 'БЕЛЫЙ ШЛЕМ + ТЕРМИНАТОРСКАЯ БРОНЯ', 960, 110, { size: 46, scale: pop(t, 0.1) });
  if (t > at(s, 239)) sticker(ctx, 'КАК ПОД ДОЖДЁМ', 1500, 950, { size: 50, bg: '#fff', scale: pop(t, at(s, 239)) });
});

// ---- 5.3 Crux Terminatus: judging by the numbers, very big armour
shot(cue(240), (ctx, s) => {
  const t = s.lt;
  const big = at(s, 243) - 0.1;
  if (t < big) {
    bgFlat(ctx, t);
    ctx.save(); ctx.translate(960, 560); ctx.scale(4, 4);
    shape(ctx, [[-30, -60], [30, -60], [26, -14], [70, -18], [70, 18], [26, 14], [30, 60], [-30, 60], [-26, 14], [-70, 18], [-70, -18], [-26, -14]], '#c9ced6', 2);
    skullIcon(ctx, 0, 0, 0.45);
    ctx.restore();
    sticker(ctx, 'КРЕСТ ТЕРМИНАТУС', 960, 110, { size: 56, scale: pop(t, 0.1) });
    if (t > at(s, 241)) sticker(ctx, 'ЧАСТИЦА БРОНИ ИМПЕРАТОРА', 960, 960, { size: 48, bg: '#fff', scale: pop(t, at(s, 241)) });
  } else {
    bgSpace(ctx, t, { nebula: 'rgba(255,200,80,0.25)' });
    ctx.save(); ctx.translate(960, 1250); ctx.scale(2.1, 2.1);
    drawRig(ctx, rig('marine', { weapon: 'none' }), 0, 0, 1, {}, pal('ultra', { armor: '#f2c230', armorDark: '#c9a24a', trim: '#fff3c4', rim: '#fff3c4', helm: '#f2c230' }));
    ctx.restore();
    // missing chunks
    const r = rng(5);
    for (let i = 0; i < 40; i++) {
      if (t < big + i * 0.04) continue;
      const x = 560 + r() * 800, y = 120 + r() * 900;
      shape(ctx, [[x - 18, y - 22], [x + 20, y - 18], [x + 16, y + 20], [x - 20, y + 16]], '#0b0b1e', 3);
    }
    sticker(ctx, 'ОЧЕНЬ БОЛЬШАЯ БРОНЯ', 960, 110, { size: 56, scale: pop(t, big + 0.2) });
  }
});

// ---- 5.4 the Banner returns. It waited. So did you.
shot(cue(245), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, 560, 1);
  bgUltramarCity(ctx, t);
  banner(ctx, kf(t, [[0, -300], [3, 960]]), 140, 1.2, t);
  for (let i = 0; i < 6; i++) {
    const x = 160 + i * 320;
    if (i === 4) drawRig(ctx, TERM(), x, 1040, 0.4, idlePose(t), VET_PAL);
    else marine(ctx, x, 1040, 0.42, idlePose(t, i), { weapon: 'bolter' }, brother(1, { helm: '#f4f4f4' }));
  }
  ctx.restore();
  if (t > at(s, 247)) sticker(ctx, 'ЗНАМЯ ДОЖДАЛОСЬ', 500, 620, { size: 50, scale: pop(t, at(s, 247)) });
  if (t > at(s, 248)) { youArrow(ctx, 160 + 4 * 320, 760, t); sticker(ctx, 'ТЫ ТОЖЕ', 1600, 620, { size: 50, bg: '#fff', scale: pop(t, at(s, 248)) }); }
});

// ---- 5.5 centuries as a montage; your line grows into a paragraph
shot(cue(249), (ctx, s) => {
  const t = s.lt;
  bgStoneRoom(ctx, t, { windows: false, wall: '#5a4a3a', floor: '#4a3a2a' });
  rect(ctx, 400, 160, 1120, 760, C.paper, 10, 8);
  ctx.strokeStyle = '#c9b88a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(960, 170); ctx.lineTo(960, 910); ctx.stroke();
  ctx.fillStyle = '#b0a080';
  for (let i = 0; i < 12; i++) ctx.fillRect(450, 220 + i * 50, 440, 12);
  const lines = Math.floor(kf(t, [[0.5, 1], [4.5, 11]]));
  ctx.fillStyle = '#2d5bd1';
  for (let i = 0; i < lines; i++) ctx.fillRect(1010, 220 + i * 50, i === lines - 1 ? 300 : 460, 14);
  outlinedText(ctx, `+${Math.floor(clamp(t / 5) * 4) * 100} ЛЕТ`, 1650, 140, 70, { color: C.gold });
  sticker(ctx, 'ВЕКА ИДУТ МОНТАЖОМ', 700, 110, { size: 50, scale: pop(t, 0.1) });
  if (t > at(s, 251)) sticker(ctx, 'ТВОЙ АБЗАЦ', 1240, 960, { size: 46, scale: pop(t, at(s, 251)) });
});

// ---- 5.6 the galaxy is torn in half: the Great Rift
shot(cue(252), (ctx, s) => {
  const t = s.lt;
  bgSpace(ctx, t);
  ctx.save(); ctx.translate(960, 540); ctx.rotate(t * 0.05);
  for (let i = 0; i < 900; i++) {
    const a = i * 0.08, r = 6 + i * 0.6;
    ctx.fillStyle = i % 3 ? 'rgba(200,210,255,0.7)' : 'rgba(255,230,180,0.8)';
    for (const arm of [0, Math.PI]) ctx.fillRect(Math.cos(a + arm) * r, Math.sin(a + arm) * r * 0.55, 4, 4);
  }
  ctx.restore();
  const p = clamp((t - 0.5) / 2);
  ctx.save(); ctx.translate(960, 540); ctx.rotate(-0.5);
  ctx.shadowColor = '#c040ff'; ctx.shadowBlur = 40;
  ctx.fillStyle = '#9a30e0'; ctx.strokeStyle = INK; ctx.lineWidth = 6;
  ctx.beginPath();
  const L = 900 * p;
  ctx.moveTo(-L, 0);
  for (let x = -L; x <= L; x += 60) ctx.lineTo(x, -16 - (Math.sin(x * 0.05) + 1) * 24 * p);
  for (let x = L; x >= -L; x -= 60) ctx.lineTo(x, 16 + (Math.cos(x * 0.04) + 1) * 24 * p);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
  sticker(ctx, 'ВЕЛИКИЙ РАЗЛОМ', 960, 110, { size: 64, bg: '#9a30e0', color: '#fff', scale: pop(t, at(s, 253)) });
});

// ---- 5.7 Hera besieged; Cawl arrives and says he can bring Guilliman back
shot(cue(254), (ctx, s) => {
  const t = s.lt;
  const cawlT = at(s, 255) - 0.1;
  ctx.save(); camera(ctx, 960, 580, 1);
  bgStoneRoom(ctx, t, { banners: true, windowColor: '#d06040' });
  if (t < cawlT) {
    for (let i = 0; i < 5; i++) marine(ctx, 300 + i * 340, 1020, 0.5, { ...walkPose(t + i, 0.6, 0.25) }, { weapon: 'bolter', horns: true }, CHAOS);
  } else {
    drawRig(ctx, rig('cawl'), 1250, 1040, 0.85, { ...idlePose(t), time: t }, CAWL_PAL);
    drawRig(ctx, TERM(), 520, 1040, 0.6, idlePose(t), VET_PAL);
  }
  ctx.restore();
  if (t < cawlT) sticker(ctx, 'КРЕПОСТЬ ГЕРЫ В ОСАДЕ', 960, 110, { size: 56, bg: '#d8402f', color: '#fff', scale: pop(t, 0.2) });
  else {
    sticker(ctx, 'ВЕЛИЗАРИЙ КОУЛ', 1250, 110, { size: 54, scale: pop(t, at(s, 257) - 0.2) });
    if (t > cawlT + 0.3) outlinedText(ctx, 'СЛИШКОМ МНОГО РУК', 1250, 230, 44, { color: '#fff' });
    if (t > at(s, 258)) bubble(ctx, 'МОГУ ВЕРНУТЬ\nЖИЛИМАНА', 700, 300, 1100, 380, { size: 46, scale: pop(t, at(s, 258)) });
  }
});

// ---- 5.8 ten thousand years the primarch sits in stasis
shot(cue(259), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, kf(t, [[0, 420], [3, 560]]), kf(t, [[0, 1.4], [3, 1]]));
  bgHall(ctx, t, { throne: { stasis: true } });
  marine(ctx, 960, 760, 0.95, { bob: 0 }, GUILLIMAN, pal(GUILLIMAN_PAL, {}));
  ctx.restore();
  tint(ctx, '#80d0ff', 0.12);
  sticker(ctx, '10 000 ЛЕТ В СТАЗИСЕ', 960, 960, { size: 56, bg: '#fff', scale: pop(t, 0.3) });
});

// ---- 5.9 you hold the doors; traitors shoot like you, they learned the same
shot(cue(261), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, 580, 1.02, 5, t);
  bgHall(ctx, t, { doors: true });
  for (let i = 0; i < 4; i++) {
    const cyc = (t * 0.35 + i * 0.27) % 1;
    marine(ctx, lerp(960, 1500 + i * 120, cyc), 1020, lerp(0.25, 0.55, cyc), walkPose(t + i, 1, 0.3), { weapon: 'bolter', horns: true }, CHAOS);
    tracer(ctx, lerp(960, 1500 + i * 120, cyc) - 60, 800, 500, 700, t + i * 0.3, 2.5, '#ff5a3a');
  }
  for (let i = 0; i < 2; i++) {
    const x = 260 + i * 330;
    drawRig(ctx, TERM(), x, 1060, 0.6, { ...idlePose(t, i), flip: false }, VET_PAL);
    muzzleFlash(ctx, x - 165, 1060 - 160, 0.6, t + i * 0.2);
    tracer(ctx, x - 100, 900, 1500, 700, t + i * 0.4, 2.5);
  }
  youArrow(ctx, 590, 620, t);
  ctx.restore();
  sticker(ctx, 'ДЕРЖИМ ЗАЛ', 960, 110, { size: 56, scale: pop(t, 0.1) });
  if (t > at(s, 265)) sticker(ctx, 'СТРЕЛЯЮТ ТАК ЖЕ, КАК ТЫ', 960, 230, { size: 46, bg: '#fff', scale: pop(t, at(s, 265)) });
  if (t > at(s, 267)) { book(ctx, 1650, 380, 0.35, 'КОДЕКС'); for (let i = 0; i < 3; i++) drawFire(ctx, 1600 + i * 50, 500, 0.5, t, { fire1: '#e8462a', fire2: '#ffa22a', fire3: '#fff07a' }); }
});

function drawFire(ctx, x, y, s, t, pal_) {
  for (const [color, k] of [[pal_.fire1, 1], [pal_.fire2, 0.7], [pal_.fire3, 0.4]]) {
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.moveTo(x - 70 * s * k, y);
    for (let i = 0; i <= 6; i++) ctx.lineTo(x - 70 * s * k + (140 * s * k * i) / 6, y - (i % 2 ? 160 : 70) * s * k * (0.85 + 0.15 * Math.sin(t * 9 + i * 2 + x)));
    ctx.lineTo(x + 70 * s * k, y); ctx.fill();
  }
}

// ---- 5.10 silence behind you. The throne is empty. Straight to the reports.
shot(cue(269), (ctx, s) => {
  const t = s.lt;
  const empty = at(s, 271) - 0.1, stand = at(s, 272), table = at(s, 274) - 0.2;
  if (t < table) {
    ctx.save(); camera(ctx, 960, 560, t < empty ? 1.1 : 1);
    bgHall(ctx, t, { throne: { stasis: t < empty } });
    if (t < empty) marine(ctx, 960, 760, 0.95, {}, GUILLIMAN, GUILLIMAN_PAL);
    if (t > stand) marine(ctx, 1300, 1060, 1.45, { ...idlePose(t), expr: 'neutral' }, GUILLIMAN, GUILLIMAN_PAL);
    drawRig(ctx, TERM(), 450, 1060, 0.6, { ...idlePose(t), flip: t > at(s, 270) }, VET_PAL);
    ctx.restore();
    if (t < at(s, 270)) outlinedText(ctx, 'тихо...', 960, 160, 70, { color: '#fff' });
    if (t > empty && t < stand + 0.5) sticker(ctx, 'ТРОН ПУСТ', 960, 140, { size: 66, bg: '#fff', scale: pop(t, empty) });
    if (t > stand + 0.5) sticker(ctx, 'ПРИМАРХ', 1300, 120, { size: 60, scale: pop(t, stand + 0.5) });
  } else {
    bgCouncil(ctx, t);
    rect(ctx, 300, 760, 1320, 70, '#7a4a2a', 10, 6);
    paper(ctx, 960, 690, 700, 160, '', [], { rot: 0.01 });
    marine(ctx, 960, 1000, 0.95, { ...idlePose(t), expr: 'neutral', look: 0 }, GUILLIMAN, GUILLIMAN_PAL);
    for (let i = 0; i < 4; i++) paper(ctx, 420 + i * 90, 700 - i * 12, 180, 120, '', [], { rot: -0.1 + i * 0.05 });
    if (t > at(s, 276)) {
      bubble(ctx, 'ГДЕ Я?', 500, 300, 820, 420, { size: 44, scale: pop(t, at(s, 276)) });
      crossOut(ctx, 500, 300, 240, 120, t, at(s, 276) + 0.4);
      bubble(ctx, 'СКОЛЬКО СЕЙЧАС?', 1450, 300, 1100, 420, { size: 44, scale: pop(t, at(s, 276) + 0.8) });
      crossOut(ctx, 1450, 300, 400, 120, t, at(s, 276) + 1.2);
    }
    if (t > at(s, 277)) sticker(ctx, 'СРАЗУ К ОТЧЁТАМ', 960, 110, { size: 60, scale: pop(t, at(s, 277)) });
  }
});

// ---- 5.11 Primaris: a head taller, looking at you like the last century
shot(cue(278), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, 560, 1);
  bgStoneRoom(ctx, t, { banners: true });
  marine(ctx, 560, 1040, 0.7, { ...idlePose(t), expr: 'sad', look: 1 }, { weapon: 'none', helmet: 'off', hair: 'short', scar: true }, pal(VET_PAL, { hair: '#c8c8c8' }));
  for (let i = 0; i < 3; i++) marine(ctx, 1050 + i * 300, 1040, 0.88, { ...idlePose(t, i), flip: true }, { weapon: 'bolter' }, pal('ultra', { rim: '#f2c230' }));
  ctx.restore();
  sticker(ctx, 'ПРИМАРИС', 1350, 110, { size: 60, scale: pop(t, 0.2) });
  if (t > at(s, 280)) { ctx.strokeStyle = C.gold; ctx.lineWidth = 8; ctx.setLineDash([20, 14]); ctx.beginPath(); ctx.moveTo(380, 1040 - 600 * 0.7); ctx.lineTo(1800, 1040 - 600 * 0.7); ctx.moveTo(900, 1040 - 600 * 0.88); ctx.lineTo(1800, 1040 - 600 * 0.88); ctx.stroke(); ctx.setLineDash([]); outlinedText(ctx, '+ ГОЛОВА', 1750, 1040 - 600 * 0.79, 40, { color: C.gold }); }
  if (t > at(s, 282)) bubble(ctx, 'А НУЖЕН ЛИ Я?', 560, 220, 560, 330, { think: true, size: 48, scale: pop(t, at(s, 282)) });
});
