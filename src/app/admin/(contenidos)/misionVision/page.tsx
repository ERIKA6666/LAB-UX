"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImagePlus, Save } from "lucide-react"

export default function MisionVisionPage() {
  const [mision, setMision] = useState(
    "Nuestra misión es mejorar la experiencia de usuario en aplicaciones y sistemas interactivos a través de la investigación, evaluación y desarrollo de metodologías innovadoras que permitan crear interfaces más usables, accesibles e intuitivas.",
  )

  const [vision, setVision] = useState(
    "Ser un referente internacional en la investigación de usabilidad y experiencia de usuario, contribuyendo al desarrollo de tecnologías centradas en las personas y formando profesionales capaces de diseñar soluciones que mejoren la calidad de vida de los usuarios.",
  )

  const [valores, setValores] = useState(
    "Innovación, Rigor científico, Colaboración, Accesibilidad, Ética en la investigación, Mejora continua.",
  )

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
              <Input id="mision-title" defaultValue="Nuestra Misión" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mision-text">Texto de la Misión</Label>
              <Textarea id="mision-text" rows={6} value={mision} onChange={(e) => setMision(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Imagen de la Misión (opcional)</Label>
              <div className="flex items-center gap-4">
                <div className="h-32 w-32 rounded-md border flex items-center justify-center bg-muted">
                  <img src="/placeholder.svg" alt="Misión" className="max-h-full max-w-full" />
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
              <Textarea id="vision-text" rows={6} value={vision} onChange={(e) => setVision(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Imagen de la Visión (opcional)</Label>
              <div className="flex items-center gap-4">
                <div className="h-32 w-32 rounded-md border flex items-center justify-center bg-muted">
                  <img src="/placeholder.svg" alt="Visión" className="max-h-full max-w-full" />
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
          <div className="space-y-2">
            <Label htmlFor="valores-text">Texto de los Valores</Label>
            <Textarea id="valores-text" rows={4} value={valores} onChange={(e) => setValores(e.target.value)} />
            <p className="text-sm text-muted-foreground">Separe los valores con comas</p>
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
              <h3 className="text-2xl font-bold">Nuestra Misión</h3>
              <p className="text-muted-foreground">{mision}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Nuestra Visión</h3>
              <p className="text-muted-foreground">{vision}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Nuestros Valores</h3>
              <ul className="list-disc pl-5 text-muted-foreground">
                {valores.split(",").map((valor, index) => (
                  <li key={index} className="mb-1">
                    {valor.trim()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}