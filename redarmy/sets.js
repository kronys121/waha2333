// Sets, vehicles and props for the Red Army video. Backgrounds take (ctx, st) so far layers can use parallax.

function sky(ctx, c1, c2) { fillBg(ctx, vg(ctx, -300, 900, [[0, c1], [1, c2]])); }
function ground(ctx, y, c1, c2) { fillGround(ctx, y, c1, c2); }

function birch(ctx, x, y, h, s = 1) {
  rect(ctx, x - 9 * s, y - h, 18 * s, h, '#e8e4da', 4, 4);
  ctx.fillStyle = '#2a2622'; const r = rng(Math.floor(x)); for (let i = 0; i < 8; i++) ctx.fillRect(x - 8 * s + r() * 6, y - h + r() * h, 8 * s, 3 * s);
  ctx.fillStyle = '#5a7a3a'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(x + (i - 2) * 26 * s, y - h + 20 + (i % 2) * 30, 50 * s, 34 * s, 0, 0, Math.PI * 2); ctx.fill(); }
}
function pine(ctx, x, y, h, c = '#2e4a2e') { shape(ctx, [[x, y - h], [x - h * 0.28, y - h * 0.35], [x - h * 0.16, y - h * 0.35], [x - h * 0.34, y], [x + h * 0.34, y], [x + h * 0.16, y - h * 0.35], [x + h * 0.28, y - h * 0.35]], c, 4); }
function izba(ctx, x, y, s = 1, burnt = false) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (burnt) { rect(ctx, 40, -260, 50, 260, '#5a504a', 4, 5); rect(ctx, 30, -280, 70, 26, '#4a403a', 4, 5); ctx.restore(); return; }
  rect(ctx, -110, -150, 220, 150, '#7a5a3a', 4, 5);
  ctx.strokeStyle = '#5a3e26'; ctx.lineWidth = 4; for (let yy = -140; yy < 0; yy += 20) { ctx.beginPath(); ctx.moveTo(-110, yy); ctx.lineTo(110, yy); ctx.stroke(); }
  shape(ctx, [[-130, -150], [0, -240], [130, -150]], '#6a6a5a', 5);
  rect(ctx, -30, -110, 60, 50, '#a8c8d8', 4, 4); rect(ctx, -36, -116, 72, 10, '#d8d0b8', 2, 3);
  ctx.restore();
}
function loudspeaker(ctx, x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rect(ctx, -8, -420, 16, 420, '#5a4a3a', 3, 4);
  shape(ctx, [[0, -400], [70, -440], [70, -360]], '#4a4a4e', 5);
  ctx.restore();
}
function poster(ctx, x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rect(ctx, -110, -160, 220, 320, '#c8402a', 4, 5);
  ctx.fillStyle = '#f0e6d0'; ctx.font = '700 34px "Oswald"'; ctx.textAlign = 'center';
  ctx.fillText('РОДИНА-МАТЬ', 0, 90); ctx.fillText('ЗОВЁТ!', 0, 130);
  ctx.fillStyle = '#e8d8c0'; ctx.beginPath(); ctx.ellipse(0, -60, 50, 60, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

// ---------- sets ----------
function setYard(ctx, st, o = {}) {
  sky(ctx, o.evening ? '#8a6a5a' : '#9ab8cf', o.evening ? '#e0b080' : '#e8e0c8');
  layer(ctx, st, 0.5, () => { for (let i = 0; i < 6; i++) { const x = -300 + i * 480; rect(ctx, x, 380, 360, 380, ['#8a6a48', '#9a7a52', '#7a5a3a'][i % 3], 4, 5); shape(ctx, [[x - 20, 380], [x + 180, 300], [x + 380, 380]], '#5a5a50', 5); for (let j = 0; j < 3; j++) rect(ctx, x + 40 + j * 110, 470, 60, 70, '#a8c8d8', 3, 4); } });
  ground(ctx, 760, '#b8a07a', '#a89070');
  for (let x = -400; x < 2400; x += 60) rect(ctx, x, 700, 40, 90, '#8a7050', 6, 4);
  loudspeaker(ctx, 1500, 800, 1.2);
  ctx.strokeStyle = '#3a3030'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(200, 430); ctx.quadraticCurveTo(500, 500, 800, 430); ctx.stroke();
  for (let i = 0; i < 4; i++) rect(ctx, 260 + i * 140, 450 + Math.sin(i) * 10, 70, 90, ['#e8e0d0', '#9ab8d8', '#d8a8a8', '#e8e0d0'][i], 2, 3);
}
function setCommissariat(ctx, st) {
  fillBg(ctx, '#b8a888');
  ctx.fillStyle = '#9a8a6a'; ctx.fillRect(BX0, 600, BX1 - BX0, 180);
  poster(ctx, 520, 380, 1.1); poster(ctx, 1520, 380, 1.1);
  ground(ctx, 780, '#6a5a44', '#5a4a38');
  rect(ctx, 760, 700, 400, 120, '#6a4a2a', 6, 6);
}
function setRoad(ctx, st, o = {}) {
  sky(ctx, '#c8b090', '#e8d8b0');
  layer(ctx, st, 0.6, () => { shape(ctx, [[BX0, 640], [BX0, 560], [300, 540], [900, 570], [1500, 530], [BX1, 560], [BX1, 640]], '#8a8a5a', 0); });
  layer(ctx, st, 0.45, () => { if (o.burning !== false) { for (const x of [300, 1500]) { izba(ctx, x, 640, 0.6); fireFX(ctx, x, 600, 0.8, st.t, x); smokeFX(ctx, x, 560, st.t, 1.2, x, '50,46,42', 0.4); } } });
  ground(ctx, 700, '#b89a6a', '#a88a5a');
  ctx.fillStyle = '#c8aa7a'; ctx.beginPath(); ctx.moveTo(BX0, 900); ctx.lineTo(BX1, 820); ctx.lineTo(BX1, 1000); ctx.lineTo(BX0, 1080); ctx.fill();
  dustFX(ctx, st.t, 30);
}
function setNightCamp(ctx, st) {
  sky(ctx, '#0e1018', '#2a2a3a');
  const r = rng(3); ctx.fillStyle = '#fff'; for (let i = 0; i < 90; i++) ctx.fillRect(BX0 + r() * 2900, BY0 + r() * 800, 2, 2);
  layer(ctx, st, 0.5, () => { for (let i = 0; i < 18; i++) pine(ctx, -300 + i * 150, 720, 300 + (i % 3) * 60, '#141c18'); });
  ground(ctx, 720, '#1e1e22', '#18181c');
  fireFX(ctx, 960, 900, 0.7, st.t, 1);
}
function setWinter(ctx, st, o = {}) {
  sky(ctx, '#8a929a', '#d8dce0');
  layer(ctx, st, 0.55, () => { for (let i = 0; i < 30; i++) birch(ctx, -300 + i * 100, 640, 220 + (i % 4) * 30, 0.6); });
  layer(ctx, st, 0.3, () => { if (o.chimneys) for (let i = 0; i < 5; i++) { izba(ctx, 200 + i * 380, 760, 0.9, true); smokeFX(ctx, 265 + i * 380, 520, st.t, 0.6, i, '80,76,72', 0.25); } });
  ground(ctx, 760, '#eef2f4', '#dde4ea');
}
function setTrench(ctx, st, o = {}) {
  sky(ctx, o.summer ? '#a8b8b8' : '#8a929a', o.summer ? '#d8d0b0' : '#c8ccd0');
  layer(ctx, st, 0.5, () => { if (o.smoke) for (let i = 0; i < 3; i++) smokeFX(ctx, 300 + i * 700, 620, st.t, 1.4, i, '60,56,52', 0.35); });
  // field beyond the parapet
  ground(ctx, 640, o.summer ? '#8a8a5a' : '#dde4ea', o.summer ? '#7a7a4a' : '#ccd4da');
  // parapet with sandbags, then the cutaway trench
  for (let i = 0; i < 24; i++) rect(ctx, -300 + i * 110, 690 + (i % 2) * 6, 120, 44, '#8a7a5a', 18, 4);
  rect(ctx, BX0, 740, BX1 - BX0, 600, '#5a4632', 0, 6);
  ctx.fillStyle = '#4a3a28'; for (let i = 0; i < 40; i++) ctx.fillRect(BX0 + i * 80, 760 + (i % 3) * 120, 60, 10);
  for (let x = -300; x < 2400; x += 220) rect(ctx, x, 740, 26, 340, '#6a5038', 4, 4);
}
function setDugout(ctx, st) {
  fillBg(ctx, '#2a1e14');
  for (let y = -200; y < 800; y += 56) { rect(ctx, BX0, y, BX1 - BX0, 52, y % 112 ? '#5a4028' : '#4e3622', 26, 4); }
  rect(ctx, 200, 640, 700, 60, '#6a4a2a', 6, 5); rect(ctx, 1100, 640, 700, 60, '#6a4a2a', 6, 5);
  ground(ctx, 800, '#3a2a1a', '#30221a');
  // shell-case lamp
  rect(ctx, 940, 720, 40, 80, '#b8902a', 6, 4);
  const fl = 1 + Math.sin(st.t * 13) * 0.1;
  const g = ctx.createRadialGradient(960, 690, 10, 960, 690, 700 * fl); g.addColorStop(0, 'rgba(255,200,110,0.6)'); g.addColorStop(1, 'rgba(255,170,80,0)');
  ctx.fillStyle = g; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0);
  ctx.fillStyle = '#ffd27a'; ctx.beginPath(); ctx.ellipse(960, 700, 9, 22 * fl, 0, 0, Math.PI * 2); ctx.fill();
}
function ruinsWall(ctx, x, y, w, h, seed, c = '#7a6a5a') {
  const r = rng(seed); const p = P();
  p.moveTo(x, y); p.lineTo(x, y - h * (0.6 + r() * 0.4));
  for (let i = 1; i <= 6; i++) p.lineTo(x + (w * i) / 6, y - h * (0.4 + r() * 0.6));
  p.lineTo(x + w, y); p.closePath();
  for (let i = 0; i < Math.floor(w / 90); i++) for (let j = 0; j < Math.floor(h / 120); j++) { if (r() < 0.25) continue; p.rect(x + 25 + i * 90, y - h + 60 + j * 120, 44, 64); }
  ctx.fillStyle = c; ctx.fill(p, 'evenodd'); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke(p);
}
function setStalingrad(ctx, st, o = {}) {
  sky(ctx, o.winter ? '#6a6a70' : '#7a5a4a', o.winter ? '#b8b8bc' : '#c8906a');
  layer(ctx, st, 0.6, () => { for (let i = 0; i < 8; i++) ruinsWall(ctx, -300 + i * 340, 760, 300, 420 + (i % 3) * 120, i + 10, '#5a4e46'); for (let i = 0; i < 3; i++) smokeFX(ctx, 200 + i * 700, 500, st.t, 1.6, i, '40,36,34', 0.4); });
  layer(ctx, st, 0.25, () => { ruinsWall(ctx, -200, 840, 700, 700, 3, '#8a7868'); ruinsWall(ctx, 1450, 840, 800, 760, 4, '#857262'); if (o.fire !== false) fireFX(ctx, 1700, 840, 1, st.t, 3); });
  ground(ctx, 840, o.winter ? '#c8c8c8' : '#6a5a4a', o.winter ? '#b8b8b8' : '#5a4a3a');
  const r = rng(9); for (let i = 0; i < 20; i++) { const x = r() * 2400 - 300, y = 900 + r() * 300; shape(ctx, [[x, y], [x + 40, y - 50], [x + 90, y]], '#4a3e36', 4); }
  if (o.winter) snowFX(ctx, st.t, 80, 20, 7);
}
function setKursk(ctx, st) {
  sky(ctx, '#c8b890', '#e8dcb0');
  layer(ctx, st, 0.6, () => { for (let i = 0; i < 5; i++) smokeFX(ctx, 100 + i * 450, 640, st.t, 1.8, i, '50,46,40', 0.4); });
  ground(ctx, 680, '#c8b06a', '#b8a05a');
  ctx.strokeStyle = '#a8904a'; ctx.lineWidth = 3; const r = rng(4); for (let i = 0; i < 160; i++) { const x = r() * 2600 - 300, y = 700 + r() * 500; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 4, y - 26); ctx.stroke(); }
}
function setForest(ctx, st, o = {}) {
  sky(ctx, '#8aa098', '#c8d0c0');
  layer(ctx, st, 0.55, () => { for (let i = 0; i < 26; i++) pine(ctx, -300 + i * 110, 700, 380 + (i % 4) * 60, i % 2 ? '#2e4a34' : '#355a3a'); });
  ground(ctx, 700, '#5a6a3a', '#4a5a30');
  if (o.swamp) { ctx.fillStyle = 'rgba(90,110,100,0.85)'; ctx.beginPath(); ctx.ellipse(1300, 900, 600, 80, 0, 0, Math.PI * 2); ctx.fill(); }
  layer(ctx, st, -0.15, () => { for (let i = 0; i < 6; i++) birch(ctx, -200 + i * 480, 1100, 700, 1.2); });
}
function setGermany(ctx, st) {
  sky(ctx, '#9aa4ac', '#d8d4c8');
  layer(ctx, st, 0.45, () => { for (let i = 0; i < 8; i++) { const x = -300 + i * 330; rect(ctx, x, 440, 280, 320, ['#e8dcc4', '#d8c8a8', '#e0d4bc'][i % 3], 2, 5); shape(ctx, [[x - 20, 440], [x + 140, 300], [x + 300, 440]], '#a8482a', 5); for (let j = 0; j < 2; j++) for (let k = 0; k < 2; k++) rect(ctx, x + 40 + k * 130, 500 + j * 110, 60, 70, '#6a7a88', 2, 4); } });
  ground(ctx, 760, '#8a8a8a', '#7a7a7a');
  ctx.strokeStyle = '#6a6a6a'; ctx.lineWidth = 3; for (let x = -300; x < 2400; x += 40) { ctx.beginPath(); ctx.moveTo(x, 760); ctx.lineTo(x + (x - 960) * 0.4, 1300); ctx.stroke(); }
}
function reichstag(ctx, x, y, s, flag = false, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rect(ctx, -600, -380, 1200, 380, '#6a6258', 4, 7);
  for (let i = 0; i < 6; i++) rect(ctx, -250 + i * 100, -460, 50, 460, '#7a7268', 3, 5);
  rect(ctx, -300, -500, 600, 50, '#5a5248', 3, 6);
  for (const sx of [-560, 460]) rect(ctx, sx, -500, 100, 500, '#5e564c', 3, 6);
  ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); for (let i = 0; i <= 8; i++) { const a = Math.PI + (i / 8) * Math.PI; ctx.moveTo(0, -500); ctx.lineTo(Math.cos(a) * 220, -500 + Math.sin(a) * 200); } ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -500, 220, 200, 0, Math.PI, 0); ctx.stroke();
  ctx.fillStyle = '#1a1612'; for (let i = 0; i < 10; i++) ctx.fillRect(-560 + i * 115, -300, 50, 80);
  if (flag) { rect(ctx, -6, -900, 12, 220, '#3a3a3a', 3, 4); const w = Math.sin(t * 4) * 10; shape(ctx, [[6, -900], [190, -890 + w], [180, -800 + w], [6, -810]], '#c8282a', 5); }
  ctx.restore();
}
function setBerlin(ctx, st, o = {}) {
  sky(ctx, '#6a625a', '#b8a890');
  layer(ctx, st, 0.5, () => { reichstag(ctx, 960, 700, 0.9, o.flag, st.t); for (let i = 0; i < 3; i++) smokeFX(ctx, 300 + i * 650, 600, st.t, 1.4, i, '50,46,42', 0.35); });
  layer(ctx, st, 0.2, () => { ruinsWall(ctx, -300, 860, 600, 620, 21, '#7a6e62'); ruinsWall(ctx, 1600, 860, 700, 600, 22, '#766a5e'); });
  ground(ctx, 860, '#6a625a', '#5a524a');
}
function setStation(ctx, st, o = {}) {
  sky(ctx, '#a8b0b0', '#e0dccc');
  layer(ctx, st, 0.4, () => { for (let i = 0; i < 6; i++) teplushka(ctx, -200 + i * 420 - (o.move ? st.t * 60 : 0), 720, 1); smokeFX(ctx, 1900, 520, st.t, 1.4, 3, '200,200,200', 0.35); });
  rect(ctx, BX0, 760, BX1 - BX0, 60, '#8a8478', 0, 6);
  ground(ctx, 820, '#9a9488', '#8a8478');
}
function teplushka(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rect(ctx, -190, -230, 380, 210, '#7a3a2a', 6, 6);
  rect(ctx, -60, -200, 120, 170, '#6a3024', 4, 5);
  for (const wx of [-120, 120]) circ(ctx, wx, -14, 26, '#2a2a2e', 5);
  ctx.restore();
}

