"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImagePlus, Save, Plus, Edit, Trash2  } from "lucide-react"
import { Mision, Vision, Valores } from "@/constans/data"

export default function MisionVisionPage() {
  const [mision, setMision] = useState(Mision)

  const [vision, setVision] = useState(Vision)

  const [valores, setValores] = useState(Valores)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Misión y Visión</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Misión</CardTitle>
            <CardDescription>Define el propósito principal del laboratorio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mision-title">Título de la Misión</Label>
              <Input id="mision-title" defaultValue={Mision.title}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mision-text">Texto de la Misión</Label>
              <Textarea 
                id="mision-text" 
                rows={6} 
                value={Mision.texto} 
                onChange={(e) => setMision({
                  ...mision,          // Mantener todas las otras propiedades
                  texto: e.target.value  // Actualizar solo textOne
                })} 
              />
            </div>
            <div className="space-y-2">
              <Label>Imagen de la Misión (opcional)</Label>
              <div className="flex items-center gap-4">
                <div className="h-32 w-32 rounded-md border flex items-center justify-center bg-muted">
                  <img src={Mision.image} alt="Misión" className="max-h-full max-w-full" />
                </div>
                <Button variant="outline">
                  <ImagePlus className="mr-2 h-4 w-4" />
                  Cambiar Imagen
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visión</CardTitle>
            <CardDescription>Define hacia dónde se dirige el laboratorio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vision-title">Título de la Visión</Label>
              <Input id="vision-title" defaultValue="Nuestra Visión" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vision-text">Texto de la Visión</Label>
              <Textarea id="vision-text" rows={6} value={Vision.texto} 
              onChange={(e) => setVision({
                  ...vision,          // Mantener todas las otras propiedades
                  texto: e.target.value  // Actualizar solo textOne
                })} />
            </div>
            <div className="space-y-2">
              <Label>Imagen de la Visión (opcional)</Label>
              <div className="flex items-center gap-4">
                <div className="h-32 w-32 rounded-md border flex items-center justify-center bg-muted">
                  <img src={Vision.image} alt="Visión" className="max-h-full max-w-full" />
                </div>
                <Button variant="outline">
                  <ImagePlus className="mr-2 h-4 w-4" />
                  Cambiar Imagen
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Valores</CardTitle>
          <CardDescription>Define los valores fundamentales del laboratorio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="valores-title">Título de los Valores</Label>
            <Input id="valores-title" defaultValue="Nuestros Valores" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium">Lista de Valores</h4>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Añadir Valor
              </Button>
            </div>

            {/* Valores existentes */}
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {Valores.map((valor) => (
                <Card key={valor.id} className="p-3">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md border overflow-hidden flex-shrink-0">
                        <img
                          src={valor.iconoPath || "/placeholder.svg"}
                          alt={valor.titulo}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0 ">
                        <Input defaultValue={valor.titulo} className="text-sm font-medium " />
                      </div>
                    </div>
                    <Textarea defaultValue={valor.descripcion} rows={2} className="text-xs resize-none" />
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="xs" className="text-xs">
                        <ImagePlus className="mr-1 h-3 w-3" />
                        Imagen
                      </Button>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="xs">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="xs">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vista Previa</CardTitle>
          <CardDescription>Así se verá la sección de Misión y Visión en el sitio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{Mision.title}</h3>
              <p className="text-muted-foreground">{Mision.texto}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{Vision.title}</h3>
              <p className="text-muted-foreground">{Vision.texto}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}