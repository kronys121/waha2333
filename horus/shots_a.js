// Horus, levels 1-4 (paragraphs 0-66). Each shot starts at a paragraph of script/horus_long.txt.

// scene wrapper: slow camera move, background, contents, dark grade
function sc(ctx, s, o, draw) {
  const c = o.cam || [960, 540, 1, 960, 540, 1.08];
  const p = ease.io(clamp(s.lt / Math.max(1, s.dur)));
  ctx.save();
  camera(ctx, lerp(c[0], c[3], p), lerp(c[1], c[4], p), lerp(c[2], c[5], p), o.shake || 0, s.lt);
  if (o.bg) o.bg(ctx, s.lt);
  if (draw) draw(s.lt);
  ctx.restore();
  if (o.after) o.after(s.lt);
  if (o.grade !== false) grade(ctx, o.tint || '#1a0a10', o.ta ?? 0.25, o.vig ?? 0.7);
}
const S = (k, fn, fade = 0.6) => shot(PT(k), fn, { fade });
const card = (k, n) => shot(PT(k), (ctx, s) => darkCard(ctx, n, s.lt), { fade: 0.8 });
const YH = { hair: 'buzz' };
function youngHorus(ctx, x, y, s, pose = {}) { human(ctx, x, y, s, pose, YH, YOUNG_HORUS_PAL); }
function kidHorus(ctx, x, y, s, pose = {}) { human(ctx, x, y, s, pose, { kid: true, hair: 'buzz', scarf: true }, YOUNG_HORUS_PAL); }
function gang(ctx, x, y, s, pose = {}, i = 0) { human(ctx, x, y, s, { ...idlePose(s.t || 0, i), ...pose }, { hair: ['short', 'buzz', 'long', 'bun'][i % 4], scar: i % 2 === 0 }, pal(GANG, { shirt: ['#4a4a52', '#3a3e46', '#52463e', '#3e4a3e'][i % 4] })); }
function lw(ctx, x, y, s, pose = {}, armed = true) { marine(ctx, x, y, s, pose, { plain: true, weapon: armed ? 'bolter' : 'none' }, LUNA); }
function soh(ctx, x, y, s, pose = {}, armed = true) { marine(ctx, x, y, s, pose, { plain: true, weapon: armed ? 'bolter' : 'none', eye: true }, SOH); }
function captain(ctx, who, x, y, s, pose = {}, palette = SOH) {
  const o = { abaddon: { hair: 'topknot' }, torgaddon: { hair: 'short' }, aximand: { hair: 'bald' }, loken: { hair: 'short', scar: true } }[who];
  drawRig(ctx, rig('marine', { plain: true, weapon: 'none', helmet: 'off', ...o }), x, y, s, pose, pal(palette, { hair: who === 'loken' ? '#8a8a8a' : '#1a1010' }));
}

// ================= LEVEL 1 =================
card(0, 1);

// you remember the fall
S(1, (ctx, s) => sc(ctx, s, { bg: (c, t) => { bgSpace(c, t, { nebula: 'rgba(160,40,200,0.3)' }); warpRift(c, 1400, 300, 380, t); } }, (t) => {
  const p = (t * 0.25) % 1;
  const x = lerp(1500, 400, p), y = lerp(200, 900, p);
  ctx.strokeStyle = 'rgba(255,170,80,0.6)'; ctx.lineWidth = 30; ctx.beginPath(); ctx.moveTo(x + 260, y - 220); ctx.lineTo(x, y); ctx.stroke();
  capsule(ctx, x, y, 0.8, -0.8);
}));

// the laboratory on Terra; the capsules are torn away
S(2, (ctx, s) => sc(ctx, s, { bg: bgLab, cam: [960, 540, 1.15, 960, 560, 1] }, (t) => {
  const rip = ph(s, 'Но что-то пошло');
  emperor(ctx, 960, 980, 0.55, { ...idlePose(t), flip: true, look: -1 });
  if (t > rip) {
    warpRift(ctx, 960, 380, 420 * clamp((t - rip) / 2), t);
    for (let i = 0; i < 5; i++) {
      const p = clamp((t - rip - 1 - i * 0.3) / 3);
      if (p > 0) capsule(ctx, lerp(220 + i * 370, 960 + Math.cos(i * 1.3) * 900, p), lerp(560, 380 + Math.sin(i * 2) * 500, p), 0.5 * (1 - p * 0.6), p * 6);
    }
  }
  nameTag(ctx, 'ТЕРРА', 960, 140, t, 0.5, 46);
}));

// your capsule falls on Cthonia
S(3, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgSpace(c, t) }, (t) => {
  planet(ctx, 960, 900, 520, '#6a6a68', '#4a4a4a', { seed: 8 });
  const p = clamp(t / 3);
  ctx.strokeStyle = 'rgba(255,170,80,0.7)'; ctx.lineWidth = 24; ctx.beginPath(); ctx.moveTo(1500, 0); ctx.lineTo(lerp(1500, 1020, p), lerp(0, 420, p)); ctx.stroke();
  capsule(ctx, lerp(1500, 1020, p), lerp(0, 420, p), 0.4, -0.8);
}));

// Cthonia: a world eaten by mines
S(4, (ctx, s) => sc(ctx, s, { bg: bgCthonia, cam: [700, 520, 1.1, 1250, 560, 1.05] }, (t) => {}, ) || place(ctx, 'ХТОНИЯ', s.lt, 0.5, 'выработанный мир'));

