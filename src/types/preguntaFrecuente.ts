// src/types/pregunta-frecuente.interface.ts
export interface PreguntaFrecuente {
  ID: number;
  pregunta: string;
  respuesta: string;
  orden?: number;
  fecha_creacion: Date | string;
  fecha_actualizacion?: Date | string;
}