// WWII figures: Red Army soldiers, officers, civilians, German silhouettes. Built like chars.js rigs.

const RA = {
  soldier: { skin: '#e2b48c', hair: '#4a3020', shirt: '#7d7a52', pants: '#6a6544', coat: '#6e6a58', boots: '#2e241c', wraps: '#7a7058', wrapLines: '#5a5240', belt: '#5a3e24', buckle: '#c9a24a', pouch: '#6a5a3a', hat: '#7d7a52', hatBand: '#7d7a52', star: '#d23a2a', petl: '#b3262a', pogon: '#7d7a52', insignia: '#d23a2a', metal: '#3a3a3e', wood: '#7a4a28', bag: '#8a8460', medal: '#d8dce0', ribbon: '#8a8a9a', fur: '#5a5048', helmet: '#4f5a3a' },
  officer: { skin: '#e2b48c', hair: '#3a2a1a', shirt: '#7d7a52', pants: '#3a3e4a', coat: '#6e6a58', boots: '#1e1814', belt: '#4a3018', buckle: '#c9a24a', pouch: '#5a4028', hat: '#7d7a52', hatBand: '#b3262a', star: '#d23a2a', petl: '#b3262a', pogon: '#c9a24a', insignia: '#c9ced6', metal: '#3a3a3e', wood: '#6a3a20', bag: '#8a8460', medal: '#d8dce0', ribbon: '#8a8a9a', fur: '#5a5048', helmet: '#4f5a3a' },
  german: { skin: '#d8b090', hair: '#8a6a40', shirt: '#6e7468', pants: '#5e645a', coat: '#626860', boots: '#1e1c1a', wraps: '#5e645a', belt: '#1e1c1a', buckle: '#8a8a8a', pouch: '#2a2a28', hat: '#5a6052', hatBand: '#5a6052', star: '#5a6052', petl: '#5a6052', pogon: '#5a6052', insignia: '#5a6052', metal: '#2a2a2e', wood: '#5a3a20', bag: '#6a6a5a', helmet: '#5a6052' },
  mother: { skin: '#e8bc96', hair: '#6a4a2a', shirt: '#6a5a7a', dress: '#4a4a6a', kerchief: '#b8a890', boots: '#2e241c', belt: '#4a3a2a' },
  old: { skin: '#d8ac88', hair: '#c8c8c8', shirt: '#5a5a5a', dress: '#3a3a3a', kerchief: '#3a3436', boots: '#2e241c', belt: '#3a2a20' },
  civil: { skin: '#e2b48c', hair: '#3a2a1a', shirt: '#c8c0b0', pants: '#3a3a44', boots: '#2e241c', belt: '#3a2a20', hat: '#4a4a52', hatBand: '#3a3a44', coat: '#4a4a52' },
};

function limbStroke(ctx, a, b, w, color) {
  ctx.lineCap = 'round';
  ctx.strokeStyle = INK; ctx.lineWidth = w + 12;
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
  ctx.strokeStyle = color; ctx.lineWidth = w;
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
}

