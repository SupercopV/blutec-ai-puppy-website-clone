/**
 * pupMotionEngine.js
 * The exact authentic physics and motion engine from TeddyPups UAE.
 * Handles articulated skeletal animation, cubic bezier pathing,
 * scroll-driven stop holding, parabolic jumps, and limb gait.
 */

export const ANCHOR = { x: 150, y: 228 };
export const DEFAULT_BOX = [48, 30, 288, 236];

export const BOXES = {
  sit: [50, 26, 284, 234],
  peek: [148, 34, 280, 163],
  snug: [148, 40, 280, 163],
  bow: [58, 56, 292, 236]
};

export const getBox = (pose) => BOXES[pose] ?? DEFAULT_BOX;

export const clamp = (e) => Math.min(1, Math.max(0, e));
export const smoothstep = (e) => e * e * (3 - 2 * e);
export const smoothProgress = (start, end, val) => {
  if (end === start) return +(val >= end);
  return smoothstep(clamp((val - start) / (end - start)));
};
export const lerp = (a, b, t) => a + (b - a) * t;

// Transform stop coordinates to screen space at current scrollY
export function stopToScreen(stop, scrollY) {
  const tr = stop.track;
  let top = 0;
  if (tr.kind === 'page') {
    top = tr.top - scrollY;
  } else if (tr.kind === 'screen') {
    top = tr.top;
  } else if (scrollY < tr.from) {
    top = tr.top - (scrollY - tr.from);
  } else if (scrollY > tr.to) {
    top = tr.top - (scrollY - tr.to);
  } else {
    top = tr.top;
  }
  return {
    x: stop.x + ANCHOR.x * stop.s,
    y: top + ANCHOR.y * stop.s
  };
}

// Find current hold index and progress from scrollY
export function findHoldIndex(holds, scrollY) {
  if (!holds.length || scrollY <= holds[0][1]) return { k: 0, t: 0 };
  for (let a = 0; a < holds.length - 1; a++) {
    const s = holds[a][1];
    const n = holds[a + 1][0];
    if (scrollY < n) {
      return { k: a, t: clamp((scrollY - s) / Math.max(1, n - s)) };
    }
    if (scrollY <= holds[a + 1][1]) {
      return { k: a + 1, t: 0 };
    }
  }
  return { k: holds.length - 1, t: 0 };
}

// Cubic bezier curve evaluation
export function cubicBezier(p0, c1, c2, p1, t) {
  const l = 1 - t;
  const r = l * l * l;
  const i = 3 * l * l * t;
  const o = 3 * l * t * t;
  const d = t * t * t;
  return {
    x: r * p0.x + i * c1.x + o * c2.x + d * p1.x,
    y: r * p0.y + i * c1.y + o * c2.y + d * p1.y
  };
}

// Soft clamping to screen safe area
const softMax = (e, t, a) => {
  const s = (e - t) / a;
  return s > 20 ? e : t + a * Math.log1p(Math.exp(s));
};
const softMin = (e, t, a) => -softMax(-e, -t, a);

export function clampToSafe(x, y, s, box, safe, l = 8) {
  const r = (ANCHOR.x - box[0]) * s;
  const i = (box[2] - ANCHOR.x) * s;
  const o = (ANCHOR.y - box[1]) * s;
  const c = (box[3] - ANCHOR.y) * s;
  let clampedX = x;
  if (safe.right - safe.left > r + i) {
    clampedX = softMin(softMax(x, safe.left + r, l), safe.right - i, l);
  } else {
    clampedX = (safe.left + safe.right) / 2 - (i - r) / 2;
  }
  const clampedY = safe.bottom - safe.top > o + c
    ? softMin(softMax(y, safe.top + o, l), safe.bottom - c, l)
    : safe.bottom - c;
  return { x: clampedX, y: clampedY };
}

export function lerpBox(b1, b2, t) {
  return [
    lerp(b1[0], b2[0], t),
    lerp(b1[1], b2[1], t),
    lerp(b1[2], b2[2], t),
    lerp(b1[3], b2[3], t)
  ];
}

