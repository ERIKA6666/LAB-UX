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
  onSubmitUser: (data: Partial<User>) => Promise<void | boolean>;
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
       {/* Diálogo para crear/editar usuario */}
      <Dialog open={isDialogOpen || !!editingUser} onOpenChange={(open) => {
        if (!open) {
          setIsDialogOpen(false);
          setEditingUser(null);
        }
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
          </DialogHeader>
          <UserForm 
            initialData={editingUser || undefined}
            onSubmit={async (data) => {
              try {
                let success: boolean = false;
                if (editingUser) {
                  await onUpdateUser(editingUser.id, data);
                  success = true;
                } else {
                  const result = await onSubmitUser(data);
                  success = !!result;
                }
                
                if (success) {
                  setIsDialogOpen(false);
                  setEditingUser(null);
                }
                return success;
              } catch (error) {
                console.error("Error en el formulario:", error);
                return false;
              }
            }}
            isSubmitting={isSubmitting}
            isEdit={!!editingUser}
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