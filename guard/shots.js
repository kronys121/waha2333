// Imperial Guardsman: 8 levels, 53 paragraphs. Staged beats with a travelling camera (guard/engine4.js).
// Thread: Korvin's helmet with crooked notches; the Uplifting Primer; the sky the boy never saw.

const Y = 1000;
const card = (k, n) => shot(PT(k), (ctx, s) => eCard(ctx, n, s.lt), { fade: 0.4 });
const ip = (st, i = 0) => idlePose(st.t, i);
const talk = (st, i = 0, o = {}) => ({ ...idlePose(st.t, i), expr: 'talk', time: st.t, ...o });
const dim = (ctx, a = 0.45) => { ctx.fillStyle = `rgba(6,4,2,${a})`; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); };
const youth = (c, x, y, s, p = {}) => worker(c, x, y, s, p, 0, { hat: 'none' });
const shoot = (c, st, x, y, s, k = 0) => { const p = ((st.t * 1.6 + k * 0.37) % 1); lasBeam(c, x + 260 * s, y - 280 * s, x + 1400, y - 300 * s - 40, p); };

// ===================== I. ПРИЗЫВНИК =====================
card(0, 1);

stage(1, [
  { set: setHiveTop, cam: [960, 300, 1.0], to: [960, 700, 1.2], tilt: 0.02, look: 'warm', draw: () => {}, over: (c, st) => tCaption(c, 'Мир-улей Валгаст', st.lt, 0.5, 3.5) },
  { at: 'на сто сороковом', set: setHiveLow, cam: [960, 640, 1.1], to: [1100, 640, 1.2], look: 'ash', draw: (c, st) => { valve(c, 760, Y - 100, 1.2, st.t * 0.6); youth(c, 980, Y, 1, { ...ip(st), armL: -1.4 + Math.sin(st.t * 2) * 0.2, expr: 'sad' }); for (let i = 0; i < 3; i++) worker(c, 1300 + i * 220, Y - 40, 0.75, { ...ip(st, i), armR: -1.2 }, i); } },
  { at: 'мечтаешь', set: setHiveLow, cam: CU(980, Y, 1), to: [980, 560, 2.2], look: 'ash', draw: (c, st) => { youth(c, 980, Y, 1, { ...ip(st), head: -0.3, expr: 'neutral' }); c.save(); c.globalCompositeOperation = 'lighter'; beam(c, 980, 400, 200, 900, 0.25); c.restore(); } },
], { tr: 'black', look: 'ash' });

stage(2, [
  { set: setHiveTop, cam: [960, 600, 1.0], to: [960, 500, 1.1], look: 'warm', draw: (c, st) => { valkyrie(c, -200 + st.bt * 220, 260, 0.5, 1); } },
  { at: 'Империуму нужна', set: (c, st) => setParade(c, st), cam: [960, 560, 1.0], to: [960, 600, 1.15], look: 'ash', draw: (c, st) => { for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) worker(c, 140 + i * 210 + r * 40, 820 + r * 90, 0.55 + r * 0.06, { ...ip(st, i + r), head: 0.1 }, i + r); }, over: (c, st) => tCaption(c, 'Десятина', st.lt, st.ph('Империуму нужна') + (st.lt - st.bt), 3) },
  { at: 'В этот раз жребий', set: (c, st) => setParade(c, st), cam: CU(960, Y, 1), to: [960, 580, 2.0], look: 'ash', draw: (c, st) => { youth(c, 960, Y, 1, { ...ip(st), expr: 'shock' }); paperSign(c, 1250, 640, 0.35, ['ПРИЗЫВ', 'ПОЛК XIV']); } },
  { at: 'Мать плачет', set: setHiveLow, cam: TWO(820, 1150, Y, 1), to: [1060, 640, 1.7], look: 'warm', draw: (c, st) => { youth(c, 820, Y, 1, { ...ip(st), expr: 'sad' }); worker(c, 1150, Y, 0.95, { ...ip(st), flip: true, armL: -1.3, expr: 'sad', tear: true, time: st.t }, 1, { female: true, hat: 'kerchief' }); goldLight(c, 920, 620, 8, st.t, 0.8); } },
  { at: 'Отец говорит', set: setHiveLow, cam: TWO(820, 1150, Y, 1), to: [960, 640, 1.4], look: 'warm', draw: (c, st) => { youth(c, 820, Y, 1, { ...ip(st), armR: -0.9 }); worker(c, 1150, Y, 1, { ...talk(st), flip: true, armL: -0.9 }, 0, { mustache: true, gray: true }); } },
  { at: 'полки с Валгаста', set: (c, st) => setHiveTop(c, st), cam: [960, 500, 1.0], to: [960, 360, 1.15], look: 'ash', draw: (c, st) => { for (let i = 0; i < 3; i++) valkyrie(c, 2000 - st.bt * 300 - i * 260, 220 + i * 60, 0.35, -1); }, over: (c, st) => tLine(c, 'Никогда.', st.bt, st.ph('Никогда'), 3, 860, 90) },
], { tr: 'whip' });

stage(3, [
  { set: setBunks, cam: [700, 640, 1.2], to: [1200, 640, 1.2], look: 'warm', draw: (c, st) => { for (let i = 0; i < 5; i++) trooper(c, 300 + i * 300, Y, 0.9, { ...ip(st, i), expr: 'neutral' }, i); hero(c, 1, 960, Y + 20, 0.95, { ...ip(st), expr: 'shock' }, { bag: false }); } },
  { at: 'Солдаты называют', set: setRange, cam: [900, 700, 1.4], to: [1000, 680, 1.6], look: 'warm', draw: (c, st) => { hero(c, 1, 820, Y, 1, { gunA: -0.1, expr: 'happy' }); c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(1100, 700, 10, 1100, 700, 200); g.addColorStop(0, 'rgba(255,230,180,0.7)'); g.addColorStop(1, 'rgba(255,230,180,0)'); c.fillStyle = g; c.fillRect(900, 500, 400, 400); c.restore(); }, over: (c, st) => tLine(c, '«ФОНАРИК»', st.bt, 0.4, 2.5, 200, 110, '#f4e080') },
  { at: 'Сержант объясняет', set: setRange, cam: TWO(760, 1180, Y, 1), to: [960, 640, 1.3], look: 'warm', draw: (c, st) => { gman(c, 760, Y, 1, { ...talk(st), armR: -1.2 }, { hat: 'gh', weapon: 'none', flak: true, tresse: true, mustache: true, gray: true }); hero(c, 1, 1180, Y, 1, { ...ip(st), flip: true }); campfire2(c, 980, Y - 20, 1, st.t); } },
  { at: 'Главное, чтобы', set: setRange, cam: [1100, 560, 1.2], to: [1100, 520, 1.4], look: 'warm', draw: (c, st) => { hero(c, 1, 700, Y, 0.9, pose.fire(st.t)); shoot(c, st, 700, Y, 0.9); }, over: (c, st) => tLine(c, 'Прожить это долго', st.bt, 0.5, 3, 200, 76) },
], { tr: 'cut' });

stage(4, [
  { set: (c, st) => { setBunks(c, st); dim(c, 0.4); }, cam: WIDE, to: [960, 540, 1.2], look: 'warm', draw: (c, st) => primer(c, 960, 540, 1.6, 0, Math.sin(st.t * 0.5) * 0.04), over: (c, st) => tCaption(c, 'Воодушевляющий букварь', st.lt, 0.5, 3.5, 'имперского пехотинца') },
  { at: 'В ней написано', set: (c) => fillBg(c, '#e8dcbc'), cam: [960, 540, 1.1], to: [960, 600, 1.25], look: 'warm', draw: (c, st) => { const lines = ['§1. Чистка лазгана', '§2. Как распознать мутанта', '§3. Сомнение есть начало ереси']; lines.forEach((l, i) => { c.save(); c.globalAlpha = clamp((st.bt - i * 1.0) / 0.5); c.fillStyle = '#3a2a1a'; c.font = '700 64px "Old Standard TT"'; c.fillText(l, 360, 380 + i * 140); c.restore(); }); } },
  { at: 'Половину ты не понимаешь', set: setBunks, cam: CU(960, Y, 1), to: [960, 600, 2.1], look: 'warm', draw: (c, st) => { hero(c, 1, 960, Y, 1, { ...pose.write(st.t), expr: 'shock' }, { hat: 'none', weapon: 'none' }); primer(c, 1100, 860, 0.3, 0, 0.3); } },
  { at: 'потому что за ошибку бьют', set: setBunks, cam: [960, 640, 1.1], to: [1100, 620, 1.3], look: 'warm', shake: 3, draw: (c, st) => { gman(c, 1250, Y, 1, { ...talk(st), expr: 'angry', armR: -1.6 + Math.sin(st.t * 10) * 0.3, flip: true }, { hat: 'gh', weapon: 'none', flak: true, tresse: true, mustache: true }); hero(c, 1, 880, Y, 1, { expr: 'grit', head: 0.1 }); } },
], { tr: 'black' });