// Core position evaluation function
export function evaluatePosition(stops, holds, scrollY, safe, blend) {
  const { k: P, t: progress } = findHoldIndex(holds, scrollY);

  if (progress <= 0 || P >= stops.length - 1) {
    const cur = stops[P];
    const scr = stopToScreen(cur, scrollY);
    const clamped = clampToSafe(scr.x, scr.y, cur.s, cur.box, safe);
    return {
      x: clamped.x,
      y: clamped.y,
      s: cur.s,
      front: !cur.behind,
      airborne: false,
      k: P,
      t: 0,
      walked: 0
    };
  }

  const sFrom = stops[P];
  const sTo = stops[P + 1];
  const o = holds[P][1];
  const d2 = holds[P + 1][0];
  const dist = Math.max(1, d2 - o);
  const v = clamp((scrollY - o) / dist);
  const k0 = stopToScreen(sFrom, o);
  const k1 = stopToScreen(sTo, d2);

  // Compute bezier control points with natural horizontal tangent lead
  const buildCurve = (p0, p1, safeRect) => {
    const dx = p1.x - p0.x;
    const wSpan = safeRect.right - safeRect.left;
    const handleLen = Math.max(0.45 * Math.abs(dx), 0);
    const sign = dx >= 0 ? 1 : -1;
    let c1 = { x: p0.x + sign * handleLen, y: p0.y };
    let c2 = { x: p1.x - sign * handleLen, y: p1.y };
    const minSpan = 0.14 * wSpan;
    if (Math.abs(dx) < minSpan) {
      const dir = (p0.x + p1.x) / 2 < (safeRect.left + safeRect.right) / 2 ? 1 : -1;
      const push = dir * (minSpan - Math.abs(dx)) * 0.9;
      c1 = { x: c1.x + push, y: lerp(p0.y, p1.y, 0.2) };
      c2 = { x: c2.x + push, y: lerp(p0.y, p1.y, 0.8) };
    }
    const clampPt = (pt) => ({
      x: Math.min(safeRect.right, Math.max(safeRect.left, pt.x)),
      y: Math.min(safeRect.bottom, Math.max(safeRect.top, pt.y))
    });
    return { p0, c1: clampPt(c1), c2: clampPt(c2), p1 };
  };

  const curve = buildCurve(
    { x: k0.x, y: k0.y - (sFrom.sink || 0) * sFrom.s },
    { x: k1.x, y: k1.y - (sTo.sink || 0) * sTo.s },
    safe
  );

  // Quintic smootherstep for C2 continuity
  const w = v * v * v * (v * (6 * v - 15) + 10);
  const M = cubicBezier(curve.p0, curve.c1, curve.c2, curve.p1, w);
  const E = lerp(sFrom.s, sTo.s, smoothstep(clamp(v / 0.65)));

  const blendRatio = Math.min(0.3, Math.max(0.06, blend / dist));
  const S = 1 - smoothProgress(0, blendRatio, v);
  const T = smoothProgress(1 - blendRatio, 1, v);

  let curY = M.y + S * (stopToScreen(sFrom, scrollY).y - k0.y) + T * (stopToScreen(sTo, scrollY).y - k1.y);
  const curX = M.x;

  let airborne = false;
  if (sFrom.behind && v < 0.36) {
    curY -= Math.sin(v / 0.36 * Math.PI) * Math.min(64 * sFrom.s, 72);
    airborne = v < 0.32;
  }
  if (sTo.behind && v > 0.68) {
    curY -= Math.sin((v - 0.68) / 0.32 * Math.PI) * Math.min(56 * sTo.s, 60);
    airborne = true;
  }

  const isFront = !(sFrom.behind && v < 0.12 || sTo.behind && v > 0.92);

  const targetBox = v < 0.5
    ? lerpBox(sFrom.box, DEFAULT_BOX, smoothProgress(0, sFrom.behind ? 0.36 : 0.06, v))
    : lerpBox(DEFAULT_BOX, sTo.box, smoothProgress(sTo.behind ? 0.68 : 0.94, 1, v));

  const clamped = clampToSafe(curX, curY, E, targetBox, safe);

  // Compute walked path length for stride and paw prints
  let walked = 0;
  let prevPt = curve.p0;
  const numSteps = Math.max(1, Math.ceil(32 * clamp(w)));
  for (let step = 1; step <= numSteps; step++) {
    const pt = cubicBezier(curve.p0, curve.c1, curve.c2, curve.p1, (step / numSteps) * clamp(w));
    walked += Math.hypot(pt.x - prevPt.x, pt.y - prevPt.y);
    prevPt = pt;
  }

  return {
    x: clamped.x,
    y: clamped.y,
    s: E,
    front: isFront,
    airborne,
    k: P,
    t: v,
    walked
  };
}

