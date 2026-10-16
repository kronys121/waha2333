// Level 6: Лейтенант (572 - 679 s)

const LT = { weapon: 'bolter', stripe: true };
const LT_PAL = brother(7, { stripe: '#d8402f' });
const CALGAR = { weapon: 'none', helmet: 'off', hair: 'short', cape: true, scar: true };
const CALGAR_PAL = pal('ultra', { hair: '#3a2a20', cape: '#2d5bd1' });
const IXION = { weapon: 'none', helmet: 'off', hair: 'short', cape: true };
const IXION_PAL = brother(7, { hair: '#9a9a9a', cape: '#5a2a8a' });

shot(cue(284), (ctx, s) => levelCard(ctx, 6, s.lt));

// ---- 6.1 Rubicon Primaris: three organs, six of ten won't get up
shot(cue(286), (ctx, s) => {
  const t = s.lt;
  bgFlat(ctx, t, '#173a4a', '#1a4254');
  sticker(ctx, 'РУБИКОН ПРИМАРИС', 960, 100, { size: 64, scale: pop(t, 0.1) });
  if (t < at(s, 290) - 0.2) {
    marine(ctx, 600, 960, 0.75, idlePose(t), { weapon: 'none' }, MARBLE);
    outlinedText(ctx, '→', 960, 640, 160 * pop(t, 1), { color: C.gold });
    marine(ctx, 1350, 960, 0.92 * pop(t, 1.3), idlePose(t), { weapon: 'none' });
  } else {
    const a = at(s, 290);
    if (t < at(s, 291) + 0.2) {
      ['РОСТ', 'ТРОСЫ\nВ СУХОЖИЛИЯХ', 'ТРЕВОЖНАЯ\nКНОПКА В ГРУДИ'].forEach((n, i) => {
        iconCircle(ctx, 420 + i * 540, 500, 150, ['#8fe0a0', '#c9ced6', '#ff7a5a'][i], null, pop(t, a + i * 0.3));
        if (t > a + i * 0.3) outlinedText(ctx, n, 420 + i * 540, 760, 44);
      });
      outlinedText(ctx, '3 НОВЫХ ОРГАНА', 960, 960, 60 * pop(t, a));
    } else {
      grid10(ctx, 660, 520, 1.1, 6, t, at(s, 291));
      outlinedText(ctx, 'ИЗ 10 НЕ ВСТАНУТ 6', 960, 960, 64, { color: C.gold });
    }
  }
});

// ---- 6.2 Calgar goes first; dead for twenty minutes; Cawl explained everything
shot(cue(292), (ctx, s) => {
  const t = s.lt;
  const up = at(s, 294), talk = at(s, 295) - 0.1;
  bgMed(ctx, t);
  if (t < talk) {
    rect(ctx, 460, 860, 1000, 80, '#e9e6df', 12, 6);
    for (let i = 0; i < 6; i++) { ctx.strokeStyle = '#b8b2a6'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(500 + i * 160, 875); ctx.lineTo(560 + i * 160, 875); ctx.stroke(); }
    if (t < up) {
      ctx.save(); ctx.translate(960, 860); ctx.rotate(-Math.PI / 2);
      marine(ctx, 0, 0, 0.75, { expr: 'neutral', blink: 1 }, CALGAR, CALGAR_PAL);
      ctx.restore();
      const mins = Math.min(20, Math.floor(clamp((t - at(s, 293)) / 1.6) * 20));
      rect(ctx, 1450, 160, 360, 170, '#1d2f3a', 12, 6);
      outlinedText(ctx, `${String(mins).padStart(2, '0')}:00`, 1630, 245, 90, { color: '#ff5a3a', stroke: 0 });
      ctx.strokeStyle = '#4cff7a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(100, 260); ctx.lineTo(360, 260); ctx.stroke();
      sticker(ctx, 'КАЛГАР ПЕРВЫЙ', 600, 140, { size: 56, scale: pop(t, 0.2) });
    } else {
      marine(ctx, 960, 860, 0.8, { ...idlePose(t), expr: 'grit', armR: -2.5 }, CALGAR, CALGAR_PAL);
      sticker(ctx, 'ВСТАЛ', 1450, 220, { size: 70, scale: pop(t, up) });
    }
  } else {
    drawRig(ctx, rig('cawl'), 1350, 1040, 0.8, { ...idlePose(t), time: t }, CAWL_PAL);
    marine(ctx, 450, 1040, 0.8, { ...idlePose(t), expr: 'sad' }, CALGAR, CALGAR_PAL);
    // endless scroll
    const len = kf(t, [[talk, 40], [talk + 2.5, 900]]);
    rect(ctx, 920, 330, 220, len, C.paper, 6, 5);
    ctx.fillStyle = '#5a4a4a'; for (let y = 360; y < 330 + len - 20; y += 26) ctx.fillRect(945, y, 120 + (y * 13) % 50, 8);
    bubble(ctx, '...и в-сорок-седьмых...', 1300, 160, 1300, 260, { size: 40, scale: pop(t, talk + 0.3) });
    if (t > at(s, 297)) sticker(ctx, 'ГОВОРЯТ, ЭТО БЫЛО ХУЖЕ', 520, 140, { size: 46, bg: '#fff', scale: pop(t, at(s, 297)) });
  }
});

