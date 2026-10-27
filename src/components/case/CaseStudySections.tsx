import Image from "next/image";
import type { ReactNode } from "react";
import type { CaseStudy } from "@data/case-study";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { SolutionGrid } from "./SolutionGrid";

type Heading = "h2" | "h3";

function Block({
  id,
  kicker,
  title,
  lead,
  as: H,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  lead?: string;
  as: Heading;
  children: ReactNode;
}) {
  return (
    <section className="mt-20" aria-labelledby={id}>
      <p className="font-display text-xs uppercase tracking-[0.25em] text-mint">{kicker}</p>
      <H id={id} className="mt-2 text-2xl font-semibold sm:text-4xl">
        {title}
      </H>
      {lead && <p className="mt-3 max-w-2xl text-mute">{lead}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

/** "El cliente": va arriba, después de la portada. */
export function CaseIntro({ cs, slug, as }: { cs: CaseStudy; slug: string; as: Heading }) {
  if (!cs.context?.length && !cs.facts?.length) return null;
  return (
    <Block id={`cliente-${slug}`} kicker="El cliente" title={cs.tagline ?? "El cliente"} as={as}>
      <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
        <div className="space-y-4 leading-relaxed text-white/80">
          {cs.context?.map((p) => <p key={p}>{p}</p>)}
        </div>
        {cs.request && (
          <blockquote className="border-l-2 border-mint pl-5">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-dim">El pedido</p>
            <p className="mt-2 text-lg leading-relaxed text-white/90">{cs.request}</p>
          </blockquote>
        )}
      </div>
      {cs.facts && (
        <dl className="mt-10 grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
          {cs.facts.map((f) => (
            <div key={f.label} className="bg-ink p-4">
              <dt className="font-display text-[11px] uppercase tracking-[0.2em] text-dim">{f.label}</dt>
              <dd className="mt-1.5 text-sm text-white/90 sm:text-base">{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Block>
  );
}

/** La solución: piezas grandes que encastran (en fila desde tablet, en columna en mobile). */
export function CaseSolution({ cs, slug, as }: { cs: CaseStudy; slug: string; as: Heading }) {
  const pieces = cs.solution?.pieces;
  if (!pieces?.length) return null;
  return (
    <Block id={`solucion-${slug}`} kicker="La solución" title={cs.solution?.title ?? "La solución"} as={as}>
      <SolutionGrid pieces={pieces} />
    </Block>
  );
}

export function CaseScreens({ cs, slug, as }: { cs: CaseStudy; slug: string; as: Heading }) {
  if (!cs.screens?.length) return null;
  return (
    <Block id={`capturas-${slug}`} kicker="Capturas" title="Así se ve en el celular" lead={cs.screensLead} as={as}>
      <ul className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
        {cs.screens.map((s) => (
          <li key={s.src} className="w-[68%] shrink-0 snap-center sm:w-auto">
            <figure>
              <div className="overflow-hidden rounded-[1.6rem] border border-white/25 bg-ink-2 p-1.5">
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  sizes="(min-width: 640px) 30vw, 68vw"
                  className="aspect-[9/17] h-auto w-full rounded-[1.25rem] object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 text-sm text-mute">{s.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Block>
  );
}

function Rows({ rows, label }: { rows: { k: string; v: string }[]; label: string }) {
  return (
    <dl className="divide-y divide-white/10 border-y border-white/15" aria-label={label}>
      {rows.map((r) => (
        <div key={r.k} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
          <dt className="font-display font-semibold text-white">{r.k}</dt>
          <dd className="leading-relaxed text-white/75">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CaseFeatures({ cs, slug, as }: { cs: CaseStudy; slug: string; as: Heading }) {
  if (!cs.features?.length) return null;
  return (
    <Block id={`funciones-${slug}`} kicker="Funcionalidades" title="Todo lo que hace" as={as}>
      <Rows label="Funcionalidades por área" rows={cs.features.map((f) => ({ k: f.area, v: f.text }))} />
    </Block>
  );
}

export function CaseTech({ cs, slug, as }: { cs: CaseStudy; slug: string; as: Heading }) {
  if (!cs.architecture?.length && !cs.diagram) return null;
  return (
    <Block id={`tecnologia-${slug}`} kicker="Tecnología" title="Cómo está construido" as={as}>
      {cs.architecture && <Rows label="Arquitectura por capa" rows={cs.architecture.map((a) => ({ k: a.layer, v: a.choice }))} />}
      {cs.diagram && (
        <div className="mt-8">
          <ArchitectureDiagram {...cs.diagram} />
        </div>
      )}
    </Block>
  );
}

export function CaseDecisions({ cs, slug, as }: { cs: CaseStudy; slug: string; as: Heading }) {
  if (!cs.decisions?.length) return null;
  return (
    <Block
      id={`decisiones-${slug}`}
      kicker={cs.decisionsKicker ?? "Decisiones"}
      title={cs.decisionsTitle ?? "Lo que le explicamos al cliente"}
      lead={cs.decisionsLead}
      as={as}
    >
      <ul className="grid gap-px bg-white/10 md:grid-cols-2">
        {cs.decisions.map((d, i) => (
          <li key={d.title} className="bg-ink p-6">
            <p className="font-display text-xs tracking-[0.2em] text-dim">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-2 font-display text-lg font-semibold">{d.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/75">{d.text}</p>
          </li>
        ))}
      </ul>
    </Block>
  );
}

export function CaseSecurity({ cs, slug, as }: { cs: CaseStudy; slug: string; as: Heading }) {
  if (!cs.security?.length) return null;
  return (
    <Block id={`seguridad-${slug}`} kicker="Seguridad" title="Datos de clientes cuidados" as={as}>
      <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
        {cs.security.map((s) => (
          <li key={s} className="flex gap-3 leading-relaxed text-white/80">
            <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-mint" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M4 7V5a4 4 0 0 1 8 0v2M3 7h10v7H3z" />
            </svg>
            {s}
          </li>
        ))}
      </ul>
    </Block>
  );
}

export function CaseTimeline({ cs, slug, as }: { cs: CaseStudy; slug: string; as: Heading }) {
  if (!cs.timeline?.length) return null;
  return (
    <Block id={`proceso-${slug}`} kicker="Proceso" title="Cómo trabajamos" lead={cs.timelineLead} as={as}>
      <ol className="relative grid gap-8 border-l border-white/15 pl-8 md:grid-cols-2 md:gap-x-12 md:border-l-0 md:pl-0">
        {cs.timeline.map((s, i) => (
          <li key={s.title} className="relative md:border-l md:border-white/15 md:pl-8">
            <span
              className="absolute top-1 -left-[40px] flex h-4 w-4 rotate-45 items-center justify-center border border-mint bg-ink md:-left-[8px]"
              aria-hidden="true"
            />
            <p className="font-display text-xs tracking-[0.2em] text-mint">Etapa {i + 1}</p>
            <p className="mt-1 font-display text-lg font-semibold">{s.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-white/75">{s.text}</p>
          </li>
        ))}
      </ol>
    </Block>
  );
}

export function CaseMetrics({ cs, slug, as }: { cs: CaseStudy; slug: string; as: Heading }) {
  if (!cs.metrics?.length) return null;
  return (
    <Block id={`numeros-${slug}`} kicker="En números" title="El proyecto" as={as}>
      <dl className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-3">
        {cs.metrics.map((m) => (
          <div key={m.label} className="flex flex-col-reverse bg-ink p-5 sm:p-6">
            <dt className="mt-2 text-sm text-mute">{m.label}</dt>
            <dd className="font-display text-4xl font-semibold text-mint sm:text-5xl">{m.value}</dd>
          </div>
        ))}
      </dl>
    </Block>
  );
}

export function CaseNext({ cs, slug, as }: { cs: CaseStudy; slug: string; as: Heading }) {
  if (!cs.next?.length) return null;
  return (
    <Block id={`sigue-${slug}`} kicker="Próximas etapas" title="Las próximas piezas" as={as}>
      <ul className="grid gap-3 md:grid-cols-2">
        {cs.next.map((s) => (
          <li key={s} className="flex gap-4 border border-dashed border-white/30 p-4 leading-relaxed text-white/80">
            <span className="font-display text-lg leading-none text-mint" aria-hidden="true">
              +
            </span>
            {s}
          </li>
        ))}
      </ul>
    </Block>
  );
}

export function CaseBrand({ cs, slug, as }: { cs: CaseStudy; slug: string; as: Heading }) {
  const b = cs.brand;
  if (!b?.palette.length) return null;
  return (
    <Block id={`marca-${slug}`} kicker="Identidad visual" title="La marca, aplicada en todo" lead={b.style} as={as}>
      <ul className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4 lg:grid-cols-7">
        {b.palette.map((c) => (
          <li key={c.hex} className="bg-ink p-3">
            <span className="block aspect-[4/3] w-full border border-white/10" style={{ background: c.hex }} aria-hidden="true" />
            <span className="mt-2 block text-sm text-white/90">{c.name}</span>
            <span className="block font-mono text-xs text-dim uppercase">{c.hex}</span>
          </li>
        ))}
      </ul>
      {b.fonts && (
        <dl className="mt-6 grid gap-px bg-white/10 sm:grid-cols-2">
          {b.fonts.map((f) => (
            <div key={f.family} className="bg-ink p-5">
              <dt className="font-display text-[11px] uppercase tracking-[0.2em] text-dim">{f.role}</dt>
              <dd className="mt-2 text-3xl text-white" style={{ fontFamily: f.css ?? f.family }}>
                {f.family}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </Block>
  );
}
