// Engine v2: scenes cut into beats on narration phrases with auto framings (wide / mid / close),
// parallax layers, handheld camera, transitions, particles and a newsreel film look.

const PT = (k) => Math.max(0, window.CUES[window.PARA[k]] - 0.15);
const SCENES = [];

// ---------- beats ----------
function beatsFor(t0, t1) {
  const raw = window.CUES.filter((c) => c >= t0 - 0.05 && c < t1 - 0.3).map((c) => Math.max(0, c - t0));
  if (!raw.length || raw[0] > 0.3) raw.unshift(0);
  const out = [0];
  for (const b of raw) if (b - out[out.length - 1] >= 2.2) out.push(b);
  // split long beats so nothing sits still for too long
  const res = [];
  const ends = [...out.slice(1), t1 - t0];
  out.forEach((b, i) => { res.push(b); const len = ends[i] - b; if (len > 6.5) { const n = Math.ceil(len / 4.5); for (let j = 1; j < n; j++) res.push(b + (len * j) / n); } });
  return res;
}

// framings from focus points: [x, feetY, height]
function autoFrames(focus) {
  const f = [{ x: 960, y: 540, z: 1 }];
  for (const [x, y, h] of focus) {
    f.push({ x, y: y - h * 0.52, z: clamp(1080 / (h * 1.45), 1.15, 2.4) });
    f.push({ x, y: y - h * 0.86, z: clamp(1080 / (h * 0.62), 1.8, 3.4) });
  }
  return f;
}

function scene(k, o) {
  const sc = { k, ...o };
  SCENES.push(sc);
  shot(PT(k), (ctx, s) => drawScene(ctx, s, sc), { fade: o.tr === 'fade' ? 0.7 : 0 });
}

function drawScene(ctx, s, o) {
  if (!o._beats) { o._beats = beatsFor(s.t - s.lt, s.t - s.lt + s.dur); o._frames = o.frames || autoFrames(o.focus || []); o._rng = rng(o.k * 31 + 7); o._punch = o._beats.map(() => o._rng() < 0.35); }
  const B = o._beats;
  let b = 0; while (b + 1 < B.length && B[b + 1] <= s.lt) b++;
  const bt = s.lt - B[b], bdur = (b + 1 < B.length ? B[b + 1] : s.dur) - B[b];
  const F = o._frames;
  const fr = F[(b + (o.f0 || 0)) % F.length];
  const drift = ease.io(clamp(bt / Math.max(1, bdur)));
  const dir = b % 2 ? 1 : -1;
  let z = fr.z * (1 + 0.05 * drift);
  if (o._punch[b] && bt < 0.3) z *= 1 + 0.06 * (1 - ease.out(bt / 0.3));
  const hand = o.hand ?? 3;
  const cx = fr.x + dir * 18 * drift + Math.sin(s.t * 1.3) * hand + Math.sin(s.t * 2.7 + 1) * hand * 0.5;
  const cy = fr.y + Math.cos(s.t * 1.1) * hand * 0.7;
  const st = { t: s.t, lt: s.lt, dur: s.dur, beat: b, bt, bdur, cam: { x: cx, y: cy, z }, ph: (txt) => ph(s, txt), frame: fr };
  // whip-pan entrance
  let whip = 0;
  if (o.tr === 'whip' && s.lt < 0.3) whip = 1 - ease.out(s.lt / 0.3);
  ctx.save();
  if (whip > 0) ctx.filter = `blur(${Math.round(whip * 18)}px)`;
  camera(ctx, cx + whip * 700, cy, z, (o.shake || 0) * (o.shakeFrom != null ? (s.lt > o.shakeFrom ? 1 : 0) : 1), s.t);
  o.draw(ctx, st);
  ctx.restore();
  ctx.filter = 'none';
  if (o.fg) o.fg(ctx, st);
  filmLook(ctx, o.look || 'warm', s.t);
  if (o.over) o.over(ctx, st);
  if (o.tr === 'black' && s.lt < 0.6) { ctx.fillStyle = `rgba(0,0,0,${1 - s.lt / 0.6})`; ctx.fillRect(0, 0, W, H); }
  if (o.tr === 'flash' && s.lt < 0.5) { ctx.fillStyle = `rgba(255,250,235,${1 - s.lt / 0.5})`; ctx.fillRect(0, 0, W, H); }
}

