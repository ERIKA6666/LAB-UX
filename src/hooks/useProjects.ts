// hooks/useProjects.ts
'use client'

import { useState } from "react"
import { proyectos } from "@/constans/data"

export function useProjects() {
  const [selectedProject, setSelectedProject] = useState<(typeof proyectos)[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openProjectModal = (proyecto: (typeof proyectos)[0]) => {
    setSelectedProject(proyecto)
    setCurrentImageIndex(0)
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
  }

  const nextImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev === selectedProject.imagenes.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.imagenes.length - 1 : prev - 1))
  }
    // Función para obtener el color de fondo según el estado
  const getStatusColor = (status: string) => {
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
  return {
    selectedProject,
    currentImageIndex,
    openProjectModal,
    closeProjectModal,
    nextImage,
    prevImage,
    setCurrentImageIndex
  }
  
}