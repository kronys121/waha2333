// Horus, levels 5-8 (paragraphs 67-159).

function rotten(ctx, x, y, s, pose = {}) { human(ctx, x, y, s, pose, { hair: 'long', scar: true }, pal(HUMAN_PAL.serf, { skin: '#9aa87a', shirt: '#3a4a2a', pants: '#2a3020', hair: '#2a2a1a' })); }
function erebus(ctx, x, y, s, pose = {}) { drawRig(ctx, rig('marine', { plain: true, weapon: 'none', helmet: 'off', hair: 'bald', tattoo: true }), x, y, s, pose, EREBUS); }
function lyingHorus(ctx, x, y, s, stage = 'wm', pose = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(-Math.PI / 2); horus(ctx, 0, 0, s, { blink: 1, ...pose }, stage); ctx.restore(); }
function whispers(ctx, t, n = 14, seed = 2) {
  const words = ['он бросил вас', 'он использовал вас', 'тебя забудут', 'ты лучше', 'он ушёл', 'почему он молчит', 'ты первый', 'возьми трон'];
  const r = rng(seed);
  ctx.save(); ctx.textAlign = 'center';
  for (let i = 0; i < n; i++) {
    const x = 200 + r() * 1520, y = 150 + r() * 700 + Math.sin(t + i) * 20;
    ctx.globalAlpha = 0.25 + 0.35 * Math.abs(Math.sin(t * 0.7 + i));
    ctx.font = `italic 700 ${26 + r() * 20}px "Old Standard TT"`; ctx.fillStyle = '#b8e070';
    ctx.fillText(words[i % words.length], x, y);
  }
  ctx.restore();
}
function legionLanding(ctx, t, colors, x0, n = 6, s = 0.4, flip = false) {
  for (let i = 0; i < n; i++) marine(ctx, x0 + i * 170, 1020 - (i % 2) * 40, s, { ...walkPose(t + i * 0.3, 0.8, 0.3), flip }, { plain: true, weapon: 'bolter' }, colors[i % colors.length]);
}
const LOYAL3 = [pal('ultra', { armor: '#2a2a30', armorDark: '#1a1a1e', trim: '#c9ced6', rim: '#c9ced6' }), pal('ultra', { armor: '#2f7a3a', armorDark: '#1f5a2a', trim: '#c9a24a', rim: '#c9a24a' }), pal('ultra', { armor: '#1e1e24', armorDark: '#121216', trim: '#eef0f2', rim: '#eef0f2' })];
const TRAIT4 = [pal('ultra', { armor: '#1a2a5a', armorDark: '#101a3a', trim: '#b3262a', rim: '#b3262a' }), pal('ultra', { armor: '#7f8a90', armorDark: '#5f6a70', trim: '#f2c230', rim: '#f2c230' }), EREBUS, pal('ultra', { armor: '#2a6a7a', armorDark: '#1a4a5a', trim: '#c9ced6', rim: '#c9ced6' })];

// ================= LEVEL 5 =================
card(67, 5);

// Davin: the man you trusted rebelled
S(68, (ctx, s) => sc(ctx, s, { bg: bgDavin, tint: '#0a140a' }, () => {}) || place(ctx, 'ДАВИН', s.lt, 0.3, 'луна'));

// the warrior lodges you allowed
S(69, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTemple(c, t), tint: '#0a1408', ta: 0.35 }, (t) => {
  for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; soh(ctx, 960 + Math.cos(a) * 520, 1000 + Math.sin(a) * 60, 0.45, { flip: Math.cos(a) > 0, head: 0.15 }, false); }
  bigLine(ctx, 'Просто братство.', t, ph(s, 'Просто братство'), 4, 160, 60, '#b8c890');
}));

// you go there in person
S(70, (ctx, s) => sc(ctx, s, { bg: bgDavin, tint: '#0a140a', cam: [960, 560, 1, 1060, 560, 1.12] }, (t) => {
  horus(ctx, kf(t, [[0, 500], [8, 900]]), 1000, 0.85, walkPose(t, 0.4, 0.2), 'wm');
}));

// in the dark, the rotting man with the anathame
S(71, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTunnel(c, t), tint: '#0a1408', ta: 0.5, vig: 0.85 }, (t) => {
  rotten(ctx, 1150, 1000, 1.1, { ...idlePose(t), expr: 'grit', armR: -0.6 });
  if (t > ph(s, 'Анафем') - 0.5) {
    ctx.save(); ctx.translate(1300, 640); ctx.rotate(-0.5); ctx.shadowColor = '#c0ff60'; ctx.shadowBlur = 30;
    shape(ctx, [[-10, 0], [10, 0], [6, -220], [0, -260], [-6, -220]], '#c8d0a0', 4); ctx.restore();
    nameTag(ctx, 'АНАФЕМ', 1300, 300, t, ph(s, 'Анафем'), 56);
  }
}));

// the blade goes through your armour like cloth
S(72, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTunnel(c, t), tint: '#1a0a08', ta: 0.4, shake: 3 }, (t) => {
  const stab = ph(s, 'клинок проходит');
  rotten(ctx, 1000, t > stab - 1 ? 1040 : 1000, 1.0, t > stab - 1 ? { lean: 1.4, expr: 'shock' } : { armR: -1.4, expr: 'angry' });
  horus(ctx, 760, 1000, 0.9, { ...idlePose(t), expr: t > stab ? 'shock' : 'angry' }, 'wm');
  if (t > stab && t < stab + 0.3) { ctx.fillStyle = 'rgba(200,255,120,0.4)'; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); }
}));

// at first a scratch, then it burns
S(73, (ctx, s) => sc(ctx, s, { bg: (c) => fillBg(c, '#0a0a0a'), cam: [960, 470, 2.2, 960, 470, 2.4] }, (t) => {
  horus(ctx, 960, 1000, 0.9, { ...idlePose(t), expr: t > ph(s, 'Потом рана') ? 'grit' : 'neutral' }, 'wm');
  const g = clamp((t - ph(s, 'Потом рана')) / 2);
  glow(ctx, 1010, 690, 160, 'rgba(180,255,100,A)', g * 0.8);
}));

// for the first time in your life you are dying
S(74, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgMed(c, t), tint: '#1a2010', ta: 0.4 }, (t) => {
  rect(ctx, 460, 860, 1000, 80, '#bdb5a6', 12, 6);
  lyingHorus(ctx, 990, 860, 0.75, 'wm', { expr: 'grit' });
  marine(ctx, 1600, 1060, 0.55, { ...idlePose(t), expr: 'sad', flip: true }, { plain: true, weapon: 'none' }, APOTH);
  bigLine(ctx, 'Впервые в жизни ты умираешь.', t, ph(s, 'Впервые в жизни'), 5, 160, 56);
}));

