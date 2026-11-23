/* ---------- CPU time lab ---------- */
if($('cpuLab')){
function human(s){const u=[[1,'s'],[1e-3,'ms'],[1e-6,'µs'],[1e-9,'ns'],[1e-12,'ps']];for(const [m,n] of u){if(s>=m||m===1e-12)return fmt(s/m, (s/m)%1===0?0:3)+' '+n;}}
function cpu(){const ic=parseFloat($('icIn').value.replace(',','.')),cpi=parseFloat($('cpiIn').value.replace(',','.')),f=parseFloat($('fIn').value.replace(',','.'))*parseFloat($('fUnit').value);
 const out=$('cpuOut'),st=$('cpuSteps');
 if(!(ic>0&&cpi>0&&f>0)){out.textContent='—';st.textContent='Upiši pozitivne brojeve.';return;}
 const cyc=ic*cpi,t=cyc/f;out.textContent=human(t);
 st.textContent=`Ciklusa = IC × CPI = ${fmt(ic,0)} × ${fmt(cpi,2)} = ${fmt(cyc,0)}. Vreme = ciklusi / f = ${fmt(cyc,0)} / ${f.toExponential(0).replace('e+','·10^')} Hz = ${human(t)}.`;}
['icIn','cpiIn','fIn','fUnit'].forEach(i=>on(i,'input',cpu));cpu();
}

/* ---------- Amdahl lab ---------- */
if($('amdChart')){
const svgNS='http://www.w3.org/2000/svg';
function el(n,a,p){const e=document.createElementNS(svgNS,n);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
const ch=$('amdChart');const W=560,H=250,L=44,R=40,T=12,B=34;
const xs=n=>L+(Math.log2(n)/Math.log2(128))*(W-L-R);const ys=s=>H-B-(Math.min(s,25)/25)*(H-T-B);
(function drawBase(){ch.innerHTML='';
 [0,5,10,15,20,25].forEach(v=>{el('line',{x1:L,x2:W-R,y1:ys(v),y2:ys(v),class:'s-grid'},ch);const t=el('text',{x:L-6,y:ys(v)+4,'text-anchor':'end',class:'s-tm'},ch);t.textContent=v;});
 [1,2,4,8,16,32,64,128].forEach(n=>{const t=el('text',{x:xs(n),y:H-B+16,'text-anchor':'middle',class:'s-tm'},ch);t.textContent=n;});
 const xl=el('text',{x:(W)/2,y:H-4,'text-anchor':'middle',class:'s-tm'},ch);xl.textContent='broj jezgara N (log skala)';
 const yl=el('text',{x:12,y:T+4,class:'s-tm'},ch);yl.textContent='S';
 [[.8,'0,80'],[.9,'0,90'],[.95,'0,95'],[.99,'0,99']].forEach(([f,lab],k)=>{let d='';for(let n=1;n<=128;n*=1.1){const s=1/((1-f)+f/n);d+=(d?'L':'M')+xs(n).toFixed(1)+' '+ys(s).toFixed(1);}
  el('path',{d,class:'s-line',style:`opacity:${.35+k*.15}`},ch);const s=1/((1-f)+f/128);const t=el('text',{x:W-R+4,y:ys(s)+4,class:'s-tm'},ch);t.textContent='f='+lab;});
})();
let dot=null,cur=null;
function amd(){const f=parseFloat($('fR').value),n=parseInt($('nR').value,10);const s=1/((1-f)+f/n);
 $('fV').textContent=fmt(f);$('nV').textContent=n;$('sOut').textContent=fmt(s);
 $('sLim').textContent='maksimum za N→∞: '+(f>=1?'∞':fmt(1/(1-f)));
 if(cur)cur.remove();let d='';for(let k=1;k<=128;k*=1.1){const v=1/((1-f)+f/k);d+=(d?'L':'M')+xs(k).toFixed(1)+' '+ys(v).toFixed(1);}cur=el('path',{d,class:'s-aline'},ch);
 if(dot)dot.remove();dot=el('circle',{cx:xs(n),cy:ys(s),r:5,style:'fill:var(--signal)'},ch);}
['fR','nR'].forEach(i=>on(i,'input',amd));amd();
}

/* ---------- Decoder lab ---------- */
if($('decIn')){
const OPS={'0000':['CLR','AK ← 0','Obriši akumulator. Adresni deo se ne koristi.'],'0001':['LOAD','AK ← S(M)','Napuni akumulator sadržajem lokacije M.'],'0010':['STORE','M ← S(AK)','Upiši sadržaj akumulatora u lokaciju M.'],'0011':['ADD','AK ← S(AK) + S(M)','Dodaj sadržaj lokacije M na akumulator.'],'0100':['SUB','AK ← S(AK) − S(M)','Oduzmi sadržaj lokacije M od akumulatora.'],'0101':['MUL','AK ← S(AK) × S(M)','Pomnoži akumulator sadržajem lokacije M.'],'0110':['DIV','AK ← S(AK) / S(M)','Podeli akumulator sadržajem lokacije M.'],'0111':['HALT','prekid rada','Zaustavi program. Adresni deo se ne koristi.']};
function dec(){const v=$('decIn').value.replace(/\s/g,'');const bitsEl=$('decBits'),out=$('decOut');
 if(!/^[01]{8}$/.test(v)){bitsEl.innerHTML='';out.textContent='Upiši tačno 8 cifara, samo 0 i 1.';return;}
 bitsEl.innerHTML=[...v].map((b,i)=>`<span class="${i<4?'op':'ad'}">${b}</span>`).join('');
 const op=v.slice(0,4),ad=parseInt(v.slice(4),2),o=OPS[op];
 if(!o){out.textContent=`Opkod ${op} (${parseInt(op,2)}) je nepostojeći opkod: naša mašina ima samo opkode 0000–0111. Procesor bi prijavio grešku (ilegalna instrukcija).`;return;}
 const noAddr=(op==='0000'||op==='0111');
 out.textContent=`Opkod ${op} = ${o[0]}. Adresni deo ${v.slice(4)} = ${ad}. Instrukcija: ${o[0]}${noAddr?'':' '+ad}. Značenje: ${o[1].replace('M',String(ad))}. ${o[2].replace('lokacije M','lokacije '+ad).replace('lokaciju M','lokaciju '+ad)}`;}
on('decIn','input',dec);dec();
}

/* ---------- CPU simulator ---------- */
if($('simLab')){
const PROG=['MMR 06 R1','MMR 07 R2','ADD R1 R2','MAM 08','HLT'];
const steps=[];
(function build(){let s={BN:0,RN:'–',R1:'–',R2:'–',AC:'–',m8:''};
 const push=(ph,log,ch,hit)=>{steps.push(Object.assign({},s,{ph,log,ch,hit}));};
 const acts=[
  [()=>{s.R1=100},'R1','Izvrši: upravljačka jedinica kopira vrednost sa adrese 06 (100) u R1.',6],
  [()=>{s.R2=200},'R2','Izvrši: vrednost sa adrese 07 (200) kopira se u R2.',7],
  [()=>{s.AC=300},'AC','Izvrši: ALU sabira R1 + R2 = 300 i rezultat upisuje u akumulator.',null],
  [()=>{s.m8=300},'m8','Izvrši: vrednost iz akumulatora (300) upisuje se u memoriju na adresu 08.',8],
  [()=>{},null,'Izvrši: kraj programa. Procesor pita OS koji je sledeći program (nova vrednost BN).',null]];
 const names=['Prvi','Drugi','Treći','Četvrti','Peti'];
 PROG.forEach((ins,i)=>{
  s.RN=ins;push(0,`${names[i]} ciklus. Uzmi: instrukcija sa adrese 0${i} prebačena je u RN.`,'RN',i);
  push(1,`Analiziraj: upravljačka jedinica dekodira „${ins}“.`,null,null);
  acts[i][0]();push(2,acts[i][2],acts[i][1],acts[i][3]);
  if(i<4){s.BN=i+1;push(3,`BN se povećava na 0${i+1}, pa pokazuje na sledeću instrukciju.`,'BN',null);}
 });})();
let sp=-1;
function memRow(a,v,cls){return `<div class="${cls}"><span class="a">${String(a).padStart(2,'0')}:</span><span>${v}</span></div>`;}
function renderSim(){const st=sp<0?{BN:0,RN:'–',R1:'–',R2:'–',AC:'–',m8:'',ph:-1,log:'Program je učitan u memoriju; OS je postavio BN na 00.',ch:null,hit:null}:steps[sp];
 let h='';for(let a=0;a<=8;a++){let v=a<5?PROG[a]:a===6?'100':a===7?'200':a===8?String(st.m8):'';let c=(a===st.BN&&a<5)?'pc':'';if(st.hit===a)c='hit';h+=memRow(a,v||'&nbsp;',c);}
 $('simMem').innerHTML=h;
 const set=(id,v,k)=>{const r=$(id);r.querySelector('b').textContent=v;r.classList.toggle('flash',st.ch===k);};
 set('rBN',String(st.BN).padStart(2,'0'),'BN');set('rRN',st.RN,'RN');set('rR1',st.R1,'R1');set('rR2',st.R2,'R2');set('rAC',st.AC,'AC');
 [...document.querySelectorAll('#simPhase span')].forEach((x,i)=>x.classList.toggle('on',i===st.ph));
 $('simLog').textContent=st.log;$('simCount').textContent=sp<0?'':`korak ${sp+1} / ${steps.length}`;
 $('simNext').disabled=sp>=steps.length-1;}
on('simNext','click',()=>{if(sp<steps.length-1){sp++;renderSim();}});
on('simReset','click',()=>{sp=-1;renderSim();});renderSim();
}

/* ---------- Addressing lab ---------- */
if($('adrSel')){
const MEM={1000:1024,1003:55,1023:91,1024:20};const REG={R2:1024,IR:3,BR:1000};
const AD={
 imm:['Operand je sam broj iz instrukcije.','nema (operand je u instrukciji)',1000,0],
 dreg:['Operand je sadržaj registra R2.','nema (operand je u registru R2)',REG.R2,0],
 dmem:['Adresni deo (1000) je efektivna adresa.','EA = 1000',MEM[1000],1],
 ireg:['R2 sadrži adresu operanda.','EA = S(R2) = 1024',MEM[1024],1],
 imem:['Na adresi 1000 piše adresa operanda (1024).','EA = S(1000) = 1024',MEM[1024],2],
 idx:['Početna adresa niza je 1000, indeks registar IR = 3, pa čitamo element a[3].','EA = 1000 + S(IR) = 1000 + 3 = 1003',MEM[1003],1],
 base:['Bazni registar BR = 1000 je početak programa, pomeraj je 24 (relativna adresa).','EA = S(BR) + 24 = 1000 + 24 = 1024',MEM[1024],1],
 bidx:['Blok počinje na S(BR) = 1000, niz je pomeren za D = 20, indeks je S(IR) = 3.','EA = S(BR) + D + S(IR) = 1000 + 20 + 3 = 1023',MEM[1023],1]};
function adr(){const v=AD[$('adrSel').value];if(!v)return;const [why,ea,val,acc]=v;
 $('adrOut').innerHTML=`<b>${why}</b><br>${ea}<br>Operand koji stiže u R1: <span class="mono" style="color:var(--accent);font-weight:600">${val}</span> · pristupa memoriji: <b>${acc}</b>`;}
on('adrSel','change',adr);adr();
}

/* ---------- Endian lab ---------- */
if($('endIn')){
function endian(){const raw=$('endIn').value.trim().replace(/^0x/i,'');const out=$('endOut');
 if(!/^[0-9a-fA-F]{1,8}$/.test(raw)){out.innerHTML='<p class="score">Upiši do 8 heksadecimalnih cifara (0–9, A–F).</p>';return;}
 const h=raw.toUpperCase().padStart(8,'0');const b=[h.slice(0,2),h.slice(2,4),h.slice(4,6),h.slice(6,8)];
 const row=(n,a)=>`<tr><td>${n}</td>${a.map(x=>`<td class="num">${x}</td>`).join('')}</tr>`;
 out.innerHTML=`<table><tr><th>Adresa</th><th class="num">00</th><th class="num">01</th><th class="num">02</th><th class="num">03</th></tr>${row('Big endian',b)}${row('Little endian',[...b].reverse())}</table>`;}
on('endIn','input',endian);endian();
}

/* ======== v3: infografike i nove laboratorije ======== */
const NS='http://www.w3.org/2000/svg';
function S(tag,attrs,parent,text){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(text!=null)e.textContent=text;if(parent)parent.appendChild(e);return e;}
function arrowDefs(svg,id){const d=S('defs',{},svg);const m=S('marker',{id:id,viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:7,markerHeight:7,orient:'auto-start-reverse'},d);S('path',{d:'M0 0L10 5L0 10z',class:'s-arrow'},m);}
const SUP='⁰¹²³⁴⁵⁶⁷⁸⁹';const sup=n=>String(n).split('').map(c=>SUP[+c]).join('');

/* ---- slojevi apstrakcije ---- */
if($('layLab')){
const L=[
['Problem i algoritam','<h5>Problem i algoritam</h5><p>Problem: „izračunaj zbir dve vrednosti i sačuvaj ga“. Algoritam: 1) uzmi B, 2) dodaj C, 3) rezultat zapamti kao A. Na ovom nivou nema ni računara ni jezika, samo postupak.</p>'],
['Program (C, Java)','<h5>Program u višem jeziku</h5><pre>int A = B + C;</pre><p>Programer razmišlja o <strong>promenljivim</strong>. Ne zna (i ne mora da zna) u kom registru ili na kojoj adresi su B i C.</p>'],
['Asembler','<h5>Prevodilac → asemblerski jezik</h5><pre>LOAD  B\nADD   C\nSTORE A</pre><p>Prevodilac (kompajler) je jednu naredbu pretvorio u <strong>tri instrukcije</strong> (prevod 1:n). Ovo je i dalje tekst za ljude: simbolička imena umesto brojeva.</p>'],
['Mašinski jezik (ISA)','<h5>Asembler → mašinski kod (granica ISA)</h5><pre>0001 0100   LOAD 4\n0011 0101   ADD 5\n0010 0110   STORE 6</pre><p>Asembler je opkode zamenio binarnim (LOAD = 0001, ADD = 0011, STORE = 0010), a imena adresama (B = 4, C = 5, A = 6). Ovo je <strong>ISA</strong>: ovakve bitove procesor razume. Sve iznad je softver, sve ispod hardver.</p>'],
['Mikroarhitektura','<h5>Mikroarhitektura: mikrooperacije</h5><pre>ARM ← S(BN)        adresa instrukcije\nPRM ← S(S(ARM))    čitanje iz memorije\nRN  ← S(PRM)       instrukcija u RN\nBN  ← S(BN) + 1\nARM ← S(RNA)       adresa podatka (4)\nPRM ← S(S(ARM))    podatak B\nAK  ← S(PRM)</pre><p>Jedna instrukcija LOAD su zapravo sedam sitnih koraka koje upravljačka jedinica izvodi slanjem upravljačkih signala registrima i memoriji (Modul 3, deo 3.2).</p>'],
['Logička kola','<h5>Digitalna logika: sabirač</h5><pre>  0001 0100   (20)\n+ 0011 1100   (60)\n= 0101 0000   (80)</pre><p>ADD izvodi <strong>sabirač</strong> u ALU: niz od 8 „potpunih sabirača“, po jedan za svaki bit. Svaki sabira dva bita i prenos sa prethodne pozicije: zbir = a XOR b XOR prenos, a novi prenos ide na sledeću poziciju ulevo.</p>'],
['Kola i tranzistori','<h5>Elektronska kola</h5><p>Svako logičko kolo (I, ILI, XOR) napravljeno je od nekoliko <strong>CMOS tranzistora</strong>: NI kolo ima 4, a jedan potpuni sabirač oko 28. Dakle samo ovaj 8-bitni sabirač ima oko 220 tranzistora, a ceo procesor milijarde.</p>'],
['Elektroni','<h5>Poluprovodnici i elektroni</h5><p>Tranzistor je prekidač bez pokretnih delova: napon na njegovom ulazu (gejtu) otvara ili zatvara kanal kroz silicijum kojim teku elektroni. Visok napon (oko 1 V) tumači se kao 1, nizak kao 0. Tu se završava put naredbe A = B + C.</p>']];
const bx=$('layBtns'),vw=$('layView');let cur=0;const seen=new Set([0]);
const btns=L.map((l,i)=>{const b=document.createElement('button');b.type='button';b.textContent=(i+1)+'. '+l[0];b.addEventListener('click',()=>{cur=i;seen.add(i);show();});bx.appendChild(b);return b;});
function show(){btns.forEach((b,i)=>{b.className=(i===cur?'on':(seen.has(i)?'seen':''));});vw.innerHTML=L[cur][1]+(cur<L.length-1?'<p class="score">Sledeći sloj naniže: '+L[cur+1][0]+'</p>':'');}
show();}

/* ---- hijerarhija memorije ---- */
if($('hierLab')){
const H=[['Registar',0.3e-9],['L1 keš',1e-9],['L2 keš',5e-9],['L3 keš',15e-9],['RAM',75e-9],['SSD (dopuna)',80e-6],['Hard disk',7.5e-3]];
const mn=Math.log10(0.3e-9)-0.4,mx=Math.log10(7.5e-3);
const realT=s=>s<1e-6?fmt(s*1e9,s<1e-9?1:0)+' ns':s<1e-3?fmt(s*1e6,0)+' µs':fmt(s*1e3,1)+' ms';
function humanT(s){const x=s/0.3e-9;if(x<60)return fmt(x,x<10?1:0)+' s';if(x<3600)return fmt(x/60,1)+' min';if(x<86400)return fmt(x/3600,1)+' h';if(x<86400*60)return fmt(x/86400,1)+' dana';return fmt(x/86400/30.4,1)+' meseci';}
let mode='real';
function draw(){$('hierBars').innerHTML=H.map(([n,t])=>{const w=4+96*(Math.log10(t)-mn)/(mx-mn);return `<div class="hbar"><span>${n}</span><div class="tr"><div class="fl${t>1e-6?' slow':''}" style="width:${w.toFixed(1)}%"></div></div><span class="vl">${mode==='real'?realT(t):humanT(t)}</span></div>`;}).join('');}
document.querySelectorAll('#hierMode button').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.m;document.querySelectorAll('#hierMode button').forEach(x=>x.classList.toggle('on',x===b));draw();}));
draw();}

