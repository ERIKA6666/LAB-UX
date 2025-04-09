import { 
    Comentario,
    CreateComentarioRequest,
    CreateComentarioResponse,
    UpdateComentarioRequest,
    UpdateComentarioResponse,
    GetComentariosFilters,
    GetComentariosResponse,
    DeleteComentarioResponse
} from "@/types/comentario";

class ComentarioService {
    private baseUrl: string;

    constructor(){
        this.baseUrl = `${process.env.REACT_APP_API_URL}/comentarios`
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Error en la solicitud');
        }
        return data;
    }

    async create(data: CreateComentarioRequest): Promise<CreateComentarioResponse> {
      try {
        const response = await fetch(this.baseUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        return this.handleResponse<CreateComentarioResponse>(response);
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }
    async update(id: number, data: UpdateComentarioRequest): Promise<UpdateComentarioResponse> {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        return this.handleResponse<UpdateComentarioResponse>(response);
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }
    async delete(id: number): Promise<DeleteComentarioResponse> {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: 'DELETE'
        });
        return this.handleResponse<DeleteComentarioResponse>(response);
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }

    async getAll(filters?: GetComentariosFilters): Promise<GetComentariosResponse> {
      try {
        const url = new URL(this.baseUrl);
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) url.searchParams.append(key, String(value));
          });
        }
  
        const response = await fetch(url.toString());
        return this.handleResponse<GetComentariosResponse>(response);
      } catch (error) {
        return {
          success: false,
          comentarios: [],
          total: 0,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }
}
