"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Lock, Search, Trash2, UserPlus } from "lucide-react"
import { useEffect } from "react"
type RoleUser = "admin" | "alumno" | "profesor";
type StatusUser = "activo" | "inactivo";

interface User {
  id: number,
  name: string,
  email: string,
  tipo_usuario: RoleUser,
  avatar: string,
  initials: string,
  fecha_registro: string,
  estado: StatusUser,
}

export default function UsuariosPage() {
  const getRoleBadge = (tipo_usuario : RoleUser) => {
    switch (tipo_usuario) {
      case "admin":
        return <Badge className="bg-red-500">Administrador</Badge>
      case "alumno":
        return <Badge className="bg-blue-500">Editor</Badge>
      case "profesor":
        return <Badge className="bg-green-500">Visualizador</Badge>
      default:
        return <Badge>Desconocido</Badge>
    }
  }

  const getStatusBadge = (estado : StatusUser) => {
    switch (estado) {
      case "activo":
        return <Badge className="bg-green-500">Activo</Badge>
      case "inactivo":
        return <Badge variant="outline">Inactivo</Badge>
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const API_URL = process.env.REACT_APP_API_URL || "https://backend.lab-ux.site"

 useEffect(() => {
  setLoading(true)
  fetch(`${API_URL}/usuarios`)
    .then(res => res.json())
    .then(data => {
      
      // Si la respuesta es un array, úsala directamente
      if (Array.isArray(data)) {
        setUsers(data)
      }
      // Si la respuesta es un objeto con la propiedad 'usuarios', úsala
      else if (data && Array.isArray(data.usuarios)) {
        setUsers(data.usuarios)
      }
      // Si no hay datos válidos, pon un array vacío
      else {
        setUsers([])
      }
    })
    .finally(() => setLoading(false))
}, [])

  // 2. Agregar usuario
  const addUser = async (userData: Partial<User>) => {
    const res = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
    const newUser = await res.json()
    setUsers(prev => [...prev, newUser])
  }

  // 3. Eliminar usuario
  const deleteUser = async (id: number) => {
    await fetch(`${API_URL}/usuarios/${id}`, { method: "DELETE" })
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  // 4. Actualizar usuario
  const updateUser = async (id: number, userData: Partial<User>) => {
    const res = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
    const updated = await res.json()
    setUsers(prev => prev.map(u => u.id === id ? updated : u))
  }





return (
  <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
    <div className="flex items-center justify-between space-y-2">
      {/* ...header y botón de nuevo usuario... */}
    </div>

    <div className="flex items-center space-x-2">
      {/* ...filtros y búsqueda... */}
    </div>

    {loading ? (
      <div className="text-center py-10 text-lg">Cargando usuarios...</div>
    ) : users.length === 0 ? (
      <div className="text-center py-10 text-muted-foreground">No hay usuarios para mostrar.</div>
    ) : (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h2>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
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
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="user-name">Nombre Completo</Label>
                    <Input id="user-name" placeholder="Nombre y apellidos" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="user-email">Correo Electrónico</Label>
                    <Input id="user-email" type="email" placeholder="correo@ejemplo.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="user-password">Contraseña</Label>
                    <Input id="user-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="user-confirm-password">Confirmar Contraseña</Label>
                    <Input id="user-confirm-password" type="password" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="user-role">Rol</Label>
                  <Select>
                    <SelectTrigger id="user-role">
                      <SelectValue placeholder="Seleccione un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Visualizador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="user-avatar">Avatar (opcional)</Label>
                  <Input id="user-avatar" type="file" />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="user-active" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                  <Label htmlFor="user-active">Usuario activo</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Crear Usuario</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar usuarios..." className="pl-8" />
        </div>
        <Select defaultValue="todos">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los roles</SelectItem>
            <SelectItem value="admin">Administrador</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Visualizador</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="todos-status">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos-status">Todos los estados</SelectItem>
            <SelectItem value="active">Activo</SelectItem>
            <SelectItem value="inactive">Inactivo</SelectItem>
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
                      <td className="p-4">{getRoleBadge(user.tipo_usuario  as RoleUser)}</td>
                      <td className="p-4">{getStatusBadge(user.estado as StatusUser)}</td>
                      <td className="p-4">{user.fecha_registro}</td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="icon" className="mr-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="mr-2">
                          <Lock className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Lock className="mr-2 h-4 w-4" />
                    Contraseña
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
    )}
  </div>
)

}
