// Level 2: Неофит (143 - 262 s)

const TEEN = { hair: 'buzz' };
const TEEN_PAL = pal(HUMAN_PAL.kid, { shirt: '#7a8090', pants: '#4a4e5a', hair: '#3b2a1e' });
const SCOUT = { outfit: 'scout', hair: 'buzz', cloak: true };

shot(cue(73), (ctx, s) => levelCard(ctx, 2, s.lt));

// ---- 2.1 a neophyte gets built on top of
shot(cue(76), (ctx, s) => {
  const t = s.lt;
  bgMed(ctx, t);
  rect(ctx, 600, 980, 720, 40, '#7d8796', 6, 6);
  for (const x of [640, 1240]) rect(ctx, x, 300, 40, 690, '#7d8796', 6, 6);
  rect(ctx, 600, 280, 720, 40, '#7d8796', 6, 6);
  human(ctx, 960, 980, 1.05, { ...idlePose(t), expr: 'shock' }, TEEN, TEEN_PAL);
  // crane arm lowering parts
  const y = kf(t, [[0, 120], [1.4, 420]]);
  ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(1150, 300); ctx.lineTo(1150, y); ctx.stroke();
  heartIcon(ctx, 1150, y + 40, 1.0);
  if (t > 1.5) for (let i = 0; i < 6; i++) { const a = t * 20 + i; ctx.fillStyle = '#ffe06a'; ctx.fillRect(1150 + Math.cos(a) * 60, y + 40 + Math.sin(a * 1.3) * 60, 8, 8); }
  sticker(ctx, 'ДОСТРАИВАЮТ', 960, 140, { size: 70, scale: pop(t, 0.2) });
});

// ---- 2.2 the oath, "and after it"
shot(cue(77), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, 560, kf(t, [[0, 1], [9, 1.1]]));
  bgStoneRoom(ctx, t, { banners: true });
  human(ctx, 960, 1000, 1.05, { ...idlePose(t), legL: -0.9, legR: 0, bob: 50, expr: t > at(s, 80) ? 'shock' : 'grit', armR: -0.3 }, TEEN, TEEN_PAL);
  ctx.restore();
  sticker(ctx, 'КЛЯТВА', 960, 120, { size: 66, scale: pop(t, 0.1) });
  outlinedText(ctx, 'ДО ПОСЛЕДНЕГО ВЗДОХА', 960, 260, 60 * pop(t, 0.8), { color: '#fff' });
  outlinedText(ctx, 'И ПОСЛЕ НЕГО', 960, 340, 60 * pop(t, at(s, 78) - 0.1), { color: C.gold });
  if (t > at(s, 80)) {
    ['?', '?', '?'].forEach((q, i) => outlinedText(ctx, q, 860 + i * 100, 560 + Math.sin(t * 5 + i) * 12, 110 * pop(t, at(s, 80) + i * 0.15), { color: C.gold }));
    sticker(ctx, 'НИКТО НЕ ОБЪЯСНЯЕТ', 1500, 900, { size: 44, bg: '#fff', scale: pop(t, at(s, 81)) });
  }
});

// ---- 2.3 duke's son and mushroom farmer's son in one barracks
shot(cue(82), (ctx, s) => {
  const t = s.lt;
  bgStoneRoom(ctx, t, { wall: '#8a8090', floor: '#6a6070' });
  for (const x of [520, 1400]) { rect(ctx, x - 230, 880, 460, 70, '#9a7a5a', 10, 6); rect(ctx, x - 230, 840, 460, 50, '#e8e2d0', 10, 6); }
  const bruise = t > at(s, 87) - 0.1;
  human(ctx, 520, 860, 0.95, { ...idlePose(t), expr: bruise ? 'sad' : 'neutral', bruise }, { hair: 'short', crown: true }, pal(TEEN_PAL, { hair: '#e0b040' }));
  human(ctx, 1400, 860, 0.95, { ...idlePose(t, 1), expr: bruise ? 'sad' : 'happy', bruise }, { hair: 'buzz', mushroomHat: true }, pal(TEEN_PAL, { mush: '#b07ad8' }));
  sticker(ctx, 'СЫН ГЕРЦОГА', 520, 180, { size: 46, scale: pop(t, at(s, 84)) });
  sticker(ctx, 'СЫН ГРИБНИКА (ТЫ)', 1400, 180, { size: 46, bg: '#fff', scale: pop(t, at(s, 84) + 1.0) });
  if (t > at(s, 85)) outlinedText(ctx, '=', 960, 560, 200 * pop(t, at(s, 85)), { color: C.gold });
  sticker(ctx, 'ПРОИСХОЖДЕНИЕ НЕ ВАЖНО', 960, 70, { size: 44, scale: pop(t, 0.2) });
  stamp(ctx, 'В СИНЯКАХ', 960, 960, t, at(s, 87), { size: 72 });
});

