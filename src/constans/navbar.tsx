//navbar items

export interface NavbarItem {
    name: string; //Nombre del enlace
    path: string; //Ruta a la que apunta
}

export const navbarItems: NavbarItem[] = [
    {name: "Inicio", path: "/home"},
    {name: "Equipo", path: "/team"},
    {name: "Investigación", path: "/research"},
    {name: "Difusión", path: "/diffusion"},
    {name: "Soporte y Ayuda", path: "/support"},
    
]
export interface SiteName{
    name: string
}
export const siteName = "Lab-UX"