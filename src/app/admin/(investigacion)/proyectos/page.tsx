"use client";

import { useState, useEffect } from "react";
import { Proyecto, EstadoProyecto } from "@/types/proyecto";
import { 
  fetchProyectos,
  createProyecto,
  updateProyecto,
  deleteProyecto,
  checkBackendConnection
} from "@/services/index"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus } from "lucide-react";
import ProjectCard from "./componentes/ProjectCard";
import ProjectList from "./componentes/ProjectList";
import ProjectForm from "./componentes/ProjectForm";
import DeleteConfirmationDialog from "./componentes/DeleteConfirmationDialog";
import { useToast } from "@/components/hooks/use-toast";

type FilterEstado = EstadoProyecto | "todos";

export default function ProyectosPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState<FilterEstado>("todos");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Proyecto | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);

  // Cargar proyectos
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const isBackendUp = await checkBackendConnection();
      if (!isBackendUp) {
        throw new Error("El servidor backend no está disponible");
      }

      const data = await fetchProyectos(
        search, 
        filterEstado === "todos" ? undefined : filterEstado
      );
      setProjects(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadProjects();
  }, [search, filterEstado]);


  // Manejar creación/actualización
  const handleSubmitProject = async (formData: FormData) => {
    try {
      if (editingProject) {
        await updateProyecto(editingProject.ID, formData);
        toast({ title: "Proyecto actualizado correctamente" });
      } else {
        await createProyecto(formData);
        toast({ title: "Proyecto creado correctamente" });
      }
      setIsFormOpen(false);
      setEditingProject(null);
      loadProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
      });
    }
  };

  // Manejar eliminación
  const handleDeleteProject = async (id: number) => {
    try {
      await deleteProyecto(id);
      toast({ title: "Proyecto eliminado correctamente" });
      loadProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el proyecto",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const confirmDelete = (id: number) => {
    setProjectToDelete(id);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {error && (
        <div className="bg-destructive/15 p-4 rounded-md border border-destructive">
          <p className="text-destructive">{error}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={loadProjects}
          >
            Reintentar
          </Button>
        </div>
      )}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Proyectos de Investigación</h2>
        <Button onClick={() => {
          setEditingProject(null);
          setIsFormOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Proyecto
        </Button>
      </div>

      {/* Filtros */}
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
        <Select 
          value={filterEstado} 
          onValueChange={(value) => setFilterEstado(value as FilterEstado)}
        >
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

      {/* Contenido principal */}
      <Tabs defaultValue="grid">
        <TabsList>
          <TabsTrigger value="grid">Vista de Tarjetas</TabsTrigger>
          <TabsTrigger value="list">Vista de Lista</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          <ProjectCard 
            projects={projects} 
            loading={loading}
            onEdit={(project) => {
              setEditingProject(project);
              setIsFormOpen(true);
            }}
            onDelete={confirmDelete}
          />
        </TabsContent>

        <TabsContent value="list">
          <ProjectList 
            projects={projects} 
            loading={loading}
            onEdit={(project) => {
              setEditingProject(project);
              setIsFormOpen(true);
            }}
            onDelete={confirmDelete}
          />
        </TabsContent>
      </Tabs>

      {/* Formulario */}
      <ProjectForm
        open={isFormOpen || !!editingProject}
        onOpenChange={(open) => {
          if (!open) {
            setIsFormOpen(false);
            setEditingProject(null);
          } else {
            setIsFormOpen(true);
          }
        }}
        project={editingProject}
        onSubmit={handleSubmitProject}
      />

      {/* Diálogo de confirmación de eliminación */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => projectToDelete && handleDeleteProject(projectToDelete)}
      />
    </div>
  );
}