// ---- 2.4 upgrades by age: second heart, fused ribs, ceramic diet, half-brain sleep
shot(cue(88), (ctx, s) => {
  const t = s.lt;
  bgFlat(ctx, t, '#173a4a', '#1a4254');
  // x-ray body
  ctx.save(); ctx.globalAlpha = 0.9;
  human(ctx, 520, 1000, 1.5, { ...idlePose(t) }, TEEN, { skin: '#9fd8ff', shirt: '#9fd8ff', pants: '#9fd8ff', boots: '#9fd8ff', belt: '#9fd8ff', hair: '#6ab0e0' });
  ctx.restore();
  const stages = [[at(s, 88), '12 ЛЕТ', 'ВТОРОЕ СЕРДЦЕ'], [at(s, 89), '14 ЛЕТ', 'РЁБРА В ПЛАСТИНУ'], [at(s, 91), '', 'БРОНЕЖИЛЕТОМ КОРМЯТ'], [at(s, 93), '16 ЛЕТ', '4 ЧАСА СНА']];
  let cur = 0;
  stages.forEach((st, i) => { if (t > st[0] - 0.2) cur = i; });
  // organs on the x-ray
  heartIcon(ctx, 470, 620, 0.8);
  if (t > stages[0][0]) heartIcon(ctx, 580, 620, 0.8 * pop(t, stages[0][0]), '#ff7a3a');
  const ribP = clamp((t - stages[1][0] - 0.5) / 0.8);
  for (let i = 0; i < 5; i++) { ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(430, 560 + i * 30); ctx.lineTo(620, 560 + i * 30); ctx.stroke(); }
  if (ribP > 0) { ctx.globalAlpha = ribP; rect(ctx, 425, 548, 200, 140, '#c9ced6', 10, 6); ctx.globalAlpha = 1; }
  // right panel
  const [, age, label] = stages[cur];
  if (age) outlinedText(ctx, age, 1350, 230, 110 * pop(t, stages[cur][0] - 0.2), { color: C.gold });
  outlinedText(ctx, label, 1350, 380, 60 * pop(t, stages[cur][0] - 0.1));
  if (cur === 2) {
    // bowl of ceramite plates
    const p = P(); p.ellipse(1350, 640, 220, 120, 0, 0, Math.PI); p.closePath();
    strokeFill(ctx, p, '#f4ead2', 7);
    for (let i = 0; i < 5; i++) rect(ctx, 1190 + i * 64, 590 - (i % 2) * 20, 56, 40, '#2d5bd1', 6, 4);
  }
  if (cur === 3) {
    // brain switching sections off like night shift workshops
    for (let i = 0; i < 6; i++) {
      const on = Math.floor(t * 2 + i) % 3 !== 0;
      rect(ctx, 1150 + (i % 3) * 140, 560 + Math.floor(i / 3) * 120, 120, 100, on ? '#ffd96a' : '#3a3a4a', 14, 6);
    }
    outlinedText(ctx, 'ЦЕХА В НОЧНУЮ СМЕНУ', 1350, 860, 44);
  }
});

// ---- 2.5 scout, 10th company, no badge; grey sergeant without half an ear
shot(cue(96), (ctx, s) => {
  const t = s.lt;
  const hide = at(s, 99) + 0.6;
  ctx.save(); camera(ctx, 960, 560, 1);
  bgWild(ctx, t);
  // bush
  shadow(ctx, 760, 990, 80);
  human(ctx, 1350, 990, 1.0, { ...idlePose(t, 2), expr: t > at(s, 98) ? 'talk' : 'neutral', time: t, flip: true }, { outfit: 'scout', hair: 'short', earless: true, scar: true }, HUMAN_PAL.sergeantScout);
  ctx.save(); ctx.globalAlpha = 1 - clamp((t - hide) / 1.0) * 0.85;
  human(ctx, 760, 990, 0.95, { ...idlePose(t), expr: 'grit' }, SCOUT, HUMAN_PAL.scout);
  ctx.restore();
  for (let i = 0; i < 5; i++) circ(ctx, 600 + i * 80, 960 - (i % 2) * 40, 70, '#4a7a3a', 6);
  // blank badge
  if (t > at(s, 97)) { rect(ctx, 790, 620, 70, 44, '#fff', 6, 4); }
  ctx.restore();
  sticker(ctx, 'СКАУТ · 10 РОТА', 760, 120, { size: 54, scale: pop(t, 0.1) });
  sticker(ctx, 'СТАЖЁР БЕЗ БЕЙДЖИКА', 600, 260, { size: 40, bg: '#fff', scale: pop(t, at(s, 97)) });
  sticker(ctx, 'СЕРЖАНТ СКАУТОВ', 1400, 300, { size: 40, scale: pop(t, at(s, 98)) });
  if (t > hide - 0.6) bubble(ctx, 'ТЕБЯ НЕ ДОЛЖНО\nБЫТЬ ВИДНО', 1400, 430, 1350, 560, { size: 40, scale: pop(t, hide - 0.6) });
});

