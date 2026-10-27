"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { ServiceId } from "@data/services";

type PuzzleState = {
  /** Servicio elegido en el filtro (null = todos). */
  service: ServiceId | null;
  setService: (s: ServiceId | null) => void;
  /** Proyecto resaltado (hover / foco), compartido entre la A y el tablero. */
  active: string | null;
  setActive: (slug: string | null) => void;
  /** Elige un servicio y lleva a la sección de proyectos. */
  showService: (s: ServiceId) => void;
};

const Ctx = createContext<PuzzleState | null>(null);

export function PuzzleProvider({ children }: { children: ReactNode }) {
  const [service, setService] = useState<ServiceId | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const showService = useCallback((s: ServiceId) => {
    setService(s);
    document.getElementById("proyectos")?.scrollIntoView({ block: "start" });
  }, []);

  const value = useMemo(() => ({ service, setService, active, setActive, showService }), [service, active, showService]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

const fallback: PuzzleState = {
  service: null,
  setService: () => {},
  active: null,
  setActive: () => {},
  showService: () => {},
};

export const usePuzzle = () => useContext(Ctx) ?? fallback;
