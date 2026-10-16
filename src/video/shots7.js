// Level 7: Капитан (679 - 779 s)

const CAPT = { weapon: 'none', helmet: 'off', hair: 'short', cape: true, scar: true };
const CAPT_PAL = brother(7, { hair: '#c8c8c8', cape: '#5a2a8a' });

shot(cue(340), (ctx, s) => levelCard(ctx, 7, s.lt, { stop: s.at(window.CUES[341]) + 0.9 }));

// ---- 7.1 by canon, Captain Ixion is fine. So let's imagine.
shot(cue(342), (ctx, s) => {
  const t = s.lt;
  bgStoneRoom(ctx, t, { banners: true, wall: '#6a5a8a', floor: '#4a3e60' });
  marine(ctx, 960, 1030, 0.85, { ...idlePose(t), expr: 'happy', armR: -2.2 }, IXION, IXION_PAL);
  sticker(ctx, 'ПО КАНОНУ', 500, 140, { size: 50, bg: '#fff', scale: pop(t, 0.1) });
  sticker(ctx, 'ИКСИОН ЖИВ И ЗДОРОВ', 960, 260, { size: 50, scale: pop(t, at(s, 343)) });
  if (t > at(s, 344)) { tint(ctx, '#ffffff', clamp((t - at(s, 344)) / 1.5) * 0.6); outlinedText(ctx, 'ПРЕДСТАВИМ...', 960, 560, 110 * pop(t, at(s, 344)), { color: C.gold }); }
});

// ---- 7.2 imagine: in the war with Leviathan, Ixion fell
shot(cue(345), (ctx, s) => {
  const t = s.lt;
  bgWild(ctx, t, { night: 1 });
  hiveShip(ctx, 1400, 200, 0.6, t);
  rect(ctx, 840, 900, 240, 40, '#5a4a3a', 8, 5);
  rect(ctx, 945, 700, 30, 220, '#6a5a4a', 4, 5); rect(ctx, 880, 760, 160, 30, '#6a5a4a', 4, 5);
  helmetProp(ctx, 960, 640, 0.9, '#2d5bd1');
  marine(ctx, 500, 1030, 0.7, { ...idlePose(t), expr: 'sad', look: 1 }, LT, LT_PAL);
  sticker(ctx, 'ЛЕВИАФАН', 1400, 360, { size: 50, bg: '#7b3fa0', color: '#fff', scale: pop(t, 0.6) });
  if (t > at(s, 347)) bubble(ctx, 'ПОХВАЛЫ НЕ БУДЕТ', 500, 300, 500, 420, { think: true, size: 42, scale: pop(t, at(s, 347)) });
  dreamFrame(ctx, '#fff', 'ПРЕДСТАВИМ');
});

// ---- 7.3 Calgar appoints you: "Feed them well." Not a joke.
shot(cue(348), (ctx, s) => {
  const t = s.lt;
  bgCouncil(ctx, t);
  marine(ctx, 1350, 1030, 0.9, { ...idlePose(t), expr: t > at(s, 350) - 0.3 ? 'talk' : 'neutral', time: t, flip: true }, CALGAR, CALGAR_PAL);
  marine(ctx, 560, 1030, 0.8, { ...idlePose(t), expr: t > at(s, 351) ? 'happy' : 'neutral' }, LT, LT_PAL);
  sticker(ctx, 'МАГИСТР УТВЕРЖДАЕТ', 960, 110, { size: 50, scale: pop(t, 0.2) });
  if (t > at(s, 350) - 0.3) bubble(ctx, 'КОРМИТЕ ИХ ХОРОШО', 1300, 330, 1350, 420, { size: 54, scale: pop(t, at(s, 350) - 0.3) });
  if (t > at(s, 351)) bubble(ctx, 'шутка?', 560, 330, 560, 420, { think: true, size: 46, scale: pop(t, at(s, 351)) });
  stamp(ctx, 'НЕ ШУТКА', 960, 640, t, at(s, 352), { size: 90 });
});

