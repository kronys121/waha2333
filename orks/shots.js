// Ork: 8 levels, 52 paragraphs. Staged beats with a travelling camera (orks/engine4.js).
// Thread: the gretchin Shnyr who survives everything; the spores that start the next ork; the boss pole.

const Y = 1000;
const card = (k, n) => shot(PT(k), (ctx, s) => eCard(ctx, n, s.lt), { fade: 0.4 });
const ip = (st, i = 0) => ({ ...idlePose(st.t, i), time: st.t });
const talk = (st, i = 0, o = {}) => ({ ...idlePose(st.t, i), expr: 'talk', time: st.t, ...o });
const dim = (ctx, a = 0.45) => { ctx.fillStyle = `rgba(6,4,2,${a})`; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); };
const OKP2 = { mek: pal(OKP.boy, { vest: '#c89a3a', skin: '#5a9a3a' }), doc: pal(OKP.boy, { vest: '#e8e4d8', skin: '#629a3c' }), gryz: pal(OKP.nob, { skin: '#4a8a2c' }), skarg: pal(OKP.war, { armor: '#7a1a14', chk1: '#e2b42a', chk2: '#1c1c1e', red: '#1c1c1e' }), yoof: pal(OKP.boy, { skin: '#72b042', skinD: '#5a9034' }) };

// the hero at each level
const MEO = [
  null,
  { weapon: 'none' },
  { weapon: 'choppa' },
  { weapon: 'choppa', scars: true },
  { weapon: 'big', armour: 'eavy', pad: true, checks: true, scars: true, helm: 'horns', bulk: 0.5, pole: 1 },
  { weapon: 'kustom', armour: 'eavy', pad: true, checks: true, scars: true, helm: 'iron', bulk: 1, teethNeck: true, pole: 1 },
];
function me(c, lvl, x, y, s, pose = {}, over = {}, colOver) {
  if (lvl >= 6) {
    const o = lvl === 6 ? { pole: 2, helm: 'horns' } : lvl === 6.5 ? { pole: 2, helm: 'none', plate: true } : lvl === 7 ? { pole: 2, helm: 'none', plate: true, jaw: 'iron' } : { pole: 2, helm: 'none', plate: true, jaw: 'iron', cape: true };
    return megaBoss(c, x, y, s * 0.8, pose, { ...o, ...over }, colOver || (lvl >= 8 ? OKP.prophet : OKP.war));
  }
  const col = lvl === 1 ? OKP2.yoof : lvl === 4 ? OKP.nob : lvl === 5 ? OKP.boss : OKP.boy;
  orkX(c, x, y, s * (lvl === 1 ? 0.7 : 1), pose, { ...MEO[lvl], ...over }, colOver || col);
}
const SIL = Object.fromEntries(Object.keys(OKP.boss).map((k) => [k, k === 'eye' ? '#ff3020' : '#14100c']));
const shnyr = (c, x, y, s, pose = {}, o = {}) => grot(c, x, y, s * 0.75, pose, o);
const gryz = (c, x, y, s, pose = {}, o = {}) => orkX(c, x, y, s * 1.1, pose, { weapon: 'big', armour: 'eavy', pad: true, helm: 'horns', bulk: 0.6, jaw: 'iron', ...o }, OKP2.gryz);
const mek = (c, x, y, s, pose = {}) => orkX(c, x, y, s, pose, { weapon: 'none', helm: 'iron', pad: true }, OKP2.mek);
const doc = (c, x, y, s, pose = {}) => orkX(c, x, y, s, pose, { weapon: 'choppa', helm: 'none', scars: true }, OKP2.doc);
const BOYO = [{ weapon: 'choppa' }, { weapon: 'shoota' }, { weapon: 'choppa', helm: 'horns' }, { weapon: 'shoota', scars: true }, { weapon: 'choppa', pad: true, checks: true }, { weapon: 'shoota', helm: 'iron' }];
const oboy = (c, x, y, s, pose = {}, i = 0, over = {}) => orkX(c, x, y, s, pose, { ...BOYO[i % BOYO.length], ...over }, i % 4 === 3 ? OKP.red : OKP.boy);
const mob = (c, st, x0, n, y, s, dx, f = (i) => ip(st, i)) => { for (let i = 0; i < n; i++) oboy(c, x0 + i * dx, y + (i % 2) * 18, s, f(i), i); };
const runMob = (c, st, x0, n, y, s, dx, sp = 1) => mob(c, st, x0 + st.bt * 140 * sp, n, y, s, dx, (i) => ({ ...pose.run(st.t + i * 0.3, 0.9), expr: i % 2 ? 'roar' : 'angry', time: st.t }));
const hitFX = (c, x, y, s, lt) => { if (lt > 0.5) return; c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = `rgba(255,240,170,${1 - lt * 2})`; c.beginPath(); for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2, r = (i % 2 ? 60 : 160) * s * (1 + lt * 2); c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } c.closePath(); c.fill(); c.restore(); };
const guardsman = (c, x, y, s, pose = {}, i = 0) => trooper(c, x, y, s, pose, i);
const lasFire = (c, st, x, y, s, k = 0, dir = 1) => { const p = ((st.t * 1.6 + k * 0.37) % 1); lasBeam(c, x + dir * 260 * s, y - 280 * s, x + dir * 1300, y - 300 * s, p); };
const chMaster = (c, x, y, s, pose = {}) => { drawRig(c, rig('marine', { cape: true, laurel: true }), x, y, s, pose, pal('ultra', { cape: '#8a1a14' })); };
function godHead(c, x, y, s, kind, t, a = 0.6) {
  c.save(); c.globalAlpha = a; c.translate(x, y + Math.sin(t * 0.8 + (kind === 'gork' ? 0 : 2)) * 12); c.scale(s, s);
  c.save(); c.shadowColor = '#9cff4c'; c.shadowBlur = 60;
  const hd = P(); hd.moveTo(-150, -60); hd.quadraticCurveTo(0, -260, 150, -60); hd.lineTo(210, 60); hd.quadraticCurveTo(220, 170, 140, 180); hd.lineTo(-140, 180); hd.quadraticCurveTo(-220, 170, -210, 60); hd.closePath();
  sfill(c, hd, kind === 'gork' ? '#3e7a24' : '#5aa83a', 8); c.restore();
  orkFace(c, { expr: kind === 'gork' ? 'roar' : 'happy', time: t }, OKP.war, { x: 0, y: 60, k: 2.4 });
  c.restore();
}
function doors(c, x, y, s, n) { for (let i = 0; i < n; i++) { rect(c, x - 90 * s, y - (i + 1) * 300 * s, 180 * s, 300 * s, '#6a4a2a', 6, 6); c.fillStyle = '#c89a3a'; c.beginPath(); c.arc(x + 60 * s, y - (i + 0.5) * 300 * s, 10 * s, 0, 7); c.fill(); } }
function rocket(c, x, y, s, t, rot = -0.2) { c.save(); c.translate(x, y); c.rotate(rot + Math.sin(t * 9) * 0.08); c.scale(s, s); smokeFX(c, -200, 0, t, 1, 3, '120,110,100', 0.5); flameJet(c, -120, 0, 120, t, -1); sfill(c, rr(-120, -30, 220, 60, 26), '#a8602c', 5); shape(c, [[100, -30], [160, 0], [100, 30]], '#b03024', 5); shape(c, [[-120, -30], [-160, -70], [-80, -30]], '#5a5e66', 4); glyph(c, 0, 0, 0.35, '#e2b42a'); c.restore(); }
function plan(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); scrapPlate(c, 0, 0, 520, 340, '#7a6a58', 0.02); c.strokeStyle = '#f4ead4'; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); c.moveTo(-200, 60); c.lineTo(140, 60); c.stroke(); c.beginPath(); c.moveTo(100, 20); c.lineTo(150, 60); c.lineTo(100, 100); c.stroke(); c.fillStyle = '#f4ead4'; c.font = '700 64px "Oswald"'; c.textAlign = 'center'; c.fillText('БЕЖАТЬ + ОРАТЬ', 0, -50); c.restore(); }
const sack = (c, x, y, s) => { c.save(); c.translate(x, y); c.scale(s, s); const p = P(); p.moveTo(-80, 0); p.quadraticCurveTo(-110, -120, -30, -150); p.lineTo(30, -150); p.quadraticCurveTo(110, -120, 80, 0); p.closePath(); sfill(c, p, '#a88a5a', 5); inkLine(c, [[-30, -140], [30, -140]], 6); tooth(c, -20, -160, 0.8, 0.4); tooth(c, 16, -170, 0.8, -0.3); c.restore(); };

// ===================== I. СПОРА =====================
card(0, 1);

stage(1, [
  { set: (c, st) => setWaste(c, st, { red: true }), cam: [960, 600, 1.0], to: [960, 640, 1.2], look: 'blood', draw: (c, st) => { me(c, 6, 1350, Y, 0.9, { lean: -1.5, blink: 1, time: st.t, expr: 'sad' }, { pole: 0 }); c.save(); c.globalAlpha = clamp(st.bt / 3); sporeFX(c, st.t * 2, 90, 11); c.restore(); }, over: (c, st) => tCaption(c, 'Старый варбосс', st.bt, 0.6, 3) },
  { at: 'Его тело', set: (c, st) => setCave(c, st, { glow: 0.4 }), cam: [960, 300, 1.0], to: [960, 760, 1.2], look: 'gold', draw: (c, st) => { sporeFX(c, st.t * 3, 160, 12); } },
  { at: 'вылезаешь ты', set: setCave, cam: [960, 760, 1.4], to: [960, 720, 1.7], look: 'gold', shake: 2, draw: (c, st) => { const p = clamp(st.bt / 2.5); me(c, 1, 960, Y + 360 * (1 - ease.out(p)), 1, { ...ip(st), armR: -2.4 + p, armL: 2.4 - p, expr: p < 1 ? 'shock' : 'angry' }); c.fillStyle = '#2a2218'; c.fillRect(600, Y, 720, 400); for (let i = 0; i < 5; i++) { c.fillStyle = '#4a3a2a'; c.beginPath(); c.ellipse(760 + i * 100, Y + 4, 70, 26, 0, 0, 7); c.fill(); } }, sfx: [['rumble', 0.2, 0.6]] },
  { at: 'Маленький', set: setCave, cam: CU(960, Y, 0.7), to: [960, 700, 3.0], look: 'gold', draw: (c, st) => me(c, 1, 960, Y, 1, { ...ip(st), expr: 'angry' }) },
], { tr: 'black', look: 'gold' });

stage(2, [
  { set: setCave, cam: [960, 640, 1.1], to: [960, 620, 1.3], look: 'ash', draw: (c, st) => me(c, 1, 960, Y, 1, { ...ip(st), expr: 'angry' }), over: (c, st) => { ['Нет мамы.', 'Нет отца.', 'Нет школы.'].forEach((w, i) => tLine(c, w, st.bt - i * 1.2, 0.2, 9, 200 + i * 110, 76)); } },
  { at: 'Ты уже умеешь', set: setCave, cam: TWO(860, 1120, Y, 0.8), to: [960, 640, 1.6], look: 'gold', draw: (c, st) => { me(c, 1, 860, Y, 1, { ...talk(st), armR: -1.8 + Math.sin(st.t * 8) * 0.4, expr: 'roar' }); shnyr(c, 1160, Y, 1, { ...ip(st), flip: true, expr: 'shock' }); } },
  { at: 'Первое, что', set: setCave, cam: TWO(880, 1100, Y, 0.8), to: [1060, 700, 1.8], look: 'gold', shake: 5, draw: (c, st) => { const p = clamp(st.bt / 0.5); me(c, 1, 880, Y, 1, { armR: -1.6 * p, lean: 0.15 * p, expr: 'roar', time: st.t }); shnyr(c, 1130 + p * 80, Y, 1, { lean: 0.6 * p, flip: true, expr: 'shock' }); hitFX(c, 1110, 760, 1, st.bt - 0.45); }, sfx: [['impact', 0.45, 0.8]] },
  { at: 'Просто потому', set: setCave, cam: TWO(880, 1180, Y, 0.8), to: [960, 660, 1.5], look: 'gold', draw: (c, st) => { me(c, 1, 880, Y, 1, { ...ip(st), armL: 0.6, armR: -0.6, expr: 'happy' }); shnyr(c, 1220, Y + 10, 1, { lean: 1.4, blink: 1, expr: 'shock' }); } },
], { tr: 'cut' });

