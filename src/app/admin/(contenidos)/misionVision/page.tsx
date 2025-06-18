"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImagePlus, Save, Plus, Edit, Trash2 } from "lucide-react"
import { Mision, Vision, Valores } from "@/constans/data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ContenidoSitio, Valor } from "@/types"

export default function MisionVisionPage() {
  const [mision, setMision] = useState<ContenidoSitio>(Mision)
  const [vision, setVision] = useState<ContenidoSitio>(Vision)
  const [valores, setValores] = useState<Valor[]>(Valores)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [valorEdit, setValorEdit] = useState<Valor | null>(null)

  const misionFileInputRef = useRef<HTMLInputElement>(null)
  const visionFileInputRef = useRef<HTMLInputElement>(null)
  const valoresFileInputRefs = useRef<(HTMLInputElement | null)[]>([])

  //mensaje para eliminar 
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [valorToDelete, setValorToDelete] = useState<number | null>(null)

  const handleMisionImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setMision({ ...mision, imagen: ev.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }
  const handleDeleteValor = (id: number) => {
    setValorToDelete(id)
    setConfirmDialogOpen(true)
  }

  const confirmDelete = () => {
    if (valorToDelete) {
      setValores(valores.filter(valor => valor.ID !== valorToDelete))
      setConfirmDialogOpen(false)
      setValorToDelete(null)
    }
  }


  const handleVisionImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setVision({ ...vision, imagen: ev.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleValorImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const nuevosValores = [...valores]
        nuevosValores[index] = {
          ...nuevosValores[index],
          iconoPath: ev.target?.result as string,
        }
        setValores(nuevosValores)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditValor = (valor: Valor) => {
    setValorEdit(valor)
    setEditDialogOpen(true)
  }

  const handleSaveEditedValor = (e: React.FormEvent) => {
    e.preventDefault()
    if (valorEdit) {
      setValores(valores.map(v => v.ID === valorEdit.ID ? valorEdit : v))
      setEditDialogOpen(false)
    }
  }
  //add valor
  const [newValorDialogOpen, setNewValorDialogOpen] = useState(false)
  const [newValor, setNewValor] = useState<Valor>({
    ID: Date.now(),
    titulo: "",
    texto: "",
    iconoPath: "",
    tipo: "valores", // o el valor por defecto que uses
    estado: "activo", // o el valor por defecto que uses
    fecha_creacion: new Date().toISOString(), // o el formato que uses
  })
  const newValorIconInputRef = useRef<HTMLInputElement>(null)

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
              <Input id="mision-title" defaultValue={Mision.titulo}/>
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
                  <img src={mision.imagen} alt="Misión" className="max-h-full max-w-full" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={misionFileInputRef}
                  style={{ display: "none" }}
                  onChange={handleMisionImageChange}
                />
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => misionFileInputRef.current?.click()}
                >
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
              <Textarea id="vision-text" rows={6} value={vision.texto} 
              onChange={(e) => setVision({
                  ...vision,          // Mantener todas las otras propiedades
                  texto: e.target.value  // Actualizar solo textOne
                })} />
            </div>
            <div className="space-y-2">
              <Label>Imagen de la Visión (opcional)</Label>
              <div className="flex items-center gap-4">
                <div className="h-32 w-32 rounded-md border flex items-center justify-center bg-muted">
                  <img src={vision.imagen} alt="Visión" className="max-h-full max-w-full" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={visionFileInputRef}
                  style={{ display: "none" }}
                  onChange={handleVisionImageChange}
                />
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => visionFileInputRef.current?.click()}
                >
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
             <Button variant="outline" size="sm" onClick={() => {
              setNewValor({
                ID: Date.now(),
                titulo: "",
                texto: "",
                iconoPath: "",
                tipo: "valores", // o el valor por defecto que uses
                estado: "activo", // o el valor por defecto que uses
                fecha_creacion: new Date().toISOString(), // o el formato que uses
              })
              setNewValorDialogOpen(true)
            }}>
            <Plus className="mr-2 h-4 w-4" />
            Añadir Valor
          </Button>
            </div>

            {/* Valores existentes */}
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {valores.map((valor,idx) => (
                <Card key={valor.ID} className="p-3">
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
                    <Textarea defaultValue={valor.texto} rows={2} className="text-xs resize-none" />
                    <div className="flex justify-between items-center">
                      <input
                      type="file"
                      accept="image/*"
                      ref={el => {valoresFileInputRefs.current[idx] = el}}
                      style={{ display: "none" }}
                      onChange={e => handleValorImageChange(idx, e)}
                    />
                    <Button
                      variant="outline"
                      size="xs"
                      className="text-xs"
                      type="button"
                      onClick={() => valoresFileInputRefs.current[idx]?.click()}
                    >
                      <ImagePlus className="mr-1 h-3 w-3" />
                      Imagen
                    </Button>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="xs" onClick={() => handleEditValor(valor)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                     <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteValor(valor.ID)}
                      >
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
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Valor</DialogTitle>
          </DialogHeader>
          {valorEdit && (
            <form
              onSubmit={e => {
                e.preventDefault()
                setValores(valores.map(v => v.ID === valorEdit.ID? valorEdit : v))
                setEditDialogOpen(false)
              }}
              className="space-y-4"
            >
              <div>
                <Label>Título</Label>
                <Input
                  value={valorEdit.titulo}
                  onChange={e => setValorEdit({ ...valorEdit, titulo: e.target.value })}
                />
              </div>
              <div>
                <Label>Descripción</Label>
                <Textarea
                  value={valorEdit.texto}
                  onChange={e => setValorEdit({ ...valorEdit, texto: e.target.value })}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Guardar</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
        </DialogHeader>
        <p>¿Estás seguro que deseas eliminar este valor? Esta acción no se puede deshacer.</p>
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
    <Dialog open={newValorDialogOpen} onOpenChange={setNewValorDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Nuevo Valor</DialogTitle>
    </DialogHeader>
    <form
      onSubmit={e => {
        e.preventDefault()
        setValores([...valores, newValor])
        setNewValorDialogOpen(false)
      }}
      className="space-y-4"
    >
      <div>
        <Label>Título</Label>
        <Input
          value={newValor.titulo}
          onChange={e => setNewValor({ ...newValor, titulo: e.target.value })}
          required
        />
      </div>
      <div>
        <Label>Descripción</Label>
        <Textarea
          value={newValor.texto}
          onChange={e => setNewValor({ ...newValor, texto: e.target.value })}
          required
        />
      </div>
      <div>
       <Label>Icono</Label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            ref={newValorIconInputRef}
            style={{ display: "none" }}
            onChange={e => {
              const file = e.target.files?.[0]
              if (file) {
                const reader = new FileReader()
                reader.onload = (ev) => {
                  setNewValor({ ...newValor, iconoPath: ev.target?.result as string })
                }
                reader.readAsDataURL(file)
              }
            }}
          />
          <Button
            variant="outline"
            type="button"
            onClick={() => newValorIconInputRef.current?.click()}
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            Cambiar Imagen
          </Button>
          {newValor.iconoPath && (
            <img src={newValor.iconoPath} alt="Icono" className="h-12 w-12 rounded-md border" />
          )}
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Guardar</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
    </div>
  )
}