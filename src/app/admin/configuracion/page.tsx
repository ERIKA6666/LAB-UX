"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ImagePlus, Save, Edit, Plus } from "lucide-react"

export default function ConfiguracionPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Configuración del Sitio</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          <TabsTrigger value="seo">SEO y Analytics</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información del Sitio</CardTitle>
              <CardDescription>Configuración general del sitio web</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Nombre del Sitio</Label>
                  <Input id="site-name" defaultValue="Laboratorio de Usabilidad" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-url">URL del Sitio</Label>
                  <Input id="site-url" defaultValue="https://laboratorio-usabilidad.edu" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Descripción del Sitio</Label>
                <Textarea
                  id="site-description"
                  rows={3}
                  defaultValue="Laboratorio dedicado a la investigación y mejora de la experiencia de usuario en aplicaciones y sistemas interactivos."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Correo Electrónico de Administración</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@laboratorio-usabilidad.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <Select defaultValue="Europe/Madrid">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Seleccione zona horaria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Madrid">Europe/Madrid (UTC+1)</SelectItem>
                      <SelectItem value="America/Mexico_City">America/Mexico_City (UTC-6)</SelectItem>
                      <SelectItem value="America/Bogota">America/Bogota (UTC-5)</SelectItem>
                      <SelectItem value="America/Santiago">America/Santiago (UTC-4)</SelectItem>
                      <SelectItem value="America/Buenos_Aires">America/Buenos_Aires (UTC-3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date-format">Formato de Fecha</Label>
                  <Select defaultValue="dd/mm/yyyy">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Seleccione formato de fecha" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma Principal</Label>
                  <Select defaultValue="es">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Seleccione idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">Inglés</SelectItem>
                      <SelectItem value="fr">Francés</SelectItem>
                      <SelectItem value="pt">Portugués</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logotipos e Iconos</CardTitle>
              <CardDescription>Configuración de logotipos e iconos del sitio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Logo Principal</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-40 rounded-md border flex items-center justify-center bg-muted">
                      <img src="/placeholder.svg" alt="Logo" className="max-h-full max-w-full" />
                    </div>
                    <Button variant="outline">
                      <ImagePlus className="mr-2 h-4 w-4" />
                      Cambiar Logo
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md border flex items-center justify-center bg-muted">
                      <img src="/placeholder.svg" alt="Favicon" className="max-h-full max-w-full" />
                    </div>
                    <Button variant="outline">
                      <ImagePlus className="mr-2 h-4 w-4" />
                      Cambiar Favicon
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personalización de Apariencia</CardTitle>
              <CardDescription>Configuración de colores, fuentes y estilos del sitio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Color Primario</Label>
                  <div className="flex gap-2">
                    <Input id="primary-color" type="color" defaultValue="#3b82f6" className="w-12 h-10 p-1" />
                    <Input defaultValue="#3b82f6" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Color Secundario</Label>
                  <div className="flex gap-2">
                    <Input id="secondary-color" type="color" defaultValue="#10b981" className="w-12 h-10 p-1" />
                    <Input defaultValue="#10b981" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accent-color">Color de Acento</Label>
                  <div className="flex gap-2">
                    <Input id="accent-color" type="color" defaultValue="#f59e0b" className="w-12 h-10 p-1" />
                    <Input defaultValue="#f59e0b" className="flex-1" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="heading-font">Fuente de Títulos</Label>
                  <Select defaultValue="inter">
                    <SelectTrigger id="heading-font">
                      <SelectValue placeholder="Seleccione fuente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="open-sans">Open Sans</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body-font">Fuente de Texto</Label>
                  <Select defaultValue="inter">
                    <SelectTrigger id="body-font">
                      <SelectValue placeholder="Seleccione fuente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="open-sans">Open Sans</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Modo Oscuro</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="dark-mode" />
                  <Label htmlFor="dark-mode">Habilitar modo oscuro</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Previsualización</Label>
                <div className="border rounded-md p-4 space-y-4">
                  <h3 className="text-xl font-bold">Ejemplo de Título</h3>
                  <p className="text-muted-foreground">
                    Este es un ejemplo de texto para mostrar cómo se verán los contenidos con la configuración actual.
                  </p>
                  <Button>Botón de Ejemplo</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Menús y Navegación</CardTitle>
              <CardDescription>Configuración de menús y enlaces de navegación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Menú Principal</Label>
                <div className="border rounded-md p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded-md bg-muted/50">
                      <span>Inicio</span>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md bg-muted/50">
                      <span>Investigación</span>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md bg-muted/50">
                      <span>Difusión</span>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md bg-muted/50">
                      <span>Contacto</span>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Añadir Elemento de Menú
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO y Metadatos</CardTitle>
              <CardDescription>Configuración de metaetiquetas y palabras clave para SEO</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Título Meta (SEO)</Label>
                <Input
                  id="meta-title"
                  defaultValue="Laboratorio de Usabilidad | Investigación en Experiencia de Usuario"
                />
                <p className="text-xs text-muted-foreground">Recomendado: 50-60 caracteres</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Descripción Meta</Label>
                <Textarea
                  id="meta-description"
                  rows={3}
                  defaultValue="El Laboratorio de Usabilidad es un centro de investigación dedicado a mejorar la experiencia de usuario en aplicaciones y sistemas interactivos a través de metodologías innovadoras."
                />
                <p className="text-xs text-muted-foreground">Recomendado: 150-160 caracteres</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Palabras Clave</Label>
                <Textarea
                  id="keywords"
                  rows={2}
                  defaultValue="usabilidad, experiencia de usuario, UX, investigación, interfaces, interacción humano-computadora, HCI, pruebas de usuario"
                />
                <p className="text-xs text-muted-foreground">Separadas por comas</p>
              </div>
              <div className="space-y-2">
                <Label>Previsualización en Resultados de Búsqueda</Label>
                <div className="border rounded-md p-4 space-y-2">
                  <div className="text-blue-600 text-lg font-medium">
                    Laboratorio de Usabilidad | Investigación en Experiencia de Usuario
                  </div>
                  <div className="text-green-700 text-sm">https://laboratorio-usabilidad.edu</div>
                  <div className="text-sm text-gray-600">
                    El Laboratorio de Usabilidad es un centro de investigación dedicado a mejorar la experiencia de
                    usuario en aplicaciones y sistemas interactivos a través de metodologías innovadoras.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integración de Analytics</CardTitle>
              <CardDescription>Configuración de herramientas de análisis web</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="google-analytics">ID de Google Analytics</Label>
                <Input id="google-analytics" placeholder="G-XXXXXXXXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="google-tag-manager">ID de Google Tag Manager</Label>
                <Input id="google-tag-manager" placeholder="GTM-XXXXXXX" />
              </div>
              <div className="space-y-2">
                <Label>Opciones de Seguimiento</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="track-users" defaultChecked />
                    <Label htmlFor="track-users">Seguimiento de usuarios</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="track-events" defaultChecked />
                    <Label htmlFor="track-events">Seguimiento de eventos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="track-demographics" />
                    <Label htmlFor="track-demographics">Datos demográficos</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad del Sitio</CardTitle>
              <CardDescription>Configuración de seguridad y protección del sitio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Certificado SSL</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="ssl-enabled" defaultChecked />
                  <Label htmlFor="ssl-enabled">HTTPS habilitado</Label>
                </div>
                <p className="text-sm text-muted-foreground">Estado: Activo (Válido hasta 15/12/2023)</p>
              </div>

              <div className="space-y-2">
                <Label>Políticas de Seguridad</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="content-security" defaultChecked />
                    <Label htmlFor="content-security">Content Security Policy (CSP)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="xss-protection" defaultChecked />
                    <Label htmlFor="xss-protection">Protección XSS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="clickjacking" defaultChecked />
                    <Label htmlFor="clickjacking">Protección contra Clickjacking</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Copias de Seguridad</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-backup" defaultChecked />
                    <Label htmlFor="auto-backup">Copias de seguridad automáticas</Label>
                  </div>
                  <Select defaultValue="daily">
                    <SelectTrigger id="backup-frequency">
                      <SelectValue placeholder="Frecuencia de copias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diaria</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Registro de Actividad</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="activity-log" defaultChecked />
                  <Label htmlFor="activity-log">Registrar actividad de administradores</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Se guardarán registros de todas las acciones realizadas en el panel de administración.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

