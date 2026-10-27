"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { t } from "@/i18n/config";
import { PuzzleA } from "../PuzzleA";

export function Hero() {
  // Mismo estado inicial en servidor y navegador; MotionConfig (layout) quita el movimiento si el usuario lo pide.
  const up = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const [first, ...rest] = t.hero.title.split(", ");

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24" aria-labelledby="hero-titulo">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_75%)]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute top-1/4 right-0 h-[420px] w-[420px] translate-x-1/4 rounded-full bg-mint/10 blur-[120px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <div>
          <motion.p {...up(0)} className="font-display text-xs uppercase tracking-[0.3em] text-mint">
            {t.hero.kicker}
          </motion.p>
          <motion.h1 {...up(0.08)} id="hero-titulo" className="mt-5 text-5xl leading-[0.95] font-semibold sm:text-7xl xl:text-8xl">
            {first}
            {rest.length > 0 && (
              <>
                ,<br />
                <span className="text-mint">{rest.join(", ")}</span>
              </>
            )}
          </motion.h1>
          <motion.p {...up(0.16)} className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
            {t.hero.lead}
          </motion.p>
          <motion.div {...up(0.24)} className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#proyectos"
              className="bg-mint px-6 py-3.5 font-display text-sm font-semibold text-ink transition-opacity hover:opacity-90"
            >
              {t.hero.primary}
            </Link>
            <Link
              href="#contacto"
              className="border border-white/40 px-6 py-3.5 font-display text-sm font-semibold transition-colors hover:border-mint hover:text-mint"
            >
              {t.hero.secondary}
            </Link>
          </motion.div>
        </div>

        <div className="mx-auto w-full max-w-[560px]">
          <PuzzleA assemble="mount" />
        </div>
      </div>
    </section>
  );
}
