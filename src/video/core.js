// Engine: timeline of shots, easing, camera, and shared UI elements (cartoon style).

const W = 1920, H = 1080, FPS = 30;
const INK = '#15131a';
const C = {
  ink: INK, gold: '#f2c230', blue: '#2d5bd1', blueDark: '#1f3f96', red: '#d8402f', white: '#ffffff',
  paper: '#f4ead2', paperDark: '#d9c9a3', green: '#4caf50', sky: '#8fd0ff',
};

// ---------- math ----------
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = {
  in: (t) => t * t,
  out: (t) => 1 - (1 - t) * (1 - t),
  io: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  back: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
  elastic: (t) => (t === 0 || t === 1 ? t : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1),
};
// progress of t inside [a, a+d], eased
const prog = (t, a, d, e = ease.io) => e(clamp((t - a) / d));
// keyframe interpolation: keys = [[time, value], ...], value number or array
function kf(t, keys, e = ease.io) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (t <= keys[i][0]) {
      const [t0, v0] = keys[i - 1], [t1, v1] = keys[i];
      const p = e((t - t0) / (t1 - t0));
      return Array.isArray(v0) ? v0.map((v, j) => lerp(v, v1[j], p)) : lerp(v0, v1, p);
    }
  }
  return keys[keys.length - 1][1];
}
function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
function darken(hex, k) {
  if (hex[0] !== '#') return hex;
  const n = parseInt(hex.slice(1), 16);
  const f = (v) => Math.round(clamp(v * k, 0, 255));
  return `rgb(${f((n >> 16) & 255)},${f((n >> 8) & 255)},${f(n & 255)})`;
}

// ---------- timeline ----------
// Shots are registered with a start time; each runs until the next one starts.
const SHOTS = [];
function cue(i, off = -0.15) { return Math.max(0, window.CUES[i] + off); }
function shot(t0, draw, opts = {}) { SHOTS.push({ t0, draw, ...opts }); }

function finalizeShots() {
  SHOTS.sort((a, b) => a.t0 - b.t0);
  for (let i = 0; i < SHOTS.length; i++) SHOTS[i].t1 = i + 1 < SHOTS.length ? SHOTS[i + 1].t0 : window.END_TIME;
}

let fadeCanvas = null;
function renderAt(ctx, t) {
  let i = SHOTS.length - 1;
  while (i > 0 && SHOTS[i].t0 > t) i--;
  const sh = SHOTS[i];
  drawShot(ctx, sh, t);
  // crossfade from previous shot if requested
  const fd = sh.fade ?? 0;
  if (fd > 0 && i > 0 && t - sh.t0 < fd) {
    if (!fadeCanvas) { fadeCanvas = document.createElement('canvas'); fadeCanvas.width = W; fadeCanvas.height = H; }
    const fc = fadeCanvas.getContext('2d');
    drawShot(fc, SHOTS[i - 1], t);
    ctx.save();
    ctx.globalAlpha = 1 - ease.io((t - sh.t0) / fd);
    ctx.drawImage(fadeCanvas, 0, 0);
    ctx.restore();
  }
  // fade to black at the very end
  if (t > window.END_TIME - 1.6) {
    ctx.fillStyle = `rgba(0,0,0,${clamp((t - (window.END_TIME - 1.6)) / 1.3)})`;
    ctx.fillRect(0, 0, W, H);
  }
}

function drawShot(ctx, sh, t) {
  const lt = t - sh.t0, dur = sh.t1 - sh.t0;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  sh.draw(ctx, { t, lt, dur, p: clamp(lt / dur), at: (gt) => gt - sh.t0 });
  ctx.restore();
}

// camera: center on (x, y) with zoom z, optional gentle shake
function camera(ctx, x, y, z, shake = 0, t = 0) {
  const sx = shake ? Math.sin(t * 47) * shake + Math.sin(t * 31) * shake * 0.6 : 0;
  const sy = shake ? Math.cos(t * 41) * shake : 0;
  ctx.translate(W / 2 + sx, H / 2 + sy);
  ctx.scale(z, z);
  ctx.translate(-x, -y);
}

// ---------- text and UI ----------
function font(size, fam = 'Russo One', weight = '') { return `${weight} ${size}px "${fam}"`.trim(); }

function outlinedText(ctx, text, x, y, size, opts = {}) {
  ctx.save();
  ctx.font = font(size, opts.fam || 'Russo One', opts.weight || '');
  ctx.textAlign = opts.align || 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.lineWidth = opts.stroke ?? size * 0.18;
  ctx.strokeStyle = opts.strokeColor || INK;
  if (ctx.lineWidth > 0) ctx.strokeText(text, x, y);
  ctx.fillStyle = opts.color || '#fff';
  ctx.fillText(text, x, y);
  ctx.restore();
}

// pop-in scale for UI elements appearing at local time a
function pop(t, a, d = 0.35) { return ease.back(clamp((t - a) / d)); }

