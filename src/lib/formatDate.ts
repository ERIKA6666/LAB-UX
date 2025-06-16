/**
 * Formatea una fecha a formato legible
 * @param date Puede ser string, Date o undefined
 * @returns Fecha formateada como "DD/MM/YYYY" o "No definida" si no hay fecha
 */
export function formatDate(date: Date | string | undefined): string {
  if (!date) return 'No definida';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return 'Fecha inválida';
  
  return dateObj.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Formatea una fecha para inputs de tipo date (YYYY-MM-DD)
 */
export function formatDateForInput(date: Date | string | undefined): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '';
  
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}