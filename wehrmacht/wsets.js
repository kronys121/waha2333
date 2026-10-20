// Sets and props for the Wehrmacht video. Backgrounds take (ctx, st); far layers use parallax via layer().

function fachwerk(ctx, x, y, w, h, c = '#e8dcc0', roof = '#9a4a2e', ruined = false) {
  if (ruined) { ruinsWall(ctx, x, y, w, h, Math.floor(x), '#8a7a6a'); return; }
  rect(ctx, x, y - h, w, h, c, 2, 5);
  ctx.strokeStyle = '#5a3a24'; ctx.lineWidth = 9;
  ctx.beginPath(); for (let i = 0; i <= 4; i++) { ctx.moveTo(x + (w * i) / 4, y - h); ctx.lineTo(x + (w * i) / 4, y); }
  ctx.moveTo(x, y - h / 2); ctx.lineTo(x + w, y - h / 2); ctx.moveTo(x, y - h); ctx.lineTo(x + w / 4, y - h / 2); ctx.moveTo(x + w, y - h); ctx.lineTo(x + (3 * w) / 4, y - h / 2); ctx.stroke();
  for (let i = 0; i < 2; i++) rect(ctx, x + w * 0.3 + i * w * 0.24, y - h * 0.4, w * 0.14, h * 0.2, '#7a90a0', 2, 4);
  shape(ctx, [[x - 24, y - h], [x + w / 2, y - h - w * 0.55], [x + w + 24, y - h]], roof, 5);
}
function spire(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -60, -420, 120, 420, '#c8bca4', 2, 5); shape(ctx, [[-70, -420], [0, -640], [70, -420]], '#5a6a6a', 5); circ(ctx, 0, -330, 26, '#e8e0d0', 4); ctx.restore(); }
function cobble(ctx, y) { ctx.strokeStyle = 'rgba(60,50,40,0.35)'; ctx.lineWidth = 2; for (let yy = y + 20; yy < 1480; yy += 34) { ctx.beginPath(); ctx.moveTo(BX0, yy); ctx.lineTo(BX1, yy); ctx.stroke(); for (let x = BX0 + ((yy / 34) % 2) * 30; x < BX1; x += 60) { ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x, yy + 34); ctx.stroke(); } } }

