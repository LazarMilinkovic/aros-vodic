/* ---------- struktura predmeta ---------- */
const COURSE=[
 {p:1,name:'Arhitektura računara',kol:'1. kolokvijum',desc:'Kako je računar napravljen, koliko je brz, kako izvršava instrukcije i kako razgovara sa memorijom i uređajima.',
  mods:[
   {m:'M1',name:'Uvod u arhitekturu računara',ch:[['c1','1.1','Šta se desi kad računar računa'],['c2','1.2','Od zadatka do programa'],['c3','1.3','Šta je u kutiji'],['c4','1.4','Tehnologija: Mur i Denard'],['c5','1.5','Slojevi apstrakcije'],['c6','1.6','Funkcije, struktura, Von Neumann']]},
   {m:'M2',name:'Performanse',ch:[['c7','2.1','Više jezgara i Amdalov zakon'],['c8','2.2','CPU vreme, CPI i takt'],['c9','2.3','Paralelizam i lokalnost']]},
   {m:'M3',name:'Izvršavanje instrukcija',ch:[['c10','3.1','Registri, instrukcije, prvi program'],['c11','3.2','Instrukcija korak po korak'],['c12','3.3','Asembler i keš memorija'],['c13','3.4','Modeli mašina, CISC i RISC']]},
   {m:'M4',name:'Procesor i memorija',ch:[['c14','4.1','Procesor, memorija, prekidi i U/I'],['c15','4.2','Načini adresiranja'],['c16','4.3','Intel registri, bajtovi i slova']]},
   {m:'M5',name:'Upravljanje izvršavanjem programa',ch:[['c18','5.1','Intel 8086 iznutra: registri i memorija'],['c19','5.2','Skok, poređenje i uslovno grananje'],['c20','5.3','Poziv, povratak, stek i korutine'],['c21','5.4','Programiranje u asembleru x86']]},
   {m:'M6',name:'Instrukcije i mikroprogramski nivo',ch:[['c22','6.1','Tipovi instrukcija i protočna obrada'],['c23','6.2','Mikroprogram, firmver i mikroarhitektura']]},
   {m:'D',name:'Dopune za ispitna pitanja',ch:[['d1','D.1','Paralelni računari i Flynn-ova klasifikacija'],['d2','D.2','Magistrale i vrste memorija'],['d3','D.3','Sistem prekida do kraja'],['d4','D.4','Pentium, IA-64 i softver oko procesora']]},
   {m:'★',name:'Ponavljanje',ch:[['c17','★','Formule, domaći i veliki test']]}
  ]},
 {p:2,name:'Operativni sistemi',kol:'2. kolokvijum',desc:'Procesi, raspoređivanje procesora, upravljanje memorijom, zastoj (deadlock) i fajl sistemi.',
  mods:[]}
];
const CHS=[];COURSE.forEach(P=>P.mods.forEach(M=>M.ch.forEach(([id,n,t])=>CHS.push({id,n,t,m:M.m,mn:M.name,p:P.p}))));
const CHI={};CHS.forEach((c,i)=>{c.i=i;CHI[c.id]=c;});
