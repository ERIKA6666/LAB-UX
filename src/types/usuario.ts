// src/types/usuario.interface.ts
export type TipoUsuario = 'admin' | 'profesor' | 'alumno' | 'general';
export type EstadoUsuario = 'activo' | 'inactivo';

export interface Usuario {
  ID: number;
  email: string;
  password?: string; // No incluir en respuestas públicas
  nombre: string;
  apellido?: string;
  telefono?: string;
  username?: string;
  tipo_usuario: TipoUsuario;
  fecha_registro: Date | string;
  estado: EstadoUsuario;
}

export interface UsuarioDetalle {
  ID_usuario: number;
  puesto_actual?: string;
  oficina?: string;
}

// Para formularios de creación
export interface UsuarioCreate {
  email: string;
  password: string;
  nombre: string;
  apellido?: string;
  telefono?: string;
  username?: string;
  tipo_usuario: TipoUsuario;
}

// Para actualizaciones
export interface UsuarioUpdate {
  email?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  username?: string;
  tipo_usuario?: TipoUsuario;
  estado?: EstadoUsuario;
}