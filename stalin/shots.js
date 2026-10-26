// Stalin: 8 levels, 48 paragraphs. Staged beats with a travelling camera (orks/engine4.js).
// Thread: the mother who wanted a priest; the people erased one by one; the door nobody dares to open.

const Y = 1000;
const card = (k, n) => shot(PT(k), (ctx, s) => eCard(ctx, n, s.lt), { fade: 0.4 });
const ip = (st, i = 0) => ({ ...idlePose(st.t, i), time: st.t });
const talk = (st, i = 0, o = {}) => ({ ...idlePose(st.t, i), expr: 'talk', time: st.t, ...o });
const dim = (ctx, a = 0.45) => { ctx.fillStyle = `rgba(6,4,2,${a})`; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); };
const cap = (c, st, txt, sub, a = 0.4) => tCaption(c, txt, st.bt, a, 3.2, sub);
const line = (c, st, txt, a = 0.4, y = 200, size = 80, col) => tLine(c, txt, st.bt, a, 3.5, y, size, col);
const hitFX = (c, x, y, s, lt) => { if (lt < 0 || lt > 0.5) return; c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = `rgba(255,240,170,${1 - lt * 2})`; c.beginPath(); for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2, r = (i % 2 ? 60 : 160) * s * (1 + lt * 2); c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } c.closePath(); c.fill(); c.restore(); };
const at = (st, w) => st.ph(w); // a phrase's time in beat time

const me = (c, lvl, x, y, s, pose = {}, over = {}) => stalin(c, lvl, x, y, s, pose, over);
const old = (c, x, y, s, pose = {}) => man(c, x, y, s, pose, { hair: 'swept', gray: true, mustache: 'stalin', outfit: 'tunic', pocks: true, arm: true }, pal(SPAL.grayTunic, { hair: '#b8b4ac' }));
const keke = (c, x, y, s, pose = {}, old = false) => man(c, x, y, s, { wrinkles: old, ...pose }, { female: true, hair: 'kerchief', outfit: 'dress' }, old ? pal(SPAL.keke, { skin: '#d0a888' }) : SPAL.keke);
const beso = (c, x, y, s, pose = {}) => man(c, x, y, s, pose, { hair: 'short', mustache: 'thick', outfit: 'apron', hat: 'kepka' }, SPAL.peasant);
const lenin = (c, x, y, s, pose = {}) => man(c, x, y, s, pose, { hair: 'bald', beard: 'goatee', mustache: 'small', outfit: 'suit' }, SPAL.lenin);
const trotsky = (c, x, y, s, pose = {}) => man(c, x, y, s, pose, { hair: 'bushy', beard: 'goatee', mustache: 'small', glasses: 'pince', outfit: 'coat' }, SPAL.trotsky);
const zinoviev = (c, x, y, s, pose = {}) => man(c, x, y, s, pose, { hair: 'curly', outfit: 'suit' }, pal(SPAL.suit, { hair: '#3a2a20' }));
const kamenev = (c, x, y, s, pose = {}) => man(c, x, y, s, pose, { hair: 'short', beard: 'short', mustache: 'small', glasses: 'pince', outfit: 'suit' }, pal(SPAL.suit, { hair: '#6a5a4a' }));
const bukharin = (c, x, y, s, pose = {}) => man(c, x, y, s, pose, { hair: 'bald', beard: 'goatee', mustache: 'small', outfit: 'tunic' }, pal(SPAL.tunic, { hair: '#8a5a30' }));
const kirov = (c, x, y, s, pose = {}) => man(c, x, y, s, pose, { hair: 'short', outfit: 'tunic' }, pal(SPAL.tunic, { hair: '#4a3a2a' }));
const nadya = (c, x, y, s, pose = {}) => man(c, x, y, s, pose, { female: true, hair: 'bob', outfit: 'dress' }, SPAL.nadya);
const yakov = (c, x, y, s, pose = {}) => man(c, x, y, s, pose, { hair: 'short', mustache: 'small', outfit: 'tunic', hat: 'cap' }, pal(SPAL.tunic, { hair: '#2a2420' }));
const monk = (c, x, y, s, pose = {}) => man(c, x, y, s, pose, { hair: 'long', beard: 'full', outfit: 'cassock', hat: 'skufia' }, pal(SPAL.cassock, { hair: '#4a3a30' }));
const seminarist = (c, x, y, s, pose = {}, i = 0) => man(c, x, y, s, pose, { hair: i % 2 ? 'short' : 'long', outfit: 'cassock' }, pal(SPAL.cassock, { hair: ['#2a2018', '#5a3a20', '#1e1a18'][i % 3] }));
const nkvd = (c, x, y, s, pose = {}) => man(c, x, y, s, pose, { hair: 'short', outfit: 'nkvd', hat: 'nkvd' }, SPAL.nkvd);
const worker = (c, x, y, s, pose = {}, i = 0) => man(c, x, y, s, pose, { hair: 'short', mustache: i % 3 === 1 ? 'small' : undefined, outfit: 'rubashka', hat: i % 2 ? 'kepka' : 'none' }, i % 2 ? SPAL.worker : pal(SPAL.worker, { shirt: '#c8c0b0' }));
const peasant = (c, x, y, s, pose = {}, i = 0) => man(c, x, y, s, pose, i % 3 === 2 ? { female: true, hair: 'kerchief', outfit: 'dress' } : { hair: 'short', beard: i % 2 ? 'full' : undefined, outfit: 'rubashka', hat: 'kepka' }, i % 3 === 2 ? pal(SPAL.keke, { jacket: '#6a5a4a', pants: '#5a4a3a', hair: '#8a7a6a' }) : SPAL.peasant);
const prisoner = (c, x, y, s, pose = {}, i = 0) => man(c, x, y, s, { expr: 'sad', ...pose }, { hair: 'short', beard: i % 2 ? 'short' : undefined, outfit: 'coat', hat: 'kepka' }, SPAL.prisoner);
const official = (c, x, y, s, pose = {}, i = 0) => man(c, x, y, s, pose, { hair: ['short', 'bald', 'swept'][i % 3], mustache: i % 2 ? 'small' : undefined, glasses: i === 2 ? 'pince' : undefined, outfit: i % 2 ? 'tunic' : 'suit' }, i % 2 ? SPAL.tunic : SPAL.suit);
const churchill = (c, x, y, s, pose = {}) => man(c, x, y, s, pose, { hair: 'bald', outfit: 'suit', belly: true, cigar: true }, SPAL.churchill);
const roosevelt = (c, x, y, s, pose = {}) => man(c, x, y, s, pose, { hair: 'short', glasses: 'pince', outfit: 'suit' }, SPAL.roosevelt);
const khrush = (c, x, y, s, pose = {}) => man(c, x, y, s, pose, { hair: 'bald', outfit: 'suit', belly: true }, SPAL.suit);
const kidM = (c, x, y, s, pose = {}, i = 0) => man(c, x, y, s, pose, { kid: true, hair: i % 2 ? 'short' : 'long', outfit: 'rubashka' }, pal(SPAL.kid, { hair: ['#3a2a20', '#1e1a18', '#6a4a2a'][i % 3], jacket: ['#e8e2d2', '#c8b898', '#d8d0c0'][i % 3] }));
const soldierR = (c, x, y, s, pose = {}, i = 0) => mate(c, x, y, s, pose, i);
const ghost = (c, a, f) => { c.save(); c.globalAlpha = a; f(); c.restore(); };
const tub = (c, x, y, s) => { c.save(); c.translate(x, y); c.scale(s, s); const p = P(); p.moveTo(-130, -90); p.lineTo(130, -90); p.lineTo(110, 0); p.lineTo(-110, 0); p.closePath(); sfill(c, p, '#8a6a44', 5); sfill(c, el2(0, -90, 130, 20), '#c8d8e0', 4); c.restore(); };
const bed = (c, x, y, s) => { c.save(); c.translate(x, y); c.scale(s, s); rect(c, -260, -90, 520, 60, '#e8e2d2', 8, 5); rect(c, -270, -40, 540, 40, '#5a4030', 4, 5); rect(c, -280, -160, 30, 160, '#5a4030', 4, 5); c.restore(); };
const frameBlack = (c, x, y, s, f) => { c.save(); c.translate(x, y); c.scale(s, s); sfill(c, rr(-170, -230, 340, 460, 6), '#1a1a1a', 6); sfill(c, rr(-150, -210, 300, 420, 4), '#c8b898', 3); c.save(); c.beginPath(); c.rect(-150, -210, 300, 420); c.clip(); f(); c.restore(); c.save(); c.rotate(-0.7); c.fillStyle = '#1a1a1a'; c.fillRect(-260, 120, 520, 40); c.restore(); c.restore(); };
const erase = (c, x, y, s, p, f) => { c.save(); c.translate(x, y); c.scale(s, s); sfill(c, rr(-150, -200, 300, 400, 4), '#c8b898', 5); c.save(); c.beginPath(); c.rect(-140, -190, 280, 380); c.clip(); c.globalAlpha = 1 - p; f(); c.restore(); c.restore(); };

// ===================== I. СОСО =====================
card(0, 1);

