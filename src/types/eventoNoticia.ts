// src/types/evento-noticia.interface.ts
export type TipoEventoNoticia = 'evento' | 'noticia' | 'proximo_evento';

export interface EventoAsistente {
  ID?: number;
  ID_evento?: number;
  nombre_externo: string;
  email_externo: string;
  institucion_externa: string;
}

export interface EventoAreaInvestigacion {
  ID_area: number;
  area_nombre?: string;
}

export interface MaterialEvento {
  ID?: number;
  ID_evento_noticia?: number;
  tipo: string;
  nombre: string;
  archivo: string;
}

export interface Evento {
  ID?: number;
  titulo: string;
  descripcion: string;
  fecha: string; // formato SQL: YYYY-MM-DD
  lugar: string;
  tipo: TipoEventoNoticia;
  imagen?: string | null;
  fecha_creacion: string; // formato SQL: YYYY-MM-DD HH:MM:SS
  ID_usuario: number;
  asistentes?: EventoAsistente[];
  areas_investigacion?: EventoAreaInvestigacion[];
  materiales?: MaterialEvento[];
}