// ---- 7.4 a company, three dreadnoughts and the second title: Chief Quartermaster
shot(cue(353), (ctx, s) => {
  const t = s.lt;
  const flash = at(s, 356) - 0.1;
  if (t < flash) {
    bgFlat(ctx, t, '#3a2a5a', '#34264f');
    for (let i = 0; i < 20; i++) drawRig(ctx, rig('marine', { weapon: 'bolter' }), 160 + (i % 10) * 90, 420 + Math.floor(i / 10) * 140, 0.17 * pop(t, 0.2 + i * 0.03), {}, brother(7), { flat: true, outlineW: 3 });
    outlinedText(ctx, '× 100', 560, 620, 70 * pop(t, 0.6), { color: C.gold });
    for (let i = 0; i < 3; i++) drawRig(ctx, rig('dread'), 1180 + i * 230, 620, 0.28 * pop(t, 1.2 + i * 0.15), {}, brother(7));
    outlinedText(ctx, '× 3', 1410, 700, 70 * pop(t, 1.6), { color: C.gold });
    if (t > at(s, 355) - 0.2) sticker(ctx, 'ВТОРОЙ ТИТУЛ:\nГЛАВНЫЙ ПРОВИАНТМЕЙСТЕР', 960, 900, { size: 54, scale: pop(t, at(s, 355) - 0.2) });
  } else {
    bgStoneRoom(ctx, t, { banners: true });
    for (let i = 0; i < 4; i++) { const x = 330 + i * 420; marine(ctx, x, 1010, 0.55, { bob: Math.sin(t * 30 + i) * 6 }, { weapon: 'none' }, brother(8)); outlinedText(ctx, 'ХА', x + 80, 560 - ((t * 120 + i * 40) % 120), 46, { color: C.gold }); }
    tint(ctx, '#c08a40', 0.25);
    dreamFrame(ctx, '#fff', 'ПОМНИШЬ?');
    stamp(ctx, 'ЗАВХОЗ', 960, 300, t, at(s, 357) + 0.5, { size: 110 });
  }
});

// ---- 7.5 everything that doesn't shoot is yours; thousands of serfs, all late
shot(cue(358), (ctx, s) => {
  const t = s.lt;
  bgWarehouse(ctx, t);
  for (let i = 0; i < 9; i++) {
    const x = ((i * 240 + t * 90) % 2400) - 300;
    human(ctx, x, 1030, 0.7, { ...walkPose(t + i, 0.9, 0.3), expr: i % 2 ? 'shock' : 'neutral' }, { hair: ['short', 'bun', 'buzz'][i % 3] }, pal(HUMAN_PAL.serf, { shirt: ['#8a7a6a', '#6a7a8a', '#7a6a5a'][i % 3] }));
    if (i % 3 === 0) crate(ctx, x - 40, 1030 - 250, 0.6, i % 3);
  }
  marine(ctx, 1650, 1030, 0.75, idlePose(t), CAPT, CAPT_PAL);
  sticker(ctx, 'ВСЁ, ЧТО НЕ СТРЕЛЯЕТ, ТВОЁ', 960, 110, { size: 50, scale: pop(t, 0.2) });
  if (t > at(s, 361)) sticker(ctx, 'СТРЕЛЯТЬ: 0', 500, 260, { size: 46, bg: '#fff', scale: pop(t, at(s, 361)) });
  if (t > at(s, 362)) { sticker(ctx, 'ОПАЗДЫВАТЬ: ВСЕ', 1100, 260, { size: 46, bg: '#fff', scale: pop(t, at(s, 362)) }); clockFace(ctx, 1500, 260, 70, t, 10); }
});

