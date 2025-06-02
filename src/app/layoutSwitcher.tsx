'use client'
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LayoutNormal from "./layoutNormal";
import LayoutAdmin from "./layoutAdmin";
import  "../styles/globals.css"; // Asegúrate de importar tus estilos globales

import { getUsuarioActual, cerrarSesion } from "../hooks/islogin"; // Ajusta según tu auth

interface LayoutProps {
  children: React.ReactNode; // Define el tipo de children
}


const LayoutSwitcher = ({ children }: LayoutProps) => {
  const [usuario, setUsuario] = useState(null);
  const pathname : string | null = usePathname() ?? "/";

  useEffect(() => {
    const user = getUsuarioActual();
    setUsuario(user);
  }, []);

  const handleLogout = () => {
    cerrarSesion();
    setUsuario(null);
    window.location.href = "/";
  };

  // Si es una ruta de admin y el usuario está logueado, usa LayoutAdmin
  if (usuario && pathname.startsWith("/admin")) {
    return <LayoutAdmin>{children}</LayoutAdmin>;
  }

  // En cualquier otro caso, usa LayoutNormal
  return <LayoutNormal>{children}</LayoutNormal>;
};

export default LayoutSwitcher;