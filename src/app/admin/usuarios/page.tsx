"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus } from "lucide-react";
import { User } from "@/types";
import { useUsers } from "@/hooks/useUsuarios";
import { UserTable } from "../usuarios/componentes/UserTable";
import { UserFilters } from "../usuarios/componentes/UserFilters";
import { Dialogs } from "../usuarios/componentes/Dialogs";

export default function UsuariosPage() {
  const {
    users,
    loading,
    //search,
    setSearch,
    filterRol,
    setFilterRol,
    filterEstado,
    setFilterEstado,
    showSuccessMessage,
    //setShowSuccessMessage,
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,
  } = useUsers();

  const [searchInput, setSearchInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deactivatingUser, setDeactivatingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo Usuario
          </Button>
        </div>
      </div>

      <UserFilters
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearch={setSearch}
        filterRol={filterRol}
        setFilterRol={setFilterRol}
        filterEstado={filterEstado}
        setFilterEstado={setFilterEstado}
      />

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Lista de Usuarios</TabsTrigger>
          <TabsTrigger value="grid">Vista de Tarjetas</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <UserTable
                users={users}
                loading={loading}
                onEdit={setEditingUser}
                onDeactivate={setDeactivatingUser}
                onDelete={setDeletingUser}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grid" className="space-y-4">
<<<<<<< HEAD
          {/* Implementar vista de tarjetas si es necesario */}
          <div className="text-center py-10">Vista de tarjetas no implementada</div>
=======
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <Card key={user.ID}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={
                            user.avatar
                              ? typeof user.avatar === "string"
                                ? `${API_URL}/uploads/${user.avatar}`
                                : URL.createObjectURL(user.avatar)
                              : user.foto
                                ? typeof user.foto === "string"
                                  ? `${API_URL}/uploads/${user.foto}`
                                  : URL.createObjectURL(user.foto)
                                : undefined
                          }
                          alt={user.nombre}
                        />
                        <AvatarFallback>{user.initials || getInitials(user.nombre)}</AvatarFallback>
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
                    variant="ghost" 
                    size="icon" 
                    className="mr-2"
                    onClick={() => setEditingUser(user)}
                  >
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setDeactivatingUser(user)}>
                    <Lock className="mr-2 h-4 w-4" />
                    Desactivar Usuario
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
>>>>>>> 4eba93b (usuarios v3)
        </TabsContent>
      </Tabs>

      <Dialogs
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        deactivatingUser={deactivatingUser}
        setDeactivatingUser={setDeactivatingUser}
        deletingUser={deletingUser}
        setDeletingUser={setDeletingUser}
        onSubmitUser={handleAddUser}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
        isSubmitting={loading}
      />

      {showSuccessMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          {showSuccessMessage}
        </div>
      )}
    </div>
  );
}