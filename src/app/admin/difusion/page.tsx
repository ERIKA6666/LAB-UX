"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  Edit,
  ExternalLink,
  FileText,
  ImagePlus,
  Plus,
  Search,
  Trash2,
  Upload,
  Video,
} from "lucide-react";

// Definición de tipos
type EventType = "conferencia" | "taller" | "webinar";
type MaterialType = "presentation" | "document" | "video";

interface Material {
  type: MaterialType;
  name: string;
  url: string;
}

interface PastEvent {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  type: EventType;
  materials: Material[];
  attendees: number;
  highlights: string;
}

export default function EventosPasadosPage() {
  const [pastEvents, setPastEvents] = useState<PastEvent[]>([
    {
      id: 1,
      title: "Conferencia Internacional de Usabilidad 2022",
      description: "Conferencia anual sobre las últimas tendencias y avances en usabilidad y experiencia de usuario.",
      image: "/placeholder.svg",
      date: "2022-11-10",
      type: "conferencia",
      materials: [
        { type: "presentation", name: "Presentación Principal", url: "#" },
        { type: "document", name: "Memorias del Evento", url: "#" },
        { type: "video", name: "Grabación de la Conferencia", url: "#" },
      ],
      attendees: 180,
      highlights: "Participación de expertos internacionales en UX. Presentación de nuevas metodologías de evaluación.",
    },
    {
      id: 2,
      title: "Taller de Diseño Centrado en el Usuario",
      description:
        "Taller práctico sobre metodologías de diseño centrado en el usuario y su aplicación en proyectos reales.",
      image: "/placeholder.svg",
      date: "2022-09-15",
      type: "taller",
      materials: [
        { type: "presentation", name: "Diapositivas del Taller", url: "#" },
        { type: "document", name: "Material de Ejercicios", url: "#" },
      ],
      attendees: 25,
      highlights: "Ejercicios prácticos de análisis de usuarios. Creación de personas y escenarios.",
    },
    {
      id: 3,
      title: "Webinar: Tendencias en Interfaces de Usuario 2022",
      description:
        "Sesión online sobre las tendencias actuales en el diseño de interfaces de usuario y su impacto en la experiencia de usuario.",
      image: "/placeholder.svg",
      date: "2022-07-20",
      type: "webinar",
      materials: [
        { type: "presentation", name: "Presentación del Webinar", url: "#" },
        { type: "video", name: "Grabación del Webinar", url: "#" },
      ],
      attendees: 120,
      highlights:
        "Análisis de casos de estudio de grandes empresas. Discusión sobre el futuro de las interfaces de usuario.",
    },
  ]);

  const getTypeBadge = (type: EventType) => {
    switch (type) {
      case "conferencia":
        return <Badge className="bg-blue-500">Conferencia</Badge>;
      case "taller":
        return <Badge className="bg-green-500">Taller</Badge>;
      case "webinar":
        return <Badge className="bg-purple-500">Webinar</Badge>;
      default:
        const exhaustiveCheck: never = type;
        return <Badge>Evento</Badge>;
    }
  };

  const getMaterialIcon = (type: MaterialType) => {
    switch (type) {
      case "presentation":
        return <FileText className="h-4 w-4 mr-2" />;
      case "document":
        return <FileText className="h-4 w-4 mr-2" />;
      case "video":
        return <Video className="h-4 w-4 mr-2" />;
      default:
        const exhaustiveCheck: never = type;
        return <FileText className="h-4 w-4 mr-2" />;
    }
  };
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Eventos Pasados</h2>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Añadir Evento Pasado
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Añadir Evento Pasado</DialogTitle>
                <DialogDescription>
                  Complete la información para añadir un evento pasado y sus materiales.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="event-title">Título del Evento</Label>
                  <Input id="event-title" placeholder="Ingrese el título del evento" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-description">Descripción</Label>
                  <Textarea id="event-description" placeholder="Describa el evento" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="event-date">Fecha</Label>
                    <Input id="event-date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="event-type">Tipo de Evento</Label>
                    <Select>
                      <SelectTrigger id="event-type">
                        <SelectValue placeholder="Seleccione un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conferencia">Conferencia</SelectItem>
                        <SelectItem value="taller">Taller</SelectItem>
                        <SelectItem value="webinar">Webinar</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-attendees">Número de Asistentes</Label>
                  <Input id="event-attendees" type="number" placeholder="Número de participantes" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-highlights">Aspectos Destacados</Label>
                  <Textarea id="event-highlights" placeholder="Aspectos más relevantes del evento" rows={2} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-image">Imagen del Evento</Label>
                  <div className="flex items-center gap-2">
                    <Input id="event-image" type="file" className="hidden" />
                    <Button variant="outline" asChild>
                      <label htmlFor="event-image" className="cursor-pointer">
                        <ImagePlus className="mr-2 h-4 w-4" />
                        Seleccionar Imagen
                      </label>
                    </Button>
                    <span className="text-sm text-muted-foreground">Ningún archivo seleccionado</span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Materiales del Evento</Label>
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="material-type">Tipo</Label>
                        <Select>
                          <SelectTrigger id="material-type">
                            <SelectValue placeholder="Tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="presentation">Presentación</SelectItem>
                            <SelectItem value="document">Documento</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="material-name">Nombre</Label>
                        <Input id="material-name" placeholder="Nombre del material" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="material-file">Archivo</Label>
                        <div className="flex items-center gap-2">
                          <Input id="material-file" type="file" className="hidden" />
                          <Button variant="outline" asChild className="w-full">
                            <label htmlFor="material-file" className="cursor-pointer">
                              <Upload className="mr-2 h-4 w-4" />
                              Subir Archivo
                            </label>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Añadir Otro Material
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Añadir Evento</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar eventos pasados..." className="pl-8" />
        </div>
        <Select defaultValue="todos">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los tipos</SelectItem>
            <SelectItem value="conferencia">Conferencia</SelectItem>
            <SelectItem value="taller">Taller</SelectItem>
            <SelectItem value="webinar">Webinar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Vista de Tarjetas</TabsTrigger>
          <TabsTrigger value="list">Vista de Lista</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    {getTypeBadge(event.type)}
                  </div>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div>
                      <span className="font-medium">Asistentes:</span> {event.attendees}
                    </div>
                    <div>
                      <span className="font-medium">Aspectos destacados:</span>
                      <p className="text-muted-foreground mt-1">{event.highlights}</p>
                    </div>
                    <div>
                      <span className="font-medium">Materiales:</span>
                      <ul className="mt-1 space-y-1">
                        {event.materials.map((material, index) => (
                          <li key={index} className="flex items-center">
                            {getMaterialIcon(material.type)}
                            <a
                              href={material.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline flex items-center"
                            >
                              {material.name}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Evento</th>
                    <th className="text-left p-4">Fecha</th>
                    <th className="text-left p-4">Tipo</th>
                    <th className="text-left p-4">Asistentes</th>
                    <th className="text-left p-4">Materiales</th>
                    <th className="text-right p-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pastEvents.map((event) => (
                    <tr key={event.id} className="border-b">
                      <td className="p-4">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">{event.description.substring(0, 60)}...</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{event.date}</span>
                        </div>
                      </td>
                      <td className="p-4">{getTypeBadge(event.type)}</td>
                      <td className="p-4">{event.attendees}</td>
                      <td className="p-4">
                        <div className="flex space-x-1">
                          {event.materials.map((material, index) => (
                            <a
                              key={index}
                              href={material.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={material.name}
                              className="p-1 rounded-md hover:bg-muted"
                            >
                              {getMaterialIcon(material.type)}
                            </a>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="icon" className="mr-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

