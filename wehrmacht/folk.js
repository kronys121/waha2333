// Characters for the Wehrmacht video: German rank-and-file and officers, civilians, Soviet soldiers and POWs.
// Built on buildSoldier (redarmy/people.js) with German hats, collar tabs, shoulder boards and chevrons added on top.

const WP = {
  gray: { skin: '#e0b896', hair: '#b08a50', shirt: '#6f7562', pants: '#646a58', coat: '#686e5e', boots: '#1e1c1a', wraps: '#646a58', belt: '#1e1c1a', buckle: '#8e9290', pouch: '#2e2c28', hat: '#6a705e', hatBand: '#6a705e', metal: '#2a2a2e', wood: '#6a4224', bag: '#6a6a58', helmet: '#5e6454', tab: '#3a4636', litze: '#a8aca4', braid: '#c8ccd0', board: '#5f6656', visor: '#1e1c1a', cockade: '#c8c8c8', toque: '#6e6e66', binos: '#26262a', holster: '#3a2a1a', gorget: '#c8ccd0', paper: '#f4ead2' },
  officer: { skin: '#e0b896', hair: '#8a6a40', shirt: '#7a8070', pants: '#4e5250', coat: '#727868', boots: '#151412', belt: '#3a2614', buckle: '#8e9290', pouch: '#3a2614', hat: '#727868', hatBand: '#3a4636', metal: '#2a2a2e', wood: '#6a4224', bag: '#6a6a58', helmet: '#5e6454', tab: '#3a4636', litze: '#c8ccd0', braid: '#c8ccd0', board: '#c8ccd0', visor: '#151412', cockade: '#c8c8c8', toque: '#6e6e66', binos: '#26262a', holster: '#3a2614', gorget: '#c8ccd0', paper: '#f4ead2' },
  rad: { skin: '#e0b896', hair: '#b08a50', shirt: '#7e6a52', pants: '#6e5c46', coat: '#7e6a52', boots: '#2a1e16', belt: '#2a1e16', buckle: '#9a9a9a', pouch: '#2a1e16', hat: '#6e5c46', hatBand: '#6e5c46', metal: '#2a2a2e', wood: '#8a5a30', bag: '#6a5a44', helmet: '#5e6454', tab: '#5e4a36', litze: '#b8a890', braid: '#c8ccd0', board: '#6e5c46', visor: '#2a1e16', cockade: '#c8c8c8', paper: '#f4ead2' },
  snow: { skin: '#e0b896', hair: '#b08a50', shirt: '#6f7562', pants: '#646a58', coat: '#686e5e', boots: '#1e1c1a', wraps: '#646a58', belt: '#1e1c1a', buckle: '#8e9290', pouch: '#2e2c28', hat: '#6a705e', hatBand: '#6a705e', metal: '#2a2a2e', wood: '#6a4224', bag: '#6a6a58', helmet: '#e8eaec', tab: '#3a4636', litze: '#a8aca4', braid: '#c8ccd0', board: '#5f6656', visor: '#1e1c1a', cockade: '#c8c8c8', toque: '#7a6a6a', binos: '#26262a', holster: '#3a2a1a', gorget: '#c8ccd0', paper: '#f4ead2' },
  civ: { skin: '#e2b48c', hair: '#5a3a20', shirt: '#d8d0c0', pants: '#4a4a54', coat: '#5a5a62', boots: '#2e241c', belt: '#3a2a20', buckle: '#9a9a9a', hat: '#4a4a52', hatBand: '#3a3a44', dress: '#6a7a9a', kerchief: '#b8a890', paper: '#f4ead2', metal: '#2a2a2e', wood: '#8a5a30' },
  greta: { skin: '#f0c8a8', hair: '#d8b060', shirt: '#e8dcc8', dress: '#b84a4a', boots: '#3a2a1e', belt: '#3a2a20', kerchief: '#e8d8a0', paper: '#f4ead2' },
  mama: { skin: '#e8bc96', hair: '#8a7060', shirt: '#7a6a5a', dress: '#4a4a5a', boots: '#2e241c', belt: '#3a2a20', kerchief: '#8a8a9a', paper: '#f4ead2' },
  oma: { skin: '#d8ac88', hair: '#d0d0d0', shirt: '#5a5a5a', dress: '#3a3a3a', boots: '#2e241c', belt: '#3a2a20', kerchief: '#4a4446', paper: '#f4ead2' },
};

