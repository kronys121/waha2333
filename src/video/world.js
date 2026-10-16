// Backgrounds and props. Backgrounds paint world space roughly x -400..2320, y -300..1380
// so the camera can move and zoom a little without showing edges.

const BX0 = -500, BX1 = 2420, BY0 = -400, BY1 = 1480;
function vg(ctx, y0, y1, stops) {
  const g = ctx.createLinearGradient(0, y0, 0, y1);
  stops.forEach(([o, c]) => g.addColorStop(o, c));
  return g;
}
function fillBg(ctx, fill) { ctx.fillStyle = fill; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0); }
function strokeFill(ctx, path, fill, w = 6) {
  ctx.fillStyle = fill; ctx.fill(path);
  ctx.strokeStyle = INK; ctx.lineWidth = w; ctx.stroke(path);
}
function shape(ctx, pts, fill, w = 6) { strokeFill(ctx, poly(pts), fill, w); }
function rect(ctx, x, y, w, h, fill, r = 0, lw = 6) { const p = P(); p.roundRect(x, y, w, h, r); strokeFill(ctx, p, fill, lw); }
function circ(ctx, x, y, r, fill, lw = 6) { const p = P(); p.arc(x, y, r, 0, Math.PI * 2); strokeFill(ctx, p, fill, lw); }

// ---------- generic flat infographic background ----------
function bgFlat(ctx, t, c1 = '#2a3f7a', c2 = '#1d2f66') {
  fillBg(ctx, c1);
  ctx.fillStyle = c2;
  for (let i = -6; i < 24; i++) {
    const x = i * 140 + (t * 30) % 140;
    ctx.beginPath(); ctx.moveTo(x, BY0); ctx.lineTo(x + 60, BY0); ctx.lineTo(x - 500, BY1); ctx.lineTo(x - 560, BY1); ctx.fill();
  }
}

// ---------- Ultramar city (surface of a nice world: Macragge-like) ----------
function bgUltramarCity(ctx, t) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#6fb6ff'], [1, '#d8f0ff']]));
  // clouds
  ctx.fillStyle = '#fff';
  for (let i = 0; i < 6; i++) {
    const x = ((i * 420 + t * 20) % 2800) - 500, y = 80 + (i % 3) * 70;
    ctx.beginPath(); ctx.ellipse(x, y, 120, 40, 0, 0, Math.PI * 2); ctx.ellipse(x + 80, y - 20, 90, 40, 0, 0, Math.PI * 2); ctx.fill();
  }
  // mountains
  shape(ctx, [[-500, 700], [-200, 380], [100, 600], [400, 300], [700, 640], [1100, 260], [1500, 620], [1800, 340], [2420, 700]], '#9fb7d8', 0);
  // gleaming city: white towers with blue domes
  const r = rng(5);
  for (let i = 0; i < 18; i++) {
    const x = -300 + i * 150 + r() * 40, h = 180 + r() * 260, w = 90 + r() * 40;
    rect(ctx, x, 760 - h, w, h, '#f4f1ea', 4, 5);
    ctx.fillStyle = '#2d5bd1'; ctx.strokeStyle = INK; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(x + w / 2, 760 - h, w / 2, Math.PI, 0); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#8fb3e8';
    for (let wy = 760 - h + 30; wy < 740; wy += 50) ctx.fillRect(x + 18, wy, w - 36, 18);
    if (i % 4 === 1) { // banner
      rect(ctx, x + w / 2 - 22, 760 - h + 40, 44, 90, '#2d5bd1', 2, 4);
      ctx.fillStyle = '#f2c230'; ctx.fillRect(x + w / 2 - 14, 760 - h + 70, 28, 8);
    }
  }
  fillGround(ctx, 760, '#cfd6de', '#b5bec9');
}
function fillGround(ctx, y, c1, c2) {
  ctx.fillStyle = c1; ctx.fillRect(BX0, y, BX1 - BX0, BY1 - y);
  ctx.strokeStyle = c2; ctx.lineWidth = 4;
  for (let x = -600; x < 2600; x += 120) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (x - 960) * 0.5, BY1); ctx.stroke(); }
  for (let yy = y + 40; yy < BY1; yy += 60 + (yy - y) * 0.3) { ctx.beginPath(); ctx.moveTo(BX0, yy); ctx.lineTo(BX1, yy); ctx.stroke(); }
  ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(BX0, y); ctx.lineTo(BX1, y); ctx.stroke();
}

