// Level 4: Сержант (377 - 466 s)

const SGT = { weapon: 'bolter' };
const sgtPal = (co = 5) => brother(co, { helm: '#d8402f' });

shot(cue(189), (ctx, s) => levelCard(ctx, 4, s.lt));

// ---- 4.1 responsible for nine, or at least their helmets
shot(cue(191), (ctx, s) => {
  const t = s.lt;
  const shelf = at(s, 193) - 0.1;
  if (t < shelf) {
    ctx.save(); camera(ctx, 960, 600, 1);
    bgWild(ctx, t);
    for (let i = 0; i < 9; i++) {
      const row = i < 5 ? 0 : 1;
      const x = row ? 520 + (i - 5) * 300 : 380 + i * 290;
      marine(ctx, x, row ? 860 : 1020, row ? 0.4 : 0.48, idlePose(t, i), { weapon: 'bolter' }, brother(5));
    }
    ctx.restore();
    outlinedText(ctx, '× 9', 1700, 200, 130 * pop(t, 0.4), { color: C.gold });
    sticker(ctx, 'ЧТОБЫ ВЕРНУЛИСЬ', 600, 140, { size: 54, scale: pop(t, at(s, 192)) });
  } else {
    bgStoneRoom(ctx, t, { windows: false, wall: '#6a6a80' });
    for (let r = 0; r < 2; r++) rect(ctx, 260, 460 + r * 300, 1400, 24, '#5a3a2a', 4, 5);
    for (let i = 0; i < 9; i++) {
      const r = i < 5 ? 0 : 1;
      const x = r ? 460 + (i - 5) * 330 : 360 + i * 300;
      helmetProp(ctx, x, (r ? 760 : 460) - 70, 0.9 * pop(t, shelf + i * 0.08), '#2d5bd1', { rot: 0 });
    }
    sticker(ctx, 'ИЛИ ХОТЯ БЫ ИХ ШЛЕМЫ', 960, 140, { size: 56, bg: '#fff', scale: pop(t, shelf + 0.3) });
  }
});

// ---- 4.2 your helmet is painted red
shot(cue(194), (ctx, s) => {
  const t = s.lt;
  bgFlat(ctx, t, '#5a2a2a', '#4e2424');
  helmetProp(ctx, 960, 560, 3, '#2d5bd1');
  const p = clamp((t - 0.3) / 1.4);
  ctx.save(); ctx.beginPath(); ctx.rect(800, 300, 320 * p, 520); ctx.clip();
  helmetProp(ctx, 960, 560, 3, '#d8402f');
  ctx.restore();
  // brush
  ctx.save(); ctx.translate(800 + 320 * p, 400 + Math.sin(t * 10) * 40); ctx.rotate(0.6);
  rect(ctx, -12, -220, 24, 200, '#a0704a', 6, 5); rect(ctx, -22, -30, 44, 60, '#d8402f', 8, 5);
  ctx.restore();
});

// ---- 4.3 flashback: the red helmet was a mark of censure
shot(cue(195), (ctx, s) => {
  const t = s.lt;
  bgStoneRoom(ctx, t, { banners: true });
  marine(ctx, 600, 1000, 0.75, { ...idlePose(t), expr: 'neutral' }, { weapon: 'none' }, pal('ultra', { helm: t > at(s, 196) + 0.3 ? '#d8402f' : '#2d5bd1' }));
  marine(ctx, 1400, 1000, 0.85, { ...idlePose(t, 2), expr: 'angry', armR: -0.4 }, { weapon: 'none', helmet: 'off', hair: 'short', cape: true }, pal('ultra', { hair: '#5a4030' }));
  if (t > at(s, 196)) {
    bubble(ctx, '', 520, 280, 600, 380, { think: true, w: 520, h: 260, scale: pop(t, at(s, 196)) });
    drawRig(ctx, rig('marine', { weapon: 'bolter' }), 430, 380, 0.17, {}, PAL.ultra, { flat: true, outlineW: 3 });
    outlinedText(ctx, 'VS', 520, 300, 46, { color: C.red });
    drawRig(ctx, rig('marine', { weapon: 'bolter' }), 610, 380, 0.17, { flip: true }, PAL.ultra, { flat: true, outlineW: 3 });
  }
  stamp(ctx, 'ПОРИЦАНИЕ', 1350, 260, t, at(s, 197) + 0.6, { size: 70 });
  tint(ctx, '#c08a40', 0.2);
  dreamFrame(ctx, '#fff', '10 000 ЛЕТ НАЗАД');
});