function buildLandser(o = {}) {
  const base = buildSoldier({ ...o, side: o.side || 'german', hat: 'none', hair: o.female ? 'bald' : o.hair });
  const parts = base.parts.slice();
  const add = (role, path, g, extra) => parts.push({ role, path, g, ...extra });
  const torsoTop = -340, sh = 64, headCy = -396, headR = 46, hairTop = headCy - headR * 1.08;
  const uniform = !o.civil;
  if (o.female && o.hairdo !== 'none') {
    // hair for women without a kerchief: cap over the top and locks at the sides
    const hp = P(); hp.moveTo(-headR - 4, headCy + 4); hp.bezierCurveTo(-headR - 8, hairTop - 22, headR + 8, hairTop - 22, headR + 4, headCy + 4);
    hp.bezierCurveTo(headR * 0.5, headCy - headR * 0.75, -headR * 0.5, headCy - headR * 0.75, -headR - 4, headCy + 4);
    add('hair', hp, 'head'); add('hair', el(-headR - 6, headCy + 26, 13, 34), 'head'); add('hair', el(headR + 6, headCy + 26, 13, 34), 'head');
  }
  if (uniform) {
    // collar tabs (Litzen)
    for (const s of [-1, 1]) add('tab', rr(s < 0 ? -42 : 12, torsoTop + 2, 30, 14, 3));
    add('litzen', null, null, { fn: (ctx, pose, col) => { ctx.fillStyle = col.litze; for (const s of [-1, 1]) { const x = s < 0 ? -38 : 16; ctx.fillRect(x, torsoTop + 5, 22, 3); ctx.fillRect(x, torsoTop + 11, 22, 3); } } });
    if (o.tresse) add('braid', rr(-44, torsoTop - 4, 88, 7, 3), null, { flat: true });
    // shoulder boards
    for (const s of [-1, 1]) add(o.off ? 'braid' : 'board', rr(s < 0 ? -sh - 8 : sh - 42, torsoTop - 7, 50, 18, 6));
    add('boardMarks', null, null, { fn: (ctx, pose, col) => {
      for (const s of [-1, 1]) {
        const x0 = s < 0 ? -sh - 8 : sh - 42;
        if (o.off) { ctx.strokeStyle = '#8a8e92'; ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(x0 + 6 + i * 9, torsoTop - 5); ctx.lineTo(x0 + 12 + i * 9, torsoTop + 9); ctx.stroke(); } }
        if (o.tresse && !o.off) { ctx.strokeStyle = col.braid; ctx.lineWidth = 3; ctx.strokeRect(x0 + 3, torsoTop - 4, 44, 12); }
        for (let i = 0; i < (o.pip || 0); i++) { ctx.fillStyle = o.off ? '#d8b048' : '#c8ccd0'; ctx.strokeStyle = INK; ctx.lineWidth = 1.5; const px = x0 + 16 + i * 14; ctx.fillRect(px - 4, torsoTop - 3, 8, 8); ctx.strokeRect(px - 4, torsoTop - 3, 8, 8); }
      }
    } });
    if (o.chev) add('chevrons', null, null, { fn: (ctx, pose, col) => {
      ctx.save(); ctx.translate(-sh - 2, torsoTop + 58);
      ctx.fillStyle = col.braid; ctx.strokeStyle = INK; ctx.lineWidth = 2;
      for (let i = 0; i < o.chev; i++) { const y = i * 11; ctx.beginPath(); ctx.moveTo(-14, y - 6); ctx.lineTo(0, y + 6); ctx.lineTo(14, y - 6); ctx.lineTo(14, y); ctx.lineTo(0, y + 12); ctx.lineTo(-14, y); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      ctx.restore();
    } });
    if (o.binos) { add('binos', rr(-30, torsoTop + 60, 26, 34, 6)); add('binos', rr(4, torsoTop + 60, 26, 34, 6)); }
    if (o.holster) add('holster', rr(-sh + 4, -196, 34, 46, 8));
    if (o.gorget) {
      add('gorgetChain', null, null, { fn: (ctx) => { ctx.strokeStyle = '#9a9ea2'; ctx.lineWidth = 3; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(-30, torsoTop + 2); ctx.lineTo(-22, torsoTop + 46); ctx.moveTo(30, torsoTop + 2); ctx.lineTo(22, torsoTop + 46); ctx.stroke(); ctx.setLineDash([]); } });
      const gp = P(); gp.moveTo(-40, torsoTop + 44); gp.quadraticCurveTo(0, torsoTop + 96, 40, torsoTop + 44); gp.quadraticCurveTo(0, torsoTop + 66, -40, torsoTop + 44); add('gorget', gp);
    }
  }
  // headwear
  if (o.toque) add('toque', poly([[-headR - 10, headCy + 40], [-headR - 12, headCy - 28], [0, hairTop - 10], [headR + 12, headCy - 28], [headR + 10, headCy + 40], [headR * 0.75, headCy + 30], [headR * 0.8, headCy - 14], [-headR * 0.8, headCy - 14], [-headR * 0.75, headCy + 30]]), 'head');
  const hat = o.hat || 'none';
  if (hat === 'stahl') {
    add('helmet', poly([[-70, hairTop + 44], [-58, hairTop + 20], [-54, hairTop - 10], [-30, hairTop - 30], [30, hairTop - 30], [54, hairTop - 10], [58, hairTop + 20], [70, hairTop + 44], [40, hairTop + 32], [-40, hairTop + 32]]), 'head');
  } else if (hat === 'feld') {
    add('hat', poly([[-50, hairTop + 30], [-46, hairTop + 4], [-6, hairTop - 10], [46, hairTop - 4], [52, hairTop + 26], [0, hairTop + 22]]), 'head');
    add('cockade', el(-18, hairTop + 14, 5, 5), 'head');
  } else if (hat === 'm43' || hat === 'rad') {
    add('hat', rr(-52, hairTop - 30, 104, 46, 12), 'head');
    add('hatBand', rr(-52, hairTop + 2, 104, 14, 4), 'head');
    add('visor', poly([[-34, hairTop + 14], [56, hairTop + 14], [74, hairTop + 26], [-20, hairTop + 26]]), 'head');
    add('cockade', el(0, hairTop - 4, 5, 5), 'head');
  } else if (hat === 'schirm') {
    add('hat', poly([[-60, hairTop + 6], [60, hairTop + 6], [74, hairTop - 42], [-62, hairTop - 30]]), 'head');
    add('tab', rr(-56, hairTop - 6, 112, 16, 4), 'head');
    add('braid', rr(-48, hairTop + 10, 96, 5, 2), 'head', { flat: true });
    add('visor', poly([[-30, hairTop + 14], [58, hairTop + 14], [78, hairTop + 28], [-16, hairTop + 28]]), 'head');
    add('cockade', el(4, hairTop - 20, 6, 6), 'head');
  } else if (hat === 'beret') {
    add('hat', el(6, hairTop + 4, 56, 20), 'head');
  } else if (hat === 'kerchief') {
    add('kerchief', poly([[-headR - 8, headCy + 20], [-headR - 10, headCy - 30], [0, hairTop - 14], [headR + 10, headCy - 30], [headR + 8, headCy + 20], [headR * 0.7, headCy - 10], [-headR * 0.7, headCy - 10]]), 'head');
  } else if (hat === 'flat') {
    add('hat', poly([[-56, hairTop + 14], [56, hairTop + 14], [48, hairTop - 14], [-44, hairTop - 18]]), 'head');
    add('hat', poly([[-56, hairTop + 14], [40, hairTop + 14], [66, hairTop + 26], [-40, hairTop + 26]]), 'head');
  }
  return { ...base, parts };
}
const _wrig = {};
function wrig(o) { const k = JSON.stringify(o); return _wrig[k] || (_wrig[k] = buildLandser(o)); }
function landser(ctx, x, y, s, pose = {}, o = {}, col = WP.gray) { drawRig(ctx, wrig(o), x, y, s, pose, { ...RA_DEF, ...col }); }