stage(3, [
  { set: setCave, cam: CU(1000, Y, 0.6), to: [1000, 760, 3.0], look: 'gold', draw: (c, st) => shnyr(c, 1000, Y, 1.4, { ...ip(st), expr: 'shock' }), over: (c, st) => tCaption(c, 'Шнырь', st.bt, 0.5, 3, 'гретчин') },
  { at: 'Он решает', set: setCave, cam: TWO(860, 1120, Y, 0.8), to: [980, 680, 1.6], look: 'gold', draw: (c, st) => { me(c, 1, 860, Y, 1, { ...ip(st), expr: 'angry' }); shnyr(c, 1120, Y, 1.3, { lean: -0.5 + Math.sin(st.t * 3) * 0.1, flip: true, expr: 'happy', time: st.t }); } },
  { at: 'Это самое умное', set: setCave, cam: CU(1000, Y, 0.6), to: [1000, 740, 3.2], look: 'gold', draw: (c, st) => shnyr(c, 1000, Y, 1.4, { ...talk(st), expr: 'happy' }) },
], { tr: 'cut' });

stage(4, [
  { set: setCave, cam: [960, 640, 1.0], to: [960, 600, 1.15], look: 'gold', draw: (c, st) => { for (let i = 0; i < 6; i++) { const p = clamp((st.bt - i * 0.4) / 1.5); oboy(c, 200 + i * 300, Y + 300 * (1 - ease.out(p)), 0.75, { ...ip(st, i), expr: 'angry' }, i, { weapon: 'none' }); } c.fillStyle = '#2a2218'; c.fillRect(BX0, Y + 20, BX1 - BX0, 600); } },
  { at: 'Вы сразу начинаете', set: setCave, cam: [960, 660, 1.2], to: [1000, 640, 1.35], look: 'gold', shake: 4, draw: (c, st) => { for (let i = 0; i < 5; i++) oboy(c, 400 + i * 260, Y, 0.8, { armR: -1.6 + Math.sin(st.t * 9 + i) * 0.8, armL: 1.2 + Math.cos(st.t * 8 + i) * 0.6, lean: Math.sin(st.t * 6 + i) * 0.15, expr: 'roar', flip: i % 2 === 1, time: st.t }, i, { weapon: 'none' }); dustFX(c, st.t, 40, 2); } },
  { at: 'За кусок', set: (c, st) => { setCave(c, st); dim(c, 0.2); }, cam: [700, 860, 2.0], to: [1300, 860, 2.0], ease: 'lin', look: 'gold', draw: (c, st) => { scrapPlate(c, 640, 880, 260, 40, '#8a5a3a', 0.1); squig(c, 960, 930, 0.5, 0, '#8a3a2a', { hop: 0, open: 1 }); campfire2(c, 1300, 920, 1.2, st.t); } },
  { at: 'Ты маленький', set: setCave, cam: TWO(860, 1100, Y, 0.9), to: [960, 660, 1.5], look: 'gold', shake: 3, draw: (c, st) => { oboy(c, 1100, Y, 0.95, { armR: -1.4, expr: 'roar', flip: true, time: st.t }, 2, { weapon: 'none' }); me(c, 1, 820, Y, 1, { lean: -0.6 * clamp(st.bt / 0.6), expr: 'shock' }); } },
  { at: 'Но с каждой', set: setCave, cam: [960, 620, 1.2], to: [960, 560, 1.35], look: 'gold', draw: (c, st) => { const g = 1 + clamp(st.bt / 4) * 0.35; me(c, 1, 960, Y, g, { ...ip(st), expr: 'happy', armR: -1.2 }); }, over: (c, st) => tLine(c, 'Кто дерётся, тот растёт', st.bt, st.ph('кто дерётся') + (st.lt - st.bt) - st.lt + st.bt, 3, 200, 76) },
], { tr: 'whip' });

stage(5, [
  { set: setCave, cam: [960, 760, 1.3], to: [1100, 760, 1.4], look: 'gold', draw: (c, st) => { for (let i = 0; i < 9; i++) snotling(c, 500 + i * 120 + Math.sin(st.t + i) * 30, Y - (i % 3) * 20, 0.8, st.t, i); }, over: (c, st) => tCaption(c, 'Снотлинги', st.bt, 0.4, 2.5) },
  { at: 'Сквиг это', set: setCave, cam: CU(960, Y, 0.6), to: [960, 820, 2.6], look: 'gold', draw: (c, st) => squig(c, 960, Y, 1.3, st.t), over: (c, st) => tCaption(c, 'Сквиг', st.bt, 0.4, 2.5) },
  { at: 'Сквигов едят', set: setCave, cam: [960, 700, 1.2], to: [1100, 680, 1.3], look: 'gold', draw: (c, st) => { squig(c, 1200 + st.bt * 120, Y, 0.7, st.t, '#c8402a', { flip: true }); me(c, 1, 800 + st.bt * 140, Y, 1, { ...pose.run(st.t, 0.8), expr: 'happy', time: st.t }); } },
  { at: 'Иногда сквиги', set: setCave, cam: [960, 700, 1.2], to: [800, 680, 1.35], look: 'gold', shake: 3, draw: (c, st) => { oboy(c, 800 - st.bt * 140, Y, 0.8, { ...pose.run(st.t, 1.1), expr: 'shock', time: st.t, flip: true }, 1, { weapon: 'none' }); squig(c, 1150 - st.bt * 120, Y, 1.4, st.t, '#c8402a', { open: 1 }); } },
  { at: 'Так ты узнаёшь', set: setCave, cam: CU(960, Y, 0.7), to: [960, 720, 3.0], look: 'gold', draw: (c, st) => me(c, 1, 960, Y, 1, { ...ip(st), expr: 'happy', head: Math.sin(st.t * 4) * 0.08 }) },
], { tr: 'cut' });

stage(6, [
  { set: (c, st) => setScrap(c, st, {}), cam: [960, 760, 1.3], to: [1000, 760, 1.5], look: 'warm', draw: (c, st) => { for (let i = 0; i < 8; i++) scrapPlate(c, 700 + i * 70, 960 - (i % 3) * 30, 140, 50, ['#7a6a58', '#6a5a4a', '#8a5a3a'][i % 3], (i - 4) * 0.15); me(c, 1, 1100, Y, 1, { armR: -0.8 + Math.sin(st.t * 6) * 0.5, lean: 0.3, expr: 'angry', time: st.t }); } },
  { at: 'Это твоё первое', set: (c) => fillBg(c, '#2a2218'), cam: WIDE, to: [960, 560, 1.2], look: 'warm', draw: (c, st) => { c.save(); c.translate(960, 760); c.rotate(-0.3); choppa(c, 0, 0, 2.6, OKP.boy); c.restore(); goldLight(c, 1100, 300, 12, st.t, 1); }, over: (c, st) => tCaption(c, 'Рубило', st.bt, 0.5, 3) },
  { at: 'Ты держишь его', set: (c, st) => setScrap(c, st, { dusk: true }), cam: [960, 760, 1.4], to: [960, 600, 1.7], look: 'gold', draw: (c, st) => { me(c, 1, 960, Y, 1.1, { armR: -2.5, expr: 'roar', time: st.t }, { weapon: 'choppa' }); } },
], { tr: 'whip' });

// ===================== II. БОЙ =====================
card(7, 2);

stage(8, [
  { set: (c, st) => setScrap(c, st, {}), cam: [700, 640, 1.0], to: [1200, 640, 1.1], look: 'warm', draw: (c, st) => { mob(c, st, 300, 7, Y - 40, 0.75, 220); me(c, 2, 1700 - st.bt * 120, Y + 30, 0.9, { ...pose.march(st.t), time: st.t, flip: true }); } },
  { at: 'Бандой командует', set: (c, st) => setScrap(c, st, {}), cam: CU(1000, Y, 1.1), to: [1000, 600, 2.2], look: 'warm', draw: (c, st) => gryz(c, 1000, Y, 1, { ...talk(st), expr: 'angry' }), over: (c, st) => tCaption(c, 'Ноб Грызлак', st.bt, 0.5, 3) },
  { at: 'Он в два раза', set: (c, st) => setScrap(c, st, {}), cam: TWO(820, 1150, Y, 1.1), to: [1000, 600, 1.3], look: 'warm', draw: (c, st) => { me(c, 2, 820, Y, 0.7, { ...ip(st), head: -0.2, expr: 'shock' }); gryz(c, 1150, Y, 1.1, { ...ip(st), flip: true, head: 0.15 }); } },
  { at: 'день он бьёт', set: (c, st) => setScrap(c, st, {}), cam: TWO(860, 1100, Y, 1.0), to: [960, 640, 1.4], look: 'warm', shake: 5, draw: (c, st) => { const p = clamp(st.bt / 0.4); gryz(c, 1120, Y, 1.1, { armR: -2.6 + p * 1.6, flip: true, expr: 'roar', time: st.t }); me(c, 2, 860, Y, 0.7, { lean: -0.3 * p, sy: 1 - 0.12 * p, expr: 'shock' }); hitFX(c, 860, 600, 0.8, st.bt - 0.35); }, sfx: [['impact', 0.35, 0.9]] },
  { at: 'Ты знаешь', set: (c, st) => setScrap(c, st, {}), cam: CU(1300, Y, 0.7), to: [1300, 720, 3.2], look: 'warm', draw: (c, st) => me(c, 2, 1300, Y, 0.7, { ...ip(st), expr: 'angry' }), over: (c, st) => tLine(c, 'Пока.', st.bt, st.ph('Пока') - st.lt + st.bt, 3, 200, 90) },
], { tr: 'black' });

stage(9, [
  { set: (c, st) => setScrap(c, st, {}), cam: [960, 640, 1.0], to: [960, 600, 1.15], look: 'warm', draw: (c, st) => { for (let r = 0; r < 2; r++) mob(c, st, 120 + r * 100, 9, Y - 120 + r * 120, 0.55 + r * 0.15, 210); }, over: (c, st) => tCaption(c, 'Двадцать боев', st.bt, 0.4, 3) },
  { at: 'Все орут', set: (c, st) => setScrap(c, st, {}), cam: [960, 660, 1.3], to: [1050, 640, 1.45], look: 'warm', shake: 3, draw: (c, st) => { for (let i = 0; i < 5; i++) oboy(c, 500 + i * 250, Y, 0.85, { armR: -1.8 + Math.sin(st.t * 8 + i) * 0.8, expr: i % 2 ? 'roar' : 'talk', flip: i % 2 === 1, time: st.t }, i); for (let i = 0; i < 3; i++) { c.save(); c.globalAlpha = 0.5; c.fillStyle = '#9ac050'; c.beginPath(); c.ellipse(600 + i * 400, 500 - ((st.t * 40 + i * 30) % 120), 40, 16, 0, 0, 7); c.fill(); c.restore(); } } },
  { at: 'Деньги у орков', set: (c) => fillBg(c, '#3a2a1a'), cam: WIDE, to: [960, 600, 1.3], look: 'warm', draw: (c, st) => { c.save(); c.translate(960, 760); c.scale(2.4, 2.4); teethPile(c, 0, 0, 1, 40, 4); c.restore(); goldLight(c, 960, 500, 10, st.t, 0.8); }, over: (c, st) => tCaption(c, 'Деньги орков', st.bt, 0.4, 3, 'зубы') },
  { at: 'Зубы отрастают', set: (c, st) => setScrap(c, st, {}), cam: TWO(860, 1120, Y, 0.9), to: [1000, 640, 1.5], look: 'warm', shake: 4, draw: (c, st) => { const p = (st.bt % 1.2) / 1.2; me(c, 2, 860, Y, 0.9, { armR: -1.6 * Math.min(1, p * 4), expr: 'roar', time: st.t }, { weapon: 'none' }); oboy(c, 1120, Y, 0.9, { lean: 0.2, flip: true, expr: 'shock' }, 3); tooth(c, 1150 + p * 300, 560 - Math.sin(p * Math.PI) * 200, 1.2, p * 12); }, sfx: [['impact', 0.3, 0.6], ['impact', 1.5, 0.6]] },
  { at: 'Ты быстро богатеешь', set: (c, st) => setScrap(c, st, {}), cam: [960, 700, 1.4], to: [960, 640, 1.7], look: 'gold', draw: (c, st) => { me(c, 2, 900, Y, 0.9, { ...ip(st), expr: 'happy' }); teethPile(c, 1150, Y - 20, 1.3, 30, 6); } },
], { tr: 'cut' });