// gangs rule
S(5, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTunnel(c, t), tint: '#202028' }, (t) => {
  for (let i = 0; i < 5; i++) gang(ctx, 360 + i * 300, 1000, 0.95, { expr: i % 2 ? 'angry' : 'neutral', armR: i === 2 ? -1.2 : 0, time: t }, i);
  ctx.save(); ctx.translate(960 + 90, 1000 - 420); ctx.rotate(-0.4); rect(ctx, -6, -60, 12, 70, '#c9ced6', 3, 4); rect(ctx, -10, 8, 20, 30, '#3a2a20', 4, 4); ctx.restore();
}));

// raised by criminals; first rule of Cthonia
S(6, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTunnel(c, t), tint: '#202028' }, (t) => {
  for (let i = 0; i < 4; i++) gang(ctx, 420 + i * 360, 1000, 1.0, { expr: 'neutral' }, i + 1);
  kidHorus(ctx, 960, 1000, 0.75, { ...idlePose(t), look: 0.5 });
  bigLine(ctx, 'сильный жив, пока за него готовы умереть', t, ph(s, 'первому правилу') + 1.5, 6, 160, 50, '#c9b89a');
}));

// you grow too fast
S(7, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgCthonia(c, t), cam: [960, 560, 1, 960, 560, 1.04] }, (t) => {
  kidHorus(ctx, 600, 1000, 0.75, idlePose(t));
  if (t > ph(s, 'В пять лет') - 0.3) { youngHorus(ctx, 960, 1000, 0.9 * pop(t, ph(s, 'В пять лет') - 0.3), idlePose(t, 1)); nameTag(ctx, '5 лет', 960, 1040, t, ph(s, 'В пять лет'), 34); }
  if (t > ph(s, 'В десять') - 0.3) { youngHorus(ctx, 1380, 1000, 1.15 * pop(t, ph(s, 'В десять') - 0.3), { ...idlePose(t, 2), expr: 'grit' }); nameTag(ctx, '10 лет', 1380, 1040, t, ph(s, 'В десять'), 34); }
}));

// first blood; the calm frightens you
S(8, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTunnel(c, t), tint: '#3a0a0a', ta: 0.45 }, (t) => {
  const hit = ph(s, 'Первый раз') + 1.2;
  gang(ctx, 1300, t > hit ? 1010 : 1000, 0.95, t > hit ? { lean: 1.45, expr: 'shock' } : { armR: -1.2, expr: 'angry' }, 2);
  youngHorus(ctx, 760, 1000, 1.05, { ...idlePose(t), expr: t > hit ? 'neutral' : 'grit' });
  if (t > hit && t < hit + 0.25) { ctx.fillStyle = 'rgba(200,30,20,0.4)'; ctx.fillRect(0, 0, BX1, BY1); }
}));

// they follow you; gang bosses at one table
S(9, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTunnel(c, t), tint: '#202028' }, (t) => {
  rect(ctx, 420, 860, 1080, 60, '#3a2a20', 8, 6);
  for (let i = 0; i < 4; i++) gang(ctx, 520 + i * 290 + (i > 1 ? 120 : 0), 980, 0.85, { expr: 'neutral', look: i < 2 ? 1 : -1 }, i);
  youngHorus(ctx, 960, 900, 1.15, { ...idlePose(t), expr: 'talk', time: t });
}));

// the quarry edge at night, waiting for someone from the sky
S(10, (ctx, s) => sc(ctx, s, { bg: (c, t) => { bgCthonia(c, t, { night: true, edge: true }); bgStars(c, t); }, cam: [900, 600, 1.1, 900, 520, 1.2] }, (t) => {
  ctx.save(); ctx.translate(820, 790); youngHorus(ctx, 0, 0, 1.0, { legL: -1.2, legR: -1.0, bob: 40, head: -0.25, look: 0.3, blink: 0 }); ctx.restore();
}));
function bgStars(ctx, t) { const r = rng(5); ctx.fillStyle = '#fff'; for (let i = 0; i < 120; i++) { ctx.globalAlpha = 0.3 + 0.7 * Math.abs(Math.sin(t + i)); ctx.fillRect(BX0 + r() * 2900, BY0 + r() * 900, 3, 3); } ctx.globalAlpha = 1; }

// gang war ended by talk
S(11, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTunnel(c, t), tint: '#2a1010' }, (t) => {
  const peace = ph(s, 'К утру');
  for (let i = 0; i < 3; i++) { gang(ctx, 260 + i * 170, 1000, 0.85, { expr: t > peace ? 'neutral' : 'angry', armR: t > peace ? 0 : -1 }, i); gang(ctx, 1660 - i * 170, 1000, 0.85, { expr: t > peace ? 'neutral' : 'angry', flip: true, armR: t > peace ? 0 : -1 }, i + 2); }
  youngHorus(ctx, 960, 1000, 1.1, { ...idlePose(t), expr: 'talk', time: t });
  bigLine(ctx, 'Тем, кого слушают.', t, ph(s, 'Тем, кого'), 3, 200, 60);
}));

