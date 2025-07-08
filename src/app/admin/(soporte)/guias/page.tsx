"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Book, Edit, ExternalLink, FileText, ImagePlus, Plus, Search, Trash2, Upload } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"
import { createGuia, fetchGuias, deleteGuia, updateGuia } from "@/services/guias"
import { useToast } from "@/components/hooks/use-toast"
import { API_URL } from "@/constans/Api"
type GuiaCategory = "participantes" | "metodologia" | "diseno" | "accesibilidad" | "general";
type GuiaType = "pdf" | "video" | "web";

interface GuiaForm {
  titulo: string;
  descripcion: string;
  categoria: GuiaCategory | "";
  tipo: GuiaType | "";
  recurso: string;
  imagen: string;
}

export default function GuiasPage() {
  const { toast } = useToast();
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState<GuiaForm>({
    titulo: "",
    descripcion: "",
    categoria: "",
    tipo: "",
    recurso: "",
    imagen: "",
  });
  const [editingGuide, setEditingGuide] = useState<any | null>(null);

  // Cargar guías al inicio
  const loadGuides = async () => {
    setLoading(true);
    try {
      const data = await fetchGuias();
      setGuides(data);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadGuides(); }, []);

  // Manejo de archivos (solo guarda nombre, puedes adaptar para subir a servidor)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(f => ({ ...f, recurso: e.target.files[0].name }));
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(f => ({ ...f, imagen: e.target.files[0].name }));
    }
  };

  // Validación simple
  const validateForm = () => {
    if (!form.titulo || !form.descripcion || !form.categoria || !form.tipo || !form.recurso) {
      toast({ title: "Campos requeridos", description: "Completa todos los campos obligatorios.", variant: "destructive" });
      return false;
    }
    return true;
  };

  // Crear guía
  const handleCreateGuia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const now = new Date();
      const fecha_publicacion = now.toISOString().slice(0, 10);
      await createGuia({
        titulo: form.titulo,
        descripcion: form.descripcion,
        categoria: form.categoria,
        fecha_publicacion,
        ID_usuario: 1, // Cambia por el usuario real
        recursos: [{
          tipo: form.tipo,
          recurso: form.recurso,
          descripcion: form.descripcion,
        }],
        areas_investigacion: [],
      });
      toast({ title: "Guía creada", description: "La guía fue creada correctamente.", variant: "success" });
      setOpenDialog(false);
      setForm({
        titulo: "",
        descripcion: "",
        categoria: "",
        tipo: "",
        recurso: "",
        imagen: "",
      });
      loadGuides();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  // Eliminar guía
  const handleDeleteGuia = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta guía?")) return;
    try {
      await deleteGuia(id);
      toast({ title: "Guía eliminada", description: "La guía fue eliminada correctamente.", variant: "success" });
      loadGuides();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  // Abrir modal de edición
  const openEditDialog = (guide: any) => {
    setEditingGuide(guide);
    setForm({
      titulo: guide.titulo || guide.title || "",
      descripcion: guide.descripcion || guide.description || "",
      categoria: guide.categoria || guide.category || "",
      tipo: guide.recursos?.[0]?.tipo || guide.type || "",
      recurso: guide.recursos?.[0]?.recurso || "",
      imagen: guide.imagen || guide.image || "",
    });
    setOpenDialog(true);
  };

  // Guardar edición
  const handleEditGuia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !editingGuide) return;
    try {
      await updateGuia(editingGuide.ID || editingGuide.id, {
        titulo: form.titulo,
        descripcion: form.descripcion,
        categoria: form.categoria,
        recursos: [{
          tipo: form.tipo,
          recurso: form.recurso,
          descripcion: form.descripcion,
        }],
        imagen: form.imagen,
      });
      toast({ title: "Guía actualizada", description: "La guía fue actualizada correctamente.", variant: "success" });
      setOpenDialog(false);
      setEditingGuide(null);
      setForm({
        titulo: "",
        descripcion: "",
        categoria: "",
        tipo: "",
        recurso: "",
        imagen: "",
      });
      loadGuides();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const getCategoryBadge = (category: GuiaCategory) => {
    switch (category) {
      case "participantes":
        return <Badge className="bg-blue-500">Participantes</Badge>
      case "metodologia":
        return <Badge className="bg-green-500">Metodología</Badge>
      case "diseno":
        return <Badge className="bg-purple-500">Diseño</Badge>
      case "accesibilidad":
        return <Badge className="bg-amber-500">Accesibilidad</Badge>
      default:
        return <Badge>General</Badge>
    }
  };

  const getTypeIcon = (type: GuiaType) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 mr-2" />
      case "video":
        return <Book className="h-4 w-4 mr-2" />
      default:
        return <FileText className="h-4 w-4 mr-2" />
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Toaster />
      
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Guías y Tutoriales</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nueva Guía
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Añadir Nueva Guía o Tutorial</DialogTitle>
                <DialogDescription>Complete la información para añadir una nueva guía o tutorial.</DialogDescription>
              </DialogHeader>
              <form onSubmit={editingGuide ? handleEditGuia : handleCreateGuia}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="guide-title">Título</Label>
                    <Input id="guide-title" value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} placeholder="Título de la guía o tutorial" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="guide-description">Descripción</Label>
                    <Textarea id="guide-description" value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} placeholder="Descripción breve" rows={3} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="guide-category">Categoría</Label>
                      <Select value={form.categoria} onValueChange={v => setForm(f => ({ ...f, categoria: v as GuiaCategory }))} required>
                        <SelectTrigger id="guide-category">
                          <SelectValue placeholder="Seleccione una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="participantes">Participantes</SelectItem>
                          <SelectItem value="metodologia">Metodología</SelectItem>
                          <SelectItem value="diseno">Diseño</SelectItem>
                          <SelectItem value="accesibilidad">Accesibilidad</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="guide-type">Tipo</Label>
                      <Select value={form.tipo} onValueChange={v => setForm(f => ({ ...f, tipo: v as GuiaType }))} required>
                        <SelectTrigger id="guide-type">
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="web">Página Web</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="guide-file">Archivo</Label>
                    <div className="flex items-center gap-2">
                      <Input id="guide-file" type="file" className="hidden" onChange={handleFileChange} />
                      <Button variant="outline" asChild className="w-full">
                        <label htmlFor="guide-file" className="cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          {form.recurso ? form.recurso : "Subir Archivo"}
                        </label>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Formatos aceptados: PDF, MP4, WEBM</p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="guide-image">Imagen de Portada</Label>
                    <div className="flex items-center gap-2">
                      <Input id="guide-image" type="file" className="hidden" onChange={handleImageChange} />
                      <Button variant="outline" asChild>
                        <label htmlFor="guide-image" className="cursor-pointer">
                          <ImagePlus className="mr-2 h-4 w-4" />
                          {form.imagen ? form.imagen : "Seleccionar Imagen"}
                        </label>
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{editingGuide ? "Guardar Cambios" : "Añadir Guía"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar guías..." className="pl-8" />
        </div>
        <Select defaultValue="todas">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las categorías</SelectItem>
            <SelectItem value="participantes">Participantes</SelectItem>
            <SelectItem value="metodologia">Metodología</SelectItem>
            <SelectItem value="diseno">Diseño</SelectItem>
            <SelectItem value="accesibilidad">Accesibilidad</SelectItem>
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
            {guides.map((guide, idx) => (
              <Card key={guide.ID || guide.id || idx} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={guide.imagen || `${API_URL}/uploads/guias/${guide.image}` || "/placeholder.svg"}
                    alt={guide.titulo || guide.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{guide.titulo || guide.title}</CardTitle>
                    {getCategoryBadge((guide.categoria || guide.category) as GuiaCategory)}
                  </div>
                  <CardDescription>{guide.descripcion || guide.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm">
                    {getTypeIcon((guide.recursos?.[0]?.tipo || guide.type) as GuiaType)}
                    <span className="capitalize">{guide.recursos?.[0]?.tipo || guide.type}</span>
                    <span className="mx-2">•</span>
                    <span>{guide.fecha_publicacion || guide.date}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`${API_URL}/uploads/tutoriales${guide.recursos?.[0]?.recurso}` || guide.url || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ver
                    </a>
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(guide)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteGuia(guide.ID || guide.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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
                    <th className="text-left p-4">Categoría</th>
                    <th className="text-left p-4">Tipo</th>
                    <th className="text-left p-4">Fecha</th>
                    <th className="text-right p-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {guides.map((guide, idx) => (
                    <tr key={guide.ID || guide.id || idx} className="border-b">
                      <td className="p-4">
                        <div className="font-medium">{guide.titulo || guide.title}</div>
                        <div className="text-sm text-muted-foreground">{guide.descripcion || guide.description}</div>
                      </td>
                      <td className="p-4">{getCategoryBadge(guide.categoria as GuiaCategory)}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          {getTypeIcon(guide.recursos?.[0]?.tipo as GuiaType)}
                          <span className="capitalize">{guide.recursos?.[0]?.tipo}</span>
                        </div>
                      </td>
                      <td className="p-4">{guide.fecha_publicacion || guide.date}</td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="icon" className="mr-2" asChild>
                          <a href={guide.recursos?.[0]?.recurso || guide.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon" className="mr-2" onClick={() => openEditDialog(guide)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteGuia(guide.ID || guide.id)}>
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

      <Card>
        <CardHeader>
          <CardTitle>Vista Previa</CardTitle>
          <CardDescription>Así se verá la sección de Guías y Tutoriales en el sitio web</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-6">
            <h3 className="text-2xl font-bold mb-6">Guías y Tutoriales</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="text-xl font-semibold mb-4">Categorías</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">
                    <Badge className="bg-blue-500 mr-2">10</Badge>
                    Participantes
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Badge className="bg-green-500 mr-2">8</Badge>
                    Metodología
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Badge className="bg-purple-500 mr-2">6</Badge>
                    Diseño
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Badge className="bg-amber-500 mr-2">4</Badge>
                    Accesibilidad
                  </Button>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Recursos Destacados</h4>
                <div className="space-y-2">
                  <div className="flex items-center p-2 border rounded-md hover:bg-muted">
                    <FileText className="h-5 w-5 mr-3 text-blue-500" />
                    <div>
                      <div className="font-medium">Guía para Participantes</div>
                      <div className="text-sm text-muted-foreground">
                        Todo lo que necesitas saber antes de participar
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center p-2 border rounded-md hover:bg-muted">
                    <Book className="h-5 w-5 mr-3 text-green-500" />
                    <div>
                      <div className="font-medium">Tutorial de Evaluación Heurística</div>
                      <div className="text-sm text-muted-foreground">Aprende paso a paso esta metodología</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4">Todas las Guías</h4>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {guides.map((guide, idx) => (
                  <Card key={guide.ID || guide.id || idx} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={guide.imagen || guide.image || "/placeholder.svg"}
                        alt={guide.titulo || guide.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        {getCategoryBadge(guide.categoria as GuiaCategory)}
                        <div className="flex items-center text-xs text-muted-foreground">
                          {getTypeIcon(guide.recursos?.[0]?.tipo as GuiaType)}
                          <span className="capitalize">{guide.recursos?.[0]?.tipo}</span>
                        </div>
                      </div>
                      <h5 className="font-medium line-clamp-2">{guide.titulo || guide.title}</h5>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

