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
],
c18:[
 ["Koje dve jedinice ima procesor 8086 i rade istovremeno?",["ALU i FPU","BIU i EU","CU i MMU","L1 i L2"],1,"BIU (jedinica za spregu sa magistralom) donosi instrukcije i podatke, EU (izvršna jedinica) ih izvršava."],
 ["Kako 8086 računa fizičku adresu?",["segment + pomeraj","segment × 16 + pomeraj","segment × 256 + pomeraj","pomeraj × 16 + segment"],1,"Sadržaj segmentnog registra se pomeri 4 bita ulevo (× 16) i doda mu se pomeraj: 20-bitna adresa, 1 MB memorije."],
 ["Koliko bita ima adresna magistrala 8086 i koliko memorije adresira?",["16 bita, 64 KB","20 bita, 1 MB","24 bita, 16 MB","32 bita, 4 GB"],1,"2²⁰ = 1 MB."],
 ["Koji registar kod Intela ima ulogu brojača naredbi (BN)?",["SP","IP","BP","SI"],1,"IP (instruction pointer), u 32 bita EIP, u 64 bita RIP."],
 ["Segment 1234H, pomeraj 0005H. Fizička adresa je:",["12345H","12339H","1239H","17345H"],0,"1234H × 16 = 12340H; + 5 = 12345H."]
],
c19:[
 ["Šta radi izvršenje naredbe GOTO 150?",["BN ← BN + 150","BN ← 150","AK ← 150","M[150] ← BN"],1,"Bezuslovni skok samo upisuje adresni deo naredbe u brojač naredbi."],
 ["Kada se BN poveća za 1 u ciklusu instrukcije?",["Posle izvršenja","Odmah posle donošenja instrukcije, pre izvršenja","Samo kod skoka","Na kraju programa"],1,"Faza donošenja: RN ← M[BN], BN ← BN + 1. Kad instrukcija počne da se izvršava, BN već pokazuje na sledeću."],
 ["Koji bit stanja se postavlja kad je rezultat nula?",["N","Z","V","C"],1,"Z (zero). N je znak, V prekoračenje, C prenos."],
 ["Kako se realizuje uslovni skok?",["Uvek se skače","Skače se samo ako bitovi stanja (N, Z, V, C) zadovoljavaju uslov","Skače se na adresu iz steka","Pomoću prekida"],1,"Npr. posle CMP, BEQ skače samo ako je Z = 1."],
 ["Instrukcija CMP A, B:",["Upisuje A − B u A","Oduzima i postavlja bitove stanja, bez čuvanja rezultata","Menja mesta A i B","Skače ako su jednaki"],1,"CMP je oduzimanje koje samo postavlja N, Z, V, C."]
],
c20:[
 ["Šta CALL mora da sačuva da bi se program mogao vratiti?",["Sadržaj akumulatora","Povratnu adresu (sadržaj BN)","Ceo program","Tabelu stranica"],1,"Povratna adresa je adresa naredbe posle CALL; RETURN je vraća u BN."],
 ["Koji način čuvanja povratne adrese podržava rekurziju?",["Fiksna reč","Prva reč pozvanog modula","Stek","Nijedan"],2,"Kod fiksne reči i prve reči modula drugi poziv pregazi prvu povratnu adresu. Stek čuva sve, LIFO redom."],
 ["Po čemu se korutine razlikuju od potprograma?",["Nemaju povratnu adresu","Moduli su ravnopravni: RESUME nastavlja drugi modul od mesta gde je stao","Ne mogu da se pozivaju","Rade samo na Itanium-u"],1,"Kod potprograma pozvani uvek počinje od početka; korutina nastavlja tamo gde je predala kontrolu."],
 ["Stek radi po principu:",["FIFO","LIFO","Slučajnom","Po prioritetu"],1,"Poslednji stavljen, prvi skinut (push/pop)."]
],
c21:[
 ["Šta radi push AX kod x86?",["SP se poveća, AX se upiše","SP se smanji za 2, AX se upiše na vrh steka","AX ← vrh steka","Briše stek"],1,"Stek kod x86 raste nadole: SP ← SP − 2, M[SS:SP] ← AX."],
 ["U Intel sintaksi mov eax, ebx znači:",["ebx ← eax","eax ← ebx","eax i ebx menjaju mesta","Poredi eax i ebx"],1,"Intel: odredište prvo. AT&T piše obrnuto: movl %ebx, %eax."],
 ["Koja direktiva rezerviše 4 bajta (dvostruku reč)?",["DB","DW","DD","DQ"],2,"DB 1 bajt, DW 2, DD 4, DQ 8."],
 ["Po čemu se AT&T sintaksa vidljivo razlikuje?",["Registri sa %, konstante sa $, izvor pa odredište","Nema registara","Piše se velikim slovima","Nema komentara"],0,"Npr. movl $5, %eax."]
],
c22:[
 ["Pomeranje (shift) ulevo za jedan bit odgovara:",["Deljenju sa 2","Množenju sa 2","Komplementu","Rotaciji"],1,"Svaki bit ide na mesto duplo veće težine (ako nema prekoračenja)."],
 ["Čime se izvlače (izdvajaju) određeni bitovi reči?",["OR sa maskom","AND sa maskom","XOR sa maskom","Rotacijom"],1,"AND sa maskom koja ima 1 na željenim pozicijama briše sve ostale."],
 ["Kako se određeni bitovi postavljaju na 1?",["AND sa maskom","OR sa maskom","NOT","SHR"],1,"x OR 1 = 1, x OR 0 = x."],
 ["Čime se bitovi invertuju na izabranim pozicijama?",["AND","OR","XOR sa maskom","MOV"],2,"x XOR 1 = NOT x, x XOR 0 = x."],
 ["Protočna obrada (pipelining) ubrzava rad jer:",["Svaka instrukcija se izvrši brže","Više instrukcija je istovremeno u različitim fazama","Smanjuje broj instrukcija","Uklanja keš"],1,"Kao pokretna traka: povećava propusnost, ne skraćuje jednu instrukciju."],
 ["Rotacija se razlikuje od pomeranja po tome što:",["Bit koji izađe vraća se na drugi kraj","Uvek ubacuje nule","Radi samo ulevo","Menja znak"],0,"Kod rotacije se ne gubi nijedan bit."]
],
c23:[
 ["Šta je mikrooperacija?",["Instrukcija asemblera","Elementarna operacija nad registrima u jednom taktu (npr. MAR ← BN)","Sistemski poziv","Potprogram"],1,"Instrukcija ISA-e se izvršava kao niz mikrooperacija."],
 ["Mikroprogramirana upravljačka jedinica:",["Je tvrdo ožičena","Čuva mikroprogram u upravljačkoj memoriji","Nema takt","Ne može da izvršava skokove"],1,"Svaka instrukcija je niz mikroinstrukcija u ROM-u (upravljačkoj memoriji); lakše se menja, ali je sporija od ožičene."],
 ["Šta je firmver?",["Korisnički program","Softver trajno upisan u hardver (npr. mikroprogram, BIOS)","Drajver za štampač","Operativni sistem"],1,"Most između hardvera i softvera."],
 ["Mikroarhitektura je:",["Isto što i ISA","Način na koji je ISA realizovana u hardveru","Skup instrukcija","Asemblerski jezik"],1,"Ista ISA (x86) ima mnogo mikroarhitektura (Skylake, Zen…)."],
 ["Prednost tvrdo ožičene upravljačke jedinice:",["Lakša izmena","Veća brzina","Manje tranzistora uvek","Podrška za mikroprogram"],1,"RISC procesori koriste ožičeno upravljanje zbog brzine."]
],
d1:[
 ["Flynn-ova klasifikacija se zasniva na:",["Broju jezgara","Broju tokova instrukcija i tokova podataka","Veličini keša","Brzini takta"],1,"SISD, SIMD, MISD, MIMD."],
 ["Vektorski procesor i GPU su primer klase:",["SISD","SIMD","MISD","MIMD"],1,"Jedna instrukcija se primenjuje na mnogo podataka."],
 ["Višejezgarni procesor je primer klase:",["SISD","SIMD","MISD","MIMD"],3,"Svako jezgro ima svoj tok instrukcija i svoje podatke."],
 ["Klasičan Von Neumann-ov računar je:",["SISD","SIMD","MISD","MIMD"],0,"Jedan tok instrukcija, jedan tok podataka."]
],
d2:[
 ["Glavni problem sistema sa jednom magistralom je:",["Previše tranzistora","Usko grlo: u jednom trenutku samo jedan prenos","Nema adresa","Ne može da radi sa memorijom"],1,"Zato postoje hijerarhije magistrala (procesor-memorija, PCI, spore U/I)."],
 ["Sinhrona magistrala:",["Nema takt","Sve događaje meri zajedničkim taktom","Koristi rukovanje (handshake)","Radi samo sa diskovima"],1,"Asinhrona koristi signale rukovanja umesto takta."],
 ["DRAM se razlikuje od SRAM-a po tome što:",["Je brži","Mora da se periodično osvežava","Ne gubi podatke bez napajanja","Ima 6 tranzistora po bitu"],1,"DRAM pamti bit u kondenzatoru koji se prazni; SRAM je flip-flop (brži, skuplji, za keš)."],
 ["Promašaj u kešu pri prvom pristupu bloku zove se:",["Promašaj zbog kapaciteta","Obavezni (hladni) promašaj","Konfliktni promašaj","Lažni promašaj"],1,"Tri vrste: obavezni, zbog kapaciteta i konfliktni."]
],
d3:[
 ["Nemaskirajući prekid (NMI):",["Može da se zabrani","Ne može da se zabrani maskom","Dolazi od programa","Ima najniži prioritet"],1,"Koristi se za kritične događaje (pad napona, greška memorije)."],
 ["Unutrašnji prekid (izuzetak) nastaje zbog:",["Tastature","Događaja u samom procesoru, npr. deljenja nulom","Mrežne kartice","Tajmera"],1,"Spoljašnje prekide izazivaju uređaji."],
 ["Šta se čuva pri prihvatanju prekida?",["Samo AK","Kontekst procesora: BN, PSW i registri","Ceo program","Ništa"],1,"Da bi se prekinuti program kasnije nastavio kao da se ništa nije desilo."],
 ["Ugnežđeni prekidi znači:",["Prekid višeg prioriteta može da prekine obradu prekida nižeg prioriteta","Svi prekidi se ignorišu","Prekidi se obrađuju samo FIFO","Program prekida sam sebe"],0,"Zato se kontekst čuva na steku."]
],
d4:[
 ["Šta radi punilac (loader)?",["Prevodi izvorni kod","Učitava izvršni program u memoriju i priprema ga za izvršavanje","Briše program","Povezuje mrežu"],1,"Postavlja adrese (relokacija) i predaje kontrolu programu."],
 ["Interpretator se razlikuje od kompajlera po tome što:",["Prevodi ceo program unapred","Prevodi i izvršava naredbu po naredbu","Ne postoji","Radi samo u asembleru"],1,"Kompajler pravi izvršni program pa se on izvršava; interpretator izvršava direktno."],
 ["Zakon apsorpcije glasi:",["A + A·B = A","A + B = B + A","A·(B + C) = A·B + A·C","A + 1 = A"],0,"I A·(A + B) = A."],
 ["Drugi komplement broja −5 u 8 bita:",["10000101","11111010","11111011","00000101"],2,"5 = 00000101, invertuj: 11111010, + 1 = 11111011."],
 ["Ekvivalencija hardvera i softvera znači:",["Hardver i softver su isto","Svaka operacija može da se realizuje i u hardveru i u softveru","Softver je uvek brži","Hardver se ne može menjati"],1,"Izbor je stvar cene, brzine i fleksibilnosti."]
],
o1:[
 ["Operativni sistem je:",["Čip na matičnoj ploči","Program koji predstavlja interfejs između korisnika i hardvera","Samo grafički interfejs","Prevodilac"],1,"Definicija sa slajda 10 Modula 7."],
 ["Šta je rešenje „faze 2“ evolucije OS-a (neiskorišćenost CPU)?",["Prekidi","Multiprogramiranje","Dva režima rada","Virtuelne mašine"],1,"Faza 1: preklapanje U/I i računanja (prekidi). Faza 2: multiprogramiranje (context switching). Faza 3: zaštita (supervisor/user)."],
 ["Sistemski poziv je u suštini:",["Običan CALL","Softverski prekid koji prebacuje procesor u sistemski režim","Hardverski prekid","Izuzetak zbog greške"],1,"Prebaci režim i skoči na unapred određeno mesto u OS-u."],
 ["Privilegovane instrukcije sme da izvršava:",["Svaki program","Samo OS, u sistemskom (supervisor) režimu","Samo shell","Samo drajveri u korisničkom režimu"],1,"Pokušaj iz korisničkog režima izaziva izuzetak."],
 ["Linux je primer kog modela OS-a?",["Monolitnog bez strukture","Modularnog","Slojevitog (THE)","Čiste virtuelne mašine"],1,"Moduli (npr. drajveri) se učitavaju i izbacuju dok sistem radi, svi u jezgru."],
 ["Iz praznog hoda OS NE izlazi zbog:",["Hardverskog prekida","Izuzetka","Sistemskog poziva","Isteka praznog hoda bez događaja"],3,"OS je vođen događajima: budi ga prekid, izuzetak ili sistemski poziv."],
 ["Vremensko multipleksiranje resursa je primer:",["Deljenja memorije na delove","Dodele procesora jednom procesu na neko vreme","Particije diska","Keša"],1,"Prostorno: memorija i disk se dele na delove."]
],
o2:[
 ["Gde se nalaze kontrolni blokovi procesa?",["U memoriji procesa","U memoriji rezervisanoj za OS","Na disku uvek","U kešu"],1,"Da ih proces ne bi mogao menjati."],
 ["Koji prelaz NE postoji u dijagramu stanja procesa?",["SPREMAN → IZVRŠAVA SE","IZVRŠAVA SE → ČEKA","ČEKA → IZVRŠAVA SE","ČEKA → SPREMAN"],2,"Proces koji je dočekao događaj ide u red spremnih."],
 ["Kada proces prelazi iz IZVRŠAVA SE u SPREMAN?",["Kad zatraži U/I","Kad mu istekne kvantum","Kad završi","Kad se kreira"],1,"Prekinut je, ali bi mogao da nastavi."],
 ["Dugoročni planer upravlja:",["Redom poruka","Stepenom multiprogramiranja","Kešom","Diskom"],1,"Odlučuje koliko procesa ulazi u memoriju."],
 ["Lokalne promenljive funkcije nalaze se na:",["Hipu","Steku","U oblasti teksta","U inicijalizovanim podacima"],1,"Memorija dobijena sa malloc je na hipu."],
 ["Spreman/suspendovan proces je:",["U memoriji i čeka događaj","Na disku i ne čeka događaj","Na procesoru","Završen"],1,"Postaće spreman čim ga OS vrati u memoriju."],
 ["Šta radi dispečer?",["Bira proces","Sprovodi izbor: promena konteksta, prelaz u korisnički režim, skok u program","Briše procese","Upravlja diskom"],1,"Bira kratkoročni planer, dispečer izvršava."]
],
o3:[
 ["FCFS, P1 = 24, P2 = 3, P3 = 3, redosled P1, P2, P3. Prosečno vreme čekanja:",["3","10","17","27"],2,"(0 + 24 + 27)/3 = 17."],
 ["Koji algoritam minimizira prosečno vreme čekanja (bez prekidanja)?",["FCFS","SJF","RR","Prioritetni"],1,"Dokazivo optimalan, ali trajanje se ne zna unapred."],
 ["Efekat konvoja je karakterističan za:",["RR","FCFS","SRTF","Više nivoa"],1,"Kratki procesi čekaju iza dugog."],
 ["Previše mali kvantum kod RR dovodi do:",["Gladovanja","Previše promena konteksta i pada efikasnosti","Efekta konvoja","Zastoja"],1,"Preveliki kvantum pretvara RR u FCFS."],
 ["Od FCFS, SRTF i RR, do gladovanja može dovesti:",["FCFS","SRTF","RR","Nijedan"],1,"Kratki procesi koji stalno pristižu odlažu dugi."],
 ["Vreme odziva je vreme od zahteva do:",["Završetka procesa","Početka davanja odgovora","Ulaska u memoriju","Prvog U/I"],1,"Ne do kraja, nego do prvog odgovora."],
 ["Problem gladovanja kod prioritetnog planiranja rešava se:",["Smanjenjem kvantuma","Starenjem (aging)","FCFS-om","Swapping-om"],1,"Prioritet raste sa vremenom čekanja."]
],
o4:[
 ["Početna vrednost semafora za međusobno isključivanje:",["0","1","n","−1"],1,"0 za sinhronizaciju, broj resursa za dodelu resursa."],
 ["Zašto N := N + 1 nije bezbedno bez zaštite?",["To je jedna instrukcija","To su tri instrukcije (LOAD, ADD, STORE) i prekid može doći između","Zbog keša","Zbog diska"],1,"Stanje trke: rezultat zavisi od trenutka prekida."],
 ["Kako Dijkstrin P izbegava zaposleno čekanje?",["Vrti petlju","Uspava proces u redu čekanja semafora","Isključuje računar","Ne izbegava"],1,"Uspavan proces ne troši procesor."],
 ["Šta čini P i V nedeljivim na jednom procesoru?",["Keš","Zabrana prekida za vreme operacije","DMA","Stek"],1,"Na više procesora koriste se nedeljive instrukcije (test-and-set)."],
 ["Koje rešenje problema filozofa razbija kružno čekanje?",["Svaki uzima levi pa desni","Neparni uzimaju levi pa desni, parni desni pa levi","Svi jedu istovremeno","Bez semafora"],1,"Asimetrija ne dozvoljava da se krug zatvori."],
 ["Najbrži način IPC-a na istom računaru je:",["Razmena poruka","Deljena memorija","Datoteka","Mreža"],1,"Ali sinhronizaciju obezbeđuje programer."],
 ["Sinhroni (blokirajući) send znači:",["Pošiljalac odmah nastavlja","Pošiljalac čeka dok poruka ne bude primljena","Poruka se gubi","Ne postoji"],1,"Asinhroni: nastavlja odmah."]
],
o5:[
 ["Šta niti jednog procesa DELE?",["Stek","Registre","Heap i globalne promenljive","Brojač naredbi"],2,"Svaka nit ima svoj stek, registre i PC."],
 ["U modelu N:1, ako jedna nit napravi blokirajući sistemski poziv:",["Blokira se samo ta nit","Blokira se ceo proces","Ništa se ne dešava","Pravi se nova kernel nit"],1,"Jezgro vidi samo jednu nit."],
 ["Kojim pozivom Linux pravi nit?",["fork()","clone()","exec()","wait()"],1,"clone() sa deljenjem adresnog prostora."],
 ["NI vrednost u top-u: manja vrednost znači:",["Niži prioritet","Viši prioritet","Više memorije","Proces je zaustavljen"],1,"Opseg −20 (najviši) do 19 (najniži)."],
 ["RES u top-u je:",["Virtuelna memorija","Rezidentna (fizička) memorija procesa","Deljena memorija","Prioritet"],1,"VIRT je virtuelna, SHR deljena."],
 ["HAL u Windows-u je:",["Planer","Sloj hardverske apstrakcije koji izoluje kod zavisan od platforme","Sistem datoteka","Grafički podsistem"],1,"Omogućava prenosivost."],
 ["Zašto Chrome pravi poseban renderer proces za svaki sajt?",["Brzina","Izolacija: problem jednog sajta ne ruši ceo pregledač, i sandbox","Manje memorije","Zbog Jave"],1,"Procesi su izolovani, niti nisu."]
],
o6:[
 ["Koji NIJE uslov za nastanak zastoja?",["Međusobno isključenje","Posedovanje i čekanje","Prekidanje (preemption)","Kružno čekanje"],2,"Uslov je da NEMA prekidanja."],
 ["3 procesa, svaki traži najviše 3 resursa. Najmanji r bez zastoja:",["6","7","9","4"],1,"r ≥ 3·(3 − 1) + 1 = 7."],
 ["Nebezbedno stanje:",["Uvek je zastoj","Može, ali ne mora da vodi u zastoj","Nikad ne vodi u zastoj","Je isto što i gladovanje"],1,"Zastoji su podskup nebezbednih stanja."],
 ["Inverzija prioriteta se rešava:",["Smanjenjem kvantuma","Nasleđivanjem prioriteta","Gašenjem procesa","SJF-om"],1,"Niski proces privremeno dobija prioritet visokog."],
 ["Bankarov algoritam služi za:",["Sprečavanje","Izbegavanje zastoja","Otkrivanje","Planiranje diska"],1,"Odobrava zahtev samo ako stanje ostaje bezbedno."]
],
o7:[
 ["Program je smešten od adrese 3000. Programska adresa 120 je fizička:",["120","3000","3120","2880"],2,"a′ = p + a."],
 ["Interna fragmentacija nastaje kod:",["Dinamičkih particija","Straničenja i statičkih particija","Segmentacije","Nigde"],1,"Dodeljen region je veći od potrebnog."],
 ["Best Fit bira:",["Prvu dovoljno veliku rupu","Najmanju dovoljno veliku rupu","Najveću rupu","Slučajnu rupu"],1,"Tabela uređena po rastućoj veličini."],
 ["STLR sadrži:",["Adresu tabele segmenata","Broj segmenata programa","Broj okvira","Adresu TLB-a"],1,"STBR sadrži adresu tabele."],
 ["Pri promašaju u TLB-u, tabela stranica se čita iz:",["Diska","Glavne memorije","Registra","Keša L3 uvek"],1,"Na disk se ide samo kod straničnog prekida."],
 ["Manja stranica znači:",["Manju tabelu stranica","Veću tabelu stranica i manju internu fragmentaciju","Veću internu fragmentaciju","Nema promene"],1,"Više stranica za isti prostor."],
 ["Translaciju virtuelnih u fizičke adrese radi:",["Kernel za svaki pristup","MMU (hardver)","Kompajler","Disk"],1,"OS samo popunjava tabele."]
],
o8:[
 ["Stranični prekid nastaje kada:",["Stranica nije u memoriji","Je TLB pun","Je disk spor","Proces završi"],0,"Bit prisutnosti je 0."],
 ["m ≥ n (okvira više od različitih stranica). Gornja granica broja straničnih prekida:",["p","n","m","0"],1,"Svaka stranica se učita jednom i nikad se ne izbacuje."],
 ["Koji algoritam zamene daje najmanje prekida, ali se ne može implementirati?",["FIFO","LRU","OPT","Sat"],2,"Zahteva poznavanje budućnosti."],
 ["Beladijeva anomalija se javlja kod:",["LRU","OPT","FIFO","Svih"],2,"Više okvira može dati više prekida."],
 ["Trashing karakteriše:",["Visoka iskorišćenost CPU","Niska iskorišćenost CPU i mnogo straničnih prekida","Prazan disk","Gladovanje"],1,"Procesor čeka disk."],
 ["Trashing se rešava:",["Povećanjem stepena multiprogramiranja","Smanjenjem stepena multiprogramiranja","Manjim stranicama","FIFO-om"],1,"Manje procesa, više okvira po procesu."],
 ["Globalno straničenje znači da su kandidati za izbacivanje:",["Samo stranice datog procesa","Svi okviri u sistemu","Samo stranice OS-a","Nijedan"],1,"Lokalno: samo okviri datog procesa."]
],
o9:[
 ["Koji algoritam diska može izazvati gladovanje?",["FCFS","SSTF","SCAN","C-SCAN"],1,"Uvek bira najbliži zahtev."],
 ["Glava 53, red 98 183 37 122 14 124 65 67. SSTF prelazi ukupno:",["640","236","299","382"],1,"53→65→67→37→14→98→122→124→183."],
 ["C-SCAN u odnosu na SCAN daje:",["Manji ukupan put","Uniformnija vremena odziva","Gladovanje","Isti rezultat kao FCFS"],1,"Opslužuje samo u jednom smeru."],
 ["Glavna razlika ext3 u odnosu na ext2:",["Inode","Dnevnik transakcija (journal)","FAT tabela","Nema direktorijuma"],1,"Brz oporavak posle pada."],
 ["Najveća datoteka na FAT32:",["2 GB","4 GB","2 TB","16 TB"],1,"Particija do 2 TB."],
 ["Deskriptor datoteke je:",["Ime datoteke","Ceo nenegativan broj koji kernel vraća pri otvaranju","Inode na disku","Putanja"],1,"0, 1, 2 su standardni ulaz, izlaz i greške."],
 ["Koja metoda dodele prostora ima eksternu fragmentaciju?",["Susedni blokovi","Povezani blokovi","Indeksna","Nijedna"],0,"Isti problem kao dinamičke particije u memoriji."]
]
};
const ORDER=["c1","c2","c3","c4","c5","c6","c7","c8","c9","c10","c11","c12","c13","c14","c15","c16"];
const FINAL=[["c2",0],["c5",0],["c6",1],["c4",2],["c6",8],["c8",1],["c8",3],["c7",2],["c7",1],["c7",3],["c9",2],["c10",0],["c11",0],["c10",4],["c13",0],["c13",2],["c12",1],["c12",4],["c14",4],["c14",6],["c15",0],["c15",2],["c15",5],["c16",0]].map(([c,i])=>Q[c][i]);