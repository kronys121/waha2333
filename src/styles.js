// Three candidate looks. Each style: palettes per scene, figure colors, how parts are painted, UI overlay.

const W = 1920, H = 1080;

function wrapLines(ctx, text, maxW) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const test = cur ? cur + ' ' + w : w;
    if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; } else cur = test;
  }
  if (cur) lines.push(cur);
  return lines;
}

function roman(n) {
  return ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'][n] || String(n);
}

// Paint figure parts. opts: outline color/width, shade {color, dx, dy}, rim {color, dx, dy}, glow color.
function drawFigure(ctx, parts, colors, x, y, s, opts) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.lineJoin = 'round';
  for (const part of parts) {
    const base = colors[part.role];
    if (!base) continue;
    if (part.glow && opts.glow) { ctx.shadowColor = opts.glow; ctx.shadowBlur = 40; }
    ctx.fillStyle = base;
    ctx.fill(part.path);
    ctx.shadowBlur = 0;
    for (const fx of [opts.shade, opts.rim]) {
      if (!fx || part.role === 'ink' || part.glow || part.role === 'grille') continue;
      ctx.save();
      ctx.clip(part.path);
      ctx.fillStyle = typeof fx.color === 'function' ? fx.color(base) : fx.color;
      ctx.globalAlpha = fx.alpha ?? 1;
      ctx.fillRect(-1000, -1000, 2000, 2000);
      ctx.globalAlpha = 1;
      ctx.translate(fx.dx, fx.dy);
      ctx.fillStyle = base;
      ctx.fill(part.path);
      ctx.restore();
    }
    if (opts.outline && part.role !== 'ink' && part.role !== 'grille') {
      ctx.strokeStyle = opts.outline;
      ctx.lineWidth = opts.outlineW / s;
      ctx.stroke(part.path);
    }
  }
  ctx.restore();
}

function shadowEllipse(ctx, x, y, rx, color) {
  ctx.fillStyle = color;
  ctx.beginPath(); ctx.ellipse(x, y, rx, rx * 0.16, 0, 0, Math.PI * 2); ctx.fill();
}

function darken(hex, k) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * k), g = Math.round(((n >> 8) & 255) * k), b = Math.round((n & 255) * k);
  return `rgb(${r},${g},${b})`;
}