// ---- 4.4 then the Heresy, and he was right
shot(cue(199), (ctx, s) => {
  const t = s.lt;
  bgWild(ctx, t, { night: 1 });
  const turn = 0.6;
  for (let i = 0; i < 6; i++) {
    const bad = i % 2 === 1 && t > turn + i * 0.1;
    marine(ctx, 250 + i * 290, 1000, 0.5, { ...idlePose(t, i), flip: bad }, { weapon: 'bolter', horns: bad }, bad ? CHAOS : PAL.ultra);
  }
  sticker(ctx, 'ЕРЕСЬ', 960, 120, { size: 70, bg: '#d8402f', color: '#fff', scale: pop(t, 0.2) });
  if (t > at(s, 200)) { sticker(ctx, 'ДУМАЛ ПРАВИЛЬНО', 960, 260, { size: 50, bg: '#fff', scale: pop(t, at(s, 200)) }); checkMark(ctx, 1260, 260, 1, t, at(s, 200) + 0.3); }
});

// ---- 4.5 promoted and given the hat of the guilty
shot(cue(201), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, kf(t, [[0, 640], [2, 480]]), kf(t, [[0, 1], [2, 1.35]]));
  bgStoneRoom(ctx, t, { banners: true });
  marine(ctx, 960, 1000, 0.8, idlePose(t), SGT, sgtPal(5));
  ctx.restore();
  youArrow(ctx, 960, 200, t, 'СЕРЖАНТ');
  sticker(ctx, 'ГОЛОВНОЙ УБОР\nДЛЯ ПРОВИНИВШИХСЯ', 1480, 820, { size: 46, bg: '#fff', scale: pop(t, 1.2) });
});

// ---- 4.6 the 5th company goes far and fast; decades on a frigate
shot(cue(203), (ctx, s) => {
  const t = s.lt;
  bgSpace(ctx, t);
  ctx.save(); ctx.translate(-((t * 200) % 400), 0);
  for (let i = 0; i < 12; i++) { ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(i * 400, 200 + (i % 3) * 240, 160, 4); }
  ctx.restore();
  ship(ctx, 900, 540 + Math.sin(t) * 20, 1.1, '#2d5bd1', -1);
  sticker(ctx, '5 РОТА: ГДЕ ДАЛЕКО И НАДО БЫСТРО', 960, 120, { size: 48, scale: pop(t, 0.2) });
  if (t > at(s, 205)) {
    const yrs = 10 + Math.floor((t - at(s, 205)) * 8) * 10;
    outlinedText(ctx, `+${Math.min(yrs, 60)} ЛЕТ`, 1550, 900, 90, { color: C.gold });
    sticker(ctx, 'УЛЬТРАМАРИНОВ НА ГОРИЗОНТЕ: 0', 600, 900, { size: 40, bg: '#fff', scale: pop(t, at(s, 206)) });
  }
});

// ---- 4.7 the ship is home, barracks, canteen and graveyard
shot(cue(207), (ctx, s) => {
  const t = s.lt;
  bgSpace(ctx, t);
  rect(ctx, 160, 260, 1600, 560, '#9aa4b4', 40, 8);
  const rooms = [['ДОМ', '#e8e2d0'], ['КАЗАРМА', '#c9d4e0'], ['СТОЛОВАЯ', '#f2dca0'], ['КЛАДБИЩЕ', '#8a8a9a']];
  rooms.forEach(([n, c], i) => {
    const x = 210 + i * 385, sc = pop(t, 0.2 + i * 0.55);
    rect(ctx, x, 320, 350, 440, c, 12, 6);
    if (sc > 0.01) outlinedText(ctx, n, x + 175, 380, 40 * sc);
    if (i === 1) for (let j = 0; j < 2; j++) rect(ctx, x + 40, 520 + j * 110, 270, 50, '#7a6a5a', 8, 4);
    if (i === 2) { rect(ctx, x + 40, 620, 270, 30, '#7a4a2a', 4, 4); bread(ctx, x + 175, 600, 0.5); }
    if (i === 3) for (let j = 0; j < 3; j++) { rect(ctx, x + 50 + j * 95, 560, 60, 140, '#bdb5a6', 20, 4); }
    if (i === 0) marine(ctx, x + 175, 740, 0.38, idlePose(t), { weapon: 'none' }, sgtPal(5));
  });
});

