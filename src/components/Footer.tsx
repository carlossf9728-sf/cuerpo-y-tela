import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "@/components/Logo";
import { legal } from "@/content/legal";
import { Newsletter } from "@/components/Newsletter";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-arena/70 bg-lino-oscuro/60">
      <div className="container-editorial grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Logo ancho={200} />
          <p className="mt-3 max-w-xs text-sm text-humo">{site.lema}</p>
          <p className="eyebrow mb-3 mt-8">La newsletter</p>
          <Newsletter origen="pie" />
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-4">Secciones</p>
          <ul className="space-y-2">
            <li><Link href="/#galeria" className="hover:text-arcilla">Galería</Link></li>
            <li><Link href="/#blog" className="hover:text-arcilla">Blog</Link></li>
            <li><Link href="/sobre" className="hover:text-arcilla">Sobre</Link></li>
            <li><Link href="/para-marcas" className="hover:text-arcilla">Para marcas</Link></li>
          </ul>
          <p className="eyebrow mb-4 mt-8">Legal</p>
          <ul className="space-y-2">
            <li><Link href="/aviso-legal" className="hover:text-arcilla">Aviso legal</Link></li>
            <li><Link href="/privacidad" className="hover:text-arcilla">Privacidad</Link></li>
            <li><Link href="/cookies" className="hover:text-arcilla">Cookies</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-4">Contacto</p>
          <ul className="space-y-2">
            <li><a href={`mailto:${site.email}`} className="hover:text-arcilla">{site.email}</a></li>
            <li><a href={site.instagram} target="_blank" rel="noreferrer" className="hover:text-arcilla">Instagram</a></li>
            <li><a href={site.tiktok} target="_blank" rel="noreferrer" className="hover:text-arcilla">TikTok</a></li>
          </ul>
        </div>
      </div>
      <div className="container-editorial flex flex-col gap-2 border-t border-arena/70 py-6 text-xs text-humo md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} {site.nombre}. Todos los derechos reservados.</p>
        <p>
          Fotografías de <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="underline">Unsplash</a>. Las opiniones son personales.
          {legal.afiliados && " Algunos enlaces a tiendas son de afiliado: si compras a través de ellos podemos recibir una comisión, sin coste para ti."}
        </p>
      </div>
    </footer>
  );
}
