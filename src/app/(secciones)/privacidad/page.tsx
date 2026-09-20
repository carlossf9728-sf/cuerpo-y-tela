import type { Metadata } from "next";
import Link from "next/link";
import { legal } from "@/content/legal";
import { site } from "@/content/site";
import { PaginaLegal } from "@/components/PaginaLegal";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Cómo trata ${site.nombre} los datos personales.`,
};

export default function PrivacidadPage() {
  return (
    <PaginaLegal eyebrow="Legal" titulo="Política de privacidad">
      <p>
        Esta política explica qué datos se tratan al usar {site.nombre}, para qué y con qué derechos cuenta el usuario, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD). La web está pensada para tratar la menor cantidad posible de datos: no hay registro de usuarios, ni formularios, ni herramientas de analítica o publicidad.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>Titular: {legal.titular}</li>
        <li>NIF: {legal.nif}</li>
        <li>Domicilio: {legal.domicilio}</li>
        <li>Correo electrónico: <a href={`mailto:${site.email}`}>{site.email}</a></li>
      </ul>

      <h2>2. Qué datos se tratan y para qué</h2>
      <p><strong>Contacto por correo electrónico.</strong> Si el usuario escribe a {site.email}, se tratan su dirección de correo, su nombre si lo indica y el contenido del mensaje, con la única finalidad de responderle. Base jurídica: el consentimiento del usuario al escribir (art. 6.1.a RGPD). Los mensajes se conservan mientras dure la conversación y, como máximo, un año después.</p>
      <p><strong>Valoraciones de los lectores.</strong> Al votar una prenda, la web guarda en el navegador del usuario un identificador aleatorio (sin nombre, correo ni ningún dato que lo identifique) y, en nuestra base de datos, ese identificador junto con la puntuación dada a cada prenda. Sirve solo para contar cada voto una vez y permitir cambiarlo. No se asocia a ninguna persona ni se combina con otros datos. Base jurídica: el interés legítimo en que las valoraciones sean fiables (art. 6.1.f RGPD). Estos datos se conservan mientras la web ofrezca valoraciones.</p>
      <p><strong>Datos técnicos de navegación.</strong> Al cargar la web, el proveedor de alojamiento recibe, como cualquier servidor, la dirección IP y datos técnicos de la petición (navegador, página solicitada) para poder servir la página y protegerla frente a abusos. Base jurídica: interés legítimo (art. 6.1.f RGPD). Se conservan durante el tiempo limitado que establecen los registros técnicos del proveedor.</p>

      <h2>3. Destinatarios y encargados del tratamiento</h2>
      <p>No se ceden datos a terceros salvo obligación legal. Para funcionar, la web utiliza estos proveedores, que actúan como encargados del tratamiento con las garantías del RGPD:</p>
      <ul>
        <li><strong>Vercel Inc.</strong> (Estados Unidos): alojamiento y entrega de la web. Vercel está adherido al Marco de Privacidad de Datos UE-EE. UU. y aplica cláusulas contractuales tipo. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">Política de privacidad de Vercel</a>.</li>
        <li><strong>Upstash Inc.</strong>: base de datos donde se almacenan las valoraciones, alojada en la Unión Europea (Fráncfort). <a href="https://upstash.com/trust/privacy.pdf" target="_blank" rel="noreferrer">Política de privacidad de Upstash</a>.</li>
        <li><strong>Unsplash</strong>: las fotografías de la galería se cargan desde sus servidores, que reciben la petición técnica (incluida la dirección IP) necesaria para mostrarlas. <a href="https://unsplash.com/privacy" target="_blank" rel="noreferrer">Política de privacidad de Unsplash</a>.</li>
        <li><strong>Google (Gmail)</strong>: el correo de contacto se gestiona en Gmail, por lo que los mensajes se almacenan en los servidores de Google.</li>
      </ul>
      <p>Las tipografías de la web se sirven desde nuestros propios servidores, sin conexión a Google Fonts. No se utilizan herramientas de analítica, publicidad ni redes sociales integradas.</p>

      {legal.afiliados && (
        <>
          <h2>4. Enlaces de afiliado</h2>
          <p>
            Algunos enlaces a tiendas son enlaces de afiliado. Al pulsarlos, la red de afiliación y la tienda pueden instalar cookies en el navegador del usuario para atribuir la posible compra; esas cookies son de terceros y se rigen por sus propias políticas. {site.nombre} solo recibe datos agregados (número de clics y comisiones), nunca la identidad del comprador.
          </p>
        </>
      )}

      <h2>{legal.afiliados ? "5" : "4"}. Derechos del usuario</h2>
      <p>
        El usuario puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a <a href={`mailto:${site.email}`}>{site.email}</a>, indicando el derecho que ejerce. En el caso de las valoraciones, como no podemos saber qué identificador corresponde a qué persona, el usuario puede borrar su identificador y sus votos eliminando los datos de este sitio en su navegador. También puede presentar una reclamación ante la <a href="https://www.aepd.es" target="_blank" rel="noreferrer">Agencia Española de Protección de Datos</a>.
      </p>

      <h2>{legal.afiliados ? "6" : "5"}. Menores</h2>
      <p>La web no está dirigida a menores de 14 años ni recoge conscientemente datos de ellos.</p>

      <h2>{legal.afiliados ? "7" : "6"}. Cambios</h2>
      <p>Esta política puede actualizarse para reflejar cambios en la web o en la normativa. La fecha de la última revisión figura al principio. El uso de cookies y tecnologías similares se detalla en la <Link href="/cookies">política de cookies</Link>.</p>
    </PaginaLegal>
  );
}
