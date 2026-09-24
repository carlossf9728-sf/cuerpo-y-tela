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
| Titular, NIF y dirección (aviso legal) y aviso de afiliados | `src/content/legal.ts` |
| Quién firma el blog y su nombre («Por Laura») | `src/content/site.ts` (`autora`) |
| ID de Awin y programas de afiliado por marca | `src/content/afiliados.ts`      |
| Reglas del test "¿Qué te pones hoy?" | `src/lib/recomendar.ts`              |
| Símbolo de fondo de la portada   | `public/simbolo.png` (figura del logo, fondo transparente) |
| Cifras y textos del media kit («Para marcas») | `src/content/paraMarcas.ts`     |
| Tienda oficial de cada marca (botón «Ver en la tienda») | `src/content/tiendas.ts` |
| Imagen que se ve al compartir el enlace | `src/app/opengraph-image.png`       |
| Variables de entorno (base de datos, analítica, newsletter) | `.env.example`  |

### Enlaces de compra (afiliado)

El botón «Ver en la tienda» de cada ficha sale solo si sabemos a dónde enviar:

1. `compra: "https://…"` en la pieza (tiene prioridad), o
2. la tienda de su marca en `src/content/tiendas.ts` (así todas las piezas de Nike, Levi's, etc. tienen botón sin escribir nada pieza a pieza).

Las piezas con marca «Marca no identificada» no llevan botón, a propósito. Si la marca está en `programas` de `src/content/afiliados.ts` (con tu `publisherId` de Awin), el enlace pasa por Awin y se marca como de afiliado con su aviso.

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
  3. **«Por Laura»** (el blog): novedad, resto de artículos y sus recomendaciones (las piezas con cinco estrellas).
  Se puede entrar directamente en una escena con `/#galeria` o `/#blog` (es lo que usan el menú y el pie de las páginas interiores).
  Al entrar por primera vez en la visita hay una **intro** de unos 5 segundos hecha con código (`src/components/escenas/Intro.tsx`): las letras C·Y·T se dibujan, aparece la figura y el logo vuela hasta la cabecera. Se salta con un toque y no se muestra a quien tiene "reducir movimiento" ni al entrar por `/#galeria` o `/#blog`.
  Todo esto vive en `src/components/escenas/`.
- `/galeria` la galería suelta, con cabecera y pie (`/galeria?pieza=<slug>` abre una pieza)
- `/opinion` listado · `/opinion/<slug>` artículo
- `/sobre`
- `/para-marcas` el media kit: qué ofreces a las marcas, cifras, formatos, normas y contacto. Se guarda como PDF con el botón «Descargar en PDF» (usa los estilos de impresión de `globals.css`).
- `/aviso-legal`, `/privacidad`, `/cookies` (textos legales; los datos del titular se rellenan en `src/content/legal.ts`)

Las páginas interiores están en `src/app/(secciones)/` y comparten cabecera y pie; la portada no los usa (tiene su propia barra).

## Valoraciones de los lectores

Cada visitante puede dar de 1 a 5 estrellas a una pieza desde su ficha (un voto por navegador, se puede cambiar). Se muestra junto a "nuestra nota", que sigue viniendo de `galeria.ts`.

- Código: `src/lib/valoraciones.ts` (almacén), `src/lib/useValoraciones.ts` (navegador), `src/components/ValoracionLectores.tsx` (interfaz) y las rutas `src/app/api/valoraciones/`.
- Los votos se guardan en **Upstash Redis**. En Vercel: proyecto → **Storage** → *Create Database* → **Upstash Redis** (plan gratuito) → conectar al proyecto. La integración crea sola las variables `KV_REST_API_URL` y `KV_REST_API_TOKEN` (o `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`); hay que volver a desplegar después.
- Sin esas variables (por ejemplo en local) los votos se guardan en memoria y se pierden al reiniciar: sirve para probar.

## Newsletter

El formulario está en el pie de las páginas interiores y en la escena del blog (`src/components/Newsletter.tsx`). Guarda el correo, la fecha y desde dónde se apuntó, en la misma base de datos que las valoraciones (`src/lib/newsletter.ts`).

- Pide consentimiento con casilla y enlace a la política de privacidad: es obligatorio y ya está puesto.
- Para descargar la lista: define `NEWSLETTER_CLAVE` en las variables de entorno y abre `https://tu-dominio/api/newsletter?clave=LA-CLAVE` (devuelve un CSV). Sin esa variable, la descarga no existe.
- Para dar de baja a alguien: `DELETE /api/newsletter?email=...`, o bórralo desde el panel de Upstash.

## Estadísticas de visitas

Sin cifras no hay conversación posible con una marca, así que conviene medir desde el primer día.

1. Date de alta en [Plausible](https://plausible.io) (o monta uno propio) con el dominio `cuerpoytela.com`.
2. En Vercel → Settings → Environment Variables, añade `NEXT_PUBLIC_ANALITICA_DOMINIO=cuerpoytela.com` y vuelve a desplegar.
3. Da de alta la web también en [Google Search Console](https://search.google.com/search-console) para ver por qué te encuentran.

Plausible **no usa cookies** ni recoge datos personales: por eso la web sigue sin banner de consentimiento y las páginas legales se ajustan solas cuando activas la variable. **No pongas Google Analytics**: usa cookies y obligaría a poner banner y a rehacer los textos legales.

## Posicionamiento (SEO)

- `src/app/sitemap.ts` genera `/sitemap.xml` con todas las páginas indexables; `src/app/robots.ts` genera `/robots.txt` (el aviso legal queda fuera del índice porque lleva datos fiscales).
- `src/app/opengraph-image.png` es la imagen que aparece al compartir el enlace en WhatsApp, Instagram o un correo a una marca. Se regenera desde el logo si cambia la identidad.

## Hacia la app

- La web ya es instalable como PWA (`src/app/manifest.ts`): en el móvil, "Añadir a pantalla de inicio". El icono es la figura del logo sobre fondo lino.
- Todo el contenido vive en `src/content/`, separado de la interfaz: es lo que se movería a una base de datos o API cuando exista la app.

## Publicar

```bash
npm run build
```

Se despliega directamente en Vercel o Netlify subiendo esta carpeta (o el repositorio de git).
