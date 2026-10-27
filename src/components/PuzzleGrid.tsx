"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { puzzleGrid } from "@/lib/tile";
import { TileShape } from "./TileShape";

/** Columnas máximas por tamaño de pantalla: celular, desde `sm` (640 px) y desde `lg` (1024 px). */
export type Cols = { base: number; sm: number; lg: number };

// Clases escritas completas para que Tailwind las encuentre.
const LEVELS = [
  { key: "base", shape: "sm:hidden" },
  { key: "sm", shape: "hidden sm:block lg:hidden" },
  { key: "lg", shape: "hidden lg:block" },
] as const;

const GRID =
  "grid auto-rows-fr grid-cols-[repeat(var(--c-base),minmax(0,1fr))] sm:grid-cols-[repeat(var(--c-sm),minmax(0,1fr))] lg:grid-cols-[repeat(var(--c-lg),minmax(0,1fr))]";
const SPAN =
  "[grid-column:span_var(--s-base)/span_var(--s-base)] sm:[grid-column:span_var(--s-sm)/span_var(--s-sm)] lg:[grid-column:span_var(--s-lg)/span_var(--s-lg)]";
// Columnas que ocupa la pieza en el tamaño actual (para que el margen no crezca en las piezas anchas).
const SPAN_NOW = "[--s:var(--s-base)] sm:[--s:var(--s-sm)] lg:[--s:var(--s-lg)]";

/** Profundidad de las lengüetas, en % del ancho / alto de una pieza. */
const DX = 6;
const DY = 6;

/**
 * Grilla de piezas que encastran entre sí, sin huecos, en cualquier tamaño de pantalla.
 * Todas las piezas miden lo mismo de alto (si no, las lengüetas no coinciden).
 * El contenido deja lugar para el hueco de la izquierda y el de arriba.
 */
export function PuzzleGrid<T>({
  items,
  cols,
  render,
  getKey,
  as = "ul",
  className,
  itemClassName,
  link,
}: {
  items: T[];
  cols: Cols;
  render: (item: T, i: number) => ReactNode;
  getKey: (item: T) => string;
  as?: "ul" | "ol";
  className?: string;
  itemClassName?: string;
  /** Si la pieza es un enlace, se ilumina al pasar el mouse. */
  link?: (item: T) => { href: string; label?: string } | undefined;
}) {
  const n = items.length;
  const layouts = {
    base: puzzleGrid(n, cols.base),
    sm: puzzleGrid(n, cols.sm),
    lg: puzzleGrid(n, cols.lg),
  };
  const gridVars = {
    "--c-base": Math.min(cols.base, n),
    "--c-sm": Math.min(cols.sm, n),
    "--c-lg": Math.min(cols.lg, n),
  } as CSSProperties;
  const List = as;

  return (
    <List className={cn(GRID, className)} style={gridVars}>
      {items.map((item, i) => {
        const vars = {
          "--s-base": layouts.base[i].span,
          "--s-sm": layouts.sm[i].span,
          "--s-lg": layouts.lg[i].span,
          zIndex: n - i,
        } as CSSProperties;
        const shapes = LEVELS.map(({ key, shape }) => {
          const cell = layouts[key][i];
          return (
            <TileShape
              key={key}
              className={shape}
              edges={cell.edges}
              depthX={DX / cell.span}
              depthY={DY}
              topSpan={cell.span}
            />
          );
        });
        const l = link?.(item);
        const body = (
          <>
            {shapes}
            {/* Margen: lugar para el hueco izquierdo (DX %) + aire; arriba, para el hueco superior. */}
            <div className="relative flex h-full flex-col pt-8 pr-6 pb-7" style={{ paddingLeft: `calc(${DX}% / var(--s, 1) + 1.5rem)` }}>
              {render(item, i)}
            </div>
          </>
        );
        return (
          <motion.li
            key={getKey(item)}
            className={cn("relative", SPAN, SPAN_NOW)}
            style={vars}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 140, damping: 20, delay: (i % 5) * 0.08 }}
          >
            {l ? (
              <a href={l.href} aria-label={l.label} className={cn("tile block h-full", itemClassName)}>
                {body}
              </a>
            ) : (
              <div className={cn("tile h-full", itemClassName)}>{body}</div>
            )}
          </motion.li>
        );
      })}
    </List>
  );
}
