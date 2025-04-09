import { 
    Publicacion,
    CreatePublicacionRequest,
    CreatePublicacionResponse,
    UpdatePublicacionRequest,
    UpdatePublicacionResponse,
    GetPublicacionesFilters,
    GetPublicacionesResponse,
    DeletePublicacionResponse
} from "@/types/publicacion";

class PublicacionService {
    private baseUrl: string;

    constructor(){
        this.baseUrl = `${process.env.REACT_APP_API_URL}/Publicacions`
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Error en la solicitud');
        }
        return data;
    }

    async create(data: CreatePublicacionRequest): Promise<CreatePublicacionResponse> {
      try {
        const response = await fetch(this.baseUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        return this.handleResponse<CreatePublicacionResponse>(response);
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }
    async update(id: number, data: UpdatePublicacionRequest): Promise<UpdatePublicacionResponse> {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        return this.handleResponse<UpdatePublicacionResponse>(response);
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }
    async delete(id: number): Promise<DeletePublicacionResponse> {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: 'DELETE'
        });
        return this.handleResponse<DeletePublicacionResponse>(response);
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }

    async getAll(filters?: GetPublicacionesFilters): Promise<GetPublicacionesResponse> {
      try {
        const url = new URL(this.baseUrl);
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) url.searchParams.append(key, String(value));
          });
        }
  
        const response = await fetch(url.toString());
        return this.handleResponse<GetPublicacionesResponse>(response);
      } catch (error) {
        return {
          success: false,
          publicaciones: [],
          total: 0,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }
}