stage(5, [
  { set: setRange, cam: [600, 700, 1.15], to: [1300, 700, 1.15], ease: 'lin', look: 'warm', draw: (c, st) => { for (let i = 0; i < 5; i++) trooper(c, 200 + i * 280 + st.bt * 120, Y, 0.9, pose.run(st.t + i * 0.2, 0.8), i); } },
  { at: 'ползаешь', set: setRange, cam: [960, 800, 1.5], to: [1100, 820, 1.6], look: 'warm', draw: (c, st) => { for (let i = 0; i < 3; i++) hero(c, 1, 600 + i * 400 + st.bt * 60, Y + 20, 0.9, pose.crawl(st.t + i)); } },
  { at: 'Инструктор орёт', set: setRange, cam: CU(1150, Y, 1), to: [1150, 560, 2.4], look: 'warm', shake: 4, draw: (c, st) => gman(c, 1150, Y, 1, { ...talk(st), expr: 'angry', flip: true }, { hat: 'gh', weapon: 'none', flak: true, tresse: true, mustache: true }) },
  { at: 'Через шесть недель', set: setParade, cam: [960, 640, 1.1], to: [960, 600, 1.25], look: 'gold', draw: (c, st) => { for (let i = 0; i < 7; i++) trooper(c, 260 + i * 240, Y, 0.9, { ...pose.salute(), expr: 'neutral' }, i); hero(c, 1, 960, Y + 30, 0.95, { ...pose.salute() }); } },
], { tr: 'whip' });

stage(6, [
  { set: setBunks, cam: TWO(800, 1150, Y, 1), to: [1150, 600, 1.8], look: 'warm', draw: (c, st) => { hero(c, 1, 800, Y, 1, { ...ip(st), look: 1 }); korvin(c, 1150, Y, 1, { ...talk(st), flip: true, expr: 'happy' }); }, over: (c, st) => tCaption(c, 'Корвин', st.lt, 0.6, 3) },
  { at: 'Он храпит', set: (c, st) => { setBunks(c, st); dim(c, 0.4); }, cam: [960, 560, 1.4], to: [960, 600, 1.6], look: 'night', draw: (c, st) => { korvin(c, 1050, 520, 0.7, { lean: -1.5, blink: 1, bob: Math.sin(st.t * 2) * 4 }); for (let i = 0; i < 3; i++) { c.save(); c.globalAlpha = (1 - ((st.t * 0.5 + i / 3) % 1)); c.fillStyle = '#f4ead4'; c.font = '700 50px "Old Standard TT"'; c.fillText('z', 800 - ((st.t * 30 + i * 40) % 120), 420 - ((st.t * 40 + i * 50) % 150)); c.restore(); } } },
  { at: 'ворует твой паёк', set: setBunks, cam: [960, 680, 1.4], to: [1050, 660, 1.6], look: 'warm', draw: (c, st) => { hero(c, 1, 760, Y, 1, { ...pose.sit(st.t), expr: 'angry' }, { weapon: 'none' }); korvin(c, 1150, Y, 1, { ...pose.run(st.t, 0.5), expr: 'happy', flip: true }, { weapon: 'none' }); ration(c, 1100 + st.bt * 40, 740, 0.4); } },
  { at: 'Через неделю ты понимаешь', set: setBunks, cam: TWO(820, 1100, Y, 1), to: [960, 620, 1.5], look: 'home', draw: (c, st) => { hero(c, 1, 820, Y, 1, { ...ip(st), expr: 'happy', armR: 0.6 }); korvin(c, 1100, Y, 1, { ...ip(st), expr: 'happy', armL: -0.6, flip: true }); } },
], { tr: 'cut' });

// ===================== II. ГВАРДЕЕЦ =====================
card(7, 2);

stage(8, [
  { set: setHold, cam: [960, 640, 1.0], to: [960, 600, 1.2], look: 'blood', draw: (c, st) => { for (let i = 0; i < 8; i++) trooper(c, 120 + i * 240, Y + (i % 2) * 20, 0.8, { ...pose.sit(st.t + i), head: 0.2 }, i); } },
  { at: 'смотреть в иллюминатор', set: setHold, cam: [1400, 460, 1.4], to: [1500, 420, 1.8], look: 'warp', draw: (c, st) => { porthole(c, 1500, 380, 160, st.t); } },
  { at: 'Корвин говорит', set: setHold, cam: TWO(800, 1120, Y, 1), to: [960, 640, 1.5], look: 'blood', draw: (c, st) => { hero(c, 2, 800, Y, 1, { ...pose.sit(st.t), expr: 'shock' }); korvin(c, 1120, Y, 1, { ...pose.sit(st.t + 1), ...talk(st), flip: true, head: 0.2 }); } },
], { tr: 'black' });

stage(9, [
  { set: setForge, cam: [960, 600, 1.0], to: [1100, 560, 1.15], look: 'fire', shake: 2, draw: (c, st) => { for (let i = 0; i < 5; i++) trooper(c, 300 + i * 200 + st.bt * 40, Y, 0.85, pose.run(st.t + i * 0.2, 0.8), i); }, over: (c, st) => tCaption(c, 'Мир-кузница', st.lt, 0.5, 3, 'захвачен орками') },
  { at: 'Ты впервые видишь орка', set: setForge, cam: [1300, 560, 1.15], to: [1300, 500, 1.4], look: 'fire', draw: (c, st) => { ork(c, 1300, Y, 1.3, { ...walkPose(st.t, 0.6, 0.3), armL: -1.4 }); hero(c, 2, 600, Y, 0.85, { ...ip(st), expr: 'shock' }); } },
  { at: 'Ты стреляешь в него', set: setForge, cam: [960, 600, 1.1], to: [800, 600, 1.2], look: 'fire', shake: 3, draw: (c, st) => { hero(c, 2, 500, Y, 0.9, pose.fire(st.t)); for (let k = 0; k < 4; k++) shoot(c, st, 500, Y, 0.9, k); ork(c, 1500 - st.bt * 150, Y, 1.3, walkPose(st.t, 1.6, 0.5)); } },
  { at: 'Его останавливает', set: setForge, cam: [1100, 600, 1.2], to: [1100, 560, 1.35], look: 'fire', draw: (c, st) => { ork(c, 1200, Y, 1.3, { lean: 0.3 * clamp(st.bt / 1.5) }); fireFX(c, 1200, Y - 100, 1.5, st.t, 4); trooper(c, 700, Y, 0.9, { gunA: -0.1 }, 3, { weapon: 'rifle' }); } },
  { at: 'Ты понимаешь, что в учебке', set: setForge, cam: CU(960, Y, 0.9), to: [960, 580, 2.1], look: 'fire', draw: (c, st) => hero(c, 2, 960, Y, 0.9, { ...ip(st), expr: 'shock' }) },
], { tr: 'flash' });

stage(10, [
  { set: (c, st) => setTrenchG(c, st, {}), cam: [960, 640, 1.1], to: [960, 600, 1.25], look: 'ash', draw: (c, st) => { hero(c, 2, 960, 960, 0.95, { ...ip(st), expr: 'grit' }); }, over: (c, st) => tLine(c, '15 ЧАСОВ', st.bt, 0.5, 3, 200, 120, '#f4ead4') },
  { at: 'Ты просто считаешь', set: (c) => fillBg(c, '#1a1612'), cam: WIDE, to: [960, 540, 1.2], look: 'ash', draw: (c, st) => { const nums = ['20', '40', '100']; nums.forEach((n, i) => { const a = 0.6 + i * 1.0; if (st.bt < a) return; c.save(); c.globalAlpha = clamp((st.bt - a) / 0.3) * (st.bt > 3.6 ? 0.3 : 1); c.fillStyle = '#e8d8b0'; c.font = '700 160px "Old Standard TT"'; c.textAlign = 'center'; c.fillText(n, 500 + i * 460, 600); c.restore(); }); } },
], { tr: 'cut' });

