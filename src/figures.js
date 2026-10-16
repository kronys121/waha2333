// Characters as ordered lists of {role, path}. Local coords: origin at feet, y up is negative.
// Styles decide how each role is filled, shaded and outlined.

function P() { return new Path2D(); }

function poly(points) {
  const p = P();
  p.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) p.lineTo(points[i][0], points[i][1]);
  p.closePath();
  return p;
}

function mirror(points) { return points.map(([x, y]) => [-x, y]); }

function rrect(x, y, w, h, r) {
  const p = P();
  p.roundRect(x, y, w, h, r);
  return p;
}

function ellipse(cx, cy, rx, ry) {
  const p = P();
  p.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  return p;
}

function limb(a, b, w1, w2) {
  // thick tapered quad from point a to point b
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len, ny = dx / len;
  return poly([[a[0] + nx * w1, a[1] + ny * w1], [b[0] + nx * w2, b[1] + ny * w2], [b[0] - nx * w2, b[1] - ny * w2], [a[0] - nx * w1, a[1] - ny * w1]]);
}

function buildMarine() {
  const parts = [];
  const add = (role, path, opts) => parts.push({ role, path, ...opts });

  // backpack with exhaust stacks rising above the pauldrons
  add('armorDark', rrect(-150, -545, 300, 150, 26));
  for (const x of [-125, 85]) {
    add('metal', rrect(x, -615, 40, 90, 10));
    add('dark', rrect(x - 4, -622, 48, 18, 6));
  }

  // legs: wide stance, heavy shins, big boots
  const leg = [[-108, -268], [-38, -268], [-44, -150], [-36, -42], [-128, -42], [-120, -150]];
  const boot = [[-142, -48], [-28, -48], [-22, 0], [-152, 0]];
  add('armor', poly(leg));
  add('armor', poly(mirror(leg)));
  add('armorDark', poly(boot));
  add('armorDark', poly(mirror(boot)));
  add('armor', rrect(-124, -185, 90, 66, 24)); // knee pads
  add('armor', rrect(34, -185, 90, 66, 24));
  add('trim', rrect(-112, -136, 66, 10, 4));
  add('trim', rrect(46, -136, 66, 10, 4));

  // tassets and codpiece
  add('armor', poly([[-112, -290], [-42, -290], [-48, -205], [-106, -215]]));
  add('armor', poly(mirror([[-112, -290], [-42, -290], [-48, -205], [-106, -215]])));
  add('armor', poly([[-38, -285], [38, -285], [26, -228], [-26, -228]]));

  // ribbed abdomen and belt
  add('dark', rrect(-80, -375, 160, 80, 10));
  const ribs = P();
  for (let y = -365; y < -300; y += 13) ribs.rect(-72, y, 144, 5);
  add('ribs', ribs);
  add('dark', rrect(-112, -310, 224, 34, 8));
  add('trim', ellipse(0, -293, 30, 26));
  add('dark', ellipse(0, -293, 13, 12));

  // chest plate with a large two-headed eagle across it
  add('armor', poly([[-135, -478], [135, -478], [126, -392], [74, -365], [-74, -365], [-126, -392]]));
  const wing = [[-10, -452], [-118, -462], [-104, -444], [-120, -434], [-100, -424], [-112, -412], [-88, -406], [-96, -394], [-56, -396], [-10, -412]];
  add('trim', poly(wing));
  add('trim', poly(mirror(wing)));
  add('trim', poly([[-16, -470], [-4, -480], [0, -455], [4, -480], [16, -470], [12, -420], [0, -402], [-12, -420]]));

  // upper arms hanging from under the pauldrons
  add('armor', rrect(-250, -430, 74, 100, 20));
  add('armor', rrect(176, -430, 74, 100, 20));
  add('dark', ellipse(-213, -330, 30, 22)); // elbows
  add('dark', ellipse(213, -330, 30, 22));

  // high armoured collar the helmet sits in
  add('armorDark', poly([[-72, -505], [72, -505], [82, -462], [-82, -462]]));

  // Mk VII helmet: low dome, slanted lenses, beaked grille, side vents
  const helm = P();
  helm.moveTo(-42, -505);
  helm.bezierCurveTo(-46, -548, -24, -566, 0, -566);
  helm.bezierCurveTo(24, -566, 46, -548, 42, -505);
  helm.lineTo(40, -484);
  helm.lineTo(22, -464);
  helm.lineTo(-22, -464);
  helm.lineTo(-40, -484);
  helm.closePath();
  add('armor', helm);
  add('dark', poly([[-36, -530], [-4, -522], [4, -522], [36, -530], [34, -522], [6, -515], [-6, -515], [-34, -522]])); // brow
  const lensL = P(); lensL.ellipse(-18, -511, 13, 8, 0.22, 0, Math.PI * 2);
  const lensR = P(); lensR.ellipse(18, -511, 13, 8, -0.22, 0, Math.PI * 2);
  add('lens', lensL, { glow: true });
  add('lens', lensR, { glow: true });
  add('dark', poly([[-13, -498], [13, -498], [9, -466], [-9, -466]])); // beak grille
  add('dark', rrect(-36, -494, 14, 18, 4));
  add('dark', rrect(22, -494, 14, 18, 4));
  const grille = P();
  for (const y of [-490, -482, -474]) grille.rect(-8, y, 16, 3);
  for (const y of [-489, -483]) { grille.rect(-33, y, 8, 2); grille.rect(25, y, 8, 2); }
  add('grille', grille);

  // pauldrons: bell shape, full trim edge plus a bottom band
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
    const rim = P(); rim.addPath(pauldron(sx), new DOMMatrix().translate(sx * 186, -480).scale(1.1).translate(-sx * 186, 480));
    add('trim', rim);
    add('armor', pauldron(sx));
    add('trim', poly([[sx * 282, -432], [sx * 94, -432], [sx * 100, -405], [sx * 278, -405]]));
  }
  // chapter mark (generic) on the left pauldron, squad arrow on the right
  const mark = P();
  mark.arc(-186, -488, 34, Math.PI * 0.62, Math.PI * 2.38);
  mark.arc(-186, -488, 21, Math.PI * 2.38, Math.PI * 0.62, true);
  mark.closePath();
  add('mark', mark);
  add('mark', poly([[-190, -536], [-182, -536], [-178, -450], [-186, -438], [-194, -450]]));
  add('mark', poly([[149, -462], [186, -522], [223, -462], [205, -462], [186, -494], [167, -462]]));

  // bolter across the body, barrel up to the right
  const gm = new DOMMatrix().translate(-5, -270).rotate(-24);
  const addG = (role, path) => { const q = P(); q.addPath(path, gm); add(role, q); };
  const at = (x, y) => { const p = gm.transformPoint(new DOMPoint(x, y)); return [p.x, p.y]; };
  const handR = at(-72, 42), handL = at(118, 20);

  add('armor', limb([-213, -330], handR, 34, 30)); // vambraces
  add('armor', limb([213, -330], handL, 34, 30));

  addG('gun', rrect(-185, -30, 80, 46, 8)); // stock
  addG('gunDark', poly([[-90, 20], [-56, 20], [-64, 66], [-96, 66]])); // grip
  addG('gunDark', poly([[-12, 22], [30, 22], [48, 62], [64, 100], [36, 106], [16, 66]])); // sickle magazine
  addG('gun', rrect(-118, -40, 210, 64, 10)); // receiver
  addG('gunDark', rrect(-70, -60, 100, 22, 6)); // carry handle
  addG('trim', rrect(-50, -18, 70, 24, 5)); // eagle plate
  addG('gun', rrect(88, -30, 96, 42, 6)); // barrel shroud
  addG('gunDark', rrect(180, -38, 34, 58, 6)); // muzzle
  addG('trim', rrect(176, -38, 8, 58, 2));

  add('armorDark', rrect(handR[0] - 30, handR[1] - 28, 60, 56, 16)); // fists
  add('armorDark', rrect(handL[0] - 30, handL[1] - 28, 60, 56, 16));
  return parts;
}

