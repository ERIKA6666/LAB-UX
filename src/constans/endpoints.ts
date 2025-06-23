import { API_URL } from "./Api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/usuarios/login`,
    RESET_PASSWORD: `${API_URL}/usuarios/reset_password`,
  },
  USERS: {
    BASE: `${API_URL}/usuarios`,
    BY_ID: (id: number) => `${API_URL}/usuarios/${id}`,
    SEARCH: (params: {
      search?: string;
      filterRol?: string;
      filterEstado?: string;
    }) => {
      const urlParams = new URLSearchParams();
      if (params.search) urlParams.append("q", params.search);
      if (params.filterRol && params.filterRol !== "todos") 
        urlParams.append("tipo_usuario", params.filterRol);
      if (params.filterEstado && params.filterEstado !== "todos-status") 
        urlParams.append("estado", params.filterEstado);
      
      return `${API_URL}/usuarios?${urlParams.toString()}`;
    },
  },
};