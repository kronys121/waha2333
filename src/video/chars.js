// Character rigs. A rig is {parts, pivots, face}. Parts carry a role (palette key), a Path2D or a
// draw function, and an optional group that pose angles rotate around the group's pivot.
// Local coords: origin between the feet, y up is negative.

function P() { return new Path2D(); }
function poly(points) {
  const p = P();
  p.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) p.lineTo(points[i][0], points[i][1]);
  p.closePath();
  return p;
}
function mirror(points) { return points.map(([x, y]) => [-x, y]); }
function rr(x, y, w, h, r) { const p = P(); p.roundRect(x, y, w, h, r); return p; }
function el(cx, cy, rx, ry, rot = 0) { const p = P(); p.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2); return p; }
function xform(path, m) { const q = P(); q.addPath(path, m); return q; }
function limb(a, b, w1, w2) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len, ny = dx / len;
  return poly([[a[0] + nx * w1, a[1] + ny * w1], [b[0] + nx * w2, b[1] + ny * w2], [b[0] - nx * w2, b[1] - ny * w2], [a[0] - nx * w1, a[1] - ny * w1]]);
}

// ---------- palettes ----------
const PAL = {
  ultra: { armor: '#2d5bd1', armorDark: '#1f3f96', trim: '#f2c230', rim: '#f2c230', dark: '#2a2a33', metal: '#7d8796', gun: '#3d3f48', gunDark: '#26272e', lens: '#ff3b2f', grille: '#8a8a96', mark: '#ffffff', ribs: '#4a4a58', skin: '#f0b98a', hair: '#4a3020', cape: '#b3262a', stripe: '#d8402f', crux: '#c9ced6', laurel: '#f2c230' },
};
function pal(base, over) { return Object.assign({}, PAL[base] || base, over || {}); }
const MARBLE = { armor: '#e9e6df', armorDark: '#cfcac0', trim: '#dcd7cc', rim: '#dcd7cc', dark: '#bdb7ab', metal: '#d6d1c6', gun: '#c9c3b7', gunDark: '#b8b2a6', lens: '#cfcac0', grille: '#aaa496', mark: '#bdb7ab', ribs: '#c5bfb3', skin: '#ece9e2', hair: '#d6d1c6', cape: '#d9d4c9', laurel: '#d6d1c6', stripe: '#cfcac0', crux: '#d6d1c6' };

