// Level 1: Аспирант (0 - 143 s). Also holds helpers shared by all shot files.

const at = (s, i) => s.at(window.CUES[i]); // local time of cue i inside the current shot
const HERO_KID = { kid: true, hair: 'spiky', scarf: true };
const LIVIUS = { kid: true, hair: 'short' };
const LIVIUS_PAL = pal(HUMAN_PAL.kid, { hair: '#e0b040', shirt: '#c0392b', scarf: '#c0392b' });
const APOTH = pal('ultra', { armor: '#eef0f2', armorDark: '#c9ced6', helm: '#eef0f2', rim: '#2d5bd1', trim: '#d8402f' });
const CHAOS = pal('ultra', { armor: '#26262c', armorDark: '#16161a', trim: '#c9a24a', rim: '#c9a24a', lens: '#ffd000', mark: '#c9a24a' });

function youArrow(ctx, x, y, t, label = 'ТЫ') {
  const b = Math.sin(t * 6) * 10;
  ctx.save();
  ctx.translate(x, y - 60 + b);
  ctx.fillStyle = C.gold; ctx.strokeStyle = INK; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(-26, -20); ctx.lineTo(26, -20); ctx.lineTo(26, 10); ctx.lineTo(44, 10); ctx.lineTo(0, 50); ctx.lineTo(-44, 10); ctx.lineTo(-26, 10); ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.restore();
  outlinedText(ctx, label, x, y - 110 + b, 48, { color: C.gold });
}

function walkerX(lt, x0, speed) { return x0 + lt * speed; }

// ---- 1.0 title card
shot(0, (ctx, s) => levelCard(ctx, 1, s.lt));

// ---- 1.1 Ultramar is the best place in the galaxy
shot(cue(2), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960 + t * 8, 560, 1.02);
  bgUltramarCity(ctx, t);
  const ppl = [[200, 0.9, 1], [520, 0.85, -1], [1350, 0.9, 1], [1650, 0.85, -1], [900, 0.95, 1]];
  ppl.forEach(([x, sc, d], i) => {
    const px = x + d * t * 40;
    shadow(ctx, px, 900, 60);
    human(ctx, px, 900, sc, { ...walkPose(t + i, 0.8, 0.3), flip: d < 0, expr: 'happy' }, { hair: i % 2 ? 'bun' : 'short', outfit: i % 2 ? 'dress' : 'plain' }, pal(HUMAN_PAL.citizen, { shirt: ['#e8e2d0', '#9fc3ff', '#f2c230', '#e8e2d0', '#cfe0ff'][i] }));
    if (s.lt > at(s, 4) + i * 0.15) bubble(ctx, ['Лучшее!', 'Точно!', 'Лучшее!', 'Факт!', 'Да!'][i], px, 420, px, 520, { size: 34, scale: pop(t, at(s, 4) + i * 0.15) });
  });
  ctx.restore();
  sticker(ctx, 'УЛЬТРАМАР', 960, 140, { size: 80, scale: pop(t, 0.1) });
  sticker(ctx, 'ЛУЧШЕЕ МЕСТО В ГАЛАКТИКЕ', 960, 270, { size: 50, bg: '#fff', scale: pop(t, at(s, 3)) });
  stamp(ctx, 'ЭТО ПРАВДА', 1500, 640, t, at(s, 5) + 0.8, { size: 70 });
});

// ---- 1.2 schools, order, clean streets, life expectancy 35
shot(cue(6), (ctx, s) => {
  const t = s.lt;
  bgFlat(ctx, t);
  const items = [['ШКОЛЫ', 0.2, '#9fc3ff'], ['ПОРЯДОК', 0.95, '#f2c230'], ['ЧИСТЫЕ УЛИЦЫ', 1.6, '#8fe0a0']];
  items.forEach(([label, a, col], i) => {
    const x = 400 + i * 560, sc = pop(t, a);
    iconCircle(ctx, x, 330, 150, col, (c) => {
      if (i === 0) book(c, 0, 0, 0.35, '');
      if (i === 1) { c.strokeStyle = INK; c.lineWidth = 14; for (let k = -1; k <= 1; k++) { c.beginPath(); c.moveTo(-70, k * 45); c.lineTo(70, k * 45); c.stroke(); } }
      if (i === 2) { c.strokeStyle = INK; c.lineWidth = 12; c.beginPath(); c.moveTo(-40, -80); c.lineTo(20, 40); c.stroke(); shape(c, [[0, 30], [50, 20], [80, 90], [20, 100]], '#c9a24a', 6); }
    }, sc);
    if (sc > 0.01) outlinedText(ctx, label, x, 540, 54 * sc);
  });
  const a = at(s, 7) - 0.4;
  if (t > a) {
    const n = Math.round(35 * clamp((t - at(s, 8)) / 1.0));
    ctx.save(); ctx.globalAlpha = clamp((t - a) / 0.3);
    outlinedText(ctx, 'СРЕДНЯЯ ПРОДОЛЖИТЕЛЬНОСТЬ ЖИЗНИ', 960, 700, 56);
    outlinedText(ctx, `${n} ЛЕТ`, 960, 840, 150, { color: C.gold });
    ctx.restore();
  }
  stamp(ctx, 'САНАТОРИЙ', 1450, 860, t, at(s, 9) + 0.6, { size: 80, color: '#2fae4f' });
});

