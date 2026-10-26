// People for the Stalin video: one human rig with hair, facial hair, hats and period outfits, in the cel-shaded rig format of
// src/video/chars.js. Path parts take the palette, fn parts draw details with sfill() from orks/orkrig.js.
// o: kid, female, hair (swept|short|bald|bushy|bob|long|kerchief|curly), gray, mustache (stalin|small|thick|brush), beard (goatee|full|short),
//    glasses (pince|round), outfit (rubashka|cassock|coat|tunic|marshal|white|suit|dress|nkvd|apron|robe), hat (cap|marshal|nkvd|kepka|skufia|none),
//    belt, pipe, star, pocks, belly, cigar

const SPAL = {
  base: { skin: '#e8c09a', hair: '#1e1a18', jacket: '#7a7660', pants: '#4e4c44', boots: '#1a1714', shirt: '#e8e2d2', trim: '#3a3830', hat: '#6e6a56', hatBand: '#8a1a14', metal: '#c8ccd2', gold: '#d8b040', red: '#b02a20', tie: '#3a2a2a', btn: '#c8b070', pipe: '#3a2418' },
};
SPAL.tunic = pal(SPAL.base, { jacket: '#8a8468', pants: '#5a5848', hat: '#8a8468' });
SPAL.grayTunic = pal(SPAL.base, { jacket: '#8a8a82', pants: '#6a6a64', hat: '#8a8a82' });
SPAL.marshal = pal(SPAL.base, { jacket: '#7a7656', pants: '#2e3032', hat: '#7a7656', hatBand: '#a8241c' });
SPAL.white = pal(SPAL.base, { jacket: '#efece2', pants: '#2a2c30', hat: '#efece2', hatBand: '#a8241c', hair: '#b8b4ac' });
SPAL.cassock = pal(SPAL.base, { jacket: '#1c1a1e', pants: '#1c1a1e', trim: '#2a2830' });
SPAL.coat = pal(SPAL.base, { jacket: '#2e2c2a', pants: '#2a2826', shirt: '#4a5a7a', hat: '#2a2826' });
SPAL.kid = pal(SPAL.base, { jacket: '#e8e2d2', pants: '#3a3a44', shirt: '#e8e2d2' });
SPAL.suit = pal(SPAL.base, { jacket: '#3a3a40', pants: '#34343a', hat: '#3a3a40' });
SPAL.lenin = pal(SPAL.suit, { hair: '#9a5a30', jacket: '#3a3430', pants: '#34302c', hat: '#3a3430' });
SPAL.trotsky = pal(SPAL.base, { hair: '#2a2420', jacket: '#2a2624', pants: '#2a2624', shirt: '#3a3634' });
SPAL.nkvd = pal(SPAL.base, { jacket: '#7a7656', pants: '#3a4a7a', hat: '#2c3a7a', hatBand: '#a8241c' });
SPAL.keke = pal(SPAL.base, { jacket: '#1c1a1e', pants: '#1c1a1e', shirt: '#2a2830', hair: '#1c1a1e', skin: '#d8b08a' });
SPAL.nadya = pal(SPAL.base, { jacket: '#4a4a5a', pants: '#3a3a48', hair: '#2a2018', shirt: '#e8e2d2' });
SPAL.peasant = pal(SPAL.base, { jacket: '#a8987a', pants: '#5a5040', shirt: '#c8b898', hat: '#4a4038', skin: '#d8a880' });
SPAL.worker = pal(SPAL.base, { jacket: '#3a4250', pants: '#2e3440', hat: '#3a3a40' });
SPAL.prisoner = pal(SPAL.base, { jacket: '#5a5a58', pants: '#4a4a48', hat: '#4a4a48', skin: '#d0b090' });
SPAL.churchill = pal(SPAL.suit, { skin: '#f0c8a8', hair: '#c8b8a8', jacket: '#2a2a34' });
SPAL.roosevelt = pal(SPAL.suit, { skin: '#ecc4a0', hair: '#9a9a96', jacket: '#4a4a4e', trim: '#2a2a2e' });

