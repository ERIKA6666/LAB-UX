import {
    Perfil, 
    CreatePerfilRequest,
    CreatePerfilResponse,
    UpdatePerfilRequest,
    UpdatePerfilResponse,
    GetPerfilResponse,
    DeletePerfilResponse,
    GetPerfilesFilters
} from '../types/perfil'

class PerfilService {
    private baseUrl: string;

    constructor(){
        this.baseUrl = `${process.env.REACT_APP_API_URL}/perfiles`
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Error en la solicitud');
        }
        return data;
    }

    async create(data: CreatePerfilRequest): Promise<CreatePerfilResponse> {
      try {
      const response = await fetch(this.baseUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });
      return this.handleResponse<CreatePerfilResponse>(response);
      } catch (error) {
      return {
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
      };
      }
    }

    async update(id: number, data: UpdatePerfilRequest): Promise<UpdatePerfilResponse> {
        try {
          const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          return this.handleResponse<UpdatePerfilResponse>(response);
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
          };
        }
      }
      async delete(id: number): Promise<DeletePerfilResponse> {
        try {
          const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE'
          });
          return this.handleResponse<DeletePerfilResponse>(response);
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido'
          };
        }
      }
  
    async getAll(filters?: GetPerfilesFilters): Promise<GetPerfilResponse> {
      try {
        const url = new URL(this.baseUrl);
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) url.searchParams.append(key, String(value));
          });
        }
  
        const response = await fetch(url.toString());
        return this.handleResponse<GetPerfilResponse>(response);
      } catch (error) {
        return {
          success: false,
          perfiles: [],
          total: 0,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }

}