// local time of the first cue containing text, from the shot start
const _ph = {};
function ph(s, text) {
  const t0 = s.t - s.lt, key = text + '@' + t0.toFixed(2);
  if (_ph[key] === undefined) {
    let f = 1e9;
    for (let i = 0; i < window.CUES.length; i++) { if (window.CUES[i] < t0 - 0.5) continue; if (window.CUE_TEXT[i].includes(text)) { f = window.CUES[i] - t0; break; } }
    _ph[key] = f;
  }
  return _ph[key];
}

// parallax: draw a layer that lags behind the camera (k = 0 foreground, 0.6 far)
function layer(ctx, st, k, fn) { ctx.save(); ctx.translate((st.cam.x - 960) * k, (st.cam.y - 540) * k * 0.4); fn(); ctx.restore(); }

// ---------- film look ----------
const LOOKS = {
  warm: { desat: 0.55, tint: '#b8955a', ta: 0.28, mul: null },
  cold: { desat: 0.6, tint: '#6f8aa6', ta: 0.25, mul: null },
  fire: { desat: 0.4, tint: '#c86a34', ta: 0.3, mul: null },
  night: { desat: 0.5, tint: '#3a4a6a', ta: 0.3, mul: '#2a3048' },
  gray: { desat: 0.85, tint: '#8a8578', ta: 0.2, mul: null },
  home: { desat: 0.35, tint: '#d0a868', ta: 0.22, mul: null },
};
let _grainC = null;
function filmLook(ctx, name, t) {
  const L = LOOKS[name] || LOOKS.warm;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'saturation'; ctx.globalAlpha = L.desat; ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = 'color'; ctx.globalAlpha = L.ta; ctx.fillStyle = L.tint; ctx.fillRect(0, 0, W, H);
  if (L.mul) { ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.5; ctx.fillStyle = L.mul; ctx.fillRect(0, 0, W, H); }
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  // flicker
  const f = Math.floor(t * 24);
  const r = rng(f * 7 + 3);
  ctx.fillStyle = `rgba(0,0,0,${r() * 0.07})`; ctx.fillRect(0, 0, W, H);
  // scratches and dust
  for (let i = 0; i < 2; i++) if (r() < 0.45) { const x = r() * W; ctx.fillStyle = `rgba(235,225,200,${0.15 + r() * 0.2})`; ctx.fillRect(x, 0, 1.5 + r() * 2, H); }
  for (let i = 0; i < 6; i++) { if (r() < 0.6) continue; ctx.fillStyle = r() < 0.5 ? 'rgba(20,16,12,0.6)' : 'rgba(240,230,210,0.5)'; ctx.beginPath(); ctx.arc(r() * W, r() * H, 1 + r() * 3, 0, Math.PI * 2); ctx.fill(); }
  vignette(ctx, 0.62);
  if (!_grainC) { _grainC = []; for (let k = 0; k < 4; k++) { const c = document.createElement('canvas'); c.width = 480; c.height = 270; const g = c.getContext('2d'); const img = g.createImageData(480, 270); const rr2 = rng(50 + k); for (let i = 0; i < img.data.length; i += 4) { const v = rr2() * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; } g.putImageData(img, 0, 0); _grainC.push(c); } }
  ctx.globalAlpha = 0.09; ctx.globalCompositeOperation = 'overlay'; ctx.drawImage(_grainC[f % 4], 0, 0, W, H);
  ctx.restore();
}

