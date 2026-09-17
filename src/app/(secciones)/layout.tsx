import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Páginas interiores (galería suelta, artículos, sobre): con cabecera y pie.
// La portada (`/`) no pasa por aquí: tiene su propia barra dentro de las escenas.
export default function SeccionesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
