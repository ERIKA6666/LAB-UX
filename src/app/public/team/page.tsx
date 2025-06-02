
"use client"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {  MapPin, Users, GraduationCap, BookOpen } from "lucide-react"
import { ModalCv } from "./components/modalcv"
import { team } from "@/constans/data"

export default function Team() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [areaInterest, setInterest] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [respuesta, setRespuesta] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nombre || !correo || !areaInterest || !mensaje) {
      setRespuesta('Por favor completa todos los campos obligatorios.');
      return;
    }

    try {
      const datos = {
        nombre: `${nombre} ${apellido}`,
        apellido: `${apellido}`,
        email: correo,
        areaInteres: areaInterest,
        mensaje,
      };

      const response = await fetch('http://localhost:5000/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });

      const resultado = await response.json();

      if (response.ok) {
        setRespuesta(resultado.mensaje || '¡Tu solicitud fue enviada con éxito! Pronto nos pondremos en contacto contigo.');
      } else {
        setRespuesta(resultado.error || ' Hubo un problema al procesar tu solicitud. Por favor, revisa los datos e inténtalo nuevamente.');
      }
      } catch (error) {
        const err = error as Error;
        setRespuesta(' Ocurrió un error inesperado al enviar tu solicitud. Verifica tu conexión o intenta más tarde.' + err.message);
      }
      
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 w-full mx-auto">
        {/* Sección del Equipo */}
        <section id="team" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="px-4 py-1 text-sm">Equipo</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Conoce a quienes hacen posible todo</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Un equipo diverso y apasionado de profesionales, educadores y estudiantes comprometidos con la excelencia.
                </p>
              </div>
            </div>

            <Tabs defaultValue="profesores" className="mt-12 w-full">
              <div className="flex justify-center mb-8 w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="profesores"><GraduationCap className="mr-2 h-4 w-4" />Profesores</TabsTrigger>
                  <TabsTrigger value="equipo"><Users className="mr-2 h-4 w-4" />Equipo</TabsTrigger>
                  <TabsTrigger value="alumnos"><BookOpen className="mr-2 h-4 w-4" />Alumnos</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="profesores">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {team.map((person, index) => (
                    <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                      <div className="aspect-square relative">
                        <Image src={person.image || "/placeholder.svg"} alt={person.name} fill className="object-cover hover:scale-105 transition-transform" />
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
                        <Button variant="ghost" size="sm" className="text-primary">
                          <ModalCv perfil={person} />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="equipo">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {team.map((person, index) => (
                    <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                      <div className="aspect-square relative">
                        <Image src={person.image} alt={person.name} fill className="object-cover" />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle>{person.name}</CardTitle>
                        <CardDescription className="text-primary font-medium">{person.role}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">{person.bio}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="alumnos">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {team.map((person, index) => (
                    <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                      <div className="aspect-square relative">
                        <Image src={person.image} alt={person.name} fill className="object-cover" />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle>{person.name}</CardTitle>
                        <CardDescription className="text-primary font-medium">{person.role}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">{person.bio}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Sección Únete */}
        <section id="join" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-primary">Únete a Nosotros</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  ¿Quieres formar parte de nuestro equipo?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Estamos siempre en búsqueda de talento apasionado por la educación y la innovación.
                </p>
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
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="first-name" className="text-sm font-medium">Nombre</label>
                          <input id="first-name" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Juan"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="last-name" className="text-sm font-medium">Apellido</label>
                          <input id="last-name" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Pérez"
                           className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Correo electrónico</label>
                        <input id="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="juan@email.com"
                          type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
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
                          value={areaInterest}
                          onChange={(e) => setInterest(e.target.value)}
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
                        <label htmlFor="mensaje" className="text-sm font-medium">Mensaje</label>
                        <textarea id="mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)} rows={4}
                           className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Cuéntanos un poco más sobre ti..." />
                      </div>
                      {respuesta && (
                        <div className={`mt-4 p-3 rounded ${respuesta.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {respuesta}
                        </div>
                      )}
                      <Button type="submit" className="w-full">Enviar Solicitud</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
