"use client";

import Link from "next/link";
import { projects } from "@data/projects";
import { services } from "@data/services";
import { t } from "@/i18n/config";
import { ServiceIcon } from "../ServiceIcon";
import { usePuzzle } from "../PuzzleContext";
import { PuzzleGrid } from "../PuzzleGrid";
import { SectionHeading } from "./SectionHeading";

export function Services() {
  const { showService } = usePuzzle();

  return (
    <section id="servicios" className="border-t border-white/10 py-20 sm:py-28" aria-labelledby="servicios-titulo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="servicios-titulo" kicker={t.services.kicker} title={t.services.title} lead={t.services.lead} />
        <PuzzleGrid
          className="mt-14"
          items={services}
          cols={{ base: 1, sm: 2, lg: 3 }}
          getKey={(s) => s.id}
          render={(s, i) => {
            const used = projects.filter((p) => p.services.includes(s.id));
            return (
              <>
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center border border-mint/50 text-mint">
                    <ServiceIcon icon={s.icon} />
                  </span>
                  <span className="font-display text-xs tracking-[0.2em] text-dim">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{s.description}</p>
                <div className="mt-auto pt-6">
                  <p className="font-display text-[11px] uppercase tracking-[0.2em] text-dim">
                    {used.length ? t.services.usedIn : t.services.notYet}
                  </p>
                  {used.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                      {used.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/proyectos/${p.slug}`}
                            scroll={false}
                            className="text-sm text-white underline decoration-white/30 underline-offset-4 hover:text-mint hover:decoration-mint"
                          >
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
              </>
            );
          }}
        />
      </div>
    </section>
  );
}