/* ---- pretvarač brojeva ---- */
if($('numLab')){
const dI=$('numDec'),bI=$('numBin'),hI=$('numHex'),out=$('numOut');
function setFrom(v,src){if(src!=='d')dI.value=v.toString(10);if(src!=='b')bI.value=v.toString(2);if(src!=='h')hI.value=v.toString(16).toUpperCase();
 const b=v.toString(2),pad=b.padStart(Math.ceil(b.length/4)*4,'0');
 out.innerHTML='Grupe od po 4 bita (svaka je jedna hex cifra): '+pad.match(/.{4}/g).map(g=>`<code>${g}</code> = ${parseInt(g,2).toString(16).toUpperCase()}`).join(' · ');}
function parse(src){const el=src==='d'?dI:src==='b'?bI:hI;const raw=el.value.trim().replace(/\s/g,'');const re=src==='d'?/^\d{1,15}$/:src==='b'?/^[01]{1,48}$/:/^[0-9a-fA-F]{1,12}$/;
 if(!re.test(raw)){out.textContent='Neispravan unos: '+(src==='d'?'samo cifre 0–9.':src==='b'?'samo 0 i 1.':'samo 0–9 i A–F.');return;}
 setFrom(parseInt(raw,src==='d'?10:src==='b'?2:16),src);}
dI.addEventListener('input',()=>parse('d'));bI.addEventListener('input',()=>parse('b'));hI.addEventListener('input',()=>parse('h'));parse('d');
function pw(){const n=parseInt($('pwN').value,10),o=$('pwOut');if(!(n>=1&&n<=64)){o.textContent='Upiši n od 1 do 64.';return;}
 const v=2n**BigInt(n);let u='';for(const [e,nm] of [[60,'EB'],[50,'PB'],[40,'TB'],[30,'GB'],[20,'MB'],[10,'KB']]){if(n>=e){u=` = 2${sup(n-e)} ${nm} = ${(2n**BigInt(n-e)).toString()} ${nm}`;break;}}
 o.textContent=`2${sup(n)} = ${v.toLocaleString('sr-Latn')} adresa${u} (ako svaka adresa označava jedan bajt)`;}
on('pwN','input',pw);pw();}

/* ---- Von Neumann vs Harvard ---- */
if($('vnhLab')){
const svg=$('vnhSvg');
function draw(){const n=+$('vnhN').value;$('vnhNv').textContent=n;svg.innerHTML='';
 const vn=2*n,hv=n+1,max=20,x0=150,cw=480/max;
 S('text',{x:8,y:16,class:'s-tm'},svg,'ciklus magistrale →');
 for(let c=0;c<=max;c++)S('line',{x1:x0+c*cw,x2:x0+c*cw,y1:24,y2:158,class:'s-grid'},svg);
 [['Von Neumann',48],['Harvard: instr.',108],['Harvard: podaci',142]].forEach(([a,y])=>S('text',{x:8,y:y+4,class:'s-t'},svg,a));
 S('text',{x:8,y:66,class:'s-tm'},svg,'jedna magistrala');
 const cell=(c,y,t,cls)=>{S('rect',{x:x0+c*cw+1,y:y-11,width:cw-2,height:22,rx:3,class:cls},svg);S('text',{x:x0+c*cw+cw/2,y:y+4,'text-anchor':'middle',class:'s-t',style:'font-size:10px'},svg,t);};
 for(let i=0;i<n;i++){cell(2*i,48,'I'+(i+1),'s-acc');cell(2*i+1,48,'D'+(i+1),'s-sig');cell(i,108,'I'+(i+1),'s-acc');cell(i+1,142,'D'+(i+1),'s-sig');}
 S('text',{x:x0+vn*cw+4,y:52,class:'s-th'},svg,vn+'');S('text',{x:x0+hv*cw+4,y:128,class:'s-th'},svg,hv+'');
 $('vnhOut').innerHTML=`Von Neumann: <b>${vn}</b> ciklusa, jer instrukcija i podatak moraju jedno za drugim istim putem. Harvard: <b>${hv}</b> ciklusa, jer dok se donosi instrukcija k + 1, istovremeno se donosi podatak instrukcije k. Harvard je ovde ${fmt(vn/hv)} puta brži; za mnogo instrukcija skoro 2 puta.`;}
on('vnhN','input',draw);draw();}

