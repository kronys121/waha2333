// Wehrmacht soldier: 8 ranks, 52 paragraphs. Every beat is its own staged composition (engine3 stage()).

const Y = 1000;
const card = (k, n) => shot(PT(k), (ctx, s) => wCard(ctx, n, s.lt), { fade: 0.35 });
const ip = (st, i = 0) => idlePose(st.t, i);
const talk = (st, i = 0, o = {}) => ({ ...idlePose(st.t, i), expr: 'talk', time: st.t, ...o });
const youth = (ctx, x, y, s, pose) => landser(ctx, x, y, s, pose, { civil: true, side: 'civil', hat: 'none' }, pal(WP.civ, { hair: '#b08a50', skin: '#f0c8a8', shirt: '#e8e0d0' }));
const dim = (ctx, a = 0.45) => { ctx.fillStyle = `rgba(10,8,6,${a})`; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); };
const insertBg = (ctx, c1 = '#6a705e', c2 = '#5a604e') => { fillBg(ctx, c1); ctx.fillStyle = c2; for (let x = BX0; x < BX1; x += 14) ctx.fillRect(x, BY0, 5, BY1 - BY0); };

// ---------- small props used only here ----------
function horse(ctx, x, y, s, t = 0, col = '#7a5434', o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.dir || 1), s);
  const lg = (lx, ph) => { ctx.save(); ctx.translate(lx, -230); ctx.rotate(Math.sin(t * 7 + ph) * (o.walk ? 0.3 : 0)); rect(ctx, -14, 0, 28, 230, col, 8, 5); rect(ctx, -16, 200, 32, 30, '#2a2018', 4, 4); ctx.restore(); };
  lg(-140, 0); lg(130, 2);
  rect(ctx, -200, -380, 400, 180, col, 80, 6);
  lg(-110, 3); lg(160, 1);
  shape(ctx, [[150, -360], [250, -500], [330, -470], [270, -330]], col, 6);
  rect(ctx, 250, -520, 130, 70, col, 30, 6);
  shape(ctx, [[-200, -340], [-260, -200], [-230, -200], [-190, -300]], '#3a2a1e', 5);
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(320, -500, 7, 0, Math.PI * 2); ctx.fill();
  if (o.blush) { ctx.fillStyle = `rgba(230,60,60,${o.blush})`; ctx.beginPath(); ctx.ellipse(340, -470, 30, 16, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}
function cart(ctx, x, y, s, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -220, -200, 440, 110, '#8a6a42', 6, 6); for (const wx of [-140, 140]) { circ(ctx, wx, -60, 60, '#6a4a2a', 6); ctx.strokeStyle = INK; ctx.lineWidth = 4; for (let k = 0; k < 4; k++) { const a = k * Math.PI / 4 + t; ctx.beginPath(); ctx.moveTo(wx + Math.cos(a) * 56, -60 + Math.sin(a) * 56); ctx.lineTo(wx - Math.cos(a) * 56, -60 - Math.sin(a) * 56); ctx.stroke(); } } for (let i = 0; i < 4; i++) rect(ctx, -190 + i * 90, -270, 80, 70, ['#c8b090', '#8a7a9a', '#b8a080', '#9a8a6a'][i], 10, 4); ctx.restore(); }
function graveCross(ctx, x, y, s, helmetOn = true, cap = false) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#6a5038'; ctx.beginPath(); ctx.ellipse(0, 0, 150, 34, 0, Math.PI, 0); ctx.fill(); rect(ctx, -10, -300, 20, 300, '#e8e4da', 3, 4); rect(ctx, -70, -240, 140, 18, '#e8e4da', 3, 4); if (helmetOn) { if (cap) rect(ctx, -46, -340, 92, 40, '#727868', 8, 4); else shape(ctx, [[-56, -280], [-44, -310], [-30, -340], [30, -340], [44, -310], [56, -280]], '#5e6454', 5); } ctx.restore(); }
function barrier(ctx, x, y, s, broken = false) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -20, -200, 40, 200, '#e8e8e8', 3, 5); ctx.save(); ctx.translate(0, -170); ctx.rotate(broken ? 0.9 : 0); for (let k = 0; k < 8; k++) { ctx.fillStyle = k % 2 ? '#c83a3a' : '#f0f0f0'; ctx.fillRect(10 + k * 70, -12, 70, 24); } ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.strokeRect(10, -12, 560, 24); ctx.restore(); ctx.restore(); }
function eiffel(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#6a6a72'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-160, 0); ctx.quadraticCurveTo(-40, -300, -14, -700); ctx.moveTo(160, 0); ctx.quadraticCurveTo(40, -300, 14, -700); ctx.moveTo(-100, -180); ctx.lineTo(100, -180); ctx.moveTo(-50, -420); ctx.lineTo(50, -420); ctx.moveTo(0, -700); ctx.lineTo(0, -800); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 90, Math.PI, 0); ctx.stroke(); ctx.restore(); }
function thermo(ctx, x, y, s, v) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -40, -440, 80, 440, '#e8eef2', 30, 6); circ(ctx, 0, 0, 56, '#3a6ab8', 6); rect(ctx, -14, -400 * (0.2 + 0.8 * (1 - v)), 28, 400 * (0.2 + 0.8 * (1 - v)), '#3a6ab8', 10, 0); ctx.fillStyle = INK; for (let i = 0; i < 8; i++) ctx.fillRect(40, -380 + i * 48, 26, 5); ctx.restore(); }
function medalProp(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, [[-40, -160], [40, -160], [30, -40], [-30, -40]], '#b83a2a', 5); ctx.fillStyle = '#f0f0f0'; ctx.fillRect(-6, -160, 12, 120); circ(ctx, 0, 20, 64, '#9aa0a6', 6); circ(ctx, 0, 20, 44, '#b8bec4', 4); ctx.restore(); }
function mgProp(ctx, x, y, s, icy = false) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -260, -40, 520, 46, '#2a2a2e', 10, 6); rect(ctx, 240, -30, 200, 18, '#2a2a2e', 4, 5); rect(ctx, -300, -36, 80, 70, '#5a3a20', 12, 5); ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(160, 6); ctx.lineTo(110, 120); ctx.moveTo(160, 6); ctx.lineTo(220, 120); ctx.stroke(); if (icy) { ctx.fillStyle = '#e8f4fa'; for (let i = 0; i < 10; i++) shape(ctx, [[-240 + i * 50, 6], [-220 + i * 50, 6], [-230 + i * 50, 40 + (i % 3) * 14]], '#e8f4fa', 2); } ctx.restore(); }
function bootProp(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -30, -200, 60, 180, '#1e1c1a', 10, 5); rect(ctx, -30, -40, 110, 40, '#1e1c1a', 14, 5); ctx.restore(); }
function tally(ctx, x, y, n, scratch = 0) { ctx.strokeStyle = '#2a2420'; ctx.lineWidth = 7; for (let i = 0; i < n; i++) { const g = Math.floor(i / 5), k = i % 5, xx = x + g * 120 + k * 20; ctx.beginPath(); if (k === 4) { ctx.moveTo(xx - 90, y + 10); ctx.lineTo(xx + 10, y + 70); } else { ctx.moveTo(xx, y); ctx.lineTo(xx, y + 80); } ctx.stroke(); } if (scratch > 0) { ctx.lineWidth = 12; ctx.beginPath(); for (let i = 0; i < 12 * scratch; i++) { ctx.moveTo(x - 20 + i * 70, y - 20); ctx.lineTo(x + 40 + i * 70, y + 100); } ctx.stroke(); } }
function bomber(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#14161c'; ctx.beginPath(); ctx.ellipse(0, 0, 160, 22, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(-30, -10, 60, 20); ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(20, -200); ctx.lineTo(60, -200); ctx.lineTo(40, 0); ctx.lineTo(60, 200); ctx.lineTo(20, 200); ctx.closePath(); ctx.fill(); ctx.restore(); }
function paperSign(ctx, x, y, s, lines, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); rect(ctx, -220, -150, 440, 300, '#efe6d0', 4, 6); ctx.fillStyle = '#2a1e16'; ctx.font = '700 54px "Oswald"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; lines.forEach((l, i) => ctx.fillText(l, 0, -((lines.length - 1) * 70) / 2 + i * 70)); ctx.restore(); }
function stairsOfRanks(ctx, st, cur, o = {}) {
  const N = 8, sc = (i) => 0.42 + i * 0.06;
  let x = 140;
  for (let i = 0; i < N; i++) {
    const s = sc(i), top = 1060 - (i + 1) * 40, w = 190 * s + 40;
    rect(ctx, x - w / 2, top, w, 400, i === cur - 1 ? '#c8a050' : '#7a7468', 6, 5);
    ctx.save(); if (o.ghost && i !== cur - 1) ctx.globalAlpha = 0.35;
    if (o.all || i === cur - 1) hero(ctx, i + 1, x, top + 4, s, { ...ip(st, i), expr: i === cur - 1 ? (o.expr || 'neutral') : 'neutral' });
    ctx.restore();
    x += 205 * (s + sc(i + 1)) / 2 + 16;
  }
}
function stairsInterior(ctx, st) { fillBg(ctx, '#6a5a4e'); for (let i = 0; i < 12; i++) rect(ctx, 200 + i * 110, 1000 - i * 60, 900, 60, '#8a7a6a', 2, 5); ruinsWall(ctx, -500, 1000, 600, 1400, 41, '#5a4e46'); ruinsWall(ctx, 1700, 1000, 800, 1400, 42, '#5a4e46'); ground(ctx, 1000, '#4a4038', '#40362e'); }
function cutHouse(ctx, st) {
  setStalingrad(ctx, st, { fire: false });
  rect(ctx, 300, 140, 1320, 880, '#7a6a5e', 4, 8);
  rect(ctx, 340, 180, 1240, 380, '#3e3430', 4, 5); rect(ctx, 340, 600, 1240, 380, '#443a34', 4, 5);
  rect(ctx, 300, 560, 1320, 40, '#8a7a6e', 4, 6);
}

// ===================== 1. ШЮТЦЕ =====================
card(0, 1);

stage(1, [
  { set: (c, st) => wTown(c, st), cam: [960, 640, 1.05], draw: (c, st) => { for (let i = 0; i < 3; i++) civ(c, [180, 1400, 1700][i] - st.bt * 40, Y, 0.85, walkPose(st.t + i, 0.6, 0.3), i); youth(c, 760 + st.bt * 60, Y, 1, walkPose(st.t, 0.8, 0.35)); },
    over: (c, st) => chron(c, 'ГЕРМАНИЯ. 1939', st.bt, 0.3, 3) },
  { at: 'работаешь у дяди', set: wWorkshop, cam: TWO(760, 1300, Y, 1), draw: (c, st) => { youth(c, 760, Y, 1, { armR: -1.2 + Math.sin(st.t * 6) * 0.35, armL: -1.0 + Math.sin(st.t * 6) * 0.35, lean: 0.12, expr: 'happy' }); rect(c, 820 + Math.sin(st.t * 6) * 40, 730, 120, 30, '#c8a070', 6, 4); papa(c, 1300, Y, 1, { ...talk(st), flip: true }); } },
  { at: 'по воскресеньям', set: wDance, cam: [960, 620, 1.1], draw: (c, st) => { for (let i = 0; i < 4; i++) { const x = 160 + i * 520, b = Math.sin(st.t * 5 + i) * 0.15; if (i === 2) continue; civ(c, x, Y - 20, 0.85, { lean: b, bob: -Math.abs(Math.sin(st.t * 5 + i)) * 12, armR: -1 }, 0); civ(c, x + 110, Y - 20, 0.8, { lean: b, bob: -Math.abs(Math.sin(st.t * 5 + i)) * 12, armL: 1, flip: true }, 1); } const b2 = Math.sin(st.t * 5) * 0.15; youth(c, 1170, Y, 1, { lean: b2, armR: -1.1, expr: 'happy', bob: -Math.abs(Math.sin(st.t * 5)) * 12 }); greta(c, 1290, Y, 0.92, { lean: b2, armL: 1.1, expr: 'happy', flip: true, bob: -Math.abs(Math.sin(st.t * 5)) * 12 }); } },
  { at: 'Девушку зовут', set: wDance, cam: TWO(860, 1100, Y, 1.05), push: 0.1, draw: (c, st) => { youth(c, 860, Y, 1.05, { ...talk(st), armR: -0.5 }); greta(c, 1100, Y, 0.97, { ...ip(st, 1), expr: st.A('смеётся') > 0 ? 'happy' : 'neutral', flip: true, bob: st.A('смеётся') > 0 ? -Math.abs(Math.sin(st.t * 9)) * 10 : 0, head: st.A('смеётся') > 0 ? -0.12 : 0 }); },
    over: (c, st) => chron(c, 'ГРЕТА', st.bt, 0.4, 2.5) },
], { tr: 'black', look: 'home' });

stage(2, [
  { set: (c, st) => wField(c, st, { autumn: true }), cam: [960, 640, 1.05], draw: (c, st) => { for (let i = 0; i < 7; i++) landser(c, 180 + i * 260, Y, 0.85, { ...ip(st, i), expr: 'neutral' }, { hat: 'rad', weapon: 'shovel' }, WP.rad); },
    over: (c, st) => chron(c, 'ИМПЕРСКАЯ ТРУДОВАЯ СЛУЖБА', st.bt, 0.4, 3.5) },
  { at: 'Полгода ты', set: (c, st) => wField(c, st, { autumn: true }), cam: [960, 600, 1.1], pan: [120, 0], draw: (c, st) => { for (let i = 0; i < 6; i++) { const x = -100 + i * 300 + st.bt * 90; landser(c, x, Y - (i % 2) * 20, 0.88, { ...pose.march(st.t + i * 0.2), armR: -2.9 }, { hat: 'rad', weapon: 'shovel' }, WP.rad); } } },
  { at: 'Копаешь канавы', set: (c, st) => wField(c, st, { autumn: true, ditch: true }), cam: [960, 680, 1.15], draw: (c, st) => { for (let i = 0; i < 5; i++) landser(c, 160 + i * 400, Y, 0.95, pose.dig(st.t + i * 0.6), { hat: 'rad', weapon: 'shovel' }, WP.rad); c.fillStyle = '#6a4a2e'; for (let i = 0; i < 10; i++) { const p = (st.t * 1.3 + i * 0.1) % 1; c.fillRect(300 + (i % 5) * 400 + p * 160, 760 - Math.sin(p * Math.PI) * 120, 14, 14); } } },
  { at: 'стоять ровно', set: (c, st) => wField(c, st, { autumn: true }), cam: TWO(800, 1120, Y, 1.05), shake: 2, draw: (c, st) => { landser(c, 800, Y, 1.05, { expr: 'grit', blink: (st.t % 1) < 0.1 ? 1 : 0 }, { hat: 'rad', weapon: 'none' }, WP.rad); landser(c, 1120, Y, 1.1, { ...talk(st), expr: 'angry', armR: -1.4 + Math.sin(st.t * 8) * 0.3, flip: true, lean: -0.1 }, { hat: 'rad', weapon: 'none', mustache: true }, WP.rad); } },
], { tr: 'whip', look: 'day' });

stage(3, [
  { set: wBarracks, cam: TWO(760, 1200, Y, 1), draw: (c, st) => { rect(c, 1000, 800, 420, 80, '#7a5a3a', 6, 6); const on = st.p > 0.45; if (on) hero(c, 1, 760, Y, 1, { ...ip(st), expr: 'happy' }); else youth(c, 760, Y, 1, { ...ip(st), expr: 'neutral' }); kam(c, 1300, Y, 1, { ...talk(st), flip: true }, 2, { weapon: 'none', tresse: true, hat: 'feld', mustache: true }); if (!on) { rect(c, 1040, 740, 120, 60, '#646a58', 8, 4); shape(c, [[1200, 800], [1210, 760], [1300, 750], [1310, 800]], '#5e6454', 4); } },
    over: (c, st) => { if (st.p > 0.42 && st.p < 0.5) { c.fillStyle = `rgba(255,255,255,${1 - (st.p - 0.42) / 0.08})`; c.fillRect(0, 0, W, H); } } },
  { at: 'И ещё жетон', set: (c, st) => { wBarracks(c, st); dim(c, 0.6); }, cam: WIDE, push: 0.12, draw: (c, st) => dogTag(c, 960, 540, 2.2, 0, Math.sin(st.t) * 0.03) },
  { at: 'Одна половина', set: (c, st) => { wBarracks(c, st); dim(c, 0.6); }, cam: WIDE, push: 0.05, draw: (c, st) => dogTag(c, 960, 480, 2.2, ease.io(clamp((st.bt - 0.6) / 1.2)), 0) },
  { at: 'Унтер объясняет', set: wBarracks, cam: TWO(780, 1180, Y, 1.05), draw: (c, st) => { hero(c, 1, 780, Y, 1.05, { ...ip(st), expr: 'shock' }); kam(c, 1180, Y, 1.05, { ...talk(st), gunA: -0.2, flip: true }, 2, { weapon: 'rifle', tresse: true, hat: 'feld', mustache: true }); } },
], { look: 'warm' });

stage(4, [
  { set: (c, st) => wField(c, st, {}), cam: [1100, 620, 1.1], draw: (c, st) => { rect(c, 1700, 600, 26, 260, '#6a4a2a', 3, 4); circ(c, 1713, 580, 90, '#f0ead8', 6); circ(c, 1713, 580, 56, '#f0ead8', 5); circ(c, 1713, 580, 22, '#2a2a2a', 4); hero(c, 1, 700, Y, 1, pose.fire(st.t)); },
    over: (c, st) => bigText(c, 'ШЮТЦЕ = СТРЕЛОК', st.bt, 0.3, 2.6, 160, 100) },
  { at: 'Это самый низ', set: (c) => { sky(c, '#b8c8d0', '#ece6d4'); ground(c, 1060, '#9a9282', '#8a8272'); }, cam: [960, 640, 1], draw: (c, st) => stairsOfRanks(c, st, 1, { all: true, ghost: true, expr: 'shock' }) },
  { at: 'Ты приносишь присягу', set: (c, st) => { sky(c, '#8a9098', '#c8ccc8'); ground(c, 720, '#8a8678', '#7a766a'); }, cam: [960, 600, 1], draw: (c, st) => { for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) kam(c, 120 + i * 210 + r * 40, 820 + r * 90, 0.62 + r * 0.06, { armR: -2.5, head: -0.05 }, i + r, { weapon: 'none', hat: 'stahl', bag: false }); } },
  { at: 'Тогда это кажется', set: (c, st) => { sky(c, '#8a9098', '#c8ccc8'); ground(c, 720, '#8a8678', '#7a766a'); }, cam: CU(960, Y, 1), push: 0.1, look: 'gray', draw: (c, st) => { kam(c, 600, Y, 1, { armR: -2.5 }, 1, { weapon: 'none', hat: 'stahl' }); hero(c, 960, Y, 1, { armR: -2.5, expr: st.A('Позже окажется') > 0 ? 'sad' : 'neutral' }, { weapon: 'none' }); kam(c, 1320, Y, 1, { armR: -2.5 }, 3, { weapon: 'none', hat: 'stahl' }); } },
], { tr: 'whip', look: 'day' });

