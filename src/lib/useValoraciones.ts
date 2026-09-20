"use client";

import { useCallback, useEffect, useState } from "react";
import type { Estrellas, Resumen } from "./valoraciones";

// Estado de las valoraciones de los lectores en el navegador:
// carga las medias de una lista de piezas, recuerda lo que ha votado esta
// persona (localStorage) y envía los votos.

const CLAVE_VOTANTE = "cyt:votante";
const CLAVE_VOTOS = "cyt:votos";

function leer<T>(clave: string, porDefecto: T): T {
  try {
    const v = localStorage.getItem(clave);
    return v ? (JSON.parse(v) as T) : porDefecto;
  } catch {
    return porDefecto;
  }
}
function guardar(clave: string, valor: unknown) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // Sin almacenamiento (modo privado): el voto vale igual, solo no se recuerda.
  }
}

// Identificador anónimo de este navegador; sirve para poder cambiar el voto.
function votanteId() {
  let id = leer<string | null>(CLAVE_VOTANTE, null);
  if (!id) {
    id = typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    guardar(CLAVE_VOTANTE, id);
  }
  return id;
}

export function useValoraciones(slugs: string[]) {
  const [resumenes, setResumenes] = useState<Record<string, Resumen>>({});
  const [misVotos, setMisVotos] = useState<Record<string, Estrellas>>({});
  const [cargado, setCargado] = useState(false);

  const clave = slugs.join(",");

  useEffect(() => {
    if (!clave) return;
    const ctrl = new AbortController();
    fetch(`/api/valoraciones?slugs=${encodeURIComponent(clave)}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : {}))
      .then((datos: Record<string, Resumen>) => {
        setResumenes((prev) => ({ ...prev, ...datos }));
        setMisVotos(leer<Record<string, Estrellas>>(CLAVE_VOTOS, {}));
        setCargado(true);
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, [clave]);

  const votar = useCallback(async (slug: string, estrellas: Estrellas) => {
    const anterior = misVotos[slug];
    const nuevosVotos = { ...misVotos, [slug]: estrellas };
    setMisVotos(nuevosVotos);
    guardar(CLAVE_VOTOS, nuevosVotos);
    try {
      const r = await fetch(`/api/valoraciones/${encodeURIComponent(slug)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estrellas, votante: votanteId() }),
      });
      if (!r.ok) throw new Error();
      const resumen: Resumen = await r.json();
      setResumenes((prev) => ({ ...prev, [slug]: resumen }));
      return true;
    } catch {
      const revertidos = { ...nuevosVotos };
      if (anterior) revertidos[slug] = anterior;
      else delete revertidos[slug];
      setMisVotos(revertidos);
      guardar(CLAVE_VOTOS, revertidos);
      return false;
    }
  }, [misVotos]);

  return { resumenes, misVotos, votar, cargado };
}