// Abaddon at your side; Erebus comes
S(75, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgMed(c, t), tint: '#1a1010', ta: 0.4 }, (t) => {
  rect(ctx, 260, 860, 900, 80, '#bdb5a6', 12, 6);
  lyingHorus(ctx, 760, 860, 0.7, 'wm', { expr: 'grit' });
  captain(ctx, 'abaddon', 1260, 1060, 0.62, { ...idlePose(t), expr: 'sad', flip: true });
  if (t > ph(s, 'Эреб') - 0.3) { erebus(ctx, kf(t, [[ph(s, 'Эреб') - 0.3, 2100], [ph(s, 'Эреб') + 1.5, 1600]]), 1060, 0.62, { ...idlePose(t), expr: 'talk', time: t, flip: true }); nameTag(ctx, 'ЭРЕБ', 1600, 330, t, ph(s, 'Эреб'), 50); }
}));

// your sons hesitate
S(76, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgMed(c, t), tint: '#1a1010', ta: 0.45, cam: [960, 520, 1.3, 960, 520, 1.4] }, (t) => {
  ['abaddon', 'aximand', 'torgaddon'].forEach((w, i) => captain(ctx, w, 640 + i * 320, 1000, 0.65, { ...idlePose(t, i), expr: 'sad', look: i - 1 }));
}));

// they carry you into the temple
S(77, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTemple(c, t), tint: '#0a1408', ta: 0.4 }, (t) => {
  const x = kf(t, [[0, 300], [3, 900]]);
  lyingHorus(ctx, x + 130, 760, 0.6, 'wm');
  for (let i = 0; i < 4; i++) soh(ctx, x - 100 + i * 170, 1040, 0.42, walkPose(t + i * 0.2, 0.5, 0.2), false);
}));

// voices come
S(78, (ctx, s) => sc(ctx, s, { bg: (c) => fillBg(c, '#060a06'), tint: '#0a1408', ta: 0.3 }, (t) => {
  lyingHorus(ctx, 1000, 760, 0.7, 'wm');
  glow(ctx, 960, 600, 700, 'rgba(140,220,90,A)', 0.25);
  whispers(ctx, t, 10);
}));

// they show you the future
S(79, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgEye(c, t) }, () => {}) || bigLine(ctx, 'Они показывают тебе будущее.', s.lt, 0.3, 4, 540, 60));

// ten thousand years: a god-emperor, temples on every world
S(80, (ctx, s) => sc(ctx, s, { bg: (c, t) => { bgHall(c, t); glow(c, 960, 400, 900, 'rgba(255,200,100,A)', 0.4); }, tint: '#2a1a08', ta: 0.3, cam: [960, 560, 1.1, 960, 520, 1.25] }, (t) => {
  statue(ctx, 960, 760, 1.0, { colors: EMPEROR, hair: 'long', laurel: true });
  for (let i = 0; i < 9; i++) human(ctx, 120 + i * 210, 1060, 0.7, { lean: 0.35, head: 0.2, expr: 'neutral' }, { hair: ['short', 'bun', 'long'][i % 3], hood: true, outfit: 'robe' }, pal(HUMAN_PAL.citizen, { shirt: '#5a4a3a' }));
  if (t > ph(s, 'сжигают')) for (let i = 0; i < 3; i++) drawFire(ctx, 300 + i * 650, 900, 1, t, { fire1: '#e8462a', fire2: '#ffa22a', fire3: '#fff07a' });
}));

// and you are not there
S(81, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgHall(c, t), tint: '#1a1010', ta: 0.45 }, (t) => {
  const crumble = clamp((t - 1) / 4);
  for (let i = 0; i < 4; i++) { ctx.save(); ctx.globalAlpha = 1 - crumble * (0.4 + i * 0.15); ctx.translate(0, crumble * 60 * (i + 1)); statue(ctx, 300 + i * 440, 760, 0.45, { colors: MARBLE }); ctx.restore(); }
  bigLine(ctx, 'Оружием, которое отец выбросил.', t, ph(s, 'Оружием'), 5, 160, 56);
}));

// "he used you"
S(82, (ctx, s) => sc(ctx, s, { bg: (c) => fillBg(c, '#060a06'), tint: '#0a1408', ta: 0.3 }, (t) => {
  lyingHorus(ctx, 1000, 760, 0.7, 'wm', { expr: 'sad' });
  whispers(ctx, t, 18, 4);
  bigLine(ctx, 'он использовал вас', t, 0.3, 5, 540, 80, '#c8f080');
}));

// you resist; you scream they lie
S(83, (ctx, s) => sc(ctx, s, { bg: (c) => fillBg(c, '#060a06'), cam: [960, 470, 2, 960, 470, 2.1], shake: 3 }, (t) => horus(ctx, 960, 1000, 0.9, { ...idlePose(t), expr: 'angry' }, 'wm')));

// they know where to strike: memories
S(84, (ctx, s) => sc(ctx, s, { bg: (c) => fillBg(c, '#060a06'), tint: '#0a1408', ta: 0.3 }, (t) => {
  const beats = [[ph(s, 'про Хтонию'), (x, y) => { ctx.save(); ctx.translate(x, y); youngHorus(ctx, 0, 0, 0.5, { legL: -1.2, legR: -1, bob: 40 }); ctx.restore(); }],
    [ph(s, 'про каждого брата'), (x, y) => { emperor(ctx, x, y, 0.35, { armL: -1.2, armR: 1.2 }); sanguinius(ctx, x + 120, y, 0.33, {}); }],
    [ph(s, 'про Улланор'), (x, y) => { titan(ctx, x, y, 0.35, t); }],
    [ph(s, 'про чиновников') - 0.5, (x, y) => { for (let i = 0; i < 3; i++) human(ctx, x - 100 + i * 100, y, 0.4, {}, { hair: 'bald', outfit: 'robe' }, pal(HUMAN_PAL.citizen, { shirt: '#3a3a44' })); }]];
  beats.forEach(([a, fn], i) => { if (t < a) return; ctx.save(); ctx.globalAlpha = 0.85 * clamp((t - a) / 0.6); rect(ctx, 120 + i * 440, 280, 380, 420, '#1a2416', 10, 6); ctx.beginPath(); ctx.rect(120 + i * 440, 280, 380, 420); ctx.clip(); fn(310 + i * 440, 660); ctx.restore(); });
}));

// they only repeat what you already thought
S(85, (ctx, s) => sc(ctx, s, { bg: (c) => fillBg(c, '#06060a'), cam: [960, 470, 2, 960, 470, 2.2] }, (t) => horus(ctx, 960, 1000, 0.9, { ...idlePose(t), expr: 'sad', head: -0.1 }, 'wm')) || bigLine(ctx, 'Не признаваясь даже себе.', s.lt, ph(s, 'Не признаваясь'), 4, 900, 56));