stage(1, [
  { set: setGori, cam: [960, 560, 1.0], to: [960, 600, 1.12], look: 'warm', draw: () => {}, over: (c, st) => cap(c, st, 'Гори, 1878', 'Российская империя, Грузия') },
  { at: 'Тебя зовут', set: setGori, cam: CU(960, Y, 0.85), to: [960, 680, 2.4], look: 'warm', draw: (c, st) => me(c, 1, 960, Y, 1.1, { ...ip(st), expr: 'neutral' }, { pocks: false }), over: (c, st) => cap(c, st, 'Иосиф Джугашвили', 'дома его зовут Сосо') },
  { at: 'Отец сапожник', set: (c, st) => setRoom(c, st, { shoes: true }), cam: [760, 660, 1.3], to: [800, 640, 1.45], look: 'warm', draw: (c, st) => beso(c, 760, Y, 1, { ...pose.sit(st.t), armR: -1.0 + Math.abs(Math.sin(st.t * 6)) * 0.6, expr: 'neutral' }) },
  { at: 'Мать стирает', set: (c, st) => setRoom(c, st, {}), cam: [1000, 680, 1.3], to: [1050, 660, 1.45], look: 'warm', draw: (c, st) => { keke(c, 900, Y, 1, { armR: -0.6 + Math.sin(st.t * 5) * 0.2, armL: 0.6 - Math.sin(st.t * 5) * 0.2, lean: 0.15, expr: 'sad' }); tub(c, 1100, Y, 0.8); } },
], { tr: 'black', look: 'warm' });

stage(2, [
  { set: (c, st) => setRoom(c, st, { night: true, lamp: [1300, 760] }), cam: [960, 660, 1.2], to: [960, 640, 1.35], look: 'night', draw: (c, st) => { beso(c, 900, Y, 1, { lean: Math.sin(st.t * 1.5) * 0.08, armR: -2.2, expr: 'angry', time: st.t }); c.save(); c.translate(1000, 560); c.rotate(-0.4); sfill(c, rr(-14, -60, 28, 80, 8), '#3a6a3a', 3); c.restore(); } },
  { at: 'Когда он пьёт', set: (c, st) => setRoom(c, st, { night: true }), cam: TWO(820, 1120, Y, 1), to: [960, 620, 1.45], look: 'night', shake: 4, draw: (c, st) => { beso(c, 820, Y, 1, { armR: -2.4 + Math.abs(Math.sin(st.t * 4)) * 1.2, expr: 'angry', time: st.t }); keke(c, 1120, Y, 1, { armL: -2.2, armR: 2.2, lean: -0.15, flip: true, expr: 'sad' }); } },
  { at: 'Иногда бьёт', set: (c, st) => setRoom(c, st, { night: true }), cam: CU(960, Y, 0.85), to: [960, 700, 2.2], look: 'night', shake: 2, draw: (c, st) => me(c, 1, 960, Y, 1.1, { armL: -2.0, armR: 2.0, head: 0.15, expr: 'sad' }, { pocks: false }) },
  { at: 'Ты рано узнаёшь', set: (c, st) => { setRoom(c, st, { night: true }); dim(c, 0.4); }, cam: WIDE, to: [960, 540, 1.1], look: 'night', draw: () => {}, over: (c, st) => { line(c, st, 'Сильный всегда прав', 0.3, 420, 84); line(c, st, 'Слабый молчит и ждёт', at(st, 'слабый молчит'), 600, 70, '#c8b898'); } },
  { at: 'Ты учишься ждать', set: (c, st) => setRoom(c, st, { night: true }), cam: [910, 560, 1.6], to: [910, 540, 1.9], look: 'night', draw: (c, st) => me(c, 1, 910, 780, 1.0, { ...pose.sit(st.t), head: -0.2, expr: 'neutral' }, { pocks: false }) },
], { tr: 'cut' });

stage(3, [
  { set: (c, st) => setRoom(c, st, { night: true, lamp: [1250, 820] }), cam: [960, 760, 1.4], to: [960, 760, 1.6], look: 'night', draw: (c, st) => { bed(c, 960, 900, 1.2); me(c, 1, 820, 830, 0.95, { lean: -1.5, blink: 1, expr: 'sad' }, { pocks: true }); } , over: (c, st) => cap(c, st, 'Оспа', 'семь лет') },
  { at: 'лицо остаётся', set: (c, st) => setRoom(c, st, {}), cam: [960, 560, 3.0], to: [960, 560, 3.3], look: 'warm', draw: (c, st) => me(c, 1, 960, Y, 1.1, { ...ip(st), expr: 'neutral' }) },
  { at: 'Потом тебя сбивает', set: setGori, cam: [960, 700, 1.2], to: [1100, 700, 1.25], look: 'warm', blur: true, shake: 6, draw: (c, st) => { phaeton(c, 300 + st.bt * 600, Y, 0.9, st.t, 1); if (st.bt < 0.8) me(c, 1, 1250, Y, 1, { expr: 'shock', armL: -2.4, armR: 2.4 }); else me(c, 1, 1300, Y, 1, { lean: -1.5, expr: 'sad' }); hitFX(c, 1250, 760, 1, st.bt - 0.8); }, sfx: [['impact', 0.8, 0.9]] },
  { at: 'и левая рука', set: setGori, cam: CU(960, Y, 0.85), to: [960, 700, 2.0], look: 'warm', draw: (c, st) => me(c, 1, 960, Y, 1.1, { ...ip(st), armL: -0.3, armR: 0.9, expr: 'sad' }) },
  { at: 'Мальчишки во дворе', set: setGori, cam: [960, 680, 1.2], to: [960, 660, 1.3], look: 'warm', draw: (c, st) => { for (let i = 0; i < 3; i++) kidM(c, 1150 + i * 180, Y, 0.95, { armR: -1.4, expr: 'happy', flip: true, bob: -Math.abs(Math.sin(st.t * 8 + i)) * 10, time: st.t }, i); me(c, 1, 700, Y, 1, { ...ip(st), expr: 'sad', head: 0.1 }); } },
  { at: 'Ты запоминаешь каждого', set: setGori, cam: CU(960, Y, 0.85), to: [960, 640, 3.0], look: 'warm', draw: (c, st) => me(c, 1, 960, Y, 1.1, { ...ip(st), expr: 'angry' }) },
], { tr: 'whip' });

stage(4, [
  { set: (c, st) => setRoom(c, st, { icon: true, lamp: [1250, 760] }), cam: [1300, 600, 1.4], to: [1300, 580, 1.6], look: 'warm', draw: (c, st) => keke(c, 1180, Y, 1, { armR: -2.0, armL: 2.0, head: -0.1, expr: 'neutral' }), over: (c, st) => line(c, st, 'Чтобы ты стал священником', at(st, 'Чтобы ты стал'), 900, 66) },
  { at: 'Ты учишься лучше', set: (c, st) => setRoom(c, st, {}), cam: [960, 660, 1.3], to: [960, 640, 1.45], look: 'warm', draw: (c, st) => { for (let i = 0; i < 3; i++) kidM(c, 500 + i * 260, Y, 0.9, { ...pose.sit(st.t + i), expr: 'neutral' }, i); me(c, 1, 1300, Y, 1, { ...pose.sit(st.t), expr: 'happy' }); book(c, 1420, 800, 0.35, '', '#5a3a24', 0.2); } },
  { at: 'У тебя красивый голос', set: setChurchIn, cam: [960, 640, 1.2], to: [960, 600, 1.35], look: 'gold', draw: (c, st) => { for (let i = 0; i < 4; i++) kidM(c, 560 + i * 250, Y, 0.9, { ...talk(st, i), expr: 'talk' }, i); me(c, 1, 1000, Y + 10, 0.95, talk(st)); } },
], { tr: 'cut' });

// ===================== II. СЕМИНАРИСТ =====================
card(5, 2);

stage(6, [
  { set: (c, st) => setTiflis(c, st, {}), cam: [960, 560, 1.0], to: [960, 600, 1.15], look: 'warm', draw: (c, st) => { me(c, 2, 700 + st.bt * 80, Y, 0.95, { ...pose.march(st.t), time: st.t }); }, over: (c, st) => cap(c, st, 'Тифлисская духовная семинария', '1894') },
  { at: 'Мать гордится', set: (c, st) => setRoom(c, st, { icon: true }), cam: TWO(820, 1120, Y, 1), to: [960, 620, 1.5], look: 'warm', draw: (c, st) => { keke(c, 820, Y, 1, { ...ip(st), armR: -0.9, expr: 'happy' }); me(c, 2, 1120, Y, 1, { ...ip(st), flip: true, expr: 'neutral' }); } },
], { tr: 'black' });

stage(7, [
  { set: setSeminary, cam: [960, 640, 1.1], to: [1000, 620, 1.25], look: 'cold', draw: (c, st) => { monk(c, 1100, Y, 1.05, { armR: -1.0 + Math.sin(st.t * 4) * 0.3, expr: 'angry', time: st.t }); rect(c, 1260, 860, 160, 140, '#5a4030', 4, 5); for (let i = 0; i < 3; i++) seminarist(c, 500 + i * 170, Y, 0.95, { ...ip(st, i), expr: 'shock' }, i); } },
  { at: 'Ты прячешь', set: (c, st) => setSeminary(c, st, { night: true, beds: true }), cam: [960, 760, 1.4], to: [960, 760, 1.6], look: 'night', draw: (c, st) => { me(c, 2, 960, Y, 1, { lean: 0.5, armR: 0.6, expr: 'neutral' }); book(c, 1100, 900, 0.3, '', '#3a4a6a', 0.1); candle(c, 760, 900, 1, st.t); } },
  { at: 'Дарвин', set: (c) => fillBg(c, '#1a1612'), cam: WIDE, to: [960, 540, 1.12], look: 'warm', draw: (c, st) => { const T = [['ДАРВИН', '#3a5a3a', 'Дарвин'], ['ГЮГО', '#5a3a6a', 'Гюго'], ['МАРКС', '#8a2a20', 'Маркс']]; T.forEach(([t, col, w], i) => { if (st.bt > at(st, w) - 0.1) book(c, 560 + i * 400, 560, 0.9, t, col, (i - 1) * 0.08); }); } },
  { at: 'Ты читаешь его', set: (c, st) => { setSeminary(c, st, { night: true }); dim(c, 0.35); }, cam: CU(960, Y, 1), to: [960, 640, 2.2], look: 'night', draw: (c, st) => { me(c, 2, 960, Y, 1, { ...pose.sit(st.t), head: 0.2, expr: 'neutral' }); candle(c, 1150, 830, 1, st.t); book(c, 1060, 760, 0.3, 'МАРКС', '#8a2a20', -0.2); } },
], { tr: 'cut' });

