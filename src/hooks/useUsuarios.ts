import { useState, useEffect, useCallback } from 'react';
import { User, RoleUser, StatusUser } from '@/types/index';
import { fetchUsers } from '@/services/index';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterRol, setFilterRol] = useState('todos');
  const [filterEstado, setFilterEstado] = useState('todos-status');

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUsers(search, filterRol, filterEstado);
      setUsers(data);
    } finally {
      setLoading(false);
    }
  }, [search, filterRol, filterEstado]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    search,
    setSearch,
    filterRol,
    setFilterRol,
    filterEstado,
    setFilterEstado,
    reloadUsers: loadUsers,
  };
};