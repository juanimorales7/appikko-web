"use client";

import { projects } from "@data/projects";
import { services } from "@data/services";
import { t } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { usePuzzle } from "./PuzzleContext";

/** Filtro por servicio: resalta los proyectos que lo usan y atenúa el resto. */
export function ServiceFilter({ className }: { className?: string }) {
  const { service, setService } = usePuzzle();
  // Solo los servicios que aparecen en al menos un proyecto.
  const used = services.filter((s) => projects.some((p) => p.services.includes(s.id)));

  const chip = (selected: boolean) =>
    cn(
      "rounded-none border px-3.5 py-2 font-display text-sm transition-colors duration-200",
      selected
        ? "border-mint bg-mint text-ink"
        : "border-white/25 text-white/85 hover:border-mint hover:text-mint",
    );

  return (
    <div role="group" aria-label={t.projects.filterLabel} className={cn("flex flex-wrap gap-2", className)}>
      <button type="button" aria-pressed={service === null} className={chip(service === null)} onClick={() => setService(null)}>
        {t.projects.all}
      </button>
      {used.map((s) => (
        <button
          key={s.id}
          type="button"
          aria-pressed={service === s.id}
          className={chip(service === s.id)}
          onClick={() => setService(service === s.id ? null : s.id)}
        >
          {s.name}
        </button>
      ))}
    </div>
  );
}
