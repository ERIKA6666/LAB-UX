"use client";

import { useEffect, useState } from "react";
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Edit, Plus, Save, Search, Trash2 } from "lucide-react";
import { PreguntaFrecuente } from "@/types/preguntaFrecuente";
import {
  fetchPreguntasFrecuentes,
  addPreguntaFrecuente,
  updatePreguntaFrecuente,
  deletePreguntaFrecuente,
} from "@/services/preguntafrecuente";
import { useToast } from "@/components/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster"

function getMySQLDateTimeString(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export default function FAQPage() {
  const { toast } = useToast();

  const [faqs, setFaqs] = useState<PreguntaFrecuente[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  // Estado para agregar
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newPregunta, setNewPregunta] = useState({
    pregunta: "",
    respuesta: "",
    orden: 1,
  });

  // Estado para editar
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editPregunta, setEditPregunta] = useState<PreguntaFrecuente | null>(null);

  // Estado para eliminar
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [preguntaToDelete, setPreguntaToDelete] = useState<PreguntaFrecuente | null>(null);

  // Cargar preguntas frecuentes
  const loadFaqs = async () => {
    setLoading(true);
    try {
      const data = await fetchPreguntasFrecuentes();
      setFaqs(data.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0)));
    } catch (e) {
      toast({ title: "Error", description: "Error al cargar preguntas frecuentes", variant: "destructive" });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  // Filtrado
  const filteredFaqs = faqs.filter((faq) => {
    return (
      filter === "" ||
      faq.pregunta.toLowerCase().includes(filter.toLowerCase()) ||
      faq.respuesta.toLowerCase().includes(filter.toLowerCase())
    );
  });

  // Agregar pregunta
  const handleAddPregunta = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const now = new Date();
      await addPreguntaFrecuente({
        pregunta: newPregunta.pregunta,
        respuesta: newPregunta.respuesta,
        orden: Number(newPregunta.orden),
        fecha_creacion: getMySQLDateTimeString(now),
        fecha_actualizacion: getMySQLDateTimeString(now),
      } as any);
      setAddDialogOpen(false);
      setNewPregunta({ pregunta: "", respuesta: "", orden: 1 });
      await loadFaqs();
      toast({ title: "Pregunta agregada", description: "La pregunta fue agregada correctamente.", variant: "success" });
    } catch (e) {
      toast({ title: "Error", description: "Error al agregar pregunta", variant: "destructive" });
    }
  };

  // Editar pregunta
  const handleEditPregunta = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPregunta) return;
    try {
      const now = new Date();
      await updatePreguntaFrecuente(editPregunta.ID, {
        pregunta: editPregunta.pregunta,
        respuesta: editPregunta.respuesta,
        orden: Number(editPregunta.orden),
        fecha_actualizacion: getMySQLDateTimeString(now),
      });
      setEditDialogOpen(false);
      setEditPregunta(null);
      await loadFaqs();
      toast({ title: "Pregunta actualizada", description: "La pregunta fue actualizada correctamente.", variant: "success" });
    } catch (e) {
      toast({ title: "Error", description: "Error al actualizar pregunta", variant: "destructive" });
    }
  };

  // Eliminar pregunta
  const handleDeletePregunta = async () => {
    if (!preguntaToDelete) return;
    try {
      await deletePreguntaFrecuente(preguntaToDelete.ID);
      setDeleteDialogOpen(false);
      setPreguntaToDelete(null);
      await loadFaqs();
      toast({ title: "Pregunta eliminada", description: "La pregunta fue eliminada correctamente.", variant: "success" });
    } catch (e) {
      toast({ title: "Error", description: "Error al eliminar pregunta", variant: "destructive" });
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Preguntas Frecuentes</h2>
        <div className="flex items-center space-x-2">
          {/* Modal Agregar */}
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nueva Pregunta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Añadir Nueva Pregunta Frecuente</DialogTitle>
                <DialogDescription>Complete la información para añadir una nueva pregunta al FAQ.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddPregunta} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="faq-question">Pregunta</Label>
                  <Input
                    id="faq-question"
                    placeholder="Escriba la pregunta"
                    value={newPregunta.pregunta}
                    onChange={e => setNewPregunta({ ...newPregunta, pregunta: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="faq-answer">Respuesta</Label>
                  <Textarea
                    id="faq-answer"
                    placeholder="Escriba la respuesta"
                    rows={5}
                    value={newPregunta.respuesta}
                    onChange={e => setNewPregunta({ ...newPregunta, respuesta: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="faq-orden">Orden</Label>
                  <Input
                    id="faq-orden"
                    type="number"
                    min={1}
                    value={newPregunta.orden}
                    onChange={e => setNewPregunta({ ...newPregunta, orden: Number(e.target.value) })}
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Añadir Pregunta
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
            placeholder="Buscar preguntas..."
            className="pl-8"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preguntas Frecuentes</CardTitle>
          <CardDescription>{filteredFaqs.length} preguntas encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq) => (
                <AccordionItem key={faq.ID} value={`faq-${faq.ID}`}>
                  <div className="flex items-center">
                    <AccordionTrigger className="flex-1 text-left">{faq.pregunta}</AccordionTrigger>
                    <div className="flex space-x-1 mr-4">
                      {/* Botón Editar */}
                      <Dialog open={editDialogOpen && editPregunta?.ID === faq.ID} onOpenChange={open => {
                        setEditDialogOpen(open);
                        if (!open) setEditPregunta(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setEditPregunta(faq)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Editar Pregunta Frecuente</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleEditPregunta} className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit-faq-question">Pregunta</Label>
                              <Input
                                id="edit-faq-question"
                                value={editPregunta?.pregunta || ""}
                                onChange={e => setEditPregunta(editPregunta ? { ...editPregunta, pregunta: e.target.value } : null)}
                                required
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-faq-answer">Respuesta</Label>
                              <Textarea
                                id="edit-faq-answer"
                                value={editPregunta?.respuesta || ""}
                                onChange={e => setEditPregunta(editPregunta ? { ...editPregunta, respuesta: e.target.value } : null)}
                                required
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-faq-orden">Orden</Label>
                              <Input
                                id="edit-faq-orden"
                                type="number"
                                min={1}
                                value={editPregunta?.orden || 1}
                                onChange={e => setEditPregunta(editPregunta ? { ...editPregunta, orden: Number(e.target.value) } : null)}
                                required
                              />
                            </div>
                            <DialogFooter>
                              <Button type="submit">
                                <Save className="mr-2 h-4 w-4" />
                                Guardar Cambios
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      {/* Botón Eliminar */}
                      <Dialog open={deleteDialogOpen && preguntaToDelete?.ID === faq.ID} onOpenChange={open => {
                        setDeleteDialogOpen(open);
                        if (!open) setPreguntaToDelete(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setPreguntaToDelete(faq)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>¿Eliminar pregunta?</DialogTitle>
                            <DialogDescription>
                              ¿Estás seguro de que deseas eliminar esta pregunta frecuente?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setDeleteDialogOpen(false);
                                setPreguntaToDelete(null);
                              }}
                            >
                              Cancelar
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={handleDeletePregunta}
                            >
                              Eliminar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.respuesta}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No se encontraron preguntas que coincidan con la búsqueda.</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Toaster />
    </div>
    
  );
}

