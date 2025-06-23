// services/userService.ts
"use client";
import { User } from "../types/index";
import {API_ENDPOINTS} from "../constans/endpoints";

export const fetchUsers = async (search: string, filterRol: string, filterEstado: string) => {
  try {
    const response = await fetch(
      API_ENDPOINTS.USERS.SEARCH({ search, filterRol, filterEstado })
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios');
    }

    const data = await response.json();
    
    // Manejar la respuesta según la estructura del backend
    if (data.success && Array.isArray(data.usuarios)) {
      return data.usuarios;
    }
    
    // Si por alguna razón no viene en el formato esperado
    if (Array.isArray(data)) {
      return data;
    }
    
    console.error('Formato de respuesta inesperado:', data);
    return [];
  } catch (error) {
    console.error('Error en fetchUsers:', error);
    throw error;
  }
};

export const addUser = async (userData: Partial<User>) => {
  try {
    const res = await fetch(API_ENDPOINTS.USERS.BASE, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al crear usuario");
    }

    const responseData = await res.json();
    // Asegúrate de que la API devuelva todos los campos necesarios
    return {
      id: responseData.ID,
      correo: responseData.correo,
      password: responseData.password, // Consider security implications
      nombre: responseData.nombre,
      apellido: responseData.apellido,
      telefono: responseData.telefono,
      username: responseData.username,
      tipo_usuario: responseData.tipo_usuario,
      fecha_registro: responseData.fecha_registro,
      estado: responseData.estado,
      avatar: responseData.avatar,
      initials: responseData.initials,
    };
  } catch (error) {
    console.error("Error en addUser:", error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  await fetch(API_ENDPOINTS.USERS.BY_ID(id), { method: "DELETE" });
};

export const updateUser = async (ID: number, userData: Partial<User>) => {
  const res = await fetch(API_ENDPOINTS.USERS.BY_ID(ID), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return await res.json();
};

// ...existing code...
  
export const getUserById = async (id: number) => {
  const res = await fetch(API_ENDPOINTS.USERS.BY_ID(id));
  if (!res.ok) {
    throw new Error("No se pudo obtener el usuario");
  }
  return await res.json();
};

// ...login 
export async function login(data: { email: string; password: string }) {
  try {
    const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}

export async function PasswordReset(data: { email: string }) {
  try {
    const response = await fetch(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result; // { success: boolean, error?: string }
  } catch (error) {
    console.error("Error en addUser:", error);
    throw error;
  }
}