import { FACETS, VIEW, type FacetId, type Pt } from "./logo";

/**
 * Arma las piezas de la "A" para N proyectos.
 *
 * Las 5 facetas del logo alcanzan para 4 proyectos + la pieza "Tu proyecto".
 * Si hay más proyectos, se van cortando facetas con cortes de encastre (cola de milano),
 * en el orden de CUTS. Así la A siempre se ve completa y cada proyecto tiene su pieza.
 */

export type Piece = {
  key: string;
  facet: FacetId;
  points: Pt[];
  openEdge?: number;
  /** Punto interior más alejado de los bordes: ahí va el número y la etiqueta. */
  anchor: Pt;
  /** Dirección (unitaria) hacia donde se separa la pieza al abrirla. */
  dir: Pt;
};

type Cut = { facet: FacetId; from: Pt; to: Pt; flip?: boolean };

/** Cortes extra, en orden de uso. Cada uno une dos lados de la faceta. */
const CUTS: Cut[] = [
  { facet: "outer", from: [58.3, 110], to: [79.93, 110] },
  { facet: "outer", from: [112, 123.4], to: [112, 142.56], flip: true },
  { facet: "middle", from: [70.85, 125], to: [92.4, 125] },
  { facet: "outer", from: [151.4, 60], to: [129.9, 60] },
  { facet: "leg", from: [159.27, 145], to: [181.36, 145], flip: true },
];

export const MAX_PIECES = FACETS.length + CUTS.length;

const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** Corte con una lengüeta trapezoidal en el medio, para que las piezas encastren. */
function tabbedCut(a: Pt, b: Pt, flip = false): Pt[] {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy);
  const s = flip ? -1 : 1;
  const n: Pt = [(-dy / len) * s, (dx / len) * s];
  const d = len * 0.3;
  const off = (p: Pt): Pt => [p[0] + n[0] * d, p[1] + n[1] * d];
  return [a, lerp(a, b, 0.4), off(lerp(a, b, 0.32)), off(lerp(a, b, 0.68)), lerp(a, b, 0.6), b];
}

function distToSegment(p: Pt, a: Pt, b: Pt) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l2 = dx * dx + dy * dy;
  const t = l2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2)) : 0;
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

function edgeIndex(poly: Pt[], p: Pt) {
  let best = -1;
  let bestD = Infinity;
  for (let i = 0; i < poly.length; i++) {
    const d = distToSegment(p, poly[i], poly[(i + 1) % poly.length]);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  return bestD < 0.6 ? best : -1;
}

/** Parte un polígono con una línea (poligonal) que va de un lado a otro. */
function split(poly: Pt[], cut: Pt[]): [Pt[], Pt[]] | null {
  const a = cut[0];
  const b = cut[cut.length - 1];
  const i = edgeIndex(poly, a);
  const j = edgeIndex(poly, b);
  if (i < 0 || j < 0 || i === j) return null;
  const n = poly.length;
  const walk = (from: number, to: number) => {
    const out: Pt[] = [];
    for (let k = (from + 1) % n; ; k = (k + 1) % n) {
      out.push(poly[k]);
      if (k === to) break;
    }
    return out;
  };
  const inner = cut.slice(1, -1);
  const first = [a, ...walk(i, j), b, ...[...inner].reverse()];
  const second = [b, ...walk(j, i), a, ...inner];
  return [first, second];
}

function inside(p: Pt, poly: Pt[]) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

/** Aproximación del "polo de inaccesibilidad": el punto interior más lejano a los bordes. */
function anchorOf(poly: Pt[]): Pt {
  const xs = poly.map((p) => p[0]);
  const ys = poly.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  let best: Pt = [(x0 + x1) / 2, (y0 + y1) / 2];
  let bestD = -1;
  const step = 1.5;
  for (let x = x0; x <= x1; x += step) {
    for (let y = y0; y <= y1; y += step) {
      const p: Pt = [x, y];
      if (!inside(p, poly)) continue;
      let d = Infinity;
      for (let i = 0; i < poly.length; i++) d = Math.min(d, distToSegment(p, poly[i], poly[(i + 1) % poly.length]));
      if (d > bestD) {
        bestD = d;
        best = p;
      }
    }
  }
  return [Math.round(best[0] * 10) / 10, Math.round(best[1] * 10) / 10];
}

const CENTER: Pt = [VIEW.w / 2, 118];

function finish(key: string, facet: FacetId, points: Pt[], openEdge?: number): Piece {
  const anchor = anchorOf(points);
  const dx = anchor[0] - CENTER[0];
  const dy = anchor[1] - CENTER[1];
  const l = Math.hypot(dx, dy) || 1;
  return { key, facet, points, openEdge, anchor, dir: [dx / l, dy / l] };
}

/** Devuelve `count` piezas (como mucho MAX_PIECES), en orden. */
export function buildPieces(count: number): Piece[] {
  type Raw = { key: string; facet: FacetId; points: Pt[]; openEdge?: number };
  let list: Raw[] = FACETS.map((f) => ({ key: f.id, facet: f.id, points: [...f.points], openEdge: f.openEdge }));
  const extra = Math.max(0, Math.min(count, MAX_PIECES) - list.length);
  for (const cut of CUTS.slice(0, extra)) {
    const line = tabbedCut(cut.from, cut.to, cut.flip);
    const idx = list.findIndex((r) => r.facet === cut.facet && edgeIndex(r.points, cut.from) >= 0 && edgeIndex(r.points, cut.to) >= 0);
    if (idx < 0) continue;
    const target = list[idx];
    const parts = split(target.points, line);
    if (!parts) continue;
    // El lado abierto (si lo había) queda en la mitad que lo contiene.
    const open = target.openEdge !== undefined ? [target.points[target.openEdge], target.points[(target.openEdge + 1) % target.points.length]] : null;
    const openIn = (pts: Pt[]) => {
      if (!open) return undefined;
      const k = pts.findIndex((p, i) => p === open[0] && pts[(i + 1) % pts.length] === open[1]);
      return k >= 0 ? k : undefined;
    };
    list = [
      ...list.slice(0, idx),
      { key: `${target.key}-a`, facet: target.facet, points: parts[0], openEdge: openIn(parts[0]) },
      { key: `${target.key}-b`, facet: target.facet, points: parts[1], openEdge: openIn(parts[1]) },
      ...list.slice(idx + 1),
    ];
  }
  return list.map((r) => finish(r.key, r.facet, r.points, r.openEdge));
}
