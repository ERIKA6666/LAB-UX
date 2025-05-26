// src/types/area-investigacion.interface.ts
export interface AreaInvestigacion {
  ID: number;
  nombre: string;
  descripcion?: string;
}

export interface UsuarioAreaInvestigacion {
  ID_usuario: number;
  ID_area: number;
}