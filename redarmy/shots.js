// Red Army soldier: 8 ranks, 66 paragraphs. Each scene() is cut into beats on narration phrases.

const card = (k, n) => shot(PT(k), (ctx, s) => newsreelCard(ctx, n, s.lt), { fade: 0.4 });
const FH = (x, y, s) => [x, y, 450 * s]; // focus helper: feet position and scale
const A = (st, txt) => st.lt - st.ph(txt); // seconds since a phrase started
const snowFg = (seed = 1, n = 70) => (ctx, st) => snowFX(ctx, st.t, n, 40, seed, 1.6);

// ===================== 1. КРАСНОАРМЕЕЦ =====================
card(0, 1);

// 18, a girl next door; "war" on the loudspeaker, the yard stands silent
scene(1, { look: 'home', focus: [FH(820, 980, 1.1), FH(1500, 980, 1)], tr: 'black', draw: (ctx, st) => {
  const war = A(st, 'Сегодня по радио');
  setYard(ctx, st);
  if (war > 0) for (let i = 0; i < 6; i++) soldier(ctx, 1100 + i * 140, 980, 0.8, { ...idlePose(st.t, i), head: -0.15, expr: 'sad' }, { side: 'civil', hat: i % 2 ? 'flat' : 'none', female: i % 3 === 0 }, i % 3 === 0 ? RA.mother : RA.civil);
  else mother(ctx, 1500, 980, 0.9, { ...idlePose(st.t), expr: 'happy' });
  soldier(ctx, 820, 980, 1.1, { ...idlePose(st.t), expr: war > 0 ? 'shock' : 'happy', look: 1 }, { side: 'civil', hat: 'none' }, pal(RA.civil, { shirt: '#e8e0d0' }));
  if (war > 0 && war < 3.5) { ctx.save(); ctx.globalAlpha = 0.6; ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; for (let i = 0; i < 3; i++) { const r = 40 + ((st.t * 80 + i * 40) % 120); ctx.beginPath(); ctx.arc(1590, 285, r, -0.5, 0.5); ctx.stroke(); } ctx.restore(); }
}, over: (ctx, st) => chron(ctx, '22 ИЮНЯ 1941', st.lt, st.ph('Сегодня по радио'), 4) });

// the recruiting office; mother drying rusks all night; father's handshake
scene(2, { look: 'warm', focus: [FH(700, 1000, 1), FH(1250, 1000, 1)], draw: (ctx, st) => {
  const night = A(st, 'Мать сушит'), hand = A(st, 'Отец ничего');
  if (night < 0) { setCommissariat(ctx, st); for (let i = 0; i < 7; i++) soldier(ctx, 160 + i * 240, 1000, 0.9, { ...idlePose(st.t, i), look: 1 }, { side: 'civil', hat: i % 2 ? 'flat' : 'none' }, pal(RA.civil, { shirt: ['#c8c0b0', '#8a8070', '#a8b0b8'][i % 3] })); return; }
  if (hand < 0) { setDugout(ctx, st); rect(ctx, 700, 760, 520, 40, '#6a4a2a', 6, 5); for (let i = 0; i < 12; i++) rect(ctx, 740 + (i % 6) * 70, 720 - Math.floor(i / 6) * 30, 50, 30, '#c8a060', 6, 3); mother(ctx, 960, 1000, 1.05, { ...idlePose(st.t), expr: 'sad', armR: -0.5, head: 0.15 }); return; }
  setYard(ctx, st, { evening: true });
  father(ctx, 1250, 1000, 1.05, { ...idlePose(st.t), armL: -0.9, expr: 'neutral', flip: true });
  soldier(ctx, 700, 1000, 1.0, { ...idlePose(st.t), armR: -0.9, expr: 'grit' }, { side: 'civil', hat: 'none', bag: true }, pal(RA.civil, { shirt: '#e8e0d0' }));
} });

// "krasnoarmeets": oversized tunic, wraps, a rifle older than you
scene(3, { look: 'warm', focus: [FH(960, 1020, 1.25)], draw: (ctx, st) => {
  setCommissariat(ctx, st);
  const w = A(st, 'Обмотки ты');
  hero(ctx, 1, 960, 1020, 1.25, w > 0 && w < 3 ? { lean: 0.5, bob: 60, expr: 'grit', armR: 1.2, armL: -1.2 } : { ...idlePose(st.t), expr: 'happy' });
}, over: (ctx, st) => { if (A(st, 'Через месяц') > 0) chron(ctx, 'ЧЕРЕЗ МЕСЯЦ: ДВЕ МИНУТЫ', st.lt, st.ph('Через месяц'), 3); } });

// the spoon rule
scene(4, { look: 'warm', focus: [FH(1300, 1020, 1.15), FH(640, 1020, 1.05)], draw: (ctx, st) => {
  setCommissariat(ctx, st);
  soldier(ctx, 1300, 1020, 1.15, { ...idlePose(st.t), expr: 'talk', time: st.t, armR: -0.7, flip: true }, { hat: 'pilotka', mustache: true, pogon: null, tri: 4, weapon: 'spoon' });
  hero(ctx, 1, 640, 1020, 1.05, { ...idlePose(st.t, 1), expr: 'shock', look: 1 });
}, over: (ctx, st) => { chron(ctx, 'ПОТЕРЯЕШЬ ЛОЖКУ = ГОЛОД', st.lt, st.ph('Потеряешь ложку'), 4); } });

// the death medallion: fill it, take it out, put it back
scene(5, { look: 'warm', frames: [{ x: 1040, y: 760, z: 1.4 }, { x: 1250, y: 760, z: 2.4 }, { x: 980, y: 720, z: 1.9 }], draw: (ctx, st) => {
  setDugout(ctx, st);
  hero(ctx, 1, 960, 1000, 1.25, { ...pose.write(st.t), expr: 'neutral' }, { weapon: 'none' });
  const o = A(st, 'Потом подумаешь') > 0 && A(st, 'Потом снова') < 0 ? 0 : 1;
  medallion(ctx, 1250, 760, 0.6, o);
} });

// three weeks of training
scene(6, { look: 'warm', focus: [FH(700, 1000, 1), FH(1300, 1000, 1)], tr: 'whip', draw: (ctx, st) => {
  setRoad(ctx, st, { burning: false });
  const b = st.beat % 3;
  if (b === 0) { rect(ctx, 1250, 760, 70, 160, '#c8b060', 30, 5); hero(ctx, 1, 960, 1000, 1, { gunA: -0.05 + Math.sin(st.t * 6) * 0.05, recoil: Math.abs(Math.sin(st.t * 6)), expr: 'grit' }, { bayonet: true }); }
  if (b === 1) for (let i = 0; i < 3; i++) hero(ctx, 1, 400 + i * 500 + (st.t * 40) % 200, 1050, 0.9, pose.crawl(st.t + i));
  if (b === 2) { hero(ctx, 1, 960, 1000, 1.1, { ...pose.dig(st.t) }, { weapon: 'shovel' }); ctx.fillStyle = '#6a5038'; ctx.beginPath(); ctx.ellipse(1100, 1010, 160, 30, 0, 0, Math.PI * 2); ctx.fill(); }
} });

