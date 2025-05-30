// src/types/glosario.interface.ts
export interface Glosario {
  ID: number;
  termino: string;
  descripcion: string;
  fecha_creacion: Date | string;
  ID_usuario?: number;
}