// another future: you on the throne
S(86, (ctx, s) => sc(ctx, s, { bg: (c, t) => { bgHall(c, t, { throne: {} }); glow(c, 960, 400, 800, 'rgba(255,200,120,A)', 0.35); }, tint: '#1a1408', ta: 0.2, cam: [960, 520, 1.2, 960, 500, 1.3] }, (t) => {
  horus(ctx, 960, 780, 0.75, { ...idlePose(t), expr: 'happy' }, 'wm');
  bigLine(ctx, 'Нужно только решиться.', t, ph(s, 'Нужно только'), 4, 160, 60, '#c9a24a');
}));

// you open your eyes
S(87, (ctx, s) => sc(ctx, s, { bg: (c) => fillBg(c, '#060a06'), cam: [960, 450, 2.6, 960, 450, 2.6] }, (t) => horus(ctx, 960, 1000, 0.9, { blink: t < 0.8 ? 1 : 0, expr: 'neutral' }, 'wm')));
S(88, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTemple(c, t), tint: '#0a1408', ta: 0.3 }, (t) => horus(ctx, 960, 1000, 0.95, { ...idlePose(t), expr: 'neutral' }, 'wm')));
S(89, (ctx, s) => sc(ctx, s, { bg: (c) => fillBg(c, '#05050a'), cam: [960, 470, 1.8, 960, 470, 2] }, (t) => {
  horus(ctx, 960, 1000, 0.9, { ...idlePose(t), expr: 'neutral' }, 'wm');
  heartIcon(ctx, 960, 690, 0.8 * (1 - clamp((t - 2) / 2)), '#7a1a14');
}) || bigLine(ctx, 'Потому что больше не живёт.', s.lt, ph(s, 'Потому что'), 5, 920, 56));

// ================= LEVEL 6 =================
card(90, 6);

// you talk to the brothers who were hurt most
S(91, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t, { terra: false }), tint: '#1a0a0a' }, (t) => {
  const who = [['angron', 'Ангрон', 'Ангрон'], ['lorgar', 'Лоргар', 'Лоргар'], ['mortarion', 'Мортарион', 'Мортарион'], ['fulgrim', 'Фулгрим', 'Фулгрим']];
  who.forEach(([w, cueText, label], i) => {
    const a = ph(s, cueText); if (t < a - 0.3) return;
    const x = 300 + i * 220 + (i > 1 ? 560 : 0);
    if (w === 'mortarion') drawRig(ctx, rig('mortarion'), x, 1060, 0.55, { ...idlePose(t, i), time: t }, MORT_PAL); else primarch(ctx, w, x, 1060, 0.62, { ...idlePose(t, i), flip: i > 1, expr: 'angry' });
    nameTag(ctx, label, x, 330, t, a, 40);
  });
  horus(ctx, 960, 1060, 0.8, { ...idlePose(t), expr: 'talk', time: t }, 'wm');
}));
S(92, (ctx, s) => { sc(ctx, s, { bg: (c) => fillBg(c, '#08060a') }, () => {}); bigLine(ctx, '«предайте отца»', s.lt, 0.2, ph(s, 'Ты говоришь им «он') - 0.4, 440, 64, '#6a5a50'); bigLine(ctx, '«он нас бросил»', s.lt, ph(s, 'Ты говоришь им «он'), 6, 600, 84, '#c0301e'); });
S(93, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgHulk(c, t), tint: '#1a0a0a', ta: 0.4 }, (t) => horus(ctx, kf(t, [[0, 600], [3, 1100]]), 1040, 0.85, walkPose(t, 0.5, 0.2), 'wm')));

// Magnus warns; you change two words in the order; Prospero burns
S(94, (ctx, s) => {
  const t = s.lt, ord = ph(s, 'Но приказ идёт'), burn = ph(s, 'Космические Волки');
  if (t < ord) sc(ctx, s, { bg: (c, tt) => { bgEye(c, tt); }, tint: '#1a0a1a', ta: 0.2 }, (tt) => primarch(ctx, 'magnus', 960, 1000, 0.85, { ...idlePose(tt), expr: 'shock', armR: -2.2 }));
  else if (t < burn) sc(ctx, s, { bg: (c) => fillBg(c, '#1a1410') }, (tt) => {
    paper(ctx, 960, 540, 900, 520, 'ПРИКАЗ ИМПЕРАТОРА', [{ text: 'Магнуса: доставить на Терру', strike: clamp((tt - ord - 1.5) / 0.5) }, { text: 'Магнуса: уничтожить', color: '#c0301e', hidden: tt < ord + 2.4 }], { lineSize: 52 });
  });
  else sc(ctx, s, { bg: (c, tt) => { bgTerra(c, tt); }, tint: '#3a1008', ta: 0.3 }, (tt) => { for (let i = 0; i < 5; i++) marine(ctx, 200 + i * 360, 1040, 0.45, walkPose(tt + i, 0.8, 0.3), { plain: true, weapon: 'bolter' }, PRIMARCH.russ); for (let i = 0; i < 4; i++) drawFire(ctx, 300 + i * 450, 900, 1.2, tt, { fire1: '#e8462a', fire2: '#ffa22a', fire3: '#fff07a' }); });
  if (t > burn) place(ctx, 'ПРОСПЕРО', t - burn, 0.3, 'родной мир Магнуса');
});

// no way back: strike first
S(95, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t, { terra: false }), tint: '#1a0a0a', cam: [960, 470, 1.6, 960, 470, 1.8] }, (t) => horus(ctx, 960, 1000, 0.9, { ...idlePose(t), expr: 'grit' }, 'wm')));

// Isstvan III
S(96, (ctx, s) => sc(ctx, s, { bg: bgIsstvan3, tint: '#141a0a' }, () => {}) || place(ctx, 'ИССТВАН III', s.lt, 0.3, 'мятежный мир'));
S(97, (ctx, s) => sc(ctx, s, { bg: bgIsstvan3, tint: '#141a0a' }, (t) => {
  for (let i = 0; i < 3; i++) dropPod(ctx, 400 + i * 550, Math.min(980, -300 + (t - i * 0.6) * 900), 0.6, true);
  if (t > ph(s, 'Среди отправленных Локен')) { captain(ctx, 'loken', 760, 1040, 0.62, idlePose(t)); nameTag(ctx, 'ЛОКЕН', 760, 330, t, ph(s, 'Среди отправленных Локен'), 46); }
  if (t > ph(s, 'И Торгаддон')) { captain(ctx, 'torgaddon', 1180, 1040, 0.62, { ...idlePose(t, 1), expr: 'happy' }); nameTag(ctx, 'ТОРГАДДОН', 1180, 330, t, ph(s, 'И Торгаддон'), 46); }
}));
S(98, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t, { terra: false }), tint: '#1a0a0a', cam: [960, 520, 1.3, 960, 500, 1.4] }, (t) => horus(ctx, 960, 1000, 0.9, { ...idlePose(t), expr: 'neutral', armR: t > 1 ? -2.0 : 0 }, 'wm')));

