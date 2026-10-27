import Image from "next/image";
import type { Project } from "@data/projects";
import { cn } from "@/lib/cn";
import { LogoMark } from "./Logo";

/** Portada del proyecto: la primera imagen, o una portada geométrica si todavía no hay capturas. */
export function ProjectCover({
  project,
  className,
  priority,
  sizes = "(min-width: 1024px) 896px, 100vw",
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const img = project.images[0];
  return (
    <div className={cn("relative aspect-[16/9] overflow-hidden border border-white/15 bg-ink-2", className)}>
      {img ? (
        <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div className="bg-grid absolute inset-0 flex items-center justify-center" role="img" aria-label={`${project.name}: imagen próximamente`}>
          <LogoMark className="absolute -right-[8%] -bottom-[20%] h-[120%] w-auto text-white/10" mono title="" />
          <div className="relative text-center">
            <p className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">{project.name}</p>
            <p className="mt-2 font-display text-xs uppercase tracking-[0.25em] text-mint">{project.sector}</p>
          </div>
        </div>
      )}
    </div>
  );
}
