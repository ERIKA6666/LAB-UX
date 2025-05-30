// src/types/solicitud-contacto.interface.ts
export type EstadoSolicitud = 'nuevo' | 'en_proceso' | 'respondido' | 'cerrado';

export interface SolicitudContacto {
  ID: number;
  nombre: string;
  apellido: string;
  email: string;
  area_interes?: string;
  mensaje: string;
  fecha: Date | string;
  estado: EstadoSolicitud;
}