/* ---- v5: arhitektura ili organizacija ---- */
if($('archLab')){
const A=[
['Da li procesor ima instrukciju za množenje (MUL)','A','Programer mora da zna sme li da napiše MUL. To je deo skupa instrukcija.'],
['Učestanost takta je 3,2 GHz','O','Program radi isto i na 2 i na 4 GHz, samo brže ili sporije.'],
['Celi broj se predstavlja sa 32 ili sa 64 bita','A','Broj bitova za tipove podataka je vidljiv programeru (slajd 14): od njega zavisi najveći broj koji može da se zapiše.'],
['RAM je napravljen u tehnologiji DDR4 ili DDR5','O','Memorijska tehnologija je tipičan atribut organizacije (slajd 15).'],
['Kojim načinima instrukcija može da adresira memoriju','A','Načini adresiranja su deo arhitekture (slajdovi 14 i 36).'],
['Množenje radi poseban brzi sklop, a ne niz sabiranja','O','Rezultat je isti, menja se samo brzina. To je izvedba, dakle organizacija.'],
['Koliko registara procesor ima i čemu služe','A','Skup registara vidljivih programeru određuje arhitekturu procesora (slajd 36).'],
['Upravljački signali između procesora i memorije','O','Programer ih ne vidi; navedeni su kao atribut organizacije na slajdu 15.'],
['Format instrukcije: koliko bita je kod operacije, a koliko adresa','A','Format instrukcija je jedna od šest stavki arhitekture procesora (slajd 36).'],
['Veličina keš memorije (npr. 8 MB L3)','O','Keš je programeru nevidljiv: program radi ispravno sa bilo kojim kešom, samo različitom brzinom.'],
['Kako se u programu obrađuju prekidi (mehanizam prekida)','A','Mehanizam prekida je stavka arhitekture procesora (slajd 36).'],
['Interfejs ka periferijskim uređajima (USB kontroler)','O','Slajd 15: interfejsi ka periferijama su deo organizacije.']];
const list=$('archList'),sc=$('archScore');let ok=0,done=0;
function build(){list.innerHTML='';ok=0;done=0;
 A.forEach(([t,v,w])=>{const it=document.createElement('div');it.className='it';
  it.innerHTML=`<span>${t}</span><div class="bt"><button type="button" data-v="A">Arhitektura</button><button type="button" data-v="O">Organizacija</button></div><div class="why" hidden></div>`;
  it.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{const right=b.dataset.v===v;done++;if(right)ok++;
   it.querySelectorAll('button').forEach(x=>{x.disabled=true;if(x===b)x.classList.add('pick',right?'right':'wrong');});
   it.classList.add(right?'ok':'no');const wy=it.querySelector('.why');wy.hidden=false;
   wy.textContent=(right?'Tačno. ':'Nije, ovo je '+(v==='A'?'arhitektura':'organizacija')+'. ')+w;score();}));
  list.appendChild(it);});score();}
function score(){sc.innerHTML=done<A.length?`Odgovoreno ${done} od ${A.length}, tačno ${ok}.`:`Gotovo: tačno <b>${ok} od ${A.length}</b>. ${ok===A.length?'Odlično, ovo pitanje na ispitu je tvoje.':'Pročitaj objašnjenja crvenih stavki, pa '}<button type="button" class="btn ghost" id="archAgain">Ponovi</button>`;
 const r=$('archAgain');if(r)r.addEventListener('click',build);}
build();}

/* ---- v5: četiri funkcije računara ---- */
if($('funcLab')){
const svg=$('funcSvg');
const B={P:[220,14,160,50,'Prenos podataka'],U:[200,124,200,54,'Mehanizmi upravljanja'],S:[16,232,184,54,'Skladištenje podataka'],O:[400,232,184,54,'Obrada podataka']};
const W={PU:'M300 68 L300 120',US:'M236 182 L116 228',UO:'M364 182 L484 228'};
const SC=[
['Kopiranje datoteke (sl. 30)',[{h:['P'],w:['PU'],t:'<b>Prenos podataka</b> (slajd 30). Podaci se samo premeštaju sa jednog mesta na drugo, na primer sa fleša na drugi računar preko mreže. Ništa se ne računa i ništa se ne menja. Upravljanje (u centru) određuje kada i kuda podatak ide.'}]],
['Učitavanje radi ažuriranja (sl. 31)',[{h:['U'],w:['US','UO'],t:'<b>Upravljanje</b> (slajd 31). Podatak se učita iz skladišta, izmeni u obradi i vrati nazad, npr. promena jedne ocene u bazi. Sam posao je jednostavan, ali upravljanje mora da ga vodi tačnim redom: skladište → obrada → skladište.'}]],
['Računanje po algoritmu (sl. 32)',[{h:['O'],w:['US','UO'],t:'<b>Obrada podataka</b> (slajd 32). ALU izračunava vrednosti po zadatom algoritmu. Ulazni podaci dolaze iz skladišta (ili spolja), a rezultat se vraća u skladište ili šalje napolje.'}]],
['Upis na magnetni disk (sl. 33)',[{h:['S'],w:['PU','US'],t:'<b>Skladištenje podataka</b> (slajd 33). Podatak dolazi spolja (prenos) i trajno se smešta, npr. na magnetni disk. Ostaje sačuvan i kad se računar isključi.'}]],
['Naš primer: prosek ocena',[
 {h:['S'],w:['US'],t:'<b>1. Skladištenje.</b> Ocene 8, 9, 10 su sačuvane na disku. Kad otvoriš fajl, kopiraju se u RAM, pa u keš i registre.'},
 {h:['O'],w:['US','UO'],t:'<b>2. Obrada.</b> ALU sabira 8 + 9 = 17, pa 17 + 10 = 27, i deli sa 3. Rezultat je 9.'},
 {h:['P'],w:['UO','PU'],t:'<b>3. Prenos.</b> Rezultat 9 se šalje grafičkoj kartici i pojavljuje se na ekranu (U/I uređaj).'},
 {h:['S'],w:['US'],t:'<b>4. Skladištenje.</b> Kad pritisneš Ctrl+S, nova tabela se upisuje nazad na disk.'},
 {h:['U'],w:['PU','US','UO'],t:'<b>5. Upravljanje.</b> Sve vreme upravljačka jedinica (a iznad nje i operativni sistem) odlučuje šta se radi i kojim redom. Bez nje ostale tri funkcije ne bi znale kad da počnu. Zato je u centru slike.'}]]];
let sc=0,st=0;const bx=$('funcBtns');
const btns=SC.map((s,i)=>{const b=document.createElement('button');b.type='button';b.textContent=s[0];b.addEventListener('click',()=>{sc=i;st=0;draw();});bx.appendChild(b);return b;});
function draw(){const steps=SC[sc][1],cur=steps[st];btns.forEach((b,i)=>b.classList.toggle('on',i===sc));svg.innerHTML='';{const d=S('defs',{},svg);const m=S('marker',{id:'fA',viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:13,markerHeight:13,markerUnits:'userSpaceOnUse',orient:'auto-start-reverse'},d);S('path',{d:'M0 0L10 5L0 10z',class:'s-arrow'},m);}
 for(const k in W){const on=cur.w.includes(k);S('path',{d:W[k],class:'s-wire'+(on?' on':''),'marker-end':'url(#fA)','marker-start':'url(#fA)'},svg);}
 for(const k in B){const [x,y,w,h,t]=B[k],hot=cur.h.includes(k);S('rect',{x,y,width:w,height:h,rx:10,class:'f-box'+(hot?' hot':'')},svg);S('text',{x:x+w/2,y:y+h/2+5,'text-anchor':'middle',class:'f-txt'+(hot?' hot':'')},svg,t);}
 $('funcOut').innerHTML=cur.t;const multi=steps.length>1;$('funcStepRow').hidden=!multi;
 if(multi){$('funcStepTxt').textContent='Korak '+(st+1)+' od '+steps.length;$('funcNext').textContent=st<steps.length-1?'Sledeći korak →':'Ispočetka ↺';}}
on('funcNext','click',()=>{const n=SC[sc][1].length;st=(st+1)%n;draw();});
draw();}

/* ---- v5: Murov zakon ---- */
if($('murLab')){
const svg=$('murSvg'),x0=64,x1=620,yT=14,yB=222,lo=3,hi=11;
const X=y=>x0+(y-1971)/(2021-1971)*(x1-x0),Y=n=>yB-(Math.log10(n)-lo)/(hi-lo)*(yB-yT);
const pred=y=>2300*Math.pow(2,(y-1971)/2);
const chips=[[1971,2300,'4004'],[1978,29000,'8086'],[1989,1.2e6,'80486'],[1995,5.5e6,'Pentium Pro'],[2005,1.72e9,'Montecito'],[2020,1.6e10,'Apple M1 (dopuna)']];
const big=n=>n>=1e9?fmt(n/1e9,n<1e10?2:1)+' milijardi':n>=1e6?fmt(n/1e6,n<1e7?1:0)+' miliona':n>=1e3?fmt(n/1e3,n<1e4?1:0)+' hiljada':fmt(n,0);
function draw(){const yr=+$('murY').value;$('murYv').textContent=yr;svg.innerHTML='';
 const SUPX=['³','⁴','⁵','⁶','⁷','⁸','⁹','¹⁰','¹¹'];
 for(let e=lo;e<=hi;e++){const y=Y(Math.pow(10,e));S('line',{x1:x0,x2:x1,y1:y,y2:y,class:'s-grid'},svg);S('text',{x:x0-8,y:y+4,'text-anchor':'end',class:'s-tm'},svg,'10'+SUPX[e-3]);}
 for(let g=1980;g<=2020;g+=10){S('text',{x:X(g),y:yB+18,'text-anchor':'middle',class:'s-tm'},svg,String(g));}
 S('text',{x:X(1971),y:yB+18,'text-anchor':'middle',class:'s-tm'},svg,'1971');
 let d='';for(let y=1971;y<=2021;y++)d+=(y===1971?'M':'L')+X(y).toFixed(1)+' '+Y(pred(y)).toFixed(1);
 S('path',{d,class:'s-aline',style:'stroke-width:2.4'},svg);
 S('text',{x:X(1983)-6,y:Y(pred(1983))-10,'text-anchor':'end',class:'s-tm'},svg,'predviđanje: ×2 svake 2 godine');
 chips.forEach(([y,n,t])=>{S('circle',{cx:X(y),cy:Y(n),r:5,class:'s-sigf'},svg);const right=y<2010;S('text',{x:X(y)+(right?8:-8),y:Y(n)+(y===2005?-6:16),'text-anchor':right?'start':'end',class:'s-t',style:'font-size:11.5px'},svg,t);});
 S('line',{x1:X(yr),x2:X(yr),y1:yT,y2:yB,class:'s-line',style:'stroke-dasharray:4 4;opacity:.6'},svg);
 S('circle',{cx:X(yr),cy:Y(pred(yr)),r:6,class:'s-accf'},svg);
 const k=(yr-1971)/2,ch=chips.find(c=>c[0]===yr);
 $('murOut').innerHTML=`Od 1971. do ${yr}. prošlo je ${yr-1971} godina, to jest <b>${fmt(k,k%1?1:0)} udvostručavanja</b>. Predviđanje: 2300 · 2<sup>${fmt(k,k%1?1:0)}</sup> ≈ <b>${big(pred(yr))}</b> tranzistora`+(ch?`. Stvarni čip te godine, ${ch[2]}: <b>${big(ch[1])}</b>.`:'.');}
on('murY','input',draw);draw();}

