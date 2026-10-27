import { TODO } from "./projects";

/** Datos generales del estudio. Lo que diga TODO no se muestra en producción. */
export const site = {
  name: "APPIKO TECH",
  shortName: "Appiko",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://appiko.tech", // TODO: confirmar dominio
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