stage(10, [
  { set: setMek, cam: [960, 660, 1.3], to: [1000, 640, 1.5], look: 'warm', draw: (c, st) => { mek(c, 960, Y, 1, { armR: -1 + Math.sin(st.t * 12) * 0.2, armL: 1, expr: 'happy', time: st.t }); shoota(c, 1150, 780, 1.2, {}, OKP.boy); }, over: (c, st) => tCaption(c, 'Мек', st.bt, 0.5, 3) },
  { at: 'Стреляло громкое', set: (c, st) => setScrap(c, st, {}), cam: [960, 680, 1.3], to: [960, 660, 1.4], look: 'warm', shake: 4, draw: (c, st) => { const back = st.bt > 2; me(c, 2, 900, Y, 0.9, { fire: !back && (st.t * 3) % 1 < 0.3, expr: back ? 'shock' : 'roar', lean: back ? -0.3 : 0, time: st.t }, { weapon: 'shoota' }); if (back) { blastFX(c, 860, 820, 0.8, st.bt - 2); smokeFX(c, 860, 760, st.t, 1, 2); } }, sfx: [['impact', 2.0, 0.6]] },
  { at: 'Мек говорит', set: setMek, cam: CU(960, Y, 1), to: [960, 640, 2.0], look: 'warm', draw: (c, st) => mek(c, 960, Y, 1, { ...talk(st), armR: -1.4 }), over: (c, st) => tLine(c, 'МНОГО ДАККИ', st.bt, 0.6, 3, 200, 100, '#f4e080') },
  { at: 'Ты не знаешь', set: (c, st) => setScrap(c, st, {}), cam: [960, 640, 1.2], to: [960, 560, 1.4], look: 'gold', draw: (c, st) => { me(c, 2, 960, Y, 1, { armR: -2.6, fire: (st.t * 4) % 1 < 0.3, expr: 'happy', time: st.t }, { weapon: 'shoota' }); } },
], { tr: 'cut' });

stage(11, [
  { set: (c, st) => setScrap(c, st, {}), cam: TWO(760, 1250, Y, 1), to: [1050, 620, 1.3], look: 'warm', draw: (c, st) => { plan(c, 1250, 640, 1); gryz(c, 760, Y, 1, { ...talk(st), armR: -1.5 }); } },
  { at: 'Если враг', set: (c, st) => setWaste(c, st, {}), cam: [700, 640, 1.0], to: [1300, 640, 1.0], ease: 'lin', look: 'warm', blur: true, draw: (c, st) => runMob(c, st, 100, 7, Y, 0.75, 230, 2) },
  { at: 'Ты спрашиваешь', set: (c, st) => setScrap(c, st, {}), cam: TWO(820, 1150, Y, 1), to: [900, 620, 1.5], look: 'warm', draw: (c, st) => { me(c, 2, 820, Y, 0.85, { ...talk(st), armL: 2.6, expr: 'talk' }); gryz(c, 1150, Y, 1, { ...ip(st), flip: true }); } },
  { at: 'Грызлак бьёт', set: (c, st) => setScrap(c, st, {}), cam: TWO(820, 1150, Y, 1), to: [960, 640, 1.4], look: 'warm', shake: 5, draw: (c, st) => { const p = clamp(st.bt / 0.4); gryz(c, 1150, Y, 1, { armR: -2.6 + p * 1.6, flip: true, expr: 'roar', time: st.t }); me(c, 2, 820, Y, 0.85, { sy: 1 - 0.1 * p, expr: 'shock' }); hitFX(c, 820, 560, 0.8, st.bt - 0.35); }, sfx: [['impact', 0.35, 0.9]] },
], { tr: 'whip' });

stage(12, [
  { set: (c, st) => setForge(c, st), cam: [960, 560, 1.0], to: [960, 600, 1.1], look: 'blood', draw: (c, st) => { runMob(c, st, -200, 9, Y, 0.7, 240, 1.5); }, over: (c, st) => tCaption(c, 'Мир-кузница', st.bt, 0.4, 3, 'первая драка') },
  { at: 'Вы бежите', set: (c, st) => setForge(c, st), cam: [960, 640, 1.2], to: [1100, 620, 1.35], look: 'blood', shake: 4, draw: (c, st) => runMob(c, st, 100, 7, Y, 0.85, 260, 2), over: (c, st) => tLine(c, 'ВАААГХ!', st.bt, st.ph('Вааагх') - st.lt + st.bt, 3, 200, 140, '#9cff4c'), sfx: [['rumble', 0.3, 0.8]] },
  { at: 'Люди стреляют', set: (c, st) => setTrenchG(c, st, {}), cam: [960, 640, 1.1], to: [960, 600, 1.2], look: 'ash', draw: (c, st) => { for (let i = 0; i < 6; i++) { guardsman(c, 1700 - i * 280, 960, 0.8, { ...pose.fire(st.t + i), flip: true }, i); lasFire(c, st, 1700 - i * 280, 960, 0.8, i, -1); } } },
  { at: 'Это щекотно', set: (c, st) => setForge(c, st), cam: CU(960, Y, 1), to: [960, 640, 2.0], look: 'blood', draw: (c, st) => { me(c, 2, 960, Y, 1, { ...ip(st), expr: 'happy' }); for (let i = 0; i < 3; i++) { const p = (st.t * 1.5 + i * 0.33) % 1; if (p < 0.2) hitFX(c, 900 + i * 60, 700 + i * 50, 0.2, p); } } },
  { at: 'Один человек', set: (c, st) => setTrenchG(c, st, {}), cam: [1100, 620, 1.5], to: [1100, 580, 1.8], look: 'ash', draw: (c, st) => { hero(c, 2, 1100, 960, 1, { ...pose.fire(st.t), flip: true }); lasFire(c, st, 1100, 960, 1, 0, -1); } },
  { at: 'Ты смеёшься', set: (c, st) => setForge(c, st), cam: [900, 640, 1.3], to: [1200, 640, 1.35], look: 'blood', draw: (c, st) => me(c, 2, 700 + st.bt * 220, Y, 1, { ...pose.run(st.t, 1), expr: 'roar', time: st.t }) },
  { at: 'Тебя останавливает', set: (c, st) => setForge(c, st), cam: [960, 640, 1.2], to: [960, 620, 1.3], look: 'blood', shake: 4, draw: (c, st) => { me(c, 2, 760, Y, 1, { lean: -0.2, expr: 'shock', time: st.t }); trooper(c, 1500, Y, 0.95, { flip: true, gunA: -0.05 }, 2); flameJet(c, 1350, 760, 650, st.t, -1); }, sfx: [['rumble', 0.2, 0.7]] },
], { tr: 'flash' });

stage(13, [
  { set: (c, st) => setForge(c, st), cam: [960, 760, 1.4], to: [960, 740, 1.6], look: 'blood', draw: (c, st) => { me(c, 2, 960, Y, 1, { lean: -1.5, expr: 'happy', time: st.t }); for (let i = 0; i < 3; i++) fireFX(c, 820 + i * 140, 960, 0.6, st.t, i); }, over: (c, st) => tLine(c, 'Какая хорошая драка', st.bt, st.ph('какая хорошая') - st.lt + st.bt, 3, 200, 80) },
  { at: 'Шнырь тушит', set: (c, st) => setForge(c, st), cam: TWO(860, 1150, Y, 0.9), to: [1000, 760, 1.6], look: 'warm', draw: (c, st) => { me(c, 2, 900, Y, 1, { lean: -1.5, blink: 1 }); shnyr(c, 1150, Y, 1.2, { armR: -1.6 + Math.sin(st.t * 10) * 0.6, flip: true, expr: 'shock', time: st.t }); dustFX(c, st.t, 30, 5, '220,200,160'); sack(c, 1260, Y, 0.5); } },
], { tr: 'cut' });

// ===================== III. СКАРБОЙ =====================
card(14, 3);

stage(15, [
  { set: (c, st) => setScrap(c, st, { dusk: true }), cam: CU(960, Y, 1), to: [960, 640, 2.4], look: 'warm', draw: (c, st) => me(c, 3, 960, Y, 1, { ...ip(st), expr: 'angry' }) },
  { at: 'Орки, которые', set: (c, st) => setScrap(c, st, { dusk: true }), cam: [960, 640, 1.1], to: [960, 600, 1.25], look: 'warm', draw: (c, st) => { me(c, 3, 960, Y, 1.05, { ...ip(st), armR: -0.4 }); mob(c, st, 300, 2, Y - 40, 0.8, 240); mob(c, st, 1380, 2, Y - 40, 0.8, 240); }, over: (c, st) => tCaption(c, 'Скарбой', st.bt, st.ph('скарбоями') - st.lt + st.bt, 3) },
  { at: 'Ну, насколько', set: (c, st) => setScrap(c, st, { dusk: true }), cam: TWO(820, 1120, Y, 0.9), to: [960, 660, 1.5], look: 'warm', draw: (c, st) => { me(c, 3, 820, Y, 1, { ...ip(st), expr: 'angry' }); oboy(c, 1120, Y, 0.85, { ...ip(st), armL: 1.6, armR: -1.6, flip: true, expr: 'happy' }, 1); } },
], { tr: 'black' });

stage(16, [
  { set: setDoc, cam: CU(960, Y, 1), to: [960, 640, 2.0], look: 'cold', draw: (c, st) => doc(c, 960, Y, 1, { ...talk(st), armR: -2.0, expr: 'happy' }), over: (c, st) => tCaption(c, 'Док', st.bt, 0.4, 3) },
  { at: 'Однажды тебе', set: setDoc, cam: [960, 700, 1.3], to: [960, 680, 1.5], look: 'cold', shake: 3, draw: (c, st) => { me(c, 3, 970, 760, 0.9, { lean: -1.5, blink: 1 }); doc(c, 1300, Y, 1, { armR: -1.4 + Math.sin(st.t * 12) * 0.4, flip: true, expr: 'happy', time: st.t }); } },
  { at: 'Она чуть длиннее', set: setDoc, cam: TWO(820, 1120, Y, 1), to: [900, 660, 1.5], look: 'cold', draw: (c, st) => { me(c, 3, 820, Y, 1, { ...ip(st), armR: -0.5, expr: 'happy' }); c.save(); c.translate(820, Y); for (let i = 0; i < 5; i++) inkLine(c, [[150 + i * 6 - 10, -410 + i * 6], [150 + i * 6 + 10, -416 + i * 6]], 4, '#3a2414'); c.restore(); doc(c, 1150, Y, 0.95, { ...talk(st), flip: true }); } },
  { at: 'Тебе нравится', set: (c, st) => setScrap(c, st, {}), cam: TWO(860, 1140, Y, 1), to: [1000, 640, 1.5], look: 'warm', shake: 4, draw: (c, st) => { const p = (st.bt % 1) ; me(c, 3, 860, Y, 1, { armR: -1.6 * Math.min(1, p * 4), expr: 'roar', time: st.t }); oboy(c, 1180 + p * 60, Y, 0.85, { lean: 0.4 * p, flip: true, expr: 'shock' }, 2); } },
], { tr: 'cut' });

stage(17, [
  { set: (c, st) => setWaste(c, st, {}), cam: [960, 620, 1.0], to: [1060, 600, 1.15], look: 'cold', draw: (c, st) => { for (let i = 0; i < 4; i++) astartes(c, 1100 + i * 260, Y, 0.85, { ...ip(st, i), flip: true }); }, over: (c, st) => tCaption(c, 'Космодесант', st.bt, 0.4, 3) },
  { at: 'Они дерутся', set: (c, st) => setWaste(c, st, {}), cam: [960, 640, 1.2], to: [960, 620, 1.35], look: 'cold', shake: 3, draw: (c, st) => { astartes(c, 1250, Y, 1, { flip: true, ...ip(st) }); for (let i = 0; i < 3; i++) oboy(c, 500 + i * 200, Y, 0.8, { lean: -0.2 - i * 0.2, expr: 'shock' }, i); blastFX(c, 700, 700, 1, (st.bt % 1.2)); } },
  { at: 'Ты в восторге', set: (c, st) => setWaste(c, st, {}), cam: CU(960, Y, 1), to: [960, 640, 2.2], look: 'gold', draw: (c, st) => me(c, 3, 960, Y, 1, { ...ip(st), expr: 'happy', armL: 1.2, armR: -1.2 }), over: (c, st) => tLine(c, 'Наконец-то достойный враг', st.bt, st.ph('Наконец') - st.lt + st.bt, 3, 200, 72) },
  { at: 'Один из них', set: (c, st) => setWaste(c, st, {}), cam: [1000, 640, 1.2], to: [960, 620, 1.3], look: 'cold', shake: 4, draw: (c, st) => { astartes(c, 1200, Y, 1, { flip: true, armR: -1.8 + Math.sin(st.t * 5) * 1.4 }); sword(c, 1080, 620, 0.6, -0.6 + Math.sin(st.t * 5) * 0.8, 1, st.t); for (let i = 0; i < 3; i++) oboy(c, 650 + i * 150, Y, 0.8, { lean: -clamp((st.bt - i * 0.5) / 0.5) * 1.5, expr: 'shock' }, i); } },
  { at: 'Ты ему аплодируешь', set: (c, st) => setWaste(c, st, {}), cam: TWO(820, 1150, Y, 1), to: [960, 640, 1.4], look: 'gold', draw: (c, st) => { const clap = Math.abs(Math.sin(st.t * 10)); me(c, 3, 820, Y, 1, { armL: -0.8 + clap * 0.4, armR: 0.8 - clap * 0.4, expr: 'happy', time: st.t }, { weapon: 'none' }); astartes(c, 1150, Y, 1, { flip: true, ...ip(st) }); } },
  { at: 'а потом бьёшь', set: (c, st) => setWaste(c, st, {}), cam: TWO(860, 1150, Y, 1), to: [1050, 600, 1.6], look: 'blood', shake: 6, draw: (c, st) => { const p = clamp(st.bt / 0.4); me(c, 3, 860, Y, 1, { armR: -2.8 + p * 2.2, expr: 'roar', time: st.t }); astartes(c, 1150, Y, 1, { flip: true, lean: -0.3 * p }); hitFX(c, 1150, 560, 1, st.bt - 0.35); }, sfx: [['clash', 0.35, 1]] },
], { tr: 'whip' });

