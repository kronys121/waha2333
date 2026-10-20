// Entry point for the Red Army video. Preview: index.html?t=123.4
window.END_TIME = 791.5; // audio ends at 788.9
window.LEVEL_PARAS = [0, 10, 17, 24, 32, 40, 48, 54];
window.LEVEL_STARTS = window.LEVEL_PARAS.map((k) => (k === 0 ? 0 : PT(k)));
window.AUDIO = 'redarmy/audio/narration.mp3';
window.OUT_PREFIX = 'redarmy/video/part';
const canvas = document.getElementById('c');
const ctx2d = canvas.getContext('2d');
window.frameAt = (t) => { ENGINE.renderAt(ctx2d, t); };
window.frameJpeg = (t, q = 0.92) => { ENGINE.renderAt(ctx2d, t); return canvas.toDataURL('image/jpeg', q); };

(async () => {
  const sample = 'Яя0123456789№«»→';
  await document.fonts.load('40px "Russo One"', sample);
  await document.fonts.load('700 40px "Oswald"', sample);
  await document.fonts.load('700 40px "Old Standard TT"', sample);
  await document.fonts.load('italic 700 40px "Old Standard TT"', sample);
  ENGINE.finalizeShots();
  const q = new URLSearchParams(location.search);
  if (q.has('t')) window.frameAt(parseFloat(q.get('t')));
  window.__ready = true;
})();