// ---- 1.3 the street is underground: you are from Calth
shot(cue(10), (ctx, s) => {
  const t = s.lt;
  const y = kf(t, [[0.4, 540], [2.2, 1620]]);
  ctx.save(); camera(ctx, 960, y, 1);
  bgCalthSurface(ctx, t);
  ctx.save(); ctx.translate(0, 1080);
  ctx.beginPath(); ctx.rect(BX0, 0, BX1 - BX0, 1500); ctx.clip();
  bgCave(ctx, t);
  shadow(ctx, 900, 900, 70);
  human(ctx, 900, 900, 1.1, { ...idlePose(t), expr: 'neutral', look: 0.5 }, HERO_KID);
  youArrow(ctx, 900, 560, t);
  ctx.restore();
  // rock layer between surface and cave
  ctx.fillStyle = '#5a4a40'; ctx.fillRect(BX0, 860, BX1 - BX0, 260);
  ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.strokeRect(BX0, 860, BX1 - BX0, 260);
  ctx.restore();
  sticker(ctx, 'ПЛАНЕТА КАЛТ', 960, 120, { size: 70, scale: pop(t, at(s, 11)) });
});

// ---- 1.4 the sky kills: blue sun
shot(cue(12), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, 540, kf(t, [[0, 1], [6, 1.08]]));
  bgCalthSurface(ctx, t);
  const out = at(s, 13);
  const y = kf(t, [[out, 840], [out + 0.6, 800]]);
  const burn = clamp((t - out - 1.0) / 0.5);
  if (t > out) {
    ctx.save();
    ctx.globalAlpha = 1 - clamp((t - out - 2.6) / 0.6);
    const cols = burn > 0 ? Object.fromEntries(Object.keys(HUMAN_PAL.citizen).map((k) => [k, '#1a1414'])) : HUMAN_PAL.citizen;
    human(ctx, 370, y, 0.75, { expr: burn > 0 ? 'shock' : 'happy', armR: burn > 0 ? -2.6 : -0.3, armL: burn > 0 ? 2.6 : 0.2 }, { hair: 'short' }, cols);
    ctx.restore();
    if (burn > 0) for (let i = 0; i < 6; i++) {
      const p = clamp((t - out - 1.1 - i * 0.12) / 1.6);
      ctx.fillStyle = `rgba(90,90,90,${0.6 * (1 - p)})`;
      ctx.beginPath(); ctx.arc(370 + Math.sin(i * 2) * 40, 600 - p * 400, 40 + p * 60, 0, Math.PI * 2); ctx.fill();
    }
  }
  ctx.restore();
  stamp(ctx, 'БЕЗ СКАФАНДРА НЕ ВЫХОДИТЬ', 1120, 900, t, at(s, 14), { size: 54 });
});

// ---- 1.5 traitors tore the atmosphere off
shot(cue(15), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, 540, kf(t, [[0, 1], [4, 1.15]]));
  bgSpace(ctx, t, { nebula: 'rgba(160,40,40,0.35)' });
  const atmo = 1 - clamp((t - 0.6) / 1.8);
  planet(ctx, 960, 560, 330, '#c9b89a', '#a8906a', { atmo, seed: 7 });
  for (let i = 0; i < 3; i++) {
    const sx = 300 + i * 650, sy = 160 + (i % 2) * 60;
    ship(ctx, sx + Math.sin(t + i) * 20, sy, 0.6, '#26262c', i % 2 ? 1 : -1);
    if (t < 2.6) tracer(ctx, sx, sy + 40, 960 + (i - 1) * 120, 330, t + i * 0.2, 2.5, '#ff5a3a');
  }
  if (t > 0.6 && t < 2.8) for (let i = 0; i < 6; i++) explosion(ctx, 960 + Math.cos(i) * 320, 560 + Math.sin(i * 1.7) * 300, 0.4, t + i * 0.2, i + 1);
  ctx.restore();
  sticker(ctx, 'ПРЕДАТЕЛИ', 420, 900, { size: 60, bg: '#d8402f', color: '#fff', scale: pop(t, 0.3) });
  sticker(ctx, 'ЛЮДИ ЖИВУТ В ПЕЩЕРАХ', 1400, 960, { size: 50, scale: pop(t, at(s, 16)) });
});