// you could be king of Cthonia
S(12, (ctx, s) => sc(ctx, s, { bg: bgCthonia }, (t) => {
  for (let i = 0; i < 6; i++) gang(ctx, 300 + i * 260 + (i > 2 ? 300 : 0), 1010, 0.8, { lean: 0.25, head: 0.2 }, i);
  youngHorus(ctx, 960, 900, 1.2, { ...idlePose(t), look: 0 });
  bigLine(ctx, 'Тебе нужен ответ.', t, ph(s, 'Тебе нужен ответ'), 3, 160, 60);
}));

// fear of oblivion
S(13, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgCthonia(c, t, { night: true }), tint: '#101018', ta: 0.4 }, (t) => {
  rect(ctx, 880, 860, 160, 40, '#2a2a2e', 8, 5); rect(ctx, 945, 700, 30, 180, '#3a3a3e', 4, 5); rect(ctx, 890, 750, 140, 26, '#3a3a3e', 4, 5);
  youngHorus(ctx, 620, 1000, 1.05, { ...idlePose(t), expr: 'sad', look: 1 });
  bigLine(ctx, 'Не смерть. Забвение.', t, ph(s, 'Не смерть'), 4, 180, 66);
}));

// the sky opens; golden ships
S(14, (ctx, s) => sc(ctx, s, { bg: bgCthonia, cam: [960, 400, 1, 960, 480, 1.05] }, (t) => {
  for (let i = 0; i < 4; i++) {
    const y = kf(t, [[0, -300], [4, 120 + i * 40]]);
    ship(ctx, 400 + i * 380, y, 0.6 - i * 0.05, '#c9a24a', i % 2 ? 1 : -1);
    ctx.fillStyle = 'rgba(255,230,150,0.12)'; ctx.beginPath(); ctx.moveTo(380 + i * 380, y + 40); ctx.lineTo(300 + i * 380, 1100); ctx.lineTo(500 + i * 380, 1100); ctx.fill();
  }
  if (t > ph(s, 'А ты поднимаешься')) youngHorus(ctx, 960, 1000, 1.0, { ...walkPose(t, 0.6, 0.25), look: 0 });
}));

// the one you waited for has come
S(15, (ctx, s) => sc(ctx, s, { bg: bgCthonia, cam: [960, 600, 1.0, 960, 560, 1.15] }, (t) => {
  ctx.fillStyle = 'rgba(255,230,150,0.25)'; ctx.beginPath(); ctx.moveTo(860, -200); ctx.lineTo(600, 1100); ctx.lineTo(1320, 1100); ctx.lineTo(1060, -200); ctx.fill();
  emperor(ctx, 960, 1000, 0.85, { ...idlePose(t), expr: 'neutral' });
}));

// ================= LEVEL 2 =================
card(16, 2);

// the man in gold walks through the crowd
S(17, (ctx, s) => sc(ctx, s, { bg: bgCthonia, cam: [960, 560, 1, 960, 540, 1.1] }, (t) => {
  for (let i = 0; i < 8; i++) { const x = i < 4 ? 200 + i * 150 : 1240 + (i - 4) * 150; gang(ctx, x, 1040, 0.75, { lean: (i < 4 ? -0.08 : 0.08), look: i < 4 ? 1 : -1 }, i); }
  emperor(ctx, 960, kf(t, [[0, 1180], [5, 1040]]), 0.8, walkPose(t, 0.45, 0.2));
  youngHorus(ctx, 520, 1080, 1.25, { look: 1, expr: 'shock' });
}));

// he looks at you like he searched all his life
S(18, (ctx, s) => sc(ctx, s, { bg: (c) => fillBg(c, '#2a2420'), cam: [960, 300, 2.2, 960, 300, 2.4], tint: '#2a1a0a', ta: 0.2 }, (t) => emperor(ctx, 960, 880, 0.9, { ...idlePose(t), expr: 'neutral', look: 0 })));

// "I am your father"
S(19, (ctx, s) => sc(ctx, s, { bg: bgCthonia }, (t) => {
  emperor(ctx, 1240, 1020, 0.9, { ...idlePose(t), expr: 'talk', time: t, flip: true });
  youngHorus(ctx, 700, 1020, 1.25, { ...idlePose(t), expr: 'shock', look: 1 });
}));

// first
S(20, (ctx, s) => { ctx.fillStyle = '#060508'; ctx.fillRect(0, 0, W, H); bigLine(ctx, 'ПЕРВЫЙ', s.lt, 0.1, 10, 540, 170, '#c9a24a'); grain(ctx); });

// like a reward, then like a wound
S(21, (ctx, s) => { ctx.fillStyle = '#060508'; ctx.fillRect(0, 0, W, H);
  const a = ph(s, 'Как награду'), b = ph(s, 'А потом');
  bigLine(ctx, 'Как награду.', s.lt, a, b - a - 0.2, 480, 80, '#c9a24a');
  bigLine(ctx, 'А потом как рану.', s.lt, b, 6, 600, 80, '#c0301e'); grain(ctx); });

// years alone with father: history, war, no gods
S(22, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t, { terra: false }), tint: '#0a0a1a' }, (t) => {
  emperor(ctx, 1240, 1000, 0.9, { ...idlePose(t), expr: 'talk', time: t, armR: -0.8, flip: true });
  horus(ctx, 640, 1000, 0.85, { ...idlePose(t), look: 1 }, 'lw');
}));

