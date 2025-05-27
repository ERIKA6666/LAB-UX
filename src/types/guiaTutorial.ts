// src/types/guia-tutorial.interface.ts
export type TipoRecurso = 'link' | 'video' | 'pdf' | 'imagen' | 'otro';

export interface GuiaTutorial {
  ID: number;
  titulo: string;
  descripcion?: string;
  fecha_publicacion: Date | string;
  ID_usuario?: number;
}

export interface GuiaRecurso {
  ID: number;
  ID_guia: number;
  tipo: TipoRecurso;
  recurso: string;
  descripcion?: string;
}

export interface GuiaAreaInvestigacion {
  ID_guia: number;
  ID_area: number;
}