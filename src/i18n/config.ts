import { es, type Dictionary } from "./es";

/**
 * Idiomas del sitio. Hoy solo español.
 * Para sumar inglés:
 *  1. Crear `en.ts` con `export const en: Dictionary = { ... }`.
 *  2. Agregarlo a `dictionaries` y a `locales`.
 *  3. Mover las páginas de `src/app/` a `src/app/[lang]/` y leer el idioma con `getDictionary(lang)`.
 *  4. Traducir los textos de `data/` (o agregar campos `en` en cada proyecto).
 */
export const locales = ["es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

const dictionaries: Record<Locale, Dictionary> = { es };

export const getDictionary = (locale: Locale = defaultLocale) => dictionaries[locale];

/** Diccionario del idioma por defecto, para usar directo en componentes. */
export const t = getDictionary();
