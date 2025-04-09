export interface Etiqueta {
    ID: number;
    ID_publicacion: number | null;
    contenido: string;
  }
  
  // Creación
  export interface CreateEtiquetaRequest {
    ID_publicacion?: number | null;
    contenido: string;
  }
  
  export interface CreateEtiquetaResponse {
    success: boolean;
    etiqueta?: Etiqueta;
    error?: string;
  }
  
  // Actualización
  export interface UpdateEtiquetaRequest {
    ID_publicacion?: number | null;
    contenido?: string;
  }
  
  export interface UpdateEtiquetaResponse {
    success: boolean;
    etiqueta?: Etiqueta;
    error?: string;
  }
  
  // Filtros
  export interface GetEtiquetasFilters {
    ID_publicacion?: number;
    search?: string; // Búsqueda por contenido
  }
  
  export interface GetEtiquetasResponse {
    success: boolean;
    etiquetas: Etiqueta[];
    total: number;
    error?: string;
  }

   // Eliminación
   export interface DeleteEtiquetaResponse {
    success: boolean;
    deletedId?: number;
    error?: string;
  }