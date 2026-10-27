import type { ProjectImage } from "./projects";

/**
 * Caso de estudio (opcional) de un proyecto. Si un proyecto lo tiene, la página
 * /proyectos/<slug> suma estas secciones. Todos los bloques son opcionales:
 * lo que no completes, no se muestra.
 */
export type CaseStudy = {
  /** Título de la sección "El cliente" (ej. el lema de la marca). */
  tagline?: string;
  /** Datos rápidos: rubro, ubicación, usuarios… */
  facts?: { label: string; value: string }[];
  /** Quién es el cliente y cómo trabajaba antes. */
  context?: string[];
  /** Qué nos pidió. */
  request?: string;
  /** La solución, en piezas grandes que encastran. */
  solution?: { title?: string; pieces: { title: string; subtitle: string; items: string[] }[] };
  /** Capturas de celular (formato vertical). */
  screens?: (ProjectImage & { caption: string })[];
  screensLead?: string;
  /** Todo lo que hace, por área. */
  features?: { area: string; text: string }[];
  /** Arquitectura: capa → qué se eligió. */
  architecture?: { layer: string; choice: string }[];
  /** Diagrama: quién usa el sistema → núcleo → servicios conectados. */
  diagram?: { inputs: string[]; hub: string; outputs: string[] };
  /** Decisiones explicadas al cliente. */
  decisions?: { title: string; text: string }[];
  decisionsLead?: string;
  security?: string[];
  /** Etapas del proyecto. */
  timeline?: { title: string; text: string }[];
  timelineLead?: string;
  metrics?: { value: string; label: string }[];
  next?: string[];
};