stage(18, [
  { set: (c, st) => { setScrap(c, st, { dusk: true, fire: [960, 960, 1.6] }); dim(c, 0.35); }, cam: [960, 700, 1.3], to: [960, 660, 1.5], look: 'night', draw: (c, st) => me(c, 3, 760, Y, 1, { ...pose.sit(st.t), expr: 'neutral', head: 0.1 }) },
  { at: 'Орки воюют не', set: (c) => fillBg(c, '#1a1410'), cam: WIDE, to: [960, 540, 1.1], look: 'warm', draw: () => {}, over: (c, st) => { tLine(c, 'Не за победу.', st.bt, 0.2, 9, 420, 96); tLine(c, 'За драку.', st.bt, st.ph('за драку') - st.lt + st.bt, 9, 600, 120, '#9cff4c'); } },
  { at: 'Победа это', set: (c, st) => setWaste(c, st, { red: true }), cam: [960, 600, 1.0], to: [960, 560, 1.15], look: 'blood', draw: (c, st) => { me(c, 3, 960, Y, 1, { ...pose.march(st.t), expr: 'happy', time: st.t }); } },
], { tr: 'black' });

stage(19, [
  { set: (c, st) => setScrap(c, st, {}), cam: [960, 680, 1.2], to: [1000, 660, 1.3], look: 'warm', draw: (c, st) => { for (let i = 0; i < 4; i++) oboy(c, 500 + i * 300, Y, 0.85, { ...pose.sit(st.t + i), head: 0.25, expr: 'sad' }, i); } },
  { at: 'Скучающий орк', set: (c, st) => setScrap(c, st, {}), cam: [1000, 660, 1.3], to: [1050, 640, 1.4], look: 'warm', shake: 4, draw: (c, st) => { oboy(c, 900, Y, 1, { legR: -1.2 * Math.abs(Math.sin(st.t * 4)), expr: 'roar', time: st.t }, 3); scrapPlate(c, 1150, 900 - Math.abs(Math.sin(st.t * 4)) * 80, 180, 140, '#7a6a58', st.t); } },
  { at: 'устраиваете драки', set: (c, st) => setScrap(c, st, {}), cam: [960, 640, 1.1], to: [960, 600, 1.2], look: 'warm', shake: 3, draw: (c, st) => { for (let i = 0; i < 6; i++) oboy(c, 300 + i * 260, Y - (i % 2) * 40, 0.75, { armR: -1.6 + Math.sin(st.t * 9 + i) * 0.8, lean: Math.sin(st.t * 6 + i) * 0.2, expr: 'roar', flip: i % 2 === 0, time: st.t }, i, { weapon: 'none' }); dustFX(c, st.t, 50, 3); } },
  { at: 'Док говорит', set: setDoc, cam: CU(960, Y, 1), to: [960, 640, 2.0], look: 'cold', draw: (c, st) => { doc(c, 900, Y, 1, { ...talk(st), expr: 'happy' }); teethPile(c, 1180, Y - 30, 1.2, 24, 8); } },
], { tr: 'cut' });

stage(20, [
  { set: (c, st) => setScrap(c, st, {}), cam: CU(960, Y, 0.6), to: [960, 760, 3.0], look: 'warm', draw: (c, st) => shnyr(c, 960, Y, 1.4, { ...ip(st), expr: 'happy' }) },
  { at: 'Каждый бой', set: (c, st) => setWaste(c, st, {}), cam: [960, 700, 1.3], to: [1000, 760, 2.0], look: 'ash', shake: 2, draw: (c, st) => { blastFX(c, 500, 700, 1.2, (st.bt % 1.4)); wreck(c, 1050, 980, 0.8, 0.05); c.save(); c.beginPath(); c.rect(900, 700, 300, 230); c.clip(); shnyr(c, 1000, 1080, 1.2, { expr: 'shock', blink: (st.t % 2) < 0.1 ? 1 : 0 }); c.restore(); } },
  { at: 'а после боя', set: (c, st) => setWaste(c, st, {}), cam: [960, 720, 1.3], to: [1100, 720, 1.4], look: 'gold', draw: (c, st) => { shnyr(c, 800 + st.bt * 100, Y, 1.2, { ...pose.march(st.t), expr: 'happy', time: st.t }); helmetProp(c, 1100, Y - 20, 0.3, 0, false, 0.2); helmetProp(c, 1300, Y - 10, 0.3, 0, false, -0.3); sack(c, 700 + st.bt * 100, Y, 0.6); } },
], { tr: 'whip' });

// ===================== IV. НОБ =====================
card(21, 4);

stage(22, [
  { set: (c, st) => setScrap(c, st, {}), cam: TWO(820, 1150, Y, 1.1), to: [990, 560, 1.5], look: 'warm', draw: (c, st) => { me(c, 3, 820, Y, 1.2, { ...ip(st), head: 0.12, expr: 'angry' }); gryz(c, 1150, Y, 1, { ...ip(st), flip: true, head: -0.1, expr: 'shock' }); } },
  { at: 'Ты подходишь', set: (c, st) => setScrap(c, st, {}), cam: TWO(880, 1100, Y, 1.1), to: [990, 560, 1.7], look: 'blood', shake: 6, draw: (c, st) => { const p = clamp(st.bt / 0.4); me(c, 3, 880 + p * 40, Y, 1.2, { lean: 0.25 * p, expr: 'roar', time: st.t }); gryz(c, 1130, Y, 1, { lean: -0.2 * p, flip: true, expr: 'shock' }); hitFX(c, 1000, 480, 1, st.bt - 0.35); }, sfx: [['impact', 0.35, 1]] },
  { at: 'Вы дерётесь полдня', set: (c, st) => { setScrap(c, st, { dusk: st.bt > 2 }); }, cam: [960, 640, 1.0], to: [960, 600, 1.15], look: 'warm', shake: 3, draw: (c, st) => { for (let i = 0; i < 5; i++) oboy(c, 200 + i * 140, Y - 60, 0.6, { ...pose.sit(st.t + i), expr: 'roar', time: st.t }, i); for (let i = 0; i < 5; i++) oboy(c, 1220 + i * 140, Y - 60, 0.6, { ...pose.sit(st.t + i), expr: 'happy', flip: true, time: st.t }, i + 2); me(c, 3, 870, Y, 1.05, { armR: -1.6 + Math.sin(st.t * 7) * 1, lean: Math.sin(st.t * 5) * 0.2, expr: 'roar', time: st.t }); gryz(c, 1080, Y, 0.95, { armR: -1.6 + Math.cos(st.t * 7) * 1, flip: true, lean: Math.cos(st.t * 5) * 0.2, expr: 'roar', time: st.t }); teethPile(c, 960, Y + 60, 0.8, 16, 3); } },
], { tr: 'black' });

stage(23, [
  { set: (c, st) => setScrap(c, st, { dusk: true }), cam: [960, 700, 1.2], to: [960, 640, 1.35], look: 'gold', draw: (c, st) => { me(c, 3, 860, Y, 1.2, { armR: -2.6, expr: 'roar', time: st.t }); gryz(c, 1200, Y + 20, 1, { lean: -1.5, blink: 1 }); } },
  { at: 'Грызлак встаёт', set: (c, st) => setScrap(c, st, { dusk: true }), cam: CU(1000, Y, 1.1), to: [1000, 600, 2.2], look: 'warm', draw: (c, st) => gryz(c, 1000, Y, 1, { ...talk(st), expr: 'happy' }), over: (c, st) => tLine(c, '«Ну ладно, теперь ты босс»', st.bt, st.ph('ну ладно') - st.lt + st.bt, 3, 960, 64) },
  { at: 'И идёт в банду', set: (c, st) => setScrap(c, st, { dusk: true }), cam: [960, 640, 1.1], to: [1100, 620, 1.2], look: 'warm', draw: (c, st) => { mob(c, st, 1100, 4, Y - 20, 0.8, 220); gryz(c, 700 + st.bt * 140, Y, 1, { ...pose.march(st.t), time: st.t }); } },
  { at: 'У орков нет обид', set: (c) => fillBg(c, '#1a1410'), cam: WIDE, to: [960, 540, 1.1], look: 'warm', draw: () => {}, over: (c, st) => { tLine(c, 'Нет обид.', st.bt, 0.2, 9, 420, 96); tLine(c, 'Есть только кто больше.', st.bt, st.ph('Есть только') - st.lt + st.bt, 9, 600, 96, '#9cff4c'); } },
], { tr: 'cut' });

stage(24, [
  { set: (c, st) => setScrap(c, st, {}), cam: [960, 800, 1.4], to: [960, 500, 1.3], look: 'gold', tilt: 0.02, draw: (c, st) => me(c, 4, 960, Y, 1.05, { ...ip(st), expr: 'angry' }), over: (c, st) => tCaption(c, 'Ноб', st.bt, 0.5, 3, 'большое рубило, тяжёлая броня, шест') },
  { at: 'Ты учишься', set: (c, st) => setScrap(c, st, {}), cam: [960, 640, 1.1], to: [960, 600, 1.25], look: 'warm', draw: (c, st) => { me(c, 4, 760, Y, 1.05, { ...talk(st), armR: -1.6 }); mob(c, st, 1050, 4, Y, 0.8, 220, (i) => ({ ...ip(st, i), flip: true })); } },
  { at: 'бьёшь его головой', set: (c, st) => setScrap(c, st, {}), cam: TWO(860, 1120, Y, 1), to: [990, 560, 1.7], look: 'warm', shake: 5, draw: (c, st) => { const p = clamp(st.bt / 0.4); me(c, 4, 860, Y, 1.05, { lean: 0.25 * p, expr: 'roar', time: st.t }); oboy(c, 1140, Y, 0.85, { lean: -0.5 * p, flip: true, expr: 'shock' }, 3); hitFX(c, 1000, 520, 0.9, st.bt - 0.35); }, sfx: [['impact', 0.35, 0.9]] },
  { at: 'Если спорят двое', set: (c, st) => setScrap(c, st, {}), cam: [960, 640, 1.3], to: [960, 600, 1.5], look: 'warm', shake: 6, draw: (c, st) => { const p = clamp(st.bt / 0.6); oboy(c, 760 + p * 140, Y, 0.85, { lean: 0.3 * p, expr: p < 1 ? 'talk' : 'shock', time: st.t }, 1); oboy(c, 1160 - p * 140, Y, 0.85, { lean: -0.3 * p, flip: true, expr: p < 1 ? 'talk' : 'shock', time: st.t }, 2); hitFX(c, 960, 600, 1, st.bt - 0.55); }, sfx: [['impact', 0.55, 1]] },
], { tr: 'whip' });

stage(25, [
  { set: setMek, cam: [960, 660, 1.3], to: [1050, 640, 1.5], look: 'warm', draw: (c, st) => { mek(c, 800, Y, 1, { armR: -1.4, expr: 'happy', ...talk(st) }); c.save(); c.translate(1150, 820); for (let i = 0; i < 3; i++) { c.save(); c.rotate(-0.5 + i * 0.5); shoota(c, 0, 0, 1, {}, OKP.boy); c.restore(); } c.restore(); } },
  { at: 'В нём три ствола', set: (c, st) => setScrap(c, st, {}), cam: [960, 640, 1.2], to: [960, 620, 1.35], look: 'warm', shake: 4, draw: (c, st) => { me(c, 4, 860, Y, 1.05, { expr: 'happy', time: st.t }, { weapon: 'none' }); c.save(); c.translate(1100, 820); for (let i = 0; i < 3; i++) { c.save(); c.rotate(-0.7 + i * 0.7); shoota(c, 0, 0, 1, { fire: (st.t * 4 + i * 0.3) % 1 < 0.3 }, OKP.boy); c.restore(); } c.restore(); } },
  { at: 'Мек говорит', set: setMek, cam: CU(960, Y, 1), to: [960, 640, 2.0], look: 'warm', draw: (c, st) => mek(c, 960, Y, 1, talk(st)), over: (c, st) => tLine(c, 'КАСТОМ', st.bt, 0.5, 3, 200, 120, '#f4e080') },
  { at: 'отдаёшь ему', set: setMek, cam: TWO(820, 1120, Y, 1), to: [960, 660, 1.5], look: 'gold', draw: (c, st) => { me(c, 4, 820, Y, 1.05, { ...ip(st), armR: -1.0 }); mek(c, 1150, Y, 1, { ...ip(st), flip: true, expr: 'happy' }); sack(c, 1000, Y - 40 - Math.sin(clamp(st.bt) * Math.PI) * 120, 0.8); } },
], { tr: 'cut' });

