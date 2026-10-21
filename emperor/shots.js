// The Emperor: 8 levels, 61 paragraphs. Each beat is a staged composition with a travelling camera (engine4 stage()).
// Thread of the film: the golden light from the boy's palm grows into the Astronomican.

const Y = 1000;
const card = (k, n) => shot(PT(k), (ctx, s) => eCard(ctx, n, s.lt), { fade: 0.4 });
const ip = (st, i = 0) => idlePose(st.t, i);
const talk = (st, i = 0, o = {}) => ({ ...idlePose(st.t, i), expr: 'talk', time: st.t, ...o });
const dim = (ctx, a = 0.45) => { ctx.fillStyle = `rgba(6,4,2,${a})`; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); };
const EMP = (c, x, y, s, pose = {}) => emperor(c, x, y, s, pose);
const palm = (c, x, y, s, st, a = 1) => goldLight(c, x, y, 26 * s, st.t, a);

// ===================== I. ШАМАН =====================
card(0, 1);

stage(1, [
  { set: (c, st) => setAnatolia(c, st, { tents: true }), cam: [700, 560, 1.05], to: [1100, 600, 1.15], fg: fgGrass,
    draw: (c, st) => { for (let i = 0; i < 6; i++) sheep(c, 1100 + i * 170 + Math.sin(st.t + i) * 10, Y - 20 + (i % 2) * 30, 0.6, st.t + i, i % 2 ? 1 : -1); boy(c, 820, Y, 0.75, { ...ip(st), expr: 'happy' }); },
    over: (c, st) => tCaption(c, 'Анатолия', st.lt, 0.6, 4, '8000 лет до нашей эры') },
  { at: 'Только ты слышишь', set: (c, st) => setAnatolia(c, st, { tents: true }), cam: CU(900, Y, 0.75), to: [1120, 720, 1.9], fg: fgGrass,
    draw: (c, st) => { boy(c, 900, Y, 0.75, { ...ip(st), look: 1, expr: 'neutral' }); sheep(c, 1250, Y - 10, 0.6, st.t, -1); c.save(); c.globalAlpha = 0.7; for (let i = 0; i < 3; i++) { const x = 1150 + i * 40, y = 640 - i * 50 - (st.bt * 20) % 40; c.fillStyle = '#fff8e0'; c.beginPath(); c.arc(x, y, 14 + i * 8, 0, Math.PI * 2); c.fill(); } c.restore(); } },
  { at: 'Ты знаешь, где пойдёт', set: (c, st) => setAnatolia(c, st, {}), cam: [960, 520, 1.0], to: [960, 380, 1.12], tilt: 0.03,
    draw: (c, st) => { boy(c, 960, Y, 0.7, { ...ip(st), head: -0.25, expr: 'neutral' }); const p = clamp(st.bt / 3); c.fillStyle = `rgba(90,100,120,${0.5 * p})`; for (let i = 0; i < 4; i++) { c.beginPath(); c.ellipse(500 + i * 320, 200 - p * 40, 220, 70, 0, 0, Math.PI * 2); c.fill(); } } },
], { tr: 'light', look: 'warm' });

stage(2, [
  { set: (c, st) => setAnatolia(c, st, { night: true }), cam: [960, 600, 1.0], to: [960, 520, 1.15], look: 'night',
    draw: (c, st) => { for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2 + st.t * 0.05; elder(c, 960 + Math.cos(a) * 520, Y - 60 + Math.sin(a) * 90, 0.62, { ...ip(st, i), head: 0.15 }, i); } campfire2(c, 960, Y - 40, 1.2, st.t); },
    over: (c, st) => tCaption(c, 'Шаманы всех племён', st.lt, 0.4, 4) },
  { at: 'Они убили себя', sfx: [['swell', 0, 0.8]], set: (c, st) => setAnatolia(c, st, { night: true }), cam: [960, 560, 1.1], to: [960, 360, 1.35], look: 'night', blur: true,
    draw: (c, st) => { const p = ease.io(clamp(st.bt / 3)); for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2; c.save(); c.globalAlpha = 1 - p; elder(c, 960 + Math.cos(a) * 520, Y - 60 + Math.sin(a) * 90, 0.62, { blink: 1, head: 0.3 }, i); c.restore(); const sx = 960 + Math.cos(a) * 520 * (1 - p), sy = (Y - 300) * (1 - p) + 300 * p + Math.sin(a) * 90 * (1 - p); goldLight(c, sx, sy, 10 + p * 6, st.t, 0.8); } } },
  { at: 'В тебе', set: (c, st) => setAnatolia(c, st, { night: true, tents: true }), cam: [1080, 640, 1.4], to: [1090, 700, 2.4], look: 'night',
    draw: (c, st) => { mum(c, 1150, Y, 0.95, { ...ip(st), armL: -1, armR: 1, flip: true, expr: 'happy' }); rect(c, 1020, 700, 150, 70, '#e8dcc0', 30, 5); c.fillStyle = '#d8a070'; c.beginPath(); c.arc(1060, 712, 24, 0, Math.PI * 2); c.fill(); goldLight(c, 1060, 712, 34, st.t, clamp(st.bt / 1.5)); } },
], { tr: 'black', look: 'night' });

stage(3, [
  { set: setDream, cam: [960, 540, 1.1], to: [1200, 500, 1.3], look: 'warp',
    draw: (c, st) => { const who = [['barb', 600], ['babylon', 960], ['sage', 1320]]; who.forEach(([e, x], i) => { c.save(); c.globalAlpha = 0.35 + 0.65 * clamp((st.bt - i * 0.8) / 0.6); wanderer(c, e, x, Y, 0.8, ip(st, i)); c.restore(); }); },
    over: (c, st) => tLine(c, 'Тысячи чужих жизней', st.bt, 0.4, 3, 160, 70) },
  { at: 'Охотник', set: (c, st) => setFenris(c, st), cam: [800, 640, 1.2], to: [1100, 600, 1.35], look: 'cold', draw: (c, st) => person(c, 900, Y, 0.95, pose.march(st.t), { hat: 'hood', coat: true, weapon: 'shovel' }, EP.barb) },
  { at: 'Знахарка', set: (c, st) => setAnatolia(c, st, {}), cam: [1100, 620, 1.3], to: [900, 640, 1.4], look: 'warm', draw: (c, st) => { person(c, 960, Y, 0.95, { ...ip(st), armR: -1.2, expr: 'neutral' }, { female: true, hat: 'kerchief', old: true }, pal(EP.mother, { dress: '#c86a3a', kerchief: '#e0b040' })); fireFX(c, 1160, Y - 20, 0.4, st.t, 3); } },
  { at: 'Старик', set: (c, st) => { fillBg(c, '#0a0c1a'); stars(c, 300, 8); depth(c, st, 0.3, () => { c.fillStyle = '#2a3a5a'; c.fillRect(BX0, 860, BX1 - BX0, 60); }); fillGround(c, 900, '#1a1a2a', '#141424'); }, cam: [860, 700, 1.3], to: [900, 600, 1.45], look: 'night', draw: (c, st) => elder(c, 800, Y, 0.85, { ...ip(st), head: -0.3, look: 1 }, 1) },
  { at: 'Ты просыпаешься', set: (c, st) => setAnatolia(c, st, { tents: true }), cam: TWO(860, 1180, Y, 0.85), to: [1020, 700, 1.6], look: 'warm', draw: (c, st) => { boy(c, 860, Y, 0.72, { ...ip(st), expr: 'shock', bob: Math.sin(st.t * 30) * 1 }); person(c, 1180, Y, 1, { ...talk(st), flip: true, expr: 'sad' }, { mustache: true, hat: 'none', coat: true }, EP.tribe); } },
  { at: 'Ты просто слишком', set: (c, st) => setAnatolia(c, st, { night: true }), cam: CU(960, Y, 0.72), to: [960, 680, 2.4], look: 'night', draw: (c, st) => { boy(c, 960, Y, 0.72, { ...ip(st), expr: 'neutral' }); const g = c.createRadialGradient(960, 760, 10, 960, 760, 600); g.addColorStop(0, 'rgba(255,220,140,0.35)'); g.addColorStop(1, 'rgba(255,220,140,0)'); c.fillStyle = g; c.fillRect(300, 200, 1400, 1100); } },
], { tr: 'whip', look: 'warp' });

stage(4, [
  { set: (c, st) => setAnatolia(c, st, { night: true, tents: true }), cam: [960, 640, 1.1], to: [1300, 600, 1.2], look: 'night', fg: fgRocks,
    draw: (c, st) => { boy(c, 700, Y, 0.72, { ...ip(st), look: 1, expr: 'neutral' }); for (let i = 0; i < 3; i++) wolf(c, 1500 + i * 220, 760 - i * 20, 0.5, st.t + i, -1, 0.6); },
    over: (c, st) => tCaption(c, 'Тебе семь лет', st.lt, 0.4, 3) },
  { at: 'Оно смотрит', set: (c) => { fillBg(c, '#04040a'); }, cam: [960, 540, 1.0], to: [960, 540, 1.35], look: 'night', draw: (c, st) => { for (let i = 0; i < 9; i++) { const x = 200 + i * 200, y = 300 + (i % 3) * 200; c.save(); c.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(st.t * 0.7 + i)); c.fillStyle = '#ffd040'; c.shadowColor = '#ff8020'; c.shadowBlur = 30; c.beginPath(); c.ellipse(x - 22, y, 14, 8, 0.2, 0, Math.PI * 2); c.ellipse(x + 22, y, 14, 8, -0.2, 0, Math.PI * 2); c.fill(); c.restore(); } } },
  { at: 'Взрослые зовут', set: (c, st) => setAnatolia(c, st, { tents: true }), cam: [960, 640, 1.15], to: [760, 640, 1.25], look: 'warm', draw: (c, st) => { for (let i = 0; i < 4; i++) elder(c, 1000 + i * 220, Y, 0.85, { ...ip(st, i), armR: -2.4, head: -0.2 }, i); boy(c, 640, Y, 0.72, { ...ip(st), expr: 'neutral', look: -1 }); } },
  { at: 'Ты называешь это врагом', set: (c, st) => setAnatolia(c, st, { night: true }), cam: CU(960, Y, 0.72), to: [960, 700, 2.6], look: 'night', draw: (c, st) => boy(c, 960, Y, 0.72, { ...ip(st), expr: 'angry' }), over: (c, st) => tLine(c, 'ВРАГ', st.bt, 0.6, 2.5, 240, 140, '#e8c060') },
], { tr: 'black' });

stage(5, [
  { set: (c, st) => setAnatolia(c, st, { winter: true }), cam: [700, 600, 1.05], to: [1200, 620, 1.1], look: 'cold', fg: (c, st) => snowFX(c, st.t, 160, 120, 4, 1.4),
    draw: (c, st) => { for (let i = 0; i < 6; i++) sheep(c, 300 + i * 160, Y - (i % 2) * 20, 0.55, st.t + i, 1); for (let i = 0; i < 4; i++) wolf(c, 2100 - i * 160 - st.bt * 120, Y - 40, 0.7, st.t + i, -1); } },
  { at: 'Взрослые хватаются', set: (c, st) => setAnatolia(c, st, { winter: true }), cam: [960, 640, 1.2], to: [1100, 600, 1.3], look: 'cold', shake: 2, draw: (c, st) => { for (let i = 0; i < 4; i++) tribesman(c, 600 + i * 200, Y, 0.9, { ...ip(st, i), lean: -0.15, expr: 'shock' }, i * 3); } },
  { at: 'А ты просто', set: (c, st) => setAnatolia(c, st, { winter: true }), cam: [1000, 640, 1.1], to: CU(900, Y, 0.72), look: 'cold', draw: (c, st) => { const p = ease.out(clamp(st.bt / 2)); boy(c, 700 + p * 200, Y, 0.72, { ...pose.march(st.t), armR: -2.6 * p }); for (let i = 0; i < 3; i++) wolf(c, 1350 + i * 180, Y - 40, 0.7, st.t + i, -1); } },
  { at: 'В ладони загорается', sfx: [['chime', 0.3, 1]], set: (c, st) => setAnatolia(c, st, { winter: true }), cam: [1000, 620, 1.6], to: [1000, 560, 2.2], look: 'gold', draw: (c, st) => { boy(c, 900, Y, 0.72, { armR: -2.6, expr: 'grit' }); const a = clamp(st.bt / 1.2); palm(c, 960, 690, 1.6 + a, st, a); c.save(); c.globalAlpha = 1 - clamp(st.bt / 3) * 0.6; for (let i = 0; i < 3; i++) wolf(c, 1350 + i * 180 + st.bt * 80, Y - 40, 0.7, st.t + i, -1); c.restore(); } },
  { at: 'Волки скулят', set: (c, st) => setAnatolia(c, st, { winter: true }), cam: [1300, 600, 1.2], to: [1700, 580, 1.0], look: 'cold', draw: (c, st) => { for (let i = 0; i < 3; i++) wolf(c, 1500 + i * 200 + st.bt * 300, Y - 40, 0.7, st.t * 2 + i, 1, 1 - clamp(st.bt / 2.5)); } },
  { at: 'Наутро', set: (c, st) => setAnatolia(c, st, { winter: true, tents: true }), cam: [960, 640, 1.05], to: [960, 600, 1.15], look: 'warm', draw: (c, st) => { for (let i = 0; i < 6; i++) tribesman(c, 300 + i * 260 + (i > 2 ? 200 : 0), Y, 0.85, { ...ip(st, i), look: i > 2 ? -1 : 1, expr: 'shock' }, i); boy(c, 1050, Y, 0.72, { ...ip(st), expr: 'neutral' }); } },
], { tr: 'whip', look: 'cold' });

