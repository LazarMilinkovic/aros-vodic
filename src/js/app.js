/* ================= stanje i čuvanje ================= */
let answers=store.get('aros-ans-v4')||{};
let lastSec=store.get('aros-pos')||null;
let S=Object.assign({grades:{},cards:{},hist:[],visited:{},scroll:{},seen:{}},store.get('aros-v7')||{});
let cloud=null,cloudT=0;
function cloudSave(){if(!cloud)return;clearTimeout(cloudT);cloudT=setTimeout(()=>{cloud.set({answers:JSON.stringify(answers),pos:lastSec||'',v7:JSON.stringify(S),at:Date.now()}).catch(()=>{});},900);}
function saveAll(){store.set('aros-ans-v4',answers);store.set('aros-v7',S);if(lastSec)store.set('aros-pos',lastSec);cloudSave();}
function save(){saveAll();updateProgress();}
(async()=>{try{if(!(window.claude&&window.claude.use))return;const [db,user]=await Promise.all([claude.use('db'),claude.use('user')]);if(!db||!user)return;const uid=await user.id();if(!uid)return;
 const ref=db.doc('data/users/'+uid+'/progress');const snap=await ref.get();cloud=ref;
 if(snap.exists){const d=snap.data()||{};let ra={},rs={};try{ra=JSON.parse(d.answers||'{}')}catch(e){}try{rs=JSON.parse(d.v7||'{}')}catch(e){}
  for(const k in ra)if(answers[k]===undefined)answers[k]=ra[k];
  if(!lastSec&&d.pos)lastSec=d.pos;
  for(const k of ['grades','cards']){const r=rs[k]||{};for(const id in r){const a=S[k][id];if(!a||(r[id].t||0)>(a.t||0))S[k][id]=r[id];}}
  for(const k of ['visited','scroll','seen']){Object.assign(S[k],Object.assign({},rs[k]||{},S[k]));}
  const ids=new Set(S.hist.map(h=>h.id));(rs.hist||[]).forEach(h=>{if(!ids.has(h.id))S.hist.push(h);});S.hist.sort((a,b)=>b.at-a.at);
  store.set('aros-ans-v4',answers);store.set('aros-v7',S);
  document.querySelectorAll('.quiz').forEach(b=>{b.innerHTML=b._h||'';const id=b.dataset.ch;renderQuiz(b,id,id==='final'?FINAL:Q[id]);});
  updateProgress();route();}
 cloudSave();}catch(e){}})();

const toastEl=$('toast');let toastT=0;
function toast(t){toastEl.textContent=t;toastEl.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>toastEl.hidden=true,2600);}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'dj');
/* stalni (ne nasumični pri svakom otvaranju) raspored opcija, da tačan odgovor ne bude uvek na istom mestu; čuvani odgovori ostaju indeksi iz podataka */
const optOrder=(key,opts)=>{let h=2166136261;for(const c of key){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}
  const rnd=()=>{h^=h<<13;h^=h>>>17;h^=h<<5;return (h>>>0)/4294967296;};
  const last=/^(sve |oba\b|nijedn|ni jedn|ništa|i a i b)/i,idx=opts.map((_,i)=>i),fix=idx.filter(i=>last.test(opts[i])),mv=idx.filter(i=>!last.test(opts[i]));
  for(let i=mv.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[mv[i],mv[j]]=[mv[j],mv[i]];}return mv.concat(fix);};
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};

