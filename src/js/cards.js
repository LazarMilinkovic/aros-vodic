/* ================= kartice (Leitner) ================= */
const DAY=86400000,GAP=[0,0,DAY,3*DAY,7*DAY,16*DAY];
let deck='all',fcCur=null,fcFlip=false,fcExtra=false;
function fcQueue(){const now=Date.now();const ts=TERMS.filter(t=>deck==='all'||String(t.p)===deck);
  const due=ts.filter(t=>{const c=S.cards[t.id];return c&&c.due<=now;}).sort((a,b)=>S.cards[a.id].b-S.cards[b.id].b);
  const fresh=ts.filter(t=>!S.cards[t.id]);
  return {due,fresh,all:ts};}
function nextCard(){const q=fcQueue();let pick=null;
  if(q.due.length)pick=q.due[Math.floor(Math.random()*Math.min(3,q.due.length))];
  else if(q.fresh.length)pick=q.fresh[Math.floor(Math.random()*q.fresh.length)];
  else if(fcExtra&&q.all.length)pick=q.all[Math.floor(Math.random()*q.all.length)];
  if(pick&&fcCur&&pick.id===fcCur.id&&q.all.length>1)return nextCard();
  fcCur=pick;fcFlip=false;}
function renderCards(){
  if(!fcCur||(deck!=='all'&&String(fcCur.p)!==deck))nextCard();
  const fc=$('fc');fc.classList.toggle('flip',fcFlip);
  const q=fcQueue();
  if(!fcCur){$('fcF').innerHTML=`<small>Gotovo za danas</small><b>Sve kartice su ponovljene.</b><span style="color:var(--muted)">Sledeće stižu kad im dođe red. Možeš i da vežbaš dalje nasumično.</span>`;$('fcB').innerHTML='';
    $('fcActs').innerHTML=`<button class="btn" type="button" id="fcMore">Vežbaj još nasumično</button>`;on('fcMore','click',()=>{fcExtra=true;nextCard();renderCards();});}
  else{const c=CHI[fcCur.ch];const box=(S.cards[fcCur.id]||{}).b||0;
    $('fcF').innerHTML=`<small>${fcCur.p}. kolokvijum${c?' · '+c.m:''} · ${box?'kutija '+box:'nova kartica'}</small><b>${esc(fcCur.t)}</b><span style="color:var(--muted);font-size:.9rem">Klikni ili pritisni razmak da okreneš.</span>`;
    $('fcB').innerHTML=`<small>${esc(fcCur.t)}</small><p>${fcCur.d}</p>${c?`<a href="#${fcCur.ch}" style="font-size:.88rem">Lekcija ${c.n} ${esc(c.t)} →</a>`:''}`;
    $('fcActs').innerHTML=fcFlip?`<button class="btn ghost" type="button" data-k="0">Ne znam</button><button class="btn" type="button" data-k="1">Znam</button>`:`<button class="btn" type="button" data-k="f">Okreni karticu</button>`;}
  const bx=[1,2,3,4,5].map(b=>q.all.filter(t=>(S.cards[t.id]||{}).b===b).length);
  $('fcBoxes').innerHTML=`<div><b>${q.fresh.length}</b><small>nove</small></div>`+bx.map((n,i)=>`<div><b>${n}</b><small>kutija ${i+1}</small></div>`).join('');
}
function fcAnswer(k){if(!fcCur)return;const c=S.cards[fcCur.id]||{b:0};const b=k?Math.min(5,(c.b||0)+1):1;S.cards[fcCur.id]={b,due:Date.now()+GAP[b],t:Date.now()};saveAll();nextCard();renderCards();}
function fcToggle(){if(!fcCur)return;fcFlip=!fcFlip;renderCards();}
on('fcIn','click',e=>{if(e.target.closest('a'))return;fcToggle();});
$('fcActs').addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;const k=b.dataset.k;if(k==='f')fcToggle();else fcAnswer(+k);});
$('fcDeck').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$('fcDeck').querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));deck=b.dataset.v;fcCur=null;fcExtra=false;renderCards();});
document.addEventListener('keydown',e=>{if(curView!=='kartice'||e.target.closest('input,textarea,select'))return;if(e.key===' '){e.preventDefault();fcToggle();}else if(fcFlip&&(e.key==='1'||e.key==='2'))fcAnswer(e.key==='2'?1:0);});

/* ================= pretraga ================= */
let SIDX=null;
function buildIdx(){SIDX=[];document.querySelectorAll('.page section.ch').forEach(sec=>{const id=sec.id;const c=CHI[id];if(!c)return;
  let cur={ch:id,h:sec.querySelector('h2')?sec.querySelector('h2').textContent:c.t,to:null,txt:''};const push=()=>{if(cur.txt.trim())SIDX.push(Object.assign(cur,{n:norm(cur.h+' '+cur.txt)}));};
  [...sec.children].forEach((el,i)=>{if(el.tagName==='H3'){push();if(!el.id)el.id=id+'-h'+([...sec.querySelectorAll('h3')].indexOf(el)+1);cur={ch:id,h:el.textContent,to:el.id,txt:''};}else if(!el.classList.contains('quiz'))cur.txt+=' '+el.textContent.replace(/\s+/g,' ');});push();});
  BANK.forEach(b=>SIDX.push({bank:b.id,ch:b.ch,h:b.qt,txt:b.at,n:norm(b.qt+' '+b.at)}));}
