import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Mail, MapPin, Users, GraduationCap, BookOpen, ArrowRight } from "lucide-react"
import { ModalCv } from "./components/modalcv"

export default function Team() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 w-full mx-auto">
        {/* Sección del Equipo */}
        <section id="team" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="px-4 py-1 text-sm">
                  Equipo
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Conoce a quienes hacen posible todo</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Un equipo diverso y apasionado de profesionales, educadores y estudiantes comprometidos con la
                  excelencia.
                </p>
              </div>
            </div>

            <Tabs defaultValue="profesores" className="mt-12 w-full">
              <div className="flex justify-center mb-8 w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger
                    value="profesores"
                    className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                  >
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Profesores
                  </TabsTrigger>
                  <TabsTrigger
                    value="equipo"
                    className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Equipo
                  </TabsTrigger>
                  <TabsTrigger
                    value="alumnos"
                    className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Alumnos
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Contenido de pestaña Profesores */}
              <TabsContent value="profesores" className="space-y-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {[
                    {
                      name: "Dr. Carlos Mendoza",
                      role: "Profesor de Matemáticas",
                      bio: "Doctor en Matemáticas Aplicadas con 15 años de experiencia en educación superior.",
                      image: "/placeholder.svg?height=300&width=300",
                    },
                    // ... otros profesores ...
                  ].map((person, index) => (
                    <Card key={index} className="overflow-hidden transition-all hover:shadow-lg w-full">
                      <div className="aspect-square relative">
                        <Image
                          src={person.image || "/placeholder.svg"}
                          alt={person.name}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle>{person.name}</CardTitle>
                        <CardDescription className="text-primary font-medium">{person.role}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">{person.bio}</p>
                      </CardContent>
                      <CardFooter className="p-4 flex justify-between items-center border-t">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          Campus Principal
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/90 hover:bg-primary/10"
                        >
                           <ModalCv/>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Contenido de pestaña Equipo */}
              <TabsContent value="equipo" className="space-y-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {[
                    {
                      name: "Alejandra Gutiérrez",
                      role: "Directora Académica",
                      bio: "Lidera el desarrollo de programas educativos y coordina al equipo docente.",
                      image: "/placeholder.svg?height=300&width=300",
                    },
                    // ... otros miembros del equipo ...
                  ].map((person, index) => (
                    <Card key={index} className="overflow-hidden transition-all hover:shadow-lg w-full">
                      {/* ... misma estructura de tarjeta ... */}
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Contenido de pestaña Alumnos */}
              <TabsContent value="alumnos" className="space-y-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {[
                    {
                      name: "Pablo Jiménez",
                      role: "Estudiante de Ingeniería",
                      bio: "Estudiante destacado con interés en robótica y desarrollo sostenible.",
                      image: "/placeholder.svg?height=300&width=300",
                    },
                    // ... otros alumnos ...
                  ].map((person, index) => (
                    <Card key={index} className="overflow-hidden transition-all hover:shadow-lg w-full">
                      {/* ... misma estructura de tarjeta ... */}
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Sección Únete */}
        <section id="join" className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center w-full">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-primary">Únete a Nosotros</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  ¿Quieres formar parte de nuestro equipo?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Estamos siempre en búsqueda de talento apasionado por la educación y la innovación.
                </p>
                {/* ... resto del contenido ... */}
              </div>
              <div className="lg:pl-10">
              <Card>
                  <CardHeader>
                    <CardTitle>Solicitud de Información</CardTitle>
                    <CardDescription>
                      Completa el formulario y nos pondremos en contacto contigo para brindarte más detalles.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="first-name"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Nombre
                          </label>
                          <input
                            id="first-name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Juan"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="last-name"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Apellido
                          </label>
                          <input
                            id="last-name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Pérez"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Correo electrónico
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="ejemplo@correo.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="interest"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Área de interés
                        </label>
                        <select
                          id="interest"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="" disabled selected>
                            Selecciona una opción
                          </option>
                          <option value="teaching">Docencia</option>
                          <option value="research">Investigación</option>
                          <option value="admin">Administración</option>
                          <option value="student">Programas para estudiantes</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Mensaje
                        </label>
                        <textarea
                          id="message"
                          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Cuéntanos sobre tu experiencia y por qué te interesa unirte a nuestro equipo..."
                        />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90">Enviar solicitud</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}