// Level 8: Магистр Ордена (779 - 915 s)

const MASTER = { weapon: 'none', helmet: 'off', hair: 'short', cape: true, scar: true, laurel: true };
const MASTER_PAL = pal('ultra', { hair: '#c8c8c8', cape: '#2d5bd1' });
const AGEMMAN_PAL = pal(VET_PAL, { hair: '#5a4030' });

shot(cue(392), (ctx, s) => levelCard(ctx, 8, s.lt, { stop: s.at(window.CUES[393]) + 1.6, stopText: 'СТОП × 2' }));

// ---- 8.1 Calgar is alive; we respect him too much. Just imagine.
shot(cue(394), (ctx, s) => {
  const t = s.lt;
  bgCouncil(ctx, t);
  rect(ctx, 660, 160, 600, 700, '#c9a24a', 16, 8);
  rect(ctx, 700, 200, 520, 620, '#5a6a9a', 10, 6);
  marine(ctx, 960, 1240, 1.05, { expr: 'neutral' }, CALGAR, CALGAR_PAL);
  rect(ctx, 660, 860, 600, 30, '#c9a24a', 6, 6);
  stamp(ctx, 'ЖИВ', 1400, 300, t, 0.6, { size: 100, color: '#2fae4f' });
  if (t > at(s, 397) - 0.2) { tint(ctx, '#fff', 0.5 * clamp((t - at(s, 397) + 0.2) / 0.8)); outlinedText(ctx, 'ПРОСТО ПРЕДСТАВИМ', 960, 560, 90 * pop(t, at(s, 397) - 0.2), { color: C.gold }); }
});

// ---- 8.2 the heir, the favourite, and the one who knows where the warehouse is
shot(cue(398), (ctx, s) => {
  const t = s.lt;
  const pick = at(s, 403);
  bgCouncil(ctx, t);
  for (const [x, h] of [[400, 160], [960, 100], [1520, 60]]) rect(ctx, x - 180, 1000 - h, 360, h + 100, '#c9a24a', 8, 6);
  drawRig(ctx, TERM(), 400, 840, 0.5, idlePose(t), AGEMMAN_PAL);
  marine(ctx, 960, 900, 0.6, { ...idlePose(t, 1), expr: 'happy' }, { weapon: 'none', helmet: 'off', hair: 'short', cape: true }, pal('ultra', { hair: '#2a2018', cape: '#d8402f' }));
  marine(ctx, 1520, 940, 0.6, { ...idlePose(t, 2), expr: t > pick + 1 ? 'shock' : 'neutral' }, CAPT, CAPT_PAL);
  paper(ctx, 1620, 760, 120, 150, '', [], { rot: 0.2 });
  sticker(ctx, 'НАСЛЕДНИК: АГЕММАН', 400, 200, { size: 38, scale: pop(t, 0.2) });
  sticker(ctx, 'ФАВОРИТ: СИКАРИЙ', 960, 320, { size: 38, bg: '#fff', scale: pop(t, at(s, 400)) });
  if (t > at(s, 401)) sticker(ctx, 'ВЫБИРАЕТ ПРИМАРХ', 960, 90, { size: 54, scale: pop(t, at(s, 401)) });
  if (t > pick) {
    // a giant pointing gauntlet from above
    const y = kf(t, [[pick, -400], [pick + 0.8, 260]], ease.back);
    ctx.save(); ctx.translate(1520, y); ctx.rotate(0.1);
    rect(ctx, -80, -500, 160, 420, '#2d5bd1', 30, 8);
    rect(ctx, -110, -100, 220, 160, '#1f3f96', 40, 8);
    rect(ctx, -22, 40, 44, 120, '#1f3f96', 20, 6);
    ctx.restore();
  }
  if (t > at(s, 405)) sticker(ctx, 'ЗНАЕТ, ГДЕ СКЛАД', 1520, 520, { size: 44, bg: '#fff', scale: pop(t, at(s, 405)) });
});