stage(11, [
  { set: (c, st) => setTrenchG(c, st, {}), cam: [960, 640, 1.1], to: [1100, 620, 1.2], look: 'ash', draw: (c, st) => { for (let i = 0; i < 4; i++) ammoBox(c, 900 + i * 180, 900, 0.5, 0); trooper(c, 600, 960, 0.9, { ...ip(st), armR: -1 }, 2); } },
  { at: 'Паёк называется', set: (c) => fillBg(c, '#3a3a30'), cam: WIDE, to: [960, 540, 1.25], look: 'ash', draw: (c, st) => ration(c, 960, 540, 2.4) },
  { at: 'Корвин говорит', set: (c, st) => setTrenchG(c, st, {}), cam: TWO(800, 1120, 960, 1), to: [960, 600, 1.6], look: 'warm', draw: (c, st) => { hero(c, 2, 800, 960, 1, { ...pose.sit(st.t), expr: st.A('Ты смеёшься') > 0 ? 'happy' : 'neutral' }, { weapon: 'none' }); korvin(c, 1120, 960, 1, { ...pose.sit(st.t + 1), ...talk(st), flip: true }, { weapon: 'none' }); ration(c, 960, 800, 0.35); } },
], { tr: 'whip' });

stage(12, [
  { set: (c, st) => setTrenchG(c, st, { night: true }), cam: TWO(800, 1120, 960, 1), to: [960, 620, 1.5], look: 'night', draw: (c, st) => { hero(c, 2, 800, 960, 1, { ...pose.sit(st.t), expr: 'neutral' }); korvin(c, 1120, 960, 1, { ...pose.sit(st.t + 1), ...talk(st), flip: true, head: -0.15 }); } },
  { at: 'Наверху, на первом уровне', set: setHiveTop, cam: [960, 560, 1.1], to: [960, 600, 1.25], look: 'home', draw: (c, st) => { c.save(); c.globalAlpha = 0.85; rect(c, 660, 560, 600, 340, '#8a6a4a', 8, 6); rect(c, 720, 600, 200, 140, '#ffe0a0', 6, 4); rect(c, 1000, 600, 200, 140, '#ffe0a0', 6, 4); c.fillStyle = '#f4ead4'; c.font = '700 54px "Old Standard TT"'; c.textAlign = 'center'; c.fillText('ТАВЕРНА КОРВИНА', 960, 530); korvin(c, 960, 900, 0.7, { ...ip(st), expr: 'happy' }, { hat: 'none', weapon: 'none' }); c.restore(); } },
  { at: 'Вы оба делаете вид', set: (c, st) => setTrenchG(c, st, { night: true }), cam: CU(800, 960, 1), to: [820, 540, 2.0], look: 'night', draw: (c, st) => { hero(c, 2, 800, 960, 1, { ...pose.sit(st.t), expr: 'happy' }); korvin(c, 1120, 960, 1, { ...pose.sit(st.t + 1), flip: true, expr: 'happy' }); } },
], { tr: 'black' });

stage(13, [
  { set: (c, st) => setTrenchG(c, st, {}), cam: [960, 640, 1.05], to: [960, 600, 1.15], look: 'ash', draw: (c, st) => { for (let i = 0; i < 10; i++) { c.save(); c.globalAlpha = i % 2 ? 0.15 : 1; trooper(c, 120 + i * 190, 960, 0.8, ip(st, i), i); c.restore(); } } },
  { at: 'Просто в списке', set: (c) => fillBg(c, '#e8dcbc'), cam: WIDE, to: [960, 560, 1.2], look: 'warm', draw: (c, st) => { const names = ['Аррен', 'Бекк', 'Вальд', 'Грисс', 'ТЫ', 'Дорн', 'Корвин', 'Лейс']; c.font = '700 48px "Old Standard TT"'; names.forEach((n, i) => { c.fillStyle = '#3a2a1a'; c.fillText(n, 600, 220 + i * 90); if ((i === 4 || i === 6) && st.bt > 1) { c.strokeStyle = '#2a6a2a'; c.lineWidth = 8; c.beginPath(); c.moveTo(1150, 205 + i * 90); c.lineTo(1180, 230 + i * 90); c.lineTo(1240, 175 + i * 90); c.stroke(); } if (i % 2 && i !== 6 && st.bt > 0.5) { c.fillStyle = '#3a2a1a'; c.fillRect(590, 205 + i * 90, 380, 6); } }); } },
], { tr: 'cut' });

// ===================== III. ВЕТЕРАН =====================
card(14, 3);

stage(15, [
  { set: (c, st) => setTrenchG(c, st, {}), cam: [960, 640, 1.1], to: [960, 600, 1.25], look: 'ash', shake: 2, draw: (c, st) => { hero(c, 3, 960, 960, 0.95, { ...ip(st), expr: 'neutral' }); for (let i = 0; i < 2; i++) blastFX(c, 300 + i * 1300, 700, 1, ((st.bt + i) % 2.4) - 0.2, i); }, over: (c, st) => tCaption(c, 'Три года. Пять миров.', st.lt, 0.4, 3.5) },
  { at: 'Новички смотрят', set: (c, st) => setTrenchG(c, st, {}), cam: [960, 640, 1.15], to: [1100, 620, 1.25], look: 'ash', draw: (c, st) => { hero(c, 3, 700, 960, 0.95, ip(st)); for (let i = 0; i < 4; i++) trooper(c, 1050 + i * 200, 960, 0.85, { ...ip(st, i), expr: 'shock', look: -1 }, i); } },
  { at: 'Секрета нет', set: (c, st) => setTrenchG(c, st, {}), cam: CU(960, 960, 0.95), to: [960, 520, 2.2], look: 'ash', draw: (c, st) => hero(c, 3, 960, 960, 0.95, { ...ip(st), expr: 'neutral' }) },
], { tr: 'black' });

stage(16, [
  { set: (c) => fillBg(c, '#3a3830'), cam: WIDE, to: [1000, 520, 1.3], look: 'warm', draw: (c, st) => { helmetProp(c, 640, 560, 1.4, 5, false); helmetProp(c, 1280, 560, 1.4, 4, true); } },
  { at: 'Он всё ещё шутит', set: (c, st) => setTrenchG(c, st, {}), cam: TWO(800, 1120, 960, 1), to: [1120, 560, 1.8], look: 'ash', draw: (c, st) => { hero(c, 3, 800, 960, 1, ip(st)); korvin(c, 1120, 960, 1, { ...talk(st), flip: true, expr: 'neutral' }); } },
], { tr: 'cut' });

stage(17, [
  { set: setIce, cam: [960, 600, 1.05], to: [960, 500, 1.2], look: 'cold', draw: (c, st) => { for (let i = 0; i < 6; i++) trooper(c, 200 + i * 300, Y, 0.85, { gunA: -0.1, expr: 'grit' }, i, { coat: true }); }, over: (c, st) => tCaption(c, 'Ледяной мир', st.lt, 0.4, 3) },
  { at: 'Небо чернеет', set: setIce, cam: [960, 300, 1.0], to: [960, 400, 1.1], look: 'cold', shake: 2, draw: (c, st) => { const r = rng(4); c.fillStyle = '#2a1a2a'; for (let i = 0; i < 60; i++) { const x = (r() * 2800 + st.t * 120) % 2800 - 400, y = r() * 500; c.beginPath(); c.moveTo(x, y); c.lineTo(x - 30, y - 16 - Math.sin(st.t * 12 + i) * 8); c.lineTo(x + 30, y - 16 - Math.sin(st.t * 12 + i) * 8); c.fill(); } } },
  { at: 'Твари не кричат', set: setIce, cam: [1100, 600, 1.05], to: [900, 600, 1.15], look: 'cold', shake: 4, blur: true, draw: (c, st) => { for (let i = 0; i < 9; i++) nid(c, 2200 - i * 150 - st.bt * 200, Y + (i % 3) * 30, 0.5 + (i % 3) * 0.1, walkPose(st.t + i, 1.6, 0.4)); for (let i = 0; i < 3; i++) { trooper(c, 300 + i * 200, Y, 0.85, pose.fire(st.t + i), i, { coat: true }); shoot(c, st, 300 + i * 200, Y, 0.85, i); } } },
  { at: 'В ту ночь', set: (c, st) => { setIce(c, st); dim(c, 0.4); }, cam: [960, 640, 1.1], to: [960, 600, 1.0], look: 'cold', draw: (c, st) => { for (let i = 0; i < 7; i++) helmetProp(c, 200 + i * 260, 980 + (i % 2) * 20, 0.35, 0, false, (i % 3 - 1) * 0.4); } },
], { tr: 'flash' });

