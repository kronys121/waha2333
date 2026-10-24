// Engine v4 (vizavi-motion): staged beats with a camera that is always travelling (eased path + arc + tilt),
// depth layers with parallax and depth of field, sub-frame motion blur on fast moves, typography that acts,
// and a sound-event list (window.SFX) generated from the same beats so music/SFX hit the picture.
// Needs horus/lib.js (PT, ph, glow, grain) loaded before. Guard copy: cheaper blur thresholds, level names from window.CARD_LEVELS.

const WIDE = [960, 540, 1];
const MS = (x, feetY, s = 1) => [x, feetY - 250 * s, Math.min(2.6, 1.3 / s)];
const CU = (x, feetY, s = 1) => [x, feetY - 380 * s, Math.min(3.4, 2.1 / s)];
const TWO = (x1, x2, feetY, s = 1) => [(x1 + x2) / 2, feetY - 260 * s, Math.min(1.25 / s, 1800 / (Math.abs(x2 - x1) + 520 * s))];
const STAGES = [];
window.SFX = [];

function stage(k, beats, o = {}) {
  const sc = { k, beats, ...o };
  STAGES.push({ t0: PT(k), sc });
  shot(PT(k), (ctx, s) => drawStage(ctx, s, sc), { fade: o.fade ? 0.6 : 0 });
}

function beatStarts(t0, dur, o, sAt) {
  const n = o.beats.length;
  const cues = window.CUES.filter((c) => c > t0 + 1.0 && c < t0 + dur - 1.0).map((c) => c - t0 - 0.1);
  const starts = [0];
  for (let i = 1; i < n; i++) {
    const b = o.beats[i];
    let t = null;
    if (typeof b.at === 'number') t = b.at;
    else if (typeof b.at === 'string') { const v = sAt(b.at); if (v < 1e8) t = v - 0.12; }
    if (t == null) { const target = (dur * i) / n; t = cues.length ? cues.reduce((a, c) => (Math.abs(c - target) < Math.abs(a - target) ? c : a)) : target; }
    starts.push(Math.min(dur - 0.5, Math.max(starts[i - 1] + 1.0, t)));
  }
  return starts;
}
const clampCam = (x, y, z) => { const hw = 960 / z, hh = 540 / z; return [clamp(x, BX0 + hw, BX1 - hw), clamp(y, BY0 + hh, BY1 - hh), z]; };

// camera of a beat at progress p: always moving. `to` gives the end framing; otherwise a drift is derived.
function camAt(b, o, i, p, t) {
  const c = b.cam || o.cam || WIDE;
  const dir = (i + (o.k || 0)) % 2 ? 1 : -1;
  const to = b.to || [c[0] + dir * 90 / c[2], c[1] - 20 / c[2], c[2] * 1.09];
  const e = b.ease === 'lin' ? p : ease.io(p);
  let x = lerp(c[0], to[0], e), y = lerp(c[1], to[1], e), z = lerp(c[2], to[2], e);
  if (b.arc) { x += Math.sin(p * Math.PI) * b.arc[0]; y += Math.sin(p * Math.PI) * b.arc[1]; }
  x += Math.sin(t * 0.7) * 3; y += Math.cos(t * 0.53) * 2;
  const rot = (b.tilt || 0) * (p - 0.5) + Math.sin(t * 0.4) * 0.002;
  [x, y, z] = clampCam(x, y, z);
  return { x, y, z, rot };
}

