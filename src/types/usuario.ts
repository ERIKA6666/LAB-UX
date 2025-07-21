// interfaces/user.ts
import { FormacionAcademica } from "./formacionAcademica";
import { ExperienciaLaboral } from "./experienciaLaboral";
import { AreaInvestigacion } from "./areaInvestigacion";

export type RoleUser = "admin" | "alumno" | "profesor" | "todos";
export type StatusUser = "activo" | "inactivo";

export interface User {
  ID: number;
  correo: string;
  password: string; // Optional for security reasons
  nombre: string;
  apellido?: string;
  telefono?: string;
  username?: string;
  tipo_usuario: RoleUser;
  fecha_registro?: string;
  estado?: StatusUser | undefined;
  foto?: string | Blob;
  initials?: string;
  //area_investigacion?: number; // Optional, can be null
  formacion_academica?: FormacionAcademica[]; // Optional, can be null
  areas_investigacion?: UsuarioAreaInvestigacion[]; // Optional, can be null
  experiencia_laboral?: ExperienciaLaboral[]; // Optional, can be null
  avatar?: string; // Optional, can be null
}
export interface UsuarioAreaInvestigacion extends AreaInvestigacion {
  ID_usuario: number;
  ID_area: number;
  area_descripcion?: string; // Optional, can be null
  area_nombre?: string; // Optional, can be null
}
export interface LoginUsuarioRequest {
  email: string;
  password: string;
}

export interface ResetUsuarioRequest {
  email: string;
}