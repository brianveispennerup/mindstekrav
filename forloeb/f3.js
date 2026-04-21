// F3 — Deskriptiv statistik
GENERATORS.F3 = [

  // 1. Lav pindediagram — aflæs typetal
  () => {
    const vals = [1, 2, 3, 4, 5, 6];
    const hyps = Array.from({ length: 6 }, () => rnd(5, 25));
    const typIdx = hyps.indexOf(Math.max(...hyps));
    const tot = hyps.reduce((a, b) => a + b, 0);
    const t = makeBarTrace(vals, hyps, '#B5D4F4');
    const layout = Object.assign({}, PLOTLY_LAYOUT_BASE, {
      xaxis: Object.assign({}, PLOTLY_LAYOUT_BASE.xaxis, { range: [0.3, 6.7], dtick: 1, title: { text: 'Antal øjne' } }),
      yaxis: Object.assign({}, PLOTLY_LAYOUT_BASE.yaxis, { range: [0, Math.max(...hyps) + 3], title: { text: 'Hyppighed' } })
    });
    const graph = makePlotSpec([t], layout);
    return {
      type: "input",
      text: `Nedenstående tabel viser fordelingen af "antal øjne" ved ${tot} kast med en terning.\nLav et pindediagram over fordelingen.`,
      graph,
      answer: String(vals[typIdx]),
      accept: [String(vals[typIdx])],
      explanation: `Pindediagrammet er vist ovenfor. Typetallet er ${vals[typIdx]} med hyppighed ${hyps[typIdx]}.`
    };
  },

  // 2. Typetal og gennemsnit fra hyppighedstabel
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
      type: "input",
      text: `Nedenstående tabel viser hyppighed og frekvens for ${tot} kast med en terning:\nAntal øjne: 1,  2,  3,  4,  5,  6\nHyppighed:  ${hyps.join(', ')}\nFrekvens:   ${freqs.join(', ')}\nBestem typetal og gennemsnit. Skriv gennemsnittet. (2 dec)`,
      answer: fmt(mean),
      accept: [fmt(mean), String(mean)],
      explanation: `Typetal = ${typtal} (hyppighed ${hyps[typIdx]} er højest). Gennemsnit = (${vals.map((v, i) => v + '·' + hyps[i]).join('+')}) / ${tot} = ${fmt(mean)}.`
    };
  },

  // 3. Beregn frekvenser og summerede frekvenser
  () => {
    const charLabels = ['-3', '00', '02', '4', '7', '10', '12'];
    const hyps = [0, rnd(1, 3), rnd(3, 7), rnd(3, 7), rnd(5, 10), rnd(3, 6), rnd(1, 3)];
    const tot = hyps.reduce((a, b) => a + b, 0);
    const idx = rnd(2, 5);
    const freq = Math.round(hyps[idx] / tot * 100) / 100;
    let cumHyp = 0;
    for (let i = 0; i <= idx; i++) cumHyp += hyps[i];
    const cumFreq = Math.round(cumHyp / tot * 100) / 100;
    return {
      type: "input",
      text: `Nedenstående tabel viser fordelingen af karakterer til en eksamen for ${tot} elever:\nKarakter:  ${charLabels.join(', ')}\nHyppighed: ${hyps.join(', ')}\nBeregn frekvenserne og de summerede frekvenser.\nHvad er frekvensen for karakteren ${charLabels[idx]}? (2 dec)`,
      answer: fmt(freq),
      accept: [fmt(freq), String(freq)],
      explanation: `Frekvens for ${charLabels[idx]}: ${hyps[idx]}/${tot} = ${fmt(freq)}. Summeret frekvens t.o.m. ${charLabels[idx]}: ${cumHyp}/${tot} = ${fmt(cumFreq)}.`
    };
  },

  // 4. Aflæs kvartilsæt fra summeret frekvensgraf
  () => {
    const ages = [10, 20, 25, 30, 35, 40, 50, 60];
    const cf = [rnd(0, 5), rnd(10, 20), rnd(25, 35), rnd(45, 58), rnd(65, 75), rnd(80, 88), rnd(95, 98), 100];
    function readQ(p) { let i = 0; while (i < cf.length - 1 && cf[i] < p) i++; return ages[i]; }
    const Q1 = readQ(25), Q2 = readQ(50), Q3 = readQ(75);
    const t1 = { x: ages, y: cf, mode: 'lines+markers', line: { color: '#185FA5', width: 2.5 }, marker: { color: '#185FA5', size: 7 } };
    const mkL = (y) => ({ x: [ages[0], ages[ages.length - 1]], y: [y, y], mode: 'lines', line: { color: '#C0392B', width: 1, dash: 'dot' } });
    const layout = Object.assign({}, PLOTLY_LAYOUT_BASE, {
      xaxis: Object.assign({}, PLOTLY_LAYOUT_BASE.xaxis, { range: [8, 62], title: { text: 'Alder' } }),
      yaxis: Object.assign({}, PLOTLY_LAYOUT_BASE.yaxis, { range: [-2, 105], title: { text: 'Summeret frekvens i %' } })
    });
    const graph = makePlotSpec([t1, mkL(25), mkL(50), mkL(75)], layout);
    return {
      type: "input",
      text: `Nedenstående graf viser aldersfordelingen af dagpengemodtagere i Danmark.\nAflæs kvartilsættet ud fra figuren og fortolk dette.\nHvad er medianen (Q2)?`,
      graph,
      answer: String(Q2),
      accept: [String(Q2), Q2 + " år", String(Q2 - 5), String(Q2 + 5)],
      explanation: `Aflæs ved 25%, 50% og 75% på y-aksen. Q1 = ${Q1}, Q2 = ${Q2} (median), Q3 = ${Q3}. Kvartilsættet beskriver spredningen i fordelingen.`
    };
  },

];
