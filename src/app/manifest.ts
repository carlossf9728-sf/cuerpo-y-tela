import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Manifest PWA: permite "instalar" la web en el móvil como si fuera una app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.nombre,
    short_name: site.nombre,
    description: site.descripcion,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f0e8",
    theme_color: "#f5f0e8",
    lang: "es",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