function buildKid() {
  const parts = [];
  const add = (role, path, opts) => parts.push({ role, path, ...opts });
  // pipe weapon held up behind
  add('metal', poly([[48, -205], [62, -205], [92, -360], [78, -362]]));
  add('metal', rrect(70, -380, 30, 26, 6));
  // legs and boots
  add('pants', rrect(-36, -120, 28, 105, 8));
  add('pants', rrect(8, -120, 28, 105, 8));
  add('boots', rrect(-44, -24, 42, 24, 8));
  add('boots', rrect(4, -24, 42, 24, 8));
  // left arm
  add('cloth', rrect(-78, -215, 26, 92, 12));
  add('skin', ellipse(-65, -118, 15, 15));
  // ragged tunic
  add('cloth', poly([[-52, -222], [52, -222], [60, -108], [44, -96], [32, -112], [18, -94], [2, -110], [-14, -92], [-28, -110], [-44, -94], [-60, -108]]));
  add('patch', rrect(-36, -190, 26, 22, 3));
  add('belt', rrect(-55, -132, 112, 14, 4));
  // right arm raised to pipe
  add('cloth', poly([[40, -220], [62, -224], [74, -196], [58, -184]]));
  add('skin', ellipse(60, -200, 16, 15));
  // scarf
  add('cloth2', rrect(-40, -240, 80, 26, 10));
  add('cloth2', poly([[10, -222], [34, -222], [40, -170], [20, -176]]));
  // head
  add('skin', ellipse(0, -295, 58, 62));
  add('hair', poly([[-62, -300], [-66, -330], [-50, -352], [-40, -372], [-16, -362], [0, -380], [18, -364], [40, -374], [52, -350], [66, -330], [62, -300], [48, -320], [24, -328], [0, -322], [-24, -330], [-48, -322]]));
  // goggles on forehead
  add('belt', rrect(-60, -332, 120, 16, 6));
  add('lens', ellipse(-22, -324, 17, 15));
  add('lens', ellipse(22, -324, 17, 15));
  // face
  add('ink', ellipse(-20, -290, 6, 8));
  add('ink', ellipse(20, -290, 6, 8));
  add('ink', poly([[-34, -306], [-8, -302], [-8, -298], [-34, -300]]));
  add('ink', poly([[34, -306], [8, -302], [8, -298], [34, -300]]));
  add('ink', poly([[-12, -258], [12, -258], [12, -254], [-12, -254]]));
  add('dirt', ellipse(30, -270, 12, 6));
  add('dirt', ellipse(-34, -262, 8, 5));
  return parts;
}

window.FIGURES = { marine: buildMarine(), kid: buildKid() };
