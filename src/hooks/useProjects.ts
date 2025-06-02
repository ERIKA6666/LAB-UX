'use client'

import { useState } from "react"
import { Proyecto } from "@/types"

export function useProjects() {
  const [selectedProject, setSelectedProject] = useState<Proyecto | null>(null)

  const openProjectModal = (proyecto: Proyecto) => {
    setSelectedProject(proyecto)
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
  }

  return {
    selectedProject,
    openProjectModal,
    closeProjectModal,
  }
}