export const getUsuarioActual = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("usuario");
    return stored ? JSON.parse(stored) : null;
  }
  return null;
};

export const cerrarSesion = () => {
  localStorage.removeItem("usuario");
};
