// F2 — Eksponentielle funktioner
GENERATORS.F2 = [

  // 1. Begyndelsesværdi og vækstrate
  () => {
    const b = rnd(2, 50), a = rndF(1.05, 1.5, 2);
    return {
      type: "input",
      text: `En eksponentiel funktion har følgende forskrift:\nf(x) = ${b} · ${fmt(a)}ˣ\nHvad er funktionens begyndelsesværdi og vækstrate?`,
      answer: String(b),
      accept: [String(b)],
      explanation: `Begyndelsesværdien er f(0) = ${b} · 1 = ${b}. Vækstraten r = ${fmt(a)} − 1 = ${fmt(Math.round((a - 1) * 100))}%.`
    };
  },

  // 2. Identificér forskriften fra graf (MC med graf)
  () => {
    const b = rnd(2, 8), rising = Math.random() > 0.5;
    const a = rising ? rndF(1.1, 1.6, 2) : rndF(0.5, 0.9, 2);
    const fn = x => b * Math.pow(a, x);
    const xMin = -3, xMax = rising ? 8 : 10;
    const t1 = makeFuncTrace(fn, xMin, xMax, '#185FA5');
    const yVals = linspace(xMin, xMax, 100).map(fn);
    const graph = plotLines([t1], [xMin, xMax], [0, Math.min(Math.max(...yVals) * 1.1, 40)]);
    const a2 = rising ? rndF(0.5, 0.89, 2) : rndF(1.1, 1.6, 2);
    const b3 = b + rnd(2, 6), a3 = rising ? rndF(1.1, 1.6, 2) : rndF(0.5, 0.9, 2);
    return {
      type: "mc",
      text: `Grafen for en eksponentiel funktion er tegnet i nedenstående koordinatsystem.\nBestem hvilken af de 3 følgende forskrifter, der svarer til grafen.\nf(x) = ${b} · ${fmt(a)}ˣ\ng(x) = ${b} · ${fmt(a2)}ˣ\nh(x) = ${b3} · ${fmt(a3)}ˣ`,
      graph,
      options: [`f(x) = ${b} · ${fmt(a)}ˣ`, `g(x) = ${b} · ${fmt(a2)}ˣ`, `h(x) = ${b3} · ${fmt(a3)}ˣ`],
      correct: 0,
      explanation: `Begyndelsesværdien (x=0) er ${b}, og funktionen er ${rising ? "voksende (a > 1)" : "aftagende (0 < a < 1)"}. Det passer på f(x) = ${b} · ${fmt(a)}ˣ.`
    };
  },

  // 3. Aflæs fordoblingskonstanten fra graf
  () => {
    const b = rndF(1, 4, 1), a = rndF(1.15, 1.5, 2);
    const T = Math.round(Math.log(2) / Math.log(a) * 10) / 10;
    const xMax = Math.ceil(T * 3.5);
    const fn = x => b * Math.pow(a, x);
    const t1 = makeFuncTrace(fn, 0, xMax, '#185FA5');
    const tM = makeScatterTrace([T], [fn(T)], '#C0392B', 10);
    const graph = plotLines([t1, tM], [0, xMax], [0, fn(xMax) * 1.1]);
    return {
      type: "input",
      text: `Grafen for en voksende eksponentiel funktion er tegnet i nedenstående koordinatsystem.\nAflæs fordoblingskonstanten. (1 decimal)`,
      graph,
      answer: fmt(T),
      accept: [fmt(T), String(T)],
      explanation: `T₂ aflæses som den x-værdi hvor funktionen er fordoblet. T₂ = ${fmt(T)}.`
    };
  },

  // 4. Voksende eller aftagende — begrund
  () => {
    const rising = Math.random() > 0.5;
    const a = rising ? rndF(1.1, 1.8, 2) : rndF(0.5, 0.9, 2);
    const a2 = rising ? rndF(0.5, 0.9, 2) : rndF(1.1, 1.8, 2);
    const b = rnd(2, 20), b2 = rnd(2, 20);
    return {
      type: "mc",
      text: `Lad f(x) = ${b} · ${fmt(a)}ˣ og g(x) = ${b2} · ${fmt(a2)}ˣ.\nHvilken af ovenstående funktioner er voksende, og hvilken er aftagende? Begrund dit svar.`,
      options: [
        `f(x) er ${rising ? "voksende" : "aftagende"} (a=${fmt(a)} er ${a > 1 ? "> 1" : "< 1"}), g(x) er ${rising ? "aftagende" : "voksende"} (a=${fmt(a2)} er ${a2 > 1 ? "> 1" : "< 1"})`,
        `Begge funktioner er voksende`,
        `Begge funktioner er aftagende`,
        `f(x) er aftagende og g(x) er voksende fordi b-værdien bestemmer det`
      ],
      correct: 0,
      explanation: `Når a > 1 er funktionen voksende, når 0 < a < 1 er den aftagende. f: a=${fmt(a)} → ${a > 1 ? "voksende" : "aftagende"}. g: a=${fmt(a2)} → ${a2 > 1 ? "voksende" : "aftagende"}.`
    };
  },

];