// ---- 8.3 Chapter Master, Lord of Macragge, four tetrarchs
shot(cue(406), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, 560, kf(t, [[0, 1.2], [3, 1]]));
  bgHall(ctx, t, { throne: {} });
  marine(ctx, 960, 760, 0.95, { ...idlePose(t), expr: 'neutral' }, MASTER, MASTER_PAL);
  if (t > at(s, 408)) for (let i = 0; i < 4; i++) {
    const x = [250, 560, 1360, 1670][i];
    marine(ctx, x, 1060, 0.5 * pop(t, at(s, 408) + i * 0.15), { ...idlePose(t, i), flip: x > 960 }, { weapon: 'none', helmet: 'off', hair: 'short', cape: true }, i === 0 ? AGEMMAN_PAL : pal('ultra', { hair: ['#5a4030', '#2a2018', '#8a6040', '#3a2a20'][i], cape: ['#f4f4f4', '#f2c230', '#d8402f', '#3a8a3a'][i] }));
  }
  ctx.restore();
  sticker(ctx, 'МАГИСТР ОРДЕНА', 960, 90, { size: 60, scale: pop(t, 0.1) });
  if (t > at(s, 407)) sticker(ctx, 'ЛОРД МАКРАГГА', 960, 210, { size: 46, bg: '#fff', scale: pop(t, at(s, 407)) });
  if (t > at(s, 409)) sticker(ctx, 'ТЕТРАРХИ: 100+ МИРОВ У КАЖДОГО', 960, 960, { size: 42, scale: pop(t, at(s, 409)) });
});

// ---- 8.4 the polite Agemman; first item on the agenda: supply
shot(cue(411), (ctx, s) => {
  const t = s.lt;
  const frost = clamp((t - at(s, 414)) / 1.5);
  bgCouncil(ctx, t);
  rect(ctx, 200, 820, 1520, 80, '#7a4a2a', 20, 6);
  drawRig(ctx, TERM(), 380, 900, 0.45, { ...idlePose(t), flip: false }, AGEMMAN_PAL);
  for (let i = 0; i < 3; i++) marine(ctx, 760 + i * 260, 900, 0.48, { ...idlePose(t, i), expr: t > at(s, 416) ? 'happy' : 'shock' }, { weapon: 'none', helmet: 'off', hair: 'short' }, pal('ultra', { hair: ['#2a2018', '#8a6040', '#3a2a20'][i] }));
  marine(ctx, 1600, 900, 0.55, { ...idlePose(t), expr: 'neutral', flip: true }, MASTER, MASTER_PAL);
  sticker(ctx, 'ОН ВЕЖЛИВ', 380, 200, { size: 46, bg: '#fff', scale: pop(t, at(s, 413)) });
  if (frost > 0) {
    tint(ctx, '#9fd8ff', frost * 0.3);
    for (let i = 0; i < 14; i++) shape(ctx, [[i * 140, 0], [i * 140 + 50, 0], [i * 140 + 25, 60 + (i % 3) * 40 * frost]], '#e8f8ff', 4);
    outlinedText(ctx, '-40°', 380, 330, 70 * frost, { color: '#9fd8ff' });
  }
  if (t > at(s, 415)) paper(ctx, 1150, 400, 620, 220, 'ПОВЕСТКА', ['1. СНАБЖЕНИЕ'], { lineSize: 48 });
  if (t > at(s, 416)) for (let i = 0; i < 3; i++) outlinedText(ctx, 'ФУХ', 760 + i * 260, 560 - ((t - at(s, 416)) * 60), 40, { color: '#fff' });
  if (t > at(s, 417)) clockFace(ctx, 380, 520, 80, t, 20);
});