stage(6, [
  { set: (c, st) => { fillBg(c, '#3a2a1a'); depth(c, st, 0.4, () => { tent(c, 960, 960, 4, '#7a5a3a'); }); fillGround(c, 900, '#5a4028', '#4a3420'); }, cam: [980, 760, 1.25], to: [1060, 740, 1.45], look: 'warm', draw: (c, st) => { person(c, 1250, Y - 10, 0.85, pose.lie(), { hat: 'none', mustache: true }, EP.tribe); boy(c, 860, Y, 0.72, { armR: -1.2, expr: 'neutral' }); palm(c, 930, 760, 1.2, st, 0.8); } },
  { at: 'Старики кланяются', set: (c, st) => setAnatolia(c, st, { tents: true }), cam: [960, 640, 1.1], to: [800, 640, 1.2], look: 'warm', draw: (c, st) => { for (let i = 0; i < 4; i++) elder(c, 1050 + i * 200, Y, 0.85, { lean: 0.35 + Math.sin(st.t * 2 + i) * 0.05, head: 0.3, flip: true }, i); boy(c, 700, Y, 0.72, ip(st)); } },
  { at: 'Мать боится', set: (c, st) => setAnatolia(c, st, { tents: true, night: true }), cam: TWO(800, 1150, Y, 0.9), to: [1150, 660, 1.9], look: 'night', draw: (c, st) => { boy(c, 800, Y, 0.72, { ...ip(st), look: 1, expr: 'sad' }); mum(c, 1150, Y, 0.95, { ...ip(st), flip: true, lean: -0.12, expr: 'shock', armL: -0.6 }); } },
  { at: 'Ты впервые понимаешь', set: (c, st) => setAnatolia(c, st, { night: true }), cam: [960, 600, 1.4], to: [960, 540, 1.0], look: 'night', draw: (c, st) => { boy(c, 960, Y, 0.72, { ...ip(st), expr: 'sad', head: 0.2 }); palm(c, 1020, 770, 1, st, 0.7); }, over: (c, st) => tLine(c, 'Сила делает одиноким', st.bt, 0.8, 3.5, 200, 70) },
], { tr: 'cut', look: 'warm' });

// ===================== II. СТРАННИК =====================
card(7, 2);

stage(8, [
  { set: (c, st) => setAnatolia(c, st, {}), cam: [960, 640, 1.1], to: [1100, 620, 1.2], look: 'warm', draw: (c, st) => { const age = clamp(st.bt / 4); for (let i = 0; i < 3; i++) person(c, 1150 + i * 200, Y, 0.9, { ...ip(st, i), bob: age * 10, head: age * 0.2 }, { old: age > 0.5, mustache: i === 0, female: i === 1, hat: i === 1 ? 'kerchief' : 'none' }, pal(EP.tribe, { hair: age > 0.5 ? '#d8d8d0' : '#2a1a10' })); wanderer(c, 'tribe', 760, Y, 0.95, ip(st)); } },
  { at: 'твои дети становятся', set: (c, st) => { fillBg(c, '#2a2018'); fillGround(c, 900, '#4a3828', '#3a2c20'); }, cam: [960, 680, 1.4], to: [960, 640, 1.7], look: 'warm', draw: (c, st) => { wanderer(c, 'tribe', 860, Y, 0.95, { armL: -1.0, armR: 1.0, expr: 'sad' }); elder(c, 1000, Y - 120, 0.8, { lean: -1.2, blink: 1 }, 0); } },
  { at: 'Через сотню лет', set: (c, st) => setAnatolia(c, st, { tents: true }), cam: [960, 640, 1.2], to: [1160, 620, 1.3], look: 'warm', draw: (c, st) => { wanderer(c, 'barb', 960 + st.bt * 40, Y, 0.95, pose.march(st.t)); }, over: (c, st) => tLine(c, 'Имя? ...', st.bt, 0.6, 2.5, 200, 76) },
], { tr: 'light' });

stage(9, [
  { set: (c, st) => setAnatolia(c, st, {}), cam: TWO(860, 1120, Y, 0.95), to: [1000, 640, 1.6], look: 'home', draw: (c, st) => { wanderer(c, 'babylon', 860, Y, 0.95, { ...ip(st), expr: 'happy', armR: 1.0 }); person(c, 1120, Y, 0.9, { ...ip(st), flip: true, expr: 'happy', armL: -1.0 }, { female: true }, pal(EP.mother, { dress: '#3a5a9a' })); } },
  { at: 'снова хоронишь', set: (c, st) => { setAnatolia(c, st, { winter: false }); dim(c, 0.3); }, cam: [960, 680, 1.15], to: [760, 680, 1.25], look: 'ash', draw: (c, st) => { tree(c, 1300, 900, 1, 1); for (let i = 0; i < 5; i++) gravestone(c, 900 + i * 150, 960 + (i % 2) * 20, 0.8); wanderer(c, 'sage', 600, Y, 0.95, { ...ip(st), head: 0.25, expr: 'sad' }); } },
  { at: 'Каждый раз ты обещаешь', set: (c, st) => { setAnatolia(c, st, {}); dim(c, 0.3); }, cam: CU(960, Y, 0.95), to: [960, 640, 2.4], look: 'ash', draw: (c, st) => wanderer(c, 'sage', 960, Y, 0.95, { ...ip(st), expr: 'sad', blink: (st.t % 2.5) < 0.2 ? 1 : 0 }) },
], { tr: 'black' });

stage(10, [
  // one long dolly along the road of history: the background scrolls through the eras while he walks
  { set: (c, st) => setEras(c, st, st.p * 4800), cam: [960, 620, 1.05], to: [960, 600, 1.1], ease: 'lin',
    draw: (c, st) => { const eras = ['tribe', 'babylon', 'babylon', 'roman', 'byzant', 'barb', 'sage', 'modern']; const e = eras[Math.min(7, Math.floor(st.p * 8))]; wanderer(c, e, 900, Y, 0.95, pose.march(st.t)); for (let i = 0; i < 3; i++) person(c, ((1700 - st.bt * 120 + i * 500) % 2400) - 200, Y + 20, 0.85, walkPose(st.t + i, 0.6, 0.3), { hat: i % 2 ? 'kerchief' : 'none', female: i % 2 === 1 }, EP[eras[Math.min(7, Math.floor(st.p * 8))]] || EP.tribe); },
    over: (c, st) => { const names = [['Вавилон', 'Ты видишь Вавилон'], ['Рим', 'Рим'], ['Константинополь', 'Константинополь']]; names.forEach(([n, k]) => { const a = st.ph(k); if (a < 1e7) tCaption(c, n, st.bt, a, 2.2); }); } },
  { at: 'Иногда ты советник', set: (c, st) => setPalaceHall(c, st), cam: TWO(800, 1150, Y, 0.95), to: [1100, 660, 1.6], look: 'warm', draw: (c, st) => { person(c, 1150, Y, 1, { ...ip(st), flip: true }, { hat: 'crown', coat: true, mustache: true }, EP.byzant); wanderer(c, 'byzant', 800, Y, 0.95, { ...talk(st), armR: -0.8 }); } },
  { at: 'Иногда простой солдат', set: (c, st) => setEras(c, st, 1500), cam: [960, 640, 1.15], to: [1160, 640, 1.2], look: 'warm', draw: (c, st) => { for (let i = 0; i < 5; i++) { if (i === 2) wanderer(c, 'roman', 560 + i * 220, Y, 0.9, pose.march(st.t + i * 0.3)); else person(c, 560 + i * 220, Y, 0.9, pose.march(st.t + i * 0.3), { hat: 'crest', mustache: i === 3 }, EP.roman); } } },
  { at: 'Иногда тебя просто', set: (c, st) => setEras(c, st, 4600), cam: [960, 640, 1.1], to: [960, 600, 1.0], look: 'ash', draw: (c, st) => { for (let i = 0; i < 9; i++) person(c, ((i * 260 + st.bt * (i % 2 ? 90 : -90)) % 2400) - 200, Y + (i % 3) * 14, 0.85, walkPose(st.t + i, 0.7, 0.3), { hat: i % 3 === 0 ? 'flat' : 'none', coat: true }, EP.modern); wanderer(c, 'modern', 960, Y, 0.9, ip(st)); } },
], { tr: 'whip', look: 'gold' });

stage(11, [
  { set: (c, st) => { fillBg(c, '#2a2018'); depth(c, st, 0.3, () => { rect(c, 300, 200, 1300, 500, '#4a3a28', 6, 6); for (let i = 0; i < 6; i++) rect(c, 360 + i * 210, 260, 150, 380, '#5a4a32', 4, 4); }); fillGround(c, 860, '#5a4028', '#4a3420'); }, cam: TWO(800, 1150, Y, 0.95), to: [1100, 640, 1.5], look: 'warm', draw: (c, st) => { person(c, 1150, Y, 0.95, { ...pose.write(st.t), flip: true }, { hat: 'flat', coat: true }, EP.sage); wanderer(c, 'sage', 800, Y, 0.95, { ...talk(st), armR: -1.4 }); c.save(); c.globalCompositeOperation = 'lighter'; goldLight(c, 1080, 640, 14, st.t, 0.8); c.restore(); } },
  { at: 'Изобретение здесь', set: (c) => { fillBg(c, '#2a2018'); }, cam: [960, 540, 1.0], to: [960, 540, 1.2], look: 'warm', draw: (c, st) => { const items = [[() => circ(c, 0, 0, 120, '#8a6a42', 8), 'Колесо'], [() => book(c, 0, 0, 1.4, 'Книга'), 'Книга'], [() => { rect(c, -50, -140, 100, 280, '#8a8a92', 10, 6); circ(c, 0, -160, 60, '#c8d8e0', 6); }, 'Лампа']]; items.forEach(([fn, n], i) => { const p = clamp((st.bt - i * 0.7) / 0.5); if (p <= 0) return; c.save(); c.translate(460 + i * 500, 560 - (1 - ease.back(p)) * 80); c.globalAlpha = p; fn(); c.restore(); c.save(); c.globalAlpha = p; c.fillStyle = '#f4ead4'; c.font = '700 54px "Old Standard TT"'; c.textAlign = 'center'; c.fillText(n, 460 + i * 500, 820); c.restore(); }); } },
  { at: 'Ты наблюдаешь', set: (c, st) => setEras(c, st, 3800), cam: [960, 500, 1.0], to: [960, 440, 1.1], look: 'ash', draw: (c, st) => wanderer(c, 'sage', 960, 780, 0.4, ip(st)), over: (c, st) => tLine(c, 'Медленно. Слишком медленно.', st.bt, 1.0, 3, 200, 76) },
], { tr: 'cut' });