// ---- 1.6 huge, bright, tidy caves
shot(cue(17), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 700 + t * 60, 560, 1.05);
  bgCave(ctx, t);
  const kx = 500 + t * 90;
  shadow(ctx, kx, 880, 60);
  human(ctx, kx, 880, 0.95, { ...walkPose(t), expr: 'happy' }, HERO_KID);
  ctx.restore();
  ['ОГРОМНЫЕ', 'СВЕТЛЫЕ', 'АККУРАТНЫЕ'].forEach((w, i) => sticker(ctx, w, 420 + i * 540, 160 + (i % 2) * 40, { size: 56, bg: '#fff', rot: (i - 1) * 0.05, scale: pop(t, 0.1 + i * 0.75) }));
  sticker(ctx, 'УЛЬТРАМАР\nи под землёй', 960, 900, { size: 54, scale: pop(t, at(s, 18)) });
});

// ---- 1.7 the plaza and the statue
shot(cue(19), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, kf(t, [[0, 600], [3, 480]]), kf(t, [[0, 1], [3, 1.25]]));
  bgCave(ctx, t, { statue: true, statueX: 960, statueScale: 0.8 });
  ctx.restore();
  sticker(ctx, 'ПЛОЩАДЬ', 300, 160, { size: 56, scale: pop(t, 0.2) });
  sticker(ctx, 'СТАТУЯ', 1600, 160, { size: 56, scale: pop(t, at(s, 20)) });
});

// ---- 1.8 flashback: the neighbour boy stealing mushrooms
shot(cue(21), (ctx, s) => {
  const t = s.lt;
  bgCave(ctx, t, { houses: true });
  // mushroom farm beds
  for (let i = 0; i < 7; i++) { rect(ctx, 120 + i * 250, 820, 220, 50, '#6a4a3a', 8, 5); for (let j = 0; j < 3; j++) mushroom(ctx, 160 + i * 250 + j * 70, 830, 0.7); }
  const grab = at(s, 22) + 1.4;
  const run = grab + 0.6;
  const bx = t < run ? kf(t, [[0, 200], [grab, 820]]) : 820 + (t - run) * 520;
  const pose = t < grab ? walkPose(t, 0.8) : t < run ? { armR: -2.4, expr: 'happy' } : { ...walkPose(t, 2.2, 0.6), expr: 'happy' };
  shadow(ctx, bx, 960, 60);
  human(ctx, bx, 960, 0.95, pose, { hair: 'short' }, pal(HUMAN_PAL.citizen, { shirt: '#9a7a5a', pants: '#4a4a54' }));
  if (t > grab) mushroom(ctx, bx + 70, 960 - 280, 0.9);
  const angry = t > run;
  human(ctx, 1500, 960, 1, { ...idlePose(t), expr: angry ? 'angry' : 'neutral', armR: angry ? -2.6 + Math.sin(t * 18) * 0.25 : 0 }, { hair: 'bun', outfit: 'dress', apron: true }, HUMAN_PAL.mom);
  if (angry) bubble(ctx, 'ЭЙ! МОИ ГРИБЫ!', 1500, 380, 1480, 470, { size: 40, scale: pop(t, run) });
  tint(ctx, '#c08a40', 0.22);
  dreamFrame(ctx, '#fff', 'ДАВНО');
  sticker(ctx, 'СОСЕДСКИЙ ПАРЕНЬ', 1400, 120, { size: 46, scale: pop(t, 0.1) });
});

// ---- 1.9 he joins the Ultramarines
shot(cue(24), (ctx, s) => {
  const t = s.lt;
  bgStoneRoom(ctx, t, { banners: true, windows: false });
  rect(ctx, 1300, 160, 420, 600, '#2a2a40', 30, 8);
  ctx.fillStyle = '#9fd0ff'; ctx.globalAlpha = 0.5 + 0.2 * Math.sin(t * 5); ctx.fillRect(1320, 180, 380, 580); ctx.globalAlpha = 1;
  const bx = 300 + t * 520;
  shadow(ctx, bx, 960, 60);
  human(ctx, bx, 960, 0.95, { ...walkPose(t, 1.2), expr: 'happy' }, { hair: 'short' }, pal(HUMAN_PAL.citizen, { shirt: '#9a7a5a', pants: '#4a4a54' }));
  tint(ctx, '#c08a40', 0.22);
  dreamFrame(ctx, '#fff', 'ДАВНО');
  sticker(ctx, 'УШЁЛ В УЛЬТРАМАРИНЫ', 700, 160, { size: 50, scale: pop(t, 0.3) });
}, { fade: 0.3 });

