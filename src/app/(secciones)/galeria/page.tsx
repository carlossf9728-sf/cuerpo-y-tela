import type { Metadata } from "next";
import { piezas } from "@/content/galeria";
import { Galeria } from "@/components/Galeria";

export const metadata: Metadata = {
  title: "Galería",
  description: "Galería de productos de moda femenina con marca, valoración y con qué combinarlos.",
};

export default async function GaleriaPage({ searchParams }: PageProps<"/galeria">) {
  const { pieza } = await searchParams;
  return (
    <section className="container-editorial py-14">
      <p className="eyebrow">Lo que nos gusta</p>
      <h1 className="mt-2 font-display text-5xl leading-none md:text-6xl">Galería</h1>
      <p className="mt-4 mb-10 max-w-xl text-humo">
        Productos, no modelos: cada pieza con su marca, una valoración de 1 a 5, lo que pensamos de ella y con qué la combinaríamos. Toca cualquiera para verla en grande.
      </p>
      <Galeria piezas={piezas} inicial={typeof pieza === "string" ? pieza : undefined} />
    </section>
  );
}
