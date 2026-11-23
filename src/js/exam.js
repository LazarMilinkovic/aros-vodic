/* ================= generator ispita ================= */
let examFrom=null;
const EX={scope:'1',type:'open',n:10,pick:'smart',time:0};
let exam=store.get('aros-exam-cur')||null;let timerT=0;
function pillGroup(id,key,cb){const g=$(id);g.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;g.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));const v=b.dataset.v;EX[key]=key==='n'||key==='time'?+v:v;cb&&cb();});}
pillGroup('exScope','scope',scopeHint);pillGroup('exType','type',scopeHint);pillGroup('exN','n');pillGroup('exPick','pick');pillGroup('exTime','time');
function mcPool(p){const out=[];for(const id in Q){const pp=id[0]==='o'?2:1;if(pp!==p)continue;Q[id].forEach((it,i)=>out.push({id:'mc:'+id+':'+i,mc:it,ch:id,p:pp}));}return out;}
function pool(){const parts=EX.scope==='all'?[1,2]:[+EX.scope];let o=[],m=[];parts.forEach(p=>{o=o.concat(BANK.filter(b=>b.p===p&&(!examFrom||b.ch===examFrom)));m=m.concat(mcPool(p).filter(b=>!examFrom||b.ch===examFrom));});
  return {open:o,mc:m};}
function scopeHint(){const P=pool();const h=$('exScopeHint');
  const n2=BANK.filter(b=>b.p===2).length;
  h.innerHTML=(examFrom?`Samo lekcija <b>${esc(CHI[examFrom].n+' '+CHI[examFrom].t)}</b> · <a href="#ispit" id="exClear">sve lekcije</a><br>`:'')+`U izboru: ${P.open.length} otvorenih i ${P.mc.length} pitanja na klik.`+(EX.scope!=='1'&&!n2?' Pitanja iz OS-a stižu sa novim lekcijama.':'');
  const c=$('exClear');if(c)c.addEventListener('click',e=>{e.preventDefault();examFrom=null;scopeHint();});}
function weight(id){const g=S.grades[id];if(!g)return 3;return g.g===0?3.2:g.g===1?2:0.5;}
function pickN(arr,n,mode){
  if(mode==='rand')return shuffle(arr.slice()).slice(0,n);
  if(mode==='weak')arr=arr.filter(x=>S.grades[x.id]&&S.grades[x.id].g<2);
  // težinski izbor bez ponavljanja, uz ravnomernu raspodelu po lekcijama
  const items=arr.map(x=>({x,k:Math.pow(Math.random(),1/weight(x.id))}));items.sort((a,b)=>b.k-a.k);
  const out=[],perCh={};const cap=Math.max(1,Math.ceil(n/Math.max(1,new Set(arr.map(a=>a.ch)).size))+1);
  for(const it of items){if(out.length>=n)break;const c=it.x.ch;if((perCh[c]||0)>=cap)continue;perCh[c]=(perCh[c]||0)+1;out.push(it.x);}
  for(const it of items){if(out.length>=n)break;if(!out.includes(it.x))out.push(it.x);}
  return out;}
function genExam(){
  const P=pool();let qs=[];const n=EX.n;
  const byPart=(list,k)=>{if(EX.scope!=='all')return pickN(list,k,EX.pick);const a=list.filter(x=>x.p===1),b=list.filter(x=>x.p===2);if(!b.length)return pickN(a,k,EX.pick);const h=Math.ceil(k/2);return pickN(a,h,EX.pick).concat(pickN(b,k-h,EX.pick));};
  if(EX.type==='open')qs=byPart(P.open,n);
  else if(EX.type==='mc')qs=byPart(P.mc,n);
  else{const h=Math.ceil(n/2);qs=byPart(P.open,h).concat(byPart(P.mc,n-h));}
  if(!qs.length){toast(EX.pick==='weak'?'Nema slabih pitanja: prvo oceni neka pitanja kao „ne znam“ ili „delimično“.':'Za ovaj izbor još nema pitanja.');return;}
  qs.sort((a,b)=>(CHI[a.ch]?CHI[a.ch].i:99)-(CHI[b.ch]?CHI[b.ch].i:99));
  exam={id:Date.now().toString(36),at:Date.now(),scope:EX.scope,from:examFrom,type:EX.type,time:EX.time,end:EX.time?Date.now()+EX.time*60000*qs.length:0,
    q:qs.map(x=>({id:x.id,mc:!!x.mc})),st:{},done:false};
  store.set('aros-exam-cur',exam);renderSheet();window.scrollTo({top:0,behavior:'smooth'});
}
on('exGo','click',genExam);
function qById(id){if(id.startsWith('mc:')){const [,c,i]=id.split(':');const it=Q[c]&&Q[c][+i];return it?{id,mc:it,ch:c,p:1}:null;}return BANKI[id]||null;}
function scopeName(s){return s==='all'?'Ceo ispit':s+'. kolokvijum';}
function fmtDate(t){const d=new Date(t);return d.toLocaleDateString('sr-Latn-RS',{day:'numeric',month:'numeric',year:'numeric'});}
function renderExamView(){
  if(examFrom){EX.scope=String(CHI[examFrom]?CHI[examFrom].p:1);$('exScope').querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.v===EX.scope));}
  scopeHint();renderHist();
  if(exam&&!exam.done)renderSheet();else if(exam&&exam.done)renderSheet();else renderEmptySheet();
}
function renderEmptySheet(){
  $('sheet').innerHTML=`<div class="empty"><b>Ovde se pojavljuje tvoj ispit</b>Izaberi gradivo i broj pitanja levo, pa klikni „Generiši ispit“. Svaki put dobijaš drugi raspored pitanja.<div style="margin-top:16px"><button class="btn" type="button" id="exGo2">Generiši ispit sa ovim podešavanjima</button></div></div>`;
  on('exGo2','click',genExam);}
