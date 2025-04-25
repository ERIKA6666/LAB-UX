"use client";

import { useState } from "react";
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

// Definición de tipos
type TermCategory = "general" | "interfaces" | "estructura" | "evaluacion" | "accesibilidad";

interface Term {
  id: number;
  term: string;
  definition: string;
  category: TermCategory;
}

export default function GlosarioPage() {
  const [terms, setTerms] = useState<Term[]>([
    {
      id: 1,
      term: "Usabilidad",
      definition:
        "Medida en la que un producto puede ser usado por usuarios específicos para conseguir objetivos específicos con efectividad, eficiencia y satisfacción en un contexto de uso especificado.",
      category: "general",
    },
    {
      id: 2,
      term: "Experiencia de Usuario (UX)",
      definition:
        "Conjunto de factores y elementos relativos a la interacción del usuario con un entorno o dispositivo concretos, cuyo resultado es la generación de una percepción positiva o negativa de dicho servicio, producto o dispositivo.",
      category: "general",
    },
    {
      id: 3,
      term: "Interfaz de Usuario (UI)",
      definition:
        "Medio con que el usuario puede comunicarse con una máquina, equipo, computadora o dispositivo, y comprende todos los puntos de contacto entre el usuario y el equipo.",
      category: "interfaces",
    },
    {
      id: 4,
      term: "Arquitectura de Información",
      definition:
        "Arte y ciencia de organizar y etiquetar sitios web, intranets, comunidades en línea y software para apoyar la usabilidad y la encontrabilidad.",
      category: "estructura",
    },
    {
      id: 5,
      term: "Prueba A/B",
      definition:
        "Experimento donde dos o más variantes de una página se muestran a usuarios de manera aleatoria para determinar cuál de las dos variantes tiene mejor rendimiento.",
      category: "evaluacion",
    },
    {
      id: 6,
      term: "Mapa de Calor",
      definition:
        "Representación gráfica de datos donde los valores individuales contenidos en una matriz se representan como colores, mostrando dónde los usuarios hacen clic o hacia dónde miran en una interfaz.",
      category: "evaluacion",
    },
    {
      id: 7,
      term: "Accesibilidad Web",
      definition:
        "Práctica inclusiva de hacer sitios web utilizables por la mayor cantidad de personas posible, incluyendo aquellas con discapacidades.",
      category: "accesibilidad",
    },
    {
      id: 8,
      term: "Diseño Responsivo",
      definition:
        "Enfoque de diseño web que hace que las páginas web se vean bien en todos los dispositivos y tamaños de pantalla.",
      category: "interfaces",
    },
  ]);

  const [filter, setFilter] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const filteredTerms = terms.filter((term) => {
    const matchesFilter =
      filter === "" ||
      term.term.toLowerCase().includes(filter.toLowerCase()) ||
      term.definition.toLowerCase().includes(filter.toLowerCase());

    const matchesLetter = selectedLetter === "" || term.term.toUpperCase().startsWith(selectedLetter);

    return matchesFilter && matchesLetter;
  });

  // Group terms by first letter with proper typing
  const groupedTerms = filteredTerms.reduce<Record<string, Term[]>>((acc, term) => {
    const firstLetter = term.term.charAt(0).toUpperCase();
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
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Término
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Añadir Nuevo Término</DialogTitle>
                <DialogDescription>Complete la información para añadir un nuevo término al glosario.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="term-name">Término</Label>
                  <Input id="term-name" placeholder="Nombre del término" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="term-definition">Definición</Label>
                  <Textarea id="term-definition" placeholder="Definición del término" rows={4} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="term-category">Categoría</Label>
                  <Input id="term-category" placeholder="Categoría del término" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Añadir Término</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button>
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
                setFilter(e.target.value)
                setSelectedLetter("")
              }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          <Button
            variant={selectedLetter === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLetter("")}
          >
            Todos
          </Button>
          {alphabet.map((letter) => (
            <Button
              key={letter}
              variant={selectedLetter === letter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLetter(letter)}
              disabled={!Object.keys(groupedTerms).includes(letter)}
            >
              {letter}
            </Button>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Términos del Glosario</CardTitle>
            <CardDescription>{filteredTerms.length} términos encontrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {Object.keys(groupedTerms)
                .sort()
                .map((letter) => (
                  <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
                    <h3 className="text-2xl font-bold mb-4 border-b pb-2">{letter}</h3>
                    <div className="space-y-4">
                      {groupedTerms[letter]
                        .sort((a, b) => a.term.localeCompare(b.term))
                        .map((term) => (
                          <div key={term.id} className="border-b pb-4 last:border-0">
                            <div className="flex justify-between items-start">
                              <h4 className="text-lg font-semibold">{term.term}</h4>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-muted-foreground mt-1">{term.definition}</p>
                            <div className="mt-2">
                              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                                {term.category}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}

              {filteredTerms.length === 0 && (
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