// ---- 6.3 thousands follow; your first decision not by the Codex
shot(cue(298), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960 + t * 30, 600, 1);
  bgStoneRoom(ctx, t, { windows: false, wall: '#7a8a9a' });
  rect(ctx, 1620, 260, 300, 500, '#cfe8e6', 12, 8);
  sticker(ctx, 'РУБИКОН', 1770, 230, { size: 40 });
  for (let i = 0; i < 12; i++) {
    const x = 1500 - i * 150 + ((t * 40) % 150);
    marine(ctx, x, 1000 - (i % 2) * 20, 0.4, walkPose(t + i * 0.2, 0.5, 0.2), { weapon: 'none' }, i === 3 ? VET_PAL : brother([1, 7, 5, 8][i % 4]));
    if (i === 3) youArrow(ctx, x, 680, t);
  }
  ctx.restore();
  sticker(ctx, 'ТЫСЯЧИ', 400, 120, { size: 60, scale: pop(t, 0.1) });
  if (t > at(s, 300)) sticker(ctx, 'ПЕРВОЕ РЕШЕНИЕ НЕ ПО КОДЕКСУ', 760, 260, { size: 44, bg: '#fff', scale: pop(t, at(s, 300)) });
});

// ---- 6.4 a marble slab with blood grooves: somebody planned the cleanup
shot(cue(302), (ctx, s) => {
  const t = s.lt;
  bgMed(ctx, t);
  rect(ctx, 360, 840, 1200, 100, '#e9e6df', 12, 6);
  ctx.strokeStyle = '#b3262a'; ctx.lineWidth = 6;
  for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(400 + i * 170, 860); ctx.lineTo(470 + i * 170, 860); ctx.stroke(); }
  rect(ctx, 400, 940, 60, 120, '#bdb5a6', 6, 5); rect(ctx, 1460, 940, 60, 120, '#bdb5a6', 6, 5);
  ctx.save(); ctx.translate(980, 845); ctx.rotate(-Math.PI / 2);
  marine(ctx, 0, 0, 0.75, { expr: 'neutral', look: 0.5 }, { weapon: 'none', helmet: 'off', hair: 'short', scar: true }, pal(VET_PAL, { hair: '#c8c8c8' }));
  ctx.restore();
  sticker(ctx, 'ЖЕЛОБКИ ДЛЯ КРОВИ', 600, 160, { size: 46, scale: pop(t, at(s, 303) - 0.2) });
  if (t > at(s, 303) + 0.6) bubble(ctx, 'ХОТЬ КТО-ТО ПРОДУМАЛ\nУБОРКУ', 1350, 380, 1500, 640, { think: true, size: 44, scale: pop(t, at(s, 303) + 0.6) });
});

// ---- 6.5 darkness, light, and the floor is further away
shot(cue(305), (ctx, s) => {
  const t = s.lt;
  const light = at(s, 306) - 0.1, stand = at(s, 307) - 0.1;
  if (t < light) { fillRect(ctx, 0, 0, W, H, '#000'); outlinedText(ctx, 'ТЕМНОТА', 960, 540, 80, { color: '#333', stroke: 0 }); return; }
  if (t < stand) { fillRect(ctx, 0, 0, W, H, '#fff'); outlinedText(ctx, 'СВЕТ', 960, 540, 80, { color: '#ddd', stroke: 0 }); return; }
  bgMed(ctx, t);
  const g = kf(t, [[stand + 0.3, 0.72], [stand + 1.8, 0.9]], ease.back);
  marine(ctx, 960, 1000, g, { ...idlePose(t), expr: 'shock', look: 0 }, { weapon: 'none', helmet: 'off', hair: 'short', scar: true }, pal(VET_PAL, { hair: '#c8c8c8' }));
  ctx.strokeStyle = C.gold; ctx.lineWidth = 8; ctx.setLineDash([20, 14]);
  ctx.beginPath(); ctx.moveTo(500, 1000 - 600 * 0.72); ctx.lineTo(1420, 1000 - 600 * 0.72); ctx.stroke(); ctx.setLineDash([]);
  sticker(ctx, 'ПОЛ ДАЛЬШЕ, ЧЕМ БЫЛ', 960, 110, { size: 54, scale: pop(t, at(s, 308) - 0.8) });
  fillRect(ctx, 0, 0, W, H, `rgba(255,255,255,${1 - clamp((t - stand) / 0.4)})`);
});