stage(8, [
  { set: (c) => fillBg(c, '#2a2420'), cam: WIDE, to: [960, 540, 1.2], look: 'warm', draw: (c, st) => newspaper(c, 960, 560, 1.0, 'ИВЕРИЯ', ['Стихи', 'юного поэта Сосело'], -0.03) },
  { at: 'Ты вступаешь в тайный', set: (c, st) => { setSeminary(c, st, { night: true }); dim(c, 0.4); }, cam: [960, 700, 1.25], to: [960, 680, 1.4], look: 'night', draw: (c, st) => { candle(c, 960, 960, 1.3, st.t); for (let i = 0; i < 4; i++) seminarist(c, 620 + i * 220 + (i > 1 ? 60 : 0), Y, 0.95, { ...pose.sit(st.t + i), ...talk(st, i), flip: i > 1 }, i); } },
  { at: 'В тысяча восемьсот девяносто девятом', set: setSeminary, cam: TWO(800, 1150, Y, 1), to: [960, 620, 1.45], look: 'cold', draw: (c, st) => { monk(c, 1150, Y, 1.05, { ...talk(st), armR: -1.4, flip: true, expr: 'angry' }); me(c, 2, 800, Y, 1, { ...ip(st), expr: 'neutral' }); }, over: (c, st) => cap(c, st, 'Исключён', '1899') },
  { at: 'Священником ты', set: (c) => fillBg(c, '#141210'), cam: WIDE, to: [960, 540, 1.1], look: 'warm', draw: (c, st) => { c.save(); c.globalAlpha = 1 - clamp(st.bt / 3); icon(c, 960, 540, 2.2); c.restore(); }, over: (c, st) => line(c, st, 'Священником ты так и не станешь', 0.3, 900, 66) },
], { tr: 'whip' });

stage(9, [
  { set: setNightSky, cam: [960, 600, 1.1], to: [960, 500, 1.2], look: 'night', draw: (c, st) => { telescope(c, 1050, Y - 20, 1.2, -0.6); me(c, 2, 860, Y, 1, { ...ip(st), head: -0.3 }, { outfit: 'coat', mustache: 'small' }); }, over: (c, st) => cap(c, st, 'Обсерватория', 'Тифлис') },
  { at: 'а днём ходишь', set: (c, st) => { setRoom(c, st, { night: true, lamp: [960, 880] }); }, cam: [960, 700, 1.25], to: [960, 680, 1.4], look: 'night', draw: (c, st) => { for (let i = 0; i < 4; i++) worker(c, 500 + i * 300, Y, 0.95, { ...ip(st, i), flip: i > 1, expr: 'neutral' }, i); me(c, 2, 960, Y + 10, 1, talk(st), { outfit: 'coat', mustache: 'small' }); } },
  { at: 'Так начинается', set: (c, st) => setRoom(c, st, { night: true }), cam: CU(960, Y, 1), to: [960, 620, 2.4], look: 'night', draw: (c, st) => me(c, 2, 960, Y, 1, { ...ip(st), expr: 'grit' }, { outfit: 'coat', mustache: 'small' }) },
], { tr: 'cut' });

// ===================== III. КОБА =====================
card(10, 3);

stage(11, [
  { set: (c) => fillBg(c, '#2a2018'), cam: WIDE, to: [960, 540, 1.2], look: 'warm', draw: (c, st) => book(c, 960, 560, 1.1, 'ОТЦЕУБИЙЦА\n\nА. Казбеги', '#5a2a24', -0.04), over: (c, st) => cap(c, st, 'Коба', 'герой любимой книги') },
  { at: 'Ты устраиваешь', set: (c, st) => setTiflis(c, st, {}), cam: [960, 640, 1.05], to: [1000, 620, 1.18], look: 'warm', draw: (c, st) => { for (let i = 0; i < 7; i++) worker(c, 200 + i * 240, Y, 0.85, { ...ip(st, i), armR: i % 2 ? -2.4 : 0, expr: 'angry' }, i); redFlag(c, 1150, Y - 300, 0.8, st.t); me(c, 3, 960, Y + 20, 0.95, talk(st)); } },
  { set: (c, st) => { setRoom(c, st, { night: true, lamp: [700, 860] }); }, cam: [960, 640, 1.3], to: [960, 600, 1.45], look: 'night', draw: (c, st) => { rect(c, 900, 760, 300, 140, '#3a3a40', 6, 6); for (let i = 0; i < 10; i++) { const p = (st.t * 0.6 + i / 10) % 1; c.save(); c.translate(1050 + Math.sin(i * 3) * 300 * p, 760 - p * 600); c.rotate(p * 6 + i); sfill(c, rr(-30, -40, 60, 80, 2), '#efe6cc', 2); c.restore(); } me(c, 3, 780, Y, 1, { armR: -1.2, expr: 'neutral' }); } },
  { at: 'прячешься от полиции', set: (c, st) => setTiflis(c, st, {}), cam: [700, 680, 1.1], to: [1300, 680, 1.1], ease: 'lin', look: 'warm', blur: true, draw: (c, st) => { me(c, 3, 600 + st.bt * 300, Y, 1, { ...pose.run(st.t, 0.9), expr: 'shock' }); for (let i = 0; i < 2; i++) man(c, 100 + st.bt * 300 - i * 200, Y, 1, { ...pose.run(st.t + i, 0.9), expr: 'angry' }, { hair: 'short', mustache: 'thick', outfit: 'tunic', hat: 'cap' }, pal(SPAL.coat, { jacket: '#1e2228', hat: '#1e2228' })); } },
], { tr: 'black' });

stage(12, [
  { set: (c, st) => setHall(c, st, { banner: 'РСДРП' }), cam: CU(960, Y, 1), to: [960, 620, 2.0], look: 'warm', draw: (c, st) => lenin(c, 960, Y, 1, { ...talk(st), armR: -1.6 }), over: (c, st) => cap(c, st, 'Ленин', 'вождь большевиков') },
  { at: 'Партии нужны', set: (c) => fillBg(c, '#2a2018'), cam: WIDE, to: [960, 560, 1.2], look: 'warm', draw: (c, st) => { for (let i = 0; i < 5; i++) moneyBag(c, 620 + i * 170, 800 - (i % 2) * 40, 0.9 + (i % 2) * 0.1); } },
  { at: 'В тысяча девятьсот седьмом', set: (c, st) => setTiflis(c, st, {}), cam: [960, 660, 1.1], to: [1100, 640, 1.2], look: 'warm', draw: (c, st) => phaeton(c, 200 + st.bt * 300, Y, 1, st.t, 1), over: (c, st) => cap(c, st, 'Тифлис, 1907', 'ограбление инкассаторской кареты') },
  { at: 'Бомбы', set: (c, st) => setTiflis(c, st, { smoke: true }), cam: [960, 640, 1.15], to: [960, 620, 1.3], look: 'blood', shake: 7, draw: (c, st) => { for (let i = 0; i < 3; i++) blastFX(c, 600 + i * 380, 760, 1.3, (st.bt + i * 0.5) % 1.5); phaeton(c, 960, Y, 1, 0, -1); }, sfx: [['impact', 0.2, 1], ['impact', 0.9, 0.9], ['impact', 1.6, 0.8]] },
  { at: 'Говорят, что ограбление', set: (c, st) => { setTiflis(c, st, { smoke: true }); dim(c, 0.4); }, cam: CU(960, Y, 1), to: [960, 640, 2.2], look: 'ash', draw: (c, st) => me(c, 3, 960, Y, 1, { ...ip(st), expr: 'neutral', look: 0.5 }) },
], { tr: 'cut' });

stage(13, [
  { set: (c, st) => setRoom(c, st, { night: true, icon: true, lamp: [700, 840] }), cam: [960, 700, 1.25], to: [960, 680, 1.4], look: 'night', draw: (c, st) => { for (let i = 0; i < 5; i++) candle(c, 760 + i * 100, 900, 1, st.t + i); me(c, 3, 1200, Y, 1, { ...ip(st), head: 0.2, expr: 'sad' }); }, over: (c, st) => cap(c, st, 'Екатерина Сванидзе', '1885 1907') },
  { at: 'Ты остаёшься', set: (c, st) => setRoom(c, st, { night: true }), cam: CU(960, Y, 1), to: [960, 660, 1.8], look: 'night', draw: (c, st) => { me(c, 3, 960, Y, 1, { ...ip(st), armL: -1.2, armR: 1.2, expr: 'neutral' }); sfill(c, el2(960, 760, 40, 54), '#efe6cc', 4); sfill(c, el2(960, 712, 22, 22), '#e8c09a', 3); } },
  { at: 'Ты отдаёшь его', set: (c, st) => setRoom(c, st, {}), cam: TWO(820, 1120, Y, 1), to: [960, 640, 1.4], look: 'warm', draw: (c, st) => { me(c, 3, 820, Y, 1, { ...ip(st), armR: -1.1 }); man(c, 1120, Y, 1, { ...ip(st), flip: true, armL: -1.0, expr: 'sad' }, { female: true, hair: 'kerchief', outfit: 'dress' }, pal(SPAL.keke, { jacket: '#4a3a3a', pants: '#3a2e2e' })); sfill(c, el2(970, 720, 36, 48), '#efe6cc', 4); } },
  { at: 'Друг детства', set: (c) => fillBg(c, '#141210'), cam: WIDE, to: [960, 540, 1.1], look: 'warm', draw: () => {}, over: (c, st) => line(c, st, '«С ней умерли мои последние тёплые чувства к людям»', at(st, 'с ней умерли'), 540, 54) },
], { tr: 'black' });

