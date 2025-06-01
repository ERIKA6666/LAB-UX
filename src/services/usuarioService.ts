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

export const addUser = async (userData: Partial<User>) => {
  try {
    const res = await fetch(`${API_URL}/usuarios`, {
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
      id: responseData.id,
      nombre: responseData.nombre || userData.nombre,
      correo: responseData.correo || userData.correo,
      tipo_usuario: responseData.tipo_usuario || userData.tipo_usuario,
      estado: responseData.estado || userData.estado,
      fecha_registro: responseData.fecha_registro || new Date().toISOString(),
      avatar: responseData.avatar || '',
      initials: responseData.initials || 
        (responseData.nombre?.split(' ').map(n => n[0]).join('') || '')
    };
  } catch (error) {
    console.error("Error en addUser:", error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  await fetch(`${API_URL}/usuarios/${id}`, { method: "DELETE" });
};

export const updateUser = async (id: number, userData: Partial<User>) => {
  const res = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return await res.json();
};