// ---- 4.8 the Banner of Macragge waits for full strength
shot(cue(209), (ctx, s) => {
  const t = s.lt;
  bgStoneRoom(ctx, t, { windows: false, wall: '#5a5a7a' });
  rect(ctx, 610, 120, 700, 760, 'rgba(180,220,255,0.25)', 16, 8);
  banner(ctx, 960, 200, 1.4, t);
  ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(660, 200); ctx.lineTo(760, 160); ctx.stroke();
  sticker(ctx, 'ЗНАМЯ МАКРАГГА', 960, 70, { size: 54, scale: pop(t, 0.2) });
  sticker(ctx, 'ЖДЁТ УКОМПЛЕКТОВАНИЯ', 960, 960, { size: 54, bg: '#fff', scale: pop(t, at(s, 211)) });
});

// ---- 4.9 the space hulk; Calgar leads the 5th inside
shot(cue(212), (ctx, s) => {
  const t = s.lt;
  const go = at(s, 215) - 0.1;
  if (t < go) {
    ctx.save(); camera(ctx, 960, 540, kf(t, [[0, 0.9], [go, 1.1]]));
    bgSpace(ctx, t, { nebula: 'rgba(80,40,140,0.35)' });
    planet(ctx, 1650, 900, 280, '#5aa83a', '#3a8a3a', { seed: 9 });
    hulk(ctx, 820, 480, 1.1, t);
    ctx.restore();
    sticker(ctx, 'КОСМИЧЕСКИЙ СКИТАЛЕЦ', 960, 110, { size: 56, scale: pop(t, 0.2) });
    if (t > at(s, 213)) sticker(ctx, 'КОМ МЁРТВЫХ КОРАБЛЕЙ\nРАЗМЕРОМ С ГОРОД', 560, 900, { size: 42, bg: '#fff', scale: pop(t, at(s, 213)) });
  } else {
    bgHulk(ctx, t);
    rect(ctx, 1500, 300, 360, 560, '#05040a', 30, 8);
    const lt = t - go;
    marine(ctx, 400 + lt * 260, 1000, 0.75, { ...walkPose(lt, 0.8, 0.3), expr: 'angry' }, { weapon: 'none', helmet: 'off', hair: 'short', cape: true, scar: true }, pal('ultra', { hair: '#3a2a20', cape: '#2d5bd1' }));
    for (let i = 0; i < 4; i++) marine(ctx, 100 + lt * 260 - i * 230, 1000, 0.55, walkPose(lt + i * 0.3, 0.8, 0.3), { weapon: 'bolter' }, i === 1 ? sgtPal(5) : brother(5));
    sticker(ctx, 'МАГИСТР КАЛГАР', 600, 140, { size: 52, scale: pop(t, go + 0.2) });
  }
});

// ---- 4.10 inside: ships older than ships, floor is a wall, no map
shot(cue(217), (ctx, s) => {
  const t = s.lt;
  bgHulk(ctx, t, { tilt: Math.sin(t * 0.5) * 0.12 });
  // one marine walking on the ceiling
  marine(ctx, 400 + t * 120, 120, 0.45, { ...walkPose(t, 0.8, 0.3), sy: -1 }, { weapon: 'bolter' }, brother(5));
  marine(ctx, 1300 - t * 80, 1000, 0.55, walkPose(t, 0.8, 0.3), { weapon: 'bolter' }, sgtPal(5));
  if (t > at(s, 220)) sticker(ctx, 'ПОЛ СТОИТ СТЕНОЙ', 600, 520, { size: 48, scale: pop(t, at(s, 220)) });
  if (t > at(s, 221)) {
    paper(ctx, 1400, 420, 500, 420, 'КАРТА', [], { rot: 0.06 });
    outlinedText(ctx, '?', 1400, 470, 220 * pop(t, at(s, 221)), { color: C.red });
  }
  sticker(ctx, '+1000 ЛЕТ', 1500, 100, { size: 44, bg: '#fff', scale: pop(t, at(s, 218)) });
});

