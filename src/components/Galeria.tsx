"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { tipos, urlFoto, type Pieza, type TipoPieza } from "@/content/galeria";
import { Estrellas } from "./Estrellas";

type Orden = "tipo" | "valoracion" | "marca";

// Galería con buscador, filtros por tipo y marca, orden y ficha lateral.
// `inicial` abre directamente una pieza (se usa desde /galeria?pieza=<slug>).
// `solicitud` abre una pieza desde fuera (p. ej. desde el test de la portada);
// lleva un `id` para poder repetir el mismo slug.
// `pie` se muestra al final de la rejilla (p. ej. el botón para bajar al blog).
export function Galeria({
  piezas,
  inicial,
  solicitud,
  pie,
}: {
  piezas: Pieza[];
  inicial?: string;
  solicitud?: { slug: string; id: number };
  pie?: React.ReactNode;
}) {
  const [busqueda, setBusqueda] = useState("");
  const [tipo, setTipo] = useState<TipoPieza | null>(null);
  const [marca, setMarca] = useState<string>("");
  const [orden, setOrden] = useState<Orden>("tipo");
  const [abierta, setAbierta] = useState<string | null>(inicial ?? null);
  // La ficha se pinta con un portal, así que solo existe en el navegador.
  const montado = useSyncExternalStore(() => () => {}, () => true, () => false);

  // Una pieza pedida desde fuera: quitamos filtros para que esté visible.
  const [solicitudAtendida, setSolicitudAtendida] = useState(solicitud);
  if (solicitud !== solicitudAtendida) {
    setSolicitudAtendida(solicitud);
    if (solicitud) {
      setBusqueda("");
      setTipo(null);
      setMarca("");
      setAbierta(solicitud.slug);
    }
  }

  const marcas = useMemo(
    () => Array.from(new Set(piezas.map((p) => p.marca))).sort((a, b) => a.localeCompare(b, "es")),
    [piezas],
  );
  const tiposPresentes = tipos.filter((t) => piezas.some((p) => p.tipo === t));

  const visibles = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    const lista = piezas.filter(
      (p) =>
        (tipo === null || p.tipo === tipo) &&
        (marca === "" || p.marca === marca) &&
        (q === "" || `${p.nombre} ${p.marca} ${p.tipo}`.toLowerCase().includes(q)),
    );
    if (orden === "valoracion") return [...lista].sort((a, b) => b.valoracion - a.valoracion);
    if (orden === "marca") return [...lista].sort((a, b) => a.marca.localeCompare(b.marca, "es"));
    return lista;
  }, [piezas, busqueda, tipo, marca, orden]);

  // Con orden "por tipo" y sin tipo elegido, la rejilla va en bloques con título.
  const grupos = useMemo(() => {
    if (orden !== "tipo" || tipo !== null) return [{ titulo: null, lista: visibles }];
    return tipos
      .map((t) => ({ titulo: t, lista: visibles.filter((p) => p.tipo === t) }))
      .filter((g) => g.lista.length > 0);
  }, [visibles, orden, tipo]);

  const indice = abierta === null ? -1 : visibles.findIndex((p) => p.slug === abierta);
  // Si la pieza abierta no está entre las visibles (por filtros), la buscamos en todas.
  const actual = indice >= 0 ? visibles[indice] : piezas.find((p) => p.slug === abierta) ?? null;

  const cerrar = useCallback(() => setAbierta(null), []);
  const mover = useCallback(
    (delta: number) => {
      if (indice < 0 || visibles.length === 0) return;
      setAbierta(visibles[(indice + delta + visibles.length) % visibles.length].slug);
    },
    [indice, visibles],
  );

  useEffect(() => {
    if (!actual) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [actual, cerrar, mover]);

  const hayFiltros = busqueda !== "" || tipo !== null || marca !== "" || orden !== "tipo";

  return (
    <>
      {/* Barra de herramientas: se queda fija arriba al hacer scroll. */}
      <div className="sticky top-0 z-20 -mx-5 border-b border-arena/70 bg-lino/90 px-5 py-3 backdrop-blur md:-mx-10 md:px-10">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <label className="relative flex-1 basis-56">
            <span className="sr-only">Buscar en la galería</span>
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar pieza, marca o tipo…"
              className="w-full rounded-full border border-tinta/20 bg-lino px-4 py-2 text-sm outline-none placeholder:text-humo focus:border-tinta"
            />
          </label>
          <Selector valor={marca} onChange={setMarca} etiqueta="Marca">
            <option value="">Todas las marcas</option>
            {marcas.map((m) => <option key={m} value={m}>{m}</option>)}
          </Selector>
          <Selector valor={orden} onChange={(v) => setOrden(v as Orden)} etiqueta="Orden">
            <option value="tipo">Por tipo</option>
            <option value="valoracion">Mejor valoradas</option>
            <option value="marca">Por marca</option>
          </Selector>
          <p className="ml-auto text-xs text-humo">
            {visibles.length} {visibles.length === 1 ? "pieza" : "piezas"}
            {hayFiltros && (
              <button type="button" onClick={() => { setBusqueda(""); setTipo(null); setMarca(""); setOrden("tipo"); }} className="ml-2 underline hover:text-arcilla">
                Quitar filtros
              </button>
            )}
          </p>
        </div>
        <div className="-mx-5 mt-2 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:-mx-10 md:px-10">
          <FiltroBoton activo={tipo === null} onClick={() => setTipo(null)}>Todo</FiltroBoton>
          {tiposPresentes.map((t) => (
            <FiltroBoton key={t} activo={tipo === t} onClick={() => setTipo(tipo === t ? null : t)}>
              {t}
            </FiltroBoton>
          ))}
        </div>
      </div>

      {visibles.length === 0 && (
        <p className="py-20 text-center text-humo">No hay piezas con esos filtros.</p>
      )}

      {grupos.map((g) => (
        <section key={g.titulo ?? "todo"} className="pt-10">
          {g.titulo && (
            <div className="mb-5 flex items-baseline gap-3">
              <h2 className="font-display text-3xl leading-none md:text-4xl">{g.titulo}</h2>
              <span className="text-xs text-humo">{g.lista.length}</span>
            </div>
          )}
          <ul className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 md:gap-x-5 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {g.lista.map((p) => (
              <li key={p.slug}>
                <button type="button" onClick={() => setAbierta(p.slug)} className="group block w-full text-left">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-arena">
                    <Image
                      src={urlFoto(p.foto, 800)}
                      alt={`${p.nombre} · ${p.marca}`}
                      fill
                      sizes="(min-width: 1536px) 16vw, (min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <span className="absolute left-2 top-2 rounded-full bg-lino/90 px-2 py-0.5 text-xs backdrop-blur">
                      <span className="text-arcilla">★</span> {p.valoracion}
                    </span>
                    <span className="absolute inset-x-0 bottom-0 translate-y-full bg-tinta/85 px-3 py-2 text-xs text-lino transition-transform duration-300 group-hover:translate-y-0">
                      Ver ficha y con qué combinarla →
                    </span>
                  </div>
                  <p className="eyebrow mt-3 truncate">{p.marca}</p>
                  <h3 className="mt-0.5 truncate font-display text-xl leading-tight group-hover:text-arcilla">{p.nombre}</h3>
                  <Estrellas valor={p.valoracion} className="mt-1 text-sm" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {pie}

      {montado && actual && createPortal(
        <Ficha
          pieza={actual}
          posicion={indice >= 0 ? `${indice + 1} / ${visibles.length}` : null}
          relacionadas={piezas.filter((p) => p.marca === actual.marca && p.slug !== actual.slug && p.marca !== "Marca no identificada").slice(0, 4)}
          onCerrar={cerrar}
          onMover={indice >= 0 ? mover : undefined}
          onAbrir={setAbierta}
        />,
        document.body,
      )}
    </>
  );
}

// Ficha lateral: foto grande a la izquierda (en pantallas medianas y grandes)
// y panel con opinión y "combina con" a la derecha.
function Ficha({
  pieza,
  posicion,
  relacionadas,
  onCerrar,
  onMover,
  onAbrir,
}: {
  pieza: Pieza;
  posicion: string | null;
  relacionadas: Pieza[];
  onCerrar: () => void;
  onMover?: (delta: number) => void;
  onAbrir: (slug: string) => void;
}) {
  return (
    <div className="ficha-fondo fixed inset-0 z-50 flex bg-tinta/80" role="dialog" aria-modal="true" aria-label={pieza.nombre} onClick={onCerrar}>
      <div className="relative hidden flex-1 items-center justify-center p-10 md:flex" onClick={(e) => e.stopPropagation()}>
        <div key={pieza.slug} className="ficha-foto relative h-full w-full max-w-3xl">
          <Image src={urlFoto(pieza.foto, 1600)} alt={`${pieza.nombre} · ${pieza.marca}`} fill sizes="60vw" className="object-contain" priority />
        </div>
        {onMover && (
          <>
            <button type="button" aria-label="Anterior" onClick={() => onMover(-1)} className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-lino/70 hover:bg-lino/10 hover:text-lino">‹</button>
            <button type="button" aria-label="Siguiente" onClick={() => onMover(1)} className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-lino/70 hover:bg-lino/10 hover:text-lino">›</button>
          </>
        )}
      </div>

      <aside
        className="ficha-panel relative ml-auto flex h-full w-full flex-col overflow-y-auto overscroll-contain bg-lino shadow-2xl md:w-[26rem] lg:w-[30rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-arena/70 bg-lino/90 px-5 py-3 backdrop-blur">
          <p className="eyebrow">{pieza.tipo}{posicion && ` · ${posicion}`}</p>
          <button type="button" aria-label="Cerrar" onClick={onCerrar} className="-mr-2 flex h-9 w-9 items-center justify-center rounded-full text-2xl hover:bg-arena/60">×</button>
        </div>

        <div className="relative aspect-[3/4] w-full bg-arena md:hidden">
          <Image src={urlFoto(pieza.foto, 1000)} alt={`${pieza.nombre} · ${pieza.marca}`} fill sizes="100vw" className="object-cover" priority />
        </div>

        <div className="px-5 py-6 md:px-7">
          <p className="text-sm text-humo">{pieza.marca}</p>
          <h2 className="mt-1 font-display text-3xl leading-tight md:text-4xl">{pieza.nombre}</h2>
          <div className="mt-3 flex items-center gap-3">
            <Estrellas valor={pieza.valoracion} className="text-xl" />
            <span className="text-sm text-humo">{pieza.valoracion} de 5</span>
          </div>

          <p className="eyebrow mt-7">Nuestra opinión</p>
          <p className="mt-2 leading-relaxed">{pieza.opinion}</p>

          <div className="mt-6 rounded-xl border border-arcilla/30 bg-arcilla/5 p-4">
            <p className="eyebrow !text-arcilla">Con qué pega</p>
            <p className="mt-2 text-sm leading-relaxed">{pieza.combina}</p>
          </div>

          {relacionadas.length > 0 && (
            <div className="mt-8">
              <p className="eyebrow mb-3">Más de {pieza.marca}</p>
              <ul className="grid grid-cols-4 gap-2">
                {relacionadas.map((r) => (
                  <li key={r.slug}>
                    <button type="button" onClick={() => onAbrir(r.slug)} className="group block w-full text-left" aria-label={r.nombre}>
                      <div className="relative aspect-[3/4] overflow-hidden bg-arena">
                        <Image src={urlFoto(r.foto, 300)} alt="" fill sizes="100px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <p className="mt-1 truncate text-[11px] text-humo group-hover:text-arcilla">{r.nombre}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {pieza.credito && (
            <p className="mt-8 text-xs text-humo">
              Foto: <a href={pieza.credito} target="_blank" rel="noreferrer" className="underline hover:text-arcilla">Unsplash</a>
            </p>
          )}
        </div>

        {onMover && (
          <div className="mt-auto flex gap-2 border-t border-arena/70 px-5 py-4 md:hidden">
            <button type="button" onClick={() => onMover(-1)} className="flex-1 rounded-full border border-tinta/30 py-2 text-sm">← Anterior</button>
            <button type="button" onClick={() => onMover(1)} className="flex-1 rounded-full border border-tinta/30 py-2 text-sm">Siguiente →</button>
          </div>
        )}
      </aside>
    </div>
  );
}

function Selector({ valor, onChange, etiqueta, children }: { valor: string; onChange: (v: string) => void; etiqueta: string; children: React.ReactNode }) {
  return (
    <label className="relative">
      <span className="sr-only">{etiqueta}</span>
      <select
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-full border border-tinta/20 bg-lino py-2 pl-4 pr-8 text-sm outline-none focus:border-tinta"
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-humo" aria-hidden="true">▾</span>
    </label>
  );
}

function FiltroBoton({ activo, onClick, children }: { activo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${activo ? "border-tinta bg-tinta text-lino" : "border-tinta/25 hover:border-tinta"}`}
    >
      {children}
    </button>
  );
}
