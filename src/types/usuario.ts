// interfaces/user.ts
export type RoleUser = "admin" | "alumno" | "profesor";
export type StatusUser = "activo" | "inactivo";

export interface User {
  id: number;
  name: string;
  email: string;
  tipo_usuario: RoleUser;
  avatar: string;
  initials: string;
  fecha_registro: string;
  estado: StatusUser;
  password?: string; // Optional for security reasons
}