stage(5, [
  { set: wBarracks, cam: [1000, 640, 1.15], draw: (c, st) => { rect(c, 760, 760, 480, 40, '#7a4e2c', 6, 6); radioSet(c, 1000, 760, 1); for (let i = 0; i < 5; i++) { const x = 400 + i * 300; if (i === 2) continue; kam(c, x, Y, 0.95, { ...ip(st, i), head: Math.sin(st.t * 3 + i) * 0.08 }, i, { weapon: 'none', hat: i % 2 ? 'feld' : 'none' }); } hero(c, 1, 1000, Y + 40, 1, { ...ip(st), expr: 'neutral' }, { hat: 'feld', weapon: 'none' }); },
    over: (c, st) => chron(c, '1 СЕНТЯБРЯ 1939', st.bt, 0.3, 3.5) },
  { at: 'Никто не спрашивает', set: (c, st) => wField(c, st, {}), cam: [1000, 620, 1.05], pan: [100, 0], draw: (c, st) => { barrier(c, 1300, 900, 1.1, true); for (let i = 0; i < 7; i++) kam(c, -200 + i * 260 + st.bt * 120, Y, 0.85, pose.march(st.t + i * 0.3), i); } },
  { at: 'Через три недели', set: (c) => insertBg(c, '#4a4438', '#423c32'), cam: WIDE, draw: (c, st) => mapBoard(c, 960, 540, 2.0, st.p * 1.4, 3), over: (c, st) => bigText(c, '3 НЕДЕЛИ', st.bt, 0.6, 3, 960, 110) },
  { at: 'Ты видишь сожжённые', set: (c, st) => setRoad(c, st, { burning: true }), cam: [960, 640, 1.08], pan: [-80, 0], look: 'gray', draw: (c, st) => { horse(c, 1500 - st.bt * 40, Y - 30, 0.5, st.t, '#6a4a30', { walk: true, dir: -1 }); cart(c, 1760 - st.bt * 40, Y - 20, 0.75, -st.t); for (let i = 0; i < 4; i++) civ(c, 400 + i * 240 - st.bt * 40, Y + 20, 0.78, { ...pose.trudge(st.t + i), expr: 'sad' }, i); } },
  { at: 'пленных', set: (c, st) => setRoad(c, st, { burning: false }), cam: [960, 660, 1.12], look: 'gray', draw: (c, st) => { for (let i = 0; i < 7; i++) landser(c, 1900 - i * 230 - st.bt * 50, Y - (i % 2) * 18, 0.85, { ...pose.trudge(st.t + i), head: 0.25, flip: true }, { side: 'civil', hat: i % 3 ? 'flat' : 'none' }, pal(WP.civ, { shirt: '#8a8a5a', pants: '#7a7a4e', hat: '#7a7a4e' })); } },
  { at: 'Дома говорят', set: wLiving, cam: TWO(820, 1180, Y, 1), look: 'home', draw: (c, st) => { papa(c, 820, Y, 1, { ...talk(st), armR: -1.2 }); mama(c, 1180, Y, 0.95, { ...ip(st), expr: 'happy', flip: true }); paperSign(c, 760, 560, 0.45, ['БЫСТРО', 'И ПОЧТИ', 'БЕЗ ПОТЕРЬ']); } },
  { at: 'В твоём взводе', set: (c, st) => wField(c, st, { gray: true }), cam: TWO(800, 1250, Y, 1), look: 'gray', draw: (c, st) => { graveCross(c, 1150, Y - 40, 0.9); graveCross(c, 1420, Y - 40, 0.9); hero(c, 1, 760, Y, 1, { ...ip(st), head: 0.2, expr: 'sad' }); } },
], { tr: 'black', look: 'day' });

stage(6, [
  { set: setNightCamp, cam: [960, 760, 1.4], look: 'night', draw: (c, st) => hero(c, 1, 960, Y, 1.15, pose.write(st.t), { weapon: 'letter', hat: 'feld' }), over: (c, st) => letterLine(c, 'Мама, у меня всё хорошо. Кормят.', st.bt, 0.3) },
  { at: 'Солдатский хлеб', set: setNightCamp, cam: [1080, 740, 2.0], look: 'night', draw: (c, st) => { hero(c, 1, 960, Y, 1.15, { ...pose.sit(st.t), armR: -1.6 + Math.abs(Math.sin(st.t * 5)) * 0.6, expr: 'grit' }, { weapon: 'none', hat: 'feld' }); bread2(c, 1170, 820 - Math.abs(Math.sin(st.t * 5)) * 20, 0.6); }, over: (c, st) => bigText(c, 'ТУК. ТУК.', st.bt, 0.6, 2, 180, 90) },
]);

// ===================== 2. ЕФРЕЙТОР =====================
card(7, 2);

stage(8, [
  { set: (c) => insertBg(c), cam: WIDE, push: 0.08, draw: (c, st) => { wInsignia(c, 2, 960, 520, 2.2); c.strokeStyle = '#d8dce0'; c.lineWidth = 4; const nx = 700 + ((st.t * 300) % 560); c.beginPath(); c.moveTo(nx, 300); c.lineTo(nx + 60, 420); c.stroke(); } },
  { at: 'Тебе говорят', set: wBarracks, cam: TWO(780, 1200, Y, 1.05), draw: (c, st) => { hero(c, 2, 780, Y, 1.05, { ...ip(st), expr: 'neutral' }); kam(c, 1200, Y, 1.05, { ...talk(st), armR: -2.0, flip: true, head: -0.08 }, 1, { weapon: 'none', hat: 'feld', mustache: true, chev: 2 }); } },
  { at: 'Ты киваешь', set: wBarracks, cam: CU(780, Y, 1.05), push: 0.12, draw: (c, st) => { hero(c, 2, 780, Y, 1.05, { head: Math.abs(Math.sin(st.t * 4)) * 0.12, expr: 'neutral', look: 1 }); }, over: (c, st) => bigText(c, '...', st.bt, 1.2, 3, 200, 120) },
], { tr: 'black', look: 'day' });

