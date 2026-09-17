import Image from "next/image";
import Link from "next/link";
import { urlFoto, type Pieza } from "@/content/galeria";
import { Estrellas } from "./Estrellas";

// Tarjeta de pieza que enlaza a la galería (sin visor propio).
export function PiezaCard({ pieza, priority = false }: { pieza: Pieza; priority?: boolean }) {
  return (
    <Link href={`/galeria?pieza=${pieza.slug}`} className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-arena">
        <Image
          src={urlFoto(pieza.foto)}
          alt={`${pieza.nombre} · ${pieza.marca}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <p className="eyebrow mt-3">{pieza.marca}</p>
      <h3 className="mt-0.5 font-display text-xl leading-tight group-hover:text-arcilla">{pieza.nombre}</h3>
      <Estrellas valor={pieza.valoracion} className="mt-1 text-sm" />
    </Link>
  );
}
