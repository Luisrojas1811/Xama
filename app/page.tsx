"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/app/context/CartContext";
import dynamic from "next/dynamic";

const TALLES = ["XS", "S", "M", "L", "XL"];

function Tienda() {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState<any[]>([]);
  const [tallesSeleccionados, setTallesSeleccionados] = useState<Record<number, string>>({});
  const [agregado, setAgregado] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const cargar = async () => {
      const { data } = await supabase
        .from("productos")
        .select("*")
        .order("id", { ascending: false });
      if (data) setProductos(data);
    };
    cargar();
  }, []);

  const handleAgregar = (prod: any) => {
    const talle = tallesSeleccionados[prod.id];
    if (!talle) { alert("Seleccioná un talle primero"); return; }
    addToCart({ ...prod, talle });
    setAgregado(prev => ({ ...prev, [prod.id]: true }));
    setTimeout(() => setAgregado(prev => ({ ...prev, [prod.id]: false })), 1500);
  };

  return (
    <main className="min-h-screen" style={{
      background: "linear-gradient(135deg, #0f0f0f 0%, #1a0533 30%, #0d1f4a 60%, #0f0f0f 100%)"
    }}>
      {/* Fondo decorativo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,100,50,0.15) 0%, transparent 70%)"
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "-10%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,150,0.12) 0%, transparent 70%)"
        }} />
        <div style={{
          position: "absolute", top: "40%", left: "30%",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(150,50,255,0.1) 0%, transparent 70%)"
        }} />
      </div>

      <div className="relative z-10">
        {/* HERO */}
        <div className="pt-32 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
          <p className="text-[10px] font-black tracking-[0.5em] uppercase mb-4" style={{ color: "#ff6432" }}>
            ✦ Nueva colección 2026
          </p>
          <h1 className="font-black italic uppercase tracking-tighter leading-none mb-6" style={{
            fontSize: "clamp(60px, 12vw, 120px)",
            background: "linear-gradient(135deg, #ff6432 0%, #ff2d78 40%, #a855f7 80%, #00c896 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            XAMA
          </h1>
          <p className="font-black uppercase tracking-[0.3em] text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
            Indumentaria Deportiva
          </p>
          <div className="mt-8 h-[1px]" style={{ background: "linear-gradient(90deg, #ff6432, #ff2d78, #a855f7, transparent)" }} />
        </div>

        {/* GRILLA */}
        <div className="px-4 md:px-8 max-w-6xl mx-auto pb-32">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {productos.map((prod) => (
              <div key={prod.id} className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1" style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)"
              }}>
                {/* IMAGEN */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  {prod.imagen ? (
                    <img src={prod.imagen} alt={prod.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <span className="font-black italic text-2xl" style={{ color: "rgba(255,255,255,0.1)" }}>XAMA</span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 text-[8px] font-black tracking-widest px-2 py-1 rounded-full uppercase" style={{
                    background: "linear-gradient(135deg, #ff6432, #ff2d78)",
                    color: "white"
                  }}>
                    NEW
                  </div>
                </div>

                {/* INFO */}
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="font-black italic uppercase text-xs tracking-tight mb-1 truncate" style={{ color: "rgba(255,255,255,0.9)" }}>
                    {prod.nombre}
                  </h3>
                  <p className="font-black text-base mb-3" style={{
                    background: "linear-gradient(90deg, #ff6432, #ff2d78)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    ${prod.precio.toLocaleString()}
                  </p>

                  {/* TALLES */}
                  <div className="flex gap-1 flex-wrap mb-3">
                    {TALLES.map(t => (
                      <button
                        key={t}
                        onClick={() => setTallesSeleccionados(prev => ({ ...prev, [prod.id]: t }))}
                        className="text-[9px] font-black px-2 py-1 rounded-lg transition-all cursor-pointer"
                        style={tallesSeleccionados[prod.id] === t ? {
                          background: "linear-gradient(135deg, #ff6432, #a855f7)",
                          color: "white",
                          border: "1px solid transparent"
                        } : {
                          background: "transparent",
                          color: "rgba(255,255,255,0.4)",
                          border: "1px solid rgba(255,255,255,0.15)"
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* BOTÓN */}
                  <button
                    onClick={() => handleAgregar(prod)}
                    className="mt-auto w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer"
                    style={agregado[prod.id] ? {
                      background: "#00c896",
                      color: "white"
                    } : tallesSeleccionados[prod.id] ? {
                      background: "linear-gradient(135deg, #ff6432, #ff2d78, #a855f7)",
                      color: "white"
                    } : {
                      background: "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.3)",
                      border: "1px solid rgba(255,255,255,0.1)"
                    }}
                  >
                    {agregado[prod.id] ? "✓ Agregado" : "+ Agregar"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {productos.length === 0 && (
            <div className="text-center py-32">
              <p className="font-black italic text-3xl uppercase" style={{ color: "rgba(255,255,255,0.1)" }}>
                Cargando...
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default dynamic(() => Promise.resolve(Tienda), { ssr: false });