// F0 — Grundlæggende færdigheder
GENERATORS.F0 = [

  // 1. Løs ligningen x² + k = c
  () => {
    const k = rnd(1, 10), c = rnd(k + 1, k + 20), x = Math.round(Math.sqrt(c - k));
    if (x * x !== c - k) return GENERATORS.F0[0]();
    return {
      type: "input",
      text: `Løs ligningen x² + ${k} = ${c}.`,
      answer: String(x),
      accept: [String(x), String(-x), "x=" + x, "±" + x],
      explanation: `x² = ${c - k} → x = ±√${c - k} = ±${x}`
    };
  },

  // 2. Reducér udtryk a(bx − cy) − (dx − ey)
  () => {
    const a = rnd(2, 5), bx = rnd(1, 6), by = rnd(1, 6), cx = rnd(1, 5), cy = rnd(1, 6);
    const rx = a * bx - cx, ry = a * (-by) + cy;
    let ans = '';
    if (rx !== 0) ans += rx + 'x';
    if (ry > 0) ans += (ans ? ' + ' : '') + ry + 'y';
    else if (ry < 0) ans += (ans ? ' − ' : '-') + Math.abs(ry) + 'y';
    if (!ans) ans = '0';
    return {
      type: "input",
      text: `Reducér følgende udtryk mest muligt: ${a}(${bx}x − ${by}y) − (${cx}x − ${cy}y)`,
      answer: ans,
      accept: [ans, ans.replace(/ /g, '')],
      explanation: `= ${a * bx}x − ${a * by}y − ${cx}x + ${cy}y = ${ans}`
    };
  },

  // 3. Løs eksponentiel ligning a·bˣ = c
  () => {
    const base = rnd(2, 5), exp = rnd(2, 4), bv = rnd(1, 4), rhs = bv * Math.pow(base, exp);
    return {
      type: "input",
      text: `Løs ligningen ${bv} · ${base}ˣ = ${rhs}.`,
      answer: String(exp),
      accept: [String(exp), "x=" + exp, "x = " + exp],
      explanation: `${bv} · ${base}ˣ = ${rhs} → ${base}ˣ = ${rhs / bv} = ${base}^${exp} → x = ${exp}`
    };
  },

];
