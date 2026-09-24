// Tienda oficial de cada marca que aparece en la galería. Sirve para el botón
// «Ver en la tienda» de las fichas cuando la pieza no tiene una URL propia en
// `compra`: así no hay que escribir el enlace pieza a pieza.
//
// Se enlaza a la portada o a la sección de mujer, no a un producto concreto,
// porque los enlaces de producto caducan en cuanto la tienda lo retira.
// Si la marca tiene programa en Awin (ver `afiliados.ts`), el enlace se
// convierte solo en enlace de afiliado.
export const tiendas: Record<string, string> = {
  "Nike": "https://www.nike.com/es/w/mujer-5e1x6",
  "adidas": "https://www.adidas.es/mujer",
  "New Balance": "https://www.newbalance.es/mujer/",
  "Converse": "https://www.converse.com/es/es/c/mujer",
  "Vans": "https://www.vans.es/shop/es-es/vans-es/mujer",
  "Dr. Martens": "https://www.drmartens.com/es/es/c/mujer",
  "Birkenstock": "https://www.birkenstock.com/es/mujer/",
  "Timberland": "https://www.timberland.es/shop/es/tbl-es/mujer",
  "UGG": "https://www.ugg.com/es/mujer/",
  "Levi's": "https://www.levi.com/ES/es_ES/ropa/mujer/c/levi_clothing_women",
  "Tommy Jeans": "https://es.tommy.com/tommy-jeans/mujer",
  "Champion": "https://www.champion.com/es/mujer",
  "Lacoste": "https://www.lacoste.com/es/lacoste/mujer/",
  "Michael Kors": "https://www.michaelkors.eu/es_ES/mujer/",
  "Coach": "https://es.coach.com/shop/mujer",
  "Gucci": "https://www.gucci.com/es/es/ca/women-c-women",
  "Louis Vuitton": "https://es.louisvuitton.com/esp-es/mujer/_/N-tg0ftn0",
  "Ray-Ban": "https://www.ray-ban.com/spain/mujer",
  "Fjällräven": "https://www.fjallraven.com/es/es-es/",
};

// URL de tienda para una marca, si la conocemos.
export function tiendaDe(marca: string): string | undefined {
  return tiendas[marca];
}
