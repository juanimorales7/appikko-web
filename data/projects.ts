import type { CaseStudy } from "./case-study";
import { cipanaCase } from "./casos/cipana-turismo";
import type { ServiceId } from "./services";

/**
 * Proyectos del portfolio.
 *
 * Para agregar uno nuevo: copiá un bloque, cambiá el `slug` (va en la URL: /proyectos/<slug>)
 * y completá los campos. El orden de esta lista es el orden de las piezas en la "A":
 * la 1.ª pieza es la faceta grande de afuera, la 2.ª la del medio (verde), etc.
 *
 * Todo lo que diga "TODO: completar" no se muestra en producción (en desarrollo sí, marcado),
 * así podés publicar aunque falten datos.
 *
 * Imágenes: guardalas en /public/proyectos/<slug>/ y referencialas como "/proyectos/<slug>/archivo.webp".
 * Recomendado: WebP, 1600 px de ancho, menos de 300 KB.
 */

export const TODO = "TODO: completar";

export type ProjectType = "Sitio web" | "App propia" | "Cliente";
export type ProjectStatus = "en-vivo" | "en-desarrollo";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  /** URL pública. Dejá `TODO` si todavía no tiene. */
  url: string;
  type: ProjectType;
  /** Rubro o una etiqueta corta (ej. "Turismo aventura"). */
  sector: string;
  year: string;
  /** Una o dos líneas. Se ve en la pieza y en las tarjetas. */
  short: string;
  /** Párrafos del detalle. */
  long: string[];
  /** Lo más destacado, en viñetas cortas. */
  highlights: string[];
  /** Piezas del proyecto: ids de data/services.ts */
  services: ServiceId[];
  /** Qué hicimos en cada servicio, para el detalle (opcional, una línea por servicio). */
  serviceNotes?: Partial<Record<ServiceId, string>>;
  stack: string[];
  /** La primera es la portada. Vacío = portada geométrica automática. */
  images: ProjectImage[];
  status: ProjectStatus;
  /** Caso de estudio completo (opcional). Ver data/case-study.ts y data/casos/. */
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "cipana-turismo",
    name: "Cipana Turismo Aventura",
    url: "https://cipanaturismo.com",
    type: "Cliente",
    sector: "Turismo aventura · San Rafael, Mendoza",
    year: "2026",
    short:
      "Sitio web, reservas online y panel de administración para una empresa de turismo aventura. Pensado para que un equipo no técnico maneje todo desde el celular.",
    long: [
      "Cipana organiza rafting, kayak, trekking y salidas a la nieve en San Rafael, Mendoza, y coordinaba todo por WhatsApp. Diseñamos y desarrollamos un sitio con la identidad de la marca, reservas con calendario y cupos en tiempo real, cobro de seña con Mercado Pago y reservas por WhatsApp que quedan registradas antes de abrir el chat.",
      "Cada reserva se guarda en la base de datos, aparece en Google Calendar y dispara emails automáticos desde la casilla de la empresa: confirmación, recordatorio el día anterior y pedido de reseña al terminar.",
      "El equipo maneja todo desde un panel en el celular: actividades y paquetes, precios por grupo, ofertas con fecha, fotos y video de portada, guías, salidas y pasajeros. Construido con Next.js 16 sobre Cloudflare Workers, D1 y R2, con permisos por rol verificados en el servidor y datos sensibles cifrados.",
    ],
    highlights: [
      "Calendario con cupos en tiempo real y precios por grupo",
      "Seña con Mercado Pago y reservas por WhatsApp que quedan registradas",
      "Google Calendar y emails automáticos desde la casilla de la empresa",
      "Ofertas con cuenta regresiva, galería y video de portada editables",
      "Guías con su lista de pasajeros y fotos privadas de cada salida",
    ],
    services: ["web", "apis", "infra", "db", "ux", "marketing"],
    serviceNotes: {
      web: "Sitio, área de clientes “Mis viajes” y panel: 32 pantallas.",
      apis: "Google Calendar, Gmail API y Mercado Pago Checkout Pro con webhook firmado.",
      infra: "Cloudflare Workers + OpenNext, dominio propio y tareas diarias. USD 5 por mes.",
      db: "Cloudflare D1 + Drizzle (20 tablas), fotos y videos en R2, datos de salud cifrados.",
      ux: "Diseñado primero para el celular, con un panel que guía paso a paso.",
      marketing: "Google Analytics 4, Search Console, sitemap y datos estructurados.",
    },
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Cloudflare Workers",
      "Cloudflare D1",
      "Cloudflare R2",
      "Drizzle ORM",
      "Better Auth",
      "Google Workspace",
      "Google Calendar API",
      "Mercado Pago",
    ],
    images: [
      {
        src: "/proyectos/cipana-turismo/portada.webp",
        alt: "Ilustración de la portada de Cipana: montañas, el río Atuel y botes de rafting al atardecer",
        width: 1600,
        height: 900,
      },
    ],
    status: "en-vivo",
    caseStudy: cipanaCase,
  },
  {
    slug: "indalo",
    name: "Indalo",
    url: TODO,
    type: "Cliente",
    sector: "Decoración del hogar",
    year: TODO,
    short: "Tienda online para una empresa que vende todo para la decoración del hogar.",
    long: [
      "Indalo vende todo para decorar el hogar. Desarrollamos su tienda online para mostrar el catálogo y vender en línea.",
      TODO,
    ],
    highlights: [TODO],
    services: ["web", "ecommerce", "ux"],
    stack: [TODO],
    images: [],
    status: "en-vivo", // TODO: confirmar estado
  },
  {
    slug: "laburapp",
    name: "LaburApp",
    url: TODO,
    type: "App propia",
    sector: "Changas y empleos",
    year: TODO,
    short:
      "Como un delivery, pero de trabajos: conecta a quien necesita una changa con trabajadores cerca.",
    long: [
      "LaburApp es una aplicación propia de APPIKO TECH. Funciona como las apps de delivery, pero para trabajos puntuales: alguien publica lo que necesita (una mudanza, un arreglo, una limpieza) y la app lo conecta con trabajadores disponibles en su zona.",
      TODO,
    ],
    highlights: ["Búsqueda de trabajadores por cercanía", TODO],
    services: ["app", "apis", "infra", "db", "ux", "marca"],
    serviceNotes: {
      apis: "TODO: completar (¿mapas/geolocalización, pagos, notificaciones?)",
    },
    stack: [TODO],
    images: [],
    status: "en-desarrollo",
  },
  {
    slug: "picadito",
    name: "Picadito.ar",
    url: "https://picadito.ar", // TODO: confirmar que el dominio esté en línea
    type: "App propia",
    sector: "Red social de fútbol",
    year: TODO,
    short: "La red social del fútbol amateur: armá partidos, equipos y tu comunidad.",
    long: [
      "Picadito.ar es una red social para los que juegan al fútbol: organizar un partido, completar equipos cuando falta uno y armar comunidad alrededor de la cancha.",
      TODO,
    ],
    highlights: ["Armado de partidos", "Equipos y comunidad", TODO],
    services: ["app", "web", "db", "infra", "ux"],
    stack: [TODO],
    images: [],
    status: "en-desarrollo", // TODO: confirmar estado
  },
];

export const isTodo = (v: string | undefined | null) => !v || v.startsWith("TODO");

/** Devuelve el valor si está completo; si no, `undefined` (para no mostrar placeholders). */
export const filled = (v: string | undefined | null) => (isTodo(v) ? undefined : (v as string));

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
