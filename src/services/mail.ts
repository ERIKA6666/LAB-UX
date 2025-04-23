// services/solicitudService.ts
import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Define la interfaz del tipo de datos que se van a enviar
interface SolicitudDatos {
  // ajusta los campos según tu estructura real
  nombre: string;
  correo: string;
  mensaje: string;
  // puedes agregar más campos si los necesitas
}

// Define la interfaz de la respuesta esperada del servidor
interface SolicitudRespuesta {
  mensaje: string;
  exito: boolean;
  // otros campos que pueda retornar el backend
}

const solicitudService = {
  enviarSolicitud: async (datos: SolicitudDatos): Promise<SolicitudRespuesta> => {
    try {
      const response: AxiosResponse<SolicitudRespuesta> = await axios.post(`${API_BASE_URL}/solicitudes`, datos);
      return response.data;
    } catch (error) {
      console.error('Error al enviar solicitud', error);
      throw error;
    }
  }
};

export default solicitudService;
