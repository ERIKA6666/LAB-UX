"use client";

import { useState, useEffect } from "react";
import { Proyecto, EstadoProyecto, ProyectoAreaInvestigacion, ProyectoColaborador } from "@/types/proyecto";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

// Tipos adicionales para los datos de selección
interface AreaInvestigacion {
  ID: number;
  nombre: string;
}

interface Colaborador {
  ID: number;
  nombre: string;
  email: string;
}

interface EditProjectDialogProps {
  project: Proyecto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedProject: Proyecto) => Promise<void>;
  areasInvestigacion: AreaInvestigacion[]; // Datos de áreas disponibles
  colaboradores: Colaborador[]; // Datos de colaboradores disponibles
}

export function EditProjectDialog({ 
  project, 
  open, 
  onOpenChange, 
  onSave,
  areasInvestigacion,
  colaboradores
}: EditProjectDialogProps) {
  // Estado para las áreas seleccionadas
  const [selectedAreas, setSelectedAreas] = useState<number[]>(
    project.proyecto_areas_investigacion?.map(area => area.ID_area) || []
  );

  // Estado para los colaboradores seleccionados
  const [selectedColaboradores, setSelectedColaboradores] = useState<number[]>(
    project.proyecto_colaboradores?.filter(c => c.ID_usuario).map(c => c.ID_usuario!) || []
  );

  // Estado para nuevos colaboradores externos
  const [nuevosColaboradores, setNuevosColaboradores] = useState<
    Omit<ProyectoColaborador, 'ID_proyecto'>[]
  >(
    project.proyecto_colaboradores?.filter(c => !c.ID_usuario) || []
  );

  const [formData, setFormData] = useState<Omit<Proyecto, 'ID' | 'fecha_creacion' | 'proyecto_areas_investigacion' | 'proyecto_colaboradores'>>({
    nombre: project.nombre,
    tipo_estudio: project.tipo_estudio || '',
    descripcion: project.descripcion || '',
    estado: project.estado,
    fecha_inicio: project.fecha_inicio instanceof Date 
      ? project.fecha_inicio.toISOString().split('T')[0]
      : project.fecha_inicio || '',
    fecha_fin: project.fecha_fin instanceof Date 
      ? project.fecha_fin.toISOString().split('T')[0]
      : project.fecha_fin || '',
    progreso: project.progreso || 0,
    imagen: project.imagen,
  });

  // Manejar selección/deselección de áreas
  const handleAreaChange = (areaId: number) => {
    setSelectedAreas(prev =>
      prev.includes(areaId)
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  // Manejar selección/deselección de colaboradores
  const handleColaboradorChange = (colaboradorId: number) => {
    setSelectedColaboradores(prev =>
      prev.includes(colaboradorId)
        ? prev.filter(id => id !== colaboradorId)
        : [...prev, colaboradorId]
    );
  };

  // Manejar nuevo colaborador externo
  const handleNuevoColaborador = () => {
    setNuevosColaboradores(prev => [
      ...prev,
      { nombre_externo: '', email_externo: '', institucion_externa: '', rol: '' }
    ]);
  };

  // Manejar cambios en colaboradores externos
  const handleNuevoColaboradorChange = (index: number, field: keyof ProyectoColaborador, value: string) => {
    setNuevosColaboradores(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Eliminar colaborador externo
  const removeNuevoColaborador = (index: number) => {
    setNuevosColaboradores(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, imagen: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const proyectoActualizado: Proyecto = {
        ...project,
        ...formData,
        ID: project.ID,
        fecha_creacion: project.fecha_creacion,
        fecha_actualizacion: new Date().toISOString(),
        proyecto_areas_investigacion: selectedAreas.map(ID_area => ({
          ID_proyecto: project.ID,
          ID_area
        })),
        proyecto_colaboradores: [
          ...selectedColaboradores.map(ID_usuario => ({
            ID_proyecto: project.ID,
            ID_usuario,
            nombre_externo: undefined,
            email_externo: undefined,
            institucion_externa: undefined,
            rol: 'Colaborador'
          })),
          ...nuevosColaboradores.map(colab => ({
            ID_proyecto: project.ID,
            ...colab
          }))
        ]
      };

      await onSave(proyectoActualizado);
      onOpenChange(false);
    } catch (error) {
      console.error("Error al actualizar proyecto:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Proyecto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="grid gap-4 py-4">
              {/* Campos existentes (nombre, descripción, etc.) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-nombre">Nombre</Label>
                  <Input
                    id="edit-nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-tipo">Tipo de Estudio</Label>
                  <Input
                    id="edit-tipo"
                    name="tipo_estudio"
                    value={formData.tipo_estudio || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-descripcion">Descripción</Label>
                <Textarea
                  id="edit-descripcion"
                  name="descripcion"
                  value={formData.descripcion || ''}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {/* Campos de estado, fechas y progreso */}
              </div>

              {/* Sección de Áreas de Investigación */}
              <div className="grid gap-2">
                <Label>Áreas de Investigación</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {areasInvestigacion.map(area => (
                    <div key={area.ID} className="flex items-center space-x-2">
                      <Checkbox
                        id={`area-${area.ID}`}
                        checked={selectedAreas.includes(area.ID)}
                        onCheckedChange={() => handleAreaChange(area.ID)}
                      />
                      <Label htmlFor={`area-${area.ID}`}>{area.nombre}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sección de Colaboradores */}
              <div className="grid gap-2">
                <Label>Colaboradores Internos</Label>
                <div className="grid grid-cols-1 gap-2">
                  {colaboradores.map(colab => (
                    <div key={colab.ID} className="flex items-center space-x-2">
                      <Checkbox
                        id={`colab-${colab.ID}`}
                        checked={selectedColaboradores.includes(colab.ID)}
                        onCheckedChange={() => handleColaboradorChange(colab.ID)}
                      />
                      <Label htmlFor={`colab-${colab.ID}`}>
                        {colab.nombre} ({colab.email})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sección de Colaboradores Externos */}
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label>Colaboradores Externos</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={handleNuevoColaborador}
                  >
                    Añadir Colaborador Externo
                  </Button>
                </div>
                
                {nuevosColaboradores.map((colab, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 items-end border p-2 rounded">
                    <div className="grid gap-1">
                      <Label>Nombre</Label>
                      <Input
                        value={colab.nombre_externo || ''}
                        onChange={(e) => handleNuevoColaboradorChange(index, 'nombre_externo', e.target.value)}
                        placeholder="Nombre completo"
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={colab.email_externo || ''}
                        onChange={(e) => handleNuevoColaboradorChange(index, 'email_externo', e.target.value)}
                        placeholder="email@ejemplo.com"
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label>Institución</Label>
                      <Input
                        value={colab.institucion_externa || ''}
                        onChange={(e) => handleNuevoColaboradorChange(index, 'institucion_externa', e.target.value)}
                        placeholder="Institución"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeNuevoColaborador(index)}
                    >
                      Eliminar
                    </Button>
                  </div>
                ))}
              </div>

              {/* Campo de imagen (existente) */}
            </div>
          </ScrollArea>
          <DialogFooter className="pt-4">
            <Button type="submit">
              <Edit className="mr-2 h-4 w-4" />
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}