stage(18, [
  { set: setIce, cam: [960, 640, 1.1], to: [1100, 640, 1.2], look: 'cold', draw: (c, st) => { korvin(c, 960, Y, 0.95, { lean: -0.4, expr: 'grit' }, { coat: true }); c.fillStyle = '#9a1a14'; c.beginPath(); c.ellipse(940, Y - 10, 40, 12, 0, 0, Math.PI * 2); c.fill(); } },
  { at: 'Ты тащишь его', set: setIce, cam: [600, 640, 1.15], to: [1300, 640, 1.15], ease: 'lin', look: 'cold', draw: (c, st) => { const x = 500 + st.bt * 90; hero(c, 3, x, Y, 0.95, { ...pose.trudge(st.t), lean: 0.2 }, { coat: true }); korvin(c, x - 40, Y - 330, 0.7, { lean: 1.3, expr: 'talk', time: st.t }, { coat: true, weapon: 'none' }); } },
  { at: 'В госпитале', set: setHospitalG, cam: TWO(800, 1150, Y, 1), to: [980, 640, 1.6], look: 'warm', draw: (c, st) => { korvin(c, 1150, 840, 0.75, { lean: -1.5, ...talk(st) }, { hat: 'none', weapon: 'none' }); hero(c, 3, 760, Y, 1, { ...ip(st), expr: st.A('паёк вернёшь') > 0 ? 'happy' : 'neutral' }, { weapon: 'none' }); }, over: (c, st) => tLine(c, '«Паёк вернёшь»', st.bt, st.ph('паёк вернёшь'), 3, 200, 76) },
], { tr: 'whip' });

stage(19, [
  { set: (c) => fillBg(c, '#2a2620'), cam: WIDE, to: [960, 540, 1.3], look: 'warm', draw: (c, st) => medalSmall(c, 960, 560, 2.6) },
  { at: 'Её вручает комиссар', set: setParade, cam: TWO(760, 1160, Y, 1), to: [1160, 560, 1.7], look: 'ash', draw: (c, st) => { hero(c, 3, 760, Y, 1, { ...pose.salute() }); commissar(c, 1160, Y, 1.05, { ...ip(st), armL: -1.0, flip: true }); medalSmall(c, 820, 700, 0.3); } },
  { at: 'Он смотрит на тебя', set: setParade, cam: CU(1160, Y, 1.05), to: [1160, 560, 2.5], look: 'ash', draw: (c, st) => commissar(c, 1160, Y, 1.05, { ...ip(st), flip: true, expr: 'neutral' }) },
], { tr: 'black' });

stage(20, [
  { set: setBunks, cam: TWO(800, 1120, Y, 1), to: [960, 640, 1.5], look: 'warm', draw: (c, st) => { hero(c, 3, 800, Y, 1, { ...pose.sit(st.t) }, { weapon: 'none', hat: 'none' }); korvin(c, 1120, Y, 1, { ...pose.sit(st.t + 1), ...talk(st), flip: true, armL: -1 + Math.sin(st.t * 6) * 0.2 }, { weapon: 'none', hat: 'none' }); medalSmall(c, 980, 740, 0.25); } },
  { at: 'Он кивает', set: setBunks, cam: CU(1120, Y + 150, 1), to: [1120, 600, 2.2], look: 'warm', draw: (c, st) => korvin(c, 1120, Y, 1, { ...pose.sit(st.t + 1), flip: true, expr: 'sad', head: 0.1 }, { weapon: 'none', hat: 'none' }) },
], { tr: 'cut' });

// ===================== IV. СЕРЖАНТ =====================
card(21, 4);

stage(22, [
  { set: (c, st) => setTrenchG(c, st, {}), cam: [960, 640, 1.1], to: [960, 600, 1.25], look: 'ash', draw: (c, st) => { gman(c, 960, 960, 1, { lean: st.bt > 0.6 ? -1.5 * clamp((st.bt - 0.6) / 0.4) : 0, expr: 'shock' }, { hat: 'gh', weapon: 'none', flak: true, tresse: true, mustache: true }); }, over: (c, st) => tCaption(c, 'Сержант Хальд', st.lt, 0.3, 2.5) },
  { at: 'Так ты становишься', set: (c, st) => setTrenchG(c, st, {}), cam: [960, 600, 1.2], to: [960, 560, 1.4], look: 'gold', draw: (c, st) => { hero(c, 4, 960, 960, 1, { ...ip(st), expr: 'grit', armR: -1.4 }); sword(c, 1070, 690, 0.4, 0.1, 0, st.t); } },
  { at: 'десять человек', set: (c, st) => setTrenchG(c, st, {}), cam: [960, 640, 1.05], to: [960, 600, 1.15], look: 'ash', draw: (c, st) => { for (let i = 0; i < 10; i++) trooper(c, 120 + i * 185, 960, 0.75, ip(st, i), i); } },
], { tr: 'black' });

stage(23, [
  { set: setRange, cam: [960, 640, 1.1], to: [1100, 620, 1.25], look: 'warm', draw: (c, st) => { for (let i = 0; i < 6; i++) trooper(c, 900 + i * 180, Y, 0.78, { ...ip(st, i), expr: 'shock', look: -1 }, i, { mustache: false }); hero(c, 4, 600, Y, 1, ip(st)); } },
  { at: 'Ты учишь их', set: (c, st) => setTrenchG(c, st, {}), cam: [960, 620, 1.15], to: [960, 580, 1.25], look: 'warm', draw: (c, st) => { hero(c, 4, 700, 960, 1, { ...talk(st), armR: -1.3 }); for (let i = 0; i < 3; i++) trooper(c, 1050 + i * 250, 960, 0.85, pose.dig(st.t + i), i, { weapon: 'shovel' }); ['КОПАТЬ ГЛУБЖЕ', 'НЕ СТРЕЛЯТЬ ВСЛЕПУЮ', 'ДЕРЖАТЬ ФОНАРИК В СУХОСТИ', 'НЕ ВЕРИТЬ ТИШИНЕ'].forEach((tx, i) => { const a = st.ph(['Копать', 'Не стрелять', 'Держать', 'Никогда не верить'][i]); if (a < 1e7 && st.bt > a && st.bt < a + 1.8) tLine(c, tx, st.bt, a, 1.4, 180, 70, '#f4e080'); }); } },
], { tr: 'whip' });

stage(24, [
  { set: (c, st) => setTrenchG(c, st, {}), cam: [960, 620, 1.05], to: [700, 620, 1.15], look: 'ash', blur: true, draw: (c, st) => { trooper(c, 1100 - st.bt * 240, 960, 0.85, { ...pose.run(st.t, 1.2), flip: true, expr: 'shock' }, 1, { weapon: 'none' }); } },
  { at: 'Комиссар поднимает', set: (c, st) => setTrenchG(c, st, {}), cam: [1200, 560, 1.4], to: [1200, 520, 1.8], look: 'ash', draw: (c, st) => commissar(c, 1200, 960, 1, { armR: -1.6, expr: 'angry', flip: true }) },
  { at: 'Ты встаёшь между', set: (c, st) => setTrenchG(c, st, {}), cam: [960, 620, 1.1], to: [960, 600, 1.3], look: 'ash', draw: (c, st) => { trooper(c, 500, 960, 0.85, { ...ip(st), expr: 'shock', flip: true }, 1, { weapon: 'none' }); hero(c, 4, 860, 960, 1, { armL: 1.4, armR: -1.4, expr: 'grit' }); commissar(c, 1350, 960, 1, { armR: -1.6, expr: 'angry', flip: true }); } },
  { at: 'Комиссар долго смотрит', set: (c, st) => setTrenchG(c, st, {}), cam: CU(1350, 960, 1), to: [1350, 520, 2.4], look: 'ash', draw: (c, st) => commissar(c, 1350, 960, 1, { armR: st.A('Потом опускает') > 0 ? 0 : -1.6, expr: 'neutral', flip: true }) },
  { at: 'Через неделю он погибает', set: (c, st) => { setTrenchG(c, st, {}); dim(c, 0.4); }, cam: [960, 760, 1.3], to: [960, 780, 1.5], look: 'ash', draw: (c, st) => { trooper(c, 1100, 960, 0.85, { lean: -1.5, blink: 1 }, 1, { weapon: 'none' }); trooper(c, 700, 960, 0.85, { ...pose.sit(st.t), expr: 'sad' }, 3, { weapon: 'none' }); } },
], { tr: 'cut' });

