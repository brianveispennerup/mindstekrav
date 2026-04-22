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

  // 4. Forklar notation X~b(n, p)
  () => {
    const n = rnd(3, 15);
    const p = rndF(0.1, 0.9, 1);
    return {
      type: "selvevaluering",
      text: `Forklar betydningen af notationen\nX~b(n = ${n}, p = ${fmt(p)})`,
      modelsvar: `X er en stokastisk variabel der følger en binomialfordeling.\nn = ${n} er antallet af uafhængige forsøg.\np = ${fmt(p)} er sandsynligheden for succes i hvert enkelt forsøg.\nDet betyder at X tæller antallet af succeser i ${n} forsøg, hvor sandsynligheden for succes er ${fmt(p)} i hvert forsøg.`,
      link: "https://laerebogimatematik2hhx.systime.dk/?id=163#c1029",
      explanation: `X~b(n,p) betyder binomialfordeling med n forsøg og sandsynlighed p for succes.`
    };
  },

  // 5. Beregn binomialsandsynlighed P(X = k) i procent
  () => {
    const n = rnd(6, 15);
    const sides = rnd(4, 8);
    const face = rnd(1, sides);
    const p = Math.round(1 / sides * 100) / 100;
    const k = rnd(1, Math.min(5, n - 1));
    function fak(x) { return x <= 1 ? 1 : x * fak(x - 1); }
    function C(nn, kk) { return fak(nn) / (fak(kk) * fak(nn - kk)); }
    const prob = Math.round(C(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k) * 10000) / 100;
    return {
      type: "input",
      prefix: "P(X = " + k + ") =",
      suffix: "%",
      text: `Der kastes med en ${sides}-sidet terning ${n} gange.\nHvad er sandsynligheden for at få præcis ${k} ${face}${k > 1 ? 'ere' : 'er'}?\n(Svar angives med 2 decimaler)`,
      answer: fmt(prob),
      accept: [fmt(prob), String(prob)],
      link: "https://laerebogimatematik2hhx.systime.dk/?id=163#c1029",
      explanation: `X~b(${n}, ${fmt(p)}). P(X = ${k}) = K(${n},${k}) · ${fmt(p)}^${k} · ${fmt(Math.round((1-p)*100)/100)}^${n-k} = ${fmt(prob)}%`
    };
  },

  // 6. Aflæs P(X = k) fra binomialfordeling graf — maks ~5 synlige søjler
  () => {
    const n = rnd(10, 15);
    // Skæv fordeling — p tæt på 0,1 eller 0,9
    const p = Math.random() > 0.5 ? rndF(0.1, 0.25, 2) : rndF(0.75, 0.9, 2);
    function fak(x) { return x <= 1 ? 1 : x * fak(x - 1); }
    function C(nn, kk) { return fak(nn) / (fak(kk) * fak(nn - kk)); }
    const probs = Array.from({ length: n + 1 }, (_, k) =>
      Math.round(C(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k) * 1000) / 1000
    );
    // Find de ~5 søjler med højest sandsynlighed
    const mid = Math.round(n * p);
    const k = rnd(Math.max(0, mid - 1), Math.min(n, mid + 1));
    const answer = Math.round(probs[k] * 10000) / 100;
    const t = {
      x: Array.from({ length: n + 1 }, (_, i) => i),
      y: probs,
      type: 'bar',
      marker: { color: '#185FA5' }
    };
    const layout = Object.assign({}, PLOTLY_LAYOUT_BASE, {
      xaxis: Object.assign({}, PLOTLY_LAYOUT_BASE.xaxis, { title: { text: 'Antal succeser' }, dtick: 1 }),
      yaxis: Object.assign({}, PLOTLY_LAYOUT_BASE.yaxis, { title: { text: 'Sandsynlighed' } })
    });
    const graph = makePlotSpec([t], layout);
    return {
      type: "input",
      prefix: `P(X = ${k}) ≈`,
      suffix: "%",
      text: `På figuren ses en binomialfordeling hvor n = ${n} og p = ${fmt(p)}.\nUd fra figuren vurdér cirka hvad sandsynligheden er for at få præcis ${k} succeser.\n(Svar angives med 2 decimaler)`,
      graph,
      answer: fmt(answer),
      accept: [fmt(answer), fmt(Math.round(answer * 10) / 10)],
      link: "https://laerebogimatematik2hhx.systime.dk/?id=163#c1029",
      explanation: `P(X = ${k}) ≈ ${fmt(answer)}%.`
    };
  },

];