function renderHist(){const h=S.hist.slice(0,6);$('exHist').innerHTML=h.length?'<h4>Prethodni ispiti</h4>'+h.map(x=>`<div><span>${fmtDate(x.at)} · ${scopeName(x.scope)} · ${x.n} pit.</span><span>${x.pct}%</span></div>`).join(''):'';}
function renderSheet(){
  clearInterval(timerT);
  const sh=$('sheet');const e=exam;
  const qs=e.q.map(x=>qById(x.id)).filter(Boolean);
  let h=`<div class="sheethead"><div><div class="eyebrow">${scopeName(e.scope)}${e.from&&CHI[e.from]?' · '+esc(CHI[e.from].t):''}</div><h2>Ispit · ${fmtDate(e.at)}</h2><div class="meta">${qs.length} pitanja · ${e.type==='open'?'otvorena':e.type==='mc'?'na klik':'mešano'}</div></div>${e.end&&!e.done?`<div class="timer" id="timer">--:--</div>`:''}</div>`;
  qs.forEach((x,i)=>{const st=e.st[x.id]||{};const c=CHI[x.ch];
    const tags=`<div class="tagrow"><span class="tag p${x.p}">${x.p}. kol.</span>${c?`<span class="tag">${c.m} · ${esc(c.t)}</span>`:''}${x.mc?'<span class="tag">na klik</span>':''}</div>`;
    if(x.mc){const [qq,opts,right,ex]=x.mc;
      h+=`<div class="eq mc" data-id="${x.id}"><div class="qh"><span class="qn">${i+1}</span><p class="qt">${esc(qq)}</p></div>${tags}<div class="opts">${opts.map((o,oi)=>`<button type="button" class="opt${st.a!==undefined?(oi===right?' right':oi===st.a?' wrong':''):''}" data-o="${oi}"${st.a!==undefined?' disabled':''}>${esc(o)}</button>`).join('')}</div>${st.a!==undefined?`<div class="expl">${st.a===right?'Tačno. ':'Netačno. '}${esc(ex)}${c?` <a href="#${x.ch}">Lekcija →</a>`:''}</div>`:''}</div>`;}
    else{
      h+=`<div class="eq" data-id="${x.id}"><div class="qh"><span class="qn">${i+1}</span><p class="qt">${x.q}</p></div>${tags}
      <textarea placeholder="Napiši odgovor kao na ispitu (opciono). Ostaje sačuvan dok ne napraviš novi ispit." data-t="${x.id}" id="ta-${x.id}">${esc(st.txt||'')}</textarea>
      <div class="acts"><button type="button" class="btn ghost" data-show="${x.id}">${st.open?'Sakrij odgovor':'Prikaži odgovor'}</button></div>
      ${st.open?`<div class="ans"><b>Odgovor</b>${x.a}${c?`<a class="go2" href="#${x.lnk||x.ch}">Pročitaj objašnjenje u lekciji ${c.n} →</a>`:''}</div>
      <div class="grade" data-g-for="${x.id}"><span>Koliko si znao?</span>${[[0,'Ne znam'],[1,'Delimično'],[2,'Znam']].map(([g,t])=>`<button type="button" data-g="${g}" class="${st.g===g?'on':''}">${t}</button>`).join('')}</div>`:''}</div>`;}
  });
  const graded=qs.filter(x=>{const st=e.st[x.id]||{};return x.mc?st.a!==undefined:st.g!==undefined;}).length;
  if(e.done)h+=resultHtml(qs);
  else h+=`<div class="panel" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;justify-content:space-between"><span>Ocenjeno ${graded} od ${qs.length}. Kad završiš, dobijaš rezultat po modulima.</span><span style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn ghost" type="button" id="exNew">Novi raspored</button><button class="btn" type="button" id="exEnd">Završi ispit</button></span></div>`;
  sh.innerHTML=h;
  on('exNew','click',genExam);on('exEnd','click',endExam);on('exAgain','click',genExam);
  on('exWeak','click',()=>{EX.pick='weak';$('exPick').querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.v==='weak'));genExam();});
  if(e.end&&!e.done){const tick=()=>{const left=Math.max(0,e.end-Date.now());const t=$('timer');if(!t){clearInterval(timerT);return;}const m=Math.floor(left/60000),s=Math.floor(left%60000/1000);t.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');t.classList.toggle('low',left<60000);if(!left){clearInterval(timerT);toast('Vreme je isteklo.');endExam();}};tick();timerT=setInterval(tick,1000);}
}
function setGrade(id,g){S.grades[id]={g,t:Date.now(),n:((S.grades[id]||{}).n||0)+1};}
$('sheet').addEventListener('click',e=>{
  if(!exam)return;const eq=e.target.closest('.eq');
  const sb=e.target.closest('[data-show]');if(sb){const id=sb.dataset.show;const st=exam.st[id]=exam.st[id]||{};const ta=$('ta-'+id);if(ta)st.txt=ta.value;st.open=!st.open;store.set('aros-exam-cur',exam);renderSheet();const n=document.querySelector(`.eq[data-id="${CSS.escape(id)}"]`);if(n&&st.open)n.scrollIntoView({block:'nearest'});return;}
  const gb=e.target.closest('.grade button');if(gb&&!exam.done){const id=gb.parentElement.dataset.gFor;const g=+gb.dataset.g;const st=exam.st[id]=exam.st[id]||{};st.g=g;setGrade(id,g);store.set('aros-exam-cur',exam);saveAll();
    gb.parentElement.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===gb));updateCount();return;}
  const ob=e.target.closest('.opt');if(ob&&eq&&!exam.done){const id=eq.dataset.id;const x=qById(id);const st=exam.st[id]=exam.st[id]||{};if(st.a!==undefined)return;st.a=+ob.dataset.o;const ok=st.a===x.mc[2];setGrade(id,ok?2:0);store.set('aros-exam-cur',exam);saveAll();renderSheet();}
});
$('sheet').addEventListener('input',e=>{const t=e.target.closest('textarea[data-t]');if(!t||!exam)return;(exam.st[t.dataset.t]=exam.st[t.dataset.t]||{}).txt=t.value;clearTimeout(t._s);t._s=setTimeout(()=>store.set('aros-exam-cur',exam),400);});
function updateCount(){const sp=$('sheet').querySelector('.panel span');if(!sp||!exam)return;const qs=exam.q.map(x=>qById(x.id)).filter(Boolean);const n=qs.filter(x=>{const st=exam.st[x.id]||{};return x.mc?st.a!==undefined:st.g!==undefined;}).length;sp.textContent=`Ocenjeno ${n} od ${qs.length}. Kad završiš, dobijaš rezultat po modulima.`;}
function scoreOf(x){const st=exam.st[x.id]||{};if(x.mc)return st.a===undefined?0:(st.a===x.mc[2]?2:0);return st.g===undefined?0:st.g;}
function endExam(){if(!exam)return;exam.done=true;const qs=exam.q.map(x=>qById(x.id)).filter(Boolean);const tot=qs.reduce((s,x)=>s+scoreOf(x),0);const pct=Math.round(tot/(2*qs.length)*100);
  exam.pct=pct;S.hist.unshift({id:exam.id,at:exam.at,scope:exam.scope,n:qs.length,pct});S.hist=S.hist.slice(0,40);
  qs.forEach(x=>{S.seen[x.id]=(S.seen[x.id]||0)+1;});store.set('aros-exam-cur',exam);save();renderSheet();renderHist();window.scrollTo({top:$('sheet').querySelector('.result').getBoundingClientRect().top+scrollY-90,behavior:'smooth'});}
