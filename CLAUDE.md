# Cuerpo y Tela

Web de moda en Next.js (App Router, Tailwind v4, TypeScript). Ver `README.md` para la estructura.

- El contenido (galería, opinión, datos del sitio) vive en `src/content/` y está en español; la interfaz también.
- Fotos de la galería: solo producto (sin personas), de Unsplash (`urlFoto(id)` en `galeria.ts`, con `credito` a la página original); `next.config.ts` permite `images.unsplash.com`. Nunca fotos de catálogos de marcas.
- Logo: `public/logo.png` (PNG con fondo transparente, 932×347) a través de `src/components/Logo.tsx`; los iconos de app se derivan de la figura del logo. Si el usuario da un logo nuevo, hay que regenerar ambos.
- La portada (`/`) son tres escenas a pantalla completa (inicio, galería, blog «Por Laura») en `src/components/escenas/`; no se hace scroll continuo entre ellas: cada una se difumina para dar paso a la siguiente. Las páginas interiores con cabecera y pie están en `src/app/(secciones)/`.
- La intro de entrada (`Intro.tsx`) compone el logo final con `simbolo.png` + `logo.png` recortado por `clip-path`; si cambia el logo hay que revisar esos porcentajes.
- Símbolo de fondo de la portada: `public/simbolo.png` (la figura recortada del logo). Si cambia el logo, regenerarlo también.
- Valoraciones de lectores (1-5 estrellas por visitante) en Upstash Redis vía `src/lib/valoraciones.ts` y `/api/valoraciones`; sin variables de entorno usa memoria. "Nuestra nota" (`valoracion` en `galeria.ts`) es la de Laura (la autora) y no se mezcla con la de los lectores.
- La barra de marcas de la portada (`src/content/marcas.ts`) es solo nombres. Todavía no hay sección de ofertas ni de marcas como tal: el usuario la quiere más adelante, no la añadas sin que la pida.
- Página «Para marcas» (`/para-marcas`): es el media kit. Textos y cifras en `src/content/paraMarcas.ts`; las cifras a `null` no se pintan y la página lo dice con honestidad. Se imprime a PDF con los estilos `@media print` de `globals.css` (clase `no-imprimir` para lo que no debe salir).
- Newsletter: `src/lib/newsletter.ts` + `/api/newsletter` + `src/components/Newsletter.tsx` (pie y escena del blog). Guarda correo, fecha y origen en el mismo Redis que las valoraciones (`src/lib/redis.ts`); sin variables, en memoria.
- Analítica: `src/components/Analitica.tsx` carga Plausible solo si existe `NEXT_PUBLIC_ANALITICA_DOMINIO`. Es sin cookies, y las páginas legales se adaptan a esa variable. No añadas Google Analytics sin banner de consentimiento.
- El botón «Ver en la tienda» sale de `pieza.compra` o, si no, de la tienda de la marca en `src/content/tiendas.ts`.
- Afiliación: la web está aceptada en Awin (septiembre de 2026). `src/content/afiliados.ts` guarda el ID de publisher y los ID de anunciante por marca; `compra` en una pieza pinta el botón «Ver en la tienda» en su ficha y pasa por Awin (`rel="sponsored"` + aviso) si la marca tiene programa. `legal.afiliados` está a `true`.


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
