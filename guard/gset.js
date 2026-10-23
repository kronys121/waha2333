// Characters, vehicles and sets for the Imperial Guardsman video. Builds on wehrmacht/folk.js (buildLandser) and emperor/eset.js.

const GP = {
  guard: { skin: '#e2b48c', hair: '#3a2a1a', shirt: '#7a7a62', pants: '#6a6a54', coat: '#6e6e58', boots: '#2a2620', wraps: '#6a6a54', belt: '#3a3020', buckle: '#9a9a8a', pouch: '#4a4434', hat: '#5a5e4a', hatBand: '#5a5e4a', metal: '#2e2e34', wood: '#5a4028', bag: '#5a5a48', helmet: '#5a5e4a', flak: '#4e5640', tab: '#3a3e30', litze: '#9a9a8a', braid: '#c8ccd0', board: '#5a5e4a', visor: '#1e1c1a', cockade: '#c9a24a', toque: '#6a6a62', paper: '#f4ead2' },
  commissar: { skin: '#e0b896', hair: '#1a1410', shirt: '#1a1a1e', pants: '#1a1a1e', coat: '#16161a', boots: '#0e0e10', belt: '#2a1a14', buckle: '#c9a24a', pouch: '#2a1a14', hat: '#16161a', hatBand: '#8a1a14', metal: '#2e2e34', wood: '#5a4028', tab: '#8a1a14', litze: '#c9a24a', braid: '#c9a24a', board: '#c9a24a', visor: '#0e0e10', cockade: '#c9a24a', sash: '#a01a14', paper: '#f4ead2' },
  officer: { skin: '#e2b48c', hair: '#3a2a1a', shirt: '#5a6a4a', pants: '#3e3e3a', coat: '#4e5a42', boots: '#16140f', belt: '#3a2614', buckle: '#c9a24a', pouch: '#3a2614', hat: '#4e5a42', hatBand: '#8a1a14', metal: '#2e2e34', wood: '#5a4028', tab: '#8a1a14', litze: '#c9a24a', braid: '#c9a24a', board: '#c9a24a', visor: '#16140f', cockade: '#c9a24a', paper: '#f4ead2' },
  general: { skin: '#e2b48c', hair: '#c8c8c0', shirt: '#2e3a5a', pants: '#2a2a32', coat: '#2a3450', boots: '#14120f', belt: '#c9a24a', buckle: '#f0d070', pouch: '#3a2614', hat: '#2a3450', hatBand: '#c9a24a', metal: '#2e2e34', tab: '#c9a24a', litze: '#f0d070', braid: '#f0d070', board: '#f0d070', visor: '#14120f', cockade: '#f0d070', paper: '#f4ead2' },
  worker: { skin: '#d8b090', hair: '#3a2a1a', shirt: '#6a5a4a', pants: '#4a4038', coat: '#5a4a3a', boots: '#2a2018', belt: '#2a2018', buckle: '#8a8a8a', hat: '#4a4038', hatBand: '#4a4038', paper: '#f4ead2', kerchief: '#7a6a5a', dress: '#5a4a44' },
  cultist: { skin: '#c8a090', hair: '#2a1a1a', shirt: '#5a1a1a', pants: '#3a1414', coat: '#5a1a1a', boots: '#1a1010', belt: '#1a1010', buckle: '#8a8a8a', hat: '#4a1010', hatBand: '#4a1010', metal: '#3a3a3a', wood: '#4a2a1a', paper: '#f4ead2' },
  inq: { skin: '#e8c8b0', hair: '#c8c8c8', shirt: '#1a1a1e', dress: '#16161a', coat: '#16161a', boots: '#0e0e10', belt: '#2a1a14', kerchief: '#16161a', paper: '#f4ead2' },
};
// guardsman: round helmet with a brim, flak plates on the chest
function buildGuard(o = {}) {
  const base = buildLandser({ ...o, hat: ['gh', 'cap'].includes(o.hat) ? 'none' : o.hat, side: 'guard' });
  const parts = base.parts.slice();
  const add = (role, path, g, extra) => parts.push({ role, path, g, ...extra });
  const torsoTop = -340, headCy = -396, headR = 46, hairTop = headCy - headR * 1.08;
  if (o.flak) { add('flak', rr(-56, torsoTop + 20, 112, 70, 10)); add('flak', rr(-60, torsoTop - 6, 30, 26, 6)); add('flak', rr(30, torsoTop - 6, 30, 26, 6)); }
  if (o.sash) add('sash', poly([[46, torsoTop + 4], [62, torsoTop + 16], [-50, torsoTop + 150], [-62, torsoTop + 134]]));
  if (o.medals) for (let i = 0; i < o.medals; i++) { add('ribbon', rr(-48 + i * 22, torsoTop + 36, 18, 12, 2)); add('medal', el(-39 + i * 22, torsoTop + 60, 9, 9)); }
  if (o.notch) add('notches', null, 'head', { fn: (ctx) => { ctx.strokeStyle = '#2a2620'; ctx.lineWidth = 3; for (let i = 0; i < o.notch; i++) { ctx.beginPath(); ctx.moveTo(-30 + i * 9 + (o.crooked ? (i % 2) * 4 : 0), hairTop - 18); ctx.lineTo(-27 + i * 9 - (o.crooked ? (i % 2) * 5 : 0), hairTop - 4); ctx.stroke(); } } });
  if (o.hat === 'gh') {
    const hp = P(); hp.moveTo(-54, hairTop + 30); hp.bezierCurveTo(-56, hairTop - 44, 56, hairTop - 44, 54, hairTop + 30); hp.closePath();
    parts.splice(parts.length - (o.notch ? 1 : 0), 0, { role: 'helmet', path: hp, g: 'head' }, { role: 'helmet', path: rr(-66, hairTop + 22, 132, 14, 7), g: 'head' });
  }
  if (o.hat === 'cap') {
    add('hat', poly([[-60, hairTop + 6], [60, hairTop + 6], [76, hairTop - 46], [-64, hairTop - 34]]), 'head');
    add('hatBand', rr(-56, hairTop - 6, 112, 16, 4), 'head');
    add('visor', poly([[-30, hairTop + 14], [58, hairTop + 14], [78, hairTop + 28], [-16, hairTop + 28]]), 'head');
    add('cockade', poly([[-14, hairTop - 26], [0, hairTop - 38], [14, hairTop - 26], [0, hairTop - 14]]), 'head');
  }
  if (o.bionic) add('metal', rr(-64 - 30, torsoTop + 10, 30, 150, 10), 'armL');
  return { ...base, parts };
}
const _grig = {};
function gman(ctx, x, y, s, pose = {}, o = {}, col = GP.guard) { const k = JSON.stringify(o); drawRig(ctx, _grig[k] || (_grig[k] = buildGuard(o)), x, y, s, pose, { ...RA_DEF, ...col }); }
// the hero at each level; Korvin; comrades; commissar
const GH = [
  { hat: 'gh', weapon: 'rifle', flak: true, bag: true },
  { hat: 'gh', weapon: 'rifle', flak: true, bag: true, notch: 2 },
  { hat: 'gh', weapon: 'rifle', flak: true, notch: 5, medals: 1, coat: true },
  { hat: 'gh', weapon: 'none', flak: true, notch: 6, medals: 1, tresse: true },
  { hat: 'cap', weapon: 'none', coat: true, off: true, holster: true, medals: 1, pal: 'officer' },
  { hat: 'cap', weapon: 'none', coat: true, off: true, holster: true, medals: 2, bionic: true, pip: 1, pal: 'officer' },
  { hat: 'cap', weapon: 'none', coat: true, off: true, medals: 3, bionic: true, pip: 2, gray: true, pal: 'officer' },
  { hat: 'cap', weapon: 'none', coat: true, off: true, medals: 4, bionic: true, pip: 3, gray: true, pal: 'general' },
];
function hero(ctx, lvl, x, y, s, pose = {}, over = {}) { const o = { ...GH[lvl - 1], ...over }; const { pal: pk, ...ro } = o; gman(ctx, x, y, s, pose, ro, pk ? pal(GP[pk], lvl >= 7 ? { hair: '#a8a8a0' } : {}) : GP.guard); }
const KORV = pal(GP.guard, { hair: '#b8582a', skin: '#f0c8a8' });
function korvin(ctx, x, y, s, pose = {}, over = {}) { gman(ctx, x, y, s, pose, { hat: 'gh', weapon: 'rifle', flak: true, bag: true, notch: 4, crooked: true, ...over }, KORV); }
function trooper(ctx, x, y, s, pose = {}, i = 0, over = {}) { gman(ctx, x, y, s, pose, { hat: 'gh', weapon: i % 4 === 3 ? 'none' : 'rifle', flak: true, bag: i % 2 === 0, mustache: i % 5 === 2, ...over }, pal(GP.guard, { hair: ['#3a2a1a', '#6a4a2a', '#1a1410', '#8a6a3a'][i % 4], skin: ['#e2b48c', '#d8a880', '#f0c8a8', '#c8946a'][i % 4] })); }
function commissar(ctx, x, y, s, pose = {}, over = {}) { gman(ctx, x, y, s, pose, { hat: 'cap', weapon: 'none', coat: true, off: true, sash: true, holster: true, ...over }, GP.commissar); }
function worker(ctx, x, y, s, pose = {}, i = 0, over = {}) { gman(ctx, x, y, s, pose, { civil: true, side: 'civil', hat: i % 3 === 0 ? 'flat' : 'none', female: i % 3 === 1, ...over }, pal(GP.worker, { shirt: ['#6a5a4a', '#5a5a52', '#7a6a5a'][i % 3] })); }
function cultist(ctx, x, y, s, pose = {}, i = 0) { gman(ctx, x, y, s, pose, { civil: true, side: 'civil', hat: 'kerchief', coat: true, weapon: i % 2 ? 'rifle' : 'none' }, pal(GP.cultist, { kerchief: '#4a1010' })); }
function inquisitor(ctx, x, y, s, pose = {}) { gman(ctx, x, y, s, pose, { civil: true, side: 'civil', female: true, coat: true }, GP.inq); }
const ork = (ctx, x, y, s, pose = {}) => drawRig(ctx, rig('ork'), x, y, s, pose, ORK_PAL);
const nid = (ctx, x, y, s, pose = {}) => drawRig(ctx, rig('tyranid'), x, y, s, pose, TYRANID_PAL);

