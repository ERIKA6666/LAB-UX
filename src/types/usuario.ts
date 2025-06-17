// interfaces/user.ts
import { FormacionAcademica } from "./formacionAcademica";
import { AreaInvestigacion } from "./areaInvestigacion";

export type RoleUser = "admin" | "alumno" | "profesor";
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
  estado?: StatusUser;
  foto?: string;
  initials?: string;
  area_investigacion?: number; // Optional, can be null
  formacion_academica?: FormacionAcademica[]; // Optional, can be null
  areas_investigacion?: AreaInvestigacion[]; // Optional, can be null
}
export interface UsuarioAreaInvestigacion {
  ID_usuario: number;
  ID_area: number;
}
export interface LoginUsuarioRequest {
  email: string;
  password: string;
}

export interface ResetUsuarioRequest {
  email: string;
}