// Compute refined hold intervals for all stops
export function computeHolds(rawHoldRanges, travelDistances, maxScroll) {
  const n = rawHoldRanges.map(e => e[0] <= e[1] ? [e[0], e[1]] : [(e[0] + e[1]) / 2, (e[0] + e[1]) / 2]);
  if (!n.length) return n;

  n[0][0] = -Infinity;
  const last = n[n.length - 1];
  last[1] = Infinity;
  last[0] = Math.min(last[0], maxScroll - 1);

  for (let i = 0; i < n.length - 1; i++) {
    const cur = n[i];
    const nxt = n[i + 1];
    if (nxt[0] < cur[1]) {
      const mid = (cur[1] + nxt[0]) / 2;
      cur[1] = Math.max(cur[0], mid);
      nxt[0] = Math.min(nxt[1], mid);
      if (nxt[0] < cur[1]) nxt[0] = cur[1];
    }
    const needed = (travelDistances[i] ?? 0) - (nxt[0] - cur[1]);
    if (needed > 0) {
      const sub1 = Math.min(needed / 2, cur[1] - cur[0]);
      const add1 = Math.min(needed / 2, nxt[1] - nxt[0]);
      cur[1] -= sub1;
      nxt[0] += add1;
      let rem = needed - sub1 - add1;
      if (rem > 0) {
        const add2 = Math.min(rem, nxt[1] - nxt[0]);
        nxt[0] += add2;
        rem -= add2;
        if (rem > 0) cur[1] -= Math.min(rem, cur[1] - cur[0]);
      }
    }
  }

  for (const e of n) {
    if (e[1] < e[0]) e[1] = e[0];
  }
  return n;
}

// Scan DOM for all pup-stop elements and compute stops metadata
export function scanStops(isMobile) {
  const clientW = document.documentElement.clientWidth;
  const clientH = window.innerHeight;
  const headerH = document.getElementById('site-header')?.offsetHeight || 76;
  const whatsappBar = document.querySelector('[data-whatsapp-bar]');
  const whatsappH = whatsappBar && whatsappBar.getClientRects().length ? whatsappBar.getBoundingClientRect().height : 0;

  const safe = {
    left: 10,
    top: headerH + 10,
    right: clientW - 10,
    bottom: clientH - 10 - whatsappH
  };

  const stopEls = [...document.querySelectorAll('.pup-stop')].filter(el => el.getClientRects().length > 0);
  if (stopEls.length < 2) return null;

  const scrollY = window.scrollY;
  const stops = [];
  const meta = [];
  const rawHolds = [];

  const M = [0.6, 0.86];
  const E = [0.42, 0.78];
  const targetRatios = isMobile ? M : E;

  for (const el of stopEls) {
    const rect = el.getBoundingClientRect();
    const pose = el.dataset.pose || 'sit';
    const act = el.dataset.act || '';
    const behind = el.dataset.behind === 'true';
    const facing = el.dataset.facing === 'left' ? -1 : 1;

    // Detect sticky parent
    let stickyParent = null;
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      if (getComputedStyle(p).position === 'sticky') {
        stickyParent = p;
        break;
      }
    }

    let track;
    if (!stickyParent) {
      track = { kind: 'page', top: rect.top + scrollY };
    } else {
      const stickyTop = parseFloat(getComputedStyle(stickyParent).top) || 0;
      const relY = rect.top - stickyParent.getBoundingClientRect().top;
      const pinContainer = stickyParent.closest('[data-pin-range="true"]') || stickyParent.parentElement;
      const pinRect = pinContainer.getBoundingClientRect();
      const from = pinRect.top + scrollY - stickyTop;
      const to = pinRect.bottom + scrollY - stickyParent.offsetHeight - stickyTop;

      if (to <= from) {
        track = { kind: 'page', top: rect.top + scrollY };
      } else {
        track = { kind: 'pin', top: stickyTop + relY, from, to };
      }
    }

    const naturalScale = rect.width / 300;
    const scale = isMobile || act === 'basket' ? naturalScale : 1.12 * naturalScale;
    const pivot = pose === 'peek' ? { x: ANCHOR.x, y: 159 } : ANCHOR;

    const stopObj = {
      x: rect.left + pivot.x * (naturalScale - scale),
      track,
      s: scale,
      behind,
      sink: 0,
      box: getBox(pose)
    };

    const sceneEl = el.closest('[data-pup-scene]');
    stops.push(stopObj);
    meta.push({
      el,
      scene: sceneEl,
      pose,
      facing,
      act,
      trackEl: act === 'treadmill' ? sceneEl?.querySelector('[data-treadmill]') : null
    });

    // Compute raw hold range
    if (track.kind === 'pin') {
      rawHolds.push([track.from, track.to]);
    } else {
      const s = track.top;
      const n = s + stopObj.box[1] * stopObj.s;
      const l = s + stopObj.box[3] * stopObj.s;
      const r = (n + l) / 2;
      const viewH = safe.bottom - safe.top;
      let o = r - (safe.top + targetRatios[1] * viewH);
      let d = r - (safe.top + targetRatios[0] * viewH);
      o = Math.max(o, l - safe.bottom);
      d = Math.min(d, n - safe.top);
      if (o > d) o = d = r - (safe.top + viewH / 2);
      rawHolds.push([o, d]);
    }
  }

  const travelDistances = stops.slice(1).map((sNext, i) => {
    const sCur = stops[i];
    const verticalLead = (E[1] - E[0]) * clientH;
    const baseDist = (isMobile ? 0.32 : 0.5) * clientH;
    const dx = Math.abs(sNext.x + ANCHOR.x * sNext.s - (sCur.x + ANCHOR.x * sCur.s));
    return Math.min(1.4 * clientH, Math.max(baseDist, 1.15 * Math.hypot(dx, verticalLead)));
  });

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const holds = computeHolds(rawHolds, travelDistances, maxScroll);

  return { stops, meta, holds, safe, blend: 0.12 * clientH };
}

