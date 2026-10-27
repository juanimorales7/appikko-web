import type { CaseStudy } from "../case-study";

/** Caso de estudio de Indalo: tienda online + panel de gestión (2026). */
export const indaloCase: CaseStudy = {
  tagline: "Cestería nórdica, tejida a mano",
  facts: [
    { label: "Rubro", value: "Cestería nórdica artesanal" },
    { label: "Productos", value: "Cestas, canastas, posavasos y platos de sitio" },
    { label: "Usuarios del panel", value: "La dueña de la marca" },
    { label: "Infraestructura", value: "USD 0 por mes" },
  ],
  context: [
    "Indalo es una marca de cestería nórdica artesanal: cestas, canastas, posavasos y platos de sitio tejidos a mano en cordón.",
    "Arrancamos desde cero: identidad visual, stack, experiencia de compra y publicación del sitio.",
  ],
  request:
    "Una tienda online propia, con una identidad cálida y consistente, que la dueña pudiera manejar sola, sin tocar código y sin costos fijos mientras el emprendimiento arranca.",
  solution: {
    title: "Tres piezas para vender sola",
    pieces: [
      {
        title: "Tienda",
        subtitle: "Del catálogo a WhatsApp",
        items: [
          "Catálogo en tiempo real: lo que se carga en el panel aparece al instante.",
          "Buscador y filtros por categoría que se arman solos con las etiquetas.",
          "Ficha de producto con galería de fotos (flechas y miniaturas).",
          "Carrito con envío por código postal y pedido listo para mandar por WhatsApp.",
        ],
      },
      {
        title: "Panel",
        subtitle: "Sin depender de un programador",
        items: [
          "Acceso protegido con usuario y contraseña.",
          "Alta de productos con varias fotos, precio, stock, descripción y etiquetas.",
          "Edición y eliminación en vivo.",
          "Ofertas y descuentos con una interfaz pensada para alguien sin conocimientos técnicos.",
        ],
      },
      {
        title: "Marca",
        subtitle: "Cálida, clara y consistente",
        items: [
          "Paleta y tipografías propias aplicadas en todo el sitio.",
          "Fotos de catálogo con fondo de estudio a partir de fotos caseras, con IA.",
          "Ofertas automáticas, novedades, historia de la marca y contacto con mapa.",
          "Diseño responsive con menú para celular y barra inteligente.",
        ],
      },
    ],
  },
  architecture: [
    { layer: "Front-end", choice: "HTML5, CSS3, JavaScript y Tailwind CSS" },
    { layer: "Base de datos", choice: "Firebase Firestore, en tiempo real" },
    { layer: "Cuentas", choice: "Firebase Authentication para el panel" },
    { layer: "Imágenes", choice: "Cloudinary: carga y entrega optimizada de fotos" },
    { layer: "Checkout", choice: "Pedido armado y enviado por WhatsApp" },
    { layer: "Publicación", choice: "GitHub Pages, con Git y GitHub" },
    { layer: "Fotografía", choice: "IA de imágenes para fondo de estudio" },
  ],
  diagram: {
    inputs: ["Cliente en la tienda", "Dueña en el panel"],
    hub: "Tienda en GitHub Pages",
    outputs: ["Firestore: productos y ofertas", "Firebase Auth: acceso al panel", "Cloudinary: fotos", "WhatsApp: pedidos"],
  },
  brand: {
    palette: [
      { name: "Crema", hex: "#F5F0E8" },
      { name: "Arena", hex: "#E5DBCC" },
      { name: "Cuerda", hex: "#D4C3A8" },
      { name: "Cobre", hex: "#B07D52" },
      { name: "Cuero", hex: "#A1623C" },
      { name: "Texto", hex: "#4A3F35" },
      { name: "Eucalipto", hex: "#8B9A7E" },
    ],
    fonts: [
      { role: "Títulos", family: "Playfair Display", css: "'Playfair Display', Georgia, 'Times New Roman', serif" },
      { role: "Textos", family: "Lato", css: "Lato, 'Helvetica Neue', Arial, sans-serif" },
    ],
    style: "Clásico-moderno, suave y cálido, con mucho espacio en blanco.",
  },
  decisionsKicker: "Desafíos",
  decisionsTitle: "Lo que resolvimos",
  decisions: [
    {
      title: "Autonomía del cliente",
      text: "Un panel para que la dueña gestione productos, fotos, precios, stock y ofertas sola, sin depender de un programador.",
    },
    {
      title: "Costo cero",
      text: "Stack 100% gratuito (Firebase, Cloudinary y GitHub Pages): clave para un emprendimiento que recién arranca.",
    },
    {
      title: "Seguridad",
      text: "Reglas de la base de datos con lectura pública pero escritura solo para la cuenta autenticada.",
    },
    {
      title: "Fotografía de producto",
      text: "Un sistema para transformar fotos caseras en imágenes de catálogo con fondo de estudio.",
    },
  ],
};
