"use client";

import { Proyecto } from "@/types/proyecto";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/formatDate";

interface ProjectListProps {
  projects: Proyecto[];
  loading: boolean;
  onEdit: (project: Proyecto) => void;
  onDelete: (id: number) => void;
}

export default function ProjectList({ projects, loading, onEdit, onDelete }: ProjectListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">Cargando proyectos...</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">No se encontraron proyectos</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nombre</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha Inicio</TableHead>
            <TableHead>Fecha Fin</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.ID}>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{project.nombre}</span>
                  <span className="text-sm text-muted-foreground line-clamp-1">
                    {project.descripcion}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={
                    project.estado === 'completado' ? 'default' :
                    project.estado === 'en_progreso' ? 'default' :
                    project.estado === 'cancelado' ? 'destructive' : 'secondary'
                  }
                >
                  {project.estado}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(project.fecha_inicio)}</TableCell>
              <TableCell>{formatDate(project.fecha_fin)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onEdit(project)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => onDelete(project.ID)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}