// ---------- particles ----------
function snowFX(ctx, t, n = 120, wind = 30, seed = 1, big = 1) {
  const r = rng(seed);
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  for (let i = 0; i < n; i++) {
    const sp = 40 + r() * 80, sz = (1.5 + r() * 3.5) * big;
    const x = ((r() * 2400 + t * wind + Math.sin(t + i) * 20) % 2400) - 240, y = ((r() * 1300 + t * sp) % 1300) - 110;
    ctx.beginPath(); ctx.arc(x, y, sz, 0, Math.PI * 2); ctx.fill();
  }
}
function rainFX(ctx, t, n = 160, seed = 2) {
  const r = rng(seed); ctx.strokeStyle = 'rgba(200,210,220,0.45)'; ctx.lineWidth = 2;
  for (let i = 0; i < n; i++) { const x = (r() * 2200 + t * 120) % 2200 - 140, y = (r() * 1300 + t * 900) % 1300 - 110; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 8, y + 34); ctx.stroke(); }
}
function dustFX(ctx, t, n = 40, seed = 3) {
  const r = rng(seed);
  for (let i = 0; i < n; i++) { const x = (r() * 2000 + t * 12 * (r() - 0.5)) % 2000, y = (r() * 1100 + Math.sin(t * 0.5 + i) * 30) % 1100; ctx.fillStyle = `rgba(255,240,200,${0.15 + r() * 0.25})`; ctx.beginPath(); ctx.arc(x, y, 1.5 + r() * 2.5, 0, Math.PI * 2); ctx.fill(); }
}
function smokeFX(ctx, x, y, t, s = 1, seed = 4, color = '60,56,52', a = 0.35) {
  const r = rng(seed);
  for (let i = 0; i < 9; i++) {
    const p = ((t * 0.18 + i / 9 + r() * 0.1) % 1);
    const px = x + Math.sin(p * 4 + i) * 40 * s + p * 120 * s, py = y - p * 600 * s, rad = (40 + p * 180) * s;
    const g = ctx.createRadialGradient(px, py, 0, px, py, rad);
    g.addColorStop(0, `rgba(${color},${a * (1 - p)})`); g.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = g; ctx.fillRect(px - rad, py - rad, rad * 2, rad * 2);
  }
}
function fireFX(ctx, x, y, s, t, seed = 5) {
  const g = ctx.createRadialGradient(x, y - 60 * s, 10, x, y - 60 * s, 260 * s);
  g.addColorStop(0, 'rgba(255,170,60,0.55)'); g.addColorStop(1, 'rgba(255,120,40,0)');
  ctx.fillStyle = g; ctx.fillRect(x - 260 * s, y - 320 * s, 520 * s, 520 * s);
  for (const [c, k] of [['#d83a1a', 1], ['#ff8a2a', 0.72], ['#ffe07a', 0.42]]) {
    ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(x - 80 * s * k, y);
    for (let i = 0; i <= 8; i++) { const fx = x - 80 * s * k + (160 * s * k * i) / 8; const fh = (i % 2 ? 190 : 80) * s * k * (0.8 + 0.2 * Math.sin(t * 11 + i * 2.3 + seed)); ctx.lineTo(fx, y - fh); }
    ctx.lineTo(x + 80 * s * k, y); ctx.closePath(); ctx.fill();
  }
}
// explosion at local time lt since detonation
function blastFX(ctx, x, y, s, lt, seed = 6) {
  if (lt < 0 || lt > 3) return;
  const r = rng(seed);
  if (lt < 0.15) { ctx.fillStyle = `rgba(255,250,220,${1 - lt / 0.15})`; ctx.beginPath(); ctx.arc(x, y, 300 * s, 0, Math.PI * 2); ctx.fill(); }
  const fb = clamp(lt / 0.5);
  if (lt < 1) {
    ctx.fillStyle = `rgba(255,${Math.round(200 - fb * 120)},60,${1 - lt})`; ctx.beginPath();
    for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2, rr2 = (i % 2 ? 90 : 150) * s * (0.4 + fb); ctx.lineTo(x + Math.cos(a) * rr2, y - 60 * s * fb + Math.sin(a) * rr2 * 0.8); }
    ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle = '#2a2420';
  for (let i = 0; i < 14; i++) { const vx = (r() - 0.5) * 900 * s, vy = -(300 + r() * 700) * s; const px = x + vx * lt, py = y + vy * lt + 900 * s * lt * lt; ctx.fillRect(px, py, 8 * s + r() * 10 * s, 8 * s + r() * 10 * s); }
  smokeFX(ctx, x, y, lt * 2, s * 0.8, seed, '40,36,32', 0.45 * clamp(lt / 0.4));
}

