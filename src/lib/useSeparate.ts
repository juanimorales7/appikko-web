"use client";

import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { useCallback, useState, type MouseEvent } from "react";

/**
 * Click en una pieza: primero se "separa" (animación corta) y después navega.
 * Respeta ctrl/cmd-click (nueva pestaña) y prefers-reduced-motion.
 */
export function useSeparate(delay = 320) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [leaving, setLeaving] = useState<string | null>(null);

  const onOpen = useCallback(
    (e: MouseEvent, href: string, key: string) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      if (reduce) {
        router.push(href, { scroll: false });
        return;
      }
      setLeaving(key);
      window.setTimeout(() => {
        router.push(href, { scroll: false });
        window.setTimeout(() => setLeaving(null), 400);
      }, delay);
    },
    [router, reduce, delay],
  );

  return { leaving, onOpen };
}