// first summer: retreat along dusty roads past burning villages
scene(7, { look: 'warm', focus: [FH(900, 1000, 0.95), FH(1500, 1000, 0.85)], tr: 'black', draw: (ctx, st) => {
  setRoad(ctx, st);
  for (let i = 0; i < 6; i++) mate(ctx, 200 + i * 200 + (st.t * 30) % 200, 1000 - (i % 2) * 20, 0.75, pose.trudge(st.t + i), i);
  hero(ctx, 1, 900, 1000, 0.95, pose.trudge(st.t));
  if (A(st, 'вы же вернётесь') > -0.5) { oldWoman(ctx, 1500, 1000, 0.85, { ...idlePose(st.t), expr: 'sad', armR: -0.8 }); }
}, over: (ctx, st) => chron(ctx, 'ЛЕТО 1941. ОТСТУПЛЕНИЕ', st.lt, 0.4, 4) });

// first letter, a folded triangle
scene(8, { look: 'warm', frames: [{ x: 1000, y: 760, z: 1.3 }, { x: 1080, y: 740, z: 2.1 }], draw: (ctx, st) => {
  setNightCamp(ctx, st);
  hero(ctx, 1, 960, 1000, 1.2, pose.write(st.t), { weapon: 'letter' });
  if (A(st, 'складывают') > 0) triangleLetter(ctx, 1180, 820, 0.9, Math.sin(st.t) * 0.05);
}, over: (ctx, st) => letterLine(ctx, 'Мама, у меня всё хорошо. Кормят. Не волнуйся.', st.lt, st.ph('Ты пишешь: мама')) });

scene(9, { look: 'night', frames: [{ x: 960, y: 720, z: 2.3 }], draw: (ctx, st) => { setNightCamp(ctx, st); hero(ctx, 1, 960, 1000, 1.2, { ...pose.sit(st.t), expr: 'sad', head: 0.2 }); } });

// ===================== 2. ЕФРЕЙТОР =====================
card(10, 2);

// one stripe: you got it because only you are left from the old ones
scene(11, { look: 'cold', focus: [FH(960, 1020, 1.15)], tr: 'black', draw: (ctx, st) => {
  setWinter(ctx, st, {});
  const alone = A(st, 'из старых остался');
  if (alone < 0) for (let i = 0; i < 5; i++) mate(ctx, 300 + i * 330, 1020, 0.85, idlePose(st.t, i), i, { coat: true, hat: 'ushanka' });
  else for (let i = 0; i < 5; i++) { if (i === 2) continue; ctx.save(); ctx.globalAlpha = 0.25; mate(ctx, 300 + i * 330, 1020, 0.85, {}, i, { coat: true, hat: 'ushanka' }); ctx.restore(); }
  hero(ctx, 2, 960, 1020, 1.15, { ...idlePose(st.t), expr: alone > 0 ? 'sad' : 'neutral' });
}, fg: snowFg(2) });

// winter at Moscow: rifle sticks to the fingers, bread chopped with an axe, sleeping in the snow
scene(12, { look: 'cold', focus: [FH(820, 1020, 1.1), FH(1350, 1020, 1)], tr: 'whip', draw: (ctx, st) => {
  setWinter(ctx, st, {});
  const sleep = A(st, 'Шинель у тебя');
  if (sleep < 0) {
    hero(ctx, 2, 820, 1020, 1.1, { ...idlePose(st.t), expr: 'grit' });
    mate(ctx, 1350, 1020, 1, { armR: -1.4 + Math.abs(Math.sin(st.t * 4)) * 1.2, expr: 'grit' }, 1, { coat: true, hat: 'ushanka', weapon: 'none' });
    rect(ctx, 1380, 900, 160, 40, '#8a6a3a', 16, 5);
  } else {
    for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(380 + i * 400, 1000); ctx.rotate(-Math.PI / 2); mate(ctx, 0, 0, 0.8, { blink: 1 }, i, { coat: true, hat: 'ushanka', weapon: 'none' }); ctx.restore(); }
  }
}, fg: snowFg(3, 110), over: (ctx, st) => chron(ctx, 'ПОДМОСКОВЬЕ. ЗИМА 1941', st.lt, st.ph('Ты под Москвой'), 4) });

// the hundred grams; makhorka is worth more than money
scene(13, { look: 'cold', focus: [FH(700, 1060, 1.05), FH(1250, 1060, 1.05)], draw: (ctx, st) => {
  setDugout(ctx, st);
  hero(ctx, 2, 700, 1060, 1.05, { ...pose.sit(st.t), armR: -1.6, expr: 'happy' }, { weapon: 'none' });
  mate(ctx, 1250, 1060, 1.05, { ...pose.sit(st.t + 1), armL: -1.4, expr: 'talk', time: st.t }, 1, { weapon: 'none', coat: true, hat: 'ushanka' });
  kotelok(ctx, 960, 1000, 0.8);
  if (A(st, 'махорку') > 0) { ctx.fillStyle = 'rgba(200,200,200,0.4)'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(1210 + Math.sin(st.t + i) * 30, 560 - ((st.t * 40 + i * 50) % 200), 20 + i * 8, 0, Math.PI * 2); ctx.fill(); } }
}, over: (ctx, st) => chron(ctx, '«НАРКОМОВСКИЕ» 100 ГРАММ', st.lt, 0.5, 3.5) });

// lice don't care about rank
scene(14, { look: 'cold', focus: [FH(700, 1020, 1.05), FH(1250, 1020, 1.05)], draw: (ctx, st) => {
  setNightCamp(ctx, st);
  hero(ctx, 2, 700, 1020, 1.05, { ...idlePose(st.t), armL: -2 + Math.sin(st.t * 14) * 0.2, expr: 'grit' }, { coat: false });
  if (A(st, 'политрук') > -0.5) { soldier(ctx, 1250, 1020, 1.05, { ...idlePose(st.t), armR: -1.3, armL: 1.3, expr: 'neutral', flip: true }, { hat: 'pilotka', officer: true, tri: 0 }, pal(RA.officer, { shirt: '#e8e0d0' })); rect(ctx, 1160, 600, 200, 110, '#7d7a52', 10, 5); }
  campfire(ctx, 960, 1040, 1.4, st.t);
}, over: (ctx, st) => { if (A(st, 'вши не различают') > 0) chron(ctx, 'ВШИ НЕ РАЗЛИЧАЮТ ЗВАНИЙ', st.lt, st.ph('вши не различают'), 4); } });

