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

function buildMarine() {
  const parts = [];
  const add = (role, path, opts) => parts.push({ role, path, ...opts });

  // backpack and exhaust vents behind the body
  add('armorDark', rrect(-150, -480, 300, 160, 30));
  add('metal', rrect(-140, -535, 50, 70, 12));
  add('metal', rrect(90, -535, 50, 70, 12));

  // legs
  const leg = [[-100, -255], [-18, -255], [-22, -135], [-16, -30], [-4, -30], [0, 0], [-132, 0], [-126, -30], [-110, -30], [-104, -135]];
  add('armor', poly(leg));
  add('armor', poly(mirror(leg)));
  add('trim', rrect(-116, -170, 104, 58, 20));
  add('trim', rrect(12, -170, 104, 58, 20));

  // belt
  add('dark', rrect(-112, -290, 224, 50, 10));
  add('trim', ellipse(0, -265, 26, 22));

  // torso
  add('armor', poly([[-122, -450], [122, -450], [108, -285], [60, -270], [-60, -270], [-108, -285]]));

  // chest emblem: generic winged sigil
  const wing = [[-8, -415], [-95, -440], [-82, -420], [-100, -412], [-80, -400], [-92, -388], [-60, -382], [-8, -378]];
  add('trim', poly(wing));
  add('trim', poly(mirror(wing)));
  add('trim', ellipse(0, -400, 16, 22));

  // upper arms
  add('armor', rrect(-215, -400, 80, 105, 22));
  add('armor', rrect(135, -400, 80, 105, 22));

  // pauldrons: trim rim behind armor dome
  add('trim', ellipse(-170, -425, 94, 82));
  add('trim', ellipse(170, -425, 94, 82));
  add('armor', ellipse(-170, -432, 80, 70));
  add('armor', ellipse(170, -432, 80, 70));
  // chapter mark: generic broken-circle with blade
  const mark = P();
  mark.arc(-170, -432, 32, Math.PI * 0.65, Math.PI * 2.35);
  mark.arc(-170, -432, 20, Math.PI * 2.35, Math.PI * 0.65, true);
  mark.closePath();
  add('mark', mark);
  add('mark', poly([[-174, -476], [-166, -476], [-162, -392], [-170, -380], [-178, -392]]));
  // squad marking on right pauldron
  add('mark', poly([[140, -410], [170, -460], [200, -410], [186, -410], [170, -438], [154, -410]]));

  // bolter, held diagonally across the body
  const gm = new DOMMatrix().translate(-10, 40).rotate(-22);
  const addG = (role, path) => { const q = P(); q.addPath(path, gm); add(role, q); };
  addG('gunDark', rrect(-250, -350, 75, 46, 8)); // stock
  addG('gun', rrect(-180, -365, 290, 64, 10)); // body
  addG('gunDark', rrect(-70, -305, 46, 62, 6)); // magazine
  addG('gun', rrect(105, -352, 105, 34, 6)); // barrel
  addG('gunDark', rrect(200, -360, 42, 50, 6)); // muzzle
  addG('trim', rrect(-150, -380, 120, 18, 5)); // top rail
  addG('trim', poly([[-30, -365], [10, -395], [30, -395], [20, -365]])); // sight

  // forearms and fists over the gun
  add('armor', poly([[-215, -310], [-140, -300], [-110, -250], [-130, -215], [-200, -250]]));
  add('dark', rrect(-150, -265, 58, 60, 16));
  add('armor', poly([[215, -310], [150, -400], [110, -400], [100, -360], [190, -265]]));
  add('dark', rrect(70, -425, 58, 60, 16));

  // gorget and helmet
  add('dark', rrect(-56, -485, 112, 45, 12));
  const helm = P();
  helm.moveTo(-46, -470);
  helm.lineTo(-50, -528);
  helm.quadraticCurveTo(-48, -590, 0, -592);
  helm.quadraticCurveTo(48, -590, 50, -528);
  helm.lineTo(46, -470);
  helm.lineTo(22, -452);
  helm.lineTo(-22, -452);
  helm.closePath();
  add('armor', helm);
  add('lens', poly([[-40, -540], [-10, -532], [-12, -516], [-38, -522]]), { glow: true });
  add('lens', poly(mirror([[-40, -540], [-10, -532], [-12, -516], [-38, -522]])), { glow: true });
  add('dark', rrect(-16, -505, 32, 42, 6));
  const grille = P();
  for (let x = -9; x <= 9; x += 6) { grille.rect(x - 1.5, -500, 3, 32); }
  add('grille', grille);
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
