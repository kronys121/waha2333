"""Synthesize score and sound effects for the Imperial Guard video from guard/audio/events.json.

Writes guard/audio/music.wav and guard/audio/sfx.wav (44.1 kHz stereo). The mix with the narration is done by ffmpeg.
Score: D minor, 60 bpm. Organ pad, choir pad, a four-note bell motif (D A F E), timpani and low brass; each level has
its own arrangement and chord loop, the motif breaks after Korvin dies, battle paragraphs get a bed of distant artillery and
lasgun fire, level 8 ends on one note.
"""
import json
import wave
import numpy as np

SR = 44100
ev = json.load(open('guard/audio/events.json'))
END = ev['end'] + 2.0
N = int(END * SR)
L = ev['levels'] + [ev['end']]
paras = ev['paras']
rng = np.random.default_rng(7)

def hz(n):  # midi -> Hz
    return 440.0 * 2 ** ((n - 69) / 12)

def env(n, a, r):
    e = np.ones(n)
    na, nr = min(n, int(a * SR)), min(n, int(r * SR))
    if na: e[:na] = np.linspace(0, 1, na)
    if nr: e[-nr:] *= np.linspace(1, 0, nr)
    return e

def add(buf, start, sig, pan=0.0):
    i = int(start * SR)
    if i >= N or i + len(sig) <= 0: return
    j = min(N, i + len(sig))
    s = sig[: j - i]
    buf[0, i:j] += s * (1 - pan)
    buf[1, i:j] += s * (1 + pan)

def lowpass(x, k):  # simple moving-average low pass
    if k <= 1: return x
    c = np.cumsum(np.insert(x, 0, 0.0))
    y = (c[k:] - c[:-k]) / k
    return np.concatenate([y, np.full(k - 1, y[-1])])

def organ(f, dur, amp):
    t = np.arange(int(dur * SR)) / SR
    trem = 1 + 0.04 * np.sin(2 * np.pi * 5.2 * t)
    s = sum(a * np.sin(2 * np.pi * f * m * t) for m, a in [(1, 1), (2, 0.5), (3, 0.3), (4, 0.18), (6, 0.08), (8, 0.05)])
    return s * trem * env(len(t), 0.8, 1.2) * amp

def choir(f, dur, amp):
    t = np.arange(int(dur * SR)) / SR
    vib = np.sin(2 * np.pi * 5.0 * t) * 0.003
    s = np.zeros_like(t)
    for d in (-0.006, 0.0, 0.0055):
        ph = 2 * np.pi * f * (1 + d) * t + 2 * np.pi * f * np.cumsum(vib) / SR
        s += np.sin(ph) + 0.35 * np.sin(2 * ph) + 0.2 * np.sin(3 * ph)
    return lowpass(s, 6) * env(len(t), 1.5, 1.8) * amp / 3

def bell(f, amp, dur=5.0):
    t = np.arange(int(dur * SR)) / SR
    s = sum(a * np.exp(-t * d) * np.sin(2 * np.pi * f * m * t) for m, a, d in [(1, 1, 0.9), (2.76, 0.45, 1.6), (5.4, 0.25, 2.8), (8.9, 0.1, 4)])
    return s * amp * env(len(t), 0.005, 0.3)

def brass(f, dur, amp):
    t = np.arange(int(dur * SR)) / SR
    saw = 2 * ((f * t) % 1) - 1 + 2 * ((f * 1.004 * t) % 1) - 1
    return lowpass(saw, 18) * env(len(t), 0.25, 0.6) * amp * 0.5

def timp(amp, dur=1.6):
    t = np.arange(int(dur * SR)) / SR
    f = 62 * (1 + 0.6 * np.exp(-t * 18))
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3.2) + lowpass(rng.standard_normal(len(t)), 30) * np.exp(-t * 25) * 0.6
    return s * amp

def noise_sweep(dur, amp, up=True):
    n = int(dur * SR); x = rng.standard_normal(n)
    out = np.zeros(n); seg = n // 24
    for i in range(24):
        k = int(2 + (22 - i if up else i) * 3)
        out[i * seg:(i + 1) * seg] = lowpass(x[i * seg:(i + 1) * seg], k)
    e = np.sin(np.linspace(0, np.pi, n)) ** 2
    return out * e * amp