// the hero at each rank
const LAN = [
  { hat: 'stahl', weapon: 'rifle', bag: true },                                    // 1 Schütze
  { hat: 'feld', weapon: 'rifle', chev: 1 },                                        // 2 Gefreiter
  { hat: 'stahl', weapon: 'rifle', chev: 2, bag: true },                            // 3 Obergefreiter
  { hat: 'stahl', toque: true, coat: true, weapon: 'mp40', tresse: true },          // 4 Unteroffizier (winter)
  { hat: 'm43', weapon: 'mp40', tresse: true, pip: 1 },                             // 5 Feldwebel
  { hat: 'schirm', weapon: 'none', off: true, binos: true, holster: true, strap: true, offc: true },          // 6 Leutnant
  { hat: 'm43', weapon: 'mp40', off: true, pip: 1, binos: true, gray: true, offc: true },                     // 7 Oberleutnant
  { hat: 'schirm', weapon: 'none', off: true, pip: 2, coat: true, holster: true, gray: true, offc: true },    // 8 Hauptmann
];
function hero(ctx, lvl, x, y, s, pose = {}, over = {}) {
  const o = { ...LAN[lvl - 1], ...over };
  const col = o.pal ? WP[o.pal] : o.offc ? WP.officer : lvl === 4 && o.toque ? WP.snow : WP.gray;
  const { pal: _p, offc: _o, ...ro } = o;
  landser(ctx, x, y, s, pose, ro, col);
}
// comrades: varied faces, hats and weapons
function kam(ctx, x, y, s, pose = {}, i = 0, over = {}) {
  const hats = ['stahl', 'feld', 'stahl', 'm43'];
  const o = { hat: hats[i % 4], weapon: i % 3 === 2 ? 'mp40' : 'rifle', bag: i % 2 === 0, mustache: i % 5 === 1, ...over };
  const { pal: pk, ...ro } = o;
  landser(ctx, x, y, s, pose, ro, pk ? WP[pk] : pal(WP.gray, { hair: ['#b08a50', '#5a3a20', '#d8c080', '#3a2a1a'][i % 4], skin: ['#e0b896', '#e8c0a0', '#d8a880', '#f0c8a8'][i % 4] }));
}
function greta(ctx, x, y, s, pose = {}) { landser(ctx, x, y, s, pose, { civil: true, side: 'civil', female: true }, WP.greta); }
function mama(ctx, x, y, s, pose = {}) { landser(ctx, x, y, s, pose, { civil: true, side: 'civil', female: true, hat: 'kerchief' }, WP.mama); }
function oma(ctx, x, y, s, pose = {}) { landser(ctx, x, y, s, pose, { civil: true, side: 'civil', female: true, hat: 'kerchief', old: true }, WP.oma); }
function papa(ctx, x, y, s, pose = {}) { landser(ctx, x, y, s, pose, { civil: true, side: 'civil', mustache: true, hat: 'flat' }, pal(WP.civ, { hair: '#8a8a8a' })); }
function civ(ctx, x, y, s, pose = {}, i = 0, over = {}) {
  const o = { civil: true, side: 'civil', female: i % 2 === 1, hat: i % 2 ? 'kerchief' : ['flat', 'none', 'beret'][i % 3], old: i % 4 === 3, ...over };
  landser(ctx, x, y, s, pose, o, pal(WP.civ, { shirt: ['#d8d0c0', '#8a8070', '#a8b0b8', '#9a8a7a'][i % 4], dress: ['#6a7a9a', '#7a5a5a', '#5a6a5a'][i % 3], kerchief: ['#b8a890', '#8a8a9a', '#c8b8a0'][i % 3] }));
}
// Soviet soldiers (people.js) and prisoners
function ivan(ctx, x, y, s, pose = {}, i = 0, over = {}) { mate(ctx, x, y, s, pose, i, over); }
function pow(ctx, x, y, s, pose = {}, i = 0) { mate(ctx, x, y, s, { head: 0.18, expr: 'sad', ...pose }, i, { weapon: 'none', hat: i % 3 === 0 ? 'none' : 'pilotka', bag: false }); }