// ---------- props and vehicles ----------
function lasBeam(ctx, x0, y0, x1, y1, p) { const x = lerp(x0, x1, p), y = lerp(y0, y1, p), xb = lerp(x0, x1, Math.max(0, p - 0.12)), yb = lerp(y0, y1, Math.max(0, p - 0.12)); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = '#ff4a3a'; ctx.lineWidth = 8; ctx.shadowColor = '#ff3020'; ctx.shadowBlur = 18; ctx.beginPath(); ctx.moveTo(xb, yb); ctx.lineTo(x, y); ctx.stroke(); ctx.restore(); }
function lemanRuss(ctx, x, y, s, t = 0, dir = 1, fire = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-300, -20], [-280, -170], [260, -170], [320, -60], [300, 0], [-280, 0]], '#5a6048', 7);
  for (let i = 0; i < 6; i++) circ(ctx, -230 + i * 92, -40, 34, '#3a3c30', 5);
  rect(ctx, -310, -90, 640, 28, '#2e3026', 8, 5);
  rect(ctx, -140, -280, 300, 120, '#646a50', 14, 7); rect(ctx, 150, -250, 330, 46, '#4a4e3c', 10, 6);
  rect(ctx, -260, -200, 90, 40, '#4a4e3c', 8, 5); circ(ctx, -10, -220, 22, '#c9a24a', 4);
  if (fire > 0) { ctx.fillStyle = '#ffe28a'; ctx.beginPath(); ctx.ellipse(520, -226, 90 * fire, 44 * fire, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}
function valkyrie(ctx, x, y, s, dir = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s); shape(ctx, [[-260, -40], [-120, -90], [200, -80], [300, -20], [200, 30], [-200, 20]], '#5a6048', 6); shape(ctx, [[-60, -70], [-240, -220], [-180, -230], [40, -80]], '#4e5440', 5); shape(ctx, [[-300, -30], [-380, -110], [-330, -110], [-250, -40]], '#4e5440', 5); rect(ctx, 150, -70, 90, 40, '#a8c0c8', 8, 4); ctx.restore(); }
function primer(ctx, x, y, s, open = 0, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); rect(ctx, -170, -230, 340, 460, '#6a2a24', 12, 6); rect(ctx, -150, -210, 300, 420, '#7a3a2a', 8, 3); circ(ctx, 0, -60, 60, '#c9a24a', 5); ctx.fillStyle = '#e8d8a8'; ctx.font = '700 30px "Old Standard TT"'; ctx.textAlign = 'center'; ctx.fillText('БУКВАРЬ', 0, 90); ctx.font = 'italic 400 20px "Old Standard TT"'; ctx.fillText('имперского пехотинца', 0, 125); ctx.restore(); }
function ration(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -120, -70, 240, 140, '#8a8a7a', 10, 6); rect(ctx, -90, -40, 180, 80, '#c8c0a0', 6, 3); ctx.fillStyle = '#3a3a30'; ctx.font = '700 17px "Oswald"'; ctx.textAlign = 'center'; ctx.fillText('ТРУПНЫЙ КРАХМАЛ', 0, 7); ctx.restore(); }
function helmetProp(ctx, x, y, s, n = 5, crooked = true, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); const hp = P(); hp.moveTo(-120, 30); hp.bezierCurveTo(-124, -150, 124, -150, 120, 30); hp.closePath(); strokeFill(ctx, hp, '#5a5e4a', 8); rect(ctx, -146, 18, 292, 30, '#5a5e4a', 14, 7); ctx.strokeStyle = '#2a2620'; ctx.lineWidth = 7; for (let i = 0; i < n; i++) { ctx.beginPath(); ctx.moveTo(-70 + i * 26 + (crooked ? (i % 2) * 10 : 0), -90); ctx.lineTo(-62 + i * 26 - (crooked ? (i % 2) * 12 : 0), -40); ctx.stroke(); } ctx.restore(); }
function medalSmall(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, [[-30, -110], [30, -110], [22, -30], [-22, -30]], '#8a1a14', 4); circ(ctx, 0, 10, 46, '#b8865a', 5); circ(ctx, 0, 10, 28, '#c89a6a', 3); ctx.restore(); }
function ammoBox(ctx, x, y, s, n = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -160, -110, 320, 110, '#5a6048', 6, 6); for (let i = 0; i < n; i++) rect(ctx, -140 + (i % 6) * 46, -150 - Math.floor(i / 6) * 22 + (i % 2) * 6, 70, 46, '#efe6cc', 3, 3); ctx.restore(); }
function mapTable(ctx, x, y, s, t, flags = 10, lost = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -460, -40, 920, 60, '#5a3a20', 6, 6); rect(ctx, -440, -300, 880, 260, '#c8b88a', 6, 5); ctx.strokeStyle = '#7a8a6a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-420, -100); ctx.bezierCurveTo(-200, -220, 100, -60, 420, -200); ctx.stroke(); const r = rng(5); for (let i = 0; i < flags; i++) { const fx = -380 + r() * 760, fy = -270 + r() * 200; const gone = i < lost; rect(ctx, fx - 2, fy, 4, 40, '#3a2a1a', 1, 2); shape(ctx, [[fx, fy], [fx + 34, fy + 8], [fx, fy + 18]], gone ? '#3a3a3a' : i % 3 ? '#b3262a' : '#2a4a8a', 2); } ctx.restore(); }
function letterStack(ctx, x, y, s, n) { for (let i = 0; i < n; i++) envelope2(ctx, x + (i % 3) * 12, y - i * 14, s, (i % 2 ? 1 : -1) * 0.05); }
function envelope2(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); rect(ctx, -140, -90, 280, 180, '#efe6cc', 4, 5); ctx.strokeStyle = '#8a7a5a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-140, -90); ctx.lineTo(0, 10); ctx.lineTo(140, -90); ctx.stroke(); circ(ctx, 0, 30, 18, '#8a1a14', 3); ctx.restore(); }
function aquila(ctx, x, y, s, c = '#c9a24a') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const d of [-1, 1]) shape(ctx, [[0, 0], [d * 60, -40], [d * 200, -60], [d * 160, -20], [d * 220, 0], [d * 150, 20], [d * 180, 50], [d * 60, 30]], c, 5); circ(ctx, -30, -40, 22, c, 4); circ(ctx, 30, -40, 22, c, 4); ctx.restore(); }

