import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { articulos } from "@/content/opinion";

// Mapa del sitio para Google (se sirve en /sitemap.xml). El aviso legal queda
// fuera a propósito: no se indexa.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (ruta: string) => `${site.url.replace(/\/$/, "")}${ruta}`;
  const ultimoArticulo = articulos.reduce((a, b) => (a.fecha > b.fecha ? a : b));

  return [
    { url: url("/"), lastModified: new Date(ultimoArticulo.fecha), changeFrequency: "weekly", priority: 1 },
    { url: url("/galeria"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/opinion"), lastModified: new Date(ultimoArticulo.fecha), changeFrequency: "weekly", priority: 0.9 },
    ...articulos.map((a) => ({
      url: url(`/opinion/${a.slug}`),
      lastModified: new Date(a.fecha),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    { url: url("/sobre"), changeFrequency: "yearly" as const, priority: 0.5 },
    { url: url("/para-marcas"), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: url("/privacidad"), changeFrequency: "yearly" as const, priority: 0.2 },
    { url: url("/cookies"), changeFrequency: "yearly" as const, priority: 0.2 },
  ];
}