// o: {side:'soviet'|'german'|'civil', hat:'pilotka'|'ushanka'|'helmet'|'cap'|'stahl'|'kerchief'|'none', coat, wraps, weapon:'rifle'|'ppsh'|'shovel'|'none',
//     tri: n (collar triangles), stripe (corporal), pogon: {lych:n} | {stars:n} | {star:'T'}, medal, bag, female, old, mustache, hair}
function buildSoldier(o = {}) {
  const parts = [];
  const add = (role, path, g, extra) => parts.push({ role, path, g, ...extra });
  const torsoTop = -340, torsoBot = -185, sh = 64, headR = 46, headCy = -396;
  const hairTop = headCy - headR * 1.08;
  const gun = o.weapon === 'rifle' || o.weapon === 'ppsh' || o.weapon === 'mp40';

  if (o.bag) add('bag', el(0, torsoTop + 90, 78, 92));
  // legs
  for (const s of [-1, 1]) {
    const g = s < 0 ? 'legL' : 'legR';
    const x = s < 0 ? -42 : 4;
    if (o.female) continue;
    add('pants', rr(x, torsoBot - 6, 38, 120, 10), g);
    if (o.wraps) {
      add('wraps', rr(x + 1, -96, 36, 76, 8), g);
      const wl = P(); for (let y = -88; y < -24; y += 12) wl.rect(x + 4, y, 30, 3);
      add('wrapLines', wl, g, { flat: true });
      add('boots', rr(x - 6, -26, 48, 26, 8), g);
    } else {
      add('boots', rr(x - 2, -100, 42, 100, 10), g);
    }
  }
  if (o.female) {
    for (const s of [-1, 1]) add('boots', rr(s < 0 ? -40 : 6, -50, 34, 50, 8), s < 0 ? 'legL' : 'legR');
    add('dress', poly([[-sh, torsoTop + 40], [sh, torsoTop + 40], [sh + 30, -50], [-sh - 30, -50]]));
  }
  const sleeve = o.coat ? 'coat' : 'shirt';
  if (!gun) {
    add(sleeve, rr(-sh - 24, torsoTop + 6, 30, 150, 13), 'armL');
    add('skin', el(-sh - 9, torsoTop + 162, 17, 17), 'armL');
  }
  // torso
  if (o.coat) {
    add('coat', poly([[-sh - 4, torsoTop - 4], [sh + 4, torsoTop - 4], [sh + 36, -64], [-sh - 36, -64]]));
    add('coatShade', poly([[-6, torsoTop + 20], [6, torsoTop + 20], [6, -64], [-6, -64]]), null, { flat: true });
    const bt = P(); for (let i = 0; i < 4; i++) { bt.ellipse(-22, torsoTop + 40 + i * 50, 6, 6, 0, 0, Math.PI * 2); bt.ellipse(22, torsoTop + 40 + i * 50, 6, 6, 0, 0, Math.PI * 2); }
    add('buckle', bt, null, { flat: true });
  } else if (!o.female) {
    add('shirt', poly([[-sh, torsoTop], [sh, torsoTop], [sh - 2, torsoBot + 26], [-sh + 2, torsoBot + 26]]));
    add('pocket', rr(-48, torsoTop + 40, 36, 32, 4)); add('pocket', rr(12, torsoTop + 40, 36, 32, 4));
    add('shirtLine', rr(-3, torsoTop + 4, 6, 90, 2), null, { flat: true });
  } else {
    add('shirt', poly([[-sh + 4, torsoTop], [sh - 4, torsoTop], [sh, torsoTop + 60], [-sh, torsoTop + 60]]));
  }
  if (!o.female) {
    add('belt', rr(-sh - (o.coat ? 8 : 0), torsoBot + 10, 2 * sh + (o.coat ? 16 : 0), 22, 4));
    add('buckle', rr(-14, torsoBot + 8, 28, 26, 5));
    if (o.side !== 'civil') { add('pouch', rr(-sh + 8, torsoBot + 6, 30, 34, 5)); add('pouch', rr(sh - 38, torsoBot + 6, 30, 34, 5)); }
    if (o.strap) add('belt', poly([[sh - 6, torsoTop + 4], [sh + 8, torsoTop + 10], [-sh + 12, torsoBot + 14], [-sh, torsoBot + 8]]));
  }
  // collar insignia: petlitsy with triangles / stripe
  if (o.tri !== undefined || o.stripe) {
    for (const s of [-1, 1]) {
      add('petl', poly([[s * 8, torsoTop - 4], [s * 40, torsoTop - 4], [s * 34, torsoTop + 20], [s * 2, torsoTop + 20]]));
    }
    add('petlMarks', null, null, { fn: (ctx, pose, col) => {
      ctx.fillStyle = col.insignia || '#d23a2a'; ctx.strokeStyle = INK; ctx.lineWidth = 2;
      for (const s of [-1, 1]) {
        if (o.stripe) { ctx.fillStyle = '#c9a24a'; ctx.fillRect(s * 22 - 3, torsoTop - 2, 6, 20); }
        for (let i = 0; i < (o.tri || 0); i++) { const x = s * (12 + i * 9); ctx.beginPath(); ctx.moveTo(x, torsoTop + 4); ctx.lineTo(x + 6 * s, torsoTop + 4); ctx.lineTo(x + 3 * s, torsoTop + 14); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      }
    } });
  }
  // shoulder boards
  if (o.pogon) {
    for (const s of [-1, 1]) add('pogon', rr(s < 0 ? -sh - 6 : sh - 44, torsoTop - 6, 50, 18, 5));
    add('pogonMarks', null, null, { fn: (ctx, pose, col) => {
      for (const s of [-1, 1]) {
        const x0 = s < 0 ? -sh - 6 : sh - 44;
        if (o.pogon.lych) { ctx.fillStyle = '#b3262a'; for (let i = 0; i < o.pogon.lych; i++) ctx.fillRect(x0 + 30 - i * 8, torsoTop - 6, 4, 18); }
        if (o.pogon.T) { ctx.fillStyle = '#b3262a'; ctx.fillRect(x0 + 34, torsoTop - 6, 6, 18); ctx.fillRect(x0 + 4, torsoTop + 1, 34, 5); }
        if (o.pogon.stars) { ctx.fillStyle = col.insignia || '#c9ced6'; for (let i = 0; i < o.pogon.stars; i++) { const sx = x0 + 12 + (i % 2) * 18, sy = torsoTop + 3 - Math.floor(i / 2) * 0; ctx.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 2.2 : 5.5; ctx.lineTo(sx + Math.cos(a) * r + (i > 1 ? 0 : 0), sy + Math.sin(a) * r - (i > 1 ? 0 : 0)); } ctx.fill(); } }
      }
    } });
  }
  if (o.medal) { add('ribbon', rr(-46, torsoTop + 30, 20, 14, 2)); add('medal', el(-36, torsoTop + 58, 13, 13)); }
  // right arm (front) when not holding a long gun
  if (!gun) {
    add(sleeve, rr(sh - 6, torsoTop + 6, 30, 150, 13), 'armR');
    add('skin', el(sh + 9, torsoTop + 162, 17, 17), 'armR');
    if (o.weapon === 'shovel') {
      add('wood', rr(sh + 3, torsoTop + 150, 12, 150, 4), 'armR');
      add('metal', poly([[sh - 14, torsoTop + 290], [sh + 32, torsoTop + 290], [sh + 26, torsoTop + 350], [sh + 9, torsoTop + 362], [sh - 8, torsoTop + 350]]), 'armR');
    }
    if (o.weapon === 'spoon') add('metal', rr(sh + 4, torsoTop + 120, 8, 60, 3), 'armR');
    if (o.weapon === 'letter') add('paper', poly([[sh - 24, torsoTop + 140], [sh + 40, torsoTop + 150], [sh + 30, torsoTop + 190], [sh - 30, torsoTop + 180]]), 'armR');
  }
  if (gun) {
    add('gunArms', null, null, { fn: (ctx, pose, col) => {
      const A = pose.gunA ?? -0.45, rc = (pose.recoil || 0) * 22;
      const pv = [0, torsoTop + 118];
      const rot = (x, y) => [pv[0] + (x - rc) * Math.cos(A) - y * Math.sin(A), pv[1] + (x - rc) * Math.sin(A) + y * Math.cos(A)];
      const g1 = rot(-40, 10), g2 = rot(o.weapon === 'ppsh' ? 70 : 110, 6);
      const slv = col[sleeve];
      limbStroke(ctx, [-sh + 6, torsoTop + 22], [(-sh + g1[0]) / 2 - 14, (torsoTop + g1[1]) / 2 + 30], 30, slv);
      limbStroke(ctx, [(-sh + g1[0]) / 2 - 14, (torsoTop + g1[1]) / 2 + 30], g1, 28, slv);
      ctx.save(); ctx.translate(pv[0], pv[1]); ctx.rotate(A); ctx.translate(-rc, 0);
      ctx.lineJoin = 'round';
      const sf = (pth, c) => { ctx.fillStyle = c; ctx.fill(pth); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.stroke(pth); };
      if (o.weapon === 'rifle') {
        sf(poly([[-170, -6], [-60, -12], [120, -8], [120, 8], [-60, 14], [-170, 26], [-176, 8]]), col.wood);
        sf(rr(20, -14, 240, 9, 3), col.metal);
        sf(rr(-40, -20, 46, 10, 3), col.metal);
        if (pose.bayonet) sf(poly([[258, -14], [330, -11], [258, -8]]), '#c9ced6');
      } else if (o.weapon === 'mp40') {
        sf(poly([[-120, -6], [-30, -10], [-30, 10], [-120, 18]]), col.metal);
        sf(rr(-34, -14, 150, 22, 6), col.metal);
        sf(rr(110, -8, 60, 9, 3), col.metal);
        sf(rr(16, 6, 16, 70, 3), col.metal);
        sf(rr(-20, 6, 20, 34, 4), '#3a2a1a');
      } else {
        sf(poly([[-150, -4], [-40, -14], [70, -12], [70, 12], [-40, 16], [-150, 26]]), col.wood);
        sf(rr(60, -14, 120, 22, 6), col.metal);
        ctx.fillStyle = '#15131a'; for (let i = 0; i < 5; i++) ctx.fillRect(74 + i * 20, -8, 10, 8);
        sf(el(20, 34, 36, 36), col.metal);
      }
      if (pose.fire) {
        const L = o.weapon === 'rifle' ? 266 : o.weapon === 'mp40' ? 176 : 186;
        const fl = (Math.floor((pose.time || 0) * 15) % 2) ? 1 : 0.6;
        ctx.fillStyle = '#ffe28a'; ctx.strokeStyle = '#ff8a2a'; ctx.lineWidth = 5;
        ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2, r = (i % 2 ? 18 : 60) * fl; ctx.lineTo(L + 40 + Math.cos(a) * r * 1.4, Math.sin(a) * r * 0.7); } ctx.closePath(); ctx.fill(); ctx.stroke();
      }
      ctx.restore();
      limbStroke(ctx, [sh - 6, torsoTop + 22], [(sh + g2[0]) / 2 + 20, (torsoTop + g2[1]) / 2 + 26], 30, slv);
      limbStroke(ctx, [(sh + g2[0]) / 2 + 20, (torsoTop + g2[1]) / 2 + 26], g2, 28, slv);
      for (const h of [g1, g2]) { ctx.fillStyle = col.skin; ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(h[0], h[1], 17, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }
    } });
  }
  // head
  add('skin', rr(-13, torsoTop - 24, 26, 30, 6), 'head');
  if (o.side !== 'german' && o.coat && o.hat !== 'helmet') add('coat', poly([[-34, torsoTop - 2], [34, torsoTop - 2], [24, torsoTop - 26], [-24, torsoTop - 26]]), 'head');
  add('skin', el(0, headCy, headR, headR * 1.1), 'head');
  add('skin', el(-headR, headCy + 4, 10, 14), 'head'); add('skin', el(headR, headCy + 4, 10, 14), 'head');
  const hair = o.hair || 'short';
  if (hair !== 'bald' && !o.female) {
    const hp = P();
    hp.moveTo(-headR - 2, headCy - 4);
    hp.bezierCurveTo(-headR - 6, hairTop - 18, headR + 6, hairTop - 18, headR + 2, headCy - 4);
    hp.bezierCurveTo(headR * 0.6, headCy - headR * 0.6, -headR * 0.5, headCy - headR * 0.5, -headR - 2, headCy - 4);
    add('hair', hp, 'head');
  }
  if (o.mustache) add('hair', poly([[-26, headCy + 24], [0, headCy + 18], [26, headCy + 24], [22, headCy + 32], [0, headCy + 27], [-22, headCy + 32]]), 'head');
  add('face', null, 'head', { fn: (ctx, pose) => drawFace(ctx, { cx: 0, cy: headCy + headR * 0.08, r: headR }, { ...pose, nose: true, wrinkles: o.old }) });
  if (o.gray) add('hair', poly([[-headR - 2, headCy - 4], [-headR - 2, headCy - 30], [-headR + 10, headCy - 14]]), 'head');
  // hats
  const star = (x, y, r) => { const p = P(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr2 = k % 2 ? r * 0.42 : r; p.lineTo(x + Math.cos(a) * rr2, y + Math.sin(a) * rr2); } p.closePath(); return p; };
  if (o.hat === 'pilotka') {
    add('hat', poly([[-48, hairTop + 30], [-44, hairTop - 2], [-10, hairTop - 14], [44, hairTop - 8], [50, hairTop + 26], [0, hairTop + 18]]), 'head');
    add('star', star(-14, hairTop + 12, 9), 'head');
  } else if (o.hat === 'ushanka') {
    add('fur', rr(-62, hairTop - 6, 124, 44, 18), 'head');
    add('fur', el(-56, headCy - 10, 16, 30), 'head'); add('fur', el(56, headCy - 10, 16, 30), 'head');
    add('hat', el(0, hairTop - 4, 50, 30), 'head');
    add('star', star(0, hairTop + 14, 10), 'head');
  } else if (o.hat === 'helmet') {
    const hp = P(); hp.moveTo(-58, hairTop + 34); hp.bezierCurveTo(-60, hairTop - 46, 60, hairTop - 46, 58, hairTop + 34); hp.closePath();
    add('helmet', hp, 'head'); add('helmet', rr(-64, hairTop + 26, 128, 14, 7), 'head');
    if (o.side !== 'german') add('star', star(0, hairTop + 2, 11), 'head');
  } else if (o.hat === 'stahl') {
    add('helmet', poly([[-70, hairTop + 44], [-58, hairTop + 20], [-54, hairTop - 10], [-30, hairTop - 30], [30, hairTop - 30], [54, hairTop - 10], [58, hairTop + 20], [70, hairTop + 44], [40, hairTop + 32], [-40, hairTop + 32]]), 'head');
  } else if (o.hat === 'cap') {
    add('hat', poly([[-62, hairTop + 2], [62, hairTop + 2], [54, hairTop - 26], [-54, hairTop - 26]]), 'head');
    add('hatBand', rr(-50, hairTop + 2, 100, 14, 3), 'head');
    add('boots', poly([[-44, hairTop + 16], [44, hairTop + 16], [36, hairTop + 30], [-36, hairTop + 30]]), 'head');
    add('star', star(0, hairTop + 8, 7), 'head');
  } else if (o.hat === 'kerchief') {
    add('kerchief', poly([[-headR - 8, headCy + 20], [-headR - 10, headCy - 30], [0, hairTop - 14], [headR + 10, headCy - 30], [headR + 8, headCy + 20], [headR * 0.7, headCy - 10], [-headR * 0.7, headCy - 10]]), 'head');
    add('kerchief', poly([[-12, headCy + 54], [12, headCy + 54], [0, headCy + 80]]), 'head');
  } else if (o.hat === 'flat') {
    add('hat', poly([[-56, hairTop + 14], [56, hairTop + 14], [48, hairTop - 14], [-44, hairTop - 18]]), 'head');
    add('hat', poly([[-56, hairTop + 14], [40, hairTop + 14], [66, hairTop + 26], [-40, hairTop + 26]]), 'head');
  }
  return { parts, pivots: { legL: [-22, torsoBot], legR: [22, torsoBot], armL: [-sh, torsoTop + 16], armR: [sh, torsoTop + 16], head: [0, torsoTop] }, height: 450, headY: headCy };
}

