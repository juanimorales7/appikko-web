# APPIKO TECH · Portfolio

Sitio portfolio del estudio. **Cada proyecto, una pieza.**

Next.js (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion. Listo para Vercel.

## Correr en local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción (también chequea tipos)
npm start          # sirve el build
```

En `npm run dev` los datos pendientes (`TODO: completar`) se ven **marcados en amarillo**; en producción se ocultan.

## Agregar un proyecto

1. Abrí `data/projects.ts`, copiá un bloque y cambiá `slug`, `name`, `services`, etc.
2. Las imágenes van en `public/proyectos/<slug>/` (WebP, ~1600 px, < 300 KB). La primera es la portada; sin imágenes se genera una portada geométrica.
3. Listo: aparece como pieza en la "A", en el tablero, en Servicios (en "Usado en"), en el sitemap y en `/proyectos/<slug>` con su imagen para compartir.

El orden de la lista es el orden de las piezas. Con 4 proyectos se usan las 5 facetas del logo (la última es "Tu proyecto"); con más, las facetas se cortan con encastres automáticos, hasta 9 proyectos en la A (el tablero no tiene límite).

### Caso de estudio (opcional)

Para un proyecto con más detalle (como Cipana), creá `data/casos/<slug>.ts` con un objeto `CaseStudy` (tipos en `data/case-study.ts`) y enlazalo en el proyecto con `caseStudy: miCaso`. Todos los bloques son opcionales y se muestran solo si están: el cliente y el pedido, la solución en piezas, capturas de celular, funcionalidades, arquitectura con diagrama, decisiones, seguridad, etapas, números y próximas etapas. Ejemplo completo: `data/casos/cipana-turismo.ts`.

Servicios: `data/services.ts`. Datos de contacto y redes: `data/site.ts`. Textos de la interfaz: `src/i18n/es.ts`.

## Cómo está hecho el rompecabezas

- **SVG, no canvas.** Cada pieza es un `<a>` real dentro del SVG: se navega con Tab/Enter, los lectores de pantalla la anuncian, escala sin perder nitidez y se le aplica estilo con CSS. Con canvas habría que reimplementar foco, clics y accesibilidad a mano.
- `src/lib/logo.ts`: la "A" reconstruida del logo (coordenadas de cada línea y facetas).
- `src/lib/puzzle.ts`: divide la A en N piezas, calcula dónde va el número y hacia dónde se separa cada una.
- Al hacer clic, la pieza se separa y se abre `/proyectos/<slug>` como **modal** (ruta interceptada `src/app/@modal/(.)proyectos/[slug]`). Si alguien abre el link directo, ve la página completa.
- Mobile: tablero de piezas en 2 columnas que encastran (`PieceBoard`), se abre con un toque.
- `prefers-reduced-motion`: sin animaciones de armado ni separación.

Para regenerar `public/logo.svg` y el favicon (`src/app/icon.svg`) después de tocar la geometría: `npm run logo`.

## Formulario de contacto

Elegí una opción y cargá las variables en Vercel → Project → Settings → Environment Variables (en local, en `.env.local`; ver `.env.example`):

**A · Resend (recomendado)**
1. Creá una cuenta en [resend.com](https://resend.com) y verificá tu dominio (Domains → Add, cargás los registros DNS que te da).
2. Creá una API key (API Keys → Create).
3. Variables: `RESEND_API_KEY`, `CONTACT_TO` (dónde recibís los mensajes), `CONTACT_FROM` (ej. `Appiko Web <web@tudominio>`). Para probar sin dominio: `onboarding@resend.dev` (solo envía a tu propio email de Resend).

El formulario envía a `/api/contacto`, que valida, frena bots (campo trampa + límite por IP) y manda el mail con `reply-to` del cliente.

**B · Formspree (sin servidor)**
1. Creá un formulario en [formspree.io](https://formspree.io) y copiá el ID (la parte final de `https://formspree.io/f/XXXXXX`).
2. Variable: `NEXT_PUBLIC_FORMSPREE_ID=XXXXXX`. Con esta variable el navegador envía directo a Formspree.

Sin ninguna configurada, el formulario avisa que no está conectado y sugiere WhatsApp.

## Deploy en Vercel

1. [vercel.com/new](https://vercel.com/new) → importar el repositorio `appiko-web` (Vercel detecta Next.js solo, no hay que tocar nada del build).
2. Variables (opcionales): `NEXT_PUBLIC_SITE_URL` cuando tengas dominio propio (sirve con o sin `https://`; si falta, se usa la dirección de Vercel) + las del formulario.
3. Deploy. Cada `git push` a `main` publica solo; cada rama tiene su link de vista previa. Dominio propio: Settings → Domains.

## Idiomas

Hoy en español. La estructura para sumar inglés está en `src/i18n/config.ts` (pasos en el comentario del archivo).
