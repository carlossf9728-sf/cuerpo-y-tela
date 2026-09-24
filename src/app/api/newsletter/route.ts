import { alta, baja, dentroDelLimite, esEmail, lista, normalizar } from "@/lib/newsletter";

// POST /api/newsletter  { email, consentimiento: true, origen?, web? }
// Da de alta un correo en la newsletter. `web` es un campo trampa: los robots
// lo rellenan y las personas no, así que si viene con texto se descarta.
export async function POST(request: Request) {
  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    return Response.json({ error: "Petición no válida." }, { status: 400 });
  }
  const { email, consentimiento, origen, web } = (cuerpo ?? {}) as Record<string, unknown>;

  if (typeof web === "string" && web !== "") return Response.json({ ok: true });
  if (!esEmail(email)) return Response.json({ error: "Ese correo no parece válido." }, { status: 400 });
  if (consentimiento !== true) {
    return Response.json({ error: "Hay que marcar la casilla para poder escribirte." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "desconocida";
  if (!(await dentroDelLimite(ip))) {
    return Response.json({ error: "Demasiados intentos. Prueba dentro de un rato." }, { status: 429 });
  }

  const { nuevo } = await alta(normalizar(email), typeof origen === "string" ? origen.slice(0, 80) : "web");
  return Response.json({ ok: true, nuevo }, { headers: { "Cache-Control": "no-store" } });
}

// DELETE /api/newsletter  { email }  → baja voluntaria desde el enlace del correo.
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email") ?? "";
  if (!esEmail(email)) return Response.json({ error: "Correo no válido." }, { status: 400 });
  await baja(normalizar(email));
  return Response.json({ ok: true });
}

// GET /api/newsletter?clave=…  → la lista en CSV, para poder enviar el correo.
// Solo funciona si defines NEWSLETTER_CLAVE en las variables de entorno.
export async function GET(request: Request) {
  const clave = process.env.NEWSLETTER_CLAVE;
  const { searchParams } = new URL(request.url);
  if (!clave || searchParams.get("clave") !== clave) {
    return new Response("No encontrado", { status: 404 });
  }
  const filas = await lista();
  const csv = ["email,fecha,origen", ...filas.map((s) => `${s.email},${s.fecha},${s.origen}`)].join("\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="newsletter-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
