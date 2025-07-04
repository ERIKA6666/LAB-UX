// src/types/proyecto.interface.ts
export type EstadoProyecto = 'planificacion' | 'en_progreso' | 'completado' | 'cancelado';

export interface Proyecto {
  ID: number;
  nombre: string;
  tipo_estudio?: string;
  imagen?: string | File;
  descripcion?: string;
  fecha_inicio?: Date | string;
  fecha_fin?: Date | string;
  progreso?: number;
  estado: EstadoProyecto;
  fecha_creacion: Date | string;
  fecha_actualizacion?: Date | string;
  proyecto_areas_investigacion?: ProyectoAreaInvestigacion[];
  proyecto_colaboradores?: ProyectoColaborador[];
}

export interface ProyectoAreaInvestigacion {
  ID_proyecto: number;
  ID_area: number;
}

export interface ProyectoColaborador {
  ID_proyecto: number;
  ID_usuario?: number;
  nombre_externo?: string;
  email_externo?: string;
  institucion_externa?: string;
  rol?: string;
}