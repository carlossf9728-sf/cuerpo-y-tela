import { getRedis } from "./redis";

// Newsletter: guardamos solo el correo, la fecha del alta y desde qué página se
// apuntó (para poder demostrar el consentimiento, como pide el RGPD).
//
// En producción va a Upstash Redis; sin base de datos configurada se guarda en
// memoria y se pierde al reiniciar (sirve para probar en local).

export type Suscriptor = { email: string; fecha: string; origen: string };

const CLAVE = "newsletter:suscriptores";
const CLAVE_LIMITE = (ip: string) => `newsletter:limite:${ip}`;
const ALTAS_POR_HORA = 5;

// Validación deliberadamente sencilla: algo@algo.algo, sin espacios.
export function esEmail(v: unknown): v is string {
  return typeof v === "string" && v.length <= 254 && /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim());
}

export function normalizar(email: string) {
  return email.trim().toLowerCase();
}

const memoria = new Map<string, Suscriptor>();
const limitesMemoria = new Map<string, { n: number; hasta: number }>();

export async function alta(email: string, origen: string): Promise<{ nuevo: boolean }> {
  const dato: Suscriptor = { email, fecha: new Date().toISOString(), origen };
  const redis = getRedis();
  if (!redis) {
    const nuevo = !memoria.has(email);
    if (nuevo) memoria.set(email, dato);
    return { nuevo };
  }
  const añadidos = await redis.hsetnx(CLAVE, email, dato);
  return { nuevo: añadidos === 1 };
}

export async function baja(email: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return memoria.delete(email);
  return (await redis.hdel(CLAVE, email)) === 1;
}

export async function lista(): Promise<Suscriptor[]> {
  const redis = getRedis();
  const datos = redis
    ? Object.values((await redis.hgetall<Record<string, Suscriptor>>(CLAVE)) ?? {})
    : [...memoria.values()];
  return datos.sort((a, b) => a.fecha.localeCompare(b.fecha));
}

// Tope de altas por IP y hora, para que un robot no llene la lista.
export async function dentroDelLimite(ip: string): Promise<boolean> {
  const redis = getRedis();
  if (!redis) {
    const ahora = Date.now();
    const actual = limitesMemoria.get(ip);
    if (!actual || actual.hasta < ahora) {
      limitesMemoria.set(ip, { n: 1, hasta: ahora + 3600_000 });
      return true;
    }
    actual.n += 1;
    return actual.n <= ALTAS_POR_HORA;
  }
  const n = await redis.incr(CLAVE_LIMITE(ip));
  if (n === 1) await redis.expire(CLAVE_LIMITE(ip), 3600);
  return n <= ALTAS_POR_HORA;
}