function drawStage(ctx, s, o) {
  const t0 = s.t - s.lt;
  if (!o._st) o._st = beatStarts(t0, s.dur, o, (txt) => ph(s, txt));
  const S = o._st;
  let i = 0; while (i + 1 < S.length && S[i + 1] <= s.lt) i++;
  const bdur = (i + 1 < S.length ? S[i + 1] : s.dur) - S[i];
  // screen speed of the camera: sub-frame motion blur when the camera moves fast
  const b = o.beats[i];
  const pAt = (lt) => clamp((lt - S[i]) / Math.max(0.5, bdur));
  const c0 = camAt(b, o, i, pAt(s.lt - 1 / 30), s.t - 1 / 30), c1 = camAt(b, o, i, pAt(s.lt), s.t);
  const v = Math.hypot((c1.x - c0.x) * c1.z, (c1.y - c0.y) * c1.z) + Math.abs(c1.z - c0.z) * 900;
  const tr = b.tr ?? (i === 0 ? o.tr : 'cut');
  const bt = s.lt - S[i];
  const whip = tr === 'whip' && bt < 0.3 ? 1 - ease.out(bt / 0.3) : 0;
  const n = whip > 0.05 || v > 14 || b.blur ? 3 : 1; // motion blur only on fast moves (render cost)
  if (n === 1) renderSub(ctx, s, o, i, S, bdur, 0, whip);
  else {
    const acc = accCanvas();
    const a = acc.getContext('2d');
    a.setTransform(1, 0, 0, 1, 0, 0); a.globalAlpha = 1; a.fillStyle = '#000'; a.fillRect(0, 0, W, H);
    for (let k = 0; k < n; k++) {
      const sub = subCanvas(); const sc = sub.getContext('2d');
      sc.setTransform(1, 0, 0, 1, 0, 0); sc.fillStyle = '#000'; sc.fillRect(0, 0, W, H);
      renderSub(sc, s, o, i, S, bdur, (k - (n - 1) / 2) / 60, whip * (1 - k / n));
      a.globalAlpha = 1 / (k + 1); a.drawImage(sub, 0, 0);
    }
    ctx.drawImage(acc, 0, 0);
  }
  // overlays without blur: grade, captions, transitions
  wLook(ctx, b.look || o.look || 'gold', s.t);
  const st = stState(s, o, i, S, bdur, 0);
  if (o.over) o.over(ctx, st);
  if (b.over) b.over(ctx, st);
  if (tr === 'black' && bt < 0.5) { ctx.fillStyle = `rgba(0,0,0,${1 - bt / 0.5})`; ctx.fillRect(0, 0, W, H); }
  if (tr === 'flash' && bt < 0.4) { ctx.fillStyle = `rgba(255,246,220,${1 - bt / 0.4})`; ctx.fillRect(0, 0, W, H); }
  if (tr === 'light' && bt < 0.9) lightBurst(ctx, bt / 0.9);
}
let _acc = null, _sub = null;
const accCanvas = () => (_acc || (_acc = Object.assign(document.createElement('canvas'), { width: W, height: H })));
const subCanvas = () => (_sub || (_sub = Object.assign(document.createElement('canvas'), { width: W, height: H })));

function stState(s, o, i, S, bdur, dt) {
  const lt = s.lt + dt, t = s.t + dt;
  const bt = lt - S[i], p = clamp(bt / Math.max(0.5, bdur));
  const cam = camAt(o.beats[i], o, i, p, t);
  return { t, lt, bt, bdur, p, beat: i, dur: s.dur, cam, dof: cam.z > 2.0 ? Math.min(5, (cam.z - 1.8) * 4) : 0,
    ph: (txt) => ph(s, txt) - S[i], A: (txt) => lt - ph(s, txt) };
}
function renderSub(ctx, s, o, i, S, bdur, dt, whip) {
  const b = o.beats[i];
  const st = stState(s, o, i, S, bdur, dt);
  ctx.save();
  ctx.translate(W / 2, H / 2); ctx.rotate(st.cam.rot); ctx.translate(-W / 2, -H / 2);
  camera(ctx, st.cam.x + whip * 700, st.cam.y, st.cam.z, b.shake ?? o.shake ?? 0, st.t);
  (b.set || o.set || (() => {}))(ctx, st);
  b.draw && b.draw(ctx, st);
  if (b.fg) b.fg(ctx, st);
  ctx.restore();
}

// depth layer: parallax by k (0 = actor plane, 0.6 far, negative = foreground), depth of field blur
function depth(ctx, st, k, fn) {
  const blur = k > 0.15 ? st.dof * k * 1.6 : k < 0 ? 5 + st.dof : 0;
  ctx.save();
  ctx.translate((st.cam.x - 960) * k, (st.cam.y - 540) * k * 0.5);
  if (blur > 0.6) ctx.filter = `blur(${blur.toFixed(1)}px)`;
  fn();
  ctx.restore();
}

// sound events: register in world time; music cues are read from the same list
function sfx(t, name, gain = 1) { window.SFX.push([+t.toFixed(3), name, gain]); }

