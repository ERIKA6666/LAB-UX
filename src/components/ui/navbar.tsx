"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { navbarItems, siteName } from "@/constans/navbar"

export function Navbar() {
    const [mobileMenuOpen, setMobileOpen] = useState(false)
    const pathname = usePathname()
    
    //Agegar un console log para mostrar la 
    // ruta que en la que se esta
    console.log("Ruta actual: ", pathname)

    return(
        <nav className="bg-white shadow-sm">
            <div className=" mx-auto max-w-7x1 px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    {/*Logo del sitio */}
                    <div className="flex items-center">
                         {/*Primer elemento, el home */}
                        <Link href={navbarItems[0].path} className="flex items-center">
                            <span className="text-xl font-bold text-primary text-gray-800">
                                {siteName}
                            </span>
                        </Link>
                    </div>
                    {/* Enlaces de navegación version desktop */}
                    <div className="hidden md:flex
                    md:items-center md:space-x-4">
                        {navbarItems.map((item) => (
                             <Link
                             key={item.name}
                             href={item.path}
                             className={cn(
                               "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                               pathname === item.path
                                 ? "bg-primary/10 text-gray-700 bg-gray-100"
                                 : "text-gray-700 hover:bg-gray-100 hover:text-gray-70",
                             )}
                           >
                             {item.name}
                           </Link>
                        ))}
                        <Button asChild className="ml-4 bg-black text-white hover:bg-gray-800">
                            <Link href="">Iniciar Sesión</Link>
                        </Button>
                    </div>
                    {/* Boton del menu movil */}
                    <div className="flex items-center md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileOpen
                            (!mobileMenuOpen)}
                            aria-expanded={mobileMenuOpen}
                            className="text-gray-700"
                        >
                            <span className="sr-only">Abrir Menù</span>
                            {mobileMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>
            {/* Menu movil */}
            {mobileMenuOpen && (
                <div className="md:hidden">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        {navbarItems.map((item) => (
                            <Link
                            key={item.name}
                            href={item.path}
                            className={cn(
                                "block rounded-md px-3 py-2 text-base font-medium",
                                pathname === item.path
                                ? "bg-primary/10 text-gray-700 bg-gray-100"
                                : "text-gray-700 hover:bg-gray-100 hover:text-gray-70",
                            )}
                            onClick={() => setMobileOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="pt-2">
                            <Button asChild className="w-full justify-center bg-black text-white hover:bg-gray-800">
                                <Link href="/login" onClick={() => setMobileOpen(false)}>
                                Iniciar Sesión
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}