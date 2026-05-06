"use client";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((total: number, item: any) => total + item.cantidad, 0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50" style={{
        background: "rgba(10,10,10,0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex justify-between items-center">
          <Link href="/" className="font-black italic tracking-tighter text-2xl" style={{
            background: "linear-gradient(135deg, #ff6432, #ff2d78, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            XAMA
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {cartCount > 0 && (
              <span className="text-[10px] font-black" style={{
                background: "linear-gradient(135deg, #ff6432, #ff2d78)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}