// the star map: we will bring humanity back
S(23, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgSpace(c, t, { nebula: 'rgba(60,80,160,0.35)' }) }, (t) => {
  const r = rng(21);
  for (let i = 0; i < 160; i++) { const x = 160 + r() * 1600, y = 120 + r() * 800; const on = t > 2 + r() * 12; ctx.fillStyle = on ? '#ffd060' : '#4a5a7a'; ctx.beginPath(); ctx.arc(x, y, on ? 7 : 5, 0, Math.PI * 2); ctx.fill(); }
  bigLine(ctx, 'всё это мы вернём', t, ph(s, 'всё это мы'), 4, 980, 54, '#f0e6d0');
}));

// the Luna Wolves; they call you Lupercal
S(24, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgStoneRoom(c, t, { wall: '#3a3a44', floor: '#2a2a30', windows: false }), cam: [960, 600, 1, 960, 560, 1.06] }, (t) => {
  for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) lw(ctx, 220 + i * 300 + r * 150, 900 + r * 120, 0.42 + r * 0.06, idlePose(t, i + r));
  horus(ctx, 960, 1080, 0.9, { ...idlePose(t), expr: 'happy' }, 'lw');
  place(ctx, 'ЛУННЫЕ ВОЛКИ', t, 0.6, 'XVI легион');
  nameTag(ctx, 'ЛУПЕРКАЛЬ', 960, 130, t, ph(s, 'Луперкаль'), 56);
}));

// father and son against the galaxy; a hand on your shoulder
S(25, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgWild(c, t, { night: 1 }), tint: '#2a1010' }, (t) => {
  const hand = ph(s, 'кладёт руку');
  if (t < hand - 0.5) {
    for (let i = 0; i < 4; i++) drawRig(ctx, rig('ork'), 1300 + i * 180, 1000, 0.5, { ...walkPose(t + i, 1, 0.4), flip: true }, ORK_PAL);
    explosion(ctx, 1400, 700, 0.8, t, 2);
  }
  emperor(ctx, 760, 1000, 0.85, idlePose(t));
  horus(ctx, 420, 1000, 0.8, { ...idlePose(t), expr: t > hand ? 'happy' : 'grit' }, 'lw');
  if (t > hand) bigLine(ctx, 'Тебе больше никогда не будет так хорошо.', t, ph(s, 'Тебе больше никогда'), 5, 160, 46, '#c9b89a');
}));

// then he finds the second son
S(26, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgStoneRoom(c, t, { wall: '#4a4440', floor: '#3a3430' }) }, (t) => {
  emperor(ctx, 1000, 1000, 0.85, { ...idlePose(t), armL: -0.5 });
  primarch(ctx, 'dorn', 1350, 1000, 0.8, { flip: true });
  horus(ctx, 420, 1000, 0.8, { ...idlePose(t), look: 1 }, 'lw');
}));

// one after another brothers come back
S(27, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgSpace(c, t, { nebula: 'rgba(120,80,40,0.3)' }), cam: [960, 560, 1.1, 960, 560, 1] }, (t) => {
  const order = ['dorn', 'sang', 'magnus', 'russ', 'fulgrim', 'khan'];
  order.forEach((w, i) => {
    const a = 0.5 + i * 2.2;
    if (t < a) return;
    const x = 230 + i * 292, sc2 = 0.45 * pop(t, a, 0.6);
    if (w === 'sang') sanguinius(ctx, x, 1000, sc2, idlePose(t, i)); else primarch(ctx, w, x, 1000, sc2, idlePose(t, i));
  });
  nameTag(ctx, 'строит крепости', 250, 330, t, ph(s, 'Один строит') + 0.3, 34);
  nameTag(ctx, 'летает на крыльях', 540, 330, t, ph(s, 'Другой летает') + 0.3, 34);
  nameTag(ctx, 'знает тайны', 830, 330, t, ph(s, 'Третий знает') + 0.3, 34);
}));

// each time you watch father embrace a new brother
S(28, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgStoneRoom(c, t, { wall: '#4a4440', floor: '#3a3430' }), cam: [1200, 560, 1.15, 1100, 560, 1.2] }, (t) => {
  emperor(ctx, 1200, 1000, 0.85, { armL: -1.2, armR: 1.2 });
  sanguinius(ctx, 1420, 1000, 0.8, { flip: true });
  horus(ctx, 560, 1000, 0.8, { ...idlePose(t), look: 1, expr: 'neutral' }, 'lw');
}));

// you're glad; you welcome them first
S(29, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgStoneRoom(c, t, { wall: '#3a3a44', floor: '#2a2a30', banners: true }) }, (t) => {
  horus(ctx, 960, 1000, 0.85, { ...idlePose(t), expr: 'happy', armR: -1.0 }, 'lw');
  primarch(ctx, 'russ', 500, 1000, 0.75, idlePose(t, 1)); primarch(ctx, 'khan', 1420, 1000, 0.75, { ...idlePose(t, 2), flip: true });
}));

// deep inside you remember every one
S(30, (ctx, s) => sc(ctx, s, { bg: (c) => fillBg(c, '#0c0a10'), cam: [960, 540, 1, 960, 540, 1.12], tint: '#0a0a1a', ta: 0.3, vig: 0.85 }, (t) => {
  ctx.globalAlpha = 0.5;
  emperor(ctx, 1450, 900, 0.5, {}); sanguinius(ctx, 1650, 900, 0.45, {}); primarch(ctx, 'dorn', 1250, 900, 0.45, {});
  ctx.globalAlpha = 1;
  horus(ctx, 600, 1050, 1.0, { ...idlePose(t), look: 1, expr: 'sad' }, 'lw');
}));

