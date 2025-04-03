import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function ProyectosPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link href="/investigacion" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Volver a Investigación
            </Link>
          </Button>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Proyectos de Investigación</h1>
          <p className="text-muted-foreground max-w-2xl">
            Descubre nuestros proyectos de investigación en el campo de la usabilidad y experiencia de usuario.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {proyectos.map((proyecto, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={proyecto.imagen || "/placeholder.svg"}
                  alt={proyecto.titulo}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{proyecto.titulo}</CardTitle>
                <CardDescription>{proyecto.descripcionCorta}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{proyecto.descripcion}</p>
                <div className="flex flex-wrap gap-2">
                  {proyecto.etiquetas.map((etiqueta, i) => (
                    <Badge key={i} variant="secondary">
                      {etiqueta}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// Datos de ejemplo
const proyectos = [
  {
    titulo: "Análisis de Experiencia de Usuario en Aplicaciones Móviles",
    descripcionCorta: "Estudio de patrones de interacción",
    descripcion:
      "Investigación sobre cómo los usuarios interactúan con diferentes interfaces móviles y qué elementos mejoran la experiencia general.",
    etiquetas: ["UX", "Móvil", "Interacción"],
    imagen: "/placeholder.svg?height=200&width=400",
  },
  {
    titulo: "Optimización de Interfaces para Accesibilidad",
    descripcionCorta: "Mejorando la accesibilidad web",
    descripcion:
      "Proyecto enfocado en desarrollar guías y prácticas para crear interfaces web accesibles para personas con diferentes capacidades.",
    etiquetas: ["Accesibilidad", "Inclusión", "Diseño"],
    imagen: "/placeholder.svg?height=200&width=400",
  },
  {
    titulo: "Patrones de Navegaci��n en Comercio Electrónico",
    descripcionCorta: "Análisis de comportamiento de compra",
    descripcion:
      "Estudio sobre cómo los usuarios navegan por sitios de comercio electrónico y qué factores influyen en las decisiones de compra.",
    etiquetas: ["E-commerce", "Navegación", "Conversión"],
    imagen: "/placeholder.svg?height=200&width=400",
  },
  {
    titulo: "Diseño Centrado en el Usuario para Aplicaciones Educativas",
    descripcionCorta: "Mejorando experiencias de aprendizaje",
    descripcion:
      "Investigación sobre cómo optimizar interfaces educativas para mejorar la retención de información y la experiencia de aprendizaje.",
    etiquetas: ["Educación", "Aprendizaje", "DCU"],
    imagen: "/placeholder.svg?height=200&width=400",
  },
  {
    titulo: "Evaluación Heurística de Plataformas Gubernamentales",
    descripcionCorta: "Mejorando servicios públicos digitales",
    descripcion:
      "Análisis de usabilidad de plataformas de gobierno digital para identificar problemas y proponer mejoras.",
    etiquetas: ["Gobierno Digital", "Evaluación", "Servicios Públicos"],
    imagen: "/placeholder.svg?height=200&width=400",
  },
  {
    titulo: "Impacto del Diseño Minimalista en la Usabilidad",
    descripcionCorta: "Análisis de tendencias de diseño",
    descripcion:
      "Estudio sobre cómo las tendencias de diseño minimalista afectan la usabilidad y la percepción del usuario.",
    etiquetas: ["Minimalismo", "Tendencias", "Percepción"],
    imagen: "/placeholder.svg?height=200&width=400",
  },
]