// Articulated Pup Controller Class
const BODY_CENTER = [196, 206];
const HEAD_CENTER = [212, 100];
const SHOULDER_N = [186, 194];
const SHOULDER_F = [168, 192];
const HIP_N = [110, 194];
const HIP_F = [94, 192];
const TAIL_BASE = [84, 150];
const EAR_L = [174, 82];
const EAR_R = [250, 82];

const round2 = (e) => Math.round(100 * e) / 100;
const rotStr = (deg, [cx, cy]) => `rotate(${round2(deg)} ${cx} ${cy})`;

export const BASE_POSES = {
  stand: { bodyRot: 0, bodyX: 0, bodyY: 0, stretch: 1, headX: 0, headY: 0, headRot: 0, earL: 0, earR: 0, tail: 0, fn: 0, ff: 0, bn: 0, bf: 0, sit: 0, eyes: 1, happy: 0, tongue: 0, mouth: 0, front: 0 },
  walk: { bodyRot: 0, bodyX: 0, bodyY: 0, stretch: 1, headX: 0, headY: 0, headRot: 0, earL: 0, earR: 0, tail: -6, fn: 0, ff: 0, bn: 0, bf: 0, sit: 0, eyes: 1, happy: 0, tongue: 1, mouth: 0, front: 0 },
  sit: { bodyRot: -24, bodyX: 0, bodyY: -2, stretch: 1, headX: -10, headY: -6, headRot: 0, earL: 0, earR: 0, tail: 34, fn: 0, ff: 0, bn: 0, bf: 0, sit: 1, eyes: 1, happy: 0, tongue: 1, mouth: 0, front: 0 },
  peek: { bodyRot: 0, bodyX: 0, bodyY: 0, stretch: 1, headX: 0, headY: 4, headRot: 0, earL: -6, earR: 6, tail: -20, fn: 0, ff: 0, bn: 0, bf: 0, sit: 0, eyes: 1, happy: 0, tongue: 1, mouth: 0, front: 1 },
  snug: { bodyRot: 0, bodyX: 0, bodyY: 0, stretch: 1, headX: 0, headY: 9, headRot: 4, earL: 3, earR: -3, tail: -20, fn: 0, ff: 0, bn: 0, bf: 0, sit: 0, eyes: 1, happy: 0, tongue: 0, mouth: 0, front: 1 },
  hop: { bodyRot: -9, bodyX: 0, bodyY: 0, stretch: 1.06, headX: 0, headY: -6, headRot: 0, earL: -26, earR: 26, tail: -24, fn: -42, ff: -32, bn: 40, bf: 30, sit: 0, eyes: 1, happy: 0, tongue: 1, mouth: 0, front: 0 },
  bow: { bodyRot: 15, bodyX: 0, bodyY: 2, stretch: 1, headX: 14, headY: 30, headRot: 0, earL: 0, earR: 0, tail: -32, fn: -58, ff: -52, bn: 0, bf: 0, sit: 0, eyes: 1, happy: 1, tongue: 1, mouth: 0, front: 0 },
  beg: { bodyRot: -36, bodyX: 0, bodyY: -6, stretch: 1, headX: -18, headY: -18, headRot: 0, earL: 0, earR: 0, tail: 30, fn: -70, ff: -64, bn: 0, bf: 0, sit: 1, eyes: 1, happy: 1, tongue: 1, mouth: 0, front: 0 }
};