// forward for the first time: a village that is only chimneys; an old woman crosses you
scene(15, { look: 'cold', focus: [FH(820, 1020, 1.05), FH(1350, 1020, 0.95)], tr: 'whip', draw: (ctx, st) => {
  const v = A(st, 'Деревни нет');
  setWinter(ctx, st, { chimneys: v > -0.3 });
  if (v < 0) for (let i = 0; i < 6; i++) mate(ctx, 200 + i * 280 + st.t * 60, 1020, 0.8, pose.run(st.t + i * 0.3, 0.8), i, { coat: true, hat: 'ushanka' });
  else hero(ctx, 2, 820, 1020, 1.05, { ...idlePose(st.t), expr: 'sad' });
  if (v > 0) oldWoman(ctx, 1350, 1020, 0.95, { ...idlePose(st.t), armR: -1.8 + Math.sin(st.t * 3) * 0.3, expr: 'sad', flip: true });
}, fg: snowFg(4) });

scene(16, { look: 'cold', frames: [{ x: 960, y: 760, z: 1.4 }, { x: 960, y: 720, z: 2.1 }], draw: (ctx, st) => { setDugout(ctx, st); hero(ctx, 2, 960, 1000, 1.2, pose.write(st.t), { weapon: 'letter' }); }, over: (ctx, st) => letterLine(ctx, 'Мама, у меня всё хорошо. Немного холодно. Не волнуйся.', st.lt, 0.3) });

// ===================== 3. МЛАДШИЙ СЕРЖАНТ =====================
card(17, 3);

// your squad; the moustached brigade leader calls you "son"
scene(18, { look: 'warm', focus: [FH(660, 1020, 1.05), FH(1180, 1020, 1.05)], tr: 'black', draw: (ctx, st) => {
  setRoad(ctx, st, { burning: false });
  for (let i = 0; i < 8; i++) mate(ctx, 220 + i * 220 + (i > 3 ? 120 : 0), 940, 0.7, idlePose(st.t, i), i + 1);
  hero(ctx, 3, 660, 1020, 1.05, { ...idlePose(st.t), expr: A(st, 'сынок') > 0 && A(st, 'Через неделю') < 0 ? 'grit' : 'neutral' });
  soldier(ctx, 1180, 1020, 1.05, { ...idlePose(st.t, 2), expr: A(st, 'сынок') > 0 ? 'happy' : 'neutral', flip: true }, { hat: 'pilotka', wraps: true, weapon: 'rifle', mustache: true, gray: true }, pal(RA.soldier, { hair: '#7a6a5a', skin: '#d8a880' }));
}, over: (ctx, st) => chron(ctx, '«СЫНОК»', st.lt, st.ph('сынок'), 2.5) });

// order 227 read before the ranks
scene(19, { look: 'gray', focus: [FH(1300, 1020, 1.05), FH(600, 1020, 0.95)], tr: 'whip', draw: (ctx, st) => {
  setRoad(ctx, st, { burning: true });
  for (let i = 0; i < 7; i++) mate(ctx, 200 + i * 160, 1020, 0.8, { ...idlePose(st.t, i), expr: 'grit' }, i);
  soldier(ctx, 1450, 1020, 1.05, { ...idlePose(st.t), expr: 'talk', time: st.t, flip: true, armR: -1.2 }, { hat: 'cap', officer: true, strap: true, weapon: 'letter', tri: 0 });
}, over: (ctx, st) => { chron(ctx, 'ПРИКАЗ № 227', st.lt, st.ph('Выходит приказ'), 3); if (A(st, 'Ни шагу') > 0) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.font = '700 130px "Oswald"'; ctx.textAlign = 'center'; ctx.fillStyle = '#f0e6d2'; ctx.globalAlpha = clamp(A(st, 'Ни шагу') / 0.4) * (1 - clamp((A(st, 'Ни шагу') - 2.5) / 0.5)); ctx.shadowColor = '#000'; ctx.shadowBlur = 20; ctx.fillText('НИ ШАГУ НАЗАД', W / 2, 220); ctx.restore(); } } });

scene(20, { look: 'gray', frames: [{ x: 660, y: 640, z: 2.6 }], draw: (ctx, st) => { setRoad(ctx, st, { burning: true }); hero(ctx, 3, 660, 1020, 1.05, { ...idlePose(st.t), expr: 'sad' }); } });

// war is mostly a shovel
scene(21, { look: 'warm', focus: [FH(700, 960, 1.05), FH(1250, 960, 1.05)], draw: (ctx, st) => {
  setTrench(ctx, st, { summer: true });
  for (let i = 0; i < 4; i++) mate(ctx, 260 + i * 470, 960, 1, pose.dig(st.t + i * 0.7), i, { weapon: 'shovel' });
  hero(ctx, 3, 960, 960, 1.05, pose.dig(st.t + 0.3), { weapon: 'shovel' });
  ctx.fillStyle = '#6a5038'; for (let i = 0; i < 6; i++) { const p = (st.t * 1.4 + i * 0.17) % 1; ctx.fillRect(1100 + p * 200, 700 - Math.sin(p * Math.PI) * 140, 14, 14); }
}, over: (ctx, st) => chron(ctx, 'ВИНТОВКОЙ ЧАС. ЛОПАТОЙ НЕДЕЛЮ', st.lt, st.ph('Винтовкой ты'), 3.5) });

// the brigade leader's rusk; next day he's gone; a letter to his wife
scene(22, { look: 'gray', frames: [{ x: 960, y: 540, z: 1 }, { x: 760, y: 700, z: 1.9 }, { x: 1250, y: 620, z: 1.9 }], tr: 'black', draw: (ctx, st) => {
  setTrench(ctx, st, { summer: true, smoke: true });
  const gone = A(st, 'На следующий день');
  hero(ctx, 3, 700, 960, 1.05, gone > 0 ? { ...pose.write(st.t), expr: 'sad' } : { ...idlePose(st.t), armR: -0.8, expr: 'neutral' }, gone > 0 ? { weapon: 'letter' } : {});
  if (gone < 0) soldier(ctx, 1250, 960, 1.05, { ...idlePose(st.t), armL: -1.0, expr: 'happy', flip: true }, { hat: 'pilotka', wraps: true, weapon: 'none', mustache: true, gray: true }, pal(RA.soldier, { hair: '#7a6a5a', skin: '#d8a880' }));
  else { ctx.fillStyle = '#5a4430'; ctx.beginPath(); ctx.ellipse(1250, 960, 180, 50, 0, Math.PI, 0); ctx.fill(); rect(ctx, 1240, 700, 20, 240, '#6a5038', 3, 4); rect(ctx, 1170, 760, 160, 18, '#6a5038', 3, 4); }
} });
scene(23, { look: 'warm', frames: [{ x: 960, y: 760, z: 1.4 }, { x: 960, y: 720, z: 2.1 }], draw: (ctx, st) => { setDugout(ctx, st); hero(ctx, 3, 960, 1000, 1.2, pose.write(st.t), { weapon: 'letter' }); }, over: (ctx, st) => letterLine(ctx, 'Мама, у меня всё хорошо. Меня повысили. Не волнуйся.', st.lt, 0.3) });

