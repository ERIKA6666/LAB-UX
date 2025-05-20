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

type RoleUser = "admin" | "editor" | "viewer";
type StatusUser = "active" | "inactive";

interface User {
  id: number,
  name: string,
  email: string,
  role: RoleUser,
  avatar: string,
  initials: string,
  lastLogin: string,
  status: StatusUser,
}

export default function UsuariosPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan.perez@ejemplo.com",
      role: "admin",
      avatar: "/placeholder.svg",
      initials: "JP",
      lastLogin: "2023-03-15 10:30",
      status: "active",
    },
    {
      id: 2,
      name: "María López",
      email: "maria.lopez@ejemplo.com",
      role: "editor",
      avatar: "/placeholder.svg",
      initials: "ML",
      lastLogin: "2023-03-14 15:45",
      status: "active",
    },
    {
      id: 3,
      name: "Carlos Ruiz",
      email: "carlos.ruiz@ejemplo.com",
      role: "viewer",
      avatar: "/placeholder.svg",
      initials: "CR",
      lastLogin: "2023-03-10 09:15",
      status: "inactive",
    },
    {
      id: 4,
      name: "Ana Martínez",
      email: "ana.martinez@ejemplo.com",
      role: "editor",
      avatar: "/placeholder.svg",
      initials: "AM",
      lastLogin: "2023-03-12 14:20",
      status: "active",
    },
    {
      id: 5,
      name: "Roberto Sánchez",
      email: "roberto.sanchez@ejemplo.com",
      role: "viewer",
      avatar: "/placeholder.svg",
      initials: "RS",
      lastLogin: "2023-02-28 11:05",
      status: "inactive",
    },
  ])

  const getRoleBadge = (role : RoleUser) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-500">Administrador</Badge>
      case "editor":
        return <Badge className="bg-blue-500">Editor</Badge>
      case "viewer":
        return <Badge className="bg-green-500">Visualizador</Badge>
      default:
        return <Badge>Desconocido</Badge>
    }
  }

  const getStatusBadge = (status : StatusUser) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Activo</Badge>
      case "inactive":
        return <Badge variant="outline">Inactivo</Badge>
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  return (
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
                      <td className="p-4">{getRoleBadge(user.role as RoleUser)}</td>
                      <td className="p-4">{getStatusBadge(user.status as StatusUser)}</td>
                      <td className="p-4">{user.lastLogin}</td>
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
                    {getStatusBadge(user.status as StatusUser)}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Rol:</span>
                      <span>{getRoleBadge(user.role as RoleUser)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Último acceso:</span>
                      <span className="text-sm">{user.lastLogin}</span>
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
  )
}