stage(9, [
  { set: wFrance, cam: [960, 620, 1.05], pan: [100, 0], draw: (c, st) => { truck(c, 1500 + st.bt * 80, 900, 0.7, 1); for (let i = 0; i < 6; i++) kam(c, -100 + i * 240 + st.bt * 110, Y, 0.85, pose.march(st.t + i * 0.3), i); }, over: (c, st) => chron(c, 'ФРАНЦИЯ. МАЙ 1940', st.bt, 0.3, 3) },
  { at: 'днём и ночью', set: wFrance, look: 'night', cam: [960, 620, 1.05], pan: [100, 0], draw: (c, st) => { for (let i = 0; i < 6; i++) kam(c, -100 + i * 240 + st.bt * 110, Y, 0.85, pose.march(st.t + i * 0.3), i + 2); const g = c.createRadialGradient(1700, 860, 10, 1700, 860, 400); g.addColorStop(0, 'rgba(255,240,180,0.7)'); g.addColorStop(1, 'rgba(255,240,180,0)'); c.fillStyle = g; c.fillRect(1300, 460, 800, 800); truck(c, 1600, 920, 0.7, 1); } },
  { at: 'первитина', set: (c, st) => { wFrance(c, st); dim(c, 0.3); }, cam: [1000, 700, 1.7], push: 0.1, draw: (c, st) => { kam(c, 800, Y, 1, { ...talk(st), armR: -1.4 }, 1, { weapon: 'none', hat: 'feld' }); pillTube(c, 1080, 640, 1.1); hero(c, 2, 1300, Y, 1, { ...ip(st), expr: 'neutral', flip: true }, { weapon: 'none' }); } },
  { at: 'трое суток', set: wFrance, cam: CU(960, Y, 1), push: 0.15, draw: (c, st) => hero(c, 2, 960, Y, 1, { ...pose.march(st.t), expr: 'shock', blink: 0 }), over: (c, st) => bigText(c, '72 ЧАСА БЕЗ СНА', st.bt, 0.4, 3, 180, 96) },
  { at: 'На четвёртые сутки', set: wFrance, cam: [960, 640, 1.2], draw: (c, st) => { for (let i = 0; i < 5; i++) { if (i === 2) continue; kam(c, 360 + i * 300, Y, 0.95, ip(st, i), i); } hero(c, 2, 960, Y, 0.95, { blink: 1, head: 0.25, lean: Math.sin(st.t * 1.4) * 0.08 }); }, over: (c, st) => bigText(c, 'Zzz', st.bt, 0.6, 3, 300, 90) },
], { tr: 'whip', look: 'day' });

stage(10, [
  { set: (c) => insertBg(c, '#4a4438', '#423c32'), cam: WIDE, draw: (c, st) => mapBoard(c, 960, 560, 2.0, st.p * 1.3, 2), over: (c, st) => bigText(c, '6 НЕДЕЛЬ', st.bt, 0.4, 3, 960, 110) },
  { at: 'Ты сидишь в кафе', set: wCafe, cam: [1000, 700, 1.3], draw: (c, st) => { cafeTable(c, 1000, Y, 1); wineGlass(c, 1040, Y - 214, 1); hero(c, 2, 820, Y + 40, 1, { ...pose.sit(st.t), armR: -1.3, expr: 'happy' }, { weapon: 'none' }); civ(c, 1400, Y, 0.95, { ...ip(st), expr: 'angry', flip: true }, 0, { hat: 'beret' }); } },
  { at: 'открытку', set: (c, st) => { wCafe(c, st); dim(c, 0.4); }, cam: WIDE, push: 0.1, draw: (c, st) => postcard(c, 960, 520, 1.9, -0.05), over: (c, st) => letterLine(c, 'Дорогие мама и папа! Тут красиво...', st.bt, 0.4, 900, 52) },
  { at: 'Тебе кажется', set: wCafe, cam: [980, 600, 1.4], draw: (c, st) => { cafeTable(c, 1000, Y, 1); hero(c, 2, 820, Y + 40, 1, { ...pose.sit(st.t), lean: -0.12, expr: 'happy', armL: 2.6, armR: -2.6 }, { weapon: 'none' }); c.fillStyle = '#f4f0e6'; c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.ellipse(1260, 300, 200, 130, 0, 0, Math.PI * 2); c.fill(); c.stroke(); for (const [x, y, r] of [[1040, 470, 24], [990, 530, 14]]) { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); c.stroke(); } shape(c, [[1260, 200], [1200, 380], [1320, 380]], '#3a7a4a', 4); circ(c, 1230, 290, 9, '#e8c04a', 2); circ(c, 1290, 330, 9, '#c83a3a', 2); } },
  { at: 'Грета пишет', set: (c, st) => wTown(c, st, {}), look: 'home', cam: MS(960, Y, 1), draw: (c, st) => { greta(c, 960, Y, 1, { ...ip(st), armR: -1.2, expr: 'happy' }); envelope(c, 1080, 720, 0.45, 0.1, 'Feldpost'); } },
], { look: 'warm' });

stage(11, [
  { set: (c, st) => wField(c, st, {}), cam: [1000, 640, 1.15], draw: (c, st) => { fieldKitchen(c, 1000, Y, 1.2, st.t); for (let i = 0; i < 3; i++) kam(c, 300 + i * 160, Y, 0.85, ip(st, i), i, { weapon: 'none', hat: 'feld' }); }, over: (c, st) => bigText(c, '«ГУЛЯШНАЯ ПУШКА»', st.bt, 0.3, 3, 170, 100) },
  { at: 'Повар у вас', set: (c, st) => wField(c, st, {}), cam: TWO(820, 1350, Y, 1), shake: 1.5, draw: (c, st) => { const r = clamp(st.bt / 3); horse(c, 1350, Y, 0.62, st.t, '#7a5434', { blush: r, dir: -1 }); kam(c, 820, Y, 1.08, { ...talk(st), expr: 'angry', armR: -1.6 + Math.sin(st.t * 9) * 0.4 }, 1, { weapon: 'spoon', hat: 'none', mustache: true, hair: 'bald' }); rect(c, 770, 700, 100, 190, '#f0ece2', 8, 4); } },
  { at: 'важнее генерала', set: (c) => insertBg(c, '#c8bea6', '#bcb29a'), cam: WIDE, draw: (c, st) => { c.save(); c.globalAlpha = 0.35; hero(c, 8, 560, 1020, 0.9, {}, { pip: 4 }); c.restore(); bigText(c, '?', st.bt, 0.2, 9, 300, 160); kam(c, 1360, 1020, 0.95, { ...ip(st), expr: 'happy', armR: -1.2 }, 1, { weapon: 'spoon', hat: 'none', mustache: true, hair: 'bald' }); }, over: (c, st) => bigText(c, 'ПОВАР > ГЕНЕРАЛ', st.bt, 1.0, 3, 160, 100) },
  { at: 'кормит тебя', set: (c, st) => wField(c, st, {}), cam: [1100, 700, 1.4], draw: (c, st) => { fieldKitchen(c, 1450, Y, 1, st.t); hero(c, 2, 1050, Y + 30, 1, { ...pose.sit(st.t), armR: -1.8 + Math.abs(Math.sin(st.t * 4)) * 0.5, expr: 'happy' }, { weapon: 'spoon' }); kotelok(c, 1150, 860, 0.8); } },
], { tr: 'whip', look: 'day' });

stage(12, [
  { set: (c, st) => { wFrance(c, st); }, look: 'warm', cam: [960, 760, 1.4], draw: (c, st) => hero(c, 2, 960, Y, 1.15, pose.write(st.t), { weapon: 'letter' }), over: (c, st) => letterLine(c, 'Мама, у меня всё хорошо.', st.bt, 0.3) },
  { at: 'Я видел Париж', set: (c, st) => { sky(c, '#c8a0a0', '#f4d8b0'); layer(c, st, 0.6, () => eiffel(c, 1500, 720, 0.6)); ground(c, 720, '#8a9a6a', '#7a8a5a'); }, look: 'warm', cam: [1100, 600, 1.1], draw: (c, st) => hero(c, 2, 700, Y, 1, { ...ip(st), expr: 'happy', look: 1 }), over: (c, st) => letterLine(c, 'Я видел Париж издалека. Скоро вернусь.', st.bt, 0.2) },
]);

// ===================== 3. ОБЕР-ЕФРЕЙТОР =====================
card(13, 3);

stage(14, [
  { set: (c, st) => wBorder(c, st), cam: [960, 680, 1.15], look: 'night', draw: (c, st) => { for (let i = 0; i < 6; i++) kam(c, 200 + i * 300, Y, 0.85, { ...pose.sit(st.t), head: 0.1 }, i, { weapon: 'rifle' }); }, over: (c, st) => chron(c, '22 ИЮНЯ 1941. 3:00', st.bt, 0.3, 4) },
  { at: 'Тишина', set: (c, st) => wBorder(c, st, { flash: 1.6 }), cam: [960, 640, 1.05], look: 'night', shake: 4, draw: (c, st) => { for (let i = 0; i < 6; i++) kam(c, 200 + i * 300, Y, 0.85, { ...pose.sit(st.t), head: st.bt > 1.6 ? -0.15 : 0.1 }, i); } },
  { at: 'зачитывают приказ', set: (c, st) => wField(c, st, { gray: true }), cam: TWO(800, 1300, Y, 1), look: 'gray', draw: (c, st) => { for (let i = 0; i < 4; i++) kam(c, 300 + i * 180, Y, 0.8, ip(st, i), i); hero(c, 3, 940, Y, 0.9, ip(st)); hero(c, 6, 1300, Y, 1, { ...talk(st), flip: true }, { weapon: 'letter' }); } },
  { at: 'Скоро ты поймёшь', set: (c, st) => wField(c, st, { gray: true }), cam: CU(940, Y, 0.9), push: 0.12, look: 'gray', draw: (c, st) => hero(c, 3, 940, Y, 0.9, { ...ip(st), expr: 'sad' }) },
], { tr: 'black' });

stage(15, [
  { set: (c, st) => wSteppe(c, st, { road: true }), cam: [960, 640, 1.05], draw: (c, st) => { for (let i = 0; i < 8; i++) { const s = 0.4 + i * 0.09; kam(c, 960 + (i % 2 ? 60 : -60) * s, 700 + i * 50, s, pose.march(st.t + i * 0.4), i); } } },
  { at: 'Пыль', set: (c, st) => wSteppe(c, st, {}), cam: CU(960, Y, 1), push: 0.1, draw: (c, st) => { hero(c, 3, 960, Y, 1, { ...pose.march(st.t), expr: 'grit' }); c.fillStyle = '#9ac8e8'; for (let i = 0; i < 2; i++) { const p = (st.t * 0.8 + i * 0.5) % 1; c.beginPath(); c.ellipse(920 + i * 70, 600 + p * 60, 6, 10, 0, 0, Math.PI * 2); c.fill(); } dustFX(c, st.t, 80, 9); } },
  { at: 'на карте дороги', set: (c, st) => wSteppe(c, st, {}), cam: TWO(820, 1150, Y, 1), draw: (c, st) => { kam(c, 1150, Y, 1, { ...ip(st), armR: -1.5, expr: 'shock', flip: true }, 1, { weapon: 'none', hat: 'feld' }); rect(c, 1000, 640, 180, 130, '#e0d4b4', 4, 4); hero(c, 3, 820, Y, 1, { ...ip(st), expr: 'neutral', look: 1 }); } },
  { at: 'сорок километров', set: (c, st) => wSteppe(c, st, { road: true }), cam: [960, 920, 2.2], pan: [0, 0], draw: (c, st) => { for (let i = 0; i < 3; i++) kam(c, 760 + i * 220, Y + (i % 2) * 20, 1, pose.march(st.t + i * 0.3), i); }, over: (c, st) => bigText(c, '40 КМ В ДЕНЬ', st.bt, 0.3, 3, 180, 100) },
  { at: 'Танки уходят', set: (c, st) => wSteppe(c, st, {}), cam: [960, 640, 1.05], draw: (c, st) => { for (let i = 0; i < 3; i++) ptank(c, 900 + i * 380 + st.bt * 260, 820 + i * 30, 0.55, st.t, 1); for (let i = 0; i < 5; i++) kam(c, 100 + i * 170 + st.bt * 60, Y, 0.8, pose.run(st.t + i * 0.2, 0.7), i); dustFX(c, st.t, 90, 4); } },
], { tr: 'whip', look: 'day' });

