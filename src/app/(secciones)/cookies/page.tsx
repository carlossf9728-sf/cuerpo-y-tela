import type { Metadata } from "next";
import Link from "next/link";
import { legal } from "@/content/legal";
import { site } from "@/content/site";
import { PaginaLegal } from "@/components/PaginaLegal";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: `Qué cookies y almacenamiento local usa ${site.nombre}.`,
};

export default function CookiesPage() {
  const analitica = Boolean(process.env.NEXT_PUBLIC_ANALITICA_DOMINIO);

  return (
    <PaginaLegal eyebrow="Legal" titulo="Política de cookies">
      <p>
        {site.nombre} <strong>no utiliza cookies propias</strong> ni cookies de publicidad o redes sociales. {analitica
          ? "Las estadísticas de visitas se miden con Plausible Analytics, que tampoco usa cookies ni identifica a nadie. "
          : ""}Por eso no verás ningún banner pidiendo consentimiento: no hay nada que consentir.
      </p>

      <h2>1. Qué guarda la web en tu navegador</h2>
      <p>
        La web usa el <em>almacenamiento local</em> del navegador (una tecnología similar a las cookies, pero que no se envía con cada petición) únicamente para funciones técnicas que el propio usuario activa. Según la normativa (art. 22.2 LSSI-CE y guía de la AEPD), este uso técnico no requiere consentimiento.
      </p>
      <ul>
        <li><strong>cyt:votante</strong>: identificador aleatorio que se crea cuando votas una prenda por primera vez, para contar tu voto una sola vez y permitirte cambiarlo. No contiene ningún dato personal. Se conserva hasta que borres los datos del sitio.</li>
        <li><strong>cyt:votos</strong>: las puntuaciones que has dado, para mostrártelas al volver. Se conserva hasta que borres los datos del sitio.</li>
        <li><strong>cyt:intro</strong>: marca que indica que ya has visto la animación de entrada, para no repetirla en la misma visita. Se borra al cerrar el navegador.</li>
      </ul>

      <h2>2. Cookies de terceros</h2>
      <p>
        Las fotografías se cargan desde Unsplash y la web se sirve desde Vercel; estas peticiones son necesarias para mostrar la página y, según nuestro conocimiento, no instalan cookies de seguimiento. Si en el futuro se incorporan servicios que sí las usen, esta política se actualizará y, cuando sea necesario, se pedirá consentimiento.
      </p>
      {legal.afiliados && (
        <p>
          Al pulsar un enlace de afiliado hacia una tienda, la red de afiliación y la tienda pueden instalar cookies en su propio dominio para atribuir la compra. Esas cookies no las controla {site.nombre} y se rigen por las políticas de cada tienda.
        </p>
      )}

      <h2>3. Cómo borrar estos datos</h2>
      <p>
        Puedes eliminar el almacenamiento local desde la configuración de tu navegador (normalmente en «Privacidad» → «Datos de sitios web» o «Borrar datos de navegación»), o bloquearlo para este sitio. La web seguirá funcionando; solo perderás la posibilidad de cambiar tus votos.
      </p>

      <p>Más información sobre el tratamiento de datos en la <Link href="/privacidad">política de privacidad</Link> y en el <Link href="/aviso-legal">aviso legal</Link>.</p>
    </PaginaLegal>
  );
}
