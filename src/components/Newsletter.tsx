"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";

type Estado = { tipo: "quieto" | "enviando" | "hecho" | "error"; mensaje?: string };

// Formulario de alta en la newsletter. Guarda el correo en nuestra base de
// datos (ver `src/lib/newsletter.ts`); la casilla de consentimiento es
// obligatoria y el enlace a la política de privacidad, también.
export function Newsletter({ origen = "web", claro = false }: { origen?: string; claro?: boolean }) {
  const [email, setEmail] = useState("");
  const [acepta, setAcepta] = useState(false);
  const [web, setWeb] = useState(""); // campo trampa para robots
  const [estado, setEstado] = useState<Estado>({ tipo: "quieto" });

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (estado.tipo === "enviando") return;
    setEstado({ tipo: "enviando" });
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consentimiento: acepta, origen, web }),
      });
      const datos = await r.json().catch(() => ({}));
      if (!r.ok) {
        setEstado({ tipo: "error", mensaje: datos.error ?? "No hemos podido apuntarte. Inténtalo más tarde." });
        return;
      }
      setEstado({
        tipo: "hecho",
        mensaje: datos.nuevo === false ? "Ya estabas apuntada. No te escribiremos dos veces." : "Apuntada. Te escribiremos cuando haya algo que merezca la pena.",
      });
      setEmail("");
      setAcepta(false);
    } catch {
      setEstado({ tipo: "error", mensaje: "No hay conexión. Inténtalo más tarde." });
    }
  }

  const texto = claro ? "text-lino" : "text-tinta";
  const suave = claro ? "text-lino/70" : "text-humo";

  if (estado.tipo === "hecho") {
    return (
      <div className={texto}>
        <p className="font-display text-2xl">Hecho.</p>
        <p className={`mt-2 text-sm ${suave}`}>{estado.mensaje}</p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className={texto}>
      <label className="block">
        <span className="sr-only">Tu correo electrónico</span>
        <div className="flex flex-wrap gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            autoComplete="email"
            className={`min-w-0 flex-1 rounded-full border px-4 py-2.5 text-sm outline-none placeholder:${claro ? "text-lino/50" : "text-humo"} ${
              claro ? "border-lino/40 bg-transparent focus:border-lino" : "border-tinta/25 bg-lino focus:border-tinta"
            }`}
          />
          <button
            type="submit"
            disabled={estado.tipo === "enviando"}
            className={`rounded-full px-6 py-2.5 text-sm transition-colors disabled:opacity-60 ${
              claro ? "bg-lino text-tinta hover:bg-arcilla hover:text-lino" : "bg-tinta text-lino hover:bg-arcilla"
            }`}
          >
            {estado.tipo === "enviando" ? "Un momento…" : "Apuntarme"}
          </button>
        </div>
      </label>

      {/* Campo trampa: invisible para las personas. */}
      <label className="hidden" aria-hidden="true">
        Web<input type="text" tabIndex={-1} autoComplete="off" value={web} onChange={(e) => setWeb(e.target.value)} />
      </label>

      <label className={`mt-3 flex items-start gap-2 text-xs leading-relaxed ${suave}`}>
        <input
          type="checkbox"
          checked={acepta}
          onChange={(e) => setAcepta(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#b04e34]"
        />
        <span>
          Acepto que {site.nombre} guarde mi correo para enviarme la newsletter. Puedo darme de baja cuando quiera.{" "}
          <Link href="/privacidad" className="underline">Política de privacidad</Link>.
        </span>
      </label>

      {estado.tipo === "error" && <p className="mt-2 text-xs text-arcilla-suave">{estado.mensaje}</p>}
    </form>
  );
}
