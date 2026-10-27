"use client";

import { motion } from "framer-motion";

type Props = { inputs: string[]; hub: string; outputs: string[] };

const W = 900;
const ROW = 58;
const BOX_H = 40;
const COL = { in: [0, 210], hub: [310, 550], out: [640, 900] } as const;

/** Diagrama: quién usa el sistema → núcleo → servicios conectados. En mobile, en columna. */
export function ArchitectureDiagram({ inputs, hub, outputs }: Props) {
  const H = Math.max(inputs.length, outputs.length) * ROW;
  const yFor = (i: number, n: number) => H / 2 + (i - (n - 1) / 2) * ROW;
  const hubY = H / 2;

  const curve = (x1: number, y1: number, x2: number, y2: number) => {
    const mx = (x1 + x2) / 2;
    return `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
  };

  const draw = (i: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.9, delay: 0.1 + i * 0.08, ease: "easeOut" as const },
  });

  const box = (x0: number, x1: number, y: number, text: string, key: string, strong = false) => (
    <g key={key}>
      <rect
        x={x0}
        y={y - BOX_H / 2}
        width={x1 - x0}
        height={BOX_H}
        fill={strong ? "var(--color-mint)" : "var(--color-ink-2)"}
        stroke={strong ? "var(--color-mint)" : "rgb(255 255 255 / 0.45)"}
        strokeWidth={1.2}
      />
      <text
        x={(x0 + x1) / 2}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fill={strong ? "var(--color-ink)" : "#fff"}
        style={{ fontFamily: "var(--font-display)", fontWeight: strong ? 600 : 400 }}
      >
        {text}
      </text>
    </g>
  );

  return (
    <figure className="border border-white/15 p-5 sm:p-8">
      <svg viewBox={`-4 -4 ${W + 8} ${H + 8}`} className="hidden h-auto w-full md:block" role="img" aria-label={`${inputs.join(", ")} usan ${hub}, que se conecta con ${outputs.join(", ")}.`}>
        <g fill="none" stroke="var(--color-mint)" strokeWidth={1.2} strokeOpacity={0.7}>
          {inputs.map((_, i) => (
            <motion.path key={`a${i}`} d={curve(COL.in[1], yFor(i, inputs.length), COL.hub[0], hubY)} {...draw(i)} />
          ))}
          {outputs.map((_, i) => (
            <motion.path key={`b${i}`} d={curve(COL.hub[1], hubY, COL.out[0], yFor(i, outputs.length))} {...draw(i + inputs.length)} />
          ))}
        </g>
        {inputs.map((t, i) => box(COL.in[0], COL.in[1], yFor(i, inputs.length), t, `i${i}`))}
        {box(COL.hub[0], COL.hub[1], hubY, hub, "hub", true)}
        {outputs.map((t, i) => box(COL.out[0], COL.out[1], yFor(i, outputs.length), t, `o${i}`))}
      </svg>

      {/* Mobile */}
      <div className="md:hidden">
        <ul className="grid gap-2">
          {inputs.map((t) => (
            <li key={t} className="border border-white/40 px-3 py-2.5 text-center font-display text-sm">{t}</li>
          ))}
        </ul>
        <div className="mx-auto h-8 w-px bg-mint/70" aria-hidden="true" />
        <p className="bg-mint px-3 py-3 text-center font-display text-sm font-semibold text-ink">{hub}</p>
        <div className="mx-auto h-8 w-px bg-mint/70" aria-hidden="true" />
        <ul className="grid grid-cols-2 gap-2">
          {outputs.map((t) => (
            <li key={t} className="flex items-center justify-center border border-white/40 px-2 py-2.5 text-center font-display text-xs">{t}</li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
