import { FACETS, GREEN, GREEN_LINES, STROKE, VIEW, outlinePath, toPath } from "@/lib/logo";

type Props = { className?: string; title?: string; mono?: boolean };

/** La "A" de Appiko en SVG (recreada del logo original). */
export function LogoMark({ className, title = "APPIKO TECH", mono }: Props) {
  return (
    <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className={className} {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}>
      <g fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinejoin="miter" strokeMiterlimit={10}>
        {FACETS.map((f) => (
          <path key={f.id} d={outlinePath(f.points, f.openEdge)} />
        ))}
      </g>
      {!mono && (
        <g fill="none" stroke={GREEN} strokeWidth={STROKE} strokeLinejoin="miter" strokeMiterlimit={10}>
          {GREEN_LINES.map((l, i) => (
            <path key={i} d={toPath(l, false)} />
          ))}
        </g>
      )}
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="h-7 w-auto text-white" title="" />
      <span className="font-display text-[15px] font-semibold tracking-[0.18em] text-white">
        APPIKO<span className="text-mint"> TECH</span>
      </span>
    </span>
  );
}