stage(25, [
  { set: setBunks, cam: [960, 760, 1.4], to: [960, 720, 1.6], look: 'warm', draw: (c, st) => { hero(c, 4, 960, Y, 1.1, pose.write(st.t), { weapon: 'letter', hat: 'none' }); primer(c, 1180, 860, 0.25, 0, 0.2); }, over: (c, st) => letterLine(c, 'Ваш сын погиб с честью, во славу Императора...', st.bt, 0.4) },
], { tr: 'black' });

stage(26, [
  { set: setBunks, cam: [960, 640, 1.15], to: [960, 600, 1.3], look: 'warm', draw: (c, st) => { hero(c, 4, 760, Y, 1, { ...ip(st), armR: -1.0, expr: 'sad' }, { weapon: 'letter', hat: 'none' }); letterStack(c, 1200, 900, 0.4, Math.floor(st.bt * 3)); } },
  { at: 'Ты не рассказываешь', set: (c, st) => { setTrenchG(c, st, {}); }, cam: [960, 560, 1.0], to: [960, 600, 1.1], look: 'ash', draw: (c, st) => { hero(c, 4, 960, 960, 0.9, { ...ip(st), expr: 'sad' }, { weapon: 'letter' }); for (let i = 0; i < 3; i++) smokeFX(c, 300 + i * 600, 900, st.t, 1.3, i, '50,46,42', 0.5); } },
  { at: 'Ты складываешь', set: setBunks, cam: [1100, 760, 1.6], to: [1100, 720, 2.0], look: 'warm', draw: (c, st) => { ammoBox(c, 1100, 900, 0.9, Math.min(30, Math.floor(st.bt * 6))); } },
], { tr: 'cut' });

// ===================== V. ЛЕЙТЕНАНТ =====================
card(27, 5);

stage(28, [
  { set: setParade, cam: [960, 600, 1.15], to: [960, 540, 1.35], look: 'gold', draw: (c, st) => hero(c, 5, 960, Y, 1, { ...pose.salute() }), over: (c, st) => tCaption(c, 'Лейтенант', st.lt, 0.4, 3) },
  { at: 'взвод из сорока', set: setParade, cam: [960, 640, 1.0], to: [960, 600, 1.1], look: 'ash', draw: (c, st) => { for (let r = 0; r < 4; r++) for (let i = 0; i < 10; i++) trooper(c, 120 + i * 185 + r * 30, 760 + r * 70, 0.45 + r * 0.05, ip(st, i + r), i + r); } },
  { at: 'Корвина ты забираешь', set: setParade, cam: TWO(800, 1120, Y, 1), to: [1120, 560, 1.8], look: 'warm', draw: (c, st) => { hero(c, 5, 800, Y, 1, ip(st)); korvin(c, 1120, Y, 1, { ...talk(st), flip: true, expr: 'happy' }, { tresse: true }); } },
], { tr: 'light' });

stage(29, [
  { set: (c, st) => setTrenchG(c, st, {}), cam: TWO(800, 1120, 960, 1), to: [960, 600, 1.4], look: 'ash', draw: (c, st) => { hero(c, 5, 800, 960, 1, ip(st)); trooper(c, 1120, 960, 0.95, { ...ip(st), flip: true, armL: -1.3 }, 2, { bag: true }); rect(c, 1150, 640, 70, 120, '#4a4e3c', 8, 5); rect(c, 1180, 560, 6, 90, '#2a2a2a', 2, 2); } },
  { at: 'Оно требует', set: (c, st) => setHill(c, st, { cultists: true }), cam: [960, 460, 1.1], to: [1000, 420, 1.4], look: 'ash', draw: () => {}, over: (c, st) => tLine(c, 'Взять высоту к утру', st.bt, 0.3, 3, 860, 70) },
  { at: 'Высоту, которую уже трижды', set: (c, st) => { setHill(c, st, {}); }, cam: [960, 640, 1.05], to: [960, 700, 1.15], look: 'ash', draw: (c, st) => { for (let i = 0; i < 9; i++) helmetProp(c, 200 + i * 200, 900 + (i % 2) * 30, 0.3, 0, false, (i % 3 - 1) * 0.5); } },
], { tr: 'whip' });

stage(30, [
  { set: (c, st) => setHill(c, st, { dusk: true, flag: true }), cam: [960, 600, 1.0], to: [1000, 400, 1.3], look: 'blood', draw: (c, st) => { for (let i = 0; i < 6; i++) trooper(c, 500 + i * 140, 520 - Math.abs(i - 3) * 20, 0.35, { armR: -2.2 }, i); }, over: (c, st) => tLine(c, '40 → 19', st.bt, st.ph('Из сорока'), 3, 860, 100) },
  { at: 'Тебя поздравляют', set: (c, st) => setHill(c, st, { dusk: true }), cam: CU(960, 900, 1), to: [960, 480, 2.2], look: 'blood', draw: (c, st) => hero(c, 5, 960, 900, 1, { ...ip(st), expr: 'sad' }) },
  { at: 'Через два дня', set: (c, st) => setHill(c, st, { cultists: true }), cam: [960, 460, 1.1], to: [960, 500, 1.0], look: 'ash', draw: () => {}, over: (c, st) => tLine(c, 'Изменился план.', st.bt, st.ph('изменился план'), 3, 860, 80) },
], { tr: 'black' });

stage(31, [
  { set: (c, st) => setTrenchG(c, st, {}), cam: [700, 560, 1.15], to: [1300, 560, 1.2], look: 'ash', draw: (c, st) => lemanRuss(c, 600 + st.bt * 50, 760, 1.1, st.t, 1, st.bt % 3 < 0.2 ? 1 : 0), over: (c, st) => tCaption(c, 'Леман Расс', st.lt, 0.4, 3) },
  { at: 'Его экипаж', set: (c, st) => setTrenchG(c, st, {}), cam: [800, 480, 1.4], to: [900, 460, 1.6], look: 'ash', draw: (c, st) => { lemanRuss(c, 900, 760, 1.1, st.t, 1); gman(c, 880, 470, 0.6, { ...ip(st), head: -0.2 }, { hat: 'cap', weapon: 'none' }, GP.officer); } },
  { at: 'Корвин говорит', set: (c, st) => setTrenchG(c, st, {}), cam: CU(1100, 960, 1), to: [1100, 520, 2.1], look: 'ash', draw: (c, st) => korvin(c, 1100, 960, 1, { ...talk(st), flip: true }, { tresse: true }) },
], { tr: 'cut' });

stage(32, [
  { set: (c, st) => setHill(c, st, {}), cam: [960, 400, 1.0], to: [960, 500, 1.15], look: 'ash', blur: true, draw: (c, st) => { for (let i = 0; i < 3; i++) valkyrie(c, -400 + st.bt * 500 + i * 300, 200 + i * 80, 0.6, 1); } },
  { at: 'Ангелы Императора', set: (c, st) => setHill(c, st, {}), cam: [960, 600, 1.0], to: [960, 560, 1.2], look: 'gold', draw: (c, st) => { for (let i = 0; i < 3; i++) { const p = clamp((st.bt - i * 0.5) / 1.2); astartes(c, 600 + i * 380, 300 + 700 * ease.out(p), 0.75, { lean: 0 }); } } },
  { at: 'Они в три раза', set: (c, st) => setHill(c, st, {}), cam: TWO(760, 1150, Y, 1), to: [960, 520, 1.3], look: 'gold', draw: (c, st) => { hero(c, 5, 760, Y, 0.75, { ...ip(st), head: -0.3, expr: 'shock' }); astartes(c, 1150, Y, 1.2, { ...ip(st), flip: true }); } },
  { at: 'Один из них смотрит', set: (c, st) => setHill(c, st, {}), cam: [1150, 400, 2.0], to: [1150, 360, 2.6], look: 'gold', draw: (c, st) => astartes(c, 1150, Y, 1.2, { flip: true }) },
], { tr: 'whip' });

