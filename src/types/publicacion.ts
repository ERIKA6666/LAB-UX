export interface Publicacion {
    ID: number;
    ID_usuario: number | null;
    titulo: string;
    contenido: string;
    fecha_creacion: string;
    categoria: string | null;
    tipo_publicacion: string | null;
  }
  
  // Creación
  export interface CreatePublicacionRequest {
    ID_usuario: number | null;
    titulo: string;
    contenido: string;
    categoria?: string | null;
    tipo_publicacion?: string | null;
  }
  
  export interface CreatePublicacionResponse {
    success: boolean;
    publicacion?: Publicacion;
    error?: string;
  }
  
  // Actualización
  export interface UpdatePublicacionRequest {
    titulo?: string;
    contenido?: string;
    categoria?: string | null;
    tipo_publicacion?: string | null;
  }
  
  export interface UpdatePublicacionResponse {
    success: boolean;
    publicacion?: Publicacion;
    error?: string;
  }
  
  // Filtros
  export interface GetPublicacionesFilters {
    ID_usuario?: number;
    categoria?: string;
    tipo_publicacion?: string;
    search?: string; // Búsqueda por título
    fecha_desde?: string;
    fecha_hasta?: string;
  }
  
  export interface GetPublicacionesResponse {
    success: boolean;
    publicaciones: Publicacion[];
    total: number;
    error?: string;
  }
  // Eliminación
  export interface DeletePublicacionResponse {
    success: boolean;
    deletedId?: number;
    error?: string;
  }