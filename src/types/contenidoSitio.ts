// src/types/contenido-sitio.interface.ts
export type TipoContenido = 'banner' | 'mision' | 'vision' | 'valores' | 'otro';
export type EstadoContenido = 'activo' | 'inactivo';

export interface ContenidoSitio {
  ID: number;
  tipo: TipoContenido;
  titulo: string;
  texto?: string;
  imagen?: string;
  link_redireccion?: string;
  estado: EstadoContenido;
  orden?: number;
  fecha_creacion: Date | string;
  fecha_actualizacion?: Date | string;
}