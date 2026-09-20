"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { piezas, type Pieza } from "@/content/galeria";
import { site } from "@/content/site";
import { Logo } from "@/components/Logo";
import { Galeria } from "@/components/Galeria";
import { Inicio } from "./Inicio";
import { Blog } from "./Blog";
import { Intro } from "./Intro";

// La portada son tres escenas a pantalla completa que no se recorren de
// seguido: inicio, galería y blog. Al pasar de una a otra, la actual se
// difumina y aparece la siguiente. Se cambia con los botones, con la rueda
// (al llegar al final de la escena), con las flechas del teclado o deslizando.
const escenas = [
  { id: "inicio", etiqueta: "Inicio" },
  { id: "galeria", etiqueta: "Galería" },
  { id: "blog", etiqueta: `Blog de ${site.autora.nombre}` },
] as const;

const DURACION_TRANSICION = 1100; // ms hasta que se puede volver a cambiar
const UMBRAL_RUEDA = 160; // píxeles de rueda acumulados en el borde
const PAUSA_TRAS_SCROLL = 350; // ms quietos en el borde antes de contar

export function Escenas() {
  const [activa, setActiva] = useState(0);
  const [anterior, setAnterior] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const [visitadas, setVisitadas] = useState<number[]>([0]);
  const [solicitud, setSolicitud] = useState<{ slug: string; id: number }>();

  const bloqueadoHasta = useRef(0);
  const acumulado = useRef(0);
  const ultimaRueda = useRef(0);
  const ultimoScroll = useRef(0);
  const toqueInicio = useRef<{ y: number; arriba: boolean; abajo: boolean } | null>(null);
  const scrollers = useRef<(HTMLDivElement | null)[]>([]);

  const activaRef = useRef(0);
  const ir = useCallback((n: number) => {
    const actual = activaRef.current;
    if (n < 0 || n >= escenas.length || n === actual) return;
    activaRef.current = n;
    setDir(n > actual ? 1 : -1);
    setAnterior(actual);
    setVisitadas((v) => (v.includes(n) ? v : [...v, n]));
    setActiva(n);
    bloqueadoHasta.current = Date.now() + DURACION_TRANSICION;
    acumulado.current = 0;
    window.history.replaceState(null, "", n === 0 ? "/" : `/#${escenas[n].id}`);
  }, []);

  // Abre una pieza en la galería (desde el test de la portada).
  const verPieza = useCallback(
    (pieza: Pieza) => {
      setSolicitud((s) => ({ slug: pieza.slug, id: (s?.id ?? 0) + 1 }));
      ir(1);
    },
    [ir],
  );

  // Escena inicial según el #hash de la URL (los enlaces del menú usan /#galeria).
  useEffect(() => {
    function desdeHash() {
      const i = escenas.findIndex((e) => `#${e.id}` === window.location.hash);
      if (i > 0) ir(i);
    }
    desdeHash();
    window.addEventListener("hashchange", desdeHash);
    return () => window.removeEventListener("hashchange", desdeHash);
  }, [ir]);

  function bordes(el: HTMLElement) {
    return {
      arriba: el.scrollTop <= 1,
      abajo: el.scrollTop + el.clientHeight >= el.scrollHeight - 2,
    };
  }

  function hayFichaAbierta(target: EventTarget | null) {
    return target instanceof Element && target.closest("[role=dialog], [data-intro]") !== null;
  }

  // Rueda: solo cambia de escena si ya estamos en el borde, llevamos un momento
  // quietos (para no saltar con la inercia del trackpad) y se insiste un poco.
  function onWheel(e: React.WheelEvent<HTMLDivElement>) {
    if (hayFichaAbierta(e.target)) return;
    const ahora = Date.now();
    if (ahora < bloqueadoHasta.current) return;
    const { arriba, abajo } = bordes(e.currentTarget);
    const enBorde = (e.deltaY > 0 && abajo) || (e.deltaY < 0 && arriba);
    if (!enBorde) {
      ultimoScroll.current = ahora;
      acumulado.current = 0;
      return;
    }
    if (ahora - ultimoScroll.current < PAUSA_TRAS_SCROLL) return;
    if (ahora - ultimaRueda.current > 500) acumulado.current = 0;
    ultimaRueda.current = ahora;
    acumulado.current += e.deltaY;
    if (Math.abs(acumulado.current) >= UMBRAL_RUEDA) {
      ir(activa + (acumulado.current > 0 ? 1 : -1));
    }
  }

  function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    if (hayFichaAbierta(e.target)) return;
    toqueInicio.current = { y: e.touches[0].clientY, ...bordes(e.currentTarget) };
  }
  function onTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    const t = toqueInicio.current;
    toqueInicio.current = null;
    if (!t || Date.now() < bloqueadoHasta.current) return;
    const delta = t.y - e.changedTouches[0].clientY;
    if (delta > 90 && t.abajo) ir(activa + 1);
    if (delta < -90 && t.arriba) ir(activa - 1);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (document.querySelector("[role=dialog], [data-intro]")) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
      const el = scrollers.current[activa];
      if (!el) return;
      const { arriba, abajo } = bordes(el);
      if ((e.key === "ArrowDown" || e.key === "PageDown") && abajo) { e.preventDefault(); ir(activa + 1); }
      if ((e.key === "ArrowUp" || e.key === "PageUp") && arriba) { e.preventDefault(); ir(activa - 1); }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activa, ir]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-lino" style={{ "--dir": dir } as React.CSSProperties}>
      {/* Barra superior: logo y saltos entre escenas. */}
      <header className={`absolute inset-x-0 top-0 z-30 backdrop-blur transition-colors ${activa === 0 ? "bg-lino/60" : "border-b border-arena/70 bg-lino/85"}`}>
        <div className="container-editorial flex h-16 items-center justify-between">
          <button type="button" onClick={() => ir(0)} aria-label="Inicio" className="flex items-center" data-logo-cabecera>
            <Logo ancho={150} priority />
          </button>
          <nav className="flex items-center gap-4 text-sm md:gap-8" aria-label="Secciones">
            {escenas.map((e, i) => (
              <button
                key={e.id}
                type="button"
                onClick={() => ir(i)}
                aria-current={activa === i ? "page" : undefined}
                className={`transition-colors hover:text-arcilla ${activa === i ? "text-arcilla" : "text-tinta"} ${i === 0 ? "hidden md:inline" : ""}`}
              >
                {i === 2 ? "Blog" : e.etiqueta}
              </button>
            ))}
            <Link href="/sobre" className="hidden transition-colors hover:text-arcilla sm:inline">Sobre</Link>
          </nav>
        </div>
      </header>

      {/* Puntos laterales para saltar de escena. */}
      <nav className="absolute right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex" aria-label="Ir a escena">
        {escenas.map((e, i) => (
          <button
            key={e.id}
            type="button"
            onClick={() => ir(i)}
            aria-label={e.etiqueta}
            aria-current={activa === i ? "page" : undefined}
            className="group flex items-center justify-end gap-2"
          >
            <span className="text-xs text-humo opacity-0 transition-opacity group-hover:opacity-100">{e.etiqueta}</span>
            <span className={`block h-2 w-2 rounded-full border border-tinta transition-all ${activa === i ? "scale-125 bg-tinta" : "bg-transparent group-hover:bg-tinta/40"}`} />
          </button>
        ))}
      </nav>

      {visitadas.map((i) => (
        <section
          key={escenas[i].id}
          className="escena"
          data-activa={activa === i}
          data-saliente={anterior === i}
          aria-label={escenas[i].etiqueta}
          aria-hidden={activa !== i}
        >
          <div
            ref={(el) => { scrollers.current[i] = el; }}
            className="escena-scroll"
            onWheel={onWheel}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {i === 0 && <Inicio alVerPieza={verPieza} alBajar={() => ir(1)} />}
            {i === 1 && (
              <div className="container-editorial pb-16 pt-16">
                <div className="flex flex-wrap items-end justify-between gap-4 pt-8">
                  <div>
                    <p className="eyebrow">Lo que nos gusta</p>
                    <h1 className="mt-2 font-display text-5xl leading-none md:text-6xl">Galería</h1>
                  </div>
                  <p className="max-w-md text-sm text-humo">
                    Solo producto, sin modelos. Cada pieza con su marca, de 1 a 5 estrellas y con qué la llevaríamos. Toca una para abrir su ficha.
                  </p>
                </div>
                <div className="mt-6">
                  <Galeria
                    piezas={piezas}
                    solicitud={solicitud}
                    pie={
                      <div className="mt-20 flex flex-col items-center gap-3 border-t border-arena/70 pt-12 text-center">
                        <p className="eyebrow">¿Seguimos?</p>
                        <BotonBajar onClick={() => ir(2)}>Bajar al blog de {site.autora.nombre}</BotonBajar>
                      </div>
                    }
                  />
                </div>
              </div>
            )}
            {i === 2 && <Blog alSubir={() => ir(0)} alGaleria={verPieza} />}
          </div>
        </section>
      ))}

      <Intro destinoSelector="[data-logo-cabecera]" />
    </div>
  );
}

export function BotonBajar({ onClick, children, claro = false }: { onClick: () => void; children: React.ReactNode; claro?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm transition-colors ${
        claro ? "border border-lino/40 text-lino hover:border-lino" : "bg-tinta text-lino hover:bg-arcilla"
      }`}
    >
      {children}
      <span className="flecha-bajar inline-block" aria-hidden="true">↓</span>
    </button>
  );
}
