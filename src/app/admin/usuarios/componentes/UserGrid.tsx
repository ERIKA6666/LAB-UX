import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Lock, Trash2 } from "lucide-react";
import { User } from "@/types/index";
import { RoleBadge, StatusBadge } from "./UserBadges";
import { getAvatarUrl, getInitials } from "@/services";
import { StatusUser, RoleUser } from "@/types";

interface UserGridProps {
  users: User[];
  onEdit: (user: User) => void;
  onDeactivate: (user: User) => void;
  onDelete: (user: User) => void;
}

export const UserGrid = ({ users, onEdit, onDeactivate, onDelete }: UserGridProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <Card key={user.ID}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={getAvatarUrl(user.avatar)}
                    alt={user.nombre}
                  />
                  <AvatarFallback>
                    {user.initials || getInitials(user.nombre)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{user.nombre}</CardTitle>
                  <CardDescription>{user.correo}</CardDescription>
                </div>
              </div>
              <StatusBadge status={user.estado as StatusUser} />
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Rol:</span>
                <span>
                  <RoleBadge role={user.tipo_usuario as RoleUser} />
                </span>
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
              size="sm"
              onClick={() => onEdit(user)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDeactivate(user)}
            >
              <Lock className="mr-2 h-4 w-4" />
              {user.estado === "activo" ? "Desactivar" : "Activar"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(user)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};