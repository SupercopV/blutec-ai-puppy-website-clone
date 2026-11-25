// Test mock stops and engine
const d = { x: 150, y: 228 };
const c = [48, 30, 288, 236];
const h = e => Math.min(1, Math.max(0, e));
const p = e => e * e * (3 - 2 * e);
const u = (e, t, a) => t === e ? +(a >= t) : p(h((a - e) / (t - e)));
const m = (e, t, a) => e + (t - e) * a;

function f(e, t) {
  var a;
  return {
    x: e.x + d.x * e.s,
    y: (a = e.track,
       ("page" === a.kind
         ? a.top - t
         : "screen" === a.kind
           ? a.top
           : t < a.from
             ? a.top - (t - a.from)
             : t > a.to
               ? a.top - (t - a.to)
               : a.top) + d.y * e.s)
  };
}

function x(e, t) {
  if (!e.length || t <= e[0][1]) return { k: 0, t: 0 };
  for (let a = 0; a < e.length - 1; a++) {
    let s = e[a][1], n = e[a + 1][0];
    if (t < n) return { k: a, t: h((t - s) / Math.max(1, n - s)) };
    if (t <= e[a + 1][1]) return { k: a + 1, t: 0 };
  }
  return { k: e.length - 1, t: 0 };
}

let g = (e, t, a) => {
  let s = (e - t) / a;
  return s > 20 ? e : t + a * Math.log1p(Math.exp(s));
};
let v = (e, t, a) => -g(-e, -t, a);

function y(e, t, a, s, n, l = 8) {
  let r = (d.x - s[0]) * a,
      i = (s[2] - d.x) * a,
      o = (d.y - s[1]) * a,
      c = (s[3] - d.y) * a,
      h = e;
  return {
    x: (h = n.right - n.left > r + i ? v(g(e, n.left + r, l), n.right - i, l) : (n.left + n.right) / 2 - (i - r) / 2),
    y: n.bottom - n.top > o + c ? v(g(t, n.top + o, l), n.bottom - c, l) : n.bottom - c
  };
}

let j = (e, t, a) => [m(e[0], t[0], a), m(e[1], t[1], a), m(e[2], t[2], a), m(e[3], t[3], a)];
let b = (e, t, a, s, n) => {
  let l = 1 - n,
      r = l * l * l,
      i = 3 * l * l * n,
      o = 3 * l * n * n,
      d = n * n * n;
  return {
    x: r * e.x + i * t.x + o * a.x + d * s.x,
    y: r * e.y + i * t.y + o * a.y + d * s.y
  };
};

const _ = {
  sit: [50, 26, 284, 234],
  peek: [148, 34, 280, 163],
  snug: [148, 40, 280, 163],
  bow: [58, 56, 292, 236]
};
const N = e => _[e] ?? c;
const w = d.y - 159;
const M = [0.6, 0.86];
const E = [0.42, 0.78];

console.log('Engine math functions loaded successfully!');
