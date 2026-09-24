import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { paraMarcas, cifrasDisponibles } from "@/content/paraMarcas";
import { articulos } from "@/content/opinion";
import { piezas } from "@/content/galeria";
import { BotonImprimir } from "@/components/BotonImprimir";

export const metadata: Metadata = {
  title: "Para marcas",
  description: `Colaboraciones, formatos y condiciones de ${site.nombre}: qué ofrecemos a las marcas y cómo trabajamos.`,
  openGraph: { title: `Para marcas · ${site.nombre}`, description: "Media kit: público, formatos de colaboración y condiciones." },
};

const mesLargo = new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric" });
const numero = new Intl.NumberFormat("es-ES");

export default function ParaMarcasPage() {
  const cifras = cifrasDisponibles();
  const [anio, mes] = paraMarcas.cifrasFecha.split("-").map(Number);
  const fechaCifras = mesLargo.format(new Date(anio, mes - 1, 1));
  const activos = paraMarcas.activos.map((a) =>
    a.etiqueta.startsWith("prendas") ? { ...a, valor: String(piezas.length) }
    : a.etiqueta.startsWith("artículos") ? { ...a, valor: String(articulos.length) }
    : a,
  );

  return (
    <section className="container-editorial py-14">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Media kit</p>
        <h1 className="mt-2 font-display text-5xl leading-[1.02] md:text-6xl">
          Trabajar con <em className="text-arcilla">{site.nombre}</em>
        </h1>
        <p className="mt-6 text-lg leading-relaxed">{paraMarcas.propuesta}</p>

        <div className="no-imprimir mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${site.email}?subject=Colaboraci%C3%B3n%20con%20${encodeURIComponent(site.nombre)}`} className="rounded-full bg-tinta px-6 py-3 text-sm text-lino transition-colors hover:bg-arcilla">
            Escribir a {site.email}
          </a>
          <BotonImprimir />
        </div>

        {/* Quiénes somos y a quién llegamos */}
        <div className="mt-14 grid gap-10 border-t border-arena/70 pt-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">Qué es esta web</h2>
            <p className="mt-3 leading-relaxed text-humo">
              Una galería de moda femenina en la que cada prenda lleva marca, nota de 1 a 5 estrellas, una opinión corta y con qué combinarla; y «{site.autora.blog}», el blog donde {site.autora.nombre} escribe sobre cómo vestir sin seguir la corriente.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl">A quién llega</h2>
            <ul className="mt-3 space-y-2 text-humo">
              {paraMarcas.publico.map((p) => (
                <li key={p} className="flex gap-2"><span aria-hidden="true" className="text-arcilla">—</span><span>{p}</span></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cifras */}
        <div className="mt-14 border-t border-arena/70 pt-10">
          <h2 className="font-display text-3xl">Los números</h2>
          {cifras.length > 0 ? (
            <>
              <ul className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
                {cifras.map((c) => (
                  <li key={c.etiqueta}>
                    <p className="font-display text-4xl leading-none">{numero.format(c.valor)}</p>
                    <p className="mt-1 text-sm text-humo">{c.etiqueta}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-humo">Datos de {fechaCifras}. Se actualizan cada mes.</p>
            </>
          ) : (
            <p className="mt-3 leading-relaxed text-humo">
              La web es joven y preferimos no dar cifras hasta tener un par de meses completos medidos. Pídenoslas por correo y te mandamos el dato exacto del mes en curso, con la captura de la analítica.
            </p>
          )}
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {activos.map((a) => (
              <li key={a.etiqueta} className="border-l border-arcilla/40 pl-4">
                <p className="font-display text-3xl leading-none">{a.valor}</p>
                <p className="mt-1 text-sm text-humo">{a.etiqueta}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Formatos */}
        <div className="mt-14 border-t border-arena/70 pt-10">
          <h2 className="font-display text-3xl">Qué podemos hacer</h2>
          <ul className="mt-6 space-y-6">
            {paraMarcas.formatos.map((f) => (
              <li key={f.titulo} className="grid gap-1 md:grid-cols-[14rem_1fr] md:gap-6">
                <h3 className="font-display text-xl leading-snug">{f.titulo}</h3>
                <p className="leading-relaxed text-humo">{f.texto}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Normas */}
        <div className="mt-14 rounded-2xl border border-arcilla/30 bg-arcilla/5 p-6 md:p-8">
          <p className="eyebrow !text-arcilla">Cómo trabajamos</p>
          <h2 className="mt-2 font-display text-3xl">Las reglas, por delante</h2>
          <ul className="mt-5 space-y-3">
            {paraMarcas.normas.map((n) => (
              <li key={n} className="flex gap-3 leading-relaxed"><span aria-hidden="true" className="text-arcilla">✓</span><span>{n}</span></li>
            ))}
          </ul>
        </div>

        {/* Proceso */}
        <div className="mt-14 border-t border-arena/70 pt-10">
          <h2 className="font-display text-3xl">Cómo empezamos</h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {paraMarcas.proceso.map((p) => (
              <li key={p.paso}>
                <p className="font-display text-4xl leading-none text-arcilla">{p.paso}</p>
                <p className="mt-2 text-sm leading-relaxed text-humo">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Contacto */}
        <div className="mt-14 border-t border-arena/70 pt-10">
          <h2 className="font-display text-3xl">Contacto</h2>
          <dl className="mt-5 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-[8rem_1fr]">
            <dt className="text-humo">Correo</dt>
            <dd><a href={`mailto:${site.email}`} className="underline hover:text-arcilla">{site.email}</a></dd>
            <dt className="text-humo">Web</dt>
            <dd><a href={site.url} className="underline hover:text-arcilla">{site.url.replace("https://", "")}</a></dd>
            <dt className="text-humo">Instagram</dt>
            <dd><a href={site.instagram} target="_blank" rel="noreferrer" className="underline hover:text-arcilla">@cuerpoytela</a></dd>
            <dt className="text-humo">TikTok</dt>
            <dd><a href={site.tiktok} target="_blank" rel="noreferrer" className="underline hover:text-arcilla">@cuerpo.y.tela</a></dd>
            <dt className="text-humo">Afiliación</dt>
            <dd>Publisher en Awin</dd>
            <dt className="text-humo">Datos fiscales</dt>
            <dd><Link href="/aviso-legal" className="underline hover:text-arcilla">En el aviso legal</Link></dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
