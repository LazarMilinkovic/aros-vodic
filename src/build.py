#!/usr/bin/env python3
"""Sastavlja ../index.html iz delova u src/. Pokretanje: python3 src/build.py"""
import re, json, html, os, glob
D = os.path.dirname(os.path.abspath(__file__))
R = lambda p: open(os.path.join(D, p), encoding='utf-8').read()

# redosled lekcija = redosled u src/js/course.js
ORDER = re.findall(r"\['([a-z]\d+)'", R('js/course.js'))

def strip(h):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', h))).strip()

bank = []
chapters = []
# ispitna pitanja iz PDF-ova sa pitanjima: src/questions/*.html, blokovi oznaceni sa <!-- @cid -->
EXTRA = {}
for qf in sorted(glob.glob(os.path.join(D, 'questions', '*.html'))):
    parts = re.split(r'<!--\s*@([a-z]\d+)\s*-->', open(qf, encoding='utf-8').read())
    for i in range(1, len(parts), 2):
        EXTRA[parts[i]] = EXTRA.get(parts[i], '') + parts[i + 1]
for cid in ORDER:
    p = os.path.join(D, 'chapters', cid + '.html')
    if not os.path.exists(p):
        continue
    s = open(p, encoding='utf-8').read()
    part = 2 if cid.startswith('o') else 1
    if EXTRA.get(cid, '').strip():
        blk = '<h3 class="exh">Ispitna pitanja iz ove lekcije</h3>\n<p class="exintro">Pitanja iz skripte sa ispitnim pitanjima koja se odnose na ovu lekciju. Pokušaj prvo sam da odgovoriš, pa otvori odgovor. Gde je odgovor u skripti bio netačan ili nepotpun, ovde je ispravljen i to je naznačeno.</p>\n' + EXTRA[cid]
        s = s.replace('<div class="quiz"', blk + '\n<div class="quiz"', 1)
    # stabilni id-jevi za podnaslove h3
    n = [0]
    def h3(m):
        n[0] += 1
        attrs = m.group(1)
        if 'id=' in attrs:
            return m.group(0)
        return '<h3 id="%s-h%d"%s>' % (cid, n[0], attrs)
    s = re.sub(r'<h3([^>]*)>', h3, s)
    # pitanja "Zastani i proveri" i ispitna pitanja (class="exq") ulaze u banku
    k = [0]
    def stop(m):
        k[0] += 1
        qid = '%s-q%d' % (cid, k[0])
        cls, extra, q, a = m.group(1), m.group(2), m.group(3), m.group(4)
        idm = re.search(r'id="([^"]+)"', extra)
        if idm:
            qid = idm.group(1)
            extra = extra.replace(idm.group(0), '')
        bank.append({'id': qid, 'p': part, 'ch': cid, 'q': q.strip(), 'qt': strip(q), 'a': a.strip(), 'at': strip(a)[:600], 'lnk': qid,
                     'src': 'exq' if 'exq' in cls else 'stop'})
        return '<details class="%s" id="%s"%s><summary>%s</summary><div>%s</div></details>' % (cls, qid, extra, q, a)
    s = re.sub(r'<details class="(stop(?: exq)?|exq stop)"([^>]*)><summary>(.*?)</summary><div>(.*?)</div></details>', stop, s, flags=re.S)
    chapters.append(s)

css = R('css/tokens.css') + R('css-content.css') + R('css/shell.css')
shell = R('shell.html').replace('{{CHAPTERS}}', '\n'.join(chapters))
js = '\n'.join([
    '(function(){\n"use strict";',
    "const fmt=(x,d=2)=>Number(x).toLocaleString('sr-Latn',{minimumFractionDigits:d,maximumFractionDigits:d});",
    "const store={get(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};",
    "const $=id=>document.getElementById(id);",
    "const on=(id,ev,fn)=>{const e=$(id);if(e)e.addEventListener(ev,fn);return e;};",
    R('js/quiz-data.js'),
    R('js/course.js'),
    'const BANK=' + json.dumps(bank, ensure_ascii=False) + ';const BANKI={};BANK.forEach(b=>BANKI[b.id]=b);',
    R('js/terms.js'),
    R('js/app.js'),
    R('js/exam.js'),
    R('js/cards.js'),
    'try{\n' + R('js/labs.js') + '\n}catch(e){console.error(e)}',
    '})();'])

head = '''<title>AROS vodič</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Vodič za učenje predmeta Arhitektura računara i operativni sistemi (FON): lekcije kao predavanja, generator ispita, banka pitanja i kartice.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Crect width=%2232%22 height=%2232%22 rx=%227%22 fill=%22%236d2e63%22/%3E%3Ctext x=%2216%22 y=%2221%22 font-size=%2213%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22monospace%22 font-weight=%22700%22%3EAR%3C/text%3E%3C/svg%3E">
'''
out = '<!doctype html>\n<html lang="sr-Latn">\n<head>\n<meta charset="utf-8">\n' + head + '<style>\n' + css + '\n</style>\n</head>\n<body>\n' + shell + '\n<script>\n' + js + '\n</script>\n</body>\n</html>\n'
open(os.path.join(D, '..', 'index.html'), 'w', encoding='utf-8').write(out)
print('index.html', len(out) // 1024, 'KB ·', len(chapters), 'lekcija ·', len(bank), 'pitanja u banci')

# fragment za Claude Artifact (skeleton dodaje doctype/head/body)
frag = head + '<style>\n' + css + '\n</style>\n' + shell + '\n<script>\n' + js + '\n</script>\n'
open(os.path.join(D, '..', '.artifact.html'), 'w', encoding='utf-8').write(frag)