# ---------------- score ----------------
music = np.zeros((2, N), np.float32)
D, F, A = 50, 53, 57
CH = {  # chord loops per level (root, quality), each chord lasts `span` seconds
    0: ([(50, 'm'), (46, 'M'), (53, 'M'), (48, 'M')], 4),
    1: ([(50, 'm'), (46, 'M'), (53, 'M'), (48, 'M')], 4),
    2: ([(50, 'm'), (48, 'M'), (46, 'M'), (45, 'M')], 3),
    3: ([(53, 'M'), (48, 'M'), (50, 'm'), (46, 'M')], 4),
    4: ([(50, 'm'), (46, 'M'), (53, 'M'), (48, 'M')], 3),
    5: ([(50, 'm'), (51, 'M'), (55, 'm'), (45, 'M')], 4),
    6: ([(50, 'm'), (46, 'M'), (55, 'm'), (45, 'M')], 2),
    7: ([(50, 'm')], 8),
}
ARR = {  # organ, choir, bells, timpani every n beats (0 = none), brass
    0: (0.10, 0.00, 0.20, 0, 0.0),
    1: (0.10, 0.03, 0.18, 0, 0.0),
    2: (0.11, 0.03, 0.12, 2, 0.06),
    3: (0.10, 0.07, 0.20, 0, 0.0),
    4: (0.12, 0.07, 0.14, 2, 0.07),
    5: (0.10, 0.06, 0.10, 4, 0.04),
    6: (0.10, 0.06, 0.08, 1, 0.08),
    7: (0.09, 0.08, 0.16, 0, 0.0),
}
MOTIF = [62, 65, 64, 57]  # D F E A
silence = (paras[51], paras[51] + 4.0)  # the planet burns: music drops out
for lv in range(8):
    t0, t1 = L[lv], L[lv + 1]
    loop, span = CH[lv]
    org, cho, bel, tim, bra = ARR[lv]
    t = t0 + 2.4  # leave the card to its own sting
    i = 0
    while t < t1 - 0.5:
        root, q = loop[i % len(loop)]
        third = 3 if q == 'm' else 4
        dur = min(span + 1.2, t1 - t + 1.0)
        for n in (root, root + 7, root + 12 + third):
            add(music, t, organ(hz(n), dur, org), pan=(n % 5 - 2) * 0.15)
        if cho:
            for n in (root + 12, root + 19):
                add(music, t, choir(hz(n), dur, cho), pan=0.3 if n % 2 else -0.3)
        if bra and i % 2 == 0:
            add(music, t, brass(hz(root - 12), dur, bra))
        if tim:
            for b in range(int(span)):
                if b % tim == 0: add(music, t + b, timp(0.35 if b == 0 else 0.22))
        t += span; i += 1
    # the motif: once per ~16 s, broken in level 7
    m = t0 + 3.0
    while bel and m < t1 - 4:
        notes = MOTIF if lv < 5 else [62, 65, 64, 56]
        for k, n in enumerate(notes):
            add(music, m + k * (1.0 if lv != 7 else 1.8), bell(hz(n + 12), bel), pan=-0.2 + k * 0.13)
        m += 16 if lv != 7 else 30
# drop out after the last blow and at the very end
a, b = int(silence[0] * SR), int(silence[1] * SR)
fade = np.ones(N, np.float32); fade[a:b] = 0.0; fade[max(0, a - SR):a] = np.linspace(1, 0, min(a, SR)); fade[b:b + 2 * SR] = np.linspace(0, 1, min(N - b, 2 * SR))
music *= fade
# final note: low D organ swelling into the last line, then the motif once, slow
add(music, paras[52], organ(hz(38), ev['end'] - paras[52] + 1.5, 0.14))
for k, n in enumerate(MOTIF):
    add(music, paras[52] + 3 + k * 2.2, bell(hz(n + 12), 0.15))
