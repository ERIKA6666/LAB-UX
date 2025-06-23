import { useState } from "react";
import { User } from "@/types";

export const useUserForm = (initialUser?: Partial<User>) => {
  const [formData, setFormData] = useState<Partial<User>>({
    nombre: '',
    username: '',
    apellido: '',
    telefono: '',
    correo: '',
    tipo_usuario: 'alumno',
    estado: 'activo',
    password: '',
    foto: undefined,
    ...initialUser
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, estado: e.target.checked ? 'activo' : 'inactivo' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, foto: e.target.files![0] }));
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      username: '',
      apellido: '',
      telefono: '',
      correo: '',
      tipo_usuario: 'alumno',
      estado: 'activo',
      password: '',
      foto: undefined,
    });
    setConfirmPassword('');
  };

  return {
    formData,
    setFormData,
    confirmPassword,
    setConfirmPassword,
    handleInputChange,
    handleSelectChange,
    handleStatusChange,
    handleFileChange,
    resetForm,
  };
};