// ===================== V. БОСС =====================
card(26, 5);

stage(27, [
  { set: (c, st) => setWaste(c, st, {}), cam: [500, 600, 1.0], to: [1400, 600, 1.0], ease: 'lin', look: 'warm', draw: (c, st) => { battlewagon(c, 300 + st.bt * 80, Y - 20, 0.9, st.t); for (let i = 0; i < 4; i++) buggy(c, 900 + i * 380 + st.bt * 100, Y + 30, 0.7, st.t + i, i % 2 ? '#b03024' : '#5a5a52', { boy: true }); }, over: (c, st) => tCaption(c, 'Орава', st.bt, 0.5, 3, 'траки, багги, боевой фургон') },
  { at: 'красное едет', set: (c, st) => setWaste(c, st, {}), cam: [960, 760, 1.2], to: [1200, 760, 1.2], look: 'warm', blur: true, draw: (c, st) => { buggy(c, 200 + st.bt * 700, Y, 0.9, st.t, '#b03024', { boy: true }); buggy(c, 400 + st.bt * 200, Y + 60, 0.9, st.t, '#2a4a8a', { flame: false, boy: true }); } },
  { at: 'Никто не может', set: (c, st) => setWaste(c, st, {}), cam: CU(960, Y, 1.05), to: [960, 640, 2.0], look: 'warm', draw: (c, st) => me(c, 5, 960, Y, 1, { ...ip(st), armL: 1.2, armR: -1.2, expr: 'happy' }) },
  { at: 'Просто все орки', set: (c, st) => setScrap(c, st, {}), cam: [960, 720, 1.3], to: [960, 700, 1.4], look: 'warm', draw: (c, st) => { buggy(c, 960, Y, 1.1, st.t * 0, '#5a5a52', { flame: false }); c.save(); c.beginPath(); c.rect(700, 700, 520 * clamp(st.bt / 3), 400); c.clip(); buggy(c, 960, Y, 1.1, 0, '#b03024', { flame: false }); c.restore(); oboy(c, 700, Y + 40, 0.8, { armR: -1.4 + Math.sin(st.t * 8) * 0.3, expr: 'happy', time: st.t }, 3); oboy(c, 1300, Y + 40, 0.8, { armR: -1.4 + Math.cos(st.t * 8) * 0.3, flip: true, expr: 'happy', time: st.t }, 0); } },
], { tr: 'black' });

stage(28, [
  { set: (c) => fillBg(c, '#1a2410'), cam: WIDE, to: [960, 540, 1.1], look: 'warm', draw: (c, st) => { c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = 0.4; sporeFX(c, st.t, 120, 4, '160,255,90'); c.restore(); }, over: (c, st) => tLine(c, 'Если все верят, оно работает', st.bt, 0.4, 9, 540, 80, '#9cff4c') },
  { at: 'Стреляло без патронов', set: (c, st) => setScrap(c, st, {}), cam: [960, 660, 1.3], to: [1000, 640, 1.45], look: 'warm', draw: (c, st) => oboy(c, 900, Y, 1, { fire: (st.t * 4) % 1 < 0.3, expr: 'happy', time: st.t }, 1) },
  { at: 'Ржавая ракета', set: (c, st) => setWaste(c, st, {}), cam: [960, 500, 1.0], to: [1200, 400, 1.1], look: 'warm', draw: (c, st) => rocket(c, 200 + st.bt * 600, 600 - st.bt * 90 + Math.sin(st.t * 5) * 40, 1.2, st.t) },
  { at: 'Люди называют', set: (c, st) => setTrenchG(c, st, {}), cam: [960, 620, 1.2], to: [960, 600, 1.35], look: 'ash', draw: (c, st) => { commissar(c, 760, 960, 0.9, { ...ip(st), expr: 'shock' }); for (let i = 0; i < 3; i++) trooper(c, 1000 + i * 250, 960, 0.8, { ...ip(st, i), expr: 'shock' }, i); } },
  { at: 'Орки называют', set: (c, st) => setScrap(c, st, {}), cam: [960, 640, 1.2], to: [960, 600, 1.3], look: 'warm', draw: (c, st) => mob(c, st, 520, 4, Y, 0.85, 280, (i) => ({ ...ip(st, i), armL: 1.4, armR: -1.4, expr: 'happy' })) },
], { tr: 'whip' });

stage(29, [
  { set: (c, st) => setMine(c, st), cam: [960, 560, 1.0], to: [960, 600, 1.1], look: 'cold', draw: () => {}, over: (c, st) => tCaption(c, 'Шахтёрская планета', st.bt, 0.5, 3) },
  { at: 'Ты становишься хитрым', set: (c, st) => setWaste(c, st, {}), cam: CU(960, Y, 1.05), to: [960, 620, 2.2], look: 'gold', draw: (c, st) => me(c, 5, 960, Y, 1, { ...ip(st), armR: -2.3, expr: 'happy', head: -0.08 }) },
  { at: 'Ты отправляешь', set: (c, st) => setMine(c, st), cam: [600, 700, 1.2], to: [800, 700, 1.25], look: 'cold', shake: 2, draw: (c, st) => { for (let i = 0; i < 4; i++) { drum(c, 200 + i * 220, Y + 20, 0.8, st.t + i); oboy(c, 260 + i * 220, Y, 0.8, { armR: -1.4 + Math.abs(Math.sin(st.t * 8 + i)) * 0.6, expr: 'roar', time: st.t }, i); } } },
  { at: 'заходишь с другой', set: (c, st) => setMine(c, st), cam: [1500, 760, 1.3], to: [1400, 760, 1.35], look: 'cold', draw: (c, st) => me(c, 5, 1700 - st.bt * 120, Y, 1, { ...pose.march(st.t), lean: 0.3, expr: 'happy', flip: true, time: st.t }) },
  { at: 'Люди в шоке', set: (c, st) => setMine(c, st), cam: [960, 640, 1.2], to: [960, 600, 1.3], look: 'cold', draw: (c, st) => { for (let i = 0; i < 4; i++) trooper(c, 500 + i * 300, Y, 0.85, { ...ip(st, i), expr: 'shock', look: i % 2 ? 1 : -1 }, i); } },
  { at: 'Орки тоже', set: (c, st) => setMine(c, st), cam: [960, 640, 1.2], to: [960, 600, 1.3], look: 'warm', draw: (c, st) => mob(c, st, 480, 4, Y, 0.85, 320, (i) => ({ ...ip(st, i), expr: 'shock' })), over: (c, st) => tLine(c, 'Никто не ожидал от орка плана', st.bt, st.ph('Никто не ожидал') - st.lt + st.bt, 3, 200, 70) },
], { tr: 'whip' });

stage(30, [
  { set: (c, st) => setWaste(c, st, {}), cam: [960, 700, 1.0], to: [960, 680, 1.15], look: 'warm', shake: 2, draw: (c, st) => { for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) buggy(c, 100 + i * 330 + r * 60 + st.bt * 60 * (r + 1), Y - 140 + r * 90, 0.45 + r * 0.1, st.t + i, '#b03024', { boy: true }); }, over: (c, st) => tCaption(c, 'Гонка', st.bt, 0.5, 3, 'сто багги, все красные') },
  { at: 'Половина взрывается', set: (c, st) => setWaste(c, st, {}), cam: [960, 680, 1.1], to: [1100, 660, 1.2], look: 'blood', shake: 5, draw: (c, st) => { for (let i = 0; i < 5; i++) { const bx = 300 + i * 350 + st.bt * 200; if (i % 2) buggy(c, bx, Y, 0.6, st.t + i, '#b03024'); else blastFX(c, bx, Y - 80, 1.2, (st.bt + i * 0.3) % 1.4); } }, sfx: [['impact', 0.3, 0.7], ['impact', 1.1, 0.7]] },
  { at: 'Победитель врезается', set: (c, st) => setWaste(c, st, {}), cam: [1200, 720, 1.3], to: [1300, 700, 1.4], look: 'warm', shake: 6, draw: (c, st) => { shape(c, [[1400, Y + 40], [1500, 560], [1700, 500], [1800, Y + 40]], '#6a5a4a', 6); const p = clamp(st.bt / 0.8); if (p < 1) buggy(c, 600 + p * 800, Y, 0.9, st.t, '#b03024', { boy: true }); else { wreck(c, 1380, Y, 0.6, 0.6, '#b03024'); blastFX(c, 1400, Y - 100, 1.4, st.bt - 0.8); } }, sfx: [['impact', 0.8, 1]] },
  { at: 'вылезает из обломков', set: (c, st) => setWaste(c, st, {}), cam: CU(1100, Y, 0.9), to: [1100, 660, 2.0], look: 'warm', draw: (c, st) => { wreck(c, 1100, Y + 30, 0.7, 0.4, '#b03024'); oboy(c, 1100, Y - 40, 0.9, { armL: 2.6, armR: -2.6, expr: 'roar', time: st.t }, 3, { weapon: 'none' }); smokeFX(c, 1000, 900, st.t, 1, 2); } },
  { at: 'Ты понимаешь', set: (c, st) => setWaste(c, st, {}), cam: CU(960, Y, 1.05), to: [960, 640, 2.2], look: 'gold', draw: (c, st) => me(c, 5, 960, Y, 1, { ...ip(st), expr: 'happy' }) },
], { tr: 'cut' });

stage(31, [
  { set: (c, st) => { setScrap(c, st, { dusk: true, fire: [960, 960, 1.8] }); dim(c, 0.3); }, cam: [960, 700, 1.15], to: [960, 680, 1.3], look: 'night', draw: (c, st) => { for (let i = 0; i < 5; i++) oboy(c, 300 + i * 340 + (i > 1 ? 120 : 0), Y, 0.8, { ...pose.sit(st.t + i), ...(i === 1 ? talk(st) : {}), armL: i === 1 ? 2.2 : 0, armR: i === 1 ? -2.2 : 0, expr: i === 1 ? 'talk' : 'happy', flip: i > 2 }, i, { weapon: 'none' }); } },
  { at: 'Истории всё', set: (c, st) => { setScrap(c, st, { dusk: true }); dim(c, 0.5); }, cam: [960, 600, 1.1], to: [960, 520, 1.2], look: 'night', draw: (c, st) => { c.save(); c.globalAlpha = 0.7; me(c, 5, 960, 900, 1.2 + clamp(st.bt / 4) * 0.8, { ...ip(st) }, {}, SIL); c.restore(); campfire2(c, 960, Y, 1.8, st.t); } },
  { at: 'Теперь ты ростом', set: (c, st) => setScrap(c, st, { dusk: true }), cam: TWO(820, 1100, Y, 1.2), to: [960, 560, 1.2], look: 'warm', draw: (c, st) => { doors(c, 1150, Y, 0.95, 2); me(c, 5, 820, Y, 1.1, { ...ip(st), expr: 'happy', armR: -0.8 }); } },
], { tr: 'black' });

// ===================== VI. ВАРБОСС =====================
card(32, 6);