// ---- 1.10 now he is marble
shot(cue(25), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, kf(t, [[0, 640], [3.2, 300]]), 1.6);
  bgCave(ctx, t, { statue: true, statueX: 960, statueScale: 0.8 });
  ctx.restore();
  // sparkle
  for (let i = 0; i < 4; i++) {
    const p = ((t * 0.8 + i * 0.25) % 1);
    ctx.save(); ctx.translate(700 + i * 180, 300 + (i % 2) * 260); ctx.rotate(p * 3); ctx.scale(1 - p, 1 - p);
    shape(ctx, [[0, -40], [10, -10], [40, 0], [10, 10], [0, 40], [-10, 10], [-40, 0], [-10, -10]], '#fff', 4);
    ctx.restore();
  }
  sticker(ctx, 'МРАМОР В ПОЛНЫЙ РОСТ', 960, 960, { size: 56, scale: pop(t, 0.2) });
}, { fade: 0.3 });

// ---- 1.11 mom: "That's a man who made it"
shot(cue(27), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 900, 560, 1.1);
  bgCave(ctx, t, { statue: true, statueX: 1450, statueScale: 0.75 });
  shadow(ctx, 520, 950, 80); shadow(ctx, 800, 950, 60);
  human(ctx, 520, 950, 1.05, { ...idlePose(t), expr: 'talk', time: t, armR: -2.2 + Math.sin(t * 3) * 0.05 }, { hair: 'bun', outfit: 'dress', apron: true }, HUMAN_PAL.mom);
  human(ctx, 800, 950, 0.95, { ...idlePose(t, 1), expr: 'neutral', look: 1, head: -0.1 }, HERO_KID);
  ctx.restore();
  bubble(ctx, 'ВОТ ЧЕЛОВЕК ПРОБИЛСЯ!', 560, 180, 520, 300, { size: 52, scale: pop(t, 0.1) });
});

// ---- 1.12 you want a statue
shot(cue(28), (ctx, s) => {
  const t = s.lt;
  bgCave(ctx, t);
  shadow(ctx, 420, 980, 80);
  human(ctx, 420, 980, 1.3, { ...idlePose(t), expr: 'happy', look: 1 }, HERO_KID);
  // thought cloud
  bubble(ctx, '', 1150, 430, 560, 560, { think: true, w: 1100, h: 640, scale: pop(t, 0.05) });
  const a1 = at(s, 29), a2 = a1 + 0.9;
  if (t > a1 - 0.2 && t < at(s, 30)) {
    // crown and biceps, crossed out
    shape(ctx, [[820, 460], [820, 360], [880, 410], [940, 330], [1000, 410], [1060, 360], [1060, 460]], C.gold, 6);
    crossOut(ctx, 940, 400, 260, 180, t, a1 + 0.4);
    const p = P(); p.moveTo(1260, 470); p.bezierCurveTo(1240, 360, 1330, 330, 1360, 400); p.bezierCurveTo(1420, 360, 1480, 430, 1460, 470); p.closePath();
    strokeFill(ctx, p, '#f0b98a', 6);
    crossOut(ctx, 1360, 400, 240, 180, t, a2 + 0.3);
    outlinedText(ctx, 'СЛАВА', 940, 540, 40); outlinedText(ctx, 'СИЛА', 1360, 540, 40);
  }
  if (t > at(s, 30) - 0.1) {
    ctx.save(); const sc = pop(t, at(s, 30) - 0.1);
    ctx.translate(1150, 640); ctx.scale(sc, sc); ctx.translate(-1150, -640);
    statue(ctx, 1150, 640, 0.42, { hair: 'short' });
    ctx.restore();
    outlinedText(ctx, 'СТАТУЮ', 1150, 120, 90, { color: C.gold });
  }
});

