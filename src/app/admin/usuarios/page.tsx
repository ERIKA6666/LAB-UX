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
          {/* Implementar vista de tarjetas si es necesario */}
          <div className="text-center py-10">Vista de tarjetas no implementada</div>
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