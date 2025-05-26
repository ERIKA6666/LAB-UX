// src/types/evento-noticia.interface.ts
export type TipoEventoNoticia = 'evento' | 'noticia' | 'proximo_evento';

export interface EventoNoticia {
  ID: number;
  titulo: string;
  descripcion?: string;
  fecha?: Date | string;
  lugar?: string;
  tipo: TipoEventoNoticia;
  imagen?: string;
  materiales?: string;
  fecha_creacion: Date | string;
  ID_usuario?: number;
}

export interface EventoAsistente {
  ID_evento: number;
  ID_usuario?: number;
  nombre_externo?: string;
  email_externo?: string;
  institucion_externa?: string;
}

export interface EventoAreaInvestigacion {
  ID_evento: number;
  ID_area: number;
}