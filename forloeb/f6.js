// F6 — Sandsynlighedsregning
GENERATORS.F6 = [

  // 1. Sandsynlighedsfelt for n-sidet terning
  () => {
    const n = rnd(4, 8);
    const p = Math.round(1 / n * 100) / 100;
    const outcomes = Array.from({ length: n }, (_, i) => i + 1);
    return {
      type: "table",
      text: `Opstil et sandsynlighedsfelt (U, P) for et kast med en almindelig ${n}-sidet terning vha. af en tabel.\nSandsynlighedsfeltet skal vise udfaldsrummet og sandsynlighederne for de enkelte udfald.`,
      tableHeaders: ["u", ...outcomes.map(String)],
      tableRows: [["P(u)"]],
      tableFooter: null,
      inputCols: Array.from({ length: n }, (_, i) => i + 1),
      answers: [outcomes.map(() => fmt(p))],
      link: "https://laerebogimatematik2hhx.systime.dk/?id=253#c903",
      explanation: `For en ${n}-sidet terning er sandsynligheden for hvert udfald 1/${n} = ${fmt(p)}.`
    };
  },

  // 2. Kombinatorik — vælg k ud af n
  () => {
    // Generer k og n så resultatet er ≤ 100.000.000
    let n, k, result;
    do {
      n = rnd(5, 20);
      k = rnd(2, Math.min(5, Math.floor(n / 2)));
      function fak(x) { return x <= 1 ? 1 : x * fak(x - 1); }
      result = fak(n) / (fak(k) * fak(n - k));
    } while (result > 100000000);
    function fak(x) { return x <= 1 ? 1 : x * fak(x - 1); }
    result = Math.round(result);
    return {
      type: "input",
      text: `Hvor mange måder kan man udvælge ${k} personer ud af en gruppe på ${n}?\nBemærk at rækkefølgen ikke betyder noget.`,
      answer: String(result),
      accept: [String(result)],
      link: "https://laerebogimatematik2hhx.systime.dk/?id=162#c985",
      explanation: `K(${n}, ${k}) = ${n}! / (${k}! · ${n - k}!) = ${result}`
    };
  },

  // 3. Sandsynlighedsfordeling — manglende P + beregn sandsynlighed
  () => {
    // Generer xi værdier og P(X=xi) der summer til 1
    const n = rnd(4, 6);
    const xVals = Array.from({ length: n }, (_, i) => (i + 1) * 2); // 2,4,6,8,...
    // Generer sandsynligheder der summer til 1
    let probs = Array.from({ length: n }, () => rnd(1, 4));
    const tot = probs.reduce((a, b) => a + b, 0);
    probs = probs.map(p => Math.round(p / tot * 100) / 100);
    // Fix rounding så det summerer til 1
    const diff = Math.round((1 - probs.reduce((a, b) => a + b, 0)) * 100) / 100;
    probs[0] = Math.round((probs[0] + diff) * 100) / 100;

    // Vælg en tilfældig manglende celle
    const missingIdx = rnd(0, n - 1);
    const missingP = probs[missingIdx];

    // Generer en tilfældig ulighed
    const inequalities = [
      { text: `P(X ≥ ${xVals[Math.floor(n/2)]})`, calc: () => probs.slice(Math.floor(n/2)).reduce((a,b)=>a+b,0) },
      { text: `P(X ≤ ${xVals[Math.floor(n/2)-1]})`, calc: () => probs.slice(0, Math.floor(n/2)).reduce((a,b)=>a+b,0) },
      { text: `P(X > ${xVals[0]})`, calc: () => probs.slice(1).reduce((a,b)=>a+b,0) },
      { text: `P(X < ${xVals[n-1]})`, calc: () => probs.slice(0,-1).reduce((a,b)=>a+b,0) },
      { text: `P(${xVals[0]} ≤ X ≤ ${xVals[Math.floor(n/2)]})`, calc: () => probs.slice(0, Math.floor(n/2)+1).reduce((a,b)=>a+b,0) },
    ];
    const ineq = inequalities[rnd(0, inequalities.length - 1)];
    const probResult = Math.round(ineq.calc() * 100) / 100;

    // Byg tabelrækker — vis alle P undtagen manglende
    const probRow = probs.map((p, i) => i === missingIdx ? '' : fmt(p));

    return {
      type: "sandsynlighed",
      text: `Sandsynlighedsfordelingen for en stokastisk variabel X er fastlagt ved følgende tabel.\nUdfyld den manglende sandsynlighed og beregn ${ineq.text}.`,
      tableHeaders: ["xᵢ", ...xVals.map(String)],
      tableRows: [["P(X = xᵢ)", ...probRow]],
      missingCol: missingIdx + 1, // +1 fordi første kolonne er label
      missingAnswer: fmt(missingP),
      probQuestion: ineq.text,
      probAnswer: fmt(probResult),
      link: "https://laerebogimatematik2hhx.systime.dk/?id=280#c2296",
      explanation: `Den manglende sandsynlighed er ${fmt(missingP)} (alle sandsynligheder summer til 1). ${ineq.text} = ${fmt(probResult)}.`
    };
  },

];