// still you are first
S(31, (ctx, s) => sc(ctx, s, { bg: (c) => fillBg(c, '#0c0a10'), cam: [600, 380, 1.8, 600, 380, 2.0] }, (t) => {
  horus(ctx, 600, 1050, 1.0, { ...idlePose(t), expr: 'neutral' }, 'lw');
}) || bigLine(ctx, 'Ведь ты всё равно первый.', s.lt, 0.4, 6, 900, 60));

// ================= LEVEL 3 =================
card(32, 3);

// the Great Crusade: two hundred years of war
S(33, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgSpace(c, t), cam: [960, 540, 1, 1100, 540, 1.1] }, (t) => {
  for (let i = 0; i < 9; i++) ship(ctx, ((i * 260 + t * 120) % 2400) - 200, 200 + (i % 4) * 180, 0.4 + (i % 3) * 0.12, '#dfe4e8', 1);
  bigLine(ctx, 'Двести лет войны.', t, 0.8, 4, 900, 66);
}));

// worlds return: flowers or fire
S(34, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgSpace(c, t) }, (t) => {
  const r = rng(4);
  for (let i = 0; i < 7; i++) { const lit = t > 1 + i * 1.6; planet(ctx, 160 + i * 270, 540 + Math.sin(i) * 160, 90, lit ? '#4f8ad0' : '#3a3a44', lit ? '#3a8a3a' : '#2a2a30', { seed: i + 2 }); if (lit && i % 3 === 2) explosion(ctx, 160 + i * 270, 540 + Math.sin(i) * 160, 0.4, t + i, i); }
  nameTag(ctx, 'цветами', 600, 160, t, ph(s, 'цветами'), 46); nameTag(ctx, 'огнём', 1320, 160, t, ph(s, 'огнём'), 46);
}));

// first you always offer peace
S(35, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgUltramarCity(c, t), tint: '#2a2030', ta: 0.35 }, (t) => {
  horus(ctx, 700, 1000, 0.85, { ...walkPose(t, 0.4, 0.15), expr: 'neutral' }, 'lw');
  for (let i = 0; i < 3; i++) human(ctx, 1200 + i * 180, 1000, 0.95, { expr: i === 1 ? 'shock' : 'neutral', flip: true }, { hair: 'short', crown: i === 1 }, pal(HUMAN_PAL.citizen, { shirt: '#7a3a6a' }));
  bigLine(ctx, 'слово сильнее ножа, если за словом стоит армия', t, ph(s, 'слово сильнее') + 0.3, 6, 160, 44, '#c9b89a');
}));

// they call you when nothing else works
S(36, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgCouncil(c, t), tint: '#1a1420' }, (t) => {
  rect(ctx, 300, 820, 1320, 70, '#3a2a20', 10, 6);
  primarch(ctx, 'fulgrim', 400, 900, 0.6, idlePose(t, 1)); primarch(ctx, 'russ', 700, 900, 0.6, idlePose(t, 2));
  primarch(ctx, 'khan', 1220, 900, 0.6, { ...idlePose(t, 3), flip: true }); primarch(ctx, 'magnus', 1520, 900, 0.6, { ...idlePose(t, 4), flip: true });
  horus(ctx, 960, 960, 0.75, { ...idlePose(t), expr: 'talk', time: t }, 'lw');
}));

// the Mournival
S(37, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgStoneRoom(c, t, { wall: '#3a3a44', floor: '#2a2a30', windows: false }) }, (t) => {
  horus(ctx, 960, 1060, 0.85, idlePose(t), 'lw');
  ['abaddon', 'torgaddon', 'aximand', 'loken'].forEach((w, i) => captain(ctx, w, [360, 600, 1320, 1560][i], 1000, 0.6, idlePose(t, i), LUNA));
  place(ctx, 'МОРНИВАЛ', t, 0.6, 'те, кто скажет правду');
}));

// Abaddon
S(38, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgStoneRoom(c, t, { wall: '#3a3a44', floor: '#2a2a30', windows: false }), cam: [960, 420, 1.6, 960, 400, 1.75] }, (t) => {
  captain(ctx, 'abaddon', 960, 1000, 0.9, { ...idlePose(t), expr: 'grit' }, LUNA);
}) || nameTag(ctx, 'АБАДДОН', 960, 960, s.lt, 0.3, 64));

// Torgaddon
S(39, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgStoneRoom(c, t, { wall: '#3a3a44', floor: '#2a2a30', windows: false }), cam: [960, 420, 1.6, 960, 400, 1.7] }, (t) => {
  captain(ctx, 'torgaddon', 960, 1000, 0.9, { ...idlePose(t), expr: 'happy' }, LUNA);
}) || nameTag(ctx, 'ТОРГАДДОН', 960, 960, s.lt, 0.3, 64));

// Aximand, "Little Horus"
S(40, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgStoneRoom(c, t, { wall: '#3a3a44', floor: '#2a2a30', windows: false }), cam: [960, 420, 1.6, 960, 400, 1.7] }, (t) => {
  captain(ctx, 'aximand', 960, 1000, 0.9, { ...idlePose(t), expr: 'neutral' }, LUNA);
}) || nameTag(ctx, 'АКСИМАНД', 960, 960, s.lt, 0.3, 64));

