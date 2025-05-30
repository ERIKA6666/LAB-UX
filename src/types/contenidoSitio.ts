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
  fecha_creacion: string;
  fecha_actualizacion?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}