let sSel=0;
function doSearch(){const raw=$('sIn').value.trim();const q=norm(raw);const box=$('sRes');
  if(q.length<2){box.innerHTML='<div class="none">Upiši bar dva slova. Pretraga ne pravi razliku između č, ć i c.</div>';return;}
  const terms=q.split(/\s+/).filter(Boolean);
  const res=SIDX.map(r=>{let s=0;for(const t of terms){const i=r.n.indexOf(t);if(i<0)return null;s+=norm(r.h).includes(t)?5:1;}return {r,s};}).filter(Boolean).sort((a,b)=>b.s-a.s).slice(0,30);
  if(!res.length){box.innerHTML=`<div class="none">Ništa za „${esc(raw)}“. Probaj kraći pojam.</div>`;return;}
  sSel=0;
  box.innerHTML=res.map(({r},i)=>{const c=CHI[r.ch];const t=norm(r.txt);const k=t.indexOf(terms[0]);const st=Math.max(0,k-60);let sn=r.txt.slice(st,st+170);
    sn=esc(sn);const re=new RegExp('('+terms.map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','gi');
    const hl=s=>{let out='',nn=norm(s);let last=0;let m;const rx=new RegExp(re.source,'gi');while((m=rx.exec(nn))){out+=esc(s.slice(last,m.index))+'<mark>'+esc(s.slice(m.index,m.index+m[0].length))+'</mark>';last=m.index+m[0].length;}return out+esc(s.slice(last));};
    const snRaw=r.txt.slice(st,st+170);
    return `<a href="${r.bank?'#pitanja':'#'+(r.to||r.ch)}" data-bank="${r.bank||''}" class="${i===0?'sel':''}"><small>${r.bank?'Banka pitanja · ':''}${c?c.n+' '+esc(c.t):''}</small>${hl(r.h)}<span>${st?'… ':''}${hl(snRaw)} …</span></a>`;}).join('');}
function openSearch(){if(!SIDX)buildIdx();$('sov').hidden=false;$('sIn').focus();$('sIn').select();doSearch();}
function closeSearch(){$('sov').hidden=true;}
on('searchBtn','click',openSearch);
on('sIn','input',doSearch);
$('sov').addEventListener('click',e=>{if(e.target===$('sov'))closeSearch();const a=e.target.closest('a');if(a){if(a.dataset.bank){BF.q=a.querySelector('small')?'':'';const b=BANKI[a.dataset.bank];$('bankQ').value=b?b.qt.slice(0,40):'';BF.q=$('bankQ').value;}closeSearch();if(location.hash===a.getAttribute('href')){e.preventDefault();route();}}});
$('sIn').addEventListener('keydown',e=>{const as=[...$('sRes').querySelectorAll('a')];if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();sSel=Math.max(0,Math.min(as.length-1,sSel+(e.key==='ArrowDown'?1:-1)));as.forEach((a,i)=>a.classList.toggle('sel',i===sSel));as[sSel]&&as[sSel].scrollIntoView({block:'nearest'});}
  else if(e.key==='Enter'&&as[sSel]){e.preventDefault();as[sSel].click();location.hash=as[sSel].getAttribute('href');}});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){if(!$('sov').hidden)closeSearch();if(!lb.hidden){lb.hidden=true;lbImg.src='';}}
  if(e.target.closest('input,textarea,select'))return;
  if(e.key==='/'||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k')){e.preventDefault();openSearch();}
  if(curView==='gradivo'&&curCh&&!e.altKey&&!e.ctrlKey&&!e.metaKey){const c=CHI[curCh];if(e.key==='ArrowRight'&&CHS[c.i+1])location.hash=CHS[c.i+1].id;if(e.key==='ArrowLeft'&&CHS[c.i-1])location.hash=CHS[c.i-1].id;}
});

/* ================= lightbox ================= */
const lb=$('lb'),lbImg=$('lbImg');
document.addEventListener('click',e=>{const img=e.target.closest('figure.slide img, .ans img');if(img){lbImg.src=img.src;lbImg.alt=img.alt;lb.hidden=false;}});
lb.addEventListener('click',()=>{lb.hidden=true;lbImg.src='';});

/* ================= start ================= */
document.addEventListener('click',e=>{const a=e.target.closest('a[href="#ispit"]');if(a&&!a.dataset.from&&!a.closest('#exScopeHint'))examFrom=null;},true);
if(!location.hash&&lastSec&&CHI[lastSec]){/* početna nudi nastavak */}
document.addEventListener('click',e=>{const a=e.target.closest('#resumeGo,#heroGo');if(a&&lastSec&&a.getAttribute('href')==='#'+lastSec)resumeNext=lastSec;},true);
updateProgress();route();
