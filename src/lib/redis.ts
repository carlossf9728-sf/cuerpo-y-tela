import { Redis } from "@upstash/redis";

// Conexión a Upstash Redis, compartida por las valoraciones y la newsletter.
// En Vercel, la integración de Upstash define sola estas variables. Si no hay
// ninguna (por ejemplo en local), devolvemos `null` y cada función usa su
// alternativa en memoria.
let cliente: Redis | null | undefined;

export function getRedis(): Redis | null {
  if (cliente !== undefined) return cliente;
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  cliente = url && token ? new Redis({ url, token }) : null;
  return cliente;
}
