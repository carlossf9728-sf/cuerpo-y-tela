// Enlaces de afiliado (Awin). Cuando una pieza tiene `compra` (la URL normal
// de la tienda), el botón «Ver en la tienda» de su ficha pasa por Awin para
// que la comisión se atribuya a nuestra cuenta.
//
// RELLENA:
//   - `publisherId`: tu ID de publisher en Awin (arriba a la derecha del panel,
//     un número de 6-7 cifras).
//   - `programas`: por cada marca a cuyo programa te hayan aceptado, su ID de
//     anunciante ("Advertiser ID" / awinmid) tal y como aparece en Awin.
// Las marcas que no estén aquí enlazan directamente a la tienda, sin afiliado.
export const afiliados = {
  publisherId: "",
  programas: {} as Record<string, string>,
};

// URL final para el botón de compra: deeplink de Awin si hay programa para la
// marca; si no, la URL tal cual.
export function enlaceCompra(marca: string, url: string) {
  const mid = afiliados.programas[marca];
  if (!afiliados.publisherId || !mid) return { url, afiliado: false };
  const ued = encodeURIComponent(url);
  return {
    url: `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=${afiliados.publisherId}&ued=${ued}`,
    afiliado: true,
  };
}
