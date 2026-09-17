import { marcas } from "@/content/marcas";

// Barra de marcas en movimiento continuo. Dos filas en sentidos opuestos;
// cada fila duplica la lista para que el bucle no se note.
export function Marquesina({ className = "" }: { className?: string }) {
  const mitad = Math.ceil(marcas.length / 2);
  const filas = [marcas.slice(0, mitad), marcas.slice(mitad)];

  return (
    <div className={`marquesina-pista select-none overflow-hidden ${className}`} aria-label="Marcas que seguimos">
      {filas.map((fila, i) => (
        <div
          key={i}
          className="marquesina py-1"
          data-inversa={i === 1}
          style={{ "--duracion": `${fila.length * 3.2}s` } as React.CSSProperties}
        >
          {[...fila, ...fila].map((m, j) => (
            <span
              key={j}
              aria-hidden={j >= fila.length}
              className="flex items-center whitespace-nowrap font-display text-2xl md:text-3xl"
            >
              <span className={j % 3 === 1 ? "italic text-arcilla" : ""}>{m}</span>
              <span className="mx-6 h-1.5 w-1.5 rounded-full bg-arcilla/60 md:mx-8" aria-hidden="true" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
