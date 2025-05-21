
"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { BookOpen, Mail, HelpCircle, FileText, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

export default function Support() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [respuesta, setRespuesta] = useState<string | null>(null);
    const [openGuide, setOpenGuide] = useState<string | null>(null)
    const guides = [
    {
      id: "usabilidad",
      title: "Cómo participar en una prueba de usabilidad",
      description: "Aprende los pasos para participar efectivamente en nuestras pruebas de usabilidad.",
      summary:
        "Esta guía te mostrará cómo prepararte para una prueba de usabilidad, qué esperar durante la sesión y cómo proporcionar retroalimentación valiosa.",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Preparación para la prueba</h3>
          <p>
            Antes de participar en una prueba de usabilidad, es importante que te familiarices con el propósito general
            de la sesión. No necesitas tener conocimientos previos sobre el producto que vas a probar, ya que el
            objetivo es evaluar la facilidad de uso para nuevos usuarios.
          </p>

          <h3 className="text-lg font-medium">Durante la sesión</h3>
          <p>
            Se te pedirá que completes una serie de tareas mientras expresas en voz alta tus pensamientos. Esto nos
            ayuda a entender tu proceso mental mientras interactúas con el producto. Recuerda que estamos evaluando el
            producto, no a ti, así que no hay respuestas incorrectas.
          </p>

          <h3 className="text-lg font-medium">Tipos de pruebas de usabilidad</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Pruebas moderadas: Un facilitador te guiará a través del proceso y podrá responder preguntas.</li>
            <li>Pruebas no moderadas: Completarás las tareas por tu cuenta siguiendo instrucciones escritas.</li>
            <li>Pruebas remotas: Participarás desde tu ubicación a través de software de videoconferencia.</li>
            <li>Pruebas presenciales: Asistirás a nuestro laboratorio de usabilidad para la sesión.</li>
          </ul>

          <h3 className="text-lg font-medium">Después de la prueba</h3>
          <p>
            Se te pedirá que completes un breve cuestionario sobre tu experiencia. Tu retroalimentación es invaluable
            para mejorar nuestros productos. Como agradecimiento por tu tiempo, recibirás una compensación según lo
            acordado previamente.
          </p>
        </div>
      ),
    },
    {
      id: "evaluacion-ux",
      title: "Cómo realizar una evaluación UX",
      description: "Guía completa para realizar evaluaciones de experiencia de usuario efectivas.",
      summary:
        "Aprende metodologías, herramientas y mejores prácticas para evaluar la experiencia de usuario de un producto o servicio digital.",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Planificación de la evaluación</h3>
          <p>
            Antes de comenzar, define claramente los objetivos de tu evaluación UX. ¿Qué aspectos específicos del
            producto quieres evaluar? ¿Estás buscando problemas generales de usabilidad o te enfocas en flujos de
            usuario específicos?
          </p>

          <h3 className="text-lg font-medium">Métodos de evaluación</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Evaluación heurística:</strong> Análisis basado en principios establecidos de usabilidad.
            </li>
            <li>
              <strong>Recorrido cognitivo:</strong> Simular el proceso mental de los usuarios al completar tareas.
            </li>
            <li>
              <strong>Pruebas de usabilidad:</strong> Observar a usuarios reales interactuando con el producto.
            </li>
            <li>
              <strong>Análisis de datos:</strong> Examinar métricas de uso para identificar patrones y problemas.
            </li>
          </ul>

          <h3 className="text-lg font-medium">Herramientas recomendadas</h3>
          <p>
            Dependiendo del método elegido, puedes utilizar herramientas como Hotjar para mapas de calor, Lookback para
            pruebas de usabilidad remotas, o Google Analytics para análisis de datos.
          </p>

          <h3 className="text-lg font-medium">Documentación y presentación</h3>
          <p>
            Documenta tus hallazgos de manera clara y organizada. Prioriza los problemas según su impacto en la
            experiencia del usuario y la dificultad de implementación. Presenta recomendaciones concretas para abordar
            cada problema identificado.
          </p>
        </div>
      ),
    },
    {
      id: "investigacion",
      title: "Introducción a la investigación de usuarios",
      description: "Conceptos básicos para comenzar con la investigación de usuarios.",
      summary:
        "Descubre cómo planificar, conducir y analizar investigaciones de usuarios para mejorar tus productos digitales.",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">¿Por qué investigar a los usuarios?</h3>
          <p>
            La investigación de usuarios te permite comprender las necesidades, comportamientos y motivaciones de tus
            usuarios. Esto te ayuda a tomar decisiones de diseño basadas en datos reales en lugar de suposiciones.
          </p>

          <h3 className="text-lg font-medium">Métodos de investigación</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Entrevistas:</strong> Conversaciones uno a uno para comprender en profundidad las experiencias y
              opiniones.
            </li>
            <li>
              <strong>Encuestas:</strong> Recopilación de datos a gran escala para identificar tendencias y patrones.
            </li>
            <li>
              <strong>Estudios de campo:</strong> Observación de usuarios en su entorno natural.
            </li>
            <li>
              <strong>Pruebas de usabilidad:</strong> Evaluación de la facilidad de uso de un producto.
            </li>
            <li>
              <strong>Card sorting:</strong> Método para entender cómo los usuarios organizan y categorizan la
              información.
            </li>
          </ul>

          <h3 className="text-lg font-medium">Planificación de la investigación</h3>
          <p>
            Define claramente tus objetivos de investigación y las preguntas que quieres responder. Selecciona los
            métodos más adecuados según tus recursos y necesidades. Recluta participantes que representen a tu público
            objetivo.
          </p>

          <h3 className="text-lg font-medium">Análisis y aplicación</h3>
          <p>
            Analiza los datos recopilados para identificar patrones y hallazgos clave. Traduce estos hallazgos en
            recomendaciones accionables para el diseño y desarrollo del producto.
          </p>
        </div>
      ),
    },
    {
      id: "principios-diseno",
      title: "Principios de diseño centrado en el usuario",
      description: "Fundamentos del diseño UX centrado en las necesidades del usuario.",
      summary:
        "Aprende los principios clave que guían el diseño centrado en el usuario y cómo aplicarlos en tus proyectos.",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Empatía con el usuario</h3>
          <p>
            El diseño centrado en el usuario comienza con la empatía. Debes comprender profundamente las necesidades,
            objetivos, frustraciones y contextos de uso de tus usuarios para crear soluciones que realmente les sirvan.
          </p>

          <h3 className="text-lg font-medium">Principios fundamentales</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Visibilidad:</strong> Los usuarios deben poder ver claramente qué acciones están disponibles.
            </li>
            <li>
              <strong>Retroalimentación:</strong> Las acciones deben proporcionar respuestas claras e inmediatas.
            </li>
            <li>
              <strong>Consistencia:</strong> Los elementos similares deben funcionar de manera similar.
            </li>
            <li>
              <strong>Prevención de errores:</strong> Diseñar para minimizar errores y facilitar su recuperación.
            </li>
            <li>
              <strong>Reconocimiento sobre recuerdo:</strong> Hacer visible la información relevante en lugar de obligar
              al usuario a recordarla.
            </li>
            <li>
              <strong>Flexibilidad y eficiencia:</strong> Permitir que tanto novatos como expertos utilicen el sistema
              eficientemente.
            </li>
          </ul>

          <h3 className="text-lg font-medium">Proceso iterativo</h3>
          <p>
            El diseño centrado en el usuario es un proceso iterativo que implica investigación, diseño, pruebas y
            refinamiento continuo basado en la retroalimentación de los usuarios.
          </p>

          <h3 className="text-lg font-medium">Inclusividad y accesibilidad</h3>
          <p>
            Un buen diseño centrado en el usuario considera la diversidad de capacidades, contextos y necesidades de
            todos los posibles usuarios, incluyendo aquellos con discapacidades.
          </p>
        </div>
      ),
    },
    {
      id: "prototipos",
      title: "Creación de prototipos efectivos",
      description: "Técnicas para crear prototipos que comuniquen claramente tus ideas de diseño.",
      summary:
        "Esta guía cubre diferentes niveles de fidelidad, herramientas de prototipado y consejos para crear prototipos efectivos.",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Niveles de fidelidad</h3>
          <p>
            Los prototipos pueden variar desde bocetos simples en papel (baja fidelidad) hasta versiones interactivas
            detalladas que se asemejan al producto final (alta fidelidad). El nivel adecuado depende de la etapa del
            proyecto y el propósito del prototipo.
          </p>

          <h3 className="text-lg font-medium">Tipos de prototipos</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Prototipos en papel:</strong> Rápidos y económicos, ideales para las primeras etapas de ideación.
            </li>
            <li>
              <strong>Wireframes:</strong> Representaciones esquemáticas que muestran la estructura y jerarquía del
              contenido.
            </li>
            <li>
              <strong>Prototipos clickeables:</strong> Permiten la interacción básica para probar flujos de navegación.
            </li>
            <li>
              <strong>Prototipos de alta fidelidad:</strong> Representan con precisión el aspecto visual y la
              interactividad del producto final.
            </li>
          </ul>

          <h3 className="text-lg font-medium">Herramientas recomendadas</h3>
          <p>
            Existen numerosas herramientas para crear prototipos, como Figma, Adobe XD, Sketch, InVision y Axure. La
            elección depende de tus necesidades específicas y preferencias personales.
          </p>

          <h3 className="text-lg font-medium">Mejores prácticas</h3>
          <p>
            Mantén el enfoque en los objetivos del prototipo. No intentes resolver todos los problemas a la vez. Itera
            rápidamente basándote en la retroalimentación. Recuerda que el propósito del prototipo es probar ideas, no
            crear un producto perfecto.
          </p>
        </div>
      ),
    },
    {
      id: "analisis-datos",
      title: "Análisis de datos UX",
      description: "Cómo interpretar y utilizar datos para mejorar la experiencia de usuario.",
      summary:
        "Aprende a recopilar, analizar e interpretar datos cuantitativos y cualitativos para tomar decisiones de diseño informadas.",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Tipos de datos UX</h3>
          <p>
            En UX, trabajamos con dos tipos principales de datos: cuantitativos (números y estadísticas) y cualitativos
            (observaciones, opiniones y experiencias). Ambos son valiosos y se complementan entre sí.
          </p>

          <h3 className="text-lg font-medium">Métricas clave</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Tasa de conversión:</strong> Porcentaje de usuarios que completan una acción deseada.
            </li>
            <li>
              <strong>Tasa de abandono:</strong> Porcentaje de usuarios que abandonan un proceso antes de completarlo.
            </li>
            <li>
              <strong>Tiempo en tarea:</strong> Cuánto tiempo tardan los usuarios en completar una tarea específica.
            </li>
            <li>
              <strong>Net Promoter Score (NPS):</strong> Medida de la lealtad y satisfacción del cliente.
            </li>
            <li>
              <strong>System Usability Scale (SUS):</strong> Cuestionario estandarizado para evaluar la usabilidad.
            </li>
          </ul>

          <h3 className="text-lg font-medium">Herramientas de análisis</h3>
          <p>
            Utiliza herramientas como Google Analytics para datos de comportamiento, Hotjar para mapas de calor y
            grabaciones de sesiones, o SurveyMonkey para encuestas. Para datos cualitativos, considera software de
            análisis como NVivo o ATLAS.ti.
          </p>

          <h3 className="text-lg font-medium">Del análisis a la acción</h3>
          <p>
            El análisis de datos solo es útil si conduce a acciones concretas. Identifica patrones, formula hipótesis
            sobre las causas de los problemas detectados, y diseña soluciones basadas en los datos. Luego, prueba estas
            soluciones para verificar su efectividad.
          </p>
        </div>
      ),
    },
  ]
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (!nombre || !correo || !asunto || !mensaje) {
        setRespuesta('Por favor completa todos los campos obligatorios.');
        return;
      }
  
      try {
        const datos = {
          nombre: `${nombre}`,
          email: correo,
          asunto,
          mensaje,
        };
  
        const response = await fetch('http://localhost:5000/soporte', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos),
        });
  
        const resultado = await response.json();
  
        if (response.ok) {
          setRespuesta(resultado.mensaje || '✅ ¡Tu solicitud fue enviada con éxito! Pronto nos pondremos en contacto contigo.');
        } else {
          setRespuesta(resultado.error || '⚠️ Hubo un problema al procesar tu solicitud. Por favor, revisa los datos e inténtalo nuevamente.');
        }
        } catch (error) {
          setRespuesta('❌ Ocurrió un error inesperado al enviar tu solicitud. Verifica tu conexión o intenta más tarde.');
        }
        
    };
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
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="text-sm font-medium">
                    Nombre
                  </label>
                  <Input id="nombre"  value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Correo electrónico
                  </label>
                  <Input id="email" type="email"  value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="tu@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="asunto" className="text-sm font-medium">
                  Asunto
                </label>
                <Input id="asunto"  value={asunto} onChange={(e) => setAsunto(e.target.value)} placeholder="Asunto de tu mensaje" />
              </div>
              <div className="space-y-2">
                <label htmlFor="mensaje" className="text-sm font-medium">
                  Mensaje
                </label>
                <Textarea id="mensaje"  value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Escribe tu mensaje aquí..." rows={5} />
              </div>
              {respuesta && (
                <div className={`mt-4 p-3 rounded ${respuesta.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {respuesta}
                </div>
              )}
              <Button type="submit" className="w-full">Enviar Solicitud</Button>
            </form>
            </CardContent>
            <CardFooter>
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
            {guides.map((guide) => (
              <Card key={guide.id} className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{guide.summary}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setOpenGuide(guide.id)}>
                    Ver guía
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {guides.map((guide) => (
            <Dialog key={guide.id} open={openGuide === guide.id} onOpenChange={(open) => !open && setOpenGuide(null)}>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-background text-white">
                <DialogHeader>
                  <DialogTitle>{guide.title}</DialogTitle>
                  <DialogDescription>{guide.description}</DialogDescription>
                </DialogHeader>
                <div className="py-4">{guide.content}</div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cerrar</Button>
                  </DialogClose>
                  <Button>Descargar PDF</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </TabsContent>
  
      </Tabs>
    </div>
  )
}

