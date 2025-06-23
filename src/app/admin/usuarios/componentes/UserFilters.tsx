"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
//import { Button } from "@/components/ui/button";

interface UserFiltersProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  setSearch: (value: string) => void;
  filterRol: string;
  setFilterRol: (value: string) => void;
  filterEstado: string;
  setFilterEstado: (value: string) => void;
}

export const UserFilters = ({
  searchInput,
  setSearchInput,
  setSearch,
  filterRol,
  setFilterRol,
  filterEstado,
  setFilterEstado,
}: UserFiltersProps) => {
  return (
    <div className="flex items-center space-x-2">
      <form
        onSubmit={e => {
          e.preventDefault();
          setSearch(searchInput);
        }}
        className="relative flex-1 max-w-sm"
      >
        <Search
          className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
          onClick={() => setSearch(searchInput)}
          tabIndex={0}
          aria-label="Buscar"
          role="button"
        />
        <Input
          type="search"
          placeholder="Buscar usuarios..."
          className="pl-8"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              setSearch(searchInput);
            }
          }}
        />
      </form>
      <Select value={filterRol} onValueChange={setFilterRol}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por rol" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos los roles</SelectItem>
          <SelectItem value="admin">Administrador</SelectItem>
          <SelectItem value="alumno">Alumno</SelectItem>
          <SelectItem value="profesor">Profesor</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filterEstado} onValueChange={setFilterEstado}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos-status">Todos los estados</SelectItem>
          <SelectItem value="activo">Activo</SelectItem>
          <SelectItem value="inactivo">Inactivo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};