/* ---- protočna obrada ---- */
if($('pipeLab')){
const svg=$('pipeSvg');
const names=k=>k===5?['IF','ID','EX','MEM','WB']:k===3?['IF','ID','EX']:k===4?['IF','ID','EX','WB']:Array.from({length:k},(_,i)=>'F'+(i+1));
function draw(){const k=+$('pipeK').value,n=+$('pipeN').value;$('pipeKv').textContent=k;$('pipeNv').textContent=n;
 const tot=k+n-1,x0=64,cw=Math.min(48,570/tot),rh=Math.min(30,180/n),H=30+n*rh+6;
 svg.setAttribute('viewBox',`0 0 640 ${H}`);svg.innerHTML='';
 S('text',{x:4,y:16,class:'s-tm'},svg,'ciklus →');
 for(let c=0;c<tot;c++)S('text',{x:x0+c*cw+cw/2,y:16,'text-anchor':'middle',class:'s-tm'},svg,String(c+1));
 const nm=names(k);
 for(let i=0;i<n;i++){const y=26+i*rh;S('text',{x:4,y:y+rh/2+3,class:'s-t',style:'font-size:11px'},svg,'Instr. '+(i+1));
  for(let s=0;s<k;s++){S('rect',{x:x0+(i+s)*cw+1,y:y+1,width:cw-2,height:rh-3,rx:3,class:(s===0?'s-sig':s===1?'s-acc':'s-box')+' pop',style:`animation-delay:${(i+s)*35}ms`},svg);
   if(cw>=24&&rh>=15)S('text',{x:x0+(i+s)*cw+cw/2,y:y+rh/2+3,'text-anchor':'middle',class:'s-t',style:'font-size:9.5px'},svg,nm[s]);}}
 const bez=n*k;$('pipeOut').innerHTML=`Bez protočne obrade: ${n} × ${k} = <b>${bez}</b> ciklusa. Sa protočnom: ${k} + ${n} − 1 = <b>${tot}</b> ciklusa. Ubrzanje: ${bez} / ${tot} = <b>${fmt(bez/tot)}</b> (nikad više od ${k}).`;}
['pipeK','pipeN'].forEach(i=>on(i,'input',draw));draw();}

/* ---- 9 faza ---- */
if($('cycLab')){
const svg=$('cycSvg');arrowDefs(svg,'cycArr');
const NODES={1:[105,48,'Uzmi instrukciju'],4:[315,48,'Uzmi operand'],7:[475,48,'Upiši rezultat'],I:[585,48,'Obrada prekida'],9:[55,170,'Adresa sledeće'],2:[160,170,'Dekodiraj'],3:[265,170,'Adresa operanda'],5:[370,170,'Izvrši operaciju'],6:[475,170,'Adresa rezultata'],8:[585,170,'Prekid?']};
const hw=48,hh=20;
function edge(a,b,off){const [x1,y1]=NODES[a],[x2,y2]=NODES[b];const dx=x2-x1,dy=y2-y1;const t=Math.min(hw/Math.abs(dx||1e-9),hh/Math.abs(dy||1e-9));
 let sx=x1+dx*t,sy=y1+dy*t,ex=x2-dx*t,ey=y2-dy*t;if(off){const L=Math.hypot(dx,dy),px=-dy/L*off,py=dx/L*off;sx+=px;sy+=py;ex+=px;ey+=py;}
 S('line',{x1:sx,y1:sy,x2:ex,y2:ey,class:'s-line','marker-end':'url(#cycArr)'},svg);}
[[1,2],[2,3],[3,4,5],[4,3,5],[4,5],[5,6],[6,7],[7,8],[8,9],[9,1],[8,'I']].forEach(e=>edge(e[0],e[1],e[2]||0));
S('path',{d:'M585 28 V10 H28 V148',class:'s-line','marker-end':'url(#cycArr)'},svg);
S('text',{x:300,y:22,'text-anchor':'middle',class:'s-tm'},svg,'posle obrade prekida → adresa sledeće instrukcije');
S('text',{x:320,y:112,'text-anchor':'middle',class:'s-tm'},svg,'pristup memoriji ↑   ·   unutar procesora ↓');
const R={};Object.keys(NODES).forEach(k=>{const [x,y,t]=NODES[k];const g=S('g',{},svg);R[k]={g:g,r:S('rect',{x:x-hw,y:y-hh,width:hw*2,height:hh*2,rx:8,class:'s-box'},g)};
 S('text',{x:x,y:y-4,'text-anchor':'middle',class:'s-th',style:'font-size:11px'},g,k==='I'?'!':k);S('text',{x:x,y:y+11,'text-anchor':'middle',class:'s-t',style:'font-size:10px'},g,t);});
const DESC={1:'Donošenje instrukcije: ARM ← S(BN), memorija pročita lokaciju, RN ← S(PRM). Ovo je pristup memoriji.',2:'Dekodiranje: dekoder čita opkod iz RN i odlučuje koje faze slede i koliko operanada ima.',3:'Izračunavanje adrese operanda iz adresnog dela instrukcije i načina adresiranja (Modul 4, deo 4.2).',4:'Donošenje operanda iz memorije: ARM ← adresa, PRM ← S(S(ARM)).',5:'Operacija nad podacima: ALU računa ili se podatak prebacuje u registar.',6:'Izračunavanje adrese na koju se upisuje rezultat.',7:'Upis rezultata u memoriju.',8:'Provera prekida: nijedan uređaj nije tražio pažnju, pa se ide dalje.',9:'Izračunavanje adrese sledeće instrukcije: obično BN + 1 (kod skoka nova adresa). Zatim sve ispočetka, faza 1.',I:'Obrada prekida: PC i PSW se čuvaju na stek, a u PC se upisuje adresa rutine iz tabele vektora prekida (Modul 4, deo 4.1).'};
const PROF={
load:{seq:[1,2,3,4,5,8,9],t:{1:'Uzima se instrukcija 0001 1000 (LOAD 8) sa adrese na koju pokazuje BN.',2:'Opkod 0001 = LOAD: treba jedan operand iz memorije, rezultat ide u akumulator.',3:'Adresni deo je 8, pa je adresa operanda 8 (direktno adresiranje).',4:'Čita se lokacija 8: u PRM stiže 20.',5:'AK ← S(PRM): akumulator dobija 20. Rezultat je u registru, pa faze 6 i 7 otpadaju.'}},
add:{seq:[1,2,3,4,5,8,9],t:{1:'Uzima se instrukcija 0011 1001 (ADD 9).',2:'Opkod 0011 = ADD: jedan operand iz memorije, drugi je u akumulatoru.',3:'Adresa operanda je 9.',4:'Čita se lokacija 9: u PRM stiže 60.',5:'ALU sabira: AK ← 20 + 60 = 80.'}},
store:{seq:[1,2,6,7,8,9],t:{1:'Uzima se instrukcija 0010 1010 (STORE 10).',2:'Opkod 0010 = STORE: nema ulaznog operanda iz memorije (podatak je već u AK), pa se faze 3–5 preskaču.',6:'Adresa rezultata je 10.',7:'Sadržaj AK (80) upisuje se na lokaciju 10. Ovo je pristup memoriji.'}},
halt:{seq:[1,2,8,9],t:{1:'Uzima se instrukcija 0111 0000 (HALT).',2:'Opkod 0111 = HALT: nema operanada ni rezultata, pa se sa faze 2 ide pravo na fazu 8.',9:'Program je završen; operativni sistem određuje koji program sledeći dobija procesor.'}},
mm:{seq:[1,2,3,4,3,4,5,6,7,8,9],i:{1:'Opkod kaže: dva operanda iz memorije i rezultat u memoriju (memorija–memorija, kao VAX).',2:'Adresa prvog operanda, B.',3:'Donesen operand B. Instrukcija ima još jedan operand, pa se vraća na fazu 3 (petlja „Multiple operands“ sa slajda).',4:'Adresa drugog operanda, C.',5:'Donesen operand C.',6:'ALU sabira B + C.',7:'Adresa rezultata, A.',8:'Rezultat se upisuje u memoriju na adresu A. Za ovu jednu instrukciju bila su tri pristupa memoriji za podatke.'}}};
let sp=-1;
function seq(){const p=PROF[$('cycSel').value];let s=p.seq.slice();if($('cycInt').checked){const k=s.lastIndexOf(8);s.splice(k+1,0,'I');}return s;}
function render(){const p=PROF[$('cycSel').value],s=seq();const used=new Set(s.map(String));const done=new Set(s.slice(0,Math.max(sp,0)).map(String));const cur=sp>=0?String(s[sp]):null;
 Object.keys(R).forEach(k=>{R[k].r.setAttribute('class',k===cur?'s-hot':done.has(k)?'s-done':'s-box');R[k].g.setAttribute('class',used.has(k)?'':'s-dim');});
 let txt;if(sp<0)txt='Izaberi instrukciju i klikni „Sledeća faza“. Faze ove instrukcije: '+s.map(x=>x==='I'?'prekid':x).join(' → ')+'.';
 else{const ph=s[sp];txt=(p.i&&p.i[sp])||(p.t&&p.t[ph])||DESC[ph];if(ph===8&&$('cycInt').checked)txt='Provera prekida: stigao je zahtev (npr. tastatura). Umesto direktno na sledeću instrukciju, ide se na obradu prekida.';txt=(ph==='I'?'Obrada prekida: ':'Faza '+ph+': ')+txt;}
 $('cycLog').textContent=txt;$('cycCount').textContent=sp<0?'':`korak ${sp+1} / ${s.length}`;$('cycNext').disabled=sp>=s.length-1;}
on('cycNext','click',()=>{sp++;render();});on('cycReset','click',()=>{sp=-1;render();});
on('cycSel','change',()=>{sp=-1;render();});on('cycInt','change',()=>{sp=-1;render();});render();}

