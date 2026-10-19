// Horus project: palettes, characters, dark backgrounds and tragic UI. Builds on src/video/{core,chars,world}.js.

const ATP = (i) => window.CUES[i];
const PT = (k) => Math.max(0, window.CUES[window.PARA[k]] - 0.2); // paragraph start time
// local time of the first cue at/after the shot start whose text contains `text`
const _phCache = {};
function ph(s, text) {
  const t0 = s.t - s.lt;
  const key = text + '@' + t0.toFixed(2);
  if (_phCache[key] === undefined) {
    let found = 1e9;
    for (let i = 0; i < window.CUES.length; i++) {
      if (window.CUES[i] < t0 - 0.5) continue;
      if (window.CUE_TEXT[i].includes(text)) { found = window.CUES[i] - t0; break; }
    }
    _phCache[key] = found;
  }
  return _phCache[key];
}

// ---------- palettes ----------
const WING = { wing: '#f4f1ea', wingShade: '#d6d0c4' };
const LUNA = pal('ultra', { armor: '#dfe4e8', armorDark: '#aab3bb', trim: '#2a2a33', rim: '#2a2a33', mark: '#2a2a33', helm: '#dfe4e8', cape: '#3a3a44', eyeIris: '#c9a24a' });
const SOH = pal('ultra', { armor: '#3f7f70', armorDark: '#2c5b50', trim: '#c9a24a', rim: '#1a1a1a', mark: '#e8e2d0', helm: '#3f7f70', cape: '#2a2a2e', eyeIris: '#e8d070' });
const HORUS_LW = pal(LUNA, { skin: '#e8b890', hair: '#2a1a12', cape: '#e8e2d0', trim: '#c9a24a', rim: '#c9a24a' });
const HORUS_WM = pal(SOH, { armor: '#2e3a36', armorDark: '#1f2724', trim: '#c9a24a', rim: '#c9a24a', skin: '#e8b890', hair: '#2a1a12', cape: '#5a1a1a', eyeIris: '#ffd860' });
const HORUS_X = pal(SOH, { armor: '#1c1618', armorDark: '#0f0b0c', trim: '#a8842a', rim: '#7a1a14', skin: '#b8a090', hair: '#1a1010', cape: '#3a0a0a', eyeIris: '#ff3a1a', bone: '#d8cfb8' });
const EMPEROR = pal('ultra', { armor: '#e8c14a', armorDark: '#b08a2a', trim: '#fff3c4', rim: '#fff3c4', mark: '#b3262a', skin: '#e8c0a0', hair: '#2a1a12', cape: '#b3262a', laurel: '#fff3c4', eyeIris: '#b3262a' });
const SANG = pal('ultra', { armor: '#e8c14a', armorDark: '#b08a2a', trim: '#d8402f', rim: '#d8402f', skin: '#f0d0b0', hair: '#f0d080', ...WING });
const EREBUS = pal('ultra', { armor: '#6a1a1a', armorDark: '#4a1010', trim: '#c9a24a', rim: '#c9a24a', skin: '#e0b08a', mark: '#c9a24a' });
const BLACKL = pal('ultra', { armor: '#1e1e22', armorDark: '#111114', trim: '#c9a24a', rim: '#c9a24a', mark: '#c9a24a', skin: '#e0b08a', hair: '#1a1010', lens: '#ffd000', helm: '#1e1e22' });
const PRIMARCH = {
  dorn: pal('ultra', { armor: '#f2c230', armorDark: '#c9a020', trim: '#2a2a33', rim: '#2a2a33', skin: '#e8c0a0', hair: '#e8e2d0' }),
  khan: pal('ultra', { armor: '#eef0f2', armorDark: '#c9ced6', trim: '#b3262a', rim: '#b3262a', skin: '#d8a070', hair: '#1a1010' }),
  russ: pal('ultra', { armor: '#7f8c96', armorDark: '#5f6c76', trim: '#c9a24a', rim: '#c9a24a', skin: '#e8c0a0', hair: '#c88a3a' }),
  magnus: pal('ultra', { armor: '#b3262a', armorDark: '#7a1a1e', trim: '#c9a24a', rim: '#c9a24a', skin: '#e08a70', hair: '#c04a2a' }),
  fulgrim: pal('ultra', { armor: '#7a3fa0', armorDark: '#55287a', trim: '#c9a24a', rim: '#c9a24a', skin: '#f4e8e0', hair: '#f4f4f4' }),
  ferrus: pal('ultra', { armor: '#2a2a30', armorDark: '#1a1a1e', trim: '#c9ced6', rim: '#c9ced6', skin: '#d8b090', hair: '#2a1a12' }),
  vulkan: pal('ultra', { armor: '#2f7a3a', armorDark: '#1f5a2a', trim: '#c9a24a', rim: '#c9a24a', skin: '#1a1a1a', hair: '#1a1a1a' }),
  corax: pal('ultra', { armor: '#1e1e24', armorDark: '#121216', trim: '#eef0f2', rim: '#eef0f2', skin: '#e8e2d8', hair: '#0a0a0a' }),
  angron: pal('ultra', { armor: '#9a3a2a', armorDark: '#6a2418', trim: '#a8842a', rim: '#a8842a', skin: '#c08a6a', hair: '#1a1010' }),
  lorgar: pal('ultra', { armor: '#8a8a8a', armorDark: '#6a6a6a', trim: '#c9a24a', rim: '#c9a24a', skin: '#e0b08a', hair: '#1a1010' }),
};
const PM = (hair = 'short', extra = {}) => ({ plain: true, weapon: 'none', helmet: 'off', hair, cape: true, ...extra });
const HORUS = (stage = 'lw') => ({ plain: true, weapon: 'none', helmet: 'off', hair: 'bald', cape: true, eye: stage !== 'lw', eyeGlow: stage === 'x', spikes: stage === 'x', glowEyes: stage === 'x' });
const horusPal = (stage) => ({ lw: HORUS_LW, wm: HORUS_WM, x: HORUS_X })[stage];
const GANG = pal(HUMAN_PAL.serf, { shirt: '#4a4a52', pants: '#2e2e34', hair: '#2a2018', skin: '#c8a080' });
const YOUNG_HORUS_PAL = pal(HUMAN_PAL.kid, { shirt: '#5a5a62', pants: '#3a3a40', hair: '#2a1a12', scarf: '#7a2a2a', skin: '#e8b890' });

