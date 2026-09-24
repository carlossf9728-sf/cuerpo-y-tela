import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// robots.txt: dejamos indexar todo menos el aviso legal (lleva datos fiscales)
// y las rutas internas de la API.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/aviso-legal", "/api/"] },
    sitemap: `${site.url.replace(/\/$/, "")}/sitemap.xml`,
  };
}