/* ---- A = B + C na četiri načina ---- */
if($('fmtLab')){
const P={
'3':[['ADD A, B, C',{A:5},'A ← B + C = 2 + 3 = 5. Sve tri adrese su u jednoj instrukciji: najmanje instrukcija, ali je svaka dugačka.']],
'2':[['MOV A, B',{A:2},'A ← B = 2. Kopiramo B u A jer će ADD rezultat upisati preko svog prvog operanda.'],['ADD A, C',{A:5},'A ← A + C = 2 + 3 = 5.']],
'1':[['LOAD B',{AK:2},'AK ← B = 2. Drugi operand i rezultat su uvek u akumulatoru.'],['ADD C',{AK:5},'AK ← AK + C = 2 + 3 = 5.'],['STORE A',{A:5},'A ← AK = 5.']],
'0':[['PUSH B',{st:[2]},'Stavi B (2) na vrh steka.'],['PUSH C',{st:[2,3]},'Stavi C (3) na vrh steka.'],['ADD',{st:[5]},'ADD nema adresu: skine dva broja sa vrha (3 i 2), sabere ih i stavi 5 na vrh.'],['POP A',{st:[],A:5},'Skini vrh steka (5) i upiši ga u A. Stek je opet prazan.']]};
let sp=-1,st;
function init(){st={A:'?',B:2,C:3,AK:'–',st:[]};}
function render(ch){const f=$('fmtSel').value,pr=P[f];
 $('fmtProg').innerHTML=pr.map((x,i)=>`<div class="${i===sp?'hit':(i===sp+1?'pc':'')}"><span class="a">${i+1}.</span><span>${x[0]}</span></div>`).join('');
 const v=k=>`<span class="${ch&&k in ch?'ch':''}">${k} = ${st[k]}</span>`;
 let h=`<div class="kv">${v('A')}<br>${v('B')}<br>${v('C')}`;if(f==='1')h+='<br>'+v('AK');h+='</div>';
 if(f==='0')h+='<div style="margin-top:6px;font-size:.8rem;color:var(--muted)">Stek (vrh je gore):</div><div class="stk">'+(st.st.length?st.st.map(x=>`<div>${x}</div>`).join(''):'<span style="color:var(--muted);font-size:.8rem">prazan</span>')+'</div>';
 $('fmtState').innerHTML=h;
 $('fmtLog').textContent=sp<0?`Početak: B = 2, C = 3. Program ima ${pr.length} ${pr.length===1?'instrukciju':'instrukcije'}.`:pr[sp][2]+(sp===pr.length-1?` Gotovo: ${pr.length} ${pr.length===1?'instrukcija':'instrukcije'}. Uporedi sa ostalim formatima.`:'');
 $('fmtNext').disabled=sp>=pr.length-1;}
on('fmtNext','click',()=>{const pr=P[$('fmtSel').value];if(sp<pr.length-1){sp++;const ch=pr[sp][1];Object.assign(st,JSON.parse(JSON.stringify(ch)));render(ch);}});
const rs=()=>{sp=-1;init();render();};on('fmtReset','click',rs);on('fmtSel','change',rs);rs();}

/* ---- keš ---- */
if($('cacheLab')){
let lines,hits,miss,trail;
const blk=(tag,i)=>`${tag*32+i*4}–${tag*32+i*4+3}`;
function reset(){lines=Array.from({length:8},()=>({v:0,tag:0}));hits=0;miss=0;trail=[];render(null);}
function bits(a){const b=a.toString(2).padStart(8,'0');return [0,1,2].map(i=>`<span class="tg">${b[i]}</span>`).join('')+'<span class="gap"></span>'+[3,4,5].map(i=>`<span class="ix">${b[i]}</span>`).join('')+'<span class="gap"></span>'+[6,7].map(i=>`<span class="of">${b[i]}</span>`).join('');}
function access(a){const tag=a>>5,idx=(a>>2)&7,off=a&3,L=lines[idx],hit=!!(L.v&&L.tag===tag);let msg;
 if(hit){hits++;msg=`Adresa ${a}: tag ${tag}, linija ${idx}, bajt ${off}. Linija ${idx} je popunjena i ima isti tag ${tag}: POGODAK.`;}
 else{miss++;const old=L.v?` Iz linije je izbačen blok ${blk(L.tag,idx)} (tag ${L.tag}).`:'';msg=`Adresa ${a}: tag ${tag}, linija ${idx}, bajt ${off}. ${L.v?'Linija ima drugi tag':'Linija je prazna'}: PROMAŠAJ. Iz RAM-a se donosi ceo blok ${blk(tag,idx)}.${old}`;L.v=1;L.tag=tag;}
 trail.push(a+(hit?' ✓':' ✗'));render({a:a,idx:idx,hit:hit,msg:msg});}
function render(last){
 $('cacheBits').innerHTML=last?bits(last.a)+`<span class="gap"></span><span style="border:0;padding:3px 4px">tag ${last.a>>5} · linija ${last.idx} · bajt ${last.a&3}</span>`:'';
 let h='<table><tr><th class="num">Linija</th><th>Valid</th><th class="num">Tag</th><th>Blok u liniji (adrese)</th></tr>';
 lines.forEach((L,i)=>{const c=last&&last.idx===i?(last.hit?' class="hit cur"':' class="miss cur"'):'';h+=`<tr${c}><td class="num">${i} (${i.toString(2).padStart(3,'0')})</td><td>${L.v}</td><td class="num">${L.v?L.tag+' ('+L.tag.toString(2).padStart(3,'0')+')':'–'}</td><td>${L.v?blk(L.tag,i):'prazno'}</td></tr>`;});
 $('cacheTbl').innerHTML=h+'</table>';const tot=hits+miss;
 $('cacheLog').innerHTML=(last?'<b>'+last.msg+'</b><br>':'')+`Pogodaka: ${hits}, promašaja: ${miss}`+(tot?`, procenat pogodaka: ${fmt(100*hits/tot,0)}%`:'')+(trail.length?'<br>Istorija: '+trail.slice(-16).join(' · '):'');}
on('cacheGo','click',()=>{const a=parseInt($('cacheIn').value,10);if(a>=0&&a<=255)access(a);else $('cacheLog').textContent='Adresa mora biti od 0 do 255.';});
on('cacheReset','click',reset);
document.querySelectorAll('#cacheLab [data-seq]').forEach(b=>b.addEventListener('click',()=>{reset();b.dataset.seq.split(',').map(Number).forEach(access);}));
reset();}

/* ---- magistrala, takt po takt ---- */
if($('busLab')){
const svg=$('busSvg');arrowDefs(svg,'busArr');
const box=(x,y,w,h,t,id,big)=>{const g=S('g',{},svg);const r=S('rect',{x:x,y:y,width:w,height:h,rx:big?12:6,class:'s-box'},g);S('text',{x:x+w/2,y:big?y+20:y+h/2+4,'text-anchor':'middle',class:big?'s-th':'s-t',style:big?'':'font-size:11.5px'},g,t);if(id)E[id]=r;return r;};
const E={};
box(10,10,190,240,'CPU',null,true);box(440,10,190,240,'MEMORIJA',null,true);
box(30,50,150,36,'MAR (ARM): adresa','rMAR');box(30,110,150,36,'Upravljačka jedinica','rCU');box(30,170,150,36,'MBR (PRM) → IR','rMBR');
box(460,50,150,36,'Dekoder adrese','mDEC');box(460,110,150,36,'Kontroler memorije','mCTL');box(460,170,150,36,'Ćelija: podatak','mDAT');
const wire=(y,id,lab)=>{E[id]=S('line',{x1:180,x2:460,y1:y,y2:y,class:'s-wire'},svg);S('text',{x:320,y:y-8,'text-anchor':'middle',class:'s-tm'},svg,lab);};
wire(68,'bA','adresna magistrala');wire(128,'bC','upravljačka magistrala');wire(188,'bD','magistrala podataka');
const sigT=S('text',{x:320,y:148,'text-anchor':'middle',class:'s-th'},svg,'');
const BASE1=[{t:'T1',on:['bA','rMAR','mDEC'],txt:'T1: CPU stavlja adresu iz MAR (ARM) na adresnu magistralu. Dekoder memorije počinje da traži ćeliju sa tom adresom.'},
 {t:'T2',on:['bC','rCU','mCTL'],sig:'RD →',txt:'T2: upravljačka jedinica šalje signal RD (čitaj) preko upravljačke magistrale. Memorija je dovoljno brza i odmah odgovara sa READY = 1.'}];
const WAIT=[{t:'tw',on:['bC','mCTL','rCU'],sig:'← READY = 0',txt:'Stanje čekanja (wait state): READY je još 0, memorija nije gotova. CPU ceo takt samo čeka.'},
 {t:'tw',on:['bC','mCTL','rCU'],sig:'← READY = 1',txt:'Još jedno stanje čekanja. Na kraju ovog takta memorija javlja READY = 1.'}];
const BASE2=[{t:'T3',on:['bD','mDAT'],txt:'T3: memorija stavlja sadržaj ćelije (instrukciju ili podatak) na magistralu podataka.'},
 {t:'T4',on:['bD','rMBR'],txt:'T4: CPU upisuje ono što je na magistrali u MBR (PRM), a odatle u IR ako je u pitanju instrukcija. Čitanje je završeno.'}];
let sp=-1;
const steps=()=>$('busWait').checked?BASE1.concat(WAIT,BASE2):BASE1.concat(BASE2);
function render(){const s=steps(),st=sp>=0?s[sp]:null;
 Object.keys(E).forEach(k=>{const on=st&&st.on.includes(k);if(k[0]==='b')E[k].setAttribute('class','s-wire'+(on?' on':''));else E[k].setAttribute('class',on?'s-hot':'s-box');});
 sigT.textContent=st&&st.sig?st.sig:'';
 $('busLog').textContent=st?st.txt:`Klikni „Sledeći takt“. Čitanje traje ${s.length} takta${$('busWait').checked?' (4 + 2 stanja čekanja)':''}.`;
 $('busCount').textContent=st?`takt ${sp+1} / ${s.length} (${st.t})`:'';$('busNext').disabled=sp>=s.length-1;}
on('busNext','click',()=>{sp++;render();});on('busReset','click',()=>{sp=-1;render();});on('busWait','change',()=>{sp=-1;render();});render();}

/* ---- prekid sa stekom ---- */
if($('intLab')){
const MEMROWS=[['0009','3000  (vektor prekida 9)'],['0120','ADD R1, R2'],['0121','SUB R3, R1'],['0400','stek'],['0401','stek'],['0402','stek'],['3000','IN AL, tastatura  (rutina)'],['3001','…'],['3002','IRET']];
const U='korisnički, prekidi dozvoljeni',P='privilegovani, prekidi zabranjeni';
const ST=[
 {PC:'0121',PSW:U,SP:'0400',s:{},cur:'0120',t:'CPU izvršava ADD R1, R2 sa adrese 0120. PC već pokazuje na sledeću instrukciju (0121). Usred izvršavanja tastatura šalje zahtev za prekid broj 9.'},
 {PC:'0121',PSW:U,SP:'0400',s:{},cur:'0120',t:'ADD se završava do kraja (prekid ne prekida instrukciju u pola). U fazi 8 procesor vidi zahtev za prekid.'},
 {PC:'0121',PSW:U,SP:'0400',s:{'0400':'PC = 0121'},cur:'0400',ch:'0400',t:'MAR ← SP (0400), MBR ← PC, upis: adresa povratka 0121 je sačuvana na vrhu steka.'},
 {PC:'0121',PSW:U,SP:'0402',s:{'0400':'PC = 0121','0401':'PSW (korisnički)'},cur:'0401',ch:'0401',chR:'SP',t:'MAR ← SP ← SP + 1 (0401), MBR ← PSW, upis: sačuvan je i PSW. Zatim SP ← SP + 1 = 0402, novi vrh steka.'},
 {PC:'0121',PSW:P,SP:'0402',s:{'0400':'PC = 0121','0401':'PSW (korisnički)'},cur:null,chR:'PSW',t:'PSW ← privileged & disable: procesor prelazi u privilegovani režim (režim operativnog sistema) i zabranjuje nove prekide dok ne sačuva sve što treba.'},
 {PC:'3000',PSW:P,SP:'0402',s:{'0400':'PC = 0121','0401':'PSW (korisnički)'},cur:'0009',chR:'PC',t:'MAR ← broj prekida (9). Na adresi 0009 u tabeli vektora piše 3000, i to ide u PC. Adresa se ne prevodi kroz MMU („No address translation!“).'},
 {PC:'3002',PSW:P,SP:'0402',s:{'0400':'PC = 0121','0401':'PSW (korisnički)'},cur:'3000',t:'Izvršava se rutina za obradu prekida: čita pritisnut taster iz kontrolera tastature i smešta ga u bafer operativnog sistema.'},
 {PC:'0121',PSW:U,SP:'0400',s:{},cur:'3002',chR:'PC',t:'IRET (povratak iz prekida): sa steka se skida PSW (procesor se vraća u korisnički režim, prekidi ponovo dozvoljeni), pa PC = 0121. SP se vraća na 0400.'},
 {PC:'0122',PSW:U,SP:'0400',s:{},cur:'0121',t:'Program nastavlja sa SUB R3, R1 na adresi 0121, kao da se ništa nije desilo. On uopšte „ne zna“ da je bio prekinut.'}];
let sp=0;
function render(){const s=ST[sp];
 $('intMem').innerHTML=MEMROWS.map(([a,v])=>{let val=v,cls='';if(a>='0400'&&a<='0402'){val=s.s[a]||'';cls=s.s[a]?'stack':'';if(a===s.SP)val+=(val?'  ':'')+'← SP';}if(a===s.cur)cls='cur';return `<div class="${cls}"><span class="a">${a}:</span><span>${val||'&nbsp;'}</span></div>`;}).join('');
 const set=(id,v,k)=>{const r=$(id);r.querySelector('b').textContent=v;r.classList.toggle('flash',s.chR===k);};
 set('iPC',s.PC,'PC');set('iPSW',s.PSW,'PSW');set('iSP',s.SP,'SP');
 $('intLog').textContent=s.t;$('intCount').textContent=`korak ${sp+1} / ${ST.length}`;$('intNext').disabled=sp>=ST.length-1;}
on('intNext','click',()=>{if(sp<ST.length-1){sp++;render();}});on('intReset','click',()=>{sp=0;render();});render();}

