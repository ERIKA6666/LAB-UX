"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DeleteConfirmationDialog from "./componentes/DeleteConfirmationDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Edit, Plus, Save, Search, Trash2 } from "lucide-react";
import { 
  MetodologiaPrueba, 
  TipoMetodologiaPrueba,
  MetodologiaCaracteristica 
} from "@/types/metodologiaPrueba";
import {
  fetchMetodologias,
  createMetodologia,
  updateMetodologia,
  deleteMetodologia,
  fetchCaracteristicas,
  createCaracteristica,
  updateCaracteristica,
  deleteCaracteristica,
  fetchMetodologia,
  fetchCaracteristica
} from "@/services/metodologiaPrueba";
import { useToast } from "@/components/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { API_URL } from "@/constans/Api";

type MetodologiaForm = Omit<MetodologiaPrueba, "ID" | "fecha_creacion" | "caracteristicas"> & { imagen?: File | string | null };

// Función para convertir fecha a formato MySQL
function toMySQLDatetime(dateInput: string | Date) {
  const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export default function PruebasMetodologiaPage() {
  const { toast } = useToast();
  const [metodologiasPruebas, setMetodologiasPruebas] = useState<MetodologiaPrueba[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState<TipoMetodologiaPrueba | "todos">("todos");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MetodologiaForm | null>(null);
  const [caracteristicas, setCaracteristicas] = useState<MetodologiaCaracteristica[]>([]);
  const [newCaracteristica, setNewCaracteristica] = useState("");
  const [newCaracteristicaDescripcion, setNewCaracteristicaDescripcion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [metodologiaPruebaToDelete, setmetodologiaPruebaToDelete] = useState<number | null>(null);

  // Cargar metodologías/pruebas
  const loadMetodologiaPruebas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMetodologias(
        search, 
        filterTipo === "todos" ? undefined : filterTipo
      );
      setMetodologiasPruebas(data);
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

  useEffect(() => { loadMetodologiaPruebas(); }, [search, filterTipo]);

  // Cargar características cuando se selecciona un ítem para editar
  useEffect(() => {
    if (currentItem && (currentItem as any).ID) {
      const loadCaracteristicas = async () => {
        try {
          // Filtra las características del ítem seleccionado
          const data = await fetchCaracteristicas();
          setCaracteristicas(data.filter(c => c.ID_metodologia === (currentItem as any).ID));
        } catch (error) {
          toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Error desconocido",
            variant: "destructive",
          });
        }
      };
      loadCaracteristicas();
    } else {
      setCaracteristicas([]);
    }
  }, [currentItem]);

  // Guardar (crear o editar)
  const handleSave = async () => {
    if (!currentItem) return;
    try {
      let dataToSend: FormData | MetodologiaForm;
      const now = new Date();
      const fecha_creacion = toMySQLDatetime(now);

      if (currentItem.imagen instanceof File) {
        const formData = new FormData();
        formData.append("nombre", currentItem.nombre);
        formData.append("descripcion", currentItem.descripcion || "");
        formData.append("tipo", currentItem.tipo);
        formData.append("imagen", currentItem.imagen);
        formData.append("fecha_creacion", fecha_creacion);
        dataToSend = formData;
      } else {
        dataToSend = {
          ...currentItem,
          imagen: typeof currentItem.imagen === "string" ? currentItem.imagen : undefined,
          fecha_creacion,
        };
      }
      if ((currentItem as any).ID) {
        await updateMetodologia((currentItem as any).ID, dataToSend);
        toast({ title: "Metodología/Prueba actualizada correctamente" });
      } else {
        await createMetodologia(dataToSend);
        toast({ title: "Metodología/Prueba creada correctamente" });
      }
      setIsDialogOpen(false);
      setCurrentItem(null);
      loadMetodologiaPruebas();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
      });
    }
  };

  // Características
  const handleAddCaracteristica = async () => {
    if (!(currentItem as any)?.ID || !newCaracteristica) return;
    try {
      await createCaracteristica({
        ID_metodologia: (currentItem as any).ID,
        caracteristica: newCaracteristica,
        descripcion: newCaracteristicaDescripcion
      });
      setNewCaracteristica("");
      setNewCaracteristicaDescripcion("");
      // Recarga características
      const data = await fetchCaracteristicas();
      setCaracteristicas(data.filter(c => c.ID_metodologia === (currentItem as any).ID));
      toast({ title: "Característica añadida correctamente" });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCaracteristica = async (id: number) => {
    try {
      await deleteCaracteristica(id);
      if ((currentItem as any)?.ID) {
        const data = await fetchCaracteristicas();
        setCaracteristicas(data.filter(c => c.ID_metodologia === (currentItem as any).ID));
      }
      toast({ title: "Característica eliminada correctamente" });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
      });
    }
  };

  const getTipoBadge = (tipo: TipoMetodologiaPrueba) => {
    switch (tipo) {
      case "metodologia":
        return <Badge className="bg-green-500">Metodología</Badge>;
      case "prueba":
        return <Badge className="bg-blue-500">Prueba</Badge>;
      default:
        return <Badge>Desconocido</Badge>;
    }
  };

  // Eliminar un registro
  const handleDeleteMetodologiaPrueba = async (id: number) => {
    try {
      await deleteMetodologia(id);
      toast({ title: "Proyecto eliminado correctamente" });
      loadMetodologiaPruebas();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setmetodologiaPruebaToDelete(null);
    }
  };

  const confirmDelete = (id: number) => {
    setmetodologiaPruebaToDelete(id);
    setDeleteDialogOpen(true);
  };

  // --- Render ---
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Toaster />
      {error && (
        <div className="bg-destructive/15 p-4 rounded-md border border-destructive">
          <p className="text-destructive">{error}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={loadMetodologiaPruebas}
          >
            Reintentar
          </Button>
        </div>
      )}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Metodologías y Pruebas de Investigación</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => {
            setCurrentItem({
              nombre: "",
              descripcion: "",
              tipo: "metodologia",
              imagen: null,
            });
            setIsDialogOpen(true);
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo
          </Button>
        </div>
      </div>
      {/* Filtros */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar metodologías/pruebas..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          value={filterTipo}
          onValueChange={(value) => setFilterTipo(value as TipoMetodologiaPrueba | "todos")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="metodologia">Metodologías</SelectItem>
            <SelectItem value="prueba">Pruebas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center py-10">Cargando...</div>
        ) : metodologiasPruebas.length === 0 ? (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            No se encontraron metodologías/pruebas
          </div>
        ) : (
          metodologiasPruebas.map((item) => (
            <Card key={item.ID}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.nombre}</CardTitle>
                  {getTipoBadge(item.tipo)}
                </div>
              </CardHeader>
              <CardContent>
                {item.imagen && (
                  <img
                    src={`${API_URL}/uploads/metodologia/${item.imagen}`}
                    alt={item.nombre}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                )}
                <p className="text-sm text-muted-foreground">{item.descripcion}</p>
                {/* Características */}
                {item.caracteristicas && item.caracteristicas.length > 0 && (
                  <div className="mt-2">
                    <Label className="text-xs text-muted-foreground">Características:</Label>
                    <ul className="mt-1 space-y-1">
                      {item.caracteristicas.map((caract) => (
                        <li key={caract.ID} className="flex items-center justify-between bg-muted px-2 py-1 rounded">
                          <span className="text-xs">{caract.caracteristica}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2"
                            onClick={() => handleDeleteCaracteristica(caract.ID)}
                            title="Eliminar característica"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    setCurrentItem(item);
                    setIsDialogOpen(true);
                    // Cargar características del ítem seleccionado
                    if (item.ID) {
                      const data = await fetchCaracteristicas();
                      setCaracteristicas(data.filter(c => c.ID_metodologia === item.ID));
                    }
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => confirmDelete(item.ID)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Diálogo para editar/crear */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentItem && (currentItem as any).ID ? "Editar Metodología/Prueba" : "Nueva Metodología/Prueba"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={currentItem?.nombre || ""}
                onChange={(e) => setCurrentItem({
                  ...(currentItem || {} as MetodologiaForm),
                  nombre: e.target.value
                })}
                placeholder="Nombre de la metodología/prueba"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={currentItem?.descripcion || ""}
                onChange={(e) => setCurrentItem({
                  ...(currentItem || {} as MetodologiaForm),
                  descripcion: e.target.value
                })}
                rows={4}
                placeholder="Descripción detallada"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tipo">Tipo</Label>
              <Select
                value={currentItem?.tipo || "metodologia"}
                onValueChange={(value) => setCurrentItem({
                  ...(currentItem || {} as MetodologiaForm),
                  tipo: value as TipoMetodologiaPrueba
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metodologia">Metodología</SelectItem>
                  <SelectItem value="prueba">Prueba</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imagen">Imagen</Label>
              <Input
                id="imagen"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setCurrentItem({
                      ...(currentItem || {} as MetodologiaForm),
                      imagen: e.target.files[0]
                    });
                  }
                }}
              />
              {/* Preview de imagen */}
              {currentItem?.imagen &&
                (currentItem.imagen instanceof File ? (
                  <img
                    src={URL.createObjectURL(currentItem.imagen)}
                    alt="Preview"
                    className="h-40 object-contain rounded border"
                  />
                ) : (
                  <img
                    src={`${API_URL}/uploads/${currentItem.imagen}`}
                    alt="Preview"
                    className="h-40 object-contain rounded border"
                  />
                ))}
            </div>
            {/* Características (solo para edición) */}
            {(currentItem as any)?.ID && (
              <div className="grid gap-2">
                <Label>Características</Label>
                {/* Formulario para agregar característica */}
                <div className="flex gap-2">
                  <Input
                    value={newCaracteristica}
                    onChange={(e) => setNewCaracteristica(e.target.value)}
                    placeholder="Nueva característica"
                  />
                  <Input
                    value={newCaracteristicaDescripcion}
                    onChange={(e) => setNewCaracteristicaDescripcion(e.target.value)}
                    placeholder="Descripción de la característica"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if ((currentItem as any)?.ID && newCaracteristica) {
                        handleAddCaracteristica();
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {/* Lista de características */}
                <div className="space-y-2 mt-2">
                  {caracteristicas.map((caract) => (
                    <div
                      key={caract.ID}
                      className="flex justify-between items-center p-2 border rounded"
                    >
                      <div>
                        <span className="font-medium">{caract.caracteristica}</span>
                        {caract.descripcion && (
                          <span className="block text-xs text-muted-foreground">{caract.descripcion}</span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCaracteristica(caract.ID)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Diálogo de confirmación de eliminación */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => metodologiaPruebaToDelete && handleDeleteMetodologiaPrueba(metodologiaPruebaToDelete)}
      />
    </div>
  );
}