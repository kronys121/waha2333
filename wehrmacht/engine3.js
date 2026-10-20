// Engine v3: a paragraph is a list of staged beats. Each beat is its own composition (set, actors, action)
// with one fixed framing and a slow push-in, so cuts change the picture instead of the camera hunting around.
// Uses PT, ph, layer, chron, letterLine and particles from redarmy/engine2.js.

// framings: wide, medium shot of a figure, close-up of a face, two-shot
const WIDE = [960, 540, 1];
const MS = (x, feetY, s = 1) => [x, feetY - 250 * s, Math.min(2.6, 1.3 / s)];
const CU = (x, feetY, s = 1) => [x, feetY - 370 * s, Math.min(3.4, 2.1 / s)];
const TWO = (x1, x2, feetY, s = 1) => [(x1 + x2) / 2, feetY - 260 * s, Math.min(1.25 / s, 1800 / (Math.abs(x2 - x1) + 520 * s))];

const STAGES = [];
function stage(k, beats, o = {}) {
  const sc = { k, beats, ...o };
  STAGES.push({ t0: PT(k), sc });
  shot(PT(k), (ctx, s) => drawStage(ctx, s, sc), { fade: o.fade ? 0.6 : 0 });
}
// a stage that is not tied to a paragraph start (extra cut inside a long paragraph)
function stageAt(t0, beats, o = {}) {
  const sc = { k: -1, beats, ...o };
  shot(t0, (ctx, s) => drawStage(ctx, s, sc), { fade: o.fade ? 0.6 : 0 });
}

function beatStarts(s, o) {
  const t0 = s.t - s.lt, dur = s.dur, n = o.beats.length;
  const cues = window.CUES.filter((c) => c > t0 + 1.0 && c < t0 + dur - 1.0).map((c) => c - t0 - 0.1);
  const starts = [0];
  for (let i = 1; i < n; i++) {
    const b = o.beats[i];
    let t = null;
    if (typeof b.at === 'number') t = b.at;
    else if (typeof b.at === 'string') { const v = ph(s, b.at); if (v < 1e8) t = v - 0.1; }
    if (t == null) {
      const target = (dur * i) / n;
      t = cues.length ? cues.reduce((a, c) => (Math.abs(c - target) < Math.abs(a - target) ? c : a)) : target;
    }
    starts.push(Math.min(dur - 0.5, Math.max(starts[i - 1] + 1.0, t)));
  }
  return starts;
}

function clampCam(x, y, z) {
  const hw = 960 / z, hh = 540 / z;
  return [clamp(x, BX0 + hw, BX1 - hw), clamp(y, BY0 + hh, BY1 - hh), z];
}

function drawStage(ctx, s, o) {
  if (!o._st) o._st = beatStarts(s, o);
  const S = o._st;
  let i = 0; while (i + 1 < S.length && S[i + 1] <= s.lt) i++;
  const b = o.beats[i];
  const bt = s.lt - S[i], bdur = (i + 1 < S.length ? S[i + 1] : s.dur) - S[i];
  const p = clamp(bt / Math.max(0.5, bdur));
  const c = b.cam || o.cam || WIDE;
  const push = b.push ?? o.push ?? 0.06;
  const pan = b.pan || [0, 0];
  let z = c[2] * (1 + push * ease.io(p));
  let x = c[0] + pan[0] * ease.io(p), y = c[1] + pan[1] * ease.io(p);
  // whip entrance
  const tr = b.tr ?? (i === 0 ? o.tr : 'cut');
  let whip = 0; if (tr === 'whip' && bt < 0.28) whip = 1 - ease.out(bt / 0.28);
  [x, y, z] = clampCam(x + Math.sin(s.t * 1.1) * 1.5, y + Math.cos(s.t * 0.9) * 1.2, z);
  const st = { t: s.t, lt: s.lt, bt, bdur, p, beat: i, dur: s.dur, cam: { x, y, z },
    ph: (txt) => ph(s, txt) - S[i], A: (txt) => s.lt - ph(s, txt) };
  ctx.save();
  if (whip > 0) ctx.filter = `blur(${Math.round(whip * 16)}px)`;
  const shake = b.shake ?? o.shake ?? 0;
  camera(ctx, x + whip * 600, y, z, shake, s.t);
  if (b.set || o.set) (b.set || o.set)(ctx, st);
  b.draw && b.draw(ctx, st);
  ctx.restore();
  ctx.filter = 'none';
  if (b.fg) b.fg(ctx, st);
  wLook(ctx, b.look || o.look || 'day', s.t);
  if (o.over) o.over(ctx, st);
  if (b.over) b.over(ctx, st);
  if (tr === 'black' && bt < 0.5) { ctx.fillStyle = `rgba(0,0,0,${1 - bt / 0.5})`; ctx.fillRect(0, 0, W, H); }
  if (tr === 'flash' && bt < 0.4) { ctx.fillStyle = `rgba(255,250,235,${1 - bt / 0.4})`; ctx.fillRect(0, 0, W, H); }
}