// ---- 8.5 selecting the honour guard: one question about rations
shot(cue(418), (ctx, s) => {
  const t = s.lt;
  bgStoneRoom(ctx, t, { banners: true });
  const right = [2, 6];
  for (let i = 0; i < 8; i++) {
    const x = 220 + i * 210;
    const up = right.includes(i) && t > at(s, 422);
    marine(ctx, x, 1000, 0.3, { ...idlePose(t, i), armR: up ? -2.8 : 0, flip: false }, { weapon: 'none' }, VET_PAL);
    if (t > at(s, 421) + 0.5 && !up) outlinedText(ctx, '?', x, 720, 50, { color: '#fff' });
    if (up) checkMark(ctx, x, 700, 0.8, t, at(s, 423));
  }
  sticker(ctx, 'ОТБОР В ЛИЧНУЮ ГВАРДИЮ', 960, 90, { size: 52, scale: pop(t, 0.1) });
  if (t > at(s, 420)) bubble(ctx, 'СКОЛЬКО ПАЙКОВ НУЖНО РОТЕ\nНА МЕСЯЦ ОСАДЫ?', 960, 330, 960, 500, { size: 46, scale: pop(t, at(s, 420)) });
  if (t > at(s, 422)) sticker(ctx, 'ОТВЕТИЛИ ДВОЕ', 1600, 560, { size: 44, bg: '#fff', scale: pop(t, at(s, 422)) });
});

// ---- 8.6 the first order, on supply of course; sent to the primarch
shot(cue(424), (ctx, s) => {
  const t = s.lt;
  const send = at(s, 427) - 0.1;
  if (t < send) {
    bgStoneRoom(ctx, t, { windows: false, wall: '#5a4a3a', floor: '#4a3a2a' });
    paper(ctx, 960, 560, 900, 760, 'ПРИКАЗ №1', ['О довольствии', 'Макрагг на пайках: учесть', 'Восемь шлемов: помнить', 'Склады: по списку', 'Хлеб: строка 4 проверена'].map((l, i) => ({ text: l, hidden: t < 0.5 + i * 0.5 })), { lineSize: 46 });
    ctx.save(); ctx.translate(1300 + Math.sin(t * 8) * 30, 700); ctx.rotate(0.6); rect(ctx, -10, -200, 20, 220, '#2a2a33', 6, 5); ctx.restore();
  } else {
    bgSpace(ctx, t);
    const p = clamp((t - send) / 2.5);
    ship(ctx, 1600, 400, 0.9, '#f2c230', -1);
    sticker(ctx, 'ФЛАГМАН ПРИМАРХА', 1600, 220, { size: 40 });
    ctx.save(); ctx.translate(lerp(200, 1500, p), lerp(800, 430, p)); ctx.rotate(p * 6);
    rect(ctx, -60, -80, 120, 160, C.paper, 6, 5);
    ctx.restore();
    if (t > at(s, 428)) sticker(ctx, 'ОН НАЗНАЧИЛ, ЕМУ И СМОТРЕТЬ', 700, 160, { size: 44, bg: '#fff', scale: pop(t, at(s, 428)) });
  }
});

// ---- 8.7 the order comes back corrected over your lines; he rewrites you now
shot(cue(429), (ctx, s) => {
  const t = s.lt;
  const cmp = at(s, 432) - 0.1;
  bgFlat(ctx, t);
  if (t < cmp) {
    paper(ctx, 960, 560, 900, 760, 'ПРИКАЗ №1', ['О довольствии', 'Макрагг на пайках: учесть', 'Восемь шлемов: помнить', 'Склады: по списку', 'Хлеб: строка 4 проверена'], { lineSize: 46 });
    const r = rng(2);
    ctx.strokeStyle = C.red; ctx.lineWidth = 6; ctx.lineCap = 'round';
    const n = Math.floor(clamp((t - 0.4) / 2.2) * 14);
    for (let i = 0; i < n; i++) {
      const y = 380 + (i % 7) * 70, x = 600 + r() * 500;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.bezierCurveTo(x + 40, y - 30, x + 80, y + 30, x + 140, y - 10); ctx.stroke();
    }
    redNote(ctx, 'запятая', 1240, 300, 40, t, 1.0, 0.1);
    redNote(ctx, 'переписать абзац', 1180, 840, 40, t, 2.0, -0.08);
  } else {
    paper(ctx, 520, 560, 640, 520, 'ГЛАВА: МИШЕНЬ', ['Тактическое отделение', 'притягивает огонь'], { lineSize: 40, rot: -0.04 });
    redNote(ctx, 'линейное', 300, 470, 46, t, cmp, -0.1);
    outlinedText(ctx, 'ТОГДА', 520, 220, 56, { color: C.gold });
    paper(ctx, 1400, 560, 640, 520, 'МАГИСТР ОРДЕНА', ['Ты'], { lineSize: 60, rot: 0.03 });
    redNote(ctx, 'исправлено', 1200, 700, 50, t, cmp + 1.2, -0.08);
    outlinedText(ctx, 'ТЕПЕРЬ', 1400, 220, 56 * pop(t, cmp + 0.8), { color: C.gold });
  }
});

