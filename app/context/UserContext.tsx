import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definição dos tipos
import { User, Todo } from './Types'; // Certifique-se de ajustar o caminho conforme necessário

// Tipo do contexto
interface UserContextType {
  user: User | null;
  todos: Todo[];
  setUser: (user: User | null) => void;
  setTodos: (todos: Todo[]) => void;
}

// Criação do contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Criação do Provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <UserContext.Provider value={{ user, todos, setUser, setTodos }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acessar o contexto
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
