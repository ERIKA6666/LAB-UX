export interface PublicacionAPA {
    ID: number;
    ID_curriculum: number | null;
    contenido: string;
  }
  
  // Creación
  export interface CreatePublicacionAPARequest {
    ID_curriculum: number | null;
    contenido: string;
  }
  
  export interface CreatePublicacionAPAResponse {
    success: boolean;
    publicacionAPA?: PublicacionAPA;
    error?: string;
  }
  
  // Actualización
  export interface UpdatePublicacionAPARequest {
    ID_curriculum?: number | null;
    contenido?: string;
  }
  
  export interface UpdatePublicacionAPAResponse {
    success: boolean;
    publicacionAPA?: PublicacionAPA;
    error?: string;
  }
  
  // Filtros
  export interface GetPublicacionesAPAFilters {
    ID_curriculum?: number;
  }
  
  export interface GetPublicacionesAPAResponse {
    success: boolean;
    publicacionesAPA: PublicacionAPA[];
    total: number;
    error?: string;
  }