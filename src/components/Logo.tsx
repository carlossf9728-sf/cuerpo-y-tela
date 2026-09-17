import Image from "next/image";
import { site } from "@/content/site";

// Logo principal: `public/logo.png` (932×347 px, fondo transparente).
// `ancho` es el ancho en píxeles CSS al que se muestra.
export function Logo({ ancho = 180, priority = false, className = "" }: { ancho?: number; priority?: boolean; className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt={site.nombre}
      width={932}
      height={347}
      priority={priority}
      sizes={`${ancho}px`}
      style={{ width: ancho, height: "auto" }}
      className={className}
    />
  );
}
