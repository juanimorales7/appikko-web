import type { CaseStudy } from "../case-study";

/** Caso de estudio de Cipana Turismo Aventura (octubre 2026). */
export const cipanaCase: CaseStudy = {
  tagline: "Del río a la cumbre",
  facts: [
    { label: "Rubro", value: "Turismo aventura" },
    { label: "Ubicación", value: "San Rafael, Mendoza" },
    { label: "Usuarios del panel", value: "Admin, editor y guías" },
    { label: "Idioma", value: "Español rioplatense" },
  ],
  context: [
    "Cipana organiza rafting, cool river, kayak, trekking, excursiones y salidas a la nieve en Mendoza, con base en Valle Grande (Ruta 173, San Rafael), sobre el río Atuel. Todo lo coordinaban por WhatsApp: consultas, precios, cupos y pagos, sin un lugar único donde ver las reservas.",
  ],
  request:
    "Un sitio moderno con la identidad de la marca, reservas con calendario real, cobro de seña con Mercado Pago, integración con WhatsApp y Google Calendar, muchas fotos y videos, y un panel tan simple que lo pueda usar cualquier persona del equipo.",
  solution: {
    title: "Tres piezas que trabajan juntas",
    pieces: [
      {
        title: "Sitio",
        subtitle: "Una vidriera que vende",
        items: [
          "Portada con video de fondo (horizontal y vertical para celular).",
          "Ofertas con sello y cuenta regresiva que aparecen y se van solas.",
          "Actividades por temporada, categoría, duración y dificultad.",
          "Precios por tamaño de grupo, equipo de guías, galería y opiniones.",
        ],
      },
      {
        title: "Reservas",
        subtitle: "Del clic al calendario",
        items: [
          "Calendario con días, horarios y cupos en tiempo real.",
          "Seña online con Mercado Pago, o reserva por WhatsApp que igual queda guardada.",
          "Cada reserva va a la base, a Google Calendar y avisa por email.",
          "“Mis viajes”: comprobante, pasajeros, saldo, fotos y reseña.",
        ],
      },
      {
        title: "Panel",
        subtitle: "Sin depender de un programador",
        items: [
          "“Primeros pasos” que dice qué falta y lleva a hacerlo.",
          "Editor de actividades en 5 pasos con borrador y vista previa.",
          "Precios, horarios, ofertas, textos, fotos y video de portada.",
          "Salidas con guía asignado, pasajeros y fotos privadas.",
        ],
      },
    ],
  },
  screensLead: "La mayoría de los clientes entra desde el teléfono: todo se diseñó primero para esa pantalla.",
  screens: [
    {
      src: "/proyectos/cipana-turismo/movil-portada.webp",
      alt: "Portada del sitio de Cipana en el celular: “Animate a más”, con botones Ver actividades y Reservar por WhatsApp",
      caption: "Portada con video y llamados a la acción.",
      width: 420,
      height: 909,
    },
    {
      src: "/proyectos/cipana-turismo/movil-ofertas.webp",
      alt: "Sección de ofertas en el celular: tarjeta de Rafting con 20% de descuento y cuenta regresiva",
      caption: "Ofertas tipo ticket con cuenta regresiva.",
      width: 390,
      height: 750,
    },
    {
      src: "/proyectos/cipana-turismo/movil-reserva.webp",
      alt: "Paso de reserva en el celular: elección de cantidad de personas con precio por grupo y botón Reservar por WhatsApp",
      caption: "Reserva con precio por grupo.",
      width: 358,
      height: 722,
    },
  ],
  features: [
    { area: "Catálogo", text: "Actividades y paquetes (días, noches, itinerario), 4 temporadas, categorías, filtros, fotos optimizadas hasta 4K, SEO por actividad." },
    { area: "Precios", text: "Precio por persona, escalas por tamaño de grupo y ofertas por % o precio especial. El sitio y el servidor calculan igual el total." },
    { area: "Reservas", text: "Cupos por horario, días cerrados desde Google Calendar, seña con Mercado Pago, pedidos por WhatsApp con código, confirmación desde el panel." },
    { area: "Clientes", text: "Cuentas con contraseña y verificación por email o link mágico, Mis viajes, comprobante, .ics, pago del saldo, cambios, reseñas." },
    { area: "Equipo", text: "Roles Admin, Editor y Guía; perfiles públicos de guías; cada guía ve sus salidas y pasajeros y sube las fotos de la salida." },
    { area: "Contenido", text: "Textos de cada sección, botones, preguntas frecuentes, categorías, contacto, seña, política de cancelación, galería y video de portada." },
    { area: "Automático", text: "Recordatorio el día anterior, “¿Cómo te fue? ⭐” con link a reseña de Google, aviso de fotos subidas. Todos los días a las 19 h." },
    { area: "Medición", text: "Google Analytics 4, Search Console, sitemap y datos estructurados para Google." },
  ],
  architecture: [
    { layer: "Aplicación", choice: "Next.js 16 (App Router, Server Actions), React 19, TypeScript" },
    { layer: "Hosting", choice: "Cloudflare Workers con OpenNext, publicación automática con cada git push" },
    { layer: "Base de datos", choice: "Cloudflare D1 (SQLite) con Drizzle ORM y migraciones versionadas" },
    { layer: "Archivos", choice: "Cloudflare R2: fotos en 4 tamaños (WebP) y videos servidos por partes" },
    { layer: "Cuentas", choice: "Better Auth: email y contraseña, link mágico, roles, límite de intentos" },
    { layer: "Emails", choice: "Gmail API desde la casilla de la empresa (Google Workspace, cuenta de servicio)" },
    { layer: "Agenda", choice: "Google Calendar API (reservas y días cerrados)" },
    { layer: "Pagos", choice: "Mercado Pago Checkout Pro con webhook firmado" },
  ],
  diagram: {
    inputs: ["Cliente en el celular", "Equipo en el panel", "Tarea diaria 19 h"],
    hub: "Sitio en Cloudflare Workers",
    outputs: ["D1: reservas, contenido, cuentas", "R2: fotos y videos", "Google Calendar", "Gmail de la empresa", "Mercado Pago", "WhatsApp"],
  },
  decisionsLead: "Cada elección se explicó en términos simples: qué cuesta, qué riesgo evita y qué tiene que hacer el cliente.",
  decisions: [
    {
      title: "Cloudflare en vez de Vercel",
      text: "El dominio ya estaba en Cloudflare. Workers Paid cuesta USD 5 por mes e incluye base de datos, almacenamiento de fotos (10 GB gratis) y tareas programadas. El sitio anterior en Vercel se mantuvo funcionando hasta probar el nuevo.",
    },
    {
      title: "Emails desde la casilla de la empresa",
      text: "Ya pagaban Google Workspace. Los emails salen desde su propia dirección con una cuenta de servicio que solo puede enviar: no lee ni borra correos y no hubo que tocar los registros DNS del correo.",
    },
    {
      title: "Reservar por WhatsApp sin perder el control",
      text: "El cliente sigue prefiriendo WhatsApp. En vez de un link suelto, el botón guarda la reserva (ocupa el cupo, va al calendario, avisa por email) y recién después abre el chat con el código.",
    },
    {
      title: "Cupos desde la base, no desde el calendario",
      text: "Así nunca se vende de más aunque falle una integración externa. Google Calendar se usa para ver las salidas y para cerrar días escribiendo “CERRADO”.",
    },
    {
      title: "Panel que guía",
      text: "Borrador automático, vista previa, confirmaciones antes de borrar, mensajes claros y una lista de “Primeros pasos” calculada con datos reales. El objetivo: que nadie tenga que llamar al programador para cambiar un precio.",
    },
    {
      title: "Datos reales, nada inventado",
      text: "Precios, horarios y políticas se cargaron solo cuando el cliente los confirmó. Lo que faltaba quedó marcado para completar y se armó una lista de preguntas para cada actividad.",
    },
  ],
  security: [
    "Permisos por rol verificados en el servidor en cada acción, no solo ocultando botones.",
    "Datos de salud y contacto de emergencia cifrados (AES-GCM); solo los ven el administrador y el guía de esa salida.",
    "Fotos privadas de cada salida visibles únicamente para sus pasajeros.",
    "Límites de intentos en el ingreso, en los links de acceso y en los pedidos de reserva, para que nadie bloquee cupos con pedidos falsos.",
    "Consentimiento explícito, descarga y borrado de la cuenta, en línea con la Ley 25.326 de Argentina.",
    "Claves solo en las variables seguras de Cloudflare: el repositorio puede ser público sin exponer nada.",
  ],
  timelineLead:
    "Entregas por etapas, cada una probada en celular y compu antes de publicarla, con el cliente guiado paso a paso en cada configuración.",
  timeline: [
    { title: "Identidad y sitio base", text: "Paleta y tipografía de la marca, portada con video, catálogo de actividades y reserva por WhatsApp." },
    { title: "Infraestructura", text: "Migración a Cloudflare (Workers, D1, R2), dominio propio con redirección de www y emails desde Google Workspace." },
    { title: "Cuentas y Mis viajes", text: "Registro con verificación, link mágico, roles del equipo, área del cliente y protección de datos personales." },
    { title: "Panel de contenido", text: "Editor de actividades y paquetes, ofertas, textos, fotos optimizadas, precios por grupo y guía de ayuda." },
    { title: "Operación", text: "Google Calendar, cupos, pedidos por WhatsApp, salidas con guías, clientes y emails automáticos." },
    { title: "Lanzamiento", text: "Revisión de seguridad, velocidad (portada sin saltos al cargar), Search Console, sitemap y Google Analytics." },
  ],
  metrics: [
    { value: "32", label: "pantallas (sitio, Mis viajes y panel)" },
    { value: "20", label: "tablas en la base de datos" },
    { value: "12", label: "migraciones versionadas" },
    { value: "14.700", label: "líneas de TypeScript" },
    { value: "3", label: "roles con permisos distintos" },
    { value: "USD 5", label: "por mes de infraestructura" },
  ],
  next: [
    "Conectar Mercado Pago para que la seña online confirme la reserva sola.",
    "WhatsApp Cloud API para confirmaciones, recordatorios y pedido de reseña automáticos.",
    "Completar precios, horarios y cupos de todas las actividades, y subir fotos reales.",
    "Medir con Analytics y Search Console qué actividades convierten mejor.",
  ],
};