function sticker(ctx, text, x, y, opts = {}) {
  const sc = opts.scale ?? 1;
  if (sc <= 0.001) return;
  const size = opts.size || 44;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(opts.rot ?? -0.03);
  ctx.scale(sc, sc);
  ctx.font = font(size, opts.fam || 'Russo One');
  const lines = String(text).split('\n');
  const w = Math.max(...lines.map((l) => ctx.measureText(l).width)) + size * 0.9;
  const h = lines.length * size * 1.15 + size * 0.55;
  ctx.fillStyle = opts.bg || C.gold;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 6;
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 14); ctx.fill(); ctx.stroke();
  ctx.fillStyle = opts.color || INK;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  lines.forEach((l, i) => ctx.fillText(l, 0, -h / 2 + size * 0.28 + size * 1.15 * (i + 0.5) + 2));
  ctx.restore();
}

// speech / thought bubble anchored at (x, y) with tail pointing to (tx, ty)
function bubble(ctx, text, x, y, tx, ty, opts = {}) {
  const sc = opts.scale ?? 1;
  if (sc <= 0.001) return;
  const size = opts.size || 40;
  ctx.save();
  ctx.font = font(size, opts.fam || 'Oswald', '700');
  const lines = String(text).split('\n');
  const w = opts.w || Math.max(...lines.map((l) => ctx.measureText(l).width)) + size * 1.2;
  const h = opts.h || lines.length * size * 1.2 + size * 0.8;
  ctx.translate(x, y);
  ctx.scale(sc, sc);
  ctx.fillStyle = opts.bg || '#fff';
  ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.lineJoin = 'round';
  if (opts.think) {
    for (let i = 1; i <= 3; i++) {
      const k = i / 4;
      ctx.beginPath(); ctx.arc((tx - x) * (1 - k) , (ty - y) * (1 - k) + 0, 8 + i * 5, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
    }
    ctx.beginPath(); ctx.ellipse(0, 0, w * 0.62, h * 0.7, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  } else {
    const dx = tx - x, dy = ty - y;
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2, w, h, 26);
    ctx.fill(); ctx.stroke();
    const bx = clamp(dx * 0.3, -w / 2 + 40, w / 2 - 40);
    const by = dy > 0 ? h / 2 : -h / 2;
    ctx.beginPath();
    ctx.moveTo(bx - 22, by); ctx.lineTo(dx, dy); ctx.lineTo(bx + 22, by);
    ctx.fill(); ctx.stroke();
    ctx.fillRect(bx - 19, by - (dy > 0 ? 6 : -1), 38, 6);
  }
  ctx.fillStyle = opts.color || INK;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  lines.forEach((l, i) => ctx.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.2 + 2));
  ctx.restore();
}

function stamp(ctx, text, x, y, t, a, opts = {}) {
  if (t < a) return;
  const p = clamp((t - a) / 0.25);
  const sc = lerp(2.2, 1, ease.out(p));
  const size = opts.size || 70;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(opts.rot ?? -0.18);
  ctx.scale(sc, sc);
  ctx.globalAlpha = p;
  ctx.font = font(size);
  const w = ctx.measureText(text).width + size * 0.8;
  const col = opts.color || C.red;
  ctx.strokeStyle = col; ctx.lineWidth = 8;
  ctx.strokeRect(-w / 2, -size * 0.75, w, size * 1.5);
  ctx.strokeRect(-w / 2 + 10, -size * 0.75 + 10, w - 20, size * 1.5 - 20);
  ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, 0, 4);
  ctx.restore();
}

function crossOut(ctx, x, y, w, h, t, a) {
  if (t < a) return;
  const p = clamp((t - a) / 0.3);
  ctx.save();
  ctx.strokeStyle = C.red; ctx.lineWidth = 16; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x - w / 2, y - h / 2); ctx.lineTo(x - w / 2 + w * clamp(p * 2), y - h / 2 + h * clamp(p * 2)); ctx.stroke();
  if (p > 0.5) { ctx.beginPath(); ctx.moveTo(x + w / 2, y - h / 2); ctx.lineTo(x + w / 2 - w * clamp(p * 2 - 1), y - h / 2 + h * clamp(p * 2 - 1)); ctx.stroke(); }
  ctx.restore();
}

function checkMark(ctx, x, y, s, t, a, color = C.green) {
  if (t < a) return;
  const p = clamp((t - a) / 0.3);
  ctx.save();
  ctx.translate(x, y); ctx.scale(s, s);
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const path = (w, col) => {
    ctx.strokeStyle = col; ctx.lineWidth = w;
    ctx.beginPath(); ctx.moveTo(-40, 0);
    const p1 = clamp(p * 2), p2 = clamp(p * 2 - 1);
    ctx.lineTo(-40 + 30 * p1, 30 * p1);
    if (p2 > 0) ctx.lineTo(-10 + 60 * p2, 30 - 80 * p2);
    ctx.stroke();
  };
  path(30, INK); path(18, color);
  ctx.restore();
}

