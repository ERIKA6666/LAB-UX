// services/proyectoService.ts
"use client";
import { Proyecto, EstadoProyecto, ProyectoAreaInvestigacion, ProyectoColaborador } from "../types";
import { API_URL } from "../constans/Api";

export const fetchProyectos = async (
  search: string = '',
  filterEstado: EstadoProyecto | 'todos' = 'todos',
  sortBy: 'fecha_inicio' | 'fecha_fin' | 'progreso' = 'fecha_inicio',
  sortOrder: 'asc' | 'desc' = 'desc'
) => {
  const params = new URLSearchParams();
  if (search) params.append("q", search);
  if (filterEstado !== 'todos') params.append("estado", filterEstado);
  params.append("sortBy", sortBy);
  params.append("sortOrder", sortOrder);

  const response = await fetch(`${API_URL}/proyectos?${params.toString()}`);
  const data = await response.json();
  
  if (Array.isArray(data)) {
    return data;
  } else if (data && Array.isArray(data.proyectos)) {
    return data.proyectos;
  }
  return [];
};

export const getProyectoById = async (id: number) => {
  const res = await fetch(`${API_URL}/proyectos/${id}`);
  if (!res.ok) {
    throw new Error("No se pudo obtener el proyecto");
  }
  return await res.json();
};

export const addProyecto = async (
  proyectoData: Omit<Proyecto, 'ID' | 'fecha_creacion' | 'fecha_actualizacion' | 'progreso'> & { imagen?: File }
) => {
  try {
    const formData = new FormData();
    // Agrega los campos normales
    Object.entries(proyectoData).forEach(([key, value]) => {
      if (value !== undefined && key !== "imagen") {
        formData.append(key, value as string);
      }
    });
    // Agrega la imagen si existe
    if (proyectoData.imagen) {
      formData.append("imagen", proyectoData.imagen);
    }
    formData.append("fecha_creacion", new Date().toISOString());
    formData.append("progreso", "0");

    const res = await fetch(`${API_URL}/proyectos`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('authToken')}`
        // No pongas Content-Type, el navegador lo agrega automáticamente
      },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al crear proyecto");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en addProyecto:", error);
    throw error;
  }
};

export const updateProyecto = async (
  id: number,
  proyectoData: Partial<Proyecto> & { imagen?: File }
) => {
  const formData = new FormData();
  Object.entries(proyectoData).forEach(([key, value]) => {
    if (value !== undefined && key !== "imagen") {
      formData.append(key, value as string);
    }
  });
  if (proyectoData.imagen) {
    formData.append("imagen", proyectoData.imagen);
  }
  formData.append("fecha_actualizacion", new Date().toISOString());

  const res = await fetch(`${API_URL}/proyectos/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
      // No pongas Content-Type aquí
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al actualizar proyecto");
  }

  return await res.json();
};

export const deleteProyecto = async (id: number) => {
  const res = await fetch(`${API_URL}/proyectos/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
    }
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al eliminar proyecto");
  }
};

export const updateProgresoProyecto = async (id: number, progreso: number) => {
  const res = await fetch(`${API_URL}/proyectos/${id}/progreso`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify({ progreso }),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al actualizar progreso");
  }

  return await res.json();
};

export const changeEstadoProyecto = async (id: number, estado: EstadoProyecto) => {
  const res = await fetch(`${API_URL}/proyectos/${id}/estado`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify({ estado }),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al cambiar estado del proyecto");
  }

  return await res.json();
};

// Servicios para Áreas de Investigación de Proyectos
export const addAreaToProyecto = async (areaData: ProyectoAreaInvestigacion) => {
  const res = await fetch(`${API_URL}/proyectos/areas-investigacion`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify(areaData),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al agregar área al proyecto");
  }

  return await res.json();
};

export const removeAreaFromProyecto = async (ID_proyecto: number, ID_area: number) => {
  const res = await fetch(`${API_URL}/proyectos/${ID_proyecto}/areas-investigacion/${ID_area}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
    }
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al eliminar área del proyecto");
  }
};

export const getAreasByProyecto = async (ID_proyecto: number) => {
  const res = await fetch(`${API_URL}/proyectos/${ID_proyecto}/areas-investigacion`);
  if (!res.ok) {
    throw new Error("Error al obtener áreas del proyecto");
  }
  return await res.json();
};

// Servicios para Colaboradores de Proyectos
export const addColaboradorToProyecto = async (colaboradorData: Omit<ProyectoColaborador, 'ID'>) => {
  const res = await fetch(`${API_URL}/proyectos/colaboradores`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify(colaboradorData),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al agregar colaborador al proyecto");
  }

  return await res.json();
};

export const updateColaboradorProyecto = async (
  ID_proyecto: number, 
  ID_usuario: number | undefined, 
  email_externo: string | undefined,
  colaboradorData: Partial<ProyectoColaborador>
) => {
  const params = new URLSearchParams();
  if (ID_usuario) params.append("id_usuario", ID_usuario.toString());
  if (email_externo) params.append("email_externo", email_externo);

  const res = await fetch(`${API_URL}/proyectos/${ID_proyecto}/colaboradores?${params.toString()}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify(colaboradorData),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al actualizar colaborador");
  }

  return await res.json();
};

export const removeColaboradorFromProyecto = async (
  ID_proyecto: number, 
  ID_usuario?: number, 
  email_externo?: string
) => {
  const params = new URLSearchParams();
  if (ID_usuario) params.append("id_usuario", ID_usuario.toString());
  if (email_externo) params.append("email_externo", email_externo);

  const res = await fetch(`${API_URL}/proyectos/${ID_proyecto}/colaboradores?${params.toString()}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
    }
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al eliminar colaborador del proyecto");
  }
};

export const getColaboradoresByProyecto = async (ID_proyecto: number) => {
  const res = await fetch(`${API_URL}/proyectos/${ID_proyecto}/colaboradores`);
  if (!res.ok) {
    throw new Error("Error al obtener colaboradores del proyecto");
  }
  return await res.json();
};