// ---- 6.6 the Codex rewritten: tactical becomes line, like HR
shot(cue(309), (ctx, s) => {
  const t = s.lt;
  bgFlat(ctx, t);
  book(ctx, 420, 560, 0.85, 'КОДЕКС\n2.0', { rot: -0.05 });
  const a = at(s, 311);
  paper(ctx, 1250, 380, 900, 300, '', [{ text: 'ТАКТИЧЕСКОЕ отделение', strike: clamp((t - a - 0.6) / 0.5) }, { text: 'ЛИНЕЙНОЕ отделение', color: '#2d5bd1', hidden: t < a + 1.1 }], { lineSize: 52 });
  if (t > at(s, 313)) sticker(ctx, 'РАБОТА ТА ЖЕ', 1250, 600, { size: 46, scale: pop(t, at(s, 313)) });
  if (t > at(s, 314)) paper(ctx, 1250, 830, 900, 260, '', [{ text: 'ОТДЕЛ КАДРОВ', strike: clamp((t - at(s, 314) - 1.5) / 0.4) }, { text: 'HR', color: '#2d5bd1', hidden: t < at(s, 315) }], { lineSize: 52, rot: -0.02 });
});

// ---- 6.7 a new step on the ladder, right above you
shot(cue(316), (ctx, s) => {
  const t = s.lt;
  bgFlat(ctx, t, '#2a3f7a', '#24376e');
  const ranks = ['АСПИРАНТ', 'НЕОФИТ', 'БРАТ', 'СЕРЖАНТ', 'ВЕТЕРАН', 'ЛЕЙТЕНАНТ', 'КАПИТАН', 'МАГИСТР'];
  const ins = at(s, 320);
  const p = clamp((t - ins) / 0.8);
  ranks.forEach((r, i) => {
    if (i === 5 && t < ins) return;
    let k = i;
    if (i > 5) k = i - 1 + p;
    if (i === 5) k = 5;
    const x = 160 + k * 200, y = 920 - k * 100;
    const sc = i === 5 ? pop(t, ins) : 1;
    ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
    rect(ctx, -10, 0, 220, 60, i === 5 ? C.gold : '#e8e2d0', 8, 6);
    ctx.fillStyle = INK; ctx.font = font(26); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(r, 100, 32);
    ctx.restore();
  });
  marine(ctx, 160 + 4 * 200 + 100, 920 - 4 * 100, 0.35, idlePose(t), { weapon: 'none' }, VET_PAL);
  youArrow(ctx, 160 + 4 * 200 + 100, 920 - 4 * 100 - 240, t);
  sticker(ctx, '300 ЛЕТ НЕ БЫЛО ТАКОЙ СТУПЕНЬКИ', 760, 110, { size: 46, scale: pop(t, 0.2) });
});

// ---- 6.8 the 7th company again; Captain Ixion praises like a reprimand
shot(cue(322), (ctx, s) => {
  const t = s.lt;
  bgStoneRoom(ctx, t, { banners: true, wall: '#6a5a8a', floor: '#4a3e60' });
  marine(ctx, 560, 1030, 0.8, idlePose(t), LT, LT_PAL);
  marine(ctx, 1350, 1030, 0.82, { ...idlePose(t, 2), expr: t > at(s, 325) ? 'angry' : 'neutral', flip: true }, IXION, IXION_PAL);
  sticker(ctx, 'ЛЕЙТЕНАНТ 7 РОТЫ', 560, 140, { size: 50, scale: pop(t, 0.2) });
  if (t > at(s, 324)) sticker(ctx, 'КАПИТАН ИКСИОН', 1350, 140, { size: 50, bg: '#fff', scale: pop(t, at(s, 324)) });
  if (t > at(s, 325)) bubble(ctx, 'НЕПЛОХО.', 1100, 330, 1300, 450, { size: 60, color: C.red, scale: pop(t, at(s, 325)) });
});

