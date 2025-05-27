// src/types/informacion-sitio.interface.ts
export interface InformacionSitio {
  ID: number;
  nombre_sitio: string;
  descripcion?: string;
  lugar_fisico?: string;
  telefono?: string;
  email?: string;
  url?: string;
  idioma?: string;
  icono?: string;
  logo?: string;
  horario?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  twitter?: string;
  linkedin?: string;
  fecha_actualizacion?: Date | string;
}