stage(14, [
  { set: setCell, cam: [960, 640, 1.2], to: [960, 600, 1.35], look: 'cold', draw: (c, st) => me(c, 3, 960, Y, 1, { ...pose.sit(st.t), head: -0.2, expr: 'neutral' }) },
  { at: 'Тюрьмы', set: (c, st) => setSiberia(c, st), cam: [600, 700, 1.0], to: [1300, 700, 1.0], ease: 'lin', look: 'cold', draw: (c, st) => { for (let i = 0; i < 5; i++) prisoner(c, 300 + i * 200 + st.bt * 150, Y, 0.9, { ...pose.trudge(st.t + i) }, i); me(c, 3, 1350 + st.bt * 150, Y, 0.95, { ...pose.trudge(st.t) }); } },
  { at: 'Из ссылки', set: (c, st) => setSiberia(c, st), cam: [900, 700, 1.15], to: [1300, 700, 1.15], ease: 'lin', look: 'cold', blur: true, draw: (c, st) => me(c, 3, 700 + st.bt * 300, Y, 1, { ...pose.run(st.t, 1), expr: 'grit' }) },
  { at: 'Примерно в тысяча', set: (c) => fillBg(c, '#2a2420'), cam: WIDE, to: [960, 540, 1.25], look: 'warm', draw: (c, st) => newspaper(c, 960, 560, 1.0, 'ПРОСВЕЩЕНИЕ', ['Марксизм', 'и национальный вопрос', '', 'К. Сталин'], 0.02), over: (c, st) => line(c, st, 'Человек из стали', at(st, 'Человек из стали'), 960, 80, '#f4e080') },
], { tr: 'whip' });

stage(15, [
  { set: setSiberia, cam: [960, 560, 1.0], to: [960, 600, 1.12], look: 'cold', draw: () => {}, over: (c, st) => cap(c, st, 'Туруханский край', 'у Полярного круга, 1913 1917') },
  { at: 'Ты ловишь рыбу', set: setSiberia, cam: [960, 760, 1.35], to: [960, 740, 1.5], look: 'cold', draw: (c, st) => { sfill(c, el2(1100, 1000, 80, 20), '#2a3a4a', 4); me(c, 3, 900, Y, 1, { ...pose.sit(st.t), armR: -1.2, expr: 'neutral' }); inkLine(c, [[1020, 760], [1110, 990]], 3, '#3a3a3a'); } },
  { at: 'Ты умеешь ждать', set: setSiberia, cam: CU(960, Y, 1), to: [960, 640, 2.2], look: 'cold', draw: (c, st) => me(c, 3, 960, Y, 1, { ...ip(st), expr: 'neutral' }), over: (c, st) => line(c, st, 'Почти четыре года', at(st, 'почти четыре'), 900, 70) },
], { tr: 'cut' });

// ===================== IV. НАРКОМ =====================
card(16, 4);

stage(17, [
  { set: (c) => fillBg(c, '#2a2420'), cam: WIDE, to: [960, 540, 1.2], look: 'warm', draw: (c, st) => newspaper(c, 960, 560, 1.0, '1917', ['Отречение', 'Николая II'], -0.02) },
  { at: 'Ты возвращаешься', set: (c, st) => setStation(c, st, {}), cam: [960, 640, 1.05], to: [1050, 620, 1.18], look: 'warm', draw: (c, st) => { teplushka(c, 400, 900, 1); me(c, 3, 1100, Y, 1, { ...pose.march(st.t), time: st.t }, { beard: undefined, mustache: 'stalin' }); } },
  { at: 'В октябре', set: (c, st) => setPetrograd(c, st, { night: true }), cam: [960, 600, 1.0], to: [960, 560, 1.12], look: 'blood', draw: (c, st) => { for (let i = 0; i < 10; i++) soldierR(c, 100 + i * 190, Y, 0.75, { ...pose.run(st.t + i, 0.6) }, i); }, over: (c, st) => cap(c, st, 'Октябрь 1917', 'большевики берут власть') },
  { at: 'Тебя назначают', set: (c, st) => setOffice(c, st, {}), cam: CU(960, Y, 1), to: [960, 620, 2.0], look: 'warm', draw: (c, st) => me(c, 4, 960, Y, 1, ip(st)), over: (c, st) => cap(c, st, 'Народный комиссар', 'по делам национальностей') },
], { tr: 'black' });

stage(18, [
  { set: (c, st) => setStation(c, st, {}), cam: [960, 620, 1.0], to: [1000, 600, 1.12], look: 'ash', draw: (c, st) => { teplushka(c, 1300, 900, 1); for (let i = 0; i < 3; i++) soldierR(c, 400 + i * 200, Y, 0.85, ip(st, i), i); me(c, 4, 960, Y, 1, ip(st)); }, over: (c, st) => cap(c, st, 'Царицын, 1918', 'Гражданская война') },
  { at: 'Ты действуешь', set: (c, st) => { setStation(c, st, {}); dim(c, 0.5); }, cam: [960, 640, 1.15], to: [960, 620, 1.25], look: 'ash', shake: 3, draw: (c, st) => { for (let i = 0; i < 4; i++) soldierR(c, 500 + i * 160, Y, 0.85, { gunA: -0.05, flip: false }, i); c.save(); c.fillStyle = 'rgba(0,0,0,0.75)'; c.fillRect(1250, 500, 500, 500); c.restore(); if ((st.bt % 2) < 0.15) { c.save(); c.fillStyle = 'rgba(255,240,200,0.5)'; c.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); c.restore(); } } },
  { at: 'Лев Троцкий', set: (c, st) => setStation(c, st, {}), cam: CU(960, Y, 1), to: [960, 620, 2.0], look: 'warm', draw: (c, st) => trotsky(c, 960, Y, 1, { ...talk(st), armR: -1.6 }), over: (c, st) => cap(c, st, 'Лев Троцкий', 'создатель Красной армии') },
], { tr: 'cut' });

stage(19, [
  { set: (c, st) => setRoom(c, st, {}), cam: TWO(820, 1120, Y, 1), to: [960, 640, 1.45], look: 'warm', draw: (c, st) => { me(c, 4, 820, Y, 1, { ...ip(st), expr: 'happy' }); nadya(c, 1120, Y, 0.92, { ...ip(st), flip: true, expr: 'happy' }); }, over: (c, st) => cap(c, st, 'Надежда Аллилуева', 'вторая жена') },
  { at: 'Она верит', set: (c, st) => setRoom(c, st, {}), cam: CU(1000, Y, 0.92), to: [1000, 640, 2.2], look: 'warm', draw: (c, st) => nadya(c, 1000, Y, 0.92, { ...ip(st), expr: 'happy' }) },
], { tr: 'whip' });

stage(20, [
  { set: (c, st) => setHall(c, st, {}), cam: [960, 640, 1.1], to: [960, 600, 1.25], look: 'warm', draw: (c, st) => { rect(c, 760, 800, 260, 200, '#7a2a1c', 6, 6); trotsky(c, 890, 860, 0.9, { ...talk(st), armR: -2.2 + Math.sin(st.t * 3) * 0.4 }); me(c, 4, 1450, Y, 0.95, { ...ip(st), flip: true }, { paper: true }); } },
  { at: 'Тебя называют серым', set: (c, st) => setHall(c, st, {}), cam: CU(1450, Y, 0.95), to: [1450, 640, 2.0], look: 'ash', draw: (c, st) => me(c, 4, 1450, Y, 0.95, { ...ip(st), expr: 'neutral' }), over: (c, st) => line(c, st, '«Серое пятно»', 0.4, 200, 90, '#c8c8c8') },
  { at: 'Пока они говорят', set: (c, st) => setOffice(c, st, { night: true }), cam: [960, 700, 1.3], to: [960, 680, 1.45], look: 'night', draw: (c, st) => { me(c, 4, 960, Y - 20, 1, { ...pose.write(st.t), expr: 'neutral' }); for (let i = 0; i < 6; i++) sfill(c, rr(560 + i * 18, 780 - i * 10, 140, 30, 3), '#efe6cc', 2); } },
  { at: 'Ты запоминаешь, кто', set: (c) => fillBg(c, '#2a2420'), cam: WIDE, to: [960, 540, 1.2], look: 'warm', draw: (c, st) => { for (let i = 0; i < 12; i++) { c.save(); c.translate(300 + (i % 6) * 260, 360 + Math.floor(i / 6) * 320); c.rotate((i % 3 - 1) * 0.05); sfill(c, rr(-100, -130, 200, 260, 4), '#efe6cc', 3); for (let k = 0; k < 5; k++) inkLine(c, [[-80, -90 + k * 36], [70, -90 + k * 36]], 2, '#8a8478'); c.restore(); } } },
], { tr: 'cut' });

// ===================== V. ГЕНСЕК =====================
card(21, 5);

stage(22, [
  { set: (c, st) => setOffice(c, st, {}), cam: [960, 640, 1.1], to: [960, 600, 1.25], look: 'warm', draw: (c, st) => me(c, 5, 960, Y - 20, 1, { ...pose.write(st.t), expr: 'neutral' }), over: (c, st) => cap(c, st, 'Генеральный секретарь', '1922') },
  { at: 'Все считают', set: (c, st) => setOffice(c, st, {}), cam: [700, 700, 1.4], to: [800, 680, 1.55], look: 'ash', draw: (c, st) => { for (let k = 0; k < 4; k++) for (let i = 0; i < 12; i++) sfill(c, rr(500 + k * 160, 800 - i * 16, 130, 18, 2), '#efe6cc', 2); } },
  { at: 'Но именно ты', set: (c, st) => setOffice(c, st, {}), cam: [960, 640, 1.1], to: [1000, 620, 1.2], look: 'warm', draw: (c, st) => { me(c, 5, 760, Y, 1, { ...ip(st), armR: -1.2 + Math.abs(Math.sin(st.t * 3)) * 0.5 }); for (let i = 0; i < 5; i++) official(c, 1100 + i * 180, Y, 0.9, { ...ip(st, i), flip: true, head: 0.1 }, i); } },
], { tr: 'black' });