// ---- 1.13 in 200 years a kid walks past
shot(cue(31), (ctx, s) => {
  const t = s.lt;
  bgCave(ctx, t, { statue: true, statueX: 1200, statueScale: 0.75, statueOpts: { plaque: 'ТЫ' } });
  const stop = 2.0;
  const kx = t < stop ? 200 + t * 220 : 640;
  shadow(ctx, kx, 960, 60);
  human(ctx, kx, 960, 0.95, t < stop ? walkPose(t) : { ...idlePose(t), expr: 'happy', look: 1, head: -0.12 }, { kid: true, hair: 'bun' }, pal(HUMAN_PAL.kid, { shirt: '#8fbf6a', hair: '#8a5a2a' }));
  sticker(ctx, 'ЧЕРЕЗ 200 ЛЕТ', 360, 120, { size: 60, scale: pop(t, 0.1) });
  if (t > at(s, 33) - 0.2) bubble(ctx, 'ВОТ ЧЕЛОВЕК ПРОБИЛСЯ', 640, 330, 640, 520, { think: true, size: 46, scale: pop(t, at(s, 33) - 0.2) });
}, { fade: 0.3 });

// ---- 1.14 selection: only from Ultramar, huge competition
shot(cue(34), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, kf(t, [[0, 700], [10, 1200]]), 560, 1);
  bgStoneRoom(ctx, t, { banners: false });
  rect(ctx, 1500, 200, 560, 560, '#2a2a40', 20, 8);
  sticker(ctx, 'ПРИЁМ В ОРДЕН', 1780, 160, { size: 46 });
  for (let i = 0; i < 16; i++) {
    const x = 1450 - i * 120 + (i % 2) * 20;
    human(ctx, x, 980 - (i % 3) * 8, 0.75, { ...idlePose(t, i), expr: i % 3 ? 'neutral' : 'happy', flip: false }, { kid: true, hair: ['spiky', 'short', 'bun', 'long'][i % 4] }, pal(HUMAN_PAL.kid, { shirt: ['#6f8fb8', '#c0392b', '#8fbf6a', '#d9a03a'][i % 4] }));
  }
  ctx.restore();
  sticker(ctx, 'ТОЛЬКО ИЗ УЛЬТРАМАРА', 520, 140, { size: 50, scale: pop(t, 0.6) });
  sticker(ctx, 'КОНКУРС: 1000 ЧЕЛОВЕК НА МЕСТО', 760, 270, { size: 44, bg: '#fff', scale: pop(t, at(s, 36) + 0.6) });
  if (t > at(s, 38) - 0.3) {
    const a = at(s, 38);
    paper(ctx, 1450, 600, 560, 420, 'ЭКЗАМЕН', [{ text: '1. Сочинение', strike: clamp((t - a - 0.6) / 0.4) }, { text: '2. ВЫЖИТЬ', color: C.red, hidden: t < a + 1.1 }], { lineSize: 52 });
  }
});

// ---- 1.15 dropped on a wild planet
shot(cue(39), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 960, 540, 1);
  bgWild(ctx, t);
  const sx = kf(t, [[0, -400], [2.5, 2400]], (x) => x);
  ship(ctx, sx, 200, 0.7, '#2d5bd1');
  for (let i = 0; i < 6; i++) {
    const dropT = 0.4 + i * 0.25;
    if (t < dropT) continue;
    const x0 = lerp(-400, 2400, dropT / 2.5);
    const y = Math.min(940, 230 + (t - dropT) * 700);
    human(ctx, x0, y, 0.6, { expr: y < 940 ? 'shock' : 'sad', armL: y < 940 ? 2.6 : 0, armR: y < 940 ? -2.6 : 0 }, { kid: true, hair: i === 2 ? 'spiky' : 'short', scarf: i === 2 }, i === 2 ? HUMAN_PAL.kid : pal(HUMAN_PAL.kid, { shirt: '#8a7a6a' }));
  }
  ctx.restore();
  const a = at(s, 40);
  const words = [['ПЕЩЕР', 0.5], ['ЕДЫ', 1.6], ['МАМЫ', 2.6]];
  words.forEach(([w, d], i) => {
    if (t < a + d) return;
    sticker(ctx, 'НЕТ ' + w, 420 + i * 540, 160, { size: 60, bg: '#fff', scale: pop(t, a + d) });
    crossOut(ctx, 420 + i * 540, 160, 300, 100, t, a + d + 0.3);
  });
});

