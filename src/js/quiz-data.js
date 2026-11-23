/* ---------- QUIZ DATA ---------- */
const Q={
c1:[
 ["Koliko poena nosi pismeni deo ispita?",["50","80","100","20"],1,"Pismeni (teorijski) deo nosi do 80 poena, a test iz laboratorijskih vežbi do 20."],
 ["Do kada važi položen kolokvijum iz AR?",["Do kraja školske godine","Samo u januarskom i februarskom roku","Zauvek","Samo u septembru"],1,"Ako se do kraja februarskog roka ne završe svi delovi, rezultat kolokvijuma se poništava."],
 ["Koliko poena je potrebno da bi se položio jedan deo ispita?",["41","45","51","60"],2,"Deo je položen sa 51 ili više poena."]
],
c2:[
 ["Šta od navedenog pripada ARHITEKTURI računara?",["Učestanost takta","Upotrebljena memorijska tehnologija","Skup instrukcija","Upravljački signali"],2,"Skup instrukcija je vidljiv programeru, pa je deo arhitekture. Ostalo je organizacija."],
 ["Koje dve osobine mora imati algoritam?",["Brzinu i tačnost","Konačnost i determinisanost","Paralelnost i lokalnost","Rekurzivnost i konačnost"],1,"Konačnost: konačan broj koraka. Determinisanost: svaka operacija ima jedno tumačenje."],
 ["Algoritam definiše:",["Samo skup operacija","Skup operacija i redosled njihovog izvršavanja","Samo redosled","Programski jezik"],1,"Slajd 12: (a) skup operacija i (b) redosled njihovog izvršavanja."],
 ["Da li računar ima instrukciju za množenje: to je pitanje...",["Organizacije","Arhitekture","Tehnologije","Operativnog sistema"],1,"Postojanje instrukcije je vidljivo programeru (arhitektura); kako je množenje izvedeno u hardveru je organizacija."]
],
c3:[
 ["Koja memorija je najbrža, a najmanja?",["L1 keš","Registri","RAM","L3 keš"],1,"Registri su u samom procesoru: oko 300 ps, ali ih ima samo oko 1000 bajtova."],
 ["Zašto postoji hijerarhija memorije?",["Zbog Murovog zakona","Jer brza memorija je skupa i mala, a velika je spora; hijerarhija daje kompromis","Zbog operativnog sistema","Da bi se smanjio broj instrukcija"],1,"Zahvaljujući lokalnosti, mala brza memorija blizu procesora pokriva većinu pristupa."],
 ["Koji registar čuva adresu sledeće instrukcije?",["IR (registar instrukcije)","PC (brojač naredbi)","Akumulator","ALU"],1,"PC (Program Counter, brojač naredbi) pokazuje na sledeću instrukciju; IR drži onu koja se izvršava."],
 ["Šta obuhvata crveni okvir na slajdu 18 (teritorija ovog predmeta)?",["Problem, algoritam, program","ISA, mikroarhitektura, logika","Uređaji i elektroni","Operativni sistem"],1,"Arhitektura računara se bavi nivoima ISA, mikroarhitekture i logike."]
],
c4:[
 ["Familija modela računara ima:",["Istu organizaciju, različitu arhitekturu","Istu arhitekturu, različitu organizaciju","Različito i jedno i drugo","Isto i jedno i drugo"],1,"Isti programi rade na svim modelima familije jer je arhitektura ista; razlikuju se organizacija, cena i performanse."],
 ["Murov zakon kaže da se približno svake dve godine udvostručuje:",["Takt","Broj tranzistora na čipu","Cena čipa","Veličina RAM-a"],1,"Gordon Mur, 1965/1975: broj tranzistora po čipu raste eksponencijalno."],
 ["Zašto su se pojavili višejezgarni procesori?",["Zbog Murovog zakona","Jer je prestalo da važi Denardovo skaliranje, pa takt nije mogao dalje da raste","Zbog Amdalovog zakona","Zbog RISC-V"],1,"Kad snaga po površini počne da raste, više takta znači previše toplote; umesto toga dodaju se jezgra."],
 ["Denardovo skaliranje je prestalo da važi oko:",["1975.","1990.","2005.","2020."],2,"Oko 2005, zbog struje curenja i granice napona; od tada takt stoji na ~3–5 GHz."]
],
c5:[
 ["Šta je ISA?",["Vrsta memorije","Interfejs između hardvera i softvera niskog nivoa","Operativni sistem","Vrsta magistrale"],1,"ISA (Instruction Set Architecture) je ključni interfejs između nivoa apstrakcije: sve što programer mašinskog jezika mora da zna."],
 ["Koji nivo je NIŽI od nivoa ISA?",["Operativni sistem","Kompajler","Mikroarhitektura (organizacija)","Aplikacija"],2,"Ispod ISA su mikroarhitektura, logička kola i tranzistori; iznad su OS, kompajler i aplikacije."],
 ["Glavna korist apstrakcije je da:",["Program radi brže","Svaki nivo koristi niži nivo bez poznavanja njegovih detalja","Nema potrebe za hardverom","Nema grešaka"],1,"Interfejs kaže šta, a krije kako: programer u Javi ne mora da zna kako rade tranzistori."],
 ["Koji jezik stvarni računar M0 direktno izvršava?",["Ln","L1","L0","Svaki jezik"],2,"Samo L0. Viši jezici se prevode (kompajliraju) ili interpretiraju naniže dok ne postanu L0."]
],
c6:[
 ["Koja NIJE jedna od 4 osnovne funkcije računara?",["Obrada podataka","Prenos podataka","Kompajliranje","Upravljanje"],2,"Četiri funkcije su obrada, skladištenje, prenos i upravljanje."],
 ["Šta NE određuje arhitekturu procesora?",["Skup registara","Mehanizam prekida","Učestanost takta","Načini adresiranja"],2,"Takt je deo organizacije. Arhitekturu određuju registri, tipovi podataka, instrukcije, format, adresiranje i prekidi."],
 ["Koje su tri magistrale sistema?",["Adresna, podataka i upravljačka","Ulazna, izlazna i memorijska","Brza, spora i keš","PCI, USB i SATA"],0,"Adresna nosi adresu, magistrala podataka podatke, upravljačka signale (RD, WR, READY...)."],
 ["Koja magistrala je jednosmerna (samo od procesora)?",["Magistrala podataka","Adresna","Upravljačka","Sve tri"],1,"Adresu uvek zadaje procesor; podaci idu u oba smera."],
 ["Koliko je 0x2D dekadno?",["29","45","32","213"],1,"2·16 + 13 = 45 (D = 13). Binarno 0010 1101."],
 ["Koliko bita adrese treba za RAM od 16 GB (bajt-adresabilan)?",["16","32","34","64"],2,"16 GB = 2⁴ · 2³⁰ = 2³⁴ bajtova, pa adresa ima 34 bita."],
 ["Jedna heksadecimalna cifra predstavlja tačno:",["2 bita","4 bita","8 bita","16 bita"],1,"16 = 2⁴, pa je jedna hex cifra jedan nibl od 4 bita."],
 ["Šta je glavna osobina Von Neumann-ove arhitekture?",["Odvojene memorije za program i podatke","Program i podaci su u istoj memoriji","Nema akumulatora","Koristi samo stek"],1,"Koncept zapamćenog programa: instrukcije i podaci dele memoriju i magistralu."],
 ["Šta je „Von Neumann-ovo usko grlo“?",["Spor disk","Jedna magistrala za instrukcije i podatke je preopterećena","Mali broj registara","Spora ALU"],1,"Instrukcija i podatak ne mogu da se prenose istovremeno jednim putem."],
 ["Gde moderni procesori koriste Harvard pristup?",["U RAM-u","Na disku","U L1 kešu (odvojen keš za instrukcije i podatke)","Nigde"],2,"Modifikovana Harvard arhitektura: L1 je podeljen, RAM je zajednički."],
 ["Drugi naziv za Von Neumann arhitekturu je:",["Harvard","Princeton","Berkeley","Stanford"],1,"Princeton arhitektura, po univerzitetu gde je Von Neumann radio (IAS mašina)."],
 ["Svaka instrukcija donosi sebe i jedan podatak. Koliko ciklusa magistrale treba za 4 instrukcije na Von Neumann mašini?",["4","5","8","16"],2,"Jedna magistrala: I1 D1 I2 D2 I3 D3 I4 D4 = 8 ciklusa. Harvard bi trebalo 5."]
],
c7:[
 ["Program ima f = 0,5 i radi na N = 5 jezgara. Ubrzanje je:",["2,5","1,67","5","2"],1,"S = 1 / (0,5 + 0,5/5) = 1 / 0,6 = 1,67. To je primer sa slajdova 19–20 (100 s → 60 s)."],
 ["Ako je f = 0,9, najveće moguće ubrzanje (N → ∞) je:",["9","10","90","beskonačno"],1,"S_max = 1/(1 − f) = 1/0,1 = 10."],
 ["f = 0,5, N = 2. Ubrzanje je:",["2","1,33","1,5","1"],1,"S = 1 / (0,5 + 0,5/2) = 1 / 0,75 = 1,33."],
 ["60% vremena se ubrza 3 puta. Ukupno ubrzanje?",["1,67","1,5","2","3"],0,"S = 1 / (0,4 + 0,6/3) = 1 / 0,6 = 1,67."],
 ["Koji princip dizajna proizilazi iz Amdalovog zakona?",["Make the common case fast","Smaller is faster","Keep it simple","Divide and conquer"],0,"Najviše dobijamo ubrzavanjem dela koji zauzima najviše vremena."],
 ["Šta se dešava sa sekvencijalnim delom programa kad dodajemo jezgra?",["Smanjuje se proporcionalno","Ostaje isti i postaje sve dominantniji","Nestaje","Raste"],1,"Slajd 14: sekvencijalni deo ne nestaje i ne smanjuje se, samo postaje sve dominantniji."],
 ["Želimo ukupno ubrzanje 2, a deo programa možemo ubrzati 4 puta. Koliki mora biti taj deo?",["50%","66,7%","75%","25%"],1,"2 = 1/((1 − f) + f/4) → 1 − 0,75f = 0,5 → f = 0,667 (Primer 2)."]
],
c8:[
 ["Koliko traje jedan ciklus takta na 2 GHz?",["2 ns","0,5 ns","0,2 ns","5 ns"],1,"T = 1/f = 1 / (2·10⁹) s = 0,5·10⁻⁹ s = 0,5 ns."],
 ["Program ima 10⁹ instrukcija, CPI = 2, takt 1 GHz. CPU vreme je:",["0,5 s","1 s","2 s","4 s"],2,"CPU vreme = IC × CPI / f = 10⁹ × 2 / 10⁹ = 2 s."],
 ["Udeo: 50% instrukcija CPI 1, 50% CPI 3. Prosečan CPI?",["1,5","2","3","4"],1,"0,5·1 + 0,5·3 = 2."],
 ["Program traje 12 s na B i 8 s na A. A je brži od B za:",["1,5 puta (50%)","1,33 puta","4 puta","33%"],0,"vreme_B / vreme_A = 12/8 = 1,5, dakle 1,5 puta, odnosno 50% brži."],
 ["Propusnost (throughput) je:",["Vreme jednog posla","Broj poslova u jedinici vremena","Deo vremena kad sistem radi","Potrošnja po vatu"],1,"Latentnost je vreme jednog posla; propusnost je broj poslova u jedinici vremena."],
 ["Na CPI NE utiče:",["Kompajler","ISA","Organizacija","Tehnologija izrade tranzistora"],3,"Tehnologija utiče na trajanje ciklusa T, ne na broj ciklusa po instrukciji."],
 ["U primeru 4 sa predavanja najbolje poboljšanje je bilo:",["Branch CPI 4→3","Takt 2→2,3 GHz","Store CPI 3→2","Sva su ista"],1,"Takt ubrzava ceo program (f = 1), S = 1,15, više od 1,05 i 1,034."]
],
c9:[
 ["Šta je TLP?",["Paralelizam na nivou podataka","Paralelizam na nivou niti","Paralelizam na nivou instrukcija","Vrsta keša"],1,"TLP = Thread Level Parallelism."],
 ["Protočna obrada (pipelining) je primer:",["DLP","ILP","TLP","Distribuirane memorije"],1,"Preklapanje faza više instrukcija je paralelizam na nivou instrukcija."],
 ["Hyper-Threading omogućava da:",["Jedno fizičko jezgro izvršava 2 niti","Takt bude dvostruko veći","Keš bude dvostruko veći","Procesor nema keš"],0,"Jedno fizičko jezgro se vidi kao 2 logička jezgra."],
 ["Princip lokalnosti kaže da programi oko 90% vremena provode u oko:",["50% koda","10% koda","1% koda","90% koda"],1,"Pravilo 90/10."],
 ["Prolazak kroz niz element po element je primer:",["Vremenske lokalnosti","Prostorne lokalnosti","Hyper-Threadinga","DMA"],1,"Koriste se susedne adrese, pa je to prostorna lokalnost."],
 ["Protočna obrada sa k = 5 faza i n = 10 instrukcija traje:",["50 ciklusa","14 ciklusa","15 ciklusa","10 ciklusa"],1,"k + n − 1 = 5 + 10 − 1 = 14. Bez protočne obrade 50."],
 ["Procesori koji dele jednu zajedničku memoriju zovu se:",["Labavo spregnuti","Čvrsto spregnuti","Distribuirani","Superskalarni"],1,"Slajd 32: deljena memorija = čvrsto spregnuti procesori; distribuirana = labavo spregnuti."]
],
c10:[
 ["Šta sadrži brojač naredbi (BN, PC)?",["Trenutnu instrukciju","Adresu sledeće instrukcije","Rezultat ALU","Zastavice"],1,"BN uvek pokazuje na sledeću instrukciju; RN sadrži trenutnu."],
 ["Koji registar čuva podatak pročitan iz memorije?",["MAR (ARM)","MBR (PRM)","PC","PSW"],1,"ARM čuva adresu, PRM (prihvatni registar memorije) čuva podatak."],
 ["U programu 0001 1000 / 0011 1001 / 0010 1010 / 0111 0000, šta radi treća instrukcija?",["LOAD 10","STORE 10","ADD 10","HALT"],1,"0010 je STORE, 1010 je adresa 10: M[10] ← AK."],
 ["Sa 4 bita adresnog dela može se adresirati:",["4 lokacije","8 lokacija","16 lokacija","256 lokacija"],2,"2⁴ = 16 lokacija (0–15)."],
 ["Koje instrukcije zahtevaju akumulator?",["Troadresne","Dvoadresne","Jednoadresne","Nulaadresne"],2,"Jednoadresna instrukcija navodi samo jedan operand; drugi operand i rezultat su u akumulatoru."],
 ["Nulaadresne instrukcije rade sa:",["Registrima","Stekom","Akumulatorom","Diskom"],1,"Operandi su na vrhu steka (PUSH, PUSH, ADD, POP)."],
 ["Stek radi po principu:",["FIFO","LIFO","Slučajnog pristupa","Asocijativnog pristupa"],1,"Last In, First Out: poslednje stavljeno se prvo skida."],
 ["Šta svaka instrukcija MORA da ima?",["Adresni deo","Operacioni kod (opkod)","Akumulator","Tri adrese"],1,"Slajd 10: opkod je obavezan (šta raditi), adresni delovi su opcioni (HALT ih nema)."]
],
c11:[
 ["Koja je 8. faza u modelu sa 9 faza?",["Upis rezultata","Provera da li postoji prekid","Dekodiranje","Adresa sledeće instrukcije"],1,"8. provera prekida, 9. izračunavanje adrese sledeće instrukcije."],
 ["Koja mikrooperacija je PRVI korak donošenja svake instrukcije?",["RN ← S(PRM)","ARM ← S(BN)","BN ← S(BN) + 1","AK ← S(PRM)"],1,"Adresa instrukcije iz BN ide u adresni registar memorije, pa se tek onda čita memorija."],
 ["Redosled adresa u adresnom registru memorije na slajdu 12 je:",["4, 5, 6, 7","8, 9, 10","4, 8, 5, 9, 6, 10, 7","4, 5, 6, 7, 8, 9, 10"],2,"Naizmenično adresa instrukcije (iz BN) i adresa podatka (iz adresnog dela RN); HALT nema podatak."],
 ["Koja instrukcija pripada grupi prenosa upravljanja?",["Push","Jump Conditional","XOR","Convert"],1,"Jump, Jump Conditional, Call, Return, Skip, Halt su prenos upravljanja."],
 ["Posle izvršenja programa u laboratoriji, šta je na adresi 08?",["100","200","300","0"],2,"R1 = 100, R2 = 200, ADD daje AC = 300, MAM 08 upisuje 300."],
 ["Koje faze preskače instrukcija HALT?",["Samo fazu 1","Faze 3–7 (nema operanada ni rezultata)","Faze 8 i 9","Nijednu"],1,"HALT se donese i dekodira, a pošto nema operanada, ide pravo na proveru prekida."]
],
c12:[
 ["Koji alat povezuje objektne fajlove u izvršni program?",["Asembler","Linker","Loader","Kompajler"],1,"Asembler → objektni kod → linker → izvršni kod → loader."],
 ["Zašto asembler ima dva prolaza?",["Da bi bio brži","Jer se oznaka može koristiti pre nego što je definisana","Zbog keša","Zbog prekida"],1,"U prvom prolazu se prave tabele simbola, u drugom se simboli zamenjuju adresama."],
 ["Asocijativna memorija pristupa ćeliji preko:",["Adrese","Ključa (dela sadržaja)","Registra","Steka"],1,"Identifikacija ćelije je po ključu, a ne po adresi."],
 ["Idući ka vrhu hijerarhije memorije, memorija postaje:",["Sporija i veća","Brža, skuplja i manja","Jeftinija","Sporija i skuplja"],1,"Registri i keš su najbrži, ali najmanji i najskuplji."],
 ["Keš 1 ns, RAM 100 ns, 95% pogodaka. Prosečno vreme pristupa?",["1 ns","5,95 ns","50 ns","95 ns"],1,"0,95 × 1 + 0,05 × 100 = 5,95 ns."],
 ["Direct-mapped keš: 2048 linija od 32 B. Koliko bita ima offset, a koliko indeks?",["5 i 11","11 i 5","6 i 10","32 i 2048"],0,"32 = 2⁵ → offset 5 bita; 2048 = 2¹¹ → indeks 11 bita."],
 ["Keš 8 linija × 4 B, adresa 8 bita. Kojoj liniji pripada adresa 45?",["1","3","5","11"],1,"45 = 001 011 01: tag 1, indeks 011 = 3, offset 1."],
 ["Šta keš pamti uz svaku liniju da bi znao koji je blok u njoj?",["Offset","Tag","Indeks","PC"],1,"Indeks je određen položajem linije; tag razlikuje blokove koji dele istu liniju."]
],
c13:[
 ["Koji model mašine koristi ARM?",["Stek","Akumulator","Registar–registar (load/store)","Memorija–memorija"],2,"ARM, MIPS i SPARC su registar–registar."],
 ["Koji model koristi VAX?",["Stek","Memorija–memorija","Akumulator","Registar–registar"],1,"VAX može da sabere dva operanda direktno iz memorije."],
 ["Šta je tipično za RISC?",["Instrukcije promenljive dužine","Mikroprogramsko upravljanje","Instrukcije fiksne dužine i load/store pristup memoriji","Malo registara"],2,"RISC: fiksna dužina, samo load/store idu u memoriju, mnogo registara."],
 ["Koja ISA je otvorena i besplatna?",["x86","ARM","RISC-V","PowerPC"],2,"RISC-V je slobodna ISA; x86 i ARM su zatvorene."],
 ["Šta znači da je x86 CISC procesor iznutra „RISC-oliki“?",["Nema keš","Složene instrukcije razbija na jednostavne mikro-operacije (µops)","Koristi ARM jezgra","Ima fiksnu dužinu instrukcija"],1,"Dekoder pretvara x86 instrukcije u µops koje se izvršavaju superskalarno."],
 ["CISC tipično koristi:",["Hardversko upravljanje","Mikroprogramsko upravljanje","Samo load/store","Samo stek"],1,"Složene instrukcije se izvršavaju kao mikroprogrami iz upravljačke memorije."],
 ["VLIW arhitektura najviše zavisi od:",["Brzine takta","Pametnog kompajlera","Veličine RAM-a","Diska"],1,"Kompajler pakuje više operacija u jednu dugu instrukciju."]
],
c14:[
 ["U ASM dijagramu čitanja, šta CPU čeka pre nego što pročita podatak?",["Signal RD","Signal READY od memorije","Prekid","Takt"],1,"CPU ostaje u petlji (ili WAIT stanju) dok memorija ne pošalje READY."],
 ["Kod spore memorije CPU ubacuje taktove u kojima samo čeka. Kako se zovu?",["Wait states (stanja čekanja)","Hazardi","Prekidi","Cache miss"],0,"Dok je READY = 0, CPU je u stanju čekanja tw."],
 ["Koju adresu MMU prevodi u fizičku?",["Fizičku","Logičku (virtuelnu)","Adresu porta","Adresu prekida"],1,"MMU pretvara logičku adresu iz programa u fizičku adresu u RAM-u."],
 ["Koliko čitanja memorije treba za operand kod indirektnog memorijskog adresiranja?",["0","1","2","3"],2,"Prvo se čita adresa operanda, pa sam operand (slajd 8)."],
 ["Šta procesor prvo radi kad prihvati prekid?",["Briše memoriju","Čuva PC i PSW na stek","Gasi se","Pokreće DMA"],1,"Da bi se kasnije vratio tamo gde je stao, sa istim zastavicama."],
 ["Adresa rutine za obradu prekida se dobija iz:",["Keša","Tabele vektora prekida","Diska","Akumulatora"],1,"Broj prekida je indeks u tabeli vektora prekida, gde piše adresa rutine. Bez prevođenja adrese (MMU)."],
 ["Koja U/I metoda prenosi podatke bez učešća CPU?",["Polling","Interrupt driven I/O","DMA","Busy-waiting"],2,"DMA kontroler direktno prenosi blok u memoriju i javi se jednim prekidom na kraju."],
 ["Čemu služi kontroler prekida 8259A?",["Prevodi adrese","Skuplja prekide od više uređaja i šalje procesoru broj vektora","Prenosi blokove podataka","Ubrzava keš"],1,"Ima 8 ulaza IR0–IR7, bira prekid najvišeg prioriteta i preko magistrale šalje broj vektora."]
],
c15:[
 ["U instrukciji MOV #3, R1, operand #3 je adresiran:",["Direktno","Indirektno","Trenutno","Indeksno"],2,"# označava trenutnu vrednost u samoj instrukciji."],
 ["LOAD R1, (R2) je:",["Direktno registarsko","Indirektno registarsko","Trenutno","Bazno"],1,"Zagrade znače: R2 sadrži adresu operanda."],
 ["Efektivna adresa kod indeksnog adresiranja je:",["S(BR) + P","k + S(IR)","S(S(A))","A"],1,"Početna adresa niza + sadržaj indeks registra."],
 ["Bazno adresiranje omogućava da:",["Program radi u bilo kom delu memorije","Operand bude u instrukciji","Nema pristupa memoriji","Se koristi stek"],0,"Sve adrese su relativne u odnosu na bazni registar, u koji OS upiše početak programa."],
 ["Indirektno adresiranje se koristi za:",["Konstante","Pokazivače i prenos nizova kao parametara","Statičke promenljive","Prekide"],1,"Adresa u instrukciji pokazuje na mesto gde je stvarna adresa, kao pokazivač."],
 ["S(BR) = 1000, D = 20, S(IR) = 3. Bazno+indeksna EA je:",["1003","1020","1023","2023"],2,"EA = 1000 + 20 + 3 = 1023."],
 ["Kod Intela, MOV AX, 2000 je:",["Direktno memorijsko","Trenutno","Indirektno","Indeksno"],1,"Broj bez uglastih zagrada je trenutna vrednost; MOV AX, [2000] bi bilo direktno memorijsko."],
 ["Glavna prednost registarskog adresiranja je:",["Neograničen broj registara","Kraći adresni deo i za red veličine brži pristup","Ne treba opkod","Radi samo sa nizovima"],1,"Slajd 18: kraće i brže, ali registara ima malo."]
],
c16:[
 ["Kako se 0x12345678 upisuje u little endian od adrese 00?",["12 34 56 78","78 56 34 12","21 43 65 87","56 78 12 34"],1,"Najmanje značajan bajt (78) ide na najnižu adresu."],
 ["Koji redosled bajtova koristi Internet (mrežni protokoli)?",["Little endian","Big endian","Oba","Nijedan"],1,"Mrežni redosled bajtova je big endian; JVM takođe."],
 ["Koji redosled koristi Intel x86?",["Big endian","Little endian","Zavisi od programa","Middle endian"],1,"Intel 8086 i svi naslednici, kao i VAX, su little endian."],
 ["Koji je 32-bitni Intel registar?",["AX","RAX","EAX","AL"],2,"AL 8, AX 16, EAX 32, RAX 64 bita."],
 ["Posle MOV AX, 1234H, šta je u AL?",["12H","34H","1234H","0"],1,"AL je donji bajt AX-a (34H), AH je gornji (12H)."],
 ["Kod x86, EA se računa kao:",["Base + Index × Scale + Displacement","Base × Index","PC + 1","Segment × 16"],0,"Scale može biti 1, 2, 4 ili 8 (veličina elementa niza u bajtovima)."],
 ["Koliko znakova ima osnovni ASCII?",["64","128","256","65 536"],1,"7 bita → 2⁷ = 128 znakova."],
 ["Koji ASCII kod ima slovo 'A'?",["48","65","97","32"],1,"'A' = 65 (41h), 'a' = 97, '0' = 48, razmak = 32."]
]
};
const ORDER=["c1","c2","c3","c4","c5","c6","c7","c8","c9","c10","c11","c12","c13","c14","c15","c16"];
const FINAL=[["c2",0],["c5",0],["c6",1],["c4",2],["c6",8],["c8",1],["c8",3],["c7",2],["c7",1],["c7",3],["c9",2],["c10",0],["c11",0],["c10",4],["c13",0],["c13",2],["c12",1],["c12",4],["c14",4],["c14",6],["c15",0],["c15",2],["c15",5],["c16",0]].map(([c,i])=>Q[c][i]);