stage(23, [
  { set: (c, st) => setRoom(c, st, { lamp: [1300, 820] }), cam: [960, 700, 1.25], to: [960, 680, 1.4], look: 'cold', draw: (c, st) => { bed(c, 860, 900, 1.2); lenin(c, 720, 840, 0.9, { lean: -1.3, expr: 'talk', time: st.t }); man(c, 1200, Y, 0.9, { ...pose.write(st.t), flip: true }, { female: true, hair: 'bob', outfit: 'dress' }, pal(SPAL.nadya, { jacket: '#3a4a3a' })); }, over: (c, st) => cap(c, st, 'Письмо к съезду', '1922 1923') },
  { at: 'В нём сказано', set: (c) => fillBg(c, '#e8dcbc'), cam: [960, 540, 1.2], to: [960, 560, 1.45], look: 'warm', draw: (c, st) => { c.fillStyle = '#2a2018'; c.font = 'italic 400 56px "Old Standard TT"'; c.textAlign = 'center'; const L = ['Сталин слишком груб...', 'предлагаю товарищам обдумать способ', 'перемещения Сталина с этого места']; L.forEach((l, i) => { c.save(); c.globalAlpha = clamp((st.bt - i * 0.8) / 0.6); c.fillText(l, 960, 420 + i * 110); c.restore(); }); } },
], { tr: 'cut' });

stage(24, [
  { set: (c, st) => setHall(c, st, { banner: 'ЛЕНИН УМЕР, ДЕЛО ЕГО ЖИВЁТ' }), cam: [960, 700, 1.15], to: [960, 680, 1.3], look: 'ash', draw: (c, st) => { coffin(c, 960, 960, 1.0); me(c, 5, 1350, Y, 1, { ...ip(st), flip: true, head: 0.2, expr: 'sad' }, { pipe: false }); }, over: (c, st) => cap(c, st, 'Январь 1924', 'смерть Ленина') },
  { at: 'Весной письмо', set: (c, st) => setHall(c, st, { rows: true }), cam: [960, 560, 1.0], to: [960, 600, 1.12], look: 'warm', draw: () => {} },
  { at: 'Ты предлагаешь', set: (c, st) => setHall(c, st, {}), cam: CU(960, Y, 1), to: [960, 620, 2.0], look: 'warm', draw: (c, st) => me(c, 5, 960, Y, 1, { ...talk(st), expr: 'talk' }, { pipe: false }) },
  { at: 'Тебя оставляют', set: (c, st) => setHall(c, st, {}), cam: [960, 560, 1.0], to: [960, 540, 1.1], look: 'warm', draw: (c, st) => { for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) official(c, 100 + i * 220 + r * 110, Y - 80 + r * 120, 0.8, { ...ip(st, i + r), armR: -2.6 * clamp((st.bt - (i % 4) * 0.2) / 0.6) }, i + r); } },
  { at: 'Потом ты по очереди', set: (c) => fillBg(c, '#2a2420'), cam: WIDE, to: [960, 540, 1.1], look: 'ash', draw: (c, st) => { const who = [[trotsky, 'Троцкого'], [zinoviev, 'Зиновьевым'], [kamenev, 'Каменевым'], [bukharin, 'Бухарина']]; const T = [at(st, 'побеждаешь Троцкого'), at(st, 'Зиновьева и'), at(st, 'Каменева.'), at(st, 'убираешь и Бухарина')]; who.forEach(([f], i) => erase(c, 360 + i * 400, 540, 1.0, clamp((st.bt - T[i]) / 1.2), () => f(c, 0, 520, 1.1, { expr: 'neutral' }))); } },
], { tr: 'whip' });

stage(25, [
  { set: (c, st) => setStation(c, st, {}), cam: [960, 640, 1.1], to: [1050, 620, 1.2], look: 'cold', draw: (c, st) => { teplushka(c, 1100 - st.bt * 60, 900, 1); trotsky(c, 760, Y, 1, { ...ip(st), flip: true, expr: 'angry' }); nkvd(c, 520, Y, 0.95, ip(st)); }, over: (c, st) => cap(c, st, 'Троцкого высылают', '1929') },
  { at: 'Тебе исполняется', set: (c) => fillBg(c, '#2a2420'), cam: WIDE, to: [960, 540, 1.2], look: 'warm', draw: (c, st) => { newspaper(c, 760, 560, 0.9, 'ПРАВДА', ['Сталину', '50 лет'], -0.04); portrait(c, 1350, 540, 0.9, 5); } },
  { at: 'Теперь ты главный', set: (c, st) => setOffice(c, st, { portrait: true }), cam: CU(960, Y, 1), to: [960, 620, 2.2], look: 'gold', draw: (c, st) => me(c, 5, 960, Y, 1, { ...ip(st), expr: 'neutral' }) },
], { tr: 'black' });

// ===================== VI. ХОЗЯИН =====================
card(26, 6);

stage(27, [
  { set: setBuild, cam: [960, 560, 1.0], to: [960, 520, 1.12], look: 'warm', draw: (c, st) => { for (let i = 0; i < 6; i++) worker(c, 200 + i * 300, Y, 0.85, { armR: -1.4 + Math.abs(Math.sin(st.t * 4 + i)) * 1.0, expr: 'grit', time: st.t }, i); }, over: (c, st) => cap(c, st, 'Великий перелом', '1929') },
  { at: 'Крестьян загоняют', set: (c, st) => setFields(c, st, {}), cam: [960, 640, 1.05], to: [1100, 620, 1.15], look: 'warm', draw: (c, st) => { tractor(c, 1350, 860, 1.0, st.t); for (let i = 0; i < 5; i++) peasant(c, 300 + i * 200 + st.bt * 40, Y, 0.85, { ...pose.trudge(st.t + i) }, i); }, over: (c, st) => cap(c, st, 'Коллективизация') },
  { at: 'Тех, кто сопротивляется', set: (c, st) => setStation(c, st, {}), cam: [960, 640, 1.1], to: [1000, 620, 1.2], look: 'ash', draw: (c, st) => { teplushka(c, 1300, 900, 1); for (let i = 0; i < 4; i++) peasant(c, 500 + i * 180, Y, 0.85, { ...ip(st, i), expr: 'sad', head: 0.15 }, i); kidM(c, 1220, Y, 0.85, { ...ip(st), expr: 'sad' }, 1); nkvd(c, 300, Y, 0.95, ip(st)); }, over: (c, st) => cap(c, st, 'Раскулачивание', 'высылка в Сибирь и Казахстан') },
  { at: 'Беломорканал', set: setCamp, cam: [960, 640, 1.05], to: [1000, 620, 1.15], look: 'cold', draw: (c, st) => { for (let i = 0; i < 6; i++) prisoner(c, 250 + i * 280, Y, 0.85, { ...pose.dig(st.t + i) }, i); }, over: (c, st) => cap(c, st, 'ГУЛАГ', 'Беломорканал строят заключённые') },
], { tr: 'whip' });

stage(28, [
  { set: (c, st) => setFields(c, st, {}), cam: [960, 640, 1.05], to: [1050, 620, 1.15], look: 'warm', draw: (c, st) => { truck(c, 1200, 900, 1.0, -1); grainSacks(c, 1100, 860, 0.7, 6); for (let i = 0; i < 2; i++) nkvd(c, 700 + i * 200, Y, 0.95, ip(st, i)); peasant(c, 400, Y, 0.9, { ...ip(st), expr: 'sad' }, 2); } },
  { at: 'В тысяча девятьсот тридцать втором', set: (c, st) => setFields(c, st, { famine: true }), cam: [960, 600, 1.0], to: [960, 620, 1.1], look: 'ash', draw: () => {}, over: (c, st) => cap(c, st, 'Голод', '1932 и 1933 годы') },
  { at: 'От голода умирают', set: (c) => fillBg(c, '#141210'), cam: WIDE, to: [960, 540, 1.1], look: 'ash', draw: () => {}, over: (c, st) => line(c, st, 'Миллионы людей', 0.3, 540, 110, '#c8c0b0') },
  { at: 'В газетах', set: (c) => fillBg(c, '#2a2420'), cam: WIDE, to: [960, 540, 1.2], look: 'warm', draw: (c, st) => newspaper(c, 960, 560, 1.0, 'ПРАВДА', ['Успехи', 'колхозного строя'], 0.03) },
], { tr: 'black' });

stage(29, [
  { set: (c) => fillBg(c, '#141210'), cam: WIDE, to: [960, 540, 1.15], look: 'ash', draw: (c, st) => frameBlack(c, 960, 540, 1.1, () => nadya(c, 0, 640, 1.2, { expr: 'neutral' })), over: (c, st) => cap(c, st, 'Надежда Аллилуева', '1901 1932') },
  { at: 'Тебе пятьдесят три', set: (c, st) => setOffice(c, st, { night: true, table: false }), cam: [960, 640, 1.1], to: [960, 620, 1.2], look: 'night', draw: (c, st) => { me(c, 6, 960, Y, 1, { ...ip(st), expr: 'sad' }, { pipe: false }); kidM(c, 760, Y, 0.85, { ...ip(st), expr: 'sad' }, 0); man(c, 1160, Y, 0.75, { ...ip(st), expr: 'sad' }, { kid: true, female: true, hair: 'bob', outfit: 'dress' }, pal(SPAL.nadya, { hair: '#8a4a2a', pants: '#8a3a3a', jacket: '#8a3a3a' })); } },
  { at: 'Ты остаёшься один', set: (c, st) => setOffice(c, st, { night: true, table: false }), cam: [960, 560, 1.0], to: [960, 540, 0.95], look: 'night', draw: (c, st) => me(c, 6, 960, Y, 0.6, { ...ip(st), head: 0.15, expr: 'sad' }, { pipe: false }) },
], { tr: 'cut' });

