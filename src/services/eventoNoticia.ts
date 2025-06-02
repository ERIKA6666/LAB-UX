// services/eventoNoticiaService.ts
"use client";
import { EventoNoticia, EventoAsistente, EventoAreaInvestigacion, TipoEventoNoticia } from "../types";
import { API_URL } from "../constans/Api";

export const fetchEventosNoticias = async (
  search: string,
  filterTipo: TipoEventoNoticia | 'todos',
  fechaDesde?: string,
  fechaHasta?: string
) => {
  const params = new URLSearchParams();
  if (search) params.append("q", search);
  if (filterTipo !== 'todos') params.append("tipo", filterTipo);
  if (fechaDesde) params.append("fecha_desde", fechaDesde);
  if (fechaHasta) params.append("fecha_hasta", fechaHasta);

  const response = await fetch(`${API_URL}/eventos-noticias?${params.toString()}`);
  const data = await response.json();
  
  if (Array.isArray(data)) {
    return data;
  } else if (data && Array.isArray(data.eventosNoticias)) {
    return data.eventosNoticias;
  }
  return [];
};

export const getEventoNoticiaById = async (id: number) => {
  const res = await fetch(`${API_URL}/eventos-noticias/${id}`);
  if (!res.ok) {
    throw new Error("No se pudo obtener el evento/noticia");
  }
  return await res.json();
};

export const addEventoNoticia = async (eventoNoticiaData: Partial<EventoNoticia>) => {
  try {
    const res = await fetch(`${API_URL}/eventos-noticias`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(eventoNoticiaData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al crear evento/noticia");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en addEventoNoticia:", error);
    throw error;
  }
};

export const updateEventoNoticia = async (id: number, eventoNoticiaData: Partial<EventoNoticia>) => {
  const res = await fetch(`${API_URL}/eventos-noticias/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify(eventoNoticiaData),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al actualizar evento/noticia");
  }

  return await res.json();
};

export const deleteEventoNoticia = async (id: number) => {
  const res = await fetch(`${API_URL}/eventos-noticias/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
    }
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al eliminar evento/noticia");
  }
};

// Servicios para asistentes
export const addAsistenteToEvento = async (asistenteData: EventoAsistente) => {
  const res = await fetch(`${API_URL}/eventos-noticias/asistentes`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify(asistenteData),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al agregar asistente");
  }

  return await res.json();
};

export const removeAsistenteFromEvento = async (ID_evento: number, ID_usuario?: number, email_externo?: string) => {
  const params = new URLSearchParams();
  if (ID_usuario) params.append("id_usuario", ID_usuario.toString());
  if (email_externo) params.append("email_externo", email_externo);

  const res = await fetch(`${API_URL}/eventos-noticias/${ID_evento}/asistentes?${params.toString()}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
    }
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al eliminar asistente");
  }
};

// Servicios para áreas de investigación
export const addAreaToEvento = async (areaData: EventoAreaInvestigacion) => {
  const res = await fetch(`${API_URL}/eventos-noticias/areas-investigacion`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify(areaData),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al agregar área de investigación");
  }

  return await res.json();
};

export const removeAreaFromEvento = async (ID_evento: number, ID_area: number) => {
  const res = await fetch(`${API_URL}/eventos-noticias/${ID_evento}/areas-investigacion/${ID_area}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('authToken')}`
    }
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al eliminar área de investigación");
  }
};