// src/types/guia-tutorial.interface.ts
export type TipoRecurso = 'link' | 'video' | 'pdf' | 'imagen' | 'otro';

export interface GuiaTutorial {
  ID: number;
  titulo: string;
  descripcion: string;
  fecha_publicacion: string;
  ID_usuario: number;
  categoria: string;
  imagen?: string;
  imagen_url?: string;
  recursos?: GuiaRecurso[];
  areas_investigacion?: GuiaAreaInvestigacion[];
}

export interface GuiaRecurso {
  ID: number;
  ID_guia: number;
  tipo: TipoRecurso; // 'pdf', 'youtube', 'imagen', etc.
  recurso: string; // nombre de archivo o url
  recurso_url?: string;
  descripcion?: string;
}

export interface GuiaAreaInvestigacion {
  ID_area: number;
  area_nombre?: string;
}