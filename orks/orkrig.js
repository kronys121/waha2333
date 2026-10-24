// Detailed ork rigs: boy (scales up to nob and boss through options), gretchin, and a warboss in mega armour.
// Same rig format as src/video/chars.js: path parts get the palette fill, cel shade and ink outline; fn parts draw
// their own details with the same look through sfill().

const OKP = {
  boy: { skin: '#5e9e34', skinD: '#457a26', cloth: '#2c2c30', vest: '#6a4428', belt: '#3a2a1c', metal: '#8d939a', rust: '#a8602c', boots: '#2a221c', teeth: '#efe6c8', eye: '#ff3020', blade: '#bcc2ca', gun: '#3c3c42', chk1: '#1c1c1e', chk2: '#efefe4', glyph: '#e2b42a', armor: '#3e3e46', red: '#b02a20', bone: '#e8dcc0', brass: '#c8963a' },
};
OKP.nob = pal(OKP.boy, { skin: '#4f9030', skinD: '#3a6c20' });
OKP.boss = pal(OKP.boy, { skin: '#46852a', skinD: '#33631c', vest: '#2c2c30' });
OKP.war = pal(OKP.boy, { skin: '#3e7a24', skinD: '#2c5a18', armor: '#3a3a42' });
OKP.prophet = pal(OKP.war, { red: '#d8a830', glyph: '#b02a20', haz: '#e2b42a', cape: '#8a1a14', armor: '#33333b' });
OKP.grot = pal(OKP.boy, { skin: '#86b046', skinD: '#6a8e34', cloth: '#8a6a44' });
OKP.red = pal(OKP.boy, { cloth: '#8a2a20', vest: '#b03024' });

function _lw(ctx, w = 6) { const m = ctx.getTransform(); return w / (Math.hypot(m.a, m.b) || 1); }
// fill a path with the rig look: flat colour, darker rim, offset highlight, ink outline
function sfill(ctx, path, fill, w = 6) {
  ctx.fillStyle = fill; ctx.fill(path);
  ctx.save(); ctx.clip(path); ctx.fillStyle = darken(fill, 0.72); ctx.fillRect(-4000, -4000, 8000, 8000);
  ctx.translate(-14, -10); ctx.fillStyle = fill; ctx.fill(path); ctx.restore();
  ctx.strokeStyle = INK; ctx.lineWidth = _lw(ctx, w); ctx.lineJoin = 'round'; ctx.stroke(path);
}
function inkLine(ctx, pts, w = 5, col = INK) { ctx.strokeStyle = col; ctx.lineWidth = _lw(ctx, w); ctx.lineCap = 'round'; ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); }
function rivets(ctx, pts, r = 5) { for (const [x, y] of pts) { ctx.fillStyle = '#c8ccd2'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = _lw(ctx, 3); ctx.stroke(); } }
function checks(ctx, path, x0, y0, x1, y1, n, c) { ctx.save(); ctx.clip(path); const sz = (x1 - x0) / n; for (let i = 0; i < n; i++) for (let j = 0; j * sz < y1 - y0; j++) { ctx.fillStyle = (i + j) % 2 ? c.chk1 : c.chk2; ctx.fillRect(x0 + i * sz, y0 + j * sz, sz + 0.5, sz + 0.5); } ctx.restore(); ctx.strokeStyle = INK; ctx.lineWidth = _lw(ctx, 6); ctx.stroke(path); }
// ork glyph: a toothy skull mark
function glyph(ctx, x, y, s, col) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const p = P(); p.moveTo(-40, -20); p.quadraticCurveTo(0, -70, 40, -20); p.lineTo(34, 18); p.lineTo(-34, 18); p.closePath(); sfill(ctx, p, col, 5); ctx.fillStyle = INK; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(d * 8, -24); ctx.lineTo(d * 30, -32); ctx.lineTo(d * 26, -12); ctx.closePath(); ctx.fill(); } for (let i = -2; i <= 2; i++) ctx.fillRect(i * 12 - 4, 4, 8, 12); ctx.restore(); }