// ---- 8.8 the ladder: above the summit sits the man who wrote it
shot(cue(435), (ctx, s) => {
  const t = s.lt;
  const ranks = ['АСПИРАНТ', 'СКАУТ', 'БРАТ', 'СЕРЖАНТ', 'ВЕТЕРАН', 'ЛЕЙТЕНАНТ', 'КАПИТАН', 'МАГИСТР'];
  const up = at(s, 441) - 0.2;
  const camY = kf(t, [[up, 560], [up + 2, -380]]);
  ctx.save(); camera(ctx, 960, camY, 1);
  bgFlat(ctx, t, '#2a3f7a', '#24376e');
  fillRect(ctx, BX0, -1500, BX1 - BX0, 1200, '#2a3f7a');
  ranks.forEach((r, i) => {
    const x = 120 + i * 205, y = 960 - i * 105;
    const lit = t > at(s, 437) + i * 0.45;
    rect(ctx, x, y, 200, 60, lit ? C.gold : '#e8e2d0', 8, 6);
    ctx.fillStyle = INK; ctx.font = font(24); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(r, x + 100, y + 32);
  });
  const tx = 120 + 7 * 205 + 100, ty = 960 - 7 * 105;
  marine(ctx, tx, ty, 0.3, idlePose(t), MASTER, MASTER_PAL);
  // cloud and the primarch's desk above
  for (let i = 0; i < 6; i++) circ(ctx, 1100 + i * 110, -260 + (i % 2) * 30, 90, '#fff', 6);
  rect(ctx, 1150, -460, 500, 40, '#7a4a2a', 8, 6);
  marine(ctx, 1400, -330, 0.5, { ...idlePose(t), expr: 'neutral', look: -0.5 }, GUILLIMAN, GUILLIMAN_PAL);
  paper(ctx, 1560, -490, 160, 90, '', [], { rot: -0.05 });
  ctx.restore();
  if (t > at(s, 440)) sticker(ctx, 'ОФИЦИАЛЬНО ВЕРШИНА — ТЫ', 600, 120, { size: 44, scale: pop(t, at(s, 440)) });
  if (t > up + 2) sticker(ctx, 'НАПИСАЛ ЛЕСТНИЦУ И ПРАВИТ ЕЁ', 960, 960, { size: 48, bg: '#fff', scale: pop(t, up + 2) });
});