// ---------- Calth underground cave city ----------
function bgCave(ctx, t, opts = {}) {
  fillBg(ctx, vg(ctx, -300, 1000, [[0, '#3b3550'], [0.5, '#6a6080'], [1, '#c9b8a0']]));
  // cave ceiling with stalactites
  const r = rng(9);
  ctx.fillStyle = '#2a2638'; ctx.strokeStyle = INK; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(BX0, BY0);
  for (let x = BX0; x <= BX1; x += 80) ctx.lineTo(x, 40 + Math.sin(x * 0.004) * 60 + (r() * 90) * ((x / 80) % 2));
  ctx.lineTo(BX1, BY0); ctx.closePath(); ctx.fill(); ctx.stroke();
  // big light crystals
  for (let i = 0; i < 6; i++) {
    const x = -200 + i * 450, y = 150 + (i % 2) * 40;
    const g = ctx.createRadialGradient(x, y, 10, x, y, 360);
    g.addColorStop(0, 'rgba(255,240,190,0.55)'); g.addColorStop(1, 'rgba(255,240,190,0)');
    ctx.fillStyle = g; ctx.fillRect(x - 360, y - 360, 720, 720);
    shape(ctx, [[x - 26, y - 40], [x + 26, y - 40], [x + 14, y + 40], [x, y + 64], [x - 14, y + 40]], '#fff3c4', 5);
  }
  // back cave wall
  shape(ctx, [[BX0, 640], [BX0, 420], [-100, 380], [300, 460], [700, 390], [1100, 450], [1500, 380], [1900, 440], [BX1, 400], [BX1, 640]], '#7a7090', 6);
  // tidy houses
  const houses = opts.houses ?? true;
  if (houses) {
    for (let i = 0; i < 16; i++) {
      const x = -380 + i * 180, w = 140, h = 120 + (i % 3) * 30;
      rect(ctx, x, 700 - h, w, h, '#f1ece0', 3, 5);
      shape(ctx, [[x - 10, 700 - h], [x + w / 2, 700 - h - 50], [x + w + 10, 700 - h]], '#2d5bd1', 5);
      ctx.fillStyle = '#ffd96a';
      ctx.fillRect(x + 22, 700 - h + 30, 30, 30); ctx.fillRect(x + w - 52, 700 - h + 30, 30, 30);
      ctx.fillStyle = '#5a4a3a'; ctx.fillRect(x + w / 2 - 15, 700 - 50, 30, 50);
    }
  }
  fillGround(ctx, 700, '#d9cbb0', '#c4b496');
  if (opts.statue) statue(ctx, opts.statueX ?? 960, 700, opts.statueScale ?? 0.9, opts.statueOpts);
}

// marble statue of a marine on a plinth, helmet under arm
function statue(ctx, x, y, s, o = {}) {
  const ph = 140 * s;
  rect(ctx, x - 210 * s, y - ph, 420 * s, ph, '#bdb5a6', 6, 6);
  rect(ctx, x - 240 * s, y - ph - 26 * s, 480 * s, 30 * s, '#d6cfc0', 6, 6);
  if (o.plaque) {
    rect(ctx, x - 140 * s, y - ph + 30 * s, 280 * s, 70 * s, '#c9a24a', 6, 5);
    ctx.fillStyle = INK; ctx.font = font(28 * s); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(o.plaque, x, y - ph + 65 * s);
  }
  const cols = o.colors || MARBLE;
  marine(ctx, x, y - ph - 26 * s, s * (o.scaleY ? 1 : 1), { armL: 0.05, armR: -0.05, expr: o.expr || 'neutral', sy: o.scaleY || 1 }, { weapon: 'none', helmet: 'off', hair: o.hair || 'short', laurel: o.laurel }, cols);
  // helmet under arm
  helmetProp(ctx, x + 250 * s, y - ph - 26 * s - 250 * s * (o.scaleY || 1), s * 0.9, cols.armor);
  if (o.flowers) {
    for (let i = 0; i < 9; i++) {
      const fx = x - 200 * s + i * 50 * s, fy = y - 6;
      circ(ctx, fx, fy - 10, 14, ['#e05050', '#f2c230', '#fff'][i % 3], 4);
    }
    for (let i = 0; i < 5; i++) candle(ctx, x - 170 * s + i * 85 * s, y + 20, o.t || 0, 0.8);
  }
}

