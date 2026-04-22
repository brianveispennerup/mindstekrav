// F5 — Andengradsfunktioner

function fmtPoly(a, b, c) {
  // Formatér ax² + bx + c pænt uden 1x² eller + 0
  let s = '';
  // a-led
  if (a === 1) s += 'x²';
  else if (a === -1) s += '-x²';
  else s += a + 'x²';
  // b-led
  if (b > 1) s += ' + ' + b + 'x';
  else if (b === 1) s += ' + x';
  else if (b === -1) s += ' − x';
  else if (b < 0) s += ' − ' + Math.abs(b) + 'x';
  else if (b > 0) s += ' + ' + b + 'x';
  // c-led
  if (c > 0) s += ' + ' + c;
  else if (c < 0) s += ' − ' + Math.abs(c);
  return s;
}

GENERATORS.F5 = [

  // 1. Bestem nulpunkterne — nulpunkter type
  () => {
    const r1 = rnd(-6, 6), r2 = rnd(-6, 6);
    const b = -(r1 + r2), c = r1 * r2;
    const mn = Math.min(r1, r2), mx = Math.max(r1, r2);
    const d = b * b - 4 * c;
    const numRoots = d > 0 ? 2 : d === 0 ? 1 : 0;
    return {
      type: "nulpunkter",
      text: `Bestem nulpunkterne for funktionen\nf(x) = ${fmtPoly(1, b, c)}`,
      numRoots,
      roots: mn === mx ? [mn] : [mn, mx],
      link: "https://laerebogimatematik1hhx.systime.dk/?id=300#c2694",
      explanation: `d = b²−4ac = ${b*b}−${4*c} = ${d}. Nulpunkterne er x = ${mn}${mn !== mx ? ' og x = ' + mx : ''}.`
    };
  },

  // 2. Bestem toppunktet — fields T = (x, y)
  () => {
    const a = rnd(1, 3) * (Math.random() > 0.5 ? 1 : -1);
    const xT = rnd(-5, 5);
    const b = -2 * a * xT;
    const c = rnd(-8, 8);
    const yT = a * xT * xT + b * xT + c;
    return {
      type: "fields",
      text: `Bestem toppunktet for\nf(x) = ${fmtPoly(a, b, c)}`,
      fields: [
        { prefix: "T = (", suffix: "," },
        { suffix: ")" }
      ],
      answers: [String(xT), String(yT)],
      link: "https://laerebogimatematik1hhx.systime.dk/?id=262#c1177",
      explanation: `xT = −b/(2a) = ${-b}/${2*a} = ${xT}. yT = f(${xT}) = ${yT}. Toppunkt: T = (${xT}, ${yT}).`
    };
  },

  // 3. Forklar a og c — mc2 med 4 spørgsmål
  () => {
    const a = rnd(1, 4) * (Math.random() > 0.5 ? 1 : -1);
    const b = rnd(-5, 5);
    const c = rnd(-8, 8);
    const aPos = a > 0;
    const cSign = c > 0 ? 'positiv' : c < 0 ? 'negativ' : '0';
    const yAxisDesc = c > 0 ? 'over x-aksen' : c < 0 ? 'under x-aksen' : 'i x-aksen (origo)';
    return {
      type: "mc2",
      text: `Forklar betydningen af koefficienterne a og c for grafens udseende for følgende andengradspolynomium\nf(x) = ${fmtPoly(a, b, c)}`,
      questions: [
        {
          label: `a = ${a} er`,
          options: ["Positiv", "Negativ"],
          correct: aPos ? 0 : 1,
          explanation: `a = ${a} er ${aPos ? 'positiv' : 'negativ'}.`
        },
        {
          label: `Det betyder parablens ben peger`,
          options: ["Opad", "Nedad"],
          correct: aPos ? 0 : 1,
          explanation: `Da a er ${aPos ? 'positiv' : 'negativ'} åbner parablen ${aPos ? 'opad' : 'nedad'}.`
        },
        {
          label: `c = ${c} er`,
          options: ["Positiv", "Negativ", "0"],
          correct: c > 0 ? 0 : c < 0 ? 1 : 2,
          explanation: `c = ${c} er ${cSign}.`
        },
        {
          label: `Det betyder parablen skærer y-aksen`,
          options: ["Over x-aksen", "Under x-aksen", "I x-aksen (origo)"],
          correct: c > 0 ? 0 : c < 0 ? 1 : 2,
          explanation: `f(0) = c = ${c}, så grafen skærer y-aksen ${yAxisDesc}.`
        }
      ],
      link: "https://laerebogimatematik1hhx.systime.dk/?id=261",
      explanation: `a = ${a} → parablen åbner ${aPos ? 'opad' : 'nedad'}. c = ${c} → y-aksen skæres ${yAxisDesc}.`
    };
  },

  // 4. Diskriminanten — fields d = input, nulpunkter = input
  () => {
    const a = rnd(1, 5), b = rnd(-8, 8), c = rnd(-6, 6);
    const d = b * b - 4 * a * c;
    const nulpkt = d > 0 ? '2' : d === 0 ? '1' : '0';
    return {
      type: "fields",
      text: `Beregn diskriminanten for funktionen\nf(x) = ${fmtPoly(a, b, c)}\nog forklar hvad dette betyder for antallet af nulpunkter.`,
      fields: [
        { prefix: "Diskriminanten er", suffix: ", derfor har funktionen" },
        { suffix: "nulpunkter" }
      ],
      answers: [String(d), nulpkt],
      explanation: `d = b²−4ac = ${b}²−4·${a}·${c} = ${b*b}−${4*a*c} = ${d}. Da d ${d > 0 ? '> 0' : d === 0 ? '= 0' : '< 0'} har funktionen ${nulpkt === '2' ? 'to' : nulpkt === '1' ? 'præcis ét' : 'ingen'} nulpunkt${nulpkt !== '1' ? 'er' : ''}.`
    };
  },

];