function resultHtml(qs){
  const pct=exam.pct;const byM={};qs.forEach(x=>{const c=CHI[x.ch];const k=c?c.m+' · '+c.mn:'Ostalo';(byM[k]=byM[k]||[0,0]);byM[k][0]+=scoreOf(x);byM[k][1]+=2;});
  const weak=qs.filter(x=>scoreOf(x)<2);
  const verdict=pct>=85?'Odlično. Ovo gradivo je spremno za ispit.':pct>=51?'Prošao bi: iznad praga od 51%. Pogledaj slaba pitanja ispod.':'Ispod praga od 51%. Vrati se na lekcije sa liste ispod, pa probaj ponovo.';
  return `<div class="result"><div class="eyebrow">Rezultat</div><div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap"><span class="big2">${pct}%</span><div style="flex:1 1 240px"><h3>${verdict}</h3><span style="color:var(--muted);font-size:.9rem">Znam = 2 boda, delimično = 1, ne znam = 0. Prag za prolaz dela ispita je 51%.</span></div></div>
  <div class="bars">${Object.entries(byM).map(([k,[a,b]])=>`<div class="br"><span>${esc(k)}</span><span class="tr"><i style="width:${a/b*100}%"></i></span><span class="v">${Math.round(a/b*100)}%</span></div>`).join('')}</div>
  ${weak.length?`<h4 style="margin:18px 0 6px">Ponovi ove lekcije</h4><ul style="margin:0">${[...new Set(weak.map(x=>x.ch))].map(c=>CHI[c]?`<li><a href="#${c}">${CHI[c].n} ${esc(CHI[c].t)}</a> (${weak.filter(x=>x.ch===c).length} pit.)</li>`:'').join('')}</ul>`:''}
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px"><button class="btn" type="button" id="exAgain">Novi ispit</button>${weak.length?'<button class="btn ghost" type="button" id="exWeak">Ispit samo od slabih pitanja</button>':''}</div></div>`;
}