// ---------- vehicles ----------
function t34(ctx, x, y, s, t = 0, dir = 1, fire = false) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-260, -40], [-230, -110], [230, -110], [270, -40], [240, 0], [-240, 0]], '#4f5a3a', 7);
  for (let i = 0; i < 5; i++) { circ(ctx, -190 + i * 95, -30, 36, '#3a4030', 5); circ(ctx, -190 + i * 95, -30, 12, '#2a2e24', 3); }
  rect(ctx, -270, -70, 540, 20, '#2a2e24', 8, 5);
  shape(ctx, [[-120, -110], [-100, -190], [90, -190], [130, -110]], '#56623f', 7);
  rect(ctx, 110, -170, 260, 22, '#3e4630', 6, 5);
  circ(ctx, -20, -150, 16, '#c8282a', 4);
  if (fire) { const p = (t * 1.5) % 1; if (p < 0.2) { ctx.fillStyle = '#ffe28a'; ctx.beginPath(); ctx.ellipse(410, -160, 70 * (1 - p * 3), 30, 0, 0, Math.PI * 2); ctx.fill(); } }
  ctx.restore();
}
function ptank(ctx, x, y, s, t = 0, dir = -1, burning = false) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-250, -30], [-250, -110], [240, -110], [260, -40], [240, 0], [-240, 0]], '#6a6e66', 7);
  for (let i = 0; i < 8; i++) circ(ctx, -210 + i * 60, -26, 22, '#3a3c38', 4);
  rect(ctx, -100, -190, 210, 80, '#727670', 6, 7);
  rect(ctx, 100, -164, 220, 18, '#3a3c38', 5, 5);
  ctx.restore();
  if (burning) { fireFX(ctx, x, y - 120 * s, s * 0.9, t, 4); smokeFX(ctx, x, y - 200 * s, t, s * 1.4, 4, '30,28,26', 0.5); }
}
function truck(ctx, x, y, s, dir = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  rect(ctx, -260, -170, 300, 130, '#5a6040', 6, 6);
  rect(ctx, 40, -200, 140, 160, '#4f5638', 10, 6); rect(ctx, 70, -180, 80, 60, '#a8c0c8', 4, 4);
  rect(ctx, 170, -120, 90, 80, '#4f5638', 10, 6);
  for (const wx of [-170, 130]) circ(ctx, wx, -30, 38, '#2a2a2a', 6);
  ctx.restore();
}
function fieldKitchen(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  circ(ctx, -120, -40, 44, '#2a2a2a', 6); circ(ctx, 120, -40, 44, '#2a2a2a', 6);
  rect(ctx, -170, -190, 340, 140, '#4f5a3a', 20, 7);
  rect(ctx, -60, -260, 120, 80, '#3e4630', 10, 6);
  rect(ctx, 100, -340, 26, 150, '#2a2a2e', 4, 5);
  ctx.restore();
  smokeFX(ctx, x + 113 * s, y - 340 * s, t, 0.6 * s, 2, '200,200,200', 0.35);
}
function campfire(ctx, x, y, s, t) { for (let i = 0; i < 3; i++) rect(ctx, x - 60 * s + i * 30 * s, y - 10 * s, 70 * s, 14 * s, '#4a3020', 4, 3); fireFX(ctx, x, y - 6 * s, 0.45 * s, t, 9); }
function kotelok(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -40, -50, 80, 60, '#5a6040', 10, 5); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, -50, 40, Math.PI, 0); ctx.stroke(); ctx.restore(); }
function triangleLetter(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  shape(ctx, [[-120, -60], [120, -60], [0, 80]], '#f0e6cc', 5);
  ctx.strokeStyle = '#8a7a5a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-120, -60); ctx.lineTo(0, 10); ctx.lineTo(120, -60); ctx.stroke();
  ctx.fillStyle = '#3a3040'; ctx.font = 'italic 700 20px "Old Standard TT"'; ctx.textAlign = 'center'; ctx.fillText('Маме', 0, -20);
  ctx.restore();
}
function medallion(ctx, x, y, s, open = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rect(ctx, -26, -90, 52, 180, '#1a1814', 20, 6);
  if (open) { ctx.save(); ctx.translate(0, -120 * open); rect(ctx, -60, -40, 120, 70, '#efe6cc', 4, 4); ctx.fillStyle = '#3a3040'; ctx.font = 'italic 700 16px "Old Standard TT"'; ctx.textAlign = 'center'; ctx.fillText('ФИО, адрес', 0, 0); ctx.restore(); }
  ctx.restore();
}
function sandbagWall(ctx, x, y, n) { for (let i = 0; i < n; i++) for (let j = 0; j < 2; j++) rect(ctx, x + i * 100 + j * 50, y - j * 40, 100, 44, '#8a7a5a', 18, 4); }
function wire(ctx, x0, x1, y) { ctx.strokeStyle = '#2a2622'; ctx.lineWidth = 3; for (let x = x0; x < x1; x += 60) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 30, y - 60); ctx.lineTo(x + 60, y); ctx.stroke(); ctx.beginPath(); ctx.arc(x + 30, y - 40, 22, 0, Math.PI * 2); ctx.stroke(); } }
