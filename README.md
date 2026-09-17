# Cuerpo y Tela

Web de moda femenina con opinión: una galería de productos (solo producto, sin modelos)
con marca, valoración de 1 a 5 estrellas, opinión y con qué combinarlos, y artículos de opinión sobre moda.

## Arrancar

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Dónde está cada cosa

| Quiero…                          | Archivo                                  |
| -------------------------------- | ---------------------------------------- |
| Cambiar nombre, email, redes     | `src/content/site.ts`                    |
| Añadir o editar piezas de la galería | `src/content/galeria.ts`             |
| Añadir o editar artículos de opinión | `src/content/opinion.ts`             |
| Colores y tipografías            | `src/app/globals.css`                    |
| Logo (cabecera, portada y pie)   | `public/logo.png` (fondo transparente) vía `src/components/Logo.tsx` |
| Icono de la app / favicon        | `src/app/icon.png`, `src/app/apple-icon.png`, `public/icon-*.png` |
| Menú de navegación (páginas interiores) | `src/components/Header.tsx`       |
| Marcas de la barra en movimiento | `src/content/marcas.ts`                  |
| Quién firma el blog (Ana Laura)  | `src/content/site.ts` (`autora`)         |
| Reglas del test "¿Qué te pones hoy?" | `src/lib/recomendar.ts`              |
| Símbolo de fondo de la portada   | `public/simbolo.png` (figura del logo, fondo transparente) |

### Añadir una pieza a la galería

1. Copia un bloque de `src/content/galeria.ts` y cambia el `slug` (único, sin espacios ni acentos).
2. Pon la foto:
   - **Foto propia**: guárdala en `public/galeria/<nombre>.jpg` y escribe `foto: "/galeria/<nombre>.jpg"`.
   - **Foto de Unsplash**: copia el id de la imagen (`photo-...`) en `foto` y la URL de la página de la foto en `credito`.
3. Rellena `marca` (si no se ve en la foto: `"Marca no identificada"`), `valoracion` (1 a 5), `opinion` y `combina`.
4. `destacada: true` para que salga en la portada.

### Fotos y legalidad

- Las fotos actuales son de [Unsplash](https://unsplash.com/license): licencia gratuita para uso comercial, sin permiso ni atribución obligatoria (la ponemos igualmente como crédito).
- Son fotos **solo de producto**, sin personas, para evitar problemas de derechos de imagen.
- **No uses fotos de las webs de las marcas** (Zara, Mango…) sin permiso escrito: tienen copyright. Nombrar la marca en una reseña sí es legal.
- Cuando tengas fotos propias, sustitúyelas como se explica arriba.

Los tipos disponibles (Vestidos, Abrigos, Faldas…) están en la lista `tipos` del mismo archivo; añade uno nuevo ahí si lo necesitas.

### Añadir un artículo de opinión

Copia un bloque de `src/content/opinion.ts`. `piezasRelacionadas` enlaza el artículo con piezas de la galería por su `slug`.

## Páginas

- `/` portada en tres **escenas** a pantalla completa que no se recorren de seguido: al llegar al final de una y seguir bajando (rueda, flechas, deslizar o el botón), la escena se difumina y aparece la siguiente.
  1. **Inicio**: símbolo de Cuerpo y Tela de fondo, barra de marcas en movimiento y el test "¿Qué te pones hoy?" (tres respuestas → una pieza de la galería).
  2. **Galería**: todas las piezas agrupadas por tipo, con buscador, filtro por marca y orden; al tocar una se abre una ficha lateral con la opinión y con qué combinarla.
  3. **Blog de Ana Laura**: novedad, resto de artículos y sus recomendaciones (las piezas con cinco estrellas).
  Se puede entrar directamente en una escena con `/#galeria` o `/#blog` (es lo que usan el menú y el pie de las páginas interiores).
  Todo esto vive en `src/components/escenas/`.
- `/galeria` la galería suelta, con cabecera y pie (`/galeria?pieza=<slug>` abre una pieza)
- `/opinion` listado · `/opinion/<slug>` artículo
- `/sobre`

Las páginas interiores están en `src/app/(secciones)/` y comparten cabecera y pie; la portada no los usa (tiene su propia barra).

## Hacia la app

- La web ya es instalable como PWA (`src/app/manifest.ts`): en el móvil, "Añadir a pantalla de inicio". El icono es la figura del logo sobre fondo lino.
- Todo el contenido vive en `src/content/`, separado de la interfaz: es lo que se movería a una base de datos o API cuando exista la app.

## Publicar

```bash
npm run build
```

Se despliega directamente en Vercel o Netlify subiendo esta carpeta (o el repositorio de git).
