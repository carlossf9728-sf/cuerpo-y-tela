"use client";

import Image from "next/image";
import Link from "next/link";
import { piezas, urlFoto, type Pieza } from "@/content/galeria";
import { articulos } from "@/content/opinion";
import { site } from "@/content/site";
import { ArticuloCard } from "@/components/ArticuloCard";
import { Estrellas } from "@/components/Estrellas";
import { Footer } from "@/components/Footer";
import { IconoBlog } from "@/components/IconoBlog";

const fmt = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" });

// Tercera escena: «Por Laura», el blog. Novedades, el resto de artículos
// y sus recomendaciones de la galería.
export function Blog({ alSubir, alGaleria }: { alSubir: () => void; alGaleria: (p: Pieza) => void }) {
  const ordenados = [...articulos].sort((a, b) => b.fecha.localeCompare(a.fecha));
  const [ultimo, ...resto] = ordenados;
  const recomendadas = piezas.filter((p) => p.valoracion === 5).slice(0, 4);
  const temas = Array.from(new Set(articulos.map((a) => a.tema)));

  return (
    <div className="flex min-h-full flex-col">
      <div className="container-editorial pt-24 md:pt-28">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-end">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-tinta text-lino md:h-28 md:w-28">
            <IconoBlog className="h-14 w-14 md:h-16 md:w-16" />
          </div>
          <div>
            <p className="eyebrow">El blog</p>
            <h1 className="mt-2 font-display text-5xl leading-none md:text-7xl">{site.autora.blog}</h1>
            <p className="mt-4 max-w-xl text-lg text-humo">{site.autora.bio}</p>
            <p className="mt-3 text-xs text-humo">Escribe sobre: {temas.join(" · ")}</p>
          </div>
        </div>

        {/* Novedad: el último artículo, a lo grande. */}
        <section className="mt-16 border-t border-tinta/20 pt-8">
          <p className="eyebrow mb-4"><span className="text-arcilla">●</span> Novedad · {fmt.format(new Date(ultimo.fecha))}</p>
          <Link href={`/opinion/${ultimo.slug}`} className="group grid gap-6 md:grid-cols-[2fr_1fr] md:items-end">
            <h2 className="font-display text-4xl leading-[1.02] group-hover:text-arcilla md:text-6xl">{ultimo.titulo}</h2>
            <div>
              <p className="text-humo">{ultimo.resumen}</p>
              <p className="mt-4 text-xs uppercase tracking-widest text-arcilla">{ultimo.tema} · {ultimo.minutos} min · Leer →</p>
            </div>
          </Link>
        </section>

        <div className="mt-16 grid gap-16 lg:grid-cols-[2fr_1fr]">
          <section>
            <p className="eyebrow mb-2">Más artículos</p>
            <div className="grid gap-x-10 sm:grid-cols-2">
              {resto.map((a) => <ArticuloCard key={a.slug} articulo={a} />)}
            </div>
          </section>

          <aside>
            <p className="eyebrow mb-2">Las recomendaciones de {site.autora.nombre}</p>
            <p className="mb-6 text-sm text-humo">Las piezas de la galería a las que ha dado cinco estrellas.</p>
            <ul className="space-y-4">
              {recomendadas.map((p) => (
                <li key={p.slug}>
                  <button type="button" onClick={() => alGaleria(p)} className="group flex w-full items-center gap-4 text-left">
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-arena">
                      <Image src={urlFoto(p.foto, 300)} alt="" fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="min-w-0">
                      <p className="eyebrow truncate">{p.marca}</p>
                      <p className="truncate font-display text-xl leading-tight group-hover:text-arcilla">{p.nombre}</p>
                      <Estrellas valor={p.valoracion} className="text-xs" />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-tinta p-6 text-lino">
              <p className="font-display text-2xl italic">¿Tienes una prenda que no sabes cómo llevar?</p>
              <p className="mt-2 text-sm text-lino/70">Escríbele a {site.autora.nombre} y puede que acabe en el blog.</p>
              <a href={`mailto:${site.email}`} className="mt-4 inline-block rounded-full border border-lino/40 px-5 py-2 text-sm hover:border-lino">
                {site.email}
              </a>
            </div>
          </aside>
        </div>

        <div className="mt-20 flex justify-center">
          <button type="button" onClick={alSubir} className="text-sm text-humo hover:text-arcilla">↑ Volver al inicio</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
