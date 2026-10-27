"use client";

import { PuzzleGrid } from "../PuzzleGrid";

type Piece = { title: string; subtitle: string; items: string[] };

/** "La solución": piezas grandes que encastran. */
export function SolutionGrid({ pieces }: { pieces: Piece[] }) {
  return (
    <PuzzleGrid
      as="ol"
      items={pieces}
      cols={{ base: 1, sm: 1, lg: Math.min(3, pieces.length) }}
      getKey={(p) => p.title}
      render={(p, i) => (
        <>
          <p className="font-display text-xs tracking-[0.2em] text-mint">{String(i + 1).padStart(2, "0")}</p>
          <p className="mt-2 font-display text-3xl font-semibold uppercase tracking-tight">{p.title}</p>
          <p className="mt-1 font-display text-mint">{p.subtitle}</p>
          <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-white/80">
            {p.items.map((it) => (
              <li key={it} className="flex gap-2.5">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-mint" aria-hidden="true" />
                {it}
              </li>
            ))}
          </ul>
        </>
      )}
    />
  );
}
