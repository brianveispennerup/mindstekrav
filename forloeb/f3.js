// F2 — Eksponentielle funktioner
GENERATORS.F3 = [

  // 1. Begyndelsesværdi og vækstrate
  () => {
    const b = rnd(2, 50), a = rndF(1.05, 1.5, 2);
    const vækst = Math.round((a - 1) * 100);
    return {
      type: "fields",
      text: `En eksponentiel funktion har følgende forskrift:\nf(x) = ${b} · ${fmt(a)}ˣ\nHvad er funktionens begyndelsesværdi og vækstrate?`,
      fields: [
        { prefix: "Begyndelsesværdi =", suffix: "" },
        { prefix: "Vækstrate =", suffix: "%" }
      ],
      answers: [String(b), String(vækst)],
      explanation: `Begyndelsesværdien er f(0) = ${b} · 1 = ${b}. Vækstraten r = ${fmt(a)} − 1 = ${vækst}%.`
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
      text: `Grafen for en eksponentiel funktion er tegnet i nedenstående koordinatsystem.\nBestem hvilken af de 3 følgende forskrifter, der svarer til grafen.`,
      graph,
      options: [`f(x) = ${b} · ${fmt(a)}ˣ`, `g(x) = ${b} · ${fmt(a2)}ˣ`, `h(x) = ${b3} · ${fmt(a3)}ˣ`],
      correct: 0,
      explanation: `Begyndelsesværdien (x=0) er ${b}, og funktionen er ${rising ? "voksende (a > 1)" : "aftagende (0 < a < 1)"}. Det passer på f(x) = ${b} · ${fmt(a)}ˣ.`
    };
  },

  // 3. Aflæs fordoblingskonstanten fra graf — altid voksende, helt tal T₂
  () => {
    const T = rnd(2, 6); // T₂ er et helt tal 2-6
    const a = Math.round(Math.pow(2, 1/T) * 100) / 100;
    const b = rndF(1, 5, 1);
    const xMax = T * 4;
    const fn = x => b * Math.pow(a, x);
    const t1 = makeFuncTrace(fn, 0, xMax, '#185FA5');
    const tM = makeScatterTrace([T], [fn(T)], '#C0392B', 10);
    const graph = plotLines([t1, tM], [0, xMax], [0, fn(xMax) * 1.1]);
    return {
      type: "input",
      prefix: "T₂ =",
      text: `Grafen for en voksende eksponentiel funktion er tegnet i nedenstående koordinatsystem.\nAflæs fordoblingskonstanten.`,
      graph,
      answer: String(T),
      accept: [String(T)],
      explanation: `Fordoblingskonstanten T₂ aflæses som den x-værdi hvor funktionsværdien er fordoblet. T₂ = ${T}.`
    };
  },

  // 4. Voksende eller aftagende — mc2
  () => {
    const a1 = rndF(0.5, 0.9, 2);  // f er altid aftagende
    const a2 = rndF(1.1, 1.8, 2);  // g er altid voksende
    const b1 = rnd(2, 20), b2 = rnd(2, 20);
    return {
      type: "mc2",
      text: `Lad f(x) = ${b1} · ${fmt(a1)}ˣ og g(x) = ${b2} · ${fmt(a2)}ˣ.\nHvilken af funktionerne er voksende, og hvilken er aftagende? Begrund dit svar.`,
      questions: [
        {
          label: `f(x) = ${b1} · ${fmt(a1)}ˣ`,
          options: ["Voksende", "Aftagende"],
          correct: 1,
          explanation: `a = ${fmt(a1)} er mindre end 1 → aftagende.`
        },
        {
          label: `g(x) = ${b2} · ${fmt(a2)}ˣ`,
          options: ["Voksende", "Aftagende"],
          correct: 0,
          explanation: `a = ${fmt(a2)} er større end 1 → voksende.`
        }
      ],
      explanation: `Når a > 1 er funktionen voksende, når 0 < a < 1 er den aftagende.`
    };
  },

];