// virus bombs
S(99, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgIsstvan3(c, t, { haze: clamp((t - 2) / 6) * 0.45 }), tint: '#1a2008', ta: 0.2 }, (t) => {
  for (let i = 0; i < 8; i++) { const p = ((t * 0.5 + i * 0.13) % 1); virusBomb(ctx, 200 + i * 220, lerp(-200, 800, p), 0.8, t); }
  bigLine(ctx, 'Небо Исствана горит.', t, ph(s, 'Небо Исствана'), 4, 160, 60, '#d0f080');
}));
S(100, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t, { terra: false }), tint: '#1a2008', ta: 0.35 }, (t) => {
  planet(ctx, 960, 400, 200, '#6a8a3a', '#9ab84a', { seed: 3 });
  horus(ctx, 960, 1060, 0.95, { ...idlePose(t), expr: 'neutral', head: -0.1 }, 'wm');
}));
S(101, (ctx, s) => { ctx.fillStyle = '#060806'; ctx.fillRect(0, 0, W, H); bigLine(ctx, 'Ты убиваешь собственных сыновей.', s.lt, 0.2, 3.5, 480, 70); bigLine(ctx, 'Потому что они остались верны твоему отцу.', s.lt, ph(s, 'Потому что'), 4, 600, 48, '#c9b89a'); grain(ctx); });

// survivors in the ruins; Torgaddon dies; Eisenstein escapes
S(102, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgIsstvan3(c, t, { burn: true, haze: 0.2 }), tint: '#141a0a' }, (t) => {
  const tor = ph(s, 'Торгаддон погибает'), eis = ph(s, 'Эйзенштейн') - 0.5;
  if (t < eis) {
    captain(ctx, 'torgaddon', 700, 1040, 0.62, t > tor + 1 ? { lean: -1.5 } : { ...idlePose(t), expr: 'grit' });
    captain(ctx, 'aximand', 1100, 1040, 0.62, { ...idlePose(t), expr: 'grit', flip: true }, SOH);
    if (t > ph(s, 'Локен выживает')) captain(ctx, 'loken', 380, 1040, 0.62, { ...idlePose(t), expr: 'sad' });
  } else {
    bgSpace(ctx, t); planet(ctx, 600, 800, 400, '#6a8a3a', '#9ab84a', { seed: 3 });
    ship(ctx, kf(t, [[eis, 800], [eis + 4, 1900]]), kf(t, [[eis, 500], [eis + 4, 200]]), 0.6, '#7a7a8a', 1);
    nameTag(ctx, '«ЭЙЗЕНШТЕЙН»', 1300, 120, t, eis + 0.3, 50);
  }
}));
S(103, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t, { terra: false }), tint: '#1a0a0a' }, (t) => horus(ctx, 960, 1040, 0.9, { ...idlePose(t), flip: true, expr: 'neutral' }, 'wm')) || bigLine(ctx, 'дальше дорога ведёт только вниз', s.lt, ph(s, 'дальше дорога'), 4, 160, 50, '#c9b89a'));

// Isstvan V: seven legions, four already yours
S(104, (ctx, s) => sc(ctx, s, { bg: bgIsstvan5, tint: '#1a0808' }, (t) => {
  for (let i = 0; i < 7; i++) {
    const traitor = i >= 3, x = 180 + i * 260;
    banner(ctx, x, 220, 0.45, t + i, traitor ? ['#1a2a5a', '#7f8a90', '#6a1a1a', '#2a6a7a'][i - 3] : ['#2a2a30', '#2f7a3a', '#1e1e24'][i]);
    if (traitor && t > ph(s, 'Четыре из этих') + (i - 3) * 0.3) { ctx.strokeStyle = '#c0301e'; ctx.lineWidth = 8; ctx.strokeRect(x - 80, 190, 160, 260); }
  }
}) || place(ctx, 'ИССТВАН V', s.lt, 0.3, 'чёрный песок'));
S(105, (ctx, s) => sc(ctx, s, { bg: bgIsstvan5, tint: '#1a0808', shake: 3 }, (t) => {
  legionLanding(ctx, t, LOYAL3, 260, 8, 0.4);
  [['ferrus', 'Железные Руки'], ['vulkan', 'Саламандры'], ['corax', 'Гвардия Ворона']].forEach(([w, cueT], i) => { if (t > ph(s, cueT) - 0.3) { primarch(ctx, w, 500 + i * 450, 1060, 0.62, { ...idlePose(t, i), expr: 'grit' }); nameTag(ctx, cueT, 500 + i * 450, 360, t, ph(s, cueT), 38); } });
}));
S(106, (ctx, s) => sc(ctx, s, { bg: bgIsstvan5, tint: '#2a0808', ta: 0.35, shake: 5 }, (t) => {
  legionLanding(ctx, t, LOYAL3, 200, 6, 0.42);
  if (t > ph(s, 'И эти легионы')) for (let i = 0; i < 8; i++) { tracer(ctx, 1950, 700 + (i % 4) * 60, 200 + i * 140, 800, t + i * 0.2, 2.5, '#ff5a3a'); muzzleFlash(ctx, 1900, 700 + (i % 4) * 60, 0.7, t + i * 0.3); }
  if (t > ph(s, 'Подкрепление')) legionLanding(ctx, t, TRAIT4, 1500, 3, 0.36, true);
}));
// Fulgrim kills Ferrus
S(107, (ctx, s) => sc(ctx, s, { bg: bgIsstvan5, tint: '#2a0808', ta: 0.35 }, (t) => {
  const fall = ph(s, 'Ферруса Мануса') + 2.5;
  primarch(ctx, 'ferrus', 800, t > fall ? 1070 : 1040, 0.85, t > fall ? { lean: -1.5 } : { ...idlePose(t), expr: 'shock' });
  primarch(ctx, 'fulgrim', 1200, 1040, 0.85, { ...idlePose(t), flip: true, expr: 'angry', armR: t > fall - 0.6 && t < fall ? -2 : 0 });
  nameTag(ctx, 'ФУЛГРИМ', 1200, 300, t, 0.6, 46); nameTag(ctx, 'ФЕРРУС МАНУС', 800, 300, t, 0.6, 46);
  if (t > ph(s, 'Поле высадки')) bigLine(ctx, 'Три легиона почти перестают существовать за один день.', t, ph(s, 'Три легиона'), 5, 160, 42, '#c9b89a');
}));
S(108, (ctx, s) => sc(ctx, s, { bg: bgIsstvan5, tint: '#1a0606', ta: 0.4, cam: [960, 600, 1.1, 960, 600, 1.2] }, (t) => {
  for (let i = 0; i < 16; i++) marine(ctx, 80 + i * 120, 1060 - (i % 3) * 30, 0.32, { lean: i % 2 ? 1.5 : -1.5 }, { plain: true, weapon: 'none' }, LOYAL3[i % 3]);
  for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(400 + i * 550, 950); ctx.rotate(1.2 + i * 0.2); banner(ctx, 0, 0, 0.4, 0, ['#2a2a30', '#2f7a3a', '#1e1e24'][i]); ctx.restore(); }
  bigLine(ctx, 'резня в зоне высадки', t, ph(s, 'Они назовут'), 5, 160, 56, '#c0301e');
}));
S(109, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t, { terra: false }), tint: '#1a0606', cam: [960, 480, 1.5, 960, 470, 1.6] }, (t) => horus(ctx, 960, 1000, 0.9, { ...idlePose(t), expr: 'neutral' }, 'wm')));
S(110, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t, { terra: false }), tint: '#0a0608', ta: 0.4 }, (t) => {
  horus(ctx, 1200, 1040, 0.85, { ...idlePose(t), look: -1 }, 'wm');
  ctx.globalAlpha = 0.18 * (1 - clamp((t - 2) / 3)); captain(ctx, 'loken', 640, 1040, 0.62, {}, SOH); ctx.globalAlpha = 1;
}));