stage(16, [
  { set: (c, st) => wSteppe(c, st, {}), cam: CU(960, Y, 1), push: 0.12, look: 'gray', draw: (c, st) => hero(c, 3, 960, Y, 1, { ...ip(st), expr: 'shock' }) },
  { at: 'Колонны пленных', set: (c, st) => wSteppe(c, st, { road: true }), cam: [960, 640, 1.05], look: 'gray', draw: (c, st) => { for (let i = 0; i < 14; i++) pow(c, 2100 - i * 140 - st.bt * 40, 880 + (i % 3) * 50, 0.6 + (i % 3) * 0.05, { ...pose.trudge(st.t + i), flip: true }, i); kam(c, 300, Y, 0.95, ip(st), 2); } },
  { at: 'колючей проволокой', set: wCage, cam: [960, 620, 1.1], look: 'gray', draw: (c, st) => { for (let r = 0; r < 3; r++) for (let i = 0; i < 12; i++) pow(c, -200 + i * 200 + r * 70, 700 + r * 40, 0.42 + r * 0.04, { ...pose.sit(st.t + i), head: 0.3 }, i + r); } },
  { at: 'Сожжённые деревни', set: (c, st) => { sky(c, '#8a8a88', '#c8c4b8'); layer(c, st, 0.4, () => { for (let i = 0; i < 6; i++) { izba(c, -200 + i * 450, 760, 1, true); smokeFX(c, -140 + i * 450, 520, st.t, 1.2, i, '60,56,52', 0.4); } }); ground(c, 760, '#7a7466', '#6a6458'); }, cam: [960, 600, 1.05], pan: [-120, 0], look: 'gray', draw: () => {} },
  { at: 'Расстрелы', set: setNightCamp, cam: [960, 760, 1.5], look: 'night', draw: (c, st) => { kam(c, 760, Y, 1, { ...talk(st), head: 0.15, lean: 0.12 }, 1, { weapon: 'none', hat: 'feld' }); kam(c, 1000, Y, 1, { ...ip(st), head: 0.15, lean: -0.1, flip: true }, 2, { weapon: 'none', hat: 'none' }); kam(c, 1240, Y, 1, { ...ip(st), head: 0.2, flip: true }, 3, { weapon: 'none' }); } },
  { at: 'Ты не стреляешь', set: (c, st) => wSteppe(c, st, {}), cam: MS(960, Y, 1), look: 'gray', draw: (c, st) => { hero(c, 3, 960, Y, 1, { gunA: 0.9, head: 0.25, expr: 'sad' }); } },
  { at: 'И это тоже', set: (c, st) => { wSteppe(c, st, {}); dim(c, 0.5); }, cam: CU(960, Y, 1), push: 0.1, look: 'gray', draw: (c, st) => hero(c, 3, 960, Y, 1, { head: 0.25, expr: 'sad', blink: 1 }, { weapon: 'none' }), over: (c, st) => bigText(c, 'ЭТО ТОЖЕ ВЫБОР', st.bt, 0.2, 4, 180, 100) },
]);

stage(17, [
  { set: (c, st) => setTrench(c, st, { summer: true, smoke: true }), cam: [960, 620, 1.05], shake: 3, draw: (c, st) => { for (let i = 0; i < 4; i++) ivan(c, 200 + i * 480, 960, 0.85, pose.fire(st.t + i * 0.3), i, { hat: i % 2 ? 'helmet' : 'pilotka' }); blastFX(c, 1500, 640, 0.8, (st.bt % 2.2) - 0.3, 3); } },
  { at: 'Дерутся, когда', set: (c, st) => setStalingrad(c, st, { fire: true }), cam: MS(900, Y, 1), shake: 2, draw: (c, st) => ivan(c, 900, Y, 1, pose.fire(st.t), 1, { hat: 'helmet' }) },
  { at: 'Старый унтер', set: setNightCamp, cam: TWO(760, 1180, Y, 1), look: 'night', draw: (c, st) => { campfire(c, 960, Y - 20, 1.4, st.t); hero(c, 3, 760, Y, 1, { ...pose.sit(st.t), expr: 'neutral' }, { weapon: 'none' }); kam(c, 1180, Y, 1, { ...pose.sit(st.t + 1), ...talk(st), flip: true }, 1, { weapon: 'none', hat: 'feld', mustache: true, gray: true, tresse: true }); } },
  { at: 'Чувствуешь разницу', set: setNightCamp, cam: CU(1180, Y + 150, 1), push: 0.1, look: 'night', draw: (c, st) => { campfire(c, 960, Y - 20, 1.4, st.t); kam(c, 1180, Y, 1, { ...pose.sit(st.t + 1), expr: 'sad', flip: true }, 1, { weapon: 'none', hat: 'feld', mustache: true, gray: true, tresse: true }); } },
], { tr: 'flash', look: 'day' });

stage(18, [
  { set: (c, st) => wSteppe(c, st, {}), look: 'warm', cam: [960, 760, 1.4], draw: (c, st) => hero(c, 3, 960, Y, 1.15, pose.write(st.t), { weapon: 'letter' }), over: (c, st) => letterLine(c, 'Мама, у меня всё хорошо. Здесь очень большая страна.', st.bt, 0.3) },
  { at: 'Очень', set: (c, st) => wSteppe(c, st, {}), look: 'warm', cam: [960, 540, 1], draw: (c, st) => hero(c, 3, 960, 760, 0.18, pose.write(st.t), { weapon: 'letter' }), over: (c, st) => letterLine(c, 'Очень.', st.bt, 0.1) },
]);

// ===================== 4. УНТЕР-ОФИЦЕР =====================
card(19, 4);

stage(20, [
  { set: (c) => insertBg(c), cam: WIDE, push: 0.08, draw: (c, st) => wInsignia(c, 4, 960, 540, 2.0) },
  { at: 'Ты командуешь отделением', set: (c, st) => wField(c, st, { autumn: true }), cam: [960, 640, 1.1], draw: (c, st) => { for (let i = 0; i < 8; i++) kam(c, 340 + i * 190, Y - 40, 0.75, ip(st, i), i); hero(c, 4, 960, Y + 60, 1, { ...talk(st) }, { toque: false, coat: false }); } },
  { at: 'похоронили', set: (c, st) => wField(c, st, { gray: true, autumn: true }), cam: TWO(800, 1200, Y, 1), look: 'gray', draw: (c, st) => { graveCross(c, 1200, Y - 30, 1); hero(c, 4, 800, Y, 1, { ...ip(st), head: 0.2, expr: 'sad' }, { toque: false, coat: false }); }, over: (c, st) => chron(c, 'ПОД СМОЛЕНСКОМ', st.bt, 0.3, 3) },
  { at: 'карьера делается', set: (c) => { sky(c, '#9aa0a4', '#d8d4c8'); ground(c, 1060, '#8a8478', '#7a7468'); }, cam: [960, 640, 1], look: 'gray', draw: (c, st) => { stairsOfRanks(c, st, 4, { ghost: true }); for (let i = 0; i < 3; i++) graveCross(c, 200 + i * 230, 1020 - i * 40, 0.25, true); }, over: (c, st) => bigText(c, 'ЗА ЧУЖОЙ СЧЁТ', st.bt, 0.6, 3, 170, 100) },
], { tr: 'black', look: 'day' });

const lvl4a = { toque: false };
stage(21, [
  { set: wMud, cam: [960, 640, 1.05], look: 'cold', draw: (c, st) => { truck(c, 1300, 930, 0.8, 1); for (let i = 0; i < 6; i++) kam(c, 100 + i * 200 + st.bt * 20, Y, 0.8, pose.trudge(st.t + i), i, { coat: true }); }, over: (c, st) => chron(c, 'ОКТЯБРЬ 1941. РАСПУТИЦА', st.bt, 0.3, 3.5) },
  { at: 'сапоги остаются', set: wMud, cam: [960, 880, 2.0], look: 'cold', draw: (c, st) => { const p = clamp(st.bt / 2); bootProp(c, 880, Y + 20, 1); hero(c, 4, 960 + p * 140, Y, 1, { ...pose.trudge(st.t), legL: -0.4 * p, expr: 'shock' }, lvl4a); } },
  { at: 'Машины стоят', set: wMud, cam: [1000, 700, 1.3], look: 'cold', draw: (c, st) => { c.save(); c.translate(1100, 1000); c.rotate(-0.08); truck(c, 0, 0, 1.1, 1); c.restore(); c.fillStyle = '#4a3828'; c.fillRect(500, 960, 1200, 200); for (let i = 0; i < 3; i++) kam(c, 650 + i * 120, Y, 0.9, { lean: 0.5, armR: -1.4, armL: -1.4, expr: 'grit', bob: Math.sin(st.t * 3) * 6 }, i, { weapon: 'none', coat: true }); } },
  { at: 'Лошади тонут', set: wMud, cam: [960, 700, 1.3], look: 'cold', draw: (c, st) => { horse(c, 1100, Y + 140, 0.8, st.t, '#6a4a30', {}); c.fillStyle = '#4a3828'; c.fillRect(600, 980, 1100, 200); kam(c, 700, Y, 0.95, { lean: -0.4, armR: 1.2, armL: 1.2, expr: 'grit' }, 2, { weapon: 'none', coat: true }); } },
  { at: 'Генералы на картах', set: (c) => insertBg(c, '#5a4e40', '#52463a'), cam: WIDE, look: 'warm', draw: (c, st) => { mapBoard(c, 960, 520, 1.8, st.p * 1.4, 3); c.fillStyle = '#2a1e16'; c.font = '700 70px "Oswald"'; c.fillText('МОСКВА', 1300, 300); } },
  { at: 'вытащить из грязи', set: wMud, cam: [960, 720, 1.5], look: 'cold', draw: (c, st) => { const k = (st.bt % 2) / 2; mgProp(c, 1150, Y - 20 - k * 30, 0.8); hero(c, 4, 860 - k * 60, Y, 1, { lean: -0.3 - k * 0.6, armR: 1.4, armL: 1.4, expr: 'grit' }, { ...lvl4a, weapon: 'none' }); } },
]);

stage(22, [
  { set: (c, st) => wSnow(c, st, {}), cam: WIDE, look: 'cold', fg: (c, st) => snowFX(c, st.t, 220, 260, 3, 1.4), draw: (c, st) => thermo(c, 960, 860, 1.4, clamp(st.bt / 2.5)), over: (c, st) => bigText(c, '−30°... −40°', st.bt, 0.8, 3, 180, 110) },
  { at: 'Зимней одежды нет', set: (c, st) => wSnow(c, st, {}), cam: [960, 640, 1.1], look: 'cold', fg: (c, st) => snowFX(c, st.t, 180, 220, 4, 1.3), draw: (c, st) => { for (let i = 0; i < 6; i++) kam(c, 200 + i * 300 + Math.sin(st.t * 40 + i) * 3, Y, 0.9, { armL: 0.4, armR: -0.4, expr: 'grit', head: 0.1 }, i, { weapon: 'none' }); } },
  { at: 'под шинель газеты', set: (c, st) => wSnow(c, st, {}), cam: MS(960, Y, 1), look: 'cold', fg: (c, st) => snowFX(c, st.t, 120, 200, 5, 1.2), draw: (c, st) => { hero(c, 4, 960, Y, 1, { ...ip(st), expr: 'grit', armR: -1.2 }, { pal: 'snow' }); rect(c, 900, 640, 120, 40, '#e8e0d0', 2, 3); c.fillStyle = '#3a3a3a'; for (let i = 0; i < 3; i++) c.fillRect(910, 648 + i * 10, 100, 4); rect(c, 920, 700, 80, 30, '#d878a0', 6, 3); } },
  { at: 'Пулемёты не стреляют', set: (c, st) => wSnow(c, st, {}), cam: [1000, 760, 1.6], look: 'cold', draw: (c, st) => { mgProp(c, 1100, 880, 1, true); kam(c, 760, Y + 40, 1, { lean: 0.6, expr: 'angry', armR: -0.6 }, 1, { weapon: 'none', coat: true, toque: true }); }, over: (c, st) => bigText(c, 'КЛАЦ.', st.bt, 0.8, 2.5, 200, 100) },
  { at: 'Обмороженных', set: wHospital, cam: [960, 640, 1.05], look: 'cold', draw: (c, st) => { for (let i = 0; i < 6; i++) { kam(c, 120 + i * 330, Y + 40, 0.8, { ...pose.sit(st.t + i), expr: 'sad' }, i, { weapon: 'none', coat: true, hat: 'none' }); rect(c, 120 + i * 330 + 60, Y - 10, 120, 40, '#f4f2ec', 16, 4); } } },
], { tr: 'black' });

stage(23, [
  { set: (c, st) => wTown(c, st, { evening: true }), look: 'home', cam: [1000, 660, 1.15], draw: (c, st) => { rect(c, 600, 780, 800, 60, '#7a5a3a', 6, 6); for (let i = 0; i < 6; i++) rect(c, 640 + i * 120, 690 - (i % 2) * 30, 110, 90, ['#7a5a40', '#5a4a3a', '#8a6a4a'][i % 3], 20, 4); civ(c, 500, Y, 0.95, ip(st, 1), 2); mama(c, 1300, Y, 0.95, { ...ip(st), armR: -1.2 }); scarf(c, 1180, 700, 0.5); skis(c, 1450, 900, 0.7); } },
  { at: 'Лыжи приходят', set: (c, st) => wField(c, st, {}), cam: MS(960, Y, 1), draw: (c, st) => { hero(c, 4, 960, Y, 1, { ...ip(st), expr: 'shock', armR: -0.4 }, { toque: false, coat: false, weapon: 'none' }); c.save(); c.translate(1100, 900); c.rotate(-1.3); skis(c, 0, 0, 0.6); c.restore(); for (let i = 0; i < 12; i++) circ(c, 300 + i * 130, 1060 + (i % 3) * 20, 10, ['#e8d84a', '#f0f0f0', '#d86a8a'][i % 3], 2); }, over: (c, st) => bigText(c, 'К ВЕСНЕ', st.bt, 0.5, 3, 180, 100) },
], { tr: 'whip' });

