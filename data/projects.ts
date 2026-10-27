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
};

export const projects: Project[] = [
  {
    slug: "cipana-turismo",
    name: "Cipana Turismo",
    url: "https://cipanaturismo.com",
    type: "Cliente",
    sector: "Turismo aventura · San Rafael, Mendoza",
    year: "2026",
    short:
      "Sitio web con reservas online, pagos y panel de administración para una empresa de turismo aventura.",
    long: [
      "Cipana Turismo Aventura ofrece rafting, kayak, trekking, nieve y excursiones en San Rafael, Mendoza. Necesitaban un sitio que mostrara la experiencia y que, además, les permitiera vender y organizar las salidas sin depender de planillas.",
      "Construimos el sitio completo: portada con video, explorador de actividades por temporada y dificultad, páginas por actividad con precios por tamaño de grupo y ofertas con cuenta regresiva. La reserva online muestra cupos en tiempo real y se confirma sola al pagar la seña con Mercado Pago, o queda como pedido por WhatsApp.",
      "Detrás hay un panel pensado para un equipo no técnico que lo usa desde el celular: actividades, precios, cupos, fotos, guías, reservas y clientes, con permisos por rol. Todos los días se envían solos los recordatorios, el pedido de reseña y el aviso de fotos de la salida.",
    ],
    highlights: [
      "Reservas con cupos en tiempo real",
      "Seña con Mercado Pago y confirmación automática",
      "Panel administrable desde el celular, con roles",
      "Recordatorios y pedidos de reseña automáticos",
      "Datos sensibles cifrados (Ley 25.326)",
    ],
    services: ["web", "apis", "infra", "db", "ux", "marketing"],
    serviceNotes: {
      web: "Sitio público, área de clientes \"Mis viajes\" y panel /admin.",
      apis: "Mercado Pago, WhatsApp Cloud API, Google Calendar y Gmail.",
      infra: "Cloudflare Workers con dominio propio, correo y tareas programadas.",
      db: "Cloudflare D1 + Drizzle; fotos en R2; datos de salud cifrados.",
      ux: "Flujos de reserva y panel pensados para el celular.",
      marketing: "Google Analytics 4, píxel de Meta, SEO y reseñas de Google.",
    },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Cloudflare Workers",
      "Cloudflare D1",
      "Drizzle ORM",
      "Better Auth",
      "Mercado Pago",
      "WhatsApp Cloud API",
      "Google Calendar API",
    ],
    images: [
      {
        src: "/proyectos/cipana-turismo/portada.webp",
        alt: "Portada del sitio de Cipana Turismo: grupo haciendo rafting en el río Atuel",
        width: 1600,
        height: 900,
      },
    ],
    status: "en-vivo",
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