function buildMan(o = {}) {
  const parts = []; const add = (role, path, g, extra) => parts.push({ role, path, g, ...extra }); const fn = (f, g) => parts.push({ fn: f, g });
  const kid = !!o.kid, fem = !!o.female;
  const hipY = kid ? -175 : -270, shY = kid ? -320 : -462, hc = kid ? -398 : -548, hr = kid ? 54 : 50;
  const sw = kid ? 56 : fem ? 68 : 80 + (o.belly ? 6 : 0), ww = kid ? 46 : fem ? 52 : 60 + (o.belly ? 16 : 0);
  const out = o.outfit || 'tunic';
  const tall = ['tunic', 'marshal', 'white', 'nkvd', 'coat'].includes(out);
  const long = out === 'cassock' || out === 'dress' || out === 'robe';
  // legs
  for (const s of [-1, 1]) {
    const g = s < 0 ? 'legL' : 'legR';
    const knee = [s * (kid ? 24 : 32), kid ? -88 : -138], ank = [s * (kid ? 24 : 32), -22];
    add('pants', limb([s * (kid ? 22 : 30), hipY + 8], knee, kid ? 22 : 28, kid ? 19 : 24), g);
    add('pants', limb(knee, ank, kid ? 19 : 24, kid ? 17 : 21), g);
    if ((out === 'marshal' || out === 'white') && !long) fn((ctx, pose, c) => inkLine(ctx, [[s * 30 + s * 24, hipY + 20], [s * 32 + s * 21, -40]], 5, c.red), g);
    if (tall) add('boots', poly([[s * 32 - 26, kid ? -100 : -150], [s * 32 + 26, kid ? -100 : -150], [s * 32 + 25, -26], [s * 32 + s * 46, -18], [s * 32 + s * 46, 0], [s * 32 - s * 26, 0]]), g);
    else add('boots', poly([[s * 32 - 24, -30], [s * 32 + 24, -30], [s * 32 + s * 44, -14], [s * 32 + s * 44, 0], [s * 32 - s * 24, 0]]), g);
  }
  // long skirts over the legs
  if (long) { const sk = P(); sk.moveTo(-ww, hipY - 10); sk.lineTo(ww, hipY - 10); sk.lineTo(ww + 40, -36); sk.quadraticCurveTo(0, -24, -ww - 40, -36); sk.closePath(); add(out === 'dress' ? 'pants' : 'jacket', sk); }
  if (out === 'coat') { const sk = P(); sk.moveTo(-ww - 6, hipY - 10); sk.lineTo(ww + 6, hipY - 10); sk.lineTo(ww + 28, -110); sk.lineTo(-ww - 28, -110); sk.closePath(); add('jacket', sk); }
  if (out === 'robe') fn((ctx, pose, c) => { sfill(ctx, rr(-ww - 30, hipY - 10, (ww + 30) * 2, -hipY - 50, 30), '#2a3a5a', 6); });
  // arms
  const arm = (s, front) => {
    const g = s < 0 ? 'armL' : 'armR';
    const short = s < 0 && o.arm ? 0.92 : 1; // the left arm: shorter and stiff
    const sh = [s * (sw - 4), shY + 10], el = [s * (sw + 10), shY + 10 + (kid ? 80 : 105) * short], hd = [s * (sw + 14), shY + 10 + (kid ? 155 : 205) * short];
    add('jacket', limb(sh, el, kid ? 20 : 25, kid ? 18 : 22), g);
    add('jacket', limb(el, hd, kid ? 18 : 22, kid ? 16 : 20), g);
    if (out === 'marshal' || out === 'white') fn((ctx, pose, c) => inkLine(ctx, [[hd[0] - 18, hd[1] - 30], [hd[0] + 18, hd[1] - 30]], 4, c.gold), g);
    add('skin', el2(hd[0], hd[1] + 12, kid ? 15 : 18, kid ? 16 : 20), g);
    if (front && o.pipe) fn((ctx, pose, c) => { ctx.save(); ctx.translate(hd[0] + 6, hd[1] + 6); ctx.rotate(-0.3); sfill(ctx, rr(-6, -60, 12, 64, 5), c.pipe, 4); const b = P(); b.moveTo(-18, -78); b.lineTo(18, -78); b.lineTo(14, -48); b.lineTo(-14, -48); b.closePath(); sfill(ctx, b, c.pipe, 4); if (pose.smoke !== false) smokeFX(ctx, 0, -100, pose.time || 0, 0.25, 3, '200,200,200', 0.35); ctx.restore(); }, g);
    if (front && o.cigar) fn((ctx, pose, c) => { ctx.save(); ctx.translate(hd[0], hd[1]); sfill(ctx, rr(-6, -40, 12, 50, 5), '#6a4224', 3); ctx.fillStyle = '#ff7030'; ctx.fillRect(-5, -44, 10, 6); smokeFX(ctx, 0, -60, pose.time || 0, 0.2, 4, '200,200,200', 0.3); ctx.restore(); }, g);
    if (front && o.paper) fn((ctx, pose, c) => { ctx.save(); ctx.translate(hd[0] + 10, hd[1] - 10); ctx.rotate(-0.15); sfill(ctx, rr(0, -60, 70, 90, 3), '#f4ead2', 3); for (let i = 0; i < 5; i++) inkLine(ctx, [[10, -44 + i * 14], [58, -44 + i * 14]], 2, '#6a6a6a'); ctx.restore(); }, g);
  };
  arm(-1, false);
  // torso
  const tor = P(); tor.moveTo(-sw, shY + 6); tor.quadraticCurveTo(0, shY - 14, sw, shY + 6); tor.lineTo(ww + (o.belly ? 6 : 0), hipY); tor.lineTo(-ww - (o.belly ? 6 : 0), hipY); tor.closePath();
  add(out === 'rubashka' || out === 'apron' ? 'shirt' : 'jacket', tor);
  fn((ctx, pose, c) => outfitDetails(ctx, out, o, c, { sw, ww, shY, hipY, kid, fem }));
  arm(1, true);
  // head
  add('skin', rr(-16, hc + hr - 8, 32, 30, 8), 'head');
  for (const s of [-1, 1]) add('skin', el2(s * hr * 0.98, hc + 4, hr * 0.2, hr * 0.28), 'head');
  if (o.hair === 'bushy' || o.hair === 'curly') add('hair', el2(0, hc - hr * 0.25, hr * 1.35, hr * 0.95), 'head');
  if (o.hair === 'bob') add('hair', rr(-hr * 1.15, hc - hr * 1.05, hr * 2.3, hr * 1.6, hr * 0.7), 'head');
  if (o.hair === 'kerchief') { const kf = P(); kf.moveTo(-hr * 1.25, hc + hr * 0.9); kf.quadraticCurveTo(-hr * 1.35, hc - hr * 1.35, 0, hc - hr * 1.2); kf.quadraticCurveTo(hr * 1.35, hc - hr * 1.35, hr * 1.25, hc + hr * 0.9); kf.lineTo(hr * 0.6, hc + hr * 1.2); kf.lineTo(-hr * 0.6, hc + hr * 1.2); kf.closePath(); add('hair', kf, 'head'); }
  add('skin', el2(0, hc, hr * 0.95, hr * (fem || kid ? 1.02 : 1.08)), 'head');
  fn((ctx, pose, c) => manFace(ctx, o, pose, c, hc, hr), 'head');
  return { parts, pivots: { legL: [-30, hipY + 8], legR: [30, hipY + 8], armL: [-(sw - 4), shY + 10], armR: [sw - 4, shY + 10], head: [0, hc + hr] }, height: -hc + hr, headTop: [0, hc - hr * 1.2] };
}
function el2(x, y, rx, ry) { const p = P(); p.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); return p; }

