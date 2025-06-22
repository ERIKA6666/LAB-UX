"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { Edit, Plus, Save, Search, Trash2 } from "lucide-react";
import { fetchTerminos, addTermino, updateTermino, deleteTermino, fetchTerminosByLetra } from "@/services";
import { useToast } from "@/components/hooks/use-toast";
import { Glosario } from "@/types/glosario";
import {terminos} from "@/constans/data"

export default function GlosarioPage() {
  const { toast } = useToast();
  const [terms, setTerms] = useState<Glosario[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTerm, setEditingTerm] = useState<Glosario | null>(null);
  const [formData, setFormData] = useState({
    termino: "",
    descripcion: "",
  });

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Cargar términos iniciales
  useEffect(() => {
    loadTerms();
  }, );

  // Cargar términos por letra cuando cambia la selección
  useEffect(() => {
    if (selectedLetter) {
      loadTermsByLetter(selectedLetter);
    } else if (selectedLetter === "" && filter === "") {
      loadTerms();
    }
  }, [selectedLetter]);

  const loadTerms = async () => {
    setLoading(true);
    try {
      const data = await fetchTerminos(filter);
      setTerms(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los términos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadTermsByLetter = async (letter: string) => {
    setLoading(true);
    try {
      const data = await fetchTerminosByLetra(letter);
      setTerms(data);
    } catch (error) {
      toast({
        title: "Error",
        description: `No se pudieron cargar términos con la letra ${letter}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    await loadTerms();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTerm) {
        await updateTermino(editingTerm.ID, formData);
        toast({ title: "Término actualizado correctamente" });
      } else {
        await addTermino(formData);
        toast({ title: "Término añadido correctamente" });
      }
      setIsDialogOpen(false);
      setEditingTerm(null);
      setFormData({ termino: "", descripcion: "" });
      loadTerms();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTermino(id);
      toast({ title: "Término eliminado correctamente" });
      loadTerms();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el término",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (term: Glosario) => {
    setEditingTerm(term);
    setFormData({
      termino: term.termino,
      descripcion: term.descripcion,
    });
    setIsDialogOpen(true);
  };

  const groupedTerms = terms.reduce<Record<string, Glosario[]>>((acc, term) => {
    const firstLetter = term.termino.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {});

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Glosario de Usabilidad</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingTerm(null); setFormData({ termino: "", descripcion: "" }); }}>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Término
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {editingTerm ? "Editar Término" : "Añadir Nuevo Término"}
                </DialogTitle>
                <DialogDescription>
                  {editingTerm ? "Modifique la información del término" : "Complete la información para añadir un nuevo término al glosario."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="termino">Término</Label>
                    <Input
                      id="termino"
                      name="termino"
                      placeholder="Nombre del término"
                      value={formData.termino}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="descripcion">Definición</Label>
                    <Textarea
                      id="descripcion"
                      name="descripcion"
                      placeholder="Definición del término"
                      rows={4}
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {editingTerm ? "Actualizar Término" : "Añadir Término"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button onClick={handleSearch}>
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar términos..."
              className="pl-8"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setSelectedLetter("");
              }}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>

        <div className="flex flex-wrap gap-1">
          <Button
            variant={selectedLetter === "" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setSelectedLetter("");
              loadTerms();
            }}
          >
            Todos
          </Button>
          {alphabet.map((letter) => (
            <Button
              key={letter}
              variant={selectedLetter === letter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLetter(letter)}
              disabled={loading}
            >
              {letter}
            </Button>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Términos del Glosario</CardTitle>
            <CardDescription>
              {loading ? "Cargando..." : `${terms.length} término${terms.length !== 1 ? 's' : ''} encontrado${terms.length !== 1 ? 's' : ''}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <p className="text-muted-foreground">Cargando términos...</p>
                </div>
              ) : Object.keys(groupedTerms).length > 0 ? (
                Object.keys(groupedTerms)
                  .sort()
                  .map((letter) => (
                    <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
                      <h3 className="text-2xl font-bold mb-4 border-b pb-2">{letter}</h3>
                      <div className="space-y-4">
                        {groupedTerms[letter]
                          .sort((a, b) => a.termino.localeCompare(b.termino))
                          .map((term) => (
                            <div key={term.ID} className="border-b pb-4 last:border-0">
                              <div className="flex justify-between items-start">
                                <h4 className="text-lg font-semibold">{term.termino}</h4>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => openEditDialog(term)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleDelete(term.ID)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-muted-foreground mt-1">{term.descripcion}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No se encontraron términos que coincidan con la búsqueda.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}