import { 
    Etiqueta,
    CreateEtiquetaRequest,
    CreateEtiquetaResponse,
    UpdateEtiquetaRequest,
    UpdateEtiquetaResponse,
    GetEtiquetasFilters,
    GetEtiquetasResponse,
    DeleteEtiquetaResponse
} from "@/types/etiqueta";

class EtiquetaService {
    private baseUrl: string;

    constructor(){
        this.baseUrl = `${process.env.REACT_APP_API_URL}/Etiquetas`
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Error en la solicitud');
        }
        return data;
    }

    async create(data: CreateEtiquetaRequest): Promise<CreateEtiquetaResponse> {
      try {
        const response = await fetch(this.baseUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        return this.handleResponse<CreateEtiquetaResponse>(response);
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }
    async update(id: number, data: UpdateEtiquetaRequest): Promise<UpdateEtiquetaResponse> {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        return this.handleResponse<UpdateEtiquetaResponse>(response);
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }
    async delete(id: number): Promise<DeleteEtiquetaResponse> {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: 'DELETE'
        });
        return this.handleResponse<DeleteEtiquetaResponse>(response);
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }

    async getAll(filters?: GetEtiquetasFilters): Promise<GetEtiquetasResponse> {
      try {
        const url = new URL(this.baseUrl);
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) url.searchParams.append(key, String(value));
          });
        }
  
        const response = await fetch(url.toString());
        return this.handleResponse<GetEtiquetasResponse>(response);
      } catch (error) {
        return {
          success: false,
          etiquetas: [],
          total: 0,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }
}