// ================= LEVEL 7 =================
card(111, 7);
S(112, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgSpace(c, t, { nebula: 'rgba(160,40,40,0.35)' }) }, (t) => {
  for (let i = 0; i < 9; i++) { const x = 180 + (i % 5) * 390, y = 280 + Math.floor(i / 5) * 420; planet(ctx, x, y, 90, '#3a3a44', '#2a2a30', { seed: i }); if (t > 1 + i * 0.8) explosion(ctx, x, y, 0.45, t + i, i); }
}));
// Calth: the callback to the first video
S(113, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgSpace(c, t, { nebula: 'rgba(120,40,40,0.3)' }) }, (t) => {
  const atmo = 1 - clamp((t - ph(s, 'атмосферу')) / 2.5);
  planet(ctx, 960, 600, 300, '#4f8ad0', '#3a8a3a', { atmo, seed: 7 });
  for (let i = 0; i < 3; i++) ship(ctx, 300 + i * 650, 160 + (i % 2) * 60, 0.5, '#6a1a1a', i % 2 ? 1 : -1);
  const sun = clamp((t - ph(s, 'Солнце Калта')) / 2);
  glow(ctx, 1650, 200, 380, `rgba(${Math.round(255 - sun * 100)},${Math.round(230 - sun * 20)},${Math.round(150 + sun * 100)},A)`, 0.7);
  if (t > ph(s, 'Выжившие уходят')) bigLine(ctx, 'и будут жить там тысячелетиями', t, ph(s, 'Выжившие уходят') + 1, 5, 980, 46, '#c9b89a');
}) || place(ctx, 'КАЛТ', s.lt, 0.3, 'мир Ультрамаринов'));
S(114, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgSpace(c, t) }, (t) => { planet(ctx, 960, 760, 460, '#8a6a4a', '#6a4a3a', { seed: 1 }); for (let i = 0; i < 10; i++) ship(ctx, 200 + i * 170, 220 + (i % 3) * 60, 0.25, '#2a2a2e', 1); }) || place(ctx, 'ТЕРРА', s.lt, 0.3));
S(115, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTerra(c, t, { ships: true }), tint: '#2a0a06', ta: 0.2 }, (t) => { for (let i = 0; i < 6; i++) dropPod(ctx, 200 + i * 300, Math.min(900, -300 + ((t * 0.8 + i * 0.4) % 3) * 500), 0.3, false); }));
// brothers on the walls
S(116, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTerra(c, t), tint: '#2a0a06', ta: 0.2 }, (t) => {
  [['dorn', 'Рогал Дорн', 'РОГАЛ ДОРН'], ['sang', 'Сангвиний', 'САНГВИНИЙ'], ['khan', 'Джагатай', 'ДЖАГАТАЙ ХАН']].forEach(([w, cueT, label], i) => {
    const a = ph(s, cueT); if (t < a - 0.3) return;
    const x = 420 + i * 540;
    if (w === 'sang') sanguinius(ctx, x, 760, 0.62, idlePose(t, i)); else primarch(ctx, w, x, 760, 0.62, idlePose(t, i));
    nameTag(ctx, label, x, 260, t, a, 40);
  });
  bigLine(ctx, 'Они просто не уступят.', t, ph(s, 'Они просто'), 4, 1000, 54);
}));
S(117, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTerra(c, t), tint: '#3a0a06', ta: 0.25, shake: 4 }, (t) => {
  for (let i = 0; i < 5; i++) daemon(ctx, 200 + i * 380, 1040, 0.6, t, i % 2 ? '#8a1a1a' : '#5a1a6a');
  for (let i = 0; i < 6; i++) marine(ctx, 120 + i * 330, 1060, 0.4, walkPose(t + i, 0.8, 0.3), { plain: true, weapon: 'bolter', horns: true }, CHAOS);
}));
S(118, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTerra(c, t), tint: '#3a0a06', ta: 0.25, shake: 3 }, (t) => {
  titan(ctx, 420, 1000, 1.0, t, '#3a3030'); titan(ctx, 1500, 1000, 1.0, t + 1, '#4a3a20');
  tracer(ctx, 700, 450, 1300, 450, t, 1.5, '#ffd060'); explosion(ctx, 1450, 450, 0.7, t, 3);
  for (let i = 0; i < 6; i++) soldier(ctx, 300 + i * 260, 1060, 0.55, { ...idlePose(t, i), expr: 'grit' }, ['#4a5a3a', '#5a4a3a', '#3a3a4a'][i % 3]);
}) || place(ctx, 'ЛЬВИНЫЕ ВРАТА', s.lt, 0.3, 'космопорт'));
S(119, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t), tint: '#1a0606' }, (t) => {
  rect(ctx, 260, 300, 560, 380, '#0a1410', 10, 6);
  ctx.fillStyle = '#4cff7a'; ctx.font = '700 46px "Oswald"';
  for (let i = 0; i < 5; i++) ctx.fillText(`сектор ${i + 1}: -${Math.floor(30 + ((t * 7 + i * 13) % 60))}%`, 300, 370 + i * 64);
  horus(ctx, 1300, 1040, 0.9, { ...idlePose(t), expr: 'neutral' }, 'x');
  bigLine(ctx, 'Теперь ты помнишь только проценты.', t, ph(s, 'Теперь ты помнишь'), 4, 900, 52);
}));
S(120, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t), tint: '#1a0606' }, (t) => {
  horus(ctx, 960, 1040, 0.95, { ...idlePose(t), expr: 'neutral' }, 'x');
  for (let i = 0; i < 2; i++) daemon(ctx, 400 + i * 1100, 1040, 0.45, t + i, '#3a1a3a');
}) || place(ctx, '«ДУХ МЩЕНИЯ»', s.lt, 0.3, 'флагман'));
S(121, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t), tint: '#1a0606', ta: 0.3 }, (t) => {
  horus(ctx, 1150, 1060, 1.25, { ...idlePose(t), expr: 'neutral' }, 'x');
  if (t > ph(s, 'Абаддон стоит')) captain(ctx, 'abaddon', 560, 1060, 0.7, { ...idlePose(t), expr: 'shock', look: 1 });
}));
S(122, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t), tint: '#0a0408', ta: 0.4 }, (t) => {
  captain(ctx, 'abaddon', 600, 1060, 0.7, { ...idlePose(t), expr: t < ph(s, 'Ты долго') ? 'talk' : 'sad', time: t });
  horus(ctx, 1250, 1060, 1.2, { ...idlePose(t), flip: true }, 'x');
  bigLine(ctx, 'отец, мы ведь всё ещё делаем это ради людей?', t, ph(s, 'отец, мы'), 4, 160, 44, '#c9b89a');
}));
S(123, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTerra(c, t), tint: '#2a0a06', ta: 0.2, cam: [960, 600, 1, 960, 560, 1.1] }, () => {}) || bigLine(ctx, 'Каждый день он стоит.', s.lt, ph(s, 'Каждый день он'), 4, 160, 60));
S(124, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgSpace(c, t, { nebula: 'rgba(160,40,200,0.3)' }) }, (t) => {
  [['#2d5bd1', 'Ультрамарины'], ['#1e3a22', 'Тёмные Ангелы'], ['#7f8c96', 'Космические Волки']].forEach(([c, n], i) => { const a = ph(s, n); for (let j = 0; j < 3; j++) ship(ctx, kf(t, [[0, -400 - j * 200], [12, 1300 - j * 200]]) , 250 + i * 260, 0.35, c, 1); nameTag(ctx, n, 1500, 250 + i * 260, t, a, 40); });
  bigLine(ctx, 'Время работает против тебя.', t, ph(s, 'Время работает'), 5, 960, 54);
}));
S(125, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t), tint: '#0a0408', ta: 0.4 }, (t) => {
  horus(ctx, 1200, 1060, 1.2, { ...idlePose(t), expr: 'sad', head: -0.1 }, 'x');
  ctx.globalAlpha = 0.35 * clamp((t - 1) / 2); ctx.save(); ctx.translate(620, 900); youngHorus(ctx, 0, 0, 0.85, { legL: -1.2, legR: -1.0, bob: 40, head: -0.25 }); ctx.restore(); ctx.globalAlpha = 1;
}));

