/**
 * Svenska för navigering, knappar och rubriker.
 * Engelska används i själva övningsinnehållet (fraser, dialoger m.m.).
 */
export const ui = {
  nav: {
    home: "Hem",
    saved: "Sparat",
    quick: "Snabb",
  },
  home: {
    tagline: "Eurovision",
    heroLead:
      "Engelska för scenen, pressen och mötet med publiken — i ditt eget tempo.",
    heroSub: "Välj en del. Öva. Sken.",
    continueWith: "Fortsätt",
    cardsPracticed: "kort övade",
    cardsLabel: "kort",
    progressDone: "klart",
    startPractice: "Börja öva",
    savedTitle: "Sparade fraser",
    savedDesc: "Snabb repetition av det du stjärnmarkerat",
    panicLink: "Korta engelska fraser när det känns stressigt",
  },
  session: {
    completeTitle: "Pass klart!",
    completeBody: (cardCount: number, sectionTitle: string) =>
      `Du övade ${cardCount} kort i ${sectionTitle}. Kör vidare — scenen väntar.`,
    practiceMore: "Öva mer",
    backHome: "Till startsidan",
    back: "Tillbaka",
    next: "Nästa",
    practiceSession: "Övningpass",
    backAria: "Gå tillbaka",
  },
  favorites: {
    emptyTitle: "Inga favoriter än",
    emptyBody:
      "Tryck på stjärnan på ett kort för att spara det här inför repetition.",
    startCta: "Börja öva",
    title: "Sparade fraser",
    subtitle: "Dina stjärnmarkerade rader — lyssna igen när du vill.",
    savedCount: "sparade",
    removeAria: "Ta bort från favoriter",
  },
  panic: {
    title: "Snabbfraser",
    subtitle: "Tryck på ett kort — hör engelskan",
    backAria: "Till startsidan",
  },
  progress: {
    cardOf: (currentOneBased: number, total: number) =>
      `Kort ${currentOneBased} av ${total}`,
  },
  badges: {
    phrase: "Fras",
    dialogue: "Dialog",
    quiz: "Quiz",
    fun: "Kul",
  },
  phraseCard: {
    svLabel: "SV",
  },
  dialogue: {
    revealNext: "Visa nästa rad",
    complete: "Dialog klar",
  },
  footer: {
    attribution: (year: number) => `Skapad av Joen Berg · © ${year}`,
    disclaimerLink: "Om, juridik & AI",
  },
  disclaimer: {
    back: "Till startsidan",
    title: "Om Felingo",
    subtitle: "Bakgrund, upphovsrätt, AI och ansvarsfriskrivning",
    aboutHeading: "Om appen och bakgrunden",
    aboutBody:
      "Felingo är en övningsapp för engelska i sammanhang kring scen, press och möten med publik. Webbplatsen har tagits fram nästan uteslutande eftersom den svenska Eurovision-bidrags­tagaren Felicia har uttryckt i sociala medier att hon vill ha hjälp med att jobba på sin engelska inför ESC. Projektet är ett personligt initiativ och utgör varken ett beställnings­verk eller ett officiellt samarbete med SVT, delegationen eller någon annan organisation.\n\nAppen ersätter inte professionell språkundervisning, tolkning eller coachning.",
    liabilityHeading: "Privat initiativ och ansvarsbegränsning",
    liabilityBody:
      'Webbplatsen tillhandahålls av Joen Berg som privatperson, på fritiden och utan kommersiell avsikt — i huvudsak som ett informellt sidoprojekt "på skoj" och som ett praktiskt stöd utifrån ovanstående bakgrund. Tjänsten tillhandahålls i befintligt skick ("som den är") och utan utfästelser av något slag, vare sig uttryckliga eller underförstådda, om att innehållet är felfritt, fullständigt, aktuellt eller lämpligt för ett visst syfte.\n\nInnehållet är tänkt som inspiration och repetition — inte som juridisk, medicinsk, pedagogisk eller annan professionell rådgivning. Användning sker på egen risk. I den utsträckning svensk lag medger ansvarar inte Joen Berg för direkta eller indirekta skador, följdskador, förlust av data eller annan skada som kan uppstå vid användning av eller tillit till tjänsten.\n\nInnehåll kan innehålla förenklingar eller fel; användaren bör alltid själv verifiera kritiska formuleringar i viktiga sammanhang. Joen Berg tar gärna emot synpunkter om något framstår som felaktigt eller olämpligt, i syfte att förbättra materialet.',
    copyrightHeading: "Upphovsrätt",
    copyrightBody: (year: number) =>
      `Webbappen Felingo och dess samlade utformning (gränssnitt, struktur och särskilt sammanställt innehåll) omfattas av upphovsrätt © ${year} Joen Berg om inte annat anges. Obehörig kopiering eller spridning kan vara förbjuden.`,
    aiHeading: "Användning av AI",
    aiBody:
      "Delar av texter eller material kan ha tagits fram med stöd av generativ artificiell intelligens (t.ex. språkmodeller) och därefter redigerats eller granskats för användning här. AI kan fela; använd övningarna som inspiration och komplettera med egen research. Innehållet utgör inte juridisk, medicinsk eller professionell rådgivning.",
    eurovisionHeading: "Varumärken och oberoende",
    eurovisionBody:
      "Eurovision Song Contest och relaterade namn och varumärken tillhör sina respektive rättsinnehavare. Felingo är ett oberoende övningsverktyg och är inte anslutet till, sponsrat eller godkänt av European Broadcasting Union (EBU), SVT eller andra officiella Eurovision-organisationer.",
    visitsHeading: "Besöksstatistik",
    visitsBody:
      "Antalet sidladdningar mäts med ett enkelt anrop till servern (utan cookies i din webbläsare) för att se hur webbplatsen sprids. Uppgifterna används inte för marknadsföring eller profilering.",
  },
  error: {
    title: "Något gick fel",
    body: "Ladda om sidan och försök igen.",
    refresh: "Ladda om",
  },
  aria: {
    listen: "Lyssna på uttal",
    stop: "Stoppa uppläsning",
    addFavorite: "Spara som favorit",
    removeFavorite: "Ta bort favorit",
    saved: "Sparad",
    save: "Spara",
  },
} as const;