stage(30, [
  { set: (c, st) => setRoom(c, st, { icon: true }), cam: TWO(820, 1150, Y, 1), to: [980, 620, 1.4], look: 'warm', draw: (c, st) => { keke(c, 1150, Y, 0.95, { ...pose.sit(st.t), flip: true, expr: 'neutral' }, true); me(c, 6, 820, Y, 1, { ...ip(st), expr: 'happy' }, { pipe: false }); }, over: (c, st) => cap(c, st, 'Тбилиси, 1935', 'в гостях у матери') },
  { at: 'Говорят, ты спросил', set: (c, st) => setRoom(c, st, { icon: true }), cam: CU(820, Y, 1), to: [820, 620, 2.0], look: 'warm', draw: (c, st) => me(c, 6, 820, Y, 1, talk(st), { pipe: false }), over: (c, st) => line(c, st, '«Мама, помнишь царя? Так вот я теперь что-то вроде царя»', at(st, 'мама, помнишь'), 900, 50) },
  { at: 'А она ответила', set: (c, st) => setRoom(c, st, { icon: true }), cam: [1150, 640, 2.2], to: [1150, 620, 2.6], look: 'warm', draw: (c, st) => keke(c, 1150, Y, 0.95, { ...pose.sit(st.t), ...talk(st), flip: true }, true), over: (c, st) => line(c, st, '«Лучше бы ты стал священником»', at(st, 'лучше бы'), 900, 64, '#f4e080') },
], { tr: 'whip' });

stage(31, [
  { set: (c, st) => setSeminary(c, st, {}), cam: [960, 640, 1.15], to: [1000, 620, 1.25], look: 'cold', draw: (c, st) => kirov(c, 960, Y, 1, { ...pose.march(st.t), time: st.t }), over: (c, st) => cap(c, st, 'Сергей Киров', 'Ленинград, 1 декабря 1934') },
  { at: 'Его любили', set: (c, st) => { setSeminary(c, st, {}); dim(c, 0.4); }, cam: [960, 640, 1.2], to: [960, 620, 1.3], look: 'cold', shake: 4, draw: (c, st) => { if (st.bt < 0.6) kirov(c, 960, Y, 1, { expr: 'shock' }); else kirov(c, 980, Y + 20, 1, { lean: -1.5, blink: 1 }); hitFX(c, 880, 600, 0.6, st.bt - 0.55); }, sfx: [['impact', 0.55, 0.7]] },
  { at: 'После его смерти', set: setStreetNight, cam: [960, 640, 1.05], to: [1100, 620, 1.15], look: 'night', draw: (c, st) => voronok(c, 200 + st.bt * 220, Y, 1, st.t, 1) },
], { tr: 'black' });

stage(32, [
  { set: setStreetNight, cam: [960, 620, 1.1], to: [960, 600, 1.2], look: 'night', draw: (c, st) => { voronok(c, 1300, Y, 1, st.t, -1, 0); for (let i = 0; i < 2; i++) nkvd(c, 760 + i * 160, Y, 0.95, { ...pose.march(st.t + i), time: st.t }); }, over: (c, st) => cap(c, st, 'Большой террор', '1937 1938') },
  { at: 'Арестовывают', set: setStreetNight, cam: [960, 640, 1.05], to: [1000, 620, 1.12], look: 'night', draw: (c, st) => { const W = [(x) => worker(c, x, Y, 0.9, { ...ip(st), expr: 'shock' }, 1), (x) => official(c, x, Y, 0.9, { ...ip(st), expr: 'shock' }, 2), (x) => man(c, x, Y, 0.9, { ...ip(st), expr: 'shock' }, { hair: 'curly', glasses: 'round', outfit: 'suit' }, SPAL.suit), (x) => man(c, x, Y, 0.9, { ...ip(st), expr: 'shock' }, { hair: 'short', outfit: 'marshal', star: false, hat: 'marshal' }, SPAL.marshal), (x) => official(c, x, Y, 0.9, { ...ip(st), expr: 'sad' }, 1)]; W.forEach((f, i) => { if (st.bt > i * 0.7) f(300 + i * 330); }); } },
  { at: 'За тридцать седьмой', set: (c) => fillBg(c, '#100c0a'), cam: WIDE, to: [960, 540, 1.12], look: 'ash', draw: (c, st) => { const n = Math.min(400, Math.floor(st.bt * 160)); c.fillStyle = 'rgba(200,190,170,0.5)'; for (let i = 0; i < n; i++) c.fillRect(260 + (i % 40) * 35, 260 + Math.floor(i / 40) * 40, 20, 26); }, over: (c, st) => line(c, st, 'Около 700 000 расстрелянных', 0.4, 820, 70, '#e8d8c0') },
  { at: 'Сотни тысяч', set: setCamp, cam: [960, 600, 1.0], to: [960, 580, 1.1], look: 'cold', draw: (c, st) => { for (let i = 0; i < 7; i++) prisoner(c, 200 + i * 240 + st.bt * 30, Y, 0.8, { ...pose.trudge(st.t + i) }, i); } },
  { at: 'Ты подписываешь расстрельные', set: (c, st) => setOffice(c, st, { night: true }), cam: [960, 600, 1.4], to: [960, 580, 1.7], look: 'night', draw: (c, st) => { listPaper(c, 960, 560, 1.0, 18, clamp(st.bt / 1.5), -0.02, Math.floor(st.bt / 1.6) + 3); } },
], { tr: 'cut' });

// ===================== VII. ВЕРХОВНЫЙ ГЛАВНОКОМАНДУЮЩИЙ =====================
card(33, 7);

stage(34, [
  { set: (c, st) => setOffice(c, st, {}), cam: [960, 640, 1.2], to: [960, 600, 1.35], look: 'warm', draw: (c, st) => { man(c, 760, Y, 0.95, { ...pose.write(st.t) }, { hair: 'short', mustache: 'small', glasses: 'pince', outfit: 'suit' }, SPAL.suit); me(c, 6, 1150, Y, 1, { ...ip(st), expr: 'happy' }); }, over: (c, st) => cap(c, st, 'Август 1939', 'пакт о ненападении с Германией') },
  { at: 'Пакт о ненападении', set: (c) => fillBg(c, '#e8dcbc'), cam: WIDE, to: [960, 540, 1.15], look: 'warm', draw: (c, st) => { c.save(); c.fillStyle = '#d8ccb0'; c.fillRect(360, 160, 1200, 760); c.restore(); c.strokeStyle = '#7a6a50'; c.lineWidth = 6; c.beginPath(); c.moveTo(500, 300); c.bezierCurveTo(700, 400, 600, 600, 800, 800); c.stroke(); c.save(); c.strokeStyle = '#b02a20'; c.lineWidth = 10; c.setLineDash([30, 20]); c.beginPath(); c.moveTo(1000, 180); c.lineTo(980, 900 * clamp(st.bt / 2) + 180 * (1 - clamp(st.bt / 2))); c.stroke(); c.restore(); c.fillStyle = '#3a2a1a'; c.font = '700 54px "Old Standard TT"'; c.textAlign = 'center'; c.fillText('Секретный протокол', 960, 260); } },
  { at: 'Летом сорокового', set: (c, st) => { sky(c, '#7ab0d8', '#f8e0b0'); fillGround(c, 820, '#d8b880', '#c8a870'); }, cam: [960, 640, 1.15], to: [960, 620, 1.25], look: 'warm', draw: (c, st) => { trotsky(c, 900, Y, 1, { ...pose.sit(st.t), head: 0.2 }); rect(c, 1000, 880, 300, 40, '#6a4a2a', 4, 5); }, over: (c, st) => cap(c, st, 'Мексика, 1940', 'убийство Троцкого') },
  { at: 'Разведка', set: (c, st) => setOffice(c, st, {}), cam: [800, 700, 1.3], to: [850, 680, 1.45], look: 'warm', draw: (c, st) => { for (let i = 0; i < Math.min(12, Math.floor(st.bt * 4)); i++) { c.save(); c.translate(700 + (i % 4) * 30, 780 - i * 14); c.rotate((i % 3 - 1) * 0.08); sfill(c, rr(-90, -20, 180, 40, 2), '#efe6cc', 2); c.restore(); } } },
  { at: 'Ты не веришь', set: (c, st) => setOffice(c, st, {}), cam: CU(960, Y, 1), to: [960, 620, 2.0], look: 'warm', draw: (c, st) => me(c, 6, 960, Y, 1, { ...ip(st), armR: -1.2 + Math.sin(st.t * 3) * 0.3, expr: 'angry' }) },
], { tr: 'black' });

stage(35, [
  { set: (c, st) => wSteppe(c, st, {}), cam: [960, 560, 1.0], to: [960, 520, 1.12], look: 'blood', shake: 5, draw: (c, st) => { for (let i = 0; i < 4; i++) ju52(c, -200 + st.bt * 300 + i * 420, 220 + (i % 2) * 90, 0.45, st.t); for (let i = 0; i < 3; i++) blastFX(c, 400 + i * 550, 780, 1.4, (st.bt + i * 0.4) % 1.5); }, over: (c, st) => cap(c, st, '22 июня 1941', 'нападение Германии'), sfx: [['rumble', 0.2, 1], ['impact', 0.9, 0.8]] },
  { at: 'Армия отступает', set: (c, st) => setRoad(c, st, {}), cam: [1200, 640, 1.05], to: [700, 640, 1.05], ease: 'lin', look: 'ash', draw: (c, st) => { for (let i = 0; i < 7; i++) soldierR(c, 1500 - i * 220 - st.bt * 120, Y, 0.85, { ...pose.trudge(st.t + i), flip: true }, i); } },
  { at: 'Через неделю', set: (c, st) => setDacha(c, st, {}), cam: [960, 660, 1.15], to: [960, 640, 1.3], look: 'ash', draw: (c, st) => me(c, 6, 1040, Y - 30, 1, { ...pose.sit(st.t), head: 0.25, expr: 'sad' }, { pipe: false }), over: (c, st) => line(c, st, '«Ленин создал наше государство, а мы его просрали»', at(st, 'Ленин создал'), 200, 46) },
  { at: 'Через несколько дней', set: (c, st) => setDacha(c, st, {}), cam: [960, 640, 1.05], to: [960, 620, 1.15], look: 'ash', draw: (c, st) => { me(c, 6, 1100, Y, 1, { ...ip(st), expr: 'neutral' }); for (let i = 0; i < 3; i++) official(c, 400 + i * 200, Y, 0.95, { ...ip(st, i), expr: 'neutral' }, i); } },
], { tr: 'flash' });