stage(33, [
  { set: (c, st) => setWaste(c, st, { red: true }), cam: [960, 640, 1.1], to: [1000, 620, 1.25], look: 'blood', draw: (c, st) => { me(c, 6, 800, Y + 20, 0.9, { lean: -1.5, blink: 1 }, { pole: 0 }); astartes(c, 1200, Y, 1, { flip: true, ...ip(st) }); } },
  { at: 'Варбосс лежит', set: (c, st) => setWaste(c, st, { red: true }), cam: [960, 640, 1.0], to: [960, 600, 1.1], look: 'blood', draw: (c, st) => { me(c, 6, 960, Y + 60, 0.8, { lean: -1.5, blink: 1 }, { pole: 0 }); for (let i = 0; i < 8; i++) oboy(c, 120 + i * 240 + (i > 3 ? 160 : 0), Y - 90, 0.6, { ...ip(st, i), expr: 'shock', flip: i > 3 }, i); } },
  { at: 'Ты выходишь', set: (c, st) => setWaste(c, st, { red: true }), cam: CU(960, Y, 1.1), to: [960, 600, 2.0], look: 'gold', draw: (c, st) => me(c, 5, 960, Y, 1.1, { ...pose.march(st.t), expr: 'angry', time: st.t }) },
  { at: 'Трое других', set: (c, st) => setWaste(c, st, { red: true }), cam: [960, 640, 1.1], to: [960, 600, 1.2], look: 'blood', draw: (c, st) => { me(c, 5, 960, Y, 1.05, ip(st)); for (let i = 0; i < 3; i++) orkX(c, 400 + i * 450 + (i > 0 ? 300 : 0), Y, 1.0, { ...ip(st, i), expr: 'angry', flip: i > 0 }, { weapon: ['big', 'kustom', 'choppa'][i], armour: 'eavy', pad: true, helm: ['horns', 'iron', 'horns'][i], bulk: 0.8 }, OKP.boss); } },
  { at: 'Через час', set: (c, st) => setWaste(c, st, { red: true }), cam: [960, 640, 1.1], to: [960, 580, 1.25], look: 'gold', draw: (c, st) => { me(c, 5, 960, Y, 1.1, { armR: -2.6, expr: 'roar', time: st.t }); for (let i = 0; i < 3; i++) orkX(c, 400 + i * 450 + (i > 0 ? 300 : 0), Y, 1.0, { sy: 0.8, expr: 'sad', flip: i > 0 }, { weapon: 'none', armour: 'eavy', pad: true, helm: ['horns', 'iron', 'horns'][i], bulk: 0.8 }, OKP.boss); }, over: (c, st) => tLine(c, 'Немного ниже', st.bt, st.ph('Остальные трое') - st.lt + st.bt + 1.5, 3, 200, 76) },
], { tr: 'black' });

stage(34, [
  { set: setMek, cam: [960, 500, 1.0], to: [960, 600, 1.2], look: 'warm', draw: (c, st) => { me(c, 6, 960, Y, 1.1, { time: st.t, blink: 1, expr: 'angry' }, { pole: 0 }); mek(c, 520, Y, 0.85, { armR: -1.6 + Math.sin(st.t * 12) * 0.3, time: st.t, expr: 'happy' }); }, over: (c, st) => tCaption(c, 'Мега-броня', st.bt, 0.5, 3) },
  { at: 'Пластины толщиной', set: setMek, cam: [960, 500, 2.4], to: [1100, 460, 2.6], look: 'warm', draw: (c, st) => me(c, 6, 960, Y, 1.1, { time: st.t }) },
  { at: 'трубы над плечами', set: setMek, cam: [960, 300, 2.2], to: [960, 200, 2.4], look: 'warm', draw: (c, st) => me(c, 6, 960, Y, 1.1, { time: st.t }) },
  { at: 'левой руки', set: setMek, cam: [760, 760, 2.2], to: [760, 760, 2.6], look: 'warm', draw: (c, st) => me(c, 6, 960, Y, 1.1, { time: st.t, klaw: 0.5 + 0.5 * Math.sin(st.t * 4) }) },
  { at: 'Клешня режет', set: (c, st) => setWaste(c, st, {}), cam: [960, 640, 1.1], to: [960, 620, 1.25], look: 'warm', shake: 4, draw: (c, st) => { const p = clamp((st.bt - 1) / 1); c.save(); c.beginPath(); c.rect(BX0, BY0, 1200 - BX0, BY1 - BY0); c.clip(); lemanRuss(c, 1200 - p * 60, Y, 1, st.t, -1); c.restore(); c.save(); c.beginPath(); c.rect(1200, BY0, BX1 - 1200, BY1 - BY0); c.clip(); c.translate(1200, Y); c.rotate(p * 0.15); c.translate(-1200, -Y); lemanRuss(c, 1200 + p * 80, Y, 1, st.t, -1); c.restore(); me(c, 6, 700, Y, 1, { armL: -1.4 + p * 1.2, klaw: 1 - p, expr: 'roar', time: st.t }); }, over: (c, st) => tLine(c, 'Режет.', st.bt, st.ph('Режет') - st.lt + st.bt, 3, 200, 110, '#f4e080'), sfx: [['clash', 1.0, 1]] },
], { tr: 'whip' });

stage(35, [
  { set: (c, st) => setWaste(c, st, { red: true }), cam: [960, 600, 1.2], to: [960, 600, 1.4], look: 'blood', shake: 6, draw: (c, st) => { astartes(c, 1250, Y, 1, { flip: true, armR: -2 + clamp(st.bt) * 2 }); sword(c, 1120, 560, 0.7, -1 + clamp(st.bt) * 1.5, 1, st.t); me(c, 6, 800, Y, 1, { lean: -0.3 * clamp(st.bt), expr: 'shock', time: st.t }); hitFX(c, 860, 360, 1.4, st.bt - 0.8); }, sfx: [['clash', 0.8, 1]] },
  { at: 'Док долго', set: setDoc, cam: [960, 700, 1.2], to: [960, 660, 1.4], look: 'cold', draw: (c, st) => { me(c, 6, 970, 760, 0.8, { lean: -1.5, blink: 1 }, { pole: 0, helm: 'none' }); doc(c, 1400, Y, 1, { armR: -1.6 + Math.sin(st.t * 10) * 0.4, flip: true, expr: 'happy', time: st.t }); } },
  { at: 'череп железную', set: (c) => fillBg(c, '#2a3a2a'), cam: [960, 300, 2.6], to: [960, 260, 3.0], look: 'cold', draw: (c, st) => me(c, 6.5, 960, Y, 1.1, { blink: 1, time: st.t }, { pole: 0 }) },
  { at: 'Когда ты встаёшь', set: (c, st) => { setWaste(c, st, { red: true }); dim(c, 0.4); }, cam: [960, 500, 1.2], to: [960, 360, 1.6], look: 'warp', draw: (c, st) => { me(c, 6.5, 960, Y, 1.1, { ...ip(st), expr: 'shock' }); goldLight(c, 960, 220, 14, st.t, 0.6); } },
  { at: 'Это Горк и Морк', set: (c, st) => { sky(c, '#0a1a0a', '#2a4a1a'); }, cam: WIDE, to: [960, 520, 1.1], look: 'toxic', draw: (c, st) => { godHead(c, 560, 460, 1.2, 'gork', st.t); godHead(c, 1360, 460, 1.2, 'mork', st.t); }, over: (c, st) => tCaption(c, 'Горк и Морк', st.bt, 0.4, 3, 'боги орков') },
  { at: 'Горк говорит', set: (c, st) => { sky(c, '#0a1a0a', '#2a4a1a'); }, cam: [560, 460, 1.8], to: [560, 440, 2.0], look: 'toxic', shake: 3, draw: (c, st) => godHead(c, 560, 460, 1.2, 'gork', st.t, 0.8), over: (c, st) => tLine(c, 'Бить сильнее!', st.bt, 0.4, 3, 960, 90, '#9cff4c') },
  { at: 'Морк говорит', set: (c, st) => { sky(c, '#0a1a0a', '#2a4a1a'); }, cam: [1360, 460, 1.8], to: [1360, 440, 2.0], look: 'toxic', draw: (c, st) => godHead(c, 1360, 460, 1.2, 'mork', st.t, 0.8), over: (c, st) => tLine(c, 'Бить хитрее!', st.bt, 0.4, 3, 960, 90, '#9cff4c') },
  { at: 'Ты решаешь', set: (c, st) => setWaste(c, st, { red: true }), cam: CU(960, Y, 1.1), to: [960, 400, 1.8], look: 'gold', draw: (c, st) => me(c, 6.5, 960, Y, 1.1, { ...ip(st), expr: 'happy', klaw: 0.8 }) },
], { tr: 'flash' });

stage(36, [
  { set: (c, st) => setWaste(c, st, {}), cam: [960, 640, 1.0], to: [1100, 600, 1.1], look: 'warm', draw: (c, st) => { me(c, 6.5, 1100 + st.bt * 60, Y, 1, { ...pose.march(st.t), time: st.t }, { pole: 0 }); shnyr(c, 720 + st.bt * 60, Y, 1.3, { ...pose.march(st.t + 0.3), expr: 'happy', time: st.t }, { pole: 2 }); } },
  { at: 'Это самая почётная', set: (c, st) => setWaste(c, st, {}), cam: CU(960, Y, 0.7), to: [960, 640, 2.2], look: 'gold', draw: (c, st) => shnyr(c, 960, Y, 1.4, { ...ip(st), expr: 'happy' }, { pole: 2 }) },
  { at: 'Он очень гордится', set: (c, st) => setWaste(c, st, {}), cam: [960, 640, 1.4], to: [960, 600, 1.6], look: 'warm', draw: (c, st) => shnyr(c, 960, Y, 1.4, { lean: Math.sin(st.t * 3) * 0.18, legL: Math.sin(st.t * 6) * 0.3, expr: 'shock', time: st.t }, { pole: 2 }) },
], { tr: 'cut' });

// ===================== VII. ВАРЛОРД =====================
card(37, 7);

stage(38, [
  { set: (c, st) => setSpace(c, st, {}), cam: WIDE, to: [960, 540, 1.2], look: 'toxic', draw: (c, st) => { for (let i = 0; i < 9; i++) { const x = 220 + (i % 5) * 360, y = 280 + Math.floor(i / 5) * 420 + (i % 2) * 80; planet(c, x, y, 60, '#4a6a5a', '#6a8a6a', { seed: i }); if (st.bt > i * 0.4) glyph(c, x, y, 0.6, '#9cff4c'); } }, over: (c, st) => tCaption(c, 'Слухи', st.bt, 0.5, 3, 'варбосс, который слышит богов') },
  { at: 'К тебе прилетают', set: (c, st) => setScrap(c, st, { dusk: true }), cam: [960, 500, 1.0], to: [960, 560, 1.1], look: 'warm', draw: (c, st) => { for (let i = 0; i < 3; i++) rok(c, 300 + i * 650, -200 + st.bt * 120 + i * 60, 0.25, st.t); } },
  { at: 'Одни приходят служить', set: (c, st) => setScrap(c, st, { dusk: true }), cam: [960, 600, 1.0], to: [960, 600, 1.15], look: 'warm', draw: (c, st) => { me(c, 7, 960, Y, 1, ip(st)); for (let i = 0; i < 2; i++) orkX(c, 400 + i * 1100, Y, 1, { lean: i ? -0.5 : 0.5, flip: i === 1, expr: 'neutral' }, { weapon: 'none', armour: 'eavy', pad: true, helm: 'iron', bulk: 1 }, OKP.boss); } },
  { at: 'Другие приходят', set: (c, st) => setScrap(c, st, { dusk: true }), cam: [960, 600, 1.1], to: [1000, 580, 1.25], look: 'blood', shake: 5, draw: (c, st) => { me(c, 7, 900, Y, 1, { klaw: Math.abs(Math.sin(st.t * 4)), lean: Math.sin(st.t * 5) * 0.08, expr: 'roar', time: st.t }); orkX(c, 1350, Y, 1.05, { armR: -1.8 + Math.sin(st.t * 8) * 0.8, flip: true, expr: 'roar', time: st.t }, { weapon: 'big', armour: 'eavy', pad: true, helm: 'horns', bulk: 1 }, OKP.boss); hitFX(c, 1150, 600, 1, (st.bt % 0.9)); } },
  { at: 'После драки', set: (c, st) => setScrap(c, st, { dusk: true }), cam: [960, 600, 1.0], to: [960, 600, 1.12], look: 'gold', draw: (c, st) => { me(c, 7, 960, Y, 1, { ...ip(st), expr: 'happy' }); for (let i = 0; i < 4; i++) orkX(c, 260 + i * 460 + (i > 1 ? 360 : 0), Y, 0.9, { lean: i > 1 ? -0.5 : 0.5, flip: i > 1, expr: 'sad', blink: 1 }, { weapon: 'none', armour: 'eavy', pad: true, helm: 'iron', bulk: 1, scars: true }, OKP.boss); } },
], { tr: 'black' });

