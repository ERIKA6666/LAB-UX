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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Edit, ImagePlus, Plus, Save, Search, Trash2 } from "lucide-react";

// Definición de tipos
type Category = "evaluacion" | "tecnologia" | "metodologia";

interface TestType {
  id: number;
  name: string;
  description: string;
  category: Category;
  image: string;
}

interface Methodology {
  id: number;
  name: string;
  description: string;
  steps: string[];
}

export default function PruebasMetodologiaPage() {
  const [testTypes, setTestTypes] = useState<TestType[]>([
    {
      id: 1,
      name: "Pruebas de Usabilidad",
      description:
        "Evaluación de la facilidad de uso de un producto mediante la observación de usuarios reales interactuando con él.",
      category: "evaluacion",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Eye Tracking",
      description:
        "Técnica que registra el movimiento ocular para determinar dónde miran los usuarios y por cuánto tiempo.",
      category: "tecnologia",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Card Sorting",
      description: "Método para ayudar a diseñar o evaluar la arquitectura de información de un sitio.",
      category: "metodologia",
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Evaluación Heurística",
      description: "Análisis de una interfaz basado en principios establecidos de usabilidad.",
      category: "evaluacion",
      image: "/placeholder.svg",
    },
  ]);

  const [methodologies, setMethodologies] = useState<Methodology[]>([
    {
      id: 1,
      name: "Metodología de Diseño Centrado en el Usuario (DCU)",
      description:
        "Enfoque de diseño que pone al usuario en el centro del proceso, considerando sus necesidades, objetivos y preferencias.",
      steps: [
        "Investigación y análisis de usuarios",
        "Definición de requisitos",
        "Diseño de soluciones",
        "Evaluación con usuarios",
        "Implementación",
      ],
    },
    {
      id: 2,
      name: "Metodología Lean UX",
      description:
        "Enfoque que combina el pensamiento Lean y los métodos ágiles para reducir el desperdicio y crear productos centrados en el usuario.",
      steps: [
        "Declaración de suposiciones",
        "Creación de MVP (Producto Mínimo Viable)",
        "Experimentación",
        "Retroalimentación y aprendizaje",
        "Iteración",
      ],
    },
  ]);

  const getCategoryBadge = (category: Category) => {
    switch (category) {
      case "evaluacion":
        return <Badge className="bg-blue-500">Evaluación</Badge>;
      case "tecnologia":
        return <Badge className="bg-purple-500">Tecnología</Badge>;
      case "metodologia":
        return <Badge className="bg-green-500">Metodología</Badge>;
      default:
        const exhaustiveCheck: never = category;
        return <Badge>General</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tipos de Pruebas y Metodología</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      <Tabs defaultValue="test-types" className="space-y-4">
        <TabsList>
          <TabsTrigger value="test-types">Tipos de Pruebas</TabsTrigger>
          <TabsTrigger value="methodologies">Metodologías</TabsTrigger>
        </TabsList>

        <TabsContent value="test-types" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar tipos de pruebas..." className="pl-8" />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Tipo de Prueba
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Añadir Nuevo Tipo de Prueba</DialogTitle>
                  <DialogDescription>Complete la información para añadir un nuevo tipo de prueba.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="test-name">Nombre</Label>
                    <Input id="test-name" placeholder="Nombre del tipo de prueba" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="test-description">Descripción</Label>
                    <Textarea id="test-description" placeholder="Descripción detallada" rows={4} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="test-category">Categoría</Label>
                    <Select>
                      <SelectTrigger id="test-category">
                        <SelectValue placeholder="Seleccione una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="evaluacion">Evaluación</SelectItem>
                        <SelectItem value="tecnologia">Tecnología</SelectItem>
                        <SelectItem value="metodologia">Metodología</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="test-image">Imagen Ilustrativa</Label>
                    <div className="flex items-center gap-2">
                      <Input id="test-image" type="file" className="hidden" />
                      <Button variant="outline" asChild>
                        <label htmlFor="test-image" className="cursor-pointer">
                          <ImagePlus className="mr-2 h-4 w-4" />
                          Seleccionar Imagen
                        </label>
                      </Button>
                      <span className="text-sm text-muted-foreground">Ningún archivo seleccionado</span>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Añadir Tipo de Prueba</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {testTypes.map((test) => (
              <Card key={test.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{test.name}</CardTitle>
                    {getCategoryBadge(test.category)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <div className="aspect-square rounded-md border overflow-hidden">
                        <img
                          src={test.image || "/placeholder.svg"}
                          alt={test.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">{test.description}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="methodologies" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar metodologías..." className="pl-8" />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva Metodología
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Añadir Nueva Metodología</DialogTitle>
                  <DialogDescription>Complete la información para añadir una nueva metodología.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="methodology-name">Nombre</Label>
                    <Input id="methodology-name" placeholder="Nombre de la metodología" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="methodology-description">Descripción</Label>
                    <Textarea id="methodology-description" placeholder="Descripción detallada" rows={4} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="methodology-steps">Pasos de la Metodología</Label>
                    <Textarea id="methodology-steps" placeholder="Paso 1&#10;Paso 2&#10;Paso 3" rows={5} />
                    <p className="text-sm text-muted-foreground">Un paso por línea</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Añadir Metodología</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {methodologies.map((methodology) => (
              <Card key={methodology.id}>
                <CardHeader>
                  <CardTitle>{methodology.name}</CardTitle>
                  <CardDescription>{methodology.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="text-sm font-medium mb-2">Pasos:</h4>
                  <ol className="list-decimal list-inside space-y-1">
                    {methodology.steps.map((step, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {step}
                      </li>
                    ))}
                  </ol>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}