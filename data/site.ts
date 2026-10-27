import { TODO } from "./projects";

/**
 * URL pública del sitio. Acepta "appikko.tech", "https://appikko.tech/" o vacío.
 * Sin NEXT_PUBLIC_SITE_URL usa la dirección que asigna Vercel al proyecto.
 */
function siteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "https://appikko-web.vercel.app"; // TODO: dominio propio
  const withProtocol = /^https?:\/\//i.test(raw.trim()) ? raw.trim() : `https://${raw.trim()}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return "https://appikko-web.vercel.app";
  }
}

/** Datos generales del estudio. Lo que diga TODO no se muestra en producción. */
export const site = {
  name: "APPIKO TECH",
  shortName: "Appiko",
  url: siteUrl(),
  email: TODO, // ej. "hola@appiko.tech"
  /** Solo números, con código de país (ej. 5492604000000). */
  whatsapp: TODO,
  whatsappMessage: "Hola Appiko, quiero contarles sobre un proyecto.",
  location: "Mendoza, Argentina", // TODO: confirmar
  socials: [
    { name: "Instagram", url: TODO },
    { name: "LinkedIn", url: TODO },
    { name: "GitHub", url: TODO },
  ],
};
