"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { projects } from "@data/projects";
import { services } from "@data/services";
import { t } from "@/i18n/config";
import { ServiceIcon } from "../ServiceIcon";
import { usePuzzle } from "../PuzzleContext";
import { gridEdges } from "@/lib/tile";
import { TileShape } from "../TileShape";
import { SectionHeading } from "./SectionHeading";

export function Services() {
  const reduce = useReducedMotion();
  const { showService } = usePuzzle();

  return (
    <section id="servicios" className="border-t border-white/10 py-20 sm:py-28" aria-labelledby="servicios-titulo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="servicios-titulo" kicker={t.services.kicker} title={t.services.title} lead={t.services.lead} />
        <ul className="mt-14 grid auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const used = projects.filter((p) => p.services.includes(s.id));
            return (
              <motion.li
                key={s.id}
                className="relative flex flex-col px-7 pt-8 pb-7 sm:px-8"
                style={{ zIndex: services.length - i }}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: reduce ? 0 : (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Las piezas encastran según cuántas columnas hay en cada tamaño de pantalla */}
                <TileShape className="sm:hidden" depthX={0} depthY={5} edges={gridEdges(i, services.length, 1)} />
                <TileShape className="hidden sm:block lg:hidden" depthX={6} depthY={5} edges={gridEdges(i, services.length, 2)} />
                <TileShape className="hidden lg:block" depthX={6} depthY={5} edges={gridEdges(i, services.length, 3)} />
                <div className="relative flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center border border-mint/50 text-mint">
                    <ServiceIcon icon={s.icon} />
                  </span>
                  <span className="font-display text-xs tracking-[0.2em] text-dim">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="relative mt-5 text-xl font-semibold">{s.name}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-mute">{s.description}</p>
                <div className="relative mt-auto pt-5">
                  <p className="font-display text-[11px] uppercase tracking-[0.2em] text-dim">
                    {used.length ? t.services.usedIn : t.services.notYet}
                  </p>
                  {used.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                      {used.map((p) => (
                        <li key={p.slug}>
                          <Link href={`/proyectos/${p.slug}`} scroll={false} className="text-sm text-white underline decoration-white/30 underline-offset-4 hover:text-mint hover:decoration-mint">
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {used.length > 0 && (
                    <button
                      type="button"
                      onClick={() => showService(s.id)}
                      className="mt-4 inline-flex items-center gap-2 font-display text-sm text-mint hover:underline"
                    >
                      {t.services.filter} <span aria-hidden="true">↑</span>
                    </button>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
