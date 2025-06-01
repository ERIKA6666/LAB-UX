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
import { User, RoleUser, StatusUser } from "@/types/index";
import { fetchUsers, addUser, deleteUser, updateUser } from "@/services/index";
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
    correo: '',
    tipo_usuario: 'alumno', // Valor por defecto
    estado: 'activo',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // Cargar usuarios
  useEffect(() => {
    setLoading(true);
    fetchUsers(search, filterRol, filterEstado)
      .then(data => setUsers(data))
      .finally(() => setLoading(false));
  }, [search, filterRol, filterEstado]);

  // Manejadores de usuarios
  const handleAddUser = async (userData: Partial<User>) => {
    setSubmitLoading(true);
    try {
      const newUser = await addUser(userData);
      if (newUser) {
        // Asegura que todos los campos requeridos estén presentes
        const completeUser = {
          id: newUser.id,
          nombre: newUser.nombre || formData.nombre,
          correo: newUser.correo || formData.correo,
          tipo_usuario: newUser.tipo_usuario || formData.tipo_usuario,
          estado: newUser.estado || formData.estado,
          fecha_registro: newUser.fecha_registro || new Date().toISOString(),
          avatar: newUser.avatar || '',
          initials: newUser.initials || (formData.nombre ? 
            formData.nombre.split(' ').map(n => n[0]).join('') : '')
        };
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
      setUsers(prev => prev.filter(u => u.id !== id));
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleUpdateUser = async (id: number, userData: Partial<User>) => {
    setSubmitLoading(true);
    try {
      const updated = await updateUser(id, userData);
      if (updated) {
        setUsers(prev => prev.map(u => u.id === id ? updated : u));
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
        await handleAddUser(formData);
        setShowSuccessMessage("Usuario creado correctamente");
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Ocurrió un error");
    } finally {
      setSubmitLoading(false);
      setTimeout(() => setShowSuccessMessage(""), 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      correo: '',
      tipo_usuario: 'alumno',
      estado: 'activo',
      password: ''
    });
    setConfirmPassword('');
    setCurrentUserId(null);
  };

  const openEditModal = (user: User) => {
    setFormData({
      nombre: user.nombre,
      correo: user.correo,
      tipo_usuario: user.tipo_usuario,
      estado: user.estado,
      password: '' // No mostramos la contraseña actual por seguridad
    });
    setCurrentUserId(user.id);
    setIsDialogOpen(true);
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
              <DialogContent className="sm:max-w-[600px] bg-background text-white">
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
                      <Label htmlFor="nombre">Nombre Completo</Label>
                      <Input 
                        id="nombre" 
                        name="nombre"
                        placeholder="Nombre y apellidos" 
                        value={formData.nombre}
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
                  await handleUpdateUser(editingUser.id, formData);
                  setEditingUser(null);
                  setShowSuccessMessage("Usuario actualizado correctamente");
                  setTimeout(() => setShowSuccessMessage(""), 3000);
                }
              }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-user-name">Nombre Completo</Label>
                    <Input id="edit-user-name" defaultValue={editingUser?.nombre} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-user-email">Correo Electrónico</Label>
                    <Input id="edit-user-email" type="email" defaultValue={editingUser?.correo} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-user-role">Rol</Label>
                  <Select 
                    value={formData.tipo_usuario} 
                    onValueChange={(value) => {
                      console.log("Rol seleccionado:", value); // Para depuración
                      handleSelectChange(value, 'tipo_usuario');
                    }}
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
                <div className="grid gap-2">
                  <Label htmlFor="edit-user-avatar">Avatar (opcional)</Label>
                  <Input id="edit-user-avatar" type="file" />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-user-active"
                    className="h-4 w-4 rounded border-gray-300"
                    defaultChecked={editingUser?.estado === "activo"}
                  />
                  <Label htmlFor="edit-user-active">Usuario activo</Label>
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
                  {deactivatingUser?.nombre}?
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
                      await handleUpdateUser(deactivatingUser.id, {
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
                        await handleDeleteUser(deletingUser.id);
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
                        <tr key={user.id} className="border-b">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={user.avatar} alt={user.nombre} />
                                <AvatarFallback>{user.initials}</AvatarFallback>
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
              <Card key={user.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.nombre} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
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
                    variant="outline" 
                    size="sm"
                    onClick={() => openEditModal(user)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button 
                  variant="outline" 
                  size="sm"
                   onClick={() => setDeactivatingUser(user)}>
                    <Lock className="mr-2 h-4 w-4" />
                    Contraseña
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