const _srig = {};
function srig(o) { const k = JSON.stringify(o); return _srig[k] || (_srig[k] = buildSoldier(o)); }
const RA_DEF = { shirtLine: '#5a5838', coatShade: '#55503f', paper: '#f4ead2', wrapLines: '#5a5240', fur: '#5a5048', helmet: '#4f5a3a', medal: '#d8dce0', ribbon: '#8a8a9a', kerchief: '#b8a890', dress: '#4a4a6a' };
function soldier(ctx, x, y, s, pose = {}, o = {}, col) {
  drawRig(ctx, srig(o), x, y, s, pose, { ...RA_DEF, ...(col || (o.side === 'german' ? RA.german : o.officer ? RA.officer : RA.soldier)) });
}

// ---- the hero at each rank ----
const HERO = [
  { hat: 'pilotka', wraps: true, weapon: 'rifle', tri: 0, bag: true },                  // 1 krasnoarmeets
  { hat: 'ushanka', coat: true, wraps: true, weapon: 'rifle', stripe: true },             // 2 efreitor (winter)
  { hat: 'pilotka', wraps: true, weapon: 'rifle', tri: 2 },                              // 3 ml. serzhant
  { hat: 'helmet', weapon: 'ppsh', tri: 3 },                                              // 4 serzhant (Stalingrad)
  { hat: 'pilotka', weapon: 'none', pogon: { T: true }, mustache: false },               // 5 starshina
  { hat: 'cap', weapon: 'none', pogon: { stars: 1 }, strap: true, officer: true },        // 6 ml. leitenant
  { hat: 'cap', weapon: 'ppsh', pogon: { stars: 2 }, strap: true, officer: true, medal: true }, // 7 leitenant
  { hat: 'cap', weapon: 'none', pogon: { stars: 4 }, strap: true, officer: true, medal: true, gray: true }, // 8 kapitan
];
function hero(ctx, lvl, x, y, s, pose = {}, over = {}) {
  const o = { ...HERO[lvl - 1], ...over };
  soldier(ctx, x, y, s, pose, o, o.officer ? RA.officer : RA.soldier);
}
function mate(ctx, x, y, s, pose = {}, i = 0, over = {}) {
  const hats = ['pilotka', 'helmet', 'pilotka', 'ushanka'];
  soldier(ctx, x, y, s, pose, { hat: hats[i % 4], wraps: true, weapon: i % 3 === 2 ? 'ppsh' : 'rifle', bag: i % 2 === 0, mustache: i % 4 === 1, ...over }, pal(RA.soldier, { hair: ['#4a3020', '#2a1a10', '#8a6a3a', '#3a2a1a'][i % 4], skin: ['#e2b48c', '#d8a880', '#e8c0a0', '#d0a07a'][i % 4] }));
}
function german(ctx, x, y, s, pose = {}, i = 0, over = {}) {
  soldier(ctx, x, y, s, pose, { side: 'german', hat: 'stahl', weapon: i % 2 ? 'rifle' : 'none', boots: true, ...over }, RA.german);
}
function mother(ctx, x, y, s, pose = {}) { soldier(ctx, x, y, s, pose, { side: 'civil', female: true, hat: 'kerchief' }, RA.mother); }
function oldWoman(ctx, x, y, s, pose = {}) { soldier(ctx, x, y, s, pose, { side: 'civil', female: true, hat: 'kerchief', old: true }, RA.old); }
function father(ctx, x, y, s, pose = {}) { soldier(ctx, x, y, s, pose, { side: 'civil', hat: 'flat', mustache: true }, RA.civil); }

