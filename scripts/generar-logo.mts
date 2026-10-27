/**
 * Genera los SVG del logo a partir de src/lib/logo.ts:
 *   public/logo.svg        → la A (fondo transparente)
 *   public/logo-dark.svg   → la A sobre negro (para compartir)
 *   src/app/icon.svg       → favicon
 * Uso: npm run logo
 */
import { writeFileSync } from "node:fs";
import { FACETS, GREEN, GREEN_LINES, STROKE, VIEW, outlinePath, toPath } from "../src/lib/logo.ts";

const lines = (stroke = STROKE) =>
  `<g fill="none" stroke="#fff" stroke-width="${stroke}" stroke-linejoin="miter" stroke-miterlimit="10">` +
  FACETS.map((f) => `<path d="${outlinePath(f.points, f.openEdge)}"/>`).join("") +
  `</g><g fill="none" stroke="${GREEN}" stroke-width="${stroke}" stroke-linejoin="miter" stroke-miterlimit="10">` +
  GREEN_LINES.map((l) => `<path d="${toPath(l, false)}"/>`).join("") +
  `</g>`;

const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW.w} ${VIEW.h}" width="${VIEW.w}" height="${VIEW.h}"><title>APPIKO TECH</title>${lines()}</svg>\n`;
const dark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -20 ${VIEW.w + 40} ${VIEW.h + 40}" width="${VIEW.w + 40}" height="${VIEW.h + 40}"><rect x="-20" y="-20" width="${VIEW.w + 40}" height="${VIEW.h + 40}" fill="#050505"/>${lines()}</svg>\n`;
// Favicon: cuadrado, trazo más grueso para que se lea a 16 px.
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-14 -34 268 268" width="64" height="64"><rect x="-14" y="-34" width="268" height="268" rx="40" fill="#050505"/>${lines(9)}</svg>\n`;

writeFileSync(new URL("../public/logo.svg", import.meta.url), logo);
writeFileSync(new URL("../public/logo-dark.svg", import.meta.url), dark);
writeFileSync(new URL("../src/app/icon.svg", import.meta.url), icon);
console.log("Logo generado: public/logo.svg, public/logo-dark.svg, src/app/icon.svg");
