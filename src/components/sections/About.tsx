import { projects } from "@data/projects";
import { services } from "@data/services";
import { t } from "@/i18n/config";
import { LogoMark } from "../Logo";
import { SectionHeading } from "./SectionHeading";

export function About() {
  const stats = [
    { value: String(projects.length), label: t.about.stats.projects },
    { value: String(services.length), label: t.about.stats.services },
    { value: "100%", label: t.about.stats.custom },
  ];
  return (
    <section id="sobre" className="relative overflow-hidden border-t border-white/10 py-20 sm:py-28" aria-labelledby="sobre-titulo">
      <LogoMark
        mono
        title=""
        className="pointer-events-none absolute -right-24 -bottom-24 h-[480px] w-auto text-white/[0.04] lg:right-0"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading id="sobre-titulo" kicker={t.about.kicker} title={t.about.title} />
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-white/80">
            {t.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <dl className="grid content-end gap-px self-end bg-white/10 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink p-6">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-5xl font-semibold text-mint">{s.value}</span>
                <span className="mt-2 block text-sm text-mute">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
