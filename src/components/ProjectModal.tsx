"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { t } from "@/i18n/config";

/**
 * Modal del proyecto (ruta interceptada). Cerrar = volver atrás, así la URL
 * /proyectos/<slug> se puede compartir y el botón "atrás" del navegador funciona.
 */
export function ProjectModal({ children, title }: { children: ReactNode; title: string }) {
  const router = useRouter();
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);

  const close = useCallback(() => router.back(), [router]);

  useEffect(() => {
    opener.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !panel.current) return;
      // Mantener el foco dentro del modal
      const els = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      if (opener.current instanceof HTMLElement || opener.current instanceof SVGElement) opener.current.focus({ preventScroll: true });
    };
  }, [close]);

  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={close}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 overflow-y-auto overscroll-contain">
        <div className="flex min-h-full items-start justify-center p-0 sm:p-6 lg:p-10">
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className="pointer-events-auto relative w-full max-w-5xl border border-white/20 bg-ink px-5 pt-16 pb-10 shadow-[0_0_0_1px_rgba(58,255,157,0.08),0_40px_120px_-20px_rgba(58,255,157,0.18)] outline-none sm:px-10 sm:pt-16"
            initial={{ opacity: 0, y: 40, rotate: -1.5, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
          >
            <button
              type="button"
              onClick={close}
              className="absolute top-4 right-4 inline-flex h-10 items-center gap-2 border border-white/25 px-3 font-display text-sm transition-colors hover:border-mint hover:text-mint"
            >
              {t.project.close}
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 2l12 12M14 2L2 14" />
              </svg>
            </button>
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
