import { TAB, tilePath, type Edges } from "@/lib/tile";

/** Fondo SVG de una pieza HTML. Sobresale depthX% / depthY% por cada lado para dibujar las lengüetas. */
export function TileShape({
  edges,
  depthX = TAB,
  depthY = TAB,
  className,
  topSpan = 1,
}: {
  edges: Edges;
  depthX?: number;
  depthY?: number;
  className?: string;
  /** Columnas que ocupa la pieza (para poner un hueco arriba por cada vecina). */
  topSpan?: number;
}) {
  const px = depthX;
  const py = depthY;
  return (
    <svg
      aria-hidden="true"
      className={`tile-shape pointer-events-none absolute overflow-visible ${className ?? ""}`}
      style={{ left: `-${px}%`, top: `-${py}%`, width: `${100 + px * 2}%`, height: `${100 + py * 2}%` }}
      viewBox={`${-px} ${-py} ${100 + px * 2} ${100 + py * 2}`}
      preserveAspectRatio="none"
    >
      <path d={tilePath(edges, depthX, depthY, topSpan)} />
    </svg>
  );
}
