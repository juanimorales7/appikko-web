import { cn } from "@/lib/cn";

export function SectionHeading({
  kicker,
  title,
  lead,
  id,
  className,
}: {
  kicker: string;
  title: string;
  lead?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.25em] text-mint">
        <span className="inline-block h-2 w-2 rotate-45 border border-mint" aria-hidden="true" />
        {kicker}
      </p>
      <h2 id={id} className="mt-4 text-3xl font-semibold sm:text-5xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg text-mute">{lead}</p>}
    </div>
  );
}