function helmetProp(ctx, x, y, s, color = '#2d5bd1', o = {}) {
  ctx.save();
  ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot || 0);
  const h = P();
  h.moveTo(-50, 30); h.bezierCurveTo(-56, -30, -30, -60, 0, -60); h.bezierCurveTo(30, -60, 56, -30, 50, 30);
  h.lineTo(48, 52); h.lineTo(26, 74); h.lineTo(-26, 74); h.lineTo(-48, 52); h.closePath();
  strokeFill(ctx, h, color, 6 / s);
  if (o.stripe) { rect(ctx, -8, -60, 16, 54, o.stripe, 4, 4); }
  shape(ctx, [[-42, 2], [-4, 10], [4, 10], [42, 2], [40, 12], [6, 18], [-6, 18], [-40, 12]], '#2a2a33', 4);
  ctx.fillStyle = o.lens || '#15131a';
  ctx.beginPath(); ctx.ellipse(-20, 30, 15, 9, 0.22, 0, Math.PI * 2); ctx.ellipse(20, 30, 15, 9, -0.22, 0, Math.PI * 2); ctx.fill();
  shape(ctx, [[-15, 46], [15, 46], [10, 74], [-10, 74]], '#2a2a33', 4);
  ctx.restore();
}

function candle(ctx, x, y, t, s = 1) {
  rect(ctx, x - 9 * s, y - 50 * s, 18 * s, 50 * s, '#f4ead2', 3, 4);
  const f = 1 + Math.sin(t * 13 + x) * 0.15;
  ctx.fillStyle = '#ffb02a';
  ctx.beginPath(); ctx.ellipse(x, y - 64 * s, 8 * s, 15 * s * f, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fff3a0';
  ctx.beginPath(); ctx.ellipse(x, y - 60 * s, 4 * s, 8 * s * f, 0, 0, Math.PI * 2); ctx.fill();
}

// ---------- Calth surface under the blue sun ----------
function bgCalthSurface(ctx, t) {
  fillBg(ctx, vg(ctx, -300, 900, [[0, '#ffffff'], [0.4, '#bfe6ff'], [1, '#6ab0e8']]));
  const pulse = 1 + Math.sin(t * 3) * 0.03;
  const g = ctx.createRadialGradient(1400, 150, 40, 1400, 150, 700 * pulse);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.3, 'rgba(140,210,255,0.8)'); g.addColorStop(1, 'rgba(140,210,255,0)');
  ctx.fillStyle = g; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0);
  circ(ctx, 1400, 150, 120, '#e8f8ff', 6);
  // rays
  ctx.save(); ctx.translate(1400, 150); ctx.rotate(t * 0.2);
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  for (let i = 0; i < 12; i++) { ctx.rotate(Math.PI / 6); ctx.beginPath(); ctx.moveTo(140, -20); ctx.lineTo(900, -70); ctx.lineTo(900, 70); ctx.lineTo(140, 20); ctx.fill(); }
  ctx.restore();
  shape(ctx, [[BX0, 760], [-100, 640], [300, 700], [600, 600], [900, 690], [1300, 620], [1700, 700], [2100, 630], [BX1, 680], [BX1, BY1], [BX0, BY1]], '#c9b89a', 6);
  fillRect(ctx, BX0, 820, BX1 - BX0, BY1 - 820, '#b8a080');
  // scorched cracks
  ctx.strokeStyle = '#7a5a3a'; ctx.lineWidth = 6;
  for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(i * 300 - 200, 860); ctx.lineTo(i * 300 - 140, 920); ctx.lineTo(i * 300 - 180, 990); ctx.stroke(); }
  // hatch to the underground
  rect(ctx, 260, 780, 220, 60, '#5a5a66', 8, 6);
  rect(ctx, 300, 760, 140, 30, '#7d8796', 8, 6);
}
function fillRect(ctx, x, y, w, h, c) { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); }

// ---------- space ----------
function bgSpace(ctx, t, opts = {}) {
  fillBg(ctx, opts.bg || '#0b0b1e');
  const r = rng(77);
  for (let i = 0; i < 260; i++) {
    const x = BX0 + r() * (BX1 - BX0), y = BY0 + r() * (BY1 - BY0), s = r() * 3 + 1;
    ctx.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(t * (0.5 + r()) + i));
    ctx.fillStyle = '#fff'; ctx.fillRect(x, y, s, s);
  }
  ctx.globalAlpha = 1;
  if (opts.nebula) {
    const g = ctx.createRadialGradient(400, 300, 50, 400, 300, 900);
    g.addColorStop(0, opts.nebula); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(BX0, BY0, BX1 - BX0, BY1 - BY0);
  }
}