// ---------- ork face, drawn in the head group ----------
// expr: angry (default), happy (big grin), shock, talk (jaw flaps with pose.time), sad
function orkFace(ctx, pose, c, f) {
  const { x, y, k } = f; // face centre and scale
  const expr = pose.expr || 'angry';
  const open = expr === 'talk' ? 0.35 + 0.65 * Math.abs(Math.sin((pose.time || 0) * 13)) : expr === 'happy' ? 0.7 : expr === 'shock' ? 1 : expr === 'roar' ? 1.25 : (pose.open || 0);
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  // mouth: dark cavity, upper teeth, lower jaw with tusks
  const mh = 10 + open * 30;
  const m = P(); m.moveTo(-58, 22); m.quadraticCurveTo(0, 30, 58, 22); m.lineTo(54, 22 + mh); m.quadraticCurveTo(0, 30 + mh, -54, 22 + mh); m.closePath();
  ctx.fillStyle = '#3a0e10'; ctx.fill(m); ctx.strokeStyle = INK; ctx.lineWidth = _lw(ctx, 5); ctx.stroke(m);
  ctx.fillStyle = c.teeth;
  for (let i = -4; i <= 4; i++) { const tx = i * 12; ctx.beginPath(); ctx.moveTo(tx - 6, 24); ctx.lineTo(tx + 6, 24); ctx.lineTo(tx, 36 + (i % 2 ? 4 : 0)); ctx.closePath(); ctx.fill(); ctx.lineWidth = _lw(ctx, 2.5); ctx.stroke(); }
  for (const d of [-1, 1]) { const t = P(); t.moveTo(d * 36, 22 + mh + 4); t.quadraticCurveTo(d * 44, 2 + mh * 0.4, d * 40, -8 + mh * 0.5); t.lineTo(d * 30, 22 + mh); t.closePath(); sfill(ctx, t, c.teeth, 4); }
  for (let i = -2; i <= 2; i++) { const tx = i * 11; ctx.fillStyle = c.teeth; ctx.beginPath(); ctx.moveTo(tx - 5, 22 + mh); ctx.lineTo(tx + 5, 22 + mh); ctx.lineTo(tx, 12 + mh); ctx.closePath(); ctx.fill(); ctx.lineWidth = _lw(ctx, 2.5); ctx.stroke(); }
  // nose: flat with nostrils
  const n = P(); n.moveTo(-14, -6); n.quadraticCurveTo(0, -18, 14, -6); n.quadraticCurveTo(20, 10, 0, 10); n.quadraticCurveTo(-20, 10, -14, -6); sfill(ctx, n, c.skin, 4);
  ctx.fillStyle = INK; for (const d of [-1, 1]) { ctx.beginPath(); ctx.ellipse(d * 7, 4, 3.5, 2.5, 0, 0, 7); ctx.fill(); }
  // eyes: small red, sunk under the brow
  const blink = pose.blink ? 0.15 : 1;
  for (const d of [-1, 1]) {
    ctx.fillStyle = '#1a0806'; ctx.beginPath(); ctx.ellipse(d * 29, -14, 17, 12, 0, 0, 7); ctx.fill();
    ctx.save(); if (Math.hypot(ctx.getTransform().a, ctx.getTransform().b) > 0.45) { ctx.shadowColor = c.eye; ctx.shadowBlur = 20; } ctx.fillStyle = c.eye; ctx.beginPath(); ctx.ellipse(d * 29 + 2, -12, 10, 9 * blink, 0, 0, 7); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#fff6c0'; ctx.fillRect(d * 29 + 4, -17, 4, 4 * blink);
  }
  // brow ridge: heavy V when angry, raised for shock/happy
  const lift = expr === 'shock' ? -10 : expr === 'happy' ? -5 : expr === 'sad' ? -6 : 0;
  const vin = expr === 'sad' ? -10 : expr === 'shock' ? 0 : 12;
  const b = P(); b.moveTo(-62, -42 + lift); b.lineTo(-8, -34 + lift + vin); b.lineTo(8, -34 + lift + vin); b.lineTo(62, -42 + lift); b.lineTo(58, -28 + lift); b.lineTo(6, -22 + lift + vin); b.lineTo(-6, -22 + lift + vin); b.lineTo(-58, -28 + lift); b.closePath();
  sfill(ctx, b, c.skinD, 5);
  // wrinkles
  inkLine(ctx, [[-20, -54], [0, -48], [20, -54]], 3); inkLine(ctx, [[-14, -62], [14, -62]], 3);
  ctx.restore();
}