// ---------- lighter film look ----------
const WLOOKS = {
  day: { desat: 0.25, tint: '#c8a870', ta: 0.12 },
  warm: { desat: 0.3, tint: '#c89a5a', ta: 0.18 },
  cold: { desat: 0.35, tint: '#7a96b0', ta: 0.18 },
  fire: { desat: 0.25, tint: '#d0703a', ta: 0.2 },
  night: { desat: 0.35, tint: '#4a5a80', ta: 0.22, mul: '#3a4060' },
  gray: { desat: 0.6, tint: '#8a8578', ta: 0.12 },
  home: { desat: 0.15, tint: '#d8b070', ta: 0.12 },
};
let _wgrain = null;
function wLook(ctx, name, t) {
  const L = WLOOKS[name] || WLOOKS.day;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'saturation'; ctx.globalAlpha = L.desat; ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = 'color'; ctx.globalAlpha = L.ta; ctx.fillStyle = L.tint; ctx.fillRect(0, 0, W, H);
  if (L.mul) { ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.45; ctx.fillStyle = L.mul; ctx.fillRect(0, 0, W, H); }
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  const f = Math.floor(t * 24), r = rng(f * 7 + 3);
  ctx.fillStyle = `rgba(0,0,0,${r() * 0.04})`; ctx.fillRect(0, 0, W, H);
  if (r() < 0.3) { ctx.fillStyle = 'rgba(235,225,200,0.18)'; ctx.fillRect(r() * W, 0, 1.5, H); }
  vignette(ctx, 0.38);
  if (!_wgrain) { _wgrain = []; for (let k = 0; k < 4; k++) { const c = document.createElement('canvas'); c.width = 480; c.height = 270; const g = c.getContext('2d'); const img = g.createImageData(480, 270); const r2 = rng(80 + k); for (let i = 0; i < img.data.length; i += 4) { const v = r2() * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; } g.putImageData(img, 0, 0); _wgrain.push(c); } }
  ctx.globalAlpha = 0.06; ctx.globalCompositeOperation = 'overlay'; ctx.drawImage(_wgrain[f % 4], 0, 0, W, H);
  ctx.restore();
}