// ---- poses ----
const pose = {
  run: (t, k = 1) => ({ ...walkPose(t, 2.3 * k, 0.65), lean: 0.08, bob: -Math.abs(Math.cos(t * 16 * k)) * 18 }),
  march: (t) => ({ ...walkPose(t, 1.1, 0.42), armL: Math.sin(t * 7.7) * 0.5, armR: 0 }),
  trudge: (t) => ({ ...walkPose(t, 0.55, 0.22), head: 0.12, expr: 'sad' }),
  aim: (t) => ({ gunA: -0.12, head: 0.05, expr: 'grit' }),
  fire: (t) => ({ gunA: -0.12 + (Math.floor(t * 3) % 2 ? 0.04 : 0), recoil: (Math.floor(t * 3) % 2), fire: (t * 3) % 1 < 0.25, time: t, expr: 'grit' }),
  dig: (t) => ({ armR: -0.6 + Math.sin(t * 5) * 0.7, armL: -0.4 + Math.sin(t * 5) * 0.4, lean: 0.25 + Math.sin(t * 5) * 0.08, bob: 20, expr: 'grit' }),
  salute: () => ({ armR: -2.55, head: -0.03, expr: 'neutral' }),
  sit: (t) => ({ ...idlePose(t), legL: 1.25, legR: -1.25, bob: 150 }),
  lie: () => ({ lean: -1.52, blink: 1 }),
  write: (t) => ({ armR: -0.9 + Math.sin(t * 9) * 0.05, head: 0.22, legL: 1.25, legR: -1.25, bob: 150, expr: 'neutral' }),
  crawl: (t) => ({ lean: 1.45, legL: Math.sin(t * 5) * 0.5, legR: -Math.sin(t * 5) * 0.5, armL: -Math.sin(t * 5) * 0.6, armR: Math.sin(t * 5) * 0.6 }),
  cheer: (t) => ({ armL: 2.6 + Math.sin(t * 9) * 0.2, armR: -2.6 - Math.sin(t * 9) * 0.2, expr: 'happy', bob: -Math.abs(Math.sin(t * 6)) * 20 }),
  hug: () => ({ armL: -1.0, armR: 1.0, expr: 'happy' }),
};
