"use client";

import type { ServiceIcon as Icon } from "@data/services";
import { PuzzleGrid, type Cols } from "./PuzzleGrid";
import { ServiceIcon } from "./ServiceIcon";

export type ChainItem = {
  key: string;
  title: string;
  text?: string;
  icon?: Icon;
};

/** Piezas que encastran: pasos del proceso, servicios de un proyecto, etc. */
export function PieceChain({
  items,
  numbered = false,
  className,
  cols = { base: 1, sm: 2, lg: 3 },
}: {
  items: ChainItem[];
  numbered?: boolean;
  className?: string;
  cols?: Cols;
}) {
  return (
    <PuzzleGrid
      as="ol"
      items={items}
      cols={cols}
      className={className}
      getKey={(it) => it.key}
      render={(item, i) => (
        <>
          <span className="flex items-center gap-2.5 font-display text-xs uppercase tracking-[0.18em] text-mint">
            {numbered && <span>{String(i + 1).padStart(2, "0")}</span>}
            {item.icon && <ServiceIcon icon={item.icon} className="h-5 w-5" />}
          </span>
          <span className="mt-3 block font-display text-lg leading-tight font-semibold text-balance">{item.title}</span>
          {item.text && <span className="mt-2 block text-sm leading-relaxed text-white/70">{item.text}</span>}
        </>
      )}
    />
  );
}