// ---- 1.16 survival: walking, puddles, chasing food
shot(cue(41), (ctx, s) => {
  const t = s.lt;
  const drink = at(s, 43), chase = at(s, 43) + 1.3;
  const kx = t < drink ? 300 + t * 160 : t < chase ? 300 + drink * 160 : 300 + drink * 160 + (t - chase) * 300;
  ctx.save(); camera(ctx, Math.min(kx + 300, 1400), 560, 1.05);
  bgWild(ctx, t);
  rect(ctx, 300 + drink * 160 + 50, 960, 180, 24, '#6a9ac8', 12, 4);
  if (t > chase - 0.3) critter(ctx, kx + 220 + (t - chase) * 60, 960, 1, t, 1);
  let pose;
  if (t < drink) pose = { ...walkPose(t, 0.7, 0.3), expr: 'sad' };
  else if (t < chase) pose = { lean: 0.5, armR: -0.6, expr: 'neutral', bob: 30 };
  else pose = { ...walkPose(t, 2.2, 0.6), expr: 'angry' };
  shadow(ctx, kx, 960, 60);
  human(ctx, kx, 960, 0.9, pose, HERO_KID, pal(HUMAN_PAL.kid, { shirt: '#5f7fa8' }));
  ctx.restore();
  sticker(ctx, 'ДЕНЬ 1', 200, 110, { size: 50, scale: pop(t, 0.1) });
});

// ---- 1.17 day four: the apothecary and his tick
shot(cue(45), (ctx, s) => {
  const t = s.lt;
  const close = at(s, 47) - 0.3;
  if (t < close) {
    ctx.save(); camera(ctx, 960, 560, 1);
    bgWild(ctx, t);
    const ax = kf(t, [[0, 1600], [1.4, 1250]]);
    shadow(ctx, ax, 1000, 160);
    marine(ctx, ax, 1000, 0.85, { ...idlePose(t), ...(t < 1.4 ? walkPose(t, 0.7, 0.25) : {}), armR: -0.9 }, { weapon: 'none' }, APOTH);
    tablet(ctx, ax + 140, 640, 0.6, t);
    shape(ctx, [[1380, 1000], [1420, 760], [1560, 700], [1700, 780], [1750, 1000]], '#5a4436', 6);
    shadow(ctx, 600, 1000, 60);
    human(ctx, 600, 1000, 0.9, { ...idlePose(t), expr: 'sad', bruise: true }, HERO_KID, pal(HUMAN_PAL.kid, { shirt: '#5f7fa8' }));
    ctx.restore();
    sticker(ctx, 'ДЕНЬ 4', 200, 110, { size: 50 });
    sticker(ctx, 'АПОТЕКАРИЙ', 1260, 140, { size: 50, bg: '#fff', scale: pop(t, 0.6) });
  } else {
    bgFlat(ctx, t, '#2a3f7a', '#24376e');
    tablet(ctx, 960, 560, 2.6, t);
    rect(ctx, 760, 420, 90, 90, '#fff', 8, 6);
    checkMark(ctx, 805, 465, 1.2, t, at(s, 48));
    outlinedText(ctx, 'АСПИРАНТ №4817', 1050, 470, 40, { align: 'left' });
    if (t > at(s, 49)) { sticker(ctx, 'МОЛОДЕЦ', 960, 860, { size: 70, bg: '#fff', scale: pop(t, at(s, 49)) }); crossOut(ctx, 960, 860, 380, 110, t, at(s, 49) + 0.3); }
    if (t > at(s, 50)) outlinedText(ctx, 'ГАЛОЧКА', 960, 140, 110 * pop(t, at(s, 50)), { color: C.gold });
  }
});

// ---- 1.18 the duel: a wardrobe weighing three of your fathers
shot(cue(51), (ctx, s) => {
  const t = s.lt;
  const scaleT = at(s, 52) + 1.4, judges = at(s, 55) - 0.2;
  if (t < scaleT || t > judges) {
    ctx.save(); camera(ctx, 960, 600, 1);
    bgArena(ctx, t);
    shadow(ctx, 1300, 1000, 200);
    marine(ctx, 1300, 1000, 1.0, idlePose(t), { weapon: 'none' }, pal('ultra', { rim: '#f2c230' }));
    shadow(ctx, 620, 1000, 50);
    human(ctx, 620, 1000, 0.8, { ...idlePose(t), expr: 'shock', armL: 0.4, armR: -0.4 }, HERO_KID);
    ctx.restore();
    sticker(ctx, 'ПОЕДИНОК', 960, 120, { size: 70, scale: pop(t, 0.1) });
    if (t > judges) {
      // judges with score cards
      for (let i = 0; i < 3; i++) {
        const x = 300 + i * 220;
        rect(ctx, x - 80, 260, 160, 110, '#fff', 8, 6);
        ctx.fillStyle = INK; ctx.font = font(30); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(['ПРОВАЛ', 'КРАСИВО?', '?/10'][i], x, 315);
      }
      sticker(ctx, 'ОЦЕНИВАЮТ ПРОВАЛ', 1500, 280, { size: 48, bg: '#fff', scale: pop(t, judges + 0.4) });
    }
  } else {
    bgFlat(ctx, t, '#3a5a2a', '#34522a');
    // balance scale: marine vs three dads
    const tilt = kf(t, [[scaleT, 0], [scaleT + 0.8, 0.12]], ease.back);
    ctx.save(); ctx.translate(960, 300); ctx.rotate(tilt);
    rect(ctx, -700, -15, 1400, 30, '#c9a24a', 10, 6);
    ctx.restore();
    rect(ctx, 930, 300, 60, 700, '#c9a24a', 8, 6);
    const ly = 300 + Math.sin(tilt) * -680, ry = 300 + Math.sin(tilt) * 680;
    for (let i = 0; i < 3; i++) human(ctx, 1560 + (i - 1) * 60, ry + 440 - i * 120, 0.55, { expr: 'shock' }, { hair: 'short' }, HUMAN_PAL.dad);
    marine(ctx, 360, ly + 440, 0.6, { expr: 'neutral' }, { weapon: 'none' });
    outlinedText(ctx, '= 3 ТВОИХ ОТЦА', 1500, 120, 60, { color: C.gold });
  }
});

