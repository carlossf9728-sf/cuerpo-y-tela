// Página «Para marcas» (el media kit de la web). Es lo primero que mira una
// marca o su agencia antes de responderte, así que mantenlo actualizado.
//
// LO ÚNICO QUE HAY QUE TOCAR CADA MES: `cifras`. Pon los números reales de
// Google Search Console / la analítica y de tus redes, y cambia `cifrasFecha`.
// Si un dato aún no lo tienes, déjalo como `null` y no se muestra. Si no hay
// ninguna cifra, la página lo dice con honestidad en vez de inventar nada.

export const paraMarcas = {
  // Frase de presentación: qué gana la marca, no qué eres tú.
  propuesta:
    "Una web de moda femenina con opinión escrita, no un catálogo. Si tu prenda es buena, lo decimos y explicamos con qué se pone. Si no lo es, no aparece.",

  // A quién llega la web (descríbelo como lo describirías por teléfono).
  publico: [
    "Mujeres de 25 a 45 años, sobre todo de España.",
    "Compran poco y miran mucho: buscan prendas que duren y saber cómo combinarlas.",
    "Llegan buscando opiniones honestas antes de comprar, no inspiración sin más.",
  ],

  // Mes al que corresponden las cifras (AAAA-MM).
  cifrasFecha: "2026-09",
  // Pon el número cuando lo tengas; `null` = todavía no se muestra.
  cifras: [
    { valor: null as number | null, etiqueta: "visitas al mes" },
    { valor: null as number | null, etiqueta: "seguidoras en Instagram" },
    { valor: null as number | null, etiqueta: "seguidoras en TikTok" },
    { valor: null as number | null, etiqueta: "suscriptoras de la newsletter" },
  ],

  // Lo que la web ya tiene y se puede enseñar aunque no haya audiencia todavía.
  activos: [
    { valor: "84", etiqueta: "prendas analizadas en la galería" },
    { valor: "7", etiqueta: "artículos de opinión publicados" },
    { valor: "1-5★", etiqueta: "nota propia y nota de las lectoras en cada ficha" },
  ],

  // Formatos de colaboración.
  formatos: [
    {
      titulo: "Ficha en la galería",
      texto:
        "La prenda entra en la galería con foto, nota de 1 a 5 estrellas, nuestra opinión, con qué combinarla y enlace a vuestra tienda. Las lectoras también pueden puntuarla.",
    },
    {
      titulo: "Artículo de opinión",
      texto:
        "Un texto del blog donde la prenda es protagonista o forma parte de un tema (el abrigo del año, el vaquero que aguanta). Escrito, con criterio y sin lenguaje de nota de prensa.",
    },
    {
      titulo: "Publicación en redes",
      texto: "La misma pieza contada en Instagram y TikTok, enlazando a la ficha de la web.",
    },
    {
      titulo: "Afiliación",
      texto:
        "Somos publisher en Awin. Si tenéis programa allí (o en otra red), los enlaces de la galería se atribuyen solos y veis los clics y las ventas en vuestro panel.",
    },
    {
      titulo: "Código para las lectoras",
      texto: "Un descuento propio para quien llegue desde aquí. Es lo que mejor funciona y lo más fácil de medir.",
    },
  ],

  // Las reglas del juego. Esto es lo que hace que una marca seria te escriba.
  normas: [
    "No se cobra por una nota alta ni por una opinión favorable: se cobra, en su caso, por el trabajo de publicar, no por lo que se dice.",
    "Todo lo que llega regalado o patrocinado se avisa en la propia ficha o artículo.",
    "Los enlaces de afiliado se señalan siempre, tal y como exige la ley.",
    "No se publican notas de prensa tal cual: el texto lo escribimos nosotros.",
    "Si la prenda no convence, se dice en privado y no se publica nada. Nunca se cuelga una reseña negativa por sorpresa.",
  ],

  // Cómo es el proceso, para que nadie pregunte.
  proceso: [
    { paso: "1", texto: "Escríbenos contando la marca, la prenda y qué buscáis." },
    { paso: "2", texto: "Respondemos en 3 o 4 días diciendo si encaja y qué formato proponemos." },
    { paso: "3", texto: "Si hay muestra, la probamos con calma antes de escribir nada." },
    { paso: "4", texto: "Publicamos y os pasamos los enlaces y los datos del primer mes." },
  ],
};

// Cifras con valor: si no hay ninguna, la página lo cuenta en vez de fingir.
export function cifrasDisponibles() {
  return paraMarcas.cifras.filter((c): c is { valor: number; etiqueta: string } => typeof c.valor === "number");
}
