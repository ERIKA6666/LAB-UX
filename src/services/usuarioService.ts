// src/services/users.service.ts
import { Usuario, UsuarioCreate, UsuarioDetalle, ApiResponse, PaginatedResponse } from '@/types/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export const UserService = {
  // Obtener usuarios paginados
  async getUsers(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Usuario>> {
    const response = await fetch(`${API_BASE_URL}/users?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }
    return await response.json();
  },

  // Obtener un usuario por ID
  async getUserById(id: number): Promise<ApiResponse<Usuario>> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error('Usuario no encontrado');
    }
    return await response.json();
  },

  // Crear un nuevo usuario
  async createUser(userData: UsuarioCreate): Promise<ApiResponse<Usuario>> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al crear usuario');
    }
    
    return await response.json();
  },

  // Actualizar un usuario
  async updateUser(id: number, userData: Partial<UsuarioCreate>): Promise<ApiResponse<Usuario>> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('Error al actualizar usuario');
    }
    
    return await response.json();
  },

  // Eliminar un usuario
  async deleteUser(id: number): Promise<ApiResponse<null>> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Error al eliminar usuario');
    }
    
    return await response.json();
  },

  // Obtener detalles de usuario
  async getUserDetails(userId: number): Promise<ApiResponse<UsuarioDetalle>> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/details`);
    if (!response.ok) {
      throw new Error('Detalles de usuario no encontrados');
    }
    return await response.json();
  },

  // Actualizar detalles de usuario
  async updateUserDetails(
    userId: number, 
    details: Partial<UsuarioDetalle>
  ): Promise<ApiResponse<UsuarioDetalle>> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/details`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    });
    
    if (!response.ok) {
      throw new Error('Error al actualizar detalles');
    }
    
    return await response.json();
  }
};