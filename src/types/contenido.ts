type ContenidoEstado = "activo" | "inactivo";

export interface Contenido {
    id: number,
    titulo: string,
    texto: string,
    imagen: string,
    estado?:ContenidoEstado,
    link?: string
}