function horus(ctx, x, y, s, pose, stage = 'wm') { drawRig(ctx, rig('marine', HORUS(stage)), x, y, s, pose, horusPal(stage)); }
function emperor(ctx, x, y, s, pose = {}) { drawRig(ctx, rig('marine', { plain: true, weapon: 'none', helmet: 'off', hair: 'long', cape: true, laurel: true }), x, y, s, pose, EMPEROR); haloGlow(ctx, x, y - 560 * s, 140 * s); }
function sanguinius(ctx, x, y, s, pose = {}) { drawRig(ctx, rig('marine', { plain: true, weapon: 'none', helmet: 'off', hair: 'long', wings: true }), x, y, s, pose, SANG); }
function primarch(ctx, who, x, y, s, pose = {}) {
  const hair = { dorn: 'short', khan: 'topknot', russ: 'long', magnus: 'long', fulgrim: 'long', ferrus: 'bald', vulkan: 'bald', corax: 'long', angron: 'bald', lorgar: 'bald' }[who];
  drawRig(ctx, rig('marine', PM(hair, { cyclops: who === 'magnus', tattoo: who === 'lorgar', scar: who === 'angron' })), x, y, s, pose, PRIMARCH[who]);
}
function haloGlow(ctx, x, y, r) {
  const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r * 2.2);
  g.addColorStop(0, 'rgba(255,236,170,0.55)'); g.addColorStop(1, 'rgba(255,236,170,0)');
  ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = g; ctx.fillRect(x - r * 2.2, y - r * 2.2, r * 4.4, r * 4.4); ctx.restore();
}
function glow(ctx, x, y, r, color, a = 0.6) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color.replace('A', a)); g.addColorStop(1, color.replace('A', 0));
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