// ===================== 4. СЕРЖАНТ =====================
card(24, 4);

// the city on the Volga; counting houses; Germans next door
scene(25, { look: 'fire', focus: [FH(560, 1080, 1.1), FH(1450, 760, 0.6)], tr: 'black', shake: 2, draw: (ctx, st) => {
  setStalingrad(ctx, st);
  // cutaway of the house: our floor and the enemy across the street
  rect(ctx, 200, 520, 680, 560, '#5a4e46', 4, 7); rect(ctx, 240, 560, 600, 480, '#2e2824', 4, 5);
  hero(ctx, 4, 560, 1060, 1.0, { ...idlePose(st.t), expr: 'grit', look: 1 });
  mate(ctx, 760, 1060, 0.9, { ...pose.aim(st.t) }, 2, { hat: 'helmet' });
  for (let i = 0; i < 2; i++) german(ctx, 1380 + i * 160, 760, 0.55, { ...idlePose(st.t, i), flip: true }, i);
  if (A(st, 'Иногда в тишине') > 0) chron(ctx, '...', st.lt, st.ph('Иногда в тишине'), 2);
}, over: (ctx, st) => chron(ctx, 'СТАЛИНГРАД', st.lt, st.ph('Город на Волге'), 4) });

// no front, only stairwells; the shovel and the grenade
scene(26, { look: 'fire', focus: [FH(900, 1040, 1.05)], tr: 'whip', shake: 5, draw: (ctx, st) => {
  setStalingrad(ctx, st);
  const b = st.beat % 3;
  if (b === 0) { hero(ctx, 4, 800, 1040, 1.05, pose.fire(st.t)); for (let i = 0; i < 4; i++) tracer(ctx, 1000, 640, 1900, 600 + i * 30, st.t + i * 0.2, 3, '#ffe28a'); }
  if (b === 1) { hero(ctx, 4, 900, 1040, 1.05, { armR: -2.6 + clamp((st.bt % 1.5) / 0.4) * 3.2, expr: 'grit' }, { weapon: 'none' }); blastFX(ctx, 1600, 900, 0.8, (st.bt % 1.5) - 0.6, st.beat); }
  if (b === 2) { mate(ctx, 1200, 1040, 1, pose.run(st.t), 1, { hat: 'helmet', weapon: 'ppsh' }); hero(ctx, 4, 700, 1040, 1.05, pose.run(st.t + 0.3)); }
} });

// the encirclement closes, nothing changes for you
scene(27, { look: 'fire', frames: [{ x: 960, y: 540, z: 1 }, { x: 600, y: 740, z: 1.9 }], tr: 'fade', draw: (ctx, st) => {
  setStalingrad(ctx, st, { winter: true });
  // a map inset with the ring closing
  rect(ctx, 1150, 160, 600, 420, '#d8ccb0', 6, 6);
  ctx.strokeStyle = '#2a4a8a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(1180, 560); ctx.bezierCurveTo(1350, 420, 1420, 300, 1520, 180); ctx.stroke();
  const p = clamp((st.lt - 0.8) / 3);
  ctx.strokeStyle = '#c8282a'; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(1450, 370, 120, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p); ctx.stroke();
  hero(ctx, 4, 600, 1080, 1.05, { ...idlePose(st.t), expr: 'grit' });
}, fg: snowFg(5) });

// shoulder boards instead of collar tabs
scene(28, { look: 'cold', frames: [{ x: 960, y: 560, z: 1.3 }, { x: 960, y: 640, z: 2.6 }, { x: 960, y: 560, z: 1.8 }], draw: (ctx, st) => {
  setStalingrad(ctx, st, { winter: true, fire: false });
  const p = A(st, 'на плечах');
  hero(ctx, 4, 960, 1080, 1.2, { ...idlePose(st.t), expr: A(st, 'снайперам') > 0 ? 'shock' : 'neutral' }, p > 0 ? { tri: undefined, pogon: { lych: 3 } } : {});
  if (A(st, 'Старики ворчат') > 0 && A(st, 'Тебе всё равно') < 0) mate(ctx, 1450, 1080, 1, { ...idlePose(st.t), expr: 'angry', flip: true }, 1, { mustache: true, gray: true, pogon: { lych: 0 } });
}, fg: snowFg(6), over: (ctx, st) => chron(ctx, 'ЯНВАРЬ 1943. ПОГОНЫ', st.lt, st.ph('С нового года'), 4) });

// February: the shooting stops; out of the cellar into the snow
scene(29, { look: 'cold', focus: [FH(960, 1060, 1.1)], tr: 'black', draw: (ctx, st) => {
  setStalingrad(ctx, st, { winter: true, fire: false });
  hero(ctx, 4, 960, 1060, 1.1, { ...idlePose(st.t), expr: 'neutral', blink: (st.t % 1.2) < 0.2 ? 1 : 0, look: Math.sin(st.t * 0.6) });
}, fg: snowFg(7, 50) });
scene(30, { look: 'gray', frames: [{ x: 960, y: 560, z: 1.2 }], draw: (ctx, st) => {
  setStalingrad(ctx, st, { winter: true, fire: false });
  hero(ctx, 4, 760, 1060, 1, { ...idlePose(st.t), expr: 'sad' }); mate(ctx, 1000, 1060, 0.95, { ...idlePose(st.t, 1), expr: 'sad' }, 1, { hat: 'helmet' }); mate(ctx, 1220, 1060, 0.95, { ...idlePose(st.t, 2), expr: 'sad' }, 2, { hat: 'ushanka', coat: true });
}, fg: snowFg(8, 50), over: (ctx, st) => chron(ctx, 'ОСТАЛОСЬ ТРОЕ', st.lt, 0.8, 3.5) });
scene(31, { look: 'cold', frames: [{ x: 960, y: 760, z: 1.4 }, { x: 960, y: 720, z: 2.1 }], draw: (ctx, st) => { setDugout(ctx, st); hero(ctx, 4, 960, 1000, 1.2, pose.write(st.t), { weapon: 'letter' }); }, over: (ctx, st) => letterLine(ctx, 'Мама, у меня всё хорошо. Мы победили. Не волнуйся.', st.lt, 0.3) });