export function computeTransforms(e, t) {
  const sinPhase = Math.sin(t.phase);
  const sinPhasePi = Math.sin(t.phase + Math.PI);
  const legAmp = 20 + 10 * t.stride;
  const bob = (1 - Math.cos(2 * t.phase)) / 2;
  const isWalking = +(t.stride > 0.01);
  const idleBreathe = Math.sin(2.4 * t.time) * (1 - isWalking);

  const bodyY = e.bodyY - bob * (2.5 + 4 * t.stride) * isWalking + 0.6 * idleBreathe;
  const bodyRot = e.bodyRot + 1.6 * Math.sin(t.phase) * isWalking;
  const invBodyRot = -e.bodyRot;

  const wagAmp = 5 + 17 * t.wag;
  const wagSpeed = 1.2 + 2.6 * t.wag;
  const tailRot = e.tail + Math.sin(t.time * wagSpeed * Math.PI * 2) * wagAmp;
  const headBob = -((1 - Math.cos(2 * t.phase - 0.7)) / 2) * (2 + 3 * t.stride) * isWalking + 0.9 * idleBreathe;

  return {
    body: `translate(${round2(e.bodyX)} ${round2(bodyY)}) ${rotStr(bodyRot, BODY_CENTER)} translate(${BODY_CENTER[0]} 0) scale(${round2(e.stretch)} 1) translate(${-BODY_CENTER[0]} 0)`,
    fn: `translate(${SHOULDER_N[0]} ${SHOULDER_N[1]}) rotate(${round2(e.fn + invBodyRot + sinPhase * legAmp * isWalking)})`,
    ff: `translate(${SHOULDER_F[0]} ${SHOULDER_F[1]}) rotate(${round2(e.ff + invBodyRot + sinPhasePi * legAmp * isWalking)})`,
    bn: `translate(${HIP_N[0]} ${HIP_N[1]}) rotate(${round2(e.bn + sinPhasePi * legAmp * isWalking)})`,
    bf: `translate(${HIP_F[0]} ${HIP_F[1]}) rotate(${round2(e.bf + sinPhase * legAmp * isWalking)})`,
    tail: rotStr(tailRot, TAIL_BASE),
    haunch: `translate(0 ${round2(-(0.06 * e.bodyRot))})`,
    head: `translate(${round2(e.headX)} ${round2(e.headY + headBob)}) ${rotStr(e.headRot + 1.4 * Math.sin(t.phase) * isWalking, HEAD_CENTER)}`,
    earL: rotStr(e.earL + t.ear + 4 * Math.sin(2 * t.phase) * isWalking, EAR_L),
    earR: rotStr(e.earR - t.ear - 4 * Math.sin(2 * t.phase) * isWalking, EAR_R),
    eyes: `translate(${round2(3.4 * t.gazeX)} ${round2(2.6 * t.gazeY)})`,
    blink: `translate(0 ${round2(98 * t.blink * 0.92)}) scale(1 ${round2(1 - 0.92 * t.blink)})`,
    openEyes: round2(Math.max(0, e.eyes - e.happy)),
    happyEyes: round2(Math.min(e.happy, e.eyes)),
    shutEyes: round2(1 - e.eyes),
    tongue: round2(e.tongue * (1 - e.mouth)),
    mouth: round2(e.mouth),
    backLegs: round2(1 - e.sit),
    haunchOpacity: round2(e.sit * (1 - e.front)),
    side: round2(1 - e.front),
    ledge: round2(e.front),
    shadow: `translate(${round2(0.6 * e.bodyX)} 0) scale(${round2(1 - 0.05 * bob * isWalking)} 1)`,
    shadowOpacity: round2(0.12 * (1 - e.front))
  };
}