// ---------- boy / nob / boss ----------
// o.bulk 0..1 widens the body (nob ~0.5, boss 1); o.armour: 'vest' | 'eavy'; o.weapon: choppa | big | shoota | kustom | none;
// o.klaw: power klaw on the left arm; o.helm: none | horns | iron; o.jaw: 'iron'; o.plate: metal skull plate; o.scars;
// o.pole: trophy bosspole on the back; o.pad: shoulder pad on the right; o.checks: Goff checks on the pad; o.teethNeck.
function buildOrkX(o = {}) {
  const parts = []; const add = (role, path, g, extra) => parts.push({ role, path, g, ...extra }); const fn = (f, g) => parts.push({ fn: f, g });
  const b = o.bulk || 0, W = 1 + b * 0.35; // shoulder width factor
  const sh = 150 * W, hy = -205;
  if (o.pole) fn((ctx, pose, c) => bossPole(ctx, -40, -420, 1, c, o.pole));
  // legs
  for (const s of [-1, 1]) {
    const g = s < 0 ? 'legL' : 'legR';
    add('cloth', limb([s * 58, hy], [s * 74, -100], 52, 46), g);
    add('cloth', limb([s * 74, -104], [s * 68, -34], 46, 40), g);
    fn((ctx) => inkLine(ctx, [[s * 52, -150], [s * 66, -140]], 3), g);
    const bt = P(); bt.moveTo(s * 20, -48); bt.lineTo(s * 108, -48); bt.quadraticCurveTo(s * (140 + 0), -40, s * 138, 0); bt.lineTo(s * 14, 0); bt.closePath();
    add('boots', bt, g);
    add('metal', rr(s > 0 ? 96 : -138, -30, 42, 30, 8), g);
  }
  // back arm (left) first so the torso overlaps it
  const arm = (s) => {
    const g = s < 0 ? 'armL' : 'armR';
    add('skin', limb([s * (sh - 20), -410], [s * (sh + 25), -285], 52 + b * 10, 44 + b * 8), g);
    add('skin', limb([s * (sh + 25), -292], [s * (sh + 30), -175], 44 + b * 8, 48 + b * 8), g);
    fn((ctx) => { inkLine(ctx, [[s * (sh + 4), -370], [s * (sh + 16), -330]], 3); inkLine(ctx, [[s * (sh + 18), -250], [s * (sh + 34), -220]], 3); }, g);
    add('metal', rr(s * (sh + 30) - 40 - b * 6, -240, 80 + b * 12, 36, 8), g);
    fn((ctx) => rivets(ctx, [[s * (sh + 30) - 24, -222], [s * (sh + 30), -222], [s * (sh + 30) + 24, -222]], 4), g);
  };
  const fist = (s) => { const g = s < 0 ? 'armL' : 'armR'; add('skin', el(s * (sh + 32), -152, 44 + b * 8, 38 + b * 6), g); fn((ctx) => { for (let i = -1; i <= 1; i++) inkLine(ctx, [[s * (sh + 32) + i * 16, -176], [s * (sh + 32) + i * 16, -160]], 3); }, g); };
  arm(-1);
  if (o.klaw) fn((ctx, pose, c) => powerKlaw(ctx, -(sh + 32), -150, 1 + b * 0.2, pose, c, -1), 'armL'); else fist(-1);
  // torso: hunched, huge shoulders
  const tor = P(); tor.moveTo(-sh, -425); tor.quadraticCurveTo(0, -480, sh, -425); tor.quadraticCurveTo(sh + 30, -360, sh - 20, -300); tor.lineTo(112, -196); tor.lineTo(-112, -196); tor.lineTo(-(sh - 20), -300); tor.quadraticCurveTo(-(sh + 30), -360, -sh, -425); tor.closePath();
  add('skin', tor);
  fn((ctx, pose, c) => { // pecs, belly lines, scars
    inkLine(ctx, [[-90, -360], [-40, -330], [0, -345], [40, -330], [90, -360]], 4);
    inkLine(ctx, [[0, -340], [0, -250]], 3); inkLine(ctx, [[-30, -290], [30, -290]], 3); inkLine(ctx, [[-26, -255], [26, -255]], 3);
    if (o.scars) { inkLine(ctx, [[-80, -400], [-20, -300]], 4, '#2a4a18'); for (let i = 0; i < 5; i++) inkLine(ctx, [[-70 + i * 12 - 8, -380 + i * 18], [-70 + i * 12 + 8, -385 + i * 18]], 3); }
  });
  if (o.armour === 'eavy') {
    const pl = P(); pl.moveTo(-sh + 20, -420); pl.quadraticCurveTo(0, -460, sh - 20, -420); pl.lineTo(sh - 40, -290); pl.lineTo(-sh + 40, -290); pl.closePath();
    add('armor', pl);
    fn((ctx, pose, c) => { rivets(ctx, [[-sh + 40, -405], [sh - 40, -405], [-sh + 52, -305], [sh - 52, -305], [0, -300]], 6); glyph(ctx, 0, -360, 0.9, c.glyph); inkLine(ctx, [[-sh + 40, -330], [-60, -320]], 3, '#5a5a62'); });
    const pl2 = rr(-108, -292, 216, 70, 10); add('rust', pl2);
    fn((ctx) => { for (let i = 0; i < 4; i++) inkLine(ctx, [[-90 + i * 60, -282], [-70 + i * 60, -232]], 3); });
  } else {
    for (const s of [-1, 1]) add('vest', poly([[s * sh, -425], [s * 50, -455], [s * 32, -200], [s * 112, -196], [s * (sh - 20), -300], [s * (sh + 20), -380]]));
    fn((ctx) => { for (const s of [-1, 1]) { inkLine(ctx, [[s * 60, -420], [s * 44, -220]], 2.5, '#3a2414'); rivets(ctx, [[s * 70, -400], [s * 64, -340], [s * 58, -280]], 4); } });
  }
  if (o.teethNeck) fn((ctx, pose, c) => { inkLine(ctx, [[-70, -440], [0, -405], [70, -440]], 3); for (let i = -4; i <= 4; i++) { const tx = i * 15, ty = -416 - Math.abs(i) * 6; ctx.fillStyle = c.teeth; ctx.beginPath(); ctx.moveTo(tx - 5, ty); ctx.lineTo(tx + 5, ty); ctx.lineTo(tx, ty + 18); ctx.closePath(); ctx.fill(); ctx.lineWidth = _lw(ctx, 2.5); ctx.strokeStyle = INK; ctx.stroke(); } });
  // belt with skull buckle
  add('belt', rr(-118, -224, 236, 36, 8));
  fn((ctx, pose, c) => { const k = P(); k.arc(0, -206, 22, 0, 7); sfill(ctx, k, c.bone, 4); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(-8, -210, 5, 0, 7); ctx.arc(8, -210, 5, 0, 7); ctx.fill(); ctx.fillRect(-8, -198, 16, 4); });
  // right shoulder pad
  if (o.pad) { const pd = P(); pd.moveTo(sh - 60, -440); pd.quadraticCurveTo(sh + 40, -500, sh + 70, -400); pd.lineTo(sh + 50, -360); pd.quadraticCurveTo(sh, -410, sh - 70, -400); pd.closePath(); if (o.checks) fn((ctx, pose, c) => { checks(ctx, pd, sh - 80, -500, sh + 80, -350, 6, c); rivets(ctx, [[sh - 40, -425], [sh + 50, -395]], 5); }); else { add('armor', pd); fn((ctx) => rivets(ctx, [[sh - 40, -425], [sh + 50, -395]], 5)); } }
  // head: low and forward, big jaw, ears
  const hx = 0, hy2 = -455, hk = 1 + b * 0.12;
  for (const s of [-1, 1]) { add('skin', poly([[s * 60, hy2 - 10], [s * 150, hy2 - 48], [s * 136, hy2 - 22], [s * 124, hy2 - 10], [s * 112, hy2 + 4], [s * 66, hy2 + 20]]), 'head'); }
  fn((ctx, pose, c) => { for (const s of [-1, 1]) { inkLine(ctx, [[s * 80, hy2 - 2], [s * 130, hy2 - 30]], 3); ctx.strokeStyle = c.brass; ctx.lineWidth = _lw(ctx, 5); ctx.beginPath(); ctx.arc(s * 118, hy2 + 6, 10, 0, 7); ctx.stroke(); } }, 'head');
  const hd = P(); hd.moveTo(-62, hy2 - 30); hd.quadraticCurveTo(0, hy2 - 95, 62, hy2 - 30); hd.lineTo(92 * hk, hy2 + 20); hd.quadraticCurveTo(98 * hk, hy2 + 70, 62, hy2 + 76); hd.lineTo(-62, hy2 + 76); hd.quadraticCurveTo(-98 * hk, hy2 + 70, -92 * hk, hy2 + 20); hd.closePath();
  add('skin', hd, 'head');
  fn((ctx, pose, c) => {
    orkFace(ctx, pose, c, { x: hx, y: hy2 + 18, k: hk });
    if (o.scars) { inkLine(ctx, [[30, hy2 - 66], [64, hy2 + 4]], 4, '#2a4a18'); for (let i = 0; i < 4; i++) inkLine(ctx, [[36 + i * 8 - 8, hy2 - 54 + i * 16], [36 + i * 8 + 8, hy2 - 58 + i * 16]], 3); }
    if (o.jaw === 'iron') { const j = P(); j.moveTo(-70, hy2 + 50); j.lineTo(70, hy2 + 50); j.lineTo(60, hy2 + 82); j.lineTo(-60, hy2 + 82); j.closePath(); sfill(ctx, j, c.metal, 5); rivets(ctx, [[-50, hy2 + 66], [0, hy2 + 66], [50, hy2 + 66]], 4); for (const d of [-1, 1]) { const t = P(); t.moveTo(d * 40, hy2 + 52); t.lineTo(d * 48, hy2 + 20); t.lineTo(d * 30, hy2 + 52); t.closePath(); sfill(ctx, t, c.metal, 4); } }
    if (o.plate) { const pl = P(); pl.moveTo(-50, hy2 - 50); pl.quadraticCurveTo(0, hy2 - 100, 50, hy2 - 50); pl.lineTo(40, hy2 - 38); pl.quadraticCurveTo(0, hy2 - 76, -40, hy2 - 38); pl.closePath(); sfill(ctx, pl, c.metal, 5); rivets(ctx, [[-36, hy2 - 52], [0, hy2 - 70], [36, hy2 - 52]], 4); }
    if (o.helm) orkHelm(ctx, hy2, o.helm, c);
  }, 'head');
  // front arm (right) and weapon
  if (o.weapon === 'shoota' || o.weapon === 'kustom') fn((ctx, pose, c) => shoota(ctx, sh + 32, -152, o.weapon === 'kustom' ? 1.25 : 1, pose, c), 'armR');
  if (o.weapon === 'choppa' || o.weapon === 'big') fn((ctx, pose, c) => choppa(ctx, sh + 32, -152, o.weapon === 'big' ? 1.45 : 1, c), 'armR');
  arm(1); fist(1);
  return { parts, pivots: { legL: [-58, hy], legR: [58, hy], armL: [-(sh - 20), -410], armR: [sh - 20, -410], head: [0, -420] }, height: 540, headTop: [0, hy2 - 90], hand: { R: [sh + 32, -152], L: [-(sh + 32), -152] } };
}

