// Muestra el NIF sin que exista como texto en la página: cada carácter lo
// pinta el CSS (`content: attr(data-c)`), así no lo recogen los rastreadores
// que copian datos de contacto, ni se puede seleccionar. Las personas lo
// leen igual y los lectores de pantalla lo reciben por `aria-label`.
export function Nif({ valor }: { valor: string }) {
  // Para el lector de pantalla, con espacios de anchura cero entre caracteres:
  // se lee igual, pero el número no aparece seguido en el código de la página.
  const legible = valor.split("").join("\u200b");
  return (
    <span className="nif" aria-label={legible} translate="no" data-nosnippet="">
      {valor.split("").map((c, i) => (
        <span key={i} className="nif-c" data-c={c} aria-hidden="true" />
      ))}
    </span>
  );
}