/* ---- RAX ---- */
if($('regLab')){
function reg(){const raw=$('regIn').value.trim().replace(/^0x/i,''),out=$('regOut');
 if(!/^[0-9a-fA-F]{1,16}$/.test(raw)){out.innerHTML='<p class="score">Upiši do 16 heksadecimalnih cifara.</p>';return;}
 const h=raw.toUpperCase().padStart(16,'0');
 const rows=[['RAX',64,h],['EAX',32,h.slice(8)],['AX',16,h.slice(12)],['AH',8,h.slice(12,14)],['AL',8,h.slice(14)]];
 out.innerHTML='<table><tr><th>Registar</th><th class="num">Bita</th><th class="num">Heksadecimalno</th><th class="num">Dekadno</th></tr>'+rows.map(([n,b,v])=>`<tr><td><b>${n}</b></td><td class="num">${b}</td><td class="num">0x${v}</td><td class="num">${BigInt('0x'+v).toLocaleString('sr-Latn')}</td></tr>`).join('')+'</table>';}
on('regIn','input',reg);reg();}

/* ---- ASCII / Unicode ---- */
if($('ascLab')){
const enc=('TextEncoder' in window)?new TextEncoder():null;
function asc(){const t=$('ascIn').value,out=$('ascOut');const ch=Array.from(t);
 if(!ch.length){out.innerHTML='<p class="score">Upiši neki tekst.</p>';return;}
 out.innerHTML='<table><tr><th>Znak</th><th class="num">Kod (dekadno)</th><th class="num">Hex</th><th class="num">Binarno</th><th>UTF-8 bajtovi</th></tr>'+ch.map(c=>{const cp=c.codePointAt(0);const by=enc?Array.from(enc.encode(c)).map(x=>x.toString(16).toUpperCase().padStart(2,'0')).join(' '):'';
  return `<tr><td>${c===' '?'razmak':c.replace(/[&<>]/g,'?')}</td><td class="num">${cp}</td><td class="num">${(cp<128?'':'U+')+cp.toString(16).toUpperCase().padStart(cp<128?2:4,'0')}</td><td class="num">${cp<128?cp.toString(2).padStart(8,'0'):'–'}</td><td>${by}${cp<128?' (ASCII, 1 bajt)':' ('+(by.split(' ').length)+' bajta, nije ASCII)'}</td></tr>`;}).join('')+'</table>';}
on('ascIn','input',asc);asc();}

/* ======== v4 ======== */
/* ---- Amdal: trake vremena ---- */
if($('amdBars')){
function bars(){const f=parseFloat($('fR').value),n=parseInt($('nR').value,10),s=1-f,t=s+f/n;
 const row=(lab,a,b,tot)=>`<div class="tbar"><span>${lab}</span><div class="tr"><div class="sq" style="width:${(a*100).toFixed(2)}%"></div><div class="pp" style="width:${(b*100).toFixed(2)}%"></div></div><span class="vl">${fmt(tot*100,0)}%</span></div>`;
 $('amdBars').innerHTML=row('1 jezgro',s,f,1)+row(n+(n===1?' jezgro':(n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?' jezgra':' jezgara')),s,f/n,t)+`<p class="score" style="margin:4px 0 0">Vreme pada sa 100% na ${fmt(t*100,1)}%, pa je ubrzanje 1 / ${fmt(t,3)} = ${fmt(1/t)}. Narandžasti deo se nikad ne smanjuje.</p>`;}
['fR','nR'].forEach(i=>on(i,'input',bars));bars();}

/* ---- adresiranje: crtež puta do operanda ---- */
if($('adrSvg')){
const svg=$('adrSvg');arrowDefs(svg,'adrArr');
const OPT={imm:'LOAD R1, #1000',dreg:'LOAD R1, R2',dmem:'LOAD R1, 1000',ireg:'LOAD R1, (R2)',imem:'LOAD R1, (1000)',idx:'LOAD R1, 1000[IR]',base:'LOAD R1, 24[BR]',bidx:'LOAD R1, 20[BR][IR]'};
const MY={1000:40,1003:80,1023:120,1024:160},MV={1000:1024,1003:55,1023:91,1024:20},RY={R2:125,IR:150,BR:175},RV={R2:1024,IR:3,BR:1000};
const AX=330,AY=110;
function draw(){const m=$('adrSel').value;svg.innerHTML='';arrowDefs(svg,'adrArr');
 const hot=new Set(),fin=new Set();
 const P={imm:[],dreg:[['i','R2']],dmem:[['i','m1000']],ireg:[['i','R2'],['R2','m1024']],imem:[['i','m1000'],['m1000','m1024']],idx:[['i','add'],['IR','add'],['add','m1003']],base:[['BR','add'],['i','add'],['add','m1024']],bidx:[['BR','add'],['i','add'],['IR','add'],['add','m1023']]}[m];
 const FIN={imm:'i',dreg:'R2',dmem:'m1000',ireg:'m1024',imem:'m1024',idx:'m1003',base:'m1024',bidx:'m1023'}[m];
 P.forEach(([a,b])=>{hot.add(a);hot.add(b);});fin.add(FIN);
 const cls=k=>fin.has(k)?'s-hot':hot.has(k)?'s-done':'s-box';
 S('text',{x:10,y:14,class:'s-tm'},svg,'Instrukcija');
 S('rect',{x:10,y:20,width:220,height:44,rx:6,class:cls('i')},svg);S('text',{x:120,y:47,'text-anchor':'middle',class:'s-th',style:'font-family:var(--f-mono)'},svg,OPT[m]);
 S('text',{x:10,y:94,class:'s-tm'},svg,'Registri');
 Object.keys(RY).forEach(r=>{S('rect',{x:10,y:RY[r]-12,width:220,height:24,rx:4,class:cls(r)},svg);S('text',{x:20,y:RY[r]+4,class:'s-t',style:'font-family:var(--f-mono)'},svg,`${r} = ${RV[r]}`);});
 S('text',{x:440,y:14,class:'s-tm'},svg,'Memorija');
 Object.keys(MY).forEach(a=>{S('rect',{x:440,y:MY[a]-17,width:200,height:34,rx:4,class:cls('m'+a)},svg);S('text',{x:452,y:MY[a]+5,class:'s-t',style:'font-family:var(--f-mono)'},svg,`[${a}] = ${MV[a]}`);});
 if(P.some(p=>p[1]==='add')){S('circle',{cx:AX,cy:AY,r:17,class:cls('add')},svg);S('text',{x:AX,y:AY+6,'text-anchor':'middle',class:'s-th',style:'font-size:18px'},svg,'+');}
 const pt=(k,role)=>{if(k==='i')return role==='from'?[230,42]:[230,42];if(k==='add')return role==='from'?[AX+17,AY]:[AX-17,AY];if(k[0]==='m')return [440,MY[k.slice(1)]];return [230,RY[k]];};
 P.forEach(([a,b],i)=>{let d;
  if(a==='i'&&b==='R2')d=`M120 64 V${RY.R2-13}`;
  else if(a==='m1000'&&b==='m1024')d='M640 40 C676 40 676 160 642 160';
  else{const [x1,y1]=pt(a,'from'),[x2,y2]=pt(b,'to');d=`M${x1} ${y1} L${x2-2} ${y2}`;}
  const p=S('path',{d:d,class:'s-aline adr-draw','marker-end':'url(#adrArr)',pathLength:'1',style:`animation-delay:${i*0.35}s`},svg);
 });
 if(m==='imm')S('text',{x:250,y:47,class:'s-tm'},svg,'← operand je već u instrukciji, memorija se ne čita');}
on('adrSel','change',draw);draw();}

/* ---- v6 Modul 2: rešavač Amdalovih zadataka ---- */
if($('amdSolve')){
let mode='S';
const num=id=>{const v=parseFloat(String($(id).value).trim().replace(',','.'));return isFinite(v)?v:NaN;};
const n3=x=>fmt(x,3).replace(/0+$/,'').replace(/,$/,'');
function solve(){const o=$('asOut');$('asLf').hidden=mode==='f';$('asLF').hidden=mode==='F';$('asLS').hidden=mode==='S';
 const f=num('asf'),F=num('asF'),S=num('asS');
 if(mode==='S'){
  if(!(f>=0&&f<=1)){o.textContent='f mora biti između 0 i 1 (npr. 0,75 za 75%).';return;}
  if(!(F>0)){o.textContent='F mora biti pozitivan broj (koliko puta je deo brži).';return;}
  const d=(1-f)+f/F,s=1/d;
  o.innerHTML=`1) Formula: S = 1 / ((1 − f) + f/F)<br>2) Zamena: S = 1 / ((1 − ${n3(f)}) + ${n3(f)}/${n3(F)})<br>3) Imenilac: ${n3(1-f)} + ${n3(f/F)} = ${n3(d)}<br>4) S = 1 / ${n3(d)} = <b>${n3(s)}</b>`+(f<1?` &nbsp;(najviše moguće, kad F → ∞: 1/(1 − f) = ${n3(1/(1-f))})`:'');
 }else if(mode==='f'){
  if(!(S>=1)){o.textContent='Željeno ubrzanje S mora biti bar 1.';return;}
  if(!(F>1)){o.textContent='F mora biti veće od 1, inače nema ubrzanja.';return;}
  const fx=(1-1/S)/(1-1/F);
  let t=`1) Zamena: ${n3(S)} = 1 / ((1 − f) + f/${n3(F)})<br>2) Okreni obe strane: (1 − f) + f/${n3(F)} = 1/${n3(S)} = ${n3(1/S)}<br>3) Sredi: 1 − f·(1 − 1/${n3(F)}) = ${n3(1/S)} &nbsp;→&nbsp; f·${n3(1-1/F)} = ${n3(1-1/S)}<br>4) f = ${n3(1-1/S)} / ${n3(1-1/F)} = <b>${n3(fx)}</b>`;
  if(fx>1)t+=`<br>f ispada veće od 1, dakle <b>nemoguće</b>: i kad bi ceo program bio ubrzan ${n3(F)} puta, S bi bio samo ${n3(F)}.`;else t+=` = ${fmt(fx*100,1)}% vremena`;
  o.innerHTML=t;
 }else{
  if(!(f>0&&f<=1)){o.textContent='f mora biti između 0 i 1.';return;}
  if(!(S>=1)){o.textContent='Željeno ubrzanje S mora biti bar 1.';return;}
  const den=1/S-(1-f);
  let t=`1) Zamena: ${n3(S)} = 1 / ((1 − ${n3(f)}) + ${n3(f)}/F)<br>2) Okreni: ${n3(1-f)} + ${n3(f)}/F = ${n3(1/S)}<br>3) ${n3(f)}/F = ${n3(1/S)} − ${n3(1-f)} = ${n3(den)}`;
  if(den<=0)t+=`<br>Desna strana nije pozitivna, dakle <b>nemoguće</b>: najveće ubrzanje za f = ${n3(f)} je 1/(1 − f) = ${f<1?n3(1/(1-f)):'∞'}.`;
  else t+=`<br>4) F = ${n3(f)} / ${n3(den)} = <b>${n3(f/den)}</b>`;
  o.innerHTML=t;}
}
document.querySelectorAll('#asMode button').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.m;document.querySelectorAll('#asMode button').forEach(x=>x.classList.toggle('on',x===b));
 if(mode==='S'){$('asf').value='0,1';$('asF').value='2';}else if(mode==='f'){$('asS').value='2';$('asF').value='4';}else{$('asf').value='0,75';$('asS').value='2';}solve();}));