// ---------- dark grading ----------
let _grain = null;
function grain(ctx, a = 0.07) {
  if (!_grain) {
    _grain = document.createElement('canvas'); _grain.width = 480; _grain.height = 270;
    const g = _grain.getContext('2d'); const img = g.createImageData(480, 270); const r = rng(99);
    for (let i = 0; i < img.data.length; i += 4) { const v = r() * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
    g.putImageData(img, 0, 0);
  }
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'overlay';
  ctx.drawImage(_grain, 0, 0, W, H); ctx.restore();
}
function grade(ctx, color = '#1a0a10', a = 0.25, vig = 0.75) {
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = a; ctx.fillStyle = color; ctx.fillRect(0, 0, W, H);
  ctx.restore();
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); vignette(ctx, vig); ctx.restore();
  grain(ctx);
}
function embers(ctx, t, n = 50, color = '#ff8a3a', seed = 3) {
  const r = rng(seed);
  for (let i = 0; i < n; i++) {
    const x = (r() * W + t * 20 * (r() - 0.3)) % W, y = H - ((r() * H + t * (40 + r() * 60)) % (H + 40));
    ctx.globalAlpha = 0.4 + 0.6 * r(); ctx.fillStyle = color; ctx.fillRect(x, y, 3 + r() * 3, 3 + r() * 3);
  }
  ctx.globalAlpha = 1;
}

// location caption (bottom-left) and name tag
function place(ctx, text, lt, a = 0.3, sub) {
  const p = clamp((lt - a) / 0.8), q = clamp((lt - a - 5) / 1);
  const al = p * (1 - q);
  if (al <= 0) return;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = al;
  ctx.fillStyle = '#c9a24a'; ctx.fillRect(90, 930, 6, sub ? 100 : 64);
  ctx.font = '700 58px "Old Standard TT"'; ctx.fillStyle = '#f0e6d0'; ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 16;
  ctx.fillText(text, 120, 962);
  if (sub) { ctx.font = 'italic 400 34px "Old Standard TT"'; ctx.fillStyle = '#c9b89a'; ctx.fillText(sub, 122, 1012); }
  ctx.restore();
}
function nameTag(ctx, text, x, y, lt, a = 0.3, size = 40) {
  const al = clamp((lt - a) / 0.6) * (1 - clamp((lt - a - 4.5) / 0.8));
  if (al <= 0) return;
  ctx.save(); ctx.globalAlpha = al;
  ctx.font = `700 ${size}px "Old Standard TT"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.95)'; ctx.shadowBlur = 14; ctx.fillStyle = '#f0e6d0';
  ctx.fillText(text, x, y);
  ctx.restore();
}
// centred quote line for key moments
function bigLine(ctx, text, lt, a, d = 3.5, y = 540, size = 76, color = '#f0e6d0') {
  const al = clamp((lt - a) / 0.7) * (1 - clamp((lt - a - d) / 0.8));
  if (al <= 0) return;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = al;
  ctx.font = `700 ${size}px "Old Standard TT"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,1)'; ctx.shadowBlur = 24; ctx.fillStyle = color;
  ctx.fillText(text, W / 2, y);
  ctx.restore();
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
const H_LEVELS = ['Подкидыш с Хтонии', 'Первый найденный сын', 'Примарх Лунных Волков', 'Магистр Войны', 'Раненый', 'Предатель', 'Осаждающий Терру', 'Финал'];
function darkCard(ctx, n, lt) {
  ctx.fillStyle = '#07060a'; ctx.fillRect(0, 0, W, H);
  const g = ctx.createRadialGradient(W / 2, 560, 50, W / 2, 560, 900);
  g.addColorStop(0, `rgba(120,20,20,${0.15 + n * 0.04})`); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  embers(ctx, lt, 40, '#c9583a', n);
  const al = clamp(lt / 0.8);
  ctx.save(); ctx.globalAlpha = al; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = '700 40px "Old Standard TT"'; ctx.fillStyle = '#9a8a70';
  ctx.fillText('У Р О В Е Н Ь', W / 2, 330);
  ctx.font = '700 220px "Old Standard TT"'; ctx.fillStyle = '#c9a24a';
  ctx.shadowColor = 'rgba(200,120,40,0.5)'; ctx.shadowBlur = 40;
  ctx.fillText(ROMAN[n - 1], W / 2, 500);
  ctx.shadowBlur = 0;
  ctx.restore();
  const tp = clamp((lt - 0.7) / 0.9);
  ctx.save(); ctx.globalAlpha = tp; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = '700 80px "Old Standard TT"'; ctx.fillStyle = '#f0e6d0';
  ctx.fillText(H_LEVELS[n - 1], W / 2, 700 + (1 - tp) * 30);
  ctx.strokeStyle = '#7a1a14'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(W / 2 - 300 * tp, 780); ctx.lineTo(W / 2 + 300 * tp, 780); ctx.stroke();
  ctx.restore();
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = i < n ? '#c9a24a' : 'rgba(255,255,255,0.12)';
    ctx.beginPath(); ctx.arc(W / 2 - 175 + i * 50, 860, i === n - 1 ? 10 : 7, 0, Math.PI * 2); ctx.fill();
  }
  grain(ctx, 0.08);
}

