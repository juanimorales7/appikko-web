/**
 * Geometría de la "A" de Appiko, reconstruida del logo original (240 × 200).
 * Las coordenadas son el centro de cada línea; el trazo mide STROKE.
 *
 * La A se forma con 5 facetas cerradas, que son las piezas del rompecabezas:
 *  outer  → la cinta grande de afuera (pata izquierda + travesaño)
 *  middle → la "Λ" del medio, con el borde verde
 *  core   → el triángulo interior
 *  tip    → la punta de la pata derecha
 *  leg    → la franja de la pata derecha (abierta arriba, junto al corte del logo)
 */

export type Pt = readonly [number, number];

export const VIEW = { w: 240, h: 200 } as const;
export const STROKE = 5.2;

export const GREEN = "#3AFF9D";

const T: Pt = [120, 8]; // punta
const BL: Pt = [9, 191.5]; // esquina inferior izquierda
const P: Pt = [39.2, 177.3];
const G: Pt = [120, 43.8]; // vértice de la línea verde
const G2: Pt = [149.6, 92.2];
const J1: Pt = [138.2, 110.3];
const K: Pt = [85.3, 136.75];
const M: Pt = [69.5, 162.85];
const N: Pt = [147.1, 125.8];
const R: Pt = [170, 90.7]; // hombro derecho
const I3: Pt = [120.1, 79.2]; // vértice interior
const U: Pt = [179.7, 107];
const V: Pt = [168.6, 123.8];
const W: Pt = [199.9, 175.8];
const X: Pt = [231.4, 192];
const Y: Pt = [171, 163.5];

export type FacetId = "outer" | "middle" | "core" | "tip" | "leg";

export type Facet = {
  id: FacetId;
  points: Pt[];
  /** Lado que no se dibuja (el corte abierto del logo). Índice del vértice inicial del lado. */
  openEdge?: number;
};

export const FACETS: Facet[] = [
  { id: "outer", points: [T, BL, P, G, G2, J1, K, M, N, R] },
  { id: "middle", points: [G, P, M, I3, J1, G2] },
  { id: "core", points: [I3, K, J1] },
  { id: "tip", points: [U, V, W, X] },
  { id: "leg", points: [N, Y, W, V], openEdge: 3 },
];

/** Líneas verdes del logo (van por encima del trazo blanco). */
export const GREEN_LINES: Pt[][] = [
  [
    [41.6, 173.3],
    G,
    [148, 89.6],
  ],
  [
    [170.1, 126.3],
    [198.4, 173.3],
  ],
];

export const toPath = (pts: readonly Pt[], close = true) =>
  pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ") + (close ? " Z" : "");

/** Contorno de una faceta: cerrado, o abierto si tiene un lado sin línea. */
export const outlinePath = (pts: readonly Pt[], openEdge?: number) => {
  if (openEdge === undefined) return toPath(pts);
  const n = pts.length;
  const ordered = Array.from({ length: n }, (_, i) => pts[(openEdge + 1 + i) % n]);
  return toPath(ordered, false);
};
