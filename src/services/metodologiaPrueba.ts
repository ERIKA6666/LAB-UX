import { MetodologiaPrueba, MetodologiaCaracteristica } from "@/types/metodologiaPrueba";
import { API_URL } from "@/constans/Api";

// --- Metodologia_Prueba ---
export async function fetchMetodologias(): Promise<MetodologiaPrueba[]> {
  const res = await fetch(`${API_URL}/metodologias`);
  if (!res.ok) throw new Error("Error al obtener metodologías");
  return res.json();
}

export async function fetchMetodologia(id: number): Promise<MetodologiaPrueba> {
  const res = await fetch(`${API_URL}/metodologias/${id}`);
  if (!res.ok) throw new Error("Error al obtener la metodología");
  return res.json();
}

export async function createMetodologia(data: FormData | MetodologiaPrueba): Promise<any> {
  const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
  const res = await fetch(`${API_URL}/metodologias`, {
    method: "POST",
    body: isFormData ? data : JSON.stringify(data),
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Error al crear la metodología");
  return res.json();
}

export async function updateMetodologia(id: number, data: FormData | MetodologiaPrueba): Promise<any> {
  const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
  const res = await fetch(`${API_URL}/metodologias/${id}`, {
    method: "PUT",
    body: isFormData ? data : JSON.stringify(data),
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Error al actualizar la metodología");
  return res.json();
}

export async function deleteMetodologia(id: number): Promise<any> {
  const res = await fetch(`${API_URL}/metodologias/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar la metodología");
  return res.json();
}

// --- Metodologia_Caracteristica ---
export async function fetchCaracteristicas(): Promise<MetodologiaCaracteristica[]> {
  const res = await fetch(`${API_URL}/caracteristicas`);
  if (!res.ok) throw new Error("Error al obtener características");
  return res.json();
}

export async function fetchCaracteristica(id: number): Promise<MetodologiaCaracteristica> {
  const res = await fetch(`${API_URL}/caracteristicas/${id}`);
  if (!res.ok) throw new Error("Error al obtener la característica");
  return res.json();
}

export async function createCaracteristica(data: MetodologiaCaracteristica): Promise<any> {
  const res = await fetch(`${API_URL}/caracteristicas`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Error al crear la característica");
  return res.json();
}

export async function updateCaracteristica(id: number, data: MetodologiaCaracteristica): Promise<any> {
  const res = await fetch(`${API_URL}/caracteristicas/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Error al actualizar la característica");
  return res.json();
}

export async function deleteCaracteristica(id: number): Promise<any> {
  const res = await fetch(`${API_URL}/caracteristicas/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar la característica");
  return res.json();
}