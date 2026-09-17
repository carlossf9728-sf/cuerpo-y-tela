import { piezas, type Pieza, type TipoPieza } from "@/content/galeria";

// "El armario en 10 segundos": tres respuestas y una pieza de la galería.
// Puntúa cada pieza según ocasión, tiempo y ánimo y devuelve la mejor
// (o una de las mejores, para poder pedir "otra propuesta").

export const ocasiones = ["Oficina", "Cita", "Boda", "Domingo"] as const;
export const climas = ["Frío", "Templado", "Calor"] as const;
export const animos = ["Discreta", "Cómoda", "Con ganas de guerra"] as const;

export type Ocasion = (typeof ocasiones)[number];
export type Clima = (typeof climas)[number];
export type Animo = (typeof animos)[number];

export type Respuestas = { ocasion: Ocasion; clima: Clima; animo: Animo };

const porTipo = (mapa: Partial<Record<TipoPieza, number>>) => (p: Pieza) => mapa[p.tipo] ?? 0;
const porPalabra = (re: RegExp, puntos: number) => (p: Pieza) => (re.test(p.nombre) ? puntos : 0);

const reglas: Record<Ocasion | Clima | Animo, ((p: Pieza) => number)[]> = {
  Oficina: [
    porTipo({ "Camisas y tops": 4, Punto: 3, "Zapatos y botas": 3, Bolsos: 3, "Abrigos y chaquetas": 2, "Joyas y relojes": 2, Zapatillas: -4 }),
    porPalabra(/salón|botín|satchel|reloj|cinturón|camisa/i, 2),
    porPalabra(/sudadera|tigre|chuck|sk8/i, -3),
  ],
  Cita: [
    porTipo({ Vestidos: 5, "Zapatos y botas": 3, "Joyas y relojes": 3, Bolsos: 2, "Abrigos y chaquetas": 2 }),
    porPalabra(/cuero|salón|stiletto|pendientes|collar|bota slouch/i, 2),
    porPalabra(/trabajo|mochila|running/i, -4),
  ],
  Boda: [
    porTipo({ Vestidos: 6, "Zapatos y botas": 3, "Joyas y relojes": 4, Bolsos: 2, Zapatillas: -6, Vaqueros: -6, Punto: -3 }),
    porPalabra(/salón|stiletto|sandalia negra|pendientes|collar|bolso de mano|reloj oro/i, 3),
    porPalabra(/bota|mochila|sudadera|polo/i, -4),
  ],
  Domingo: [
    porTipo({ Zapatillas: 5, Vaqueros: 4, Punto: 3, "Camisas y tops": 2, Accesorios: 2, Bolsos: 1, "Joyas y relojes": -2 }),
    porPalabra(/sudadera|mochila|cazadora|básicos|gafas|kånken/i, 2),
    porPalabra(/salón|stiletto|encaje/i, -4),
  ],
  Frío: [
    porTipo({ "Abrigos y chaquetas": 4, Punto: 4, "Zapatos y botas": 1 }),
    porPalabra(/bota|borrego|jersey|lana|boina|cuero/i, 3),
    porPalabra(/sandalia|sin mangas|gafas de sol/i, -6),
  ],
  Templado: [
    porTipo({ "Camisas y tops": 2, Vaqueros: 2, Zapatillas: 1 }),
    porPalabra(/cazadora|cortavientos|polo|camisa/i, 2),
    porPalabra(/borrego|lana/i, -2),
  ],
  Calor: [
    porTipo({ Vestidos: 4, "Camisas y tops": 3, Accesorios: 2 }),
    porPalabra(/sandalia|sin mangas|gafas|encaje|floral|rafia/i, 3),
    porPalabra(/abrigo|chaqueta|jersey|bota|sudadera|borrego|boina/i, -6),
  ],
  Discreta: [
    porPalabra(/negr|blanc|crud|beige|neutr|marrón|gris|nude|clásic/i, 3),
    porPalabra(/roj|estampad|tigre|colorblock|monogram|logo|rosa|verde/i, -4),
  ],
  Cómoda: [
    porTipo({ Zapatillas: 4, Punto: 3, Vaqueros: 2, "Camisas y tops": 1 }),
    porPalabra(/sudadera|arizona|mochila|básicos|tote/i, 3),
    porPalabra(/salón|stiletto|slouch/i, -5),
  ],
  "Con ganas de guerra": [
    porPalabra(/roj|estampad|tigre|colorblock|monogram|cuero|stiletto|slouch|dorad|marmont/i, 4),
    porPalabra(/básicos|crud|beige/i, -2),
  ],
};

function puntuar(p: Pieza, r: Respuestas) {
  const claves: (Ocasion | Clima | Animo)[] = [r.ocasion, r.clima, r.animo];
  let total = p.valoracion * 2;
  for (const clave of claves) for (const regla of reglas[clave]) total += regla(p);
  return total;
}

// Devuelve la pieza en la posición `intento` del ranking (0 = la mejor),
// sin salirse de las cinco mejores.
export function recomendar(r: Respuestas, intento = 0): Pieza {
  const ranking = [...piezas]
    .map((p) => ({ p, s: puntuar(p, r) }))
    .sort((a, b) => b.s - a.s || b.p.valoracion - a.p.valoracion)
    .slice(0, 5);
  return ranking[intento % ranking.length].p;
}

// Frase corta que explica la elección.
export function explicar(r: Respuestas, p: Pieza) {
  const ocasion: Record<Ocasion, string> = {
    Oficina: "para la oficina",
    Cita: "para una cita",
    Boda: "para una boda",
    Domingo: "para un domingo",
  };
  const clima: Record<Clima, string> = { Frío: "con frío", Templado: "con buen tiempo", Calor: "con calor" };
  const animo: Record<Animo, string> = {
    Discreta: "sin llamar la atención",
    Cómoda: "sin renunciar a la comodidad",
    "Con ganas de guerra": "y con ganas de que te miren",
  };
  return `${ocasion[r.ocasion]}, ${clima[r.clima]} ${animo[r.animo]}: ${p.nombre.toLowerCase()}, ${p.valoracion} de 5.`;
}
