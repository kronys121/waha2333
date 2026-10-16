// Style-frame renderer. URL: index.html?style=cartoon&scene=hive&t=1.5

const SCENES = {
  hive: { id: 'hive', level: 1, title: 'Отброс подулья', sub: 'Тебе девять. Ты дерёшься за банку трупного крахмала, и это хороший день.' },
  battle: { id: 'battle', level: 5, title: 'Боевой брат', sub: 'Ты не спал три недели. Половина твоего мозга спит прямо сейчас, пока ты стреляешь.' },
};

function renderFrame(styleId, sceneId, t) {
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');
  const st = window.STYLES[styleId];
  const sc = SCENES[sceneId];
  const { drawFigure, shadowEllipse, quantize } = window.STYLE_HELPERS;

  const paintWorld = (c) => {
    window.BACKGROUNDS[sceneId](c, st.pal[sceneId], t);
    if (sceneId === 'hive') {
      shadowEllipse(c, 720, 965, 150, 'rgba(0,0,0,0.35)');
      drawFigure(c, window.FIGURES.kid, st.kid, 720, 965, 1.45, st.figure);
    } else {
      shadowEllipse(c, 960, 1010, 260, 'rgba(0,0,0,0.45)');
      drawFigure(c, window.FIGURES.marine, st.marine, 960, 1005, 1.15, st.figure);
    }
  };

  if (st.pixelate) {
    const big = document.createElement('canvas');
    big.width = 1920; big.height = 1080;
    paintWorld(big.getContext('2d'));
    const sw = 1920 / st.pixelate, sh = 1080 / st.pixelate;
    const small = document.createElement('canvas');
    small.width = sw; small.height = sh;
    const sctx = small.getContext('2d', { willReadFrequently: true });
    sctx.drawImage(big, 0, 0, sw, sh);
    quantize(sctx, sw, sh, st.palette);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(small, 0, 0, 1920, 1080);
  } else {
    paintWorld(ctx);
  }
  if (st.post) st.post(ctx, sc);
  if (!window.__noUi) st.ui(ctx, sc);
}

(async () => {
  const q = new URLSearchParams(location.search);
  await document.fonts.load('40px "Russo One"', 'Яя0123456789');
  await Promise.all(['Oswald', 'Ruslan Display', 'Old Standard TT', 'Press Start 2P', 'PT Sans Narrow']
    .map((f) => document.fonts.load(`700 40px "${f}"`, 'Яя0123456789+')));
  await document.fonts.load('italic 700 40px "Old Standard TT"', 'Яя0123456789+');
  await document.fonts.load('40px "Ruslan Display"', 'Яя0123456789+');
  await document.fonts.load('40px "Press Start 2P"', 'Яя0123456789+');
  window.__noUi = q.get('ui') === '0';
  renderFrame(q.get('style') || 'cartoon', q.get('scene') || 'hive', parseFloat(q.get('t') || '1'));
  window.__ready = true;
})();
