"use client";

// «Descargar en PDF» abre el diálogo de impresión del navegador, donde se elige
// «Guardar como PDF». Los estilos de impresión están en `globals.css`.
export function BotonImprimir({ children = "Descargar en PDF" }: { children?: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full border border-tinta px-6 py-3 text-sm transition-colors hover:border-arcilla hover:text-arcilla"
    >
      {children}
    </button>
  );
}
