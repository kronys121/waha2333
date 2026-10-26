// Stalin video: the hero at each level, sets and props.
const STO = [
  null,
  [{ kid: true, hair: 'short', outfit: 'rubashka', pocks: true, arm: true }, 'kid'],
  [{ hair: 'long', outfit: 'cassock', pocks: true, arm: true }, 'cassock'],
  [{ hair: 'swept', mustache: 'thick', beard: 'short', outfit: 'coat', pocks: true, arm: true }, 'coat'],
  [{ hair: 'swept', mustache: 'stalin', outfit: 'tunic', pocks: true, arm: true, belt: true }, 'tunic'],
  [{ hair: 'swept', mustache: 'stalin', outfit: 'tunic', pocks: true, arm: true, pipe: true }, 'tunic'],
  [{ hair: 'swept', mustache: 'stalin', outfit: 'tunic', pocks: true, arm: true, pipe: true }, 'grayTunic'],
  [{ hair: 'swept', mustache: 'stalin', outfit: 'marshal', pocks: true, arm: true, star: true }, 'marshal'],
  [{ hair: 'swept', gray: true, mustache: 'stalin', outfit: 'white', pocks: true, arm: true, star: true }, 'white'],
];
function stalin(ctx, lvl, x, y, s, pose = {}, over = {}) { const [o, p] = STO[lvl]; man(ctx, x, y, s, pose, { ...o, ...over }, SPAL[p]); }

// redarmy/sets.js draws its far layers with layer(); route them through this engine's depth()
function layer(ctx, st, k, fn) { depth(ctx, st, k, fn); }

