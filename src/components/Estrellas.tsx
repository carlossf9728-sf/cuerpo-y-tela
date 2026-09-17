// Valoración de 1 a 5 estrellas.
export function Estrellas({ valor, className = "" }: { valor: number; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`Valoración: ${valor} de 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 20 20"
          className={`h-[1em] w-[1em] ${n <= valor ? "fill-arcilla" : "fill-none stroke-current opacity-40"}`}
          strokeWidth={1.4}
          aria-hidden="true"
        >
          <path d="M10 1.8l2.5 5.3 5.8.7-4.3 4 1.1 5.8L10 14.8l-5.1 2.8 1.1-5.8-4.3-4 5.8-.7z" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  );
}