const damp = (dt, tau) => 1 - Math.exp(-dt / tau);

export class PupController {
  constructor(svgEl, initialPose = 'sit', initialFacing = 1) {
    this.svg = svgEl;
    this.els = new Map();
    this.written = new Map();
    this.m = { phase: 0, stride: 0, time: 0, wag: 0.35, gazeX: 0, gazeY: 0, blink: 0, ear: 0 };
    this.strideTarget = 0;
    this.wagTarget = 0.35;
    this.gazeTarget = { x: 0, y: 0 };
    this.tilt = 0;
    this.tiltTarget = 0;
    this.earV = 0;
    this.nextBlink = 1.2;
    this.blinkAt = -1;
    this.woofUntil = 0;
    this.bounce = 0;
    this.bounceV = 0;
    this.offset = 0;
    this.offsetTarget = 0;
    this.pet = 0;
    this.petTarget = 0;
    this.turn = 0.07;
    this.lean = 0;

    svgEl.querySelectorAll('[data-p]').forEach((el) => {
      this.els.set(el.dataset.p, el);
    });

    this.pose = { ...(BASE_POSES[initialPose] || BASE_POSES.sit) };
    this.target = this.pose;
    this.facing = initialFacing;
    this.facingTarget = initialFacing;
  }

  setPose(poseName) {
    this.target = typeof poseName === 'string' ? (BASE_POSES[poseName] || BASE_POSES.sit) : poseName;
  }

  face(dir, speed = 0.07) {
    this.facingTarget = dir;
    this.turn = speed;
  }

  get facingDir() {
    return this.facingTarget;
  }

  stride(val) {
    this.strideTarget = Math.max(0, Math.min(1, val));
  }

  advance(dist) {
    this.m.phase += (dist / 46) * Math.PI;
  }

  walkedTo(dist) {
    this.m.phase = (dist / 46) * Math.PI;
  }

  wag(val) {
    this.wagTarget = Math.max(0, Math.min(1, val));
  }

  cock(angle) {
    this.tiltTarget = angle;
  }

  lookAt(e) {
    if (!e) {
      this.gazeTarget = { x: 0, y: 0 };
      return;
    }
    const t = this.svg?.getBoundingClientRect?.();
    if (!t) return;
    const muzzleX = this.facingTarget > 0 ? 212 : 300 - 212;
    const s = t.left + (muzzleX / 300) * t.width;
    const i = t.top + (100 / 240) * t.height;
    const dx = e.x - s;
    const dy = e.y - i;
    const l = Math.hypot(dx, dy) || 1;
    const d = Math.min(1, l / 160);
    this.gazeTarget = { x: (dx / l) * d * this.facingTarget, y: (dy / l) * d };
  }

  woof(time) {
    this.woofUntil = time + 0.34;
    this.bounceV = -150;
    this.earV += 260;
  }

  jolt(e = 1) {
    this.earV += 220 * e;
  }

  hop(mult = 1) {
    this.bounceV = -230 * mult;
    this.earV += 200 * mult;
  }

  yawn(e, t = 0.9) {
    this.woofUntil = e + t;
  }

  dash(e) {
    this.offsetTarget = e;
  }

  petting(e) {
    this.petTarget = +!!e;
  }

  reset() {
    this.offsetTarget = 0;
    this.tiltTarget = 0;
    this.petTarget = 0;
  }

