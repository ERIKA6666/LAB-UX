import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completado":
      return "bg-green-100 text-green-800"
    case "en progreso":
      return "bg-blue-100 text-blue-800"
    case "planificado":
      return "bg-amber-100 text-amber-800"
    case "en pausa":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}