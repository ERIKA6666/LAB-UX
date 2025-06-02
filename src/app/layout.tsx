'use client'
import LayoutSwitcher from "./layoutSwitcher";
import { useState, useEffect } from 'react'
interface LayoutProps {
  children: React.ReactNode; // Define el tipo de children
}


export default function RootLayout({ children } : LayoutProps) {
   const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <html lang="es">
      <body>
        <LayoutSwitcher>{children}</LayoutSwitcher>
      </body>
    </html>
  );
}