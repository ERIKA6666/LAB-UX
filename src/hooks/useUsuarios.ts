import { useState, useEffect } from "react";
import { User} from "@/types";
import { fetchUsers, addUser, deleteUser, updateUser } from "@/services/index";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterRol, setFilterRol] = useState("todos");
  const [filterEstado, setFilterEstado] = useState("todos-status");
  const [showSuccessMessage, setShowSuccessMessage] = useState("");

  const reloadUsers = async () => {
    setLoading(true);
    const data = await fetchUsers(search, filterRol, filterEstado);
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    reloadUsers();
  }, [search, filterRol, filterEstado]);

  const handleAddUser = async (userData: Partial<User>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value as string | Blob);
        }
      });
      const newUser = await addUser(formData);
      if (newUser) {
        await reloadUsers();
        setShowSuccessMessage("Usuario creado correctamente");
        return newUser;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (id: number, userData: Partial<User>) => {
    setLoading(true);
    try {
          const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value as string | Blob);
      }
    });
      const updated = await updateUser(id, formData);
      if (updated) {
        await reloadUsers();
        setShowSuccessMessage("Usuario actualizado correctamente");
        return updated;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    setLoading(true);
    try {
      await deleteUser(id);
      await reloadUsers();
      setShowSuccessMessage("Usuario eliminado correctamente");
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    search,
    setSearch,
    filterRol,
    setFilterRol,
    filterEstado,
    setFilterEstado,
    showSuccessMessage,
    setShowSuccessMessage,
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,
    reloadUsers,
  };
};