// ---------- sets ----------
function setHiveLow(ctx, st) {
  fillBg(ctx, '#1a1814');
  depth(ctx, st, 0.5, () => { for (let i = 0; i < 12; i++) rect(ctx, -300 + i * 230, -400, 60, 1300, '#2a2620', 4, 5); for (let i = 0; i < 5; i++) { ctx.fillStyle = 'rgba(255,170,80,0.25)'; ctx.beginPath(); ctx.arc(-100 + i * 520, 200, 120, 0, Math.PI * 2); ctx.fill(); } });
  depth(ctx, st, 0.25, () => { for (let i = 0; i < 4; i++) { rect(ctx, -200 + i * 650, 360, 520, 50, '#4a4038', 20, 6); rect(ctx, -60 + i * 650, 410, 50, 480, '#4a4038', 10, 6); } smokeFX(ctx, 300, 600, st.t, 1.2, 1, '200,190,170', 0.25); smokeFX(ctx, 1500, 600, st.t, 1.2, 2, '200,190,170', 0.25); });
  fillGround(ctx, 900, '#2e2a24', '#26221e');
}
function valve(ctx, x, y, s, a = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -20, -200, 40, 200, '#5a5048', 6, 5); ctx.rotate(a); circ(ctx, 0, -200, 90, '#8a2a20', 8); ctx.fillStyle = '#1a1814'; ctx.beginPath(); ctx.arc(0, -200, 64, 0, Math.PI * 2); ctx.fill(); for (let k = 0; k < 4; k++) { ctx.save(); ctx.translate(0, -200); ctx.rotate(k * Math.PI / 2); rect(ctx, -8, -86, 16, 86, '#8a2a20', 3, 4); ctx.restore(); } ctx.restore(); }
function setHiveTop(ctx, st) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#4a3a4a'], [0.6, '#b07a5a'], [1, '#e8a86a']]));
  depth(ctx, st, 0.6, () => { const r = rng(12); for (let i = 0; i < 16; i++) { const x = -400 + i * 190, h = 500 + r() * 600; shape(ctx, [[x, 900], [x + 20, 900 - h], [x + 60, 900 - h - 120], [x + 100, 900 - h], [x + 120, 900]], i % 2 ? '#3a3036' : '#2e262c', 5); ctx.fillStyle = '#ffc070'; for (let j = 0; j < 8; j++) if (r() > 0.5) ctx.fillRect(x + 50, 900 - h + 40 + j * 70, 12, 18); } });
  fillGround(ctx, 900, '#3a3432', '#2e2a28');
}
function setParade(ctx, st, o = {}) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#5a5a62'], [1, '#a8a49a']]));
  depth(ctx, st, 0.5, () => { for (let i = 0; i < 7; i++) { rect(ctx, -300 + i * 420, 300, 320, 500, '#6a665e', 4, 6); for (let j = 0; j < 3; j++) rect(ctx, -260 + i * 420, 360 + j * 130, 240, 70, '#3a3a3e', 3, 4); } aquila(ctx, 960, 250, 1.2, '#c9a24a'); });
  fillGround(ctx, 800, '#8a867c', '#7a766c');
}
function setRange(ctx, st) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#8a8a7a'], [1, '#c8c0a0']]));
  depth(ctx, st, 0.45, () => { for (let i = 0; i < 6; i++) { rect(ctx, 200 + i * 330, 560, 20, 220, '#4a3a2a', 3, 4); rect(ctx, 130 + i * 330, 470, 160, 120, '#e8e0c8', 4, 5); ork(ctx, 210 + i * 330, 590, 0.18, {}); } });
  fillGround(ctx, 780, '#9a8e6a', '#8a7e5a');
  ctx.strokeStyle = '#2a2622'; ctx.lineWidth = 3; for (let x = -400; x < 2400; x += 60) { ctx.beginPath(); ctx.moveTo(x, 880); ctx.lineTo(x + 30, 840); ctx.lineTo(x + 60, 880); ctx.stroke(); }
}
function setBunks(ctx, st) {
  fillBg(ctx, '#3a3630');
  depth(ctx, st, 0.35, () => { for (let i = 0; i < 6; i++) { const x = -300 + i * 460; rect(ctx, x, 500, 320, 30, '#5a5048', 4, 5); rect(ctx, x, 680, 320, 30, '#5a5048', 4, 5); rect(ctx, x + 10, 470, 300, 34, '#6a6a5a', 10, 4); rect(ctx, x + 10, 650, 300, 34, '#6a6a5a', 10, 4); rect(ctx, x - 10, 450, 16, 380, '#3a3028', 3, 4); rect(ctx, x + 314, 450, 16, 380, '#3a3028', 3, 4); } });
  fillGround(ctx, 830, '#4a4238', '#3e382e');
  const g = ctx.createRadialGradient(960, 200, 10, 960, 200, 900); g.addColorStop(0, 'rgba(255,220,150,0.25)'); g.addColorStop(1, 'rgba(255,220,150,0)'); ctx.fillStyle = g; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0);
}
function setHold(ctx, st) {
  fillBg(ctx, '#14161a');
  depth(ctx, st, 0.3, () => { for (let i = 0; i < 10; i++) { ctx.strokeStyle = '#2a2e34'; ctx.lineWidth = 30; ctx.beginPath(); ctx.arc(960, 1400, 600 + i * 120, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); } circ(ctx, 1500, 360, 90, '#2a2e34', 10); });
  fillGround(ctx, 900, '#22252a', '#1c1f24');
  ctx.fillStyle = `rgba(255,60,40,${0.15 + 0.1 * Math.sin(st.t * 3)})`; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0);
}
function porthole(ctx, x, y, r, t) { ctx.save(); circ(ctx, x, y, r + 20, '#3a3e44', 8); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip(); ctx.fillStyle = '#1a0a2a'; ctx.fillRect(x - r, y - r, r * 2, r * 2); warpRift(ctx, x, y, r * 1.4, t, 'rgba(180,60,220,A)', 'rgba(255,80,120,A)'); ctx.restore(); }
function setForge(ctx, st, o = {}) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#3a1a10'], [1, '#c0602a']]));
  depth(ctx, st, 0.55, () => { for (let i = 0; i < 9; i++) { const x = -300 + i * 300; rect(ctx, x, 380, 160, 420, '#4a2418', 4, 6); rect(ctx, x + 50, 200, 60, 180, '#3a1c14', 4, 5); smokeFX(ctx, x + 80, 200, st.t, 1.1, i, '40,24,18', 0.4); } });
  depth(ctx, st, 0.25, () => { for (let i = 0; i < 3; i++) fireFX(ctx, 200 + i * 750, 820, 1.2, st.t, i); });
  fillGround(ctx, 820, '#5a3020', '#4a2618');
}
function setTrenchG(ctx, st, o = {}) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, o.night ? '#10121a' : '#6a6a5e'], [1, o.night ? '#2a2a32' : '#b8ae94']]));
  if (o.night) stars(ctx, 120, 9);
  depth(ctx, st, 0.5, () => { if (!o.night) for (let i = 0; i < 3; i++) smokeFX(ctx, 300 + i * 700, 600, st.t, 1.4, i, '60,56,52', 0.35); });
  fillGround(ctx, 640, o.night ? '#22222a' : '#7a705a', o.night ? '#1e1e26' : '#6a604a');
  for (let i = 0; i < 24; i++) rect(ctx, -300 + i * 110, 690 + (i % 2) * 6, 120, 44, o.night ? '#3a3830' : '#8a7a5a', 18, 4);
  rect(ctx, BX0, 740, BX1 - BX0, 600, o.night ? '#2a2218' : '#5a4632', 0, 6);
  for (let x = -300; x < 2400; x += 220) rect(ctx, x, 740, 26, 340, '#4a3828', 4, 4);
}
function setIce(ctx, st) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#4a5a7a'], [1, '#d8e4f0']]));
  depth(ctx, st, 0.55, () => { for (let i = 0; i < 6; i++) shape(ctx, [[-400 + i * 520, 760], [-200 + i * 520, 380 + (i % 2) * 100], [i * 520, 760]], '#a8b8c8', 6); });
  fillGround(ctx, 760, '#eef4f8', '#dce6ee');
  snowFX(ctx, st.t, 160, 120, 3, 1.3);
}
function setHospitalG(ctx, st) {
  fillBg(ctx, '#d8d4c8'); ctx.fillStyle = '#c8c4b8'; ctx.fillRect(BX0, 520, BX1 - BX0, 300);
  depth(ctx, st, 0.3, () => { aquila(ctx, 960, 250, 0.8, '#8a8070'); });
  fillGround(ctx, 820, '#b0aca0', '#a29e92');
  for (let i = 0; i < 4; i++) { const x = -200 + i * 700; rect(ctx, x - 200, 810, 400, 60, '#f4f2ec', 10, 5); rect(ctx, x - 210, 750, 20, 210, '#8a8e92', 4, 4); }
}
function setHill(ctx, st, o = {}) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, o.dusk ? '#4a2a3a' : '#7a7a6a'], [1, o.dusk ? '#e08a5a' : '#c8bc98']]));
  depth(ctx, st, 0.35, () => { shape(ctx, [[BX0, 900], [200, 700], [700, 420], [1100, 380], [1500, 520], [BX1, 760], [BX1, 900]], '#6a6046', 6); if (o.cultists) for (let i = 0; i < 6; i++) cultist(ctx, 750 + i * 90, 430 + Math.abs(i - 3) * 20, 0.3, idlePose(st.t, i), i); if (o.flag) { rect(ctx, 1030, 160, 10, 230, '#3a2a1a', 2, 3); aquila(ctx, 1100, 200, 0.3); } });
  fillGround(ctx, 900, '#5a5440', '#4e4836');
}
function setTemple(ctx, st, o = {}) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#5a4a3a'], [1, '#d8b080']]));
  depth(ctx, st, 0.5, () => { for (let i = 0; i < 5; i++) { const x = -200 + i * 520; rect(ctx, x, 260, 300, 600, '#a8987a', 4, 6); shape(ctx, [[x - 20, 260], [x + 150, 60], [x + 320, 260]], '#8a7a5a', 6); circ(ctx, x + 150, 380, 60, '#5a6a8a', 5); } smokeFX(ctx, 600, 500, st.t, 1.4, 3, '60,50,40', 0.35); });
  fillGround(ctx, 860, '#8a7a60', '#7a6a50');
}
function setBridgeG(ctx, st, o = {}) {
  fillBg(ctx, '#0a0a10');
  ctx.save(); const p = P(); p.rect(160, 80, 1600, 640); ctx.clip(p); ctx.fillStyle = '#04040a'; ctx.fillRect(160, 80, 1600, 640); stars(ctx, 120, 4);
  if (o.planet !== false) { planet(ctx, 960, 470, 250, o.burn ? '#8a2a14' : '#4a6a5a', o.burn ? '#c0501a' : '#6a8a6a', { seed: 5 }); if (o.burn) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(960, 470, 60, 960, 470, 520 * o.burn); g.addColorStop(0, `rgba(255,200,80,${0.7 * o.burn})`); g.addColorStop(1, 'rgba(255,100,40,0)'); ctx.fillStyle = g; ctx.fillRect(160, 80, 1600, 640); ctx.restore(); } }
  ctx.restore();
  for (const bx of [140, 560, 1320, 1740]) rect(ctx, bx, 60, 40, 680, '#2a2a34', 4, 6);
  rect(ctx, 140, 720, 1640, 40, '#2a2a34', 4, 6);
  fillGround(ctx, 900, '#1a1a22', '#14141a');
  depth(ctx, st, -0.2, () => { rect(ctx, 300, 880, 1300, 120, '#22222c', 10, 6); for (let i = 0; i < 12; i++) rect(ctx, 340 + i * 100, 900, 60, 30, i % 3 ? '#3a8a5a' : '#c8a040', 4, 3); });
}
function setFeast(ctx, st) {
  setPalaceHall(ctx, st);
  rect(ctx, 200, 820, 1520, 60, '#7a3a2a', 8, 6); rect(ctx, 200, 790, 1520, 40, '#e8e0d0', 6, 4);
  for (let i = 0; i < 8; i++) { const x = 300 + i * 190; circ(ctx, x, 790, 30, '#e8e8e8', 4); rect(ctx, x + 40, 720, 14, 70, '#e8f0f0', 3, 3); }
}
function paperSign(ctx, x, y, s, lines, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); rect(ctx, -220, -150, 440, 300, '#efe6d0', 4, 6); ctx.fillStyle = '#2a1e16'; ctx.font = '700 54px "Oswald"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; lines.forEach((l, i) => ctx.fillText(l, 0, -((lines.length - 1) * 70) / 2 + i * 70)); ctx.restore(); }
// handwritten line typed out (copied from redarmy/engine2.js, which is not loaded here)
function letterLine(ctx, text, lt, a, y = 980, size = 52) {
  if (lt < a) return;
  const n = Math.min(text.length, Math.floor((lt - a) * 22) + 1);
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.font = `italic 700 ${size}px "Old Standard TT"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 14; ctx.fillStyle = '#f4ead2';
  ctx.fillText(text.slice(0, n), W / 2, y);
  ctx.restore();
}
