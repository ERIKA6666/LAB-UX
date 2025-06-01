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
import { fetchUsers, addUser, deleteUser, updateUser } from "@/services/usuarioService";

export default function UsuariosPage() {
  // Estados para la lista de usuarios
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filterRol, setFilterRol] = useState("todos");
  const [filterEstado, setFilterEstado] = useState("todos-status");

  // Estados para el formulario
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    tipo_usuario: 'alumno',
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
    const newUser = await addUser(userData);
    setUsers(prev => [...prev, newUser]);
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleUpdateUser = async (id: number, userData: Partial<User>) => {
    const updated = await updateUser(id, userData);
    setUsers(prev => prev.map(u => u.id === id ? updated : u));
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
    
    if (formData.password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (currentUserId) {
      await handleUpdateUser(currentUserId, formData);
    } else {
      await handleAddUser(formData);
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      tipo_usuario: 'alumno',
      estado: 'activo',
      password: ''
    });
    setConfirmPassword('');
    setCurrentUserId(null);
  };

  const openEditModal = (user: User) => {
    setFormData({
      name: user.name,
      email: user.email,
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
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
                      <Label htmlFor="name">Nombre Completo</Label>
                      <Input 
                        id="name" 
                        name="name"
                        placeholder="Nombre y apellidos" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="correo@ejemplo.com" 
                        value={formData.email}
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
                  <Button type="submit">
                    {currentUserId ? 'Actualizar Usuario' : 'Crear Usuario'}
                  </Button>
                </DialogFooter>
              </form>
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
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
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
                              onClick={() => openEditModal(user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="mr-2">
                              <Lock className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteUser(user.id)}
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
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
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
                  <Button variant="outline" size="sm">
                    <Lock className="mr-2 h-4 w-4" />
                    Contraseña
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}