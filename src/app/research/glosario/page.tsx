import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"

export default function GlosarioPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Glosario de Usabilidad</h1>
          <p className="text-muted-foreground max-w-2xl">
            Consulta nuestro glosario de términos relacionados con la usabilidad y experiencia de usuario.
          </p>
        </div>

        <div className="grid gap-4">
          {glosario.map((termino, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{termino.termino}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{termino.definicion}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// Datos de ejemplo
const glosario = [
  {
    termino: "Accesibilidad",
    definicion:
      "Grado en que un producto, dispositivo, servicio o entorno está disponible para todos los usuarios, independientemente de sus capacidades o limitaciones.",
  },
  {
    termino: "Arquitectura de Información",
    definicion:
      "Estructura y organización de contenidos en un sitio web o aplicación para facilitar la navegación y comprensión por parte del usuario.",
  },
  {
    termino: "Affordance",
    definicion:
      "Cualidad de un objeto o entorno que permite a un individuo realizar una acción. En diseño, se refiere a cómo los elementos comunican su función.",
  },
  {
    termino: "Consistencia",
    definicion:
      "Principio de diseño que busca mantener patrones similares en elementos, comportamientos y estilos a lo largo de una interfaz para facilitar el aprendizaje y uso.",
  },
  {
    termino: "Diseño Responsivo",
    definicion:
      "Enfoque de diseño que busca que las páginas web se adapten al tamaño de pantalla y dispositivo en que se visualizan.",
  },
  {
    termino: "Experiencia de Usuario (UX)",
    definicion:
      "Conjunto de factores y elementos relativos a la interacción del usuario con un entorno o dispositivo, generando una percepción positiva o negativa.",
  },
  {
    termino: "Interfaz de Usuario (UI)",
    definicion:
      "Medio con que el usuario puede comunicarse con una máquina, equipo o computadora, y comprende todos los puntos de contacto entre el usuario y el equipo.",
  },
  {
    termino: "Mapa de Calor (Heatmap)",
    definicion:
      "Representación gráfica de datos donde los valores individuales están representados por colores, mostrando áreas de mayor interacción o atención.",
  },
  {
    termino: "Navegabilidad",
    definicion:
      "Facilidad con que un usuario puede desplazarse por todas las páginas que componen un sitio web y ubicarse dentro de él.",
  },
  {
    termino: "Persona",
    definicion:
      "Representación ficticia de un usuario ideal basada en datos reales y comportamientos observados, utilizada como guía en el proceso de diseño.",
  },
  {
    termino: "Prototipo",
    definicion:
      "Modelo preliminar de un producto que permite probar conceptos y procesos antes de invertir en el desarrollo completo.",
  },
  {
    termino: "Test A/B",
    definicion:
      "Método de comparación donde dos versiones de una página o elemento se muestran a diferentes usuarios para determinar cuál tiene mejor rendimiento.",
  },
]