/* ================= tema i slova ================= */
const root=document.documentElement;
const ICONS={system:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',light:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',dark:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>'};
const TNAME={system:'Tema: kao sistem',light:'Tema: svetla',dark:'Tema: tamna'};
let theme=store.get('aros-theme')||'system';
function applyTheme(){if(theme==='system')root.removeAttribute('data-theme');else root.setAttribute('data-theme',theme);$('themeIc').innerHTML=ICONS[theme];$('themeBtn').setAttribute('aria-label',TNAME[theme]);$('themeBtn').title=TNAME[theme];}
applyTheme();
on('themeBtn','click',()=>{theme={system:'light',light:'dark',dark:'system'}[theme];store.set('aros-theme',theme);applyTheme();toast(TNAME[theme]);});
const FS=[1,1.1,1.2,.92];let fsI=store.get('aros-fs')||0;
function applyFs(){root.style.setProperty('--read',FS[fsI]);}
applyFs();
on('fontBtn','click',()=>{fsI=(fsI+1)%FS.length;store.set('aros-fs',fsI);applyFs();toast('Slova u lekcijama: '+Math.round(FS[fsI]*100)+'%');});

/* ================= kvizovi u lekcijama ================= */
function renderQuiz(box,id,items){
  if(!items)return;
  if(box._h===undefined)box._h=box.innerHTML;
  if(!box.querySelector('h4')){const h=document.createElement('h4');h.textContent='Proveri znanje';box.appendChild(h);}
  const sc=document.createElement('div');sc.className='score';box.appendChild(sc);
  items.forEach((it,qi)=>{
    const [q,opts,right,ex]=it;const key=id+':'+qi;
    const d=document.createElement('div');d.className='q';
    const p=document.createElement('p');p.textContent=(qi+1)+'. '+q;d.appendChild(p);
    const o=document.createElement('div');o.className='opts';d.appendChild(o);
    const e=document.createElement('div');e.className='expl';e.hidden=true;d.appendChild(e);
    const btns=opts.map((t,oi)=>{const b=document.createElement('button');b.className='opt';b.type='button';b.textContent=t;b.addEventListener('click',()=>{answers[key]=oi;show();save();score();});return b;});optOrder(key,opts).forEach(i=>o.appendChild(btns[i]));
    function show(){const a=answers[key];if(a===undefined){btns.forEach(b=>{b.disabled=false;b.className='opt'});e.hidden=true;return;}
      btns.forEach((b,i)=>{b.disabled=true;b.className='opt'+(i===right?' right':(i===a?' wrong':''));});
      e.hidden=false;e.textContent=(a===right?'Tačno. ':'Netačno. ')+ex;}
    show();d._show=show;box.appendChild(d);
  });
  function score(){let n=0,ok=0;items.forEach((it,qi)=>{const a=answers[id+':'+qi];if(a!==undefined){n++;if(a===it[2])ok++;}});
    sc.textContent=n?`Odgovoreno ${n} od ${items.length}, tačno ${ok}.`:`${items.length} pitanja. Klikni na odgovor.`;}
  score();box._score=score;
}
document.querySelectorAll('.quiz').forEach(b=>{const id=b.dataset.ch;renderQuiz(b,id,id==='final'?FINAL:Q[id]);});
on('resetAll','click',()=>{answers={};save();document.querySelectorAll('.q').forEach(q=>q._show&&q._show());document.querySelectorAll('.quiz').forEach(b=>b._score&&b._score());toast('Odgovori u testovima su obrisani.');});

function quizDone(id){const items=id==='c17'?FINAL:Q[id];if(!items)return false;const k=id==='c17'?'final':id;return items.every((_,i)=>answers[k+':'+i]!==undefined);}
function quizFrac(id){const items=id==='c17'?FINAL:Q[id];if(!items)return 0;const k=id==='c17'?'final':id;return items.filter((_,i)=>answers[k+':'+i]!==undefined).length/items.length;}

/* ================= sadržaj (levo) ================= */
function buildSide(){
  let h='';
  COURSE.forEach(P=>{h+=`<div class="pt">${P.p}. deo · ${esc(P.name)}</div>`;
    if(!P.mods.length){h+=`<div class="soon">Lekcije za ${P.kol} stižu uskoro.</div>`;return;}
    P.mods.forEach(M=>{h+=`<h5>${M.m==='★'?'':'Modul '+M.m.slice(1)+' · '}${esc(M.name)}</h5>`;
      M.ch.forEach(([id,n,t])=>{h+=`<a href="#${id}" data-ch="${id}"><span class="n">${n}</span><span>${esc(t)}</span></a>`;});});});
  $('sideBody').innerHTML=h;
}
buildSide();
const side=$('side');
if(matchMedia('(max-width:900px)').matches)side.dataset.closed='true';
on('sideToggle','click',()=>{const c=side.dataset.closed==='true';side.dataset.closed=c?'false':'true';$('sideToggle').setAttribute('aria-expanded',String(c));});
$('sideBody').addEventListener('click',e=>{if(e.target.closest('a')&&matchMedia('(max-width:900px)').matches){side.dataset.closed='true';}});

function updateProgress(){
  document.querySelectorAll('#sideBody a[data-ch]').forEach(a=>{const ok=quizDone(a.dataset.ch);let m=a.querySelector('.ok');if(ok&&!m){m=document.createElement('span');m.className='ok';m.textContent='✓';a.appendChild(m);}if(!ok&&m)m.remove();});
  if(curView==='pocetna')renderHome();
}

/* ================= poglavlje ================= */
let curCh=null,curView=null;
function showChapter(id,opts){
  opts=opts||{};
  const sec=$(id);if(!sec)return;
  document.querySelectorAll('.page section.ch').forEach(s=>s.classList.toggle('cur',s===sec));
  curCh=id;const c=CHI[id];
  document.querySelectorAll('#sideBody a').forEach(a=>a.classList.toggle('on',a.dataset.ch===id));
  $('sideCur').textContent=c?c.n+' · '+c.t:'Sadržaj';
  $('navLearn').href='#'+id;
  // na ovoj strani
  const hs=[...sec.querySelectorAll('h3')];
  hs.forEach((h,i)=>{if(!h.id)h.id=id+'-h'+(i+1);});
  $('otp').innerHTML=hs.length?'<b>Na ovoj strani</b>'+hs.map(h=>`<a href="#${h.id}" data-to="${h.id}">${esc(h.textContent.replace(/\s*\(slajd.*?\)\s*$/i,''))}</a>`).join(''):'';
  // prethodno / sledeće
  const i=c?c.i:-1,pv=CHS[i-1],nx=CHS[i+1];
  let f='';
  if(pv)f+=`<a class="pv" href="#${pv.id}"><small>← Prethodno</small><b>${pv.n} ${esc(pv.t)}</b></a>`;
  if(nx)f+=`<a class="nx" href="#${nx.id}"><small>Sledeće →</small><b>${nx.n} ${esc(nx.t)}</b></a>`;
  const qs=BANK.filter(b=>b.ch===id).length;
  f+=`<div class="qb"><span>${qs?`Iz ove lekcije ima <b>${qs}</b> ispitnih pitanja u banci.`:'Proveri se generatorom ispita.'}</span><a class="btn soft" href="#ispit" data-from="${id}">Preslišaj me iz ove lekcije</a></div>`;
  $('chfoot').innerHTML=f;
  S.visited[id]=Date.now();lastSec=id;saveAll();
  if(opts.to){const t=$(opts.to);if(t){requestAnimationFrame(()=>{t.scrollIntoView({block:'start'});t.classList.add('flash');setTimeout(()=>t.classList.remove('flash'),2100);});return;}}
  const fr=opts.resume?(S.scroll[id]||0):0;
  requestAnimationFrame(()=>{const page=$('page');const top=page.getBoundingClientRect().top+scrollY-80;const h=page.offsetHeight;window.scrollTo({top:fr>0.02?top+fr*h:0,behavior:'instant'});});
}
$('otp').addEventListener('click',e=>{const a=e.target.closest('a[data-to]');if(!a)return;e.preventDefault();const t=$(a.dataset.to);if(t)t.scrollIntoView({behavior:'smooth',block:'start'});});
$('chfoot').addEventListener('click',e=>{const a=e.target.closest('a[data-from]');if(a){examFrom=a.dataset.from;examAuto=true;}});
// praćenje čitanja
let scrT=0;
addEventListener('scroll',()=>{
  if(curView!=='gradivo'||!curCh)return;
  const page=$('page');const r=page.getBoundingClientRect();const h=page.offsetHeight-innerHeight*0.6;
  const fr=Math.max(0,Math.min(1,(-r.top+80)/Math.max(1,h)));
  $('readbar').style.width=(fr*100)+'%';
  clearTimeout(scrT);scrT=setTimeout(()=>{S.scroll[curCh]=+fr.toFixed(3);saveAll();
    const hs=[...$(curCh).querySelectorAll('h3')];let cur=null;for(const x of hs){if(x.getBoundingClientRect().top<innerHeight*0.35)cur=x.id;}
    document.querySelectorAll('#otp a').forEach(a=>a.classList.toggle('on',a.dataset.to===cur));},250);
},{passive:true});

/* ================= ruter ================= */
const VIEWS=['pocetna','gradivo','ispit','pitanja','kartice'];
let pendingTo=null;
function route(){
  let h=decodeURIComponent(location.hash.slice(1));
  let view='pocetna',ch=null,to=null;
  if(!h||h==='pocetna')view='pocetna';
  else if(VIEWS.includes(h))view=h;
  else if(CHI[h])view='gradivo',ch=h;
  else{const el=$(h);const sec=el&&el.closest('section.ch');if(sec){view='gradivo';ch=sec.id;to=h;}}
  if(pendingTo){to=pendingTo;pendingTo=null;}
  const changed=view!==curView;
  curView=view;
  VIEWS.forEach(v=>{const e=$('v-'+v);if(e)e.hidden=v!==view;});
  document.querySelectorAll('.mainnav a').forEach(a=>a.classList.toggle('on',a.dataset.nav===view));
  $('readbar').style.width='0';
  if(view==='gradivo')showChapter(ch,{to,resume:resumeNext===ch});
  else if(changed)window.scrollTo({top:0,behavior:'instant'});
  resumeNext=null;
  if(view==='pocetna')renderHome();
  if(view==='ispit')renderExamView();
  if(view==='pitanja')renderBank();
  if(view==='kartice')renderCards();
  const c=ch&&CHI[ch];
  document.title=view==='gradivo'&&c?c.n+' '+c.t+' · AROS vodič':{pocetna:'AROS vodič',ispit:'Generator ispita · AROS vodič',pitanja:'Banka pitanja · AROS vodič',kartice:'Kartice · AROS vodič'}[view]||'AROS vodič';
}
let resumeNext=null;
addEventListener('hashchange',route);

/* ================= početna ================= */
function renderHome(){
  // memorijska mapa
  let g='',done=0;
  CHS.forEach((c,i)=>{const d=quizDone(c.id),fr=quizFrac(c.id),v=!!S.visited[c.id];if(d)done++;
    g+=`<a class="cell${d?' done':v||fr>0?' part':''}${c.id===lastSec?' here':''}" href="#${c.id}" title="${esc(c.n+' '+c.t)}"><small>0x${i.toString(16).toUpperCase().padStart(2,'0')}</small><b>${c.n}</b>${!d&&fr>0?`<i style="width:${fr*100}%"></i>`:''}</a>`;});
  const P2=COURSE[1];if(!P2.mods.length){for(let k=0;k<7;k++)g+=`<span class="cell soon" title="Operativni sistemi: uskoro"><small>0x${(CHS.length+k).toString(16).toUpperCase().padStart(2,'0')}</small><b>OS</b></span>`;}
  $('memGrid').innerHTML=g;$('memSum').textContent=done+' / '+CHS.length+' lekcija';
  // nastavi
  const rc=$('resumeCard');const c=lastSec&&CHI[lastSec];
  if(c){rc.hidden=false;$('resumeT').textContent=c.n+' · '+c.t;const fr=S.scroll[c.id]||0;$('resumeS').textContent=`Modul ${c.m} · ${c.mn} · pročitano oko ${Math.round(fr*100)}% lekcije`;$('resumeGo').href='#'+c.id;$('heroGo').textContent='Nastavi gde si stao';$('heroGo').href='#'+c.id;}
  else rc.hidden=true;
  // statistika
  let qa=0,qok=0;for(const k in answers){const [id,i]=k.split(':');const it=id==='final'?FINAL[+i]:(Q[id]||[])[+i];if(it){qa++;if(answers[k]===it[2])qok++;}}
  const gv=Object.values(S.grades);const known=BANK.filter(b=>S.grades[b.id]&&S.grades[b.id].g===2).length;
  const c5=Object.values(S.cards).filter(x=>x.b>=5).length;
  const best=S.hist.length?Math.max(...S.hist.map(h=>h.pct)):null;
  $('stats').innerHTML=[
    [done+'/'+CHS.length,'lekcija sa urađenim testom'],
    [qa?Math.round(qok/qa*100)+'%':'–',qa?`tačnih u testovima (${qok} od ${qa})`:'tačnih u testovima'],
    [known+'/'+BANK.length,'ispitnih pitanja koja znaš'],
    [S.hist.length?best+'%':'–',S.hist.length?`najbolji ispit od ${S.hist.length}`:'nijedan generisan ispit'],
  ].map(([b,s])=>`<div class="stat"><b>${b}</b><span>${s}</span></div>`).join('');
  // delovi
  $('parts').innerHTML=COURSE.map(P=>{
    const qn=BANK.filter(b=>b.p===P.p).length;
    let body=P.mods.length?'<div class="modlist">'+P.mods.map(M=>{const ids=M.ch.map(x=>x[0]);const p=Math.round(ids.reduce((s,id)=>s+(quizDone(id)?1:quizFrac(id)*.7),0)/ids.length*100);
      return `<a href="#${ids[0]}"><span class="mn">${M.m}</span><span class="mt">${esc(M.name)}<small>${ids.length} ${ids.length===1?'lekcija':ids.length<5?'lekcije':'lekcija'}</small></span><span class="ring" style="--p:${p}" title="${p}%"></span></a>`;}).join('')+'</div>'
      :`<div class="soonbox">Lekcije iz operativnih sistema dolaze čim stignu materijali. Biće ispričane istim stilom, a njihova pitanja ulaze u generator ispita.</div>`;
    return `<article class="partcard"><header><h3>${esc(P.name)}</h3><span class="kol">${P.kol}</span></header><p>${esc(P.desc)}${qn?` <b>${qn}</b> ispitnih pitanja.`:''}</p>${body}</article>`;}).join('');
}