// paper sheet with title and lines; lines may be strings or {text, color, strike}
function paper(ctx, x, y, w, h, title, lines, opts = {}) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(opts.rot ?? 0.02);
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(-w / 2 + 12, -h / 2 + 14, w, h);
  ctx.fillStyle = C.paper; ctx.strokeStyle = INK; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.fill(); ctx.stroke();
  ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = font(opts.titleSize || 40);
  if (title) ctx.fillText(title, 0, -h / 2 + 50);
  ctx.textAlign = 'left';
  const ls = opts.lineSize || 34;
  lines.forEach((l, i) => {
    const o = typeof l === 'string' ? { text: l } : l;
    if (o.hidden) return;
    const ly = -h / 2 + (title ? 120 : 60) + i * ls * 1.5;
    ctx.font = font(ls, o.fam || 'Oswald', '700');
    ctx.fillStyle = o.color || '#3a3040';
    ctx.fillText(o.text, -w / 2 + 40, ly);
    if (o.strike) {
      const tw = ctx.measureText(o.text).width * clamp(o.strike);
      ctx.strokeStyle = C.red; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(-w / 2 + 34, ly); ctx.lineTo(-w / 2 + 46 + tw, ly); ctx.stroke();
    }
  });
  ctx.restore();
}

// handwritten-looking red note
function redNote(ctx, text, x, y, size, t, a, rot = -0.06) {
  if (t < a) return;
  const n = Math.floor(clamp((t - a) / 1.0) * text.length + 1);
  ctx.save();
  ctx.translate(x, y); ctx.rotate(rot);
  ctx.font = `italic 700 ${size}px "Old Standard TT"`;
  ctx.fillStyle = '#c0281e';
  ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.fillText(text.slice(0, n), 0, 0);
  ctx.restore();
}

function vignette(ctx, s = 0.5) {
  const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.4, W / 2, H / 2, H * 1.0);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, `rgba(0,0,0,${s})`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

// tint the whole frame (flashback sepia, dream, etc.)
function tint(ctx, color, alpha) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

// rounded frame border for flashbacks / imagination
function dreamFrame(ctx, color = '#fff', label) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.strokeStyle = color; ctx.lineWidth = 26;
  ctx.globalAlpha = 0.85;
  ctx.setLineDash([60, 30]);
  ctx.strokeRect(30, 30, W - 60, H - 60);
  ctx.restore();
  if (label) sticker(ctx, label, 260, 100, { size: 40, bg: '#fff' });
}

function iconCircle(ctx, x, y, r, color, drawFn, sc = 1) {
  if (sc <= 0.001) return;
  ctx.save();
  ctx.translate(x, y); ctx.scale(sc, sc);
  ctx.fillStyle = color; ctx.strokeStyle = INK; ctx.lineWidth = 7;
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  if (drawFn) drawFn(ctx, r);
  ctx.restore();
}

// level title card
const LEVELS = ['Аспирант', 'Неофит', 'Боевой брат', 'Сержант', 'Ветеран', 'Лейтенант', 'Капитан', 'Магистр Ордена'];
function levelCard(ctx, n, lt, opts = {}) {
  ctx.fillStyle = '#16244f';
  ctx.fillRect(0, 0, W, H);
  ctx.save();
  ctx.fillStyle = '#1d2f66';
  for (let i = -4; i < 20; i++) {
    const x = i * 160 + (lt * 120) % 160;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + 80, 0); ctx.lineTo(x - 300, H); ctx.lineTo(x - 380, H); ctx.fill();
  }
  ctx.restore();
  // rank stair silhouette on the right
  for (let i = 0; i < 8; i++) {
    const on = i < n;
    ctx.fillStyle = on ? C.gold : 'rgba(255,255,255,0.08)';
    ctx.strokeStyle = INK; ctx.lineWidth = 5;
    const sc = i === n - 1 ? pop(lt, 0.5) : 1;
    const bx = 1180 + i * 80, by = 900 - i * 70;
    ctx.save(); ctx.translate(bx + 35, by + 30); ctx.scale(sc, sc);
    ctx.beginPath(); ctx.roundRect(-35, -30, 70, 60 + i * 0, 8); ctx.fill(); ctx.stroke();
    ctx.restore();
  }
  const sc = pop(lt, 0.05, 0.45);
  ctx.save();
  ctx.translate(560, 420); ctx.rotate(-0.05); ctx.scale(sc, sc);
  ctx.fillStyle = C.gold; ctx.strokeStyle = INK; ctx.lineWidth = 12;
  ctx.beginPath(); ctx.roundRect(-380, -170, 760, 340, 34); ctx.fill(); ctx.stroke();
  ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = font(84); ctx.fillText('УРОВЕНЬ', -40, -80);
  ctx.font = font(250); ctx.fillText(String(n), 250, 30);
  ctx.restore();
  const tp = ease.out(clamp((lt - 0.45) / 0.4));
  const title = LEVELS[n - 1].toUpperCase();
  ctx.font = font(110);
  const tsize = Math.min(110, 110 * 1000 / ctx.measureText(title).width);
  outlinedText(ctx, title, lerp(-900, 140, tp), 720, tsize, { stroke: tsize * 0.2, align: 'left' });
  if (opts.stop != null) stamp(ctx, opts.stopText || 'СТОП', 1400, 300, lt, opts.stop, { size: 120 });
}

window.ENGINE = { W, H, FPS, SHOTS, shot, cue, finalizeShots, renderAt };
