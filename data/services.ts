/**
 * Servicios de APPIKO TECH.
 * El `id` es lo que se usa en `projects.ts` → `services: ["web", "apis", ...]`.
 * Para sumar un servicio nuevo: agregalo acá (id + nombre + textos + ícono) y ya aparece
 * en el filtro, en la sección Servicios y en el detalle de cada proyecto.
 */

export const SERVICE_IDS = [
  "web",
  "app",
  "apis",
  "infra",
  "db",
  "ecommerce",
  "ux",
  "marca",
  "marketing",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export type ServiceIcon =
  | "window"
  | "phone"
  | "plug"
  | "server"
  | "database"
  | "bag"
  | "cursor"
  | "diamond"
  | "chart";

export type Service = {
  id: ServiceId;
  /** Nombre que se ve en el filtro y en las piezas. */
  name: string;
  /** Una línea: qué hacemos. */
  summary: string;
  /** Dos o tres líneas para la sección Servicios. */
  description: string;
  icon: ServiceIcon;
};

export const services: Service[] = [
  {
    id: "web",
    name: "Desarrollo web",
    summary: "Sitios rápidos, administrables y pensados para convertir.",
    description:
      "Sitios y plataformas web a medida: desde una landing hasta sistemas con panel de administración, reservas y cuentas de usuario.",
    icon: "window",
  },
  {
    id: "app",
    name: "Aplicaciones propias",
    summary: "Productos digitales completos, de la idea al usuario final.",
    description:
      "Diseñamos y construimos aplicaciones web y móviles propias: validamos la idea, armamos el MVP y lo hacemos crecer.",
    icon: "phone",
  },
  {
    id: "apis",
    name: "Integración de APIs",
    summary: "Pagos, mensajería, mapas, calendarios: conectamos todo.",
    description:
      "Integramos servicios de terceros (Mercado Pago, WhatsApp, Google, mapas, envíos, etc.) y creamos APIs propias para que tus sistemas hablen entre sí.",
    icon: "plug",
  },
  {
    id: "infra",
    name: "Servidores e infraestructura",
    summary: "Deploys, dominios, correo y servidores que no se caen.",
    description:
      "Montamos y mantenemos la infraestructura: hosting serverless o servidores propios, dominios, DNS, correo, backups, monitoreo y seguridad.",
    icon: "server",
  },
  {
    id: "db",
    name: "Base de datos",
    summary: "Datos ordenados, seguros y listos para escalar.",
    description:
      "Modelado de datos, migraciones, cifrado de información sensible y consultas eficientes para que tu sistema crezca sin trabas.",
    icon: "database",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    summary: "Tiendas online con catálogo, carrito y cobros.",
    description:
      "Tiendas online con catálogo administrable, carrito, medios de pago y gestión de pedidos y stock.",
    icon: "bag",
  },
  {
    id: "ux",
    name: "UX/UI",
    summary: "Interfaces claras que se entienden sin manual.",
    description:
      "Investigación, flujos y diseño de interfaces: priorizamos que tus usuarios (y tu equipo) lo usen sin pensar, desde el celular.",
    icon: "cursor",
  },
  {
    id: "marca",
    name: "Rediseño de marca",
    summary: "Identidad visual coherente en cada punto de contacto.",
    description:
      "Logo, paleta, tipografías y sistema visual. Llevamos la marca a la web, a las redes y a cada pieza que sale de tu empresa.",
    icon: "diamond",
  },
  {
    id: "marketing",
    name: "Marketing digital",
    summary: "Medición, campañas y SEO para que te encuentren.",
    description:
      "SEO, analítica (Google Analytics, píxel de Meta), campañas y contenido. Medimos todo para saber qué funciona.",
    icon: "chart",
  },
];

export const serviceById = Object.fromEntries(services.map((s) => [s.id, s])) as Record<ServiceId, Service>;