function planet(ctx, x, y, r, c1, c2, opts = {}) {
  ctx.save();
  const p = P(); p.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = c1; ctx.fill(p);
  ctx.save(); ctx.clip(p);
  ctx.fillStyle = c2;
  const rr_ = rng(opts.seed || 3);
  for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(x + (rr_() - 0.5) * r * 1.6, y + (rr_() - 0.5) * r * 1.6, r * (0.15 + rr_() * 0.3), r * (0.1 + rr_() * 0.2), rr_() * 3, 0, Math.PI * 2); ctx.fill(); }
  if (opts.eaten != null) { // grey creeping over the planet
    ctx.fillStyle = '#8a8478';
    ctx.beginPath(); ctx.arc(x - r * 1.2 + opts.eaten * r * 2.4, y, r * 1.3, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath(); ctx.arc(x + r * 0.35, y + r * 0.3, r, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  if (opts.atmo != null) {
    ctx.strokeStyle = `rgba(150,210,255,${opts.atmo})`; ctx.lineWidth = r * 0.12;
    ctx.beginPath(); ctx.arc(x, y, r * 1.06, 0, Math.PI * 2); ctx.stroke();
  }
  ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.stroke(p);
  ctx.restore();
}

// ---------- wild death world ----------
function bgWild(ctx, t, opts = {}) {
  const night = opts.night || 0;
  fillBg(ctx, vg(ctx, -300, 900, [[0, night ? '#1a1838' : '#f0a060'], [1, night ? '#3a3050' : '#ffd8a0']]));
  if (night) { const r = rng(4); ctx.fillStyle = '#fff'; for (let i = 0; i < 80; i++) ctx.fillRect(BX0 + r() * 2900, BY0 + r() * 900, 3, 3); }
  shape(ctx, [[BX0, 700], [-200, 380], [100, 560], [450, 300], [800, 600], [1150, 340], [1500, 580], [1850, 360], [BX1, 640], [BX1, 800], [BX0, 800]], night ? '#2a2440' : '#9a6a5a', 6);
  shape(ctx, [[BX0, 800], [-100, 640], [300, 720], [700, 620], [1100, 700], [1500, 640], [1900, 720], [BX1, 660], [BX1, 860], [BX0, 860]], night ? '#3a3050' : '#7a5a4a', 6);
  fillGround(ctx, 840, night ? '#4a4060' : '#8a6a52', night ? '#3a3050' : '#7a5a44');
  const r = rng(12);
  for (let i = 0; i < 14; i++) {
    const x = BX0 + r() * 2900, y = 880 + r() * 450, s = 30 + r() * 60;
    shape(ctx, [[x - s, y], [x - s * 0.5, y - s * 0.8], [x + s * 0.5, y - s * 0.7], [x + s, y]], night ? '#2a2440' : '#5a4436', 5);
  }
}

// ---------- arena ----------
function bgArena(ctx, t) {
  fillBg(ctx, vg(ctx, -300, 700, [[0, '#4a5a8a'], [1, '#8a9ac0']]));
  // stands with crowd
  shape(ctx, [[BX0, 640], [BX0, 200], [BX1, 200], [BX1, 640]], '#8a7a6a', 6);
  const r = rng(21);
  for (let row = 0; row < 5; row++) {
    for (let i = 0; i < 40; i++) {
      const x = BX0 + i * 75 + (row % 2) * 35, y = 260 + row * 80 + Math.sin(t * 4 + i + row) * 3;
      ctx.fillStyle = ['#5a4a7a', '#7a5a4a', '#4a6a7a', '#6a6a5a'][Math.floor(r() * 4)];
      ctx.beginPath(); ctx.arc(x, y, 22, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(x - 24, y + 18, 48, 40);
    }
  }
  for (let i = 0; i < 6; i++) { rect(ctx, -300 + i * 500, 120, 80, 160, '#2d5bd1', 4, 5); ctx.fillStyle = '#f2c230'; ctx.fillRect(-280 + i * 500, 180, 40, 10); }
  rect(ctx, BX0, 620, BX1 - BX0, 40, '#c9b8a0', 0, 6);
  fillGround(ctx, 660, '#d9c49a', '#c8b086');
}

// ---------- interiors ----------
function bgStoneRoom(ctx, t, opts = {}) {
  const wall = opts.wall || '#8a8aa0', floor = opts.floor || '#6a6070';
  fillBg(ctx, wall);
  ctx.strokeStyle = darken(wall, 0.8); ctx.lineWidth = 5;
  for (let y = -400, row = 0; y < 760; y += 80, row++) {
    ctx.beginPath(); ctx.moveTo(BX0, y); ctx.lineTo(BX1, y); ctx.stroke();
    for (let x = BX0 + (row % 2) * 80; x < BX1; x += 160) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 80); ctx.stroke(); }
  }
  if (opts.windows !== false) {
    for (let i = 0; i < 4; i++) {
      const x = -100 + i * 640;
      const p = P(); p.moveTo(x, 520); p.lineTo(x, 200); p.quadraticCurveTo(x, 80, x + 80, 40); p.quadraticCurveTo(x + 160, 80, x + 160, 200); p.lineTo(x + 160, 520); p.closePath();
      strokeFill(ctx, p, opts.windowColor || '#9fd0ff', 8);
      ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x + 80, 50); ctx.lineTo(x + 80, 520); ctx.moveTo(x, 300); ctx.lineTo(x + 160, 300); ctx.stroke();
    }
  }
  if (opts.banners) {
    for (let i = 0; i < 3; i++) banner(ctx, 280 + i * 680, 80, 0.9, t + i);
  }
  fillGround(ctx, 760, floor, darken(floor, 0.85));
}

