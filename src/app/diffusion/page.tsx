import { CalendarIcon, ClockIcon, MapPinIcon, ArrowRightIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@radix-ui/react-dropdown-menu"
import Image from "next/image"
import Link from "next/link"

export default function DifusionPage() {
  return (
    
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        
        <div className="container mx-auto py-12 px-4">
        <section id="team" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="px-4 py-1 text-sm">
                  Difusión
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Explora lo que está sucediendo en Lab-UX</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Un equipo diverso y apasionado de profesionales, educadores y estudiantes comprometidos con la
                  excelencia.
                </p>
              </div>
            </div>
          </div>
        </section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Columna izquierda (más grande) - Noticias y Eventos */}
          <div className="lg:col-span-2 space-y-16">
            {/* Sección de Noticias */}
            <section>
              <h2 className="text-3xl font-bold mb-8">Noticias Destacadas</h2>
              <div className="space-y-12">
                {noticias.map((noticia, index) => (
                  <div key={noticia.id} className="group">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      <div className="relative aspect-video overflow-hidden rounded-lg">
                        <Image
                          src={noticia.imagen || "/placeholder.svg"}
                          alt={noticia.titulo}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-sm text-muted-foreground mb-2">{noticia.fecha}</div>
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {noticia.titulo}
                        </h3>
                        <p className="text-muted-foreground mb-4">{noticia.descripcion}</p>
                        <div className="mt-auto">
                          <Link
                            href={`/noticias/${noticia.id}`}
                            className="inline-flex items-center text-primary font-medium hover:underline"
                          >
                            Leer más <ArrowRightIcon className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    {index < noticias.length - 1 && <Separator className="mt-12" />}
                  </div>
                ))}
              </div>
            </section>

            {/* Sección de Eventos */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Eventos Recientes</h2>
              <div className="grid grid-cols-1 gap-4">
                {eventos.map((evento) => (
                  <Link key={evento.id} href={`/eventos/${evento.id}`} className="block group">
                    <div className="flex items-center p-4 rounded-lg border border-border hover:bg-accent transition-colors">
                      <div className="mr-4 flex-shrink-0 w-16 h-16 bg-primary/10 rounded-md flex items-center justify-center">
                        <CalendarIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {evento.categoria}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{evento.fecha}</span>
                        </div>
                        <h3 className="font-medium group-hover:text-primary transition-colors">{evento.titulo}</h3>
                      </div>
                      <ArrowRightIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" asChild>
                  <Link href="/eventos">Ver todos los eventos</Link>
                </Button>
              </div>
            </section>
          </div>
        {/* Columna derecha (más pequeña) - Eventos Próximos */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 bg-muted/30 rounded-xl p-6 border border-border">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="bg-primary text-primary-foreground p-1.5 rounded-md mr-3">
                <CalendarIcon className="h-5 w-5" />
              </span>
              Próximos Eventos
            </h2>
            <div className="space-y-6">
              {proximosEventos.map((evento) => (
                <div key={evento.id} className="group">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-14 h-14 bg-background rounded-md border border-border flex flex-col items-center justify-center">
                      <span className="text-lg font-bold leading-none">{evento.dia}</span>
                      <span className="text-xs uppercase text-muted-foreground">{evento.mes}</span>
                    </div>
                    <div>
                      <Badge className="mb-1.5">{evento.categoria}</Badge>
                      <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                        <Link href={`/eventos/${evento.id}`}>{evento.titulo}</Link>
                      </h3>
                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <ClockIcon className="mr-1.5 h-3 w-3" />
                          {evento.fecha}
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="mr-1.5 h-3 w-3" />
                          {evento.ubicacion}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button className="w-full" asChild>
                <Link href="/calendario">Ver calendario completo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
        </div>
      </main>
    </div>
  )
}

// Datos de ejemplo
const eventos = [
  {
    id: 1,
    titulo: "Conferencia de Innovación Tecnológica",
    descripcion:
      "Únete a nosotros para descubrir las últimas tendencias en innovación tecnológica y cómo están transformando nuestra sociedad.",
    fecha: "15 Mar 2024",
    categoria: "Tecnología",
    imagen: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 2,
    titulo: "Taller de Desarrollo Sostenible",
    descripcion:
      "Aprende sobre prácticas sostenibles y cómo implementarlas en tu comunidad para crear un futuro más verde.",
    fecha: "22 Mar 2024",
    categoria: "Medio Ambiente",
    imagen: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 3,
    titulo: "Exposición de Arte Digital",
    descripcion:
      "Explora las intersecciones entre arte y tecnología en nuestra exposición de arte digital con artistas locales e internacionales.",
    fecha: "10 Mar 2024",
    categoria: "Arte",
    imagen: "/placeholder.svg?height=300&width=500",
  },
]

const noticias = [
  {
    id: 1,
    titulo: "Nueva alianza estratégica con empresas tecnológicas",
    descripcion:
      "Hemos establecido una nueva alianza con importantes empresas tecnológicas para impulsar la innovación en nuestra comunidad. Esta colaboración permitirá desarrollar nuevos proyectos y oportunidades para todos nuestros miembros.",
    fecha: "28 Mar 2024",
    imagen: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 2,
    titulo: "Resultados del programa de becas 2024",
    descripcion:
      "Nos complace anunciar los resultados de nuestro programa de becas para el año 2024. Este año, hemos otorgado más de 50 becas a estudiantes destacados en diversas disciplinas académicas.",
    fecha: "25 Mar 2024",
    imagen: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 3,
    titulo: "Inauguración de nuevo centro comunitario",
    descripcion:
      "El próximo mes inauguraremos un nuevo centro comunitario que ofrecerá diversos servicios y actividades para todos los miembros de nuestra comunidad, desde talleres educativos hasta eventos culturales.",
    fecha: "20 Mar 2024",
    imagen: "/placeholder.svg?height=300&width=500",
  },
]

const proximosEventos = [
  {
    id: 1,
    titulo: "Foro Internacional de Educación",
    descripcion: "Un espacio para dialogar sobre los desafíos y oportunidades en la educación contemporánea.",
    fecha: "10 Abr 2024",
    dia: "10",
    mes: "Abr",
    categoria: "Educación",
    ubicacion: "Centro de Convenciones",
  },
  {
    id: 2,
    titulo: "Hackathon por la Inclusión Digital",
    descripcion: "48 horas de innovación y desarrollo de soluciones tecnológicas.",
    fecha: "15 Abr 2024",
    dia: "15",
    mes: "Abr",
    categoria: "Tecnología",
    ubicacion: "Campus Tecnológico",
  },
  {
    id: 3,
    titulo: "Seminario de Liderazgo",
    descripcion: "Desarrolla habilidades de liderazgo efectivo y gestión del cambio.",
    fecha: "22 Abr 2024",
    dia: "22",
    mes: "Abr",
    categoria: "Desarrollo",
    ubicacion: "Auditorio Principal",
  },
  {
    id: 4,
    titulo: "Concierto Benéfico",
    descripcion: "Música en vivo para recaudar fondos para proyectos comunitarios.",
    fecha: "28 Abr 2024",
    dia: "28",
    mes: "Abr",
    categoria: "Cultura",
    ubicacion: "Teatro Municipal",
  },
  {
    id: 5,
    titulo: "Feria de Emprendimiento",
    descripcion: "Exposición de proyectos innovadores y oportunidades de networking.",
    fecha: "5 May 2024",
    dia: "5",
    mes: "May",
    categoria: "Negocios",
    ubicacion: "Parque de Innovación",
  },
]