stage(12, [
  { set: (c, st) => { fillBg(c, '#1a1612'); depth(c, st, 0.4, () => { for (let i = 0; i < 5; i++) candle(c, 400 + i * 280, 760, st.t, 1.4); }); fillGround(c, 880, '#3a2c20', '#2e241a'); }, cam: [960, 640, 1.15], to: [960, 600, 1.35], look: 'warm', draw: (c, st) => { wanderer(c, 'sage', 700, Y, 0.95, ip(st)); for (let i = 0; i < 2; i++) person(c, 1050 + i * 260, Y, 0.95, { ...ip(st, i), flip: true }, { hat: i ? 'hood' : 'flat', coat: true, female: i === 1 }, pal(EP.sage, { coat: i ? '#3a4a3a' : '#4a3a4a' })); }, over: (c, st) => tCaption(c, 'Вечные', st.lt, 0.8, 3) },
  { at: 'Некоторые становятся', set: (c, st) => setAnatolia(c, st, {}), cam: TWO(820, 1120, Y, 0.95), to: [960, 640, 1.5], look: 'home', draw: (c, st) => { wanderer(c, 'sage', 820, Y, 0.95, { ...ip(st), armR: -0.9, expr: 'happy' }); person(c, 1120, Y, 0.95, { ...ip(st), armL: -0.9, flip: true, expr: 'happy' }, { hat: 'flat', coat: true, mustache: true }, EP.sage); } },
  { at: 'Некоторые хотят', set: (c, st) => setPalaceHall(c, st), cam: [1150, 620, 1.4], to: [1150, 600, 1.8], look: 'blood', draw: (c, st) => person(c, 1150, Y, 1, { ...ip(st), expr: 'angry' }, { hat: 'crown', coat: true, mustache: true }, pal(EP.byzant, { coat: '#3a1a1a' })) },
  { at: 'даже бессмертие', set: (c, st) => setAnatolia(c, st, { night: true }), cam: CU(960, Y, 0.95), to: [960, 640, 2.2], look: 'night', draw: (c, st) => wanderer(c, 'sage', 960, Y, 0.95, { ...ip(st), expr: 'sad' }) },
], { tr: 'black' });

stage(13, [
  { set: (c, st) => setTemple(c, st, {}), cam: [960, 620, 1.05], to: [960, 520, 1.2], look: 'warm', draw: (c, st) => { for (let i = 0; i < 8; i++) pilgrim(c, 200 + i * 220, Y, 0.85, { lean: 0.4 + Math.sin(st.t * 2 + i) * 0.1, armL: -2.5, armR: 2.5 }, i); } },
  { at: 'каждая молитва кормит', set: (c, st) => { setTemple(c, st, {}); dim(c, 0.55); }, cam: [960, 400, 1.1], to: [960, 260, 1.35], look: 'warp', draw: (c, st) => { for (let i = 0; i < 8; i++) { const p = ((st.t * 0.4 + i * 0.13) % 1); goldLight(c, 300 + i * 190, 900 - p * 800, 8, st.t, 1 - p); } c.save(); c.globalAlpha = clamp(st.bt / 2); for (let i = 0; i < 5; i++) { c.fillStyle = '#ffd040'; c.shadowColor = '#ff40a0'; c.shadowBlur = 30; c.beginPath(); c.ellipse(500 + i * 230, 60 + (i % 2) * 40, 16, 8, 0.2, 0, Math.PI * 2); c.ellipse(540 + i * 230, 60 + (i % 2) * 40, 16, 8, -0.2, 0, Math.PI * 2); c.fill(); } c.restore(); } },
  { at: 'Ты решаешь', set: (c, st) => setTemple(c, st, { night: true }), cam: CU(960, Y, 0.95), to: [960, 640, 2.0], look: 'night', draw: (c, st) => { wanderer(c, 'sage', 960, Y, 0.95, { ...ip(st), expr: 'grit' }); palm(c, 1060, 760, 1.2, st, 0.9); } },
  { at: 'Даже если для этого', set: (c) => fillBg(c, '#050405'), cam: WIDE, to: [960, 540, 1.25], look: 'gold', draw: (c, st) => { c.save(); c.globalAlpha = clamp(st.bt / 2) * 0.9; EMP(c, 960, 1080, 1.1, { expr: 'neutral' }); c.restore(); }, over: (c, st) => tLine(c, 'Самым страшным из них', st.bt, 0.5, 4, 160, 72) },
], { tr: 'cut' });

// ===================== III. ВОЕННЫЙ ВОЖДЬ =====================
card(14, 3);

stage(15, [
  { set: (c, st) => setSpace(c, st, { planet: [960, 1500, 900, '#4a7ab0', '#6a9ad0'] }), cam: [960, 540, 1.0], to: [960, 700, 1.25], look: 'gold', draw: (c, st) => { for (let i = 0; i < 5; i++) ship2(c, -300 + i * 500 + st.bt * 60, 300 + (i % 2) * 120, 0.3, '#c8c0a8'); }, over: (c, st) => tCaption(c, 'Золотой век', st.lt, 0.5, 3) },
  { at: 'Наступила Долгая Ночь', set: (c, st) => setSpace(c, st, { warp: true }), cam: [960, 540, 1.1], to: [1000, 520, 1.3], look: 'warp', shake: 3, draw: (c, st) => { warpRift(c, 960, 540, 600, st.t); for (let i = 0; i < 4; i++) { c.save(); c.translate(400 + i * 400, 500 + Math.sin(st.t + i) * 40); c.rotate(st.t * (i % 2 ? 0.4 : -0.3)); ship2(c, 0, 0, 0.25, '#6a6060'); c.restore(); } }, over: (c, st) => tCaption(c, 'Долгая Ночь', st.lt, st.ph('Долгая Ночь') + st.bt - st.bt, 3) },
  { at: 'Земля превратилась', set: setWasteland, cam: [700, 620, 1.1], to: [1300, 620, 1.15], look: 'ash', draw: (c, st) => { for (let i = 0; i < 5; i++) person(c, 300 + i * 340, Y, 0.85, { ...ip(st, i), expr: 'angry' }, { hat: 'hood', coat: true, mustache: i % 2 === 0, weapon: 'rifle' }, EP.barb); } },
], { tr: 'black' });

stage(16, [
  { set: setWasteland, cam: CU(960, Y, 0.95), to: [960, 600, 1.4], look: 'ash', draw: (c, st) => wanderer(c, 'modern', 960, Y, 0.95, { ...ip(st), expr: 'grit' }) },
  { at: 'Ты снимаешь маску', sfx: [['chime', 0.8, 0.8]], set: (c, st) => { setWasteland(c, st); dim(c, 0.3); }, cam: [960, 520, 1.6], to: [960, 600, 1.0], arc: [200, 0], look: 'gold', blur: true, draw: (c, st) => { const p = ease.io(clamp(st.bt / 2.2)); c.save(); c.globalAlpha = 1 - p; wanderer(c, 'modern', 960, Y, 0.95, ip(st)); c.restore(); c.save(); c.globalAlpha = p; EMP(c, 960, Y + 20, 0.95, { expr: 'neutral' }); c.restore(); for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2 + st.t; goldLight(c, 960 + Math.cos(a) * 260 * (1 - p), 640 + Math.sin(a) * 300 * (1 - p), 6, st.t, (1 - p) * 0.9); } } },
], { tr: 'cut', look: 'gold' });

stage(17, [
  { set: setWasteland, cam: [960, 640, 1.05], to: [1100, 600, 1.15], look: 'gold', draw: (c, st) => { EMP(c, 700, Y, 0.85, ip(st)); for (let i = 0; i < 6; i++) person(c, 1100 + i * 170, Y + 10, 0.8, { ...ip(st, i), look: -1, expr: 'shock' }, { hat: 'hood', coat: true, female: i % 3 === 1 }, EP.barb); } },
  { at: 'Освободитель', set: setWasteland, cam: [960, 540, 1.0], to: [960, 540, 1.1], look: 'gold', draw: (c, st) => { EMP(c, 960, Y, 0.85, ip(st)); }, over: (c, st) => { ['Освободитель', 'Тиран', 'Пророк'].forEach((w, i) => { const a = st.ph(w); if (a < 1e7) tLine(c, w, st.bt, a, 6, 180 + i * 130, 96, ['#e8d080', '#d84a3a', '#f4ead4'][i]); }); } },
  { at: 'ты пришёл объединить', set: (c, st) => { setWasteland(c, st); }, cam: CU(960, Y, 0.85), to: [960, 520, 1.8], look: 'gold', draw: (c, st) => EMP(c, 960, Y, 0.85, { ...talk(st) }) },
], { tr: 'whip' });

stage(18, [
  { set: (c, st) => { setHimalaya(c, st, {}); dim(c, 0.4); }, cam: [960, 620, 1.2], to: [960, 560, 1.35], look: 'cold', draw: (c, st) => { for (let i = 0; i < 3; i++) { c.save(); c.globalAlpha = clamp((st.bt - i * 0.6) / 0.8); thunder(c, 600 + i * 360, Y, 0.8, { ...ip(st, i), expr: 'angry' }); c.restore(); } }, over: (c, st) => tCaption(c, 'Громовые воины', st.lt, 0.6, 3.5) },
  { at: 'Огромные, быстрые', set: setWasteland, cam: [500, 620, 1.15], to: [1500, 620, 1.15], ease: 'lin', look: 'ash', blur: true, draw: (c, st) => { for (let i = 0; i < 5; i++) thunder(c, 200 + i * 360 + st.bt * 300, Y + (i % 2) * 20, 0.75, { ...walkPose(st.t + i, 2.2, 0.6), lean: 0.12, expr: 'angry' }); } },
  { at: 'С ними ты захватываешь', set: setWasteland, cam: [960, 600, 1.05], to: [960, 560, 1.2], look: 'blood', shake: 4, draw: (c, st) => { for (let i = 0; i < 3; i++) blastFX(c, 300 + i * 650, 860, 1, ((st.bt + i * 0.6) % 2) - 0.2, i); for (let i = 0; i < 3; i++) thunder(c, 500 + i * 450, Y, 0.8, { lean: 0.15, expr: 'angry', time: st.t }); EMP(c, 960, Y + 40, 0.9, ip(st)); } },
  { at: 'Объединительные войны', set: (c) => { fillBg(c, '#1a1410'); }, cam: WIDE, to: [960, 540, 1.15], look: 'gold', draw: (c, st) => { const r = rng(5); for (let i = 0; i < 60; i++) { const x = 300 + r() * 1320, y = 260 + r() * 560, on = st.bt > r() * 3; circ(c, x, y, 18, on ? '#e8c14a' : '#5a3a2a', 4); } c.strokeStyle = '#8a7a5a'; c.lineWidth = 4; c.beginPath(); c.ellipse(960, 540, 700, 330, 0, 0, Math.PI * 2); c.stroke(); }, over: (c, st) => tCaption(c, 'Объединительные войны', st.lt, st.ph('Объединительные') + (st.lt - st.bt), 3.5) },
], { tr: 'flash' });

stage(19, [
  { set: setWasteland, cam: TWO(820, 1150, Y, 0.85), to: [1150, 560, 1.6], look: 'gold', draw: (c, st) => { EMP(c, 820, Y, 0.85, ip(st)); thunder(c, 1150, Y, 0.85, { ...ip(st), flip: true, expr: 'happy' }); } },
  { at: 'первый черновик', set: (c) => { fillBg(c, '#e8dcbc'); }, cam: WIDE, to: [960, 540, 1.1], look: 'warm', draw: (c, st) => { c.strokeStyle = '#3a2a1a'; c.lineWidth = 6; c.setLineDash([20, 14]); c.strokeRect(560, 160, 800, 780); c.setLineDash([]); c.save(); c.globalAlpha = 0.6; thunder(c, 960, 920, 1.1, {}); c.restore(); c.fillStyle = '#3a2a1a'; c.font = 'italic 700 48px "Old Standard TT"'; c.fillText('черновик №1', 600, 220); } },
  { at: 'Когда Земля объединена', set: (c, st) => { setWasteland(c, st); }, cam: [960, 600, 1.1], to: [960, 520, 1.25], look: 'ash', draw: (c, st) => { for (let i = 0; i < 5; i++) { c.save(); c.globalAlpha = 1 - clamp((st.bt - i * 0.5) / 1.2); thunder(c, 300 + i * 340, Y, 0.8, { head: 0.2, expr: 'sad' }); c.restore(); } dustFX(c, st.t, 120, 7, '200,190,170'); } },
  { at: 'Ты не любишь', set: (c, st) => { setWasteland(c, st); dim(c, 0.4); }, cam: CU(960, Y, 0.85), to: [960, 560, 2.0], look: 'ash', draw: (c, st) => EMP(c, 960, Y, 0.85, { ...ip(st), expr: 'sad', look: -1 }) },
], { tr: 'cut' });

