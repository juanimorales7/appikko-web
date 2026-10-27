import Image from "next/image";
import type { CSSProperties } from "react";
import Link from "next/link";
import { filled, isTodo, projects, type Project } from "@data/projects";
import { serviceById } from "@data/services";
import { t } from "@/i18n/config";
import { cn } from "@/lib/cn";
import {
  CaseBrand,
  CaseDecisions,
  CaseFeatures,
  CaseIntro,
  CaseMetrics,
  CaseNext,
  CaseScreens,
  CaseSecurity,
  CaseSolution,
  CaseTech,
  CaseTimeline,
} from "./case/CaseStudySections";
import { PieceChain } from "./PieceChain";
import { ProjectCover } from "./ProjectCover";
import { Field, done } from "./Todo";

/** Detalle de un proyecto. Se usa en la página /proyectos/[slug] y dentro del modal. */
export function ProjectDetail({ project, headingLevel = 1 }: { project: Project; headingLevel?: 1 | 2 }) {
  const H = headingLevel === 1 ? "h1" : "h2";
  const Sub = headingLevel === 1 ? "h2" : "h3";
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const url = filled(project.url);
  const cs = project.caseStudy;

  const pieces = project.services.map((id) => {
    const s = serviceById[id];
    const note = project.serviceNotes?.[id];
    return { key: id, title: s.name, text: note && !isTodo(note) ? note : s.summary, icon: s.icon };
  });

  const meta = [
    { label: t.project.type, value: project.type },
    { label: t.project.sector, value: project.sector },
    { label: t.project.year, value: project.year },
    { label: t.project.status, value: t.status[project.status] },
  ];

  return (
    <article>
      <header>
        <p className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.22em] text-mint">
          <span>{String(idx + 1).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-mint/60" aria-hidden="true" />
          <span>{project.type}</span>
        </p>
        <H className="mt-3 text-4xl font-semibold sm:text-6xl">{project.name}</H>
        <p className="mt-4 max-w-2xl text-lg text-mute">{project.short}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <StatusPill status={project.status} />
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 px-4 py-2 font-display text-sm transition-colors hover:border-mint hover:text-mint"
            >
              {t.project.visit} <span aria-hidden="true">↗</span>
              <span className="sr-only">(se abre en otra pestaña)</span>
            </a>
          )}
        </div>
      </header>

      <ProjectCover project={project} className="mt-10" priority={headingLevel === 1} />

      {cs && <CaseIntro cs={cs} slug={project.slug} as={Sub} />}

      <section className={cs ? "mt-20" : "mt-14"} aria-labelledby={`piezas-${project.slug}`}>
        <Sub id={`piezas-${project.slug}`} className="text-2xl font-semibold sm:text-3xl">
          {t.project.pieces}
        </Sub>
        <p className="mt-2 text-mute">{t.project.piecesLead}</p>
        <PieceChain items={pieces} className="mt-8" />
      </section>

      {cs && <CaseSolution cs={cs} slug={project.slug} as={Sub} />}
      {cs && <CaseScreens cs={cs} slug={project.slug} as={Sub} />}

      {project.images.length > 1 && (
        <section className="mt-20" aria-labelledby={`galeria-${project.slug}`}>
          <Sub id={`galeria-${project.slug}`} className="text-2xl font-semibold sm:text-3xl">
            {t.project.gallery}
          </Sub>
          {/* Filas de a 2: cada columna es proporcional a su foto, así todas quedan del mismo alto sin recortar. */}
          <div className="mt-6 space-y-4">
            {chunk(project.images.slice(1), 2).map((row) => (
              <div
                key={row[0].src}
                className="grid gap-4 sm:[grid-template-columns:var(--cols)]"
                style={{ "--cols": row.map((img) => `${(img.width / img.height).toFixed(3)}fr`).join(" ") } as CSSProperties}
              >
                {row.map((img) => (
                  <div key={img.src} className="overflow-hidden border border-white/15">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-20 grid gap-12 md:grid-cols-[1fr_16rem]">
        <section aria-labelledby={`sobre-${project.slug}`}>
          <Sub id={`sobre-${project.slug}`} className="text-2xl font-semibold">
            {cs ? t.project.summary : t.project.about}
          </Sub>
          <div className="mt-4 space-y-4 leading-relaxed text-white/80">
            {done(project.long).map((p, i) => (
              <p key={i}>
                <Field value={p} />
              </p>
            ))}
          </div>
          {done(project.highlights).length > 0 && (
            <>
              <h4 className="mt-10 font-display text-sm uppercase tracking-[0.2em] text-dim">{t.project.highlights}</h4>
              <ul className="mt-4 space-y-2">
                {done(project.highlights).map((h, i) => (
                  <li key={i} className="flex gap-3 text-white/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-mint" aria-hidden="true" />
                    <Field value={h} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        <aside className="space-y-8">
          <dl className="space-y-4 border-l border-white/15 pl-5">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="font-display text-xs uppercase tracking-[0.2em] text-dim">{m.label}</dt>
                <dd className="mt-1 text-white/90">
                  <Field value={m.value} fallback="—" />
                </dd>
              </div>
            ))}
          </dl>
          {done(project.stack).length > 0 && (
            <div>
              <h4 className="font-display text-xs uppercase tracking-[0.2em] text-dim">{t.project.stack}</h4>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {done(project.stack).map((s) => (
                  <li key={s} className="border border-white/20 px-2 py-1 text-xs text-white/80">
                    <Field value={s} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {cs && (
        <>
          <CaseFeatures cs={cs} slug={project.slug} as={Sub} />
          <CaseTech cs={cs} slug={project.slug} as={Sub} />
          <CaseBrand cs={cs} slug={project.slug} as={Sub} />
          <CaseDecisions cs={cs} slug={project.slug} as={Sub} />
          <CaseSecurity cs={cs} slug={project.slug} as={Sub} />
          <CaseTimeline cs={cs} slug={project.slug} as={Sub} />
          <CaseMetrics cs={cs} slug={project.slug} as={Sub} />
          <CaseNext cs={cs} slug={project.slug} as={Sub} />
        </>
      )}


      <section className="mt-20 flex flex-col items-start gap-4 border border-mint/40 bg-mint/5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="font-display text-xl font-semibold">{t.project.ctaTitle}</p>
          <p className="mt-1 text-mute">{t.project.ctaText}</p>
        </div>
        <Link href="/#contacto" className="bg-mint px-5 py-3 font-display text-sm font-semibold text-ink transition-opacity hover:opacity-90">
          {t.nav.cta}
        </Link>
      </section>

      {projects.length > 1 && (
        <nav className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6" aria-label="Más proyectos">
          <Link href={`/proyectos/${prev.slug}`} scroll={false} className="group">
            <span className="font-display text-xs uppercase tracking-[0.2em] text-dim">← {t.project.prev}</span>
            <span className="mt-1 block font-display text-lg group-hover:text-mint">{prev.name}</span>
          </Link>
          <Link href={`/proyectos/${next.slug}`} scroll={false} className="group text-right">
            <span className="font-display text-xs uppercase tracking-[0.2em] text-dim">{t.project.next} →</span>
            <span className="mt-1 block font-display text-lg group-hover:text-mint">{next.name}</span>
          </Link>
        </nav>
      )}
    </article>
  );
}

export function StatusPill({ status, className }: { status: Project["status"]; className?: string }) {
  const live = status === "en-vivo";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-3 py-1.5 font-display text-xs uppercase tracking-[0.16em]",
        live ? "border-mint/50 text-mint" : "border-white/25 text-white/75",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", live ? "bg-mint" : "bg-white/50")} aria-hidden="true" />
      {t.status[status]}
    </span>
  );
}

const chunk = <T,>(list: T[], size: number) =>
  Array.from({ length: Math.ceil(list.length / size) }, (_, i) => list.slice(i * size, i * size + size));
