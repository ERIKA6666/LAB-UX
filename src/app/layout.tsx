'use client'
import LayoutSwitcher from "./layoutSwitcher";
interface LayoutProps {
  children: React.ReactNode; // Define el tipo de children
}


export default function RootLayout({ children } : LayoutProps) {
  return (
    <html lang="es">
      <body>
        <LayoutSwitcher>{children}</LayoutSwitcher>
      </body>
    </html>
  );
}