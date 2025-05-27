// src/types/metodologia-prueba.interface.ts
export type TipoMetodologiaPrueba = 'metodologia' | 'prueba';

export interface MetodologiaPrueba {
  ID: number;
  nombre: string;
  descripcion?: string;
  tipo: TipoMetodologiaPrueba;
  fecha_creacion: Date | string;
}

export interface MetodologiaCaracteristica {
  ID: number;
  ID_metodologia: number;
  caracteristica: string;
  descripcion?: string;
}