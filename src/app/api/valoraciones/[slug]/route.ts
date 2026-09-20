import { getPieza } from "@/content/galeria";
import { esEstrellas, esVotante, getAlmacen } from "@/lib/valoraciones";

// POST /api/valoraciones/<slug>  { estrellas: 1-5, votante: "<id anónimo>" }
// → { media, votos }
export async function POST(request: Request, { params }: RouteContext<"/api/valoraciones/[slug]">) {
  const { slug } = await params;
  if (!getPieza(slug)) return Response.json({ error: "Pieza no encontrada" }, { status: 404 });

  const cuerpo = await request.json().catch(() => null);
  const estrellas = cuerpo?.estrellas;
  const votante = cuerpo?.votante;
  if (!esEstrellas(estrellas) || !esVotante(votante)) {
    return Response.json({ error: "Voto no válido" }, { status: 400 });
  }

  const resumen = await getAlmacen().votar(slug, votante, estrellas);
  return Response.json(resumen, { headers: { "Cache-Control": "no-store" } });
}
