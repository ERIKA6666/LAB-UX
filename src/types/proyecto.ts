// src/types/proyecto.interface.ts
export type EstadoProyecto = 'planificacion' | 'en_progreso' | 'completado' | 'cancelado';
export interface Proyecto {
  ID: number;
  nombre: string;
  tipo_estudio: string;
  imagen?: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  progreso: number;
  estado: EstadoProyecto;
  fecha_creacion: string;
  fecha_actualizacion: string;
  areas_investigacion?: ProyectoAreaInvestigacion[];
  colaboradores?: ProyectoColaborador[];
}

export interface ProyectoAreaInvestigacion {
  ID_area: number;
  area_nombre?: string;
}

export interface ProyectoColaborador {
  ID_usuario: number;
  nombre?: string;
  apellido?: string;
}