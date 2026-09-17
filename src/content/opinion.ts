// Artículos de opinión sobre moda, escritos en primera persona.
// Para añadir uno: copia un bloque y cambia el `slug` (único, sin espacios).
// `piezasRelacionadas` enlaza con piezas de la galería por su `slug`.

export type Articulo = {
  slug: string;
  titulo: string;
  resumen: string;
  tema: "Opinión" | "Tendencias" | "Básicos" | "Cuerpo" | "Compras";
  fecha: string; // AAAA-MM-DD
  minutos: number;
  secciones: { titulo?: string; parrafos: string[] }[];
  piezasRelacionadas?: string[];
};

export const articulos: Articulo[] = [
  {
    slug: "la-moda-rapida-nos-ha-quitado-el-tacto",
    titulo: "La moda rápida nos ha quitado el tacto",
    resumen: "Hemos aprendido a comprar con los ojos y hemos olvidado comprar con las manos. Una opinión sobre tela, precio y por qué casi todo se ve igual.",
    tema: "Opinión",
    fecha: "2026-09-10",
    minutos: 4,
    secciones: [
      {
        parrafos: [
          "Hace unos años entré en una tienda de una gran cadena y toqué un vestido que en la foto me había parecido precioso. Era plástico. No en sentido figurado: era poliéster fino que se pegaba a los dedos. Y sin embargo, en el perchero, con la luz de la tienda, se veía bien.",
          "Creo que ese es el problema de fondo de la moda rápida: no es solo que dure poco, es que nos ha entrenado para juzgar la ropa como si fuera una imagen. Y la ropa no es una imagen. Se lleva puesta durante horas, roza la piel, se mueve con el cuerpo.",
        ],
      },
      {
        titulo: "Lo que se pierde",
        parrafos: [
          "Una blusa de algodón o de seda cae distinto, se arruga distinto, respira. Un abrigo de lana pesa de una manera concreta sobre los hombros. Cuando todo se fabrica con la misma mezcla sintética, la ropa deja de tener personalidad aunque tenga cien estampados diferentes.",
          "Por eso me parece que casi todo se ve igual ahora: no es falta de diseño, es falta de tela.",
        ],
      },
      {
        titulo: "Lo que hago yo",
        parrafos: [
          "Antes de mirar la etiqueta del precio, miro la de la composición. Y antes de mirar ninguna etiqueta, toco. Si no me gusta en la mano, no me va a gustar puesto, por mucho que la foto diga lo contrario.",
        ],
      },
    ],
    piezasRelacionadas: ["camisa-blanca-percha", "chaqueta-cuero-negra", "jersey-crudo-canale"],
  },
  {
    slug: "el-vestido-negro-no-es-aburrido",
    titulo: "El vestido negro no es aburrido. Aburrido es cómo lo llevamos",
    resumen: "Defensa del vestido negro y de todo lo que se puede hacer con él si se piensa un poco en el resto del look.",
    tema: "Básicos",
    fecha: "2026-08-28",
    minutos: 3,
    secciones: [
      {
        parrafos: [
          "Cada cierto tiempo alguien declara que el vestido negro está pasado de moda. Luego llega un evento, una cena, un día en que no sabes qué ponerte, y ahí está, salvándote otra vez.",
          "El vestido negro no es un look: es un lienzo. Y un lienzo en blanco solo es aburrido si no pintas nada encima.",
        ],
      },
      {
        titulo: "Tres formas de despertarlo",
        parrafos: [
          "Un accesorio con presencia: una pamela, un cinturón ancho, unos pendientes largos. Uno solo, no los tres.",
          "Un zapato que contraste: blanco, rojo, metalizado. El pie es el lugar más seguro para arriesgar.",
          "Una textura distinta encima: un abrigo de pelo, una chaqueta de punto grueso, una gabardina clara. El negro liso pide algo con relieve al lado.",
        ],
      },
    ],
    piezasRelacionadas: ["stiletto-blanco", "salones-nude", "pendientes-cristal"],
  },
  {
    slug: "el-abrigo-es-donde-hay-que-gastar",
    titulo: "Si solo vas a gastar en una prenda, que sea el abrigo",
    resumen: "Es lo que más se ve, lo que más dura y lo que más viste todo lo demás. Mi argumento a favor de un buen abrigo y en contra de tener seis malos.",
    tema: "Compras",
    fecha: "2026-08-12",
    minutos: 4,
    secciones: [
      {
        parrafos: [
          "Durante medio año, la primera y casi única prenda que ve la gente de ti es tu abrigo. Lo llevas encima de todo, en la calle, en el transporte, en la puerta del restaurante. Y sin embargo es la prenda en la que más gente escatima.",
        ],
      },
      {
        titulo: "Por qué compensa",
        parrafos: [
          "Un abrigo de lana bien cortado dura diez o quince inviernos. Divide el precio entre esos años y sale más barato que cualquier chaqueta de plumas que se estropea en dos temporadas.",
          "Y hay algo más: un buen abrigo viste lo que lleves debajo. Con un abrigo camel largo puedes llevar un chándal y parecer que has salido de una revista. Al revés no funciona.",
        ],
      },
      {
        titulo: "Qué buscar",
        parrafos: [
          "Lana en un porcentaje alto (mejor si supera el 70 %). Hombro natural, sin hombrera exagerada. Largo por debajo de la rodilla si eres alta, justo encima si no. Color: camel, gris, azul marino o negro. Los abrigos de color son una segunda compra, no la primera.",
        ],
      },
    ],
    piezasRelacionadas: ["chaqueta-cuero-negra", "chaqueta-tommy-hilfiger", "cazadora-vaquera"],
  },
  {
    slug: "por-que-no-sigo-las-tendencias",
    titulo: "Por qué he dejado de seguir la mayoría de las tendencias",
    resumen: "Las tendencias ya no duran una temporada, duran tres semanas. Mi opinión sobre qué merece la pena adoptar y qué dejar pasar.",
    tema: "Tendencias",
    fecha: "2026-07-30",
    minutos: 4,
    secciones: [
      {
        parrafos: [
          "Antes una tendencia duraba una temporada; se veía en la pasarela en febrero, en las tiendas en septiembre y en la calle hasta la primavera siguiente. Ahora aparece en un vídeo, se agota en una semana y a la siguiente ya es 'de hace tiempo'.",
          "A ese ritmo no se puede seguir nada, y no creo que haya que intentarlo.",
        ],
      },
      {
        titulo: "Mi filtro",
        parrafos: [
          "Me hago una sola pregunta: ¿me gustaría esto si nadie más lo llevara? Si la respuesta es sí, lo compro sin importar si está de moda. Si la respuesta es no, lo dejo pasar sin importar cuánto lo esté.",
          "Con ese filtro, la mayoría de las tendencias desaparecen solas. Y las pocas que quedan suelen ser las que, en realidad, siempre han estado: el vaquero recto, la gabardina, la camisa blanca, el mocasín.",
        ],
      },
      {
        titulo: "Lo que sí adopto",
        parrafos: [
          "Colores. Un color de temporada en un bolso, un jersey o unos pendientes es barato, divertido y no compromete nada. Es la única tendencia que sigo con gusto.",
        ],
      },
    ],
    piezasRelacionadas: ["bolso-rojo-asa", "vaquero-levis-azul", "nike-air-max-roja"],
  },
  {
    slug: "vestir-para-tu-cuerpo-no-contra-el",
    titulo: "Vestir para tu cuerpo, no contra él",
    resumen: "Casi todos los consejos de 'qué te favorece' parten de que hay algo que esconder. Yo creo que no. Hay algo que enseñar y el resto se equilibra.",
    tema: "Cuerpo",
    fecha: "2026-07-15",
    minutos: 5,
    secciones: [
      {
        parrafos: [
          "Me molesta la palabra 'disimular'. La mayoría de guías de estilo están escritas desde ahí: cómo disimular la cadera, cómo disimular la tripa, cómo disimular la altura. Como si el cuerpo fuera un problema y la ropa una tirita.",
          "Prefiero pensarlo al revés: cada cuerpo tiene algo que la ropa puede celebrar, y el resto se equilibra con proporciones. No con vergüenza.",
        ],
      },
      {
        titulo: "Tres ideas que sí funcionan",
        parrafos: [
          "La cintura es la palanca más potente. Marcarla, aunque sea con un cinturón fino, ordena todo el look. Subirla (tiro alto, top por dentro) alarga la pierna.",
          "El contraste va donde quieres que se mire. Un color claro o un accesorio llamativo atrae el ojo; ponlo en lo que te gusta de ti.",
          "El largo lo decide la parte más estrecha de la pierna. Faldas y vestidos terminan mejor justo por encima o por debajo de la rodilla, o en el tobillo; casi nunca en la pantorrilla.",
        ],
      },
      {
        titulo: "Y una que no",
        parrafos: [
          "'El negro adelgaza'. El negro no adelgaza: el negro aplana. Un look monocromo en cualquier color estiliza igual, y a menudo un marrón, un verde o un azul marino sientan mejor al rostro.",
        ],
      },
    ],
    piezasRelacionadas: ["vaquero-levis-azul", "cinturones-piel-marron", "salones-nude"],
  },
];

export function getArticulo(slug: string) {
  return articulos.find((a) => a.slug === slug);
}