// ================= LEVEL 8 =================
card(126, 8);
S(127, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgSpace(c, t) }, (t) => {
  planet(ctx, 960, 1200, 700, '#8a6a4a', '#6a4a3a', { seed: 1 });
  ship(ctx, 960, 420, 1.2, '#2a2a2e', -1);
  const sh = 1 - clamp((t - 0.6) / 1.5);
  ctx.strokeStyle = `rgba(120,200,255,${sh * 0.7})`; ctx.lineWidth = 12; ctx.beginPath(); ctx.ellipse(960, 420, 520 * (1 + (1 - sh) * 0.2), 200, 0, 0, Math.PI * 2); ctx.stroke();
}));
S(128, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgSpace(c, t), cam: [960, 460, 1.4, 960, 460, 1.2] }, (t) => { planet(ctx, 960, 1200, 700, '#8a6a4a', '#6a4a3a', { seed: 1 }); ship(ctx, 960, 420, 1.2, '#2a2a2e', -1); }) || bigLine(ctx, 'Ты первый.', s.lt, ph(s, 'Ты первый'), 4, 900, 60));
S(129, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgHulk(c, t), tint: '#1a0606', ta: 0.3 }, (t) => {
  const flash = (x, a) => { if (t > a && t < a + 0.5) { ctx.fillStyle = `rgba(255,240,200,${1 - (t - a) * 2})`; ctx.beginPath(); ctx.arc(x, 700, 220, 0, Math.PI * 2); ctx.fill(); } };
  if (t > 0.6) emperor(ctx, 960, 1040, 0.85, idlePose(t)); flash(960, 0.5);
  if (t > ph(s, 'Телепорт разбрасывает')) for (let i = 0; i < 3; i++) { const a = ph(s, 'Телепорт разбрасывает') + i * 0.4; flash(300 + i * 650, a); }
}));
S(130, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t), tint: '#1a0606' }, (t) => { sanguinius(ctx, kf(t, [[0, 300], [2, 600]]), 1040, 0.85, walkPose(t, 0.5, 0.2)); horus(ctx, 1350, 1040, 1.15, { ...idlePose(t), flip: true }, 'x'); }));
S(131, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t), tint: '#1a0606', cam: [700, 480, 1.6, 700, 480, 1.8] }, (t) => { sanguinius(ctx, 700, 1040, 0.9, { ...idlePose(t), expr: 'grit' }); rect(ctx, 820, 500, 16, 300, '#c9ced6', 4, 4); }) || nameTag(ctx, 'САНГВИНИЙ', 960, 960, s.lt, 0.3, 64));
S(132, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t), tint: '#1a0606' }, (t) => { sanguinius(ctx, 600, 1040, 0.85, { ...idlePose(t), expr: 'sad' }); horus(ctx, 1300, 1040, 1.15, { ...idlePose(t), flip: true, expr: 'talk', time: t }, 'x'); }));
S(133, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t), tint: '#1a0606', cam: [960, 540, 1.1, 960, 520, 1.25] }, (t) => { sanguinius(ctx, 650, 1040, 0.85, { ...idlePose(t), expr: 'sad' }); horus(ctx, 1250, 1040, 1.15, { ...idlePose(t), flip: true, armL: -1.0, expr: 'neutral' }, 'x'); }));
S(134, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t), tint: '#1a0606', cam: [650, 450, 2, 650, 450, 2] }, (t) => sanguinius(ctx, 650, 1040, 0.85, { expr: 'grit', head: Math.sin(t * 3) * 0.05 })));
S(135, (ctx, s) => { sc(ctx, s, { bg: (c) => fillBg(c, '#000') }, () => {}); const a = clamp(s.lt / 0.3) * (1 - clamp((s.lt - 0.5) / 1.2)); ctx.fillStyle = `rgba(160,10,10,${a})`; ctx.fillRect(0, 0, W, H); });
S(136, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t), tint: '#1a0606', ta: 0.35 }, (t) => {
  sanguinius(ctx, 900, 1060, 0.85, { lean: -1.5 }); horus(ctx, 1350, 1040, 1.15, { ...idlePose(t), flip: true }, 'x');
  emperor(ctx, kf(t, [[0, 0], [2.5, 420]]), 1040, 0.95, walkPose(t, 0.4, 0.2));
}));
S(137, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t), tint: '#1a0606', cam: [960, 520, 1.15, 960, 500, 1.3] }, (t) => { emperor(ctx, 520, 1040, 0.95, { ...idlePose(t), expr: 'sad' }); horus(ctx, 1400, 1040, 1.15, { ...idlePose(t), flip: true, expr: 'neutral' }, 'x'); }) || bigLine(ctx, 'Отец и первый сын.', s.lt, ph(s, 'Отец и первый'), 4, 160, 60));
// the duel
const duel = (ctx, s, o = {}) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t), tint: o.tint || '#1a0606', shake: o.shake ?? 6, cam: o.cam }, (t) => {
  const sw = Math.sin(t * 5);
  emperor(ctx, 700 + sw * 30, 1040, 0.95, { armR: -1.2 + sw * 0.8, armL: 0.4, expr: o.emp || 'grit', lean: sw * 0.05 });
  horus(ctx, 1250 - sw * 30, 1040, 1.15, { armR: 1.0 - sw * 0.8, flip: true, expr: 'angry', lean: -sw * 0.05 }, o.stage || 'x');
  if (Math.floor(t * 3) % 2 === 0) explosion(ctx, 960, 650, 0.5, t * 2, Math.floor(t));
  if (o.draw) o.draw(t);
});
S(138, (ctx, s) => duel(ctx, s));
S(139, (ctx, s) => duel(ctx, s, { draw: (t) => { if (t > ph(s, 'Ты ранишь его')) { ctx.fillStyle = '#7a0a0a'; for (let i = 0; i < 6; i++) ctx.fillRect(560 + i * 40, 1050 + (i % 2) * 10, 30, 12); } } }));
S(140, (ctx, s) => duel(ctx, s, { shake: 2, emp: 'sad' }) || bigLine(ctx, 'Он всё ещё видит в тебе сына.', s.lt, ph(s, 'Он всё ещё видит'), 4, 160, 54));
S(141, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t), tint: '#1a0606' }, (t) => {
  const k = ph(s, 'Ты убиваешь его');
  emperor(ctx, 520, 1060, 0.95, { expr: 'shock', lean: -0.2 });
  soldier(ctx, 960, t > k + 0.4 ? 1070 : 1060, 0.8, t > k + 0.4 ? { lean: 1.5, expr: 'shock' } : { ...idlePose(t), expr: 'grit', armR: -1.2 });
  horus(ctx, 1400, 1060, 1.15, { ...idlePose(t), flip: true, expr: 'angry', armL: t > k - 0.3 && t < k + 0.5 ? -1.8 : 0 }, 'x');
}));
S(142, (ctx, s) => { duel(ctx, s, { shake: 10, emp: 'angry' }); const a = clamp((s.lt - 0.5) / 1.5); ctx.fillStyle = `rgba(255,240,200,${a * 0.6})`; ctx.fillRect(0, 0, W, H); });
// clarity: the voices leave
S(143, (ctx, s) => sc(ctx, s, { bg: (c) => fillBg(c, '#0a0a0e'), cam: [960, 470, 2, 960, 470, 2.2], tint: '#0a0a14', ta: 0.2 }, (t) => horus(ctx, 960, 1000, 0.9, { expr: 'sad', blink: 0 }, t < 2 ? 'x' : 'wm')));
S(144, (ctx, s) => sc(ctx, s, { bg: (c) => fillBg(c, '#08080c') }, (t) => {
  const beats = [ph(s, 'Ты видишь Исстван'), ph(s, 'Ты видишь Сангвиния'), ph(s, 'Ты видишь кровь'), ph(s, 'во что ты превратил')];
  beats.forEach((a, i) => {
    if (t < a) return;
    const x0 = 100 + i * 440;
    ctx.save(); ctx.globalAlpha = clamp((t - a) / 0.5);
    ctx.beginPath(); ctx.rect(x0, 300, 400, 440); ctx.clip();
    fillRect(ctx, x0, 300, 400, 440, '#141418');
    if (i === 0) { ctx.translate(x0, 300); ctx.scale(400 / 1920, 440 / 1080); bgIsstvan3(ctx, t, { haze: 0.4 }); }
    if (i === 1) sanguinius(ctx, x0 + 200, 760, 0.4, { lean: -1.5 });
    if (i === 2) emperor(ctx, x0 + 200, 740, 0.4, { expr: 'sad' });
    if (i === 3) eyeOfHorus(ctx, x0 + 200, 520, 0.8, '#5a4a2a', '#3a0a0a');
    ctx.restore();
    ctx.strokeStyle = '#3a3a44'; ctx.lineWidth = 6; ctx.strokeRect(x0, 300, 400, 440);
  });
}));
S(145, (ctx, s) => sc(ctx, s, { bg: (c) => fillBg(c, '#08080c'), cam: [960, 470, 2.2, 960, 470, 2.3] }, (t) => horus(ctx, 960, 1000, 0.9, { expr: 'sad', tear: true, time: t }, 'wm')) || bigLine(ctx, 'Ты просишь прощения.', s.lt, 0.3, 5, 900, 64));
S(146, (ctx, s) => { const t = s.lt; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = `rgba(0,0,0,${clamp((t - 3) / 4)})`; ctx.fillRect(0, 0, W, H); bigLine(ctx, 'Так, чтобы ты больше никогда не вернулся.', t, ph(s, 'Так, чтобы ты больше'), 4, 540, 50, '#7a6a5a'); });
S(147, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTerra(c, t), tint: '#1a0a06', ta: 0.3 }, (t) => { for (let i = 0; i < 8; i++) ship(ctx, kf(t, [[0, 960], [8, 960 + Math.cos(i) * 1500]]), kf(t, [[0, 300], [8, -100 + Math.sin(i) * 300]]), 0.3, '#2a2a2e', Math.cos(i) > 0 ? 1 : -1); }));
S(148, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t), tint: '#0a0406', ta: 0.45 }, (t) => {
  sanguinius(ctx, 520, 1080, 0.8, { lean: -1.5 }); horus(ctx, 1000, 1080, 1.0, { lean: 1.5, blink: 1 }, 'wm'); emperor(ctx, 1450, 1080, 0.85, { lean: -1.3, blink: 1 });
  if (t > ph(s, 'Абаддон опаздывает')) captain(ctx, 'abaddon', 1750, 1060, 0.7, { ...idlePose(t), expr: t > ph(s, 'кричит') ? 'shock' : 'sad', flip: true });
}));
S(149, (ctx, s) => sc(ctx, s, { bg: bgThrone }, (t) => { if (t > ph(s, 'Его сажают')) emperor(ctx, 960, 900, 0.75, { blink: 1, expr: 'neutral' }); }) || place(ctx, 'ЗОЛОТОЙ ТРОН', s.lt, ph(s, 'Его сажают')));
S(150, (ctx, s) => sc(ctx, s, { bg: bgThrone, cam: [960, 520, 1.3, 960, 500, 1.5] }, (t) => emperor(ctx, 960, 900, 0.75, { blink: 1 })) || bigLine(ctx, 'Он больше никогда не встанет.', s.lt, 0.3, 6, 160, 64));
S(151, (ctx, s) => sc(ctx, s, { bg: (c, t) => { bgThrone(c, t); }, tint: '#1a1006', ta: 0.3, cam: [960, 560, 1.2, 960, 540, 1] }, (t) => {
  emperor(ctx, 960, 900, 0.75, { blink: 1 });
  for (let i = 0; i < 10; i++) human(ctx, 100 + i * 190, 1080, 0.65, { lean: 0.35, head: 0.2 }, { hair: 'short', hood: true, outfit: 'robe' }, pal(HUMAN_PAL.citizen, { shirt: '#4a3a2a' }));
  for (let i = 0; i < 12; i++) candle(ctx, 80 + i * 160, 1060, t, 0.9);
  bigLine(ctx, 'Десять тысяч лет.', t, 0.3, 4, 160, 64, '#c9a24a');
}));
S(152, (ctx, s) => { sc(ctx, s, { bg: (c, t) => bgHall(c, t), tint: '#1a1006', ta: 0.4 }, (t) => statue(ctx, 960, 760, 1.0, { colors: EMPEROR, hair: 'long', laurel: true })); bigLine(ctx, 'Всё, что ты видел в бреду на Давине, сбывается.', s.lt, 0.3, 4, 160, 46); });
S(153, (ctx, s) => { ctx.fillStyle = '#050405'; ctx.fillRect(0, 0, W, H); bigLine(ctx, 'Ты сделал это сам.', s.lt, 0.2, 6, 540, 84, '#c0301e'); grain(ctx); });
// Black Legion
S(154, (ctx, s) => {
  const t = s.lt, burn = ph(s, 'находит твоё тело'), paint = ph(s, 'перекрашивает');
  if (t < burn) sc(ctx, s, { bg: (c, tt) => bgEye(c, tt) }, (tt) => { for (let i = 0; i < 5; i++) soh(ctx, 300 + i * 330, 1060, 0.45, { ...idlePose(tt, i), flip: i % 2 }, true); });
  else if (t < paint) sc(ctx, s, { bg: (c) => fillBg(c, '#0a0606') }, (tt) => { lyingHorus(ctx, 980, 860, 0.65, 'x'); drawFire(ctx, 960, 900, 2.5, tt, { fire1: '#a8200e', fire2: '#e86a1a', fire3: '#ffd27a' }); captain(ctx, 'abaddon', 1500, 1060, 0.7, { flip: true, expr: 'grit' }); });
  else sc(ctx, s, { bg: (c, tt) => bgEye(c, tt) }, (tt) => { for (let i = 0; i < 6; i++) marine(ctx, 220 + i * 300, 1060, 0.45, idlePose(tt, i), { plain: true, weapon: 'bolter', horns: true }, BLACKL); drawRig(ctx, rig('marine', { plain: true, weapon: 'none', helmet: 'off', hair: 'topknot', cape: true }), 960, 1080, 0.8, idlePose(tt), BLACKL); });
  if (t > paint) place(ctx, 'ЧЁРНЫЙ ЛЕГИОН', t - paint, 0.5);
});
S(155, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgSpace(c, t, { nebula: 'rgba(160,40,200,0.35)' }), shake: 2 }, (t) => {
  const cad = ph(s, 'Кадию');
  planet(ctx, 960, 560, 300, '#5a6a7a', '#4a5a6a', { seed: 12 });
  if (t > cad) { ctx.strokeStyle = '#ff6a2a'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(760, 380); ctx.lineTo(900, 560); ctx.lineTo(820, 700); ctx.moveTo(900, 560); ctx.lineTo(1100, 520); ctx.stroke(); for (let i = 0; i < 4; i++) explosion(ctx, 860 + i * 70, 500 + (i % 2) * 120, 0.5, t + i, i); }
  for (let i = 0; i < 6; i++) ship(ctx, kf(t, [[0, -300], [10, 600 + i * 40]]), 200 + i * 120, 0.3, '#1e1e22', 1);
  nameTag(ctx, 'КАДИЯ', 960, 920, t, cad, 56);
  bigLine(ctx, 'Он об этом так и не узнал.', t, ph(s, 'Он об этом'), 4, 160, 54);
}));
S(156, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgStoneRoom(c, t, { wall: '#3a3430', floor: '#2a2420', windows: false }), tint: '#1a0a06', ta: 0.35 }, (t) => {
  eyeOfHorus(ctx, 960, 480, 1.6, '#3a2a1a', '#1a0a0a');
  ctx.strokeStyle = '#7a1a14'; ctx.lineWidth = 22; ctx.lineCap = 'round';
  const p = clamp((t - 1) / 2);
  ctx.beginPath(); ctx.moveTo(720, 300); ctx.lineTo(lerp(720, 1200, p), lerp(300, 660, p)); ctx.stroke();
  for (let i = 0; i < 6; i++) candle(ctx, 360 + i * 240, 1000, t, 1);
}));
S(157, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgCthonia(c, t, { night: true, edge: true }), cam: [900, 600, 1.1, 900, 560, 1.2], tint: '#101018', ta: 0.3 }, (t) => {
  ctx.fillStyle = 'rgba(180,180,170,0.15)'; for (let i = 0; i < 8; i++) ctx.fillRect(((i * 300 + t * 120) % 2600) - 400, 700 + i * 30, 300, 6);
}));
S(158, (ctx, s) => { ctx.fillStyle = '#050405'; ctx.fillRect(0, 0, W, H); bigLine(ctx, 'Ты всегда хотел, чтобы тебя запомнили.', s.lt, 0.2, 10, 540, 62); grain(ctx); });
S(159, (ctx, s) => { const t = s.lt; ctx.fillStyle = '#050405'; ctx.fillRect(0, 0, W, H); eyeOfHorus(ctx, 960, 470, 1.4 * clamp(t / 1.5), '#5a4a2a', '#7a0a0a'); bigLine(ctx, 'Тебя запомнили.', t, 0.4, 20, 820, 80, '#c0301e'); grain(ctx); });
