import { t } from "@/i18n/config";
import { PieceBoard } from "../PieceBoard";
import { PuzzleA } from "../PuzzleA";
import { ServiceFilter } from "../ServiceFilter";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="proyectos" className="border-t border-white/10 py-20 sm:py-28" aria-labelledby="proyectos-titulo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="proyectos-titulo" kicker={t.projects.kicker} title={t.projects.title} lead={t.projects.lead} />
        <ServiceFilter className="mt-8" />
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          {/* En pantallas grandes, la A con el filtro; en mobile alcanza con el tablero. */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <PuzzleA assemble="view" filterable />
            </div>
          </div>
          <PieceBoard className="px-[4%] sm:px-[6%] lg:px-[3%]" />
        </div>
      </div>
    </section>
  );
}
