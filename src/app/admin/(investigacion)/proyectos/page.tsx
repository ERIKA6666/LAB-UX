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
import { Edit, Plus, Search, Trash2 } from "lucide-react";

// Definición de tipos
type StatusCategory = "en-curso" | "finalizado" | "planificado";

interface Project {
  id: number;
  title: string;
  description: string;
  status: StatusCategory;
  investigators: string[];
  startDate: string;
  endDate: string;
}

export default function ProyectosPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Evaluación de Usabilidad en Interfaces Móviles",
      description: "Estudio sobre la usabilidad de aplicaciones móviles en diferentes contextos de uso.",
      status: "en-curso",
      investigators: ["Dr. Juan Pérez", "Dra. María López"],
      startDate: "2023-01-15",
      endDate: "2023-12-31",
    },
    {
      id: 2,
      title: "Patrones de Interacción en Realidad Aumentada",
      description: "Investigación sobre patrones de interacción efectivos en aplicaciones de realidad aumentada.",
      status: "finalizado",
      investigators: ["Dr. Carlos Ruiz", "Dra. Ana Martínez"],
      startDate: "2022-03-10",
      endDate: "2023-02-28",
    },
    {
      id: 3,
      title: "Accesibilidad Web para Adultos Mayores",
      description: "Estudio de accesibilidad web enfocado en mejorar la experiencia de usuarios adultos mayores.",
      status: "planificado",
      investigators: ["Dra. Laura Sánchez"],
      startDate: "2023-09-01",
      endDate: "2024-08-31",
    },
  ]);

  const getStatusBadge = (status: StatusCategory) => {
    switch (status) {
      case "en-curso":
        return <Badge className="bg-blue-500">En Curso</Badge>;
      case "finalizado":
        return <Badge className="bg-green-500">Finalizado</Badge>;
      case "planificado":
        return <Badge className="bg-amber-500">Planificado</Badge>;
      default:
        const exhaustiveCheck: never = status;
        return <Badge>Desconocido</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Proyectos de Investigación</h2>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Proyecto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
                <DialogDescription>
                  Complete la información para crear un nuevo proyecto de investigación.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-title">Título del Proyecto</Label>
                  <Input id="project-title" placeholder="Ingrese el título del proyecto" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-description">Descripción</Label>
                  <Textarea id="project-description" placeholder="Describa el proyecto" rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project-status">Estado</Label>
                    <Select>
                      <SelectTrigger id="project-status">
                        <SelectValue placeholder="Seleccione un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planificado">Planificado</SelectItem>
                        <SelectItem value="en-curso">En Curso</SelectItem>
                        <SelectItem value="finalizado">Finalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-investigators">Investigadores</Label>
                    <Input id="project-investigators" placeholder="Nombres separados por comas" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project-start-date">Fecha de Inicio</Label>
                    <Input id="project-start-date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-end-date">Fecha de Finalización</Label>
                    <Input id="project-end-date" type="date" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Crear Proyecto</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar proyectos..." className="pl-8" />
        </div>
        <Select defaultValue="todos">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="en-curso">En Curso</SelectItem>
            <SelectItem value="finalizado">Finalizado</SelectItem>
            <SelectItem value="planificado">Planificado</SelectItem>
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
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    {getStatusBadge(project.status)}
                  </div>
                  <CardDescription>
                    {project.startDate} - {project.endDate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{project.description}</p>
                  <div className="mt-4">
                    <p className="text-sm font-medium">Investigadores:</p>
                    <ul className="text-sm text-muted-foreground">
                      {project.investigators.map((investigator, index) => (
                        <li key={index}>{investigator}</li>
                      ))}
                    </ul>
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
                    <th className="text-left p-4">Título</th>
                    <th className="text-left p-4">Estado</th>
                    <th className="text-left p-4">Fechas</th>
                    <th className="text-left p-4">Investigadores</th>
                    <th className="text-right p-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b">
                      <td className="p-4">
                        <div className="font-medium">{project.title}</div>
                        <div className="text-sm text-muted-foreground">{project.description.substring(0, 60)}...</div>
                      </td>
                      <td className="p-4">{getStatusBadge(project.status)}</td>
                      <td className="p-4">
                        <div className="text-sm">{project.startDate}</div>
                        <div className="text-sm">{project.endDate}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{project.investigators.join(", ")}</div>
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

