//Esto es un ejemplo 

//interface y props para un usuario
export interface User {
    id: number;
    name: string;
    email: string;
  }
  
// metodos
  export interface CreateUserRequest {
    name: string;
    email: string;
  }
  
  export interface CreateUserResponse {
    success: boolean;
    user?: User;
    error?: string;
  }