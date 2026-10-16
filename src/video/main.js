// Entry point. Preview: index.html?t=12.5  Renderer calls window.frameAt(t).
window.END_TIME = 917.5; // audio ends at 915.15, hold the last shot a little longer
const canvas = document.getElementById('c');
const ctx2d = canvas.getContext('2d');
window.frameAt = (t) => { ENGINE.renderAt(ctx2d, t); };
window.frameJpeg = (t, q = 0.92) => { ENGINE.renderAt(ctx2d, t); return canvas.toDataURL('image/jpeg', q); };

(async () => {
  const sample = 'Яя0123456789+';
  await document.fonts.load(`40px "Russo One"`, sample);
  await document.fonts.load(`700 40px "Oswald"`, sample);
  await document.fonts.load(`italic 700 40px "Old Standard TT"`, sample);
  ENGINE.finalizeShots();
  const q = new URLSearchParams(location.search);
  if (q.has('t')) window.frameAt(parseFloat(q.get('t')));
  window.__ready = true;
})();
