"use client"

import { useState } from "react"
import { CalendarIcon, ClockIcon, MapPinIcon, ArrowRightIcon, XIcon, UserIcon, TagIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import Image from "next/image"
export interface ContenidoDifusion {
  id: number;
  titulo: string;
  descripcion: string;
  
  // Campos para descripción extendida (ambas variantes)
  descripcionCompleta?: string;
  contenidoCompleto?: string;
  
  fecha: string;
  
  // Campos específicos de eventos/proximos eventos
  dia?: string;
  mes?: string;
  categoria?: string;
  ubicacion?: string;
  ponentes?: string;
  audiencia?: string;
  nota?: string;
  
  // Campos multimedia
  imagen?: string;
  
  // Campos de autoría/organización
  autor?: string;
  organizador?: string;
  
  // Tipo de contenido (opcional, para discriminación)
  tipo?: 'noticia' | 'evento' | 'proximo-evento';
}
export default function DifusionPage() {
  const [selectedNoticia, setSelectedNoticia] = useState<ContenidoDifusion  | null>(null)
  const [selectedEvento, setSelectedEvento] = useState<ContenidoDifusion  | null>(null)
  const [selectedProximoEvento, setSelectedProximoEvento] = useState<ContenidoDifusion  | null>(null)

  return (
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
                    <div
                      className="relative aspect-video overflow-hidden rounded-lg cursor-pointer"
                      onClick={() => setSelectedNoticia(noticia)}
                    >
                      <Image
                        src={noticia.imagen || "/placeholder.svg"}
                        alt={noticia.titulo}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-sm text-muted-foreground mb-2">{noticia.fecha}</div>
                      <h3
                        className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors cursor-pointer"
                        onClick={() => setSelectedNoticia(noticia)}
                      >
                        {noticia.titulo}
                      </h3>
                      <p className="text-muted-foreground mb-4">{noticia.descripcion}</p>
                      <div className="mt-auto">
                        <Button
                          variant="link"
                          className="p-0 h-auto font-medium"
                          onClick={() => setSelectedNoticia(noticia)}
                        >
                          Leer más <ArrowRightIcon className="ml-1 h-4 w-4" />
                        </Button>
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
                <div
                  key={evento.id}
                  className="flex items-center p-4 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => setSelectedEvento(evento)}
                >
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
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline">Ver todos los eventos</Button>
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
                <div key={evento.id} className="group cursor-pointer" onClick={() => setSelectedProximoEvento(evento)}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-14 h-14 bg-background rounded-md border border-border flex flex-col items-center justify-center">
                      <span className="text-lg font-bold leading-none">{evento.dia}</span>
                      <span className="text-xs uppercase text-muted-foreground">{evento.mes}</span>
                    </div>
                    <div>
                      <Badge className="mb-1.5">{evento.categoria}</Badge>
                      <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">{evento.titulo}</h3>
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
              <Button className="w-full">Ver calendario completo</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Noticias */}
      <Dialog open={selectedNoticia !== null} onOpenChange={(open) => !open && setSelectedNoticia(null)}>
        <DialogContent className="max-w-3xl bg-background text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedNoticia?.titulo}</DialogTitle>
            <DialogDescription className="text-sm">{selectedNoticia?.fecha}</DialogDescription>
          </DialogHeader>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </DialogClose>

          <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-6">
            <Image
              src={selectedNoticia?.imagen || "/placeholder.svg"}
              alt={selectedNoticia?.titulo || ""}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <p>{selectedNoticia?.descripcion}</p>
            <p>{selectedNoticia?.contenidoCompleto}</p>

            {selectedNoticia?.autor && (
              <div className="flex items-center mt-6 pt-6 border-t">
                <div className="bg-muted rounded-full p-2 mr-3">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Autor</p>
                  <p className="text-sm text-muted-foreground">{selectedNoticia.autor}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <Button>Compartir noticia</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para Eventos Recientes */}
      <Dialog open={selectedEvento !== null} onOpenChange={(open) => !open && setSelectedEvento(null)}>
        <DialogContent className="max-w-3xl bg-background text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedEvento?.titulo}</DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              <Badge variant="secondary">{selectedEvento?.categoria}</Badge>
              <span className="text-sm text-muted-foreground">{selectedEvento?.fecha}</span>
            </DialogDescription>
          </DialogHeader>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </DialogClose>

          <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-6">
            <Image
              src={selectedEvento?.imagen || "/placeholder.svg"}
              alt={selectedEvento?.titulo || ""}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Descripción del evento</h3>
            <p>{selectedEvento?.descripcion}</p>
            <p>{selectedEvento?.descripcionCompleta}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t">
              <div className="flex items-start">
                <div className="bg-muted rounded-md p-2 mr-3">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Fecha y hora</p>
                  <p className="text-sm text-muted-foreground">{selectedEvento?.fecha}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-muted rounded-md p-2 mr-3">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Ubicación</p>
                  <p className="text-sm text-muted-foreground">{selectedEvento?.ubicacion || "Por definir"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-muted rounded-md p-2 mr-3">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Organizador</p>
                  <p className="text-sm text-muted-foreground">{selectedEvento?.organizador || "Equipo de Difusión"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-muted rounded-md p-2 mr-3">
                  <TagIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Categoría</p>
                  <p className="text-sm text-muted-foreground">{selectedEvento?.categoria}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline">Agregar al calendario</Button>
            <Button>Inscribirse al evento</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para Próximos Eventos */}
      <Dialog open={selectedProximoEvento !== null} onOpenChange={(open) => !open && setSelectedProximoEvento(null)}>
        <DialogContent className="max-w-3x bg-background text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedProximoEvento?.titulo}</DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              <Badge>{selectedProximoEvento?.categoria}</Badge>
            </DialogDescription>
          </DialogHeader>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </DialogClose>

          <div className="bg-muted/30 rounded-lg p-6 mb-6 border">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-md flex flex-col items-center justify-center">
                <span className="text-2xl font-bold leading-none">{selectedProximoEvento?.dia}</span>
                <span className="text-xs uppercase text-muted-foreground">{selectedProximoEvento?.mes}</span>
              </div>
              <div>
                <h3 className="text-xl font-medium">{selectedProximoEvento?.titulo}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <ClockIcon className="mr-1.5 h-4 w-4" />
                  {selectedProximoEvento?.fecha}
                </div>
              </div>
            </div>

            <div className="flex items-center text-sm mb-2">
              <MapPinIcon className="mr-1.5 h-4 w-4" />
              <span className="font-medium">Ubicación:</span>
              <span className="ml-1">{selectedProximoEvento?.ubicacion}</span>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h4 className="font-medium">Descripción del evento</h4>
              <p>{selectedProximoEvento?.descripcion}</p>
              <p>{selectedProximoEvento?.descripcionCompleta}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Detalles adicionales</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="bg-muted rounded-md p-2 mr-3">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Ponentes</p>
                  <p className="text-sm text-muted-foreground">{selectedProximoEvento?.ponentes || "Por confirmar"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-muted rounded-md p-2 mr-3">
                  <TagIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Dirigido a</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedProximoEvento?.audiencia || "Público general"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg mt-4">
              <p className="text-sm font-medium">Nota importante</p>
              <p className="text-sm text-muted-foreground">
                {selectedProximoEvento?.nota ||
                  "La inscripción es gratuita pero los cupos son limitados. Se recomienda llegar 15 minutos antes del inicio del evento."}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline">Agregar al calendario</Button>
            <Button>Inscribirse ahora</Button>
          </div>
        </DialogContent>
      </Dialog>
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
    descripcionCompleta:
      "En esta conferencia, expertos de la industria compartirán sus conocimientos sobre las últimas tendencias en innovación tecnológica, incluyendo inteligencia artificial, blockchain, realidad aumentada y computación cuántica. Discutiremos cómo estas tecnologías están transformando diversos sectores y qué podemos esperar en el futuro próximo. Habrá sesiones de preguntas y respuestas, así como oportunidades para establecer contactos con profesionales del sector.",
    fecha: "15 Mar 2024, 10:00 - 13:00",
    categoria: "Tecnología",
    imagen: "/placeholder.svg?height=300&width=500",
    ubicacion: "Auditorio Principal, Edificio Central",
    organizador: "Departamento de Tecnología",
  },
  {
    id: 2,
    titulo: "Taller de Desarrollo Sostenible",
    descripcion:
      "Aprende sobre prácticas sostenibles y cómo implementarlas en tu comunidad para crear un futuro más verde.",
    descripcionCompleta:
      "Este taller práctico te proporcionará las herramientas y conocimientos necesarios para implementar prácticas sostenibles en tu vida diaria y en tu comunidad. Abordaremos temas como la reducción de residuos, el consumo responsable, la eficiencia energética y la agricultura urbana. Los participantes trabajarán en grupos para desarrollar proyectos sostenibles que puedan implementarse en sus comunidades locales.",
    fecha: "22 Mar 2024, 15:00 - 18:00",
    categoria: "Medio Ambiente",
    imagen: "/placeholder.svg?height=300&width=500",
    ubicacion: "Sala Verde, Centro Comunitario",
    organizador: "Comité de Sostenibilidad",
  },
  {
    id: 3,
    titulo: "Exposición de Arte Digital",
    descripcion:
      "Explora las intersecciones entre arte y tecnología en nuestra exposición de arte digital con artistas locales e internacionales.",
    descripcionCompleta:
      "Esta exposición presenta obras de artistas locales e internacionales que exploran las intersecciones entre arte y tecnología. Las obras incluyen instalaciones interactivas, realidad virtual, arte generativo y otras formas de expresión digital. Los visitantes podrán interactuar con muchas de las obras y conversar con los artistas sobre sus procesos creativos y visiones artísticas.",
    fecha: "10 Mar 2024, 09:00 - 20:00",
    categoria: "Arte",
    imagen: "/placeholder.svg?height=300&width=500",
    ubicacion: "Galería de Arte Contemporáneo",
    organizador: "Colectivo de Artistas Digitales",
  },
]

const noticias = [
  {
    id: 1,
    titulo: "Nueva alianza estratégica con empresas tecnológicas",
    descripcion:
      "Hemos establecido una nueva alianza con importantes empresas tecnológicas para impulsar la innovación en nuestra comunidad.",
    contenidoCompleto:
      "Nos complace anunciar que hemos establecido una nueva alianza estratégica con varias empresas líderes en el sector tecnológico, incluyendo TechCorp, InnovaSoft y Digital Solutions. Esta colaboración tiene como objetivo impulsar la innovación tecnológica en nuestra comunidad y crear nuevas oportunidades para estudiantes, profesionales y emprendedores locales.\n\nComo parte de esta alianza, se implementarán programas de capacitación, mentorías, hackathons y fondos de inversión para proyectos innovadores. Las empresas participantes también ofrecerán prácticas profesionales y oportunidades de empleo para los miembros de nuestra comunidad.\n\n'Esta alianza representa un paso importante en nuestra misión de fomentar el desarrollo tecnológico y la innovación en la región', comentó María Rodríguez, directora de nuestra organización. 'Estamos entusiasmados por las oportunidades que se abrirán para nuestra comunidad'.\n\nLos primeros programas comenzarán a implementarse el próximo mes, y se realizará un evento de lanzamiento oficial el 15 de abril en nuestras instalaciones.",
    fecha: "28 Mar 2024",
    imagen: "/placeholder.svg?height=300&width=500",
    autor: "Carlos Méndez, Coordinador de Alianzas Estratégicas",
  },
  {
    id: 2,
    titulo: "Resultados del programa de becas 2024",
    descripcion:
      "Nos complace anunciar los resultados de nuestro programa de becas para el año 2024. Este año, hemos otorgado más de 50 becas a estudiantes destacados en diversas disciplinas académicas.",
    contenidoCompleto:
      "El comité de selección del Programa de Becas 2024 ha finalizado el proceso de evaluación y nos complace anunciar que hemos otorgado un total de 53 becas a estudiantes destacados en diversas disciplinas académicas.\n\nEste año recibimos más de 300 solicitudes, lo que representa un aumento del 25% respecto al año anterior. Las becas fueron distribuidas en las siguientes categorías:\n\n- Ciencias e Ingeniería: 18 becas\n- Humanidades y Ciencias Sociales: 12 becas\n- Artes y Diseño: 8 becas\n- Ciencias de la Salud: 10 becas\n- Emprendimiento e Innovación: 5 becas\n\nLos estudiantes seleccionados recibirán apoyo financiero para sus estudios, así como acceso a programas de mentoría, talleres de desarrollo profesional y oportunidades de networking.\n\n'La calidad de los candidatos este año fue excepcional', comentó el Dr. Javier López, presidente del comité de selección. 'Estamos seguros de que estos jóvenes talentos tendrán un impacto significativo en sus respectivos campos'.\n\nLa ceremonia de entrega de becas se realizará el próximo 10 de abril en el Auditorio Principal. Felicitamos a todos los seleccionados y agradecemos a todos los participantes por su interés en nuestro programa.",
    fecha: "25 Mar 2024",
    imagen: "/placeholder.svg?height=300&width=500",
    autor: "Ana García, Directora del Programa de Becas",
  },
  {
    id: 3,
    titulo: "Inauguración de nuevo centro comunitario",
    descripcion:
      "El próximo mes inauguraremos un nuevo centro comunitario que ofrecerá diversos servicios y actividades para todos los miembros de nuestra comunidad, desde talleres educativos hasta eventos culturales.",
    contenidoCompleto:
      "Nos complace anunciar que el próximo 15 de abril inauguraremos nuestro nuevo Centro Comunitario, un espacio diseñado para servir como punto de encuentro y desarrollo para todos los miembros de nuestra comunidad.\n\nEl nuevo centro, ubicado en la Avenida Principal #123, contará con instalaciones modernas y accesibles, incluyendo:\n\n- Biblioteca y sala de estudios\n- Laboratorio de computación con acceso a internet\n- Salones multiusos para talleres y cursos\n- Auditorio para eventos culturales y conferencias\n- Área de juegos y recreación para niños\n- Huerto comunitario\n- Cafetería social\n\nEl Centro Comunitario ofrecerá una amplia gama de programas y servicios, incluyendo talleres educativos, asesoría legal y psicológica, actividades culturales, programas para adultos mayores, y apoyo a emprendedores locales.\n\n'Este centro representa nuestra visión de crear espacios inclusivos donde todos los miembros de la comunidad puedan aprender, crecer y conectarse', explicó Roberto Sánchez, coordinador del proyecto. 'Hemos trabajado arduamente para asegurar que el diseño y los programas respondan a las necesidades reales de nuestra comunidad'.\n\nLa inauguración incluirá una jornada de puertas abiertas con actividades para toda la familia, presentaciones artísticas y la oportunidad de inscribirse en los diversos programas que se ofrecerán. Invitamos a todos los miembros de la comunidad a acompañarnos en este importante evento.",
    fecha: "20 Mar 2024",
    imagen: "/placeholder.svg?height=300&width=500",
    autor: "Laura Torres, Coordinadora de Comunicación",
  },
]

const proximosEventos = [
  {
    id: 1,
    titulo: "Foro Internacional de Educación",
    descripcion: "Un espacio para dialogar sobre los desafíos y oportunidades en la educación contemporánea.",
    descripcionCompleta:
      "El Foro Internacional de Educación reunirá a expertos, educadores, investigadores y estudiantes para dialogar sobre los desafíos y oportunidades en la educación contemporánea. Se abordarán temas como la innovación pedagógica, la educación inclusiva, las competencias del siglo XXI, y el impacto de la tecnología en los procesos de enseñanza-aprendizaje. El evento contará con conferencias magistrales, paneles de discusión, talleres prácticos y espacios de networking.",
    fecha: "10 Abr 2024, 09:00 - 18:00",
    dia: "10",
    mes: "Abr",
    categoria: "Educación",
    ubicacion: "Centro de Convenciones",
    ponentes:
      "Dra. María González (Universidad Nacional), Dr. John Smith (Harvard University), Mtro. Carlos Ramírez (UNESCO)",
    audiencia: "Profesionales de la educación, investigadores, estudiantes de pedagogía",
    nota: "Se otorgarán certificados de participación con valor curricular.",
  },
  {
    id: 2,
    titulo: "Hackathon por la Inclusión Digital",
    descripcion: "48 horas de innovación y desarrollo de soluciones tecnológicas.",
    descripcionCompleta:
      "El Hackathon por la Inclusión Digital es un evento de 48 horas donde equipos multidisciplinarios trabajarán en el desarrollo de soluciones tecnológicas para promover la inclusión digital en comunidades vulnerables. Los participantes tendrán acceso a mentores, recursos tecnológicos y datos para crear prototipos funcionales que aborden desafíos reales. Los mejores proyectos recibirán financiamiento y apoyo para su implementación.",
    fecha: "15-17 Abr 2024",
    dia: "15",
    mes: "Abr",
    categoria: "Tecnología",
    ubicacion: "Campus Tecnológico",
    ponentes: "Ing. Roberto Méndez (Microsoft), Lic. Ana Castro (Fundación Digital), Ing. Pedro Sánchez (Google)",
    audiencia: "Desarrolladores, diseñadores, emprendedores sociales",
    nota: "Los equipos pueden tener un máximo de 5 integrantes. Se proporcionarán comidas durante todo el evento.",
  },
  {
    id: 3,
    titulo: "Seminario de Liderazgo",
    descripcion: "Desarrolla habilidades de liderazgo efectivo y gestión del cambio.",
    descripcionCompleta:
      "Este seminario intensivo está diseñado para desarrollar habilidades de liderazgo efectivo y estrategias para gestionar el cambio en entornos organizacionales complejos. Los participantes aprenderán sobre estilos de liderazgo, comunicación efectiva, resolución de conflictos, gestión de equipos diversos y adaptación al cambio. La metodología incluye estudios de caso, ejercicios prácticos, retroalimentación personalizada y planes de acción individuales.",
    fecha: "22 Abr 2024, 14:00 - 18:00",
    dia: "22",
    mes: "Abr",
    categoria: "Desarrollo",
    ubicacion: "Auditorio Principal",
    ponentes: "Lic. Laura Martínez (Consultora), Dr. Javier Rodríguez (Universidad Empresarial)",
    audiencia: "Gerentes, coordinadores, líderes de equipo",
    nota: "Cupo limitado a 30 participantes. Se entregará material didáctico y certificado de participación.",
  },
  {
    id: 4,
    titulo: "Concierto Benéfico",
    descripcion: "Música en vivo para recaudar fondos para proyectos comunitarios.",
    descripcionCompleta:
      "Este concierto benéfico reunirá a destacados artistas locales e internacionales que donarán su talento para recaudar fondos destinados a proyectos comunitarios. El programa incluye música clásica, jazz, rock y música tradicional. Todos los fondos recaudados serán destinados a la construcción de un centro cultural en una comunidad de bajos recursos.",
    fecha: "28 Abr 2024, 19:00 - 22:00",
    dia: "28",
    mes: "Abr",
    categoria: "Cultura",
    ubicacion: "Teatro Municipal",
    ponentes: "Orquesta Sinfónica Juvenil, Banda Resonancia, Solista María Jiménez",
    audiencia: "Público general",
    nota: "Entrada general: $150. Estudiantes y adultos mayores: $100. Venta de boletos en taquilla y en línea.",
  },
  {
    id: 5,
    titulo: "Feria de Emprendimiento",
    descripcion: "Exposición de proyectos innovadores y oportunidades de networking.",
    descripcionCompleta:
      "La Feria de Emprendimiento es un espacio para que emprendedores locales presenten sus proyectos innovadores, establezcan contactos con inversionistas y reciban retroalimentación de expertos. El evento incluirá stands de exposición, charlas inspiradoras, talleres prácticos, sesiones de pitch y rondas de networking. También contará con la presencia de representantes de fondos de inversión y programas de aceleración.",
    fecha: "5 May 2024, 10:00 - 19:00",
    dia: "5",
    mes: "May",
    categoria: "Negocios",
    ubicacion: "Parque de Innovación",
    ponentes: "Emprendedores exitosos, inversionistas, mentores de negocios",
    audiencia: "Emprendedores, startups, inversionistas, estudiantes de negocios",
    nota: "Inscripción gratuita para visitantes. Costo para expositores: $500 por stand.",
  },
]
