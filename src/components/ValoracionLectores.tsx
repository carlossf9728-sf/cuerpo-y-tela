"use client";

import { useState } from "react";
import type { Estrellas as NumEstrellas, Resumen } from "@/lib/valoraciones";
import { Estrellas } from "./Estrellas";

const fmt = new Intl.NumberFormat("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

// Resumen corto para las tarjetas: "Lectores 4,2 ★ · 37 votos".
export function ResumenLectores({ resumen, className = "" }: { resumen?: Resumen; className?: string }) {
  if (!resumen) return null;
  return (
    <p className={`text-xs text-humo ${className}`}>
      {resumen.votos === 0 ? (
        <>Lectores: sin votos aún</>
      ) : (
        <>
          Lectores: <span className="text-tinta">{fmt.format(resumen.media)}</span> <span className="text-arcilla">★</span> · {resumen.votos} {resumen.votos === 1 ? "voto" : "votos"}
        </>
      )}
    </p>
  );
}

// Bloque de la ficha: media de los lectores y estrellas para votar.
export function ValoracionLectores({
  resumen,
  miVoto,
  onVotar,
}: {
  resumen?: Resumen;
  miVoto?: NumEstrellas;
  onVotar: (estrellas: NumEstrellas) => Promise<boolean>;
}) {
  const [sobre, setSobre] = useState<number | null>(null);
  const [estado, setEstado] = useState<"" | "enviando" | "gracias" | "error">("");

  async function votar(n: NumEstrellas) {
    setEstado("enviando");
    const ok = await onVotar(n);
    setEstado(ok ? "gracias" : "error");
  }

  const mostrando = sobre ?? miVoto ?? 0;

  return (
    <div className="mt-6 rounded-xl border border-arena bg-lino-oscuro/50 p-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="eyebrow">Valoración de los lectores</p>
        {resumen && resumen.votos > 0 && (
          <p className="text-xs text-humo">{resumen.votos} {resumen.votos === 1 ? "voto" : "votos"}</p>
        )}
      </div>
      <div className="mt-2 flex items-center gap-3">
        {resumen && resumen.votos > 0 ? (
          <>
            <span className="font-display text-4xl italic leading-none">{fmt.format(resumen.media)}</span>
            <Estrellas valor={Math.round(resumen.media)} className="text-base" />
          </>
        ) : (
          <p className="text-sm text-humo">Todavía nadie ha votado. Sé la primera.</p>
        )}
      </div>

      <p className="mt-4 text-sm">{miVoto ? "Tu voto (puedes cambiarlo):" : "¿Cuántas estrellas le das?"}</p>
      <div className="mt-1 flex items-center gap-2" onMouseLeave={() => setSobre(null)}>
        <div className="flex" role="radiogroup" aria-label="Tu valoración">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={miVoto === n}
              aria-label={`${n} ${n === 1 ? "estrella" : "estrellas"}`}
              disabled={estado === "enviando"}
              onMouseEnter={() => setSobre(n)}
              onFocus={() => setSobre(n)}
              onBlur={() => setSobre(null)}
              onClick={() => votar(n as NumEstrellas)}
              className="p-0.5 transition-transform hover:scale-110 disabled:opacity-60"
            >
              <svg viewBox="0 0 20 20" className={`h-7 w-7 ${n <= mostrando ? "fill-arcilla" : "fill-none stroke-current opacity-40"}`} strokeWidth={1.4} aria-hidden="true">
                <path d="M10 1.8l2.5 5.3 5.8.7-4.3 4 1.1 5.8L10 14.8l-5.1 2.8 1.1-5.8-4.3-4 5.8-.7z" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
        <span className="text-xs text-humo" aria-live="polite">
          {estado === "enviando" && "Guardando…"}
          {estado === "gracias" && "¡Gracias! Tu voto cuenta."}
          {estado === "error" && "No se pudo guardar. Prueba otra vez."}
        </span>
      </div>
    </div>
  );
}
