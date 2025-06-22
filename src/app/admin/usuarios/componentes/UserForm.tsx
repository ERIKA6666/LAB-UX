"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "@/types/index";
import { useUserForm } from "@/hooks/useUserForm";

interface UserFormProps {
  initialData?: Partial<User>;
  onSubmit: (data: Partial<User>) => Promise<void>;
  isSubmitting: boolean;
  isEdit?: boolean;
}

export const UserForm = ({ initialData, onSubmit, isSubmitting, isEdit = false }: UserFormProps) => {
  const {
    formData,
    //setFormData,
    confirmPassword,
    setConfirmPassword,
    handleInputChange,
    handleSelectChange,
    handleStatusChange,
    handleFileChange,
    //resetForm,
  } = useUserForm(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEdit && formData.password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Nombre de Usuario</Label>
            <Input
              id="username"
              name="username"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tipo_usuario">Rol</Label>
            <Select
              value={formData.tipo_usuario}
              onValueChange={(value) => handleSelectChange(value, 'tipo_usuario')}
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
        {!isEdit && (
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required={!isEdit}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={!isEdit}
              />
            </div>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="estado"
            className="h-4 w-4 rounded border-gray-300"
            checked={formData.estado === 'activo'}
            onChange={handleStatusChange}
          />
          <Label htmlFor="estado">Usuario activo</Label>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="foto">Foto de Usuario</Label>
          <Input
            id="foto"
            name="foto"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Procesando...
          </div>
        ) : isEdit ? 'Actualizar Usuario' : 'Crear Usuario'}
      </Button>
    </form>
  );
};