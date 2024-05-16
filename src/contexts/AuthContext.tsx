// contexts/AuthContext.tsx
import { createContext, useContext } from 'react';
import { ReactNode } from 'react';
import { loginService } from '../services/authService';



interface AuthContextType {
  authToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps { 
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const authToken = localStorage.getItem('authToken');

  const login = async (email: string, password: string) => {
    try {
      const tokens = await loginService(email, password);
      localStorage.setItem('authToken', tokens.access);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