function orkHelm(ctx, hy2, kind, c) {
  const h = P(); h.moveTo(-72, hy2 - 30); h.quadraticCurveTo(0, hy2 - 112, 72, hy2 - 30); h.lineTo(78, hy2 - 16); h.lineTo(-78, hy2 - 16); h.closePath();
  if (kind === 'horns' || kind === 'iron') for (const d of [-1, 1]) { const hn = P(); hn.moveTo(d * 46, hy2 - 66); hn.quadraticCurveTo(d * 110, hy2 - 90, d * 104, hy2 - 160); hn.quadraticCurveTo(d * 92, hy2 - 104, d * 30, hy2 - 80); hn.closePath(); sfill(ctx, hn, c.bone, 5); }
  sfill(ctx, h, kind === 'iron' ? c.armor : c.metal, 6);
  rivets(ctx, [[-56, hy2 - 28], [-20, hy2 - 30], [20, hy2 - 30], [56, hy2 - 28]], 4);
  if (kind === 'iron') { const v = P(); v.moveTo(-12, hy2 - 92); v.lineTo(12, hy2 - 92); v.lineTo(8, hy2 - 20); v.lineTo(-8, hy2 - 20); v.closePath(); sfill(ctx, v, c.red, 4); }
}

// ---------- weapons ----------
function choppa(ctx, x, y, k, c) {
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  const hd = rr(-11, -96, 22, 140, 6); sfill(ctx, hd, c.belt, 5);
  for (let i = 0; i < 4; i++) inkLine(ctx, [[-11, -70 + i * 14], [11, -64 + i * 14]], 2.5);
  const bl = P(); bl.moveTo(-8, -90); bl.lineTo(0, -250); bl.lineTo(170, -300); bl.lineTo(150, -262); bl.lineTo(178, -232); bl.lineTo(150, -200); bl.lineTo(172, -168); bl.lineTo(146, -140); bl.lineTo(24, -70); bl.closePath();
  sfill(ctx, bl, c.blade, 6);
  inkLine(ctx, [[20, -230], [150, -272]], 3, '#8a9098'); rivets(ctx, [[10, -110], [12, -150], [14, -200]], 5);
  ctx.fillStyle = c.rust; ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.ellipse(100, -200, 20, 11, -0.3, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
  ctx.restore();
}
function shoota(ctx, x, y, k, pose, c) {
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  const bd = P(); bd.moveTo(-40, -36); bd.lineTo(130, -46); bd.lineTo(140, -6); bd.lineTo(30, 6); bd.lineTo(-10, 40); bd.lineTo(-40, 30); bd.closePath();
  sfill(ctx, bd, c.gun, 6);
  sfill(ctx, rr(120, -40, 120, 20, 6), c.metal, 5); sfill(ctx, rr(120, -16, 100, 16, 6), c.metal, 5);
  if (k > 1.1) sfill(ctx, rr(120, -64, 110, 18, 6), c.metal, 5);
  const dm = P(); dm.arc(50, 22, 34, 0, 7); sfill(ctx, dm, c.rust, 5); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(50, 22, 8, 0, 7); ctx.fill();
  sfill(ctx, rr(-10, -60, 70, 18, 5), c.red, 4);
  rivets(ctx, [[-20, -20], [100, -30], [10, 20]], 4);
  if (pose.fire) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,200,80,0.95)'; ctx.beginPath(); ctx.moveTo(240, -30); ctx.lineTo(320, -60); ctx.lineTo(300, -28); ctx.lineTo(340, -6); ctx.lineTo(292, -10); ctx.lineTo(310, 24); ctx.lineTo(240, -12); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.restore();
}
// power klaw: hydraulic fist with three blades; pose.klaw 0 closed .. 1 open; side -1 for the left arm
function powerKlaw(ctx, x, y, k, pose, c, side = -1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(k * side, k); // built facing +x, mirrored for the left arm (side -1)
  const op = pose.klaw ?? 0.4;
  const base = P(); base.moveTo(-70, -90); base.lineTo(70, -100); base.lineTo(90, 10); base.lineTo(-60, 20); base.closePath();
  sfill(ctx, base, c.armor, 6);
  ctx.save(); ctx.clip(base); for (let i = -4; i < 6; i++) { ctx.fillStyle = i % 2 ? (c.haz || c.glyph) : c.chk1; ctx.beginPath(); ctx.moveTo(-70 + i * 30, -90); ctx.lineTo(-50 + i * 30, -90); ctx.lineTo(-90 + i * 30, -40); ctx.lineTo(-110 + i * 30, -40); ctx.closePath(); ctx.fill(); } ctx.restore();
  ctx.strokeStyle = INK; ctx.lineWidth = _lw(ctx, 6); ctx.stroke(base);
  rivets(ctx, [[-50, -20], [0, -24], [50, -28]], 6);
  // piston
  sfill(ctx, rr(-20, -150, 40, 70, 6), c.metal, 5); sfill(ctx, rr(-10, -170, 20, 30, 4), '#5a5e66', 4);
  // blades
  const blade = (ang, len) => { ctx.save(); ctx.translate(40, 10); ctx.rotate(ang); const bl = P(); bl.moveTo(-18, 0); bl.lineTo(18, 0); bl.quadraticCurveTo(30, len * 0.6, 4, len); bl.quadraticCurveTo(-6, len * 0.5, -18, 0); bl.closePath(); sfill(ctx, bl, c.blade, 5); rivets(ctx, [[0, 14]], 5); ctx.restore(); };
  blade(-0.5 - op * 0.5, 110); blade(-0.05, 130); blade(0.45 + op * 0.4, 110);
  // energy crackle
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = 'rgba(130,200,255,0.85)'; ctx.lineWidth = _lw(ctx, 4); const t = pose.time || 0; for (let i = 0; i < 3; i++) { ctx.beginPath(); let px = 0, py = 40; ctx.moveTo(px, py); for (let j = 0; j < 5; j++) { px += 14 + Math.sin(t * 30 + i * 3 + j) * 8; py += 18 + Math.cos(t * 27 + i + j * 2) * 10; ctx.lineTo(px - 10 + i * 20, py); } ctx.stroke(); } ctx.restore();
  ctx.restore();
}
// trophy bosspole: helmets of beaten foes and a glyph banner. kind 1 small, 2 big with banner
function bossPole(ctx, x, y, k, c, kind = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  sfill(ctx, rr(-10, -260 - kind * 60, 20, 340 + kind * 60, 6), c.belt, 5);
  sfill(ctx, rr(-80, -230 - kind * 60, 160, 16, 5), c.belt, 5);
  if (kind > 1) { const fl = P(); fl.moveTo(-70, -214 - kind * 60); fl.lineTo(70, -214 - kind * 60); fl.lineTo(60, -60 - kind * 50); fl.lineTo(0, -90 - kind * 50); fl.lineTo(-60, -60 - kind * 50); fl.closePath(); checks(ctx, fl, -70, -214 - kind * 60, 70, -40 - kind * 50, 5, c); glyph(ctx, 0, -150 - kind * 55, 0.8, c.glyph); }
  // helmets: a guard helmet, a marine helmet, a skull
  const hm = (hx, hy, col, kind2) => { ctx.save(); ctx.translate(hx, hy); if (kind2 === 'skull') { const s = P(); s.arc(0, 0, 26, 0, 7); sfill(ctx, s, c.bone, 4); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(-9, -2, 6, 0, 7); ctx.arc(9, -2, 6, 0, 7); ctx.fill(); ctx.fillRect(-8, 14, 16, 4); } else if (kind2 === 'guard') { const s = P(); s.moveTo(-34, 6); s.quadraticCurveTo(0, -52, 34, 6); s.closePath(); sfill(ctx, s, col, 4); sfill(ctx, rr(-40, 4, 80, 10, 5), col, 4); } else { const s = P(); s.moveTo(-28, 20); s.quadraticCurveTo(-34, -34, 0, -36); s.quadraticCurveTo(34, -34, 28, 20); s.closePath(); sfill(ctx, s, col, 4); sfill(ctx, rr(-14, 0, 28, 18, 4), '#2a2a33', 3); ctx.save(); ctx.shadowColor = '#ff3b2f'; ctx.shadowBlur = 8; ctx.fillStyle = '#ff3b2f'; ctx.fillRect(-20, -14, 14, 9); ctx.fillRect(6, -14, 14, 9); ctx.restore(); } ctx.restore(); };
  hm(-70, -190 - kind * 60, '#5a5e4a', 'guard'); hm(70, -192 - kind * 60, '#2d5bd1', 'marine'); hm(0, -290 - kind * 60, null, 'skull');
  ctx.restore();
}