function outfitDetails(ctx, out, o, c, g) {
  const { sw, ww, shY, hipY, kid, fem } = g;
  const btns = (x, y0, y1, n, col) => { for (let i = 0; i < n; i++) { const y = y0 + ((y1 - y0) * i) / (n - 1); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, kid ? 5 : 6.5, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = _lw(ctx, 2.5); ctx.stroke(); } };
  if (out === 'tunic' || out === 'marshal' || out === 'white' || out === 'nkvd') {
    const gold = out === 'white' || out === 'marshal';
    // standing collar
    sfill(ctx, rr(-30, shY - 14, 60, 30, 8), c.jacket, 5);
    inkLine(ctx, [[0, shY + 14], [0, hipY]], 3);
    btns(8, shY + 40, hipY - 22, 5, gold ? c.gold : c.btn);
    for (const s of [-1, 1]) {
      // breast pockets with pleat and flap, lower pockets
      const px = s * (sw * 0.5);
      sfill(ctx, rr(px - 30, shY + 50, 60, 64, 6), c.jacket, 4); sfill(ctx, rr(px - 32, shY + 40, 64, 22, 6), c.jacket, 4); inkLine(ctx, [[px, shY + 62], [px, shY + 112]], 2.5); btns(px, shY + 52, shY + 52, 1, gold ? c.gold : c.btn);
      if (!kid) { sfill(ctx, rr(s * (ww * 0.55) - 32, hipY - 92, 64, 74, 6), c.jacket, 4); sfill(ctx, rr(s * (ww * 0.55) - 34, hipY - 98, 68, 22, 6), c.jacket, 4); }
    }
    if (out === 'marshal' || out === 'white') for (const s of [-1, 1]) { ctx.save(); ctx.translate(s * (sw - 28), shY + 4); ctx.rotate(s * 0.12); sfill(ctx, rr(-26, -10, 52, 20, 6), c.gold, 4); star5(ctx, 0, 0, 8, c.gold, '#8a6a20'); ctx.restore(); }
    if (o.belt || out === 'nkvd') { sfill(ctx, rr(-ww - 2, hipY - 34, (ww + 2) * 2, 22, 5), '#3a2614', 4); sfill(ctx, rr(-14, hipY - 36, 28, 26, 4), c.btn, 3); }
    if (out === 'nkvd') sfill(ctx, rr(ww - 30, hipY - 30, 34, 50, 8), '#3a2614', 4);
  }
  if (o.star) { const sx = -(sw * 0.5), sy = (g.shY) + 26; ctx.save(); inkLine(ctx, [[sx - 8, sy - 22], [sx + 8, sy - 22]], 8, c.red); star5(ctx, sx, sy, 16, c.gold, '#8a6a20'); ctx.restore(); }
  if (out === 'cassock') { sfill(ctx, rr(-14, shY - 10, 28, 18, 6), c.trim, 4); btns(0, shY + 30, hipY + 140, 9, '#2a2830'); sfill(ctx, rr(-ww - 4, hipY - 26, (ww + 4) * 2, 18, 5), c.trim, 4); }
  if (out === 'coat') { const sh = P(); sh.moveTo(-26, shY - 6); sh.lineTo(26, shY - 6); sh.lineTo(16, hipY - 10); sh.lineTo(-16, hipY - 10); sh.closePath(); sfill(ctx, sh, c.shirt, 4); inkLine(ctx, [[-sw + 10, shY + 6], [-24, shY + 60], [-20, hipY]], 4); inkLine(ctx, [[sw - 10, shY + 6], [24, shY + 60], [20, hipY]], 4); btns(-8, shY + 10, shY + 60, 3, '#e8e2d2'); }
  if (out === 'rubashka' || out === 'apron') { inkLine(ctx, [[-10, shY - 4], [-12, shY + 60]], 3); btns(-11, shY + 14, shY + 46, 3, '#e8e2d2'); sfill(ctx, rr(-ww - 2, hipY - 30, (ww + 2) * 2, 16, 5), '#6a3a20', 3); if (out === 'apron') sfill(ctx, rr(-ww + 6, hipY - 20, (ww - 6) * 2, 180, 10), '#6a5a44', 4); }
  if (out === 'suit') { const sh = P(); sh.moveTo(-26, shY - 6); sh.lineTo(26, shY - 6); sh.lineTo(0, shY + 120); sh.closePath(); sfill(ctx, sh, c.shirt, 4); const t = P(); t.moveTo(-8, shY + 6); t.lineTo(8, shY + 6); t.lineTo(12, shY + 90); t.lineTo(0, shY + 106); t.lineTo(-12, shY + 90); t.closePath(); sfill(ctx, t, c.tie, 3); for (const s of [-1, 1]) inkLine(ctx, [[s * 30, shY - 4], [s * 8, shY + 130], [s * 4, hipY]], 4); btns(-10, shY + 150, hipY - 30, 2, '#2a2a2a'); }
  if (out === 'dress') { sfill(ctx, rr(-24, shY - 8, 48, 22, 8), c.shirt, 4); }
}
function star5(ctx, x, y, r, fill, line = INK) { const p = P(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr2 = i % 2 ? r * 0.45 : r; i ? p.lineTo(x + Math.cos(a) * rr2, y + Math.sin(a) * rr2) : p.moveTo(x + Math.cos(a) * rr2, y + Math.sin(a) * rr2); } p.closePath(); ctx.fillStyle = fill; ctx.fill(p); ctx.strokeStyle = line; ctx.lineWidth = _lw(ctx, 2.5); ctx.stroke(p); }