// ===================== VI. КАПИТАН =====================
card(33, 6);

stage(34, [
  { set: setParade, cam: [960, 640, 1.0], to: [960, 600, 1.1], look: 'ash', draw: (c, st) => { for (let r = 0; r < 5; r++) for (let i = 0; i < 14; i++) trooper(c, 40 + i * 140 + r * 30, 720 + r * 60, 0.32 + r * 0.04, ip(st, i), i + r); hero(c, 6, 960, Y + 60, 0.9, ip(st)); }, over: (c, st) => tCaption(c, 'Рота. Двести человек.', st.lt, 0.4, 3) },
  { at: 'в зеркале ты видишь', set: setBunks, cam: [1100, 560, 1.6], to: [1100, 520, 2.0], look: 'warm', draw: (c, st) => { rect(c, 960, 300, 300, 420, '#8a9aa0', 10, 8); c.save(); c.beginPath(); c.rect(970, 310, 280, 400); c.clip(); hero(c, 6, 1110, 980, 0.9, { expr: 'sad' }, { hat: 'none', gray: true }); c.restore(); } },
  { at: 'У тебя протез', set: (c) => fillBg(c, '#2a2a2e'), cam: WIDE, to: [960, 540, 1.25], look: 'cold', draw: (c, st) => { rect(c, 760, 300, 160, 500, '#8a8e92', 30, 8); for (let i = 0; i < 4; i++) rect(c, 780, 340 + i * 110, 120, 20, '#5a5e62', 6, 4); circ(c, 840, 820, 70, '#7a7e82', 8); c.fillStyle = '#ff3a2a'; c.beginPath(); c.arc(840, 380, 10, 0, Math.PI * 2); c.fill(); }, over: (c, st) => tCaption(c, 'Аугментика Механикус', st.lt, st.ph('Аугментика') + (st.lt - st.bt), 3) },
], { tr: 'black' });

stage(35, [
  { set: setBunks, cam: [960, 720, 1.3], to: [960, 680, 1.5], look: 'warm', draw: (c, st) => { hero(c, 6, 960, Y, 1.05, { ...pose.write(st.t), expr: 'happy' }, { weapon: 'letter', hat: 'none' }); }, over: (c, st) => letterLine(c, 'Сынок, мы гордимся тобой. Весь уровень молится за полк.', st.bt, st.ph('Мать пишет')) },
  { at: 'Потом узнаёшь', set: setHiveLow, cam: [960, 600, 1.0], to: [960, 560, 1.15], look: 'cold', draw: (c, st) => { for (let i = 0; i < 4; i++) { c.save(); c.translate(300 + i * 450, 700); rect(c, -150, -200, 300, 300, '#8a7a2a', 4, 6); c.fillStyle = '#1a1a1a'; c.font = '700 40px "Oswald"'; c.textAlign = 'center'; c.fillText('КАРАНТИН', 0, -40); c.restore(); } } },
  { at: 'Тебе не говорят', set: setBunks, cam: CU(960, Y, 1), to: [960, 560, 2.2], look: 'cold', draw: (c, st) => hero(c, 6, 960, Y, 1, { ...ip(st), expr: 'sad' }, { weapon: 'letter', hat: 'none' }) },
], { tr: 'cut' });

stage(36, [
  { set: setTemple, cam: [960, 600, 1.05], to: [1100, 560, 1.2], look: 'fire', shake: 2, draw: (c, st) => { korvin(c, 1100, Y, 0.95, { ...talk(st), flip: true }, { tresse: true }); hero(c, 6, 700, Y, 0.95, ip(st)); }, over: (c, st) => tCaption(c, 'Мир-храм Сантус', st.lt, 0.4, 3) },
  { at: 'Шальной снаряд', set: setTemple, cam: [1100, 600, 1.2], to: [1100, 560, 1.4], look: 'fire', shake: 8, draw: (c, st) => { if (st.bt < 0.35) korvin(c, 1100, Y, 0.95, ip(st), { tresse: true }); blastFX(c, 1100, Y - 30, 1.4, st.bt - 0.3, 3); } },
  { at: 'Ты находишь его каску', set: (c, st) => { setTemple(c, st); dim(c, 0.4); }, cam: [960, 700, 1.4], to: [960, 680, 1.9], look: 'ash', draw: (c, st) => helmetProp(c, 960, 900, 0.9, 6, true, -0.15) },
  { at: 'Пайки он тебе', set: (c) => fillBg(c, '#1a1612'), cam: WIDE, to: [960, 540, 1.15], look: 'ash', draw: (c, st) => { ration(c, 960, 560, 1.2); }, over: (c, st) => tLine(c, 'Так и не вернул.', st.bt, 0.6, 3, 860, 80) },
], { tr: 'flash' });

stage(37, [
  { set: setBunks, cam: [960, 640, 1.3], to: [960, 600, 1.6], look: 'ash', draw: (c, st) => { hero(c, 6, 960, Y, 1, { ...ip(st), expr: 'neutral', armR: -1.0 }, { hat: 'none' }); helmetProp(c, 1110, 760, 0.35, 6, true, 0.2); } },
  { at: 'Теперь в роте шутят', set: setBunks, cam: [960, 640, 1.1], to: [800, 640, 1.2], look: 'warm', draw: (c, st) => { for (let i = 0; i < 4; i++) trooper(c, 1000 + i * 200, Y, 0.85, { ...talk(st, i), expr: 'happy' }, i, { weapon: 'none' }); hero(c, 6, 500, Y, 0.95, { ...ip(st), expr: 'neutral' }); } },
], { tr: 'cut' });

stage(38, [
  { set: setParade, cam: [500, 640, 1.1], to: [1400, 640, 1.1], ease: 'lin', look: 'ash', draw: (c, st) => { for (let i = 0; i < 10; i++) { c.save(); c.globalAlpha = 0.6; trooper(c, 100 + i * 190, Y, 0.8, ip(st, i), i); c.restore(); } } },
  { at: 'Если не знать имени', set: (c) => fillBg(c, '#e8dcbc'), cam: WIDE, to: [960, 560, 1.2], look: 'warm', draw: (c, st) => { c.font = '700 48px "Old Standard TT"'; for (let i = 0; i < 8; i++) { c.fillStyle = '#3a2a1a'; c.fillText(i < 3 ? ['Аррен', 'Вальд', 'Лейс'][i] : '№ ' + (4711 + i * 13), 620, 220 + i * 90); } } },
  { at: 'Ты ненавидишь себя', set: setBunks, cam: CU(960, Y, 1), to: [960, 560, 2.3], look: 'ash', draw: (c, st) => hero(c, 6, 960, Y, 1, { ...ip(st), expr: 'sad' }) },
], { tr: 'black' });

// ===================== VII. ПОЛКОВНИК =====================
card(39, 7);

