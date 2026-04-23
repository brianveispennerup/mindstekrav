// F7 — Konfidensinterval og Hypotesetest
GENERATORS.F7 = [

  // 1. Forventede værdier i chi-i-anden test
  () => {
    const mandTotal = rnd(100, 250);
    const kvindeTotal = rnd(100, 250);
    const n = mandTotal + kvindeTotal;
    const kanLideTotal = rnd(Math.round(n * 0.4), Math.round(n * 0.8));
    const kanIkkeLideTotal = n - kanLideTotal;
    const e11 = Math.round(mandTotal * kanLideTotal / n * 100) / 100;
    const e12 = Math.round(mandTotal * kanIkkeLideTotal / n * 100) / 100;
    const e21 = Math.round(kvindeTotal * kanLideTotal / n * 100) / 100;
    const e22 = Math.round(kvindeTotal * kanIkkeLideTotal / n * 100) / 100;
    return {
      type: "table",
      text: `Nedenfor ses en tabel fra en chi-i-anden test, hvor de forventede værdier skal beregnes.\n\nBeregn de forventede værdier under H₀: Der er ingen sammenhæng mellem køn og om man kan lide produktet.`,
      tableHeaders: ["", "Kan lide produktet", "Kan ikke lide produktet", "Total"],
      tableRows: [
        ["Mand", "", "", String(mandTotal)],
        ["Kvinde", "", "", String(kvindeTotal)],
        ["Total", String(kanLideTotal), String(kanIkkeLideTotal), String(n)]
      ],
      inputCols: [1, 2],
      answers: [
        [fmt(e11), fmt(e12)],
        [fmt(e21), fmt(e22)],
        [null, null]
      ],
      link: "https://laerebogimatematik2hhx.systime.dk/?id=171",
      explanation: `E = (rækketotal × kolonnetotal) / n. E(Mand, Kan lide) = ${fmt(e11)}, E(Mand, Kan ikke lide) = ${fmt(e12)}, E(Kvinde, Kan lide) = ${fmt(e21)}, E(Kvinde, Kan ikke lide) = ${fmt(e22)}.`
    };
  },

  // 2. Frihedsgrader df = (r-1)(c-1)
  () => {
    const r = rnd(2, 4), c = rnd(2, 4);
    const df = (r - 1) * (c - 1);
    const rowLabels = ["Gruppe A", "Gruppe B", "Gruppe C", "Gruppe D"].slice(0, r);
    const colLabels = ["Kategori 1", "Kategori 2", "Kategori 3", "Kategori 4"].slice(0, c);
    const rows = rowLabels.map(rl => [rl, ...colLabels.map(() => String(rnd(20, 150)))]);
    return {
      type: "input",
      prefix: "df =",
      text: `Et gymnasium vil lave en chi-i-anden test der undersøger sammenhængen mellem to variable. De har observeret følgende ${r}×${c} tabel:\n\nBeregn antallet af frihedsgrader.`,
      tableHeaders: ["", ...colLabels],
      tableRows: rows,
      answer: String(df),
      accept: [String(df)],
      link: "https://laerebogimatematik2hhx.systime.dk/?id=172",
      explanation: `df = (r−1)(c−1) = (${r}−1)(${c}−1) = ${r-1}·${c-1} = ${df}.`
    };
  },

  // 3. Konkludér på chi-i-anden test (MC)
  () => {
    const alphas = [0.1, 0.05, 0.01];
    const alpha = alphas[rnd(0, 2)];
    let p;
    if (Math.random() > 0.5) {
      p = Math.round(rndF(0.001, alpha * 0.8, 3) * 1000) / 1000;
    } else {
      p = Math.round(rndF(alpha * 1.2, 0.5, 3) * 1000) / 1000;
    }
    const reject = p < alpha;
    const fmtP = fmt(p), fmtA = fmt(alpha);
    return {
      type: "mc",
      text: `I en χ²-test arbejdes der med hypoteserne:\nH₀: Der er ingen sammenhæng mellem alder og politisk overbevisning.\nH₁: Der er en sammenhæng mellem alder og politisk overbevisning.\n\nSignifikansniveauet sættes til α = ${fmtA}\nEfterfølgende er p-værdien regnet til p = ${fmtP}\n\nKonkludér på testen.`,
      options: [
        reject
          ? `Da p = ${fmtP} < α = ${fmtA} forkastes H₀. Der er statistisk signifikant sammenhæng mellem alder og politisk overbevisning.`
          : `Da p = ${fmtP} > α = ${fmtA} forkastes H₀ ikke. Der er ikke statistisk signifikant sammenhæng mellem alder og politisk overbevisning.`,
        reject
          ? `Da p = ${fmtP} > α = ${fmtA} forkastes H₀ ikke. Der er ikke statistisk signifikant sammenhæng.`
          : `Da p = ${fmtP} < α = ${fmtA} forkastes H₀. Der er statistisk signifikant sammenhæng.`
      ],
      correct: 0,
      link: "https://laerebogimatematik2hhx.systime.dk/?id=166",
      explanation: `p = ${fmtP} er ${reject ? 'mindre end' : 'større end'} α = ${fmtA}, derfor ${reject ? 'forkastes H₀' : 'forkastes H₀ ikke'}.`
    };
  },

  // 4. 95% konfidensinterval
  () => {
    const n = rnd(50, 300);
    const k = rnd(Math.round(n * 0.1), Math.round(n * 0.9));
    const pHat = Math.round(k / n * 1000) / 1000;
    const se = Math.round(Math.sqrt(pHat * (1 - pHat) / n) * 10000) / 10000;
    const lower = Math.round((pHat - 1.96 * se) * 1000) / 1000;
    const upper = Math.round((pHat + 1.96 * se) * 1000) / 1000;
    return {
      type: "fields",
      text: `En undersøgelse viser, at ${k} ud af ${n} studerende på et universitet cykler til studiet.\nDette giver en estimeret andel på p̂ = ${fmt(pHat)}\nBeregningen giver en standardfejl på SE = ${fmt(se)}\nBestem et 95%-konfidensinterval for andelen af studerende, som cykler til studiet.\n(Angiv svaret i decimaltal)`,
      fields: [
        { prefix: "95%-konfidensinterval er [", suffix: ";" },
        { suffix: "]" }
      ],
      answers: [fmt(lower), fmt(upper)],
      accept_tolerance: 0.005,
      link: "https://laerebogimatematik2hhx.systime.dk/?id=144",
      explanation: `KI = p̂ ± 1,96·SE = ${fmt(pHat)} ± 1,96·${fmt(se)} = [${fmt(lower)}; ${fmt(upper)}].`
    };
  },

];