// ---- 7.6 the council of captains: war, war, war... how do we get there?
shot(cue(363), (ctx, s) => {
  const t = s.lt;
  const turn = at(s, 365) - 0.1;
  bgCouncil(ctx, t);
  rect(ctx, 260, 820, 1400, 80, '#7a4a2a', 20, 6);
  const caps = [[380, 'ОБОРОНА'], [700, 'ШТУРМ'], [1220, 'СВЯТЫНИ']];
  caps.forEach(([x, topic], i) => {
    marine(ctx, x, 900, 0.6, { ...idlePose(t, i), flip: t > turn ? x > 960 : false, expr: t > turn ? 'neutral' : 'talk', time: t + i }, { weapon: 'none', helmet: 'off', hair: 'short', cape: true }, brother([2, 3, 4][i], { cape: ['#f2c230', '#d8402f', '#3a8a3a'][i], hair: '#5a4030' }));
    if (t < turn && t > i * 0.8) bubble(ctx, topic, x, 300, x, 400, { size: 40, scale: pop(t, i * 0.8) });
  });
  marine(ctx, 1550, 900, 0.62, { ...idlePose(t), expr: t > turn ? 'shock' : 'neutral' }, CAPT, CAPT_PAL);
  if (t > turn + 0.4) bubble(ctx, 'НА ЧЁМ ДО ВСЕГО\nЭТОГО ДОЕХАТЬ?', 900, 280, 1450, 420, { size: 46, scale: pop(t, turn + 0.4) });
  sticker(ctx, 'СОВЕТ КАПИТАНОВ', 960, 90, { size: 50, scale: pop(t, 0.1) });
});

// ---- 7.7 the battle accountant; "check line four"
shot(cue(368), (ctx, s) => {
  const t = s.lt;
  const note = at(s, 371) - 0.1;
  if (t < note) {
    bgCouncil(ctx, t);
    marine(ctx, 960, 1040, 1.05, { ...idlePose(t), expr: 'neutral' }, GUILLIMAN, GUILLIMAN_PAL);
    // abacus
    rect(ctx, 1280, 560, 300, 200, '#7a4a2a', 10, 6);
    for (let r = 0; r < 4; r++) for (let b = 0; b < 5; b++) circ(ctx, 1310 + b * 45 + (b < 2 ? Math.sin(t * 4 + r) * 10 : 60), 590 + r * 45, 15, ['#d8402f', '#f2c230', '#2d5bd1', '#fff'][r], 3);
    sticker(ctx, 'БОЕВОЙ БУХГАЛТЕР', 960, 110, { size: 64, scale: pop(t, 0.2) });
    if (t > at(s, 370)) sticker(ctx, 'ЭТО КОМПЛИМЕНТ', 960, 240, { size: 46, bg: '#fff', scale: pop(t, at(s, 370)) });
  } else {
    bgFlat(ctx, t);
    const err = at(s, 374);
    paper(ctx, 760, 560, 900, 760, 'ВЕДОМОСТЬ 7 РОТЫ', ['1. Пайки: 12 000', '2. Болт-снаряды: 90 000', '3. Сервиторы: 340', { text: '4. Хлеб: 1 200 000 000', color: t > err ? C.red : '#3a3040' }, '5. Сапоги: 400'], { lineSize: 44 });
    redNote(ctx, 'Проверьте четвёртую строку. Р.Ж.', 340, 900, 46, t, note + 0.6);
    if (t > err) { ctx.strokeStyle = C.red; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(700, 500, 380, 46, 0, 0, Math.PI * 2); ctx.stroke(); }
    if (t > at(s, 375)) {
      rect(ctx, 1380, 300, 380, 420, '#fff', 14, 7);
      rect(ctx, 1380, 300, 380, 90, C.red, 14, 7);
      const d = Math.min(7, 1 + Math.floor((t - at(s, 375)) * 4));
      outlinedText(ctx, 'НЕ СПИШЬ', 1570, 345, 40);
      outlinedText(ctx, `${d} ДН.`, 1570, 540, 100, { color: INK, stroke: 0 });
    }
    if (t > at(s, 376)) sticker(ctx, 'БЛАГО И НЕ НАДО', 1570, 820, { size: 44, scale: pop(t, at(s, 376)) });
  }
});

