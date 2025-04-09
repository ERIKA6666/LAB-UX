export interface Comentario {
    ID_publicacion: number;
    ID_usuario: number;
    contenido: string;
    fecha_creacion: string;
    fecha_modificacion: string | null;
  }
  
  // Creación
  export interface CreateComentarioRequest {
    ID_publicacion: number;
    ID_usuario: number;
    contenido: string;
  }
  
  export interface CreateComentarioResponse {
    success: boolean;
    comentario?: Comentario;
    error?: string;
  }
  
  // Actualización
  export interface UpdateComentarioRequest {
    contenido: string;
  }
  
  export interface UpdateComentarioResponse {
    success: boolean;
    comentario?: Comentario;
    error?: string;
  }
  
  // Filtros
  export interface GetComentariosFilters {
    ID_publicacion?: number;
    ID_usuario?: number;
  }
  
  export interface GetComentariosResponse {
    success: boolean;
    comentarios: Comentario[];
    total: number;
    error?: string;
  }
  // Eliminación
  export interface DeleteComentarioResponse {
    success: boolean;
    deletedId?: number;
    error?: string;
  }