stage(20, [
  { set: (c, st) => setHimalaya(c, st, { palace: clamp(st.bt / 4) }), cam: [960, 640, 1.0], to: [960, 440, 1.15], tilt: -0.03, look: 'cold', draw: () => {}, over: (c, st) => tCaption(c, 'Гималаи', st.lt, 0.5, 3, 'Императорский дворец') },
  { at: 'Из этого дворца', set: (c, st) => { setSpace(c, st, { planet: [960, 1300, 700, '#4a7ab0', '#6a9ad0'] }); }, cam: [960, 760, 1.4], to: [960, 400, 0.85], look: 'gold', draw: (c, st) => { const r = rng(9); for (let i = 0; i < 40; i++) { const a = r() * 6.28, d = 200 + r() * 900; goldLight(c, 960 + Math.cos(a) * d, 500 + Math.sin(a) * d * 0.5, 4, st.t, clamp((st.bt - r() * 2) / 1)); } } },
  { at: 'Но ты привык ждать', set: (c, st) => setHimalaya(c, st, { palace: 1 }), cam: CU(960, Y, 0.85), to: [960, 560, 1.6], look: 'cold', draw: (c, st) => EMP(c, 960, Y, 0.85, { ...ip(st), expr: 'neutral' }) },
], { tr: 'light' });

stage(21, [
  { set: (c, st) => setSpace(c, st, { planet: [1300, 500, 300, '#a04a2a', '#c86a3a'] }), cam: [700, 540, 1.0], to: [1200, 520, 1.3], look: 'gold', draw: (c, st) => ship2(c, 300 + st.bt * 200, 600, 0.6, '#d8c070'), over: (c, st) => tCaption(c, 'Марс', st.lt, 0.5, 3) },
  { at: 'Жрецы машин', set: setMars, cam: [1100, 640, 1.15], to: [1250, 620, 1.3], look: 'blood', draw: (c, st) => { for (let i = 0; i < 4; i++) mech(c, 1000 + i * 220, Y, 0.95, { lean: 0.08, head: 0.3, flip: true }); } },
  { at: 'Ты подписываешь договор', set: setMars, cam: TWO(800, 1150, Y, 0.9), to: [980, 640, 1.6], look: 'blood', draw: (c, st) => { EMP(c, 800, Y, 0.85, { ...talk(st) }); mech(c, 1150, Y, 0.95, { ...ip(st), flip: true }); rect(c, 900, 760, 160, 110, '#e8dcbc', 4, 4); circ(c, 1000, 840, 18, '#b3262a', 3); } },
  { at: 'Это первая ложь', set: (c, st) => { setMars(c, st); dim(c, 0.4); }, cam: CU(960, Y, 0.85), to: [960, 560, 2.0], look: 'blood', draw: (c, st) => EMP(c, 960, Y, 0.85, { ...ip(st), expr: 'neutral', look: 1 }), over: (c, st) => tLine(c, 'Политика', st.bt, 0.8, 3, 200, 90, '#e8c060') },
], { tr: 'whip' });

stage(22, [
  { set: setMars, cam: [960, 600, 1.0], to: [1400, 560, 1.15], look: 'blood', draw: (c, st) => { titan(c, 600, Y, 0.9, st.t, '#7a2a20'); titan(c, 1400, Y, 0.8, st.t + 1, '#6a2420'); fireFX(c, 1000, Y, 0.8, st.t, 3); } },
  { at: 'Без Марса', set: (c, st) => setSpace(c, st, {}), cam: [700, 560, 1.1], to: [1300, 540, 1.0], look: 'gold', draw: (c, st) => { for (let i = 0; i < 9; i++) ship2(c, -200 + (i % 5) * 450 + st.bt * 80, 260 + Math.floor(i / 5) * 280 + (i % 2) * 60, 0.35, '#d8c070'); } },
  { at: 'Ты понимаешь, что иногда', set: setMars, cam: CU(960, Y, 0.85), to: [960, 580, 1.7], look: 'gold', draw: (c, st) => { EMP(c, 960, Y, 0.85, { ...ip(st), expr: 'neutral' }); } },
], { tr: 'cut' });

// ===================== IV. ОТЕЦ =====================
card(23, 4);

stage(24, [
  { set: (c, st) => bgLab(c, st.t), cam: [400, 600, 1.2], to: [1500, 600, 1.2], ease: 'lin', look: 'cold', draw: (c, st) => { for (let i = 0; i < 10; i++) capsulePod(c, 200 + i * 180, 900, 0.7, i, st.t); }, over: (c, st) => tCaption(c, 'Под Гималаями', st.lt, 0.5, 3) },
  { at: 'Здесь ты создаёшь', set: (c, st) => bgLab(c, st.t), cam: [960, 560, 1.0], to: [960, 540, 1.15], look: 'cold', draw: (c, st) => { for (let r = 0; r < 2; r++) for (let i = 0; i < 10; i++) capsulePod(c, 160 + i * 180, 640 + r * 340, 0.5, r * 10 + i, st.t); }, over: (c, st) => tLine(c, 'Двадцать сыновей', st.bt, 0.6, 3, 120, 80) },
  { at: 'В каждого ты вкладываешь', set: (c, st) => bgLab(c, st.t), cam: TWO(800, 1100, Y, 0.85), to: [1050, 640, 1.6], look: 'gold', draw: (c, st) => { capsulePod(c, 1150, Y, 1.1, 15, st.t); EMP(c, 800, Y, 0.85, { ...ip(st), armR: -1.3 }); goldLight(c, 980, 720 - st.bt * 10, 14, st.t, 0.9); }, over: (c, st) => { ['Силу', 'Ум', 'Ярость', 'Сострадание'].forEach((w, i) => { const a = st.ph(w); if (a < 1e7) tLine(c, w, st.bt, a, 1.1, 160, 80, '#e8d080'); }); } },
], { tr: 'black', look: 'cold' });

stage(25, [
  { set: (c, st) => bgLab(c, st.t), cam: [960, 640, 1.2], to: [900, 600, 1.35], look: 'cold', draw: (c, st) => { for (let i = 0; i < 4; i++) capsulePod(c, 700 + i * 300, Y, 0.85, i + 3, st.t); EMP(c, 400, Y, 0.85, { ...ip(st), lean: 0.1 }); } },
  { at: 'Ты разговариваешь', set: (c, st) => bgLab(c, st.t), cam: TWO(800, 1100, Y, 0.85), to: [1050, 640, 1.9], look: 'gold', draw: (c, st) => { capsulePod(c, 1100, Y, 1.1, 0, st.t); EMP(c, 800, Y, 0.85, { ...talk(st), expr: 'happy' }); } },
  { at: 'Ты рассказываешь им', set: (c, st) => { setSpace(c, st, {}); }, cam: [960, 540, 1.0], to: [960, 500, 1.25], look: 'gold', draw: (c, st) => { capsulePod(c, 960, 900, 0.9, 0, st.t, false); for (let i = 0; i < 20; i++) goldLight(c, 200 + (i * 97) % 1500, 120 + (i * 53) % 500, 5, st.t, clamp((st.bt - i * 0.1) / 0.6)); } },
  { at: 'Ты впервые за много', set: (c, st) => bgLab(c, st.t), cam: CU(960, Y, 0.85), to: [960, 560, 2.0], look: 'gold', draw: (c, st) => EMP(c, 960, Y, 0.85, { ...ip(st), expr: 'happy' }) },
], { tr: 'cut' });

stage(26, [
  { set: (c, st) => bgLab(c, st.t), cam: [960, 600, 1.05], to: [960, 560, 1.2], look: 'cold', shake: 2, draw: (c, st) => { for (let i = 0; i < 6; i++) capsulePod(c, 260 + i * 280, Y, 0.75, i, st.t); warpRift(c, 960, 360, 200 + st.bt * 80, st.t); } },
  { at: 'Силы варпа', sfx: [['warp', 0, 1]], set: (c, st) => { bgLab(c, st.t); warpRift(c, 960, 500, 700, st.t); }, cam: [960, 540, 1.0], to: [960, 540, 1.3], look: 'warp', shake: 5, blur: true, draw: (c, st) => { for (let i = 0; i < 20; i++) { const p = ease.in(clamp(st.bt / 2.5 - i * 0.02)), a = i / 20 * Math.PI * 2 + p * 2; const r0 = 160 + (i % 5) * 40; capsulePod(c, 960 + Math.cos(a) * (r0 + 1400 * p), 560 + Math.sin(a) * (r0 * 0.6 + 800 * p), 0.45 * (1 - p * 0.6), i, st.t, false); } } },
  { at: 'Двадцать младенцев', set: (c, st) => setSpace(c, st, { warp: true }), cam: [960, 540, 1.0], to: [960, 540, 1.15], look: 'warp', draw: (c, st) => { for (let i = 0; i < 20; i++) { const p = clamp((st.bt - i * 0.08) / 2), a = i * 0.9; const x = 960 + Math.cos(a) * 1200 * p, y = 540 + Math.sin(a) * 700 * p; goldLight(c, x, y, 8, st.t, 1 - p * 0.5); c.strokeStyle = 'rgba(255,220,140,0.4)'; c.lineWidth = 3; c.beginPath(); c.moveTo(960, 540); c.lineTo(x, y); c.stroke(); } }, over: (c, st) => tLine(c, '20 миров', st.bt, 0.6, 3, 900, 80) },
], { tr: 'flash' });

stage(27, [
  { set: (c, st) => bgLab(c, st.t), cam: [960, 640, 1.1], to: [960, 600, 1.3], look: 'cold', draw: (c, st) => { for (let i = 0; i < 6; i++) rect(c, 230 + i * 280, 860, 220, 60, '#3a3e44', 10, 6); EMP(c, 960, Y, 0.85, { ...ip(st), expr: 'sad', head: 0.2 }); } },
  { at: 'Один среди волков', set: setFenris, cam: [900, 640, 1.15], to: [1100, 620, 1.3], look: 'cold', draw: (c, st) => { for (let i = 0; i < 3; i++) wolf(c, 1200 + i * 200, Y - 30, 0.7, st.t + i, -1); boy(c, 900, Y, 0.72, { ...ip(st), expr: 'grit' }); } },
  { at: 'другой среди ядовитых', set: setBarbarus, cam: [960, 640, 1.15], to: [800, 600, 1.3], look: 'ash', draw: (c, st) => boy(c, 960, Y, 0.72, { ...pose.trudge(st.t), expr: 'sad' }) },
  { at: 'третий в бойцовских', set: setPit, cam: [960, 640, 1.2], to: [960, 600, 1.4], look: 'blood', shake: 2, draw: (c, st) => { boy(c, 820, Y, 0.8, { armR: -1.5, armL: 1.5, expr: 'angry' }); person(c, 1150, Y, 0.95, { armR: -1.4, flip: true, expr: 'angry' }, { mustache: true }, EP.barb); } },
  { at: 'Каждому придётся', set: (c) => { fillBg(c, '#1a1612'); }, cam: WIDE, to: [960, 540, 1.1], look: 'gold', draw: (c, st) => { for (let i = 0; i < 20; i++) { const x = 220 + (i % 10) * 165, y = 300 + Math.floor(i / 10) * 360; rect(c, x - 70, y - 120, 140, 240, ['#3a4a5a', '#4a3a2a', '#2a4a3a', '#5a2a2a'][i % 4], 8, 5); boy(c, x, y + 100, 0.42, ip(st, i)); } } },
], { tr: 'whip' });

stage(28, [
  { set: (c, st) => setSpace(c, st, { warp: true }), cam: [960, 540, 1.0], to: [960, 540, 1.2], look: 'warp', draw: (c, st) => { EMP(c, 960, 1180, 0.8, { ...ip(st), head: -0.2 }); for (let i = 0; i < 20; i++) { const r = rng(i + 3); goldLight(c, 200 + r() * 1500, 120 + r() * 600, 6, st.t, 0.5 + 0.5 * Math.sin(st.t * 2 + i)); } } },
  { at: 'Но галактика огромна', set: (c, st) => setSpace(c, st, { warp: true }), cam: [700, 500, 1.2], to: [1300, 520, 1.0], look: 'warp', draw: (c, st) => { warpRift(c, 1000, 500, 500, st.t); for (let i = 0; i < 20; i++) { const r = rng(i + 3); goldLight(c, 200 + r() * 1500, 120 + r() * 600, 6, st.t, Math.max(0, Math.sin(st.t * 3 + i * 1.7))); } } },
  { at: 'искать их придётся', set: (c, st) => bgLab(c, st.t), cam: CU(960, Y, 0.85), to: [960, 560, 1.9], look: 'cold', draw: (c, st) => EMP(c, 960, Y, 0.85, { ...ip(st), expr: 'sad' }) },
], { tr: 'cut' });

