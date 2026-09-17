"use client";

import Image from "next/image";
import { piezas, type Pieza } from "@/content/galeria";
import { articulos } from "@/content/opinion";
import { site } from "@/content/site";
import { Marquesina } from "@/components/Marquesina";
import { Recomendador } from "@/components/Recomendador";
import { BotonBajar } from "./Escenas";

// Primera escena: el símbolo de Cuerpo y Tela de fondo, el titular, el test
// de 10 segundos y la barra de marcas en movimiento.
export function Inicio({ alVerPieza, alBajar }: { alVerPieza: (p: Pieza) => void; alBajar: () => void }) {
  const marcas = new Set(piezas.map((p) => p.marca).filter((m) => m !== "Marca no identificada")).size;
  const cincoEstrellas = piezas.filter((p) => p.valoracion === 5).length;

  return (
    <div className="relative flex min-h-full flex-col">
      {/* Símbolo de fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/simbolo.png"
          alt=""
          width={320}
          height={347}
          priority
          className="simbolo-fondo absolute left-1/2 top-1/2 h-[92vh] w-auto max-w-none opacity-[0.13] md:left-[62%]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-lino)_85%)]" />
      </div>

      <div className="container-editorial relative flex flex-1 flex-col justify-center pb-6 pt-20 md:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">Moda femenina · con criterio</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.92] sm:text-6xl xl:text-7xl 2xl:text-8xl">
              Moda con <em className="text-arcilla">opinión</em>,<br />no con catálogo.
            </h1>
            <p className="mt-5 max-w-md text-base text-humo lg:text-lg">
              {piezas.length} piezas de {marcas} marcas valoradas de 1 a 5 estrellas, con lo que pensamos de verdad y con qué las llevaríamos. Y el blog de {site.autora.nombre}, que no se calla nada.
            </p>
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {[
                [piezas.length, "piezas valoradas"],
                [cincoEstrellas, "con cinco estrellas"],
                [articulos.length, "artículos del blog"],
              ].map(([n, t]) => (
                <div key={t}>
                  <dt className="sr-only">{t}</dt>
                  <dd>
                    <span className="font-display text-4xl italic text-arcilla">{n}</span>
                    <span className="ml-2 text-sm text-humo">{t}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 hidden lg:block">
              <BotonBajar onClick={alBajar}>Bajar a la galería</BotonBajar>
              <p className="mt-3 text-xs text-humo">O sigue bajando con la rueda: la portada se irá y aparecerá la galería.</p>
            </div>
          </div>

          <Recomendador alVer={alVerPieza} />

          <div className="flex flex-col items-center gap-3 lg:hidden">
            <BotonBajar onClick={alBajar}>Bajar a la galería</BotonBajar>
            <p className="text-xs text-humo">O desliza hacia arriba.</p>
          </div>
        </div>
      </div>

      <div className="relative mt-auto border-t border-arena/70 bg-lino/70 py-3 backdrop-blur-sm">
        <p className="eyebrow container-editorial mb-1">Las marcas que miramos de cerca</p>
        <Marquesina />
      </div>
    </div>
  );
}
