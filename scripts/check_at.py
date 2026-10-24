"""Check that every beat's `at` phrase in <dir>/shots.js is found inside its own paragraph's cues.
Usage: python3 scripts/check_at.py orks"""
import json, re, sys
d = sys.argv[1]
src = open(f'{d}/cues.js').read()
get = lambda name: json.loads(re.search(r'window\.' + name + r' = (\[.*?\]);', src, re.S).group(1))
C, T, PARA = get('CUES'), get('CUE_TEXT'), get('PARA')
PT = lambda k: max(0, C[PARA[k]] - 0.2)
shots = open(f'{d}/shots.js').read()
bad = 0
for m in re.finditer(r'stage\((\d+), \[(.*?)\n\], \{', shots, re.S):
    k = int(m.group(1)); t0 = PT(k); t1 = PT(k + 1) if k + 1 < len(PARA) else 1e9
    prev = t0
    for ph in re.findall(r"at: '([^']+)'", m.group(2)):
        f = next((C[i] for i in range(len(C)) if C[i] >= t0 - 0.5 and ph in T[i]), None)
        if f is None or f >= t1: print(f'stage {k}: "{ph}" not in paragraph'); bad += 1
        elif f < prev: print(f'stage {k}: "{ph}" out of order'); bad += 1
        else: prev = f
    for ph in re.findall(r"st\.ph\('([^']+)'\)", m.group(2)):
        f = next((C[i] for i in range(len(C)) if C[i] >= t0 - 0.5 and ph in T[i]), None)
        if f is None or f >= t1: print(f'stage {k}: ph "{ph}" not in paragraph'); bad += 1
print('problems:', bad)