stage(29, [
  { set: (c, st) => bgLab(c, st.t), cam: [960, 600, 1.1], to: [960, 560, 1.25], look: 'cold', draw: (c, st) => { for (let i = 0; i < 5; i++) { rect(c, 200 + i * 360, 560, 200, 340, '#1a2a2c', 40, 6); c.save(); c.globalAlpha = clamp((st.bt - i * 0.4) / 1); astartes(c, 300 + i * 360, 900, 0.5, ip(st, i)); c.restore(); } } },
  { at: 'Двадцать легионов', set: (c, st) => { setHimalaya(c, st, {}); }, cam: [960, 520, 1.0], to: [960, 600, 1.25], look: 'gold', draw: (c, st) => { const cols = ['ultra', LUNA, PRIMARCH.dorn, PRIMARCH.khan, PRIMARCH.russ, PRIMARCH.magnus, PRIMARCH.vulkan, PRIMARCH.corax, BLACKL, SANG]; for (let r = 0; r < 3; r++) for (let i = 0; i < 10; i++) astartes(c, 120 + i * 190 + r * 40, 820 + r * 110, 0.33 + r * 0.05, ip(st, i), cols[(i + r * 3) % 10]); } },
  { at: 'Ты готов идти', set: (c, st) => setSpace(c, st, {}), cam: [960, 600, 1.2], to: [960, 440, 0.95], look: 'gold', draw: (c, st) => { EMP(c, 960, Y + 60, 0.8, ip(st)); for (let i = 0; i < 5; i++) ship2(c, 300 + i * 340 + st.bt * 40, 260 + (i % 2) * 80, 0.25, '#d8c070'); } },
  { at: 'И ты надеешься', set: (c, st) => setSpace(c, st, {}), cam: CU(960, Y, 0.85), to: [960, 560, 1.8], look: 'gold', draw: (c, st) => EMP(c, 960, Y, 0.85, { ...ip(st), expr: 'neutral' }) },
], { tr: 'light' });

// ===================== V. ИМПЕРАТОР =====================
card(30, 5);

stage(31, [
  { set: (c, st) => setSpace(c, st, { planet: [1500, 900, 500, '#4a7a5a', '#6a9a7a'] }), cam: [500, 540, 1.1], to: [1400, 560, 1.0], ease: 'lin', look: 'gold', blur: true, draw: (c, st) => { for (let i = 0; i < 12; i++) ship2(c, -300 + (i % 6) * 420 + st.bt * 260, 220 + Math.floor(i / 6) * 300 + (i % 2) * 50, 0.4, '#d8c070'); }, over: (c, st) => tCaption(c, 'Великий крестовый поход', st.lt, 0.5, 4) },
  { at: 'Где-то тебя встречают с цветами', set: (c, st) => setAnatolia(c, st, {}), cam: [960, 640, 1.1], to: [1100, 620, 1.2], look: 'home', draw: (c, st) => { for (let i = 0; i < 6; i++) { tribesman(c, 900 + i * 180, Y, 0.85, { ...ip(st, i), armR: -2.4, expr: 'happy' }, i); } EMP(c, 600, Y, 0.85, ip(st)); for (let i = 0; i < 14; i++) { const p = (st.t * 0.5 + i * 0.07) % 1; circ(c, 700 + i * 80 + Math.sin(st.t + i) * 20, 200 + p * 700, 10, ['#e84a6a', '#f0d040', '#f4f4f4'][i % 3], 2); } } },
  { at: 'Где-то с оружием', set: setWasteland, cam: [960, 620, 1.1], to: [800, 600, 1.2], look: 'blood', shake: 3, draw: (c, st) => { for (let i = 0; i < 4; i++) person(c, 1100 + i * 200, Y, 0.85, pose.fire(st.t + i), { hat: 'hood', coat: true, weapon: 'rifle' }, EP.barb); for (let i = 0; i < 3; i++) astartes(c, 400 + i * 200, Y, 0.62, { lean: 0.1 }); } },
  { at: 'Ты приводишь к согласию', set: (c, st) => setSpace(c, st, { planet: [960, 1300, 700, '#4a7ab0', '#6a9ad0'] }), cam: [960, 540, 1.0], to: [960, 600, 1.2], look: 'gold', draw: (c, st) => { const r = rng(4); for (let i = 0; i < 50; i++) goldLight(c, 100 + r() * 1700, 80 + r() * 600, 4, st.t, clamp((st.bt - r() * 2.5) / 0.6)); } },
], { tr: 'flash' });

stage(32, [
  { set: (c, st) => bgCthonia(c, st.t, {}), cam: [960, 640, 1.1], to: [1000, 600, 1.25], look: 'ash', draw: (c, st) => { EMP(c, 760, Y, 0.85, ip(st)); horus(c, 1150, Y, 0.85, { ...ip(st), flip: true, expr: 'neutral' }, 'lw'); }, over: (c, st) => tCaption(c, 'Хтония', st.lt, 0.5, 3, 'Первый найденный сын') },
  { at: 'Он лучший из них', set: (c, st) => bgCthonia(c, st.t, {}), cam: CU(1150, Y, 0.85), to: [1150, 520, 2.1], look: 'gold', draw: (c, st) => horus(c, 1150, Y, 0.85, { ...ip(st), flip: true, expr: 'happy' }, 'lw'), over: (c, st) => tLine(c, 'ХОРУС', st.bt, 0.3, 3, 180, 120, '#e8d080') },
  { at: 'Ты учишь его войне', set: (c, st) => setPalaceHall(c, st), cam: TWO(760, 1160, Y, 0.85), to: [1300, 620, 1.3], look: 'gold', draw: (c, st) => { EMP(c, 760, Y, 0.85, talk(st)); horus(c, 1160, Y, 0.8, { ...ip(st), flip: true }, 'lw'); for (let i = 0; i < 3; i++) primarch(c, ['dorn', 'russ', 'khan'][i], 1500 + i * 200, Y + 20, 0.6, { ...ip(st, i), flip: true }); } },
], { tr: 'whip' });

stage(33, [
  { set: (c, st) => setPalaceHall(c, st), cam: [400, 620, 1.1], to: [1500, 620, 1.1], ease: 'lin', look: 'gold', draw: (c, st) => { const ws = ['dorn', 'russ', 'magnus', 'fulgrim', 'ferrus', 'vulkan', 'corax', 'angron', 'lorgar', 'khan']; ws.forEach((w, i) => primarch(c, w, 100 + i * 230, Y, 0.62, ip(st, i))); } },
  { at: 'Один гордый', set: (c, st) => setPalaceHall(c, st), cam: [960, 600, 1.2], to: [960, 560, 1.3], look: 'gold', draw: (c, st) => { [['fulgrim', 500, 'Один гордый'], ['corax', 960, 'другой мрачный'], ['angron', 1420, 'третий гневный']].forEach(([w, x, k], i) => { const on = st.A(k) > 0 || i === 0; c.save(); c.globalAlpha = on ? 1 : 0.25; primarch(c, w, x, Y, 0.75, { ...ip(st, i), expr: ['happy', 'sad', 'angry'][i] }); c.restore(); }); } },
  { at: 'Кто-то любит', set: (c, st) => setPalaceHall(c, st), cam: TWO(700, 1250, Y, 0.75), to: [960, 600, 1.2], look: 'gold', draw: (c, st) => { primarch(c, 'dorn', 700, Y, 0.75, { ...ip(st), expr: 'happy' }); primarch(c, 'lorgar', 1000, Y, 0.75, { ...ip(st), expr: 'shock', lean: 0.2 }); primarch(c, 'magnus', 1300, Y, 0.75, { ...ip(st), expr: 'neutral' }); } },
  { at: 'Ты не умеешь быть', set: (c, st) => setPalaceHall(c, st), cam: CU(960, Y, 0.85), to: [960, 560, 2.0], look: 'warm', draw: (c, st) => EMP(c, 960, Y, 0.85, { ...ip(st), expr: 'sad' }), over: (c, st) => tLine(c, 'Тебя этому никто не учил', st.bt, 1.2, 3, 200, 66) },
], { tr: 'cut' });

stage(34, [
  { set: (c, st) => setPalaceHall(c, st), cam: [960, 620, 1.05], to: [960, 540, 1.2], look: 'gold', draw: (c, st) => EMP(c, 960, Y, 0.9, { ...talk(st), armR: -2.4 }), over: (c, st) => tLine(c, 'ИМПЕРСКАЯ ИСТИНА', st.bt, 0.4, 3, 160, 90, '#e8d080') },
  { at: 'Богов нет', set: (c) => { fillBg(c, '#1a1612'); }, cam: WIDE, to: [960, 540, 1.15], look: 'gold', draw: (c, st) => { ['Богов нет', 'наука', 'разум', 'человечество'].forEach((w, i) => { const a = st.ph(w === 'Богов нет' ? 'Богов нет' : 'Есть наука'); }); }, over: (c, st) => { tLine(c, 'Богов нет.', st.bt, 0.2, 2, 380, 110, '#f4ead4'); tLine(c, 'Наука. Разум. Человечество.', st.bt, 1.6, 3, 620, 80, '#e8d080'); } },
  { at: 'Храмы закрывают', set: (c, st) => setTemple(c, st, { boards: true }), cam: [960, 600, 1.05], to: [960, 520, 1.25], look: 'ash', draw: (c, st) => { for (let i = 0; i < 2; i++) astartes(c, 600 + i * 720, Y, 0.62, { ...ip(st, i), flip: i === 1 }); for (let i = 0; i < 4; i++) pilgrim(c, 200 + i * 120, Y + 20, 0.75, { ...pose.trudge(st.t + i), flip: true }, i); } },
  { at: 'Ты единственный', set: (c, st) => setPalaceHall(c, st), cam: CU(960, Y, 0.9), to: [960, 560, 2.0], look: 'warm', draw: (c, st) => EMP(c, 960, Y, 0.9, { ...ip(st), expr: 'neutral', look: 1 }), over: (c, st) => tLine(c, 'Времени ещё много', st.bt, st.ph('Ты думаешь'), 3, 200, 70) },
], { tr: 'black' });

stage(35, [
  { set: setAmphi, cam: [960, 600, 1.0], to: [960, 680, 1.2], look: 'gold', draw: (c, st) => { const ws = ['dorn', 'russ', 'magnus', 'khan', 'lorgar', 'vulkan', 'corax']; ws.forEach((w, i) => primarch(c, w, 300 + i * 220, 900 + (i % 2) * 30, 0.55, { ...ip(st, i), armR: i === 2 ? -2 : 0 })); }, over: (c, st) => tCaption(c, 'Никея', st.lt, 0.5, 3, 'Совет о колдовстве') },
  { at: 'Ты выносишь приговор', set: setAmphi, cam: [960, 560, 1.15], to: [960, 520, 1.4], look: 'gold', draw: (c, st) => EMP(c, 960, Y, 0.9, { ...talk(st), armR: -1.6 }), over: (c, st) => tLine(c, 'НЕЛЬЗЯ', st.bt, st.ph('нельзя'), 2.5, 200, 140, '#e8c060') },
  { at: 'Магнус', set: setAmphi, cam: CU(960, Y, 0.9), to: [960, 540, 2.2], look: 'blood', draw: (c, st) => primarch(c, 'magnus', 960, Y, 0.9, { ...ip(st), head: 0.25, expr: st.A('обижен') > 0 ? 'angry' : 'sad' }) },
], { tr: 'whip' });

stage(36, [
  { set: (c) => { fillBg(c, '#1a1410'); }, cam: WIDE, to: [960, 520, 1.2], look: 'warm', draw: (c, st) => scroll(c, 960, 540, 1, ['Примархи', 'I. Лев', 'II. ———', 'III. Фулгрим', 'IV. Пертурабо', 'V. Хан', 'VI. Русс', 'VII. Дорн', 'VIII. Кёрз', 'IX. Сангвиний', 'X. Феррус'], clamp(st.bt / 2)) },
  { at: 'Твои сыновья перешёптываются', set: (c, st) => setPalaceHall(c, st), cam: [960, 620, 1.1], to: [800, 600, 1.25], look: 'warm', draw: (c, st) => { primarch(c, 'russ', 1250, Y, 0.7, { ...talk(st), lean: -0.1, flip: true }); primarch(c, 'lorgar', 1450, Y, 0.7, { ...ip(st), lean: 0.1, flip: true }); c.save(); c.globalAlpha = 0.9; EMP(c, 500, Y, 0.85, { ...ip(st), look: 1 }); c.restore(); } },
  { at: 'Ты молчишь', set: (c, st) => setPalaceHall(c, st), cam: CU(960, Y, 0.85), to: [960, 560, 2.2], look: 'warm', draw: (c, st) => EMP(c, 960, Y, 0.85, { ...ip(st), expr: 'neutral' }) },
], { tr: 'cut' });

