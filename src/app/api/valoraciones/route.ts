import { getPieza } from "@/content/galeria";
import { getAlmacen } from "@/lib/valoraciones";

// GET /api/valoraciones?slugs=a,b,c → { a: { media, votos }, ... }
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slugs = (searchParams.get("slugs") ?? "")
    .split(",")
    .filter((s) => s && getPieza(s))
    .slice(0, 200);
  const resumen = await getAlmacen().resumen(slugs);
  return Response.json(resumen, { headers: { "Cache-Control": "no-store" } });
}