// ---- 4.11 hold the junction until the barrel glows
shot(cue(222), (ctx, s) => {
  const t = s.lt;
  const hot = clamp((t - 1) / 4);
  ctx.save(); camera(ctx, 960, 560, 1.05, 4, t);
  bgHulk(ctx, t);
  const foes = [['tyranid', TYRANID_PAL, 0.5], ['ork', ORK_PAL, 0.5], ['tyranid', TYRANID_PAL, 0.45], ['necron', NECRON_PAL, 0.5]];
  foes.forEach(([k, p, sc], i) => {
    const cyc = (t * 0.45 + i * 0.25) % 1;
    const x = lerp(2100, 1150, cyc);
    ctx.save(); ctx.globalAlpha = cyc > 0.9 ? (1 - cyc) * 10 : 1;
    drawRig(ctx, rig(k), x, 1000, sc, { ...walkPose(t + i, 1.2, 0.4), flip: k !== 'tyranid' }, p);
    ctx.restore();
    if (cyc > 0.88) explosion(ctx, x, 800, 0.6, (cyc - 0.88) * 10, i + 3);
  });
  const mx = 560, sc = 0.8;
  marine(ctx, mx, 1000, sc, { ...idlePose(t), hot }, SGT, sgtPal(5));
  const mz = rig('marine', SGT).muzzle;
  muzzleFlash(ctx, mx + mz[0] * sc + 30, 1000 + mz[1] * sc, 0.8, t);
  for (let i = 0; i < 4; i++) tracer(ctx, mx + mz[0] * sc + 30, 1000 + mz[1] * sc, 1900, 700 + i * 60, t + i * 0.2, 3);
  ctx.restore();
  sticker(ctx, 'ДЕРЖАТЬ РАЗВИЛКУ', 500, 110, { size: 54, scale: pop(t, 0.1) });
  if (t > at(s, 224)) { sticker(ctx, 'СУТКИ? ТРОЕ?', 1400, 110, { size: 48, bg: '#fff', scale: pop(t, at(s, 224)) }); }
  if (t > at(s, 225)) { clockFace(ctx, 1300, 330, 90, t, 30); outlinedText(ctx, 'УРРРЧ', 1600, 330, 60 * pop(t, at(s, 226)), { color: C.gold }); }
});

// ---- 4.12 out of a hundred, fifteen walk out; you carry eight helmets
shot(cue(228), (ctx, s) => {
  const t = s.lt;
  const carry = at(s, 230) - 0.2;
  if (t < carry) {
    bgFlat(ctx, t, '#2a2a3a', '#26263a');
    const n = Math.round(kf(t, [[0.2, 100], [1.6, 15]], ease.out));
    outlinedText(ctx, String(n), 960, 480, 300, { color: n > 15 ? '#fff' : C.gold });
    outlinedText(ctx, 'ИЗ 100', 960, 700, 70);
    if (t > at(s, 229)) sticker(ctx, 'ТЫ СРЕДИ НИХ', 960, 860, { size: 50, scale: pop(t, at(s, 229)) });
  } else {
    bgHulk(ctx, t);
    const lt = t - carry;
    const x = 300 + lt * 200;
    marine(ctx, x, 1000, 0.8, { ...walkPose(lt, 0.6, 0.25), armL: -0.8, armR: 0.8 }, { weapon: 'none' }, sgtPal(5));
    for (let i = 0; i < 8; i++) helmetProp(ctx, x + Math.sin(lt * 4 + i) * 4, 760 - i * 62, 0.55, '#2d5bd1');
    sticker(ctx, 'ВОСЕМЬ ШЛЕМОВ', 1400, 160, { size: 56, bg: '#fff', scale: pop(t, carry + 0.3) });
    if (t > at(s, 231)) sticker(ctx, 'РУКИ ЗАПОМИНАЮТ ВЕС КАЖДОГО', 1250, 920, { size: 42, scale: pop(t, at(s, 231)) });
    tint(ctx, '#1a1a3a', 0.15);
  }
});