// ---------- props ----------
function gHouse(ctx, x, y, s, seed = 1) {
  const r = rng(seed); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const w = 260 + r() * 80, h = 200 + r() * 60, col = ['#d8c8a8', '#c8b090', '#e0d0b0'][seed % 3];
  rect(ctx, -w / 2, -h, w, h, col, 4, 5); shape(ctx, [[-w / 2 - 20, -h], [0, -h - 70], [w / 2 + 20, -h]], '#8a4a2a', 5);
  rect(ctx, -w / 2 - 10, -h * 0.55, w + 20, 16, '#6a4a2a', 3, 4); for (let i = 0; i < 6; i++) rect(ctx, -w / 2 + i * (w / 5) - 3, -h * 0.55, 6, h * 0.55 - 10, '#6a4a2a', 2, 3);
  rect(ctx, -w / 4 - 25, -h * 0.9, 50, 60, '#3a4a5a', 3, 4); rect(ctx, w / 4 - 25, -h * 0.9, 50, 60, '#3a4a5a', 3, 4); rect(ctx, -25, -100, 50, 100, '#4a3020', 3, 4);
  ctx.restore();
}
function church(ctx, x, y, s, col = '#e8dcc0') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rect(ctx, -160, -320, 320, 320, col, 4, 6); rect(ctx, -70, -480, 140, 170, col, 4, 6); const d = P(); d.moveTo(-80, -480); d.quadraticCurveTo(0, -600, 80, -480); d.closePath(); sfill(ctx, d, '#7a8a9a', 6);
  inkLine(ctx, [[0, -590], [0, -660]], 6); inkLine(ctx, [[-24, -635], [24, -635]], 6); rect(ctx, -40, -140, 80, 140, '#4a3020', 30, 5); for (const dx of [-110, 110]) rect(ctx, dx - 20, -260, 40, 70, '#3a4a5a', 18, 4);
  ctx.restore();
}
function phaeton(ctx, x, y, s, t = 0, dir = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  for (let i = 0; i < 2; i++) horse(ctx, 330 + i * 60, 0, 1, t + i * 0.3, i ? '#5a3a24' : '#6a4a2a');
  inkLine(ctx, [[60, -140], [250, -150]], 5, '#3a2414');
  sfill(ctx, rr(-200, -200, 260, 110, 14), '#2a2a2a', 6); sfill(ctx, rr(-210, -260, 120, 70, 10), '#2a2a2a', 5);
  for (const wx of [-150, 20]) { ctx.save(); ctx.translate(wx, -50); ctx.rotate(t * 8); sfill(ctx, el2(0, 0, 55, 55), '#4a3020', 5); for (let k = 0; k < 4; k++) { ctx.rotate(Math.PI / 4); inkLine(ctx, [[-50, 0], [50, 0]], 3); } ctx.restore(); }
  ctx.restore();
}
function horse(ctx, x, y, s, t = 0, col = '#6a4a2a') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const g = Math.sin(t * 12);
  for (const [lx, ph] of [[-80, 0], [70, 1.6]]) for (const d of [0, 1]) { const a = Math.sin(t * 12 + ph + d * Math.PI) * 0.4; inkLine(ctx, [[lx + d * 18, -150], [lx + d * 18 + Math.sin(a) * 50, -75], [lx + d * 18 + Math.sin(a) * 30, 0]], 13, darken(col, d ? 0.75 : 1)); }
  const b = el2(0, -170, 125, 55); sfill(ctx, b, col, 6);
  const n = P(); n.moveTo(80, -200); n.lineTo(150, -300 + g * 4); n.lineTo(190, -290 + g * 4); n.lineTo(120, -160); n.closePath(); sfill(ctx, n, col, 5);
  ctx.save(); ctx.translate(195, -300 + g * 4); ctx.rotate(0.5); sfill(ctx, el2(0, 0, 50, 24), col, 5); ctx.restore();
  shape(ctx, [[160, -330 + g * 4], [168, -360 + g * 4], [178, -326 + g * 4]], col, 4);
  ctx.fillStyle = '#1a1210'; ctx.beginPath(); ctx.arc(198, -312 + g * 4, 5, 0, 7); ctx.fill();
  const m = P(); m.moveTo(90, -215); m.quadraticCurveTo(120, -300, 160, -320 + g * 4); m.lineTo(150, -290); m.quadraticCurveTo(120, -250, 100, -200); m.closePath(); sfill(ctx, m, '#2a1a12', 3);
  const tl = P(); tl.moveTo(-118, -190); tl.quadraticCurveTo(-180 - g * 10, -150, -165 - g * 10, -80); tl.lineTo(-145, -90); tl.quadraticCurveTo(-150, -150, -110, -170); tl.closePath(); sfill(ctx, tl, '#2a1a12', 3);
  ctx.restore();
}
function moneyBag(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const p = P(); p.moveTo(-90, 0); p.quadraticCurveTo(-120, -130, -30, -160); p.lineTo(30, -160); p.quadraticCurveTo(120, -130, 90, 0); p.closePath(); sfill(ctx, p, '#b89a6a', 5); inkLine(ctx, [[-36, -150], [36, -150]], 7, '#5a3a20'); ctx.fillStyle = '#5a3a20'; ctx.font = '700 70px "Old Standard TT"'; ctx.textAlign = 'center'; ctx.fillText('₽', 0, -50); ctx.restore(); }
function candle(ctx, x, y, s, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sfill(ctx, rr(-10, -70, 20, 70, 4), '#efe6c8', 3); ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(0, -90, 2, 0, -90, 120); g.addColorStop(0, 'rgba(255,220,140,0.6)'); g.addColorStop(1, 'rgba(255,180,80,0)'); ctx.fillStyle = g; ctx.fillRect(-120, -210, 240, 240); ctx.fillStyle = '#ffd070'; ctx.beginPath(); ctx.ellipse(0, -86 + Math.sin(t * 13) * 2, 6, 14, 0, 0, 7); ctx.fill(); ctx.restore(); ctx.restore(); }
function book(ctx, x, y, s, title = '', col = '#7a2a24', rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); sfill(ctx, rr(-110, -150, 220, 300, 8), col, 6); sfill(ctx, rr(-96, -136, 192, 272, 4), darken(col, 1.1), 2); ctx.fillStyle = '#e8d8a8'; ctx.textAlign = 'center'; ctx.font = '700 34px "Old Standard TT"'; title.split('\n').forEach((l, i) => ctx.fillText(l, 0, -40 + i * 44)); ctx.restore(); }
function icon(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sfill(ctx, rr(-70, -100, 140, 200, 6), '#c8962a', 5); sfill(ctx, rr(-56, -86, 112, 172, 4), '#6a2a1a', 3); ctx.fillStyle = '#e8c070'; ctx.beginPath(); ctx.arc(0, -36, 34, 0, 7); ctx.fill(); sfill(ctx, el2(0, -30, 20, 24), '#d8a880', 3); sfill(ctx, rr(-30, 0, 60, 76, 20), '#3a4a7a', 3); ctx.restore(); }
function bars(ctx, x, y, w, h, n = 6) { for (let i = 0; i <= n; i++) sfill(ctx, rr(x + (i * w) / n - 7, y, 14, h, 6), '#3a3a40', 4); sfill(ctx, rr(x - 10, y, w + 20, 16, 4), '#3a3a40', 4); sfill(ctx, rr(x - 10, y + h - 16, w + 20, 16, 4), '#3a3a40', 4); }
function telescope(ctx, x, y, s, a = -0.6) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const d of [-1, 1]) inkLine(ctx, [[0, -120], [d * 70, 0]], 8, '#5a4a3a'); ctx.save(); ctx.translate(0, -130); ctx.rotate(a); sfill(ctx, rr(-60, -24, 300, 48, 10), '#8a6a3a', 5); sfill(ctx, rr(230, -32, 40, 64, 8), '#c8a050', 4); ctx.restore(); ctx.restore(); }
function voronok(ctx, x, y, s, t = 0, dir = 1, lights = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  if (lights) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(260, 0, 900, 0); g.addColorStop(0, 'rgba(255,240,180,0.55)'); g.addColorStop(1, 'rgba(255,240,180,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(250, -110); ctx.lineTo(900, -260); ctx.lineTo(900, 40); ctx.lineTo(250, -80); ctx.fill(); ctx.restore(); }
  const b = P(); b.moveTo(-280, -40); b.lineTo(-280, -150); b.quadraticCurveTo(-200, -170, -120, -230); b.lineTo(80, -230); b.quadraticCurveTo(140, -170, 240, -150); b.lineTo(270, -60); b.lineTo(270, -30); b.closePath(); sfill(ctx, b, '#141416', 6);
  for (const wx of [-120, 20]) sfill(ctx, rr(wx, -210, 110, 60, 8), '#4a5a6a', 4); sfill(ctx, rr(220, -120, 40, 26, 6), '#ffe8a0', 3);
  for (const wx of [-180, 160]) sfill(ctx, el2(wx, -30, 46, 46), '#1a1a1a', 5);
  ctx.restore();
}
function portrait(ctx, x, y, s, lvl = 7) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sfill(ctx, rr(-170, -230, 340, 460, 6), '#c8962a', 6); sfill(ctx, rr(-150, -210, 300, 420, 4), '#c8b898', 3); ctx.save(); ctx.beginPath(); ctx.rect(-150, -210, 300, 420); ctx.clip(); stalin(ctx, lvl, 0, 690, 1.25, { expr: 'neutral' }); ctx.restore(); ctx.restore(); }
function newspaper(ctx, x, y, s, head = 'ПРАВДА', lines = [], rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); sfill(ctx, rr(-300, -400, 600, 800, 4), '#ece4cc', 6); ctx.fillStyle = '#1a1714'; ctx.textAlign = 'center'; ctx.font = '700 120px "Old Standard TT"'; ctx.fillText(head, 0, -270); inkLine(ctx, [[-270, -240], [270, -240]], 5); ctx.font = '700 46px "Old Standard TT"'; lines.forEach((l, i) => ctx.fillText(l, 0, -170 + i * 60)); for (let i = 0; i < 9; i++) inkLine(ctx, [[-260, 20 + i * 36], [i % 3 === 2 ? 60 : 260, 20 + i * 36]], 3, '#8a8478'); ctx.restore(); }
function listPaper(ctx, x, y, s, n = 18, sign = 1, rot = 0, seed = 3) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); sfill(ctx, rr(-260, -360, 520, 720, 4), '#efe6cc', 6);
  const r = rng(seed); ctx.fillStyle = '#2a2420'; ctx.font = '400 30px "Old Standard TT"'; ctx.textAlign = 'left';
  const F = ['Иванов', 'Петров', 'Соколов', 'Кузнецов', 'Попов', 'Лебедев', 'Козлов', 'Новиков', 'Морозов', 'Волков', 'Зайцев', 'Павлов', 'Семёнов', 'Голубев', 'Виноградов', 'Богданов', 'Воробьёв', 'Фёдоров', 'Михайлов', 'Беляев'];
  for (let i = 0; i < n; i++) ctx.fillText(`${i + 1}. ${F[Math.floor(r() * F.length)]} ${'АБВГДЕЖЗИКЛМНОПРСТ'[Math.floor(r() * 18)]}. ${'АБВГДЕИМНПС'[Math.floor(r() * 11)]}.`, -220, -300 + i * 34);
  if (sign > 0) { ctx.save(); ctx.strokeStyle = '#2a3a8a'; ctx.lineWidth = _lw(ctx, 5); ctx.beginPath(); for (let k = 0; k <= 30 * Math.min(1, sign); k++) { const px = -40 + k * 8, py = -320 + Math.sin(k * 0.7) * 16 - k * 1.5; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
function micro(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); inkLine(ctx, [[0, 0], [0, 160]], 8, '#5a5a5a'); sfill(ctx, rr(-36, -70, 72, 90, 30), '#8a8e94', 5); for (let i = 0; i < 4; i++) inkLine(ctx, [[-26, -50 + i * 18], [26, -50 + i * 18]], 2.5, '#4a4a4a'); ctx.restore(); }
function glassW(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(180,210,230,0.5)'; ctx.fillRect(-20, -60, 40, 60); ctx.strokeStyle = INK; ctx.lineWidth = _lw(ctx, 4); ctx.strokeRect(-20, -70, 40, 70); ctx.restore(); }
function phone(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sfill(ctx, rr(-50, -40, 100, 40, 10), '#1a1a1a', 4); sfill(ctx, rr(-60, -70, 120, 26, 12), '#1a1a1a', 4); ctx.restore(); }
function grainSacks(ctx, x, y, s, n = 6) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < n; i++) { const sx = (i % 3) * 110 - 110 + (Math.floor(i / 3) % 2) * 55, sy = -Math.floor(i / 3) * 90; const p = P(); p.moveTo(sx - 50, sy); p.quadraticCurveTo(sx - 60, sy - 90, sx - 20, sy - 110); p.lineTo(sx + 20, sy - 110); p.quadraticCurveTo(sx + 60, sy - 90, sx + 50, sy); p.closePath(); sfill(ctx, p, '#c8b48a', 4); } ctx.restore(); }
function tractor(ctx, x, y, s, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sfill(ctx, rr(-120, -150, 200, 90, 10), '#8a2a20', 5); sfill(ctx, rr(20, -230, 80, 90, 8), '#8a2a20', 5); inkLine(ctx, [[-90, -150], [-90, -220]], 8, '#3a3a3a'); ctx.save(); ctx.translate(60, -60); ctx.rotate(t * 3); sfill(ctx, el2(0, 0, 70, 70), '#2a2a2a', 6); inkLine(ctx, [[-60, 0], [60, 0]], 4, '#5a5a5a'); ctx.restore(); sfill(ctx, el2(-110, -36, 38, 38), '#2a2a2a', 5); ctx.restore(); }
function watchtower(ctx, x, y, s, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const d of [-1, 1]) inkLine(ctx, [[d * 70, 0], [d * 40, -380]], 10, '#4a3a2a'); inkLine(ctx, [[-60, -150], [60, -260]], 6, '#4a3a2a'); sfill(ctx, rr(-80, -470, 160, 100, 6), '#5a4a3a', 5); shape(ctx, [[-100, -470], [0, -540], [100, -470]], '#3a3028', 5); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.translate(0, -420); ctx.rotate(Math.sin(t * 0.6) * 0.6 + 0.6); const g = ctx.createLinearGradient(0, 0, 900, 0); g.addColorStop(0, 'rgba(255,250,210,0.5)'); g.addColorStop(1, 'rgba(255,250,210,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(900, -120); ctx.lineTo(900, 120); ctx.fill(); ctx.restore(); ctx.restore(); }
function wireFence(ctx, x0, x1, y, h = 220) { for (let x = x0; x <= x1; x += 220) inkLine(ctx, [[x, y], [x, y - h]], 8, '#4a3a2a'); for (let k = 0; k < 4; k++) { ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = _lw(ctx, 2.5); ctx.beginPath(); for (let x = x0; x <= x1; x += 20) { const yy = y - 40 - k * 50 + Math.sin(x * 0.07 + k) * 4; x === x0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); for (let x = x0 + 10; x < x1; x += 40) inkLine(ctx, [[x - 6, y - 46 - k * 50], [x + 6, y - 34 - k * 50]], 2.5, '#2a2a2a'); } }
function barrack(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -300, -180, 600, 180, '#5a4a3a', 4, 6); shape(ctx, [[-320, -180], [0, -260], [320, -180]], '#4a3e34', 6); for (let i = 0; i < 5; i++) rect(ctx, -250 + i * 110, -140, 50, 40, '#ffd890', 3, 3); ctx.restore(); }
function spasskaya(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -110, -520, 220, 520, '#a8382a', 4, 6); rect(ctx, -90, -720, 180, 210, '#a8382a', 4, 6); sfill(ctx, el2(0, -620, 60, 60), '#efe6cc', 5); inkLine(ctx, [[0, -620], [0, -660]], 5); inkLine(ctx, [[0, -620], [26, -620]], 5); shape(ctx, [[-90, -720], [0, -980], [90, -720]], '#3a6a4a', 6); ctx.save(); ctx.shadowColor = '#ff3020'; ctx.shadowBlur = 30; star5(ctx, 0, -1010, 44, '#d82a20', '#6a1010'); ctx.restore(); rect(ctx, -50, -200, 100, 200, '#3a2018', 50, 5); ctx.restore(); }
function kremlinWall(ctx, x0, x1, y, h = 260) { rect(ctx, x0, y - h, x1 - x0, h, '#a8382a', 0, 6); for (let x = x0; x < x1; x += 80) { const m = P(); m.moveTo(x + 10, y - h); m.lineTo(x + 10, y - h - 50); m.lineTo(x + 35, y - h - 30); m.lineTo(x + 60, y - h - 50); m.lineTo(x + 60, y - h); m.closePath(); sfill(ctx, m, '#a8382a', 4); } }
function mausoleum(ctx, x, y, s, name = 'ЛЕНИН') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -320, -120, 640, 120, '#5a2a2a', 4, 6); rect(ctx, -240, -220, 480, 100, '#3a2020', 4, 6); rect(ctx, -160, -300, 320, 80, '#5a2a2a', 4, 6); rect(ctx, -90, -360, 180, 60, '#3a2020', 4, 6); ctx.fillStyle = '#e8d8c8'; ctx.textAlign = 'center'; ctx.font = '700 60px "Oswald"'; ctx.fillText(name, 0, -150); ctx.restore(); }
function redFlag(ctx, x, y, s, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); inkLine(ctx, [[0, 0], [0, -400]], 8, '#5a3a20'); const f = P(); f.moveTo(0, -400); for (let i = 0; i <= 10; i++) f.lineTo(i * 22, -400 + Math.sin(t * 5 + i * 0.7) * 10); for (let i = 10; i >= 0; i--) f.lineTo(i * 22, -270 + Math.sin(t * 5 + i * 0.7) * 10); f.closePath(); sfill(ctx, f, '#c8261c', 4); ctx.restore(); }
function bomb(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sfill(ctx, el2(0, 0, 40, 40), '#1a1a1a', 4); inkLine(ctx, [[20, -30], [40, -60]], 4, '#8a6a3a'); ctx.fillStyle = '#ffb040'; ctx.beginPath(); ctx.arc(42, -64, 6, 0, 7); ctx.fill(); ctx.restore(); }
function coffin(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const p = P(); p.moveTo(-320, -40); p.lineTo(-260, -110); p.lineTo(300, -110); p.lineTo(340, -40); p.lineTo(300, 0); p.lineTo(-260, 0); p.closePath(); sfill(ctx, p, '#8a1a14', 6); for (let i = 0; i < 9; i++) { ctx.fillStyle = ['#e8d8c8', '#c8261c', '#efe6cc'][i % 3]; ctx.beginPath(); ctx.arc(-240 + i * 62, -120, 18, 0, 7); ctx.fill(); } ctx.restore(); }
function mushroomCloud(ctx, x, y, s, p = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s * (0.4 + 0.6 * p), s * (0.4 + 0.6 * p)); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(0, -500, 20, 0, -500, 400); g.addColorStop(0, 'rgba(255,240,200,0.9)'); g.addColorStop(1, 'rgba(255,120,40,0)'); ctx.fillStyle = g; ctx.fillRect(-500, -900, 1000, 800); ctx.globalCompositeOperation = 'source-over'; sfill(ctx, rr(-60, -460, 120, 460, 40), '#d8a070', 5); for (let i = 0; i < 7; i++) sfill(ctx, el2(-240 + i * 80, -520 - (i % 2) * 60, 120, 90), ['#e8b880', '#d89a6a', '#f0c890'][i % 3], 4); ctx.restore(); }
function sign(ctx, x, y, s, text, col = '#efe6cc') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.font = '700 64px "Oswald"'; const w = ctx.measureText(text).width + 60; sfill(ctx, rr(-w / 2, -50, w, 100, 6), col, 5); ctx.fillStyle = '#2a1a14'; ctx.textAlign = 'center'; ctx.fillText(text, 0, 22); ctx.restore(); }

