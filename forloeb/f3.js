// F3 — Deskriptiv statistik
GENERATORS.F3 = [

  // 1. Lav pindediagram — træk søjler op
  () => {
    const vals = [1, 2, 3, 4, 5, 6];
    const hyps = Array.from({ length: 6 }, () => rnd(5, 25));
    const tot = hyps.reduce((a, b) => a + b, 0);
    const freqs = hyps.map(h => fmt(Math.round(h / tot * 100) / 100));
    return {
      type: "pinde",
      text: `Nedenstående tabel viser fordelingen af "antal øjne" ved ${tot} kast med en terning.\nLav et pindediagram over fordelingen ved at trække søjlerne op.`,
      tableHeaders: ["Antal øjne", "Hyppighed", "Frekvens"],
      tableRows: vals.map((v, i) => [String(v), String(hyps[i]), freqs[i]]),
      tableFooter: ["I alt", String(tot), "1,00"],
      labels: vals,
      answers: hyps,
      yMax: Math.max(...hyps) + 3,
      explanation: `Søjlernes højde svarer til hyppigheden for hvert antal øjne.`
    };
  },

  // 2. Typetal og gennemsnit — tabel + fields
  () => {
    const vals = [1, 2, 3, 4, 5, 6];
    const n = rnd(15, 30);
    const hyps = Array.from({ length: 6 }, () => rnd(1, Math.floor(n / 3)));
    const tot = hyps.reduce((a, b) => a + b, 0);
    const typIdx = hyps.indexOf(Math.max(...hyps));
    const typtal = vals[typIdx];
    const mean = Math.round(vals.reduce((s, v, i) => s + v * hyps[i], 0) / tot * 100) / 100;
    const freqs = hyps.map(h => fmt(Math.round(h / tot * 100) / 100));
    return {
      type: "fields",
      text: `Nedenstående tabel viser hyppighed og frekvens for ${tot} kast med en terning.\nBestem typetal og gennemsnit.`,
      tableHeaders: ["Antal øjne", "Hyppighed", "Frekvens"],
      tableRows: vals.map((v, i) => [String(v), String(hyps[i]), freqs[i]]),
      tableFooter: ["I alt", String(tot), "1,00"],
      fields: [
        { prefix: "Typetal =", suffix: "" },
        { prefix: "Gennemsnit =", suffix: "" }
      ],
      answers: [String(typtal), fmt(mean)],
      explanation: `Typetal = ${typtal} (hyppighed ${hyps[typIdx]} er højest). Gennemsnit = ${fmt(mean)}.`
    };
  },

  // 3. Frekvenser og summerede frekvenser — tabel med inputs
  () => {
    const charLabels = ['-3', '00', '02', '4', '7', '10', '12'];
    const hyps = [0, rnd(1, 3), rnd(3, 7), rnd(3, 7), rnd(5, 10), rnd(3, 6), rnd(1, 3)];
    const tot = hyps.reduce((a, b) => a + b, 0);
    const freqs = hyps.map(h => Math.round(h / tot * 100) / 100);
    let cumFreqs = [];
    let cum = 0;
    freqs.forEach(f => { cum = Math.round((cum + f) * 100) / 100; cumFreqs.push(cum); });
    return {
      type: "table",
      text: `Nedenstående tabel viser fordelingen af karakterer til en eksamen for ${tot} elever.\nBeregn frekvenserne og de summerede frekvenser.`,
      tableHeaders: ["Karakter", "Hyppighed", "Frekvens", "Summeret frekvens"],
      tableRows: charLabels.map((c, i) => [c, String(hyps[i])]),
      tableFooter: ["I alt", String(tot), "1,00", ""],
      inputCols: [2, 3], // kolonner der skal udfyldes
      answers: charLabels.map((_, i) => [fmt(freqs[i]), fmt(cumFreqs[i])]),
      explanation: `Frekvens = hyppighed / total. Summeret frekvens = sum af frekvenser t.o.m. rækken.`
    };
  },

  // 4. Aflæs kvartilsæt — graf uden røde linjer, fields Q1, m, Q3
  () => {
    const ages = [10, 20, 25, 30, 35, 40, 50, 60];
    const cf = [rnd(0, 5), rnd(10, 20), rnd(25, 35), rnd(45, 58), rnd(65, 75), rnd(80, 88), rnd(95, 98), 100];
    function readQ(p) { let i = 0; while (i < cf.length - 1 && cf[i] < p) i++; return ages[i]; }
    const Q1 = readQ(25), Q2 = readQ(50), Q3 = readQ(75);

    // Interpolér mange punkter så hover virker overalt på linjen
    const denseX = [], denseY = [];
    for (let i = 0; i < ages.length - 1; i++) {
      const steps = 20;
      for (let s = 0; s < steps; s++) {
        const t = s / steps;
        denseX.push(Math.round((ages[i] + t * (ages[i+1] - ages[i])) * 10) / 10);
        denseY.push(Math.round((cf[i] + t * (cf[i+1] - cf[i])) * 10) / 10);
      }
    }
    denseX.push(ages[ages.length-1]);
    denseY.push(cf[cf.length-1]);

    const t1 = {
      x: denseX, y: denseY,
      mode: 'lines',
      line: { color: '#185FA5', width: 2.5 },
      hovertemplate: 'Alder: %{x}<br>Summeret frekvens: %{y}%<extra></extra>'
    };
    // Markerede datapunkter
    const t2 = {
      x: ages, y: cf,
      mode: 'markers',
      marker: { color: '#185FA5', size: 7 },
      hoverinfo: 'skip', showlegend: false
    };
    const layout = Object.assign({}, PLOTLY_LAYOUT_BASE, {
      xaxis: Object.assign({}, PLOTLY_LAYOUT_BASE.xaxis, { range: [8, 62], title: { text: 'Alder' } }),
      yaxis: Object.assign({}, PLOTLY_LAYOUT_BASE.yaxis, { range: [-2, 105], dtick: 10, title: { text: 'Summeret frekvens i %' } }),
      hovermode: 'x',
      hoverlabel: { bgcolor: '#fff', bordercolor: '#185FA5', font: { size: 13, color: '#111' } }
    });
    const graph = makePlotSpec([t1, t2], layout);
    return {
      type: "fields",
      text: `Nedenstående graf viser aldersfordelingen af dagpengemodtagere i Danmark.\nAflæs kvartilsættet ud fra figuren og fortolk dette.`,
      graph,
      fields: [
        { prefix: "Q₁ =", suffix: "" },
        { prefix: "m =", suffix: "" },
        { prefix: "Q₃ =", suffix: "" }
      ],
      answers: [String(Q1), String(Q2), String(Q3)],
      explanation: `Aflæs ved 25%, 50% og 75% på y-aksen. Q₁ = ${Q1}, m = ${Q2} (median), Q₃ = ${Q3}.`
    };
  },

];
