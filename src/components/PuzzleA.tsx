"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { projects, type Project } from "@data/projects";
import { serviceById } from "@data/services";
import { t } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { GREEN_LINES, VIEW, outlinePath, toPath, type Pt } from "@/lib/logo";
import { MAX_PIECES, buildPieces, type Piece } from "@/lib/puzzle";
import { useSeparate } from "@/lib/useSeparate";
import { usePuzzle } from "./PuzzleContext";

const LINE = 3.4;
const SEPARATE = 14;

type Slot =
  | { kind: "project"; piece: Piece; project: Project; index: number }
  | { kind: "cta"; piece: Piece }
  | { kind: "empty"; piece: Piece };

/** Tramos de cada lado de la pieza que caen sobre una línea verde del logo. */
function greenEdges(points: Pt[], openEdge?: number) {
  const out: [Pt, Pt][] = [];
  const segs: [Pt, Pt][] = GREEN_LINES.flatMap((l) => l.slice(1).map((p, i) => [l[i], p] as [Pt, Pt]));
  for (let i = 0; i < points.length; i++) {
    if (i === openEdge) continue;
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const l2 = dx * dx + dy * dy;
    const len = Math.sqrt(l2);
    for (const [c, d] of segs) {
      // ¿c y d están sobre la recta a–b?
      const off = (p: Pt) => Math.abs((p[0] - a[0]) * dy - (p[1] - a[1]) * dx) / len;
      if (off(c) > 0.8 || off(d) > 0.8) continue;
      const tc = ((c[0] - a[0]) * dx + (c[1] - a[1]) * dy) / l2;
      const td = ((d[0] - a[0]) * dx + (d[1] - a[1]) * dy) / l2;
      const t0 = Math.max(0, Math.min(tc, td));
      const t1 = Math.min(1, Math.max(tc, td));
      if ((t1 - t0) * len < 1) continue;
      out.push([
        [a[0] + dx * t0, a[1] + dy * t0],
        [a[0] + dx * t1, a[1] + dy * t1],
      ]);
    }
  }
  return out;
}

type Props = {
  className?: string;
  /** Anima el armado de la A (al montar o al entrar en pantalla). */
  assemble?: "mount" | "view" | false;
  /** Muestra el texto con el proyecto activo debajo de la A. */
  caption?: boolean;
  /** Usa el filtro por servicio del contexto. */
  filterable?: boolean;
};

