// Entry point for the Ork video. Preview: index.html?t=123.4
window.END_TIME = 686.0; // narration ends at 683.3
window.LEVEL_PARAS = [0, 7, 14, 21, 26, 32, 37, 43];
window.LEVEL_STARTS = window.LEVEL_PARAS.map((k) => (k === 0 ? 0 : PT(k)));
window.AUDIO = 'orks/audio/mix.m4a';
window.OUT_PREFIX = 'orks/video/part';
const canvas = document.getElementById('c');
const ctx2d = canvas.getContext('2d');
window.frameAt = (t) => { ENGINE.renderAt(ctx2d, t); };
window.frameJpeg = (t, q = 0.92) => { ENGINE.renderAt(ctx2d, t); return canvas.toDataURL('image/jpeg', q); };

// beat timing and the sound-event list, computed once from the same data the picture uses
function planBeats() {
  for (const { t0, sc } of STAGES) {
    const sh = ENGINE.SHOTS.find((x) => Math.abs(x.t0 - t0) < 1e-6);
    const dur = sh.t1 - t0;
    sc._st = beatStarts(t0, dur, sc, (txt) => ph({ t: t0, lt: 0 }, txt));
    sc._st.forEach((b, i) => {
      const beat = sc.beats[i], tr = beat.tr ?? (i === 0 ? sc.tr : 'cut'), at = t0 + b;
      if (tr === 'whip') sfx(at, 'whoosh', 0.8);
      if (tr === 'flash') sfx(at, 'impact', 0.9);
      if (tr === 'light') sfx(at, 'chime', 0.8);
      if (tr === 'black' && i === 0) sfx(at, 'swell', 0.5);
      if (beat.shake >= 4 || (sc.shake >= 4 && i === 0)) sfx(at + 0.1, 'rumble', 0.7);
      if (beat.blur) sfx(at, 'whoosh', 0.5);
      for (const [name, dt, g] of beat.sfx || []) sfx(at + dt, name, g ?? 1);
    });
  }
  window.LEVEL_PARAS.forEach((k) => sfx(PT(k) + 0.05, 'card', 1));
}

(async () => {
  const sample = 'Яя0123456789IVX«»—';
  await document.fonts.load('700 40px "Old Standard TT"', sample);
  await document.fonts.load('italic 700 40px "Old Standard TT"', sample);
  await document.fonts.load('italic 400 40px "Old Standard TT"', sample);
  await document.fonts.load('700 40px "Oswald"', sample);
  ENGINE.finalizeShots();
  planBeats();
  const q = new URLSearchParams(location.search);
  if (q.has('t')) window.frameAt(parseFloat(q.get('t')));
  window.__ready = true;
})();