// ---- 1.19 you get up three times, then not; "promising"
shot(cue(57), (ctx, s) => {
  const t = s.lt;
  const ups = [0.1, 0.6, 1.1].map((d) => at(s, 57) + d);
  const fourth = at(s, 58) + 0.2, verdict = at(s, 59) + 0.4;
  if (t < verdict) {
    ctx.save(); camera(ctx, 960, 620, 1.15, t > fourth && t < fourth + 0.4 ? 8 : 0, t);
    bgArena(ctx, t);
    // knock-down cycle: lying then up
    let lying = false;
    ups.forEach((u) => { if (t > u - 0.25 && t < u) lying = true; });
    if (t > fourth) lying = true;
    shadow(ctx, 900, 1000, 70);
    if (lying) human(ctx, 1000, 990, 0.9, { lean: -1.5, expr: t > fourth ? 'angry' : 'shock', bruise: true }, HERO_KID);
    else human(ctx, 900, 1000, 0.9, { ...idlePose(t), expr: 'grit', bruise: t > ups[0] }, HERO_KID);
    marine(ctx, 1450, 1000, 0.95, { ...idlePose(t), armL: 0.2 }, { weapon: 'none' });
    ctx.restore();
    ups.forEach((u, i) => { if (t > u) outlinedText(ctx, String(i + 1), 400 + i * 160, 220, 130 * pop(t, u), { color: C.gold }); });
    if (t > fourth) { outlinedText(ctx, '4', 880, 220, 130 * pop(t, fourth), { color: '#aaa' }); crossOut(ctx, 880, 220, 110, 120, t, fourth + 0.3); }
  } else {
    bgFlat(ctx, t);
    paper(ctx, 960, 560, 900, 700, 'ВЕДОМОСТЬ', ['Аспирант №4817', 'Поединок: проиграл', 'Встал: 3 раза', 'Взгляд: да'], { lineSize: 46 });
    stamp(ctx, 'ПЕРСПЕКТИВЕН', 1060, 800, t, verdict + 0.3, { size: 80, color: '#2fae4f' });
  }
});

// ---- 1.20 Livius: faster and funnier
shot(cue(60), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 900 + t * 120, 560, 1);
  bgWild(ctx, t);
  const lx = 800 + t * 160, hx = 560 + t * 130;
  shadow(ctx, lx, 980, 60); shadow(ctx, hx, 980, 60);
  human(ctx, hx, 980, 0.85, { ...walkPose(t, 2.0, 0.55), expr: 'grit' }, HERO_KID);
  human(ctx, lx, 980, 0.85, { ...walkPose(t + 0.3, 2.2, 0.6), expr: 'happy' }, LIVIUS, LIVIUS_PAL);
  if (t > 0.3) youArrow(ctx, hx, 620, t);
  sticker(ctx, 'ЛИВИЙ', lx, 560, { size: 46, bg: '#fff', scale: pop(t, 0.4) });
  if (t > at(s, 62) + 1.2) bubble(ctx, 'Догоняй, черепаха!', lx + 120, 380, lx + 30, 520, { size: 38, scale: pop(t, at(s, 62) + 1.2) });
  ctx.restore();
});