// ---- 2.6 the breach: orks broke in ten thousand years ago
shot(cue(101), (ctx, s) => {
  const t = s.lt;
  const flash = at(s, 103) - 0.1;
  bgSnow(ctx, t);
  rect(ctx, -100, 200, 2100, 600, '#8a8070', 6, 8);
  for (let y = 260; y < 800; y += 70) { ctx.strokeStyle = '#6a6050'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-100, y); ctx.lineTo(2000, y); ctx.stroke(); }
  // the hole
  const hole = poly([[820, 800], [780, 560], [860, 420], [980, 380], [1100, 450], [1150, 600], [1120, 800]]);
  strokeFill(ctx, hole, '#2a2a33', 7);
  if (t > flash) {
    tint(ctx, '#c08a40', 0.15);
    for (let i = 0; i < 3; i++) {
      const p = clamp((t - flash - i * 0.3) / 1.2);
      drawRig(ctx, rig('ork'), lerp(960, 500 + i * 500, p), 1000, 0.6, { ...walkPose(t + i, 1.6, 0.5), armL: -1.2 }, ORK_PAL);
    }
    dreamFrame(ctx, '#fff', '10 000 ЛЕТ НАЗАД');
    sticker(ctx, 'ОРКИ', 1500, 160, { size: 60, bg: '#5aa83a', scale: pop(t, flash + 0.3) });
  } else {
    sticker(ctx, 'ПРОЛОМ В СТЕНЕ', 960, 120, { size: 60, scale: pop(t, 0.2) });
  }
});

// ---- 2.7 Guilliman throws them out and forbids repairs
shot(cue(105), (ctx, s) => {
  const t = s.lt;
  bgSnow(ctx, t);
  rect(ctx, -100, 200, 2100, 600, '#8a8070', 6, 8);
  strokeFill(ctx, poly([[820, 800], [780, 560], [860, 420], [980, 380], [1100, 450], [1150, 600], [1120, 800]]), '#2a2a33', 7);
  const punch = 0.9;
  for (let i = 0; i < 3; i++) {
    const p = clamp((t - punch - i * 0.15) / 1.3);
    drawRig(ctx, rig('ork'), lerp(1150 + i * 80, 2300, p), lerp(1000, -200, p * p) + i * 40, 0.55, { lean: p * 6, armL: -2 }, ORK_PAL);
  }
  marine(ctx, 600, 1040, 1.15, { ...idlePose(t), armR: t > punch && t < punch + 0.5 ? -1.6 : -0.2, expr: 'angry' }, { weapon: 'none', helmet: 'off', laurel: true, cape: true }, pal('ultra', { hair: '#c8a060' }));
  sticker(ctx, 'ЖИЛИМАН', 600, 230, { size: 60, scale: pop(t, 0.3) });
  if (t > at(s, 106)) { rect(ctx, 1250, 560, 520, 180, '#f4ead2', 8, 6); ctx.fillStyle = C.red; ctx.font = font(52); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('НЕ ЗАДЕЛЫВАТЬ!', 1510, 650); }
  tint(ctx, '#c08a40', 0.15);
  dreamFrame(ctx, '#fff', '10 000 ЛЕТ НАЗАД');
});