function manFace(ctx, o, pose, c, hc, hr) {
  const hairC = o.gray ? '#a8a49c' : c.hair;
  // hair, back to front
  if (o.hair === 'swept' || o.hair === 'short' || o.hair === 'long' || !o.hair) {
    const hp = P();
    if (o.hair === 'swept') { hp.moveTo(-hr * 1.0, hc - hr * 0.05); hp.quadraticCurveTo(-hr * 1.12, hc - hr * 1.15, -hr * 0.1, hc - hr * 1.32); hp.quadraticCurveTo(hr * 1.05, hc - hr * 1.25, hr * 1.0, hc - hr * 0.05); hp.quadraticCurveTo(hr * 0.75, hc - hr * 0.7, hr * 0.05, hc - hr * 0.78); hp.quadraticCurveTo(-hr * 0.75, hc - hr * 0.72, -hr * 1.0, hc - hr * 0.05); }
    else if (o.hair === 'long') { hp.moveTo(-hr * 1.06, hc + hr * 0.4); hp.quadraticCurveTo(-hr * 1.15, hc - hr * 1.2, 0, hc - hr * 1.18); hp.quadraticCurveTo(hr * 1.15, hc - hr * 1.2, hr * 1.06, hc + hr * 0.4); hp.lineTo(hr * 0.8, hc - hr * 0.4); hp.quadraticCurveTo(0, hc - hr * 0.85, -hr * 0.8, hc - hr * 0.4); hp.closePath(); }
    else { hp.moveTo(-hr * 0.98, hc - hr * 0.1); hp.quadraticCurveTo(-hr, hc - hr * 1.18, 0, hc - hr * 1.15); hp.quadraticCurveTo(hr, hc - hr * 1.18, hr * 0.98, hc - hr * 0.1); hp.quadraticCurveTo(hr * 0.6, hc - hr * 0.62, 0, hc - hr * 0.66); hp.quadraticCurveTo(-hr * 0.6, hc - hr * 0.62, -hr * 0.98, hc - hr * 0.1); }
    sfill(ctx, hp, hairC, 5);
    if (o.hair === 'swept') for (let i = -2; i <= 2; i++) inkLine(ctx, [[i * hr * 0.25, hc - hr * 0.8], [i * hr * 0.3 - hr * 0.05, hc - hr * 1.2]], 2.5, 'rgba(0,0,0,0.35)');
  }
  if (o.hair === 'bald') for (const s of [-1, 1]) { const f = P(); f.moveTo(s * hr * 0.98, hc + hr * 0.1); f.quadraticCurveTo(s * hr * 1.05, hc - hr * 0.5, s * hr * 0.75, hc - hr * 0.6); f.lineTo(s * hr * 0.85, hc + hr * 0.1); f.closePath(); sfill(ctx, f, hairC, 4); }
  if (o.hair === 'bob' || o.hair === 'bushy' || o.hair === 'curly') { const f = P(); f.moveTo(-hr * 0.95, hc - hr * 0.3); f.quadraticCurveTo(0, hc - hr * 1.3, hr * 0.95, hc - hr * 0.3); f.quadraticCurveTo(0, hc - hr * 0.8, -hr * 0.95, hc - hr * 0.3); sfill(ctx, f, hairC, 4); }
  if (o.hair === 'kerchief') { const f = P(); f.moveTo(-hr * 0.98, hc + hr * 0.2); f.quadraticCurveTo(-hr * 1.05, hc - hr * 1.0, 0, hc - hr * 1.0); f.quadraticCurveTo(hr * 1.05, hc - hr * 1.0, hr * 0.98, hc + hr * 0.2); f.quadraticCurveTo(hr * 0.9, hc - hr * 0.55, 0, hc - hr * 0.6); f.quadraticCurveTo(-hr * 0.9, hc - hr * 0.55, -hr * 0.98, hc + hr * 0.2); sfill(ctx, f, c.hair, 4); }
  // pockmarks
  if (o.pocks) { ctx.fillStyle = 'rgba(120,70,50,0.35)'; const r = rng(7); for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc((r() - 0.5) * hr * 1.4, hc + (r() - 0.2) * hr * 0.8, 2.2, 0, 7); ctx.fill(); } }
  // beard under the mouth
  if (o.beard) { const b = P(); if (o.beard === 'goatee') { b.moveTo(-hr * 0.3, hc + hr * 0.55); b.quadraticCurveTo(0, hc + hr * 1.55, hr * 0.3, hc + hr * 0.55); b.closePath(); } else { const full = o.beard === 'full'; b.moveTo(-hr * 0.9, hc + hr * (full ? 0.15 : 0.4)); b.quadraticCurveTo(-hr * 0.85, hc + hr * (full ? 1.45 : 1.2), 0, hc + hr * (full ? 1.55 : 1.28)); b.quadraticCurveTo(hr * 0.85, hc + hr * (full ? 1.45 : 1.2), hr * 0.9, hc + hr * (full ? 0.15 : 0.4)); b.quadraticCurveTo(hr * 0.5, hc + hr * 0.95, 0, hc + hr * 0.95); b.quadraticCurveTo(-hr * 0.5, hc + hr * 0.95, -hr * 0.9, hc + hr * (full ? 0.15 : 0.4)); b.closePath(); } sfill(ctx, b, o.gray ? '#a8a49c' : c.hair, 4); }
  drawFace(ctx, { cx: 0, cy: hc + hr * 0.08, r: hr * 0.95 }, { ...pose, nose: true, wrinkles: pose.wrinkles ?? o.gray });
  // mustache over the mouth
  if (o.mustache) {
    const my = hc + hr * 0.42, w = o.mustache === 'stalin' ? hr * 0.62 : o.mustache === 'thick' ? hr * 0.5 : o.mustache === 'brush' ? hr * 0.16 : hr * 0.38;
    const m = P(); m.moveTo(-w, my + hr * 0.12); m.quadraticCurveTo(-w * 0.7, my - hr * 0.16, 0, my - hr * 0.12); m.quadraticCurveTo(w * 0.7, my - hr * 0.16, w, my + hr * 0.12); m.quadraticCurveTo(w * 0.5, my + hr * 0.04, 0, my + hr * (o.mustache === 'stalin' ? 0.1 : 0.06)); m.quadraticCurveTo(-w * 0.5, my + hr * 0.04, -w, my + hr * 0.12); m.closePath();
    sfill(ctx, m, o.gray ? '#a8a49c' : c.hair, 4);
  }
  if (o.glasses) { ctx.strokeStyle = INK; ctx.lineWidth = _lw(ctx, 3); for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(s * hr * 0.34, hc + hr * 0.06, hr * 0.2, hr * (o.glasses === 'round' ? 0.2 : 0.15), 0, 0, 7); ctx.stroke(); } inkLine(ctx, [[-hr * 0.14, hc + hr * 0.04], [hr * 0.14, hc + hr * 0.04]], 3); }
  // hats
  const hat = o.hat || 'none';
  if (hat === 'cap' || hat === 'marshal' || hat === 'nkvd') {
    const cr = P(); cr.moveTo(-hr * 1.05, hc - hr * 0.55); cr.quadraticCurveTo(-hr * 1.3, hc - hr * 1.35, 0, hc - hr * 1.4); cr.quadraticCurveTo(hr * 1.3, hc - hr * 1.35, hr * 1.05, hc - hr * 0.55); cr.closePath(); sfill(ctx, cr, c.hat, 5);
    sfill(ctx, rr(-hr * 1.05, hc - hr * 0.8, hr * 2.1, hr * 0.3, 6), hat === 'cap' ? c.hat : c.hatBand, 4);
    const v = P(); v.moveTo(-hr * 0.95, hc - hr * 0.52); v.quadraticCurveTo(0, hc - hr * 0.3, hr * 0.95, hc - hr * 0.52); v.lineTo(hr * 0.8, hc - hr * 0.42); v.quadraticCurveTo(0, hc - hr * 0.18, -hr * 0.8, hc - hr * 0.42); v.closePath(); sfill(ctx, v, '#1a1714', 4);
    star5(ctx, 0, hc - hr * 0.66, hr * 0.14, hat === 'marshal' ? c.gold : c.red);
  }
  if (hat === 'kepka') { const k = P(); k.moveTo(-hr * 1.05, hc - hr * 0.45); k.quadraticCurveTo(-hr * 1.1, hc - hr * 1.3, hr * 0.2, hc - hr * 1.25); k.quadraticCurveTo(hr * 1.2, hc - hr * 1.1, hr * 1.05, hc - hr * 0.45); k.closePath(); sfill(ctx, k, c.hat, 5); const v = P(); v.moveTo(-hr * 0.9, hc - hr * 0.48); v.quadraticCurveTo(hr * 0.2, hc - hr * 0.2, hr * 1.25, hc - hr * 0.5); v.lineTo(hr * 0.9, hc - hr * 0.62); v.closePath(); sfill(ctx, v, c.hat, 4); }
  if (hat === 'skufia') { const k = P(); k.moveTo(-hr * 0.95, hc - hr * 0.55); k.quadraticCurveTo(0, hc - hr * 1.45, hr * 0.95, hc - hr * 0.55); k.closePath(); sfill(ctx, k, '#1c1a1e', 5); }
}

const _mrc = {};
function man(ctx, x, y, s, pose = {}, o = {}, col = SPAL.base) { const k = JSON.stringify(o); drawRig(ctx, _mrc[k] || (_mrc[k] = buildMan(o)), x, y, s, pose, col); }
