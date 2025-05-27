// src/types/experiencia-laboral.interface.ts
export interface ExperienciaLaboral {
  ID: number;
  ID_usuario: number;
  empresa: string;
  puesto: string;
  fecha_inicio?: Date | string;
  fecha_fin?: Date | string;
  descripcion?: string;
}