// ---- 2.8 the most guarded unrepaired wall in the galaxy
shot(cue(107), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, 560, 1.05);
  bgSnow(ctx, t);
  rect(ctx, -100, 200, 2100, 600, '#8a8070', 6, 8);
  strokeFill(ctx, poly([[820, 800], [780, 560], [860, 420], [980, 380], [1100, 450], [1150, 600], [1120, 800]]), '#2a2a33', 7);
  // rope barrier and guards
  for (let i = 0; i < 4; i++) rect(ctx, 700 + i * 170, 860, 20, 120, '#c9a24a', 6, 4);
  ctx.strokeStyle = '#b3262a'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(710, 880); for (let i = 1; i < 4; i++) ctx.quadraticCurveTo(710 + i * 170 - 85, 930, 710 + i * 170, 880); ctx.stroke();
  marine(ctx, 560, 1000, 0.55, idlePose(t), { weapon: 'bolter' }); marine(ctx, 1360, 1000, 0.55, idlePose(t, 1), { weapon: 'bolter' });
  const nod = t > at(s, 111) && t < at(s, 111) + 0.6 ? Math.sin((t - at(s, 111)) * 20) * 0.15 : 0;
  human(ctx, 860, 1060, 0.85, { ...idlePose(t), head: nod, expr: 'neutral', flip: true }, SCOUT, HUMAN_PAL.scout);
  human(ctx, 1100, 1060, 0.9, { ...idlePose(t, 2), expr: t > at(s, 110) && t < at(s, 111) ? 'talk' : 'neutral', time: t }, { outfit: 'scout', hair: 'short', earless: true, scar: true }, HUMAN_PAL.sergeantScout);
  ctx.restore();
  sticker(ctx, 'САМЫЙ ОХРАНЯЕМЫЙ НЕДОРЕМОНТ', 960, 110, { size: 50, scale: pop(t, 0.3) });
  if (t > at(s, 110) - 0.2 && t < at(s, 112)) bubble(ctx, 'СТЕНУ МОЖНО ПРОБИТЬ', 1300, 330, 1150, 520, { size: 46, scale: pop(t, at(s, 110) - 0.2) });
  if (t > at(s, 112)) outlinedText(ctx, '...', 960, 300, 140 * pop(t, at(s, 112)), { color: '#fff' });
});

// ---- 2.9 scouts still pity people
shot(cue(113), (ctx, s) => {
  const t = s.lt;
  const ear = at(s, 115) - 0.2;
  bgWild(ctx, t, { night: t > ear ? 1 : 0 });
  if (t < ear) {
    for (let i = 0; i < 4; i++) human(ctx, 1000 + i * 190, 1000, 0.85, { ...idlePose(t, i), expr: 'sad' }, { hair: ['short', 'bun', 'long', 'buzz'][i], kid: i === 3 }, pal(HUMAN_PAL.serf, { shirt: ['#7a6a5a', '#6a5a6a', '#5a6a6a', '#8a7a5a'][i] }));
    human(ctx, 700, 1000, 0.95, { ...idlePose(t), expr: 'sad', armR: -1.3 }, SCOUT, HUMAN_PAL.scout);
    bread(ctx, 870, 680, 0.6);
    sticker(ctx, 'БЕЖЕНЦЫ', 1300, 200, { size: 50, bg: '#fff', scale: pop(t, at(s, 114)) });
    heartIcon(ctx, 700, 520, pop(t, 0.6));
  } else {
    human(ctx, 1200, 1000, 1.0, { ...idlePose(t), expr: 'sad', armL: 2.6 + Math.sin(t * 6) * 0.1, flip: true }, { outfit: 'scout', hair: 'short', earless: true, scar: true }, HUMAN_PAL.sergeantScout);
    human(ctx, 600, 1000, 0.95, { ...idlePose(t), expr: 'sad', look: 1 }, SCOUT, HUMAN_PAL.scout);
    heartIcon(ctx, 600, 520, pop(t, ear + 0.4));
  }
  sticker(ctx, 'СКАУТЫ ЕЩЁ УМЕЮТ ЖАЛЕТЬ', 960, 100, { size: 50, scale: pop(t, 0.1) });
});

