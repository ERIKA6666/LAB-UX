export interface Perfil {
    ID: number;
    ID_usuario: number | null;
    foto: string | null;
    ultimo_titulo: string | null;
    semblanza: string | null;
  }
  
  // Creación
  export interface CreatePerfilRequest {
    ID_usuario: number | null;
    foto?: string | null;
    ultimo_titulo?: string | null;
    semblanza?: string | null;
  }
  
  export interface CreatePerfilResponse {
    success: boolean;
    perfil?: Perfil;
    error?: string;
  }
  
  // Actualización
  export interface UpdatePerfilRequest {
    foto?: string | null;
    ultimo_titulo?: string | null;
    semblanza?: string | null;
  }
  
  export interface UpdatePerfilResponse {
    success: boolean;
    perfil?: Perfil;
    error?: string;
  }
  
  // Eliminación
  export interface DeletePerfilResponse {
    success: boolean;
    deletedId?: number;
    error?: string;
  }

  // Filtros
    export interface GetPerfilesFilters {
      ID_publicacion?: number;
      ID_usuario?: number;
    }

  export interface GetPerfilResponse {
    success: boolean;
    perfiles: Perfil[];
    total: number;
    error?: string;
  }