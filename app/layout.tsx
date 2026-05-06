import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Importación directa desde la raíz del proyecto
import NavbarWrapper from "./components/NavbarWrapper";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "XAMA INDUMENTARIA",
  description: "Tienda oficial de Xama Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <CartProvider>
          <NavbarWrapper />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}