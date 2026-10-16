// Scene backgrounds. Each takes (ctx, pal, t, rng) and paints the full 1920x1080 frame.

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function vgrad(ctx, y0, y1, stops) {
  const g = ctx.createLinearGradient(0, y0, 0, y1);
  stops.forEach(([o, c]) => g.addColorStop(o, c));
  return g;
}

function hiveBackground(ctx, pal, t) {
  const W = 1920, H = 1080;
  const rng = mulberry32(7);
  ctx.fillStyle = vgrad(ctx, 0, H, pal.sky);
  ctx.fillRect(0, 0, W, H);

  // far spires
  for (let layer = 0; layer < 2; layer++) {
    const r = mulberry32(11 + layer);
    ctx.fillStyle = layer === 0 ? pal.far : pal.mid;
    let x = -60;
    while (x < W + 60) {
      const w = 90 + r() * 160;
      const h = (layer === 0 ? 520 : 380) + r() * 300;
      const base = layer === 0 ? 800 : 860;
      ctx.beginPath();
      ctx.moveTo(x, base);
      ctx.lineTo(x, base - h);
      ctx.lineTo(x + w * 0.2, base - h - 40);
      ctx.lineTo(x + w * 0.35, base - h - 40 - r() * 120);
      ctx.lineTo(x + w * 0.5, base - h - 40);
      ctx.lineTo(x + w * 0.8, base - h - 10);
      ctx.lineTo(x + w, base - h + 30);
      ctx.lineTo(x + w, base);
      ctx.fill();
      // windows
      ctx.save();
      ctx.fillStyle = pal.window;
      for (let i = 0; i < 26; i++) {
        if (r() < 0.55) continue;
        const wx = x + 10 + r() * (w - 24);
        const wy = base - h + 30 + r() * (h - 60);
        const flick = 0.6 + 0.4 * Math.sin(t * 3 + i * 7 + x);
        ctx.globalAlpha = (layer === 0 ? 0.5 : 0.9) * flick;
        ctx.fillRect(wx, wy, 8, 12);
      }
      ctx.restore();
      ctx.fillStyle = layer === 0 ? pal.far : pal.mid;
      x += w + 10 + r() * 40;
    }
  }

  // haze band
  ctx.fillStyle = vgrad(ctx, 600, 900, [[0, 'rgba(0,0,0,0)'], [0.5, pal.haze], [1, 'rgba(0,0,0,0)']]);
  ctx.fillRect(0, 600, W, 300);

  // big pipes
  ctx.fillStyle = pal.pipe;
  ctx.fillRect(0, 180, W, 70);
  ctx.fillRect(1250, 0, 80, 900);
  ctx.fillStyle = pal.pipeDark;
  for (let x = 60; x < W; x += 260) ctx.fillRect(x, 168, 34, 94);
  for (let y = 60; y < 900; y += 220) ctx.fillRect(1238, y, 104, 30);
  ctx.fillRect(0, 238, W, 12);

  // hanging cables
  ctx.strokeStyle = pal.cable;
  ctx.lineWidth = 6;
  for (let i = 0; i < 6; i++) {
    const x0 = 100 + i * 330 + rng() * 80;
    const x1 = x0 + 200 + rng() * 120;
    const sag = 120 + rng() * 140 + Math.sin(t * 0.8 + i) * 6;
    ctx.beginPath();
    ctx.moveTo(x0, 250);
    ctx.quadraticCurveTo((x0 + x1) / 2, 250 + sag * 2, x1, 250);
    ctx.stroke();
  }

  // floor
  ctx.fillStyle = pal.ground;
  ctx.fillRect(0, 880, W, 200);
  ctx.strokeStyle = pal.groundLine;
  ctx.lineWidth = 4;
  for (let x = -200; x < W + 200; x += 90) {
    ctx.beginPath(); ctx.moveTo(x, 880); ctx.lineTo(x + (x - W / 2) * 0.35, 1080); ctx.stroke();
  }
  for (const y of [910, 960, 1030]) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  // rubble
  ctx.fillStyle = pal.rubble;
  for (let i = 0; i < 14; i++) {
    const rx = rng() * W, ry = 900 + rng() * 150, s = 20 + rng() * 50;
    ctx.beginPath();
    ctx.moveTo(rx - s, ry + s * 0.4);
    ctx.lineTo(rx - s * 0.4, ry - s * 0.5);
    ctx.lineTo(rx + s * 0.6, ry - s * 0.3);
    ctx.lineTo(rx + s, ry + s * 0.4);
    ctx.fill();
  }
  // puddle
  ctx.fillStyle = pal.puddle;
  ctx.beginPath(); ctx.ellipse(1500, 990, 220, 30, 0, 0, Math.PI * 2); ctx.fill();
}

