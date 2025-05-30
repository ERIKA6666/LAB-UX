"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ImagePlus, Save, Trash2 } from "lucide-react"
import { slides } from "@/constans/data"

export default function InicioPage() {
  const [banners, setBanners] = useState(slides)

  const [welcomeText, setWelcomeText] = useState(
    "Bienvenidos al Laboratorio de Usabilidad, un espacio dedicado a la investigación y mejora de la experiencia de usuario en aplicaciones y sistemas interactivos.",
  )

  const [featuredText, setFeaturedText] = useState(
    "Participa en nuestros estudios de usabilidad y ayuda a mejorar la experiencia de usuario de productos digitales.",
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Contenido - Inicio</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      <Tabs defaultValue="banners" className="space-y-4">
        <TabsList>
          <TabsTrigger value="banners">Banners</TabsTrigger>
          <TabsTrigger value="welcome">Texto de Bienvenida</TabsTrigger>
          <TabsTrigger value="featured">Mensajes Destacados</TabsTrigger>
        </TabsList>

        <TabsContent value="banners" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {banners.map((banner) => (
              <Card key={banner.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{banner.title}</CardTitle>
                  <CardDescription>Estado: {banner.estado ? "Activo" : "Inactivo"}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video relative overflow-hidden rounded-md border">
                    <img
                      src={banner.image || "/placeholder.svg"}
                      alt={banner.title}
                      className="object-cover w-full h-full"
                    />
                    <Button variant="outline" size="icon" className="absolute bottom-2 right-2 bg-background/80">
                      <ImagePlus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`banner-title-${banner.id}`}>Título</Label>
                    <Input id={`banner-title-${banner.id}`} defaultValue={banner.title} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`banner-link-${banner.id}`}>Enlace</Label>
                    <Input id={`banner-link-${banner.id}`} placeholder="https://ejemplo.com/pagina" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`banner-active-${banner.id}`}
                        checked={
                          banner.estado === "Activo" || banner.estado === "true"
                            ? true
                            : false
                        }
                        onChange={() => {
                          setBanners(banners.map((b) => (b.id === banner.id ? { ...b, active: !b.estado } : b)))
                        }}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor={`banner-active-${banner.id}`}>Activo</Label>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="flex flex-col items-center justify-center h-full min-h-[300px]">
              <CardContent className="pt-6 text-center">
                <Button variant="outline" className="h-20 w-20 rounded-full">
                  <ImagePlus className="h-10 w-10 text-muted-foreground" />
                </Button>
                <p className="mt-4 text-lg font-medium">Añadir Nuevo Banner</p>
                <p className="text-sm text-muted-foreground">
                  Haz clic para agregar un nuevo banner a la página de inicio
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="welcome" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Texto de Bienvenida</CardTitle>
              <CardDescription>Este texto aparece en la sección principal de la página de inicio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="welcome-title">Título de Bienvenida</Label>
                <Input id="welcome-title" defaultValue="Bienvenidos al Laboratorio de Usabilidad" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="welcome-text">Texto de Bienvenida</Label>
                <Textarea
                  id="welcome-text"
                  rows={6}
                  value={welcomeText}
                  onChange={(e) => setWelcomeText(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="welcome-cta">Texto del Botón de Acción</Label>
                <Input id="welcome-cta" defaultValue="Conoce más sobre nosotros" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="welcome-link">Enlace del Botón</Label>
                <Input id="welcome-link" defaultValue="/nosotros" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="featured" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mensajes Destacados</CardTitle>
              <CardDescription>Estos mensajes aparecen en secciones destacadas de la página de inicio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="featured-text">Mensaje Destacado Principal</Label>
                <Textarea
                  id="featured-text"
                  rows={4}
                  value={featuredText}
                  onChange={(e) => setFeaturedText(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="featured-cta">Texto del Botón de Acción</Label>
                <Input id="featured-cta" defaultValue="Participar en estudios" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="featured-link">Enlace del Botón</Label>
                <Input id="featured-link" defaultValue="/participar" />
              </div>
              <div className="pt-4">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

