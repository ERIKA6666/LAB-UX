import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { BookOpen, Mail, HelpCircle, FileText, Users } from "lucide-react"

export default function Support() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">Soporte y Ayuda</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Encuentra respuestas a tus preguntas, contacta con nosotros o consulta nuestras guías y tutoriales.
        </p>
      </div>

      <Tabs defaultValue="faq" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Preguntas Frecuentes</span>
            <span className="sm:hidden">FAQ</span>
          </TabsTrigger>
          <TabsTrigger value="contacto" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Contacto</span>
          </TabsTrigger>
          <TabsTrigger value="guias" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Guías y Tutoriales</span>
            <span className="sm:hidden">Guías</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>¿Cómo puedo crear una cuenta?</AccordionTrigger>
              <AccordionContent>
                Para crear una cuenta, haz clic en el botón "Registrarse" en la esquina superior derecha de nuestra
                página principal. Completa el formulario con tu información personal y sigue las instrucciones para
                verificar tu correo electrónico.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>¿Cómo puedo restablecer mi contraseña?</AccordionTrigger>
              <AccordionContent>
                Si olvidaste tu contraseña, haz clic en "¿Olvidaste tu contraseña?" en la página de inicio de sesión.
                Ingresa tu correo electrónico y te enviaremos un enlace para crear una nueva contraseña.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>¿Cuáles son los requisitos técnicos para usar la plataforma?</AccordionTrigger>
              <AccordionContent>
                Nuestra plataforma funciona mejor en navegadores modernos como Chrome, Firefox, Safari o Edge.
                Recomendamos mantener tu navegador actualizado para una experiencia óptima. No se requiere ninguna
                instalación adicional.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>¿Cómo puedo cancelar mi suscripción?</AccordionTrigger>
              <AccordionContent>
                Para cancelar tu suscripción, ve a "Mi Cuenta" &gt; "Suscripciones" y haz clic en "Cancelar
                suscripción". Podrás seguir utilizando el servicio hasta el final del período de facturación actual.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>¿Ofrecen soporte técnico en tiempo real?</AccordionTrigger>
              <AccordionContent>
                Sí, ofrecemos soporte técnico en tiempo real a través de nuestro chat en vivo disponible de lunes a
                viernes, de 9:00 a 18:00 horas. También puedes enviarnos un correo electrónico a soporte@ejemplo.com
                para asistencia.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="contacto">
          <Card>
            <CardHeader>
              <CardTitle>Contacta con nosotros</CardTitle>
              <CardDescription>
                Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="text-sm font-medium">
                    Nombre
                  </label>
                  <Input id="nombre" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Correo electrónico
                  </label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="asunto" className="text-sm font-medium">
                  Asunto
                </label>
                <Input id="asunto" placeholder="Asunto de tu mensaje" />
              </div>
              <div className="space-y-2">
                <label htmlFor="mensaje" className="text-sm font-medium">
                  Mensaje
                </label>
                <Textarea id="mensaje" placeholder="Escribe tu mensaje aquí..." rows={5} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full md:w-auto">Enviar mensaje</Button>
            </CardFooter>
          </Card>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">soporte@ejemplo.com</p>
                <p className="text-sm">info@ejemplo.com</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Horario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Lunes a Viernes</p>
                <p className="text-sm">9:00 - 18:00</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Redes Sociales
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4">
                <a href="#" className="text-sm hover:underline">
                  Twitter
                </a>
                <a href="#" className="text-sm hover:underline">
                  LinkedIn
                </a>
                <a href="#" className="text-sm hover:underline">
                  Facebook
                </a>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="guias" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Cómo participar en una prueba de usabilidad</CardTitle>
                <CardDescription>
                  Aprende los pasos para participar efectivamente en nuestras pruebas de usabilidad.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  Esta guía te mostrará cómo prepararte para una prueba de usabilidad, qué esperar durante la sesión y
                  cómo proporcionar retroalimentación valiosa.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver guía
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Cómo realizar una evaluación UX</CardTitle>
                <CardDescription>
                  Guía completa para realizar evaluaciones de experiencia de usuario efectivas.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  Aprende metodologías, herramientas y mejores prácticas para evaluar la experiencia de usuario de un
                  producto o servicio digital.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver guía
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Introducción a la investigación de usuarios</CardTitle>
                <CardDescription>Conceptos básicos para comenzar con la investigación de usuarios.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  Descubre cómo planificar, conducir y analizar investigaciones de usuarios para mejorar tus productos
                  digitales.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver guía
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Principios de diseño centrado en el usuario</CardTitle>
                <CardDescription>Fundamentos del diseño UX centrado en las necesidades del usuario.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  Aprende los principios clave que guían el diseño centrado en el usuario y cómo aplicarlos en tus
                  proyectos.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver guía
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Creación de prototipos efectivos</CardTitle>
                <CardDescription>
                  Técnicas para crear prototipos que comuniquen claramente tus ideas de diseño.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  Esta guía cubre diferentes niveles de fidelidad, herramientas de prototipado y consejos para crear
                  prototipos efectivos.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver guía
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Análisis de datos UX</CardTitle>
                <CardDescription>
                  Cómo interpretar y utilizar datos para mejorar la experiencia de usuario.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  Aprende a recopilar, analizar e interpretar datos cuantitativos y cualitativos para tomar decisiones
                  de diseño informadas.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver guía
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