// ---------- look ----------
const WLOOKS = {
  gold: { tint: '#e0b060', ta: 0.12, desat: 0.1 },
  night: { tint: '#3a4a7a', ta: 0.2, desat: 0.2, mul: '#30385a' },
  warm: { tint: '#d89a50', ta: 0.16, desat: 0.15 },
  ash: { tint: '#9a8a7a', ta: 0.15, desat: 0.45 },
  blood: { tint: '#b04030', ta: 0.18, desat: 0.2 },
  warp: { tint: '#9a40c0', ta: 0.18, desat: 0.1 },
  cold: { tint: '#7a9ac0', ta: 0.16, desat: 0.3 },
  toxic: { tint: '#7ab040', ta: 0.14, desat: 0.1 },
};
function wLook(ctx, name, t) {
  const L = WLOOKS[name] || WLOOKS.gold;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (L.desat) { ctx.globalCompositeOperation = 'saturation'; ctx.globalAlpha = L.desat; ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, W, H); }
  ctx.globalCompositeOperation = 'color'; ctx.globalAlpha = L.ta; ctx.fillStyle = L.tint; ctx.fillRect(0, 0, W, H);
  if (L.mul) { ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.45; ctx.fillStyle = L.mul; ctx.fillRect(0, 0, W, H); }
  ctx.restore();
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); vignette(ctx, 0.45); ctx.restore();
  grain(ctx, 0.05);
}
function lightBurst(ctx, p) {
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const r = rng(77);
  for (let i = 0; i < 90; i++) {
    const a = r() * Math.PI * 2, d = (0.2 + r()) * 900 * ease.out(p);
    ctx.globalAlpha = (1 - p) * (0.5 + r() * 0.5); ctx.fillStyle = '#ffe6a0';
    ctx.beginPath(); ctx.arc(W / 2 + Math.cos(a) * d, H / 2 + Math.sin(a) * d * 0.6, 2 + r() * 5, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = (1 - p) * 0.8; const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 700); g.addColorStop(0, '#fff2c8'); g.addColorStop(1, 'rgba(255,230,160,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

// ---------- particles ----------
function snowFX(ctx, t, n = 120, wind = 30, seed = 1, big = 1) {
  const r = rng(seed); ctx.fillStyle = 'rgba(255,255,255,0.85)';
  for (let i = 0; i < n; i++) { const sp = 40 + r() * 80, sz = (1.5 + r() * 3.5) * big; const x = ((r() * 2400 + t * wind + Math.sin(t + i) * 20) % 2400) - 240, y = ((r() * 1300 + t * sp) % 1300) - 110; ctx.beginPath(); ctx.arc(x, y, sz, 0, Math.PI * 2); ctx.fill(); }
}
function dustFX(ctx, t, n = 40, seed = 3, col = '255,240,200') {
  const r = rng(seed);
  for (let i = 0; i < n; i++) { const x = (r() * 2000 + t * 12 * (r() - 0.5)) % 2000, y = (r() * 1100 + Math.sin(t * 0.5 + i) * 30) % 1100; ctx.fillStyle = `rgba(${col},${0.15 + r() * 0.3})`; ctx.beginPath(); ctx.arc(x, y, 1.5 + r() * 2.5, 0, Math.PI * 2); ctx.fill(); }
}
function smokeFX(ctx, x, y, t, s = 1, seed = 4, color = '60,56,52', a = 0.35) {
  const r = rng(seed);
  for (let i = 0; i < 9; i++) { const p = ((t * 0.18 + i / 9 + r() * 0.1) % 1); const px = x + Math.sin(p * 4 + i) * 40 * s + p * 120 * s, py = y - p * 600 * s, rad = (40 + p * 180) * s; const g = ctx.createRadialGradient(px, py, 0, px, py, rad); g.addColorStop(0, `rgba(${color},${a * (1 - p)})`); g.addColorStop(1, `rgba(${color},0)`); ctx.fillStyle = g; ctx.fillRect(px - rad, py - rad, rad * 2, rad * 2); }
}
function fireFX(ctx, x, y, s, t, seed = 5) {
  const g = ctx.createRadialGradient(x, y - 60 * s, 10, x, y - 60 * s, 260 * s); g.addColorStop(0, 'rgba(255,170,60,0.55)'); g.addColorStop(1, 'rgba(255,120,40,0)'); ctx.fillStyle = g; ctx.fillRect(x - 260 * s, y - 320 * s, 520 * s, 520 * s);
  for (const [c, k] of [['#d83a1a', 1], ['#ff8a2a', 0.72], ['#ffe07a', 0.42]]) { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(x - 80 * s * k, y); for (let i = 0; i <= 8; i++) { const fx = x - 80 * s * k + (160 * s * k * i) / 8; const fh = (i % 2 ? 190 : 80) * s * k * (0.8 + 0.2 * Math.sin(t * 11 + i * 2.3 + seed)); ctx.lineTo(fx, y - fh); } ctx.lineTo(x + 80 * s * k, y); ctx.closePath(); ctx.fill(); }
}
function blastFX(ctx, x, y, s, lt, seed = 6) {
  if (lt < 0 || lt > 3) return; const r = rng(seed);
  if (lt < 0.15) { ctx.fillStyle = `rgba(255,250,220,${1 - lt / 0.15})`; ctx.beginPath(); ctx.arc(x, y, 300 * s, 0, Math.PI * 2); ctx.fill(); }
  const fb = clamp(lt / 0.5);
  if (lt < 1) { ctx.fillStyle = `rgba(255,${Math.round(200 - fb * 120)},60,${1 - lt})`; ctx.beginPath(); for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2, rr2 = (i % 2 ? 90 : 150) * s * (0.4 + fb); ctx.lineTo(x + Math.cos(a) * rr2, y - 60 * s * fb + Math.sin(a) * rr2 * 0.8); } ctx.closePath(); ctx.fill(); }
  ctx.fillStyle = '#2a2420'; for (let i = 0; i < 14; i++) { const vx = (r() - 0.5) * 900 * s, vy = -(300 + r() * 700) * s; ctx.fillRect(x + vx * lt, y + vy * lt + 900 * s * lt * lt, 8 * s + r() * 10 * s, 8 * s + r() * 10 * s); }
  smokeFX(ctx, x, y, lt * 2, s * 0.8, seed, '40,36,32', 0.45 * clamp(lt / 0.4));
}
// the golden light in a palm: the thread of the whole film
function goldLight(ctx, x, y, r, t, a = 1) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4); g.addColorStop(0, `rgba(255,230,150,${0.8 * a})`); g.addColorStop(0.3, `rgba(255,190,80,${0.35 * a})`); g.addColorStop(1, 'rgba(255,170,60,0)');
  ctx.fillStyle = g; ctx.fillRect(x - r * 4, y - r * 4, r * 8, r * 8);
  ctx.globalAlpha = a; ctx.fillStyle = '#fff6d8'; ctx.beginPath(); ctx.arc(x, y, r * (0.5 + 0.06 * Math.sin(t * 6)), 0, Math.PI * 2); ctx.fill();
  const rr = rng(5); for (let i = 0; i < 14; i++) { const ang = rr() * 6.28 + t * (0.5 + rr()), d = r * (1 + rr() * 2.2); ctx.fillStyle = '#ffd88a'; ctx.beginPath(); ctx.arc(x + Math.cos(ang) * d, y + Math.sin(ang) * d, 1.5 + rr() * 2.5, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
}

// ---------- typography that acts ----------
// caption: letters arrive one by one with a short rise and tracking that settles
function tCaption(ctx, text, lt, a, d = 4, sub) {
  const out = clamp((lt - a - d) / 0.6);
  if (lt < a || out >= 1) return;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1 - out;
  ctx.fillStyle = '#c9a24a'; ctx.fillRect(90, 920, 6, sub ? 104 : 70 * ease.out(clamp((lt - a) / 0.4)));
  ctx.font = '700 56px "Old Standard TT"'; ctx.textBaseline = 'middle'; ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 16;
  let x = 120; const sp = 6 * (1 - ease.out(clamp((lt - a) / 1.2)));
  for (let k = 0; k < text.length; k++) {
    const p = clamp((lt - a - k * 0.03) / 0.35); if (p <= 0) break;
    ctx.globalAlpha = (1 - out) * p; ctx.fillStyle = '#f4ead4';
    ctx.fillText(text[k], x, 955 + (1 - ease.out(p)) * 18);
    x += ctx.measureText(text[k]).width + sp;
  }
  if (sub) { ctx.globalAlpha = (1 - out) * clamp((lt - a - 0.6) / 0.5); ctx.font = 'italic 400 32px "Old Standard TT"'; ctx.fillStyle = '#d8c8a8'; ctx.fillText(sub, 122, 1006); }
  ctx.restore();
}
// key line: words fall into place with weight, then hold
function tLine(ctx, text, lt, a, d = 3.5, y = 540, size = 84, color = '#f4ead4') {
  const out = clamp((lt - a - d) / 0.6);
  if (lt < a || out >= 1) return;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.font = `700 ${size}px "Old Standard TT"`; ctx.textBaseline = 'middle';
  const words = text.split(' '); const sw = ctx.measureText(' ').width;
  const tw = words.reduce((s2, w) => s2 + ctx.measureText(w).width, 0) + sw * (words.length - 1);
  let x = W / 2 - tw / 2;
  words.forEach((w, k) => {
    const p = clamp((lt - a - k * 0.12) / 0.45);
    ctx.globalAlpha = p * (1 - out); ctx.shadowColor = 'rgba(0,0,0,1)'; ctx.shadowBlur = 26; ctx.fillStyle = color;
    ctx.save(); ctx.translate(x, y - (1 - ease.back(p)) * 50); ctx.scale(1 + (1 - p) * 0.3, 1 + (1 - p) * 0.3); ctx.fillText(w, 0, 0); ctx.restore();
    x += ctx.measureText(w).width + sw;
  });
  ctx.restore();
}
// level card: a golden mote travels in, the numeral condenses from sparks, the title opens with tracking
const E_LEVELS = window.CARD_LEVELS || ['Шаман', 'Странник', 'Военный вождь', 'Отец', 'Император', 'Осаждённый', 'Воин', 'Бог'];
const ROMAN8 = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
function eCard(ctx, n, lt) {
  ctx.fillStyle = '#060508'; ctx.fillRect(0, 0, W, H);
  const g = ctx.createRadialGradient(W / 2, 520, 30, W / 2, 520, 900); g.addColorStop(0, `rgba(160,110,40,${0.12 + n * 0.03})`); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // sparks converge into the numeral
  const p = ease.out(clamp(lt / 1.1)), r = rng(n * 13);
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 70; i++) { const a = r() * 6.28, d = (1 - p) * (300 + r() * 600); ctx.globalAlpha = 0.6 * (1 - p * 0.7); ctx.fillStyle = '#ffd88a'; ctx.beginPath(); ctx.arc(W / 2 + Math.cos(a) * d, 470 + Math.sin(a) * d * 0.6, 2 + r() * 3, 0, Math.PI * 2); ctx.fill(); }
  ctx.restore();
  ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.globalAlpha = clamp((lt - 0.2) / 0.5); ctx.font = '700 38px "Old Standard TT"'; ctx.fillStyle = '#9a8a70'; ctx.fillText('У Р О В Е Н Ь', W / 2, 300);
  ctx.globalAlpha = clamp((lt - 0.5) / 0.6); ctx.font = '700 230px "Old Standard TT"'; ctx.fillStyle = '#d8b050'; ctx.shadowColor = 'rgba(255,190,80,0.6)'; ctx.shadowBlur = 50 * (1 - p) + 20;
  ctx.save(); ctx.translate(W / 2, 480); ctx.scale(1.25 - 0.25 * p, 1.25 - 0.25 * p); ctx.fillText(ROMAN8[n - 1], 0, 0); ctx.restore();
  ctx.shadowBlur = 0;
  const tp = ease.out(clamp((lt - 0.9) / 1.0));
  ctx.globalAlpha = tp; ctx.font = '700 88px "Old Standard TT"'; ctx.fillStyle = '#f4ead4';
  const title = E_LEVELS[n - 1].toUpperCase(); const spc = 30 * (1 - tp) + 6;
  const ws = [...title].map((ch) => ctx.measureText(ch).width); const tw = ws.reduce((a2, b2) => a2 + b2, 0) + spc * (title.length - 1);
  let x = W / 2 - tw / 2; ctx.textAlign = 'left'; [...title].forEach((ch, k) => { ctx.fillText(ch, x, 700); x += ws[k] + spc; });
  ctx.strokeStyle = '#c9a24a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(W / 2 - 320 * tp, 780); ctx.lineTo(W / 2 + 320 * tp, 780); ctx.stroke();
  ctx.restore();
  for (let i = 0; i < 8; i++) { ctx.fillStyle = i < n ? '#d8b050' : 'rgba(255,255,255,0.12)'; ctx.beginPath(); ctx.arc(W / 2 - 175 + i * 50, 860, i === n - 1 ? 10 : 7, 0, Math.PI * 2); ctx.fill(); }
  grain(ctx, 0.06);
}
