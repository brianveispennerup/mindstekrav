// F4 — Finansiel regning
GENERATORS.F4 = [

  // 1. Renters rente
  () => {
    const K0 = rnd(1, 10) * 100, r = rnd(1, 8), n = rnd(2, 10);
    const Kn = Math.round(K0 * Math.pow(1 + r / 100, n) * 100) / 100;
    return {
      type: "input",
      text: `Der indsættes ${K0} kr. i en bank til en årlig rente på ${r}%.\nVis, hvordan man udregner, hvor meget de ${K0} kr. er vokset til efter ${n} år og bestem dette beløb.\n(Svar angives med 2 decimaler)`,
      answer: fmt(Kn),
      accept: [fmt(Kn), String(Kn), String(Math.round(Kn))],
      accept_tolerance: 0.015,
      link: "https://laerebogimatematik1hhx.systime.dk/?id=281#c509",
      explanation: `Svar: ${fmt(Kn)} kr.`
    };
  },

  // 2. Annuitetslån — månedlig ydelse
  () => {
    const K0 = rnd(4, 20) * 10000, rm = rndF(0.3, 1.0, 1), n = rnd(24, 84);
    const r = Math.round(rm * 10) / 1000, y = Math.round(K0 * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) * 100) / 100;
    return {
      type: "input",
      text: `En person ønsker at optage et annuitetslån på ${K0} kr. til køb af en bil.\nDen månedlige rente er på ${fmt(rm)}% og tilbagebetalingsperioden er på ${n} måneder.\nBestem den månedlige ydelse y.\n(Svar angives med 2 decimaler)`,
      answer: fmt(y),
      accept: [fmt(y), String(y)],
      accept_tolerance: 0.015,
      link: "https://laerebogimatematik1hhx.systime.dk/?id=284#c2868",
      explanation: `Svar: ${fmt(y)} kr.`
    };
  },

  // 3. Annuitetsopsparing — fremtidsværdi
  () => {
    const yv = rnd(1, 10) * 100, rm = rndF(0.5, 2.0, 1), n = rnd(6, 24);
    const r = Math.round(rm * 10) / 1000, An = Math.round(yv * (Math.pow(1 + r, n) - 1) / r * 100) / 100;
    return {
      type: "input",
      text: `Der indsættes hver måned kr. ${yv} på en konto.\nBeløbet indsættes i alt ${n} gange og den månedlige rente er ${fmt(rm)}%.\nHvor meget står der på kontoen efter den sidste indbetaling?\n(Svar angives med 2 decimaler)`,
      answer: fmt(An),
      accept: [fmt(An), String(An)],
      accept_tolerance: 0.015,
      link: "https://laerebogimatematik1hhx.systime.dk/?id=283#c2835",
      explanation: `Svar: ${fmt(An)} kr.`
    };
  },

  // 4. Effektiv rente fra kvartalsrente
  () => {
    const rq = rndF(0.5, 4.0, 1), rqR = Math.round(rq * 10) / 1000, rEff = Math.round(((Math.pow(1 + rqR, 4) - 1) * 100) * 100) / 100;
    return {
      type: "input",
      text: `Bestem den årlige effektive rente, når kvartalsrenten (terminsrenten) er på ${fmt(rq)}%.\n(Svar angives med 2 decimaler)`,
      answer: fmt(rEff),
      accept: [fmt(rEff), String(rEff), fmt(rEff)+"%", String(rEff)+"%"],
      accept_tolerance: 0.015,
      link: "https://laerebogimatematik1hhx.systime.dk/?id=282#c2900",
      explanation: `Svar: ${fmt(rEff)}%`
    };
  },

];
