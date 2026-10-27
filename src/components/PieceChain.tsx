"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ServiceIcon as Icon } from "@data/services";
import { cn } from "@/lib/cn";
import { ServiceIcon } from "./ServiceIcon";
import { TileShape } from "./TileShape";

export type ChainItem = {
  key: string;
  title: string;
  text?: string;
  icon?: Icon;
  href?: string;
};

/**
 * Piezas que encastran una con otra: en fila desde tablet (lengüeta a la derecha),
 * en columna en mobile (lengüeta abajo). Se van sumando al entrar en pantalla.
 */
export function PieceChain({
  items,
  numbered = false,
  className,
  itemClassName,
}: {
  items: ChainItem[];
  numbered?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <ol className={cn("flex flex-col md:flex-row md:flex-wrap", className)}>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        const inner = (
          <>
            <TileShape
              className="md:hidden"
              depthX={0}
              depthY={9}
              edges={{ top: i ? "notch" : "flat", right: "flat", bottom: last ? "flat" : "tab", left: "flat" }}
            />
            <TileShape
              className="hidden md:block"
              depthX={9}
              depthY={0}
              edges={{ top: "flat", right: last ? "flat" : "tab", bottom: "flat", left: i ? "notch" : "flat" }}
            />
            <span className="tile-ink relative flex items-center gap-2 font-display text-xs uppercase tracking-[0.18em] text-mint">
              {numbered && <span>{String(i + 1).padStart(2, "0")}</span>}
              {item.icon && <ServiceIcon icon={item.icon} className="h-5 w-5" />}
            </span>
            <span className="tile-ink relative mt-2 block font-display text-lg leading-tight font-semibold">{item.title}</span>
            {item.text && (
              <span className="tile-ink relative mt-1.5 line-clamp-3 block text-sm leading-snug text-white/70">{item.text}</span>
            )}
          </>
        );
        const box = cn(
          "tile relative block h-36 px-[9%] pt-[7%] pb-[9%] md:h-48 md:w-56 md:px-[11%] md:py-6",
          itemClassName,
        );
        return (
          <motion.li
            key={item.key}
            className="relative"
            style={{ zIndex: items.length - i }}
            initial={reduce ? false : { opacity: 0, x: -28, y: 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 140, damping: 18, delay: reduce ? 0 : i * 0.12 }}
          >
            {item.href ? (
              <Link href={item.href} className={box}>
                {inner}
              </Link>
            ) : (
              <div className={box}>{inner}</div>
            )}
          </motion.li>
        );
      })}
    </ol>
  );
}