function banner(ctx, x, y, s, t = 0, color = '#2d5bd1') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rect(ctx, -120, -12, 240, 20, '#c9a24a', 6, 5);
  const sway = Math.sin(t * 1.5) * 8;
  const p = P(); p.moveTo(-100, 8); p.lineTo(100, 8); p.lineTo(100 + sway, 360); p.lineTo(sway, 300); p.lineTo(-100 + sway, 360); p.closePath();
  strokeFill(ctx, p, color, 6);
  // eagle-ish emblem
  shape(ctx, [[sway * 0.5, 110], [-70 + sway * 0.5, 90], [-50 + sway * 0.5, 130], [-70 + sway * 0.5, 150], [sway * 0.5, 170], [70 + sway * 0.5, 150], [50 + sway * 0.5, 130], [70 + sway * 0.5, 90]], '#f2c230', 5);
  ctx.restore();
}

function bgMed(ctx, t) {
  fillBg(ctx, '#cfe8e6');
  ctx.strokeStyle = '#b4d4d2'; ctx.lineWidth = 4;
  for (let x = BX0; x < BX1; x += 90) { ctx.beginPath(); ctx.moveTo(x, BY0); ctx.lineTo(x, 760); ctx.stroke(); }
  for (let y = BY0; y < 760; y += 90) { ctx.beginPath(); ctx.moveTo(BX0, y); ctx.lineTo(BX1, y); ctx.stroke(); }
  for (let i = 0; i < 3; i++) {
    rect(ctx, 100 + i * 700, 150, 260, 170, '#1d2f3a', 10, 6);
    ctx.strokeStyle = '#4cff7a'; ctx.lineWidth = 5; ctx.beginPath();
    for (let x = 0; x < 230; x += 5) { const ph = (x + t * 200) % 230; ctx.lineTo(115 + i * 700 + x, 235 - (ph > 100 && ph < 120 ? 60 * Math.sin((ph - 100) / 20 * Math.PI) : 0)); }
    ctx.stroke();
  }
  fillGround(ctx, 760, '#e8f2f0', '#cfe0dd');
}