stage(24, [
  { set: (c, st) => wSnow(c, st, {}), cam: [960, 640, 1.05], look: 'cold', shake: 4, fg: (c, st) => snowFX(c, st.t, 120, 120, 6, 1.2), draw: (c, st) => { t34(c, 2000 - st.bt * 160, 900, 0.6, st.t, -1, true); for (let i = 0; i < 6; i++) ivan(c, 2200 - i * 180 - st.bt * 140, Y, 0.85, { ...pose.run(st.t + i * 0.2), flip: true }, i, { coat: true, hat: 'ushanka' }); blastFX(c, 500, 900, 0.9, (st.bt % 2) - 0.2, 5); }, over: (c, st) => chron(c, '5 ДЕКАБРЯ 1941', st.bt, 0.3, 3) },
  { at: 'Вы бросаете технику', set: (c, st) => wSnow(c, st, { wrecks: true }), cam: [960, 640, 1.05], pan: [-100, 0], look: 'cold', fg: (c, st) => snowFX(c, st.t, 200, 220, 7, 1.4), draw: (c, st) => { for (let i = 0; i < 6; i++) kam(c, 1900 - i * 260 - st.bt * 50, Y + 20, 0.85, { ...pose.trudge(st.t + i), flip: true }, i, { coat: true, toque: true }); } },
  { at: 'Позже за эту зиму', set: wBarracks, cam: TWO(820, 1200, Y, 1), draw: (c, st) => { hero(c, 4, 820, Y, 1, { ...ip(st), expr: 'neutral' }, { toque: false, weapon: 'none' }); hero(c, 8, 1200, Y, 1, { ...ip(st), armR: -1.3, flip: true }, { pip: 3 }); medalProp(c, 900, 700, 0.35); } },
  { at: 'мороженого мяса', set: (c) => insertBg(c, '#4a4e52', '#42464a'), cam: WIDE, push: 0.1, look: 'cold', draw: (c, st) => medalProp(c, 960, 560, 2.2), over: (c, st) => bigText(c, '«ОРДЕН МОРОЖЕНОГО МЯСА»', st.bt, 0.3, 4, 150, 90) },
], { tr: 'flash' });

stage(25, [
  { set: setDugout, cam: [960, 760, 1.4], draw: (c, st) => hero(c, 4, 960, Y, 1.15, pose.write(st.t), { weapon: 'letter' }), over: (c, st) => letterLine(c, 'Мама, у меня всё хорошо. Спасибо за платок.', st.bt, 0.3) },
  { at: 'Он очень тёплый', set: setDugout, cam: CU(960, Y + 170, 1.15), push: 0.12, draw: (c, st) => { hero(c, 4, 960, Y, 1.15, { ...pose.sit(st.t), expr: 'happy', blink: 1 }, { weapon: 'none' }); }, over: (c, st) => letterLine(c, 'Он очень тёплый.', st.bt, 0.1) },
], { look: 'warm' });

// ===================== 5. ФЕЛЬДФЕБЕЛЬ =====================
card(26, 5);

stage(27, [
  { set: (c, st) => wField(c, st, {}), cam: [960, 640, 1.1], shake: 2, draw: (c, st) => { for (let i = 0; i < 6; i++) kam(c, 760 + i * 200, Y, 0.78, { expr: 'shock' }, i, { hat: 'stahl', weapon: 'rifle', hair: 'short' }); hero(c, 5, 420, Y, 1.05, { ...talk(st), expr: 'angry', armR: -1.6 }); } },
  { at: 'так же, как орали', set: (c, st) => wField(c, st, { autumn: true }), cam: TWO(800, 1120, Y, 1.05), look: 'gray', draw: (c, st) => { landser(c, 800, Y, 1.05, { expr: 'grit' }, { hat: 'rad', weapon: 'none' }, WP.rad); landser(c, 1120, Y, 1.1, { ...talk(st), expr: 'angry', flip: true }, { hat: 'rad', weapon: 'none', mustache: true }, WP.rad); }, over: (c, st) => chron(c, '1939', st.bt, 0.2, 2.5) },
  { at: 'Только теперь', set: (c, st) => wField(c, st, {}), cam: CU(960, Y, 1), push: 0.1, draw: (c, st) => hero(c, 5, 960, Y, 1, { ...ip(st), expr: 'neutral' }) },
  { at: 'быстро падать', set: (c, st) => wField(c, st, {}), cam: [960, 680, 1.15], draw: (c, st) => { for (let i = 0; i < 5; i++) { const down = st.bt > 0.6 + (i === 3 ? 1.2 : i * 0.1); if (down) kam(c, 500 + i * 300, Y, 0.85, pose.lie(), i); else kam(c, 300 + i * 300, Y, 0.85, ip(st, i), i); } hero(c, 5, 1700, Y, 0.95, { ...talk(st), flip: true, armR: -1.6 }); } },
], { tr: 'black', look: 'day' });

stage(28, [
  { set: (c) => insertBg(c, '#c8bea6', '#bcb29a'), cam: WIDE, draw: (c, st) => { paperSign(c, 960, 520, 1.6, ['SCHÜTZE', 'GRENADIER']); if (st.bt > 0.8) { c.strokeStyle = '#c83a3a'; c.lineWidth = 16; const p = clamp((st.bt - 0.8) / 0.4); c.beginPath(); c.moveTo(700, 465); c.lineTo(700 + 520 * p, 465); c.stroke(); } } },
  { at: 'Звучит гордо', set: (c, st) => wField(c, st, {}), cam: MS(960, Y, 1), draw: (c, st) => hero(c, 5, 960, Y, 1, { ...pose.salute(), lean: -0.06, expr: 'happy' }, { weapon: 'none' }) },
  { at: 'Сапоги от этого', set: (c, st) => wField(c, st, {}), cam: [960, 930, 2.6], draw: (c, st) => { hero(c, 5, 960, Y, 1, ip(st)); c.fillStyle = '#e0b896'; c.beginPath(); c.arc(1000, 990, 8, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(930, 985, 7, 0, Math.PI * 2); c.fill(); } },
  { at: 'пополнение', set: (c, st) => wField(c, st, {}), cam: [960, 680, 1.15], draw: (c, st) => { hero(c, 5, 420, Y, 1.05, { ...ip(st), expr: 'sad' }); for (let i = 0; i < 6; i++) kam(c, 760 + i * 190, Y, 0.72, { ...ip(st, i), expr: 'happy' }, i, { hat: 'stahl', mustache: false }); } },
], { tr: 'whip', look: 'day' });

stage(29, [
  { set: (c, st) => wSteppe(c, st, { road: true }), cam: [960, 640, 1.05], draw: (c, st) => { for (let i = 0; i < 3; i++) ptank(c, -200 + i * 400 + st.bt * 120, 760, 0.4, st.t, 1); for (let i = 0; i < 8; i++) { const s = 0.45 + i * 0.08; kam(c, 960 + (i % 2 ? 70 : -70) * s, 720 + i * 45, s, pose.march(st.t + i * 0.4), i, { hat: 'm43' }); } }, over: (c, st) => chron(c, 'ЛЕТО 1942', st.bt, 0.3, 3) },
  { at: 'нефть Кавказа', set: (c) => insertBg(c, '#4a4438', '#423c32'), cam: WIDE, look: 'warm', draw: (c, st) => { mapBoard(c, 960, 540, 2.0, st.p * 1.3, 2); c.fillStyle = '#2a1e16'; c.font = '700 54px "Oswald"'; c.fillText('ВОЛГА', 1330, 300); c.fillText('КАВКАЗ', 1200, 820); } },
  { at: 'Название города', set: (c, st) => wSteppe(c, st, {}), cam: TWO(820, 1200, Y, 1), draw: (c, st) => { signPost(c, 1200, Y, 'СТАЛИНГРАД', 1); hero(c, 5, 820, Y, 1, { ...ip(st), expr: 'neutral', look: 1 }); } },
  { at: 'К ноябрю', set: setDugout, cam: MS(960, Y, 1), look: 'warm', draw: (c, st) => hero(c, 5, 960, Y, 1, { ...ip(st), expr: 'grit', armR: -1.0 }) },
], { tr: 'black', look: 'day' });

stage(30, [
  { set: (c, st) => setStalingrad(c, st, {}), cam: [960, 600, 1.05], shake: 3, look: 'fire', draw: (c, st) => { for (let i = 0; i < 3; i++) kam(c, 300 + i * 260, Y, 0.85, pose.run(st.t + i * 0.3, 0.8), i, { hat: 'stahl' }); blastFX(c, 1400, 860, 1, (st.bt % 2.4) - 0.4, 2); }, over: (c, st) => chron(c, 'СТАЛИНГРАД. ОСЕНЬ 1942', st.bt, 0.3, 3) },
  { at: 'Есть лестница', set: stairsInterior, cam: [900, 640, 1.2], look: 'fire', draw: (c, st) => { hero(c, 5, 700 + st.bt * 40, 880 - st.bt * 20, 1, { ...pose.aim(st.t), lean: 0.1 }); } },
  { at: 'Есть дом', set: cutHouse, cam: [960, 580, 1.15], look: 'fire', draw: (c, st) => { hero(c, 5, 760, 980, 0.62, { ...ip(st), head: -0.3, look: 0 }); kam(c, 1000, 980, 0.62, { ...ip(st, 1), head: -0.3 }, 1); kam(c, 1200, 980, 0.62, pose.aim(st.t), 2); ivan(c, 800, 560, 0.62, { ...ip(st), head: 0.3 }, 1, { hat: 'helmet' }); ivan(c, 1100, 560, 0.62, { ...ip(st, 2), head: 0.3 }, 2); } },
  { at: 'За один цех', set: wFactory, cam: [960, 640, 1.05], shake: 4, look: 'fire', draw: (c, st) => { kam(c, 600, Y, 0.95, pose.fire(st.t), 2, { weapon: 'mp40', hat: 'stahl' }); for (let i = 0; i < 3; i++) tracer(c, 1700, 650 + i * 30, 700, 640, st.t + i * 0.3, 3, '#ffe28a'); blastFX(c, 1300, 900, 0.8, (st.bt % 2) - 0.3, 7); } },
  { at: 'перестаёшь считать', set: (c) => { fillBg(c, '#a8988a'); c.strokeStyle = 'rgba(60,50,40,0.5)'; c.lineWidth = 4; c.beginPath(); c.moveTo(200, -100); c.lineTo(420, 260); c.lineTo(380, 520); c.moveTo(1500, 1200); c.lineTo(1650, 800); c.lineTo(1900, 700); c.stroke(); }, cam: WIDE, push: 0.08, draw: (c, st) => { c.save(); c.translate(160, 200); c.scale(2, 2); tally(c, 0, 0, Math.min(37, Math.floor(st.bt * 14)), clamp((st.bt - 2.2) / 1.2)); c.restore(); } },
]);

stage(31, [
  { set: (c, st) => setStalingrad(c, st, { winter: true, fire: false }), cam: [960, 640, 1.05], look: 'cold', draw: (c, st) => { for (let i = 0; i < 4; i++) kam(c, 400 + i * 360, Y, 0.9, { ...ip(st, i), head: -0.1, look: 1 }, i, { coat: true }); c.fillStyle = `rgba(255,200,120,${0.25 + 0.2 * Math.sin(st.t * 20)})`; c.fillRect(BX0, 600, BX1 - BX0, 100); }, over: (c, st) => chron(c, '19 НОЯБРЯ 1942', st.bt, 0.3, 3) },
  { at: 'в кольце', set: (c) => insertBg(c, '#4a4438', '#423c32'), cam: WIDE, look: 'cold', draw: (c, st) => { mapBoard(c, 960, 540, 2.0, 1, 1); const p = clamp(st.bt / 2.2); c.strokeStyle = '#c83a3a'; c.lineWidth = 24; c.beginPath(); c.arc(1180, 440, 160, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p); c.stroke(); }, over: (c, st) => bigText(c, 'КОТЁЛ', st.bt, 2.0, 3, 900, 120) },
  { at: 'помощь по воздуху', set: wAirfield, cam: [960, 520, 1.05], look: 'cold', draw: (c, st) => { ju52(c, -300 + st.bt * 300, 260, 0.7, st.t); for (let i = 0; i < 3; i++) { const p = clamp((st.bt - 0.6 - i * 0.5) / 3); if (p <= 0) continue; const x = 200 + i * 300 + p * (i === 1 ? 900 : 200), y = 320 + p * 500; c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.moveTo(x - 60, y - 80); c.lineTo(x, y); c.lineTo(x + 60, y - 80); c.stroke(); c.fillStyle = '#e8e4d8'; c.beginPath(); c.ellipse(x, y - 100, 80, 40, 0, Math.PI, 0); c.fill(); c.stroke(); rect(c, x - 20, y, 40, 60, '#5e6454', 4, 4); } } },
  { at: 'Хлеб на взвод', set: setDugout, cam: [960, 720, 1.5], draw: (c, st) => { rect(c, 600, 820, 720, 40, '#6a4a2a', 6, 6); bread2(c, 960, 820, 0.8); c.strokeStyle = INK; c.lineWidth = 3; for (let i = 0; i < Math.min(14, Math.floor(st.bt * 5)); i++) { c.beginPath(); c.moveTo(880 + i * 12, 760); c.lineTo(880 + i * 12, 820); c.stroke(); } for (let i = 0; i < 4; i++) kam(c, 560 + i * 270, Y + 90, 0.85, { ...ip(st, i), head: 0.2, expr: 'sad' }, i, { weapon: 'none', coat: true, hat: 'none' }); } },
  { at: 'Едят лошадей', set: (c, st) => setStalingrad(c, st, { winter: true, fire: false }), cam: [960, 760, 1.5], look: 'cold', draw: (c, st) => { campfire(c, 960, Y - 20, 1.2, st.t); kotelok(c, 960, Y - 80, 1.1); for (let i = 0; i < 3; i++) kam(c, 640 + i * 320, Y, 0.9, { ...pose.sit(st.t + i), expr: 'sad' }, i, { weapon: 'none', coat: true }); } },
  { at: 'Потом не едят', set: (c, st) => setStalingrad(c, st, { winter: true, fire: false }), cam: [960, 760, 1.5], look: 'gray', fg: (c, st) => snowFX(c, st.t, 120, 60, 8, 1.2), draw: (c, st) => { kotelok(c, 960, Y - 30, 1.1); for (let i = 0; i < 3; i++) kam(c, 640 + i * 320, Y, 0.9, { ...pose.sit(st.t + i), blink: 1, head: 0.3 }, i, { weapon: 'none', coat: true }); } },
], { tr: 'black' });

stage(32, [
  { set: (c, st) => setStalingrad(c, st, { winter: true, fire: false }), cam: [960, 680, 1.2], look: 'cold', shake: 6, draw: (c, st) => { if (st.bt < 0.5) hero(c, 5, 960, Y, 1, pose.run(st.t), { coat: true }); else hero(c, 5, 1100, Y, 1, pose.lie(), { coat: true }); blastFX(c, 1000, 960, 1.1, st.bt - 0.35, 3); }, over: (c, st) => chron(c, 'ЯНВАРЬ 1943', st.bt, 0.8, 3) },
  { at: 'на аэродроме', set: wAirfield, cam: [960, 660, 1.05], look: 'cold', draw: (c, st) => { ju52(c, 1500, 640, 0.5, 0); for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) { rect(c, -100 + i * 330 + r * 60, 800 + r * 110, 260, 40, '#8a7a5a', 8, 4); kam(c, 140 + i * 330 + r * 60, 800 + r * 110, 0.42, pose.lie(), i + r, { weapon: 'none', coat: true, hat: 'none' }); } } },
  { at: 'успевают вывезти', set: wAirfield, cam: [1100, 620, 1.3], look: 'cold', draw: (c, st) => { ju52(c, 1200, 760, 1, 0); const p = clamp(st.bt / 2.5); rect(c, 700 + p * 300, 700 - p * 40, 300, 40, '#8a7a5a', 8, 4); hero(c, 5, 960 + p * 300, 700 - p * 40, 0.7, pose.lie(), { coat: true, weapon: 'none', hat: 'none' }); kam(c, 640 + p * 300, Y - p * 40, 0.85, pose.march(st.t), 1, { weapon: 'none', coat: true }); } },
  { at: 'Многим не хватает', set: wAirfield, cam: [960, 600, 1.05], look: 'gray', draw: (c, st) => { ju52(c, 900 + st.bt * 400, 600 - st.bt * 120, 0.6, st.t); for (let i = 0; i < 6; i++) kam(c, 100 + i * 330, 980, 0.5, pose.lie(), i, { weapon: 'none', coat: true, hat: 'none' }); } },
  { at: 'Из тех, кто остался', set: (c, st) => wSnow(c, st, {}), cam: [960, 640, 1.05], look: 'gray', fg: (c, st) => snowFX(c, st.t, 160, 100, 9, 1.2), draw: (c, st) => { for (let i = 0; i < 14; i++) kam(c, 2100 - i * 150 - st.bt * 30, 880 + (i % 3) * 50, 0.55 + (i % 3) * 0.05, { ...pose.trudge(st.t + i), flip: true, head: 0.25 }, i, { weapon: 'none', coat: true, toque: true, hat: 'none' }); }, over: (c, st) => chron(c, 'ИЗ ~91 000 ПЛЕННЫХ ВЕРНУТСЯ ОКОЛО 6 000', st.bt, 0.4, 5) },
  { at: 'Ты один из', set: (c) => { fillBg(c, '#3a3c3e'); for (let i = 0; i < 5; i++) rect(c, 200 + i * 340, 300, 140, 100, '#a8b8c0', 8, 5); }, cam: CU(960, Y, 1), push: 0.1, look: 'gray', draw: (c, st) => hero(c, 5, 960, Y, 1, { ...ip(st), expr: 'sad', bob: Math.sin(st.t * 18) * 2 }, { coat: true, hat: 'none' }) },
]);

