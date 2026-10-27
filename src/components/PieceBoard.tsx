"use client";

import { motion } from "framer-motion";
import { projects } from "@data/projects";
import { serviceById } from "@data/services";
import { t } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { gridEdges } from "@/lib/tile";
import { useSeparate } from "@/lib/useSeparate";
import { usePuzzle } from "./PuzzleContext";
import { TileShape } from "./TileShape";

const COLS = 2;

/**
 * Tablero de piezas que encastran (2 columnas). En mobile reemplaza a la A:
 * se toca la pieza y se abre el proyecto.
 */
export function PieceBoard({ className }: { className?: string }) {
  const { service, active, setActive } = usePuzzle();
  const { leaving, onOpen } = useSeparate(260);
  const n = projects.length + 1;

  return (
    <ul className={cn("grid grid-cols-2", className)} aria-label={t.projects.kicker}>
      {projects.map((p, i) => {
        const match = !!service && p.services.includes(service);
        const dimmed = !!service && !match;
        const col = i % COLS;
        const isLeaving = leaving === p.slug;
        return (
          <motion.li
            key={p.slug}
            className="relative"
            style={{ zIndex: active === p.slug || isLeaving ? 2 : 1 }}
            initial={{ opacity: 0, x: col ? 24 : -24, y: 12 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 160, damping: 20, delay: (i % 4) * 0.08 }}
          >
            <motion.a
              href={`/proyectos/${p.slug}`}
              className="tile relative flex aspect-[4/5] flex-col p-[11%] sm:aspect-[5/4]"
              data-active={active === p.slug || isLeaving}
              data-match={match}
              aria-label={`${p.name}: ${p.type}, ${t.status[p.status]}. ${t.puzzle.open}`}
              onMouseEnter={() => setActive(p.slug)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(p.slug)}
              onBlur={() => setActive(null)}
              onClick={(e) => onOpen(e, `/proyectos/${p.slug}`, p.slug)}
              initial={false}
              animate={{
                opacity: dimmed ? 0.32 : 1,
                x: isLeaving ? (col ? 10 : -10) : 0,
                y: isLeaving ? -10 : 0,
                rotate: isLeaving ? (col ? 2 : -2) : 0,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <TileShape edges={gridEdges(i, n, COLS)} />
              <span className="tile-ink relative flex items-center justify-between font-display text-[11px] uppercase tracking-[0.18em] text-mint">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className="tile-ink text-white/60">{t.status[p.status]}</span>
              </span>
              <span className="tile-ink relative mt-auto font-display text-lg leading-tight font-semibold sm:text-2xl">
                {p.name}
              </span>
              <span className="tile-ink relative mt-1 text-xs text-white/65 sm:text-sm">{p.type}</span>
              <span className="tile-ink relative mt-3 hidden text-sm leading-snug text-white/75 sm:line-clamp-2">
                {p.short}
              </span>
              <span className="relative mt-3 flex flex-wrap gap-1">
                {p.services.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className={cn(
                      "tile-ink border px-1.5 py-0.5 text-[10px] leading-none sm:text-[11px]",
                      service === s ? "border-mint text-mint" : "border-white/25 text-white/70",
                    )}
                  >
                    {serviceById[s].name}
                  </span>
                ))}
                {p.services.length > 3 && (
                  <span className="tile-ink px-1 py-0.5 text-[10px] text-white/50 sm:text-[11px]">+{p.services.length - 3}</span>
                )}
              </span>
            </motion.a>
          </motion.li>
        );
      })}
      <li className="relative">
        <a
          href="#contacto"
          className="tile relative flex aspect-[4/5] flex-col p-[11%] sm:aspect-[5/4]"
          data-cta="true"
          data-active={active === "__cta"}
          onMouseEnter={() => setActive("__cta")}
          onMouseLeave={() => setActive(null)}
        >
          <TileShape edges={gridEdges(projects.length, n, COLS)} />
          <span className="tile-ink relative font-display text-2xl text-mint">+</span>
          <span className="tile-ink relative mt-auto font-display text-lg leading-tight font-semibold sm:text-2xl">
            {t.puzzle.cta}
          </span>
          <span className="tile-ink relative mt-1 text-xs text-white/65 sm:text-sm">{t.puzzle.ctaText}</span>
        </a>
      </li>
    </ul>
  );
}