// ---------- gretchin ----------
function buildGrot(o = {}) {
  const parts = []; const add = (role, path, g, extra) => parts.push({ role, path, g, ...extra }); const fn = (f, g) => parts.push({ fn: f, g });
  for (const s of [-1, 1]) { const g = s < 0 ? 'legL' : 'legR'; add('skin', limb([s * 22, -110], [s * 30, -10], 15, 12), g); add('boots', el(s * 38, -6, 26, 12), g); }
  add('skin', limb([-46, -210], [-70, -110], 14, 12), 'armL'); add('skin', el(-72, -104, 16, 14), 'armL');
  const tor = P(); tor.moveTo(-48, -215); tor.quadraticCurveTo(0, -240, 48, -215); tor.lineTo(42, -105); tor.lineTo(-42, -105); tor.closePath(); add('cloth', tor);
  fn((ctx, pose, c) => { inkLine(ctx, [[-40, -130], [-30, -112], [-18, -128], [-6, -110], [8, -128], [20, -110], [34, -126]], 3); sfill(ctx, rr(-44, -150, 88, 14, 4), c.belt, 3); });
  const hy = -270;
  for (const s of [-1, 1]) add('skin', poly([[s * 30, hy - 10], [s * 130, hy - 60], [s * 100, hy - 20], [s * 110, hy - 6], [s * 36, hy + 14]]), 'head');
  fn((ctx) => { for (const s of [-1, 1]) inkLine(ctx, [[s * 50, hy - 6], [s * 104, hy - 36]], 2.5); }, 'head');
  const hd = P(); hd.moveTo(-46, hy - 20); hd.quadraticCurveTo(0, hy - 80, 46, hy - 20); hd.quadraticCurveTo(52, hy + 36, 0, hy + 44); hd.quadraticCurveTo(-52, hy + 36, -46, hy - 20); add('skin', hd, 'head');
  fn((ctx, pose, c) => {
    const ex = pose.expr || 'shock';
    for (const d of [-1, 1]) { ctx.fillStyle = '#fff4c0'; ctx.beginPath(); ctx.ellipse(d * 20, hy - 10, 12, pose.blink ? 2 : 13, 0, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = _lw(ctx, 3); ctx.stroke(); ctx.fillStyle = '#c02010'; ctx.beginPath(); ctx.arc(d * 20 + 3, hy - 9, 5, 0, 7); ctx.fill(); }
    const n = P(); n.moveTo(-6, hy - 4); n.quadraticCurveTo(30, hy + 6, 40, hy + 24); n.quadraticCurveTo(10, hy + 22, -4, hy + 12); n.closePath(); sfill(ctx, n, c.skin, 3);
    const m = P(); const mo = ex === 'talk' ? 4 + 8 * Math.abs(Math.sin((pose.time || 0) * 14)) : ex === 'happy' ? 10 : ex === 'shock' ? 12 : 3; m.ellipse(-4, hy + 28, 20, mo, 0, 0, 7); ctx.fillStyle = '#3a0e10'; ctx.fill(m); ctx.strokeStyle = INK; ctx.lineWidth = _lw(ctx, 3); ctx.stroke(m);
    ctx.fillStyle = c.teeth; ctx.fillRect(-14, hy + 28 - mo, 6, 6); ctx.fillRect(4, hy + 28 - mo, 6, 6);
    if (o.hat) { const h = P(); h.moveTo(-50, hy - 36); h.quadraticCurveTo(0, hy - 110, 50, hy - 36); h.closePath(); sfill(ctx, h, c.metal, 4); }
  }, 'head');
  if (o.pole) fn((ctx, pose, c) => bossPole(ctx, 60, -100, 0.55, c, o.pole), 'armR');
  else if (o.weapon !== 'none') fn((ctx, pose, c) => { ctx.save(); ctx.translate(72, -104); const g = P(); g.moveTo(-10, -14); g.lineTo(90, -20); g.lineTo(92, -4); g.lineTo(10, 8); g.lineTo(-4, 26); g.lineTo(-18, 20); g.closePath(); sfill(ctx, g, c.gun, 4); ctx.restore(); }, 'armR');
  add('skin', limb([46, -210], [70, -110], 14, 12), 'armR'); add('skin', el(72, -104, 16, 14), 'armR');
  return { parts, pivots: { legL: [-22, -110], legR: [22, -110], armL: [-46, -210], armR: [46, -210], head: [0, -235] }, height: 330, headTop: [0, hy - 70] };
}

// ---------- warboss in mega armour ----------
// o.pole: bosspole kind; o.helm: iron (default) | horns | none; o.plate: metal skull plate visible under the helm
function buildMega(o = {}) {
  const parts = []; const add = (role, path, g, extra) => parts.push({ role, path, g, ...extra }); const fn = (f, g) => parts.push({ fn: f, g });
  if (o.cape) fn((ctx, pose, c) => { const t = pose.time || 0; const cp = P(); cp.moveTo(-190, -680); cp.quadraticCurveTo(0, -720, 190, -680); cp.lineTo(330, -40); for (let i = 0; i <= 10; i++) cp.lineTo(330 - i * 66, -20 - (i % 2) * 70 + Math.sin(t * 2 + i) * 10); cp.closePath(); sfill(ctx, cp, c.cape || c.red, 6); for (let i = 0; i < 6; i++) { ctx.save(); ctx.translate(-200 + i * 80, -620); const f = P(); f.ellipse(0, 0, 50, 24, 0, 0, 7); sfill(ctx, f, '#8a6a4a', 4); ctx.restore(); } });
  if (o.pole) fn((ctx, pose, c) => bossPole(ctx, -150, -640, 1.4, c, o.pole));
  // exhaust stacks behind the shoulders, with smoke
  fn((ctx, pose, c) => { for (const d of [-1, 1]) { sfill(ctx, rr(d * 110 - 22, -800, 44, 220, 8), c.metal, 6); sfill(ctx, rr(d * 110 - 30, -812, 60, 24, 6), '#4a4e56', 5); const t = pose.time || 0; for (let i = 0; i < 4; i++) { const ph = (t * 0.7 + i * 0.25) % 1; ctx.fillStyle = `rgba(60,56,52,${0.55 * (1 - ph)})`; ctx.beginPath(); ctx.arc(d * 110 + Math.sin(i * 2 + t) * 20 * ph, -820 - ph * 160, 20 + ph * 50, 0, 7); ctx.fill(); } } });
  // legs: armoured stumps
  for (const s of [-1, 1]) {
    const g = s < 0 ? 'legL' : 'legR';
    add('armor', rr(s > 0 ? 20 : -170, -260, 150, 150, 28), g);
    add('armor', rr(s > 0 ? 34 : -154, -130, 120, 100, 16), g);
    const ft = P(); ft.moveTo(s * 20, -40); ft.lineTo(s * 170, -40); ft.quadraticCurveTo(s * 200, -20, s * 196, 0); ft.lineTo(s * 14, 0); ft.closePath(); add('metal', ft, g);
    fn((ctx, pose, c) => { rivets(ctx, [[s * 70, -230], [s * 120, -230], [s * 70, -130], [s * 110, -130]], 6); const kn = P(); kn.arc(s * 90, -125, 34, 0, 7); sfill(ctx, kn, c.metal, 5); }, g);
  }
  // left arm with klaw (behind)
  add('armor', el(-220, -480, 70, 90), 'armL');
  add('armor', rr(-270, -420, 100, 150, 20), 'armL');
  fn((ctx, pose, c) => powerKlaw(ctx, -215, -255, 1.7, pose, c, -1), 'armL');
  // body: a walking forge
  const bd = P(); bd.moveTo(-200, -640); bd.quadraticCurveTo(0, -700, 200, -640); bd.lineTo(220, -420); bd.quadraticCurveTo(200, -260, 150, -230); bd.lineTo(-150, -230); bd.quadraticCurveTo(-200, -260, -220, -420); bd.closePath();
  add('armor', bd);
  fn((ctx, pose, c) => {
    // belly plate with hazard stripes, chest glyph, rivets, battle damage
    const bp = P(); bp.moveTo(-150, -380); bp.lineTo(150, -380); bp.lineTo(130, -250); bp.lineTo(-130, -250); bp.closePath();
    ctx.save(); ctx.clip(bp); for (let i = -6; i < 8; i++) { ctx.fillStyle = i % 2 ? (c.haz || c.glyph) : c.chk1; ctx.beginPath(); ctx.moveTo(-160 + i * 40, -380); ctx.lineTo(-130 + i * 40, -380); ctx.lineTo(-190 + i * 40, -250); ctx.lineTo(-220 + i * 40, -250); ctx.closePath(); ctx.fill(); } ctx.restore();
    ctx.strokeStyle = INK; ctx.lineWidth = _lw(ctx, 6); ctx.stroke(bp);
    const cp = P(); cp.moveTo(-120, -620); cp.lineTo(120, -620); cp.lineTo(100, -420); cp.lineTo(-100, -420); cp.closePath(); sfill(ctx, cp, c.red, 6);
    glyph(ctx, 0, -520, 1.8, c.glyph);
    rivets(ctx, [[-180, -600], [180, -600], [-190, -450], [190, -450], [-110, -400], [110, -400], [-170, -300], [170, -300]], 7);
    inkLine(ctx, [[120, -560], [150, -530], [135, -500]], 4); inkLine(ctx, [[-150, -470], [-120, -440]], 4);
    ctx.fillStyle = c.rust; ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.ellipse(-150, -560, 22, 12, 0.4, 0, 7); ctx.ellipse(160, -330, 18, 10, -0.2, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
    // searchlight
    const sl = P(); sl.arc(150, -640, 26, 0, 7); sfill(ctx, sl, c.metal, 5); ctx.save(); ctx.shadowColor = '#fff2a0'; ctx.shadowBlur = 30; ctx.fillStyle = '#fff2a0'; ctx.beginPath(); ctx.arc(150, -640, 15, 0, 7); ctx.fill(); ctx.restore();
  });
  // shoulder pads: huge, checked, spiked
  for (const s of [-1, 1]) {
    const pd = P(); pd.moveTo(s * 120, -690); pd.quadraticCurveTo(s * 300, -740, s * 320, -560); pd.lineTo(s * 250, -520); pd.quadraticCurveTo(s * 200, -620, s * 110, -600); pd.closePath();
    fn((ctx, pose, c) => { checks(ctx, pd, s > 0 ? 100 : -330, -760, s > 0 ? 330 : -100, -500, 7, c); for (let i = 0; i < 3; i++) { const sp = P(); const bx = s * (170 + i * 50), by = -716 + i * 30; sp.moveTo(bx - 14, by + 6); sp.lineTo(bx + s * 10, by - 50); sp.lineTo(bx + 14, by + 10); sp.closePath(); sfill(ctx, sp, c.metal, 4); } }, s < 0 ? 'armL' : 'armR');
  }
  // head peeking out of the collar
  const hy = -690;
  add('armor', rr(-110, -720, 220, 70, 24));
  fn((ctx, pose, c) => {
    ctx.save(); ctx.translate(0, -650); ctx.scale(1.3, 1.3); ctx.translate(0, 650);
    const hd = P(); hd.moveTo(-60, hy - 40); hd.quadraticCurveTo(0, hy - 100, 60, hy - 40); hd.lineTo(84, hy + 10); hd.quadraticCurveTo(90, hy + 56, 56, hy + 60); hd.lineTo(-56, hy + 60); hd.quadraticCurveTo(-90, hy + 56, -84, hy + 10); hd.closePath();
    for (const s of [-1, 1]) { const e = poly([[s * 56, hy - 18], [s * 140, hy - 56], [s * 124, hy - 26], [s * 112, hy - 14], [s * 62, hy + 10]]); sfill(ctx, e, c.skin, 5); }
    sfill(ctx, hd, c.skin, 6);
    orkFace(ctx, pose, c, { x: 0, y: hy + 6, k: 0.95 });
    if (o.jaw === 'iron') { const j = P(); j.moveTo(-74, hy + 40); j.lineTo(74, hy + 40); j.lineTo(62, hy + 76); j.lineTo(-62, hy + 76); j.closePath(); sfill(ctx, j, c.metal, 5); rivets(ctx, [[-50, hy + 58], [0, hy + 58], [50, hy + 58]], 4); for (const d of [-1, 1]) { const tk = P(); tk.moveTo(d * 42, hy + 42); tk.lineTo(d * 52, hy + 4); tk.lineTo(d * 30, hy + 42); tk.closePath(); sfill(ctx, tk, c.metal, 4); } }
    if (o.helm !== 'none') orkHelm(ctx, hy, o.helm || 'iron', c);
    else if (o.plate) { const pl = P(); pl.moveTo(-50, hy - 56); pl.quadraticCurveTo(0, hy - 104, 50, hy - 56); pl.lineTo(40, hy - 44); pl.quadraticCurveTo(0, hy - 80, -40, hy - 44); pl.closePath(); sfill(ctx, pl, c.metal, 5); rivets(ctx, [[-36, hy - 58], [0, hy - 76], [36, hy - 58]], 4); }
    ctx.restore();
  }, 'head');
  // right arm: kustom shoota
  add('armor', el(220, -480, 70, 90), 'armR');
  add('armor', rr(170, -420, 100, 150, 20), 'armR');
  fn((ctx, pose, c) => { shoota(ctx, 220, -250, 1.5, pose, c); const f = P(); f.arc(230, -262, 46, 0, 7); sfill(ctx, f, c.armor, 6); rivets(ctx, [[214, -262], [246, -262]], 5); }, 'armR');
  return { parts, pivots: { legL: [-90, -240], legR: [90, -240], armL: [-210, -520], armR: [210, -520], head: [0, -660] }, height: 820, headTop: [0, -800] };
}

// ---------- wrappers ----------
const _orc = {};
function _orig(kind, o) { const k = kind + JSON.stringify(o); return _orc[k] || (_orc[k] = ({ x: buildOrkX, grot: buildGrot, mega: buildMega })[kind](o)); }
function orkX(ctx, x, y, s, pose = {}, o = {}, col = OKP.boy) { drawRig(ctx, _orig('x', o), x, y, s, pose, col); }
function grot(ctx, x, y, s, pose = {}, o = {}, col = OKP.grot) { drawRig(ctx, _orig('grot', o), x, y, s, pose, col); }
function megaBoss(ctx, x, y, s, pose = {}, o = {}, col = OKP.war) { drawRig(ctx, _orig('mega', o), x, y, s, pose, col); }