/* ================= banka pitanja ================= */
const BF={q:'',p:'all',g:'all'};
function bankPills(id,k){const g=$(id);g.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;g.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));BF[k]=b.dataset.v;renderBank();});}
bankPills('bankPart','p');bankPills('bankG','g');
let bqT=0;on('bankQ','input',()=>{clearTimeout(bqT);bqT=setTimeout(()=>{BF.q=$('bankQ').value;renderBank();},150);});
function renderBank(){
  const q=norm(BF.q.trim());
  const list=BANK.filter(b=>(BF.p==='all'||String(b.p)===BF.p)&&(BF.g==='all'||(BF.g==='n'?!S.grades[b.id]:S.grades[b.id]&&String(S.grades[b.id].g)===BF.g))&&(!q||norm(b.qt+' '+b.at).includes(q)));
  const groups={};list.forEach(b=>{const c=CHI[b.ch];const k=c?c.m:'?';(groups[k]=groups[k]||{name:c?c.mn:'Ostalo',p:b.p,items:[]}).items.push(b);});
  let h='';
  if(!list.length)h=`<div class="empty"><b>Nema pitanja za ovaj filter</b>Promeni filter ili pretragu.</div>`;
  for(const k in groups){const G=groups[k];h+=`<div class="bgroup"><h3><span class="tag p${G.p}">${G.p}. kol.</span> ${k==='★'?'':'Modul '+k.slice(1)+' · '}${esc(G.name)} <small>${G.items.length} pit.</small></h3>`;
    G.items.forEach(b=>{const g=S.grades[b.id];const c=CHI[b.ch];
      h+=`<details class="bq" data-id="${b.id}"${g?` data-g="${g.g}"`:''}><summary><span class="dot"></span><span class="tx">${b.q}</span><span class="tag">${c?c.n:''}</span></summary>
      <div class="ans"><b>Odgovor</b>${b.a}${c?`<a class="go2" href="#${b.lnk||b.ch}">Pročitaj u lekciji ${c.n} →</a>`:''}</div>
      <div class="grade" data-g-for="${b.id}"><span>Koliko znaš?</span>${[[0,'Ne znam'],[1,'Delimično'],[2,'Znam']].map(([gg,t])=>`<button type="button" data-g="${gg}" class="${g&&g.g===gg?'on':''}">${t}</button>`).join('')}</div></details>`;});
    h+='</div>';}
  $('bankList').innerHTML=h;
}
$('bankList').addEventListener('click',e=>{const gb=e.target.closest('.grade button');if(!gb)return;const id=gb.parentElement.dataset.gFor;const g=+gb.dataset.g;setGrade(id,g);saveAll();gb.parentElement.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===gb));const d=gb.closest('details');d.dataset.g=g;});
