// Libreta y lápiz: el icono clásico de un blog. Trazado a línea para que
// vaya con el resto de la web (sin relleno, hereda el color del texto).
export function IconoBlog({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Libreta con anillas */}
      <rect x="14" y="10" width="30" height="44" rx="3" />
      <line x1="14" y1="19" x2="9" y2="19" />
      <line x1="14" y1="28" x2="9" y2="28" />
      <line x1="14" y1="37" x2="9" y2="37" />
      <line x1="14" y1="46" x2="9" y2="46" />
      {/* Renglones */}
      <line x1="21" y1="22" x2="37" y2="22" />
      <line x1="21" y1="30" x2="37" y2="30" />
      <line x1="21" y1="38" x2="31" y2="38" />
      {/* Lápiz cruzado */}
      <path d="M32 50 L52 30 L57 35 L37 55 L31 56.5 Z" fill="currentColor" fillOpacity="0.12" />
      <line x1="48" y1="34" x2="53" y2="39" />
      <line x1="32" y1="50" x2="37" y2="55" />
    </svg>
  );
}