fe = np.ones(N, np.float32); e0 = int((ev['end'] - 1.0) * SR); fe[e0:] = np.linspace(1, 0, N - e0); music *= fe

# ---------------- sound effects ----------------
def mixs(*sigs):
    n = max(len(x) for x in sigs); out = np.zeros(n)
    for x in sigs: out[: len(x)] += x
    return out
sfx = np.zeros((2, N), np.float32)
def sfx_sig(name, g):
    if name == 'whoosh': return noise_sweep(0.7, 0.35 * g)
    if name == 'impact':
        click = lowpass(rng.standard_normal(int(0.35 * SR)), 4) * np.exp(-np.arange(int(0.35 * SR)) / SR * 12) * 0.5
        return (timp(0.9, 2.0) + np.pad(click, (0, int(2.0 * SR) - len(click)))) * g
    if name == 'chime': return sum(bell(hz(n), 0.18 * g, 4.0) for n in (86, 93, 98))
    if name == 'bell': return bell(hz(50), 0.5 * g, 6.0) + bell(hz(62), 0.25 * g, 6.0)
    if name == 'card': return mixs(bell(hz(38), 0.45 * g, 6.0), bell(hz(50), 0.3 * g, 6.0), noise_sweep(1.2, 0.15 * g))
    if name == 'swell': return noise_sweep(2.0, 0.25 * g, up=True) + organ(hz(62), 2.0, 0.05 * g) * np.linspace(0, 1, int(2.0 * SR))
    if name == 'rumble': return lowpass(rng.standard_normal(int(1.8 * SR)), 60) * env(int(1.8 * SR), 0.1, 1.0) * 1.2 * g
    if name == 'warp':
        t = np.arange(int(2.2 * SR)) / SR
        return (np.sin(2 * np.pi * (80 + 300 * t) * t) * 0.3 + lowpass(rng.standard_normal(len(t)), 8) * 0.3) * env(len(t), 0.4, 1.0) * g
    if name == 'zap':
        t = np.arange(int(0.9 * SR)) / SR
        return (np.sin(2 * np.pi * (2000 - 1700 * t) * t) * 0.25 + rng.standard_normal(len(t)) * 0.1) * np.exp(-t * 4) * g
    if name == 'clash':
        t = np.arange(int(1.4 * SR)) / SR
        return (sum(np.sin(2 * np.pi * f * t) * a for f, a in [(1830, 0.3), (2710, 0.2), (3960, 0.15)]) + rng.standard_normal(len(t)) * np.exp(-t * 40) * 0.6) * np.exp(-t * 3.5) * g
    return np.zeros(10)
# battle beds: distant artillery and lasgun fire under the fighting paragraphs
BATTLE = [(9, 0.9), (17, 1.0), (18, 0.5), (22, 0.5), (24, 0.6), (29, 0.6), (30, 0.8), (32, 0.7), (36, 0.5), (50, 0.9)]
for p, g in BATTLE:
    t0, t1 = paras[p], paras[p + 1] if p + 1 < len(paras) else ev['end']
    t = t0 + 0.5
    while t < t1 - 1.0:
        add(sfx, t, sfx_sig('rumble', 0.35 * g), pan=float(rng.uniform(-0.7, 0.7)))
        t += float(rng.uniform(1.8, 4.5))
    t = t0 + 1.0
    while t < t1 - 0.5:
        add(sfx, t, sfx_sig('zap', 0.22 * g), pan=float(rng.uniform(-0.6, 0.6)))
        t += float(rng.uniform(0.25, 1.2))
for t, name, g in ev['sfx']:
    if silence[0] - 0.5 < t < silence[1]: continue
    sig = sfx_sig(name, g)
    add(sfx, t, sig, pan=float(rng.uniform(-0.25, 0.25)))

def write(path, buf, peak=0.7):
    m = np.max(np.abs(buf)) or 1
    x = (buf / m * peak * 32767).astype(np.int16)
    with wave.open(path, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(x.T.tobytes())
write('guard/audio/music.wav', music, 0.8)
write('guard/audio/sfx.wav', sfx, 0.8)
print('music + sfx', END, 'sec')