// ===================== 5. СТАРШИНА =====================
card(32, 5);

// the sergeant-major feeds the company
scene(33, { look: 'warm', focus: [FH(780, 1020, 1.1), FH(1350, 1020, 0.95)], tr: 'black', draw: (ctx, st) => {
  setRoad(ctx, st, { burning: false });
  fieldKitchen(ctx, 1500, 1000, 0.9, st.t);
  hero(ctx, 5, 780, 1020, 1.1, { ...idlePose(st.t), armR: -0.9 + Math.sin(st.t * 4) * 0.4, expr: 'happy' }, { weapon: 'spoon' });
  for (let i = 0; i < 4; i++) mate(ctx, 1080 + i * 150, 1040, 0.8, { ...idlePose(st.t, i), expr: 'happy', armR: -0.6 }, i, { weapon: 'none' });
}, over: (ctx, st) => chron(ctx, 'СТАРШИНА КОРМИТ', st.lt, st.ph('Потому что старшина'), 3) });
scene(34, { look: 'warm', frames: [{ x: 960, y: 560, z: 1.6 }, { x: 960, y: 520, z: 2.4 }], draw: (ctx, st) => {
  setCommissariat(ctx, st);
  hero(ctx, 5, 1150, 1040, 1.1, { ...idlePose(st.t), expr: 'talk', time: st.t, armR: -0.7, flip: true }, { weapon: 'spoon' });
  ctx.save(); ctx.globalAlpha = 0.6; hero(ctx, 1, 720, 1040, 0.95, { ...idlePose(st.t), expr: 'shock' }); ctx.restore();
} });

// Kursk: tanks; the kitchen goes forward under fire
scene(35, { look: 'warm', frames: [{ x: 960, y: 640, z: 1.05 }, { x: 900, y: 800, z: 1.5 }, { x: 1100, y: 760, z: 1.3 }], tr: 'flash', shake: 6, draw: (ctx, st) => {
  setKursk(ctx, st);
  const b = st.beat % 3;
  layer(ctx, st, 0.3, () => { for (let i = 0; i < 4; i++) { ptank(ctx, 1900 - ((st.t * 40 + i * 300) % 1900), 820, 0.5, st.t, -1, i === 1 && st.lt > 6); t34(ctx, 300 + i * 260, 900, 0.55, st.t, 1, true); } });
  if (b === 0) blastFX(ctx, 600 + (st.beat * 300) % 900, 980, 1, st.bt - 0.4, st.beat);
  if (b === 1) { kotelok(ctx, 960, 980, 1.4); ctx.save(); ctx.translate(960, 900 - Math.abs(Math.sin(st.t * 30)) * 14); kotelok(ctx, 0, 0, 0.8); ctx.restore(); }
  if (b === 2) { fieldKitchen(ctx, 600 + st.bt * 120, 1060, 0.8, st.t); hero(ctx, 5, 1000 + st.bt * 120, 1060, 1, pose.run(st.t, 0.7)); blastFX(ctx, 1500, 1000, 0.8, st.bt - 1, 9); }
}, over: (ctx, st) => chron(ctx, 'КУРСКАЯ ДУГА. ЛЕТО 1943', st.lt, 0.5, 4) });

// you can get anything: trophy blankets, "second front" stew, felt boots, clean footwraps
scene(36, { look: 'warm', frames: [{ x: 960, y: 560, z: 1.2 }, { x: 960, y: 640, z: 2 }], tr: 'whip', draw: (ctx, st) => {
  setDugout(ctx, st);
  const items = [['ОДЕЯЛА', '#6a6a7a'], ['«ВТОРОЙ ФРОНТ»', '#8a8a92'], ['ВАЛЕНКИ', '#4a4440'], ['ЧИСТЫЕ ПОРТЯНКИ', '#e8e0d0']];
  items.forEach(([n, c], i) => { if (st.lt < 1 + i * 1.6) return; const x = 380 + i * 390; rect(ctx, x - 110, 760, 220, 120, c, 10, 6); ctx.save(); ctx.fillStyle = '#efe6d2'; ctx.font = '700 30px "Oswald"'; ctx.textAlign = 'center'; ctx.fillText(n, x, 740); ctx.restore(); });
  hero(ctx, 5, 960, 1140, 1.0, { ...idlePose(st.t), expr: 'happy', armL: -0.6, armR: 0.6 });
} });

// "you should go to officer courses" — you know why they're short of officers
scene(37, { look: 'gray', focus: [FH(700, 1040, 1.05), FH(1250, 1040, 1.05)], tr: 'black', draw: (ctx, st) => {
  setTrench(ctx, st, { summer: true, smoke: true });
  hero(ctx, 5, 700, 1000, 1.05, { ...idlePose(st.t), expr: A(st, 'Потом перестаёшь') > 0 ? 'sad' : 'happy' });
  soldier(ctx, 1250, 1000, 1.05, { ...idlePose(st.t), expr: 'talk', time: st.t, flip: true }, { hat: 'cap', officer: true, strap: true, pogon: { stars: 3 } });
} });
scene(38, { look: 'warm', frames: [{ x: 960, y: 760, z: 1.4 }, { x: 960, y: 720, z: 2.1 }], draw: (ctx, st) => { setDugout(ctx, st); hero(ctx, 5, 960, 1000, 1.2, pose.write(st.t), { weapon: 'letter' }); }, over: (ctx, st) => letterLine(ctx, 'Мама, у меня всё хорошо. Я теперь при кухне. Это почти тыл.', st.lt, 0.3) });
scene(39, { look: 'fire', frames: [{ x: 960, y: 540, z: 1.1 }], shake: 8, draw: (ctx, st) => { setKursk(ctx, st); blastFX(ctx, 960, 960, 1.4, st.lt - 0.2, 4); } });

// ===================== 6. МЛАДШИЙ ЛЕЙТЕНАНТ =====================
card(40, 6);

// courses: map, artillery, reports; one small star
scene(41, { look: 'warm', focus: [FH(960, 1040, 1.15)], tr: 'black', draw: (ctx, st) => {
  setCommissariat(ctx, st);
  rect(ctx, 520, 300, 880, 420, '#d8ccb0', 6, 6);
  ctx.strokeStyle = '#2a4a8a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(560, 600); ctx.bezierCurveTo(800, 500, 1000, 640, 1360, 420); ctx.stroke();
  ctx.strokeStyle = '#c8282a'; ctx.beginPath(); ctx.moveTo(700, 360); ctx.lineTo(900, 480); ctx.lineTo(860, 440); ctx.moveTo(900, 480); ctx.lineTo(860, 490); ctx.stroke();
  hero(ctx, A(st, 'Ты выходишь') > 0 ? 6 : 5, 960, 1080, 1.15, { ...idlePose(st.t), expr: A(st, 'Ты выходишь') > 0 ? 'happy' : 'grit' });
}, over: (ctx, st) => chron(ctx, 'КОМАНДИР ВЗВОДА', st.lt, st.ph('Командир взвода'), 3) });