// ---- 2.10 the obstacle course: the servitor still runs fastest
shot(cue(117), (ctx, s) => {
  const t = s.lt;
  const close = at(s, 121) - 0.1;
  if (t < close) {
    ctx.save(); camera(ctx, 960, 560, 1);
    bgArena(ctx, t);
    for (let i = 0; i < 4; i++) rect(ctx, 200 + i * 450, 930, 40, 80, '#c9a24a', 6, 5);
    const lead = ((t * 260) % 2600) - 400;
    human(ctx, lead, 1010, 0.8, walkPose(t, 2.2, 0.6), { outfit: 'servitor', hair: 'bald', kid: true }, HUMAN_PAL.servitor);
    for (let i = 0; i < 5; i++) human(ctx, lead - 220 - i * 130, 1010, 0.6, { ...walkPose(t + i * 0.3, 2.2, 0.6), expr: 'grit' }, { kid: true, hair: ['short', 'spiky', 'bun', 'long', 'short'][i] }, pal(HUMAN_PAL.kid, { shirt: ['#6f8fb8', '#c0392b', '#8fbf6a', '#d9a03a', '#8a7a6a'][i] }));
    human(ctx, 1700, 1010, 0.9, idlePose(t), SCOUT, HUMAN_PAL.scout);
    youArrow(ctx, 1700, 620, t);
    ctx.restore();
    sticker(ctx, 'НОВЫЙ НАБОР', 400, 120, { size: 56, scale: pop(t, 0.2) });
    sticker(ctx, 'ТЫ В ОЦЕПЛЕНИИ', 1500, 120, { size: 46, bg: '#fff', scale: pop(t, at(s, 118)) });
  } else {
    bgFlat(ctx, t, '#3a3a4a', '#34344a');
    human(ctx, 1300, 1060, 1.5, walkPose(t, 1.2, 0.5), { outfit: 'servitor', hair: 'bald', kid: true }, HUMAN_PAL.servitor);
    human(ctx, 500, 1060, 1.3, { ...idlePose(t), expr: 'shock', look: 1 }, SCOUT, HUMAN_PAL.scout);
    sticker(ctx, 'ТЫ УЗНАЁШЬ ЕГО ПО ПОХОДКЕ', 960, 120, { size: 50, bg: '#fff', scale: pop(t, close + 0.2) });
    if (t > at(s, 122)) sticker(ctx, 'ВСЁ ЕЩЁ БЫСТРЕЕ ВСЕХ', 1300, 260, { size: 44, scale: pop(t, at(s, 122)) });
    tint(ctx, '#1a1a3a', 0.15);
  }
});

// ---- 2.11 last implant: the black carapace
shot(cue(123), (ctx, s) => {
  const t = s.lt;
  bgMed(ctx, t);
  human(ctx, 700, 1000, 1.2, { ...idlePose(t), expr: 'grit' }, TEEN, TEEN_PAL);
  const ins = kf(t, [[0.6, -300], [1.6, 640]], ease.out);
  rect(ctx, 610, ins, 180, 200, '#15131a', 18, 6);
  sticker(ctx, 'ЧЁРНЫЙ ПАНЦИРЬ', 700, 120, { size: 56, scale: pop(t, 0.2) });
  if (t > at(s, 124)) {
    // nerves to armour
    const p = clamp((t - at(s, 124)) / 1.2);
    ctx.strokeStyle = '#7fd3ff'; ctx.lineWidth = 8; ctx.shadowColor = '#7fd3ff'; ctx.shadowBlur = 20;
    for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(790, 560 + i * 40); ctx.bezierCurveTo(1000, 520 + i * 40, 1100, 600 + i * 30, lerp(790, 1300, p), 600 + i * 30); ctx.stroke(); }
    ctx.shadowBlur = 0;
    marine(ctx, 1450, 1000, 0.75, idlePose(t), { weapon: 'none' });
    outlinedText(ctx, 'БРОНЯ = НЕРВЫ', 1450, 220, 56);
  }
});

// ---- 2.12 the memo forgot to mention
shot(cue(126), (ctx, s) => {
  const t = s.lt;
  bgFlat(ctx, t);
  paper(ctx, 960, 560, 1100, 760, 'ПАМЯТКА НЕОФИТА', ['1. Чти братьев, Орден и Императора', '2. Два сердца лучше одного', '3. Спи половиной мозга', '4. Не промокай без приказа'], { lineSize: 44 });
  redNote(ctx, '5. Полноправные братья больше не жалеют', 470, 860, 50, t, at(s, 127));
});

// ---- 2.13 you walk past the servitor and feel nothing
shot(cue(128), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, 580, 1);
  bgArena(ctx, t);
  human(ctx, 1400 - t * 60, 1010, 0.8, idlePose(t), { outfit: 'servitor', hair: 'bald', kid: true }, HUMAN_PAL.servitor);
  marine(ctx, 300 + t * 220, 1010, 0.75, { ...walkPose(t, 0.8, 0.3), expr: 'neutral' }, { weapon: 'none', helmet: 'off', hair: 'short' });
  ctx.restore();
  stamp(ctx, 'НИКАК', 960, 260, t, 1.4, { size: 90, color: '#555' });
  if (t > at(s, 130) - 0.1) {
    sticker(ctx, 'ЭТО ТОЖЕ ОРГАН', 1350, 520, { size: 50, scale: pop(t, at(s, 130) - 0.1) });
  }
});