function bgTunnel(ctx, t, opts = {}) {
  fillBg(ctx, '#2a2430');
  for (let i = 8; i >= 0; i--) {
    const k = i / 8, w = lerp(260, 2600, k), h = lerp(180, 1500, k);
    ctx.fillStyle = darken('#5a4a5a', lerp(0.25, 1, k));
    ctx.strokeStyle = INK; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.ellipse(960, 560, w / 2, h / 2, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  }
  ctx.fillStyle = '#05040a'; ctx.beginPath(); ctx.ellipse(960, 560, 130, 90, 0, 0, Math.PI * 2); ctx.fill();
  if (opts.eyes) {
    const r = rng(8);
    for (let i = 0; i < opts.eyes; i++) {
      const x = 960 + (r() - 0.5) * 220, y = 540 + (r() - 0.5) * 120;
      const b = ((t * 0.7 + r() * 3) % 3) < 0.15 ? 0 : 1;
      ctx.fillStyle = '#ff3b2f'; ctx.globalAlpha = b;
      ctx.beginPath(); ctx.ellipse(x - 8, y, 5, 3, 0, 0, Math.PI * 2); ctx.ellipse(x + 8, y, 5, 3, 0, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  fillGround(ctx, 900, '#3a3040', '#2a2430');
}

function bgSnow(ctx, t, opts = {}) {
  fillBg(ctx, vg(ctx, -300, 800, [[0, '#7a8aa0'], [1, '#c8d4e0']]));
  // fortress
  rect(ctx, 200, 260, 1500, 460, '#6a7080', 4, 6);
  for (let i = 0; i < 6; i++) rect(ctx, 160 + i * 300, 160, 140, 560, '#7a8090', 4, 6);
  for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) { ctx.fillStyle = '#2a2a33'; ctx.fillRect(200 + i * 300, 220 + j * 120, 60, 70); }
  fillGround(ctx, 760, '#f2f6fa', '#dde6ee');
  // falling snow
  const r = rng(31);
  ctx.fillStyle = '#fff';
  for (let i = 0; i < 160; i++) {
    const x = (BX0 + r() * 2900 + t * 40) % 2900 + BX0, y = ((r() * 1800 + t * (60 + r() * 60)) % 1800) + BY0;
    ctx.beginPath(); ctx.arc(x, y, 3 + r() * 4, 0, Math.PI * 2); ctx.fill();
  }
}

function bgHulk(ctx, t, opts = {}) {
  fillBg(ctx, '#1a1a24');
  const tilt = opts.tilt || 0;
  ctx.save(); ctx.translate(960, 540); ctx.rotate(tilt); ctx.translate(-960, -540);
  for (let i = 0; i < 7; i++) {
    const x = -300 + i * 380, a = (i % 3 - 1) * 0.35;
    ctx.save(); ctx.translate(x + 150, 500); ctx.rotate(a);
    rect(ctx, -170, -420, 340, 840, ['#4a4a5a', '#5a4a3a', '#3a4a5a'][i % 3], 10, 6);
    for (let j = 0; j < 6; j++) rect(ctx, -140, -380 + j * 130, 280, 90, darken(['#4a4a5a', '#5a4a3a', '#3a4a5a'][i % 3], 0.7), 6, 4);
    ctx.restore();
  }
  ctx.restore();
  // red warning lights
  for (let i = 0; i < 5; i++) {
    const on = Math.sin(t * 4 + i * 2) > 0;
    ctx.fillStyle = on ? 'rgba(255,60,40,0.9)' : 'rgba(120,20,20,0.6)';
    ctx.beginPath(); ctx.arc(-100 + i * 500, 80, 20, 0, Math.PI * 2); ctx.fill();
  }
  fillGround(ctx, 860, '#3a3a46', '#2a2a36');
}

function bgHall(ctx, t, opts = {}) {
  fillBg(ctx, vg(ctx, -300, 800, [[0, '#2a2440'], [1, '#5a4a6a']]));
  for (let i = 0; i < 7; i++) {
    const x = -300 + i * 420;
    rect(ctx, x, -300, 110, 1100, '#8a7a9a', 4, 6);
    rect(ctx, x - 20, 700, 150, 60, '#7a6a8a', 4, 6);
  }
  if (opts.throne) throne(ctx, 960, 760, 1, opts.throne);
  if (opts.doors) {
    rect(ctx, 760, 260, 400, 500, '#3a2a20', 10, 8);
    ctx.fillStyle = '#5a4030'; ctx.fillRect(780, 280, 170, 460); ctx.fillRect(970, 280, 170, 460);
  }
  fillGround(ctx, 760, '#6a5a6a', '#5a4a5a');
}

function throne(ctx, x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-260, 0], [-240, -700], [-120, -820], [0, -760], [120, -820], [240, -700], [260, 0]], '#c9a24a', 8);
  rect(ctx, -200, -340, 400, 340, '#a8842a', 10, 8);
  if (o.stasis) {
    const g = ctx.createRadialGradient(0, -400, 40, 0, -400, 520);
    g.addColorStop(0, 'rgba(140,220,255,0.7)'); g.addColorStop(1, 'rgba(140,220,255,0)');
    ctx.fillStyle = g; ctx.fillRect(-520, -920, 1040, 1000);
  }
  ctx.restore();
}

function bgCouncil(ctx, t) {
  bgStoneRoom(ctx, t, { wall: '#5a6a9a', floor: '#4a4a6a', banners: true, windows: false });
}

function bgWarehouse(ctx, t) {
  fillBg(ctx, '#6a5a4a');
  for (let s = 0; s < 3; s++) {
    const x = -300 + s * 900;
    for (let lvl = 0; lvl < 4; lvl++) {
      rect(ctx, x, 100 + lvl * 170, 800, 20, '#3a2e26', 2, 5);
      for (let i = 0; i < 6; i++) crate(ctx, x + 30 + i * 128, 100 + lvl * 170, 0.9, (i + lvl + s) % 3);
    }
  }
  fillGround(ctx, 780, '#8a7a66', '#7a6a56');
}

function crate(ctx, x, y, s, kind = 0) {
  const w = 120 * s, h = 110 * s;
  rect(ctx, x, y - h, w, h, ['#b8864a', '#7a8a5a', '#8a6a4a'][kind], 4, 5);
  ctx.strokeStyle = INK; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x + w, y); ctx.moveTo(x + w, y - h); ctx.lineTo(x, y); ctx.stroke();
}

