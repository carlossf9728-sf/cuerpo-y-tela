"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

// Intro de entrada a la web, hecha con código (sin vídeo):
//   1. Las letras C · Y · T se dibujan trazo a trazo.
//   2. Se desvanecen y la figura del logo se revela de arriba abajo.
//   3. Aparece "CUERPO Y TELA" y el logo completo vuela hasta su sitio en
//      la cabecera mientras se descubre la portada.
// Se ve una vez por visita (sessionStorage), se salta con un toque y no se
// muestra a quien tiene activado "reducir movimiento".
//
// El logo final se compone con `simbolo.png` (la figura, recortada de
// `logo.png` a 320 px de 932) y `logo.png` recortado a la parte del texto,
// para que el último fotograma sea exactamente el logo de la cabecera.

const CLAVE = "cyt:intro";
type Fase = "letras" | "figura" | "texto" | "vuelo" | "fin";

// Tiempos (ms) de cada fase desde el arranque.
const T_FIGURA = 1900;
const T_TEXTO = 3300;
const T_VUELO = 4300;
const DURACION_VUELO = 900;

// ¿Toca mostrar la intro? No si ya se vio en esta visita, si la persona
// prefiere menos movimiento o si ha entrado por un enlace directo (#galeria).
function debeMostrarse() {
  try {
    if (sessionStorage.getItem(CLAVE) === "1") return false;
  } catch {}
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return window.location.hash === "";
}
const sinSuscripcion = () => () => {};

export function Intro({ destinoSelector }: { destinoSelector: string }) {
  const [fase, setFase] = useState<Fase>("letras");
  const [visible, setVisible] = useState(true);
  const [saltada, setSaltada] = useState(false);
  const mostrar = useSyncExternalStore(sinSuscripcion, debeMostrarse, () => true);
  const caja = useRef<HTMLDivElement>(null);
  const temporizadores = useRef<number[]>([]);

  const terminar = useCallback(() => {
    try {
      sessionStorage.setItem(CLAVE, "1");
    } catch {}
    setVisible(false);
  }, []);

  // Fase de vuelo: el logo se desplaza y encoge hasta el logo de la cabecera.
  const volar = useCallback(() => {
    const el = caja.current;
    const destino = document.querySelector(destinoSelector);
    if (el && destino) {
      const a = el.getBoundingClientRect();
      const b = destino.getBoundingClientRect();
      const escala = b.width / a.width;
      const dx = b.left + b.width / 2 - (a.left + a.width / 2);
      const dy = b.top + b.height / 2 - (a.top + a.height / 2);
      el.style.transform = `translate(${dx}px, ${dy}px) scale(${escala})`;
    }
    setFase("vuelo");
    temporizadores.current.push(window.setTimeout(terminar, DURACION_VUELO));
  }, [destinoSelector, terminar]);

  useEffect(() => {
    if (!mostrar) return;
    const t = temporizadores.current;
    t.push(window.setTimeout(() => setFase("figura"), T_FIGURA));
    t.push(window.setTimeout(() => setFase("texto"), T_TEXTO));
    t.push(window.setTimeout(volar, T_VUELO));
    return () => t.forEach(clearTimeout);
  }, [mostrar, volar]);

  function saltar() {
    if (fase === "vuelo" || fase === "fin") return;
    temporizadores.current.forEach(clearTimeout);
    temporizadores.current = [];
    setSaltada(true);
    // Un instante para que el logo completo se pinte antes de volar.
    temporizadores.current.push(window.setTimeout(volar, 60));
  }

  if (!mostrar || !visible) return null;

  const figuraVisible = saltada || fase !== "letras";
  const textoVisible = saltada || fase === "texto" || fase === "vuelo";
  const enVuelo = fase === "vuelo";

  return (
    <div
      data-intro
      className={`intro fixed inset-0 z-[60] flex items-center justify-center bg-lino ${enVuelo ? "intro-saliendo" : ""}`}
      onClick={saltar}
      role="presentation"
      aria-hidden="true"
    >
      {/* Letras C · Y · T dibujándose */}
      <svg
        viewBox="0 0 900 300"
        className={`intro-letras absolute w-[min(720px,90vw)] ${figuraVisible ? "intro-letras-fuera" : ""}`}
        style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 500 }}
      >
        <text x="120" y="230" fontSize="260" className="intro-letra" style={{ animationDelay: "0.15s" }} fill="var(--color-arcilla)" stroke="var(--color-arcilla)">C</text>
        <text x="380" y="230" fontSize="260" className="intro-letra" style={{ animationDelay: "0.55s" }} fill="var(--color-tinta)" stroke="var(--color-tinta)">Y</text>
        <text x="640" y="230" fontSize="260" className="intro-letra" style={{ animationDelay: "0.95s" }} fill="#8c3a26" stroke="#8c3a26">T</text>
      </svg>

      {/* Logo compuesto: figura + texto, con la proporción exacta de logo.png (932×347) */}
      <div
        ref={caja}
        className={`intro-caja relative aspect-[932/347] w-[min(560px,calc(100vw-3rem))] ${saltada ? "intro-instantanea" : ""}`}
      >
        <Image
          src="/simbolo.png"
          alt=""
          width={320}
          height={347}
          priority
          className={`intro-figura absolute left-0 top-0 h-full w-auto ${figuraVisible ? "intro-figura-visible" : ""}`}
        />
        <Image
          src="/logo.png"
          alt=""
          width={932}
          height={347}
          priority
          className={`intro-texto absolute inset-0 h-full w-full ${textoVisible ? "intro-texto-visible" : ""}`}
        />
      </div>

      <button
        type="button"
        onClick={saltar}
        className={`absolute bottom-8 right-8 text-xs uppercase tracking-[0.22em] text-humo transition-opacity hover:text-arcilla ${enVuelo ? "opacity-0" : ""}`}
      >
        Saltar →
      </button>
    </div>
  );
}
