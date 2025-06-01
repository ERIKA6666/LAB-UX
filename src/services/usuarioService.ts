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
  const res = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return await res.json();
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