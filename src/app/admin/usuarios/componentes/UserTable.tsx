"use client";

import { User } from "@/types/index";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Lock, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UserTableProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDeactivate: (user: User) => void;
  onDelete: (user: User) => void;
}

export const UserTable = ({ users, loading, onEdit, onDeactivate, onDelete }: UserTableProps) => {
  const getInitials = (nombre: string = "") => {
    const partes = nombre.trim().split(" ");
    if (partes.length === 1) return partes[0][0]?.toUpperCase() || "";
    return (
      (partes[0][0] || "") +
      (partes[partes.length - 1][0] || "")
    ).toUpperCase();
  };

  const getRoleBadge = (tipo_usuario: string) => {
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

  const getStatusBadge = (estado: string | undefined) => {
    switch (estado) {
      case "activo":
        return <Badge className="bg-green-500">Activo</Badge>;
      case "inactivo":
        return <Badge variant="outline">Inactivo</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-lg">Cargando usuarios...</div>;
  }

  if (users.length === 0) {
    return <div className="text-center py-10 text-muted-foreground">No hay usuarios para mostrar.</div>;
  }

  return (
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
        {users.map((user, idx) => (
          <tr key={user.ID ?? idx} className="border-b">
            <td className="p-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>{getInitials(user.nombre)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm text-muted-foreground">{user.nombre}</div>
                  <div className="text-sm text-muted-foreground">{user.correo}</div>
                </div>
              </div>
            </td>
            <td className="p-4">{getRoleBadge(user.tipo_usuario)}</td>
            <td className="p-4">{getStatusBadge(user.estado)}</td>
            <td className="p-4">{user.fecha_registro}</td>
            <td className="p-4 text-right">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2"
                onClick={() => onEdit(user)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2"
                onClick={() => onDeactivate(user)}
              >
                <Lock className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onDelete(user)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};