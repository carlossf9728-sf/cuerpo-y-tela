import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articulos, getArticulo } from "@/content/opinion";
import { getPieza } from "@/content/galeria";
import { site } from "@/content/site";
import { PiezaCard } from "@/components/PiezaCard";

export function generateStaticParams() {
  return articulos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/opinion/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticulo(slug);
  if (!a) return {};
  return { title: a.titulo, description: a.resumen };
}

const fmt = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" });

export default async function ArticuloPage({ params }: PageProps<"/opinion/[slug]">) {
  const { slug } = await params;
  const articulo = getArticulo(slug);
  if (!articulo) notFound();

  const piezasRel = (articulo.piezasRelacionadas ?? []).map(getPieza).filter((p) => p !== undefined);

  return (
    <article className="container-editorial py-12">
      <Link href="/#blog" className="text-sm text-humo hover:text-arcilla">← Volver a «{site.autora.blog}»</Link>

      <header className="mx-auto mt-8 max-w-2xl">
        <p className="eyebrow">Por {site.autora.nombre} · {articulo.tema} · {articulo.minutos} min · {fmt.format(new Date(articulo.fecha))}</p>
        <h1 className="mt-3 font-display text-5xl leading-[1.02] md:text-6xl">{articulo.titulo}</h1>
        <p className="mt-5 text-xl text-humo">{articulo.resumen}</p>
      </header>

      <div className="mx-auto mt-10 max-w-2xl space-y-8">
        {articulo.secciones.map((s, i) => (
          <section key={i}>
            {s.titulo && <h2 className="mb-3 font-display text-3xl">{s.titulo}</h2>}
            {s.parrafos.map((p, j) => (
              <p key={j} className="mb-4 text-lg leading-relaxed">{p}</p>
            ))}
          </section>
        ))}
      </div>

      {piezasRel.length > 0 && (
        <section className="mt-20">
          <p className="eyebrow mb-8">Piezas de la galería relacionadas</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6">
            {piezasRel.map((p) => <PiezaCard key={p.slug} pieza={p} />)}
          </div>
        </section>
      )}
    </article>
  );
}
