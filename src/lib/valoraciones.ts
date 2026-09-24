import type { Redis } from "@upstash/redis";
import { getRedis } from "./redis";

// Valoraciones de los lectores: cada visitante puede dar de 1 a 5 estrellas a
// una pieza (un voto por navegador, que se puede cambiar).
//
// En producción se guardan en Upstash Redis (Vercel → Storage → Upstash Redis;
// la integración pone sola las variables KV_REST_API_URL / KV_REST_API_TOKEN o
// UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN). Sin esas variables (en
// local) se guardan en memoria y se pierden al reiniciar.

export type Resumen = { media: number; votos: number };
export type Estrellas = 1 | 2 | 3 | 4 | 5;

const ESTRELLAS: Estrellas[] = [1, 2, 3, 4, 5];

// Recuento por estrella → media y total.
function resumir(recuento: Record<string, number | string | undefined>): Resumen {
  let suma = 0;
  let votos = 0;
  for (const e of ESTRELLAS) {
    const n = Number(recuento[e] ?? 0);
    suma += e * n;
    votos += n;
  }
  return { media: votos ? Math.round((suma / votos) * 10) / 10 : 0, votos };
}

interface Almacen {
  resumen(slugs: string[]): Promise<Record<string, Resumen>>;
  votar(slug: string, votante: string, estrellas: Estrellas): Promise<Resumen>;
}

const claveVotos = (slug: string) => `pieza:${slug}:votos`;
const claveVotante = (slug: string, votante: string) => `voto:${slug}:${votante}`;

function almacenRedis(redis: Redis): Almacen {
  return {
    async resumen(slugs) {
      const p = redis.pipeline();
      for (const s of slugs) p.hgetall<Record<string, number>>(claveVotos(s));
      const filas = await p.exec<(Record<string, number> | null)[]>();
      return Object.fromEntries(slugs.map((s, i) => [s, resumir(filas[i] ?? {})]));
    },
    async votar(slug, votante, estrellas) {
      const anterior = await redis.get<number>(claveVotante(slug, votante));
      const p = redis.pipeline();
      if (anterior && anterior !== estrellas) p.hincrby(claveVotos(slug), String(anterior), -1);
      if (anterior !== estrellas) p.hincrby(claveVotos(slug), String(estrellas), 1);
      p.set(claveVotante(slug, votante), estrellas);
      p.hgetall<Record<string, number>>(claveVotos(slug));
      const r = await p.exec();
      return resumir((r[r.length - 1] as Record<string, number> | null) ?? {});
    },
  };
}

function almacenMemoria(): Almacen {
  const votos = new Map<string, Record<string, number>>();
  const votantes = new Map<string, Estrellas>();
  const recuento = (slug: string) => votos.get(slug) ?? votos.set(slug, {}).get(slug)!;
  return {
    async resumen(slugs) {
      return Object.fromEntries(slugs.map((s) => [s, resumir(recuento(s))]));
    },
    async votar(slug, votante, estrellas) {
      const r = recuento(slug);
      const anterior = votantes.get(claveVotante(slug, votante));
      if (anterior) r[anterior] = (r[anterior] ?? 0) - 1;
      r[estrellas] = (r[estrellas] ?? 0) + 1;
      votantes.set(claveVotante(slug, votante), estrellas);
      return resumir(r);
    },
  };
}

let almacen: Almacen | undefined;

export function getAlmacen(): Almacen {
  if (almacen) return almacen;
  const redis = getRedis();
  if (redis) {
    almacen = almacenRedis(redis);
  } else {
    if (process.env.NODE_ENV === "production") {
      console.warn("Valoraciones: no hay base de datos configurada; los votos se guardan en memoria y se perderán.");
    }
    almacen = almacenMemoria();
  }
  return almacen;
}

export function esEstrellas(v: unknown): v is Estrellas {
  return typeof v === "number" && Number.isInteger(v) && v >= 1 && v <= 5;
}

// Identificador anónimo que genera el navegador (ver `useValoraciones`).
export function esVotante(v: unknown): v is string {
  return typeof v === "string" && /^[a-zA-Z0-9-]{8,64}$/.test(v);
}