// "Vanka the platoon leader"; thirty men, eighteen years old, like you once
scene(42, { look: 'warm', focus: [FH(960, 1060, 1.05), FH(500, 980, 0.8)], tr: 'whip', draw: (ctx, st) => {
  setForest(ctx, st);
  for (let i = 0; i < 9; i++) mate(ctx, 160 + i * 200, 960 - (i % 2) * 20, 0.72, { ...idlePose(st.t, i), expr: i % 3 ? 'shock' : 'neutral' }, i, { hair: 'short' });
  hero(ctx, 6, 960, 1080, 1.05, { ...idlePose(st.t), expr: 'neutral' });
  if (A(st, 'видишь себя') > 0) { ctx.save(); ctx.globalAlpha = 0.45; hero(ctx, 1, 1400, 1080, 0.9, idlePose(st.t)); ctx.restore(); }
}, over: (ctx, st) => chron(ctx, '«ВАНЬКА-ВЗВОДНЫЙ»', st.lt, st.ph('ванька'), 3) });

// you teach them: spoon, dig deeper, keep your head down, no needless heroics
scene(43, { look: 'warm', focus: [FH(700, 1040, 1.05), FH(1250, 1040, 0.9)], draw: (ctx, st) => {
  setTrench(ctx, st, { summer: true });
  hero(ctx, 6, 700, 980, 1.05, { ...idlePose(st.t), expr: 'talk', time: st.t, armR: -1.1 + Math.sin(st.t * 3) * 0.2 });
  for (let i = 0; i < 3; i++) mate(ctx, 1100 + i * 260, 980, 0.9, { ...idlePose(st.t, i), expr: 'neutral', look: -1 }, i);
  ['ЛОЖКА ЗА ГОЛЕНИЩЕМ', 'КОПАЙ ГЛУБЖЕ', 'НЕ ВЫСОВЫВАЙСЯ', 'НЕ ГЕРОЙСТВУЙ'].forEach((tx, i) => { const a = st.ph(['Ложка за', 'Копай', 'Не высовывайся', 'Не геройствуй'][i]); if (st.lt > a && st.lt < a + 2.2) chron(ctx, tx, st.lt, a, 2); });
} });

// Belarus: only forward; people come out of the forests and ask where you were
scene(44, { look: 'warm', focus: [FH(820, 1040, 1.05), FH(1350, 1040, 0.95)], tr: 'whip', draw: (ctx, st) => {
  setForest(ctx, st, { swamp: true });
  const ppl = A(st, 'Люди выходят');
  if (ppl < 0) { for (let i = 0; i < 6; i++) mate(ctx, 100 + i * 300 + st.t * 90 % 300, 1040, 0.85, pose.run(st.t + i * 0.2, 0.8), i); t34(ctx, 1400 + Math.sin(st.t) * 10, 980, 0.6, st.t, 1); }
  else { hero(ctx, 6, 820, 1040, 1.05, { ...idlePose(st.t), expr: 'sad' }); oldWoman(ctx, 1150, 1040, 0.9, { ...pose.hug(), expr: 'sad', tear: true, time: st.t }); mother(ctx, 1420, 1040, 0.9, { ...idlePose(st.t), expr: 'sad', armR: -1.5 }); soldier(ctx, 1650, 1040, 0.7, idlePose(st.t, 2), { side: 'civil', hat: 'none' }, pal(RA.civil, { shirt: '#8a8070' })); }
}, over: (ctx, st) => chron(ctx, 'БЕЛОРУССИЯ. 1944', st.lt, st.ph('Белоруссия'), 4) });

// a prisoner, a boy in glasses; you send him to HQ alive
scene(45, { look: 'night', focus: [FH(700, 1040, 1.05), FH(1250, 1040, 0.85)], tr: 'black', draw: (ctx, st) => {
  setNightCamp(ctx, st);
  hero(ctx, 6, 700, 1040, 1.05, { ...idlePose(st.t), expr: A(st, 'запрещаешь') > 0 ? 'angry' : 'neutral', armR: A(st, 'запрещаешь') > 0 ? -1.5 : 0 });
  german(ctx, 1250, 1040, 0.85, { ...idlePose(st.t), expr: 'shock', armL: 2.5, armR: -2.5, bob: Math.sin(st.t * 30) * 2 }, 0, { hat: 'none', weapon: 'none' });
  mate(ctx, 1600, 1040, 0.95, { ...idlePose(st.t), expr: 'angry', flip: true }, 2);
  if (A(st, 'дрожат руки') > -1) { ctx.save(); ctx.translate(700 + Math.sin(st.t * 40) * 3, 0); ctx.restore(); }
} });

// medal "For Courage"; nineteen out of thirty
scene(46, { look: 'gray', focus: [FH(960, 1060, 1.15)], draw: (ctx, st) => {
  setForest(ctx, st);
  hero(ctx, 6, 960, 1060, 1.15, { ...pose.salute(), expr: 'neutral' }, { medal: A(st, 'вручает') > 0.6 });
  if (A(st, 'девятнадцать') > -1) for (let i = 0; i < 30; i++) { ctx.save(); ctx.globalAlpha = i < 19 ? 0.9 : 0.15; const x = 300 + (i % 15) * 95, y = 340 + Math.floor(i / 15) * 130; mate(ctx, x, y, 0.22, {}, i); ctx.restore(); }
}, over: (ctx, st) => chron(ctx, '30 → 19', st.lt, st.ph('девятнадцать'), 3) });
scene(47, { look: 'warm', frames: [{ x: 960, y: 760, z: 1.4 }, { x: 960, y: 720, z: 2.1 }], draw: (ctx, st) => { setDugout(ctx, st); hero(ctx, 6, 960, 1000, 1.2, pose.write(st.t), { weapon: 'letter' }); }, over: (ctx, st) => letterLine(ctx, 'Мама, у меня всё хорошо. Я теперь офицер. Представляешь?', st.lt, 0.3) });

// ===================== 7. ЛЕЙТЕНАНТ =====================
card(48, 7);

