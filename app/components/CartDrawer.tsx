"use client";
import { useCart } from "../context/CartContext";
import { useState } from "react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const TARIFAS = [
  { zona: "CABA", cpDesde: 1000, cpHasta: 1499, precio: 3000 },
  { zona: "GBA Zona 1", cpDesde: 1500, cpHasta: 1999, precio: 4500 },
  { zona: "GBA Zona 2", cpDesde: 2000, cpHasta: 2999, precio: 6000 },
  { zona: "Interior", cpDesde: 3000, cpHasta: 9999, precio: 9500 },
];

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateCantidad } = useCart();
  const [cp, setCp] = useState("");
  const [envio, setEnvio] = useState<any>(null);
  const [errorCp, setErrorCp] = useState("");

  const subtotal = cart.reduce((acc: number, item: any) => acc + item.precio * item.cantidad, 0);
  const total = subtotal + (envio ? envio.precio : 0);

  const calcularEnvio = () => {
    setErrorCp("");
    const cpNum = Number(cp);
    if (!cpNum || cp.length < 4) { setErrorCp("CP inválido"); return; }
    const zona = TARIFAS.find(t => cpNum >= t.cpDesde && cpNum <= t.cpHasta);
    if (!zona) { setErrorCp("No enviamos a esa zona todavía"); return; }
    setEnvio(zona);
  };

  const finalizarCompra = () => {
    const numero = "5491157440973"; // ← número de tu amiga
    const items = cart.map((item: any) =>
      `• ${item.nombre} (Talle ${item.talle || "s/t"}) x${item.cantidad} — $${(item.precio * item.cantidad).toLocaleString()}`
    ).join("\n");
    const envioTexto = envio ? `\n📦 Envío ${envio.zona}: $${envio.precio.toLocaleString()}` : "";
    const msg = `Hola XAMA! 🔥 Quiero pedir:\n\n${items}${envioTexto}\n\n💰 *Total: $${total.toLocaleString()}*`;
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }} onClick={onClose} />

      <div className="relative w-full max-w-sm h-full flex flex-col" style={{
        background: "linear-gradient(180deg, #0f0f0f 0%, #1a0533 100%)",
        borderLeft: "1px solid rgba(255,255,255,0.08)"
      }}>
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <h2 className="text-lg font-black italic uppercase tracking-tight" style={{ color: "white" }}>Tu bolsa</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
              {cart.reduce((a: number, i: any) => a + i.cantidad, 0)} items
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all" style={{
            background: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.6)"
          }}>
            <span className="text-sm font-black">✕</span>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
              <span className="text-5xl">🛍️</span>
              <p className="font-black italic uppercase text-sm" style={{ color: "rgba(255,255,255,0.2)" }}>Tu bolsa está vacía</p>
            </div>
          ) : (
            cart.map((item: any) => (
              <div key={`${item.id}-${item.talle}`} className="flex gap-3 items-start p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0" style={{ background: "rgba(255,255,255,0.05)" }}>
                  {item.imagen ? (
                    <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[8px] font-black italic" style={{ color: "rgba(255,255,255,0.15)" }}>XAMA</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-xs uppercase italic truncate" style={{ color: "rgba(255,255,255,0.9)" }}>{item.nombre}</p>
                  <p className="text-[10px] font-bold uppercase mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Talle {item.talle || "—"}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 px-2 py-1 rounded-lg" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                      <button onClick={() => updateCantidad(item.id, item.talle, item.cantidad - 1)} className="text-xs font-black cursor-pointer w-4 text-center" style={{ color: "rgba(255,255,255,0.4)" }}>−</button>
                      <span className="text-xs font-black w-4 text-center" style={{ color: "white" }}>{item.cantidad}</span>
                      <button onClick={() => updateCantidad(item.id, item.talle, item.cantidad + 1)} className="text-xs font-black cursor-pointer w-4 text-center" style={{ color: "rgba(255,255,255,0.4)" }}>+</button>
                    </div>
                    <span className="font-black text-sm" style={{
                      background: "linear-gradient(90deg, #ff6432, #ff2d78)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}>${(item.precio * item.cantidad).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 space-y-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {/* CP */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Calcular envío</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Código postal"
                  value={cp}
                  onChange={e => setCp(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                />
                <button onClick={calcularEnvio} className="px-3 py-2 rounded-xl text-[10px] font-black uppercase cursor-pointer" style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.1)" }}>
                  OK
                </button>
              </div>
              {errorCp && <p className="text-[10px] mt-1 font-bold" style={{ color: "#ff6432" }}>{errorCp}</p>}
              {envio && (
                <div className="flex justify-between items-center mt-2 px-3 py-2 rounded-xl" style={{ background: "rgba(0,200,150,0.1)", border: "1px solid rgba(0,200,150,0.2)" }}>
                  <p className="text-[10px] font-black uppercase" style={{ color: "#00c896" }}>{envio.zona}</p>
                  <p className="text-[10px] font-black" style={{ color: "#00c896" }}>${envio.precio.toLocaleString()}</p>
                </div>
              )}
            </div>

            {/* Totales */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                <span className="font-bold uppercase">Subtotal</span>
                <span className="font-black">${subtotal.toLocaleString()}</span>
              </div>
              {envio && (
                <div className="flex justify-between text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <span className="font-bold uppercase">Envío</span>
                  <span className="font-black">${envio.precio.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-sm font-black uppercase" style={{ color: "white" }}>Total</span>
                <span className="text-xl font-black" style={{ color: "white" }}>${total.toLocaleString()}</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={finalizarCompra}
              className="w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest cursor-pointer transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #ff6432, #ff2d78, #a855f7)", color: "white" }}
            >
              📲 Finalizar por WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}