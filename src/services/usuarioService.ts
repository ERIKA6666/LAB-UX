"use client";
import { User } from "../types/index";
import { ENDPOINTS } from "../config/endpoints";

export const fetchUsers = async (search: string, filterRol: string, filterEstado: string) => {
  const url = ENDPOINTS.USUARIOS.SEARCH({
    search,
    rol: filterRol,
    estado: filterEstado
  });

  const response = await fetch(url);
  const data = await response.json();
  
  if (Array.isArray(data)) {
    return data;
  } else if (data && Array.isArray(data.usuarios)) {
    return data.usuarios;
  }
  return [];
};

export const addUser = async (userData: FormData) => {
  try {
    const res = await fetch(ENDPOINTS.USUARIOS.BASE, {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${localStorage.getItem('authToken')}`
      },
      body: userData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al crear usuario");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en addUser:", error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  await fetch(ENDPOINTS.USUARIOS.BY_ID(id), { 
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
    }
  });
};

export const updateUser = async (ID: number, userData: FormData) => {
  const res = await fetch(ENDPOINTS.USUARIOS.BY_ID(ID), {
    method: "PUT",
    headers: { 
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
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
  const res = await fetch(ENDPOINTS.USUARIOS.BY_ID(id));
  if (!res.ok) {
    throw new Error("No se pudo obtener el usuario");
  }
  return await res.json();
};

export async function login(data: { email: string; password: string }) {
  try {
    const response = await fetch(ENDPOINTS.USUARIOS.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}

export async function PasswordReset(data: { email: string }) {
  try {
    const response = await fetch(ENDPOINTS.USUARIOS.RESET_PASSWORD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error en PasswordReset:", error);
    throw error;
  }
}

export function getUserAvatarUrl(user: User) {
  if (typeof user.foto === "string") {
    return ENDPOINTS.USUARIOS.AVATAR(user.foto);
  } else if (user.foto instanceof Blob) {
    return URL.createObjectURL(user.foto);
  }
  return ""; // o una imagen por defecto
}