// Loken, inconveniently honest
S(41, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgStoneRoom(c, t, { wall: '#3a3a44', floor: '#2a2a30', windows: false }), cam: [960, 420, 1.6, 960, 400, 1.7] }, (t) => {
  captain(ctx, 'loken', 960, 1000, 0.9, { ...idlePose(t), expr: 'neutral' }, LUNA);
}) || nameTag(ctx, 'ЛОКЕН', 960, 960, s.lt, 0.3, 64));

// the oath under the moon
S(42, (ctx, s) => sc(ctx, s, { bg: (c, t) => { bgWild(c, t, { night: 1 }); circ(c, 1500, 180, 120, '#e8ecf0', 0); glow(c, 1500, 180, 400, 'rgba(220,230,255,A)', 0.3); }, tint: '#0a1020' }, (t) => {
  horus(ctx, 960, 1000, 0.8, { ...idlePose(t), expr: 'happy' }, 'lw');
  ['abaddon', 'torgaddon', 'aximand', 'loken'].forEach((w, i) => captain(ctx, w, [380, 620, 1300, 1540][i], 1020, 0.55, { legL: -0.9, bob: 40, head: 0.15 }, LUNA));
}));

// hundreds of wars together
S(43, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgWild(c, t), tint: '#3a1410', shake: 3 }, (t) => {
  for (let i = 0; i < 5; i++) lw(ctx, 300 + i * 330, 1000, 0.5, walkPose(t + i, 0.8, 0.3));
  for (let i = 0; i < 4; i++) explosion(ctx, 300 + i * 450, 500 + (i % 2) * 120, 0.8, t + i * 0.3, i);
}));

// the false Emperor; Sejanus dies; you kill the impostor
S(44, (ctx, s) => sc(ctx, s, { bg: (c, t) => { bgHall(c, t, { throne: {} }); }, tint: '#2a1a0a' }, (t) => {
  const kill = ph(s, 'Ты сам находишь');
  if (t < kill) human(ctx, 960, 760, 1.1, { expr: 'angry' }, { hair: 'short', crown: true }, pal(HUMAN_PAL.citizen, { shirt: '#c9a24a' }));
  else human(ctx, 1060, 790, 1.1, { lean: 1.5, expr: 'shock' }, { hair: 'short', crown: true }, pal(HUMAN_PAL.citizen, { shirt: '#c9a24a' }));
  if (t > ph(s, 'гибнет твой капитан')) { captain(ctx, 'torgaddon', 500, 1060, 0.6, { lean: -1.5 }, LUNA); nameTag(ctx, 'Сеянус', 380, 900, t, ph(s, 'гибнет твой капитан'), 40); }
  horus(ctx, 1450, 1060, 0.85, { ...idlePose(t), expr: 'angry' }, 'lw');
  nameTag(ctx, 'ЛОЖНЫЙ ИМПЕРАТОР', 960, 120, t, 0.5, 48);
}));

// how easy to call any ruler false
S(45, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgHall(c, t, { throne: {} }), cam: [1100, 520, 1.3, 1150, 480, 1.5], tint: '#1a0a10', ta: 0.4 }, (t) => {
  human(ctx, 1060, 790, 1.1, { lean: 1.5, expr: 'shock' }, { hair: 'short', crown: true }, pal(HUMAN_PAL.citizen, { shirt: '#c9a24a' }));
  horus(ctx, 1450, 1060, 0.85, { ...idlePose(t), expr: 'neutral', look: -1 }, 'lw');
  bigLine(ctx, 'любого правителя можно объявить ложным', t, ph(s, 'впервые думаешь') + 0.5, 5, 160, 48, '#c9b89a');
}));

// you were the home of this family
S(46, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgStoneRoom(c, t, { wall: '#4a4440', floor: '#3a3430', banners: true }) }, (t) => {
  primarch(ctx, 'russ', 420, 1000, 0.7, { ...idlePose(t, 1), expr: 'angry' });
  primarch(ctx, 'magnus', 1500, 1000, 0.7, { ...idlePose(t, 2), expr: 'angry', flip: true });
  horus(ctx, 960, 1000, 0.8, { ...idlePose(t), expr: 'talk', time: t, armL: -0.6, armR: -0.6 }, 'lw');
  if (t > ph(s, 'Сангвинием')) sanguinius(ctx, 1220, 1000, 0.7, { ...idlePose(t, 3), expr: 'happy' });
}));

// all this time father watches
S(47, (ctx, s) => sc(ctx, s, { bg: (c, t) => { bgWild(c, t); glow(c, 960, 100, 600, 'rgba(255,220,120,A)', 0.5); }, tint: '#1a1010' }, (t) => {
  ctx.globalAlpha = 0.35; emperor(ctx, 960, 560, 0.6, {}); ctx.globalAlpha = 1;
  horus(ctx, 960, 1060, 0.85, { ...idlePose(t), look: 0, head: -0.15 }, 'lw');
}));

// ================= LEVEL 4 =================
card(48, 4);

// Ullanor
S(49, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgWild(c, t), tint: '#3a2010' }, (t) => {
  for (let i = 0; i < 14; i++) drawRig(ctx, rig('ork'), 120 + i * 140, 1020 - (i % 2) * 60, 0.35, walkPose(t + i, 1, 0.4), ORK_PAL);
}) || place(ctx, 'УЛЛАНОР', s.lt, 0.3, 'империя орков'));