// ---------- props ----------
function tablet(ctx, x, y, s, t, opts = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(opts.rot || 0);
  rect(ctx, -110, -150, 220, 300, '#3d3f48', 18, 6);
  rect(ctx, -90, -125, 180, 230, '#bff0c0', 8, 4);
  ctx.fillStyle = '#2a6a3a';
  for (let i = 0; i < 5; i++) ctx.fillRect(-70, -100 + i * 40, 90 + (i % 2) * 30, 10);
  ctx.restore();
}

function dropPod(ctx, x, y, s, open = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  shape(ctx, [[-150, 0], [-110, -320], [0, -420], [110, -320], [150, 0]], '#2d5bd1', 7);
  for (const k of [-1, 1]) shape(ctx, [[k * 110, -320], [k * 230, -40], [k * 200, 0], [k * 120, -60]], '#1f3f96', 6);
  rect(ctx, -60, -260, 120, 200, open ? '#15131a' : '#f2c230', 8, 6);
  ctx.restore();
}

function ship(ctx, x, y, s, color = '#2d5bd1', dir = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  shape(ctx, [[-260, -40], [180, -50], [300, 0], [180, 50], [-260, 40], [-300, 70], [-330, 0], [-300, -70]], '#9aa4b4', 7);
  shape(ctx, [[-200, -40], [-120, -110], [40, -110], [80, -48]], color, 6);
  rect(ctx, -100, -20, 260, 30, color, 6, 5);
  for (let i = 0; i < 6; i++) { ctx.fillStyle = '#ffe28a'; ctx.fillRect(-180 + i * 50, 18, 18, 10); }
  ctx.fillStyle = '#7fd3ff';
  ctx.beginPath(); ctx.ellipse(-340, 0, 30, 26, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function hiveShip(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const p = P();
  p.moveTo(-260, 0); p.bezierCurveTo(-200, -140, 160, -160, 260, -20); p.bezierCurveTo(200, 120, -180, 130, -260, 0);
  strokeFill(ctx, p, '#7b3fa0', 7);
  for (let i = 0; i < 5; i++) shape(ctx, [[-180 + i * 80, -90], [-150 + i * 80, -150 - (i % 2) * 30], [-130 + i * 80, -100]], '#e8c9a0', 5);
  ctx.strokeStyle = INK; ctx.lineWidth = 8;
  for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-200 + i * 70, 60); ctx.bezierCurveTo(-210 + i * 70, 120 + Math.sin(t * 3 + i) * 20, -190 + i * 70, 160, -220 + i * 70, 200 + Math.sin(t * 2 + i) * 20); ctx.stroke(); }
  ctx.restore();
}

function hulk(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(t * 0.2) * 0.05);
  const r = rng(44);
  for (let i = 0; i < 16; i++) {
    const a = r() * Math.PI * 2, d = r() * 220;
    ctx.save(); ctx.translate(Math.cos(a) * d, Math.sin(a) * d * 0.7); ctx.rotate(r() * 3);
    rect(ctx, -160, -50, 320, 100, ['#5a5a6a', '#6a5a4a', '#4a5a6a', '#7a6a5a'][i % 4], 20, 6);
    ctx.fillStyle = '#ffd96a'; for (let j = 0; j < 4; j++) ctx.fillRect(-120 + j * 70, -10, 20, 14);
    ctx.restore();
  }
  ctx.restore();
}

function explosion(ctx, x, y, s, t, seed = 1) {
  const p = (t % 1.2) / 1.2;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (0.4 + p), s * (0.4 + p));
  ctx.globalAlpha = 1 - p;
  const r = rng(seed);
  ctx.fillStyle = '#ff7a2a'; ctx.strokeStyle = INK; ctx.lineWidth = 6;
  ctx.beginPath();
  for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2, rr2 = i % 2 ? 70 : 120 + r() * 30; ctx.lineTo(Math.cos(a) * rr2, Math.sin(a) * rr2); }
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#ffe06a'; ctx.beginPath(); ctx.arc(0, 0, 55, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function tracer(ctx, x0, y0, x1, y1, t, speed = 3, color = '#ffe06a') {
  const p = (t * speed) % 1;
  const x = lerp(x0, x1, p), y = lerp(y0, y1, p);
  const dx = (x1 - x0) * 0.06, dy = (y1 - y0) * 0.06;
  ctx.strokeStyle = color; ctx.lineWidth = 8; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x - dx, y - dy); ctx.lineTo(x, y); ctx.stroke();
}

