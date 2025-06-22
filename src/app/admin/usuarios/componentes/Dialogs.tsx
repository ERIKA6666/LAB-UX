"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "@/types/index";
import { UserForm } from "./UserForm";

interface DialogsProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  editingUser: User | null;
  setEditingUser: (user: User | null) => void;
  deactivatingUser: User | null;
  setDeactivatingUser: (user: User | null) => void;
  deletingUser: User | null;
  setDeletingUser: (user: User | null) => void;
  onSubmitUser: (data: Partial<User>) => Promise<void>;
  onUpdateUser: (id: number, data: Partial<User>) => Promise<void>;
  onDeleteUser: (id: number) => Promise<void>;
  isSubmitting: boolean;
}

export const Dialogs = ({
  isDialogOpen,
  setIsDialogOpen,
  editingUser,
  setEditingUser,
  deactivatingUser,
  setDeactivatingUser,
  deletingUser,
  setDeletingUser,
  onSubmitUser,
  onUpdateUser,
  onDeleteUser,
  isSubmitting,
}: DialogsProps) => {
  return (
    <>
      {/* Dialogo para crear nuevo usuario */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Usuario</DialogTitle>
            <DialogDescription>
              Complete la información para crear un nuevo usuario en el sistema.
            </DialogDescription>
          </DialogHeader>
          <UserForm 
            onSubmit={onSubmitUser} 
            isSubmitting={isSubmitting} 
          />
        </DialogContent>
      </Dialog>

      {/* Dialogo para editar usuario */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription>
              Modifique la información del usuario {editingUser?.nombre}.
            </DialogDescription>
          </DialogHeader>
          <UserForm 
            initialData={editingUser || undefined} 
            onSubmit={(data) => editingUser ? onUpdateUser(editingUser.id, data) : Promise.resolve()} 
            isSubmitting={isSubmitting} 
            isEdit
          />
        </DialogContent>
      </Dialog>

      {/* Dialogo para desactivar/activar usuario */}
      <Dialog open={!!deactivatingUser} onOpenChange={() => setDeactivatingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {deactivatingUser?.estado === "activo" ? "Desactivar" : "Activar"} Usuario
            </DialogTitle>
            <DialogDescription>
              ¿Está seguro que desea {deactivatingUser?.estado === "activo" ? "desactivar" : "activar"} al usuario{" "}
              {deactivatingUser?.nombre}? {" "}
              {deactivatingUser?.id}? 
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
                  await onUpdateUser(deactivatingUser.id, { estado: newStatus });
                  setDeactivatingUser(null);
                }
              }}
            >
              {deactivatingUser?.estado === "activo" ? "Desactivar" : "Activar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo para eliminar usuario */}
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
                  await onDeleteUser(deletingUser.id);
                  setDeletingUser(null);
                }
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};