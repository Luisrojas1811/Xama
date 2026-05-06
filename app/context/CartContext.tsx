"use client";
import React, { createContext, useContext, useState } from 'react';

interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  imagen?: string;
  talle?: string;
  cantidad: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number, talle?: string) => void;
  updateCantidad: (id: number, talle: string | undefined, cantidad: number) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: any) => {
    setCart((prev) => {
      // Si tiene talle, diferenciar por id + talle
      const existing = prev.find(item => 
        item.id === product.id && item.talle === product.talle
      );
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.talle === product.talle
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const removeFromCart = (id: number, talle?: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.talle === talle)));
  };

  const updateCantidad = (id: number, talle: string | undefined, cantidad: number) => {
    if (cantidad <= 0) {
      removeFromCart(id, talle);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.talle === talle
          ? { ...item, cantidad }
          : item
      )
    );
  };

  const cartCount = cart.reduce((total, item) => total + item.cantidad, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCantidad, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};