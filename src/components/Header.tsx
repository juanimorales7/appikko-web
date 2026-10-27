"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { t } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

const links = [
  { href: "/#proyectos", label: t.nav.projects },
  { href: "/#servicios", label: t.nav.services },
  { href: "/#proceso", label: t.nav.process },
  { href: "/#sobre", label: t.nav.about },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
        scrolled || open ? "border-white/10 bg-ink/85 backdrop-blur-md" : "border-transparent",
      )}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-mint focus:px-3 focus:py-2 focus:text-ink"
      >
        {t.nav.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="APPIKO TECH, inicio" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-display text-sm text-white/75 transition-colors hover:text-mint">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#contacto"
                className="border border-mint px-4 py-2 font-display text-sm text-mint transition-colors hover:bg-mint hover:text-ink"
              >
                {t.nav.cta}
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-white/25 md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? t.nav.close : t.nav.menu}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {open ? <path d="M3 3l14 14M17 3L3 17" /> : <path d="M2 5h16M2 10h16M2 15h10" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Principal" className="border-t border-white/10 bg-ink md:hidden">
          <ul className="px-4 py-4">
            {[...links, { href: "/#contacto", label: t.nav.contact }].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/10 py-4 font-display text-lg"
                >
                  {l.label}
                  <span className="text-mint" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