export function PuzzleA({ className, assemble = "mount", caption = true, filterable = false }: Props) {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const { service, active, setActive } = usePuzzle();
  const { leaving, onOpen } = useSeparate();

  const slots = useMemo<Slot[]>(() => {
    const shown = projects.slice(0, MAX_PIECES - 1);
    const pieces = buildPieces(shown.length + 1);
    return pieces.map((piece, i): Slot => {
      if (i === pieces.length - 1) return { kind: "cta", piece };
      const project = shown[i];
      return project ? { kind: "project", piece, project, index: i } : { kind: "empty", piece };
    });
  }, []);

  const activeSlot = slots.find((s) => s.kind === "project" && s.project.slug === active) as
    | Extract<Slot, { kind: "project" }>
    | undefined;
  const ctaActive = active === "__cta";

  const animateIn = assemble && !reduce;
  const enter = (p: Piece, i: number) => {
    const dist = 150 + (i % 3) * 30;
    const sideways = i % 2 ? 1 : -1;
    return {
      x: p.dir[0] * dist + sideways * p.dir[1] * 40,
      y: p.dir[1] * dist - sideways * p.dir[0] * 40,
      rotate: sideways * (18 + i * 4),
      opacity: 0,
    };
  };

  return (
    <div className={cn("relative", className)}>
      <motion.svg
        viewBox={`-12 -12 ${VIEW.w + 24} ${VIEW.h + 24}`}
        className="h-auto w-full overflow-visible"
        role="group"
        aria-label={t.puzzle.label}
        initial={animateIn ? "hidden" : false}
        animate={assemble === "mount" ? "shown" : undefined}
        whileInView={assemble === "view" ? "shown" : undefined}
        viewport={{ once: true, amount: 0.4 }}
      >
        {slots.map((slot, i) => {
          const { piece } = slot;
          const fill = toPath(piece.points);
          const line = outlinePath(piece.points, piece.openEdge);
          const greens = greenEdges(piece.points, piece.openEdge);
          const slug = slot.kind === "project" ? slot.project.slug : null;
          const separated = !!slug && (leaving === slug || pathname === `/proyectos/${slug}`);
          const isActive = slot.kind === "project" ? active === slug : slot.kind === "cta" && ctaActive;
          const match = slot.kind === "project" && !!service && slot.project.services.includes(service);
          const dimmed = !!service && filterable && !match;

          const variants = {
            hidden: enter(piece, i),
            shown: {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              transition: { type: "spring" as const, stiffness: 90, damping: 15, delay: 0.15 + i * 0.13 },
            },
          };

          const body = (
            <>
              <path className="piece-fill" d={fill} />
              <path className="piece-line" d={line} strokeWidth={LINE} />
              {greens.map(([a, b], k) => (
                <path
                  key={k}
                  d={toPath([a, b], false)}
                  fill="none"
                  stroke="var(--color-mint)"
                  strokeWidth={LINE}
                  strokeLinecap="butt"
                  pointerEvents="none"
                />
              ))}
              {slot.kind === "project" && (
                <text
                  className="piece-num"
                  x={piece.anchor[0]}
                  y={piece.anchor[1]}
                  fontSize={6.5}
                  textAnchor="middle"
                  dominantBaseline="central"
                  aria-hidden="true"
                >
                  {String(slot.index + 1).padStart(2, "0")}
                </text>
              )}
              {slot.kind === "cta" && (
                <text
                  className="piece-num"
                  x={piece.anchor[0]}
                  y={piece.anchor[1]}
                  fontSize={9}
                  textAnchor="middle"
                  dominantBaseline="central"
                  aria-hidden="true"
                >
                  +
                </text>
              )}
            </>
          );

          return (
            <motion.g key={piece.key} variants={animateIn ? variants : undefined} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              <motion.g
                animate={{
                  x: separated ? piece.dir[0] * SEPARATE : 0,
                  y: separated ? piece.dir[1] * SEPARATE : 0,
                  scale: separated ? 1.04 : 1,
                  opacity: dimmed ? 0.22 : 1,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                {slot.kind === "project" ? (
                  <a
                    href={`/proyectos/${slot.project.slug}`}
                    className="piece cursor-pointer"
                    data-active={isActive || separated}
                    data-match={match}
                    aria-label={`${slot.project.name}: ${slot.project.type}. ${t.puzzle.open}`}
                    onMouseEnter={() => setActive(slot.project.slug)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(slot.project.slug)}
                    onBlur={() => setActive(null)}
                    onClick={(e) => onOpen(e, `/proyectos/${slot.project.slug}`, slot.project.slug)}
                  >
                    <title>{slot.project.name}</title>
                    {body}
                  </a>
                ) : slot.kind === "cta" ? (
                  <a
                    href="/#contacto"
                    className="piece piece-cta cursor-pointer"
                    data-active={isActive}
                    aria-label={`${t.puzzle.cta}: ${t.puzzle.ctaText}`}
                    onMouseEnter={() => setActive("__cta")}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive("__cta")}
                    onBlur={() => setActive(null)}
                  >
                    <title>{t.puzzle.cta}</title>
                    {body}
                  </a>
                ) : (
                  <g className="piece" aria-hidden="true">
                    {body}
                  </g>
                )}
              </motion.g>
            </motion.g>
          );
        })}

        {/* Etiqueta flotante con el nombre del proyecto activo */}
        {(activeSlot || ctaActive) && (
          <Label
            at={(activeSlot ?? slots[slots.length - 1]).piece.anchor}
            text={activeSlot ? activeSlot.project.name : t.puzzle.cta}
          />
        )}
      </motion.svg>

      {caption && (
        <div className="mt-6 min-h-[5.5rem] border-l border-white/15 pl-4" aria-live="polite">
          {activeSlot ? (
            <>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-mint">
                {String(activeSlot.index + 1).padStart(2, "0")} · {activeSlot.project.type} ·{" "}
                {t.status[activeSlot.project.status]}
              </p>
              <p className="mt-1 font-display text-xl font-medium">{activeSlot.project.name}</p>
              <p className="mt-1 text-sm text-mute">{activeSlot.project.short}</p>
            </>
          ) : ctaActive ? (
            <>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-mint">+</p>
              <p className="mt-1 font-display text-xl font-medium">{t.puzzle.cta}</p>
              <p className="mt-1 text-sm text-mute">{t.puzzle.ctaText}</p>
            </>
          ) : service && filterable ? (
            <>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-mint">{serviceById[service].name}</p>
              <p className="mt-1 font-display text-xl font-medium">
                {t.projects.matches(projects.filter((p) => p.services.includes(service)).length)}
              </p>
              <p className="mt-1 text-sm text-mute">{serviceById[service].summary}</p>
            </>
          ) : (
            <>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-dim">{t.puzzle.idle}</p>
              <p className="mt-1 text-sm text-mute">{t.puzzle.idleText}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Label({ at, text }: { at: Pt; text: string }) {
  const w = text.length * 4.1 + 12;
  const h = 13;
  const x = Math.min(Math.max(at[0] - w / 2, -10), VIEW.w + 10 - w);
  const y = at[1] - h - 7;
  return (
    <g pointerEvents="none" aria-hidden="true">
      <rect x={x} y={y} width={w} height={h} fill="var(--color-ink)" stroke="var(--color-mint)" strokeWidth={0.8} />
      <text
        x={x + w / 2}
        y={y + h / 2 + 0.3}
        fontSize={7}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
      >
        {text}
      </text>
    </g>
  );
}