// ---------- Style A: bright flat cartoon ----------
const cartoon = {
  name: 'A. Мульт-POV',
  pal: {
    hive: {
      sky: [[0, '#3c4a3a'], [0.5, '#8a8f4e'], [1, '#d6b35a']], far: '#55604a', mid: '#3a4236', window: '#ffd45c',
      haze: 'rgba(214,190,110,0.45)', pipe: '#6b5a4a', pipeDark: '#4a3c30', cable: '#2a2622', ground: '#5a5048',
      groundLine: '#463e37', rubble: '#3e3630', puddle: '#7fa36a',
    },
    battle: {
      sky: [[0, '#4a1f2a'], [0.6, '#c2503a'], [1, '#f2a25a']], glow: 'rgba(255,190,90,0.6)', smoke: '#3a2a2a',
      far: '#5a3a3a', far2: '#6e4640', mid: '#4a2e2e', ground: '#5e4636', groundDark: '#3a2a22', crater: '#2e221c',
      craterRim: '#78584a', rubble: '#3a2c26', bone: '#efe2c4', fire1: '#e8462a', fire2: '#ffa22a', fire3: '#fff07a', ember: '#ffd27a',
    },
  },
  marine: { armor: '#2d5bd1', armorDark: '#1f3f96', trim: '#f2c230', dark: '#2a2a33', metal: '#7d8796', gun: '#3d3f48', gunDark: '#26272e', lens: '#ff3b2f', grille: '#888', mark: '#ffffff', ribs: '#4a4a58' },
  kid: { skin: '#f0b98a', hair: '#3b2a1e', cloth: '#8a6d4a', cloth2: '#c0392b', patch: '#6e5539', pants: '#4f5a64', boots: '#2e2620', belt: '#3a2e26', lens: '#7fd3ff', metal: '#8b939e', ink: '#1a1a1a', dirt: 'rgba(90,60,40,0.4)' },
  figure: {
    outline: '#15131a', outlineW: 6, glow: '#ff6a4a',
    shade: { color: (b) => darken(b, 0.72), dx: -14, dy: -10 },
    rim: { color: 'rgba(255,255,255,0.35)', dx: 6, dy: 8 },
  },
  ui(ctx, sc) {
    // level progress pips
    for (let i = 1; i <= 10; i++) {
      const x = 760 + (i - 1) * 42;
      ctx.fillStyle = i <= sc.level ? '#f2c230' : 'rgba(0,0,0,0.35)';
      ctx.strokeStyle = '#15131a'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.roundRect(x, 40, 32, 16, 6); ctx.fill(); ctx.stroke();
    }
    // badge
    ctx.save();
    ctx.translate(70, 60);
    ctx.rotate(-0.04);
    ctx.fillStyle = '#f2c230'; ctx.strokeStyle = '#15131a'; ctx.lineWidth = 8;
    ctx.beginPath(); ctx.roundRect(0, 0, 330, 170, 22); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#15131a';
    ctx.font = '44px "Russo One"';
    ctx.fillText('УРОВЕНЬ', 28, 62);
    ctx.font = '120px "Russo One"';
    ctx.fillText(String(sc.level), 30, 158);
    ctx.restore();
    // title
    ctx.font = '84px "Russo One"';
    ctx.lineWidth = 14; ctx.strokeStyle = '#15131a'; ctx.fillStyle = '#ffffff';
    ctx.strokeText(sc.title.toUpperCase(), 440, 170);
    ctx.fillText(sc.title.toUpperCase(), 440, 170);
    // subtitles
    ctx.font = '54px "Oswald"';
    ctx.textAlign = 'center';
    const lines = wrapLines(ctx, sc.sub, 1500);
    lines.forEach((l, i) => {
      const y = 960 + (i - lines.length + 1) * 66;
      ctx.lineWidth = 12; ctx.strokeText(l, W / 2, y);
      ctx.fillText(l, W / 2, y);
    });
    ctx.textAlign = 'left';
  },
};

