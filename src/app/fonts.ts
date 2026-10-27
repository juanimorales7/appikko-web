import localFont from "next/font/local";

// Fuentes servidas desde el propio sitio (sin pedir a Google): se precargan y no hay saltos.
// El subset "latin" ya incluye á, é, ñ, ¿, ¡.
export const spaceGrotesk = localFont({
  src: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  weight: "300 700",
  variable: "--font-space-grotesk",
  display: "swap",
});

export const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});