// ---- 1.21 Livius fails. Not pretty.
shot(cue(63), (ctx, s) => {
  const t = s.lt;
  const fall = 0.9;
  ctx.save(); camera(ctx, 960, 600, 1.1, t > fall && t < fall + 0.3 ? 10 : 0, t);
  bgArena(ctx, t);
  rect(ctx, 650, 990, 620, 40, '#6a4a2a', 20, 5);
  const lx = t < fall ? 600 + t * 300 : 960;
  if (t < fall) human(ctx, lx, 1000, 0.9, { ...walkPose(t, 2.2, 0.6), expr: 'happy' }, LIVIUS, LIVIUS_PAL);
  else {
    const drag = at(s, 65) - 0.1;
    const dx = t > drag ? (t - drag) * 260 : 0;
    human(ctx, 1000 + dx, 1000, 0.9, { lean: 1.5, expr: 'sad' }, LIVIUS, LIVIUS_PAL);
    if (t > drag - 0.6) {
      marine(ctx, 1340 + dx, 1000, 0.7, walkPose(t), { weapon: 'none' });
      marine(ctx, 1560 + dx, 1000, 0.7, walkPose(t + 0.5), { weapon: 'none' });
    }
  }
  ctx.restore();
  stamp(ctx, 'НЕКРАСИВО', 600, 260, t, at(s, 64), { size: 80 });
  sticker(ctx, 'ДОМОЙ НЕ ОТПУСКАЮТ', 1400, 160, { size: 46, bg: '#fff', scale: pop(t, at(s, 65)) });
});

// ---- 1.22 the Order wastes nothing: servitors
shot(cue(66), (ctx, s) => {
  const t = s.lt;
  bgStoneRoom(ctx, t, { wall: '#5a5a6a', floor: '#4a4a56', windows: false });
  // conveyor + machine
  rect(ctx, -100, 900, 2200, 50, '#3d3f48', 10, 6);
  for (let i = 0; i < 24; i++) circ(ctx, -80 + i * 95 + ((t * 120) % 95), 925, 18, '#7d8796', 4);
  rect(ctx, 760, 380, 420, 520, '#7d8796', 20, 8);
  rect(ctx, 820, 640, 300, 260, '#15131a', 10, 6);
  for (let i = 0; i < 3; i++) { ctx.fillStyle = Math.sin(t * 6 + i) > 0 ? '#ff3b2f' : '#5a1a14'; ctx.beginPath(); ctx.arc(860 + i * 110, 470, 22, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.font = font(36); ctx.fillText('ОРДЕН', 970, 560);
  const inX = 200 + t * 160;
  if (inX < 820) human(ctx, inX, 900, 0.8, { lean: 1.4, expr: 'sad' }, LIVIUS, LIVIUS_PAL);
  const outT = at(s, 68) - 0.2;
  if (t > outT) {
    const ox = 1200 + (t - outT) * 160;
    human(ctx, ox, 900, 0.9, { ...walkPose(t, 0.6, 0.25) }, { outfit: 'servitor', hair: 'bald', kid: true }, HUMAN_PAL.servitor);
  }
  sticker(ctx, 'МАТЕРИАЛ НЕ ВЫБРАСЫВАЕТ', 960, 150, { size: 54, scale: pop(t, 0.6) });
  if (t > outT + 0.4) sticker(ctx, 'СЕРВИТОР', 1600, 420, { size: 48, bg: '#fff', scale: pop(t, outT + 0.4) });
});

// ---- 1.23 you stop turning around when someone laughs
shot(cue(70), (ctx, s) => {
  const t = s.lt;
  ctx.save(); camera(ctx, 900 + t * 120, 560, 1.1);
  bgStoneRoom(ctx, t, { wall: '#6a6a80', floor: '#55556a' });
  const kx = 700 + t * 120;
  for (let i = 0; i < 3; i++) human(ctx, kx - 400 - i * 150, 980, 0.8, { ...idlePose(t, i), expr: 'happy' }, { kid: true, hair: ['short', 'bun', 'long'][i] }, pal(HUMAN_PAL.kid, { shirt: ['#8a7a6a', '#7a6a8a', '#6a8a7a'][i] }));
  shadow(ctx, kx, 980, 60);
  human(ctx, kx, 980, 0.9, { ...walkPose(t, 0.6, 0.25), expr: 'sad' }, HERO_KID);
  if (t > at(s, 71)) for (let i = 0; i < 3; i++) outlinedText(ctx, 'ха-ха', kx - 420 - i * 150, 600 - ((t * 40 + i * 30) % 80), 40, { color: '#fff' });
  ctx.restore();
  tint(ctx, '#1a1a3a', 0.25);
  vignette(ctx, 0.6);
});
