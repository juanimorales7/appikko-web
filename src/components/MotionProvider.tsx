"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Con "reducir movimiento" activado (p. ej. Windows → Efectos de animación desactivados),
 * Framer Motion omite desplazamientos y giros y deja solo fundidos cortos.
 * Importante: los componentes NO deben cambiar su estado inicial según esa preferencia,
 * porque el servidor no la conoce y el contenido quedaría invisible.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
