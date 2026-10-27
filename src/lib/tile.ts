/**
 * Contorno de una pieza rectangular con lengüetas (tablero y cadenas).
 * Coordenadas en una caja de 100 × 100 (se estira con preserveAspectRatio="none").
 * Cada lado puede ser: liso, con lengüeta hacia afuera ("tab") o con hueco ("notch").
 * La lengüeta de una pieza y el hueco de la vecina tienen exactamente la misma forma.
 */
export type Edge = "flat" | "tab" | "notch";
export type Edges = { top: Edge; right: Edge; bottom: Edge; left: Edge };

export const TAB = 7; // profundidad, en unidades de la caja

// Cola de milano: angosta junto al borde, ancha en la punta.
const near = [40, 60] as const;
const far = [34, 66] as const;

export function tilePath({ top, right, bottom, left }: Edges, depthX = TAB, depthY = TAB) {
  const d: string[] = ["M0 0"];
  // arriba (izq → der): un hueco entra hacia abajo (+y), una lengüeta sale hacia arriba (−y)
  if (top !== "flat") {
    const s = top === "tab" ? -depthY : depthY;
    d.push(`L${near[0]} 0 L${far[0]} ${s} L${far[1]} ${s} L${near[1]} 0`);
  }
  d.push("L100 0");
  if (right !== "flat") {
    const s = right === "tab" ? 100 + depthX : 100 - depthX;
    d.push(`L100 ${near[0]} L${s} ${far[0]} L${s} ${far[1]} L100 ${near[1]}`);
  }
  d.push("L100 100");
  if (bottom !== "flat") {
    const s = bottom === "tab" ? 100 + depthY : 100 - depthY;
    d.push(`L${near[1]} 100 L${far[1]} ${s} L${far[0]} ${s} L${near[0]} 100`);
  }
  d.push("L0 100");
  if (left !== "flat") {
    const s = left === "tab" ? -depthX : depthX;
    d.push(`L0 ${near[1]} L${s} ${far[1]} L${s} ${far[0]} L0 ${near[0]}`);
  }
  d.push("Z");
  return d.join(" ");
}

/** Lados de la pieza i en una grilla de `cols` columnas con `n` piezas: lengüeta a la derecha y abajo, hueco a la izquierda y arriba. */
export function gridEdges(i: number, n: number, cols: number): Edges {
  const col = i % cols;
  const row = Math.floor(i / cols);
  return {
    top: row > 0 ? "notch" : "flat",
    right: col < cols - 1 && i + 1 < n ? "tab" : "flat",
    bottom: i + cols < n ? "tab" : "flat",
    left: col > 0 ? "notch" : "flat",
  };
}