// the border you retreated from; the roadside sign
scene(49, { look: 'gray', focus: [FH(820, 1040, 1.05), FH(1400, 1000, 0.8)], tr: 'black', draw: (ctx, st) => {
  setRoad(ctx, st, { burning: false });
  for (let i = 0; i < 5; i++) mate(ctx, 120 + i * 220 + (st.t * 40) % 220, 1040, 0.8, pose.march(st.t + i * 0.3), i);
  hero(ctx, 7, 820, 1040, 1.05, pose.march(st.t));
  rect(ctx, 1390, 600, 16, 400, '#6a5038', 3, 4);
  rect(ctx, 1200, 560, 420, 130, '#e8e0cc', 6, 5);
  ctx.save(); ctx.fillStyle = '#3a2a20'; ctx.font = '700 30px "Oswald"'; ctx.textAlign = 'center'; ctx.fillText('ВОТ ОНА,', 1410, 610); ctx.fillText('ПРОКЛЯТАЯ ГЕРМАНИЯ', 1410, 650); ctx.restore();
} });

// everything is foreign: neat houses, tiled roofs
scene(50, { look: 'gray', focus: [FH(820, 1060, 1.05), FH(1300, 1060, 0.9)], tr: 'whip', draw: (ctx, st) => {
  setGermany(ctx, st);
  hero(ctx, 7, 820, 1060, 1.05, { ...idlePose(st.t), expr: 'neutral', look: Math.sin(st.t * 0.5) });
  mate(ctx, 1300, 1060, 0.9, { ...idlePose(st.t, 1), expr: 'shock', look: -1 }, 1);
} });

// a letter from home after half a year: neighbour's handwriting; your brother's death notice
scene(51, { look: 'gray', frames: [{ x: 960, y: 560, z: 1.3 }, { x: 960, y: 600, z: 2.2 }, { x: 960, y: 460, z: 2.6 }], draw: (ctx, st) => {
  setGermany(ctx, st);
  hero(ctx, 7, 960, 1100, 1.2, { ...idlePose(st.t), expr: A(st, 'похоронку') > 0 ? 'sad' : 'happy', armR: -1.0, head: 0.15 }, { weapon: 'letter' });
}, over: (ctx, st) => letterLine(ctx, '...у нас всё хорошо...', st.lt, st.ph('Мама пишет'), 960, 46) });
scene(52, { look: 'gray', frames: [{ x: 960, y: 520, z: 2.2 }, { x: 960, y: 700, z: 2.6 }], draw: (ctx, st) => {
  setGermany(ctx, st);
  hero(ctx, 7, 960, 1100, 1.2, { ...idlePose(st.t), expr: 'sad', armR: A(st, 'складываешь') > 0 ? -2.2 : -1.0, head: 0.15 }, { weapon: 'letter' });
} });
scene(53, { look: 'gray', frames: [{ x: 960, y: 540, z: 1.05 }], draw: (ctx, st) => { setGermany(ctx, st); hero(ctx, 7, 960, 1080, 0.8, { ...idlePose(st.t), expr: 'sad' }); } });

// ===================== 8. КАПИТАН =====================
card(54, 8);

// battalion commander at 22 with grey temples
scene(55, { look: 'gray', focus: [FH(820, 1060, 1.15), FH(1350, 1060, 1)], tr: 'black', draw: (ctx, st) => {
  setGermany(ctx, st);
  hero(ctx, 8, 820, 1060, 1.15, { ...idlePose(st.t), expr: 'neutral' });
  if (A(st, 'Старшина твоего') > -0.5) hero(ctx, 5, 1350, 1060, 1.0, { ...pose.salute(), expr: A(st, 'сынок') > 0 ? 'sad' : 'neutral', flip: true }, { mustache: true, gray: true });
}, over: (ctx, st) => chron(ctx, 'КОМБАТ. 22 ГОДА', st.lt, st.ph('Комбат'), 3) });

// Berlin: the last battles, streets, cellars, stairs
scene(56, { look: 'fire', frames: [{ x: 960, y: 620, z: 1.05 }, { x: 800, y: 780, z: 1.6 }, { x: 1250, y: 760, z: 1.4 }], tr: 'flash', shake: 6, draw: (ctx, st) => {
  setBerlin(ctx, st);
  const b = st.beat % 3;
  if (b === 0) { hero(ctx, 8, 700, 1060, 1.05, pose.run(st.t), { weapon: 'ppsh' }); for (let i = 0; i < 4; i++) mate(ctx, 300 + i * 360, 1080, 0.9, pose.run(st.t + i * 0.2), i, { hat: 'helmet', weapon: 'ppsh' }); }
  if (b === 1) { mate(ctx, 800, 1060, 1.05, pose.fire(st.t), 1, { hat: 'helmet', weapon: 'ppsh' }); for (let i = 0; i < 4; i++) tracer(ctx, 1000, 640, 1900, 600 + i * 30, st.t + i * 0.2, 3, '#ffe28a'); blastFX(ctx, 1600, 900, 0.9, st.bt - 0.8, st.beat); }
  if (b === 2) { t34(ctx, 400 + st.bt * 150, 1060, 0.9, st.t, 1, true); hero(ctx, 8, 1400, 1060, 1, { ...pose.aim(st.t) }, { weapon: 'ppsh' }); }
}, over: (ctx, st) => chron(ctx, 'БЕРЛИН. АПРЕЛЬ 1945', st.lt, st.ph('Берлин'), 4) });

// the domed building: names on the walls; you add your brother's
scene(57, { look: 'gray', frames: [{ x: 960, y: 540, z: 1 }, { x: 960, y: 640, z: 1.8 }, { x: 980, y: 680, z: 2.6 }], tr: 'whip', draw: (ctx, st) => {
  setBerlin(ctx, st);
  rect(ctx, 520, 560, 880, 400, '#8a8276', 4, 6);
  const names = ['ИВАНОВ МОСКВА', 'ЗДЕСЬ БЫЛИ СИБИРЯКИ', 'ДОШЛИ!', 'ПЕТРЕНКО ХАРЬКОВ', 'ИЗ СТАЛИНГРАДА'];
  ctx.save(); ctx.fillStyle = '#2a2420'; ctx.font = '700 34px "Oswald"'; names.forEach((n, i) => { ctx.save(); ctx.translate(560 + (i % 2) * 400, 620 + i * 60); ctx.rotate((i % 3 - 1) * 0.06); ctx.fillText(n, 0, 0); ctx.restore(); });
  const mine = A(st, 'Ты пишешь своё'), bro = A(st, 'приписываешь');
  if (mine > 0) { ctx.fillStyle = '#7a1a14'; ctx.fillText('...И ТЫ, СО СВОЕГО ДВОРА', 700, 900); }
  if (bro > 0) { ctx.fillStyle = '#7a1a14'; ctx.fillText('И БРАТ', 1180, 900); }
  ctx.restore();
  hero(ctx, 8, 1250, 1120, 1.0, { ...idlePose(st.t), armR: mine > 0 && bro < 3 ? -1.8 + Math.sin(st.t * 10) * 0.1 : 0, expr: 'sad' });
} });

