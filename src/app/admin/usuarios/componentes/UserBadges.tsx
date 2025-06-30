import { Badge } from "@/components/ui/badge";
import { RoleUser, StatusUser } from "@/types";

export const RoleBadge = ({ role }: { role: RoleUser }) => {
  switch (role) {
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

export const StatusBadge = ({ status }: { status: StatusUser }) => {
  switch (status) {
    case "activo":
      return <Badge className="bg-green-500">Activo</Badge>;
    case "inactivo":
      return <Badge variant="outline">Inactivo</Badge>;
    default:
      return <Badge variant="outline">Desconocido</Badge>;
  }
};