stage(33, [
  { set: wHospital, cam: [960, 720, 1.3], draw: (c, st) => { hospitalBed(c, 960, Y); hero(c, 5, 1150, Y - 150, 0.6, { ...pose.lie(), blink: 0 }, { hat: 'none', weapon: 'none' }); } , over: (c, st) => letterLine(c, 'Мама, у меня всё хорошо. Немного ранен.', st.bt, 0.3) },
  { at: 'Не волнуйся', set: wHospital, cam: CU(960, Y + 200, 0.9), draw: (c, st) => hero(c, 5, 960, Y, 0.9, { ...pose.write(st.t), expr: 'sad' }, { hat: 'none', weapon: 'letter' }), over: (c, st) => letterLine(c, 'Не волнуйся.', st.bt, 0.1) },
], { look: 'warm' });

// ===================== 6. ЛЕЙТЕНАНТ =====================
card(34, 6);

stage(35, [
  { set: (c, st) => wField(c, st, { gray: true }), cam: [960, 640, 1.05], look: 'gray', draw: (c, st) => { for (let r = 0; r < 2; r++) for (let i = 0; i < 7; i++) graveCross(c, 160 + i * 270 + r * 130, 860 + r * 140, 0.6 + r * 0.12, true, true); }, over: (c, st) => chron(c, 'ОФИЦЕРОВ НЕ ХВАТАЕТ', st.bt, 0.3, 3) },
  { at: 'фельдфебеля с фронтовым', set: wSchool, cam: [960, 640, 1.1], draw: (c, st) => { for (let i = 0; i < 4; i++) kam(c, -60 + i * 600, Y + 30, 0.8, { ...pose.sit(st.t + i) }, i, { weapon: 'none', hat: 'none' }); hero(c, 5, 1150, Y + 30, 0.85, { ...pose.write(st.t) }, { weapon: 'letter', hat: 'none' }); } },
  { at: 'Через несколько месяцев', set: (c, st) => wTown(c, st, {}), cam: MS(960, Y, 1), push: 0.1, draw: (c, st) => hero(c, 6, 960, Y, 1, { ...pose.salute(), expr: 'neutral' }), over: (c, st) => bigText(c, 'ЛЕЙТЕНАНТ', st.bt, 0.3, 3, 170, 110) },
  { at: 'Отец пишет', set: wLiving, look: 'home', cam: TWO(820, 1150, Y, 1), draw: (c, st) => { papa(c, 900, Y + 40, 1, { ...pose.write(st.t), expr: 'happy' }); } },
  { at: 'Ты не знаешь', set: setDugout, cam: CU(960, Y, 1), push: 0.1, draw: (c, st) => hero(c, 6, 960, Y, 1, { ...ip(st), expr: 'neutral', armR: -1.0 }, { weapon: 'letter' }) },
], { tr: 'black', look: 'day' });

stage(36, [
  { set: setKursk, cam: [960, 600, 1.05], draw: (c, st) => { for (let i = 0; i < 4; i++) tiger(c, -200 + i * 600 + st.bt * 60, 820 + (i % 2) * 40, 0.55, st.t, 1); }, over: (c, st) => chron(c, 'КУРСК. ИЮЛЬ 1943', st.bt, 0.3, 3) },
  { at: 'Новые танки', set: setKursk, cam: [900, 760, 1.4], draw: (c, st) => { tiger(c, 600 + st.bt * 140, 1000, 1.2, st.t, 1); dustFX(c, st.t, 60, 6); } },
  { at: 'Ты смотришь на них', set: setKursk, cam: CU(960, Y, 1), push: 0.1, draw: (c, st) => hero(c, 6, 960, Y, 1, { ...ip(st), expr: 'happy', look: 1 }) },
  { at: 'Через неделю', set: setKursk, cam: [960, 640, 1.05], shake: 6, look: 'fire', draw: (c, st) => { tiger(c, 600, 900, 0.7, st.t, 1, true); tiger(c, 1400, 860, 0.6, st.t, 1, st.bt > 1); blastFX(c, 1000, 900, 1.1, (st.bt % 1.8) - 0.2, 4); } },
  { at: 'Дальше вы только', set: setKursk, cam: [960, 640, 1.05], pan: [-100, 0], look: 'warm', draw: (c, st) => { for (let i = 0; i < 6; i++) kam(c, 1900 - i * 280 - st.bt * 60, Y, 0.85, { ...pose.trudge(st.t + i), flip: true }, i, { hat: 'm43' }); } },
], { tr: 'flash', look: 'day' });

stage(37, [
  { set: (c, st) => wField(c, st, {}), cam: [960, 660, 1.15], draw: (c, st) => { for (let i = 0; i < 7; i++) kam(c, 300 + i * 220, Y - 30, 0.72, { ...ip(st, i), expr: i % 2 ? 'shock' : 'neutral' }, i, { hat: 'stahl' }); hero(c, 6, 960, Y + 60, 1, ip(st)); }, over: (c, st) => chron(c, 'ВЗВОД. ВСЕМ ПО 18', st.bt, 0.3, 3) },
  { at: 'Они смотрят', set: setNightCamp, cam: TWO(760, 1180, Y, 1), look: 'night', draw: (c, st) => { campfire(c, 960, Y - 20, 1.4, st.t); kam(c, 760, Y, 0.85, { ...pose.sit(st.t), expr: 'neutral' }, 3, { weapon: 'none', hat: 'feld' }); hero(c, 6, 1180, Y, 1, { ...pose.sit(st.t + 1), ...talk(st), flip: true }); } },
  { at: 'копай глубже', set: (c, st) => setTrench(c, st, { summer: true }), cam: [960, 640, 1.1], draw: (c, st) => { hero(c, 6, 700, 960, 1, { ...talk(st), armR: -1.2 + Math.sin(st.t * 3) * 0.2 }); for (let i = 0; i < 3; i++) kam(c, 1050 + i * 260, 960, 0.85, pose.dig(st.t + i), i, { weapon: 'shovel' }); ['КОПАЙ ГЛУБЖЕ', 'НЕ ЛЕЗЬ ВПЕРЁД', 'НЕ ВЕРЬ СВОДКАМ'].forEach((tx, i) => { const a = st.ph(['копай', 'не лезь', 'не верь'][i]); if (st.bt > a && st.bt < a + 1.8) chron(c, tx, st.bt, a, 1.6); }); } },
  { at: 'Последнее ты говоришь', set: setDugout, cam: TWO(860, 1100, Y, 1), draw: (c, st) => { radioSet(c, 1500, 820, 1); hero(c, 6, 860, Y, 1, { ...ip(st), armR: -2.0, lean: 0.12, expr: 'neutral' }); kam(c, 1100, Y, 0.85, { ...ip(st), expr: 'shock', flip: true }, 3, { weapon: 'none' }); } },
  { at: 'трибунал', set: (c, st) => wRear(c, st), cam: [960, 640, 1.1], look: 'gray', draw: (c, st) => { landser(c, 1500, Y - 40, 0.75, { ...ip(st), flip: true, head: Math.sin(st.t) * 0.1 }, { hat: 'stahl', weapon: 'rifle', gorget: true }); hero(c, 6, 700, Y, 1, { ...ip(st), expr: 'neutral' }); } },
], { tr: 'black', look: 'day' });

