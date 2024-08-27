// Definição do tipo User
export interface User {
    email: string;
    name: string;
  }
  
  // Definição do tipo Todo
  export interface Todo {
    title: string;
    done: boolean;
    id: string;
    userEmail: string;
  }
  