stage(39, [
  { set: (c, st) => setWaste(c, st, {}), cam: [960, 640, 1.0], to: [960, 600, 1.1], look: 'warm', draw: (c, st) => { for (let r = 0; r < 4; r++) mob(c, st, -100 + r * 60, 13, Y - 200 + r * 70, 0.35 + r * 0.08, 170, (i) => ({ ...ip(st, i + r), expr: 'roar', armR: -2.2 })); } },
  { at: 'Вы летите в космос', set: (c, st) => setSpace(c, st, {}), cam: [960, 540, 1.0], to: [1200, 500, 1.1], look: 'warm', draw: (c, st) => { for (let i = 0; i < 5; i++) rok(c, -200 + i * 450 + st.bt * 160, 300 + (i % 2) * 420, 0.35 + (i % 3) * 0.1, st.t + i); } },
  { at: 'Рок это астероид', set: (c, st) => setSpace(c, st, {}), cam: [960, 540, 1.3], to: [960, 540, 1.5], look: 'warm', draw: (c, st) => rok(c, 960, 540, 1.0, st.t), over: (c, st) => tCaption(c, 'Рок', st.bt, 0.4, 3, 'астероид с двигателями и пушками') },
  { at: 'Он не должен', set: (c, st) => setSpace(c, st, {}), cam: WIDE, to: [960, 540, 1.1], look: 'warm', draw: (c, st) => rok(c, 960, 560, 0.8, st.t), over: (c, st) => tLine(c, 'Он не должен летать', st.bt, 0.4, 3, 900, 72) },
  { at: 'Но орки верят', set: (c, st) => setSpace(c, st, {}), cam: [960, 400, 1.4], to: [960, 380, 1.6], look: 'gold', draw: (c, st) => { rok(c, 960, 900, 1.3, st.t); mob(c, st, 700, 4, 600, 0.55, 170, (i) => ({ armL: 2.4, armR: -2.4, expr: 'roar', time: st.t, bob: -Math.abs(Math.sin(st.t * 6 + i)) * 20 })); } },
], { tr: 'whip' });

stage(40, [
  { set: (c, st) => setScrap(c, st, { dusk: true }), cam: CU(1000, Y, 1.0), to: [1000, 400, 1.6], look: 'blood', draw: (c, st) => megaBoss(c, 1000, Y, 0.95, { ...talk(st), expr: 'roar' }, { helm: 'horns', pole: 2 }, OKP2.skarg), over: (c, st) => tCaption(c, 'Скаргнаш', st.bt, 0.5, 3) },
  { at: 'Он вызывает тебя', set: (c, st) => setSpace(c, st, {}), cam: [960, 600, 1.0], to: [960, 600, 1.1], look: 'cold', draw: (c, st) => { rok(c, 960, 1600, 2.6, st.t); me(c, 7, 720, 960, 0.8, ip(st)); megaBoss(c, 1250, 960, 0.75, { ...ip(st), flip: true, expr: 'roar' }, { helm: 'horns' }, OKP2.skarg); } },
  { at: 'Вы дерётесь три часа', set: (c, st) => setSpace(c, st, {}), cam: [960, 560, 1.2], to: [960, 540, 1.3], look: 'cold', shake: 3, draw: (c, st) => { const f = Math.sin(st.t * 1.2) * 40; me(c, 7, 820, 900 + f, 0.8, { klaw: Math.abs(Math.sin(st.t * 3)), lean: Math.sin(st.t * 0.9) * 0.4, expr: 'roar', time: st.t }); megaBoss(c, 1150, 900 - f, 0.75, { flip: true, lean: Math.cos(st.t * 0.9) * 0.4, expr: 'roar', time: st.t }, { helm: 'horns' }, OKP2.skarg); hitFX(c, 980, 560, 1, (st.bt % 1.1)); }, over: (c, st) => tCaption(c, 'Три часа', st.bt, 0.5, 2.5, 'без воздуха, без гравитации') },
  { at: 'В конце Скаргнаш', set: (c, st) => setSpace(c, st, {}), cam: WIDE, to: [1200, 400, 1.2], look: 'cold', draw: (c, st) => { const p = st.bt / 3; c.save(); c.translate(1000 + p * 900, 700 - p * 600); c.rotate(st.t * 3); megaBoss(c, 0, 400, 0.6 * (1 - p * 0.7), { expr: 'shock', time: st.t }, { helm: 'horns' }, OKP2.skarg); c.restore(); } },
  { at: 'Говорят, он до сих пор', set: (c, st) => setSpace(c, st, {}), cam: WIDE, to: [960, 540, 1.1], look: 'cold', draw: (c, st) => { c.save(); c.translate(1450 + st.bt * 20, 300); c.rotate(st.t * 2); megaBoss(c, 0, 60, 0.12, { expr: 'roar', time: st.t }, { helm: 'horns' }, OKP2.skarg); c.restore(); }, over: (c, st) => tLine(c, '...и ругается', st.bt, 0.6, 4, 900, 72) },
], { tr: 'cut' });

stage(41, [
  { set: setMek, cam: [960, 500, 1.0], to: [960, 400, 1.1], look: 'warm', draw: (c, st) => { gargant(c, 960, Y, 0.7, 0, { walk: 0 }); for (let i = 0; i < 4; i++) mek(c, 300 + i * 450, Y, 0.55, { armR: -1.8 + Math.sin(st.t * 10 + i) * 0.4, time: st.t, expr: 'happy' }); }, over: (c, st) => tCaption(c, 'Гаргант', st.bt, 0.5, 3) },
  { at: 'Это огромная', set: (c, st) => setWaste(c, st, { red: true }), cam: [960, 760, 1.0], to: [960, 260, 1.0], tilt: 0.02, look: 'blood', draw: (c, st) => gargant(c, 960, 1100, 1.0, st.t) },
  { at: 'Когда он идёт', set: (c, st) => setMine(c, st), cam: [960, 600, 1.0], to: [960, 620, 1.1], look: 'cold', shake: 6, draw: (c, st) => { for (let i = 0; i < 5; i++) { const drop = clamp((st.bt - i * 0.3) / 1); trooper(c, 400 + i * 280, 620, 0.5, { expr: 'shock', armR: -0.5 * drop }, i, drop > 0.5 ? { weapon: 'none' } : {}); } c.save(); c.globalAlpha = 0.8; gargant(c, 1700, 1500, 0.7, st.t); c.restore(); }, sfx: [['rumble', 0.2, 1], ['rumble', 1.6, 1]] },
  { at: 'Гаргант похож', set: (c, st) => setWaste(c, st, { red: true }), cam: [960, 560, 1.0], to: [960, 560, 1.1], look: 'gold', draw: (c, st) => { c.save(); c.beginPath(); c.rect(BX0, BY0, 960 - BX0, BY1 - BY0); c.clip(); me(c, 7, 600, 1500, 1.6, ip(st)); c.restore(); c.save(); c.beginPath(); c.rect(960, BY0, BX1 - 960, BY1 - BY0); c.clip(); gargant(c, 1400, 2300, 1.4, st.t); c.restore(); rect(c, 954, BY0, 12, BY1 - BY0, '#1a1410', 0, 0); } },
  { at: 'Меки говорят', set: setMek, cam: CU(960, Y, 1), to: [960, 640, 2.0], look: 'warm', draw: (c, st) => mek(c, 960, Y, 1, { ...talk(st), armL: 1.2, armR: -1.2 }), over: (c, st) => tLine(c, '«Случайно»', st.bt, 0.6, 3, 200, 90) },
  { at: 'Ты им не веришь', set: (c, st) => setWaste(c, st, { red: true }), cam: CU(960, Y, 1.1), to: [960, 380, 2.0], look: 'gold', draw: (c, st) => me(c, 7, 960, Y, 1.1, { ...ip(st), expr: 'happy' }) },
], { tr: 'whip' });

stage(42, [
  { set: (c, st) => setSpace(c, st, { planet: [1500, 900, 600] }), cam: [960, 540, 1.0], to: [1200, 600, 1.15], look: 'blood', draw: (c, st) => { for (let i = 0; i < 9; i++) rok(c, -300 + (i % 5) * 420 + st.bt * 140, 200 + Math.floor(i / 5) * 360 + (i % 2) * 90, 0.22 + (i % 3) * 0.06, st.t + i); }, over: (c, st) => tCaption(c, 'Имперская система', st.bt, 0.5, 3) },
  { at: 'Люди называют', set: (c) => fillBg(c, '#141418'), cam: WIDE, to: [960, 540, 1.1], look: 'cold', draw: () => {}, over: (c, st) => tLine(c, 'НАШЕСТВИЕ', st.bt, 0.2, 3, 540, 120, '#c8ccd8') },
  { at: 'Орки называют', set: (c) => fillBg(c, '#0e1a08'), cam: WIDE, to: [960, 540, 1.2], look: 'toxic', shake: 6, draw: (c, st) => { c.save(); c.globalCompositeOperation = 'lighter'; sporeFX(c, st.t * 2, 100, 7, '160,255,90'); c.restore(); }, over: (c, st) => tLine(c, 'ВАААГХ!', st.bt, 0.2, 3, 560, 220, '#9cff4c'), sfx: [['rumble', 0.2, 1]] },
  { at: 'И теперь это', set: (c, st) => setWaste(c, st, { red: true }), cam: CU(960, Y, 1.1), to: [960, 400, 2.0], look: 'blood', shake: 4, draw: (c, st) => me(c, 7, 960, Y, 1.1, { expr: 'roar', klaw: 1, time: st.t }) },
], { tr: 'flash' });

// ===================== VIII. ПРОРОК ВАААГХ =====================
card(43, 8);

stage(44, [
  { set: (c, st) => setWaste(c, st, { red: true }), cam: [960, 600, 1.0], to: [960, 560, 1.1], look: 'blood', shake: 2, draw: (c, st) => { for (let r = 0; r < 6; r++) mob(c, st, -200 + r * 40, 16, Y - 330 + r * 70, 0.25 + r * 0.07, 150, (i) => ({ ...ip(st, i + r), expr: 'roar', armR: -2.4 + Math.sin(st.t * 6 + i) * 0.2 })); }, over: (c, st) => tCaption(c, 'Миллионы орков', st.bt, 0.4, 2.5) },
  { at: 'Тысячи кораблей', set: (c, st) => setSpace(c, st, {}), cam: WIDE, to: [960, 540, 1.15], look: 'blood', draw: (c, st) => { for (let i = 0; i < 24; i++) rok(c, -300 + (i % 8) * 340 + st.bt * 80, 120 + Math.floor(i / 8) * 360 + (i % 2) * 60, 0.12 + (i % 3) * 0.04, st.t + i); } },
  { at: 'Целый сектор', set: (c, st) => setSpace(c, st, {}), cam: WIDE, to: [960, 540, 1.2], look: 'blood', draw: (c, st) => { for (let i = 0; i < 9; i++) { const x = 220 + (i % 5) * 360, y = 280 + Math.floor(i / 5) * 420 + (i % 2) * 80; planet(c, x, y, 60, '#8a2a14', '#c0501a', { seed: i }); fireFX(c, x, y + 40, 0.5, st.t, i); } } },
  { at: 'Тебя называют', set: (c, st) => { setWaste(c, st, { red: true }); }, cam: [960, 760, 1.0], to: [960, 360, 1.2], tilt: 0.02, look: 'gold', draw: (c, st) => { beam(c, 960, 0, 500, 1100, 0.4); me(c, 8, 960, Y, 1.15, { ...ip(st), expr: 'angry' }); }, over: (c, st) => tCaption(c, 'Пророк Вааагх', st.bt, 0.5, 3) },
  { at: 'Ты не знаешь', set: (c, st) => setWaste(c, st, { red: true }), cam: CU(960, Y, 1.1), to: [960, 380, 2.0], look: 'gold', draw: (c, st) => me(c, 8, 960, Y, 1.15, { ...ip(st), expr: 'neutral' }) },
  { at: 'А у орков', set: (c, st) => setWaste(c, st, { red: true }), cam: [960, 600, 1.0], to: [960, 560, 1.12], look: 'gold', shake: 3, draw: (c, st) => { for (let r = 0; r < 3; r++) mob(c, st, -100 + r * 60, 12, Y - 160 + r * 80, 0.4 + r * 0.1, 190, (i) => ({ armL: 2.5, armR: -2.5, expr: 'roar', time: st.t, bob: -Math.abs(Math.sin(st.t * 6 + i)) * 20 })); } },
], { tr: 'black' });