stage(38, [
  { set: (c, st) => wTown(c, st, {}), look: 'home', cam: TWO(820, 1120, Y, 1), draw: (c, st) => { greta(c, 820, Y, 0.95, { ...ip(st), expr: 'happy' }); kam(c, 1120, Y, 1, { ...ip(st), expr: 'happy', flip: true }, 3, { weapon: 'none', hat: 'schirm', mustache: true }); c.fillStyle = '#f4f2ec'; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(780, 560); c.lineTo(700, 980); c.lineTo(860, 980); c.closePath(); c.globalAlpha = 0.85; c.fill(); c.globalAlpha = 1; c.stroke(); } },
  { at: 'Ты не злишься', set: setDugout, cam: CU(960, Y, 1), push: 0.1, draw: (c, st) => hero(c, 6, 960, Y, 1, { ...ip(st), expr: st.A('Ты рад') > 0 ? 'happy' : 'sad', armR: -1.0 }, { weapon: 'letter' }) },
], { tr: 'whip' });

stage(39, [
  { set: setDugout, cam: [960, 760, 1.4], draw: (c, st) => hero(c, 6, 960, Y, 1.15, pose.write(st.t), { weapon: 'letter' }), over: (c, st) => letterLine(c, 'Мама, у меня всё хорошо. Я теперь офицер.', st.bt, 0.3) },
  { at: 'Представляешь', set: setDugout, cam: CU(960, Y + 170, 1.15), push: 0.1, draw: (c, st) => hero(c, 6, 960, Y, 1.15, { ...pose.sit(st.t), expr: 'happy' }, { weapon: 'none' }), over: (c, st) => letterLine(c, 'Представляешь?', st.bt, 0.1) },
], { look: 'warm' });

// ===================== 7. ОБЕР-ЛЕЙТЕНАНТ =====================
card(40, 7);

stage(41, [
  { set: (c) => insertBg(c), cam: WIDE, push: 0.08, draw: (c, st) => wInsignia(c, 7, 960, 540, 2.0), over: (c, st) => bigText(c, '«ШИШКА»', st.bt, 1.0, 3, 900, 100) },
  { at: 'Ты командуешь ротой', set: (c, st) => wField(c, st, { gray: true }), cam: [960, 660, 1.1], look: 'gray', draw: (c, st) => { for (let i = 0; i < 12; i++) { c.save(); c.globalAlpha = i % 3 === 0 ? 1 : 0.15; kam(c, 160 + i * 140, Y - 40, 0.62, ip(st, i), i, { hat: 'm43' }); c.restore(); } hero(c, 7, 960, Y + 60, 1, ip(st)); }, over: (c, st) => bigText(c, '1/3', st.bt, 0.6, 3, 180, 120) },
  { at: 'двадцать четыре', set: (c, st) => wField(c, st, { gray: true }), cam: CU(960, Y, 1), push: 0.14, look: 'gray', draw: (c, st) => hero(c, 7, 960, Y, 1, { ...ip(st), expr: 'neutral' }), over: (c, st) => bigText(c, '24 ГОДА', st.bt, 0.4, 3, 180, 100) },
], { tr: 'black' });

stage(42, [
  { set: (c, st) => setForest(c, st, {}), cam: [960, 620, 1.05], draw: (c, st) => { for (let i = 0; i < 4; i++) kam(c, 300 + i * 420, 980, 0.85, pose.aim(st.t), i, { hat: 'stahl' }); }, over: (c, st) => chron(c, 'БЕЛОРУССИЯ. ИЮНЬ 1944', st.bt, 0.3, 3) },
  { at: 'Удар приходит', set: (c, st) => setForest(c, st, {}), cam: [960, 600, 1.05], shake: 8, look: 'fire', draw: (c, st) => { for (let i = 0; i < 5; i++) blastFX(c, 100 + i * 420, 900 - (i % 2) * 60, 1, ((st.bt + i * 0.37) % 1.6) - 0.1, i); } },
  { at: 'Фронт, который', set: (c) => insertBg(c, '#4a4438', '#423c32'), cam: WIDE, look: 'warm', over: (c, st) => bigText(c, 'ФРОНТ', st.bt, 0.1, 9, 200, 110), draw: (c, st) => { c.strokeStyle = '#2a2a2a'; c.lineWidth = 3; for (let i = 0; i < 12; i++) { const p = clamp((st.bt - 0.5 - i * 0.12) / 1); rect(c, 300 + i * 110 + p * (i % 2 ? 60 : -40), 400 + p * p * 500, 90, 220, '#6a705e', 6, 5); } } },
  { at: 'Вы бежите по лесам', set: (c, st) => setForest(c, st, { swamp: true }), cam: [960, 640, 1.05], pan: [-120, 0], draw: (c, st) => { for (let i = 0; i < 6; i++) kam(c, 1900 - i * 280 - st.bt * 120, Y + (i % 2) * 20, 0.85, { ...pose.run(st.t + i * 0.2, 0.8), flip: true }, i, { hat: 'm43' }); } },
  { at: 'исчезают целые', set: (c) => insertBg(c, '#4a4438', '#423c32'), cam: WIDE, look: 'warm', draw: (c, st) => { for (let i = 0; i < 24; i++) { const gone = st.bt > 0.4 + (i * 7 % 24) * 0.12; if (gone) continue; rect(c, 300 + (i % 8) * 170, 280 + Math.floor(i / 8) * 180, 130, 120, '#6a705e', 6, 5); c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(310 + (i % 8) * 170, 290 + Math.floor(i / 8) * 180); c.lineTo(420 + (i % 8) * 170, 390 + Math.floor(i / 8) * 180); c.moveTo(420 + (i % 8) * 170, 290 + Math.floor(i / 8) * 180); c.lineTo(310 + (i % 8) * 170, 390 + Math.floor(i / 8) * 180); c.stroke(); } } },
  { at: 'Вы идёте назад', set: (c, st) => { sky(c, '#8a8a88', '#c8c4b8'); layer(c, st, 0.4, () => { for (let i = 0; i < 6; i++) izba(c, -200 + i * 450, 760, 1, true); }); ground(c, 760, '#7a7466', '#6a6458'); }, cam: [960, 640, 1.05], look: 'gray', draw: (c, st) => { for (let i = 0; i < 6; i++) kam(c, 1900 - i * 280 - st.bt * 50, Y, 0.85, { ...pose.trudge(st.t + i), flip: true }, i, { hat: 'm43' }); } },
  { at: 'Ты знаешь, почему', set: (c, st) => { sky(c, '#8a8a88', '#c8c4b8'); layer(c, st, 0.4, () => { for (let i = 0; i < 6; i++) izba(c, -200 + i * 450, 760, 1, true); }); ground(c, 760, '#7a7466', '#6a6458'); }, cam: CU(960, Y, 1), push: 0.12, look: 'gray', draw: (c, st) => hero(c, 7, 960, Y, 1, { ...ip(st), expr: 'sad', look: -1 }) },
], { tr: 'flash' });

stage(43, [
  { set: wRear, cam: [1000, 640, 1.15], look: 'gray', draw: (c, st) => { for (let i = 0; i < 2; i++) landser(c, 1200 + i * 220, Y, 0.95, { ...ip(st, i), flip: true }, { hat: 'stahl', weapon: i ? 'rifle' : 'none', gorget: true, coat: true }); for (let i = 0; i < 3; i++) kam(c, 400 + i * 200, Y, 0.88, { ...ip(st, i), expr: 'shock', armR: i === 2 ? -1.2 : 0 }, i, { weapon: 'none' }); } },
  { at: 'цепными псами', set: (c, st) => { wRear(c, st); dim(c, 0.3); }, cam: [960, 680, 2.4], push: 0.1, look: 'gray', draw: (c, st) => landser(c, 960, Y, 1, { ...ip(st), expr: 'neutral' }, { hat: 'stahl', weapon: 'none', gorget: true, coat: true }), over: (c, st) => bigText(c, '«ЦЕПНЫЕ ПСЫ»', st.bt, 0.3, 3, 170, 100) },
  { at: 'Они вешают', set: (c, st) => { wRear(c, st); c.fillStyle = 'rgba(0,0,0,0.35)'; c.save(); c.translate(1300, 1000); c.transform(1, 0, -1.6, 0.3, 0, 0); c.fillRect(-12, -900, 24, 900); c.restore(); }, cam: [960, 640, 1.1], look: 'gray', draw: (c, st) => { for (let i = 0; i < 5; i++) kam(c, -100 + i * 260 + st.bt * 60, Y, 0.88, { ...pose.trudge(st.t + i), head: 0.3, look: -1 }, i); } },
  { at: 'На груди табличка', set: (c) => { fillBg(c, '#5a5650'); rect(c, 900, -400, 120, 1900, '#6a4a2a', 4, 6); }, cam: WIDE, push: 0.06, look: 'gray', draw: (c, st) => { c.strokeStyle = INK; c.lineWidth = 5; c.beginPath(); c.moveTo(860, 280); c.lineTo(960, 200); c.lineTo(1060, 280); c.stroke(); paperSign(c, 960, 420, 0.9, ['Я ТРУС']); } },
  { at: 'Тебе нечем гордиться', set: (c, st) => setForest(c, st, {}), cam: [960, 660, 1.15], look: 'gray', draw: (c, st) => { for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; kam(c, 960 + Math.cos(a) * 420, Y - 40 + Math.sin(a) * 60, 0.75, { ...ip(st, i), expr: 'neutral' }, i, { hat: 'm43' }); } hero(c, 7, 960, Y + 20, 1, { ...ip(st), armR: -0.6 }); } },
]);

stage(44, [
  { set: setDugout, cam: TWO(820, 1150, Y, 1), draw: (c, st) => { kam(c, 1150, Y, 0.95, { ...ip(st), armR: -1.0, flip: true }, 2, { weapon: 'letter', hat: 'feld' }); hero(c, 7, 820, Y, 1, { ...ip(st), armR: -1.0, expr: st.A('От соседки') > 0 ? 'shock' : 'happy' }, { weapon: 'letter' }); } },
  { at: 'Город бомбили', set: (c, st) => wTown(c, st, { night: true }), cam: [960, 560, 1.05], look: 'night', shake: 2, draw: (c, st) => { for (let i = 0; i < 5; i++) bomber(c, -200 + i * 420 + st.bt * 200, 140 + (i % 2) * 70, 0.5); } },
  { at: 'Мамы больше нет', set: (c, st) => { wLiving(c, st, { night: true }); dim(c, 0.35); }, cam: [1000, 620, 1.2], look: 'night', draw: (c, st) => { rect(c, 1360, 690, 80, 120, '#6a4a30', 4, 4); c.save(); c.translate(1060, 480); rect(c, -70, -90, 140, 180, '#8a6a4a', 4, 5); rect(c, -54, -74, 108, 148, '#d8c8a8', 2, 3); c.restore(); } },
  { at: 'Ты складываешь письмо', set: setDugout, cam: [960, 640, 1.6], push: 0.1, draw: (c, st) => { hero(c, 7, 820, Y, 1, { ...ip(st), expr: 'sad', armR: -1.6 }, { weapon: 'letter' }); dogTag(c, 1160, 580, 0.6, 0, 0.1); envelope(c, 1160, 760, 0.5, -0.1, ''); } },
], { tr: 'black', look: 'warm' });

// ===================== 8. ГАУПТМАН =====================
card(45, 8);

