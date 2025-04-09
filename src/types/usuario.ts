export interface Usuario {
  ID: number;
  email: string;
  password: string;
  nombre: string;
  tipo_usuario: string;
  img: string;
}

// Creación
export interface CreateUsuarioRequest {
  email: string;
  password: string;
  nombre: string;
  tipo_usuario: string;
  img?: string;
}

export interface CreateUsuarioResponse {
  success: boolean;
  usuario?: Usuario;
  error?: string;
}

// Actualización
export interface UpdateUsuarioRequest {
  email?: string;
  password?: string;
  nombre?: string;
  tipo_usuario?: string;
  img?: string;
}

export interface UpdateUsuarioResponse {
  success: boolean;
  usuario?: Usuario;
  error?: string;
}

// Eliminación
export interface DeleteUsuarioResponse {
  success: boolean;
  deletedId?: number;
  error?: string;
}

// Filtros
export interface GetUsuariosFilters {
  tipo_usuario?: string;
  search?: string; // Búsqueda por nombre/email
}

export interface GetUsuariosResponse {
  success: boolean;
  usuarios: Usuario[];
  total: number;
  error?: string;
}
export interface LoginUsuarioRequest {
  email: string;
  password: string;
}

export interface LoginUsuarioResponse {
  success: boolean;
  token?: string;
  usuario?: Usuario;
  error?: string;
}