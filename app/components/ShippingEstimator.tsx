"use client";
import { useState } from "react";

export default function ShippingEstimator() {
  const [cp, setCp] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);

  const calcularEnvio = () => {
    const cpNum = parseInt(cp);

    if (!cp || isNaN(cpNum)) {
      setMensaje("Ingresá un CP válido (solo números).");
      return;
    }

    // LÓGICA DE ZONAS (Saliendo desde CABA)
    if (cpNum >= 1000 && cpNum <= 1499) {
      // CABA (Códigos Postales del 1000 al 1499)
      setMensaje("📍 Envío Local CABA: $4.500 (Moto 24hs)");
    } else if (cpNum >= 1600 && cpNum <= 1900) {
      // GBA (Zona Norte, Sur, Oeste)
      setMensaje("🚚 GBA / Buenos Aires: $6.200 (Correo o Moto)");
    } else {
      // RESTO DEL PAÍS
      setMensaje("🇦🇷 Envío al Interior: $8.500 (Correo Argentino)");
    }
  };

  return (
    <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100 my-4">
      <h4 className="text-[10px] font-black uppercase italic mb-3 tracking-widest text-zinc-400">
        Simulador de Envío
      </h4>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Tu CP (Ej: 1425)"
          value={cp}
          onChange={(e) => setCp(e.target.value)}
          className="border border-zinc-200 px-3 py-2 text-xs w-full focus:outline-none focus:border-xama-pink bg-white"
        />
        <button
          onClick={calcularEnvio}
          className="bg-black text-white px-3 py-2 text-[10px] font-bold uppercase italic hover:bg-xama-pink transition-colors"
        >
          Calcular
        </button>
      </div>
      
      {mensaje && (
        <div className="mt-3 p-2 border-l-2 border-xama-pink bg-white">
          <p className="text-[11px] font-bold text-zinc-800 italic">
            {mensaje}
          </p>
        </div>
      )}
    </div>
  );
}