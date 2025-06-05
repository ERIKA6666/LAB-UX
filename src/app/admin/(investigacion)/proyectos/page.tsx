"use client";

import { useEffect, useState } from "react";
import { Proyecto, EstadoProyecto } from "@/types/proyecto";
import { fetchProyectos, addProyecto } from "@/services/proyecto";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { API_URL } from "@/constans/Api";
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
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState<EstadoProyecto | "todos">("todos");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Formulario para crear proyecto
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    estado: "planificacion" as EstadoProyecto,
    fecha_inicio: "",
    fecha_fin: "",
    investigadores: "",
    imagen: undefined as File | undefined, // <-- nuevo campo
  });

  // Cargar proyectos desde la API
  useEffect(() => {
    setLoading(true);
    fetchProyectos(search, filterEstado)
      .then((data) => setProjects(data))
      .finally(() => setLoading(false));
  }, [search, filterEstado]);

  // Manejo de formulario de creación
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string, name: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProyecto({
        nombre: form.nombre,
        descripcion: form.descripcion,
        estado: form.estado,
        fecha_inicio: form.fecha_inicio,
        fecha_fin: form.fecha_fin,
        imagen: form.imagen, // <-- aquí
        // otros campos si es necesario
      });
      setIsDialogOpen(false);
      setForm({
        nombre: "",
        descripcion: "",
        estado: "planificacion",
        fecha_inicio: "",
        fecha_fin: "",
        investigadores: "",
      });
      setLoading(true);
      const data = await fetchProyectos(search, filterEstado);
      setProjects(data);
    } catch (err) {
      alert("Error al crear proyecto");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, imagen: e.target.files![0] }));
    }
  };

  const getStatusBadge = (estado: EstadoProyecto) => {
    switch (estado) {
      case "en_progreso":
        return <Badge className="bg-blue-500">En Progreso</Badge>;
      case "completado":
        return <Badge className="bg-green-500">Completado</Badge>;
      case "planificacion":
        return <Badge className="bg-amber-500">Planificación</Badge>;
      case "cancelado":
        return <Badge className="bg-red-500">Cancelado</Badge>;
      default:
        return <Badge>Desconocido</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Proyectos de Investigación</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              <form onSubmit={handleCreateProject}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project-title">Título del Proyecto</Label>
                    <Input
                      id="project-title"
                      name="nombre"
                      placeholder="Ingrese el título del proyecto"
                      value={form.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-description">Descripción</Label>
                    <Textarea
                      id="project-description"
                      name="descripcion"
                      placeholder="Describa el proyecto"
                      rows={4}
                      value={form.descripcion}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="project-status">Estado</Label>
                      <Select
                        value={form.estado}
                        onValueChange={(value) => handleSelectChange(value, "estado")}
                        required
                      >
                        <SelectTrigger id="project-status">
                          <SelectValue placeholder="Seleccione un estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planificacion">Planificación</SelectItem>
                          <SelectItem value="en_progreso">En Progreso</SelectItem>
                          <SelectItem value="completado">Completado</SelectItem>
                          <SelectItem value="cancelado">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="project-start-date">Fecha de Inicio</Label>
                      <Input
                        id="project-start-date"
                        name="fecha_inicio"
                        type="date"
                        value={form.fecha_inicio}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="project-end-date">Fecha de Finalización</Label>
                      <Input
                        id="project-end-date"
                        name="fecha_fin"
                        type="date"
                        value={form.fecha_fin}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-image">Imagen del Proyecto</Label>
                    <Input
                      id="project-image"
                      name="imagen"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={loading}>
                    Crear Proyecto
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar proyectos..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={filterEstado} onValueChange={setFilterEstado}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="planificacion">Planificación</SelectItem>
            <SelectItem value="en_progreso">En Progreso</SelectItem>
            <SelectItem value="completado">Completado</SelectItem>
            <SelectItem value="cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Vista de Tarjetas</TabsTrigger>
          <TabsTrigger value="list">Vista de Lista</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          {loading ? (
            <div className="text-center py-10 text-lg">Cargando proyectos...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">No hay proyectos para mostrar.</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.ID}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{project.nombre}</CardTitle>
                      {getStatusBadge(project.estado)}
                    </div>
                    <CardDescription>
                      {project.fecha_inicio} - {project.fecha_fin}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {project.imagen && (
                      <img
                        src={
                          typeof project.imagen === "string"
                            ? `${API_URL}/uploads/${project.imagen}`
                            : URL.createObjectURL(project.imagen)
                        }
                        alt={project.nombre}
                        className="w-full h-40 object-cover rounded mb-2"
                      />
                    )}
                    <p className="text-sm">{project.descripcion}</p>
                    {/* Puedes mostrar más campos aquí */}
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
          )}
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="text-center py-10 text-lg">Cargando proyectos...</div>
              ) : projects.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No hay proyectos para mostrar.</div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Título</th>
                      <th className="text-left p-4">Estado</th>
                      <th className="text-left p-4">Fechas</th>
                      <th className="text-right p-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.ID} className="border-b">
                        <td className="p-4">
                          <div className="font-medium">{project.nombre}</div>
                          <div className="text-sm text-muted-foreground">{project.descripcion?.substring(0, 60)}...</div>
                        </td>
                        <td className="p-4">{getStatusBadge(project.estado)}</td>
                        <td className="p-4">
                          <div className="text-sm">{project.fecha_inicio}</div>
                          <div className="text-sm">{project.fecha_fin}</div>
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
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