function gothicWall(ctx, x, y, w, h, color) {
  // wall with pointed arch windows (holes) and a broken top edge
  const p = new Path2D();
  const r = mulberry32(Math.floor(x));
  p.moveTo(x, y + h);
  p.lineTo(x, y + 40);
  const steps = 8;
  for (let i = 1; i <= steps; i++) p.lineTo(x + (w * i) / steps, y + r() * 120);
  p.lineTo(x + w, y + h);
  p.closePath();
  const n = Math.max(1, Math.floor(w / 170));
  for (let i = 0; i < n; i++) {
    const ax = x + (w / n) * (i + 0.5);
    const aw = Math.min(90, w / n * 0.55);
    const top = y + 170, bot = y + h - 140;
    p.moveTo(ax - aw / 2, bot);
    p.lineTo(ax - aw / 2, top + aw);
    p.quadraticCurveTo(ax - aw / 2, top + aw * 0.2, ax, top);
    p.quadraticCurveTo(ax + aw / 2, top + aw * 0.2, ax + aw / 2, top + aw);
    p.lineTo(ax + aw / 2, bot);
    p.closePath();
  }
  ctx.fillStyle = color;
  ctx.fill(p, 'evenodd');
}

function battleBackground(ctx, pal, t) {
  const W = 1920, H = 1080;
  const rng = mulberry32(3);
  ctx.fillStyle = vgrad(ctx, 0, H, pal.sky);
  ctx.fillRect(0, 0, W, H);

  // distant glow of burning city
  const g = ctx.createRadialGradient(1500, 760, 50, 1500, 760, 900);
  g.addColorStop(0, pal.glow);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // smoke columns
  for (let i = 0; i < 40; i++) {
    const sx = 200 + (i % 4) * 480 + rng() * 120;
    const sy = 760 - (((i * 37 + t * 40) % 800));
    const sr = 80 + rng() * 120;
    ctx.fillStyle = pal.smoke;
    ctx.globalAlpha = 0.25;
    ctx.beginPath(); ctx.arc(sx + Math.sin(sy * 0.01) * 40, sy, sr, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;

  gothicWall(ctx, -40, 260, 560, 620, pal.far);
  gothicWall(ctx, 1300, 200, 700, 680, pal.far);
  gothicWall(ctx, 560, 420, 380, 460, pal.far2);

  // broken column
  ctx.fillStyle = pal.mid;
  ctx.fillRect(1180, 420, 70, 480);
  ctx.beginPath(); ctx.moveTo(1170, 430); ctx.lineTo(1260, 400); ctx.lineTo(1240, 440); ctx.lineTo(1170, 450); ctx.fill();
  ctx.fillRect(300, 520, 60, 380);

  // ground
  ctx.fillStyle = vgrad(ctx, 860, H, [[0, pal.ground], [1, pal.groundDark]]);
  ctx.beginPath();
  ctx.moveTo(0, 880);
  for (let x = 0; x <= W; x += 80) ctx.lineTo(x, 870 + Math.sin(x * 0.013) * 18);
  ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();

  // craters
  for (const [cx, cy, rx] of [[300, 980, 220], [1650, 1010, 260], [980, 1060, 160]]) {
    ctx.fillStyle = pal.crater;
    ctx.beginPath(); ctx.ellipse(cx, cy, rx, rx * 0.18, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = pal.craterRim;
    ctx.beginPath(); ctx.ellipse(cx, cy - rx * 0.05, rx * 0.8, rx * 0.1, 0, Math.PI, Math.PI * 2); ctx.fill();
  }
  // debris + skulls
  for (let i = 0; i < 18; i++) {
    const dx = rng() * W, dy = 900 + rng() * 170, s = 10 + rng() * 30;
    ctx.fillStyle = pal.rubble;
    ctx.fillRect(dx, dy, s * 1.6, s * 0.7);
  }
  for (const [kx, ky] of [[520, 1000], [1400, 960], [180, 940]]) {
    ctx.fillStyle = pal.bone;
    ctx.beginPath(); ctx.arc(kx, ky, 16, 0, Math.PI * 2); ctx.fill();
    ctx.fillRect(kx - 9, ky + 8, 18, 12);
    ctx.fillStyle = pal.groundDark;
    ctx.beginPath(); ctx.arc(kx - 6, ky, 4, 0, Math.PI * 2); ctx.arc(kx + 6, ky, 4, 0, Math.PI * 2); ctx.fill();
  }

  // fires
  for (const [fx, fy, fs] of [[420, 900, 1], [1560, 880, 1.4], [760, 930, 0.7]]) drawFire(ctx, fx, fy, fs, t, pal);

  // embers
  for (let i = 0; i < 60; i++) {
    const ex = (rng() * W + t * 30) % W;
    const ey = H - ((rng() * H + t * (60 + rng() * 80)) % H);
    ctx.fillStyle = pal.ember;
    ctx.globalAlpha = 0.5 + rng() * 0.5;
    ctx.fillRect(ex, ey, 4, 4);
  }
  ctx.globalAlpha = 1;
}

function drawFire(ctx, x, y, s, t, pal) {
  const layers = [[pal.fire1, 1], [pal.fire2, 0.7], [pal.fire3, 0.4]];
  for (const [color, k] of layers) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - 70 * s * k, y);
    for (let i = 0; i <= 6; i++) {
      const fx = x - 70 * s * k + (140 * s * k * i) / 6;
      const fh = (i % 2 ? 160 : 70) * s * k * (0.85 + 0.15 * Math.sin(t * 9 + i * 2 + x));
      ctx.lineTo(fx, y - fh);
    }
    ctx.lineTo(x + 70 * s * k, y);
    ctx.fill();
  }
}

window.BACKGROUNDS = { hive: hiveBackground, battle: battleBackground };
window.mulberry32 = mulberry32;