stage(37, [
  { set: setUllanor, cam: [960, 400, 0.95], to: [960, 640, 1.15], tilt: 0.02, look: 'gold', draw: (c, st) => { EMP(c, 760, 770, 0.6, ip(st)); horus(c, 1100, 770, 0.6, { ...ip(st), flip: true }, 'lw'); }, over: (c, st) => tCaption(c, 'Улланор', st.lt, 0.5, 3.5, 'Великий триумф') },
  { at: 'Перед миллионами', set: setUllanor, cam: [960, 640, 1.05], to: [960, 600, 1.2], look: 'gold', draw: (c, st) => { EMP(c, 760, 770, 0.6, { ...ip(st), armR: -1.6 }); horus(c, 1100, 770, 0.6, { ...ip(st), flip: true, expr: 'happy' }, 'wm'); }, over: (c, st) => tLine(c, 'МАГИСТР ВОЙНЫ', st.bt, 0.8, 3, 180, 100, '#e8d080') },
  { at: 'А сам возвращаешься', set: (c, st) => setSpace(c, st, { planet: [960, 1300, 700, '#4a7ab0', '#6a9ad0'] }), cam: [960, 540, 1.0], to: [960, 900, 1.3], look: 'gold', draw: (c, st) => ship2(c, 960, 500 + st.bt * 60, 0.5, '#d8c070') },
  { at: 'Тебя ждёт работа', set: (c, st) => setPalaceHall(c, st), cam: CU(960, Y, 0.85), to: [960, 560, 2.0], look: 'warm', draw: (c, st) => EMP(c, 960, Y, 0.85, { ...ip(st), expr: 'grit' }) },
], { tr: 'light' });

// ===================== VI. ОСАЖДЁННЫЙ =====================
card(38, 6);

stage(39, [
  { set: (c, st) => setWebway(c, st, {}), cam: [960, 540, 0.95], to: [960, 540, 1.6], look: 'cold', blur: true, draw: (c, st) => { EMP(c, 960, 1100, 0.7, ip(st)); }, over: (c, st) => tCaption(c, 'Паутина', st.lt, 0.5, 3, 'Дорога в обход варпа') },
  { at: 'Если всё получится', set: (c, st) => setWebway(c, st, {}), cam: [960, 540, 1.1], to: [960, 540, 1.3], look: 'gold', draw: (c, st) => { for (let i = 0; i < 6; i++) { const p = ((st.t * 0.3 + i / 6) % 1); ship2(c, 960 + (i % 2 ? 1 : -1) * p * 900, 540 + (i % 3 - 1) * p * 300, 0.1 + p * 0.5, '#d8c070'); } } },
  { at: 'Ты никому об этом', set: (c, st) => { setThroneRoom(c, st, {}); dim(c, 0.4); }, cam: CU(960, Y, 0.85), to: [960, 560, 2.0], look: 'warm', draw: (c, st) => EMP(c, 960, Y, 0.85, { ...ip(st), expr: 'neutral' }) },
], { tr: 'black' });

stage(40, [
  { set: (c, st) => { setSpace(c, st, {}); }, cam: [960, 540, 1.1], to: [960, 500, 1.4], look: 'blood', draw: (c, st) => { primarch(c, 'magnus', 960, Y + 100, 0.9, { ...ip(st), armR: -2.4, armL: 2.4 }); fireFX(c, 960, 520, 1.5, st.t, 3); } },
  { at: 'прорывается к тебе', sfx: [['warp', 0, 1]], set: (c, st) => setWebway(c, st, { crack: clamp(st.bt / 2) }), cam: [960, 540, 1.0], to: [960, 540, 1.3], look: 'blood', shake: 6, blur: true, draw: (c, st) => { const p = clamp(st.bt / 2); c.save(); c.globalCompositeOperation = 'lighter'; fireFX(c, 960, 540, 2 * p, st.t, 6); c.restore(); } },
  { at: 'Демоны врываются', sfx: [['warp', 0, 0.7]], set: (c, st) => setWebway(c, st, { crack: 1 }), cam: [960, 540, 1.1], to: [960, 600, 1.0], look: 'warp', shake: 4, draw: (c, st) => { for (let i = 0; i < 8; i++) { const p = clamp((st.bt - i * 0.2) / 2); daemon(c, 960 + Math.cos(i) * 900 * p, 560 + Math.sin(i * 1.7) * 300 * p, 0.3 + p * 0.5, st.t, ['#8a1a1a', '#5a2a8a', '#2a6a3a'][i % 3]); } } },
  { at: 'Годы работы', set: (c, st) => { setWebway(c, st, { crack: 1 }); dim(c, 0.5); }, cam: CU(960, Y, 0.85), to: [960, 560, 2.0], look: 'warp', draw: (c, st) => EMP(c, 960, Y, 0.85, { ...ip(st), expr: 'shock' }) },
], { tr: 'flash' });

stage(41, [
  { set: (c, st) => setThroneRoom(c, st, {}), cam: CU(960, Y, 0.85), to: [960, 540, 1.6], look: 'blood', shake: 2, draw: (c, st) => EMP(c, 960, Y, 0.85, { ...talk(st), expr: 'angry', armR: -1.8 }) },
  { at: 'Леману Руссу', set: setFenris, cam: TWO(800, 1150, Y, 0.75), to: [1000, 620, 1.4], look: 'cold', draw: (c, st) => { primarch(c, 'russ', 800, Y, 0.75, { ...ip(st), expr: 'grit' }); horus(c, 1150, Y, 0.75, { ...talk(st), flip: true }, 'wm'); } },
  { at: 'Вместо суда', set: (c, st) => { fillBg(c, vg(c, -300, 900, [[0, '#2a1a3a'], [1, '#c87a3a']])); depth(c, st, 0.4, () => { for (let i = 0; i < 8; i++) { const x = -200 + i * 320, h = 300 + (i % 3) * 120; shape(c, [[x, 800], [x + 40, 800 - h], [x + 80, 800 - h - 60], [x + 120, 800 - h], [x + 160, 800]], '#8a6a3a', 5); fireFX(c, x + 80, 800 - h * 0.3, 0.9, st.t, i); } }); fillGround(c, 800, '#3a2a1a', '#2a1e14'); }, cam: [960, 600, 1.05], to: [1100, 560, 1.2], look: 'blood', shake: 3, draw: (c, st) => { for (let i = 0; i < 4; i++) wolf(c, 300 + i * 300 + st.bt * 200, Y, 0.8, st.t * 2 + i, 1); for (let i = 0; i < 3; i++) astartes(c, 400 + i * 400 + st.bt * 150, Y + 30, 0.6, walkPose(st.t + i, 2, 0.5), pal('ultra', { armor: '#7f8c96', armorDark: '#5f6c76', helm: '#7f8c96' })); }, over: (c, st) => tCaption(c, 'Просперо', st.lt, st.ph('Вместо суда') + (st.lt - st.bt), 3) },
  { at: 'Ты узнаёшь об этом', set: (c, st) => { setThroneRoom(c, st, {}); dim(c, 0.4); }, cam: CU(960, Y, 0.85), to: [960, 560, 2.1], look: 'ash', draw: (c, st) => EMP(c, 960, Y, 0.85, { ...ip(st), expr: 'sad' }) },
], { tr: 'whip' });

stage(42, [
  { set: (c, st) => setSpace(c, st, { warp: true }), cam: [960, 540, 1.0], to: [960, 500, 1.4], look: 'blood', draw: (c, st) => { c.save(); c.globalAlpha = 0.85; eyeOfHorus(c, 960, 480, 2.4 * ease.out(clamp(st.bt / 1.5)), '#c9a24a', '#7a1a14'); c.restore(); }, over: (c, st) => tLine(c, 'Хорус предал тебя', st.bt, 1.0, 3, 860, 80, '#e8a080') },
  { at: 'Половина твоих', set: (c) => { fillBg(c, '#1a1410'); }, cam: WIDE, to: [960, 540, 1.1], look: 'gold', draw: (c, st) => { for (let i = 0; i < 18; i++) { const dark = [3, 4, 8, 12, 13, 14, 16, 17].includes(i) ? clamp((st.bt - 0.5 - i * 0.08) / 0.8) : 0; banner2(c, 140 + i * 95, 820, 0.8, '#c9a24a', st.t + i, dark); } } },
  { at: 'Твой лучший сын', set: (c, st) => { setSpace(c, st, { warp: true }); }, cam: CU(960, Y, 0.85), to: [960, 520, 2.0], look: 'warp', draw: (c, st) => horus(c, 960, Y, 0.85, { ...ip(st), expr: 'angry' }, 'x') },
  { at: 'Ты понимаешь, что твоё молчание', set: (c, st) => { setThroneRoom(c, st, {}); dim(c, 0.5); }, cam: CU(960, Y, 0.85), to: [960, 600, 1.3], look: 'ash', draw: (c, st) => EMP(c, 960, Y, 0.85, { ...ip(st), expr: 'sad', head: 0.2 }), over: (c, st) => tLine(c, 'Молчание тоже было ошибкой', st.bt, 1.0, 3.5, 200, 64) },
], { tr: 'black' });

stage(43, [
  { set: (c, st) => setThroneRoom(c, st, { dust: true }), cam: [960, 540, 1.0], to: [960, 600, 1.3], look: 'gold', draw: (c, st) => { const p = ease.io(clamp(st.bt / 2.5)); EMP(c, 960, 900 - 0 * p, 0.7, { ...ip(st), bob: p * 60 }); beam(c, 960, 520, 300, 1400, 0.4 * p); } },
  { at: 'Ты не можешь встать', set: (c, st) => setThroneRoom(c, st, {}), cam: CU(960, 900, 0.7), to: [960, 520, 2.4], look: 'gold', draw: (c, st) => { EMP(c, 960, 900, 0.7, { ...ip(st), bob: 60, expr: 'grit' }); } },
  { at: 'Ты слышишь, как предатели', set: (c, st) => bgTerra(c, st.t, { ships: true }), cam: [960, 540, 1.0], to: [1200, 560, 1.15], look: 'fire', shake: 3, draw: (c, st) => { for (let i = 0; i < 3; i++) blastFX(c, 300 + i * 650, 780, 1.2, ((st.bt + i * 0.7) % 2.2) - 0.2, i); } },
  { at: 'Ты держишь дверь', set: (c, st) => setThroneRoom(c, st, {}), cam: [960, 560, 1.4], to: [960, 600, 1.0], look: 'gold', draw: (c, st) => { EMP(c, 960, 900, 0.7, { ...ip(st), bob: 60, expr: 'grit' }); beam(c, 960, 900, 500, 900, 0.5); }, over: (c, st) => tLine(c, 'Ты держишь дверь', st.bt, 0.3, 3, 160, 76, '#e8d080') },
], { tr: 'light' });

stage(44, [
  { set: (c, st) => setThroneRoom(c, st, {}), cam: [960, 400, 1.0], to: [960, 300, 1.3], look: 'gold', draw: (c, st) => { goldLight(c, 960, 380, 120 + Math.sin(st.t * 2) * 10, st.t, 0.9); } },
  { at: 'Каждый демон', set: (c, st) => { fillBg(c, '#0a0408'); warpRift(c, 960, 700, 900, st.t); }, cam: [960, 540, 1.0], to: [960, 600, 1.2], look: 'warp', shake: 3, draw: (c, st) => { for (let i = 0; i < 9; i++) daemon(c, 150 + i * 210, 1060 + Math.sin(st.t * 2 + i) * 30, 0.6, st.t, ['#8a1a1a', '#5a2a8a', '#2a6a3a'][i % 3]); goldLight(c, 960, 260, 80, st.t, 0.9); } },
  { at: 'И всё время ты слышишь', set: (c, st) => bgTerra(c, st.t, {}), cam: [960, 600, 1.1], to: [960, 560, 1.25], look: 'fire', draw: (c, st) => { primarch(c, 'dorn', 700, Y, 0.7, { ...ip(st), expr: 'grit' }); sanguinius(c, 1200, Y, 0.7, { ...ip(st), flip: true }); }, over: (c, st) => tLine(c, 'Тех, кто защищает стены', st.bt, 0.5, 2.6, 160, 62) },
  { at: 'и тех, кто их ломает', set: (c, st) => { bgTerra(c, st.t, { ships: true }); }, cam: [960, 600, 1.1], to: [960, 560, 1.3], look: 'blood', draw: (c, st) => { horus(c, 960, Y, 0.8, { ...ip(st), expr: 'angry' }, 'x'); }, over: (c, st) => tLine(c, 'и тех, кто их ломает', st.bt, 0.3, 2.6, 160, 62, '#e8a080') },
], { tr: 'cut' });

