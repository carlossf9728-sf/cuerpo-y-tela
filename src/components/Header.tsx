"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";

// Galería y blog viven en la portada (escenas); el menú salta a ellas con el #hash.
const enlaces = [
  { href: "/#galeria", label: "Galería", activoEn: "/galeria" },
  { href: "/#blog", label: "Blog", activoEn: "/opinion" },
  { href: "/sobre", label: "Sobre", activoEn: "/sobre" },
];

export function Header() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-arena/70 bg-lino/90 backdrop-blur">
      <div className="container-editorial flex h-16 items-center justify-between">
        <Link href="/" aria-label="Inicio" className="flex items-center" onClick={() => setAbierto(false)}>
          <Logo ancho={150} priority />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {enlaces.map((e) => {
            const activo = pathname === e.activoEn || pathname.startsWith(e.activoEn + "/");
            return (
              <Link
                key={e.href}
                href={e.href}
                className={`text-sm transition-colors hover:text-arcilla ${activo ? "text-arcilla" : "text-tinta"}`}
              >
                {e.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          className="flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setAbierto((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 top-0 h-px w-5 bg-tinta transition-transform ${abierto ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[6px] h-px w-5 bg-tinta transition-opacity ${abierto ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-[12px] h-px w-5 bg-tinta transition-transform ${abierto ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {abierto && (
        <nav className="border-t border-arena/70 md:hidden">
          <div className="container-editorial flex flex-col py-2">
            {enlaces.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                onClick={() => setAbierto(false)}
                className="py-3 font-display text-2xl"
              >
                {e.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
