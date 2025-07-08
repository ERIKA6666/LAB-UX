"use client";

import { useState, useEffect } from "react";
import { Proyecto, EstadoProyecto } from "@/types/proyecto";
import { 
  fetchProyectos,
  createProyecto,
  updateProyecto,
  deleteProyecto,
  checkBackendConnection
} from "@/services/proyecto";
import { fetchAreasInvestigacion } from "@/services/areainvestigacion";
import { fetchUsers } from "@/services/usuarioService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus } from "lucide-react";
import ProjectCard from "./componentes/ProjectCard";
import ProjectList from "./componentes/ProjectList";
import DeleteConfirmationDialog from "./componentes/DeleteConfirmationDialog";
import { useToast } from "@/components/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

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

  // Checklist de áreas y usuarios
  const [areas, setAreas] = useState<{ ID: number; nombre: string }[]>([]);
  const [users, setUsers] = useState<{ ID: number; nombre: string; apellido: string }[]>([]);

  // Formulario de proyecto
  const [form, setForm] = useState({
    nombre: "",
    tipo_estudio: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    progreso: 0,
    estado: "planificacion" as EstadoProyecto,
    imagen: null as File | null,
    areas_investigacion: [] as number[],
    colaboradores: [] as number[],
  });

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
    } catch (err: any) {
      const errorMessage = err?.message || "Error desconocido";
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

  // Cargar áreas y usuarios para los checklists
  useEffect(() => {
    fetchAreasInvestigacion().then(setAreas).catch(() => setAreas([]));
    fetchUsers("", "", "").then(setUsers).catch(() => setUsers([]));
  }, []);

  useEffect(() => {
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterEstado]);

  // Manejar creación/actualización
  const handleSubmitProject = async (formData: FormData) => {
    try {
      // Añadir áreas y colaboradores como JSON
      formData.append("areas_investigacion", JSON.stringify(form.areas_investigacion.map(ID_area => ({ ID_area }))));
      formData.append("colaboradores", JSON.stringify(form.colaboradores.map(ID_usuario => ({ ID_usuario }))));
      let response;
      if (editingProject) {
        response = await updateProyecto(editingProject.ID, formData);
        toast({ title: "Proyecto actualizado correctamente" });
      } else {
        response = await createProyecto(formData);
        toast({ title: "Proyecto creado correctamente" });
      }
      setIsFormOpen(false);
      setEditingProject(null);
      setForm({
        nombre: "",
        tipo_estudio: "",
        descripcion: "",
        fecha_inicio: "",
        fecha_fin: "",
        progreso: 0,
        estado: "planificacion",
        imagen: null,
        areas_investigacion: [],
        colaboradores: [],
      });
      loadProjects();
    } catch (error: any) {
      // Mostrar mensaje del servidor si existe
      let serverMsg = error?.message;
      if (error?.response) {
        try {
          const data = await error.response.json();
          serverMsg = data?.message || serverMsg;
        } catch {}
      }
      toast({
        title: "Error",
        description: serverMsg || "Error desconocido",
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
    } catch (error: any) {
      let serverMsg = error?.message;
      if (error?.response) {
        try {
          const data = await error.response.json();
          serverMsg = data?.message || serverMsg;
        } catch {}
      }
      toast({
        title: "Error",
        description: serverMsg || "Error desconocido",
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

  // Manejar cambios en el formulario
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(prev => ({ ...prev, imagen: e.target.files[0] }));
    }
  };

  // Checklists
  const handleAreaCheck = (id: number) => {
    setForm(prev => ({
      ...prev,
      areas_investigacion: prev.areas_investigacion.includes(id)
        ? prev.areas_investigacion.filter(aid => aid !== id)
        : [...prev.areas_investigacion, id],
    }));
  };

  const handleUserCheck = (id: number) => {
    setForm(prev => ({
      ...prev,
      colaboradores: prev.colaboradores.includes(id)
        ? prev.colaboradores.filter(uid => uid !== id)
        : [...prev.colaboradores, id],
    }));
  };

  // Abrir formulario para editar
  const openEditForm = (project: Proyecto) => {
    setEditingProject(project);
    setIsFormOpen(true);
    setForm({
      nombre: project.nombre,
      tipo_estudio: project.tipo_estudio,
      descripcion: project.descripcion,
      fecha_inicio: project.fecha_inicio?.slice(0, 16) || "",
      fecha_fin: project.fecha_fin?.slice(0, 16) || "",
      progreso: project.progreso,
      estado: project.estado,
      imagen: null,
      areas_investigacion: project.areas_investigacion?.map(a => a.ID_area) || [],
      colaboradores: project.colaboradores?.map(c => c.ID_usuario) || [],
    });
  };

  // Función para convertir fechas al formato de MySQL
  function toMySQLDatetime(dateInput: string | Date) {
    if (!dateInput) return "";
    const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return "";
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  // Formulario de proyecto
  const renderProjectForm = () => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 ${isFormOpen ? '' : 'hidden'}`}>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl relative">
        <h3 className="text-xl font-bold mb-4">{editingProject ? "Editar Proyecto" : "Nuevo Proyecto"}</h3>
        <form
          onSubmit={e => {
            e.preventDefault();
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => {
              if (key === "imagen" && value) {
                formData.append("imagen", value as File);
              } else if (key === "fecha_inicio" || key === "fecha_fin") {
                formData.append(key, toMySQLDatetime(value as string));
              } else if (typeof value === "string" || typeof value === "number") {
                formData.append(key, String(value));
              }
            });
            // Agrega la fecha de creación y actualización SOLO al crear
            if (!editingProject) {
              const now = toMySQLDatetime(new Date());
              formData.append("fecha_creacion", now);
              formData.append("fecha_actualizacion", now);
            }
            handleSubmitProject(formData);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block font-medium">Nombre</label>
            <Input id="nombre" value={form.nombre} onChange={handleFormChange} required />
          </div>
          <div>
            <label className="block font-medium">Tipo de estudio</label>
            <Input id="tipo_estudio" value={form.tipo_estudio} onChange={handleFormChange} required />
          </div>
          <div>
            <label className="block font-medium">Descripción</label>
            <textarea id="descripcion" value={form.descripcion} onChange={handleFormChange} className="w-full border rounded px-2 py-1" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Fecha inicio</label>
              <Input id="fecha_inicio" type="datetime-local" value={form.fecha_inicio} onChange={handleFormChange} required />
            </div>
            <div>
              <label className="block font-medium">Fecha fin</label>
              <Input id="fecha_fin" type="datetime-local" value={form.fecha_fin} onChange={handleFormChange} required />
            </div>
          </div>
          <div>
            <label className="block font-medium">Progreso (%)</label>
            <Input id="progreso" type="number" min={0} max={100} value={form.progreso} onChange={handleFormChange} required />
          </div>
          <div>
            <label className="block font-medium">Estado</label>
            <Select value={form.estado} onValueChange={v => setForm(prev => ({ ...prev, estado: v as EstadoProyecto }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planificacion">Planificación</SelectItem>
                <SelectItem value="en_progreso">En Progreso</SelectItem>
                <SelectItem value="completado">Completado</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block font-medium">Imagen</label>
            <Input id="imagen" type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          {/* Checklist de áreas */}
          <div>
            <label className="block font-medium mb-1">Áreas de Investigación</label>
            <div className="flex flex-wrap gap-2">
              {areas.map(area => (
                <label key={area.ID} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={form.areas_investigacion.includes(area.ID)}
                    onChange={() => handleAreaCheck(area.ID)}
                  />
                  {area.nombre}
                </label>
              ))}
            </div>
          </div>
          {/* Checklist de colaboradores */}
          <div>
            <label className="block font-medium mb-1">Colaboradores</label>
            <div className="flex flex-wrap gap-2">
              {users.map(user => (
                <label key={user.ID} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={form.colaboradores.includes(user.ID)}
                    onChange={() => handleUserCheck(user.ID)}
                  />
                  {user.nombre} {user.apellido}
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={() => { setIsFormOpen(false); setEditingProject(null); }}>Cancelar</Button>
            <Button type="submit">{editingProject ? "Actualizar" : "Crear"}</Button>
          </div>
        </form>
      </div>
    </div>
  );

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
          setForm({
            nombre: "",
            tipo_estudio: "",
            descripcion: "",
            fecha_inicio: "",
            fecha_fin: "",
            progreso: 0,
            estado: "planificacion",
            imagen: null,
            areas_investigacion: [],
            colaboradores: [],
          });
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
            onEdit={openEditForm}
            onDelete={confirmDelete}
          />
        </TabsContent>

        <TabsContent value="list">
          <ProjectList 
            projects={projects} 
            loading={loading}
            onEdit={openEditForm}
            onDelete={confirmDelete}
          />
        </TabsContent>
      </Tabs>

      {/* Formulario */}
      {isFormOpen && renderProjectForm()}

      {/* Diálogo de confirmación de eliminación */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => projectToDelete && handleDeleteProject(projectToDelete)}
      />
    </div>
  );
}