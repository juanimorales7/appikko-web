import { t } from "@/i18n/config";
import { PieceChain } from "../PieceChain";
import { SectionHeading } from "./SectionHeading";

export function Process() {
  return (
    <section id="proceso" className="border-t border-white/10 py-20 sm:py-28" aria-labelledby="proceso-titulo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="proceso-titulo" kicker={t.process.kicker} title={t.process.title} lead={t.process.lead} />
        <PieceChain
          className="mt-14 md:justify-start xl:flex-nowrap"
          itemClassName="md:w-60"
          numbered
          items={t.process.steps.map((s) => ({ key: s.title, title: s.title, text: s.text }))}
        />
      </div>
    </section>
  );
}