// ===================== VII. ВОИН =====================
card(45, 7);

stage(46, [
  { set: (c, st) => bgTerra(c, st.t, { ships: true }), cam: [500, 560, 1.05], to: [1400, 540, 1.1], look: 'fire', shake: 3, draw: (c, st) => { for (let i = 0; i < 4; i++) blastFX(c, 200 + i * 520, 760, 1.1, ((st.bt + i * 0.5) % 2) - 0.2, i); }, over: (c, st) => tCaption(c, 'Осада Терры', st.lt, 0.5, 3) },
  { at: 'Небо черно', set: (c, st) => { fillBg(c, vg(c, -300, 900, [[0, '#2a0a06'], [0.7, '#8a2a12'], [1, '#e0702a']])); depth(c, st, 0.5, () => { for (let i = 0; i < 16; i++) ship2(c, -300 + (i % 8) * 340 + st.t * 10, 100 + Math.floor(i / 8) * 220 + (i % 3) * 40, 0.35, '#1a1214'); }); }, cam: [960, 400, 1.0], to: [960, 300, 1.2], look: 'blood', draw: () => {} },
], { tr: 'black', look: 'fire' });

stage(47, [
  { set: (c, st) => bgTerra(c, st.t, {}), cam: [700, 620, 1.2], to: [800, 560, 1.4], look: 'fire', shake: 2, draw: (c, st) => { primarch(c, 'dorn', 700, Y, 0.8, { ...ip(st), expr: 'grit' }); for (let i = 0; i < 3; i++) astartes(c, 1100 + i * 220, Y + 20, 0.6, pose.fire ? { lean: 0.1 } : {}, PRIMARCH.dorn); }, over: (c, st) => tCaption(c, 'Рогал Дорн', st.lt, 0.5, 3) },
  { at: 'Сангвиний, твой сын', set: (c, st) => bgTerra(c, st.t, {}), cam: [1200, 560, 1.3], to: [1000, 500, 1.5], look: 'fire', draw: (c, st) => { sanguinius(c, 1100, Y - 60 - Math.sin(st.t * 3) * 20, 0.8, { ...ip(st), armR: -2.0 }); sword(c, 1250, 700, 0.6, -0.4, 0, st.t); }, over: (c, st) => tCaption(c, 'Сангвиний', st.lt, st.ph('Сангвиний') + (st.lt - st.bt), 3) },
  { at: 'Они верят', set: (c, st) => setThroneRoom(c, st, {}), cam: CU(960, 900, 0.7), to: [960, 520, 2.2], look: 'gold', draw: (c, st) => EMP(c, 960, 900, 0.7, { ...ip(st), bob: 60, expr: 'neutral' }) },
  { at: 'Хорус опускает щиты', set: (c, st) => setSpace(c, st, { planet: [960, 1400, 700, '#6a3a2a', '#8a4a2a'] }), cam: [960, 540, 1.0], to: [960, 500, 1.35], look: 'blood', draw: (c, st) => { ship2(c, 960, 480, 1.4, '#4a3034'); const p = clamp(st.bt / 2); c.strokeStyle = `rgba(120,200,255,${0.6 * (1 - p)})`; c.lineWidth = 8; c.beginPath(); c.ellipse(960, 470, 700, 260, 0, 0, Math.PI * 2); c.stroke(); }, over: (c, st) => tLine(c, 'Приглашение. И вызов.', st.bt, st.ph('Это приглашение'), 3, 900, 70, '#e8a080') },
], { tr: 'whip' });

stage(48, [
  { set: (c, st) => setThroneRoom(c, st, {}), cam: [960, 600, 1.4], to: [960, 540, 1.0], look: 'gold', draw: (c, st) => { const p = ease.io(clamp(st.bt / 2)); EMP(c, 960, 900 + 100 * p, 0.7 + 0.15 * p, { ...ip(st), bob: 60 * (1 - p), expr: 'grit' }); } },
  { at: 'Ты телепортируешься', sfx: [['zap', 0, 1]], set: (c, st) => setCorridor(c, st, {}), cam: [960, 540, 1.0], to: [960, 540, 1.2], look: 'blood', blur: true, draw: (c, st) => { const p = clamp(st.bt / 0.6); EMP(c, 960, Y, 0.8, ip(st)); for (let i = 0; i < 4; i++) custodes(c, 500 + i * 300 + (i > 1 ? 300 : 0), Y + 20, 0.6, ip(st, i)); c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = 1 - p; c.fillStyle = '#c8e8ff'; c.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); c.restore(); } },
  { at: 'Корабль живой', set: (c, st) => setCorridor(c, st, { shift: 1 }), cam: [960, 540, 1.0], to: [960, 540, 1.4], tilt: 0.06, look: 'blood', draw: (c, st) => { for (let i = 0; i < 4; i++) { c.save(); c.globalAlpha = 1 - clamp((st.bt - 1 - i * 0.3) / 0.8); custodes(c, 500 + i * 300 + (i > 1 ? 300 : 0), Y + 20, 0.6, ip(st, i)); c.restore(); } EMP(c, 960, Y, 0.8, ip(st)); } },
  { at: 'Ты идёшь один', set: (c, st) => setCorridor(c, st, { shift: 0.5 }), cam: [960, 520, 1.0], to: [960, 540, 1.6], look: 'blood', draw: (c, st) => EMP(c, 960, Y + 100 - st.bt * 30, 0.8 - st.bt * 0.04, { ...pose.march(st.t), expr: 'grit' }) },
], { tr: 'flash' });

stage(49, [
  { set: (c, st) => bgBridge(c, st.t, {}), cam: [960, 600, 1.0], to: [1100, 600, 1.2], look: 'blood', draw: (c, st) => { horus(c, 1200, Y, 0.9, { ...ip(st), flip: true, expr: 'angry' }, 'x'); EMP(c, 500, Y, 0.85, ip(st)); } },
  { at: 'Рядом с ним мёртв', set: (c, st) => { bgBridge(c, st.t, {}); dim(c, 0.3); }, cam: [1000, 820, 1.15], to: [1000, 840, 1.35], look: 'ash', draw: (c, st) => { sanguinius(c, 1300, 980, 0.75, { lean: -1.5, blink: 1 }); }, over: (c, st) => tLine(c, 'Ангел', st.bt, st.ph('Ангел'), 2.5, 200, 90, '#f4ead4') },
  { at: 'Хорус смеётся', set: (c, st) => bgBridge(c, st.t, {}), cam: CU(960, Y, 0.9), to: [960, 520, 2.3], look: 'blood', shake: 1, draw: (c, st) => horus(c, 960, Y, 0.9, { ...ip(st), expr: 'happy', head: -0.15, bob: Math.sin(st.t * 12) * 3 }, 'x') },
  { at: 'Там только боги', set: (c, st) => { fillBg(c, '#0a0410'); warpRift(c, 960, 540, 700, st.t); }, cam: [960, 540, 1.0], to: [960, 540, 1.3], look: 'warp', draw: (c, st) => { c.save(); c.globalAlpha = 0.7; horus(c, 960, 1200, 1.1, { expr: 'angry' }, 'x'); c.restore(); for (let i = 0; i < 4; i++) { c.fillStyle = ['#c83a3a', '#3a8a4a', '#6a3ab8', '#d870d8'][i]; c.shadowColor = c.fillStyle; c.shadowBlur = 40; c.beginPath(); c.arc(300 + i * 440, 200, 40 + Math.sin(st.t * 2 + i) * 8, 0, Math.PI * 2); c.fill(); c.shadowBlur = 0; } } },
], { tr: 'cut' });

stage(50, [
  { sfx: [['clash', 0.4, 1], ['clash', 1.5, 0.9], ['clash', 2.7, 1]], set: (c, st) => bgBridge(c, st.t, {}), cam: TWO(700, 1250, Y, 0.85), to: [960, 640, 1.3], look: 'blood', shake: 3, blur: true, draw: (c, st) => { const k = Math.sin(st.t * 3); EMP(c, 760 + k * 40, Y, 0.85, { lean: 0.15 + k * 0.1, expr: 'grit', armR: -1.5 }); sword(c, 900 + k * 40, 700, 0.7, 0.6 + k * 0.3, 0.6, st.t); horus(c, 1200 - k * 40, Y, 0.88, { lean: -0.2 - k * 0.1, flip: true, expr: 'angry', armR: -1.4 }, 'x'); } },
  { at: 'Ты всё ещё видишь', set: (c) => { fillBg(c, '#2a2a2e'); fillGround(c, 900, '#4a4a4e', '#3a3a3e'); }, cam: [960, 640, 1.2], to: [960, 600, 1.4], look: 'ash', draw: (c, st) => { c.save(); c.globalAlpha = 0.85; boy(c, 960, Y, 0.72, { ...ip(st), expr: 'happy' }); c.restore(); }, over: (c, st) => tCaption(c, 'Хтония. Много лет назад', st.lt, st.ph('Ты всё ещё') + (st.lt - st.bt), 3) },
  { at: 'Он ломает тебе кости', sfx: [['impact', 0.3, 1], ['impact', 1.4, 1]], set: (c, st) => bgBridge(c, st.t, {}), cam: [960, 700, 1.3], to: [960, 760, 1.6], look: 'blood', shake: 8, blur: true, draw: (c, st) => { EMP(c, 900, Y + 40, 0.85, { lean: -0.4, expr: 'shock' }); horus(c, 1150, Y, 0.9, { lean: -0.3, flip: true, expr: 'angry', armR: -2.2 }, 'x'); if (st.bt % 1 < 0.1) { c.fillStyle = 'rgba(255,255,255,0.6)'; c.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); } } },
  { at: 'И только когда', set: (c, st) => bgBridge(c, st.t, {}), cam: [960, 760, 1.5], to: [960, 820, 1.9], look: 'blood', draw: (c, st) => { custodes(c, 1000, Y + 80, 0.7, { lean: -1.5 }); }, over: (c, st) => tLine(c, 'Сына больше нет', st.bt, st.ph('ты понимаешь') , 3, 200, 80, '#f4ead4') },
], { tr: 'flash' });

stage(51, [
  { sfx: [['impact', 0.25, 1.3], ['swell', 0, 0.6]], set: (c) => { fillBg(c, '#000'); }, cam: WIDE, to: [960, 540, 1.3], look: 'gold', draw: (c, st) => { const p = clamp(st.bt / 0.6); EMP(c, 760, Y, 0.9, { armR: -2.6, expr: 'grit' }); sword(c, 880, 560, 0.9, -0.2 + p * 1.4, 1, st.t); c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(1200, 600, 10, 1200, 600, 900 * p); g.addColorStop(0, `rgba(255,250,230,${1 - clamp((st.bt - 0.5) / 1.5)})`); g.addColorStop(1, 'rgba(255,240,200,0)'); c.fillStyle = g; c.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); c.restore(); } },
  { at: 'А потом держишь', set: (c, st) => { bgBridge(c, st.t, {}); dim(c, 0.5); }, cam: [960, 760, 1.4], to: [960, 720, 1.8], look: 'ash', draw: (c, st) => { EMP(c, 860, Y + 40, 0.85, { bob: 60, expr: 'sad', armL: -1.2, armR: 1.2 }); horus(c, 1180, 990, 0.6, { lean: -1.45, blink: 1 }, 'lw'); } },
  { at: 'Говорят, в последний миг', set: (c, st) => { fillBg(c, '#0a0a0e'); }, cam: CU(960, Y, 0.85), to: [960, 520, 2.2], look: 'ash', draw: (c, st) => horus(c, 960, Y, 0.85, { expr: 'sad', tear: true, time: st.t }, 'lw') },
], { tr: 'cut' });

