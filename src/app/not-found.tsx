import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container-editorial py-24 text-center">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-2 font-display text-5xl">Esta página no existe.</h1>
          <Link href="/" className="mt-8 inline-block rounded-full bg-tinta px-6 py-3 text-sm text-lino hover:bg-arcilla">Volver al inicio</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
