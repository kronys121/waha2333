// Characters, sets and props for the Emperor video. Sets draw in depth layers via depth() so the moving camera shows parallax.

// ---------- people (buildLandser from wehrmacht/folk.js + extra headwear) ----------
const EP = {
  tribe: { skin: '#d8a070', hair: '#2a1a10', shirt: '#9a7a4a', pants: '#7a5a3a', coat: '#8a6a40', boots: '#4a3020', belt: '#5a3a20', buckle: '#c9a24a', dress: '#8a5a3a', kerchief: '#b88a5a', hat: '#6a4a2a', hatBand: '#6a4a2a', paper: '#f4ead2', metal: '#8a8a8a', wood: '#7a4a28' },
  boy: { skin: '#d8a070', hair: '#1a1008', shirt: '#c8a870', pants: '#9a7a4a', boots: '#5a3a20', belt: '#5a3a20', buckle: '#c9a24a', paper: '#f4ead2' },
  mother: { skin: '#d8a070', hair: '#1a1008', shirt: '#8a4a3a', dress: '#7a3a2a', boots: '#4a3020', belt: '#4a3020', kerchief: '#c8a060', paper: '#f4ead2' },
  elder: { skin: '#c89060', hair: '#d8d8d0', shirt: '#7a6a5a', pants: '#5a4a3a', boots: '#3a2a1a', belt: '#3a2a1a', buckle: '#9a8a6a', coat: '#6a5a4a', paper: '#f4ead2' },
  babylon: { skin: '#d8a070', hair: '#1a1008', shirt: '#2a4a8a', pants: '#c8a040', coat: '#2a4a8a', boots: '#6a4a2a', belt: '#c8a040', buckle: '#f0d070', hat: '#f0d070', hatBand: '#c8a040', paper: '#f4ead2' },
  roman: { skin: '#e0b090', hair: '#2a1a10', shirt: '#b03a2a', pants: '#b03a2a', coat: '#b03a2a', boots: '#6a4a2a', belt: '#8a6a3a', buckle: '#d8b050', helmet: '#c8a040', hat: '#c8a040', hatBand: '#b03a2a', metal: '#9a9a9a', paper: '#f4ead2' },
  byzant: { skin: '#e0b090', hair: '#2a1a10', shirt: '#6a2a6a', pants: '#3a2a3a', coat: '#6a2a6a', boots: '#3a2a1a', belt: '#d8b050', buckle: '#f0d070', hat: '#d8b050', hatBand: '#d8b050', paper: '#f4ead2' },
  sage: { skin: '#e0b090', hair: '#3a2a1a', shirt: '#e8e0d0', pants: '#4a4a54', coat: '#3a3a44', boots: '#2a2018', belt: '#3a2a20', buckle: '#9a9a9a', hat: '#2a2a2e', hatBand: '#2a2a2e', paper: '#f4ead2' },
  modern: { skin: '#e0b090', hair: '#2a1a10', shirt: '#e8e8e8', pants: '#2a2a32', coat: '#4a4a54', boots: '#1a1a1a', belt: '#1a1a1a', buckle: '#9a9a9a', paper: '#f4ead2' },
  barb: { skin: '#c89070', hair: '#3a2a1a', shirt: '#5a4a3a', pants: '#3a3a30', coat: '#4a4038', boots: '#2a2018', belt: '#2a2018', buckle: '#8a8a8a', hat: '#3a3a3a', hatBand: '#3a3a3a', metal: '#4a4a4a', wood: '#5a3a20', paper: '#f4ead2' },
  mech: { skin: '#b8b8b0', hair: '#555', shirt: '#9a1a1a', pants: '#7a1414', coat: '#9a1a1a', boots: '#2a2a2a', belt: '#5a5a5a', buckle: '#c9a24a', hat: '#9a1a1a', hatBand: '#7a1414', metal: '#8a8a8a', paper: '#f4ead2' },
  psyker: { skin: '#c8b8a8', hair: '#3a3a3a', shirt: '#4a4a5a', pants: '#3a3a4a', coat: '#3a3a4a', boots: '#1a1a1a', belt: '#1a1a1a', buckle: '#8a8a8a', hat: '#2a2a34', hatBand: '#2a2a34', paper: '#f4ead2' },
  pilgrim: { skin: '#d8a888', hair: '#5a4a3a', shirt: '#8a7a6a', pants: '#5a4a3a', coat: '#6a5a4a', boots: '#3a2a1a', belt: '#3a2a1a', buckle: '#c9a24a', hat: '#6a5a4a', hatBand: '#6a5a4a', kerchief: '#6a5a4a', dress: '#6a5a4a', paper: '#f4ead2' },
};
function buildPerson(o = {}) {
  const base = buildLandser({ ...o, civil: true, side: 'civil', hat: ['hood', 'crest', 'turban', 'crown', 'circlet'].includes(o.hat) ? 'none' : o.hat });
  const parts = base.parts.slice();
  const add = (role, path, g, extra) => parts.push({ role, path, g, ...extra });
  const headCy = -396, headR = 46, hairTop = headCy - headR * 1.08;
  if (o.hat === 'hood') add('hat', poly([[-headR - 14, headCy + 60], [-headR - 16, headCy - 20], [0, hairTop - 26], [headR + 16, headCy - 20], [headR + 14, headCy + 60], [headR * 0.8, headCy + 40], [headR * 0.85, headCy - 14], [-headR * 0.85, headCy - 14], [-headR * 0.8, headCy + 40]]), 'head');
  if (o.hat === 'crest') { add('helmet', poly([[-56, hairTop + 40], [-52, hairTop - 10], [0, hairTop - 34], [52, hairTop - 10], [56, hairTop + 40], [44, hairTop + 30], [44, hairTop + 8], [-44, hairTop + 8], [-44, hairTop + 30]]), 'head'); add('hatBand', poly([[-60, hairTop - 26], [0, hairTop - 70], [60, hairTop - 26], [0, hairTop - 46]]), 'head'); }
  if (o.hat === 'turban') add('hat', el(0, hairTop + 4, 58, 34), 'head');
  if (o.hat === 'crown') add('hat', poly([[-46, hairTop + 14], [-46, hairTop - 28], [-24, hairTop - 6], [0, hairTop - 38], [24, hairTop - 6], [46, hairTop - 28], [46, hairTop + 14]]), 'head');
  if (o.hat === 'circlet') add('hat', rr(-48, hairTop + 10, 96, 12, 5), 'head');
  if (o.eyeGlow) add('eyeglow', null, 'head', { fn: (ctx) => { ctx.fillStyle = '#7fe0ff'; ctx.shadowColor = '#7fe0ff'; ctx.shadowBlur = 16; ctx.beginPath(); ctx.arc(14, headCy + 2, 8, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0; } });
  return { ...base, parts };
}
const _prig = {};
function person(ctx, x, y, s, pose = {}, o = {}, col = EP.tribe) { const k = JSON.stringify(o); drawRig(ctx, _prig[k] || (_prig[k] = buildPerson(o)), x, y, s, pose, { ...RA_DEF, ...col }); }
const boy = (ctx, x, y, s, pose = {}) => person(ctx, x, y, s, pose, { hair: 'short' }, EP.boy);
const mum = (ctx, x, y, s, pose = {}) => person(ctx, x, y, s, pose, { female: true, hat: 'kerchief' }, EP.mother);
const elder = (ctx, x, y, s, pose = {}, i = 0) => person(ctx, x, y, s, pose, { old: true, mustache: i % 2 === 0, coat: true, hat: i % 3 === 1 ? 'hood' : 'none' }, EP.elder);
const tribesman = (ctx, x, y, s, pose = {}, i = 0) => person(ctx, x, y, s, pose, { female: i % 3 === 1, hat: i % 3 === 1 ? 'kerchief' : 'none', mustache: i % 3 === 2, weapon: i % 3 === 0 ? 'shovel' : 'none' }, pal(EP.tribe, { shirt: ['#9a7a4a', '#7a5a3a', '#a88a5a'][i % 3], skin: ['#d8a070', '#c89060', '#e0b080'][i % 3] }));
// the Emperor as a man of each era (same face, dark long hair)
const ERA = { babylon: { hat: 'turban', coat: true }, roman: { hat: 'crest', weapon: 'none' }, byzant: { hat: 'circlet', coat: true }, sage: { hat: 'flat', coat: true }, modern: { hat: 'none', coat: true }, barb: { hat: 'hood', coat: true }, tribe: { hat: 'none' } };
function wanderer(ctx, era, x, y, s, pose = {}) { person(ctx, x, y, s, pose, { ...(ERA[era] || {}), hair: 'short' }, pal(EP[era] || EP.tribe, { hair: '#1a1008', skin: '#d8a878' })); }
const mech = (ctx, x, y, s, pose = {}) => person(ctx, x, y, s, pose, { hat: 'hood', coat: true, eyeGlow: true }, EP.mech);
const psyker = (ctx, x, y, s, pose = {}, i = 0) => person(ctx, x, y, s, { head: 0.2, ...pose }, { hat: 'hood', coat: true }, pal(EP.psyker, { skin: ['#c8b8a8', '#b8a898', '#d8c0a8'][i % 3] }));
const pilgrim = (ctx, x, y, s, pose = {}, i = 0) => person(ctx, x, y, s, pose, { hat: i % 2 ? 'hood' : 'kerchief', female: i % 2 === 0, coat: i % 2 === 1 }, pal(EP.pilgrim, { coat: ['#6a5a4a', '#5a4a5a', '#7a6a4a'][i % 3] }));

// ---------- Imperial figures (marine rigs) ----------
const THUNDER = pal('ultra', { armor: '#7a6a5a', armorDark: '#5a4a3a', trim: '#d8b050', rim: '#d8b050', mark: '#d8b050', helm: '#7a6a5a', lens: '#ffd060', cape: '#5a2a1a', skin: '#d8a070', hair: '#2a1a10' });
const CUSTOS = pal('ultra', { armor: '#e8c14a', armorDark: '#b08a2a', trim: '#b3262a', rim: '#fff3c4', mark: '#b3262a', helm: '#e8c14a', lens: '#2a2a33', cape: '#b3262a' });
const GODEMP = pal(EMPEROR, { skin: '#9a8a7a', hair: '#3a3430', armor: '#b89a4a', armorDark: '#8a7030', cape: '#6a2a24' });
const thunder = (ctx, x, y, s, pose = {}) => drawRig(ctx, rig('marine', { plain: true, weapon: 'bolter', helmet: 'off', hair: 'bald', scar: true }), x, y, s, pose, THUNDER);
const custodes = (ctx, x, y, s, pose = {}) => { drawRig(ctx, rig('marine', { plain: true, weapon: 'none', cape: true }), x, y, s, pose, CUSTOS); spear(ctx, x + 120 * s * (pose.flip ? -1 : 1), y, s); };
const astartes = (ctx, x, y, s, pose = {}, palk = 'ultra') => drawRig(ctx, rig('marine', { weapon: 'bolter' }), x, y, s, pose, PAL[palk] ? PAL[palk] : palk);
function godEmperor(ctx, x, y, s, pose = {}) { drawRig(ctx, rig('marine', { plain: true, weapon: 'none', helmet: 'off', hair: 'long', cape: true, laurel: true }), x, y, s, { blink: 1, ...pose }, GODEMP); }
function spear(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -8, -820, 16, 800, '#b08a2a', 4, 4); shape(ctx, [[-22, -820], [0, -930], [22, -820]], '#e8e4da', 4); ctx.restore(); }
function sword(ctx, x, y, s, rot = 0, fire = 0, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  if (fire > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = fire; for (let i = 0; i < 6; i++) { ctx.fillStyle = ['#ffb040', '#ffe080', '#ff7020'][i % 3]; ctx.beginPath(); ctx.ellipse(0, -260 - i * 40, 26 + Math.sin(t * 14 + i) * 8, 70, 0, 0, Math.PI * 2); ctx.fill(); } ctx.restore(); }
  shape(ctx, [[-14, -40], [-16, -480], [0, -540], [16, -480], [14, -40]], '#e8ecf0', 5);
  rect(ctx, -60, -46, 120, 22, '#d8b050', 6, 5); rect(ctx, -12, -24, 24, 90, '#5a2a1a', 6, 5);
  ctx.restore();
}

