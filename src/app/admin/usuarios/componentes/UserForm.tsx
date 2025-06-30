import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaInvestigacion } from "@/types/index";
import { useUserForm } from "@/hooks/useUserForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface UserFormProps {
  isEdit: boolean;
  initialData?: Partial<ReturnType<typeof useUserForm>['formData']>;
  formData: ReturnType<typeof useUserForm>['formData'];
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  selectedAreas: number[];
  setSelectedAreas: React.Dispatch<React.SetStateAction<number[]>>;
  areas: AreaInvestigacion[];
  isEditing?: boolean;
  isSubmitting?: boolean;
  onSubmit: (data:any) => Promise<void>;
  onInputChange: ReturnType<typeof useUserForm>['handleInputChange'];
  onSelectChange: ReturnType<typeof useUserForm>['handleSelectChange'];
  onStatusChange: ReturnType<typeof useUserForm>['handleStatusChange'];
  onFileChange: ReturnType<typeof useUserForm>['handleFileChange'];
  onAreaToggle: (areaId: number) => void;
  
  loading: boolean;
}

export const UserForm = ({
  initialData,
  isSubmitting,
  isEdit,
  formData,
  confirmPassword,
  setConfirmPassword,
  selectedAreas,
  areas,
  isEditing = false,
  onSubmit,
  onInputChange,
  onSelectChange,
  onStatusChange,
  onFileChange,
  onAreaToggle,
  loading,
}: UserFormProps) => {
  console.log("UserForm render",formData);
  const [areasSeleccionadas, setAreasSeleccionadas] = useState<{ ID_area: number }[]>(formData.areas_investigacion || []);
  return (
    <form onSubmit={onSubmit}>
      <Tabs defaultValue="datos" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="datos">Datos</TabsTrigger>
              <TabsTrigger value="formacion">Formación Academica</TabsTrigger>
            </TabsList>
            <TabsContent value="datos">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Nombre de Usuario</Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="Nombre de usuario"
                      value={formData.username}
                      onChange={onInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      placeholder="Nombre"
                      value={formData.nombre}
                      onChange={onInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input
                      id="apellido"
                      name="apellido"
                      placeholder="Apellidos"
                      value={formData.apellido}
                      onChange={onInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      placeholder="Teléfono"
                      value={formData.telefono}
                      onChange={onInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="correo">Correo Electrónico</Label>
                    <Input
                      id="correo"
                      name="correo"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.correo}
                      onChange={onInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tipo_usuario">Rol</Label>
                    <Select
                      value={formData.tipo_usuario}
                      onValueChange={(value) => onSelectChange(value, 'tipo_usuario')}
                    >
                      <SelectTrigger id="tipo_usuario">
                        <SelectValue placeholder="Seleccione un rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="alumno">Alumno</SelectItem>
                        <SelectItem value="profesor">Profesor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {!isEditing && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={onInputChange}
                        required={!isEditing}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required={!isEditing}
                      />
                    </div>
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="estado">Usuario activo</Label>  
                  <Switch
                    id="estado"
                    checked={formData.estado === 'activo'}
                    onCheckedChange={(checked) => onStatusChange({ target: { checked } })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Áreas de Investigación</Label>
                  {/* Renderiza las áreas seleccionadas 
                    <SelectAreas 
                    formData2={formData}
                    onChange={setAreasSeleccionadas}
                  />
                  */}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="foto">Foto de Usuario</Label>
                  <Input
                    id="foto"
                    name="foto"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="formacion">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                       
                        
                    </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
            
      <Button type="submit" disabled={loading}>
        {loading ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Procesando...
          </div>
        ) : isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
      </Button>
    </form>
  );
};