// ---------- Style B: grimdark gothic ----------
const grimdark = {
  name: 'B. Гримдарк',
  pal: {
    hive: {
      sky: [[0, '#07090a'], [0.55, '#1c2418'], [1, '#3a3a22']], far: '#151a14', mid: '#0d100c', window: '#e0a040',
      haze: 'rgba(120,140,80,0.25)', pipe: '#1a1714', pipeDark: '#0e0c0a', cable: '#050505', ground: '#14120f',
      groundLine: '#0a0908', rubble: '#0b0a08', puddle: '#2a3a24',
    },
    battle: {
      sky: [[0, '#050304'], [0.6, '#2a0e0a'], [1, '#6a2a12']], glow: 'rgba(255,110,30,0.45)', smoke: '#000000',
      far: '#120a09', far2: '#1a0f0c', mid: '#0c0706', ground: '#1a120e', groundDark: '#080505', crater: '#050303',
      craterRim: '#2a1c16', rubble: '#0c0807', bone: '#9a8c74', fire1: '#a8200e', fire2: '#e86a1a', fire3: '#ffd27a', ember: '#ff8a3a',
    },
  },
  marine: { armor: '#1b2a4a', armorDark: '#101a30', trim: '#8a6a2a', dark: '#111116', metal: '#3a3e44', gun: '#1c1d22', gunDark: '#0f1013', lens: '#ff2a1a', grille: '#55504a', mark: '#c8c0b0', ribs: '#2a2a32' },
  kid: { skin: '#9c7a62', hair: '#1a120c', cloth: '#3e3426', cloth2: '#5a1a14', patch: '#2e261c', pants: '#242a2e', boots: '#121010', belt: '#1a1612', lens: '#6a9a80', metal: '#4a4e54', ink: '#0a0806', dirt: 'rgba(20,14,10,0.6)' },
  figure: {
    glow: '#ff2a1a',
    shade: { color: 'rgba(0,0,0,0.55)', dx: -10, dy: -14 },
    rim: { color: '#ff9a4a', dx: -5, dy: 3, alpha: 0.9 },
  },
  post(ctx, sc) {
    // light shafts
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 4; i++) {
      const x = 300 + i * 420;
      const g = ctx.createLinearGradient(x, 0, x + 300, H);
      g.addColorStop(0, sc.id === 'battle' ? 'rgba(255,140,60,0.10)' : 'rgba(170,200,120,0.08)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + 120, 0); ctx.lineTo(x + 520, H); ctx.lineTo(x + 240, H); ctx.fill();
    }
    ctx.restore();
    vignette(ctx, 0.85);
    grain(ctx, 0.09);
  },
  ui(ctx, sc) {
    ctx.textAlign = 'center';
    // top-left: level in gothic
    const cx = 330;
    ctx.fillStyle = '#c9a85a';
    ctx.shadowColor = 'rgba(0,0,0,0.9)'; ctx.shadowBlur = 20;
    ctx.font = '34px "Ruslan Display"';
    ctx.fillText('+ + УРОВЕНЬ + +', cx, 90);
    ctx.font = '140px "Ruslan Display"';
    ctx.fillText(roman(sc.level), cx, 230);
    ctx.font = 'italic 700 56px "Old Standard TT"';
    ctx.fillStyle = '#e8dcc0';
    ctx.fillText(sc.title, cx, 300);
    ctx.shadowBlur = 0;
    purity(ctx, cx + 200, 140);
    ctx.textAlign = 'center';
    // parchment caption
    ctx.font = '700 44px "Old Standard TT"';
    const lines = wrapLines(ctx, sc.sub, 1300);
    const bh = 60 + lines.length * 54;
    const by = 1010 - bh;
    ctx.fillStyle = 'rgba(214,196,150,0.92)';
    ctx.beginPath(); ctx.moveTo(260, by); ctx.lineTo(1660, by); ctx.lineTo(1630, by + bh / 2); ctx.lineTo(1660, by + bh); ctx.lineTo(260, by + bh); ctx.lineTo(290, by + bh / 2); ctx.fill();
    ctx.strokeStyle = '#5a1a14'; ctx.lineWidth = 3;
    ctx.strokeRect(300, by + 12, 1320, bh - 24);
    ctx.fillStyle = '#2a1a10';
    lines.forEach((l, i) => ctx.fillText(l, W / 2, by + 62 + i * 54));
    ctx.textAlign = 'left';
  },
};

