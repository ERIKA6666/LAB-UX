import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"

export default function MetodologiasPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Metodologías y Tipos de Pruebas</h1>
          <p className="text-muted-foreground max-w-2xl">
            Conoce las metodologías y tipos de pruebas que utilizamos en nuestros procesos de investigación.
          </p>
        </div>

        {/* Sección de Tipos de Pruebas */}
        <section className="space-y-8 mb-12">
          <h2 className="text-2xl font-semibold border-b pb-2">Tipos de Pruebas</h2>

          {tiposPruebas.map((tipo, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
              <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                <h3 className="text-xl font-medium mb-3">{tipo.nombre}</h3>
                <p className="text-muted-foreground mb-4">{tipo.descripcion}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {tipo.caracteristicas.map((caracteristica, i) => (
                    <li key={i} className="text-sm">
                      {caracteristica}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`relative aspect-video rounded-lg overflow-hidden ${index % 2 === 1 ? "md:order-1" : ""}`}
              >
                <Image src={tipo.imagen || "/placeholder.svg"} alt={tipo.nombre} fill className="object-cover" />
              </div>
            </div>
          ))}
        </section>

        {/* Sección de Metodologías estilo Pinterest */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b pb-2">Metodologías de Investigación</h2>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {metodologias.map((metodologia, index) => {
              // Determinar altura aleatoria para efecto Pinterest
              const heightClass =
                index % 3 === 0
                  ? "h-auto aspect-[4/5]"
                  : index % 3 === 1
                    ? "h-auto aspect-[4/6]"
                    : "h-auto aspect-[4/4]"

              return (
                <Card key={index} className={`${heightClass} break-inside-avoid mb-6 overflow-hidden`}>
                  <CardHeader className="bg-gradient-to-br from-slate-50 to-slate-100">
                    <CardTitle>{metodologia.nombre}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-4">{metodologia.descripcion}</p>
                    <h4 className="font-medium mb-2 text-sm">Aplicaciones:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {metodologia.aplicaciones.map((aplicacion, i) => (
                        <li key={i} className="text-xs">
                          {aplicacion}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

// Datos de ejemplo - Tipos de Pruebas
const tiposPruebas = [
  {
    nombre: "Pruebas de Usabilidad en Laboratorio",
    descripcion:
      "Las pruebas de usabilidad en laboratorio son evaluaciones controladas donde los usuarios realizan tareas específicas mientras los investigadores observan y registran su comportamiento.",
    caracteristicas: [
      "Entorno controlado para minimizar distracciones",
      "Equipamiento especializado como eye-trackers",
      "Posibilidad de grabar sesiones para análisis posterior",
      "Moderador presente para guiar la sesión",
    ],
    imagen: "/placeholder.svg?height=300&width=600",
  },
  {
    nombre: "Pruebas Remotas No Moderadas",
    descripcion:
      "Las pruebas remotas no moderadas permiten a los usuarios completar tareas en su propio entorno sin la presencia de un moderador, lo que proporciona resultados más naturales.",
    caracteristicas: [
      "Mayor alcance geográfico de participantes",
      "Costos reducidos de implementación",
      "Entorno natural del usuario",
      "Posibilidad de realizar pruebas asincrónicas",
    ],
    imagen: "/placeholder.svg?height=300&width=600",
  },
  {
    nombre: "Pruebas A/B",
    descripcion:
      "Las pruebas A/B comparan dos versiones de una página o elemento para determinar cuál tiene mejor rendimiento en términos de conversión u otros objetivos.",
    caracteristicas: [
      "Basadas en datos cuantitativos",
      "Ideal para optimizar elementos específicos",
      "Requiere tráfico suficiente para obtener resultados estadísticamente significativos",
      "Permite iteraciones rápidas basadas en resultados",
    ],
    imagen: "/placeholder.svg?height=300&width=600",
  },
  {
    nombre: "Evaluación Heurística",
    descripcion:
      "La evaluación heurística es un método donde expertos en usabilidad evalúan una interfaz según principios establecidos para identificar problemas potenciales.",
    caracteristicas: [
      "No requiere participación de usuarios finales",
      "Rápida implementación y resultados",
      "Basada en principios y mejores prácticas establecidas",
      "Complementa bien otras metodologías de prueba",
    ],
    imagen: "/placeholder.svg?height=300&width=600",
  },
]

// Datos de ejemplo - Metodologías
const metodologias = [
  {
    nombre: "Investigación Cualitativa",
    descripcion:
      "Enfoque que busca comprender en profundidad las experiencias, comportamientos y percepciones de los usuarios a través de métodos como entrevistas, grupos focales y observación.",
    aplicaciones: [
      "Entrevistas a usuarios",
      "Grupos focales",
      "Estudios observacionales",
      "Análisis de diarios de usuario",
    ],
  },
  {
    nombre: "Investigación Cuantitativa",
    descripcion:
      "Metodología basada en la recolección y análisis de datos numéricos para identificar patrones, tendencias y correlaciones en el comportamiento del usuario.",
    aplicaciones: [
      "Encuestas a gran escala",
      "Análisis de métricas de uso",
      "Tests A/B",
      "Análisis estadístico de comportamiento",
    ],
  },
  {
    nombre: "Diseño Centrado en el Usuario (DCU)",
    descripcion:
      "Proceso iterativo que coloca al usuario final en el centro de cada etapa del diseño, desde la conceptualización hasta la implementación.",
    aplicaciones: [
      "Creación de personas y escenarios",
      "Prototipado iterativo",
      "Evaluación continua con usuarios reales",
      "Diseño participativo",
    ],
  },
  {
    nombre: "Design Thinking",
    descripcion:
      "Enfoque de resolución de problemas centrado en el humano que integra las necesidades de las personas, las posibilidades tecnológicas y los requisitos para el éxito empresarial.",
    aplicaciones: [
      "Talleres de ideación",
      "Prototipado rápido",
      "Empatía con el usuario",
      "Definición de problemas complejos",
    ],
  },
  {
    nombre: "Lean UX",
    descripcion:
      "Metodología que aplica principios de Lean Startup al diseño de experiencia de usuario, enfocándose en ciclos rápidos de aprendizaje y validación.",
    aplicaciones: [
      "Creación de MVP (Producto Mínimo Viable)",
      "Validación temprana de conceptos",
      "Iteraciones rápidas basadas en feedback",
      "Reducción de documentación innecesaria",
    ],
  },
  {
    nombre: "Investigación Contextual",
    descripcion:
      "Método de investigación cualitativa que estudia a los usuarios en su entorno natural mientras realizan tareas reales.",
    aplicaciones: [
      "Observación en el contexto de uso",
      "Entrevistas en el lugar de trabajo",
      "Análisis de flujos de trabajo reales",
      "Identificación de necesidades no articuladas",
    ],
  },
  {
    nombre: "Análisis Competitivo",
    descripcion:
      "Evaluación sistemática de productos o servicios competidores para identificar fortalezas, debilidades y oportunidades de diferenciación.",
    aplicaciones: [
      "Benchmarking de características",
      "Análisis de experiencia de usuario de competidores",
      "Identificación de brechas en el mercado",
      "Inspiración para innovación",
    ],
  },
]

