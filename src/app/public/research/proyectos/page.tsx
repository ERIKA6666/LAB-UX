'use client'

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { proyectos } from "@/constans/data"
import { useProjects } from "@/hooks/useProjects"
import { ModalProyecto } from "./components/modalProyecto"

export default function ProyectosPage() {  
  const {
    selectedProject,
    currentImageIndex,
    openProjectModal,
    closeProjectModal,
    nextImage,
    prevImage,
    setCurrentImageIndex
  } = useProjects()

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Proyectos de Investigación</h1>
          <p className="text-muted-foreground max-w-2xl">
            Descubre nuestros proyectos de investigación en el campo de la usabilidad y experiencia de usuario.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {proyectos.map((proyecto, index) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer transition-all hover:shadow-md"
              onClick={() => openProjectModal(proyecto)}
            >
              <div className="aspect-video relative">
                <Image
                  src={proyecto.imagenes[0] || "/placeholder.svg"}
                  alt={proyecto.titulo}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={(proyecto.estado)}>
                    {proyecto.estado}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{proyecto.titulo}</CardTitle>
                <CardDescription>{proyecto.descripcionCorta}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {proyecto.descripcion}
                </p>
                <div className="flex flex-wrap gap-2">
                  {proyecto.etiquetas?.map((etiqueta, i) => (
                    <Badge key={i} variant="secondary">
                      {etiqueta}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ModalProyecto
        selectedProject={selectedProject}
        onClose={closeProjectModal}
        currentImageIndex={currentImageIndex}
        nextImage={nextImage}
        prevImage={prevImage}
        setCurrentImageIndex={setCurrentImageIndex}
      />
    </div>
  )
}