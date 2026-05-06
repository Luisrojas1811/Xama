"use client";
import dynamic from "next/dynamic";

const NavbarDynamic = dynamic(() => import("./Navbar"), { ssr: false });

export default function NavbarWrapper() {
  return <NavbarDynamic />;
}