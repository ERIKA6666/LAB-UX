"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Edit, Mail, MessageSquare, Save, Trash2, User } from "lucide-react"

type ContactoStatus = "pending" | "responded";
type ContactoCategory =  "general" | "participation" | "services" | "collaboration" | "other";

interface Contacto {
    id: number,
    name: string,
    email: string,
    subject: string,
    message:string,
    date: string,
    status: ContactoStatus,
    category: ContactoCategory,
}

export default function ContactoPage() {
  const [messages, setMessages] = useState<Contacto[]>([
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan.perez@ejemplo.com",
      subject: "Consulta sobre participación en estudios",
      message:
        "Hola, me gustaría saber cómo puedo participar en los estudios de usabilidad que realizan. ¿Hay algún requisito específico? Gracias.",
      date: "2023-03-15 10:30",
      status: "pending",
      category: "participation",
    },
    {
      id: 2,
      name: "María López",
      email: "maria.lopez@ejemplo.com",
      subject: "Propuesta de colaboración",
      message:
        "Buenos días, represento a una empresa de desarrollo de software y estamos interesados en colaborar con su laboratorio para mejorar la usabilidad de nuestros productos. ¿Podríamos concertar una reunión para discutir posibles formas de colaboración?",
      date: "2023-03-14 15:45",
      status: "responded",
      category: "collaboration",
    },
    {
      id: 3,
      name: "Carlos Ruiz",
      email: "carlos.ruiz@ejemplo.com",
      subject: "Información sobre servicios",
      message:
        "Quisiera obtener más información sobre los servicios que ofrecen para evaluación de usabilidad. Específicamente, estoy interesado en pruebas con usuarios para una aplicación móvil.",
      date: "2023-03-13 09:15",
      status: "pending",
      category: "services",
    },
  ])

  const [autoResponses, setAutoResponses] = useState([
    {
      id: 1,
      name: "Respuesta General",
      subject: "Recibimos tu mensaje",
      message:
        "Gracias por contactar con el Laboratorio de Usabilidad. Hemos recibido tu mensaje y te responderemos lo antes posible, normalmente en un plazo de 24-48 horas laborables.\n\nSaludos cordiales,\nEquipo del Laboratorio de Usabilidad",
      active: true,
    },
    {
      id: 2,
      name: "Participación en Estudios",
      subject: "Información sobre participación en estudios",
      message:
        "Gracias por tu interés en participar en nuestros estudios de usabilidad. Para registrarte como participante, por favor completa el formulario disponible en nuestra web: [ENLACE].\n\nUna vez registrado/a, te contactaremos cuando haya un estudio que coincida con tu perfil.\n\nSaludos cordiales,\nEquipo del Laboratorio de Usabilidad",
      active: true,
    },
    {
      id: 3,
      name: "Solicitud de Colaboración",
      subject: "Recibimos tu propuesta de colaboración",
      message:
        "Gracias por tu interés en colaborar con nuestro laboratorio. Hemos recibido tu propuesta y la estamos evaluando. Uno de nuestros investigadores se pondrá en contacto contigo en los próximos días para discutir los detalles y posibles vías de colaboración.\n\nSaludos cordiales,\nEquipo del Laboratorio de Usabilidad",
      active: true,
    },
  ])

  const [formSettings, setFormSettings] = useState({
    nameField: true,
    emailField: true,
    subjectField: true,
    messageField: true,
    categoryField: true,
    captcha: true,
    categories: [
      { id: 1, name: "Información general", value: "general" },
      { id: 2, name: "Participación en estudios", value: "participation" },
      { id: 3, name: "Servicios", value: "services" },
      { id: 4, name: "Colaboración", value: "collaboration" },
      { id: 5, name: "Otros", value: "other" },
    ],
  })

  const getStatusBadge = (type: ContactoStatus) => {
    switch (type) {
      case "pending":
        return <Badge className="bg-amber-500">Pendiente</Badge>
      case "responded":
        return <Badge className="bg-green-500">Respondido</Badge>
      default:
        return <Badge>Desconocido</Badge>
    }
  }

  const getCategoryBadge = (type : ContactoCategory) => {
    switch (type) {
      case "general":
        return <Badge variant="outline">Información general</Badge>
      case "participation":
        return <Badge variant="outline">Participación en estudios</Badge>
      case "services":
        return <Badge variant="outline">Servicios</Badge>
      case "collaboration":
        return <Badge variant="outline">Colaboración</Badge>
      case "other":
        return <Badge variant="outline">Otros</Badge>
      default:
        return <Badge variant="outline">Sin categoría</Badge>
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Contacto</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages">Mensajes Recibidos</TabsTrigger>
          <TabsTrigger value="auto-responses">Respuestas Automáticas</TabsTrigger>
          <TabsTrigger value="form-settings">Configuración del Formulario</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mensajes Recibidos</CardTitle>
              <CardDescription>Gestione los mensajes recibidos a través del formulario de contacto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card key={message.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{message.subject}</CardTitle>
                            <CardDescription>
                              {message.name} • {message.email}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getCategoryBadge(message.category)}
                          {getStatusBadge(message.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{message.message}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-muted-foreground">{message.date}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Mail className="mr-2 h-4 w-4" />
                            Responder
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auto-responses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Respuestas Automáticas</CardTitle>
              <CardDescription>Configure las respuestas automáticas que se enviarán a los usuarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {autoResponses.map((response) => (
                  <Card key={response.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{response.name}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Switch id={`response-active-${response.id}`} checked={response.active} />
                          <Label htmlFor={`response-active-${response.id}`}>Activo</Label>
                        </div>
                      </div>
                      <CardDescription>Asunto: {response.subject}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea value={response.message} rows={6} className="resize-none" />
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Añadir Nueva Respuesta Automática</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="new-response-name">Nombre</Label>
                        <Input id="new-response-name" placeholder="Nombre de la respuesta" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-response-subject">Asunto</Label>
                        <Input id="new-response-subject" placeholder="Asunto del correo" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-response-message">Mensaje</Label>
                        <Textarea id="new-response-message" placeholder="Contenido del mensaje" rows={6} />
                      </div>
                      <Button>Añadir Respuesta</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form-settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Formulario</CardTitle>
              <CardDescription>Configure los campos y opciones del formulario de contacto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Campos del Formulario</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="name-field">Nombre</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="name-field" checked={formSettings.nameField} />
                        <span className="text-sm text-muted-foreground">Requerido</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="email-field">Correo Electrónico</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="email-field" checked={formSettings.emailField} />
                        <span className="text-sm text-muted-foreground">Requerido</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="subject-field">Asunto</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="subject-field" checked={formSettings.subjectField} />
                        <span className="text-sm text-muted-foreground">Requerido</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="message-field">Mensaje</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="message-field" checked={formSettings.messageField} />
                        <span className="text-sm text-muted-foreground">Requerido</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="category-field">Categoría</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="category-field" checked={formSettings.categoryField} />
                        <span className="text-sm text-muted-foreground">Requerido</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Categorías</h3>
                  <div className="space-y-2">
                    {formSettings.categories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between p-2 border rounded-md">
                        <span>{category.name}</span>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-4">
                      <Input placeholder="Nueva categoría" />
                      <Button>Añadir</Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Seguridad</h3>
                  <div className="flex items-center space-x-2">
                    <Switch id="captcha" checked={formSettings.captcha} />
                    <Label htmlFor="captcha">Habilitar CAPTCHA</Label>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Protege el formulario contra spam y bots</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Notificaciones</h3>
                  <div className="grid gap-2">
                    <Label htmlFor="notification-email">Correo para notificaciones</Label>
                    <Input
                      id="notification-email"
                      placeholder="correo@ejemplo.com"
                      defaultValue="admin@laboratorio-usabilidad.edu"
                    />
                    <p className="text-sm text-muted-foreground">
                      Se enviará una notificación a este correo cuando se reciba un nuevo mensaje
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vista Previa del Formulario</CardTitle>
              <CardDescription>Así se verá el formulario de contacto en el sitio web</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-6">
                <h3 className="text-2xl font-bold mb-6">Contacto</h3>
                <div className="space-y-4 max-w-md">
                  {formSettings.nameField && (
                    <div className="grid gap-2">
                      <Label htmlFor="preview-name">Nombre</Label>
                      <Input id="preview-name" placeholder="Tu nombre" />
                    </div>
                  )}
                  {formSettings.emailField && (
                    <div className="grid gap-2">
                      <Label htmlFor="preview-email">Correo Electrónico</Label>
                      <Input id="preview-email" type="email" placeholder="tu@correo.com" />
                    </div>
                  )}
                  {formSettings.categoryField && (
                    <div className="grid gap-2">
                      <Label htmlFor="preview-category">Categoría</Label>
                      <Select>
                        <SelectTrigger id="preview-category">
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {formSettings.categories.map((category) => (
                            <SelectItem key={category.id} value={category.value}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {formSettings.subjectField && (
                    <div className="grid gap-2">
                      <Label htmlFor="preview-subject">Asunto</Label>
                      <Input id="preview-subject" placeholder="Asunto de tu mensaje" />
                    </div>
                  )}
                  {formSettings.messageField && (
                    <div className="grid gap-2">
                      <Label htmlFor="preview-message">Mensaje</Label>
                      <Textarea id="preview-message" placeholder="Escribe tu mensaje aquí" rows={5} />
                    </div>
                  )}
                  <Button className="w-full">Enviar Mensaje</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

