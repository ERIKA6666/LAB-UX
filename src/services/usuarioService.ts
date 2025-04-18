// src/services/usuario.service.ts
import {
    Usuario,
    CreateUsuarioRequest,
    CreateUsuarioResponse,
    UpdateUsuarioRequest,
    UpdateUsuarioResponse,
    DeleteUsuarioResponse,
    LoginUsuarioRequest,
    LoginUsuarioResponse,
    GetUsuariosFilters,
    GetUsuariosResponse
  } from '../types/usuario';
  
  class UsuarioService {
    private baseUrl: string;
  
    constructor() {
      this.baseUrl = `${process.env.REACT_APP_API_URL}/usuarios`;
    }
  
    private async handleResponse<T>(response: Response): Promise<T> {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error en la solicitud');
      }
      return data;
    }
  
    async create(data: CreateUsuarioRequest): Promise<CreateUsuarioResponse> {
      try {
        const response = await fetch(this.baseUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        return this.handleResponse<CreateUsuarioResponse>(response);
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }
  
    async getById(id: number): Promise<{ success: boolean; usuario?: Usuario; error?: string }> {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`);
        return this.handleResponse<{ success: boolean; usuario?: Usuario }>(response);
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }
  
    async update(id: number, data: UpdateUsuarioRequest): Promise<UpdateUsuarioResponse> {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        return this.handleResponse<UpdateUsuarioResponse>(response);
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }
  
    async delete(id: number): Promise<DeleteUsuarioResponse> {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: 'DELETE'
        });
        return this.handleResponse<DeleteUsuarioResponse>(response);
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }
  
    async getAll(filters?: GetUsuariosFilters): Promise<GetUsuariosResponse> {
      try {
        const url = new URL(this.baseUrl);
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) url.searchParams.append(key, String(value));
          });
        }
  
        const response = await fetch(url.toString());
        return this.handleResponse<GetUsuariosResponse>(response);
      } catch (error) {
        return {
          success: false,
          usuarios: [],
          total: 0,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }
  
    async login(data: LoginUsuarioRequest): Promise<LoginUsuarioResponse> {
      try {
        const response = await fetch(`${this.baseUrl}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        return this.handleResponse<LoginUsuarioResponse>(response);
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        };
      }
    }
  }
  
  export const usuarioService = new UsuarioService();