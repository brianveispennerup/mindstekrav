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

];