// no silence, only exhaustion; the cook feeds German children
scene(58, { look: 'warm', focus: [FH(700, 1060, 1), FH(1300, 1060, 0.9)], tr: 'fade', draw: (ctx, st) => {
  setBerlin(ctx, st);
  if (A(st, 'Повар') < 0) for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(300 + i * 420, 1060); mate(ctx, 0, 0, 0.9, { ...pose.sit(st.t), blink: 1, head: 0.3 }, i); ctx.restore(); }
  else { fieldKitchen(ctx, 600, 1060, 0.9, st.t); mate(ctx, 860, 1060, 1, { ...idlePose(st.t), armR: -0.9, expr: 'happy' }, 1, { weapon: 'spoon' }); for (let i = 0; i < 3; i++) soldier(ctx, 1150 + i * 170, 1060, 0.62, { ...idlePose(st.t, i), armR: -0.8, expr: 'neutral' }, { side: 'civil', hat: 'none', female: i === 1 }, pal(RA.civil, { shirt: '#9a9a8a' })); }
} });

// night: shooting in the air. It's peace.
scene(59, { look: 'night', focus: [FH(960, 1060, 1.1)], tr: 'flash', draw: (ctx, st) => {
  setBerlin(ctx, st, { flag: true });
  for (let i = 0; i < 10; i++) { const p = ((st.t * 0.5 + i * 0.1) % 1); const x = 200 + i * 170, y = 1000 - p * 900; ctx.fillStyle = ['#ff4a3a', '#5aff6a', '#fff2a0'][i % 3]; ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 30; ctx.beginPath(); ctx.arc(x + Math.sin(p * 6) * 30, y, 10, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0; }
  for (let i = 0; i < 5; i++) mate(ctx, 260 + i * 360, 1080, 0.85, A(st, 'Это не атака') > 0 ? pose.cheer(st.t + i) : { gunA: -1.2, fire: true, time: st.t + i }, i, { weapon: 'ppsh', hat: 'pilotka' });
  hero(ctx, 8, 960, 1080, 1.1, A(st, 'Это мир') > 0 ? { ...idlePose(st.t), expr: 'happy' } : { ...idlePose(st.t), expr: 'shock' });
}, over: (ctx, st) => chron(ctx, '9 МАЯ 1945', st.lt, st.ph('Это мир'), 5) });

// what to do with your hands
scene(60, { look: 'warm', frames: [{ x: 960, y: 560, z: 1.2 }, { x: 960, y: 760, z: 2.2 }, { x: 960, y: 480, z: 2.6 }], draw: (ctx, st) => {
  setBerlin(ctx, st, { flag: true });
  hero(ctx, 8, 960, 1080, 1.15, { ...idlePose(st.t), armL: Math.sin(st.t * 0.8) * 0.3, armR: -Math.sin(st.t * 0.8) * 0.3, expr: 'neutral', look: Math.sin(st.t * 0.4) });
}, over: (ctx, st) => chron(ctx, 'КОПАТЬ. СТРЕЛЯТЬ. ДЕРЖАТЬ ЛОЖКУ.', st.lt, st.ph('копать'), 4) });

// home a year later: the station, the yard, mother at the gate
scene(61, { look: 'home', frames: [{ x: 960, y: 600, z: 1.1 }, { x: 860, y: 760, z: 1.7 }, { x: 1150, y: 740, z: 1.5 }], tr: 'black', draw: (ctx, st) => {
  const yard = A(st, 'Тот же двор');
  if (yard < 0) { setStation(ctx, st, { move: true }); hero(ctx, 8, 960, 1040, 1.05, pose.march(st.t)); return; }
  setYard(ctx, st);
  hero(ctx, 8, kf(st.lt, [[yard, 300], [yard + 4, 700]]), 1040, 1.05, st.lt < yard + 4 ? pose.march(st.t) : { ...idlePose(st.t), expr: 'sad' });
  if (A(st, 'Мать стоит') > -0.5) mother(ctx, 1350, 1040, 1.0, { ...idlePose(st.t), expr: 'shock', flip: true });
}, over: (ctx, st) => chron(ctx, '1946', st.lt, st.ph('Через год'), 3) });

scene(62, { look: 'home', focus: [FH(1000, 1040, 1.05)], draw: (ctx, st) => {
  setYard(ctx, st);
  hero(ctx, 8, 900, 1040, 1.05, pose.hug());
  mother(ctx, 1080, 1040, 0.95, { ...pose.hug(), flip: true, tear: true, time: st.t });
} });
scene(63, { look: 'home', frames: [{ x: 1000, y: 560, z: 2.2 }], draw: (ctx, st) => { setYard(ctx, st); hero(ctx, 8, 900, 1040, 1.05, { ...pose.hug(), expr: 'happy', tear: true, time: st.t }); mother(ctx, 1080, 1040, 0.95, { ...pose.hug(), flip: true, tear: true, time: st.t }); } , over: (ctx, st) => letterLine(ctx, 'Мама, у меня всё хорошо.', st.lt, 0.2, 980, 64) });
scene(64, { look: 'home', frames: [{ x: 960, y: 540, z: 1.0 }], draw: (ctx, st) => { setYard(ctx, st, { evening: true }); hero(ctx, 8, 900, 1040, 1.05, pose.hug()); mother(ctx, 1080, 1040, 0.95, { ...pose.hug(), flip: true }); } });

// the medallion stays in the breast pocket for life; the only one from the yard
scene(65, { look: 'home', frames: [{ x: 960, y: 560, z: 1.6 }, { x: 960, y: 520, z: 2.6 }, { x: 960, y: 540, z: 1.0 }], tr: 'fade', draw: (ctx, st) => {
  setYard(ctx, st, { evening: true });
  const r = A(st, 'Потому что');
  hero(ctx, 8, 960, 1080, 1.15, { ...idlePose(st.t), expr: 'sad', armR: -1.3 }, { medal: true });
  medallion(ctx, 1040, 760, 0.9, 1);
  if (r > 0) for (let i = 0; i < 8; i++) { ctx.save(); ctx.globalAlpha = 0.25 * clamp(r / 1.5); hero(ctx, 1, 260 + i * 200 + (i > 3 ? 240 : 0), 1060, 0.7, { ...idlePose(st.t, i) }); ctx.restore(); }
}, over: (ctx, st) => { if (st.lt > st.dur - 4) { ctx.fillStyle = `rgba(0,0,0,${clamp((st.lt - st.dur + 4) / 3)})`; ctx.fillRect(0, 0, W, H); } } });