function muzzleFlash(ctx, x, y, s, t) {
  if (Math.floor(t * 12) % 2) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#ffe06a'; ctx.strokeStyle = '#ff7a2a'; ctx.lineWidth = 6;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2, r = i % 2 ? 22 : 60; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}

function book(ctx, x, y, s, title, opts = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(opts.rot || 0);
  rect(ctx, -200, -260, 400, 520, opts.color || '#2d5bd1', 14, 7);
  rect(ctx, -170, -230, 340, 460, 'rgba(0,0,0,0)', 8, 5);
  shape(ctx, [[0, -150], [-110, -175], [-90, -130], [0, -110], [90, -130], [110, -175]], '#f2c230', 5);
  ctx.fillStyle = '#f2c230'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const lines = title.split('\n');
  ctx.font = font(48);
  lines.forEach((l, i) => ctx.fillText(l, 0, -20 + i * 60));
  ctx.restore();
}

function bread(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const p = P(); p.ellipse(0, 0, 90, 50, 0, Math.PI, 0); p.lineTo(90, 10); p.lineTo(-90, 10); p.closePath();
  strokeFill(ctx, p, '#d9963a', 6);
  ctx.strokeStyle = '#8a5a1a'; ctx.lineWidth = 6;
  for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(i * 35 - 12, -30); ctx.lineTo(i * 35 + 12, -10); ctx.stroke(); }
  ctx.restore();
}

function ration(ctx, x, y, s, label = 'ПАЁК') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rect(ctx, -70, -90, 140, 180, '#7a8a5a', 10, 6);
  rect(ctx, -70, -90, 140, 40, '#5a6a3a', 10, 6);
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = font(30);
  ctx.fillText(label, 0, 10);
  ctx.restore();
}

function clockFace(ctx, x, y, r, t, speed = 1) {
  circ(ctx, x, y, r, '#fff', 7);
  ctx.strokeStyle = INK; ctx.lineCap = 'round';
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * 0.8, y + Math.sin(a) * r * 0.8); ctx.lineTo(x + Math.cos(a) * r * 0.92, y + Math.sin(a) * r * 0.92); ctx.stroke(); }
  const a1 = t * speed, a2 = t * speed / 12;
  ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(a1) * r * 0.75, y - Math.cos(a1) * r * 0.75); ctx.stroke();
  ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(a2) * r * 0.5, y - Math.cos(a2) * r * 0.5); ctx.stroke();
}

function mushroom(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rect(ctx, -14, -50, 28, 50, '#f4ead2', 8, 5);
  const p = P(); p.ellipse(0, -50, 50, 34, 0, Math.PI, 0); p.closePath();
  strokeFill(ctx, p, '#b07ad8', 5);
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-18, -64, 7, 0, Math.PI * 2); ctx.arc(16, -70, 6, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function skullIcon(ctx, x, y, s, color = '#f4ead2') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  circ(ctx, 0, 0, 40, color, 5);
  rect(ctx, -22, 24, 44, 26, color, 6, 5);
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(-15, -2, 10, 0, Math.PI * 2); ctx.arc(15, -2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function heartIcon(ctx, x, y, s, color = '#e0404a') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const p = P(); p.moveTo(0, 30); p.bezierCurveTo(-60, -10, -40, -60, 0, -30); p.bezierCurveTo(40, -60, 60, -10, 0, 30);
  strokeFill(ctx, p, color, 6);
  ctx.restore();
}

function critter(ctx, x, y, s, t, flip = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * flip, s);
  const b = Math.abs(Math.sin(t * 20)) * 6;
  ctx.translate(0, -b);
  shape(ctx, [[-40, 0], [-30, -30], [20, -36], [44, -16], [40, 0]], '#8a7a6a', 5);
  circ(ctx, 30, -26, 5, INK, 0);
  ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-40, -10); ctx.quadraticCurveTo(-70, -30, -80, -6); ctx.stroke();
  ctx.restore();
}

function grid10(ctx, x, y, s, dead, t, a) {
  // 10 little marine icons, `dead` of them greyed out progressively from local time a
  for (let i = 0; i < 10; i++) {
    const gx = x + (i % 5) * 150 * s, gy = y + Math.floor(i / 5) * 210 * s;
    const isDead = i < dead && t > a + i * 0.12;
    ctx.save(); ctx.globalAlpha = isDead ? 0.35 : 1;
    drawRig(ctx, rig('marine', { weapon: 'none' }), gx, gy, 0.28 * s, {}, isDead ? MARBLE : PAL.ultra, { flat: true, outlineW: 4 });
    ctx.restore();
    if (isDead) skullIcon(ctx, gx, gy - 90 * s, 0.6 * s);
  }
}
