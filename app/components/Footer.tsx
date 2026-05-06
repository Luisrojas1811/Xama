'use client';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20 pt-16 pb-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        
        {/* Secciones de Ayuda */}
        <div className="space-y-6">
          <h3 className="font-black uppercase italic text-sm tracking-wider">Ayuda</h3>
          <ul className="text-[11px] space-y-3 text-zinc-400 font-bold uppercase tracking-widest">
            <li className="hover:text-white cursor-pointer transition">Dudas frecuentes</li>
            <li className="hover:text-white cursor-pointer transition">Envío</li>
            <li className="hover:text-white cursor-pointer transition">Donde nos ubicamos</li>
            <li className="hover:text-white cursor-pointer transition">Devoluciones</li>
          </ul>
        </div>

        {/* Botón de Arrepentimiento */}
        <div className="flex items-start">
          <button className="border border-zinc-700 px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition">
            Botón de arrepentimiento
          </button>
        </div>
      </div>

      {/* Pie de página final */}
      <div className="max-w-7xl mx-auto border-t border-zinc-900 mt-16 pt-8 flex justify-between items-center text-[9px] text-zinc-600 font-bold tracking-[0.2em] uppercase">
        <span>© 2026 XAMA INDUMENTARIA</span>
        <span>Argentina</span>
      </div>
    </footer>
  );
}