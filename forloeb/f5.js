// F5 — Andengradsfunktioner
GENERATORS.F5 = [

  // 1. Bestem nulpunkterne
  () => {
    const r1 = rnd(-6, 6), r2 = rnd(-6, 6);
    const b = -(r1 + r2), c = r1 * r2;
    const mn = Math.min(r1, r2), mx = Math.max(r1, r2);
    const bStr = b >= 0 ? '+ ' + b : '− ' + Math.abs(b);
    const cStr = c >= 0 ? '+ ' + c : '− ' + Math.abs(c);
    return {
      type: "input",
      text: `Bestem nulpunkterne for funktionen\nf(x) = x² ${bStr}x ${cStr}`,
      answer: mn === mx ? String(mn) : `${mn} og ${mx}`,
      accept: [
        `${mn} og ${mx}`, `${mx} og ${mn}`,
        `x=${mn} og x=${mx}`, `x=${mx} og x=${mn}`,
        String(mn), String(mx)
      ],
      explanation: `Brug diskriminanten: d = b²−4ac = ${b * b}−${4 * c} = ${b * b - 4 * c}. Nulpunkterne er x = ${mn} og x = ${mx}.`
    };
  },

  // 2. Bestem toppunktet
  () => {
    const a = rnd(1, 3) * (Math.random() > 0.5 ? 1 : -1);
    const xT = rnd(-5, 5);
    const b = -2 * a * xT;
    const c = rnd(-8, 8);
    const yT = a * xT * xT + b * xT + c;
    const bStr = b >= 0 ? '+ ' + b : '− ' + Math.abs(b);
    const cStr = c >= 0 ? '+ ' + c : '− ' + Math.abs(c);
    return {
      type: "input",
      text: `Bestem toppunktet for\nf(x) = ${a}x² ${bStr}x ${cStr}`,
      answer: `(${xT}, ${yT})`,
      accept: [`(${xT}, ${yT})`, `(${xT};${yT})`, `${xT}, ${yT}`, `x=${xT}, y=${yT}`],
      explanation: `xT = −b/(2a) = ${-b}/${2 * a} = ${xT}. yT = f(${xT}) = ${a}·${xT}²+${b}·${xT}+${c} = ${yT}. Toppunkt: (${xT}, ${yT}).`
    };
  },

  // 3. Forklar betydningen af a og c (MC)
  () => {
    const a = rnd(1, 4) * (Math.random() > 0.5 ? 1 : -1);
    const b = rnd(-5, 5);
    const c = rnd(-8, 8);
    const bStr = b >= 0 ? '+ ' + b : '− ' + Math.abs(b);
    const cStr = c >= 0 ? '+ ' + c : '− ' + Math.abs(c);
    const aPos = a > 0;
    return {
      type: "mc",
      text: `Forklar betydningen af koefficienterne a og c for grafens udseende for følgende andengradspolynomium\nf(x) = ${a}x² ${bStr}x ${cStr}`,
      options: [
        `a = ${a}: parablen åbner ${aPos ? 'opad' : 'nedad'} da a er ${aPos ? 'positiv' : 'negativ'}. c = ${c}: grafen skærer y-aksen i (0, ${c})`,
        `a = ${a}: grafen skærer y-aksen i ${a}. c = ${c}: parablen åbner ${c > 0 ? 'opad' : 'nedad'}`,
        `a bestemmer nulpunkterne. c bestemmer toppunktet`,
        `a og c har ingen betydning for grafens udseende`
      ],
      correct: 0,
      explanation: `a = ${a} bestemmer om parablen åbner opad (a > 0) eller nedad (a < 0). c = ${c} er skæringen med y-aksen: f(0) = ${c}.`
    };
  },

  // 4. Beregn diskriminanten og fortolk
  () => {
    const a = rnd(1, 5), b = rnd(-8, 8), c = rnd(-6, 6);
    const d = b * b - 4 * a * c;
    const nulpkt = d > 0 ? "to nulpunkter" : d === 0 ? "præcis ét nulpunkt" : "ingen nulpunkter";
    const bStr = b >= 0 ? '+ ' + b : '− ' + Math.abs(b);
    const cStr = c >= 0 ? '+ ' + c : '− ' + Math.abs(c);
    return {
      type: "input",
      text: `Beregn diskriminanten for funktionen f(x) = ${a}x² ${bStr}x ${cStr} og forklar hvad dette betyder for antallet af nulpunkter.`,
      answer: String(d),
      accept: [String(d), "d=" + d, "d = " + d],
      explanation: `d = b²−4ac = ${b}²−4·${a}·${c} = ${b * b}−${4 * a * c} = ${d}. Da d ${d > 0 ? '> 0' : d === 0 ? '= 0' : '< 0'} har funktionen ${nulpkt}.`
    };
  },

];