// ---------- face ----------
function drawFace(ctx, f, pose) {
  const { cx, cy, r } = f;
  const expr = pose.expr || 'neutral';
  const look = pose.look || 0;
  const blink = pose.blink || 0;
  ctx.save();
  ctx.fillStyle = '#15131a'; ctx.strokeStyle = '#15131a'; ctx.lineCap = 'round';
  const ex = r * 0.36, ey = cy - r * 0.02;
  for (const s of [-1, 1]) {
    const x = cx + s * ex + look * r * 0.12;
    const ry = (expr === 'shock' ? r * 0.17 : r * 0.13) * (1 - blink * 0.9);
    ctx.beginPath(); ctx.ellipse(x, ey, r * (expr === 'shock' ? 0.12 : 0.1), Math.max(ry, 1.5), 0, 0, Math.PI * 2); ctx.fill();
    // brows
    ctx.lineWidth = r * 0.08;
    let inner = 0, outer = 0;
    if (expr === 'angry' || expr === 'grit') { inner = r * 0.1; outer = -r * 0.04; }
    if (expr === 'sad') { inner = -r * 0.1; outer = r * 0.04; }
    if (expr === 'happy' || expr === 'shock') { inner = -r * 0.05; outer = -r * 0.05; }
    const by = ey - r * 0.3;
    ctx.beginPath();
    ctx.moveTo(cx + s * (ex - r * 0.18), by + inner);
    ctx.lineTo(cx + s * (ex + r * 0.2), by + outer);
    ctx.stroke();
  }
  const my = cy + r * 0.45;
  ctx.lineWidth = r * 0.08;
  ctx.beginPath();
  if (expr === 'happy') { ctx.arc(cx, my - r * 0.12, r * 0.28, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); }
  else if (expr === 'sad') { ctx.arc(cx, my + r * 0.18, r * 0.22, 1.2 * Math.PI, 1.8 * Math.PI); ctx.stroke(); }
  else if (expr === 'shock') { ctx.ellipse(cx, my, r * 0.12, r * 0.16, 0, 0, Math.PI * 2); ctx.fill(); }
  else if (expr === 'grit') {
    ctx.fillStyle = '#fff'; ctx.fillRect(cx - r * 0.25, my - r * 0.08, r * 0.5, r * 0.16);
    ctx.lineWidth = r * 0.05; ctx.strokeRect(cx - r * 0.25, my - r * 0.08, r * 0.5, r * 0.16);
  }
  else if (expr === 'talk') { const o = Math.abs(Math.sin((pose.time || 0) * 14)) * r * 0.14 + 2; ctx.ellipse(cx, my, r * 0.16, o, 0, 0, Math.PI * 2); ctx.fill(); }
  else { ctx.moveTo(cx - r * 0.18, my); ctx.lineTo(cx + r * 0.18, my); ctx.stroke(); }
  if (pose.bruise) {
    ctx.fillStyle = 'rgba(110,70,170,0.55)';
    ctx.beginPath(); ctx.ellipse(cx + ex, ey + r * 0.05, r * 0.2, r * 0.17, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx - r * 0.45, cy + r * 0.35, r * 0.13, r * 0.1, 0, 0, Math.PI * 2); ctx.fill();
  }
  if (pose.tear) {
    ctx.fillStyle = '#7fd3ff';
    ctx.beginPath(); ctx.ellipse(cx - ex, ey + r * 0.25 + (pose.time * 60) % (r * 0.6), r * 0.06, r * 0.1, 0, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

// ---------- humans (adult and kid) ----------
// o: {kid, outfit:'plain'|'dress'|'scout'|'servitor'|'robe', hair:'short'|'spiky'|'long'|'bald'|'bun', goggles, cloak, crown, mushroomHat, earless}
function buildHuman(o = {}) {
  const k = o.kid ? 0.72 : 1;
  const parts = [];
  const add = (role, path, g, extra) => parts.push({ role, path, g, ...extra });
  const legH = o.kid ? 120 : 185, torsoTop = o.kid ? -232 : -340, torsoBot = -legH;
  const sh = o.kid ? 52 : 64; // half shoulder width
  const headR = o.kid ? 58 : 46;
  const headCy = torsoTop - (o.kid ? 62 : 56);

  if (o.cloak) add('cloak', poly([[-sh - 6, torsoTop + 10], [sh + 6, torsoTop + 10], [sh + 40, -20], [-sh - 40, -20]]));
  // legs
  for (const s of [-1, 1]) {
    const g = s < 0 ? 'legL' : 'legR';
    add('pants', rr(s < 0 ? -40 * k - 2 : 4, torsoBot - 6, 36 * k + 2, legH - 14, 10), g);
    add('boots', rr(s < 0 ? -48 * k - 2 : 0, -24, 48 * k + 4, 24, 8), g);
  }
  // back arm (left) first
  const armLen = o.kid ? 100 : 150;
  const armW = o.kid ? 26 : 30;
  const sleeve = o.outfit === 'scout' ? 'shirt2' : 'shirt';
  add(sleeve, rr(-sh - armW + 6, torsoTop + 6, armW, armLen, 13), 'armL');
  add('skin', el(-sh - armW / 2 + 6, torsoTop + armLen + 8, 15 * k + 3, 15 * k + 3), 'armL');
  // torso
  if (o.outfit === 'dress') {
    add('shirt', poly([[-sh, torsoTop], [sh, torsoTop], [sh + 4, torsoBot + 20], [sh + 40, -70], [-sh - 40, -70], [-sh - 4, torsoBot + 20]]));
    if (o.apron) add('apron', poly([[-sh + 18, torsoTop + 50], [sh - 18, torsoTop + 50], [sh + 10, -90], [-sh - 10, -90]]));
  } else if (o.outfit === 'robe') {
    add('shirt', poly([[-sh - 6, torsoTop], [sh + 6, torsoTop], [sh + 46, -6], [-sh - 46, -6]]));
    add('trim', rr(-10, torsoTop + 10, 20, -torsoTop - 20, 4));
  } else if (o.kid && o.outfit !== 'scout') {
    add('shirt', poly([[-sh, torsoTop + 10], [sh, torsoTop + 10], [sh + 8, -108], [sh - 8, -96], [sh - 20, -112], [sh - 34, -94], [-2, -110], [-18, -92], [-32, -110], [-sh + 8, -94], [-sh - 8, -108]]));
    add('belt', rr(-sh - 3, -132, 2 * sh + 6, 14, 4));
  } else {
    add('shirt', poly([[-sh, torsoTop], [sh, torsoTop], [sh - 6, torsoBot + 10], [-sh + 6, torsoBot + 10]]));
    add('belt', rr(-sh + 4, torsoBot - 6, 2 * sh - 8, 18, 4));
  }
  if (o.outfit === 'scout') {
    add('shirt2', el(-sh + 2, torsoTop + 14, 30 * k, 24 * k));
    add('shirt2', el(sh - 2, torsoTop + 14, 30 * k, 24 * k));
    add('shirt2', rr(-sh * 0.7, torsoTop + 20, sh * 1.4, (torsoBot - torsoTop) * 0.55, 10));
  }
  if (o.outfit === 'servitor') {
    add('metal', rr(-sh * 0.6, torsoTop + 30, sh * 1.2, 50, 6));
    add('led', el(-sh * 0.3, torsoTop + 55, 8, 8), null, { glow: true });
  }
  if (o.scarf) add('scarf', rr(-sh * 0.75, torsoTop - 16, sh * 1.5, 26, 10));
  // front arm (right)
  add(sleeve, rr(sh - 6, torsoTop + 6, armW, armLen, 13), 'armR');
  add('skin', el(sh + armW / 2 - 6, torsoTop + armLen + 8, 15 * k + 3, 15 * k + 3), 'armR');
  // head
  add('skin', rr(-12 * k, torsoTop - 22, 24 * k, 26, 6), 'head');
  if (o.hair === 'long') add('hair', rr(-headR - 6, headCy - headR * 0.6, headR * 2 + 12, headR * 1.9, headR * 0.6), 'head');
  add('skin', el(0, headCy, headR, headR * 1.08), 'head');
  if (!o.earless) { add('skin', el(-headR, headCy + 4, 9 * k + 2, 13 * k + 2), 'head'); }
  add('skin', el(headR, headCy + 4, 9 * k + 2, 13 * k + 2), 'head');
  const hairTop = headCy - headR * 1.08;
  if (o.hair === 'spiky') {
    add('hair', poly([[-headR - 4, headCy - 5], [-headR - 8, headCy - 35], [-headR + 8, headCy - 58], [-headR * 0.7, hairTop - 14], [-headR * 0.28, hairTop + 4], [0, hairTop - 18], [headR * 0.3, hairTop + 2], [headR * 0.7, hairTop - 12], [headR * 0.9, headCy - 50], [headR + 8, headCy - 30], [headR + 4, headCy - 5], [headR * 0.8, headCy - 26], [headR * 0.4, headCy - 32], [0, headCy - 28], [-headR * 0.4, headCy - 34], [-headR * 0.8, headCy - 26]]), 'head');
  } else if (o.hair === 'short' || o.hair === 'long' || o.hair === 'bun') {
    const hp = P();
    hp.moveTo(-headR - 3, headCy - 2);
    hp.bezierCurveTo(-headR - 6, hairTop - 18, headR + 6, hairTop - 18, headR + 3, headCy - 2);
    hp.bezierCurveTo(headR * 0.7, headCy - headR * 0.55, -headR * 0.5, headCy - headR * 0.45, -headR - 3, headCy - 2);
    add('hair', hp, 'head');
    if (o.hair === 'bun') add('hair', el(0, hairTop - 10, headR * 0.45, headR * 0.38), 'head');
  } else if (o.hair === 'buzz') {
    const hp = P();
    hp.moveTo(-headR + 2, headCy - 12);
    hp.bezierCurveTo(-headR, hairTop - 8, headR, hairTop - 8, headR - 2, headCy - 12);
    hp.bezierCurveTo(headR * 0.5, headCy - headR * 0.7, -headR * 0.5, headCy - headR * 0.7, -headR + 2, headCy - 12);
    add('hair', hp, 'head');
  }
  if (o.outfit === 'servitor') {
    add('metal', rr(-headR * 0.9, headCy - headR * 0.35, headR * 1.8, headR * 0.5, 6), 'head');
    add('led', el(headR * 0.35, headCy - headR * 0.1, 7, 7), 'head', { glow: true });
    add('cable', null, 'head', { fn: (ctx) => { // wires from the skull
      ctx.strokeStyle = '#15131a'; ctx.lineWidth = 7; ctx.lineCap = 'round';
      for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(s * headR * 0.5, hairTop + 8); ctx.bezierCurveTo(s * headR * 1.4, hairTop - 40, s * headR * 2.2, headCy, s * (sh + 20), torsoTop + 40); ctx.stroke(); }
    } });
  }
  if (o.goggles) {
    add('belt', rr(-headR - 2, headCy - headR * 0.62, headR * 2 + 4, 16, 6), 'head');
    add('lens2', el(-headR * 0.38, headCy - headR * 0.55, headR * 0.3, headR * 0.26), 'head');
    add('lens2', el(headR * 0.38, headCy - headR * 0.55, headR * 0.3, headR * 0.26), 'head');
  }
  if (o.crown) add('gold', poly([[-30, hairTop - 4], [-30, hairTop - 34], [-15, hairTop - 18], [0, hairTop - 40], [15, hairTop - 18], [30, hairTop - 34], [30, hairTop - 4]]), 'head');
  if (o.mushroomHat) {
    add('mush', el(0, hairTop + 2, headR * 1.15, headR * 0.5), 'head');
    add('mushDot', el(-headR * 0.4, hairTop - 6, 9, 7), 'head');
    add('mushDot', el(headR * 0.45, hairTop + 2, 8, 6), 'head');
  }
  if (o.hood) add('shirt', poly([[-headR - 14, headCy + headR], [-headR - 18, headCy - headR * 0.6], [0, hairTop - 30], [headR + 18, headCy - headR * 0.6], [headR + 14, headCy + headR], [headR * 0.7, headCy + headR * 0.2], [headR * 0.7, headCy - headR * 0.5], [-headR * 0.7, headCy - headR * 0.5], [-headR * 0.7, headCy + headR * 0.2]]), 'head');
  if (o.outfit !== 'servitor') add('face', null, 'head', { fn: (ctx, pose) => drawFace(ctx, { cx: 0, cy: headCy + headR * 0.08, r: headR }, pose) });
  else add('face', null, 'head', { fn: (ctx) => { ctx.strokeStyle = '#15131a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-headR * 0.2, headCy + headR * 0.5); ctx.lineTo(headR * 0.2, headCy + headR * 0.5); ctx.stroke(); } });
  if (o.scar) add('scar', null, 'head', { fn: (ctx) => { ctx.strokeStyle = '#a0463c'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(headR * 0.2, headCy - headR * 0.5); ctx.lineTo(headR * 0.55, headCy + headR * 0.3); ctx.stroke(); } });
  return {
    parts,
    pivots: { legL: [-22 * k, torsoBot], legR: [22 * k, torsoBot], armL: [-sh, torsoTop + 16], armR: [sh, torsoTop + 16], head: [0, torsoTop] },
    height: -headCy + headR,
    headTop: [0, headCy - headR],
    hand: { L: [-sh - armW / 2 + 6, torsoTop + armLen + 8], R: [sh + armW / 2 - 6, torsoTop + armLen + 8] },
  };
}

const HUMAN_PAL = {
  kid: { skin: '#f0b98a', hair: '#3b2a1e', shirt: '#6f8fb8', shirt2: '#4a6a98', pants: '#4f5a64', boots: '#2e2620', belt: '#3a2e26', lens2: '#7fd3ff', scarf: '#2d5bd1', gold: '#f2c230', mush: '#c0392b', mushDot: '#fff', metal: '#8b939e' },
  mom: { skin: '#f0b98a', hair: '#7a4a2a', shirt: '#4f7fb8', pants: '#3a3a44', boots: '#2e2620', belt: '#3a2e26', apron: '#f4ead2' },
  citizen: { skin: '#e8b48a', hair: '#2e2018', shirt: '#e8e2d0', pants: '#2d5bd1', boots: '#2e2620', belt: '#c9a24a' },
  scout: { skin: '#e8b08a', hair: '#3b2a1e', shirt: '#3a3f2e', shirt2: '#2d5bd1', pants: '#3a3f2e', boots: '#26272e', belt: '#26272e', cloak: '#5c6b3a' },
  sergeantScout: { skin: '#d9a07a', hair: '#c8c8c8', shirt: '#3a3f2e', shirt2: '#2d5bd1', pants: '#3a3f2e', boots: '#26272e', belt: '#26272e', cloak: '#5c6b3a' },
  servitor: { skin: '#b3b3aa', hair: '#555', shirt: '#55575e', pants: '#45474e', boots: '#26272e', belt: '#26272e', metal: '#8b939e', led: '#ff3b2f' },
  dad: { skin: '#f0b98a', hair: '#5a3a22', shirt: '#7a8a5a', pants: '#4a4a54', boots: '#2e2620', belt: '#3a2e26' },
  serf: { skin: '#e8b48a', hair: '#3b2a1e', shirt: '#8a7a6a', pants: '#4a4440', boots: '#2e2620', belt: '#3a2e26' },
};

// ---------- space marine ----------
// o: {weapon:'bolter'|'none', helmet:'on'|'off', cape, laurel, stripe, horns, hair:'short'|'bald'|'gray', scar, beard}
function buildMarine(o = {}) {
  const parts = [];
  const add = (role, path, g, extra) => parts.push({ role, path, g, ...extra });
  if (o.cape) add('cape', poly([[-200, -480], [200, -480], [262, -30], [150, -10], [0, -40], [-150, -10], [-262, -30]]));
  add('armorDark', rr(-150, -545, 300, 150, 26));
  for (const x of [-125, 85]) { add('metal', rr(x, -615, 40, 90, 10)); add('dark', rr(x - 4, -622, 48, 18, 6)); }
  // legs
  const leg = [[-108, -268], [-38, -268], [-44, -150], [-36, -42], [-128, -42], [-120, -150]];
  const boot = [[-142, -48], [-28, -48], [-22, 0], [-152, 0]];
  for (const s of [-1, 1]) {
    const g = s < 0 ? 'legL' : 'legR';
    const m = s < 0 ? (pts) => pts : mirror;
    add('armor', poly(m(leg)), g);
    add('armorDark', poly(m(boot)), g);
    add('armor', rr(s < 0 ? -124 : 34, -185, 90, 66, 24), g);
    add('trim', rr(s < 0 ? -112 : 46, -136, 66, 10, 4), g);
  }
  const tasset = [[-112, -290], [-42, -290], [-48, -205], [-106, -215]];
  add('armor', poly(tasset)); add('armor', poly(mirror(tasset)));
  add('armor', poly([[-38, -285], [38, -285], [26, -228], [-26, -228]]));
  add('dark', rr(-80, -375, 160, 80, 10));
  const ribs = P(); for (let y = -365; y < -300; y += 13) ribs.rect(-72, y, 144, 5);
  add('ribs', ribs, null, { flat: true });
  add('dark', rr(-112, -310, 224, 34, 8));
  add('trim', el(0, -293, 30, 26));
  add('dark', el(0, -293, 13, 12));
  add('armor', poly([[-135, -478], [135, -478], [126, -392], [74, -365], [-74, -365], [-126, -392]]));
  const wing = [[-10, -452], [-118, -462], [-104, -444], [-120, -434], [-100, -424], [-112, -412], [-88, -406], [-96, -394], [-56, -396], [-10, -412]];
  add('trim', poly(wing)); add('trim', poly(mirror(wing)));
  add('trim', poly([[-16, -470], [-4, -480], [0, -455], [4, -480], [16, -470], [12, -420], [0, -402], [-12, -420]]));

  const armed = o.weapon === 'bolter';
  // arms
  if (armed) {
    add('armor', rr(-250, -430, 74, 100, 20)); add('armor', rr(176, -430, 74, 100, 20));
    add('dark', el(-213, -330, 30, 22)); add('dark', el(213, -330, 30, 22));
  } else {
    for (const s of [-1, 1]) {
      const g = s < 0 ? 'armL' : 'armR';
      const x0 = s < 0 ? -250 : 176;
      add('armor', rr(x0, -430, 74, 100, 20), g);
      add('dark', el(s * 213, -330, 30, 22), g);
      add('armor', poly(s < 0 ? [[-248, -335], [-178, -335], [-176, -240], [-250, -240]] : mirror([[-248, -335], [-178, -335], [-176, -240], [-250, -240]])), g);
      add('armorDark', rr(s < 0 ? -252 : 176, -248, 76, 64, 18), g);
    }
  }
  // collar and head
  add('armorDark', poly([[-72, -505], [72, -505], [82, -462], [-82, -462]]));
  if (o.helmet === 'off') {
    const hc = -548;
    add('skin', rr(-26, -515, 52, 50, 8), 'head');
    add('skin', el(0, hc, 52, 60), 'head');
    add('skin', el(-52, hc + 6, 11, 16), 'head'); add('skin', el(52, hc + 6, 11, 16), 'head');
    if (o.hair !== 'bald') {
      const hp = P();
      hp.moveTo(-54, hc - 6);
      hp.bezierCurveTo(-58, hc - 84, 58, hc - 84, 54, hc - 6);
      hp.bezierCurveTo(34, hc - 40, -34, hc - 42, -54, hc - 6);
      add('hair', hp, 'head');
    }
    if (o.beard) add('hair', poly([[-40, hc + 10], [40, hc + 10], [30, hc + 52], [0, hc + 64], [-30, hc + 52]]), 'head');
    add('face', null, 'head', { fn: (ctx, pose) => drawFace(ctx, { cx: 0, cy: hc + 6, r: 52 }, pose) });
    if (o.scar) add('scar', null, 'head', { fn: (ctx) => { ctx.strokeStyle = '#a0463c'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(16, hc - 34); ctx.lineTo(34, hc + 22); ctx.stroke(); } });
    if (o.laurel) {
      for (const s of [-1, 1]) for (let i = 0; i < 5; i++) {
        const a = Math.PI * (1.15 + i * 0.1);
        const x = s * Math.cos(a) * -56, y = hc - 22 + Math.sin(a) * 46;
        add('laurel', el(x, y, 14, 7, s * (a + 0.4)), 'head');
      }
    }
  } else {
    const helm = P();
    helm.moveTo(-42, -505);
    helm.bezierCurveTo(-46, -548, -24, -566, 0, -566);
    helm.bezierCurveTo(24, -566, 46, -548, 42, -505);
    helm.lineTo(40, -484); helm.lineTo(22, -464); helm.lineTo(-22, -464); helm.lineTo(-40, -484);
    helm.closePath();
    add('helm', helm, 'head');
    if (o.stripe) { add('white', rr(-11, -567, 22, 50, 6), 'head'); add('stripe', rr(-6, -566, 12, 48, 4), 'head', { flat: true }); }
    if (o.horns) {
      add('bone', poly([[-34, -548], [-90, -600], [-64, -560], [-40, -530]]), 'head');
      add('bone', poly(mirror([[-34, -548], [-90, -600], [-64, -560], [-40, -530]])), 'head');
    }
    add('dark', poly([[-36, -530], [-4, -522], [4, -522], [36, -530], [34, -522], [6, -515], [-6, -515], [-34, -522]]), 'head');
    add('lens', el(-18, -511, 13, 8, 0.22), 'head', { glow: true });
    add('lens', el(18, -511, 13, 8, -0.22), 'head', { glow: true });
    add('dark', poly([[-13, -498], [13, -498], [9, -466], [-9, -466]]), 'head');
    add('dark', rr(-36, -494, 14, 18, 4), 'head'); add('dark', rr(22, -494, 14, 18, 4), 'head');
    const grille = P();
    for (const y of [-490, -482, -474]) grille.rect(-8, y, 16, 3);
    add('grille', grille, 'head', { flat: true });
  }
  // pauldrons
  const pauldron = (sx) => {
    const p = P();
    p.moveTo(sx * 278, -405);
    p.bezierCurveTo(sx * 284, -500, sx * 240, -560, sx * 182, -560);
    p.bezierCurveTo(sx * 124, -560, sx * 92, -512, sx * 94, -440);
    p.lineTo(sx * 100, -405);
    p.closePath();
    return p;
  };
  for (const sx of [-1, 1]) {
    add('rim', xform(pauldron(sx), new DOMMatrix().translate(sx * 186, -480).scale(1.1).translate(-sx * 186, 480)));
    add('armor', pauldron(sx));
    add('rim', poly([[sx * 282, -432], [sx * 94, -432], [sx * 100, -405], [sx * 278, -405]]));
  }
  if (o.crux) {
    add('crux', poly([[-200, -540], [-172, -540], [-176, -505], [-150, -510], [-150, -482], [-176, -486], [-172, -450], [-200, -450], [-196, -486], [-222, -482], [-222, -510], [-196, -505]]));
  } else {
    // Ultramarines-style inverted omega
    const om = P();
    om.moveTo(-218, -462); om.lineTo(-198, -462);
    om.bezierCurveTo(-226, -480, -222, -530, -186, -530);
    om.bezierCurveTo(-150, -530, -146, -480, -174, -462);
    om.lineTo(-154, -462); om.lineTo(-154, -452); om.lineTo(-186, -452); om.lineTo(-186, -470);
    om.bezierCurveTo(-166, -480, -166, -516, -186, -516);
    om.bezierCurveTo(-206, -516, -206, -480, -186, -470);
    om.lineTo(-186, -452); om.lineTo(-218, -452); om.closePath();
    add(o.horns ? 'trim' : 'mark', o.horns ? poly([[-186, -540], [-176, -500], [-140, -496], [-176, -488], [-186, -450], [-196, -488], [-232, -496], [-196, -500]]) : om);
  }
  add('mark', poly([[149, -462], [186, -522], [223, -462], [205, -462], [186, -494], [167, -462]]));

  if (armed) {
    const gm = new DOMMatrix().translate(-5, -270).rotate(-24);
    const addG = (role, path) => add(role, xform(path, gm));
    const at = (x, y) => { const p = gm.transformPoint(new DOMPoint(x, y)); return [p.x, p.y]; };
    const hR = at(-72, 42), hL = at(118, 20);
    add('armor', limb([-213, -330], hR, 34, 30));
    add('armor', limb([213, -330], hL, 34, 30));
    addG('gun', rr(-185, -30, 80, 46, 8));
    addG('gunDark', poly([[-90, 20], [-56, 20], [-64, 66], [-96, 66]]));
    addG('gunDark', poly([[-12, 22], [30, 22], [48, 62], [64, 100], [36, 106], [16, 66]]));
    addG('gun', rr(-118, -40, 210, 64, 10));
    addG('gunDark', rr(-70, -60, 100, 22, 6));
    addG('trim', rr(-50, -18, 70, 24, 5));
    addG('gun', rr(88, -30, 96, 42, 6));
    add('muzzle', xform(rr(180, -38, 34, 58, 6), gm), null, { glowIf: 'hot' });
    addG('trim', rr(176, -38, 8, 58, 2));
    add('armorDark', rr(hR[0] - 30, hR[1] - 28, 60, 56, 16));
    add('armorDark', rr(hL[0] - 30, hL[1] - 28, 60, 56, 16));
    parts.muzzle = at(214, -10);
  }
  return {
    parts,
    pivots: { legL: [-73, -268], legR: [73, -268], armL: [-213, -420], armR: [213, -420], head: [0, -470] },
    height: 600,
    headTop: [0, -575],
    hand: { L: [-214, -216], R: [214, -216] },
    muzzle: parts.muzzle,
  };
}

// ---------- terminator ----------
function buildTerminator(o = {}) {
  const parts = [];
  const add = (role, path, g, extra) => parts.push({ role, path, g, ...extra });
  for (const s of [-1, 1]) {
    const g = s < 0 ? 'legL' : 'legR';
    const m = s < 0 ? (p) => p : mirror;
    add('armor', poly(m([[-160, -270], [-50, -270], [-46, -60], [-170, -60]])), g);
    add('armorDark', poly(m([[-185, -70], [-34, -70], [-30, 0], [-195, 0]])), g);
    add('armor', rr(s < 0 ? -175 : 55, -190, 120, 80, 26), g);
  }
  add('dark', rr(-120, -320, 240, 70, 10));
  add('armor', poly([[-170, -560], [170, -560], [175, -300], [-175, -300]]));
  add('trim', el(0, -460, 60, 50));
  add('crux', poly([[-16, -500], [16, -500], [14, -472], [40, -476], [40, -444], [14, -448], [16, -420], [-16, -420], [-14, -448], [-40, -444], [-40, -476], [-14, -472]]));
  add('armorDark', rr(-80, -620, 160, 70, 20));
  const helm = P();
  helm.moveTo(-56, -560); helm.bezierCurveTo(-62, -650, 62, -650, 56, -560); helm.lineTo(34, -532); helm.lineTo(-34, -532); helm.closePath();
  add('helm', helm, 'head');
  add('lens', el(-21, -590, 14, 8, 0.2), 'head', { glow: true });
  add('lens', el(21, -590, 14, 8, -0.2), 'head', { glow: true });
  add('dark', poly([[-14, -572], [14, -572], [10, -536], [-10, -536]]), 'head');
  // pauldrons
  for (const s of [-1, 1]) {
    const p = poly(s < 0 ? [[-320, -400], [-310, -560], [-260, -620], [-160, -620], [-140, -560], [-150, -400]] : mirror([[-320, -400], [-310, -560], [-260, -620], [-160, -620], [-140, -560], [-150, -400]]));
    add('rim', xform(p, new DOMMatrix().translate(s * 235, -510).scale(1.07).translate(-s * 235, 510)));
    add('armor', p);
  }
  add('crux', poly([[-252, -580], [-218, -580], [-222, -540], [-190, -544], [-190, -506], [-222, -510], [-218, -470], [-252, -470], [-248, -510], [-280, -506], [-280, -544], [-248, -540]]));
  // left arm: storm bolter, right arm: power fist
  add('armor', rr(-320, -400, 120, 150, 30));
  add('gun', rr(-330, -280, 110, 70, 10));
  add('gunDark', rr(-318, -380, 34, 110, 6)); add('gunDark', rr(-278, -380, 34, 110, 6));
  add('armor', rr(200, -400, 120, 150, 30));
  add('fist', rr(190, -270, 150, 140, 34));
  add('dark', rr(205, -240, 120, 16, 6)); add('dark', rr(205, -205, 120, 16, 6));
  add('lightning', null, null, { fn: (ctx, pose) => {
    if (!pose.fistGlow) return;
    ctx.strokeStyle = '#9fe8ff'; ctx.lineWidth = 6;
    const r = rng(Math.floor((pose.time || 0) * 12));
    ctx.beginPath();
    for (let i = 0; i < 3; i++) { let x = 200 + r() * 130, y = -270; ctx.moveTo(x, y); for (let j = 0; j < 4; j++) { x += (r() - 0.5) * 50; y += 35; ctx.lineTo(x, y); } }
    ctx.stroke();
  } });
  return { parts, pivots: { legL: [-105, -270], legR: [105, -270], head: [0, -540] }, height: 650, headTop: [0, -640], hand: { L: [-275, -245], R: [265, -200] } };
}

// ---------- tyranid warrior (faces left) ----------
function buildTyranid() {
  const parts = [];
  const add = (role, path, g, extra) => parts.push({ role, path, g, ...extra });
  add('tail', poly([[60, -200], [220, -150], [300, -90], [210, -120], [60, -150]]));
  for (const s of [-1, 1]) {
    const g = s < 0 ? 'legL' : 'legR';
    add('flesh', poly([[s * 30 - 30, -230], [s * 30 + 30, -230], [s * 50 + 30, -120], [s * 20 + 20, -10], [s * 20 - 30, -10], [s * 50 - 20, -120]]), g);
    add('carapace', poly([[s * 50 - 30, -150], [s * 50 + 30, -150], [s * 50 + 20, -100], [s * 50 - 25, -100]]), g);
  }
  add('flesh', el(0, -300, 95, 110));
  for (let i = 0; i < 4; i++) add('carapace', poly([[-80 + i * 10, -380 + i * 48], [90 - i * 6, -390 + i * 48], [100 - i * 8, -350 + i * 48], [-90 + i * 10, -340 + i * 48]]));
  // head
  add('carapace', poly([[-40, -420], [-150, -470], [-120, -430], [-170, -430], [-120, -400], [-40, -380]]), 'head');
  add('carapace', poly([[-40, -420], [20, -520], [40, -470], [10, -410]]), 'head');
  add('flesh', el(-70, -415, 55, 40), 'head');
  add('eye', el(-90, -425, 12, 8), 'head', { glow: true });
  add('teeth', poly([[-125, -400], [-60, -392], [-70, -380], [-80, -392], [-90, -378], [-100, -394], [-112, -380]]), 'head');
  // scything talons
  for (const s of ['armL', 'armR']) {
    const dx = s === 'armL' ? -20 : 30;
    add('carapace', limb([dx, -360], [dx - 90, -300], 26, 20), s);
    add('bone', poly([[dx - 100, -315], [dx - 90, -290], [dx - 200, -180], [dx - 260, -60], [dx - 230, -170]]), s);
  }
  return { parts, pivots: { legL: [-30, -220], legR: [30, -220], armL: [-20, -360], armR: [30, -360], head: [-40, -400] }, height: 520, headTop: [-60, -470], hand: { L: [-200, -150], R: [-170, -150] } };
}
const TYRANID_PAL = { flesh: '#e8c9a0', carapace: '#7b3fa0', bone: '#f2ead8', eye: '#ff3b2f', teeth: '#fff', tail: '#7b3fa0' };

// ---------- ork ----------
function buildOrk() {
  const parts = [];
  const add = (role, path, g, extra) => parts.push({ role, path, g, ...extra });
  for (const s of [-1, 1]) add('pants', rr(s < 0 ? -80 : 10, -170, 70, 160, 14), s < 0 ? 'legL' : 'legR');
  for (const s of [-1, 1]) add('boots', rr(s < 0 ? -95 : 0, -30, 95, 30, 10), s < 0 ? 'legL' : 'legR');
  add('skin', rr(-150, -260, 70, 170, 30), 'armL');
  add('metal', poly([[-160, -110], [-120, -110], [-110, -250], [-200, -320], [-230, -250], [-140, -200]]), 'armL');
  add('vest', poly([[-120, -380], [120, -380], [110, -160], [-110, -160]]));
  add('skin', rr(80, -260, 70, 170, 30), 'armR');
  add('skin', el(0, -420, 90, 70), 'head');
  add('teeth', poly([[-60, -385], [60, -385], [50, -365], [40, -385], [20, -360], [0, -385], [-20, -360], [-40, -385], [-50, -365]]), 'head');
  add('eye', el(-30, -440, 12, 9), 'head', { glow: true }); add('eye', el(30, -440, 12, 9), 'head', { glow: true });
  add('ink', poly([[-60, -465], [-10, -452], [-12, -446], [-60, -458]]), 'head');
  add('ink', poly(mirror([[-60, -465], [-10, -452], [-12, -446], [-60, -458]])), 'head');
  return { parts, pivots: { legL: [-45, -170], legR: [45, -170], armL: [-115, -250], armR: [115, -250], head: [0, -380] }, height: 500, headTop: [0, -490] };
}
const ORK_PAL = { skin: '#5aa83a', pants: '#6a5a3a', boots: '#2e2620', metal: '#8b939e', vest: '#3a2e26', teeth: '#f4ead2', eye: '#ff3b2f', ink: '#15131a' };

// ---------- necron ----------
function buildNecron() {
  const parts = [];
  const add = (role, path, g, extra) => parts.push({ role, path, g, ...extra });
  for (const s of [-1, 1]) {
    const g = s < 0 ? 'legL' : 'legR';
    add('metal', rr(s * 40 - 14, -230, 28, 110, 8), g);
    add('metal', rr(s * 40 - 12, -125, 24, 105, 8), g);
    add('metalDark', rr(s * 40 - 30, -22, 60, 22, 6), g);
  }
  add('metalDark', rr(-60, -260, 120, 40, 10));
  const sp = P(); for (let y = -380; y < -260; y += 22) sp.rect(-50, y, 100, 12);
  add('metal', sp);
  add('metal', poly([[-90, -420], [90, -420], [70, -380], [-70, -380]]));
  add('metal', rr(-120, -420, 34, 150, 10), 'armL');
  add('metal', rr(86, -420, 34, 150, 10), 'armR');
  add('gun', rr(60, -300, 200, 30, 6), 'armR');
  add('glow', rr(80, -295, 160, 10, 4), 'armR', { glow: true });
  add('metal', poly([[-45, -440], [-50, -500], [-30, -530], [30, -530], [50, -500], [45, -440], [20, -425], [-20, -425]]), 'head');
  add('glow', el(-20, -490, 10, 7), 'head', { glow: true }); add('glow', el(20, -490, 10, 7), 'head', { glow: true });
  add('metalDark', poly([[-60, -540], [60, -540], [70, -470], [50, -480], [50, -520], [-50, -520], [-50, -480], [-70, -470]]), 'head');
  return { parts, pivots: { legL: [-40, -230], legR: [40, -230], armL: [-103, -410], armR: [103, -410], head: [0, -425] }, height: 540, headTop: [0, -540] };
}
const NECRON_PAL = { metal: '#a9b0b8', metalDark: '#5b6168', gun: '#3d3f48', glow: '#4cff7a' };

// ---------- dreadnought ----------
function buildDreadnought() {
  const parts = [];
  const add = (role, path, g, extra) => parts.push({ role, path, g, ...extra });
  for (const s of [-1, 1]) {
    const g = s < 0 ? 'legL' : 'legR';
    add('armorDark', poly(s < 0 ? [[-140, -260], [-50, -260], [-60, -40], [-160, -40]] : mirror([[-140, -260], [-50, -260], [-60, -40], [-160, -40]])), g);
    add('armor', rr(s < 0 ? -190 : 40, -50, 150, 50, 14), g);
  }
  add('armor', rr(-170, -560, 340, 320, 40));
  add('sarc', rr(-90, -520, 180, 220, 20));
  add('trim', poly([[-60, -470], [60, -470], [50, -440], [-50, -440]]));
  add('trim', el(0, -380, 30, 30));
  add('armorDark', rr(-60, -610, 120, 60, 18));
  add('lens', el(-20, -585, 10, 7), null, { glow: true }); add('lens', el(20, -585, 10, 7), null, { glow: true });
  add('armor', rr(-310, -540, 140, 160, 40)); add('gun', rr(-330, -400, 90, 180, 14)); add('gunDark', rr(-320, -220, 70, 50, 10));
  add('armor', rr(170, -540, 140, 160, 40)); add('fist', rr(170, -400, 160, 170, 34));
  return { parts, pivots: { legL: [-95, -260], legR: [95, -260] }, height: 610, headTop: [0, -610] };
}

// ---------- Cawl (archmagos) ----------
function buildCawl() {
  const parts = [];
  const add = (role, path, g, extra) => parts.push({ role, path, g, ...extra });
  add('arms', null, null, { fn: (ctx, pose) => {
    const t = pose.time || 0;
    ctx.lineCap = 'round';
    for (let i = 0; i < 6; i++) {
      const s = i % 2 ? 1 : -1, k = Math.floor(i / 2);
      const bx = s * 90, by = -470 + k * 60;
      const a = t * 1.5 + i;
      const mx = bx + s * (140 + Math.sin(a) * 30), my = by - 80 + Math.cos(a) * 40;
      const ex = bx + s * (230 + Math.sin(a * 1.3) * 40), ey = by - 10 + Math.sin(a * 0.9) * 60;
      ctx.strokeStyle = '#15131a'; ctx.lineWidth = 22;
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
      ctx.strokeStyle = '#9a9fa8'; ctx.lineWidth = 12;
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
      ctx.fillStyle = '#f2c230'; ctx.strokeStyle = '#15131a'; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.arc(ex, ey, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
  } });
  add('robe', poly([[-130, -560], [130, -560], [190, 0], [-190, 0]]));
  add('robeDark', poly([[-30, -540], [30, -540], [50, 0], [-50, 0]]));
  add('metal', rr(-120, -330, 240, 30, 8));
  add('robe', poly([[-110, -560], [-120, -690], [0, -760], [120, -690], [110, -560]]), 'head');
  add('shadow', el(0, -640, 70, 70), 'head');
  add('metal', rr(-50, -670, 100, 70, 16), 'head');
  add('eye', el(-18, -640, 12, 12), 'head', { glow: true });
  add('eye2', el(22, -640, 8, 8), 'head', { glow: true });
  add('metal', poly([[-30, -600], [30, -600], [20, -570], [-20, -570]]), 'head');
  add('gear', null, 'head', { fn: (ctx, pose) => {
    ctx.save(); ctx.translate(0, -470); ctx.rotate((pose.time || 0) * 0.8);
    ctx.fillStyle = '#f2c230'; ctx.strokeStyle = '#15131a'; ctx.lineWidth = 5;
    ctx.beginPath();
    for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2, r = i % 2 ? 48 : 60; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();
  } });
  return { parts, pivots: { head: [0, -560] }, height: 760, headTop: [0, -760] };
}
const CAWL_PAL = { robe: '#b3262a', robeDark: '#7a1a1e', metal: '#9a9fa8', shadow: '#15131a', eye: '#4cff7a', eye2: '#ff3b2f' };

// ---------- Mortarion ----------
function buildMortarion() {
  const parts = [];
  const add = (role, path, g, extra) => parts.push({ role, path, g, ...extra });
  add('wing', poly([[-60, -600], [-420, -760], [-380, -600], [-460, -560], [-360, -480], [-420, -400], [-80, -420]]));
  add('wing', poly(mirror([[-60, -600], [-420, -760], [-380, -600], [-460, -560], [-360, -480], [-420, -400], [-80, -420]])));
  add('robe', poly([[-120, -620], [120, -620], [200, 0], [-200, 0]]));
  add('armor', poly([[-140, -620], [140, -620], [120, -380], [-120, -380]]));
  add('pipe', null, null, { fn: (ctx) => {
    ctx.strokeStyle = '#15131a'; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(-60, -600); ctx.bezierCurveTo(-120, -700, -40, -720, -30, -700); ctx.stroke();
    ctx.strokeStyle = '#8a8a6a'; ctx.lineWidth = 10; ctx.stroke();
  } });
  add('robe', poly([[-80, -640], [-90, -760], [0, -820], [90, -760], [80, -640]]), 'head');
  add('mask', el(0, -700, 54, 60), 'head');
  add('eye', el(-20, -715, 12, 9), 'head', { glow: true }); add('eye', el(20, -715, 12, 9), 'head', { glow: true });
  add('armor', rr(-30, -680, 60, 40, 10), 'head');
  // scythe
  add('wood', rr(170, -900, 18, 900, 8));
  add('blade', poly([[180, -900], [-120, -960], [-260, -880], [-60, -910], [180, -860]]));
  return { parts, pivots: { head: [0, -640] }, height: 900, headTop: [0, -820] };
}
const MORT_PAL = { wing: '#3a3a2a', robe: '#6a6a4a', armor: '#8a8a6a', mask: '#d8d4b8', eye: '#9cff4c', wood: '#5a4a3a', blade: '#c9ced6' };

// ---------- drawing ----------
const SHADE_DX = -14, SHADE_DY = -10;
function drawRig(ctx, rig, x, y, s, pose = {}, colors = {}, opts = {}) {
  ctx.save();
  ctx.translate(x, y + (pose.bob || 0) * s);
  ctx.scale(s * (pose.flip ? -1 : 1), s * (pose.sy || 1));
  if (pose.lean) ctx.rotate(pose.lean);
  ctx.lineJoin = 'round';
  const flat = opts.flat;
  const ow = (opts.outlineW ?? 6) / s;
  let curG = null;
  for (const part of rig.parts) {
    const base = colors[part.role] ?? (part.role === 'white' ? '#fff' : part.role === 'bone' ? '#efe6cf' : part.role === 'helm' ? colors.armor : part.role === 'fist' ? colors.armorDark : part.role === 'muzzle' ? colors.gunDark : undefined);
    if (base === undefined && !part.fn) continue;
    ctx.save();
    if (part.g && pose[part.g]) {
      const [px, py] = rig.pivots[part.g];
      ctx.translate(px, py); ctx.rotate(pose[part.g]); ctx.translate(-px, -py);
    }
    if (part.fn) { part.fn(ctx, pose, colors); ctx.restore(); continue; }
    let fill = base;
    if (part.role === 'muzzle' && pose.hot) fill = `rgb(255,${Math.round(160 - pose.hot * 100)},60)`;
    if (part.glow || (part.role === 'muzzle' && pose.hot)) { ctx.shadowColor = fill; ctx.shadowBlur = 30; }
    ctx.fillStyle = fill;
    ctx.fill(part.path);
    ctx.shadowBlur = 0;
    if (!flat && !part.flat && !part.glow) {
      ctx.save();
      ctx.clip(part.path);
      ctx.fillStyle = darken(fill, 0.72);
      ctx.fillRect(-2000, -2000, 4000, 4000);
      ctx.translate(SHADE_DX, SHADE_DY);
      ctx.fillStyle = fill;
      ctx.fill(part.path);
      ctx.restore();
    }
    if (part.role !== 'ribs' && part.role !== 'grille') {
      ctx.strokeStyle = opts.ink || INK; ctx.lineWidth = ow;
      ctx.stroke(part.path);
    }
    ctx.restore();
  }
  ctx.restore();
}

// rig cache: build once per option set
const RIGS = {};
function rig(kind, o = {}) {
  const key = kind + JSON.stringify(o);
  if (!RIGS[key]) {
    RIGS[key] = ({ marine: buildMarine, human: buildHuman, terminator: buildTerminator, tyranid: buildTyranid, ork: buildOrk, necron: buildNecron, dread: buildDreadnought, cawl: buildCawl, mortarion: buildMortarion })[kind](o);
  }
  return RIGS[key];
}

// walk cycle pose
function walkPose(t, speed = 1, amp = 0.35) {
  const ph = t * 7 * speed;
  return { legL: Math.sin(ph) * amp, legR: -Math.sin(ph) * amp, armL: -Math.sin(ph) * amp * 0.8, armR: Math.sin(ph) * amp * 0.8, bob: -Math.abs(Math.cos(ph)) * 10 };
}
// idle breathing pose
function idlePose(t, seed = 0) {
  return { bob: Math.sin(t * 2 + seed) * 3, head: Math.sin(t * 0.9 + seed) * 0.03, blink: ((t + seed) % 3.7) < 0.12 ? 1 : 0, time: t };
}
function shadow(ctx, x, y, rx, a = 0.3) {
  ctx.fillStyle = `rgba(0,0,0,${a})`;
  ctx.beginPath(); ctx.ellipse(x, y, rx, rx * 0.16, 0, 0, Math.PI * 2); ctx.fill();
}

// convenience wrappers
function marine(ctx, x, y, s, pose = {}, o = {}, colors = PAL.ultra) {
  drawRig(ctx, rig('marine', o), x, y, s, pose, colors);
}
function human(ctx, x, y, s, pose = {}, o = {}, colors = HUMAN_PAL.kid) {
  drawRig(ctx, rig('human', o), x, y, s, pose, colors);
}
