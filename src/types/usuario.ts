// interfaces/user.ts
export type RoleUser = "admin" | "alumno" | "profesor";
export type StatusUser = "activo" | "inactivo";

export interface User {
  id: number;
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