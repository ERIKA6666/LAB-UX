// src/hooks/useUsuarios.ts
import { useState, useEffect } from 'react';
import { usuarioService } from '../services/usuarioService'
import { GetUsuariosResponse, Usuario, GetUsuariosFilters } from '../types/usuario';

export const useUsuarios = (filters?: GetUsuariosFilters) => {
  const [response, setResponse] = useState<GetUsuariosResponse>({
    success: false,
    usuarios: [],
    total: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async (newFilters?: GetUsuariosFilters) => {
    try {
      setLoading(true);
      const result = await usuarioService.getAll(newFilters || filters);
      setResponse(result);
      if (!result.success) setError(result.error || 'Error al obtener usuarios');
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    usuarios: response.usuarios,
    total: response.total,
    loading,
    error,
    refetch
  };
};

export const useUsuario = (id: number) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuario = async () => {
    try {
      setLoading(true);
      const result = await usuarioService.getById(id);
      if (result.success && result.usuario) {
        setUsuario(result.usuario);
      } else {
        setError(result.error || 'Usuario no encontrado');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, [id]);

  return { usuario, loading, error, refetch: fetchUsuario };
};