stage(36, [
  { set: setStudio, cam: CU(960, Y, 1), to: [960, 640, 1.8], look: 'warm', draw: (c, st) => { me(c, 6, 960, Y, 1, { ...talk(st), head: 0.1 }, { pipe: false }); micro(c, 1050, 640, 1.0); glassW(c, 1180, 820, 1.0); }, over: (c, st) => cap(c, st, '3 июля 1941', 'обращение по радио') },
  { at: 'товарищи, граждане', set: (c) => fillBg(c, '#141210'), cam: WIDE, to: [960, 540, 1.12], look: 'warm', draw: (c, st) => { c.save(); c.translate(960, 760); c.scale(1.6, 1.6); radioSet(c, 0, 0, 1); c.restore(); }, over: (c, st) => line(c, st, '«Братья и сёстры»', at(st, 'и сёстры'), 280, 96, '#f4e080') },
  { at: 'Слышно, как ты пьёшь', set: setStudio, cam: [1100, 640, 2.4], to: [1100, 620, 2.7], look: 'warm', draw: (c, st) => { me(c, 6, 960, Y, 1, { ...ip(st), armR: -1.6, head: -0.1 }, { pipe: false }); glassW(c, 1140, 520, 1.0); } },
], { tr: 'cut' });

stage(37, [
  { set: setCamp, cam: [960, 660, 1.2], to: [960, 640, 1.35], look: 'cold', draw: (c, st) => { yakov(c, 960, Y, 1, { ...ip(st), expr: 'sad' }, { hat: 'none' }); }, fg: (c, st) => wireFence(c, -400, 2400, 1080, 400), over: (c, st) => cap(c, st, 'Яков Джугашвили', 'в немецком плену') },
  { at: 'Немцы предлагают', set: (c) => fillBg(c, '#e8dcbc'), cam: WIDE, to: [960, 540, 1.15], look: 'warm', draw: (c, st) => { c.fillStyle = '#2a2018'; c.font = '700 64px "Old Standard TT"'; c.textAlign = 'center'; c.fillText('Яков Джугашвили', 960, 420); c.fillText('⇄', 960, 540); c.fillText('фельдмаршал Паулюс', 960, 660); } },
  { at: 'Ты отказываешься', set: (c, st) => setOffice(c, st, { night: true }), cam: CU(960, Y, 1), to: [960, 620, 2.0], look: 'night', draw: (c, st) => me(c, 7, 960, Y, 1, { ...ip(st), expr: 'neutral', flip: true }) },
  { at: 'Яков погибает', set: (c, st) => { setCamp(c, st); dim(c, 0.5); }, cam: [960, 600, 1.0], to: [960, 580, 1.08], look: 'night', draw: () => {}, fg: (c, st) => wireFence(c, -400, 2400, 1080, 400) },
], { tr: 'black' });

stage(38, [
  { set: (c, st) => setOffice(c, st, { night: true, map: true }), cam: [700, 520, 1.3], to: [760, 500, 1.45], look: 'night', draw: (c, st) => me(c, 7, 1050, Y, 1, { ...ip(st), armR: -1.2, flip: true }, { star: false }) },
  { at: 'Москва выстояла', set: (c, st) => setWinter(c, st, {}), cam: [960, 640, 1.05], to: [1050, 620, 1.15], look: 'cold', draw: (c, st) => { for (let i = 0; i < 6; i++) soldierR(c, 200 + i * 300 + st.bt * 60, Y, 0.85, pose.run(st.t + i, 0.7), i); }, over: (c, st) => cap(c, st, 'Москва', 'зима 1941') },
  { at: 'Потом Сталинград', set: (c, st) => setStalingrad(c, st, {}), cam: [960, 600, 1.0], to: [960, 560, 1.12], look: 'ash', shake: 3, draw: (c, st) => { for (let i = 0; i < 3; i++) blastFX(c, 500 + i * 500, 720, 1.1, (st.bt + i * 0.5) % 1.5); }, over: (c, st) => cap(c, st, 'Сталинград', 'бывший Царицын') },
  { at: 'Потом Курск', set: (c, st) => setKursk(c, st, {}), cam: [960, 620, 1.0], to: [1100, 600, 1.1], look: 'warm', draw: (c, st) => { for (let i = 0; i < 3; i++) t34(c, 200 + i * 520 + st.bt * 120, 920, 0.8, st.t, 1, (st.t + i) % 2 < 0.2); }, over: (c, st) => cap(c, st, 'Курск', '1943') },
  { at: 'Ты встречаешься', set: setYalta, cam: [960, 640, 1.05], to: [960, 620, 1.15], look: 'warm', draw: (c, st) => { churchill(c, 600, Y, 1, { ...pose.sit(st.t), time: st.t }); roosevelt(c, 960, Y, 1, { ...pose.sit(st.t + 1), time: st.t }); me(c, 7, 1320, Y, 1, { ...pose.sit(st.t + 2), flip: true }); }, over: (c, st) => cap(c, st, 'Тегеран и Ялта', 'Черчилль, Рузвельт, Сталин') },
], { tr: 'whip' });

stage(39, [
  { set: (c, st) => setRedSquare(c, st, {}), cam: [960, 560, 1.0], to: [960, 520, 1.12], look: 'gold', draw: (c, st) => { for (let r = 0; r < 2; r++) for (let i = 0; i < 10; i++) soldierR(c, 100 + i * 200 + r * 100, Y - 60 + r * 90, 0.7 + r * 0.1, { ...pose.march(st.t + i), time: st.t }, i + r); for (let i = 0; i < 3; i++) redFlag(c, 300 + i * 600, Y - 200, 0.8, st.t + i); }, over: (c, st) => cap(c, st, '9 мая 1945', 'Победа') },
  { at: 'Её цена', set: (c) => fillBg(c, '#141210'), cam: WIDE, to: [960, 540, 1.1], look: 'ash', draw: () => {}, over: (c, st) => { line(c, st, 'Около 27 000 000', 0.3, 480, 120, '#e8d8c0'); line(c, st, 'погибших советских людей', 0.9, 640, 60, '#a8a090'); } },
  { at: 'На приёме', set: setYalta, cam: CU(960, Y, 1), to: [960, 620, 2.0], look: 'gold', draw: (c, st) => { me(c, 7, 960, Y, 1, { ...talk(st), armR: -2.0 }); glassW(c, 1080, 520, 0.9); }, over: (c, st) => line(c, st, '«За здоровье русского народа»', at(st, 'тост'), 200, 64, '#f4e080') },
], { tr: 'black' });

// ===================== VIII. ГЕНЕРАЛИССИМУС =====================
card(40, 8);

stage(41, [
  { set: (c, st) => setOffice(c, st, { table: false }), cam: [960, 800, 1.3], to: [960, 520, 1.25], tilt: 0.02, look: 'gold', draw: (c, st) => me(c, 8, 960, Y, 1.05, { ...ip(st), expr: 'neutral' }), over: (c, st) => cap(c, st, 'Генералиссимус', 'Советского Союза, 1945') },
  { at: 'Твой портрет', set: (c, st) => setRoom(c, st, {}), cam: [960, 600, 1.05], to: [960, 560, 1.18], look: 'warm', draw: (c, st) => { portrait(c, 960, 420, 0.8, 8); for (let i = 0; i < 6; i++) kidM(c, 300 + i * 260, Y, 0.9, { ...pose.sit(st.t + i), head: -0.15 }, i); } },
  { at: 'Города, заводы', set: (c) => fillBg(c, '#2a2420'), cam: WIDE, to: [960, 540, 1.15], look: 'warm', draw: (c, st) => { ['СТАЛИНГРАД', 'СТАЛИНО', 'СТАЛИНАБАД', 'ЗАВОД ИМ. СТАЛИНА', 'УЛИЦА СТАЛИНА', 'СТАЛИНСК'].forEach((t, i) => { if (st.bt > i * 0.45) sign(c, 520 + (i % 2) * 880, 300 + Math.floor(i / 2) * 230, 0.95, t, i % 2 ? '#2a4a8a' : '#efe6cc'); }); } },
  { at: 'Тебя называют отцом', set: (c, st) => setHall(c, st, { banner: 'СЛАВА ВЕЛИКОМУ СТАЛИНУ' }), cam: [960, 400, 1.0], to: [960, 420, 1.12], look: 'gold', draw: (c, st) => portrait(c, 960, 520, 0.9, 8), over: (c, st) => line(c, st, '«Отец народов»', 0.6, 900, 80, '#f4e080') },
], { tr: 'black' });