// ---------- sets ----------
function setGori(ctx, st, o = {}) {
  sky(ctx, o.dusk ? '#5a4a6a' : '#8ab0d0', o.dusk ? '#e0a070' : '#f0e0c0');
  depth(ctx, st, 0.75, (ctx) => { for (let i = 0; i < 5; i++) shape(ctx, [[-500 + i * 700, 720], [-150 + i * 700, 360 + (i % 2) * 90], [250 + i * 700, 720]], ['#7a8a6a', '#6a7a5a'][i % 2], 5); shape(ctx, [[1500, 720], [1650, 420], [1750, 460], [1900, 380], [2100, 720]], '#8a8478', 5); rect(ctx, 1620, 380, 200, 60, '#8a8478', 3, 4); });
  depth(ctx, st, 0.45, (ctx) => { for (let i = 0; i < 6; i++) gHouse(ctx, -300 + i * 500, 800, 0.85, i + 1); church(ctx, 1150, 800, 0.8); });
  fillGround(ctx, 820, '#b8a07a', '#a89070');
}
function setRoom(ctx, st, o = {}) {
  fillBg(ctx, o.night ? '#3a2e26' : '#8a7458');
  depth(ctx, st, 0.35, (ctx) => { rect(ctx, 760, 260, 300, 260, o.night ? '#1a2234' : '#a8c4d8', 6, 8); inkLine(ctx, [[910, 260], [910, 520]], 6); inkLine(ctx, [[760, 390], [1060, 390]], 6); if (o.icon) icon(ctx, 1400, 360, 0.8); rect(ctx, -500, 620, 2920, 40, '#5a4630', 0, 5); if (o.shoes) { rect(ctx, 200, 700, 400, 40, '#6a4a2a', 6, 5); for (let i = 0; i < 4; i++) rect(ctx, 220 + i * 90, 660, 60, 40, '#2a2018', 10, 4); } });
  fillGround(ctx, 860, '#6a5038', '#5a4430');
  if (o.night) { ctx.fillStyle = 'rgba(10,10,30,0.35)'; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); }
  if (o.lamp) candle(ctx, o.lamp[0], o.lamp[1], 1, st.t);
}
function setChurchIn(ctx, st) {
  fillBg(ctx, '#3a2a1e');
  depth(ctx, st, 0.4, (ctx) => { for (let i = 0; i < 7; i++) { rect(ctx, -400 + i * 420, 120, 140, 700, '#5a4230', 4, 6); icon(ctx, -260 + i * 420, 400, 0.9); } for (let i = 0; i < 12; i++) candle(ctx, -300 + i * 220, 760, 0.8, st.t + i); });
  fillGround(ctx, 860, '#4a3828', '#3a2c20');
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(960, 0, 40, 960, 0, 1000); g.addColorStop(0, 'rgba(255,220,150,0.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); ctx.restore();
}
function setSeminary(ctx, st, o = {}) {
  fillBg(ctx, '#2a2a30');
  depth(ctx, st, 0.45, (ctx) => { for (let i = 0; i < 7; i++) { const x = -400 + i * 440; rect(ctx, x, 200, 80, 640, '#4a4a54', 4, 6); const a = P(); a.moveTo(x + 80, 840); a.lineTo(x + 80, 360); a.quadraticCurveTo(x + 220, 200, x + 360, 360); a.lineTo(x + 360, 840); a.closePath(); sfill(ctx, a, o.night ? '#141824' : '#3a3e4a', 5); } });
  fillGround(ctx, 860, '#3a3a40', '#2e2e34');
  if (o.beds) depth(ctx, st, 0.1, (ctx) => { for (let i = 0; i < 4; i++) { rect(ctx, -100 + i * 560, 820, 360, 60, '#e8e2d2', 6, 5); rect(ctx, -100 + i * 560, 860, 360, 30, '#5a4a3a', 4, 5); } });
}
function setNightSky(ctx, st) { fillBg(ctx, vg(ctx, -400, 900, [[0, '#06081a'], [1, '#1e2a4a']])); stars(ctx, 220, 5); depth(ctx, st, 0.3, (ctx) => { const d = P(); d.moveTo(600, 840); d.lineTo(600, 600); d.quadraticCurveTo(900, 380, 1200, 600); d.lineTo(1200, 840); d.closePath(); sfill(ctx, d, '#5a5e6a', 6); rect(ctx, 870, 420, 60, 200, '#1a1a24', 4, 4); }); fillGround(ctx, 840, '#2a2a34', '#20202a'); }
function setTiflis(ctx, st, o = {}) {
  sky(ctx, '#9ab0c0', '#e8dcc0');
  depth(ctx, st, 0.5, (ctx) => { for (let i = 0; i < 6; i++) { const x = -400 + i * 520; rect(ctx, x, 260, 440, 560, ['#d8c8a8', '#c8b498', '#e0d4b8'][i % 3], 4, 6); for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) rect(ctx, x + 40 + k * 100, 320 + r * 150, 60, 90, '#4a5a6a', 3, 4); rect(ctx, x - 10, 250, 460, 26, '#8a7a6a', 3, 5); } });
  fillGround(ctx, 820, '#a8a090', '#989080');
  if (o.smoke) for (let i = 0; i < 4; i++) smokeFX(ctx, 400 + i * 380, 760, st.t, 1.6, i, '80,76,70', 0.5);
}
function setCell(ctx, st, o = {}) {
  fillBg(ctx, '#3a3a3a');
  depth(ctx, st, 0.3, (ctx) => { ctx.save(); ctx.fillStyle = 'rgba(0,0,0,0.15)'; for (let r = 0; r < 12; r++) for (let k = 0; k < 18; k++) ctx.fillRect(-400 + k * 160 + (r % 2) * 80, r * 80, 150, 70); ctx.restore(); rect(ctx, 840, 240, 240, 180, '#8aa0b8', 4, 6); bars(ctx, 840, 240, 240, 180, 5); });
  fillGround(ctx, 860, '#4a4a48', '#3e3e3c');
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(200,220,255,0.12)'; ctx.beginPath(); ctx.moveTo(840, 420); ctx.lineTo(1080, 420); ctx.lineTo(1300, 900); ctx.lineTo(700, 900); ctx.fill(); ctx.restore();
}
function setSiberia(ctx, st, o = {}) {
  sky(ctx, '#7a8aa0', '#d8e0e8');
  depth(ctx, st, 0.6, (ctx) => { for (let i = 0; i < 14; i++) pine(ctx, -400 + i * 220, 760, 320 + (i % 3) * 80); });
  depth(ctx, st, 0.3, (ctx) => { izba(ctx, 500, 820, 1.1); izba(ctx, 1500, 820, 0.9); });
  fillGround(ctx, 820, '#e8eef4', '#d8e0e8');
  snowFX(ctx, st.t, 120, 30, 2);
}
function setPetrograd(ctx, st, o = {}) {
  sky(ctx, o.night ? '#141a2a' : '#6a7a8a', o.night ? '#4a3a3a' : '#c8b8a0');
  depth(ctx, st, 0.55, (ctx) => { rect(ctx, 300, 300, 1320, 520, '#d8ccb0', 4, 6); for (let i = 0; i < 8; i++) { rect(ctx, 380 + i * 160, 380, 50, 440, '#efe6cc', 3, 5); } shape(ctx, [[280, 300], [960, 160], [1640, 300]], '#c8bca0', 6); for (let i = 0; i < 5; i++) redFlag(ctx, 200 + i * 400, 820, 0.8, st.t + i); });
  fillGround(ctx, 820, '#7a7468', '#6a6458');
  if (o.night) for (let i = 0; i < 6; i++) fireFX(ctx, 100 + i * 360, 860, 0.5, st.t, i);
}
function setHall(ctx, st, o = {}) {
  fillBg(ctx, '#5a2a24');
  depth(ctx, st, 0.45, (ctx) => { for (let i = 0; i < 6; i++) { rect(ctx, -300 + i * 460, 80, 120, 760, '#d8c8a8', 4, 6); } rect(ctx, 560, 120, 800, 300, '#a8241c', 6, 6); ctx.fillStyle = '#f0d890'; ctx.font = '700 70px "Oswald"'; ctx.textAlign = 'center'; ctx.fillText(o.banner || 'ВСЯ ВЛАСТЬ СОВЕТАМ', 960, 300); });
  fillGround(ctx, 860, '#6a3a2a', '#5a3024');
  if (o.rows) depth(ctx, st, -0.1, (ctx) => { for (let r = 0; r < 2; r++) for (let i = 0; i < 12; i++) man(ctx, -200 + i * 220 + r * 100, 1180 + r * 120, 0.9, { blink: 0 }, { hair: ['short', 'bald', 'swept'][(i + r) % 3], mustache: (i + r) % 2 ? 'small' : undefined, outfit: (i + r) % 3 ? 'suit' : 'tunic' }, (i + r) % 3 ? SPAL.suit : SPAL.tunic); });
}
function setOffice(ctx, st, o = {}) {
  fillBg(ctx, o.night ? '#2a261e' : '#6a5a40');
  depth(ctx, st, 0.4, (ctx) => { for (let i = 0; i < 6; i++) rect(ctx, -300 + i * 460, 120, 260, 620, '#7a6a4a', 4, 5); rect(ctx, 1420, 220, 320, 400, o.night ? '#101828' : '#9ab0c8', 6, 8); if (o.night) { star5(ctx, 1580, 300, 26, '#d82a20', '#6a1010'); } inkLine(ctx, [[1580, 220], [1580, 620]], 6); if (o.map) mapBoard(ctx, 520, 420, 0.9, st.t, 1); else if (o.portrait) portrait(ctx, 520, 400, 0.7, 4); });
  fillGround(ctx, 860, '#5a4630', '#4a3a28');
  if (o.table !== false) depth(ctx, st, 0.05, (ctx) => { rect(ctx, 400, 820, 1120, 60, '#2a5a3a', 6, 6); rect(ctx, 420, 880, 40, 120, '#4a3020', 4, 5); rect(ctx, 1460, 880, 40, 120, '#4a3020', 4, 5); ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(1300, 760, 10, 1300, 760, 300); g.addColorStop(0, 'rgba(255,230,160,0.55)'); g.addColorStop(1, 'rgba(255,230,160,0)'); ctx.fillStyle = g; ctx.fillRect(900, 400, 800, 700); ctx.restore(); sfill(ctx, rr(1290, 700, 20, 120, 4), '#2a2a2a', 3); const sh = P(); sh.moveTo(1240, 720); sh.lineTo(1360, 720); sh.lineTo(1330, 670); sh.lineTo(1270, 670); sh.closePath(); sfill(ctx, sh, '#2a6a3a', 4); });
}
function setBuild(ctx, st) {
  sky(ctx, '#8a8a8a', '#e0c8a0');
  depth(ctx, st, 0.6, (ctx) => { for (let i = 0; i < 5; i++) { rect(ctx, -300 + i * 540, 340, 200, 480, '#5a4a44', 4, 6); rect(ctx, -240 + i * 540, 160, 60, 200, '#4a3e3a', 4, 5); smokeFX(ctx, -210 + i * 540, 150, st.t, 1.6, i, '70,64,60', 0.45); } for (let i = 0; i < 3; i++) { inkLine(ctx, [[200 + i * 700, 820], [200 + i * 700, 200], [600 + i * 700, 200]], 10, '#8a3a2a'); inkLine(ctx, [[600 + i * 700, 200], [600 + i * 700, 320]], 4, '#2a2a2a'); } });
  fillGround(ctx, 820, '#8a7a62', '#7a6a52');
  depth(ctx, st, 0.15, (ctx) => { for (let i = 0; i < 4; i++) redFlag(ctx, 100 + i * 600, 840, 0.6, st.t + i); });
}
function setFields(ctx, st, o = {}) {
  sky(ctx, o.famine ? '#6a6a64' : '#9ab8d0', o.famine ? '#b8b0a0' : '#f0e4c0');
  depth(ctx, st, 0.6, (ctx) => { for (let i = 0; i < 6; i++) izba(ctx, -300 + i * 480, 700, 0.6); });
  fillGround(ctx, 720, o.famine ? '#8a8270' : '#d8c070', o.famine ? '#7a7260' : '#c8b060');
  depth(ctx, st, 0.2, (ctx) => { ctx.strokeStyle = o.famine ? 'rgba(60,50,40,0.4)' : 'rgba(140,110,40,0.5)'; ctx.lineWidth = 4; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(-500, 760 + i * 40); ctx.lineTo(2400, 740 + i * 46); ctx.stroke(); } });
  if (o.famine) dustFX(ctx, st.t, 40, 6, '200,190,170');
}
function setStreetNight(ctx, st) {
  fillBg(ctx, vg(ctx, -400, 900, [[0, '#06080e'], [1, '#1a1e2a']]));
  depth(ctx, st, 0.45, (ctx) => { for (let i = 0; i < 5; i++) { const x = -400 + i * 600; rect(ctx, x, 120, 520, 720, '#2a2a34', 4, 6); const r = rng(i + 3); for (let row = 0; row < 5; row++) for (let k = 0; k < 4; k++) rect(ctx, x + 40 + k * 120, 170 + row * 130, 70, 90, r() < 0.15 ? '#ffd880' : '#14161e', 3, 3); } });
  fillGround(ctx, 840, '#2a2a30', '#22222a');
}
function setCamp(ctx, st, o = {}) {
  sky(ctx, '#4a5060', '#b8c0c8');
  depth(ctx, st, 0.6, (ctx) => { for (let i = 0; i < 10; i++) pine(ctx, -400 + i * 320, 680, 300 + (i % 2) * 60); });
  depth(ctx, st, 0.35, (ctx) => { barrack(ctx, 300, 780, 1.0); barrack(ctx, 1600, 780, 1.0); watchtower(ctx, 960, 800, 1.0, st.t); });
  fillGround(ctx, 800, '#dde4ea', '#cfd6dc');
  depth(ctx, st, 0.1, (ctx) => wireFence(ctx, -400, 2400, 900, 260));
  snowFX(ctx, st.t, 90, 40, 3);
}
function setDacha(ctx, st, o = {}) {
  fillBg(ctx, o.night ? '#1e1c18' : '#4a4232');
  depth(ctx, st, 0.4, (ctx) => { for (let i = 0; i < 5; i++) rect(ctx, -300 + i * 560, 140, 380, 640, '#5a5038', 4, 5); rect(ctx, 1400, 260, 260, 380, o.night ? '#0a0e18' : '#7a8a6a', 6, 8); rect(ctx, 300, 300, 200, 500, '#3a2a1a', 6, 6); sfill(ctx, el2(470, 560, 10, 10), '#c8a050', 3); });
  fillGround(ctx, 860, '#6a3a2a', '#5a3024');
  depth(ctx, st, 0.05, (ctx) => { rect(ctx, 760, 760, 560, 120, '#3a3a2a', 20, 6); rect(ctx, 760, 700, 560, 80, '#4a4a36', 20, 5); });
  if (o.night) { ctx.fillStyle = 'rgba(0,0,20,0.35)'; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); }
}
function setStudio(ctx, st) { fillBg(ctx, '#3a3430'); depth(ctx, st, 0.4, (ctx) => { for (let i = 0; i < 8; i++) for (let k = 0; k < 6; k++) rect(ctx, -300 + i * 330, 100 + k * 130, 300, 110, '#4a423c', 4, 3); }); fillGround(ctx, 860, '#3a302a', '#2e2620'); depth(ctx, st, 0.05, (ctx) => { rect(ctx, 600, 820, 720, 50, '#5a3a24', 6, 6); }); }
function setYalta(ctx, st) { fillBg(ctx, '#d8ccb0'); depth(ctx, st, 0.45, (ctx) => { for (let i = 0; i < 6; i++) { rect(ctx, -300 + i * 460, 120, 300, 640, '#e8dcc0', 4, 5); const w = P(); w.moveTo(-260 + i * 460, 760); w.lineTo(-260 + i * 460, 300); w.quadraticCurveTo(-150 + i * 460, 180, -40 + i * 460, 300); w.lineTo(-40 + i * 460, 760); w.closePath(); sfill(ctx, w, '#9ab8d0', 5); } }); fillGround(ctx, 860, '#8a6a4a', '#7a5a3a'); depth(ctx, st, 0.05, (ctx) => { sfill(ctx, el2(960, 860, 420, 70), '#e8e2d2', 6); }); }
function setRedSquare(ctx, st, o = {}) {
  sky(ctx, o.gray ? '#6a6a70' : '#8ab0d0', o.gray ? '#b8b8bc' : '#f0e0c0');
  depth(ctx, st, 0.55, (ctx) => { kremlinWall(ctx, -500, 2420, 760, 220); spasskaya(ctx, 1500, 780, 0.8); mausoleum(ctx, 760, 800, 0.9, o.name || 'ЛЕНИН'); });
  fillGround(ctx, 820, '#5a5458', '#4e484c');
  depth(ctx, st, 0.1, (ctx) => { ctx.fillStyle = 'rgba(0,0,0,0.12)'; for (let i = 0; i < 40; i++) ctx.fillRect(-400 + i * 80, 820, 40, 400); });
}
