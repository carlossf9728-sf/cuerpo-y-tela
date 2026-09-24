import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Analitica } from "@/components/Analitica";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.nombre} — ${site.lema}`,
    template: `%s · ${site.nombre}`,
  },
  description: site.descripcion,
  metadataBase: new URL(site.url),
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: `${site.nombre} — ${site.lema}`,
    description: site.descripcion,
    siteName: site.nombre,
    url: site.url,
    locale: "es_ES",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: `${site.nombre} — ${site.lema}`, description: site.descripcion },
};

export const viewport: Viewport = {
  themeColor: "#f5f0e8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Analitica />
      </body>
    </html>
  );
}
