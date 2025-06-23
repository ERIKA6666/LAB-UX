// app/usuarios/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Lock, Search, Trash2, UserPlus } from "lucide-react";
import { User, RoleUser, StatusUser, AreaInvestigacion } from "@/types/index";
import { fetchUsers, addUser, deleteUser, updateUser } from "@/services/index";
import { fetchAreasInvestigacion } from "@/services/areainvestigacion";
import { API_URL } from "@/constans/Api";
//import { set } from "react-hook-form";

export default function UsuariosPage() {
  // Estado para el loading
  const [submitLoading, setSubmitLoading] = useState(false);
  // Estados para la lista de usuarios
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filterRol, setFilterRol] = useState("todos");
  const [filterEstado, setFilterEstado] = useState("todos-status");

    // Estados para los diálogos
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deactivatingUser, setDeactivatingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState("");

  // Estados para el formulario
  const [formData, setFormData] = useState<Partial<User>>({
    nombre: '',
    username: '',
    apellido: '',
    telefono: '',
    correo: '',
    tipo_usuario: 'alumno', // Valor por defecto
    estado: 'activo',
    password: '',
    foto: undefined, // nuevo campo
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // Estado para las áreas y selección del usuario
  const [areas, setAreas] = useState<AreaInvestigacion[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);

  // Cargar usuarios
  useEffect(() => {
    setLoading(true);
    fetchUsers(search, filterRol, filterEstado)
      .then(data => setUsers(data))
      .finally(() => setLoading(false));
  }, [search, filterRol, filterEstado]);

  // Cargar áreas de investigación
  useEffect(() => {
    fetchAreasInvestigacion().then(setAreas);
  }, []);

  // Manejadores de usuarios
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
      // Si tienes áreas seleccionadas
      if (selectedAreas.length > 0) {
        form.append("areasInvestigacion", JSON.stringify(selectedAreas));
      }
      const newUser = await addUser(form); // addUser debe aceptar FormData
      if (newUser) {
        // Asegura que todos los campos requeridos estén presentes
        const completeUser: User = {
        ID: newUser.id,
        nombre: newUser.nombre || formData.nombre,
        username: newUser.username || '',
        apellido: newUser.apellido || formData.apellido,
        telefono: newUser.telefono || '',
        correo: newUser.correo || formData.correo,
        tipo_usuario: newUser.tipo_usuario || formData.tipo_usuario,
        estado: newUser.estado || formData.estado,
        fecha_registro: newUser.fecha_registro || new Date().toISOString(),
        avatar: newUser.avatar || '',
        initials: newUser.initials || (formData.nombre ? 
          formData.nombre.split(' ').map(n => n[0]).join('') : ''),
        password: newUser.password || '' // Manejo adecuado de password
      };
        await reloadUsers(); // <-- recarga la tabla
        setUsers(prev => [...prev, completeUser]);
        return completeUser;
      }
      throw new Error("No se recibió respuesta del servidor");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    setSubmitLoading(true);
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u.ID!== id));
      await reloadUsers(); // <-- recarga la tabla
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
      form.append("areasInvestigacion", JSON.stringify(selectedAreas));
    }
    const updated = await updateUser(id, form); // updateUser debe aceptar FormData
    if (updated) {
      await reloadUsers(); // <-- recarga la tabla
      setUsers(prev => prev.map(u => 
        u.ID === id ? { ...u, ...updated } : u
      ));
      return updated;
    }
    throw new Error("No se recibió respuesta del servidor");
  } finally {
    setSubmitLoading(false);
  }
};

  // Manejadores del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setFormData(prev => ({ ...prev, estado: e.target.checked ? 'activo' : 'inactivo' }));
    
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    
    try {
      if (!currentUserId && formData.password !== confirmPassword) {
        throw new Error("Las contraseñas no coinciden");
      }

      if (currentUserId) {
        await handleUpdateUser(currentUserId, formData);
        setShowSuccessMessage("Usuario actualizado correctamente");
      } else {
        await handleAddUser({
          ...formData,
          areasInvestigacion: selectedAreas, // o el nombre que use tu backend
        });
        setShowSuccessMessage("Usuario creado correctamente");
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      const err = error as Error;
      console.error("Error:", error);
      alert(err.message || "Ocurrió un error");
    } finally {
      setSubmitLoading(false);
      setTimeout(() => setShowSuccessMessage(""), 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      username: '',
      correo: '',
      apellido: '',
      telefono: '',
      tipo_usuario: 'alumno',
      estado: 'activo',
      password: '',
      foto: undefined, // nuevo campo
    });
    setConfirmPassword('');
    setCurrentUserId(null);
  };


  // Funciones para renderizar badges
  const getRoleBadge = (tipo_usuario: RoleUser) => {
    switch (tipo_usuario) {
      case "admin":
        return <Badge className="bg-red-500">Administrador</Badge>;
      case "alumno":
        return <Badge className="bg-blue-500">Alumno</Badge>;
      case "profesor":
        return <Badge className="bg-green-500">Profesor</Badge>;
      default:
        return <Badge>Desconocido</Badge>;
    }
  };

  const getStatusBadge = (estado: StatusUser) => {
    switch (estado) {
      case "activo":
        return <Badge className="bg-green-500">Activo</Badge>;
      case "inactivo":
        return <Badge variant="outline">Inactivo</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  // Obtiene las iniciales del nombre y apellido
  function getInitials(nombre: string = "") {
    const partes = nombre.trim().split(" ");
    if (partes.length === 1) return partes[0][0]?.toUpperCase() || "";
    return (
      (partes[0][0] || "") +
      (partes[partes.length - 1][0] || "")
    ).toUpperCase();
  }

  useEffect(() => {
    if (editingUser) {
      setFormData({
        nombre: editingUser.nombre || '',
        username: editingUser.username || '',
        correo: editingUser.correo || '',
        apellido: editingUser.apellido || '',
        telefono: editingUser.telefono || '',
        tipo_usuario: editingUser.tipo_usuario || 'alumno',
        estado: editingUser.estado || 'activo',
        password: '', // No mostrar password por seguridad
      });
      // Precarga las áreas seleccionadas del usuario
      setSelectedAreas(
        editingUser.areas_investigacion
          ? editingUser.areas_investigacion.map(a => a.ID)
          : []
      );
    }
  }, [editingUser]);

  //recargar usuarios al cerrar el diálogo de edición
    const reloadUsers = async () => {
    setLoading(true);
    const data = await fetchUsers(search, filterRol, filterEstado);
    setUsers(data);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, foto: e.target.files![0] }));
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
              if (!open) resetForm();
              setIsDialogOpen(open);
            }}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Nuevo Usuario
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] ">
                <DialogHeader>
                  <DialogTitle>
                    {currentUserId ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
                  </DialogTitle>
                  <DialogDescription>
                    {currentUserId 
                      ? 'Modifique la información del usuario.' 
                      : 'Complete la información para crear un nuevo usuario en el sistema.'}
                  </DialogDescription>
                </DialogHeader>
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
                  {!currentUserId && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input 
                          id="password" 
                          name="password"
                          type="password" 
                          value={formData.password}
                          onChange={handleInputChange}
                          required={!currentUserId}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                        <Input 
                          id="confirmPassword" 
                          type="password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required={!currentUserId}
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
                    <Label>Áreas de Investigación</Label>
                    <div className="flex flex-wrap gap-2">
                      {areas.map(area => (
                        <label key={area.ID} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedAreas.includes(area.ID)}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectedAreas(prev => [...prev, area.ID]);
                              } else {
                                setSelectedAreas(prev => prev.filter(id => id !== area.ID));
                              }
                            }}
                          />
                          <span>{area.nombre}</span>
                        </label>
                      ))}
                    </div>
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
                <DialogFooter>
                  <Button type="submit" disabled={submitLoading}>
                    {submitLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
                      </div>
                    ) : currentUserId ? 'Actualizar Usuario' : 'Crear Usuario'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          {/* Diálogo de Editar Usuario */}
          <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Editar Usuario</DialogTitle>
                <DialogDescription>Modifique la información del usuario {editingUser?.nombre}.</DialogDescription>
              </DialogHeader>
              <form onSubmit={async (e) => {
                e.preventDefault();
                if (editingUser) {
                  try {
                    await handleUpdateUser(editingUser.ID, {
                      ...formData,
                      areasInvestigacion: selectedAreas, // Envía las áreas seleccionadas
                    });
                    setEditingUser(null);
                    setShowSuccessMessage("Usuario actualizado correctamente");
                  } catch (error) {
                    console.error("Error al actualizar usuario:", error);
                  }
                }
              }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Nombre de Usuario</Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      defaultValue={editingUser?.username || ''}
                      placeholder="Nombre de usuario"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      defaultValue={editingUser?.nombre || ''}
                      placeholder="Nombre y apellidos"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="nombre">Apellido</Label>
                    <Input
                      id="apellido"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleInputChange}
                      defaultValue={editingUser?.apellido || ''}
                      placeholder="Apellido"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      defaultValue={editingUser?.telefono|| ''}
                      placeholder="Teléfono"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="correo">Correo Electrónico</Label>
                    <Input
                      id="correo"
                      name="correo"
                      type="email"
                      value={formData.correo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                  <Label htmlFor="rol">Rol</Label>
                  <Select
                    value={formData.tipo_usuario}
                    onValueChange={(value) => handleSelectChange(value, 'tipo_usuario')}
                  >
                    <SelectTrigger id="edit-user-role">
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
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-user-active"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={formData.estado === "activo"}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      estado: e.target.checked ? "activo" : "inactivo"
                    }))}
                  />
                  <Label htmlFor="edit-user-active">Usuario activo</Label>
                </div>
                {/* Áreas de investigación checklist */}
                <div className="grid gap-2">
                  <Label>Áreas de Investigación</Label>
                  <div className="flex flex-wrap gap-2">
                    {areas.map(area => (
                      <label key={area.ID} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedAreas.includes(area.ID)}
                          onChange={e => {
                            if (e.target.checked) {
                              setSelectedAreas(prev => [...prev, area.ID]);
                            } else {
                              setSelectedAreas(prev => prev.filter(id => id !== area.ID));
                            }
                          }}
                        />
                        <span>{area.nombre}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="foto-edit">Foto de Usuario</Label>
                  <Input
                    id="foto-edit"
                    name="foto"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {/* Mostrar preview si ya tiene foto */}
                  {editingUser?.avatar && (
                    <img
                      src={editingUser.avatar}
                      alt="Foto actual"
                      className="w-20 h-20 object-cover rounded mt-2"
                    />
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={submitLoading}>
                  {submitLoading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

          {/* Diálogo de Desactivar/Activar Usuario */}
          <Dialog open={!!deactivatingUser} onOpenChange={() => setDeactivatingUser(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{deactivatingUser?.estado === "activo" ? "Desactivar" : "Activar"} Usuario</DialogTitle>
                <DialogDescription>
                  ¿Está seguro que desea {deactivatingUser?.estado === "activo" ? "desactivar" : "activar"} al usuario{" "}
                  {deactivatingUser?.nombre}? {" "}
                  {deactivatingUser?.ID}? 
                  {deactivatingUser?.estado === "activo" &&
                    " El usuario no podrá acceder al sistema hasta que sea reactivado."}
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
                      // Actualiza el usuario en el backend
                      await handleUpdateUser(deactivatingUser.ID, {
                        estado: newStatus
                      });
                      
                      const action = deactivatingUser.estado === "activo" ? "desactivado" : "activado";
                      setDeactivatingUser(null);
                      setShowSuccessMessage(`Usuario ${action} correctamente`);
                      setTimeout(() => setShowSuccessMessage(""), 3000);
                    }
                  }}
                >
                  {deactivatingUser?.estado === "activo" ? "Desactivar" : "Activar"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Diálogo de Eliminar Usuario */}
          <Dialog open={!!deletingUser} onOpenChange={() => setDeletingUser(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Eliminar Usuario</DialogTitle>
                <DialogDescription>
                  ¿Está seguro que desea eliminar permanentemente al usuario {deletingUser?.nombre}? Esta acción no se puede
                  deshacer y se perderán todos los datos asociados al usuario.
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
                      setSubmitLoading(true);
                      try {
                        await handleDeleteUser(deletingUser.ID);
                        setDeletingUser(null);
                        setShowSuccessMessage("Usuario eliminado correctamente");
                        setTimeout(() => setShowSuccessMessage(""), 3000);
                      } finally {
                        setSubmitLoading(false);
                      }
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

      <div className="flex items-center space-x-2">
        <form
          onSubmit={e => {
            e.preventDefault();
            setSearch(searchInput);
          }}
          className="relative flex-1 max-w-sm"
        >
          <Search
            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
            onClick={() => setSearch(searchInput)}
            tabIndex={0}
            aria-label="Buscar"
            role="button"
          />
          <Input
            type="search"
            placeholder="Buscar usuarios..."
            className="pl-8"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                setSearch(searchInput);
              }
            }}
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

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Lista de Usuarios</TabsTrigger>
          <TabsTrigger value="grid">Vista de Tarjetas</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="text-center py-10 text-lg">Cargando usuarios...</div>
              ) : (
                users.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">No hay usuarios para mostrar.</div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Usuario</th>
                        <th className="text-left p-4">Rol</th>
                        <th className="text-left p-4">Estado</th>
                        <th className="text-left p-4">Último Acceso</th>
                        <th className="text-right p-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.ID} className="border-b">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={user.avatar} alt={user.nombre} />
                                <AvatarFallback>{getInitials(user.nombre)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-sm text-muted-foreground">{user.nombre}</div>
                                <div className="text-sm text-muted-foreground">{user.correo}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">{getRoleBadge(user.tipo_usuario as RoleUser)}</td>
                          <td className="p-4">{getStatusBadge(user.estado as StatusUser)}</td>
                          <td className="p-4">{user.fecha_registro}</td>
                          <td className="p-4 text-right">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="mr-2"
                              onClick={() => setEditingUser(user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="mr-2"
                              onClick={() => setDeactivatingUser(user)}>
                              <Lock className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => setDeletingUser(user)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <Card key={user.ID}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={
                            user.avatar
                              ? typeof user.avatar === "string"
                                ? `${API_URL}/uploads/${user.avatar}`
                                : URL.createObjectURL(user.avatar)
                              : user.foto
                                ? typeof user.foto === "string"
                                  ? `${API_URL}/uploads/${user.foto}`
                                  : URL.createObjectURL(user.foto)
                                : undefined
                          }
                          alt={user.nombre}
                        />
                        <AvatarFallback>{user.initials || getInitials(user.nombre)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{user.nombre}</CardTitle>
                        <CardDescription>{user.nombre}</CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(user.estado as StatusUser)}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Rol:</span>
                      <span>{getRoleBadge(user.tipo_usuario as RoleUser)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Último acceso:</span>
                      <span className="text-sm">{user.fecha_registro}</span>
                    </div>
                  </div>
                </CardContent>
                <CardContent className="flex justify-between pt-0">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="mr-2"
                    onClick={() => setEditingUser(user)}
                  >
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setDeactivatingUser(user)}>
                    <Lock className="mr-2 h-4 w-4" />
                    Desactivar Usuario
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => setDeletingUser(user)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      {showSuccessMessage && (
      <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
        {showSuccessMessage}
      </div>
      )}
    </div>
  );
}