stage(42, [
  { set: (c, st) => wSteppe(c, st, {}), cam: [960, 560, 1.0], to: [960, 500, 1.15], look: 'warm', shake: 4, draw: (c, st) => mushroomCloud(c, 960, 820, 1.0, clamp(st.bt / 3)), over: (c, st) => cap(c, st, '1949', 'испытание атомной бомбы'), sfx: [['rumble', 0.1, 1]] },
  { at: 'На твоё семидесятилетие', set: (c, st) => setHall(c, st, { banner: '70' }), cam: [960, 660, 1.15], to: [960, 640, 1.3], look: 'gold', draw: (c, st) => { for (let i = 0; i < 14; i++) { const x = 360 + (i % 7) * 200, y = 880 - Math.floor(i / 7) * 120; sfill(c, rr(x - 70, y - 90, 140, 90, 6), ['#c8261c', '#2a4a8a', '#c8962a', '#3a6a4a'][i % 4], 4); inkLine(c, [[x, y - 90], [x, y]], 6, '#efe6cc'); } } },
  { at: 'Но лагеря', set: setCamp, cam: [960, 600, 1.0], to: [960, 580, 1.1], look: 'cold', draw: (c, st) => { for (let i = 0; i < 6; i++) prisoner(c, 260 + i * 280, Y, 0.8, { ...pose.trudge(st.t + i) }, i); } },
  { at: 'Начинается холодная', set: (c) => fillBg(c, '#1a1c22'), cam: WIDE, to: [960, 540, 1.12], look: 'cold', draw: (c, st) => { c.save(); c.fillStyle = '#3a4a5a'; c.fillRect(300, 200, 640, 680); c.fillStyle = '#5a2a2a'; c.fillRect(980, 200, 640, 680); c.restore(); sfill(c, rr(940, 160, 40, 760 * clamp(st.bt / 2), 4), '#2a2a2e', 6); }, over: (c, st) => cap(c, st, 'Холодная война') },
], { tr: 'whip' });

stage(43, [
  { set: (c, st) => setDacha(c, st, { night: true }), cam: [960, 640, 1.1], to: [960, 620, 1.2], look: 'night', draw: (c, st) => old(c, 1040, Y, 0.95, { ...pose.sit(st.t), head: 0.15, expr: 'neutral' }), over: (c, st) => cap(c, st, 'Дача в Кунцево') },
  { at: 'Говорят, ты каждую', set: (c, st) => setDacha(c, st, { night: true }), cam: [400, 700, 1.3], to: [1500, 700, 1.3], ease: 'lin', look: 'night', draw: (c, st) => { for (let i = 0; i < 4; i++) { rect(c, -100 + i * 600, 860, 360, 80, '#3a3a2a', 16, 5); } } },
  { at: 'Ты не доверяешь', set: setStreetNight, cam: [960, 640, 1.1], to: [1000, 620, 1.2], look: 'night', draw: (c, st) => { man(c, 760, Y, 0.95, { ...ip(st), expr: 'shock' }, { hair: 'bald', glasses: 'round', mustache: 'small', outfit: 'suit' }, pal(SPAL.suit, { jacket: '#e8e4d8', pants: '#3a3a40' })); nkvd(c, 1000, Y, 0.95, ip(st)); voronok(c, 1500, Y, 0.9, st.t, -1, 0); }, over: (c, st) => cap(c, st, 'Дело врачей', '1952 1953') },
], { tr: 'black' });

stage(44, [
  { set: (c, st) => setDacha(c, st, {}), cam: [480, 600, 1.4], to: [480, 580, 1.55], look: 'ash', draw: (c, st) => { for (let i = 0; i < 2; i++) nkvd(c, 700 + i * 200, Y, 0.95, { ...ip(st, i), expr: 'neutral', flip: true }); }, over: (c, st) => cap(c, st, '1 марта 1953') },
  { at: 'Охрана ждёт', set: (c, st) => setDacha(c, st, { night: st.bt > 2 }), cam: [480, 560, 1.6], to: [480, 540, 1.8], look: 'ash', draw: (c, st) => { c.save(); c.translate(820, 300); sfill(c, el2(0, 0, 70, 70), '#efe6cc', 5); inkLine(c, [[0, 0], [Math.sin(st.t * 2) * 50, -Math.cos(st.t * 2) * 50]], 5); inkLine(c, [[0, 0], [Math.sin(st.t * 0.2) * 34, -Math.cos(st.t * 0.2) * 34]], 7); c.restore(); } },
  { at: 'Входить без вызова', set: (c, st) => setDacha(c, st, { night: true }), cam: [700, 640, 1.2], to: [700, 620, 1.35], look: 'night', draw: (c, st) => { for (let i = 0; i < 3; i++) nkvd(c, 700 + i * 180, Y, 0.95, { ...ip(st, i), expr: 'sad', flip: true, look: -1 }); } },
  { at: 'Поздно вечером', set: (c, st) => setDacha(c, st, { night: true }), cam: [700, 860, 1.6], to: [700, 860, 1.8], look: 'night', draw: (c, st) => old(c, 1000, Y, 0.95, { lean: -1.5, blink: 1, expr: 'sad' }) },
  { at: 'Врачи приезжают', set: (c, st) => setDacha(c, st, {}), cam: [960, 640, 1.1], to: [960, 620, 1.2], look: 'cold', draw: (c, st) => { for (let i = 0; i < 3; i++) man(c, 600 + i * 220, Y, 0.95, { ...pose.march(st.t + i), time: st.t }, { hair: i % 2 ? 'bald' : 'short', glasses: 'round', outfit: 'suit' }, pal(SPAL.suit, { jacket: '#e8e4d8', pants: '#3a3a40' })); } },
], { tr: 'cut' });

stage(45, [
  { set: (c) => fillBg(c, '#141210'), cam: WIDE, to: [960, 540, 1.15], look: 'ash', draw: (c, st) => frameBlack(c, 960, 540, 1.1, () => stalin(c, 8, 0, 690, 1.25, { expr: 'neutral' })), over: (c, st) => cap(c, st, '5 марта 1953', '74 года') },
  { at: 'На похороны', set: (c, st) => setRedSquare(c, st, { gray: true, name: 'ЛЕНИН' }), cam: [960, 560, 1.0], to: [960, 540, 1.1], look: 'ash', draw: (c, st) => { for (let r = 0; r < 4; r++) for (let i = 0; i < 16; i++) man(c, -200 + i * 160 + r * 60, Y - 220 + r * 80, 0.5 + r * 0.08, { ...ip(st, i + r), head: 0.2, expr: 'sad' }, { hair: ['short', 'kerchief', 'bald'][(i + r) % 3], female: (i + r) % 3 === 1, outfit: (i + r) % 3 === 1 ? 'dress' : 'coat', hat: (i + r) % 3 === 0 ? 'kepka' : 'none' }, (i + r) % 3 === 1 ? SPAL.keke : SPAL.coat); } },
  { at: 'Миллионы плачут', set: (c, st) => setRedSquare(c, st, { gray: true }), cam: TWO(820, 1120, Y, 1), to: [960, 620, 1.4], look: 'ash', draw: (c, st) => { man(c, 820, Y, 1, { ...ip(st), expr: 'sad', tear: true, time: st.t }, { female: true, hair: 'kerchief', outfit: 'dress' }, SPAL.keke); worker(c, 1120, Y, 1, { ...ip(st), expr: 'sad', head: 0.2 }, 1); } },
  { at: 'Миллионы молчат', set: setCamp, cam: [960, 640, 1.1], to: [960, 620, 1.2], look: 'cold', draw: (c, st) => { for (let i = 0; i < 5; i++) prisoner(c, 400 + i * 280, Y, 0.9, { ...ip(st, i), expr: 'neutral' }, i); } },
], { tr: 'black' });

stage(46, [
  { set: (c, st) => setHall(c, st, { banner: 'XX СЪЕЗД КПСС' }), cam: [960, 640, 1.1], to: [960, 600, 1.25], look: 'warm', draw: (c, st) => { rect(c, 760, 800, 260, 200, '#7a2a1c', 6, 6); khrush(c, 890, 860, 0.9, { ...talk(st), armR: -1.6 }); }, over: (c, st) => cap(c, st, 'Хрущёв, 1956', 'доклад о культе личности') },
  { at: 'Через восемь лет', set: (c, st) => { setRedSquare(c, st, { gray: true, name: st.bt < 2 ? 'ЛЕНИН СТАЛИН' : 'ЛЕНИН' }); dim(c, 0.55); }, cam: [760, 600, 1.4], to: [760, 620, 1.55], look: 'night', draw: () => {}, over: (c, st) => cap(c, st, '1961', 'тело выносят из Мавзолея') },
], { tr: 'cut' });

stage(47, [
  { set: setGori, cam: [960, 640, 1.1], to: [960, 620, 1.2], look: 'warm', draw: (c, st) => { gHouse(c, 1100, Y - 120, 0.9, 2); me(c, 1, 880, Y, 1, ip(st), { pocks: true }); } },
  { at: 'Ты построил', set: setBuild, cam: [960, 560, 1.0], to: [960, 540, 1.1], look: 'warm', draw: (c, st) => { for (let i = 0; i < 3; i++) t34(c, 200 + i * 560 + st.bt * 80, 960, 0.75, st.t, 1); } },
  { at: 'И ты отправил', set: setCamp, cam: [960, 600, 1.0], to: [960, 580, 1.08], look: 'cold', draw: (c, st) => { for (let i = 0; i < 8; i++) prisoner(c, 150 + i * 240 + st.bt * 20, Y, 0.8, pose.trudge(st.t + i), i); } },
  { at: 'Мать хотела', set: setChurchIn, cam: [960, 600, 1.1], to: [960, 560, 1.25], look: 'gold', draw: (c, st) => { keke(c, 760, Y, 0.95, { armR: -2.0, armL: 2.0, head: -0.1, expr: 'neutral' }); me(c, 2, 1150, Y, 0.95, { ...ip(st), expr: 'neutral' }); } },
  { at: 'Ты стал тем', set: (c, st) => setDacha(c, st, { night: true }), cam: [400, 560, 1.4], to: [400, 540, 1.6], look: 'night', draw: () => {}, over: (c, st) => { if (st.bt > st.bdur - 3) { c.fillStyle = `rgba(0,0,0,${clamp((st.bt - st.bdur + 3) / 2.5)})`; c.fillRect(0, 0, W, H); } } },
], { tr: 'black' });