stage(40, [
  { set: (c, st) => setPalaceHall(c, st), cam: [960, 640, 1.1], to: [960, 600, 1.25], look: 'blood', draw: (c, st) => { gman(c, 960, Y, 1, { lean: -1.5 * clamp(st.bt / 0.6), blink: 1 }, { hat: 'cap', weapon: 'none', coat: true, off: true, medals: 3 }, GP.officer); } },
  { at: 'Командование передают', set: setParade, cam: [960, 600, 1.15], to: [960, 540, 1.35], look: 'gold', draw: (c, st) => hero(c, 7, 960, Y, 1, { ...pose.salute() }), over: (c, st) => tCaption(c, 'Полковник', st.lt, 0.5, 3) },
  { at: 'который когда-то был', set: (c) => fillBg(c, '#1a1612'), cam: WIDE, to: [960, 540, 1.1], look: 'ash', draw: (c, st) => { const p = clamp(st.bt / 2.5); for (let i = 0; i < 120; i++) { const on = i / 120 < 1 - p * 0.96; c.fillStyle = on ? '#c9a24a' : 'rgba(255,255,255,0.08)'; c.fillRect(360 + (i % 20) * 60, 260 + Math.floor(i / 20) * 80, 40, 60); } }, over: (c, st) => tLine(c, '12 000 → 500', st.bt, 0.3, 4, 860, 90) },
  { at: 'Они говорят на других', set: setParade, cam: [960, 640, 1.1], to: [1100, 600, 1.2], look: 'ash', draw: (c, st) => { for (let i = 0; i < 7; i++) trooper(c, 260 + i * 240, Y, 0.85, ip(st, i), i, i % 2 ? { hat: 'cap' } : { coat: true }); } },
], { tr: 'black' });

stage(41, [
  { set: setPalaceHall, cam: [960, 600, 1.0], to: [960, 680, 1.3], look: 'warm', draw: (c, st) => { mapTable(c, 900, 900, 1.2, st.t, 16, 0); hero(c, 7, 1560, 1100, 0.9, { ...ip(st), head: 0.3, flip: true }); } },
  { at: 'Каждый флажок', set: (c) => fillBg(c, '#3a2a1a'), cam: [960, 540, 1.4], to: [960, 540, 2.0], look: 'warm', draw: (c, st) => mapTable(c, 960, 800, 1.8, st.t, 16, 0) },
  { at: 'Каждая рота', set: setParade, cam: [960, 640, 1.05], to: [960, 600, 1.15], look: 'ash', draw: (c, st) => { for (let r = 0; r < 4; r++) for (let i = 0; i < 12; i++) trooper(c, 80 + i * 160 + r * 40, 740 + r * 70, 0.4 + r * 0.05, { ...ip(st, i), expr: 'neutral', look: 0 }, i + r); } },
], { tr: 'cut' });

stage(42, [
  { set: setPalaceHall, cam: [960, 640, 1.15], to: [960, 600, 1.3], look: 'ash', draw: (c, st) => { mapTable(c, 900, 900, 1.2, st.t, 16, Math.floor(st.bt * 2)); hero(c, 7, 1560, 1100, 0.9, { ...ip(st), head: 0.3, flip: true }); } },
  { at: 'Ты ставишь подпись', set: (c) => fillBg(c, '#e8dcbc'), cam: [960, 540, 1.3], to: [1000, 560, 1.7], look: 'warm', draw: (c, st) => { c.fillStyle = '#3a2a1a'; c.font = '700 44px "Old Standard TT"'; c.textAlign = 'center'; c.fillText('ПРИКАЗ: рота IV держит рубеж до конца.', 980, 440); const p = clamp(st.bt / 1.6); c.strokeStyle = '#1a1410'; c.lineWidth = 6; c.beginPath(); for (let k = 0; k <= 40 * p; k++) { const x = 860 + k * 8, y = 620 + Math.sin(k * 0.6) * 22; k ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); rect(c, 860 + 320 * p, 560, 14, 90, '#3a2a1a', 3, 3); } },
  { at: 'Ты боишься того', set: setPalaceHall, cam: CU(960, Y, 1), to: [960, 560, 2.3], look: 'ash', draw: (c, st) => hero(c, 7, 960, Y, 1, { ...ip(st), expr: 'neutral' }) },
], { tr: 'whip' });

stage(43, [
  { set: setPalaceHall, cam: TWO(800, 1150, Y, 1), to: [1150, 560, 1.8], look: 'warm', draw: (c, st) => { hero(c, 7, 800, Y, 1, ip(st)); commissar(c, 1150, Y, 1.05, { ...talk(st), flip: true }, { gray: true }); } },
  { at: 'Ты спрашиваешь', set: setPalaceHall, cam: CU(800, Y, 1), to: [800, 560, 2.2], look: 'warm', draw: (c, st) => hero(c, 7, 800, Y, 1, { ...talk(st), expr: 'neutral' }) },
  { at: 'Он не отвечает', set: setPalaceHall, cam: CU(1150, Y, 1.05), to: [1150, 540, 2.4], look: 'ash', draw: (c, st) => commissar(c, 1150, Y, 1.05, { ...ip(st), flip: true, expr: 'neutral', look: -1 }, { gray: true }) },
], { tr: 'cut' });

stage(44, [
  { set: setParade, cam: [960, 640, 1.1], to: [960, 600, 1.2], look: 'gold', draw: (c, st) => { for (let i = 0; i < 2; i++) trooper(c, 600 + i * 720, Y, 0.9, { ...ip(st, i), flip: i === 1 }, i, { coat: true }); hero(c, 7, 960, Y, 1, ip(st)); } },
  { at: 'Писарь пишет', set: setPalaceHall, cam: [960, 720, 1.3], to: [960, 680, 1.5], look: 'warm', draw: (c, st) => { worker(c, 960, Y, 1, { ...pose.write(st.t) }, 0, { hat: 'none', coat: true }); letterStack(c, 1200, 880, 0.4, 8); } },
  { at: 'Ящик из-под патронов', set: (c, st) => { setBunks(c, st); dim(c, 0.4); }, cam: [960, 760, 1.6], to: [960, 760, 2.0], look: 'ash', draw: (c, st) => ammoBox(c, 960, 900, 0.9, 30) },
], { tr: 'whip' });

// ===================== VIII. ЛОРД-ГЕНЕРАЛ =====================
card(45, 8);

stage(46, [
  { set: (c, st) => setBridgeG(c, st, {}), cam: [960, 500, 1.0], to: [960, 600, 1.2], look: 'gold', draw: (c, st) => hero(c, 8, 960, 1180, 1.0, { ...ip(st), head: 0.1 }), over: (c, st) => tCaption(c, 'Лорд-генерал', st.lt, 0.4, 3, '25 лет службы') },
  { at: 'Сотни тысяч солдат', set: (c, st) => setHill(c, st, {}), cam: [960, 600, 1.0], to: [960, 560, 1.1], look: 'ash', draw: (c, st) => { for (let r = 0; r < 4; r++) for (let i = 0; i < 18; i++) trooper(c, -60 + i * 120 + r * 30, 760 + r * 70, 0.25 + r * 0.05, ip(st, i), i + r); for (let i = 0; i < 3; i++) lemanRuss(c, 300 + i * 650, 700, 0.35, st.t); titan(c, 1650, 760, 0.6, st.t, '#6a2a20'); } },
  { at: 'Ты стоишь на мостике', set: (c, st) => setBridgeG(c, st, {}), cam: CU(960, 1180, 1.0), to: [960, 760, 2.0], look: 'gold', draw: (c, st) => hero(c, 8, 960, 1180, 1.0, { ...ip(st), expr: 'neutral' }) },
], { tr: 'black' });

stage(47, [
  { set: (c) => fillBg(c, '#0a0a10'), cam: WIDE, to: [960, 540, 1.15], look: 'night', draw: (c, st) => { for (let i = 0; i < 40; i++) { const r = rng(i + 3); c.save(); c.globalAlpha = 0.25 + 0.4 * Math.sin(st.t + i) ** 2; trooper(c, r() * 1900, 500 + r() * 600, 0.3 + r() * 0.3, {}, i); c.restore(); } } },
  { at: 'Но иногда ночью', set: setHiveLow, cam: [800, 640, 1.2], to: [900, 620, 1.35], look: 'warm', draw: (c, st) => { valve(c, 760, Y - 100, 1.2, st.t * 0.6); c.save(); c.globalAlpha = 0.85; youth(c, 980, Y, 1, { ...ip(st), armL: -1.4 }); c.restore(); } },
  { at: 'Мать с иголкой', set: setHiveLow, cam: CU(1100, Y, 0.95), to: [1100, 560, 2.0], look: 'warm', draw: (c, st) => { worker(c, 1100, Y, 0.95, { ...ip(st), flip: true, armL: -1.3, expr: 'sad' }, 1, { female: true, hat: 'kerchief' }); goldLight(c, 1000, 620, 8, st.t, 0.8); } },
  { at: 'И Корвин', set: setBunks, cam: [960, 680, 1.4], to: [1050, 660, 1.6], look: 'home', draw: (c, st) => { korvin(c, 1050, Y, 1, { ...pose.run(st.t, 0.5), expr: 'happy', flip: true }, { weapon: 'none' }); ration(c, 1000 + st.bt * 30, 740, 0.4); } },
], { tr: 'black' });

