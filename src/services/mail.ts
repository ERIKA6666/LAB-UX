// services/solicitudService.ts
import axios, { AxiosError, AxiosResponse } from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/';

// Define la interfaz de los datos a enviar
interface SolicitudDatos {
  nombre: string;
  correo: string;
  areaInteres: string;
  mensaje: string;
}

// Define la interfaz de la respuesta esperada
interface SolicitudRespuesta {
  mensaje: string;
  exito: boolean;
}

const solicitudService = {
  enviarSolicitud: async (datos: SolicitudDatos): Promise<SolicitudRespuesta> => {
    try {
      const response: AxiosResponse<SolicitudRespuesta> = await axios.post(
        `${API_BASE_URL}/solicitudes`,
        datos,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;

      // Extraer mensaje del backend si está disponible
      const mensajeError =
        axiosError.response?.data && typeof axiosError.response.data === 'object'
          ? (axiosError.response.data as any).mensaje || 'Error desconocido'
          : 'Error al enviar la solicitud';

      console.error('Error al enviar solicitud:', mensajeError);

      // Devuelve un objeto consistente con la interfaz
      return {
        mensaje: mensajeError,
        exito: false,
      };
    }
  },
};

export default solicitudService;
