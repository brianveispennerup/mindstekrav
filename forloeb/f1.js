// F1 — Lineære funktioner
GENERATORS.F1 = [

  // 1. Bestem forskriften fra to punkter
  () => {
    const a = rnd(-4, 4) || 1, b = rnd(-8, 8);
    const x1 = rnd(0, 4), y1 = a * x1 + b, x2 = x1 + rnd(1, 4), y2 = a * x2 + b;
    return {
      type: "fields",
      text: `Bestem forskriften for den lineære funktion, hvis graf går gennem punkterne (x₁, y₁) = (${x1}, ${y1}) og (x₂, y₂) = (${x2}, ${y2}).`,
      fields: [
        { prefix: "f(x) =", suffix: "x +" },
        { suffix: "" }
      ],
      answers: [String(a), String(b)],
      link: "https://laerebogimatematik1hhx.systime.dk/?id=223#c993",
      explanation: `a = (${y2}−${y1})/(${x2}−${x1}) = ${a}. b = ${y1}−${a}·${x1} = ${b}. Forskrift: f(x) = ${a}x ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)}.`
    };
  },

  // 2. Tegn grafen
  () => {
    const b = rnd(-4, 4);
    const a = rnd(-3, 3) || 1;
    const aStr = a === 1 ? '' : a === -1 ? '-' : String(a);
    const fStr = `f(x) = ${aStr}x${b === 0 ? '' : (b > 0 ? ' + ' + b : ' − ' + Math.abs(b))}`;
    return {
      type: "draw",
      text: `Tegn grafen for den lineære funktion med forskriften ${fStr}.\nKlik to punkter på koordinatsystemet som ligger på grafen.\nForklar desuden betydningen af a og b.`,
      drawA: a, drawB: b, drawRange: 5,
      link: "https://laerebogimatematik1hhx.systime.dk/?id=222#c2444",
      explanation: `a = ${a} er hældningen (grafen ${a > 0 ? 'stiger' : 'falder'} ${Math.abs(a)} for hver enhed). b = ${b} er skæringen med y-aksen: (0, ${b}).`
    };
  },

  // 3. Bestem nulpunkt
  () => {
    const a = rnd(1, 5), b = rnd(-20, 20);
    const np = -b / a;
    if (!Number.isInteger(np)) return GENERATORS.F1[2]();
    const fStr = `f(x) = ${a}x${b === 0 ? '' : (b > 0 ? ' + ' + b : ' − ' + Math.abs(b))}`;
    return {
      type: "input",
      prefix: "x =",
      text: `En funktion er givet ved\n${fStr}\nBestem nulpunktet til funktionen.`,
      answer: String(np),
      accept: [String(np), "x=" + np, "x = " + np],
      link: "https://laerebogimatematik1hhx.systime.dk/?id=206#c391",
      explanation: `Sæt f(x) = 0: ${a}x ${b >= 0 ? '+ ' + b : '− ' + Math.abs(b)} = 0 → x = ${np}`
    };
  },

  // 4. Aflæs Dm og Vm — voksende/aftagende, åbne/lukkede endepunkter
  () => {
    const a = rnd(-3, 3) || 1, b = rnd(-5, 5);
    const x1 = rnd(-4, 0), x2 = x1 + rnd(3, 6);
    const y1 = a * x1 + b, y2 = a * x2 + b;
    const yMin = Math.min(y1, y2), yMax = Math.max(y1, y2);

    // Tilfældig kombination af åbne/lukkede endepunkter
    const leftClosed  = Math.random() > 0.5;
    const rightClosed = Math.random() > 0.5;

    // Plotly markers: fyldt = lukket, tom cirkel = åbent
    const tLine = { x: [x1, x2], y: [y1, y2], mode: 'lines', line: { color: '#185FA5', width: 2.5 } };
    const makePoint = (x, y, closed) => ({
      x: [x], y: [y], mode: 'markers',
      marker: closed
        ? { color: '#185FA5', size: 10 }
        : { color: '#fff', size: 10, symbol: 'circle', line: { width: 2.5, color: '#185FA5' } }
    });
    const tLeft  = makePoint(x1, y1, leftClosed);
    const tRight = makePoint(x2, y2, rightClosed);
    const graph = plotLines([tLine, tLeft, tRight], [x1 - 2, x2 + 2], [yMin - 2, yMax + 2]);

    // Dm
    const dmLeft  = leftClosed  ? '[' : ']';
    const dmRight = rightClosed ? ']' : '[';
    const dmStr = `${dmLeft}${x1} ; ${x2}${dmRight}`;

    // Vm: y1 hører til venstre endepunkt, y2 til højre
    const yMinVal = Math.min(y1, y2);
    const yMaxVal = Math.max(y1, y2);
    const yMinClosed = (y1 < y2) ? leftClosed : rightClosed;
    const yMaxClosed = (y1 < y2) ? rightClosed : leftClosed;
    const vmLeft  = yMinClosed ? '[' : ']';
    const vmRight = yMaxClosed ? ']' : '[';
    const vmStr = `${vmLeft}${yMinVal} ; ${yMaxVal}${vmRight}`;

    return {
      type: "fields",
      text: `Nedenfor er tegnet det grafiske billede for en begrænset lineær funktion. Aflæs definitionsmængden og værdimængden.`,
      graph,
      fields: [
        { prefix: "Dm =" },
        { prefix: "Vm =" }
      ],
      answers: [dmStr, vmStr],
      intervalFields: true,
      link: "https://laerebogimatematik1hhx.systime.dk/?id=250#c1095",
      explanation: `Definitionsmængden aflæses på x-aksen: Dm = ${dmStr}. Værdimængden på y-aksen: Vm = ${vmStr}.`
    };
  },

  // 5. Taxa tekstopgave
  () => {
    const s = rnd(20, 60), p = rnd(8, 20);
    return {
      type: "fields",
      text: `En taxatur koster ${s} kr. i startgebyr og kilometerprisen er ${p} kr.\nOpskriv en funktionsforskrift, der angiver den samlede pris for taxaturen som en funktion af antal kørte kilometer.`,
      fields: [
        { prefix: "f(x) =", suffix: "x +" },
        { suffix: "" }
      ],
      answers: [String(p), String(s)],
      link: "https://laerebogimatematik1hhx.systime.dk/?id=222",
      explanation: `Kilometerprisen er hældningen a = ${p}, startgebyret er skæringen b = ${s}. Forskrift: f(x) = ${p}x + ${s}.`
    };
  },

  // 6. Omvendt funktion
  () => {
    const aVals = [-10, -5, -4, -2, -1, 1, 2, 4, 5, 10];
    const a = aVals[Math.floor(Math.random() * aVals.length)];
    const bMult = rnd(-4, 4) * a;
    const invA = Math.round(1 / a * 1000) / 1000;
    const invB = -bMult / a;
    const fStr = `f(x) = ${a}x ${bMult >= 0 ? '+ ' + bMult : '− ' + Math.abs(bMult)}`;
    const invAStr = fmt(invA);
    return {
      type: "fields",
      text: `Bestem den omvendte funktion til den lineære funktion\n${fStr}`,
      fields: [
        { prefix: "f⁻¹(x) =", suffix: "x +" },
        { suffix: "" }
      ],
      answers: [invAStr, String(invB)],
      link: "https://laerebogimatematik1hhx.systime.dk/?id=254#c2741",
      explanation: `Bytter x og y: x = ${a}y + ${bMult} → y = (x − ${bMult}) / ${a} = ${invAStr}x + ${invB}. Så f⁻¹(x) = ${invAStr}x + ${invB}.`
    };
  },

];