['asf','asF','asS'].forEach(id=>on(id,'input',solve));solve();}

/* ---- v5 M3: asembler sa dva prolaza ---- */
if($('asmLab')){
const PR=[['LOAD B','ADD C','STORE A','HALT'],['LOAD X','SUB Y','STORE Z','HALT'],['LOAD A','ADD B','MUL C','STORE P','HALT'],['LOAD A','ADD B','ADD C','STORE S','HALT']];
const OP={CLR:'0000',LOAD:'0001',STORE:'0010',ADD:'0011',SUB:'0100',MUL:'0101',DIV:'0110',HALT:'0111'};
const b4=n=>n.toString(2).padStart(4,'0');
let k=0,steps=[];
function build(){const p=PR[+$('asmSel').value];steps=[];
 const st={phase:'Početak',cur:-1,sym:[],out:p.map(()=>''),bl:0,log:'Brojač lokacija BL = 0. Tabela simbola je prazna. Klikni „Sledeći korak“.'};
 const snap=()=>steps.push(JSON.parse(JSON.stringify(st)));snap();
 p.forEach((ins,i)=>{const [op,s]=ins.split(' ');st.phase='Prvi prolaz';st.cur=i;
  let msg=`Instrukcija ${i} (BL = ${i}): <b>${ins}</b>. Opkod ${op} iz tabele instrukcija je <code>${OP[op]}</code>.`;
  if(s){if(!st.sym.find(x=>x.n===s)){st.sym.push({n:s,a:null});msg+=` Simbol <b>${s}</b> nije u tabeli simbola, pa se upisuje (još bez adrese).`;}else msg+=` Simbol <b>${s}</b> je već u tabeli.`;
   st.out[i]=OP[op]+' '+s;}else{st.out[i]=OP[op]+' 0000';msg+=' HALT nema adresni deo.';}
  st.bl=i+1;msg+=` Instrukcija je prepisana u binarno-simboličkom obliku; BL := ${st.bl}.`;st.log=msg;snap();});
 st.sym.forEach(sy=>{st.phase='Međufaza';st.cur=-1;sy.a=st.bl;st.log=`Simbol <b>${sy.n}</b> dobija prvu slobodnu adresu iza programa: BL = ${st.bl} = <code>${b4(st.bl)}</code>. BL := ${st.bl+1}.`;st.bl++;snap();});
 p.forEach((ins,i)=>{const [op,s]=ins.split(' ');st.phase='Drugi prolaz';st.cur=i;
  if(s){const a=st.sym.find(x=>x.n===s).a;st.out[i]=OP[op]+' '+b4(a);st.log=`Instrukcija ${i}: simbol <b>${s}</b> se iz tabele simbola zamenjuje fizičkom adresom ${a} = <code>${b4(a)}</code>. Rezultat: <code>${st.out[i]}</code>.`;}
  else st.log=`Instrukcija ${i}: HALT nema simboličku adresu, ostaje <code>${st.out[i]}</code>.`;
  if(i===p.length-1)st.log+=' <b>Prevođenje je gotovo:</b> ceo program je binaran i može da se učita u memoriju.';snap();});
 k=0;draw();}
function draw(){const s=steps[k],p=PR[+$('asmSel').value];
 $('asmSrc').innerHTML=p.map((x,i)=>`<div class="${i===s.cur?'cur':''}"><span class="a">${i}</span>${x}</div>`).join('');
 $('asmSym').innerHTML=s.sym.length?s.sym.map(x=>`<div class="${s.phase==='Međufaza'&&x.a===s.bl-1?'hit':''}"><span class="a">${x.n}</span>${x.a===null?'?':x.a+' = '+b4(x.a)}</div>`).join(''):'<div><span class="a">–</span>prazna</div>';
 $('asmOut').innerHTML=p.map((x,i)=>`<div class="${i===s.cur?'hit':''}"><span class="a">${i}</span>${s.out[i]||'&nbsp;'}</div>`).join('');
 $('asmLog').innerHTML=`<b>${s.phase}.</b> `+s.log;$('asmCount').textContent=`Korak ${k} od ${steps.length-1}`;
 $('asmNext').textContent=k<steps.length-1?'Sledeći korak':'Ispočetka ↺';}
on('asmNext','click',()=>{k=k<steps.length-1?k+1:0;draw();});
on('asmReset','click',()=>{k=0;draw();});
on('asmSel','change',build);
build();}


/* ---- v5 M4: prepoznaj način adresiranja ---- */
if($('admLab')){
const M=[['imm','Trenutno'],['dreg','Dir. registarsko'],['dmem','Dir. memorijsko'],['ireg','Ind. registarsko'],['imem','Ind. memorijsko'],['idx','Indeksno'],['base','Bazno'],['bidx','Bazno + indeksno']];
const N=Object.fromEntries(M);
const A=[
['MOV AX, 2000','imm','Broj bez zagrada je kod Intela trenutna vrednost: AX dobija broj 2000, a ne sadržaj adrese 2000.'],
['MOV AX, [2000]','dmem','Uglaste zagrade sa brojem: 2000 je adresa, AX dobija sadržaj te lokacije. Jedan pristup memoriji.'],
['ADD AL, BL','dreg','Oba operanda su u registrima, memorija se ne koristi.'],
['MOV AL, [BX]','ireg','U BX je adresa operanda, kao pokazivač u C-u. Jedan pristup memoriji, jer je adresa već u registru.'],
['LOAD R1, (1005)','imem','Na adresi 1005 piše adresa operanda: dva čitanja memorije (slajd 15).'],
['ADD AL, [SI+2000]','idx','Naš primer iz celog modula: konstanta 2000 je početak niza, SI je redni broj elementa.'],
['MOV AX, [BP+6]','base','BP je bazni registar (početak okvira na steku), 6 je fiksni pomeraj u odnosu na njega.'],
['ADD AX, [BX+SI]','bidx','BX je bazni, SI indeksni registar (primer sa slajda 27).'],
['ADD CL, 44H','imm','44H je heksadecimalna konstanta zapisana u samoj instrukciji.'],
['ADD CL, TEMP','dmem','TEMP je simboličko ime promenljive; asembler ga zamenjuje njenom adresom (slajd 45).']];
const list=$('admList'),sc=$('admScore');let ok=0,done=0;
function build(){list.innerHTML='';ok=0;done=0;
 A.forEach(([t,v,w])=>{const it=document.createElement('div');it.className='it';
  it.innerHTML=`<span><code>${t}</code></span><div class="bt">${M.map(([k,n])=>`<button type="button" data-v="${k}">${n}</button>`).join('')}</div><div class="why" hidden></div>`;
  it.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{const right=b.dataset.v===v;done++;if(right)ok++;
   it.querySelectorAll('button').forEach(x=>{x.disabled=true;if(x===b)x.classList.add('pick',right?'right':'wrong');else if(x.dataset.v===v)x.classList.add('pick','right');});
   it.classList.add(right?'ok':'no');const wy=it.querySelector('.why');wy.hidden=false;
   wy.textContent=(right?'Tačno. ':'Nije, ovo je '+N[v].toLowerCase()+'. ')+w;score();}));
  list.appendChild(it);});score();}
function score(){sc.innerHTML=done<A.length?`Odgovoreno ${done} od ${A.length}, tačno ${ok}.`:`Gotovo: tačno <b>${ok} od ${A.length}</b>. <button type="button" class="btn ghost" id="admAgain">Ponovi</button>`;
 const r=$('admAgain');if(r)r.addEventListener('click',build);}
build();}


