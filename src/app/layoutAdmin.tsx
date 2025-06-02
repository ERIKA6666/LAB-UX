'use client'
import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/ui/admin-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Panel de Administración",
  description: "Panel de administración para gestionar el contenido del sitio",
}

export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SidebarProvider>
            <div className="flex min-h-screen">
              <AdminSidebar />
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

