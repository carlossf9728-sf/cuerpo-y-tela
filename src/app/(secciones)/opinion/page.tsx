import type { Metadata } from "next";
import { articulos } from "@/content/opinion";
import { ArticuloCard } from "@/components/ArticuloCard";

export const metadata: Metadata = {
  title: "Opinión",
  description: "Artículos de opinión sobre moda: tela, tendencias, básicos y cómo vestir para tu cuerpo.",
};

export default function OpinionPage() {
  const ordenados = [...articulos].sort((a, b) => b.fecha.localeCompare(a.fecha));
  return (
    <section className="container-editorial py-14">
      <p className="eyebrow">Lo que pensamos</p>
      <h1 className="mt-2 font-display text-5xl leading-none md:text-6xl">Opinión</h1>
      <p className="mt-4 max-w-xl text-humo">
        Lo que pensamos de la moda, dicho claro. Tela, tendencias, básicos y cuerpo.
      </p>
      <div className="mt-12 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
        {ordenados.map((a) => <ArticuloCard key={a.slug} articulo={a} />)}
      </div>
    </section>
  );
}
