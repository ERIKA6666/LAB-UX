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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Edit, Plus, Save, Search, Trash2 } from "lucide-react";

type FAQCategory = "general" | "participacion" | "metodologia" | "colaboracion";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: FAQCategory;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: 1,
      question: "¿Qué es la usabilidad?",
      answer:
        "La usabilidad es la medida en la que un producto puede ser usado por usuarios específicos para conseguir objetivos específicos con efectividad, eficiencia y satisfacción en un contexto de uso especificado.",
      category: "general",
    },
    {
      id: 2,
      question: "¿Cómo puedo participar en un estudio de usabilidad?",
      answer:
        "Para participar en un estudio de usabilidad, puede registrarse en nuestra base de datos de participantes a través del formulario disponible en la sección 'Participar'. Nos pondremos en contacto con usted cuando haya un estudio que coincida con su perfil.",
      category: "participacion",
    },
    {
      id: 3,
      question: "¿Qué tipos de pruebas de usabilidad realizan?",
      answer:
        "Realizamos diversos tipos de pruebas, incluyendo pruebas de usabilidad moderadas, evaluaciones heurísticas, card sorting, eye tracking, pruebas A/B, entre otras. El tipo de prueba depende de los objetivos específicos de cada investigación.",
      category: "metodologia",
    },
    {
      id: 4,
      question: "¿Cuánto tiempo dura una sesión de prueba de usabilidad?",
      answer:
        "La duración típica de una sesión de prueba de usabilidad es de 45 a 60 minutos, aunque puede variar dependiendo del tipo de prueba y los objetivos de la investigación.",
      category: "participacion",
    },
    {
      id: 5,
      question: "¿Ofrecen algún tipo de compensación por participar en los estudios?",
      answer:
        "Sí, generalmente ofrecemos una compensación a los participantes en forma de tarjetas regalo o incentivos similares. La cantidad varía según el tipo y duración del estudio.",
      category: "participacion",
    },
    {
      id: 6,
      question: "¿Cómo puedo solicitar una colaboración con el laboratorio?",
      answer:
        "Para solicitar una colaboración, puede contactarnos a través del formulario en la sección 'Contacto' o enviarnos un correo electrónico a colaboraciones@laboratorio-usabilidad.edu con los detalles de su propuesta.",
      category: "colaboracion",
    },
    {
      id: 7,
      question: "¿Qué medidas de confidencialidad aplican en sus estudios?",
      answer:
        "Todos nuestros estudios siguen estrictos protocolos de confidencialidad. Los datos recogidos se anonimizan y solo se utilizan con fines de investigación. Todos los participantes firman un acuerdo de confidencialidad antes de participar.",
      category: "general",
    },
  ])


  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<FAQCategory | "todas">("todas");

  const filteredFaqs = faqs.filter((faq) => {
    const matchesText =
      filter === "" ||
      faq.question.toLowerCase().includes(filter.toLowerCase()) ||
      faq.answer.toLowerCase().includes(filter.toLowerCase());

    const matchesCategory = categoryFilter === "todas" || faq.category === categoryFilter;

    return matchesText && matchesCategory;
  });

  // Función para obtener el nombre legible de la categoría
  const getCategoryName = (category: FAQCategory): string => {
    switch (category) {
      case "general":
        return "Información General";
      case "participacion":
        return "Participación en Estudios";
      case "metodologia":
        return "Metodología";
      case "colaboracion":
        return "Colaboraciones";
      default:
        return category; // Nunca debería llegar aquí
    }
  };

  // Agrupar FAQs por categoría (con tipo explícito)
  const groupedFaqs = filteredFaqs.reduce<Record<FAQCategory, FAQ[]>>(
    (acc, faq) => {
      const category = faq.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(faq);
      return acc;
    },
    {} as Record<FAQCategory, FAQ[]>
  );


  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Preguntas Frecuentes</h2>
        <div className="flex items-center space-x-2">
          <Dialog>
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
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="faq-question">Pregunta</Label>
                  <Input id="faq-question" placeholder="Escriba la pregunta" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="faq-answer">Respuesta</Label>
                  <Textarea id="faq-answer" placeholder="Escriba la respuesta" rows={5} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="faq-category">Categoría</Label>
                  <Select>
                    <SelectTrigger id="faq-category">
                      <SelectValue placeholder="Seleccione una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Información General</SelectItem>
                      <SelectItem value="participacion">Participación en Estudios</SelectItem>
                      <SelectItem value="metodologia">Metodología</SelectItem>
                      <SelectItem value="colaboracion">Colaboraciones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Añadir Pregunta</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
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
        <Select 
            value={categoryFilter} 
            onValueChange={(value) => setCategoryFilter(value as FAQCategory | "todas")}
          >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las categorías</SelectItem>
            <SelectItem value="general">Información General</SelectItem>
            <SelectItem value="participacion">Participación en Estudios</SelectItem>
            <SelectItem value="metodologia">Metodología</SelectItem>
            <SelectItem value="colaboracion">Colaboraciones</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preguntas Frecuentes</CardTitle>
          <CardDescription>{filteredFaqs.length} preguntas encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(groupedFaqs).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(groupedFaqs).map(([category, faqs]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold mb-2">{category}</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq) => (
                      <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                        <div className="flex items-center">
                          <AccordionTrigger className="flex-1 text-left">{faq.question}</AccordionTrigger>
                          <div className="flex space-x-1 mr-4">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No se encontraron preguntas que coincidan con la búsqueda.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vista Previa</CardTitle>
          <CardDescription>Así se verá la sección de FAQ en el sitio web</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-6">
            <h3 className="text-2xl font-bold mb-6">Preguntas Frecuentes</h3>
            <div className="space-y-6">
              {Object.entries(groupedFaqs).map(([category, faqs]) => (
                <div key={category}>
                  <h4 className="text-xl font-semibold mb-4">
                    {getCategoryName(category as FAQCategory)}
                  </h4>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq) => (
                      <AccordionItem key={faq.id} value={`preview-${faq.id}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

