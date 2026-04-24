// F8 — Differentialregning og funktionsanalyse

// Brug math.js til at differentiere symbolsk og formater til elevvenlig notation
function mDerivative(exprStr) {
  const raw = math.simplify(math.derivative(exprStr, 'x')).toString();
  return raw
    .replace(/-\(\s*(\d+)\s*\*\s*x\s*\^\s*(\d+)\s*\)/g, (_, n, p) => `-${n}x^${p}`) // -(9 * x ^ 2) → -9x^2
    .replace(/-\(\s*(\d+)\s*\*\s*x\s*\)/g, (_, n) => `-${n}x`)                        // -(6 * x) → -6x
    .replace(/\s*\*\s*/g, '')                                                            // 6 * x → 6x
    .replace(/\s*\^\s*/g, '^')                                                           // x ^ 2 → x^2
    .trim();
}

GENERATORS.F8 = [

  // 1. Bestem f'(x) og monotoniforhold — andengradspoly
  () => {
    const a  = (Math.random() > 0.5 ? 1 : -1) * rnd(1, 4);
    const xT = rnd(-5, 5);   // nulpunkt for f'
    const b  = -2 * a * xT;
    const c  = rnd(-8, 8);

    const expr  = `${a}*x^2 + ${b}*x + ${c}`;
    const dfStr = mDerivative(expr);

    const bStr = b === 0 ? '' : (b > 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`);
    const cStr = c === 0 ? '' : (c > 0 ? ` + ${c}`  : ` - ${Math.abs(c)}`);
    const fStr = `f(x) = ${a}x²${bStr}${cStr}`;

    const monotoni = a > 0
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
  },

  // 2. Bestem f'(x) og monotoniforhold — kubisk
  () => {
    const a = (Math.random() > 0.5 ? 1 : -1) * rnd(1, 3);
    const t = rnd(1, 4);
    const b = -3 * a * t * t;  // sikrer heltalsnulpunkter ±t for f'

    const expr  = `${a}*x^3 + ${b}*x`;
    const dfStr = mDerivative(expr);

    const bStr = b === 0 ? '' : (b > 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`);
    const fStr = `f(x) = ${a}x³${bStr}`;

    const monotoni = a > 0
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
  },

  // 3. Identificér f(x) og f'(x) fra graf
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
    const xs  = linspace(-4, 4, 200);
    const fIsFirst = Math.random() > 0.5;
    const fColor   = fIsFirst ? cp.c1 : cp.c2;
    const dfColor  = fIsFirst ? cp.c2 : cp.c1;
    const fName    = fIsFirst ? cp.n1 : cp.n2;
    const dfName   = fIsFirst ? cp.n2 : cp.n1;
    const t1 = { x: xs, y: xs.map(fn),  mode: 'lines', line: { color: fColor,  width: 2.5 }, name: fIsFirst ? cp.n1 : cp.n2 };
    const t2 = { x: xs, y: xs.map(dfn), mode: 'lines', line: { color: dfColor, width: 2.5 }, name: fIsFirst ? cp.n2 : cp.n1 };
    const yVals = [...xs.map(fn), ...xs.map(dfn)];
    const yMin  = Math.max(Math.min(...yVals), -10);
    const yMax  = Math.min(Math.max(...yVals),  10);
    const layout = Object.assign({}, PLOTLY_LAYOUT_BASE, {
      height: 320, showlegend: true, legend: { x: 0.02, y: 0.98 }, dragmode: 'pan',
      xaxis: Object.assign({}, PLOTLY_LAYOUT_BASE.xaxis, { range: [-4, 4] }),
      yaxis: Object.assign({}, PLOTLY_LAYOUT_BASE.yaxis, { range: [yMin - 1, yMax + 1] })
    });
    return {
      type: "mc2",
      text: `Nedenfor ser du grafen for en funktion f(x) og grafen for den afledte funktion f'(x).\nForklar hvilken graf der hører til f(x) og hvilken graf der hører til f'(x).`,
      graph: makePlotSpec([t1, t2], layout),
      questions: [
        { label: "f(x) er",  options: [cp.n1 + " graf", cp.n2 + " graf"], correct: fIsFirst ? 0 : 1, explanation: `f(x) er den ${fName.toLowerCase()} graf.`  },
        { label: "f'(x) er", options: [cp.n1 + " graf", cp.n2 + " graf"], correct: fIsFirst ? 1 : 0, explanation: `f'(x) er den ${dfName.toLowerCase()} graf.` }
      ],
      link: "https://laerebogimatematik2hhx.systime.dk/?id=133",
      explanation: `f(x) er den ${fName.toLowerCase()} graf — den afledte er et grad lavere og skifter fortegn ved f's toppunkter/bundpunkter.`
    };
  },

  // 4. Bestem f'(x) og monotoniforhold — 1 interval (altid voksende eller aftagende)
  () => {
    // Tre varianter der alle giver ét interval:
    // a) Lineær: f(x) = ax + b  →  f'(x) = a (konstant, aldrig 0)
    // b) Rent kubisk: f(x) = ax³  →  f'(x) = 3ax² ≥ 0 altid
    // c) Kubisk med dobbeltrod: f(x) = a(x-r)³ + c  →  f'(x) = 3a(x-r)² ≥ 0 altid
    //    (f' rører x-aksen i x=r men skifter ikke fortegn)
    const variant = rnd(0, 2);
    let fStr, dfStr, monotoni;

    if (variant === 0) {
      // Lineær
      const a = (Math.random() > 0.5 ? 1 : -1) * rnd(1, 5);
      const b = rnd(-8, 8);
      dfStr = mDerivative(`${a}*x + ${b}`);
      const bStr = b === 0 ? '' : (b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`);
      fStr = `f(x) = ${a}x${bStr}`;
      monotoni = [ { interval: `]−∞ ; ∞[`, type: a > 0 ? "Voksende" : "Aftagende" } ];

    } else if (variant === 1) {
      // Rent kubisk: f(x) = ax³
      const a = (Math.random() > 0.5 ? 1 : -1) * rnd(1, 3);
      dfStr = mDerivative(`${a}*x^3`);
      fStr = `f(x) = ${a}x³`;
      monotoni = [ { interval: `]−∞ ; ∞[`, type: a > 0 ? "Voksende" : "Aftagende" } ];

    } else {
      // Kubisk med dobbeltrod i r: f(x) = a(x-r)³ + c
      // f'(x) = 3a(x-r)² — rører x-aksen i x=r men skifter aldrig fortegn
      const a = (Math.random() > 0.5 ? 1 : -1) * rnd(1, 2);
      const r = rnd(-3, 3);
      const c = rnd(-5, 5);
      // Koefficienter: a(x-r)³ + c = ax³ - 3arx² + 3ar²x + (c - ar³)
      const A = a;
      const B = -3 * a * r;
      const C = 3 * a * r * r;
      const D = c - a * r * r * r;
      const bStr = B === 0 ? '' : (B > 0 ? ` + ${B}x²` : ` - ${Math.abs(B)}x²`);
      const cStr = C === 0 ? '' : (C > 0 ? ` + ${C}x`    : ` - ${Math.abs(C)}x`);
      const dStr = D === 0 ? '' : (D > 0 ? ` + ${D}`      : ` - ${Math.abs(D)}`);
      fStr = `f(x) = ${A}x³${bStr}${cStr}${dStr}`;
      // Byg dfStr direkte: f'(x) = 3Ax² + 2Bx + C (undgår math.js faktorisering)
      const df2 = 3*A, df1 = 2*B, df0 = C;
      const dfParts = [];
      if (df2 !== 0) dfParts.push(`${df2}x^2`);
      if (df1 !== 0) dfParts.push(df1 > 0 ? `+ ${df1}x` : `- ${Math.abs(df1)}x`);
      if (df0 !== 0) dfParts.push(df0 > 0 ? `+ ${df0}`  : `- ${Math.abs(df0)}`);
      dfStr = dfParts.join(' ').replace(/^\+ /, '');
      const type = a > 0 ? "Voksende" : "Aftagende";
      monotoni = [ { interval: `]−∞ ; ∞[`, type } ];
    }

    return {
      type: "monotoni",
      text: `En funktion f har forskriften
${fStr}
Bestem f'(x) og angiv monotoniforhold for f.`,
      dfStr, dfAnswer: dfStr, monotoni,
      link: "https://laerebogimatematik2hhx.systime.dk/?id=229#c565",
      explanation: `f'(x) = ${dfStr}. Funktionen har ét interval da f' aldrig skifter fortegn.`
    };
  },

];