// you kill the warboss
S(50, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgWild(c, t), tint: '#3a1410', shake: 4 }, (t) => {
  const kill = ph(s, 'Ты пробиваешься') + 1.5;
  drawRig(ctx, rig('ork'), 1350, t > kill ? 1060 : 1040, 1.0, t > kill ? { lean: 1.5, flip: true } : { ...idlePose(t), flip: true, armL: -1.4 }, ORK_PAL);
  emperor(ctx, 420, 1040, 0.8, idlePose(t));
  horus(ctx, 860, 1040, 0.85, { ...idlePose(t), expr: 'grit', armR: t > kill - 0.4 && t < kill + 0.3 ? -1.8 : -0.3 }, 'lw');
  for (let i = 0; i < 3; i++) explosion(ctx, 300 + i * 600, 400, 0.6, t + i * 0.4, i);
}));

// weeks of battle; the last time side by side
S(51, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgWild(c, t, { night: 1 }), tint: '#2a1010', ta: 0.4 }, (t) => {
  for (let i = 0; i < 8; i++) lw(ctx, 140 + i * 230, 1060, 0.4, { lean: i % 2 ? 1.5 : -1.5 });
  emperor(ctx, 760, 960, 0.8, idlePose(t)); horus(ctx, 1160, 960, 0.8, { ...idlePose(t), expr: 'sad' }, 'lw');
  bigLine(ctx, 'Это последняя битва, в которой вы стоите плечом к плечу.', t, ph(s, 'Это последняя'), 5, 150, 44, '#c9b89a');
}));

// the Triumph: millions in ranks, Titans as honour guard
S(52, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTerra(c, t), tint: '#2a1a08', ta: 0.15, cam: [960, 540, 1.1, 960, 540, 1] }, (t) => {
  titan(ctx, 220, 900, 0.9, 0, '#4a3a2a'); titan(ctx, 1700, 900, 0.9, 0, '#4a3a2a');
  for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) lw(ctx, 420 + i * 135, 900 + r * 70, 0.24 + r * 0.03, {});
  for (let i = 0; i < 5; i++) banner(ctx, 450 + i * 260, 300, 0.55, t + i, ['#dfe4e8', '#2d5bd1', '#b3262a', '#f2c230', '#2f7a3a'][i]);
}));

// he names you Warmaster
S(53, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgTerra(c, t), tint: '#2a1a08', ta: 0.15, cam: [960, 560, 1, 960, 500, 1.15] }, (t) => {
  emperor(ctx, 1250, 1000, 0.9, { ...idlePose(t), armR: -1.6, flip: true });
  horus(ctx, 760, 1000, 0.85, { ...idlePose(t), legL: -0.6, bob: 30, head: 0.1, expr: 'happy' }, 'lw');
  bigLine(ctx, 'МАГИСТР ВОЙНЫ', t, ph(s, 'Он называет тебя') + 0.8, 6, 170, 96, '#c9a24a');
}));

// the legion gets your name: Sons of Horus
S(54, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgStoneRoom(c, t, { wall: '#2a3a36', floor: '#1e2a26', windows: false }) }, (t) => {
  const p = clamp((t - 1.5) / 2);
  for (let i = 0; i < 6; i++) {
    const x = 220 + i * 300;
    ctx.save(); ctx.beginPath(); ctx.rect(x - 200, 0, 400, 1080); ctx.clip();
    if (p < (i + 1) / 6) lw(ctx, x, 1000, 0.5, idlePose(t, i)); else soh(ctx, x, 1000, 0.5, idlePose(t, i));
    ctx.restore();
  }
  eyeOfHorus(ctx, 960, 300, 1.2 * pop(t, ph(s, 'Твой глаз')), '#c9a24a', '#7a1a14');
  place(ctx, 'СЫНЫ ХОРУСА', t, ph(s, 'Сыны Хоруса'));
}));

// the best day of your life
S(55, (ctx, s) => sc(ctx, s, { bg: (c, t) => { bgTerra(c, t); glow(c, 960, 400, 900, 'rgba(255,220,120,A)', 0.5); }, tint: '#3a2a0a', ta: 0.1, cam: [960, 420, 1.5, 960, 400, 1.6] }, (t) => {
  horus(ctx, 960, 1000, 0.9, { ...idlePose(t), expr: 'happy' }, 'wm');
}));

// then father leaves
S(56, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgSpace(c, t) }, (t) => { ship(ctx, kf(t, [[0, 960], [3, 1700]]), kf(t, [[0, 540], [3, 300]]), kf(t, [[0, 0.8], [3, 0.2]]), '#e8c14a', 1); }));

// he goes back to Terra without explaining
S(57, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t, { terra: false }), tint: '#0a0a1a' }, (t) => {
  const go = ph(s, 'И улетает');
  emperor(ctx, kf(t, [[go, 1250], [go + 2, 1900]]), 1000, 0.9, t > go ? { ...walkPose(t, 0.5, 0.2), flip: false } : { ...idlePose(t), flip: true, expr: 'neutral' });
  horus(ctx, 700, 1000, 0.85, { ...idlePose(t), expr: t > ph(s, 'Ты спрашиваешь') ? 'talk' : 'neutral', time: t, armR: -0.5 }, 'wm');
}));

