// src/types/formacion-academica.interface.ts
export interface FormacionAcademica {
  ID: number;
  ID_usuario: number;
  institucion: string;
  titulo: string;
  fecha_inicio?: Date | string;
  fecha_fin?: Date | string;
  descripcion?: string;
}