function purity(ctx, x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = '#d8c89a';
  for (const [dx, len] of [[-14, 110], [6, 140], [22, 90]]) {
    ctx.beginPath(); ctx.moveTo(dx - 9, 0); ctx.lineTo(dx + 9, 0); ctx.lineTo(dx + 12, len); ctx.lineTo(dx, len - 12); ctx.lineTo(dx - 12, len); ctx.fill();
  }
  ctx.fillStyle = '#4a2a1a';
  for (let i = 0; i < 6; i++) ctx.fillRect(-20 + (i % 3) * 18, 40 + Math.floor(i / 3) * 20 + (i % 3) * 8, 12, 3);
  ctx.fillStyle = '#8a1a14';
  ctx.beginPath();
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2, r = i % 2 ? 36 : 42;
    ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  ctx.fill();
  ctx.fillStyle = '#b02a20';
  ctx.beginPath(); ctx.arc(0, 0, 26, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function vignette(ctx, strength) {
  const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 1.05);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, `rgba(0,0,0,${strength})`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

let grainCanvas = null;
function grain(ctx, alpha) {
  if (!grainCanvas) {
    grainCanvas = document.createElement('canvas');
    grainCanvas.width = 480; grainCanvas.height = 270;
    const g = grainCanvas.getContext('2d');
    const img = g.createImageData(480, 270);
    const r = mulberry32(99);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = r() * 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
  }
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.globalCompositeOperation = 'overlay';
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(grainCanvas, 0, 0, W, H);
  ctx.restore();
}

// ---------- Style C: pixel / cogitator terminal ----------
const PIXEL_PALETTE = ['#0d0b14', '#1f1a2e', '#3a2f4a', '#5a4a5e', '#8a7a7a', '#c9b89a', '#f4e8c8', '#2a3c6e', '#3e64b4', '#7aa8e8',
  '#6e1e1e', '#c23a2a', '#f08a3a', '#f8d070', '#2e5a2e', '#6aa84a', '#3a2a1e', '#7a5a3a', '#b88a5a'];

const pixel = {
  name: 'C. Пиксель-когитатор',
  pal: cartoon.pal,
  marine: cartoon.marine,
  kid: cartoon.kid,
  figure: { outline: '#0d0b14', outlineW: 8, shade: { color: (b) => darken(b, 0.65), dx: -16, dy: -12 } },
  pixelate: 4,
  palette: PIXEL_PALETTE,
  post(ctx) {
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 2);
    vignette(ctx, 0.5);
  },
  ui(ctx, sc) {
    const box = (x, y, w, h) => {
      ctx.fillStyle = 'rgba(10,20,10,0.88)'; ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = '#7cff6a'; ctx.lineWidth = 6; ctx.strokeRect(x + 6, y + 6, w - 12, h - 12);
    };
    box(50, 50, 760, 210);
    ctx.fillStyle = '#7cff6a';
    ctx.font = '26px "Press Start 2P"';
    ctx.fillText('+++ КОГИТАТОР +++', 90, 110);
    ctx.font = '44px "Press Start 2P"';
    ctx.fillText('УРОВЕНЬ ' + String(sc.level).padStart(2, '0'), 90, 180);
    ctx.font = '24px "Press Start 2P"';
    ctx.fillText('> ' + sc.title.toUpperCase(), 90, 230);
    // XP bar
    box(1310, 50, 560, 110);
    ctx.fillStyle = '#7cff6a'; ctx.font = '22px "Press Start 2P"';
    ctx.fillText('ВЕРА', 1350, 118);
    ctx.fillStyle = '#1f3a1a'; ctx.fillRect(1480, 92, 340, 34);
    ctx.fillStyle = '#7cff6a'; ctx.fillRect(1480, 92, 34 * sc.level, 34);
    // dialog box
    ctx.font = '30px "Press Start 2P"';
    const lines = wrapLines(ctx, sc.sub, 1560);
    const bh = 70 + lines.length * 50;
    box(120, 1030 - bh, 1680, bh);
    ctx.fillStyle = '#e8ffe0';
    lines.forEach((l, i) => ctx.fillText(l, 170, 1030 - bh + 70 + i * 50));
    ctx.fillStyle = '#7cff6a';
    ctx.fillText('▼', 1730, 1010);
  },
};

function quantize(ctx, w, h, palette) {
  const pal = palette.map((c) => { const n = parseInt(c.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; });
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    let best = 0, bd = Infinity;
    for (let k = 0; k < pal.length; k++) {
      const dr = d[i] - pal[k][0], dg = d[i + 1] - pal[k][1], db = d[i + 2] - pal[k][2];
      const dist = dr * dr * 0.3 + dg * dg * 0.59 + db * db * 0.11;
      if (dist < bd) { bd = dist; best = k; }
    }
    d[i] = pal[best][0]; d[i + 1] = pal[best][1]; d[i + 2] = pal[best][2];
  }
  ctx.putImageData(img, 0, 0);
}

window.STYLES = { cartoon, grimdark, pixel };
window.STYLE_HELPERS = { drawFigure, shadowEllipse, quantize };