// ---- 7.8 500 worlds, four fronts; the 7th drives the supplies
shot(cue(377), (ctx, s) => {
  const t = s.lt;
  bgSpace(ctx, t);
  const r = rng(13);
  for (let i = 0; i < 120; i++) { ctx.fillStyle = i < 40 * clamp(t / 2) * 3 ? '#4f8ad0' : '#5a5a6a'; ctx.beginPath(); ctx.arc(200 + r() * 1520, 180 + r() * 720, 10, 0, Math.PI * 2); ctx.fill(); }
  sticker(ctx, '500 МИРОВ', 960, 90, { size: 60, scale: pop(t, 0.2) });
  if (t > at(s, 379) - 0.1) {
    [[0.3, 0.2], [0.8, 0.25], [0.2, 0.8], [0.85, 0.75]].forEach(([fx, fy], i) => {
      const x = fx * 1920, y = fy * 1080;
      ctx.strokeStyle = C.red; ctx.lineWidth = 14; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(960, 540); ctx.lineTo(lerp(960, x, pop(t, at(s, 379) + i * 0.15)), lerp(540, y, pop(t, at(s, 379) + i * 0.15))); ctx.stroke();
    });
    outlinedText(ctx, '4 ФРОНТА', 960, 990, 60, { color: C.gold });
  }
  if (t > at(s, 380) - 0.1) {
    circ(ctx, 960, 540, 90, '#5a2a8a', 7);
    outlinedText(ctx, '7', 960, 545, 90);
    for (let i = 0; i < 4; i++) {
      const a = t * 0.8 + i * Math.PI / 2;
      ship(ctx, 960 + Math.cos(a) * 260, 540 + Math.sin(a) * 200, 0.25, '#5a2a8a', Math.sin(a) > 0 ? -1 : 1);
    }
    if (t > at(s, 381)) sticker(ctx, 'СЕДЬМАЯ ВЕЗЁТ', 960, 760, { size: 50, scale: pop(t, at(s, 381)) });
  }
});

// ---- 7.9 necrons don't need food: the only front where the enemy has better logistics
shot(cue(382), (ctx, s) => {
  const t = s.lt;
  bgWild(ctx, t, { night: 1 });
  for (let i = 0; i < 4; i++) drawRig(ctx, rig('necron'), 1000 + i * 230, 1020, 0.6, { ...idlePose(t, i), flip: true }, NECRON_PAL);
  // plate refused
  const p = P(); p.ellipse(560, 820, 160, 50, 0, 0, Math.PI * 2);
  strokeFill(ctx, p, '#fff', 6);
  bread(ctx, 560, 800, 0.6);
  crossOut(ctx, 560, 800, 300, 160, t, at(s, 384));
  sticker(ctx, 'НЕКРОНЫ', 1350, 110, { size: 60, bg: '#4cff7a', scale: pop(t, 0.2) });
  if (t > at(s, 385)) sticker(ctx, 'ЛОГИСТИКА ЛУЧШЕ', 560, 260, { size: 54, bg: '#fff', scale: pop(t, at(s, 385)) });
});

// ---- 7.10 four fronts are fed because one man knows where the warehouse is
shot(cue(387), (ctx, s) => {
  const t = s.lt;
  bgWarehouse(ctx, t);
  for (let i = 0; i < 4; i++) {
    const x = 300 + i * 440;
    marine(ctx, x, 1040, 0.45, { ...idlePose(t, i), expr: 'happy' }, { weapon: 'none', helmet: 'off', hair: 'short' }, brother([2, 3, 4, 6][i], { hair: '#5a4030' }));
    const p = P(); p.ellipse(x, 1060, 120, 30, 0, 0, Math.PI * 2); strokeFill(ctx, p, '#fff', 5);
    bread(ctx, x, 1050, 0.5);
  }
  marine(ctx, 960, 700, 0.5, { ...idlePose(t) }, CAPT, CAPT_PAL);
  sticker(ctx, 'ЗНАЕТ, ГДЕ СКЛАД', 960, 300, { size: 46, scale: pop(t, at(s, 389) - 0.6) });
  if (t > at(s, 390)) {
    // the eye above, reading ledgers
    ctx.save(); ctx.translate(960, 110);
    const ep = P(); ep.ellipse(0, 0, 140 * pop(t, at(s, 390)), 60, 0, 0, Math.PI * 2); strokeFill(ctx, ep, '#fff', 6);
    circ(ctx, Math.sin(t * 2) * 30, 0, 36, '#2d5bd1', 5);
    ctx.restore();
    sticker(ctx, 'НАВЕРХУ ТОЖЕ ЛЮБЯТ ВЕДОМОСТИ', 1450, 220, { size: 38, bg: '#fff', scale: pop(t, at(s, 391)) });
  }
});