stage(48, [
  { set: setFeast, cam: [500, 600, 1.1], to: [1400, 600, 1.1], ease: 'lin', look: 'gold', draw: (c, st) => { for (let i = 0; i < 5; i++) worker(c, 300 + i * 300, 1040, 0.85, { ...talk(st, i), expr: 'happy' }, i, { hat: 'none', coat: true }); } },
  { at: 'Ты сидишь за длинным', set: setFeast, cam: CU(960, 1080, 1), to: [960, 760, 2.0], look: 'gold', draw: (c, st) => hero(c, 8, 960, 1080, 1, { ...pose.sit(st.t), expr: 'neutral' }) },
  { at: 'таверна Корвина', set: setHiveTop, cam: [960, 560, 1.1], to: [960, 580, 1.25], look: 'home', draw: (c, st) => { c.save(); c.globalAlpha = 0.85; rect(c, 660, 560, 600, 340, '#8a6a4a', 8, 6); rect(c, 720, 600, 200, 140, '#ffe0a0', 6, 4); rect(c, 1000, 600, 200, 140, '#ffe0a0', 6, 4); c.fillStyle = '#f4ead4'; c.font = '700 54px "Old Standard TT"'; c.textAlign = 'center'; c.fillText('ТАВЕРНА КОРВИНА', 960, 530); c.restore(); } },
  { at: 'Ты ничего не ешь', set: setFeast, cam: CU(960, 1080, 1), to: [960, 780, 2.2], look: 'ash', draw: (c, st) => hero(c, 8, 960, 1080, 1, { ...pose.sit(st.t), expr: 'sad' }) },
], { tr: 'cut' });

stage(49, [
  { set: (c, st) => setBridgeG(c, st, {}), cam: TWO(760, 1180, 1180, 1), to: [1180, 760, 1.8], look: 'blood', draw: (c, st) => { hero(c, 8, 760, 1180, 1, ip(st)); inquisitor(c, 1180, 1180, 1, { ...talk(st), flip: true }); }, over: (c, st) => tCaption(c, 'Инквизиция', st.lt, 0.4, 3) },
  { at: 'Экстерминатус', set: (c, st) => setBridgeG(c, st, {}), cam: [960, 400, 1.0], to: [960, 400, 1.2], look: 'blood', draw: () => {}, over: (c, st) => tLine(c, 'ЭКСТЕРМИНАТУС', st.bt, 0.2, 3, 200, 120, '#e84a3a') },
  { at: 'У тебя шесть часов', set: (c) => fillBg(c, '#0a0606'), cam: WIDE, to: [960, 540, 1.2], look: 'blood', draw: (c, st) => { c.fillStyle = '#e84a3a'; c.font = '700 220px "Oswald"'; c.textAlign = 'center'; const left = 6 * 3600 - st.bt * 400; const h = Math.floor(left / 3600), m = Math.floor((left % 3600) / 60), s2 = Math.floor(left % 60); c.fillText(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s2).padStart(2, '0')}`, 960, 620); } },
], { tr: 'flash' });

stage(50, [
  { set: (c, st) => setHill(c, st, { dusk: true }), cam: [960, 500, 1.0], to: [960, 400, 1.15], look: 'blood', blur: true, draw: (c, st) => { for (let i = 0; i < 4; i++) valkyrie(c, 400 + i * 360, 700 - st.bt * 120 - i * 30, 0.5, 1); for (let i = 0; i < 8; i++) trooper(c, 200 + i * 220, Y, 0.7, pose.run(st.t + i, 0.8), i); } },
  { at: 'Вторая половина остаётся', set: (c, st) => setTrenchG(c, st, {}), cam: [960, 640, 1.1], to: [960, 600, 1.25], look: 'blood', shake: 3, draw: (c, st) => { for (let i = 0; i < 6; i++) { trooper(c, 200 + i * 300, 960, 0.85, pose.fire(st.t + i), i); shoot(c, st, 200 + i * 300, 960, 0.85, i); } } },
  { at: 'Ты отдаёшь этот приказ', set: (c, st) => setBridgeG(c, st, {}), cam: CU(960, 1180, 1), to: [960, 780, 2.2], look: 'blood', draw: (c, st) => hero(c, 8, 960, 1180, 1, { ...talk(st), expr: 'grit' }) },
  { at: 'Последний полк', set: (c, st) => setTrenchG(c, st, {}), cam: [960, 600, 1.15], to: [960, 560, 1.3], look: 'ash', draw: (c, st) => { for (let i = 0; i < 5; i++) trooper(c, 300 + i * 330, 960, 0.85, { ...pose.salute(), expr: 'neutral' }, i); }, over: (c, st) => tCaption(c, 'Полк Валгаста', st.lt, st.ph('Последний полк') + (st.lt - st.bt), 3) },
  { at: 'Ты ставишь подпись', set: (c) => fillBg(c, '#e8dcbc'), cam: [1000, 560, 1.4], to: [1060, 580, 1.8], look: 'warm', draw: (c, st) => { const p = clamp(st.bt / 1.4); c.strokeStyle = '#1a1410'; c.lineWidth = 6; c.beginPath(); for (let k = 0; k <= 40 * p; k++) { const x = 900 + k * 8, y = 620 + Math.sin(k * 0.6) * 22; k ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); } },
], { tr: 'whip' });

stage(51, [
  { set: (c, st) => setBridgeG(c, st, { burn: clamp(st.bt / 4) }), cam: [960, 500, 1.0], to: [960, 600, 1.25], look: 'fire', draw: (c, st) => hero(c, 8, 960, 1180, 1.0, { ...ip(st), armL: -1.2, armR: 1.2 }), sfx: [['rumble', 0.5, 1]] },
  { at: 'Ты держишь в руках', set: (c, st) => { setBridgeG(c, st, { burn: 1 }); dim(c, 0.3); }, cam: [960, 640, 1.6], to: [960, 640, 2.1], look: 'fire', draw: (c, st) => helmetProp(c, 960, 700, 1.0, 6, true, -0.08) },
], { tr: 'cut' });

stage(52, [
  { set: setHiveTop, cam: [960, 700, 1.1], to: [960, 300, 1.0], look: 'warm', draw: () => {} },
  { at: 'Ты увидел небо', set: (c, st) => setSpace(c, st, {}), cam: [960, 540, 1.0], to: [960, 540, 1.3], look: 'gold', draw: (c, st) => { for (let i = 0; i < 6; i++) planet(c, 200 + i * 320, 300 + (i % 2) * 300, 60 + (i % 3) * 30, ['#4a6a5a', '#8a4a2a', '#5a7a9a', '#c8b8a0', '#6a4a7a', '#4a8a6a'][i], '#2a2a2a', { seed: i }); } },
  { at: 'Только наверху', set: (c, st) => setBridgeG(c, st, { planet: false }), cam: CU(960, 1180, 1), to: [960, 760, 2.0], look: 'ash', draw: (c, st) => hero(c, 8, 960, 1180, 1, { ...ip(st), expr: 'sad' }) },
  { at: 'В букваре есть строчка', set: (c) => fillBg(c, '#e8dcbc'), cam: WIDE, to: [960, 540, 1.15], look: 'warm', draw: (c, st) => primer(c, 960, 470, 1.3, 0, 0), over: (c, st) => tLine(c, 'Только в смерти долг кончается', st.bt, 0.6, 6, 950, 66, '#3a2a1a') },
  { at: 'В семнадцать', set: setHiveLow, cam: CU(980, Y, 1), to: [980, 560, 2.2], look: 'ash', draw: (c, st) => { youth(c, 980, Y, 1, { ...ip(st), head: -0.3 }); }, over: (c, st) => { if (st.bt > st.bdur - 3) { c.fillStyle = `rgba(0,0,0,${clamp((st.bt - st.bdur + 3) / 2.5)})`; c.fillRect(0, 0, W, H); } } },
], { tr: 'black' });