stage(52, [
  { set: (c, st) => { bgBridge(c, st.t, {}); dim(c, 0.6); }, cam: [960, 880, 1.0], to: [960, 900, 1.15], look: 'ash', draw: (c, st) => { EMP(c, 1200, Y + 60, 0.7, { lean: -1.5, blink: 1 }); sanguinius(c, 600, Y + 120, 0.7, { lean: -1.5, blink: 1 }); horus(c, 1350, Y + 120, 0.7, { lean: 1.5, blink: 1 }, 'lw'); } },
  { at: 'Твои кустодии находят', set: (c, st) => { bgBridge(c, st.t, {}); dim(c, 0.5); }, cam: [960, 700, 1.2], to: [960, 660, 1.4], look: 'gold', draw: (c, st) => { EMP(c, 960, Y + 120, 0.8, { lean: -1.5, blink: 1 }); c.fillStyle = 'rgba(232,193,74,0.7)'; c.beginPath(); c.ellipse(760, Y + 110, 360, 50, 0, 0, Math.PI * 2); c.fill(); for (let i = 0; i < 3; i++) custodes(c, 500 + i * 450, Y + 20, 0.75, { ...ip(st, i), head: 0.3, flip: i === 2 }); } },
  { at: 'Потом наступает тишина', set: (c) => fillBg(c, '#000'), cam: WIDE, to: [960, 540, 1.1], look: 'ash', draw: (c, st) => goldLight(c, 960, 540, 18, st.t, 1 - clamp(st.bt / 2.5)) },
], { tr: 'black' });

// ===================== VIII. БОГ =====================
card(53, 8);

stage(54, [
  { set: (c, st) => setThroneRoom(c, st, { dust: true }), cam: [960, 400, 0.95], to: [960, 600, 1.3], tilt: -0.02, look: 'gold', draw: (c, st) => godEmperor(c, 960, 900, 0.7, { bob: 60, head: 0.15 }), over: (c, st) => tCaption(c, 'Золотой Трон', st.lt, 0.5, 3) },
  { at: 'Твоё тело иссыхает', set: (c, st) => setThroneRoom(c, st, {}), cam: CU(960, 900, 0.7), to: [960, 520, 2.6], look: 'ash', draw: (c, st) => godEmperor(c, 960, 900, 0.7, { bob: 60, head: 0.15 }) },
  { at: 'Но твой разум горит', set: (c, st) => setSpace(c, st, { planet: [960, 1500, 800, '#4a7ab0', '#6a9ad0'] }), cam: [960, 760, 1.4], to: [960, 380, 0.85], look: 'gold', draw: (c, st) => { beam(c, 960, 900, 260 + st.bt * 30, 2000, 0.9); goldLight(c, 960, 760, 60, st.t, 1); for (let i = 0; i < 6; i++) ship2(c, 300 + i * 260, 300 + (i % 2) * 100 + Math.sin(st.t + i) * 10, 0.2, '#d8c070', i % 2 ? 1 : -1); }, over: (c, st) => tCaption(c, 'Астрономикон', st.lt, st.ph('Но твой разум') + (st.lt - st.bt) + 0.8, 3.5) },
], { tr: 'light' });

stage(55, [
  { set: (c, st) => { fillBg(c, '#141018'); depth(c, st, 0.4, () => { for (let i = 0; i < 6; i++) rect(c, -200 + i * 420, -200, 100, 1100, '#2a2430', 4, 6); }); fillGround(c, 900, '#2a2228', '#221c22'); }, cam: [300, 640, 1.1], to: [1500, 640, 1.1], ease: 'lin', look: 'cold', draw: (c, st) => { for (let i = 0; i < 12; i++) psyker(c, -200 + i * 220 + st.bt * 40, Y, 0.8, pose.trudge(st.t + i), i); } },
  { at: 'Их души', set: (c, st) => setThroneRoom(c, st, {}), cam: [960, 500, 1.1], to: [960, 440, 1.3], look: 'gold', draw: (c, st) => { godEmperor(c, 960, 900, 0.7, { bob: 60, head: 0.15 }); for (let i = 0; i < 16; i++) { const p = ((st.t * 0.4 + i / 16) % 1); goldLight(c, 200 + i * 100 + (960 - 200 - i * 100) * p, 1000 - 500 * p, 6, st.t, 1 - p * 0.5); } } },
  { at: 'Тысяча в день', sfx: [['bell', 0.1, 1], ['bell', 2.0, 1]], set: (c) => fillBg(c, '#0a0808'), cam: WIDE, to: [960, 540, 1.15], look: 'gold', draw: (c, st) => {}, over: (c, st) => { tLine(c, 'Тысяча в день.', st.bt, 0.1, 2, 420, 100, '#f4ead4'); tLine(c, 'Десять тысяч лет.', st.bt, st.ph('Десять тысяч') , 3, 640, 100, '#e8c060'); } },
], { tr: 'black' });

stage(56, [
  { set: (c, st) => setThroneRoom(c, st, { dust: true }), cam: [500, 640, 1.15], to: [1400, 640, 1.15], look: 'gold', draw: (c, st) => { godEmperor(c, 960, 900, 0.7, { bob: 60, head: 0.15 }); for (let i = 0; i < 2; i++) custodes(c, 500 + i * 920, Y + 40, 0.8, { flip: i === 1 }); } },
  { at: 'Иногда им кажется', set: (c, st) => setThroneRoom(c, st, {}), cam: CU(960, 900, 0.7), to: [1000, 520, 2.6], look: 'gold', draw: (c, st) => godEmperor(c, 960, 900, 0.7, { bob: 60, head: 0.15 + (st.bt > 1.5 && st.bt < 1.8 ? 0.04 : 0) }) },
  { at: 'Они не знают', set: (c, st) => setThroneRoom(c, st, {}), cam: CU(1420, Y + 40, 0.8), to: [1420, 520, 2.0], look: 'gold', draw: (c, st) => custodes(c, 1420, Y + 40, 0.8, { flip: true }) },
], { tr: 'cut' });

stage(57, [
  { set: (c, st) => setTemple(c, st, { icon: true }), cam: [960, 600, 1.05], to: [960, 500, 1.25], look: 'gold', draw: (c, st) => { for (let i = 0; i < 9; i++) pilgrim(c, 160 + i * 200, Y, 0.85, { lean: 0.4 + Math.sin(st.t * 2 + i) * 0.1, armL: -2.5, armR: 2.5 }, i); }, over: (c, st) => tCaption(c, 'Имперская истина забыта', st.lt, 0.5, 3) },
  { at: 'Они жгут во имя', set: (c, st) => { fillBg(c, vg(c, -300, 900, [[0, '#2a0a06'], [1, '#c8602a']])); depth(c, st, 0.4, () => { for (let i = 0; i < 6; i++) fireFX(c, -100 + i * 420, 860, 1.4, st.t, i); }); fillGround(c, 860, '#3a1a10', '#2a120a'); }, cam: [960, 600, 1.05], to: [1100, 560, 1.15], look: 'fire', shake: 2, draw: (c, st) => { for (let i = 0; i < 3; i++) astartes(c, 500 + i * 450, Y, 0.62, ip(st, i), BLACKL); } },
  { at: 'Ты всю жизнь хотел', set: (c, st) => setThroneRoom(c, st, {}), cam: CU(960, 900, 0.7), to: [960, 540, 2.3], look: 'gold', draw: (c, st) => godEmperor(c, 960, 900, 0.7, { bob: 60, head: 0.15 }), over: (c, st) => tLine(c, 'Человечество сделало богом тебя', st.bt, st.ph('Человечество'), 3.5, 200, 62, '#e8c060') },
], { tr: 'whip' });

stage(58, [
  { set: (c, st) => { setTemple(c, st, { icon: true, night: true }); }, cam: [960, 640, 1.1], to: [960, 560, 1.3], look: 'gold', draw: (c, st) => { for (let i = 0; i < 6; i++) astartes(c, 260 + i * 280, Y, 0.62, { lean: 0.15, head: 0.3 }, ['ultra', BLACKL, SANG, PRIMARCH.dorn, PRIMARCH.russ, PRIMARCH.khan][i]); } },
  { at: 'Они сражаются за тебя', set: (c, st) => setWasteland(c, st), cam: [600, 620, 1.1], to: [1300, 600, 1.1], look: 'blood', shake: 3, draw: (c, st) => { for (let i = 0; i < 5; i++) astartes(c, 200 + i * 380, Y, 0.65, { lean: 0.1 }, ['ultra', BLACKL, SANG, PRIMARCH.dorn, PRIMARCH.khan][i]); blastFX(c, 1500, 860, 1, (st.bt % 2) - 0.3, 3); } },
  { at: 'Они не знают, как звучал', set: (c, st) => setTemple(c, st, { icon: true, night: true }), cam: CU(960, Y, 0.62), to: [960, 640, 2.0], look: 'gold', draw: (c, st) => drawRig(c, rig('marine', { plain: true, weapon: 'none', helmet: 'off', hair: 'short' }), 960, Y, 0.62, { head: -0.15, expr: 'neutral' }, PAL.ultra) },
], { tr: 'cut' });

stage(59, [
  { set: (c, st) => setThroneRoom(c, st, {}), cam: [960, 520, 1.0], to: [960, 520, 1.4], look: 'gold', draw: (c, st) => { godEmperor(c, 960, 900, 0.7, { bob: 60, head: 0.15 }); const words = ['Спаси', 'Защити', 'Помоги', 'Услышь', 'Император', 'Прости']; words.forEach((w, i) => { const p = ((st.t * 0.25 + i / 6) % 1); c.save(); c.globalAlpha = (1 - p) * 0.8; c.fillStyle = '#e8d8b0'; c.font = 'italic 700 40px "Old Standard TT"'; c.textAlign = 'center'; const a = i / 6 * Math.PI * 2; c.fillText(w, 960 + Math.cos(a) * 900 * (1 - p), 500 + Math.sin(a) * 500 * (1 - p)); c.restore(); }); } },
  { at: 'Ты не можешь ответить', set: (c, st) => { setThroneRoom(c, st, {}); dim(c, 0.3); }, cam: CU(960, 900, 0.7), to: [960, 520, 2.8], look: 'ash', draw: (c, st) => godEmperor(c, 960, 900, 0.7, { bob: 60, head: 0.15 }) },
], { tr: 'cut' });

stage(60, [
  { set: (c) => fillBg(c, '#08070a'), cam: WIDE, to: [960, 540, 1.1], look: 'gold', draw: (c, st) => { const who = [(x) => boy(c, x, 820, 0.42, ip(st)), (x) => wanderer(c, 'sage', x, 820, 0.42, ip(st)), (x) => EMP(c, x, 820, 0.36, ip(st)), (x) => EMP(c, x, 820, 0.36, ip(st)), (x) => EMP(c, x, 820, 0.36, ip(st))]; ['шаманом', 'странником', 'вождём', 'отцом', 'императором'].forEach((w, i) => { const a = st.ph(w); if (st.bt < a) return; c.save(); c.globalAlpha = clamp((st.bt - a) / 0.5); who[i](300 + i * 330); c.fillStyle = '#e8d8b0'; c.font = '700 40px "Old Standard TT"'; c.textAlign = 'center'; c.fillText(['шаман', 'странник', 'вождь', 'отец', 'император'][i], 300 + i * 330, 900); c.restore(); }); } },
  { at: 'На последнем ты остался', set: (c, st) => { setThroneRoom(c, st, {}); dim(c, 0.4); }, cam: [960, 520, 1.2], to: [960, 500, 0.9], look: 'ash', draw: (c, st) => godEmperor(c, 960, 900, 0.7, { bob: 60, head: 0.15 }) },
  { at: 'Как в тот день', set: (c, st) => setAnatolia(c, st, { night: true, tents: true }), cam: TWO(800, 1150, Y, 0.9), to: CU(800, Y, 0.72), look: 'night', draw: (c, st) => { boy(c, 800, Y, 0.72, { ...ip(st), expr: 'sad' }); palm(c, 860, 770, 1, st, 0.8); mum(c, 1150, Y, 0.95, { ...ip(st), flip: true, lean: -0.12, expr: 'shock' }); }, over: (c, st) => { if (st.bt > st.bdur - 3.5) { c.fillStyle = `rgba(0,0,0,${clamp((st.bt - st.bdur + 3.5) / 3)})`; c.fillRect(0, 0, W, H); } } },
], { tr: 'black' });
