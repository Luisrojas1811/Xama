"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [productos, setProductos] = useState<any[]>([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [cargando, setCargando] = useState(false);

  const cargarProductos = async () => {
    const { data } = await supabase
      .from("productos")
      .select("*")
      .order("id", { ascending: false });
    if (data) setProductos(data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const guardar = async () => {
    if (!nombre || !precio) return;
    setCargando(true);
    await supabase.from("productos").insert([{
      nombre,
      precio: parseInt(precio),
      imagen: imagen || null,
    }]);
    setNombre("");
    setPrecio("");
    setImagen("");
    await cargarProductos();
    setCargando(false);
  };

  const eliminar = async (id: number) => {
    const confirmar = confirm("¿Borrar este producto?");
    if (!confirmar) return;
    await supabase.from("productos").delete().eq("id", id);
    setProductos(productos.filter(p => p.id !== id));
  };

  return (
    <main className="min-h-screen pt-28 px-6 pb-20 bg-zinc-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black italic uppercase mb-10">
          Panel <span className="text-gradient-xama">XAMA</span>
        </h1>

        {/* Formulario */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm mb-10">
          <h2 className="font-bold text-sm uppercase tracking-widest text-zinc-400 mb-4">
            Nuevo Producto
          </h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nombre del producto"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              className="p-3 text-sm border rounded-xl focus:outline-none focus:border-black"
            />
            <input
              type="number"
              placeholder="Precio ($)"
              value={precio}
              onChange={e => setPrecio(e.target.value)}
              className="p-3 text-sm border rounded-xl focus:outline-none focus:border-black"
            />
            <input
              type="text"
              placeholder="URL de imagen (opcional)"
              value={imagen}
              onChange={e => setImagen(e.target.value)}
              className="p-3 text-sm border rounded-xl focus:outline-none focus:border-black"
            />
            <button
              onClick={guardar}
              disabled={cargando}
              className="bg-black text-white py-3 rounded-xl font-bold uppercase text-sm hover:bg-xama-pink transition-colors cursor-pointer"
            >
              {cargando ? "Guardando..." : "Publicar Producto"}
            </button>
          </div>
        </div>

        {/* Lista */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
          <h2 className="font-bold text-sm uppercase tracking-widest text-zinc-400 mb-4">
            Productos ({productos.length})
          </h2>
          <div className="space-y-3">
            {productos.map(p => (
              <div key={p.id} className="flex justify-between items-center p-4 border rounded-xl hover:bg-zinc-50">
                <div className="flex items-center gap-4">
                  {p.imagen ? (
                    <img src={p.imagen} alt={p.nombre} className="w-12 h-12 object-cover rounded-lg" />
                  ) : (
                    <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-300 text-xs">
                      Sin foto
                    </div>
                  )}
                  <div>
                    <p className="font-black text-sm uppercase italic">{p.nombre}</p>
                    <p className="text-xs text-zinc-400">${p.precio.toLocaleString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => eliminar(p.id)}
                  className="text-red-400 hover:text-red-600 font-bold text-xs uppercase cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            ))}
            {productos.length === 0 && (
              <p className="text-center text-zinc-300 italic py-10 text-sm">
                No hay productos todavía.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}