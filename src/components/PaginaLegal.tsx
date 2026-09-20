import { legal } from "@/content/legal";

const fmt = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" });

// Envoltorio común de las páginas legales: título, fecha y texto legible.
export function PaginaLegal({ eyebrow, titulo, children }: { eyebrow: string; titulo: string; children: React.ReactNode }) {
  return (
    <section className="container-editorial py-14">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 font-display text-5xl leading-[1.02] md:text-6xl">{titulo}</h1>
        <p className="mt-3 text-sm text-humo">Última actualización: {fmt.format(new Date(legal.actualizado))}</p>
        <div className="legal mt-8 space-y-4 text-base leading-relaxed">{children}</div>
      </div>
    </section>
  );
}
