// interfaces/user.ts
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
  avatar?: string;
  initials?: string;
}

export interface LoginUsuarioRequest {
  email: string;
  password: string;
}

export interface ResetUsuarioRequest {
  email: string;
}