  tick(dt, time) {
    const delta = Math.min(dt, 0.05);
    const m = this.m;
    m.time = time;

    // Pose lerp
    const poseLerpRate = damp(delta, 0.16);
    for (const key of Object.keys(this.pose)) {
      this.pose[key] += (this.target[key] - this.pose[key]) * poseLerpRate;
    }

    this.facing += (this.facingTarget - this.facing) * damp(delta, this.turn);
    this.pet += (this.petTarget - this.pet) * damp(delta, 0.12);
    m.stride += (this.strideTarget - m.stride) * damp(delta, 0.12);
    if (m.stride < 0.012 && this.strideTarget === 0) m.stride = 0;

    m.wag += (this.wagTarget - m.wag) * damp(delta, 0.4);
    m.gazeX += (this.gazeTarget.x - m.gazeX) * damp(delta, 0.07);
    m.gazeY += (this.gazeTarget.y - m.gazeY) * damp(delta, 0.07);

    this.tilt += (this.tiltTarget + 3 * m.gazeX - this.tilt) * damp(delta, 0.18);
    this.earV += (-150 * m.ear - 10 * this.earV) * delta;
    m.ear = Math.max(-28, Math.min(28, m.ear + this.earV * delta));

    this.bounceV += (-260 * this.bounce - 16 * this.bounceV) * delta;
    this.bounce += this.bounceV * delta;

    // Blinking logic
    if (time > this.nextBlink && this.pose.eyes > 0.6) {
      this.blinkAt = time;
      this.nextBlink = time + 2.2 + 3.8 * Math.random();
    }
    const blinkProgress = (time - this.blinkAt) / 0.15;
    m.blink = blinkProgress >= 0 && blinkProgress <= 1 ? Math.sin(blinkProgress * Math.PI) : 0;

    const currentPose = {
      ...this.pose,
      headRot: this.pose.headRot + this.tilt,
      bodyRot: this.pose.bodyRot + this.lean,
      bodyY: this.pose.bodyY + this.bounce,
      headY: this.pose.headY + 1.15 * this.bounce,
      mouth: time < this.woofUntil ? 1 : this.pose.mouth,
      happy: Math.max(this.pose.happy, this.pet)
    };

    const xforms = computeTransforms(currentPose, m);
    const facingScale = Math.abs(this.facing) < 0.02 ? 0.02 * Math.sign(this.facing || 1) : this.facing;
    const rootTransform = `translate(${150} 0) scale(${facingScale.toFixed(3)} 1) translate(${-150} 0)`;

    // Attribute binding map
    const bindings = [
      ['root', 'transform', rootTransform],
      ['shadow', 'transform', xforms.shadow],
      ['shadow', 'opacity', xforms.shadowOpacity],
      ['body', 'transform', xforms.body],
      ['body', 'opacity', xforms.side],
      ['bf', 'transform', xforms.bf],
      ['bf', 'opacity', xforms.backLegs],
      ['bn', 'transform', xforms.bn],
      ['bn', 'opacity', xforms.backLegs],
      ['ff', 'transform', xforms.ff],
      ['fn', 'transform', xforms.fn],
      ['tail', 'transform', xforms.tail],
      ['haunch', 'transform', xforms.haunch],
      ['haunch', 'opacity', xforms.haunchOpacity],
      ['head', 'transform', xforms.head],
      ['earL', 'transform', xforms.earL],
      ['earR', 'transform', xforms.earR],
      ['eyes', 'transform', xforms.eyes],
      ['open', 'opacity', xforms.openEyes],
      ['blink', 'transform', xforms.blink],
      ['happy', 'opacity', xforms.happyEyes],
      ['shut', 'opacity', xforms.shutEyes],
      ['tongue', 'opacity', xforms.tongue],
      ['mouth', 'opacity', xforms.mouth],
      ['ledge', 'opacity', xforms.ledge]
    ];

    for (const [part, attr, val] of bindings) {
      const el = this.els.get(part);
      if (!el) continue;
      const strVal = String(val);
      const cacheKey = `${part}:${attr}`;
      if (this.written.get(cacheKey) !== strVal) {
        el.setAttribute(attr, strVal);
        this.written.set(cacheKey, strVal);
      }
    }
  }
}

// Snap scroll to stable docked position when scrolling pauses near behind/sink boundaries
export function snapScroll(stops, holds, scrollY) {
  const { k: s, t: n } = findHoldIndex(holds, scrollY);
  if (n <= 0 || s >= stops.length - 1) return scrollY;
  const l = stops[s];
  const r = stops[s + 1];
  const i = l.sink ? 0.22 : 0.36 * (l.behind ? 1 : 0);
  const o = r.sink ? 0.78 : (r.behind ? 0.68 : 1);
  let d = n;
  if (n < i) {
    d = n < i / 2 ? 0 : i;
  } else if (n > o) {
    d = n > (1 + o) / 2 ? 1 : o;
  }
  return d === n ? scrollY : holds[s][1] + d * (holds[s + 1][0] - holds[s][1]);
}
