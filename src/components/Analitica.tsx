import Script from "next/script";

// Analítica de visitas. Usamos Plausible porque no pone cookies ni recoge datos
// personales: por eso la web puede seguir sin banner de consentimiento.
//
// Para activarla, define en Vercel (o en `.env.local`):
//   NEXT_PUBLIC_ANALITICA_DOMINIO=cuerpoytela.com
// Opcional, si usas un Plausible propio o un proxy:
//   NEXT_PUBLIC_ANALITICA_SRC=https://plausible.io/js/script.js
//
// Sin esas variables no se carga nada (por ejemplo, en local).
//
// AVISO: no metas aquí Google Analytics. Usa cookies y haría falta un banner de
// consentimiento y reescribir las páginas legales.
export function Analitica() {
  const dominio = process.env.NEXT_PUBLIC_ANALITICA_DOMINIO;
  if (!dominio) return null;
  const src = process.env.NEXT_PUBLIC_ANALITICA_SRC ?? "https://plausible.io/js/script.outbound-links.js";
  return <Script defer data-domain={dominio} src={src} strategy="afterInteractive" />;
}