// big caption across the frame (title words, numbers)
function bigText(ctx, text, lt, a, d = 2.5, y = 200, size = 120, color = '#f0e6d2') {
  const al = clamp((lt - a) / 0.3) * (1 - clamp((lt - a - d) / 0.4));
  if (al <= 0) return;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = al;
  ctx.font = `700 ${size}px "Oswald"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  ctx.lineWidth = size * 0.16; ctx.strokeStyle = '#120e0a'; ctx.strokeText(text, W / 2, y);
  ctx.fillStyle = color; ctx.fillText(text, W / 2, y + (1 - ease.out(clamp((lt - a) / 0.4))) * 20);
  ctx.restore();
}

// ---------- level card ----------
const WR = [['Шютце', 'SCHÜTZE'], ['Ефрейтор', 'GEFREITER'], ['Обер-ефрейтор', 'OBERGEFREITER'], ['Унтер-офицер', 'UNTEROFFIZIER'], ['Фельдфебель', 'FELDWEBEL'], ['Лейтенант', 'LEUTNANT'], ['Обер-лейтенант', 'OBERLEUTNANT'], ['Гауптман', 'HAUPTMANN']];
const WNUM = ['ОДИН', 'ДВА', 'ТРИ', 'ЧЕТЫРЕ', 'ПЯТЬ', 'ШЕСТЬ', 'СЕМЬ', 'ВОСЕМЬ'];
const WYEAR = ['1939', '1940', '1941', '1941', '1942', '1943', '1944', '1945'];
function wInsignia(ctx, n, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round';
  if (n === 2 || n === 3) { // sleeve chevrons on a field-gray patch
    shape(ctx, [[-130, -90], [130, -90], [0, 110]], '#5f6656', 6);
    for (let i = 0; i < n - 1; i++) { const yy = -40 + i * 46; shape(ctx, [[-96, yy - 20], [0, yy + 50], [96, yy - 20], [96, yy + 4], [0, yy + 74], [-96, yy + 4]], '#c8ccd0', 5); }
  } else { // shoulder board
    const off = n >= 6;
    shape(ctx, [[-230, -54], [190, -54], [236, 0], [190, 54], [-230, 54]], off ? '#c8ccd0' : '#5f6656', 6);
    if (!off) { ctx.strokeStyle = '#3a4636'; ctx.lineWidth = 10; ctx.strokeRect(-222, -46, 400, 92); }
    if (off) { ctx.strokeStyle = '#8a8e92'; ctx.lineWidth = 6; for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.moveTo(-210 + i * 22, -44); ctx.lineTo(-190 + i * 22, 44); ctx.stroke(); } }
    if (n === 4 || n === 5) { ctx.strokeStyle = '#c8ccd0'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(-222, -40); ctx.lineTo(186, -40); ctx.lineTo(222, 0); ctx.lineTo(186, 40); ctx.lineTo(-222, 40); if (n === 5) ctx.closePath(); ctx.stroke(); }
    const pips = { 5: 1, 7: 1, 8: 2 }[n] || 0;
    for (let i = 0; i < pips; i++) { const px = 20 + i * 80; rect(ctx, px - 22, -22, 44, 44, n === 5 ? '#c8ccd0' : '#d8b048', 2, 4); }
    circ(ctx, 160, 0, 14, '#8e9290', 4);
  }
  ctx.restore();
}
function wCard(ctx, n, lt) {
  ctx.fillStyle = '#1a1612'; ctx.fillRect(0, 0, W, H);
  const g = ctx.createRadialGradient(W / 2, H / 2, 50, W / 2, H / 2, 900); g.addColorStop(0, 'rgba(120,110,90,0.5)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#2a2420'; for (let y = -40 + ((lt * 300) % 80); y < H; y += 80) { ctx.fillRect(30, y, 40, 50); ctx.fillRect(W - 70, y, 40, 50); }
  const p = ease.out(clamp(lt / 0.5));
  ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.globalAlpha = p;
  ctx.font = '700 60px "Oswald"'; ctx.fillStyle = '#c8b898'; ctx.fillText(`УРОВЕНЬ ${WNUM[n - 1]}`, W / 2, 210);
  ctx.font = '700 150px "Oswald"'; ctx.fillStyle = '#f4ead6'; ctx.fillText(WR[n - 1][0].toUpperCase(), W / 2, 360 + (1 - p) * 30);
  ctx.font = '700 44px "Oswald"'; ctx.fillStyle = '#9a9080'; ctx.fillText(`${WR[n - 1][1]} · ${WYEAR[n - 1]}`, W / 2, 470);
  ctx.restore();
  wInsignia(ctx, n, W / 2, 720, 1.1 * ease.back(clamp((lt - 0.3) / 0.5)));
  wLook(ctx, 'gray', lt);
}