// ---------- props ----------
function sheep(ctx, x, y, s, t = 0, dir = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s); for (const lx of [-50, -20, 30, 60]) rect(ctx, lx, -70, 16, 70, '#3a3030', 6, 4); ctx.fillStyle = '#efeae0'; ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2; ctx.arc(Math.cos(a) * 70, -110 + Math.sin(a) * 40, 30, 0, Math.PI * 2); } ctx.fill(); ctx.beginPath(); ctx.ellipse(0, -110, 90, 52, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); rect(ctx, 70, -170 + Math.sin(t * 2) * 4, 50, 60, '#3a3030', 18, 4); ctx.restore(); }
function wolf(ctx, x, y, s, t = 0, dir = 1, a = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s); ctx.globalAlpha *= a; const b = Math.sin(t * 3) * 4; shape(ctx, [[-170, -40], [-120, -140 + b], [60, -150 + b], [130, -200 + b], [200, -170 + b], [230, -130], [170, -110], [140, -60], [100, 0], [80, -60], [-60, -70], [-100, 0], [-130, -60], [-210, -110]], '#2a2a32', 5); ctx.fillStyle = '#ffd040'; ctx.shadowColor = '#ffd040'; ctx.shadowBlur = 16; ctx.beginPath(); ctx.ellipse(175, -170 + b, 10, 6, 0.2, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
function tent(ctx, x, y, s, c = '#8a6a4a') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); shape(ctx, [[-180, 0], [0, -260], [180, 0]], c, 6); shape(ctx, [[-40, 0], [0, -120], [40, 0]], '#3a2a1a', 4); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, -260); ctx.lineTo(-20, -300); ctx.moveTo(0, -260); ctx.lineTo(24, -296); ctx.stroke(); ctx.restore(); }
function campfire2(ctx, x, y, s, t) { for (let i = 0; i < 3; i++) rect(ctx, x - 60 * s + i * 30 * s, y - 10 * s, 70 * s, 14 * s, '#4a3020', 4, 3); fireFX(ctx, x, y - 6 * s, 0.45 * s, t, 9); }
function stars(ctx, n = 160, seed = 3) { const r = rng(seed); for (let i = 0; i < n; i++) { ctx.fillStyle = `rgba(255,255,240,${0.3 + r() * 0.7})`; ctx.fillRect(BX0 + r() * (BX1 - BX0), BY0 + r() * 1100, 2 + r() * 2, 2 + r() * 2); } }
function scroll(ctx, x, y, s, lines = [], strike = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -300, -380, 600, 760, '#e8dcbc', 6, 6); rect(ctx, -330, -400, 660, 40, '#b89a6a', 20, 5); rect(ctx, -330, 360, 660, 40, '#b89a6a', 20, 5); ctx.fillStyle = '#3a2a1a'; ctx.font = '700 40px "Old Standard TT"'; ctx.textAlign = 'center'; lines.forEach((l, i) => { ctx.fillText(l, 0, -280 + i * 64); }); if (strike > 0) { ctx.fillStyle = '#1a1210'; for (let i = 0; i < 2; i++) { const yy = -280 + (i === 0 ? 1 : 10) * 64 - 14; ctx.fillRect(-240, yy, 480 * clamp(strike * 2 - i), 26); } } ctx.restore(); }
function banner2(ctx, x, y, s, c = '#c9a24a', t = 0, dark = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -6, -420, 12, 420, '#3a2a1a', 3, 4); const w = Math.sin(t * 3 + x) * 10; const col = dark > 0 ? `rgb(${Math.round(40 + 0.5 * (1 - dark) * 200)},20,20)` : c; shape(ctx, [[6, -410], [170, -400 + w], [160, -220 + w], [90, -250], [6, -230]], col, 5); ctx.restore(); }
function pyramid(ctx, x, y, s, c = '#d8c08a') { shape(ctx, [[x - 300 * s, y], [x, y - 320 * s], [x + 300 * s, y]], c, 6); }
function ziggurat(ctx, x, y, s, c = '#b8905a') { for (let i = 0; i < 4; i++) rect(ctx, x - (260 - i * 55) * s, y - (i + 1) * 70 * s, (520 - i * 110) * s, 70 * s, c, 2, 5); }
function colosseum(ctx, x, y, s) { rect(ctx, x - 300 * s, y - 280 * s, 600 * s, 280 * s, '#d8c8a8', 6, 6); ctx.fillStyle = '#7a6a5a'; for (let r = 0; r < 3; r++) for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.ellipse(x - 260 * s + i * 74 * s, y - 220 * s + r * 85 * s, 22 * s, 30 * s, 0, 0, Math.PI * 2); ctx.fill(); } }
function dome(ctx, x, y, s) { rect(ctx, x - 220 * s, y - 220 * s, 440 * s, 220 * s, '#e0c8a0', 4, 6); const p = P(); p.ellipse(x, y - 220 * s, 180 * s, 150 * s, 0, Math.PI, 0); strokeFill(ctx, p, '#8aa0a0', 6); for (const mx of [-300, 300]) rect(ctx, x + mx * s - 18 * s, y - 520 * s, 36 * s, 520 * s, '#e0d8c8', 4, 5); }
function castle(ctx, x, y, s) { rect(ctx, x - 200 * s, y - 260 * s, 400 * s, 260 * s, '#9a9488', 2, 6); for (const tx of [-220, 160]) { rect(ctx, x + tx * s, y - 380 * s, 60 * s, 380 * s, '#8a8478', 2, 6); shape(ctx, [[x + (tx - 10) * s, y - 380 * s], [x + (tx + 30) * s, y - 460 * s], [x + (tx + 70) * s, y - 380 * s]], '#5a3a3a', 5); } }
function factory(ctx, x, y, s, t) { for (let i = 0; i < 3; i++) shape(ctx, [[x - 300 * s + i * 200 * s, y], [x - 300 * s + i * 200 * s, y - 200 * s], [x - 200 * s + i * 200 * s, y - 280 * s], [x - 100 * s + i * 200 * s, y - 200 * s], [x - 100 * s + i * 200 * s, y]], '#6a4a3a', 5); rect(ctx, x + 300 * s, y - 500 * s, 50 * s, 500 * s, '#5a3a2a', 4, 5); smokeFX(ctx, x + 325 * s, y - 520 * s, t, 0.8 * s, 3, '60,56,52', 0.4); }
function rocket(ctx, x, y, s) { shape(ctx, [[x - 40 * s, y], [x - 40 * s, y - 360 * s], [x, y - 460 * s], [x + 40 * s, y - 360 * s], [x + 40 * s, y]], '#e8e8e8', 5); shape(ctx, [[x - 40 * s, y], [x - 90 * s, y], [x - 40 * s, y - 100 * s]], '#c83a3a', 4); shape(ctx, [[x + 40 * s, y], [x + 90 * s, y], [x + 40 * s, y - 100 * s]], '#c83a3a', 4); }
function skyscraper(ctx, x, y, s, h) { rect(ctx, x - 60 * s, y - h * s, 120 * s, h * s, '#7a8a9a', 2, 5); ctx.fillStyle = '#e8f0a0'; for (let j = 0; j < h / 50; j++) for (let k = 0; k < 3; k++) if ((j * 7 + k * 3 + x) % 5 > 1) ctx.fillRect(x - 46 * s + k * 34 * s, y - h * s + 20 * s + j * 50 * s, 18 * s, 24 * s); }
function gravestone(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const p = P(); p.moveTo(-50, 0); p.lineTo(-50, -110); p.quadraticCurveTo(0, -170, 50, -110); p.lineTo(50, 0); p.closePath(); strokeFill(ctx, p, '#9a948a', 5); ctx.restore(); }
function tree(ctx, x, y, s, grow = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -26, -380 * grow, 52, 380 * grow, '#5a3a24', 10, 5); ctx.fillStyle = '#4a7a3a'; ctx.strokeStyle = INK; ctx.lineWidth = 5; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc((i - 2) * 70 * grow, -380 * grow - (i % 2) * 60 * grow, 110 * grow, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); } ctx.restore(); }
function ship2(ctx, x, y, s, c = '#8a8070', dir = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s); shape(ctx, [[-400, -20], [-300, -90], [200, -100], [420, -30], [380, 30], [-300, 50]], c, 7); rect(ctx, -120, -170, 220, 90, c, 8, 6); for (let i = 0; i < 6; i++) ctx.fillStyle = '#ffd890', ctx.fillRect(-260 + i * 80, -40, 30, 14); ctx.fillStyle = 'rgba(140,200,255,0.8)'; ctx.beginPath(); ctx.ellipse(-420, 0, 40, 26, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
function capsulePod(ctx, x, y, s, n = 0, t = 0, label = true) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rect(ctx, -110, -40, 220, 60, '#3a3e44', 10, 6); const p = P(); p.ellipse(0, -230, 90, 190, 0, 0, Math.PI * 2); strokeFill(ctx, p, '#9aa4b4', 7); const g = ctx.createRadialGradient(0, -230, 10, 0, -230, 150); g.addColorStop(0, 'rgba(160,230,255,0.9)'); g.addColorStop(1, 'rgba(80,160,200,0.4)'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, -230, 64, 150, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = 'rgba(40,60,80,0.7)'; ctx.beginPath(); ctx.ellipse(0, -220 + Math.sin(t + n) * 6, 26, 50, 0, 0, Math.PI * 2); ctx.fill(); if (label) { ctx.fillStyle = '#d8c8a0'; ctx.font = '700 40px "Old Standard TT"'; ctx.textAlign = 'center'; ctx.fillText(ROMAN20[n] || '', 0, 4); } ctx.restore(); }
const ROMAN20 = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];
function beam(ctx, x, y, w, h, a = 0.8) { const g = ctx.createLinearGradient(x - w / 2, 0, x + w / 2, 0); g.addColorStop(0, 'rgba(255,230,160,0)'); g.addColorStop(0.5, `rgba(255,240,190,${a})`); g.addColorStop(1, 'rgba(255,230,160,0)'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(x - w / 2, y - h, w, h); ctx.restore(); }

// ---------- sets ----------
function setAnatolia(ctx, st, o = {}) {
  const night = o.night, winter = o.winter;
  fillBg(ctx, vg(ctx, -300, 900, night ? [[0, '#0a0c18'], [1, '#2a2a40']] : winter ? [[0, '#9aa4b0'], [1, '#e4e6e8']] : [[0, '#8ab8e0'], [0.7, '#f0d8a8'], [1, '#f4c890']]));
  if (night) stars(ctx, 180, 4);
  depth(ctx, st, 0.6, () => { shape(ctx, [[BX0, 700], [BX0, 520], [200, 420], [600, 500], [1000, 380], [1400, 470], [1800, 400], [BX1, 480], [BX1, 700]], night ? '#1e1e2a' : winter ? '#c8ccd0' : '#b89a6a', 5); });
  depth(ctx, st, 0.35, () => { shape(ctx, [[BX0, 760], [BX0, 640], [400, 600], [900, 660], [1500, 600], [BX1, 650], [BX1, 760]], night ? '#262634' : winter ? '#dde0e4' : '#a88a5a', 5); if (o.tents) for (let i = 0; i < 4; i++) tent(ctx, 200 + i * 520, 700, 0.8, ['#8a6a4a', '#9a7a52', '#7a5a3a'][i % 3]); });
  fillGround(ctx, 760, night ? '#2a2a36' : winter ? '#eef0f2' : '#c8a870', night ? '#22222e' : winter ? '#e0e4e8' : '#b89860');
  if (winter) snowFX(ctx, st.t, 90, 40, 7);
}
function fgGrass(ctx, st, c = '#6a5a3a') { depth(ctx, st, -0.35, () => { const r = rng(9); ctx.fillStyle = c; for (let i = 0; i < 26; i++) { const x = -300 + i * 110 + r() * 40; ctx.beginPath(); ctx.moveTo(x, 1300); ctx.lineTo(x + 18, 1080 - r() * 120); ctx.lineTo(x + 36, 1300); ctx.fill(); } }); }
function fgRocks(ctx, st, c = '#3a3430') { depth(ctx, st, -0.4, () => { shape(ctx, [[-400, 1400], [-300, 1080], [-100, 1040], [100, 1120], [200, 1400]], c, 6); shape(ctx, [[1800, 1400], [1900, 1060], [2150, 1010], [2350, 1100], [2400, 1400]], c, 6); }); }
function setDream(ctx, st) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#14102a'], [1, '#3a2a5a']]));
  depth(ctx, st, 0.5, () => { const r = rng(2); for (let i = 0; i < 40; i++) { ctx.fillStyle = `rgba(255,220,160,${0.2 + r() * 0.4})`; ctx.beginPath(); ctx.arc(r() * 2400 - 300, r() * 1100, 2 + r() * 6, 0, Math.PI * 2); ctx.fill(); } });
}
function setEras(ctx, st, scroll2 = 0) {
  // a long road through history; world x grows with time (0 = ancient, 6000 = modern)
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#9ac0e0'], [1, '#f0e0c0']]));
  depth(ctx, st, 0.5, () => { ctx.translate(-scroll2 * 0.5, 0); for (let i = 0; i < 12; i++) shape(ctx, [[i * 700 - 600, 760], [i * 700 - 300, 560 + (i % 3) * 30], [i * 700, 760]], '#c0b090', 0); });
  depth(ctx, st, 0.25, () => {
    ctx.translate(-scroll2 * 0.75, 0);
    pyramid(ctx, 300, 760, 1); ziggurat(ctx, 1100, 760, 1); colosseum(ctx, 2000, 760, 1); dome(ctx, 2900, 760, 1); castle(ctx, 3700, 760, 1); factory(ctx, 4500, 760, 1, st.t); for (let i = 0; i < 5; i++) skyscraper(ctx, 5100 + i * 140, 760, 1, 300 + (i % 3) * 140); rocket(ctx, 6000, 760, 1);
  });
  fillGround(ctx, 760, '#c8b080', '#b8a070');
  ctx.fillStyle = '#a89060'; ctx.fillRect(BX0, 900, BX1 - BX0, 60);
}
function setWasteland(ctx, st, o = {}) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#2a2a1a'], [0.7, '#7a7a3a'], [1, '#a8a050']]));
  depth(ctx, st, 0.55, () => { const r = rng(14); for (let i = 0; i < 12; i++) { const x = -300 + i * 230, h = 200 + r() * 300; shape(ctx, [[x, 760], [x, 760 - h], [x + 60, 760 - h - 40], [x + 120, 760 - h + 30], [x + 180, 760]], '#3a3a2a', 5); } smokeFX(ctx, 400, 600, st.t, 1.4, 1, '80,80,40', 0.35); smokeFX(ctx, 1500, 600, st.t, 1.4, 2, '80,80,40', 0.35); });
  fillGround(ctx, 760, '#6a6a3a', '#5a5a30');
  dustFX(ctx, st.t, 60, 5, '220,230,120');
}
function setHimalaya(ctx, st, o = {}) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#6a8ab8'], [1, '#e8eef4']]));
  depth(ctx, st, 0.6, () => { for (let i = 0; i < 6; i++) { const x = -400 + i * 520; shape(ctx, [[x, 800], [x + 260, 260 + (i % 2) * 120], [x + 520, 800]], '#8a96a8', 6); shape(ctx, [[x + 190, 400 + (i % 2) * 120], [x + 260, 260 + (i % 2) * 120], [x + 330, 400 + (i % 2) * 120], [x + 290, 380 + (i % 2) * 120], [x + 260, 420], [x + 230, 380 + (i % 2) * 120]], '#f4f6f8', 4); } });
  if (o.palace) depth(ctx, st, 0.35, () => { const pp = o.palace; for (let i = 0; i < 9; i++) { const x = 300 + i * 160, h = (260 + (i % 3) * 120) * pp; rect(ctx, x, 780 - h, 120, h, '#d8c8a0', 4, 5); shape(ctx, [[x - 10, 780 - h], [x + 60, 780 - h - 90 * pp], [x + 130, 780 - h]], '#c9a24a', 5); } });
  fillGround(ctx, 800, '#c8ccd4', '#b8bcc4');
}
function setMars(ctx, st) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#3a1a14'], [1, '#c0603a']]));
  depth(ctx, st, 0.6, () => { circ(ctx, 1600, 160, 50, '#d8c8b0', 0); for (let i = 0; i < 8; i++) { const x = -300 + i * 340; rect(ctx, x, 460, 140, 340, '#5a2a20', 4, 5); rect(ctx, x + 40, 300, 60, 160, '#4a221a', 4, 5); } smokeFX(ctx, 400, 400, st.t, 1.5, 3, '40,20,16', 0.4); smokeFX(ctx, 1400, 400, st.t, 1.5, 4, '40,20,16', 0.4); });
  depth(ctx, st, 0.3, () => { titan(ctx, 1500, 800, 0.7, st.t, '#6a2a20'); });
  fillGround(ctx, 800, '#a04a2a', '#8a3a22');
}
function setSpace(ctx, st, o = {}) {
  fillBg(ctx, '#05060e'); stars(ctx, 260, 6);
  depth(ctx, st, 0.7, () => { const g = ctx.createRadialGradient(1400, 300, 10, 1400, 300, 900); g.addColorStop(0, o.warp ? 'rgba(160,60,200,0.35)' : 'rgba(80,100,200,0.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); });
  if (o.planet) depth(ctx, st, 0.4, () => planet(ctx, o.planet[0], o.planet[1], o.planet[2], o.planet[3] || '#5a7a9a', o.planet[4] || '#7a9aba', { seed: 3 }));
}
function setPalaceHall(ctx, st, o = {}) {
  fillBg(ctx, '#1a140c');
  depth(ctx, st, 0.45, () => { for (let i = 0; i < 9; i++) { const x = -300 + i * 330; rect(ctx, x, -200, 120, 1100, '#5a4a2a', 4, 6); rect(ctx, x - 20, 860, 160, 60, '#6a5a3a', 4, 6); } for (let i = 0; i < 4; i++) banner2(ctx, 0 + i * 640, 500, 1.2, '#b3262a', st.t); });
  fillGround(ctx, 900, '#3a2e1a', '#2e2414');
  glow(ctx, 960, 500, 900, 'rgba(255,210,130,A)', 0.25);
}
function setWebway(ctx, st, o = {}) {
  fillBg(ctx, '#04060a');
  const crack = o.crack || 0;
  depth(ctx, st, 0.3, () => { for (let i = 12; i > 0; i--) { const r = i * 110; ctx.strokeStyle = `rgba(${160 + i * 6},${220 - i * 5},255,${0.15 + (12 - i) * 0.05})`; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(960, 540, r * 1.6, r, 0, 0, Math.PI * 2); ctx.stroke(); } });
  if (crack > 0) { ctx.save(); ctx.strokeStyle = '#ff3a3a'; ctx.shadowColor = '#ff3a3a'; ctx.shadowBlur = 24; ctx.lineWidth = 8; const r = rng(4); for (let k = 0; k < 6; k++) { ctx.beginPath(); let x = 960, y = 540; ctx.moveTo(x, y); for (let j = 0; j < 8 * crack; j++) { x += (r() - 0.5) * 220 + Math.cos(k) * 90; y += (r() - 0.5) * 160 + Math.sin(k) * 60; ctx.lineTo(x, y); } ctx.stroke(); } ctx.restore(); }
}
function setFenris(ctx, st) { fillBg(ctx, vg(ctx, -300, 900, [[0, '#2a3448'], [1, '#c8d4e0']])); depth(ctx, st, 0.5, () => { for (let i = 0; i < 20; i++) pine(ctx, -300 + i * 150, 760, 300 + (i % 3) * 80, '#2a3a3a'); }); fillGround(ctx, 760, '#eef2f6', '#dde4ea'); snowFX(ctx, st.t, 140, 160, 3, 1.2); }
function setBarbarus(ctx, st) { fillBg(ctx, vg(ctx, -300, 900, [[0, '#1a2a1a'], [1, '#5a7a4a']])); depth(ctx, st, 0.5, () => { for (let i = 0; i < 5; i++) shape(ctx, [[-400 + i * 600, 800], [-200 + i * 600, 300], [i * 600, 800]], '#2a3a2a', 5); }); fillGround(ctx, 800, '#3a4a2a', '#324224'); ctx.fillStyle = 'rgba(160,200,100,0.25)'; for (let i = 0; i < 6; i++) ctx.fillRect(BX0, 400 + i * 80 + Math.sin(st.t * 0.5 + i) * 20, BX1 - BX0, 50); }
function setPit(ctx, st) { fillBg(ctx, '#2a1a12'); depth(ctx, st, 0.4, () => { for (let r = 0; r < 3; r++) for (let i = 0; i < 16; i++) person(ctx, -200 + i * 160 + r * 50, 520 + r * 90, 0.35, { armR: -2 + Math.sin(st.t * 6 + i) * 0.5 }, { hat: 'none', mustache: i % 2 === 0 }, EP.barb); }); rect(ctx, BX0, 760, BX1 - BX0, 40, '#4a3020', 0, 6); fillGround(ctx, 800, '#8a6a4a', '#7a5a3a'); }
function setTemple(ctx, st, o = {}) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, o.night ? '#14121a' : '#c8b8a0'], [1, o.night ? '#3a2a24' : '#e8d8b8']]));
  depth(ctx, st, 0.4, () => { rect(ctx, 460, 220, 1000, 560, '#d8ccb0', 2, 6); shape(ctx, [[420, 220], [960, 40], [1500, 220]], '#b8a888', 6); for (let i = 0; i < 6; i++) rect(ctx, 520 + i * 170, 260, 60, 520, '#e8e0cc', 4, 5); rect(ctx, 860, 520, 200, 260, '#3a2a1a', 4, 5); if (o.boards) { ctx.save(); ctx.translate(960, 640); for (const r2 of [-0.5, 0.5]) { ctx.save(); ctx.rotate(r2); rect(ctx, -170, -16, 340, 32, '#8a6a42', 4, 5); ctx.restore(); } ctx.restore(); } if (o.icon) { circ(ctx, 960, 150, 70, '#e8c14a', 6); haloGlow(ctx, 960, 150, 60); } });
  fillGround(ctx, 780, o.night ? '#2a2420' : '#b8a888', o.night ? '#221c18' : '#a89878');
}
function setAmphi(ctx, st) { fillBg(ctx, vg(ctx, -300, 900, [[0, '#4a5a7a'], [1, '#d8c8b0']])); depth(ctx, st, 0.4, () => { for (let r = 0; r < 4; r++) { ctx.fillStyle = ['#c8b898', '#b8a888', '#a89878', '#988868'][r]; ctx.beginPath(); ctx.ellipse(960, 860, 1200 - r * 180, 420 - r * 70, 0, Math.PI, 0); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke(); } }); fillGround(ctx, 860, '#d8c8a8', '#c8b898'); }
function setUllanor(ctx, st) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#3a2a3a'], [1, '#d89a5a']]));
  depth(ctx, st, 0.55, () => { for (let r = 0; r < 4; r++) for (let i = 0; i < 40; i++) { ctx.fillStyle = ['#3a5ad1', '#dfe4e8', '#b3262a', '#2a2a30'][(i + r) % 4]; ctx.fillRect(-400 + i * 70 + (r % 2) * 30, 600 + r * 40, 40, 70); } for (let i = 0; i < 10; i++) banner2(ctx, -200 + i * 280, 640, 0.8, ['#c9a24a', '#dfe4e8', '#b3262a'][i % 3], st.t); });
  depth(ctx, st, 0.2, () => { rect(ctx, 460, 760, 1000, 120, '#6a5a4a', 6, 6); for (let i = 0; i < 8; i++) rect(ctx, 480 + i * 124, 720, 100, 40, '#7a6a5a', 4, 5); });
  fillGround(ctx, 880, '#5a4a3a', '#4a3a2a');
}
function setCorridor(ctx, st, o = {}) {
  fillBg(ctx, '#0a0608');
  const sh = o.shift || 0;
  for (let i = 10; i > 0; i--) { const s2 = i / 10, w = 1500 * s2, h = 900 * s2; const off = Math.sin(st.t * 0.8 + i) * 60 * sh; ctx.strokeStyle = `rgba(${90 + i * 10},20,20,${0.9 - i * 0.05})`; ctx.lineWidth = 16 * s2; ctx.beginPath(); ctx.moveTo(960 - w / 2 + off, 540 + h / 2); ctx.lineTo(960 - w / 2 + off, 540 - h / 2 + 120 * s2); ctx.quadraticCurveTo(960 + off, 540 - h / 2 - 140 * s2, 960 + w / 2 + off, 540 - h / 2 + 120 * s2); ctx.lineTo(960 + w / 2 + off, 540 + h / 2); ctx.stroke(); }
  fillGround(ctx, 900, '#1a0e0e', '#140a0a');
  glow(ctx, 960, 500, 700, 'rgba(160,30,30,A)', 0.3);
}
function setThroneRoom(ctx, st, o = {}) { bgThrone(ctx, st.t); if (o.dust) dustFX(ctx, st.t, 60, 8, '255,230,180'); }