stage(45, [
  { set: (c, st) => setTrenchG(c, st, {}), cam: [960, 600, 1.0], to: [1050, 580, 1.12], look: 'cold', draw: (c, st) => { lemanRuss(c, 400, 900, 0.8, st.t, 1, (st.t * 0.8) % 1 < 0.15); for (let i = 0; i < 4; i++) { trooper(c, 900 + i * 220, 960, 0.75, pose.fire(st.t + i), i); } for (let i = 0; i < 2; i++) astartes(c, 1700 + i * 230, 960, 0.8, ip(st, i)); }, over: (c, st) => tCaption(c, 'Империум', st.bt, 0.4, 3, 'гвардия, флот, космодесант, титаны') },
  { at: 'Где-то на орбите', set: (c, st) => setBridgeG(c, st, {}), cam: CU(960, 1180, 1), to: [960, 780, 2.0], look: 'cold', draw: (c, st) => hero(c, 8, 960, 1180, 1, { ...ip(st), expr: 'neutral' }) },
  { at: 'Перо не дрожит', set: (c) => fillBg(c, '#e8dcbc'), cam: [1000, 560, 1.4], to: [1060, 580, 1.8], look: 'warm', draw: (c, st) => { const p = clamp(st.bt / 1.4); c.strokeStyle = '#1a1410'; c.lineWidth = 6; c.beginPath(); for (let k = 0; k <= 40 * p; k++) { const x = 900 + k * 8, y = 620 + Math.sin(k * 0.6) * 22; k ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); } },
  { at: 'Ты смеёшься', set: (c, st) => setBurnWorld(c, st), cam: CU(960, Y, 1.1), to: [960, 380, 2.0], look: 'blood', shake: 3, draw: (c, st) => me(c, 8, 960, Y, 1.15, { expr: 'happy', time: st.t, head: Math.sin(st.t * 9) * 0.05 }) },
  { at: 'Это лучшая драка', set: (c, st) => setBurnWorld(c, st), cam: [960, 600, 1.0], to: [960, 560, 1.12], look: 'blood', shake: 4, draw: (c, st) => { runMob(c, st, -300, 9, Y, 0.7, 240, 1.4); for (let i = 0; i < 3; i++) blastFX(c, 500 + i * 500, 700, 1.3, (st.bt + i * 0.4) % 1.3); } },
], { tr: 'whip' });

stage(46, [
  { set: (c, st) => setMine(c, st), cam: [960, 640, 1.0], to: [960, 600, 1.12], look: 'cold', draw: (c, st) => { for (let i = 0; i < 4; i++) wanted(c, 360 + i * 400, 520, 0.55, (i - 1.5) * 0.05); } },
  { at: 'печатают твоё лицо', set: (c) => fillBg(c, '#3a3a3e'), cam: WIDE, to: [960, 520, 1.25], look: 'cold', draw: (c, st) => wanted(c, 960, 560, 1.4, -0.03) },
  { at: 'Ты просишь Шныря', set: (c, st) => setBurnWorld(c, st), cam: TWO(760, 1150, Y, 1), to: [1050, 660, 1.5], look: 'warm', draw: (c, st) => { me(c, 8, 700, Y, 1, ip(st)); shnyr(c, 1150, Y, 1.3, { ...ip(st), flip: true, expr: 'shock' }, { weapon: 'none' }); c.save(); c.translate(1150, 760); c.rotate(Math.PI); wanted(c, 0, 0, 0.3, 0); c.restore(); } },
  { at: 'Шнырь читать', set: (c, st) => setBurnWorld(c, st), cam: CU(1000, Y, 0.7), to: [1000, 720, 2.6], look: 'warm', draw: (c, st) => shnyr(c, 1000, Y, 1.4, { ...talk(st), expr: 'talk' }, { weapon: 'none' }), over: (c, st) => tLine(c, '«Много»', st.bt, st.ph('много.') - st.lt + st.bt, 3, 200, 90) },
  { at: 'Ты доволен', set: (c, st) => setBurnWorld(c, st), cam: CU(960, Y, 1.1), to: [960, 380, 2.0], look: 'gold', draw: (c, st) => me(c, 8, 960, Y, 1.15, { ...ip(st), expr: 'happy' }), over: (c, st) => tLine(c, 'Хорошая голова должна дорого стоить', st.bt, st.ph('Хорошая голова') - st.lt + st.bt, 3, 960, 60) },
], { tr: 'cut' });

stage(47, [
  { set: (c, st) => setBurnWorld(c, st), cam: TWO(700, 1250, Y, 1), to: [960, 560, 1.15], look: 'blood', draw: (c, st) => { me(c, 8, 700, Y, 1.0, ip(st)); chMaster(c, 1250, Y, 1.1, { ...ip(st), flip: true }); sword(c, 1080, 640, 0.7, 0.4, 1, st.t); }, over: (c, st) => tCaption(c, 'Магистр ордена', st.bt, 0.5, 3) },
  { at: 'Вы дерётесь среди', set: (c, st) => setBurnWorld(c, st), cam: [960, 560, 1.15], to: [960, 540, 1.3], look: 'blood', shake: 5, draw: (c, st) => { me(c, 8, 780, Y, 1.0, { klaw: Math.abs(Math.sin(st.t * 4)), lean: Math.sin(st.t * 5) * 0.1, expr: 'roar', time: st.t }); chMaster(c, 1180, Y, 1.1, { flip: true, armR: -1.8 + Math.sin(st.t * 6) * 1, lean: Math.cos(st.t * 5) * 0.1 }); hitFX(c, 980, 560, 1.2, (st.bt % 0.8)); }, sfx: [['clash', 0.4, 1], ['clash', 1.4, 1]] },
  { at: 'Его меч ломается', set: (c, st) => setBurnWorld(c, st), cam: [980, 560, 1.8], to: [980, 540, 2.2], look: 'blood', shake: 6, draw: (c, st) => { const p = clamp(st.bt / 1.5); chMaster(c, 1180, Y, 1.1, { flip: true, armR: -1.2 }); for (let i = 0; i < 3; i++) { c.save(); c.translate(1000 + i * 40 + p * (i - 1) * 300, 560 - p * 200 + p * p * 400); c.rotate(p * (i + 1) * 3); rect(c, -40, -8, 80, 16, '#c9ced6', 3, 4); c.restore(); } hitFX(c, 980, 560, 1.4, st.bt); }, sfx: [['clash', 0.1, 1]] },
  { at: 'Твоя клешня', set: (c, st) => setBurnWorld(c, st), cam: [800, 760, 1.6], to: [800, 740, 1.9], look: 'blood', shake: 6, draw: (c, st) => { const p = clamp(st.bt / 1.5); me(c, 8, 960, Y, 1.0, { expr: 'shock', time: st.t, klaw: 1 }); for (let i = 0; i < 3; i++) { c.save(); c.translate(700 + p * (i - 1) * 260, 820 - p * 160 + p * p * 300); c.rotate(p * (i + 2) * 2); const bl = P(); bl.moveTo(-14, 0); bl.lineTo(14, 0); bl.lineTo(4, 110); bl.closePath(); sfill(c, bl, '#bcc2ca', 4); c.restore(); } hitFX(c, 720, 760, 1.2, st.bt); }, sfx: [['clash', 0.1, 1]] },
  { at: 'Вы бьёте друг друга', set: (c, st) => setBurnWorld(c, st), cam: TWO(820, 1120, Y, 1), to: [960, 560, 1.4], look: 'blood', shake: 5, draw: (c, st) => { const a = Math.sin(st.t * 5); me(c, 8, 820, Y, 1.0, { armR: -1.4 * Math.max(0, a), lean: -0.1 * Math.max(0, -a), expr: 'roar', time: st.t }); chMaster(c, 1120, Y, 1.05, { flip: true, armR: -1.4 * Math.max(0, -a), lean: -0.1 * Math.max(0, a) }); }, sfx: [['impact', 0.3, 0.8], ['impact', 0.9, 0.8], ['impact', 1.5, 0.8]] },
  { at: 'падаете оба', set: (c, st) => setBurnWorld(c, st), cam: [960, 700, 1.2], to: [960, 760, 1.4], look: 'blood', shake: 4, draw: (c, st) => { const p = clamp(st.bt / 1.2); me(c, 8, 760, Y, 1.0, { lean: -1.5 * ease.io(p), blink: p > 0.9 ? 1 : 0 }); chMaster(c, 1200, Y, 1.05, { flip: true, lean: -1.5 * ease.io(p) }); }, sfx: [['rumble', 1.0, 1]] },
], { tr: 'flash' });

stage(48, [
  { set: (c, st) => { sky(c, '#2a0a08', '#e06030'); dustFX(c, st.t, 60, 4, '255,170,90'); }, cam: [960, 400, 1.0], to: [960, 420, 1.1], look: 'blood', draw: (c, st) => { for (let i = 0; i < 4; i++) smokeFX(c, 200 + i * 520, 900, st.t, 2.4, i, '30,20,18', 0.5); } },
  { at: 'Тебе не страшно', set: (c, st) => { setBurnWorld(c, st); dim(c, 0.3); }, cam: [200, 930, 2.4], to: [200, 920, 2.8], look: 'blood', draw: (c, st) => me(c, 8, 760, Y, 1.0, { lean: -1.5, expr: 'happy' }) },
  { at: 'Смерть это', set: (c) => fillBg(c, '#140a06'), cam: WIDE, to: [960, 540, 1.1], look: 'warm', draw: () => {}, over: (c, st) => tLine(c, 'Смерть это просто конец одной драки', st.bt, 0.3, 4, 540, 70) },
  { at: 'Твоё тело начинает', set: (c, st) => setBurnWorld(c, st), cam: [800, 760, 1.4], to: [900, 500, 1.2], look: 'gold', draw: (c, st) => { c.save(); c.globalAlpha = 1 - clamp(st.bt / 4) * 0.9; me(c, 8, 760, Y, 1.0, { lean: -1.5, blink: 1 }); c.restore(); c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = clamp(st.bt / 1.5); sporeFX(c, -st.t * 3, 180, 13, '170,255,110'); c.restore(); } },
  { at: 'Ветер уносит', set: (c, st) => setSpace(c, st, { planet: [1400, 600, 260] }), cam: [700, 540, 1.0], to: [1300, 560, 1.4], look: 'gold', draw: (c, st) => { c.save(); c.globalCompositeOperation = 'lighter'; c.translate(st.bt * 160, 0); sporeFX(c, st.t * 2, 120, 14, '170,255,110'); c.restore(); } },
], { tr: 'cut' });

stage(49, [
  { set: (c, st) => { setBurnWorld(c, st); dim(c, 0.35); }, cam: [980, 900, 2.0], to: [980, 880, 2.5], look: 'ash', draw: (c, st) => { shnyr(c, 980, Y, 1.4, { ...pose.sit(st.t), expr: 'sad', head: 0.15 + Math.sin(st.t * 3) * 0.03 }, { pole: 2 }); } },
], { tr: 'black' });

stage(50, [
  { set: setCave, cam: [960, 760, 1.4], to: [960, 720, 1.7], look: 'gold', shake: 2, draw: (c, st) => { const p = clamp(st.bt / 2.5); me(c, 1, 960, Y + 360 * (1 - ease.out(p)), 1, { ...ip(st), armR: -2.4 + p, armL: 2.4 - p, expr: p < 1 ? 'shock' : 'angry' }); c.fillStyle = '#2a2218'; c.fillRect(600, Y, 720, 400); }, over: (c, st) => tCaption(c, 'Через несколько лет', st.bt, 0.5, 3) },
  { at: 'Он оглядывается', set: setCave, cam: [960, 680, 1.4], to: [960, 660, 1.5], look: 'gold', draw: (c, st) => me(c, 1, 960, Y, 1, { ...ip(st), head: Math.sin(st.t * 2) * 0.2, look: Math.sin(st.t * 2) > 0 ? 1 : -1, expr: 'angry' }) },
  { at: 'и бьёт кулаком', set: setCave, cam: TWO(880, 1100, Y, 0.8), to: [1060, 700, 1.8], look: 'gold', shake: 5, draw: (c, st) => { const p = clamp(st.bt / 0.5); me(c, 1, 880, Y, 1, { armR: -1.6 * p, lean: 0.15 * p, expr: 'roar', time: st.t }); shnyr(c, 1130 + p * 60, Y, 1, { lean: 0.5 * p, flip: true, expr: 'shock' }); hitFX(c, 1110, 760, 1, st.bt - 0.45); }, sfx: [['impact', 0.45, 0.8]] },
  { at: 'Гретчин потирает', set: setCave, cam: CU(1000, Y, 0.7), to: [1000, 740, 3.0], look: 'gold', draw: (c, st) => shnyr(c, 1000, Y, 1.4, { ...talk(st), armL: -2.6, expr: 'talk' }), over: (c, st) => tLine(c, '«Ну здравствуй, босс»', st.bt, st.ph('здравствуй') - st.lt + st.bt, 4, 200, 80, '#f4e080') },
], { tr: 'cut' });

stage(51, [
  { set: setCave, cam: CU(960, Y, 0.7), to: [960, 700, 3.2], look: 'gold', shake: 4, draw: (c, st) => me(c, 1, 960, Y, 1, { expr: 'roar', armL: 2.4, armR: -2.4, time: st.t }), over: (c, st) => { tLine(c, 'ВАААГХ!', st.bt, 0.1, 9, 540, 200, '#9cff4c'); if (st.bt > 1.8) { c.fillStyle = `rgba(0,0,0,${clamp((st.bt - 1.8) / 1.6)})`; c.fillRect(0, 0, W, H); } }, sfx: [['rumble', 0.1, 1]] },
], { tr: 'cut' });