function wTown(ctx, st, o = {}) {
  sky(ctx, o.evening ? '#8a7a8a' : o.night ? '#121624' : '#9cc0dc', o.evening ? '#e8b888' : o.night ? '#3a2e2a' : '#eee4cc');
  layer(ctx, st, 0.55, () => { spire(ctx, 1300, 700, 1); for (let i = 0; i < 4; i++) fachwerk(ctx, -400 + i * 700, 700, 300, 200, '#d8ccb0', '#8a4a32', o.ruined); });
  layer(ctx, st, 0.3, () => {
    for (let i = 0; i < 7; i++) fachwerk(ctx, -420 + i * 420, 800, 340, 300, ['#eadfc6', '#e2d2b4', '#efe6d2'][i % 3], ['#a8482a', '#8a3e2a', '#9a5236'][i % 3], o.ruined && i % 2 === 0);
    if (o.sheets) for (let i = 1; i < 7; i += 2) rect(ctx, -420 + i * 420 + 120, 560, 80, 120, '#f4f2ea', 4, 3);
    if (o.night || o.fire) for (let i = 0; i < 3; i++) { fireFX(ctx, 100 + i * 800, 800, 1.1, st.t, i); smokeFX(ctx, 100 + i * 800, 520, st.t, 1.5, i, '40,34,30', 0.5); }
  });
  ground(ctx, 800, o.night ? '#3a3632' : '#a89a86', o.night ? '#2e2a26' : '#9a8c78');
  cobble(ctx, 800);
}
function wWorkshop(ctx, st) {
  fillBg(ctx, '#a8865a');
  for (let x = -500; x < 2420; x += 90) rect(ctx, x, -400, 86, 1240, x % 180 ? '#b8946a' : '#a8845c', 2, 3);
  rect(ctx, 1250, 200, 360, 260, '#cfe2ee', 4, 6); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1430, 200); ctx.lineTo(1430, 460); ctx.moveTo(1250, 330); ctx.lineTo(1610, 330); ctx.stroke();
  for (let i = 0; i < 6; i++) rect(ctx, 200 + i * 60, 260, 16, 120 + (i % 3) * 30, '#7a7a80', 4, 3);
  ground(ctx, 840, '#8a6a44', '#7a5c3a');
  rect(ctx, 520, 760, 880, 60, '#9a6a3a', 6, 6); rect(ctx, 560, 820, 30, 180, '#7a5230', 4, 5); rect(ctx, 1330, 820, 30, 180, '#7a5230', 4, 5);
  dustFX(ctx, st.t, 40);
}
function wDance(ctx, st) {
  fillBg(ctx, '#5a3e3a');
  ctx.fillStyle = '#4a3230'; for (let x = -500; x < 2420; x += 160) ctx.fillRect(x, -400, 70, 1240);
  for (let i = 0; i < 9; i++) { const x = -200 + i * 300; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, 80); ctx.quadraticCurveTo(x + 150, 160, x + 300, 80); ctx.stroke(); for (let k = 0; k < 5; k++) shape(ctx, [[x + 20 + k * 56, 100 + Math.sin(k) * 20], [x + 50 + k * 56, 100 + Math.sin(k) * 20], [x + 35 + k * 56, 140 + Math.sin(k) * 20]], ['#c84a3a', '#e8c04a', '#4a7ac8'][k % 3], 3); }
  for (let i = 0; i < 4; i++) { const x = 200 + i * 520; const g = ctx.createRadialGradient(x, 220, 5, x, 220, 260); g.addColorStop(0, 'rgba(255,220,150,0.6)'); g.addColorStop(1, 'rgba(255,200,120,0)'); ctx.fillStyle = g; ctx.fillRect(x - 260, -40, 520, 520); circ(ctx, x, 220, 22, '#ffe6a0', 4); }
  rect(ctx, 1500, 520, 700, 120, '#6a4a32', 6, 6);
  ground(ctx, 800, '#8a5e3a', '#7a5232');
  ctx.strokeStyle = 'rgba(60,36,20,0.4)'; ctx.lineWidth = 3; for (let x = -500; x < 2420; x += 80) { ctx.beginPath(); ctx.moveTo(x, 800); ctx.lineTo(x + (x - 960) * 0.5, 1480); ctx.stroke(); }
}
function wField(ctx, st, o = {}) {
  sky(ctx, o.gray ? '#9aa0a6' : '#9cc4e0', o.gray ? '#d4d4cc' : '#f0e6c8');
  layer(ctx, st, 0.6, () => { shape(ctx, [[BX0, 700], [BX0, 600], [200, 560], [800, 610], [1400, 570], [BX1, 600], [BX1, 700]], o.autumn ? '#9a8a5a' : '#7a9a5a', 0); for (let i = 0; i < 12; i++) pine(ctx, -400 + i * 260, 640, 160, '#3a5a3a'); });
  ground(ctx, 700, o.autumn ? '#a8925e' : '#8aa860', o.autumn ? '#988250' : '#7a9854');
  if (o.ditch) { rect(ctx, BX0, 900, BX1 - BX0, 60, '#6a4a2e', 0, 5); ctx.fillStyle = '#5a3e26'; for (let x = -400; x < 2400; x += 120) { ctx.beginPath(); ctx.ellipse(x, 900, 60, 24, 0, Math.PI, 0); ctx.fill(); } }
}
function wBarracks(ctx, st) {
  fillBg(ctx, '#c8c0aa');
  ctx.fillStyle = '#b4ac96'; ctx.fillRect(BX0, 560, BX1 - BX0, 300);
  for (let i = 0; i < 3; i++) { rect(ctx, 100 + i * 680, 140, 260, 280, '#b8d0e0', 4, 6); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(230 + i * 680, 140); ctx.lineTo(230 + i * 680, 420); ctx.moveTo(100 + i * 680, 280); ctx.lineTo(360 + i * 680, 280); ctx.stroke(); }
  for (let i = 0; i < 6; i++) { const x = -300 + i * 460; rect(ctx, x, 520, 300, 30, '#6a5a4a', 4, 5); rect(ctx, x, 660, 300, 30, '#6a5a4a', 4, 5); rect(ctx, x + 10, 490, 280, 34, '#7a7a6e', 8, 4); rect(ctx, x + 10, 630, 280, 34, '#7a7a6e', 8, 4); rect(ctx, x - 10, 470, 16, 340, '#5a4a3a', 3, 4); rect(ctx, x + 294, 470, 16, 340, '#5a4a3a', 3, 4); }
  ground(ctx, 810, '#9a8a72', '#8a7a64');
}
function wLiving(ctx, st, o = {}) {
  fillBg(ctx, '#d8c8a0');
  ctx.fillStyle = '#c8b48a'; for (let x = -500; x < 2420; x += 120) ctx.fillRect(x, -400, 50, 1200);
  rect(ctx, 260, 180, 380, 300, o.night ? '#1a2030' : '#bcd4e4', 4, 6); ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(450, 180); ctx.lineTo(450, 480); ctx.moveTo(260, 330); ctx.lineTo(640, 330); ctx.stroke();
  rect(ctx, 1300, 200, 220, 160, '#8a6a4a', 4, 5); rect(ctx, 1320, 220, 180, 120, '#c8b090', 2, 3);
  ground(ctx, 820, '#8a6440', '#7a5636');
  rect(ctx, 800, 640, 520, 40, '#7a4e2c', 6, 6); rect(ctx, 830, 680, 26, 200, '#6a4224', 4, 5); rect(ctx, 1264, 680, 26, 200, '#6a4224', 4, 5);
  radioSet(ctx, 1060, 640, 1);
}
function radioSet(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -80, -150, 160, 150, '#3a2a1e', 16, 5); ctx.fillStyle = '#b89a6a'; ctx.beginPath(); ctx.arc(0, -90, 44, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke(); rect(ctx, -50, -36, 100, 20, '#e8d8a8', 4, 3); ctx.restore(); }
function wFrance(ctx, st) {
  sky(ctx, '#a0c8e8', '#f4ecd0');
  layer(ctx, st, 0.6, () => { shape(ctx, [[BX0, 700], [BX0, 580], [300, 520], [700, 580], [1200, 500], [1700, 560], [BX1, 520], [BX1, 700]], '#8ab070', 0); for (let i = 0; i < 6; i++) fachwerk(ctx, 100 + i * 360, 690, 120, 70, '#f0e8d8', '#b05a3a'); });
  ground(ctx, 700, '#c8b484', '#b8a474');
  for (let i = 0; i < 14; i++) { const x = -400 + i * 220; rect(ctx, x - 8, 380, 16, 340, '#6a5a3a', 4, 4); ctx.fillStyle = '#4a7a3a'; ctx.beginPath(); ctx.ellipse(x, 400, 42, 180, 0, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke(); }
  ctx.fillStyle = '#d8c494'; ctx.beginPath(); ctx.moveTo(BX0, 880); ctx.lineTo(BX1, 820); ctx.lineTo(BX1, 1000); ctx.lineTo(BX0, 1060); ctx.fill();
}
function wCafe(ctx, st) {
  sky(ctx, '#a8cce8', '#f4ead4');
  layer(ctx, st, 0.5, () => { // cathedral
    rect(ctx, 1050, 160, 520, 560, '#d8ccb4', 2, 6); rect(ctx, 1000, 0, 140, 720, '#d0c4aa', 2, 6); rect(ctx, 1480, 0, 140, 720, '#d0c4aa', 2, 6);
    circ(ctx, 1310, 330, 90, '#8aa0b8', 6); shape(ctx, [[1230, 720], [1230, 560], [1310, 480], [1390, 560], [1390, 720]], '#5a4e44', 5);
  });
  rect(ctx, -500, 120, 1300, 700, '#e8dcc4', 2, 6);
  for (let i = 0; i < 8; i++) shape(ctx, [[-500 + i * 160, 300], [-340 + i * 160, 300], [-360 + i * 160, 380], [-480 + i * 160, 380]], i % 2 ? '#c83a3a' : '#f0ead8', 4);
  rect(ctx, -300, 440, 260, 300, '#6a8aa0', 3, 5); rect(ctx, 200, 440, 260, 300, '#6a8aa0', 3, 5);
  ground(ctx, 800, '#b8a890', '#a89880'); cobble(ctx, 800);
}
function cafeTable(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -10, -200, 20, 200, '#3a3a3a', 4, 4); rect(ctx, -110, -214, 220, 24, '#f0ead8', 10, 5); rect(ctx, -60, -10, 120, 14, '#3a3a3a', 4, 3); ctx.restore(); }
function wineGlass(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, [[-18, -70], [18, -70], [12, -36], [-12, -36]], '#a8243a', 3); rect(ctx, -2, -36, 4, 32, '#e8f0f0', 1, 2); rect(ctx, -14, -6, 28, 6, '#e8f0f0', 2, 2); ctx.restore(); }
function wBorder(ctx, st, o = {}) {
  sky(ctx, '#141a2a', '#3a3a4a');
  const fl = o.flash ? clamp(1 - (st.bt - o.flash) / 3) * (st.bt > o.flash ? 1 : 0) : 0;
  if (fl > 0) { const g = ctx.createLinearGradient(0, 300, 0, 760); g.addColorStop(0, `rgba(255,150,60,0)`); g.addColorStop(1, `rgba(255,170,80,${0.8 * fl * (0.7 + 0.3 * Math.sin(st.t * 30))})`); ctx.fillStyle = g; ctx.fillRect(BX0, 300, BX1 - BX0, 460); }
  layer(ctx, st, 0.5, () => { for (let i = 0; i < 18; i++) pine(ctx, -300 + i * 150, 720, 240 + (i % 3) * 50, '#10161a'); });
  ground(ctx, 740, '#24262a', '#1c1e22');
  rect(ctx, 1400, 560, 18, 260, '#c8c8c8', 3, 4); for (let k = 0; k < 6; k++) { ctx.fillStyle = k % 2 ? '#c83a3a' : '#e8e8e8'; ctx.fillRect(1402, 570 + k * 40, 14, 40); }
}
function wSteppe(ctx, st, o = {}) {
  sky(ctx, '#a8c8dc', '#f4e8c0');
  ground(ctx, 640, '#d8c078', '#c8b068');
  ctx.strokeStyle = '#b89a52'; ctx.lineWidth = 3; const r = rng(11); for (let i = 0; i < 200; i++) { const x = r() * 2900 - 500, y = 660 + r() * 800; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 6, y - 22); ctx.stroke(); }
  if (o.road) { ctx.fillStyle = '#c8aa7a'; ctx.beginPath(); ctx.moveTo(900, 640); ctx.lineTo(1020, 640); ctx.lineTo(1700, 1480); ctx.lineTo(200, 1480); ctx.fill(); }
  dustFX(ctx, st.t, 40);
}
function wMud(ctx, st) {
  sky(ctx, '#6a7078', '#a8aca8');
  layer(ctx, st, 0.5, () => { for (let i = 0; i < 20; i++) birch(ctx, -300 + i * 150, 660, 200 + (i % 3) * 40, 0.5); });
  ground(ctx, 680, '#5a4430', '#4a3828');
  ctx.fillStyle = '#3e2e20'; const r = rng(5); for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.ellipse(r() * 2900 - 500, 720 + r() * 700, 60 + r() * 120, 14 + r() * 16, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = 'rgba(150,160,170,0.5)'; for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.ellipse(r() * 2900 - 500, 760 + r() * 600, 50 + r() * 80, 10, 0, 0, Math.PI * 2); ctx.fill(); }
  rainFX(ctx, st.t, 140, 4);
}
function wSnow(ctx, st, o = {}) {
  sky(ctx, '#8a929e', '#dce2e8');
  layer(ctx, st, 0.55, () => { for (let i = 0; i < 26; i++) pine(ctx, -300 + i * 120, 660, 220 + (i % 4) * 40, '#3a4a44'); });
  ground(ctx, 680, '#f0f4f6', '#e0e6ec');
  if (o.wrecks) { for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(200 + i * 700, 820); ctx.rotate(-0.08 + i * 0.06); truck(ctx, 0, 0, 0.8, 1); ctx.restore(); shape(ctx, [[i * 700 - 40, 830], [i * 700 + 460, 830], [i * 700 + 420, 800], [i * 700, 800]], '#eef2f4', 0); } }
}
function wCage(ctx, st) {
  sky(ctx, '#b8b8b0', '#e8e0c8');
  ground(ctx, 660, '#9a8a62', '#8a7a56');
  for (let x = -400; x < 2420; x += 260) rect(ctx, x, 380, 16, 340, '#5a4a3a', 3, 4);
  ctx.strokeStyle = '#3a3632'; ctx.lineWidth = 3; for (let k = 0; k < 6; k++) { ctx.beginPath(); for (let x = -500; x < 2420; x += 20) ctx.lineTo(x, 400 + k * 52 + Math.sin(x * 0.2) * 3); ctx.stroke(); }
  ctx.fillStyle = '#3a3632'; for (let k = 0; k < 6; k++) for (let x = -490; x < 2420; x += 40) ctx.fillRect(x, 397 + k * 52, 6, 6);
}
function wFactory(ctx, st) {
  sky(ctx, '#6a5a50', '#b08868');
  layer(ctx, st, 0.4, () => { for (let i = 0; i < 6; i++) { rect(ctx, -300 + i * 460, -200, 40, 1000, '#4a4440', 2, 5); } ctx.strokeStyle = INK; ctx.lineWidth = 14; ctx.beginPath(); for (let i = 0; i < 6; i++) { ctx.moveTo(-280 + i * 460, -40); ctx.lineTo(180 + i * 460, 200); } ctx.stroke(); for (let i = 0; i < 3; i++) smokeFX(ctx, 300 + i * 600, 400, st.t, 1.3, i, '40,36,32', 0.4); });
  ruinsWall(ctx, -400, 860, 800, 600, 31, '#7a6a5e'); ruinsWall(ctx, 1500, 860, 900, 640, 32, '#7a6a5e');
  ground(ctx, 860, '#5a4e46', '#4e443c');
  const r = rng(8); for (let i = 0; i < 16; i++) { const x = r() * 2400 - 300, y = 900 + r() * 300; shape(ctx, [[x, y], [x + 50, y - 40], [x + 110, y]], '#4a3e36', 4); }
}
function ju52(ctx, x, y, s, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-420, -40], [-300, -90], [300, -100], [380, -60], [380, 0], [-300, 10]], '#6a6e64', 7);
  ctx.strokeStyle = 'rgba(40,40,40,0.4)'; ctx.lineWidth = 3; for (let i = -280; i < 300; i += 30) { ctx.beginPath(); ctx.moveTo(i, -90); ctx.lineTo(i, 4); ctx.stroke(); }
  shape(ctx, [[-120, -10], [240, -10], [300, 40], [-200, 40]], '#5e6258', 6);
  for (const [px, py] of [[380, -30], [60, 30]]) { circ(ctx, px, py, 30, '#3a3a3a', 5); ctx.save(); ctx.translate(px + 30, py); ctx.rotate(t * 30); rect(ctx, -6, -70, 12, 140, '#2a2a2a', 4, 3); ctx.restore(); }
  for (let i = 0; i < 5; i++) rect(ctx, -200 + i * 80, -70, 40, 26, '#a8c0c8', 4, 3);
  shape(ctx, [[-420, -40], [-470, -150], [-400, -150], [-360, -60]], '#62665c', 6);
  circ(ctx, -100, 80, 22, '#1e1e1e', 5); circ(ctx, 200, 80, 22, '#1e1e1e', 5);
  ctx.restore();
}
function wAirfield(ctx, st) {
  sky(ctx, '#7a8088', '#c8ccd0');
  ground(ctx, 680, '#e4e8ea', '#d4dadf');
  layer(ctx, st, 0.4, () => { for (let i = 0; i < 4; i++) smokeFX(ctx, 100 + i * 600, 640, st.t, 1.3, i, '50,46,42', 0.35); });
  snowFX(ctx, st.t, 70, 60, 3);
}
function wHospital(ctx, st) {
  fillBg(ctx, '#e4e0d4');
  ctx.fillStyle = '#d4d0c4'; ctx.fillRect(BX0, 520, BX1 - BX0, 300);
  for (let i = 0; i < 3; i++) { rect(ctx, 0 + i * 700, 120, 300, 300, '#cfe0ea', 4, 6); }
  ground(ctx, 820, '#b8b4a8', '#aaa69a');
  for (let i = 0; i < 4; i++) hospitalBed(ctx, -200 + i * 700, 960);
}
function hospitalBed(ctx, x, y) { rect(ctx, x - 200, y - 150, 400, 60, '#f4f2ec', 10, 5); rect(ctx, x - 210, y - 210, 20, 210, '#8a8e92', 4, 4); rect(ctx, x + 190, y - 180, 20, 180, '#8a8e92', 4, 4); rect(ctx, x - 190, y - 180, 90, 40, '#ffffff', 14, 4); }
function wSchool(ctx, st) {
  fillBg(ctx, '#c8bea6');
  rect(ctx, 300, 140, 1320, 500, '#2e3a32', 6, 8);
  ctx.strokeStyle = '#e8e4d8'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(380, 520); ctx.bezierCurveTo(700, 360, 900, 560, 1200, 300); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(1150, 290); ctx.lineTo(1200, 300); ctx.lineTo(1170, 340); ctx.stroke();
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(500 + i * 200, 300 + (i % 2) * 80, 20, 0, Math.PI * 2); ctx.stroke(); }
  ground(ctx, 820, '#8a7656', '#7a6a4c');
  for (let i = 0; i < 4; i++) rect(ctx, -100 + i * 600, 860, 360, 36, '#7a5a38', 6, 5);
}
function tiger(ctx, x, y, s, t = 0, dir = 1, burning = false) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-290, -30], [-290, -130], [270, -130], [300, -60], [270, 0], [-270, 0]], '#8a8460', 7);
  for (let i = 0; i < 8; i++) { circ(ctx, -240 + i * 66, -32, 32, '#4a4836', 5); }
  rect(ctx, -300, -80, 600, 22, '#3a3828', 8, 5);
  rect(ctx, -140, -230, 260, 100, '#948e68', 10, 7);
  rect(ctx, 110, -200, 360, 22, '#4a4836', 6, 5); rect(ctx, 460, -206, 30, 34, '#4a4836', 4, 4);
  ctx.restore();
  if (burning) { fireFX(ctx, x, y - 150 * s, s, t, 6); smokeFX(ctx, x, y - 240 * s, t, s * 1.5, 6, '30,28,26', 0.5); }
}
function wRear(ctx, st) {
  sky(ctx, '#9aa8b0', '#dcd8c8');
  layer(ctx, st, 0.5, () => { for (let i = 0; i < 4; i++) izba(ctx, -100 + i * 640, 700, 0.9, i === 2); for (let i = 0; i < 10; i++) birch(ctx, -300 + i * 300, 700, 300, 0.7); });
  ground(ctx, 700, '#9a8a6a', '#8a7a5a');
}
function signPost(ctx, x, y, text, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -10, -400, 20, 400, '#6a4a2a', 3, 4); rect(ctx, -150, -400, 300, 110, '#efe6d0', 4, 5); ctx.fillStyle = '#2a1e16'; ctx.font = '700 44px "Oswald"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, -345); ctx.restore(); }
function wCampYard(ctx, st, o = {}) {
  sky(ctx, o.winter ? '#8a929a' : '#a8b8c0', o.winter ? '#dce0e4' : '#e8e0c8');
  layer(ctx, st, 0.45, () => { for (let i = 0; i < 5; i++) { rect(ctx, -300 + i * 560, 480, 420, 220, '#6a5a48', 2, 5); shape(ctx, [[-320 + i * 560, 480], [-90 + i * 560, 400], [140 + i * 560, 480]], '#4a4038', 5); } rect(ctx, 1700, 260, 30, 440, '#4a3a2a', 3, 4); rect(ctx, 1640, 220, 150, 80, '#5a4a38', 3, 5); });
  ground(ctx, 700, o.winter ? '#e8ecf0' : '#9a8e70', o.winter ? '#d8dde2' : '#8a7e62');
  ctx.strokeStyle = '#3a3632'; ctx.lineWidth = 3; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(BX0, 600 + k * 30); ctx.lineTo(BX1, 600 + k * 30); ctx.stroke(); }
  if (o.winter) snowFX(ctx, st.t, 60, 20, 9);
}
function wBridge(ctx, st) {
  sky(ctx, '#a8bccc', '#ece4cc');
  ground(ctx, 700, '#8a9a6a', '#7a8a5a');
  ctx.fillStyle = '#6a8aa0'; ctx.fillRect(BX0, 820, BX1 - BX0, 700);
  rect(ctx, -200, 640, 2400, 50, '#8a7a6a', 4, 6);
  for (let i = 0; i < 6; i++) rect(ctx, -100 + i * 420, 690, 60, 300, '#7a6a5a', 4, 5);
  ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(800, 640); ctx.lineTo(900, 560); ctx.lineTo(1000, 640); ctx.stroke();
}
function dogTag(ctx, x, y, s, broken = 0, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const half = (dy) => { ctx.save(); ctx.translate(0, dy); const p = P(); p.ellipse(0, 0, 110, 70, 0, 0, Math.PI * 2); ctx.save(); ctx.clip(p); ctx.fillStyle = '#b8bcc0'; ctx.fillRect(-120, -80, 240, 160); ctx.restore(); ctx.restore(); };
  ctx.save(); ctx.beginPath(); ctx.rect(-130, -90, 260, 90); ctx.clip(); half(0); ctx.restore();
  ctx.save(); ctx.translate(0, broken * 120); ctx.beginPath(); ctx.rect(-130, 0, 260, 90); ctx.clip(); half(0); ctx.restore();
  ctx.strokeStyle = INK; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.ellipse(0, 0, 110, 70, 0, Math.PI, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, broken * 120, 110, 70, 0, 0, Math.PI); ctx.stroke();
  ctx.fillStyle = '#5a5e62'; for (const xx of [-60, -20, 20, 60]) { ctx.fillRect(xx - 8, -4, 16, 4); }
  ctx.font = '700 22px "Oswald"'; ctx.textAlign = 'center'; ctx.fillStyle = '#4a4e52'; ctx.fillText('Nr. 241', 0, -30); ctx.fillText('Nr. 241', 0, broken * 120 + 38);
  ctx.beginPath(); ctx.arc(-80, -40, 8, 0, Math.PI * 2); ctx.arc(80, -40, 8, 0, Math.PI * 2); ctx.fillStyle = '#2a2a2a'; ctx.fill();
  ctx.restore();
}
function envelope(ctx, x, y, s, rot = 0, text = 'Feldpost') { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); rect(ctx, -140, -90, 280, 180, '#efe6cc', 4, 5); ctx.strokeStyle = '#8a7a5a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-140, -90); ctx.lineTo(0, 10); ctx.lineTo(140, -90); ctx.stroke(); ctx.fillStyle = '#3a3040'; ctx.font = 'italic 700 26px "Old Standard TT"'; ctx.textAlign = 'center'; ctx.fillText(text, 0, 60); ctx.restore(); }
function postcard(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); rect(ctx, -200, -130, 400, 260, '#f4ecd8', 4, 5); rect(ctx, -180, -110, 360, 220, '#a8c4d8', 2, 3); shape(ctx, [[-60, 100], [-60, -20], [0, -70], [60, -20], [60, 100]], '#d8ccb4', 4); circ(ctx, 0, 10, 26, '#8aa0b8', 4); ctx.restore(); }
function pillTube(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -30, -110, 60, 220, '#e8e4dc', 10, 5); rect(ctx, -30, -40, 60, 70, '#c83a3a', 2, 4); ctx.fillStyle = '#fff'; ctx.font = '700 20px "Oswald"'; ctx.textAlign = 'center'; ctx.save(); ctx.rotate(-Math.PI / 2); ctx.fillText('PERVITIN', 4, 8); ctx.restore(); for (let i = 0; i < 3; i++) circ(ctx, 60 + i * 34, 90, 12, '#f4f2ec', 3); ctx.restore(); }
function skis(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 2; i++) { const p = P(); p.moveTo(-260, i * 30); p.lineTo(240, i * 30); p.quadraticCurveTo(290, i * 30, 300, i * 30 - 40); p.lineTo(290, i * 30 - 30); p.quadraticCurveTo(280, i * 30 + 14, 240, i * 30 + 14); p.lineTo(-260, i * 30 + 14); p.closePath(); strokeFill(ctx, p, '#a87a48', 5); } ctx.restore(); }
function scarf(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, [[-160, -60], [160, -60], [0, 100]], '#8a5a7a', 5); ctx.strokeStyle = '#c8a0b8'; ctx.lineWidth = 4; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-130 + i * 30, -50); ctx.lineTo(-10 + i * 10, 70); ctx.stroke(); } ctx.restore(); }
function panzerfaust(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); rect(ctx, -160, -10, 300, 20, '#6a6a40', 6, 5); ctx.beginPath(); ctx.ellipse(170, 0, 50, 30, 0, 0, Math.PI * 2); ctx.fillStyle = '#5a5a36'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
function riflePile(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 9; i++) { ctx.save(); ctx.rotate(-0.5 + i * 0.12); rect(ctx, -200, -8 - i * 6, 360, 16, i % 2 ? '#6a4224' : '#2a2a2e', 4, 4); ctx.restore(); } for (let i = 0; i < 5; i++) circ(ctx, -120 + i * 60, 20, 30, '#5e6454', 5); ctx.restore(); }
function potato(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(0, 0, 40, 28, 0.3, 0, Math.PI * 2); ctx.fillStyle = '#b8945a'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke(); ctx.fillStyle = '#7a5a30'; for (const [a, b] of [[-12, -6], [10, 8], [18, -10]]) { ctx.beginPath(); ctx.arc(a, b, 3, 0, Math.PI * 2); ctx.fill(); } ctx.restore(); }
function fence(ctx, x0, x1, y, h = 160) { for (let x = x0; x < x1; x += 46) rect(ctx, x, y - h, 32, h, '#8a6a46', 4, 4); rect(ctx, x0, y - h * 0.75, x1 - x0, 14, '#7a5a3a', 3, 4); rect(ctx, x0, y - h * 0.3, x1 - x0, 14, '#7a5a3a', 3, 4); }
function bread2(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -120, -70, 240, 80, '#8a5a2e', 30, 6); ctx.strokeStyle = '#5a3a1a'; ctx.lineWidth = 4; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-80 + i * 50, -66); ctx.lineTo(-60 + i * 50, -40); ctx.stroke(); } ctx.restore(); }
function mapBoard(ctx, x, y, s, t = 0, arrows = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -300, -200, 600, 400, '#e0d4b4', 4, 6); ctx.strokeStyle = '#6a8ab0'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-280, 100); ctx.bezierCurveTo(-100, 40, 60, 140, 280, 60); ctx.stroke(); ctx.strokeStyle = '#2a2a2a'; ctx.lineWidth = 10; for (let i = 0; i < arrows; i++) { const yy = -120 + i * 70, L = 140 + 260 * clamp(t); ctx.beginPath(); ctx.moveTo(-220, yy); ctx.lineTo(-220 + L, yy - 20); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-220 + L, yy - 20); ctx.lineTo(-250 + L, yy - 44); ctx.moveTo(-220 + L, yy - 20); ctx.lineTo(-246 + L, yy + 6); ctx.stroke(); } ctx.fillStyle = '#c83a3a'; ctx.beginPath(); ctx.arc(230, -110, 16, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
