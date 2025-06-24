import { API_URL } from "@/constans/Api";

export const ENDPOINTS = {
    USUARIOS : {
      BASE: `${API_URL}/usuarios`,
      BY_ID : (id:number) => `${API_URL}/usuarios/${id}`,
      LOGIN: `${API_URL}/usuarios/login`,
      RESET_PASSWORD: `${API_URL}/usuarios/reset_password`,
      AVATAR: (filename: string) => `${API_URL}/uploads/${filename}`,
      SEARCH: (params: {
        search?: string;
        rol?: string;
        estado?: string;
        }) => {
        const urlParams = new URLSearchParams();
        if (params.search) urlParams.append("q", params.search);
        if (params.rol && params.rol !== "todos") urlParams.append("tipo_usuario", params.rol);
        if (params.estado && params.estado !== "todos-status") urlParams.append("estado", params.estado);
        return `${API_URL}/usuarios?${urlParams.toString()}`;
        },
      AVATAR2 : (filename: string) => `${API_URL}/uploads/${filename}`,
    }
}