// ---- 6.9 Mortarion comes to Ultramar
shot(cue(326), (ctx, s) => {
  const t = s.lt;
  bgSpace(ctx, t, { nebula: 'rgba(120,160,40,0.35)' });
  for (let i = 0; i < 4; i++) {
    planet(ctx, 300 + i * 450, 860, 110, '#4f8ad0', '#3a6aa8', { seed: i + 2 });
    ctx.fillStyle = 'rgba(140,200,60,0.35)'; ctx.beginPath(); ctx.arc(300 + i * 450, 860, 130 + Math.sin(t * 2 + i) * 8, 0, Math.PI * 2); ctx.fill();
  }
  drawRig(ctx, rig('mortarion'), 960, kf(t, [[0, 1300], [1.5, 900]]), 0.9, { ...idlePose(t), time: t }, MORT_PAL);
  const r = rng(3);
  ctx.fillStyle = INK;
  for (let i = 0; i < 40; i++) { const x = (r() * 1920 + Math.sin(t * 3 + i) * 60), y = (r() * 900 + Math.cos(t * 4 + i) * 40); ctx.fillRect(x, y, 6, 4); }
  sticker(ctx, 'МОРТАРИОН', 960, 90, { size: 64, bg: '#8a8a4a', color: '#fff', scale: pop(t, 0.3) });
  if (t > at(s, 328)) sticker(ctx, 'МИРЫ В ОСАДЕ', 1600, 640, { size: 46, bg: '#fff', scale: pop(t, at(s, 328)) });
});

// ---- 6.10 Macragge on rations: defence is held by the ration
shot(cue(329), (ctx, s) => {
  const t = s.lt;
  const sc = at(s, 332);
  if (t < sc + 1.5) {
    bgWarehouse(ctx, t);
    marine(ctx, 560, 1030, 0.75, { ...idlePose(t), armR: -0.6 }, LT, LT_PAL);
    paper(ctx, 860, 700, 220, 280, 'ВЕДОМОСТЬ', [], { titleSize: 26 });
    for (let i = 0; i < 5; i++) human(ctx, 1150 + i * 150, 1030, 0.75, { ...idlePose(t, i), expr: 'sad' }, { hair: ['short', 'bun', 'buzz', 'long', 'short'][i], kid: i === 4 }, pal(HUMAN_PAL.serf, { shirt: ['#7a6a5a', '#6a5a6a', '#5a6a6a', '#8a7a5a', '#6a7a8a'][i] }));
    ration(ctx, 1150, 720, 0.5);
    sticker(ctx, 'МАКРАГГ НА ПАЙКАХ', 960, 110, { size: 56, scale: pop(t, at(s, 330) - 0.2) });
  } else {
    bgFlat(ctx, t);
    const tilt = Math.sin(t * 2) * 0.03;
    ctx.save(); ctx.translate(960, 380); ctx.rotate(tilt); rect(ctx, -600, -14, 1200, 28, '#c9a24a', 10, 6); ctx.restore();
    rect(ctx, 930, 380, 60, 560, '#c9a24a', 8, 6);
    drawRig(ctx, rig('marine', { weapon: 'bolter' }), 380, 700, 0.4, {}, PAL.ultra, { flat: true });
    ration(ctx, 1540, 650, 1.2);
    outlinedText(ctx, 'БОЛТЕР', 380, 820, 50); outlinedText(ctx, 'ПАЁК', 1540, 820, 50);
    outlinedText(ctx, '=', 960, 250, 120 * pop(t, at(s, 334)), { color: C.gold });
    sticker(ctx, 'ОБОРОНУ ДЕРЖИТ ПАЁК', 960, 960, { size: 54, scale: pop(t, at(s, 334)) });
  }
});

// ---- 6.11 two skills: standing under fire, and where to get bread
shot(cue(335), (ctx, s) => {
  const t = s.lt;
  bgFlat(ctx, t);
  rect(ctx, 200, 260, 700, 560, '#fff', 20, 8);
  rect(ctx, 1020, 260, 700, 560, '#fff', 20, 8);
  outlinedText(ctx, 'СТОЯТЬ ПОД ОГНЁМ', 550, 330, 44, { stroke: 0, color: INK });
  outlinedText(ctx, 'ГДЕ ВЗЯТЬ ХЛЕБ', 1370, 330, 44, { stroke: 0, color: INK });
  for (let i = 0; i < 9; i++) marine(ctx, 300 + (i % 5) * 120, 560 + Math.floor(i / 5) * 200, 0.22 * pop(t, at(s, 338) + i * 0.05), {}, { weapon: 'bolter' });
  bread(ctx, 1370, 600, 0.9);
  if (t > at(s, 339)) { marine(ctx, 1600, 760, 0.3, idlePose(t), LT, LT_PAL); youArrow(ctx, 1600, 560, t); }
  outlinedText(ctx, 'УМЕЮТ МНОГИЕ', 550, 880, 50 * pop(t, at(s, 338)), { color: C.gold });
  outlinedText(ctx, 'ПОЧТИ НИКТО', 1370, 880, 50 * pop(t, at(s, 339)), { color: C.gold });
});
