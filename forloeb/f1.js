// F1 — Lineære funktioner
GENERATORS.F1 = [

  // 1. Bestem forskriften fra to punkter
  () => {
    const a = rnd(-4, 4) || 1, b = rnd(-8, 8);
    const x1 = rnd(0, 4), y1 = a * x1 + b, x2 = x1 + rnd(1, 4), y2 = a * x2 + b;
    const fStr = `f(x) = ${a}x ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)}`;
    return {
      type: "input",
      text: `Bestem forskriften for den lineære funktion, hvis graf går gennem punkterne (x₁, y₁) = (${x1}, ${y1}) og (x₂, y₂) = (${x2}, ${y2}).`,
      answer: fStr,
      accept: [fStr, `${a}x${b >= 0 ? '+' + b : '' + b}`],
      explanation: `a = (${y2}−${y1})/(${x2}−${x1}) = ${a}. b = ${y1}−${a}·${x1} = ${b}. Forskrift: ${fStr}.`
    };
  },

  // 2. Tegn grafen ved at klikke to punkter
  () => {
    const a = rnd(-4, 4) || 1, b = rnd(-8, 8);
    const fStr = `f(x) = ${a}x ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)}`;
    return {
      type: "draw",
      text: `Tegn grafen for den lineære funktion med forskriften ${fStr}.\nKlik to punkter på koordinatsystemet som ligger på grafen.\nForklar desuden betydningen af a og b.`,
      drawA: a, drawB: b,
      explanation: `a = ${a} er hældningen (grafen ${a > 0 ? 'stiger' : 'falder'} ${Math.abs(a)} for hver enhed). b = ${b} er skæringen med y-aksen: (0, ${b}).`
    };
  },

  // 3. Bestem nulpunkt
  () => {
    const a = rnd(1, 5), b = rnd(-20, 20);
    const np = -b / a;
    if (!Number.isInteger(np)) return GENERATORS.F1[2]();
    return {
      type: "input",
      text: `En funktion er givet ved\nf(x) = ${a}x ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)}\nBestem nulpunktet til funktionen.`,
      answer: String(np),
      accept: [String(np), "x=" + np, "x = " + np],
      explanation: `Sæt f(x) = 0: ${a}x ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)} = 0 → x = ${np}`
    };
  },

  // 4. Aflæs definitionsmængde og værdimængde fra begrænset funktion (med graf, MC)
  () => {
    const a = rnd(-3, 3) || 1, b = rnd(-5, 5);
    const x1 = rnd(-2, 1), x2 = x1 + rnd(3, 6);
    const y1 = a * x1 + b, y2 = a * x2 + b;
    const yMin = Math.min(y1, y2), yMax = Math.max(y1, y2);
    const t1 = { x: [x1, x2], y: [y1, y2], mode: 'lines', line: { color: '#185FA5', width: 2.5 } };
    const tS = makeScatterTrace([x1], [y1], '#185FA5', 10);
    const tE = { x: [x2], y: [y2], mode: 'markers', marker: { color: '#185FA5', size: 10, symbol: 'circle-open', line: { width: 2, color: '#185FA5' } } };
    const graph = plotLines([t1, tS, tE], [x1 - 2, x2 + 2], [yMin - 2, yMax + 2]);
    const dm = `[${x1}; ${x2}]`, vm = a > 0 ? `[${y1}; ${y2}]` : `[${y2}; ${y1}]`;
    return {
      type: "mc",
      text: `Nedenfor er tegnet det grafiske billede for en begrænset lineær funktion. Aflæs definitionsmængden og værdimængden.`,
      graph,
      options: [
        `Dm = ${dm}, Vm = ${vm}`,
        `Dm = ${vm}, Vm = ${dm}`,
        `Dm = ]${x1}; ${x2}[, Vm = ${vm}`,
        `Dm = ${dm}, Vm = [${y1}; ${y2 + 2}]`
      ],
      correct: 0,
      explanation: `Definitionsmængden aflæses på x-aksen: Dm = ${dm}. Værdimængden på y-aksen: Vm = ${vm}.`
    };
  },

  // 5. Taxa tekstopgave
  () => {
    const s = rnd(20, 60), p = rnd(8, 20), k = rnd(3, 15), t = s + p * k;
    return {
      type: "input",
      text: `En taxatur koster ${s} kr. i startgebyr og kilometerprisen er ${p} kr.\nOpskriv en funktionsforskrift, der angiver den samlede pris for taxaturen som en funktion af antal kørte kilometer.\nHvad er f(${k})?`,
      answer: String(t),
      accept: [String(t), t + " kr", t + " kr."],
      explanation: `f(x) = ${s} + ${p}x. f(${k}) = ${s} + ${p}·${k} = ${t} kr.`
    };
  },

];