// ---------- backgrounds ----------
function bgCthonia(ctx, t, o = {}) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, o.night ? '#0e1016' : '#2a2c32'], [0.7, o.night ? '#24262c' : '#6a6660'], [1, o.night ? '#2e3036' : '#9a8a70']]));
  // dust haze bands
  for (let i = 0; i < 4; i++) { ctx.fillStyle = `rgba(160,160,150,${0.08 + i * 0.03})`; ctx.fillRect(BX0, 200 + i * 120 + Math.sin(t * 0.3 + i) * 10, BX1 - BX0, 60); }
  // terraced quarry
  const cols = ['#5a5652', '#46423e', '#36322f', '#262321'];
  for (let i = 0; i < 4; i++) {
    const y = 560 + i * 110, inset = i * 180;
    ctx.fillStyle = cols[i]; ctx.strokeStyle = INK; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(BX0, y - 60); ctx.lineTo(-100 + inset, y); ctx.lineTo(2020 - inset, y); ctx.lineTo(BX1, y - 60); ctx.lineTo(BX1, BY1); ctx.lineTo(BX0, BY1); ctx.closePath(); ctx.fill(); ctx.stroke();
  }
  // derelict rigs
  for (const x of [160, 1650]) {
    ctx.strokeStyle = '#1a1a1c'; ctx.lineWidth = 10;
    ctx.beginPath(); ctx.moveTo(x, 520); ctx.lineTo(x + 60, 200); ctx.lineTo(x + 120, 520); ctx.moveTo(x + 20, 420); ctx.lineTo(x + 100, 420); ctx.moveTo(x + 40, 320); ctx.lineTo(x + 80, 320); ctx.stroke();
  }
  if (o.edge) { // the quarry edge the boy sits on
    shape(ctx, [[BX0, 1000], [BX0, 760], [700, 780], [1000, 820], [1060, 1080], [BX0, BY1]], '#3a3a3e', 6);
  }
}
function bgLab(ctx, t) {
  fillBg(ctx, '#0c1014');
  for (let i = 0; i < 5; i++) {
    const x = 220 + i * 370;
    const g = ctx.createLinearGradient(0, 200, 0, 860);
    g.addColorStop(0, 'rgba(120,220,200,0.35)'); g.addColorStop(1, 'rgba(120,220,200,0.08)');
    rect(ctx, x - 90, 240, 180, 560, '#1a2a2c', 80, 6);
    ctx.fillStyle = g; ctx.fillRect(x - 70, 270, 140, 500);
    ctx.fillStyle = 'rgba(20,40,40,0.8)'; ctx.beginPath(); ctx.ellipse(x, 560 + Math.sin(t + i) * 6, 30, 70, 0, 0, Math.PI * 2); ctx.fill();
    rect(ctx, x - 110, 800, 220, 60, '#2a2e32', 8, 6);
  }
  fillGround(ctx, 860, '#1a1e22', '#14181c');
}
function warpRift(ctx, x, y, r, t, c1 = 'rgba(160,60,220,A)', c2 = 'rgba(255,60,60,A)') {
  ctx.save(); ctx.translate(x, y);
  for (let i = 0; i < 6; i++) {
    ctx.rotate(t * 0.3 + i);
    ctx.strokeStyle = (i % 2 ? c1 : c2).replace('A', 0.5); ctx.lineWidth = 18 - i * 2;
    ctx.beginPath(); ctx.ellipse(0, 0, r * (1 - i * 0.12), r * 0.45 * (1 - i * 0.1), 0, 0, Math.PI * 1.4); ctx.stroke();
  }
  ctx.restore();
  glow(ctx, x, y, r * 1.3, c1, 0.4);
}
function capsule(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const p = P(); p.ellipse(0, 0, 70, 110, 0, 0, Math.PI * 2); strokeFill(ctx, p, '#9aa4b4', 7);
  rect(ctx, -40, -50, 80, 70, '#7fd3ff', 30, 5);
  ctx.restore();
}
function bgDavin(ctx, t) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#0e1410'], [1, '#2a3424']]));
  circ(ctx, 1500, 200, 110, '#9aa88a', 0);
  for (let i = 0; i < 8; i++) {
    const x = -200 + i * 320; ctx.strokeStyle = '#141a12'; ctx.lineWidth = 14 - (i % 3) * 3;
    ctx.beginPath(); ctx.moveTo(x, 800); ctx.lineTo(x + 20, 450); ctx.lineTo(x - 50, 340); ctx.moveTo(x + 15, 520); ctx.lineTo(x + 90, 420); ctx.stroke();
  }
  fillGround(ctx, 800, '#1e2a1c', '#18221a');
  ctx.fillStyle = 'rgba(140,170,110,0.12)';
  for (let i = 0; i < 5; i++) ctx.fillRect(BX0, 700 + i * 40 + Math.sin(t * 0.5 + i) * 12, BX1 - BX0, 30);
}
function bgTemple(ctx, t) {
  bgHall(ctx, t);
  ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(40,60,30,0.7)'; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); ctx.restore();
  // serpent sigil
  ctx.save(); ctx.translate(960, 300);
  ctx.strokeStyle = '#7a9a4a'; ctx.lineWidth = 16; ctx.lineCap = 'round';
  ctx.beginPath(); for (let a = 0; a < Math.PI * 3.5; a += 0.1) { const r = 30 + a * 22; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r * 0.8); } ctx.stroke();
  ctx.restore();
  for (let i = 0; i < 8; i++) candle(ctx, 300 + i * 190, 760, t, 1.2);
}
function bgIsstvan3(ctx, t, o = {}) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#1a2010'], [1, o.burn ? '#6a5a1a' : '#4a5a3a']]));
  const r = rng(6);
  for (let i = 0; i < 14; i++) {
    const x = -300 + i * 190, h = 200 + r() * 360;
    shape(ctx, [[x, 820], [x, 820 - h], [x + 40, 820 - h - 30], [x + 70, 820 - h + 20], [x + 140, 820 - h + 10], [x + 160, 820]], '#232a1c', 5);
  }
  fillGround(ctx, 820, '#2a3020', '#222818');
  if (o.haze) { ctx.fillStyle = `rgba(150,200,60,${o.haze})`; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); }
}
function bgIsstvan5(ctx, t) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#120808'], [1, '#4a1a12']]));
  for (let i = 0; i < 3; i++) shape(ctx, [[BX0, 760 + i * 70], [-100, 700 + i * 70], [500, 760 + i * 60], [1000, 690 + i * 70], [1500, 750 + i * 60], [2000, 700 + i * 70], [BX1, 740 + i * 70], [BX1, BY1], [BX0, BY1]], ['#1a1414', '#141010', '#0e0b0b'][i], 5);
  embers(ctx, t, 40, '#ff6a3a', 9);
}
function bgTerra(ctx, t, o = {}) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#1a0806'], [0.6, '#6a1e10'], [1, '#c0602a']]));
  glow(ctx, 960, 760, 900, 'rgba(255,140,60,A)', 0.35);
  // palace spires
  const r = rng(11);
  for (let i = 0; i < 16; i++) {
    const x = -300 + i * 170, h = 380 + r() * 420;
    shape(ctx, [[x, 820], [x, 820 - h], [x + 50, 820 - h - 90 - r() * 60], [x + 100, 820 - h], [x + 100, 820]], i % 2 ? '#3a2018' : '#2e1810', 5);
    ctx.fillStyle = '#ffb04a'; for (let j = 0; j < 5; j++) if (r() > 0.5) ctx.fillRect(x + 30, 820 - h + 40 + j * 70, 14, 22);
  }
  // great wall
  rect(ctx, BX0, 760, BX1 - BX0, 120, '#4a3424', 0, 6);
  for (let x = BX0; x < BX1; x += 90) rect(ctx, x, 730, 50, 40, '#4a3424', 0, 5);
  fillGround(ctx, 880, '#2a1a12', '#22140e');
  embers(ctx, t, 60, '#ffa04a', 12);
  if (o.ships) for (let i = 0; i < 6; i++) ship(ctx, ((i * 400 + t * 15) % 2600) - 300, 80 + (i % 3) * 70, 0.35, '#2a2a2e', 1);
}
function bgBridge(ctx, t, o = {}) {
  fillBg(ctx, '#0a0608');
  // great windows onto space and Terra
  for (let i = 0; i < 3; i++) {
    const x = 160 + i * 560;
    const p = P(); p.moveTo(x, 760); p.lineTo(x, 260); p.quadraticCurveTo(x, 80, x + 200, 40); p.quadraticCurveTo(x + 400, 80, x + 400, 260); p.lineTo(x + 400, 760); p.closePath();
    ctx.save(); ctx.clip(p);
    ctx.fillStyle = '#0b0b1e'; ctx.fillRect(x, 0, 400, 800);
    if (o.terra !== false) planet(ctx, 960 - (i - 1) * 520, 900, 420, '#6a3a2a', '#8a4a2a', { seed: 4 });
    ctx.restore();
    ctx.strokeStyle = '#3a2a2a'; ctx.lineWidth = 14; ctx.stroke(p);
  }
  for (let i = 0; i < 5; i++) rect(ctx, -60 + i * 520, 0, 80, 800, '#1a1214', 4, 6);
  fillGround(ctx, 800, '#1a1012', '#140c0e');
  glow(ctx, 960, 900, 900, 'rgba(160,20,20,A)', 0.25);
}
function bgThrone(ctx, t) {
  fillBg(ctx, '#0a0806');
  for (let i = 0; i < 30; i++) { ctx.strokeStyle = i % 2 ? '#3a3020' : '#2a2418'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(i * 70 - 100, -50); ctx.bezierCurveTo(i * 70, 300, 960 + (i - 15) * 10, 400, 960 + (i - 15) * 18, 520); ctx.stroke(); }
  glow(ctx, 960, 480, 700, 'rgba(255,220,140,A)', 0.4);
  shape(ctx, [[640, 900], [680, 300], [800, 160], [960, 100], [1120, 160], [1240, 300], [1280, 900]], '#8a6a2a', 8);
  rect(ctx, 760, 520, 400, 380, '#6a5020', 20, 7);
  fillGround(ctx, 900, '#2a2418', '#221c12');
}
function bgEye(ctx, t) {
  fillBg(ctx, '#0a0410');
  warpRift(ctx, 960, 540, 760, t, 'rgba(160,40,220,A)', 'rgba(220,40,80,A)');
  warpRift(ctx, 960, 540, 420, -t * 1.3);
  ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(960, 540, 160, 80, 0, 0, Math.PI * 2); ctx.fill();
}
function titan(ctx, x, y, s, t, color = '#3a2a24') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const step = Math.sin(t * 1.2) * 20;
  shape(ctx, [[-120, 0], [-90, -380 + step], [-40, -380 + step], [-60, 0]], color, 7);
  shape(ctx, [[120, 0], [90, -380 - step], [40, -380 - step], [60, 0]], color, 7);
  rect(ctx, -170, -640, 340, 280, color, 40, 7);
  rect(ctx, -70, -740, 140, 110, color, 30, 7);
  ctx.fillStyle = '#ffb04a'; ctx.fillRect(-40, -700, 80, 20);
  rect(ctx, -290, -600, 120, 300, color, 20, 7); rect(ctx, 170, -600, 120, 300, color, 20, 7);
  rect(ctx, -300, -320, 140, 80, '#1a1210', 10, 6); rect(ctx, 160, -320, 140, 80, '#1a1210', 10, 6);
  ctx.restore();
}
function daemon(ctx, x, y, s, t, color = '#8a1a1a') {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 3 + x) * 8); ctx.scale(s, s);
  shape(ctx, [[-80, 0], [-100, -220], [-150, -320], [-90, -280], [-50, -360], [0, -300], [50, -360], [90, -280], [150, -320], [100, -220], [80, 0]], color, 7);
  ctx.fillStyle = '#ffd040'; ctx.shadowColor = '#ffd040'; ctx.shadowBlur = 20;
  ctx.beginPath(); ctx.ellipse(-30, -250, 12, 7, 0.3, 0, Math.PI * 2); ctx.ellipse(30, -250, 12, 7, -0.3, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0; ctx.restore();
}
function eyeOfHorus(ctx, x, y, s, color = '#c9a24a', iris = '#7a1a14') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const ep = P(); ep.moveTo(-150, 0); ep.quadraticCurveTo(0, -120, 150, 0); ep.quadraticCurveTo(0, 100, -150, 0); ep.closePath();
  strokeFill(ctx, ep, color, 8);
  circ(ctx, 0, -4, 46, iris, 6); circ(ctx, 0, -4, 18, INK, 0);
  shape(ctx, [[-60, 50], [-30, 50], [-50, 130], [-90, 150]], color, 6);
  ctx.restore();
}
function virusBomb(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-20, -80], [20, -80], [24, 40], [0, 70], [-24, 40]], '#5a6a4a', 5);
  shape(ctx, [[-20, -80], [-40, -110], [-10, -90]], '#3a4a2a', 4); shape(ctx, [[20, -80], [40, -110], [10, -90]], '#3a4a2a', 4);
  ctx.restore();
}
function soldier(ctx, x, y, s, pose = {}, col = '#4a5a3a') {
  human(ctx, x, y, s, pose, { hair: 'buzz' }, pal(HUMAN_PAL.serf, { shirt: col, pants: '#3a3a30', hair: '#3a2a20' }));
}
function remembrancer(ctx, x, y, s, pose = {}, i = 0) {
  human(ctx, x, y, s, pose, { hair: ['long', 'bun', 'short'][i % 3], outfit: i % 2 ? 'dress' : 'plain' }, pal(HUMAN_PAL.citizen, { shirt: ['#6a4a7a', '#7a5a3a', '#3a5a7a'][i % 3], pants: '#2a2a30' }));
}

// copied from the first project's shot files (not loaded here)
const APOTH = pal('ultra', { armor: '#eef0f2', armorDark: '#c9ced6', helm: '#eef0f2', rim: '#2d5bd1', trim: '#d8402f' });
const CHAOS = pal('ultra', { armor: '#26262c', armorDark: '#16161a', trim: '#c9a24a', rim: '#c9a24a', lens: '#ffd000', mark: '#c9a24a' });
function drawFire(ctx, x, y, s, t, pal_) {
  for (const [color, k] of [[pal_.fire1, 1], [pal_.fire2, 0.7], [pal_.fire3, 0.4]]) {
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.moveTo(x - 70 * s * k, y);
    for (let i = 0; i <= 6; i++) ctx.lineTo(x - 70 * s * k + (140 * s * k * i) / 6, y - (i % 2 ? 160 : 70) * s * k * (0.85 + 0.15 * Math.sin(t * 9 + i * 2 + x)));
    ctx.lineTo(x + 70 * s * k, y); ctx.fill();
  }
}