// the Council of Terra: clerks who never stood under fire
S(58, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgStoneRoom(c, t, { wall: '#4a4a52', floor: '#3a3a40', windows: false }), tint: '#1a1a20' }, (t) => {
  rect(ctx, 200, 840, 1520, 60, '#5a4030', 8, 6);
  for (let i = 0; i < 6; i++) { human(ctx, 320 + i * 260, 900, 0.75, { expr: 'neutral', ...idlePose(t, i) }, { hair: ['bald', 'short', 'bun'][i % 3], outfit: 'robe' }, pal(HUMAN_PAL.citizen, { shirt: '#3a3a44', trim: '#c9a24a' })); paper(ctx, 340 + i * 260, 820, 110, 60, '', [], { rot: 0.1 }); }
  for (let i = 0; i < 4; i++) { const p = ((t * 0.3 + i * 0.25) % 1); ctx.save(); ctx.translate(lerp(960, 1900, p), lerp(700, 300, p)); ctx.rotate(p * 4); rect(ctx, -40, -50, 80, 100, C.paper, 4, 4); ctx.restore(); }
  place(ctx, 'СОВЕТ ТЕРРЫ', t, 0.5);
}));

// remembrancers; you already think about how you'll be remembered
S(59, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgStoneRoom(c, t, { wall: '#2a3a36', floor: '#1e2a26', banners: false, windows: false }) }, (t) => {
  horus(ctx, 1250, 1000, 0.85, { ...idlePose(t), expr: 'happy' }, 'wm');
  for (let i = 0; i < 3; i++) remembrancer(ctx, 360 + i * 260, 1000, 0.9, { ...idlePose(t, i), armR: -0.8, look: 1 }, i);
  rect(ctx, 520, 600, 220, 260, '#e8e2d0', 4, 5); horus(ctx, 630, 840, 0.3, {}, 'wm');
  place(ctx, 'ЛЕТОПИСЦЫ', t, 0.5);
}));

// what will you be when the war ends?
S(60, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t, { terra: false }), tint: '#0a0a1a', ta: 0.35 }, (t) => {
  const night = ph(s, 'А ночью');
  if (t < night) { remembrancer(ctx, 600, 1000, 0.9, { ...idlePose(t), expr: 'talk', time: t }, 0); horus(ctx, 1200, 1000, 0.85, { ...idlePose(t), expr: 'happy', flip: true }, 'wm'); }
  else horus(ctx, 960, 1000, 0.9, { ...idlePose(t), expr: 'sad', head: -0.15 }, 'wm');
  bigLine(ctx, 'Кем будешь ты, когда отцу больше не нужен будет Магистр Войны?', t, ph(s, 'Кем будешь ты'), 6, 160, 42, '#c9b89a');
}));

// left in charge like a steward
S(61, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgHall(c, t, { throne: {} }), tint: '#1a1410' }, (t) => {
  horus(ctx, 960, 780, 0.75, { ...idlePose(t), expr: 'neutral' }, 'wm');
}));

// you tell yourself it's trust
S(62, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t, { terra: false }), tint: '#0a0a1a', cam: [960, 420, 1.5, 960, 400, 1.6] }, (t) => horus(ctx, 960, 1000, 0.9, { ...idlePose(t), expr: 'neutral' }, 'wm')));
S(63, (ctx, s) => sc(ctx, s, { bg: (c) => fillBg(c, '#08080c') }, () => {}) || bigLine(ctx, 'Ты почти в это веришь.', s.lt, 0.2, 6, 540, 72));

// brothers notice; whispers
S(64, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgStoneRoom(c, t, { wall: '#3a3a44', floor: '#2a2a30', windows: false }), tint: '#141018' }, (t) => {
  primarch(ctx, 'angron', 300, 1000, 0.65, { ...idlePose(t, 1), expr: 'angry' }); primarch(ctx, 'lorgar', 560, 1000, 0.65, { ...idlePose(t, 2), expr: 'sad' });
  primarch(ctx, 'fulgrim', 1360, 1000, 0.65, { ...idlePose(t, 3), flip: true }); primarch(ctx, 'dorn', 1620, 1000, 0.65, { ...idlePose(t, 4), flip: true, expr: 'happy' });
  horus(ctx, 960, 1000, 0.8, { ...idlePose(t), expr: 'angry' }, 'wm');
  nameTag(ctx, '...ему больше нет дела до сыновей...', 430, 300, t, ph(s, 'шепчет'), 34);
}));

// alone at night you look at the stars again
S(65, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t, { terra: false }), tint: '#0a0a1a', ta: 0.35 }, (t) => {
  horus(ctx, 960, 1000, 0.9, { ...idlePose(t), head: -0.2, look: 0 }, 'wm');
  ctx.globalAlpha = 0.25; ctx.save(); ctx.translate(660, 790); youngHorus(ctx, 0, 0, 0.6, { legL: -1.2, legR: -1.0, bob: 40, head: -0.25 }); ctx.restore(); ctx.globalAlpha = 1;
}));
S(66, (ctx, s) => sc(ctx, s, { bg: (c, t) => bgBridge(c, t, { terra: false }), tint: '#05050a', ta: 0.5, vig: 0.9 }, () => {}) || bigLine(ctx, 'Он не возвращается.', s.lt, 0.2, 6, 540, 72));
