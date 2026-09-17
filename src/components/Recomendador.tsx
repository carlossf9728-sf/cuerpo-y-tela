"use client";

import Image from "next/image";
import { useState } from "react";
import { urlFoto, type Pieza } from "@/content/galeria";
import { animos, climas, explicar, ocasiones, recomendar, type Animo, type Clima, type Ocasion } from "@/lib/recomendar";
import { Estrellas } from "./Estrellas";

// "El armario en 10 segundos": tres preguntas rápidas y una pieza de la
// galería como respuesta. `alVer` abre esa pieza en la galería.
export function Recomendador({ alVer }: { alVer: (pieza: Pieza) => void }) {
  const [ocasion, setOcasion] = useState<Ocasion | null>(null);
  const [clima, setClima] = useState<Clima | null>(null);
  const [animo, setAnimo] = useState<Animo | null>(null);
  const [intento, setIntento] = useState(0);

  const paso = ocasion === null ? 1 : clima === null ? 2 : animo === null ? 3 : 4;
  const listo = ocasion !== null && clima !== null && animo !== null;
  const respuestas = listo ? { ocasion, clima, animo } : null;
  const pieza = respuestas ? recomendar(respuestas, intento) : null;

  function reiniciar() {
    setOcasion(null);
    setClima(null);
    setAnimo(null);
    setIntento(0);
  }

  return (
    <div className="rounded-2xl border border-arena bg-lino-oscuro/50 p-5 shadow-[0_30px_60px_-40px_rgba(27,24,21,0.5)] backdrop-blur md:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="eyebrow">El armario en 10 segundos</p>
          <h2 className="mt-1 font-display text-3xl leading-none md:text-4xl">¿Qué te pones hoy?</h2>
        </div>
        <span className="font-display text-2xl italic text-arcilla" aria-live="polite">
          {Math.min(paso, 3)}<span className="text-humo">/3</span>
        </span>
      </div>

      {!pieza ? (
        <div className="mt-5 space-y-5">
          <Pregunta n={1} activo={paso === 1} texto="¿Para qué?" opciones={ocasiones} valor={ocasion} onChange={setOcasion} />
          <Pregunta n={2} activo={paso === 2} texto="¿Qué tiempo hace?" opciones={climas} valor={clima} onChange={setClima} />
          <Pregunta n={3} activo={paso === 3} texto="¿Cómo te sientes?" opciones={animos} valor={animo} onChange={setAnimo} />
        </div>
      ) : (
        <div className="mt-5 grid gap-5 sm:grid-cols-[minmax(0,140px)_1fr]" key={pieza.slug}>
          <button type="button" onClick={() => alVer(pieza)} className="group relative aspect-[3/4] overflow-hidden bg-arena" aria-label={`Ver ${pieza.nombre} en la galería`}>
            <Image
              src={urlFoto(pieza.foto, 600)}
              alt={`${pieza.nombre} · ${pieza.marca}`}
              fill
              sizes="200px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          </button>
          <div className="min-w-0">
            <p className="eyebrow">{pieza.marca} · {pieza.tipo}</p>
            <h3 className="mt-1 font-display text-2xl leading-tight md:text-3xl">{pieza.nombre}</h3>
            <Estrellas valor={pieza.valoracion} className="mt-1 text-base" />
            <p className="mt-3 text-sm text-humo">
              <span className="text-tinta">Nuestra propuesta</span> {explicar(respuestas!, pieza)}
            </p>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed">{pieza.combina}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => alVer(pieza)} className="rounded-full bg-tinta px-5 py-2.5 text-sm text-lino transition-colors hover:bg-arcilla">
                Verla en la galería ↓
              </button>
              <button type="button" onClick={() => setIntento((i) => i + 1)} className="rounded-full border border-tinta/30 px-4 py-2.5 text-sm transition-colors hover:border-tinta">
                Otra propuesta
              </button>
              <button type="button" onClick={reiniciar} className="px-2 py-2.5 text-sm text-humo hover:text-arcilla">
                Empezar de nuevo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Pregunta<T extends string>({
  n,
  activo,
  texto,
  opciones,
  valor,
  onChange,
}: {
  n: number;
  activo: boolean;
  texto: string;
  opciones: readonly T[];
  valor: T | null;
  onChange: (v: T) => void;
}) {
  const respondida = valor !== null;
  return (
    <fieldset className={`transition-opacity ${activo || respondida ? "opacity-100" : "opacity-40"}`}>
      <legend className="mb-2 flex items-baseline gap-2 text-sm">
        <span className="font-display text-lg italic text-arcilla">{n}.</span>
        <span>{texto}</span>
        {respondida && !activo && <span className="text-xs text-humo">· {valor}</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {opciones.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={valor === o}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              valor === o ? "border-tinta bg-tinta text-lino" : "border-tinta/25 bg-lino/60 hover:border-tinta"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
