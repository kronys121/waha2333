// Ork video: sets and props. Builds on src/video/{core,chars,world}.js, emperor/eset.js, guard/gset.js and orks/orkrig.js.

// ---------- props ----------
function mushroom(ctx, x, y, s, cap = '#a8402a', spots = '#f0e0c0', lean = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(lean); ctx.scale(s, s);
  const st = P(); st.moveTo(-30, 0); st.quadraticCurveTo(-20, -120, -26, -220); st.lineTo(26, -220); st.quadraticCurveTo(20, -120, 30, 0); st.closePath(); sfill(ctx, st, '#e8d8b0', 6);
  const cp = P(); cp.moveTo(-150, -200); cp.quadraticCurveTo(-120, -360, 0, -370); cp.quadraticCurveTo(120, -360, 150, -200); cp.quadraticCurveTo(0, -230, -150, -200); cp.closePath(); sfill(ctx, cp, cap, 6);
  ctx.fillStyle = spots; for (const [sx, sy, r] of [[-70, -270, 20], [10, -320, 16], [70, -260, 22], [-20, -250, 12], [100, -300, 10]]) { ctx.beginPath(); ctx.ellipse(sx, sy, r, r * 0.7, 0, 0, 7); ctx.fill(); }
  ctx.restore();
}
function squig(ctx, x, y, s, t = 0, col = '#c8402a', o = {}) {
  ctx.save(); ctx.translate(x, y + Math.abs(Math.sin(t * 9)) * -24 * s * (o.hop ?? 1)); ctx.scale(s * (o.flip ? -1 : 1), s);
  for (const d of [-1, 1]) { const l = limb([d * 30, -60], [d * 40 + Math.sin(t * 9 + d) * 10, 0], 12, 10); sfill(ctx, l, '#d8a050', 5); sfill(ctx, el(d * 44, 0, 26, 10), '#d8a050', 4); }
  const b = el(0, -120, 100, 90); sfill(ctx, b, col, 6);
  const op = o.open ?? (0.5 + 0.5 * Math.sin(t * 6));
  const m = P(); m.moveTo(-80, -110); m.quadraticCurveTo(0, -100 + 50 * op, 80, -110); m.quadraticCurveTo(0, -60 - 10 * op, -80, -110); ctx.fillStyle = '#3a0e10'; ctx.fill(m); ctx.strokeStyle = INK; ctx.lineWidth = _lw(ctx, 5); ctx.stroke(m);
  ctx.fillStyle = '#f4ead2'; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(i * 20 - 8, -108); ctx.lineTo(i * 20 + 8, -108); ctx.lineTo(i * 20, -90); ctx.closePath(); ctx.fill(); ctx.lineWidth = _lw(ctx, 2.5); ctx.stroke(); }
  for (const d of [-1, 1]) { ctx.fillStyle = '#fff4c0'; ctx.beginPath(); ctx.arc(d * 34, -170, 18, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(d * 34 + 4, -168, 7, 0, 7); ctx.fill(); }
  ctx.restore();
}
function snotling(ctx, x, y, s, t = 0, i = 0) {
  ctx.save(); ctx.translate(x, y - Math.abs(Math.sin(t * 11 + i)) * 20 * s); ctx.scale(s, s);
  sfill(ctx, el(0, -50, 36, 44), '#9ac050', 5);
  for (const d of [-1, 1]) sfill(ctx, poly([[d * 24, -70], [d * 70, -96], [d * 34, -56]]), '#9ac050', 4);
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(-12, -60, 5, 0, 7); ctx.arc(12, -60, 5, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, -36, 10, 4 + 4 * Math.abs(Math.sin(t * 8 + i)), 0, 0, 7); ctx.fill();
  ctx.restore();
}
// plates of scrap: corrugated metal with rust and rivets
function scrapPlate(ctx, x, y, w, h, col = '#7a6a58', rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); const p = rr(-w / 2, -h / 2, w, h, 4); sfill(ctx, p, col, 5);
  ctx.save(); ctx.clip(p); ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 4; for (let i = -w / 2 + 14; i < w / 2; i += 22) { ctx.beginPath(); ctx.moveTo(i, -h / 2); ctx.lineTo(i, h / 2); ctx.stroke(); }
  ctx.fillStyle = 'rgba(168,96,44,0.55)'; ctx.beginPath(); ctx.ellipse(w * 0.2, h * 0.15, w * 0.18, h * 0.14, 0.3, 0, 7); ctx.fill(); ctx.restore();
  rivets(ctx, [[-w / 2 + 10, -h / 2 + 10], [w / 2 - 10, -h / 2 + 10], [-w / 2 + 10, h / 2 - 10], [w / 2 - 10, h / 2 - 10]], 4);
  ctx.restore();
}
function scrapHut(ctx, x, y, s, seed = 1) {
  const r = rng(seed); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 6; i++) scrapPlate(ctx, -150 + (i % 3) * 150 + r() * 20, -90 - Math.floor(i / 3) * 150 + r() * 10, 160, 160, ['#7a6a58', '#6a5a4a', '#8a5a3a', '#5a5a52'][i % 4], (r() - 0.5) * 0.12);
  shape(ctx, [[-260, -310], [0, -420], [260, -310]], '#5a4a3a', 6);
  rect(ctx, -50, -160, 100, 160, '#1a1410', 6, 5);
  glyph(ctx, 0, -360, 0.7, '#e2b42a');
  ctx.restore();
}
function glyphBanner(ctx, x, y, s, t = 0, col = '#e2b42a', cloth = '#1c1c1e') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  sfill(ctx, rr(-8, -400, 16, 400, 5), '#3a2a1c', 4); sfill(ctx, rr(-80, -400, 160, 14, 5), '#3a2a1c', 4);
  const w = Math.sin(t * 2) * 10; const fl = P(); fl.moveTo(-74, -386); fl.lineTo(74, -386); fl.lineTo(70 + w, -200); fl.lineTo(0, -230); fl.lineTo(-70 + w, -200); fl.closePath(); sfill(ctx, fl, cloth, 5);
  glyph(ctx, w * 0.5, -300, 0.9, col);
  ctx.restore();
}
function wreck(ctx, x, y, s, rot = 0.1, col = '#5a5a52') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  sfill(ctx, rr(-180, -110, 360, 110, 14), col, 6); sfill(ctx, rr(-90, -180, 170, 80, 12), col, 6); sfill(ctx, rr(60, -160, 200, 26, 8), '#4a4a44', 5);
  for (let i = 0; i < 4; i++) sfill(ctx, el(-130 + i * 86, -10, 34, 34), '#2a2a2a', 5);
  ctx.restore();
}
function buggy(ctx, x, y, s, t = 0, col = '#b03024', o = {}) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 23) * 3 * s); ctx.scale(s * (o.dir || 1), s);
  if (o.flame !== false) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 3; i++) { ctx.fillStyle = `rgba(255,${160 + i * 30},60,${0.7 - i * 0.2})`; ctx.beginPath(); ctx.moveTo(-210, -130 - i * 6); ctx.lineTo(-300 - i * 40 - Math.sin(t * 40 + i) * 20, -120); ctx.lineTo(-210, -110 + i * 6); ctx.closePath(); ctx.fill(); } ctx.restore(); }
  const b = P(); b.moveTo(-200, -80); b.lineTo(-180, -150); b.lineTo(60, -160); b.lineTo(200, -110); b.lineTo(210, -60); b.lineTo(-200, -50); b.closePath(); sfill(ctx, b, col, 6);
  sfill(ctx, rr(-210, -150, 40, 30, 6), '#8d939a', 4);
  sfill(ctx, rr(-60, -230, 90, 80, 10), '#3a3a40', 5);
  for (let i = 0; i < 3; i++) inkLine(ctx, [[-160 + i * 30, -140], [-150 + i * 30, -70]], 3);
  glyph(ctx, 120, -110, 0.45, '#e2b42a');
  for (const wx of [-130, 130]) { ctx.save(); ctx.translate(wx, -30); ctx.rotate(t * 14); const w = el(0, 0, 60, 60); sfill(ctx, w, '#2a2a2a', 6); sfill(ctx, el(0, 0, 22, 22), '#8d939a', 4); inkLine(ctx, [[0, -50], [0, 50]], 3, '#555'); ctx.restore(); }
  if (o.boy) orkX(ctx, -20, -150, 0.35, { expr: 'roar', armR: -2.6, time: t }, { weapon: 'none' }, OKP.red);
  ctx.restore();
}
function battlewagon(ctx, x, y, s, t = 0, col = '#3a3a42', dir = 1) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 17) * 3 * s); ctx.scale(s * dir, s);
  const b = P(); b.moveTo(-320, -60); b.lineTo(-300, -250); b.lineTo(160, -260); b.lineTo(330, -170); b.lineTo(340, -60); b.closePath(); sfill(ctx, b, col, 6);
  ctx.save(); ctx.clip(b); for (let i = -6; i < 12; i++) { ctx.fillStyle = i % 2 ? '#e2b42a' : '#1c1c1e'; ctx.beginPath(); ctx.moveTo(-320 + i * 40, -120); ctx.lineTo(-290 + i * 40, -120); ctx.lineTo(-320 + i * 40, -60); ctx.lineTo(-350 + i * 40, -60); ctx.closePath(); ctx.fill(); } ctx.restore(); ctx.strokeStyle = INK; ctx.lineWidth = _lw(ctx, 6); ctx.stroke(b);
  sfill(ctx, rr(-120, -360, 200, 110, 12), col, 6); sfill(ctx, rr(60, -330, 230, 34, 8), '#5a5e66', 5);
  for (let i = 0; i < 3; i++) scrapPlate(ctx, -230 + i * 150, -190, 120, 80, '#6a5a4a', (i - 1) * 0.06);
  rivets(ctx, [[-280, -230], [-150, -235], [0, -240], [140, -240]], 6);
  glyph(ctx, 240, -180, 0.8, '#e2b42a');
  for (let i = 0; i < 5; i++) { ctx.save(); ctx.translate(-250 + i * 125, -30); ctx.rotate(t * 8); sfill(ctx, el(0, 0, 54, 54), '#2a2a2a', 6); inkLine(ctx, [[0, -44], [0, 44]], 3, '#555'); ctx.restore(); }
  sfill(ctx, rr(330, -120, 40, 80, 6), '#8d939a', 5); for (let i = 0; i < 3; i++) { const sp = P(); sp.moveTo(370, -110 + i * 26); sp.lineTo(420, -100 + i * 26); sp.lineTo(370, -90 + i * 26); sp.closePath(); sfill(ctx, sp, '#bcc2ca', 3); }
  ctx.restore();
}
// rok: an asteroid with engines and guns
function rok(ctx, x, y, s, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 3; i++) { const g = ctx.createRadialGradient(-420, -40 + i * 90, 10, -420, -40 + i * 90, 220); g.addColorStop(0, 'rgba(255,190,90,0.8)'); g.addColorStop(1, 'rgba(255,90,30,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(-480 - Math.sin(t * 30 + i) * 20, -40 + i * 90, 200, 50, 0, 0, 7); ctx.fill(); } ctx.restore();
  for (let i = 0; i < 3; i++) sfill(ctx, rr(-440, -80 + i * 90, 110, 70, 12), '#5a5e66', 6);
  const r = P(); const pts = [[-340, -200], [-200, -300], [20, -320], [220, -260], [380, -120], [400, 60], [260, 220], [0, 260], [-220, 220], [-360, 80]]; r.moveTo(...pts[0]); for (let i = 1; i < pts.length; i++) { const [px, py] = pts[i], [qx, qy] = pts[i - 1]; r.quadraticCurveTo(qx + (px - qx) * 0.5 + 30, qy + (py - qy) * 0.5 - 30, px, py); } r.closePath(); sfill(ctx, r, '#7a7064', 7);
  ctx.save(); ctx.clip(r); ctx.fillStyle = 'rgba(0,0,0,0.25)'; for (const [cx, cy, cr] of [[-120, -100, 50], [120, 60, 70], [-40, 150, 40], [230, -120, 36]]) { ctx.beginPath(); ctx.arc(cx, cy, cr, 0, 7); ctx.fill(); } ctx.restore();
  scrapPlate(ctx, 60, -200, 200, 90, '#5a5a52', -0.1); glyph(ctx, -60, -40, 1.2, '#e2b42a');
  for (const [gx, gy, a] of [[300, -160, -0.3], [330, 40, 0.1], [-160, -260, -0.6]]) { ctx.save(); ctx.translate(gx, gy); ctx.rotate(a); sfill(ctx, rr(0, -16, 150, 32, 8), '#3c3c42', 5); sfill(ctx, el(0, 0, 40, 40), '#5a5e66', 5); ctx.restore(); }
  ctx.restore();
}
// gargant: a walking iron idol of Gork. burn 0..1 sets it on fire
function gargant(ctx, x, y, s, t = 0, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const step = Math.sin(t * 1.4) * (o.walk ?? 1);
  for (const d of [-1, 1]) sfill(ctx, rr(d * 170 - 90 + d * step * 20, -380, 180, 380, 30), '#3a3a42', 8);
  const b = P(); b.moveTo(-400, -340); b.quadraticCurveTo(-460, -900, -260, -1080); b.lineTo(260, -1080); b.quadraticCurveTo(460, -900, 400, -340); b.closePath(); sfill(ctx, b, '#4a4a52', 8);
  ctx.save(); ctx.clip(b); for (let i = -10; i < 12; i++) { ctx.fillStyle = i % 2 ? '#e2b42a' : '#1c1c1e'; ctx.beginPath(); ctx.moveTo(-400 + i * 60, -420); ctx.lineTo(-360 + i * 60, -420); ctx.lineTo(-400 + i * 60, -340); ctx.lineTo(-440 + i * 60, -340); ctx.closePath(); ctx.fill(); } ctx.restore(); ctx.strokeStyle = INK; ctx.lineWidth = _lw(ctx, 8); ctx.stroke(b);
  // belly mouth
  const m = P(); m.moveTo(-260, -640); m.lineTo(260, -640); m.lineTo(220, -470); m.lineTo(-220, -470); m.closePath(); ctx.fillStyle = '#2a0a08'; ctx.fill(m); ctx.stroke(m);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(0, -560, 10, 0, -560, 260); g.addColorStop(0, 'rgba(255,170,60,0.9)'); g.addColorStop(1, 'rgba(255,80,20,0)'); ctx.fillStyle = g; ctx.fill(m); ctx.restore();
  ctx.fillStyle = '#efe6c8'; for (let i = -5; i <= 5; i++) { ctx.beginPath(); ctx.moveTo(i * 44 - 18, -640); ctx.lineTo(i * 44 + 18, -640); ctx.lineTo(i * 44, -590); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(i * 40 - 16, -470); ctx.lineTo(i * 40 + 16, -470); ctx.lineTo(i * 40, -515); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  // head
  const hd = P(); hd.moveTo(-200, -1060); hd.quadraticCurveTo(0, -1320, 200, -1060); hd.closePath(); sfill(ctx, hd, '#3a3a42', 8);
  for (const d of [-1, 1]) { const hn = P(); hn.moveTo(d * 120, -1180); hn.quadraticCurveTo(d * 300, -1260, d * 280, -1420); hn.quadraticCurveTo(d * 230, -1270, d * 70, -1220); hn.closePath(); sfill(ctx, hn, '#d8ccb0', 6); }
  for (const d of [-1, 1]) { ctx.save(); ctx.shadowColor = '#ff3020'; ctx.shadowBlur = 40; ctx.fillStyle = '#ff3020'; ctx.beginPath(); ctx.ellipse(d * 80, -1130, 40, 22, d * 0.3, 0, 7); ctx.fill(); ctx.restore(); }
  glyph(ctx, 0, -820, 2.4, '#e2b42a');
  // arms: cannons
  for (const d of [-1, 1]) { ctx.save(); ctx.translate(d * 430, -880); ctx.rotate(d * 0.1 + step * 0.03); sfill(ctx, el(0, 0, 120, 130), '#4a4a52', 7); sfill(ctx, rr(d > 0 ? 0 : -380, 80, 380, 120, 16), '#3c3c42', 7); sfill(ctx, rr(d > 0 ? 340 : -420, 96, 80, 88, 10), '#5a5e66', 6); ctx.restore(); }
  for (const d of [-1, 1]) { sfill(ctx, rr(d * 200 - 30, -1300, 60, 240, 8), '#5a5e66', 6); smokeFX(ctx, d * 200, -1320, t, 2, d + 3, '40,36,32', 0.45); }
  rivets(ctx, [[-300, -760], [300, -760], [-320, -420], [320, -420], [-200, -1000], [200, -1000]], 10);
  if (o.burn) { for (let i = 0; i < 5; i++) fireFX(ctx, -300 + i * 150, -600 - (i % 2) * 300, 2.2 * o.burn, t, i); }
  ctx.restore();
}
function tooth(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); const t = P(); t.moveTo(-14, -20); t.quadraticCurveTo(0, -30, 14, -20); t.lineTo(8, 24); t.lineTo(0, 30); t.lineTo(-8, 24); t.closePath(); sfill(ctx, t, '#efe6c8', 4); ctx.restore(); }
function teethPile(ctx, x, y, s, n = 20, seed = 2) { const r = rng(seed); for (let i = 0; i < n; i++) { const a = r() * Math.PI, d = r() * 90; tooth(ctx, x + Math.cos(a) * d * 1.6, y - Math.sin(a) * d * 0.5 - (n - i) * 0.6, s, (r() - 0.5) * 2); } }
function drum(ctx, x, y, s, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); sfill(ctx, rr(-90, -160, 180, 160, 14), '#8a3a24', 6); sfill(ctx, el(0, -160, 90, 24), '#e8dcc0', 5); for (let i = 0; i < 5; i++) inkLine(ctx, [[-90 + i * 45, -150], [-70 + i * 45, -10]], 3); const hit = Math.abs(Math.sin(t * 8)); sfill(ctx, rr(-60, -220 - hit * 40, 14, 90, 6), '#5a3a20', 4); ctx.restore(); }
function wanted(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  rect(ctx, -220, -300, 440, 600, '#e8dcbc', 6, 6);
  ctx.fillStyle = '#3a2a1a'; ctx.textAlign = 'center'; ctx.font = '700 54px "Oswald"'; ctx.fillText('РАЗЫСКИВАЕТСЯ', 0, -220);
  ctx.save(); ctx.translate(0, 120); ctx.scale(0.62, 0.62); megaBoss(ctx, 0, 300, 0.55, { expr: 'roar' }, { helm: 'none', plate: true, jaw: 'iron' }); ctx.restore();
  ctx.fillStyle = '#8a1a14'; ctx.font = '700 60px "Oswald"'; ctx.fillText('НАГРАДА', 0, 250);
  ctx.restore();
}
function flameJet(ctx, x, y, len, t, dir = 1) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 14; i++) { const p = ((t * 2.4 + i / 14) % 1); const px = x + dir * p * len, py = y + Math.sin(i * 1.7 + t * 9) * 30 * p; const r = 20 + p * 90; const g = ctx.createRadialGradient(px, py, 0, px, py, r); g.addColorStop(0, `rgba(255,${220 - p * 120},90,${0.8 * (1 - p)})`); g.addColorStop(1, 'rgba(255,80,20,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, r, 0, 7); ctx.fill(); }
  ctx.restore();
}
function sporeFX(ctx, t, n = 70, seed = 9, col = '170,230,110') {
  const r = rng(seed); ctx.save();
  for (let i = 0; i < n; i++) { const x0 = BX0 + r() * (BX1 - BX0), y0 = r() * 1200, sp = 10 + r() * 30; const x = x0 + Math.sin(t * 0.6 + i) * 40, y = ((y0 - t * sp) % 1300 + 1300) % 1300 - 100; ctx.fillStyle = `rgba(${col},${0.25 + r() * 0.45})`; ctx.beginPath(); ctx.arc(x, y, 2 + r() * 5, 0, 7); ctx.fill(); }
  ctx.restore();
}
function sky(ctx, top, bot) { fillBg(ctx, vg(ctx, -400, 900, [[0, top], [1, bot]])); }

// ---------- sets ----------
function setCave(ctx, st, o = {}) {
  fillBg(ctx, vg(ctx, -400, 1100, [[0, '#0e0c0a'], [1, '#2a2218']]));
  depth(ctx, st, 0.6, () => { for (let i = 0; i < 9; i++) { shape(ctx, [[-400 + i * 330, -400], [-330 + i * 330, 80 + (i % 3) * 80], [-260 + i * 330, -400]], '#1a1612', 5); } });
  depth(ctx, st, 0.4, () => { const r = rng(4); for (let i = 0; i < 7; i++) mushroom(ctx, -300 + i * 420 + r() * 80, 860, 0.9 + r() * 0.8, ['#7a3a2a', '#5a6a3a', '#8a5a2a'][i % 3], '#d8c8a0', (r() - 0.5) * 0.2); });
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(960, 820, 20, 960, 820, 800); g.addColorStop(0, `rgba(140,200,80,${o.glow ?? 0.25})`); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); ctx.restore();
  fillGround(ctx, 900, '#3a2e22', '#2a2218');
  depth(ctx, st, -0.15, () => { for (let i = 0; i < 6; i++) { ctx.fillStyle = '#4a3a2a'; ctx.beginPath(); ctx.ellipse(-200 + i * 480, 960, 160, 30, 0, 0, 7); ctx.fill(); } });
  sporeFX(ctx, st.t, 60, 3);
}
function setScrap(ctx, st, o = {}) {
  sky(ctx, o.dusk ? '#3a1a2a' : '#c8784a', o.dusk ? '#d0703a' : '#f0c890');
  depth(ctx, st, 0.7, () => { for (let i = 0; i < 6; i++) shape(ctx, [[-400 + i * 520, 760], [-200 + i * 520, 420 + (i % 2) * 100], [60 + i * 520, 760]], o.dusk ? '#4a2a2a' : '#a86a4a', 5); });
  depth(ctx, st, 0.45, () => { for (let i = 0; i < 5; i++) scrapHut(ctx, -250 + i * 640, 820, 0.8, i + 1); for (let i = 0; i < 3; i++) glyphBanner(ctx, 140 + i * 820, 820, 0.8, st.t + i); });
  fillGround(ctx, 820, '#8a6a4a', '#7a5a3a');
  depth(ctx, st, -0.1, () => { for (let i = 0; i < 4; i++) scrapPlate(ctx, -100 + i * 640, 1040, 150, 60, '#6a5a4a', (i - 1.5) * 0.2); });
  if (o.fire) campfire2(ctx, o.fire[0], o.fire[1], o.fire[2] || 1.4, st.t);
}
function setWaste(ctx, st, o = {}) {
  sky(ctx, o.red ? '#4a1a14' : '#6a5a4a', o.red ? '#e07040' : '#c8a878');
  if (o.red) depth(ctx, st, 0.85, () => { ctx.fillStyle = 'rgba(255,200,120,0.5)'; ctx.beginPath(); ctx.arc(1400, 260, 120, 0, 7); ctx.fill(); });
  depth(ctx, st, 0.55, () => { wreck(ctx, 200, 780, 0.8, 0.15); wreck(ctx, 1700, 780, 0.9, -0.2, '#4a4a44'); for (let i = 0; i < 4; i++) smokeFX(ctx, 200 + i * 520, 760, st.t, 1.4, i, '50,44,40', 0.4); });
  fillGround(ctx, 820, o.red ? '#6a3a24' : '#7a6a50', o.red ? '#5a2e1c' : '#6a5a42');
  depth(ctx, st, -0.1, () => { for (let i = 0; i < 4; i++) { ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse(-100 + i * 700, 1000, 200, 40, 0, 0, 7); ctx.fill(); } });
}
function setDoc(ctx, st) {
  fillBg(ctx, vg(ctx, -400, 1000, [[0, '#2a3a2a'], [1, '#4a5a3a']]));
  depth(ctx, st, 0.5, () => { for (let i = 0; i < 6; i++) { rect(ctx, -200 + i * 450, 360, 160, 240, '#3a4a3a', 6, 5); for (let j = 0; j < 3; j++) { sfill(ctx, rr(-180 + i * 450 + j * 50, 400, 40, 70, 8), ['#9ac050', '#c05040', '#d0c060'][j], 4); } } for (let i = 0; i < 5; i++) { ctx.save(); ctx.translate(-100 + i * 520, 300); sfill(ctx, rr(-6, -200, 12, 200, 4), '#5a5e66', 3); sfill(ctx, el(0, 10, 40, 20), '#d0d4d8', 4); ctx.restore(); } });
  fillGround(ctx, 860, '#4a4a3a', '#3a3a2e');
  depth(ctx, st, 0.1, () => { rect(ctx, 760, 760, 420, 40, '#8a8a7a', 6, 6); for (const d of [-1, 1]) rect(ctx, 970 + d * 170, 800, 20, 60, '#5a5e66', 4, 4); });
}
function setMek(ctx, st) {
  fillBg(ctx, vg(ctx, -400, 1000, [[0, '#2a2420'], [1, '#5a4030']]));
  depth(ctx, st, 0.5, () => { for (let i = 0; i < 7; i++) { scrapPlate(ctx, -300 + i * 420, 420, 300, 300, ['#5a5a52', '#6a5a4a'][i % 2], (i % 3 - 1) * 0.05); } for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(i * 640, 200); for (let k = 0; k < 4; k++) inkLine(ctx, [[-80 + k * 50, 0], [-80 + k * 50, 120 + (k % 2) * 40]], 4, '#2a2420'); ctx.restore(); } });
  fillGround(ctx, 860, '#4a3a2a', '#3a2e22');
  depth(ctx, st, 0.15, () => { rect(ctx, 600, 760, 720, 40, '#5a4a3a', 6, 6); });
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const r = rng(Math.floor(st.t * 8)); for (let i = 0; i < 14; i++) { ctx.fillStyle = 'rgba(255,220,120,0.9)'; ctx.fillRect(960 + (r() - 0.5) * 300, 700 + (r() - 0.5) * 120, 4, 4); } ctx.restore();
}
function setMine(ctx, st, o = {}) {
  sky(ctx, '#5a6a7a', '#c8c0a8');
  depth(ctx, st, 0.65, () => { for (let i = 0; i < 6; i++) { const x = -200 + i * 520; rect(ctx, x, 300, 80, 460, '#6a6e74', 4, 6); shape(ctx, [[x - 60, 300], [x + 40, 200], [x + 140, 300]], '#5a5e64', 5); inkLine(ctx, [[x + 40, 200], [x + 300, 430]], 4); } });
  depth(ctx, st, 0.4, () => { rect(ctx, -500, 600, 2920, 200, '#7a7e84', 0, 6); for (let i = 0; i < 18; i++) rect(ctx, -480 + i * 170, 560, 90, 50, '#7a7e84', 0, 5); aquila(ctx, 960, 680, 0.8); });
  fillGround(ctx, 820, '#8a7a62', '#7a6a52');
}
function setSpaceO(ctx, st, o = {}) { setSpace(ctx, st, o); }
function setBurnWorld(ctx, st, o = {}) {
  sky(ctx, '#1a0a08', '#c04a1a');
  depth(ctx, st, 0.7, () => { for (let i = 0; i < 4; i++) { ctx.save(); ctx.globalAlpha = 0.85; gargant(ctx, -100 + i * 700, 820, 0.45, st.t * 0.3 + i, { walk: 0, burn: 1 }); ctx.restore(); } });
  depth(ctx, st, 0.4, () => { for (let i = 0; i < 6; i++) { smokeFX(ctx, -200 + i * 460, 700, st.t, 2, i, '30,20,18', 0.55); fireFX(ctx, -100 + i * 460, 820, 1.4, st.t, i); } });
  fillGround(ctx, 840, '#3a2218', '#2a1810');
  dustFX(ctx, st.t, 50, 4, '255,170,90');
}
