import Link from "next/link";
import type { Articulo } from "@/content/opinion";

export function ArticuloCard({ articulo }: { articulo: Articulo }) {
  return (
    <Link
      href={`/opinion/${articulo.slug}`}
      className="group flex flex-col justify-between border-t border-tinta/20 py-6 transition-colors hover:border-arcilla"
    >
      <div>
        <p className="eyebrow">{articulo.tema} · {articulo.minutos} min</p>
        <h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-arcilla">
          {articulo.titulo}
        </h3>
        <p className="mt-2 text-sm text-humo">{articulo.resumen}</p>
      </div>
      <span className="mt-4 text-xs uppercase tracking-widest text-arcilla">Leer →</span>
    </Link>
  );
}