// ---------- captions ----------
function chron(ctx, text, lt, a = 0.3, d = 4.5) {
  const al = clamp((lt - a) / 0.4) * (1 - clamp((lt - a - d) / 0.5));
  if (al <= 0) return;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = al;
  ctx.font = '700 46px "Oswald"'; const w = ctx.measureText(text).width;
  ctx.fillStyle = 'rgba(10,8,6,0.82)'; ctx.fillRect(80, 930, w + 60, 76);
  ctx.fillStyle = '#efe6d2'; ctx.textBaseline = 'middle'; ctx.fillText(text, 110, 970);
  ctx.restore();
}
// handwritten letter line typed out
function letterLine(ctx, text, lt, a, y = 980, size = 52) {
  if (lt < a) return;
  const n = Math.min(text.length, Math.floor((lt - a) * 22) + 1);
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.font = `italic 700 ${size}px "Old Standard TT"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 14; ctx.fillStyle = '#f4ead2';
  ctx.fillText(text.slice(0, n), W / 2, y);
  ctx.restore();
}

// ---------- level card: newsreel ----------
const RA_LEVELS = ['Красноармеец', 'Ефрейтор', 'Младший сержант', 'Сержант', 'Старшина', 'Младший лейтенант', 'Лейтенант', 'Капитан'];
const RA_NUM = ['ОДИН', 'ДВА', 'ТРИ', 'ЧЕТЫРЕ', 'ПЯТЬ', 'ШЕСТЬ', 'СЕМЬ', 'ВОСЕМЬ'];
function insignia(ctx, n, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const star = (cx, cy, r, c) => { ctx.fillStyle = c; ctx.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr2 = k % 2 ? r * 0.42 : r; ctx.lineTo(cx + Math.cos(a) * rr2, cy + Math.sin(a) * rr2); } ctx.closePath(); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); };
  if (n <= 4) { // collar tab (petlitsa) with triangles
    ctx.fillStyle = '#b3262a'; ctx.strokeStyle = INK; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(-160, -60); ctx.lineTo(160, -60); ctx.lineTo(120, 60); ctx.lineTo(-200, 60); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#d8b040'; ctx.lineWidth = 6; ctx.stroke();
    if (n === 2) { ctx.fillStyle = '#d8b040'; ctx.fillRect(-20, -60, 22, 120); }
    const tri = [0, 0, 0, 2, 3][n];
    for (let i = 0; i < tri; i++) { const cx = -90 + i * 70; ctx.fillStyle = '#c9a24a'; ctx.beginPath(); ctx.moveTo(cx - 24, -22); ctx.lineTo(cx + 24, -22); ctx.lineTo(cx, 26); ctx.closePath(); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); }
  } else { // shoulder board (pogon)
    ctx.fillStyle = n === 5 ? '#7d7a52' : '#c9a24a'; ctx.strokeStyle = INK; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(-220, -54); ctx.lineTo(180, -54); ctx.lineTo(230, 0); ctx.lineTo(180, 54); ctx.lineTo(-220, 54); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#b3262a';
    if (n === 5) { ctx.fillRect(-60, -16, 240, 32); ctx.fillRect(-90, -54, 34, 108); }
    else ctx.fillRect(-220, -6, 400, 12);
    const stars = { 6: [[40, 0]], 7: [[0, -26], [0, 26]], 8: [[-60, -26], [-60, 26], [20, 0], [100, 0]] }[n] || [];
    stars.forEach(([sx, sy]) => star(sx, sy, 20, '#d8dce0'));
    circ(ctx, 160, 0, 14, '#d8b040', 4);
  }
  ctx.restore();
}
function newsreelCard(ctx, n, lt) {
  ctx.fillStyle = '#0c0a08'; ctx.fillRect(0, 0, W, H);
  // film sprockets
  ctx.fillStyle = '#1e1a16';
  for (let y = -40 + ((lt * 300) % 80); y < H; y += 80) { ctx.fillRect(30, y, 40, 50); ctx.fillRect(W - 70, y, 40, 50); }
  const p = ease.out(clamp(lt / 0.6));
  ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.globalAlpha = p;
  ctx.font = '700 62px "Oswald"'; ctx.fillStyle = '#b8a888'; ctx.fillText(`УРОВЕНЬ ${RA_NUM[n - 1]}`, W / 2, 250);
  ctx.font = '700 150px "Oswald"'; ctx.fillStyle = '#efe6d2'; ctx.fillText(RA_LEVELS[n - 1].toUpperCase(), W / 2, 400 + (1 - p) * 30);
  ctx.restore();
  insignia(ctx, n, W / 2, 700, 1.1 * ease.back(clamp((lt - 0.4) / 0.5)));
  filmLook(ctx, 'gray', lt);
}