// ---- 8.9 nice handwriting though. You copy it out; the companies get it on time.
shot(cue(444), (ctx, s) => {
  const t = s.lt;
  const go = at(s, 446) - 0.1;
  if (t < go) {
    bgStoneRoom(ctx, t, { windows: false, wall: '#5a4a3a', floor: '#4a3a2a' });
    paper(ctx, 960, 560, 900, 760, 'ПРИКАЗ №1 (НАБЕЛО)', ['О довольствии', 'Каждой роте: вовремя', 'Каждой запятой: место'], { lineSize: 48 });
    sticker(ctx, 'ПОЧЕРК У НЕГО ХОРОШИЙ', 960, 90, { size: 50, scale: pop(t, 0.1) });
  } else {
    bgSpace(ctx, t);
    for (let i = 0; i < 5; i++) {
      const p = clamp((t - go - i * 0.2) / 2);
      const a = (i / 5) * Math.PI * 2;
      ship(ctx, lerp(960, 960 + Math.cos(a) * 700, p), lerp(540, 540 + Math.sin(a) * 380, p), 0.3, '#2d5bd1', Math.cos(a) > 0 ? 1 : -1);
      if (p >= 1) checkMark(ctx, 960 + Math.cos(a) * 700, 540 + Math.sin(a) * 380 - 80, 0.8, t, go + i * 0.2 + 2);
    }
    if (t > at(s, 447)) sticker(ctx, 'ВОВРЕМЯ', 960, 540, { size: 70, scale: pop(t, at(s, 447)) });
    if (t > at(s, 448)) sticker(ctx, 'ЛОГИСТИКА НЕ ПОДВЕЛА', 960, 980, { size: 50, bg: '#fff', scale: pop(t, at(s, 448)) });
  }
});

// ---- 8.10 back on Calth they finally put up your statue. You're taller than it.
shot(cue(449), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, kf(t, [[0, 520], [6, 600]]), kf(t, [[0, 1.25], [6, 1.05]]));
  bgCave(ctx, t, { statue: true, statueX: 1300, statueScale: 0.58, statueOpts: { plaque: 'МАГИСТР', laurel: true } });
  if (t > at(s, 451)) marine(ctx, 700, 960, 0.9, { ...idlePose(t), expr: t > at(s, 453) ? 'happy' : 'neutral', look: 1 }, MASTER, MASTER_PAL);
  if (t > at(s, 453)) {
    ctx.strokeStyle = C.gold; ctx.lineWidth = 8; ctx.setLineDash([20, 14]);
    ctx.beginPath(); ctx.moveTo(500, 960 - 600 * 0.9 + 30); ctx.lineTo(1500, 960 - 600 * 0.9 + 30); ctx.stroke(); ctx.setLineDash([]);
  }
  ctx.restore();
  sticker(ctx, 'КАЛТ. ТА САМАЯ ПЕЩЕРА', 960, 90, { size: 50, scale: pop(t, 0.2) });
  if (t > at(s, 452)) sticker(ctx, 'БРОНЯ ПРОШЛОГО ОБРАЗЦА', 1500, 960, { size: 40, bg: '#fff', scale: pop(t, at(s, 452)) });
  if (t > at(s, 453)) sticker(ctx, 'НА ГОЛОВУ ВЫШЕ ПАМЯТНИКА', 500, 960, { size: 40, scale: pop(t, at(s, 453)) });
});

// ---- 8.11 a boy walks past, stops, looks at the statue. You know what he's thinking.
shot(cue(455), (ctx, s) => {
  const t = s.lt;
  const stop = at(s, 456);
  ctx.save(); camera(ctx, 960, 560, kf(t, [[stop, 1], [stop + 3, 1.15]]));
  bgCave(ctx, t, { statue: true, statueX: 1250, statueScale: 0.75, statueOpts: { plaque: 'МАГИСТР', laurel: true } });
  const kx = t < stop ? 100 + t * 260 : 100 + stop * 260;
  shadow(ctx, kx, 960, 60);
  human(ctx, kx, 960, 1.0, t < stop ? walkPose(t) : { ...idlePose(t), expr: 'happy', look: 1, head: -0.12 }, HERO_KID, pal(HUMAN_PAL.kid, { shirt: '#c08a40', hair: '#2a1a10' }));
  ctx.restore();
  if (t > at(s, 458)) bubble(ctx, 'ВОТ ЧЕЛОВЕК ПРОБИЛСЯ', 620, 260, 560, 420, { think: true, size: 50, scale: pop(t, at(s, 458) + 0.3) });
});
