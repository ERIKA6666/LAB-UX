"use client"

import { useState } from "react"
import { CalendarIcon, ClockIcon, MapPinIcon, ArrowRightIcon, XIcon, UserIcon, TagIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import Image from "next/image"
import { proximosEventos, noticias, eventos } from "@/constans/data"
export interface ContenidoDifusion {
  id: number;
  titulo: string;
  descripcion: string;
  
  // Campos para descripción extendida (ambas variantes)
  descripcionCompleta?: string;
  contenidoCompleto?: string;
  
  fecha: string;
  
  // Campos específicos de eventos/proximos eventos
  dia?: string;
  mes?: string;
  categoria?: string;
  ubicacion?: string;
  ponentes?: string;
  audiencia?: string;
  nota?: string;
  
  // Campos multimedia
  imagen?: string;
  
  // Campos de autoría/organización
  autor?: string;
  organizador?: string;
  
  // Tipo de contenido (opcional, para discriminación)
  tipo?: 'noticia' | 'evento' | 'proximo-evento';
}
export default function DifusionPage() {
  const [selectedNoticia, setSelectedNoticia] = useState<ContenidoDifusion  | null>(null)
  const [selectedEvento, setSelectedEvento] = useState<ContenidoDifusion  | null>(null)
  const [selectedProximoEvento, setSelectedProximoEvento] = useState<ContenidoDifusion  | null>(null)

  return (
    <div className="container mx-auto py-12 px-4">
        <section id="team" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="px-4 py-1 text-sm">
                  Difusión
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Explora lo que está sucediendo en Lab-UX</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Un equipo diverso y apasionado de profesionales, educadores y estudiantes comprometidos con la
                  excelencia.
                </p>
              </div>
            </div>
          </div>
        </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Columna izquierda (más grande) - Noticias y Eventos */}
        <div className="lg:col-span-2 space-y-16">
          {/* Sección de Noticias */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Noticias Destacadas</h2>
            <div className="space-y-12">
              {noticias.map((noticia, index) => (
                <div key={noticia.id} className="group">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div
                      className="relative aspect-video overflow-hidden rounded-lg cursor-pointer"
                      onClick={() => setSelectedNoticia(noticia)}
                    >
                      <Image
                        src={noticia.imagen || "/placeholder.svg"}
                        alt={noticia.titulo}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-sm text-muted-foreground mb-2">{noticia.fecha}</div>
                      <h3
                        className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors cursor-pointer"
                        onClick={() => setSelectedNoticia(noticia)}
                      >
                        {noticia.titulo}
                      </h3>
                      <p className="text-muted-foreground mb-4">{noticia.descripcion}</p>
                      <div className="mt-auto">
                        <Button
                          variant="link"
                          className="p-0 h-auto font-medium"
                          onClick={() => setSelectedNoticia(noticia)}
                        >
                          Leer más <ArrowRightIcon className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < noticias.length - 1 && <Separator className="mt-12" />}
                </div>
              ))}
            </div>
          </section>

          {/* Sección de Eventos */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Eventos Recientes</h2>
            <div className="grid grid-cols-1 gap-4">
              {eventos.map((evento) => (
                <div
                  key={evento.id}
                  className="flex items-center p-4 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => setSelectedEvento(evento)}
                >
                  <div className="mr-4 flex-shrink-0 w-16 h-16 bg-primary/10 rounded-md flex items-center justify-center">
                    <CalendarIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {evento.categoria}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{evento.fecha}</span>
                    </div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">{evento.titulo}</h3>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline">Ver todos los eventos</Button>
            </div>
          </section>
        </div>

        {/* Columna derecha (más pequeña) - Eventos Próximos */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 bg-muted/30 rounded-xl p-6 border border-border">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="bg-primary text-primary-foreground p-1.5 rounded-md mr-3">
                <CalendarIcon className="h-5 w-5" />
              </span>
              Próximos Eventos
            </h2>
            <div className="space-y-6">
              {proximosEventos.map((evento) => (
                <div key={evento.id} className="group cursor-pointer" onClick={() => setSelectedProximoEvento(evento)}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-14 h-14 bg-background rounded-md border border-border flex flex-col items-center justify-center">
                      <span className="text-lg font-bold leading-none">{evento.dia}</span>
                      <span className="text-xs uppercase text-muted-foreground">{evento.mes}</span>
                    </div>
                    <div>
                      <Badge className="mb-1.5">{evento.categoria}</Badge>
                      <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">{evento.titulo}</h3>
                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <ClockIcon className="mr-1.5 h-3 w-3" />
                          {evento.fecha}
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="mr-1.5 h-3 w-3" />
                          {evento.ubicacion}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button className="w-full">Ver calendario completo</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Noticias */}
      <Dialog open={selectedNoticia !== null} onOpenChange={(open) => !open && setSelectedNoticia(null)}>
        <DialogContent className="max-w-3xl bg-background text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedNoticia?.titulo}</DialogTitle>
            <DialogDescription className="text-sm">{selectedNoticia?.fecha}</DialogDescription>
          </DialogHeader>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </DialogClose>

          <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-6">
            <Image
              src={selectedNoticia?.imagen || "/placeholder.svg"}
              alt={selectedNoticia?.titulo || ""}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <p>{selectedNoticia?.descripcion}</p>
            <p>{selectedNoticia?.contenidoCompleto}</p>

            {selectedNoticia?.autor && (
              <div className="flex items-center mt-6 pt-6 border-t">
                <div className="bg-muted rounded-full p-2 mr-3">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Autor</p>
                  <p className="text-sm text-muted-foreground">{selectedNoticia.autor}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <Button>Compartir noticia</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para Eventos Recientes */}
      <Dialog open={selectedEvento !== null} onOpenChange={(open) => !open && setSelectedEvento(null)}>
        <DialogContent className="max-w-3xl bg-background text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedEvento?.titulo}</DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              <Badge variant="secondary">{selectedEvento?.categoria}</Badge>
              <span className="text-sm text-muted-foreground">{selectedEvento?.fecha}</span>
            </DialogDescription>
          </DialogHeader>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </DialogClose>

          <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-6">
            <Image
              src={selectedEvento?.imagen || "/placeholder.svg"}
              alt={selectedEvento?.titulo || ""}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Descripción del evento</h3>
            <p>{selectedEvento?.descripcion}</p>
            <p>{selectedEvento?.descripcionCompleta}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t">
              <div className="flex items-start">
                <div className="bg-muted rounded-md p-2 mr-3">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Fecha y hora</p>
                  <p className="text-sm text-muted-foreground">{selectedEvento?.fecha}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-muted rounded-md p-2 mr-3">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Ubicación</p>
                  <p className="text-sm text-muted-foreground">{selectedEvento?.ubicacion || "Por definir"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-muted rounded-md p-2 mr-3">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Organizador</p>
                  <p className="text-sm text-muted-foreground">{selectedEvento?.organizador || "Equipo de Difusión"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-muted rounded-md p-2 mr-3">
                  <TagIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Categoría</p>
                  <p className="text-sm text-muted-foreground">{selectedEvento?.categoria}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline">Agregar al calendario</Button>
            <Button>Inscribirse al evento</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para Próximos Eventos */}
      <Dialog open={selectedProximoEvento !== null} onOpenChange={(open) => !open && setSelectedProximoEvento(null)}>
        <DialogContent className="max-w-3x bg-background text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedProximoEvento?.titulo}</DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              <Badge>{selectedProximoEvento?.categoria}</Badge>
            </DialogDescription>
          </DialogHeader>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </DialogClose>

          <div className="bg-muted/30 rounded-lg p-6 mb-6 border">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-md flex flex-col items-center justify-center">
                <span className="text-2xl font-bold leading-none">{selectedProximoEvento?.dia}</span>
                <span className="text-xs uppercase text-muted-foreground">{selectedProximoEvento?.mes}</span>
              </div>
              <div>
                <h3 className="text-xl font-medium">{selectedProximoEvento?.titulo}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <ClockIcon className="mr-1.5 h-4 w-4" />
                  {selectedProximoEvento?.fecha}
                </div>
              </div>
            </div>

            <div className="flex items-center text-sm mb-2">
              <MapPinIcon className="mr-1.5 h-4 w-4" />
              <span className="font-medium">Ubicación:</span>
              <span className="ml-1">{selectedProximoEvento?.ubicacion}</span>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h4 className="font-medium">Descripción del evento</h4>
              <p>{selectedProximoEvento?.descripcion}</p>
              <p>{selectedProximoEvento?.descripcionCompleta}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Detalles adicionales</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="bg-muted rounded-md p-2 mr-3">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Ponentes</p>
                  <p className="text-sm text-muted-foreground">{selectedProximoEvento?.ponentes || "Por confirmar"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-muted rounded-md p-2 mr-3">
                  <TagIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Dirigido a</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedProximoEvento?.audiencia || "Público general"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg mt-4">
              <p className="text-sm font-medium">Nota importante</p>
              <p className="text-sm text-muted-foreground">
                {selectedProximoEvento?.nota ||
                  "La inscripción es gratuita pero los cupos son limitados. Se recomienda llegar 15 minutos antes del inicio del evento."}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline">Agregar al calendario</Button>
            <Button>Inscribirse ahora</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

