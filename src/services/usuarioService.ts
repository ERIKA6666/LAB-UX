// services/userService.ts
"use client";
import { User } from "../types/index";
import { API_URL } from "../constans/Api";

export const fetchUsers = async (search: string, filterRol: string, filterEstado: string) => {
  const params = new URLSearchParams();
  if (search) params.append("q", search);
  if (filterRol !== "todos") params.append("tipo_usuario", filterRol);
  if (filterEstado !== "todos-status") params.append("estado", filterEstado);

  const response = await fetch(`${API_URL}/usuarios?${params.toString()}`);
  const data = await response.json();
  
  if (Array.isArray(data)) {
    return data;
  } else if (data && Array.isArray(data.usuarios)) {
    return data.usuarios;
  }
  return [];
};

// Cambiado para aceptar FormData y enviar archivos (foto)
export const addUser = async (userData: FormData) => {
  try {
    const res = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${localStorage.getItem('authToken')}`
        // No pongas Content-Type, el navegador lo agrega automáticamente con FormData
      },
      body: userData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al crear usuario");
    }

    const responseData = await res.json();
    return {
      id: responseData.ID,
      correo: responseData.correo,
      password: responseData.password,
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
  await fetch(`${API_URL}/usuarios/${id}`, { method: "DELETE" });
};

// Cambiado para aceptar FormData y enviar archivos (foto)
export const updateUser = async (ID: number, userData: FormData) => {
  const res = await fetch(`${API_URL}/usuarios/${ID}`, {
    method: "PUT",
    headers: { 
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
      // No pongas Content-Type aquí
    },
    body: userData,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al actualizar usuario");
  }
  return await res.json();
};

export const getUserById = async (id: number) => {
  const res = await fetch(`${API_URL}/usuarios/${id}`);
  if (!res.ok) {
    throw new Error("No se pudo obtener el usuario");
  }
  return await res.json();
};

export async function login(data: { email: string; password: string }) {
  try {
    const response = await fetch(`${API_URL}/usuarios/login`, {
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
    const response = await fetch(`${API_URL}/usuarios/reset_password`, {
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