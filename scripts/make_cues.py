"""Write <dir>/cues.js (CUES, CUE_TEXT, PARA) from <dir>/audio/timestamps.json and the script paragraphs.
Usage: python3 scripts/make_cues.py stalin script/stalin.txt"""
import json, sys
d, scr = sys.argv[1], sys.argv[2]
j = json.load(open(f'{d}/audio/timestamps.json'))
a = j['alignment']; T = ''.join(a['characters']).replace('\n', ' '); st = a['character_start_times_seconds']
paras = [p.strip() for p in open(scr).read().split('\n\n') if p.strip()]
pos, starts = 0, []
for p in paras:
    i = T.find(p.replace('\n', ' ')[:25], pos)
    if i < 0: sys.exit('paragraph not found: ' + p[:40])
    starts.append(st[i]); pos = i + 1
C = [c['start'] for c in j['cues']]
PARA = [min(range(len(C)), key=lambda k: abs(C[k] - s)) for s in starts]
open(f'{d}/cues.js', 'w').write('// Generated from audio/timestamps.json\nwindow.CUES = ' + json.dumps([round(c, 3) for c in C]) + ';\nwindow.CUE_TEXT = ' + json.dumps([c['text'] for c in j['cues']], ensure_ascii=False) + ';\nwindow.PARA = ' + json.dumps(PARA) + ';\n')
for k, (s, p) in enumerate(zip(starts, paras)): print(k, round(s, 2), p[:40])
