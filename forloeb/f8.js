// F8 — Differentialregning og funktionsanalyse

// Brug math.js til at differentiere symbolsk og formater til elevvenlig notation
function mDerivative(exprStr) {
  const raw = math.simplify(math.derivative(exprStr, 'x')).toString();
  return raw
    .replace(/-\(\s*(\d+)\s*\*\s*x\s*\^\s*(\d+)\s*\)/g, (_, n, p) => `-${n}x^${p}`)
    .replace(/-\(\s*(\d+)\s*\*\s*x\s*\)/g, (_, n) => `-${n}x`)
    .replace(/\s*\*\s*/g, '')
    .replace(/\s*\^\s*/g, '^')
    .trim();
}

// Formater koefficient pænt: 1 → '', -1 → '-', 2 → '2' osv.
function fmtCoef(n) {
  if (n === 1)  return '';
  if (n === -1) return '-';
  return String(n);
}

GENERATORS.F8 = [

  // 1. Bestem f'(x) og monotoniforhold — randomiserer mellem andengradspoly og kubisk
  () => {
    const isCubic = Math.random() > 0.5;
    let fStr, dfStr, monotoni;

    if (isCubic) {
      const a = (Math.random() > 0.5 ? 1 : -1) * rnd(1, 3);
      const t = rnd(1, 4);
      const b = -3 * a * t * t;
      const expr = `${a}*x^3 + ${b}*x`;
      dfStr = mDerivative(expr);
      const bStr = b === 0 ? '' : (b > 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`);
      fStr = `f(x) = ${fmtCoef(a)}x³${bStr}`;
      monotoni = a > 0
        ? [ { interval: `]−∞ ; ${-t}]`,  type: "Voksende"  },
            { interval: `[${-t} ; ${t}]`, type: "Aftagende" },
            { interval: `[${t} ; ∞[`,     type: "Voksende"  } ]
        : [ { interval: `]−∞ ; ${-t}]`,  type: "Aftagende" },
            { interval: `[${-t} ; ${t}]`, type: "Voksende"  },
            { interval: `[${t} ; ∞[`,     type: "Aftagende" } ];
      return {
        type: "monotoni",
        text: `En funktion f har forskriften\n${fStr}\nBestem f'(x) og angiv monotoniforhold for f.`,
        dfStr, dfAnswer: dfStr, monotoni,
        link: "https://laerebogimatematik2hhx.systime.dk/?id=229#c565",
        explanation: `f'(x) = ${dfStr}. Nulpunkter for f': x = ${-t} og x = ${t}.`
      };
    } else {
      const a  = (Math.random() > 0.5 ? 1 : -1) * rnd(1, 4);
      const xT = rnd(-5, 5);
      const b  = -2 * a * xT;
      const c  = rnd(-8, 8);
      const expr = `${a}*x^2 + ${b}*x + ${c}`;
      dfStr = mDerivative(expr);
      const bStr = b === 0 ? '' : (b > 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`);
      const cStr = c === 0 ? '' : (c > 0 ? ` + ${c}`  : ` - ${Math.abs(c)}`);
      fStr = `f(x) = ${fmtCoef(a)}x²${bStr}${cStr}`;
      monotoni = a > 0
        ? [ { interval: `]−∞ ; ${xT}]`, type: "Aftagende" },
            { interval: `[${xT} ; ∞[`,  type: "Voksende"  } ]
        : [ { interval: `]−∞ ; ${xT}]`, type: "Voksende"  },
            { interval: `[${xT} ; ∞[`,  type: "Aftagende" } ];
      return {
        type: "monotoni",
        text: `En funktion f har forskriften\n${fStr}\nBestem f'(x) og angiv monotoniforhold for f.`,
        dfStr, dfAnswer: dfStr, monotoni,
        link: "https://laerebogimatematik2hhx.systime.dk/?id=229#c565",
        explanation: `f'(x) = ${dfStr}. Nulpunkt for f': x = ${xT}.`
      };
    }
  },

  // 2. Identificér f(x) og f'(x) fra graf
  () => {
    const colorPairs = [
      { c1: '#27AE60', c2: '#8E44AD', n1: 'Grøn',   n2: 'Lilla' },
      { c1: '#E67E22', c2: '#2980B9', n1: 'Orange',  n2: 'Blå'   },
      { c1: '#C0392B', c2: '#16A085', n1: 'Rød',     n2: 'Grøn'  },
    ];
    const cp = colorPairs[rnd(0, colorPairs.length - 1)];
    const a  = (Math.random() > 0.5 ? 1 : -1) * rndF(0.1, 0.5, 2);
    const b  = rndF(-2, 2, 1);
    const c  = rndF(-4, 4, 1);
    const fn  = x => a*x*x*x + b*x*x + c*x;
    const dfn = x => 3*a*x*x + 2*b*x + c;
    const xs  = linspace(-100, 100, 5000);
    const fIsFirst = Math.random() > 0.5;
    const fColor   = fIsFirst ? cp.c1 : cp.c2;
    const dfColor  = fIsFirst ? cp.c2 : cp.c1;
    const fName    = fIsFirst ? cp.n1 : cp.n2;
    const dfName   = fIsFirst ? cp.n2 : cp.n1;
    const t1 = { x: xs, y: xs.map(fn),  mode: 'lines', line: { color: fColor,  width: 2.5 }, name: fIsFirst ? cp.n1 : cp.n2 };
    const t2 = { x: xs, y: xs.map(dfn), mode: 'lines', line: { color: dfColor, width: 2.5 }, name: fIsFirst ? cp.n2 : cp.n1 };
    const yVals = [...xs.map(fn), ...xs.map(dfn)];
    const yMin  = Math.min(...yVals);
    const yMax  = Math.max(...yVals);
    const layout = Object.assign({}, PLOTLY_LAYOUT_BASE, {
      height: 320, showlegend: true, legend: { x: 0.02, y: 0.98 }, dragmode: 'pan',
      xaxis: Object.assign({}, PLOTLY_LAYOUT_BASE.xaxis),
      yaxis: Object.assign({}, PLOTLY_LAYOUT_BASE.yaxis)
    });
    return {
      type: "mc2",
      text: `Nedenfor ser du grafen for en funktion f(x) og grafen for den afledte funktion f'(x).\nForklar hvilken graf der hører til f(x) og hvilken graf der hører til f'(x).`,
      graph: makePlotSpec([t1, t2], layout),
      questions: [
        { label: "f(x) er",  options: [cp.n1 + " graf", cp.n2 + " graf"], correct: fIsFirst ? 0 : 1, explanation: `f(x) er den ${fName.toLowerCase()} graf.`  },
        { label: "f'(x) er", options: [cp.n1 + " graf", cp.n2 + " graf"], correct: fIsFirst ? 1 : 0, explanation: `f'(x) er den ${dfName.toLowerCase()} graf.` }
      ],
      plotConfig: { responsive: true, displayModeBar: true, modeBarButtonsToRemove: ["toImage", "sendDataToCloud"], scrollZoom: true },
      link: "https://laerebogimatematik2hhx.systime.dk/?id=133",
      explanation: `f(x) er den ${fName.toLowerCase()} graf — den afledte er et grad lavere og skifter fortegn ved f's toppunkter/bundpunkter.`
    };
  },

  // 3. Differentier f(x) og beregn f'(x₀) — andengradspoly
  () => {
    const a  = (Math.random() > 0.5 ? 1 : -1) * rnd(1, 4);
    const b  = rnd(-8, 8);
    const c  = rnd(-8, 8);
    const x0 = rnd(-4, 4) || 1;  // evalueringspunkt, undgå 0

    // Byg dfStr direkte: f'(x) = 2ax + b (undgår math.js faktorisering)
    const df1 = 2 * a, df0 = b;
    const df0Str = df0 === 0 ? '' : (df0 > 0 ? ` + ${df0}` : ` - ${Math.abs(df0)}`);
    const dfStr = `${df1}x${df0Str}`;

    // f'(x0) = 2a*x0 + b
    const dfAtX0 = df1 * x0 + df0;

    const bStr = b === 0 ? '' : (b > 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`);
    const cStr = c === 0 ? '' : (c > 0 ? ` + ${c}`  : ` - ${Math.abs(c)}`);
    const fStr = `f(x) = ${fmtCoef(a)}x²${bStr}${cStr}`;

    return {
      type: "fields",
      text: `En funktion f har forskriften\n${fStr}\nDifferentier funktionen og forklar betydningen af f'(${x0}).`,
      fields: [
        { prefix: "f'(x) =" },
        { prefix: `f'(${x0}) =` }
      ],
      answers: [dfStr, String(dfAtX0)],
      accept_tolerance: 0,
      usePolyEqual: true,
      link: ["https://laerebogimatematik2hhx.systime.dk/?id=230", "https://laerebogimatematik2hhx.systime.dk/?id=238"],
      explanation: `f'(x) = ${dfStr}. f'(${x0}) = ${df1}·${x0} ${df0 >= 0 ? '+ ' + df0 : '- ' + Math.abs(df0)} = ${dfAtX0}.`
    };
  },

  // 4. Angiv minimum/maksimum — andengradspoly
  () => {
    const a  = (Math.random() > 0.5 ? 1 : -1) * rnd(1, 4);
    const xT = rnd(-5, 5);          // toppunkt/bundpunkt x-koordinat
    const b  = -2 * a * xT;
    const c  = rnd(-8, 8);          // funktionsværdi forskudt

    // f(xT) = a*xT² + b*xT + c
    const fAtXT = a * xT * xT + b * xT + c;

    const bStr = b === 0 ? '' : (b > 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`);
    const cStr = c === 0 ? '' : (c > 0 ? ` + ${c}`  : ` - ${Math.abs(c)}`);
    const fStr = `f(x) = ${fmtCoef(a)}x²${bStr}${cStr}`;
    const extremumType = a > 0 ? "minimum" : "maksimum";

    return {
      type: "fields",
      text: `En funktion f har forskriften\n${fStr}\nAngiv ${extremumType} for funktionen.`,
      fields: [
        { prefix: `${extremumType.charAt(0).toUpperCase() + extremumType.slice(1)} er ved x =` },
        { prefix: `${extremumType.charAt(0).toUpperCase() + extremumType.slice(1)} er` }
      ],
      answers: [String(xT), String(fAtXT)],
      accept_tolerance: 0,
      link: "https://laerebogimatematik2hhx.systime.dk/?id=228#c623",
      explanation: `Toppunktet er (${xT}, ${fAtXT}). f'(x) = ${2*a}x ${b >= 0 ? '+ '+b : '- '+Math.abs(b)}, nulpunkt x = ${xT}.`
    };
  },

  // 5. Differentier f(x) = a·eˣ + bx og forklar f'(x₀)
  () => {
    const a  = (Math.random() > 0.5 ? 1 : -1) * rnd(1, 5);
    const b  = rnd(-5, 5) || 1;    // undgå b=0
    const x0 = 0;                  // altid 0 så eleverne kan regne i hovedet

    // f'(x) = a·eˣ + b
    const bStr = b > 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`;
    const bDfStr = b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`;
    const fStr  = `f(x) = ${fmtCoef(a)}eˣ${bStr}`;
    const dfStr = `${fmtCoef(a)}eˣ${bDfStr}`;

    // f'(x0) = a·e^x0 + b — afrund til 4 decimaler
    const dfAtX0 = Math.round((a * Math.exp(x0) + b) * 10000) / 10000;

    return {
      type: "fields",
      text: `En funktion f har forskriften\n${fStr}\nDifferentier funktionen og forklar betydningen af f'(${x0}).`,
      fields: [
        { prefix: "f'(x) =" },
        { prefix: `f'(${x0}) =` }
      ],
      answers: [dfStr, String(dfAtX0)],
      accept_tolerance: 0.01,   // tillad afrundingsfejl
      usePolyEqual: false,
      link: ["https://laerebogimatematik2hhx.systime.dk/?id=230", "https://laerebogimatematik2hhx.systime.dk/?id=238"],
      explanation: `f'(x) = ${dfStr}. f'(${x0}) = ${fmtCoef(a)}·e^${x0} ${b >= 0 ? '+ '+b : '- '+Math.abs(b)} ≈ ${dfAtX0}.`
    };
  }

];