stage(46, [
  { set: (c, st) => wTown(c, st, { ruined: true }), cam: CU(960, Y, 1), push: 0.1, look: 'gray', draw: (c, st) => hero(c, 8, 960, Y, 1, { ...ip(st), expr: 'neutral' }), over: (c, st) => chron(c, 'ГАУПТМАН. 25 ЛЕТ', st.bt, 0.3, 3) },
  { at: 'командуешь батальоном', set: (c, st) => wTown(c, st, { ruined: true }), cam: [960, 660, 1.1], look: 'gray', draw: (c, st) => { for (let i = 0; i < 16; i++) { c.save(); c.globalAlpha = i % 4 === 0 ? 1 : 0.12; kam(c, 120 + i * 112, Y - 40, 0.55, ip(st, i), i); c.restore(); } hero(c, 8, 960, Y + 60, 1, ip(st)); } },
  { at: 'старики из', set: (c, st) => wTown(c, st, { ruined: true }), cam: [960, 660, 1.1], look: 'gray', draw: (c, st) => { for (let i = 0; i < 6; i++) { const old = i < 3; civ(c, 260 + i * 280, Y, old ? 0.95 : 0.7, { ...ip(st, i), expr: old ? 'neutral' : 'shock', head: old ? 0.1 : 0 }, old ? 0 : 2, old ? { old: true, mustache: true, hat: 'flat', coat: true } : { hat: 'none', female: false }); rect(c, 260 + i * 280 - (old ? 90 : 66), Y - (old ? 300 : 220), old ? 30 : 22, 20, '#e8e8e8', 2, 3); } } },
  { at: 'У одного', set: (c, st) => wTown(c, st, { ruined: true }), cam: MS(960, Y, 0.7), look: 'gray', draw: (c, st) => { civ(c, 960, Y, 0.7, { ...ip(st), expr: 'shock' }, 2, { hat: 'none', female: false }); panzerfaust(c, 990, Y - 230, 1.1, -0.2); } },
  { at: 'отправляешь его домой', set: (c, st) => wTown(c, st, { ruined: true }), cam: TWO(760, 1300, Y, 1), look: 'gray', draw: (c, st) => { hero(c, 8, 760, Y, 1, { ...ip(st), armR: -1.6, expr: 'neutral' }); civ(c, 1200 + st.bt * 160, Y, 0.7, pose.run(st.t, 0.8), 2, { hat: 'none', female: false }); } },
  { at: 'единственный приказ', set: (c, st) => wTown(c, st, { ruined: true }), cam: CU(960, Y, 1), push: 0.1, look: 'gray', draw: (c, st) => hero(c, 8, 960, Y, 1, { ...ip(st), expr: 'happy' }) },
], { tr: 'black' });

stage(47, [
  { set: (c, st) => wTown(c, st, { ruined: true, fire: true }), cam: [960, 600, 1.05], pan: [100, 0], look: 'gray', draw: () => {}, over: (c, st) => chron(c, 'ГЕРМАНИЯ. ВЕСНА 1945', st.bt, 0.3, 3.5) },
  { at: 'Ты идёшь через', set: (c, st) => wTown(c, st, { ruined: true }), cam: [960, 660, 1.1], look: 'gray', draw: (c, st) => { for (let i = 0; i < 5; i++) kam(c, -100 + i * 280 + st.bt * 60, Y, 0.85, pose.trudge(st.t + i), i, { hat: 'm43', coat: true }); hero(c, 8, 1500 + st.bt * 60, Y, 0.95, pose.trudge(st.t)); } },
  { at: 'Белые простыни', set: (c, st) => wTown(c, st, { sheets: true }), cam: [960, 520, 1.5], pan: [80, 0], look: 'gray', draw: () => {} },
  { at: 'Женщины смотрят', set: (c, st) => wTown(c, st, { sheets: true }), cam: [960, 680, 1.15], look: 'gray', draw: (c, st) => { for (let i = 0; i < 4; i++) civ(c, 300 + i * 440, Y - 40, 0.85, { ...ip(st, i), expr: 'sad' }, 1 + (i % 2) * 2, { female: true }); } },
]);

stage(48, [
  { set: (c, st) => wField(c, st, {}), cam: [960, 660, 1.1], draw: (c, st) => { riflePile(c, 960, 960, 1.4); for (let i = 0; i < 4; i++) kam(c, 300 + i * 160, Y, 0.85, { ...ip(st, i), head: 0.2 }, i, { weapon: 'none', hat: 'm43' }); for (let i = 0; i < 2; i++) ivan(c, 1500 + i * 200, Y, 0.9, { ...ip(st, i), flip: true }, i, { weapon: 'ppsh' }); }, over: (c, st) => chron(c, 'МАЙ 1945', st.bt, 0.3, 3) },
  { at: 'Ты снимаешь ремень', set: (c, st) => wField(c, st, {}), cam: [960, 880, 2.2], draw: (c, st) => { c.strokeStyle = INK; c.lineWidth = 6; c.fillStyle = '#3a2614'; const yy = 980 - clamp(1 - st.bt / 1.5) * 200; c.fillRect(780, yy, 400, 26); c.strokeRect(780, yy, 400, 26); rect(c, 1000, yy - 20, 80, 90, '#3a2614', 10, 5); } },
  { at: 'самое тихое утро', set: (c, st) => { sky(c, '#e8c8a0', '#fff0d0'); const g = c.createRadialGradient(1300, 700, 20, 1300, 700, 500); g.addColorStop(0, 'rgba(255,240,190,0.9)'); g.addColorStop(1, 'rgba(255,240,190,0)'); c.fillStyle = g; c.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); ground(c, 720, '#8aa860', '#7a9854'); }, cam: [960, 620, 1.05], look: 'home', draw: (c, st) => { hero(c, 8, 760, Y, 0.9, { ...pose.sit(st.t), expr: 'neutral' }, { hat: 'none', holster: false }); for (let i = 0; i < 3; i++) { const x = 1200 + i * 120 + Math.sin(st.t + i) * 40, y = 300 + Math.sin(st.t * 2 + i) * 30; c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(x - 20, y); c.quadraticCurveTo(x - 10, y - 12 * Math.abs(Math.sin(st.t * 8 + i)), x, y); c.quadraticCurveTo(x + 10, y - 12 * Math.abs(Math.sin(st.t * 8 + i)), x + 20, y); c.stroke(); } } },
], { tr: 'black' });

const pwo = { off: false, pip: 0, hat: 'm43', holster: false, coat: true, offc: false };
stage(49, [
  { set: (c, st) => wCampYard(c, st, {}), cam: [960, 660, 1.1], look: 'gray', draw: (c, st) => { for (let i = 0; i < 7; i++) kam(c, -100 + i * 230 + st.bt * 50, Y, 0.85, { ...pose.trudge(st.t + i), head: 0.2 }, i, { weapon: 'none', coat: true, hat: i % 2 ? 'm43' : 'none' }); ivan(c, 1700, Y, 0.95, { ...ip(st), flip: true }, 2, { weapon: 'ppsh' }); }, over: (c, st) => chron(c, 'ПЛЕН', st.bt, 0.3, 3) },
  { at: 'Ты строишь дома', set: (c, st) => setStalingrad(c, st, { fire: false }), cam: [960, 660, 1.15], look: 'gray', draw: (c, st) => { rect(c, 600, 700, 800, 300, '#b86a4a', 2, 6); c.strokeStyle = '#8a4a32'; c.lineWidth = 3; for (let y = 720; y < 1000; y += 30) { c.beginPath(); c.moveTo(600, y); c.lineTo(1400, y); c.stroke(); } hero(c, 8, 1550, Y, 0.95, { ...ip(st), armR: -1.6 + Math.sin(st.t * 3) * 0.3 }, pwo); kam(c, 450, Y, 0.95, pose.dig(st.t), 2, { weapon: 'none', coat: true, hat: 'none' }); } },
  { at: 'Восстанавливаешь мосты', set: wBridge, cam: [960, 600, 1.1], look: 'gray', draw: (c, st) => { for (let i = 0; i < 4; i++) kam(c, 300 + i * 200 + st.bt * 40, 640, 0.7, { ...pose.trudge(st.t + i), armR: -2.8, armL: 2.8 }, i, { weapon: 'none', coat: true, hat: 'none' }); rect(c, 220 + st.bt * 40, 380, 680, 30, '#8a6a42', 6, 5); } },
  { at: 'Местная старушка', set: (c, st) => wCampYard(c, st, {}), cam: TWO(800, 1150, Y, 1), look: 'warm', draw: (c, st) => { hero(c, 8, 800, Y, 1, { ...ip(st), expr: 'shock', armR: -1.4 }, pwo); oldWoman(c, 1180, Y, 0.92, { ...ip(st), armL: -1.4, flip: true, expr: 'neutral' }); fence(c, 900, 1060, Y + 10, 260); potato(c, 980, 760, 0.9); } },
  { at: 'Ты не понимаешь', set: (c, st) => wCampYard(c, st, {}), cam: CU(960, Y, 1), push: 0.1, look: 'warm', draw: (c, st) => { hero(c, 8, 960, Y, 1, { ...ip(st), expr: 'sad', armR: -1.6 }, pwo); potato(c, 1060, 620, 0.9); } },
  { at: 'всю жизнь', set: (c) => insertBg(c, '#5a5046', '#52483e'), cam: WIDE, push: 0.08, look: 'warm', draw: (c, st) => { c.fillStyle = '#e0b896'; c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.ellipse(960, 640, 300, 140, 0, 0, Math.PI * 2); c.fill(); c.stroke(); potato(c, 960, 560, 2.6); } },
], { tr: 'black' });

stage(50, [
  { set: (c, st) => { setStation(c, st, {}); }, cam: [960, 640, 1.1], look: 'gray', draw: (c, st) => { c.fillStyle = '#a8b0b0'; c.fillRect(BX0, 480, BX1 - BX0, 278); for (let i = 0; i < 6; i++) teplushka(c, 2000 - Math.min(st.bt, 2.5) * 500 + i * 420, 720, 1); hero(c, 8, 960, Y, 1, { ...ip(st), expr: 'neutral' }, { ...pwo, bag: true }); } },
  { at: 'Город отстроен', set: (c, st) => { wTown(c, st, {}); c.save(); c.beginPath(); c.rect(BX0, BY0, 960 - BX0 + 200, BY1 - BY0); c.clip(); wTown(c, st, { ruined: true }); c.restore(); }, cam: [960, 540, 1], pan: [100, 0], look: 'gray', draw: () => {} },
  { at: 'На вокзале никто', set: (c, st) => { setStation(c, st, {}); c.fillStyle = '#a8b0b0'; c.fillRect(BX0, 480, BX1 - BX0, 278); }, cam: [960, 660, 1.1], look: 'gray', draw: (c, st) => hero(c, 8, 1300, Y, 0.85, { ...ip(st), head: 0.15, expr: 'sad' }, { ...pwo, bag: true }) },
  { at: 'Ты идёшь пешком', set: (c, st) => { sky(c, '#a8b4bc', '#e0dcd0'); layer(c, st, 0.3, () => { fachwerk(c, -420, 800, 340, 300); fachwerk(c, 1500, 800, 340, 300); fachwerk(c, 1920, 800, 340, 300); }); ground(c, 800, '#a89a86', '#9a8c78'); cobble(c, 800); c.fillStyle = '#8a7a66'; c.fillRect(200, 760, 1200, 60); }, cam: [960, 660, 1.1], look: 'gray', draw: (c, st) => hero(c, 8, 400 + st.bt * 80, Y, 0.95, pose.trudge(st.t), { ...pwo, bag: true }) },
], { tr: 'black' });

stage(51, [
  { set: (c) => insertBg(c, '#5a5046', '#52483e'), cam: WIDE, push: 0.1, look: 'warm', draw: (c, st) => { c.fillStyle = '#e0b896'; c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.ellipse(960, 680, 340, 150, 0, 0, Math.PI * 2); c.fill(); c.stroke(); dogTag(c, 960, 560, 1.6, 0, -0.05); } },
  { at: 'Ты выжил', set: (c, st) => { sky(c, '#a8b4bc', '#e0dcd0'); ground(c, 800, '#a89a86', '#9a8c78'); cobble(c, 800); c.fillStyle = '#8a7a66'; c.fillRect(200, 760, 1200, 60); }, cam: [960, 600, 1.05], look: 'gray', draw: (c, st) => hero(c, 8, 900, Y, 0.95, { ...ip(st), expr: 'sad' }, pwo) },
  { at: 'Тебе было девятнадцать', set: (c, st) => { sky(c, '#8a9098', '#c8ccc8'); ground(c, 720, '#8a8678', '#7a766a'); }, cam: TWO(760, 1160, Y, 1), look: 'gray', draw: (c, st) => { c.save(); c.globalAlpha = 0.5; hero(c, 1, 1160, Y, 1, { armR: -2.5 }, { weapon: 'none' }); c.restore(); hero(c, 8, 760, Y, 1, { ...ip(st), expr: 'sad', look: 1 }, pwo); } },
  { at: 'Ты прошёл все ступени', set: (c) => { sky(c, '#5a5a5e', '#8a8a8a'); ground(c, 1060, '#4a4a4a', '#3a3a3a'); }, cam: [960, 640, 1], look: 'gray', draw: (c, st) => stairsOfRanks(c, st, 8, { all: true, ghost: true, expr: 'sad' }) },
  { at: 'Ты понял на последней', set: (c) => { fillBg(c, '#141210'); const g = c.createRadialGradient(960, 900, 20, 960, 900, 500); g.addColorStop(0, 'rgba(200,190,170,0.5)'); g.addColorStop(1, 'rgba(200,190,170,0)'); c.fillStyle = g; c.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); }, cam: MS(960, Y, 1), look: 'gray', draw: (c, st) => hero(c, 8, 960, Y, 1, { ...ip(st), expr: 'sad', head: 0.15 }, pwo), over: (c, st) => { if (st.bt > 2) { c.fillStyle = `rgba(0,0,0,${clamp((st.bt - 2) / 3)})`; c.fillRect(0, 0, W, H); } } },
], { tr: 'black' });
