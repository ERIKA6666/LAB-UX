"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ImagePlus, Save, Trash2 } from "lucide-react"
import { ContenidoSitio, EstadoContenido, TipoContenido } from "@/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"// ...existing code...

// ...existing code...

// Datos iniciales mockeados según la interfaz
const initialBanners: ContenidoSitio[] = [
  {
    ID: 1,
    tipo: 'banner',
    titulo: 'Banner Principal',
    texto: 'Texto descriptivo del banner',
    imagen: '/placeholder.svg',
    link_redireccion: 'https://ejemplo.com',
    estado: 'activo',
    orden: 1,
    fecha_creacion: new Date().toISOString()
  },
  {
    ID: 2,
    tipo: 'banner',
    titulo: 'Oferta Especial',
    texto: 'Descripción de la oferta',
    imagen: '/placeholder.svg',
    link_redireccion: 'https://ejemplo.com/ofertas',
    estado: 'inactivo',
    orden: 2,
    fecha_creacion: new Date().toISOString()
  }
]

export default function InicioPage() {
  //estados para dialog de eliminar 
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [bannerToDelete, setBannerToDelete] = useState<number | null>(null)

  const [banners, setBanners] = useState<ContenidoSitio[]>(initialBanners)
  const [nextId, setNextId] = useState<number>(initialBanners.length > 0 ? Math.max(...initialBanners.map(b => b.ID)) + 1 : 1)
  const fileInputRefs = useRef<{[key: number]: HTMLInputElement | null}>({})

  const [welcomeText, setWelcomeText] = useState<string>(
    "Bienvenidos al Laboratorio de Usabilidad, un espacio dedicado a la investigación y mejora de la experiencia de usuario en aplicaciones y sistemas interactivos.",
  )

  const [featuredText, setFeaturedText] = useState<string>(
    "Participa en nuestros estudios de usabilidad y ayuda a mejorar la experiencia de usuario de productos digitales.",
  )

  const handleDeleteBanner = (id: number) => {
    setBannerToDelete(id)
    setConfirmDialogOpen(true)
  }
  const confirmDelete = () => {
  if (bannerToDelete) {
    setBanners(banners.filter(valor => valor.ID !== bannerToDelete))
    setConfirmDialogOpen(false)
    setBannerToDelete(null)
  }
}

  const handleAddBanner = () => {
    const newBanner: ContenidoSitio = {
      ID: nextId,
      tipo: 'banner',
      titulo: "Nuevo Banner",
      imagen: "/placeholder.svg",
      estado: 'inactivo',
      link_redireccion: "",
      fecha_creacion: new Date().toISOString()
    }
    setBanners([...banners, newBanner])
    setNextId(nextId + 1)
  }

  const handleTitleChange = (id: number, newTitle: string) => {
    setBanners(banners.map(banner => 
      banner.ID === id ? { ...banner, titulo: newTitle } : banner
    ))
  }

  const handleLinkChange = (id: number, newLink: string) => {
    setBanners(banners.map(banner => 
      banner.ID === id ? { ...banner, link_redireccion: newLink } : banner
    ))
  }

  const handleStatusChange = (id: number) => {
    setBanners(banners.map(banner => 
      banner.ID === id ? { 
        ...banner, 
        estado: banner.estado === 'activo' ? 'inactivo' : 'activo' 
      } : banner
    ))
  }

  const handleImageClick = (id: number) => {
    if (fileInputRefs.current[id]) {
      fileInputRefs.current[id]?.click()
    }
  }

  const handleImageChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setBanners(banners.map(banner => 
          banner.ID === id ? { ...banner, imagen: event.target?.result as string } : banner
        ))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Contenido - Inicio</h2>
        <div className="flex justify-end">
          <Button className="w-full md:w-auto">
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
              <Card key={banner.ID}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{banner.titulo}</CardTitle>
                  <CardDescription>Estado: {banner.estado === 'activo' ? "Activo" : "Inactivo"}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video relative overflow-hidden rounded-md border">
                    <img src={banner.imagen || "/placeholder.svg"} alt={banner.titulo} className="object-cover w-full h-full" />
                    <input
                      type="file"
                      ref={el => { fileInputRefs.current[banner.ID] = el }}
                      onChange={(e) => handleImageChange(banner.ID, e)}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute bottom-2 right-2 bg-background/80"
                      onClick={() => handleImageClick(banner.ID)}
                    >
                      <ImagePlus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`banner-title-${banner.ID}`}>Título</Label>
                    <Input 
                      id={`banner-title-${banner.ID}`} 
                      value={banner.titulo}
                      onChange={(e) => handleTitleChange(banner.ID, e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`banner-link-${banner.ID}`}>Enlace</Label>
                    <Input 
                      id={`banner-link-${banner.ID}`} 
                      value={banner.link_redireccion || ""}
                      onChange={(e) => handleLinkChange(banner.ID, e.target.value)}
                      placeholder="https://ejemplo.com/pagina" 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`banner-active-${banner.ID}`}
                        checked={banner.estado === 'activo'}
                        onChange={() => handleStatusChange(banner.ID)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor={`banner-active-${banner.ID}`}>Activo</Label>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteBanner(banner.ID)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="flex flex-col items-center justify-center h-full min-h-[300px]">
              <CardContent className="pt-6 text-center">
                <Button 
                  variant="outline" 
                  className="h-20 w-20 rounded-full"
                  onClick={handleAddBanner}
                >
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
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
          </DialogHeader>
          <p>¿Estás seguro que deseas eliminar este banner? Esta acción no se puede deshacer.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}