/* ---------- planer procesora (o3) ---------- */
if($('schedLab')){
const parse=()=>$('schedIn').value.trim().split(/\n+/).map(l=>l.trim().split(/[\s,;]+/)).filter(a=>a.length>=3&&a[0]).map(([n,a,b,pr],i)=>({n:n,a:+a.replace(',','.')||0,b:+b.replace(',','.'),pr:pr===undefined?0:+pr,i:i})).filter(p=>p.b>0);
function sim(ps,alg,q){const segs=[];let t=0;const rem=ps.map(p=>p.b),done=ps.map(()=>null),first=ps.map(()=>null);
 const push=(id,s,e)=>{if(e<=s)return;const L=segs[segs.length-1];if(L&&L.id===id&&L.e===s)L.e=e;else segs.push({id,s,e});if(first[id]===null)first[id]=s;};
 const arrived=x=>ps.filter(p=>p.a<=x+1e-9&&rem[p.i]>1e-9);
 if(alg==='rr'){const qu=[];const order=ps.slice().sort((x,y)=>x.a-y.a||x.i-y.i);let k=0;const admit=x=>{while(k<order.length&&order[k].a<=x+1e-9)qu.push(order[k++].i);};admit(t);
  while(k<order.length||qu.length){if(!qu.length){t=order[k].a;admit(t);continue;}const id=qu.shift();const r=Math.min(q,rem[id]);push(id,t,t+r);t+=r;rem[id]-=r;admit(t);if(rem[id]>1e-9)qu.push(id);else done[id]=t;}}
 else if(alg==='srtf'){let guard=0;while(ps.some(p=>rem[p.i]>1e-9)&&guard++<10000){const av=arrived(t);if(!av.length){t=Math.min(...ps.filter(p=>rem[p.i]>1e-9).map(p=>p.a));continue;}
  av.sort((x,y)=>rem[x.i]-rem[y.i]||x.a-y.a||x.i-y.i);const p=av[0];const nextA=ps.filter(z=>z.a>t+1e-9).map(z=>z.a);const until=Math.min(t+rem[p.i],...(nextA.length?nextA:[Infinity]));push(p.i,t,until);rem[p.i]-=until-t;t=until;if(rem[p.i]<=1e-9)done[p.i]=t;}}
 else{while(ps.some(p=>rem[p.i]>1e-9)){const av=arrived(t);if(!av.length){t=Math.min(...ps.filter(p=>rem[p.i]>1e-9).map(p=>p.a));continue;}
  av.sort(alg==='fcfs'?(x,y)=>x.a-y.a||x.i-y.i:alg==='sjf'?(x,y)=>x.b-y.b||x.a-y.a||x.i-y.i:(x,y)=>x.pr-y.pr||x.a-y.a||x.i-y.i);const p=av[0];push(p.i,t,t+p.b);t+=p.b;rem[p.i]=0;done[p.i]=t;}}
 return {segs,done,first};}
function run(){const ps=parse();const out=$('schedOut'),g=$('schedGantt');if(!ps.length){out.textContent='Upiši bar jedan proces: ime dolazak trajanje [prioritet].';g.innerHTML='';return;}
 const alg=$('schedAlg').value,q=Math.max(1,+$('schedQ').value||1);const {segs,done,first}=sim(ps,alg,q);const T=segs.length?segs[segs.length-1].e:1;
 g.innerHTML='<div class="gbar">'+segs.map(s=>`<span style="flex:${s.e-s.s}" class="gc${s.id%6}"><b>${esc(ps[s.id].n)}</b></span>`).join('')+'</div><div class="gax">'+[0].concat(segs.map(s=>s.e)).filter((v,i,a)=>a.indexOf(v)===i).map(v=>`<i style="left:${(v/T*100).toFixed(2)}%">${fmt(v,v%1?1:0)}</i>`).join('')+'</div>';
 let sw=0,st=0,sr=0;const rows=ps.map(p=>{const ta=done[p.i]-p.a,w=ta-p.b,r=first[p.i]-p.a;sw+=w;st+=ta;sr+=r;return `<tr><td>${esc(p.n)}</td><td>${fmt(p.a,p.a%1?1:0)}</td><td>${fmt(p.b,p.b%1?1:0)}</td><td>${fmt(done[p.i],done[p.i]%1?1:0)}</td><td>${fmt(w,w%1?1:0)}</td><td>${fmt(ta,ta%1?1:0)}</td><td>${fmt(r,r%1?1:0)}</td></tr>`;}).join('');
 const n=ps.length;out.innerHTML=`<div class="tbl"><table><thead><tr><th>Proces</th><th>Dolazak</th><th>Trajanje</th><th>Završetak</th><th>Čekanje</th><th>U sistemu</th><th>Odziv</th></tr></thead><tbody>${rows}</tbody></table></div><p class="score">Prosečno vreme čekanja: <b>${fmt(sw/n)}</b> · prosečno vreme u sistemu: <b>${fmt(st/n)}</b> · prosečan odziv: <b>${fmt(sr/n)}</b></p>`;
 $('schedQ').parentNode.style.display=alg==='rr'?'':'none';}
on('schedRun','click',run);on('schedAlg','change',run);on('schedQ','input',run);
on('schedEx','click',()=>{$('schedIn').value='P1 0 53\nP2 0 17\nP3 0 68\nP4 0 24';$('schedAlg').value='rr';$('schedQ').value=20;run();});
run();}

/* ---------- stanje trke (o4) ---------- */
if($('raceLab')){
const SP=['LOAD N','ADD JEDAN','STORE N'],RP=['LOAD N','SUB JEDAN','STORE N'];let st;
function reset(){st={N:4,buf:4,s:0,r:0,aS:null,aR:null,log:['Početak: N = 4, u baferu 4 poruke. Pre svog LOAD-a S upisuje novu poruku u bafer, a R uzima jednu iz bafera.']};draw();}
function draw(){const row=(P,k,acc)=>P.map((x,i)=>`<div class="${i===k?'cur':i<k?'done':''}"><span class="a">${i+1}:</span><span>${x}</span></div>`).join('')+`<div><span class="a">AK:</span><span>${acc===null?'–':acc}</span></div>`;
 $('raceSP').innerHTML=row(SP,st.s,st.aS);$('raceRP').innerHTML=row(RP,st.r,st.aR);
 const real=4+(st.s>0||st.sDone?1:0)-(st.r>0||st.rDone?1:0);
 $('raceLog').innerHTML=st.log.map(l=>'<div>'+l+'</div>').join('')+`<div><b>N = ${st.N}</b> · stvarno poruka u baferu: <b>${real}</b>${st.s>=3&&st.r>=3?(st.N===real?' · <span style="color:var(--ok,green)">ispravno</span>':' · <span style="color:var(--bad,#c33)">N je pogrešan: stanje trke!</span>'):''}</div>`;
 $('raceS').disabled=st.s>=3;$('raceR').disabled=st.r>=3;}
function step(who){if(who==='S'){const i=st.s;if(i===0)st.aS=st.N;else if(i===1)st.aS+=1;else{st.N=st.aS;st.sDone=1;}st.log.push(`S: ${SP[i]}`+(i===0?` → AK(S) = ${st.aS}`:i===1?` → AK(S) = ${st.aS}`:` → N = ${st.N}`));st.s++;}
 else{const i=st.r;if(i===0)st.aR=st.N;else if(i===1)st.aR-=1;else{st.N=st.aR;st.rDone=1;}st.log.push(`R: ${RP[i]}`+(i<2?` → AK(R) = ${st.aR}`:` → N = ${st.N}`));st.r++;}draw();}
on('raceS','click',()=>step('S'));on('raceR','click',()=>step('R'));on('raceReset','click',reset);reset();}

/* ---------- zamena stranica (o8) ---------- */
if($('pageLab')){
function pg(){const ref=$('pgRef').value.trim().split(/[\s,;]+/).filter(Boolean);const m=Math.max(1,Math.min(8,+$('pgM').value||3));const alg=$('pgAlg').value;
 let fr=[],faults=0;const cols=[];const last={},loaded={};
 ref.forEach((x,t)=>{let hit=fr.includes(x),victim=null;
  if(!hit){faults++;if(fr.length<m)fr.push(x);else{let vi=0;
    if(alg==='fifo'){vi=fr.reduce((b,y,i)=>loaded[y]<loaded[fr[b]]?i:b,0);}
    else if(alg==='lru'){vi=fr.reduce((b,y,i)=>last[y]<last[fr[b]]?i:b,0);}
    else{const nxt=y=>{const k=ref.indexOf(y,t+1);return k<0?Infinity:k;};vi=fr.reduce((b,y,i)=>nxt(y)>nxt(fr[b])?i:b,0);}
    victim=fr[vi];fr[vi]=x;}loaded[x]=t;}
  last[x]=t;cols.push({x,hit,fr:fr.slice(),victim});});
 const rowsN=m;let h='<div class="tbl"><table class="pgt"><thead><tr><th></th>'+cols.map(c=>`<th>${esc(c.x)}</th>`).join('')+'</tr></thead><tbody>';
 for(let r=0;r<rowsN;r++)h+='<tr><th>okvir '+(r+1)+'</th>'+cols.map(c=>`<td class="${c.hit?'':'pf'}">${c.fr[r]!==undefined?esc(c.fr[r]):''}</td>`).join('')+'</tr>';
 h+='<tr><th></th>'+cols.map(c=>`<td class="mk">${c.hit?'':'✱'}</td>`).join('')+'</tr></tbody></table></div>';
 $('pgOut').innerHTML=h+`<p class="score">Straničnih prekida: <b>${faults}</b> od ${ref.length} pristupa (n = ${new Set(ref).size} različitih stranica, m = ${m} okvira).</p>`;}
on('pgRun','click',pg);on('pgAlg','change',pg);on('pgM','input',pg);pg();}

/* ---------- raspoređivanje diska (o9) ---------- */
if($('diskLab')){
const MAXC=199;
function dk(){const head=Math.max(0,Math.min(MAXC,+$('dkHead').value||0));const req=$('dkReq').value.trim().split(/[\s,;]+/).map(Number).filter(v=>!isNaN(v)&&v>=0&&v<=MAXC);
 const alg=$('dkAlg').value,up=$('dkDir').value==='up';let path=[head],jumps=[];
 const lo=req.filter(r=>r<head).sort((a,b)=>b-a),hi=req.filter(r=>r>=head).sort((a,b)=>a-b);
 if(alg==='FCFS')path=path.concat(req);
 else if(alg==='SSTF'){let rest=req.slice(),cur=head;while(rest.length){let bi=0;rest.forEach((r,i)=>{if(Math.abs(r-cur)<Math.abs(rest[bi]-cur))bi=i;});cur=rest.splice(bi,1)[0];path.push(cur);}}
 else if(alg==='SCAN')path=up?path.concat(hi,lo.length?[MAXC]:[],lo):path.concat(lo,hi.length?[0]:[],hi);
 else if(alg==='LOOK')path=up?path.concat(hi,lo):path.concat(lo,hi);
 else if(alg==='C-SCAN'){if(up){path=path.concat(hi);if(lo.length){path.push(MAXC);jumps.push(path.length);path.push(0);path=path.concat(lo.slice().reverse());}}else{path=path.concat(lo);if(hi.length){path.push(0);jumps.push(path.length);path.push(MAXC);path=path.concat(hi.slice().reverse());}}}
 else if(alg==='C-LOOK'){if(up){path=path.concat(hi);if(lo.length){jumps.push(path.length);path=path.concat(lo.slice().reverse());}}else{path=path.concat(lo);if(hi.length){jumps.push(path.length);path=path.concat(hi.slice().reverse());}}}
 let tot=0;for(let i=1;i<path.length;i++)tot+=Math.abs(path[i]-path[i-1]);
 const W=560,H=240,L=20,R=20,T=18,B=12,xs=c=>L+c/MAXC*(W-L-R),ys=i=>T+i*(H-T-B)/Math.max(1,path.length-1);
 let s=`<line x1="${L}" x2="${W-R}" y1="${T-6}" y2="${T-6}" class="s-grid"/>`;[0,50,100,150,199].forEach(v=>s+=`<text x="${xs(v)}" y="${T-9}" text-anchor="middle" class="s-tm">${v}</text>`);
 for(let i=1;i<path.length;i++)s+=`<line x1="${xs(path[i-1])}" y1="${ys(i-1)}" x2="${xs(path[i])}" y2="${ys(i)}" stroke="currentColor" stroke-width="1.6" ${jumps.includes(i)?'stroke-dasharray="4 4" opacity=".5"':''}/>`;
 path.forEach((c,i)=>{const isReq=i>0&&req.includes(c);s+=`<circle cx="${xs(c)}" cy="${ys(i)}" r="${i===0?5:3.5}" fill="${isReq||i===0?'var(--accent)':'var(--muted)'}"/><text x="${xs(c)+7}" y="${ys(i)+4}" class="s-tm">${c}</text>`;});
 $('dkSvg').innerHTML=s;
 $('dkOut').innerHTML=`<p class="score">Redosled: ${path.join(' → ')}<br>Ukupan put glave: <b>${tot}</b> cilindara${jumps.length?' (uključujući povratni skok, isprekidana linija)':''}.</p>`;
 $('dkDir').style.display=(alg==='FCFS'||alg==='SSTF')?'none':'';}
['dkAlg','dkDir'].forEach(i=>on(i,'change',dk));['dkHead','dkReq'].forEach(i=>on(i,'input',dk));on('dkRun','click',dk);dk();}
