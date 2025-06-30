"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, UserPlus } from "lucide-react";
import { User, AreaInvestigacion } from "@/types/index";
import { addUser, deleteUser, updateUser } from "@/services/index";
import { fetchAreasInvestigacion } from "@/services/areainvestigacion";
import { useUsers } from "@/hooks/useUsuarios";
import { useUserForm } from "@/hooks/useUserForm";
import { UserTable } from "./componentes/UserTable";
import { UserForm } from "./componentes/UserForm";
import { UserGrid } from "./componentes/UserGrid";

export default function UsuariosPage() {
  const {
    users,
    loading,
    search,
    setSearch,
    filterRol,
    setFilterRol,
    filterEstado,
    setFilterEstado,
    reloadUsers
  } = useUsers();

  const [searchInput, setSearchInput] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deactivatingUser, setDeactivatingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [areas, setAreas] = useState<AreaInvestigacion[]>([]);

  const {
    formData,
    setFormData,
    confirmPassword,
    setConfirmPassword,
    selectedAreas,
    setSelectedAreas,
    handleInputChange,
    handleSelectChange,
    handleStatusChange,
    handleFileChange,
    resetForm,
  } = useUserForm();

  // Cargar áreas de investigación
  useEffect(() => {
    fetchAreasInvestigacion().then(setAreas);
  }, []);

  const handleAddUser = async (userData: Partial<User>) => {
    setSubmitLoading(true);
    try {
      const form = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        if (value !== undefined && key !== "foto") {
          form.append(key, value as string);
        }
      });
      if (userData.foto) {
        form.append("foto", userData.foto);
      }
      if (selectedAreas.length > 0) {
        form.append("areas_investigacion", JSON.stringify(selectedAreas));
      }
      
      const newUser = await addUser(form);
    
      if (newUser) {
        setShowSuccessMessage("Usuario creado correctamente");
        setIsDialogOpen(false);
        resetForm();
        await reloadUsers(); // Recargar usuarios después de agregar
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleUpdateUser = async (id: number, userData: Partial<User>) => {
    setSubmitLoading(true);
    try {
      const form = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        if (value !== undefined && key !== "foto") {
          form.append(key, value as string);
        }
      });
      if (userData.foto) {
        form.append("foto", userData.foto);
      }
      if (selectedAreas.length > 0) {
        form.append("areas_investigacion", JSON.stringify(selectedAreas));
      }
      
      const updated = await updateUser(id, form);
      if (updated) {
        setShowSuccessMessage("Usuario actualizado correctamente");
        setEditingUser(null);
        await reloadUsers(); // Recargar usuarios después de agregar
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    setSubmitLoading(true);
    try {
      await deleteUser(id);
      setShowSuccessMessage("Usuario eliminado correctamente");
      setDeletingUser(null);
      await reloadUsers(); // Recargar usuarios después de agregar
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!editingUser && formData.password !== confirmPassword) {
        throw new Error("Las contraseñas no coinciden");
      }

      if (editingUser) {
        await handleUpdateUser(editingUser.ID, formData);
      } else {
        await handleAddUser(formData);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Ocurrió un error");
    }
  };

  const handleAreaToggle = (areaId: number) => {
    setSelectedAreas(prev => 
      prev.includes(areaId) 
        ? prev.filter(id => id !== areaId) 
        : [...prev, areaId]
    );
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}>
                <UserPlus className="mr-2 h-4 w-4" />
                Nuevo Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                <DialogDescription>
                  Complete la información para crear un nuevo usuario en el sistema.
                </DialogDescription>
              </DialogHeader>
              <UserForm
                formData={formData}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                selectedAreas={selectedAreas}
                setSelectedAreas={setSelectedAreas}
                areas={areas}
                onSubmit={handleSubmit}
                onInputChange={handleInputChange}
                onSelectChange={handleSelectChange}
                onStatusChange={handleStatusChange}
                onFileChange={handleFileChange}
                onAreaToggle={handleAreaToggle}
                loading={submitLoading}
              />
            </DialogContent>
          </Dialog>

          {/* Diálogo de Edición */}
          <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Editar Usuario</DialogTitle>
                <DialogDescription>
                  Modifique la información del usuario {editingUser?.nombre}.
                </DialogDescription>
              </DialogHeader>
              <UserForm
                formData={formData}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                selectedAreas={selectedAreas}
                areas={areas}
                isEditing={true}
                onSubmit={handleSubmit}
                onInputChange={handleInputChange}
                onSelectChange={handleSelectChange}
                onStatusChange={handleStatusChange}
                onFileChange={handleFileChange}
                onAreaToggle={handleAreaToggle}
                loading={submitLoading}
              />
            </DialogContent>
          </Dialog>

          {/* Diálogo de Desactivar/Activar */}
          <Dialog open={!!deactivatingUser} onOpenChange={(open) => !open && setDeactivatingUser(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {deactivatingUser?.estado === "activo" ? "Desactivar" : "Activar"} Usuario
                </DialogTitle>
                <DialogDescription>
                  ¿Está seguro que desea {deactivatingUser?.estado === "activo" ? "desactivar" : "activar"} al usuario{" "}
                  {deactivatingUser?.nombre}?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeactivatingUser(null)}>
                  Cancelar
                </Button>
                <Button
                  variant={deactivatingUser?.estado === "activo" ? "destructive" : "default"}
                  onClick={async () => {
                    if (deactivatingUser) {
                      const newStatus = deactivatingUser.estado === "activo" ? "inactivo" : "activo";
                      await handleUpdateUser(deactivatingUser.ID, { estado: newStatus });
                      setDeactivatingUser(null);
                    }
                  }}
                >
                  {deactivatingUser?.estado === "activo" ? "Desactivar" : "Activar"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Diálogo de Eliminación */}
          <Dialog open={!!deletingUser} onOpenChange={(open) => !open && setDeletingUser(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Eliminar Usuario</DialogTitle>
                <DialogDescription>
                  ¿Está seguro que desea eliminar permanentemente al usuario {deletingUser?.nombre}?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeletingUser(null)}>
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    if (deletingUser) {
                      await handleDeleteUser(deletingUser.ID);
                    }
                  }}
                  disabled={submitLoading}
                >
                  {submitLoading ? "Eliminando..." : "Eliminar"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex items-center space-x-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(searchInput);
          }}
          className="relative flex-1 max-w-sm"
        >
          <Search
            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
            onClick={() => setSearch(searchInput)}
          />
          <Input
            type="search"
            placeholder="Buscar usuarios..."
            className="pl-8"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
        <Select value={filterRol} onValueChange={setFilterRol}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los roles</SelectItem>
            <SelectItem value="admin">Administrador</SelectItem>
            <SelectItem value="alumno">Alumno</SelectItem>
            <SelectItem value="profesor">Profesor</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterEstado} onValueChange={setFilterEstado}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos-status">Todos los estados</SelectItem>
            <SelectItem value="activo">Activo</SelectItem>
            <SelectItem value="inactivo">Inactivo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contenido principal */}

          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="text-center py-10 text-lg">Cargando usuarios...</div>
              ) : users.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No hay usuarios para mostrar.</div>
              ) : (
                <UserTable
                loading={loading}
                  users={users}
                  onEdit={(user) => {
                    setEditingUser(user);
                    setFormData({
                      nombre: user.nombre || '',
                      username: user.username || '',
                      correo: user.correo || '',
                      apellido: user.apellido || '',
                      telefono: user.telefono || '',
                      tipo_usuario: user.tipo_usuario || 'alumno',
                      estado: user.estado || 'activo',
                      password: '',
                      areas_investigacion: user.areas_investigacion || [],
                      formacion_academica: user.formacion_academica || [],
                    });
                    setSelectedAreas(
                      user.areas_investigacion 
                        ? user.areas_investigacion.map(a => a.ID_area) 
                        : []
                    );
                  }}
                  onDeactivate={setDeactivatingUser}
                  onDelete={setDeletingUser}
                />
              )}
            </CardContent>
          </Card>
      {showSuccessMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          {showSuccessMessage}
        </div>
      )}
    </div>
  );
}