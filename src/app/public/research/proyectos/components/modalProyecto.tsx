'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeftIcon, Clock, Users, FileText } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { getStatusColor } from "@/lib/utils"
import Image from "next/image"

interface ModalProyectoProps {
  selectedProject: any | null
  onClose: () => void
  currentImageIndex: number
  nextImage: () => void
  prevImage: () => void
  setCurrentImageIndex: (index: number) => void
}

export function ModalProyecto({
  selectedProject,
  onClose,
  currentImageIndex,
  nextImage,
  prevImage,
  setCurrentImageIndex
}: ModalProyectoProps) {
  if (!selectedProject) return null

  return (
    <Dialog open={!!selectedProject} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto ">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{selectedProject.titulo}</DialogTitle>
            <Badge className={getStatusColor(selectedProject.estado)}>
              {selectedProject.estado}
            </Badge>
          </div>
          <DialogDescription>{selectedProject.descripcionCorta}</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Galería de imágenes */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-video overflow-hidden rounded-lg">
              <Image
                src={selectedProject.imagenes[currentImageIndex] || "/placeholder.svg"}
                alt={`Imagen ${currentImageIndex + 1} de ${selectedProject.titulo}`}
                fill
                className="object-cover"
              />

              {/* Controles de navegación de imágenes */}
              {selectedProject.imagenes.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Indicador de imágenes */}
          {selectedProject.imagenes.length > 1 && (
            <div className="flex justify-center gap-2">
              {/* 
              {selectedProject.imagenes.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-primary" : "bg-muted"}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  aria-label={`Ver imagen ${index + 1}`}
                />
              ))}*/}
            </div>
          )}

          <Separator />

          {/* Descripción del proyecto */}
          <div>
            <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5" />
              Descripción
            </h3>
            <p className="text-muted-foreground">
              {selectedProject.descripcionDetallada || selectedProject.descripcion}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Estado del proyecto */}
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5" />
                Estado del Proyecto
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Fecha de inicio:</span>
                  <span className="text-sm font-medium">{selectedProject.fechaInicio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Fecha estimada de finalización:</span>
                  <span className="text-sm font-medium">{selectedProject.fechaFin || "Por determinar"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Progreso:</span>
                  <span className="text-sm font-medium">{selectedProject.progreso}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5 mt-1">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${selectedProject.progreso}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Colaboradores */}
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                <Users className="h-5 w-5" />
                Colaboradores
              </h3>
              <div className="space-y-3">
                {/*
                {selectedProject.colaboradores?.map((colaborador, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={colaborador.avatar || "/placeholder.svg"} alt={colaborador.nombre} />
                      <AvatarFallback>
                        {colaborador.nombre?.charAt(0)}
                        {colaborador.apellido?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {colaborador.nombre} {colaborador.apellido}
                      </p>
                      <p className="text-xs text-muted-foreground">{colaborador.rol}</p>
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          </div>

          <Separator />

          {/* Etiquetas */}
          <div>
            <h3 className="text-sm font-medium mb-2">Etiquetas:</h3>
            <div className="flex flex-wrap gap-2">
              {/*
              {selectedProject.etiquetas?.map((etiqueta, i) => (
                <Badge key={i} variant="secondary">
                  {etiqueta}
                </Badge>
              ))} */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}