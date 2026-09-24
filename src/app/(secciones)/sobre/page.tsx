import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Qué es ${site.nombre} y por qué existe.`,
};

export default function SobrePage() {
  return (
    <section className="container-editorial py-14">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">Sobre {site.nombre}</p>
        <h1 className="mt-2 font-display text-5xl leading-[1.02] md:text-6xl">
          La ropa es tela. Lo que la hace funcionar es el cuerpo que la lleva.
        </h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed">
          <p>
            {site.nombre} nació de una idea sencilla: en moda sobran catálogos y faltan opiniones. Todo el mundo enseña ropa; casi nadie dice qué piensa de ella.
          </p>
          <p>
            Aquí hacemos dos cosas. Una galería de prendas y productos de moda femenina que nos gustan (vestidos, abrigos, zapatos, bolsos, accesorios), cada uno con una opinión corta y honesta: por qué nos gusta y cómo lo llevaríamos. Y artículos donde decimos lo que pensamos de la moda, sin adornos.
          </p>
          <p>
            No vendemos nada ni nos paga nadie por lo que aparece aquí. Si algo está en la galería es porque nos gusta de verdad.
          </p>
        </div>
        <p className="mt-10 border-t border-arena/70 pt-6 text-sm text-humo">
          ¿Eres una marca y quieres que probemos algo vuestro? Lo que ofrecemos y cómo trabajamos está en{" "}
          <Link href="/para-marcas" className="underline hover:text-arcilla">Para marcas</Link>.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/galeria" className="rounded-full bg-tinta px-6 py-3 text-sm text-lino hover:bg-arcilla">Ver la galería</Link>
          <a href={`mailto:${site.email}`} className="rounded-full border border-tinta px-6 py-3 text-sm hover:border-arcilla hover:text-arcilla">Escríbenos</a>
        </div>
      </div>
    </section>
  );
}
