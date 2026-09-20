import type { Metadata } from "next";
import Link from "next/link";
import { legal } from "@/content/legal";
import { site } from "@/content/site";
import { PaginaLegal } from "@/components/PaginaLegal";
import { Nif } from "@/components/Nif";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: `Aviso legal y condiciones de uso de ${site.nombre}.`,
  // Accesible desde el pie, pero fuera de los buscadores.
  robots: { index: false, follow: false },
};

export default function AvisoLegalPage() {
  return (
    <PaginaLegal eyebrow="Legal" titulo="Aviso legal">
      <h2>1. Titular de la web</h2>
      <p>
        En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que el sitio web <strong>{site.url.replace("https://", "")}</strong> (en adelante, «la web») es titularidad de:
      </p>
      <ul data-nosnippet="">
        <li>Titular: {legal.titular}</li>
        <li>NIF: <Nif valor={legal.nif} /></li>
        <li>Domicilio: {legal.domicilio}</li>
        <li>Correo electrónico: <a href={`mailto:${site.email}`}>{site.email}</a></li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        {site.nombre} es una publicación personal de opinión sobre moda. Muestra una galería de prendas y accesorios con la valoración de la autora y de los lectores, y artículos de opinión. No vende productos ni intermedia en compras: cualquier compra que el usuario haga en tiendas de terceros se rige por las condiciones de esas tiendas.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El acceso a la web es libre y gratuito. El usuario se compromete a hacer un uso adecuado de sus contenidos y, en particular, a no utilizarlos para fines ilícitos, a no intentar acceder a áreas restringidas o alterar el funcionamiento de la web, y a no introducir contenidos ofensivos o que vulneren derechos de terceros a través de las funciones participativas (valoraciones).
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Los textos, el diseño, el logotipo y el símbolo de {site.nombre} son propiedad de su titular y están protegidos por la legislación de propiedad intelectual. Queda prohibida su reproducción, distribución o transformación sin autorización expresa, salvo la cita breve con mención de la fuente.
      </p>
      <p>
        Las fotografías de la galería proceden de <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">Unsplash</a>, bajo su licencia de uso libre, y cada ficha enlaza a la fotografía original como crédito. Las marcas comerciales que se mencionan (nombres de marcas de moda) pertenecen a sus respectivos titulares; se citan únicamente con fines descriptivos y de opinión, sin que ello implique relación, patrocinio o respaldo alguno por parte de esas marcas.
      </p>

      <h2>5. Opiniones y responsabilidad</h2>
      <p>
        Las valoraciones y comentarios publicados son opiniones personales de la autora, y las valoraciones de los lectores reflejan la opinión de quienes votan. No constituyen asesoramiento profesional. El titular no garantiza la disponibilidad, precio o características de los productos mencionados, que pueden cambiar sin previo aviso, ni responde de los contenidos de las webs de terceros a las que se enlace.
      </p>
      <p>
        El titular procura que la web funcione correctamente, pero no puede garantizar la ausencia de interrupciones o errores, y no será responsable de los daños derivados del uso de la web o de la imposibilidad de usarla.
      </p>

      {legal.afiliados && (
        <>
          <h2>6. Enlaces de afiliado</h2>
          <p>
            Algunos enlaces a tiendas son enlaces de afiliado: si el usuario compra a través de ellos, {site.nombre} puede recibir una pequeña comisión de la tienda, sin coste adicional para el usuario. Esto no influye en las opiniones publicadas, que son independientes.
          </p>
        </>
      )}

      <h2>{legal.afiliados ? "7" : "6"}. Protección de datos y cookies</h2>
      <p>
        El tratamiento de los datos personales se describe en la <Link href="/privacidad">política de privacidad</Link>, y el uso de cookies y tecnologías similares en la <Link href="/cookies">política de cookies</Link>.
      </p>

      <h2>{legal.afiliados ? "8" : "7"}. Legislación aplicable</h2>
      <p>
        Este aviso legal se rige por la legislación española. Para cualquier controversia, y siempre que la normativa de consumidores no disponga otra cosa, las partes se someten a los juzgados y tribunales del domicilio del titular.
      </p>
    </PaginaLegal>
  );
}
