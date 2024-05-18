// contexts/AuthContext.tsx
import { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';
import { loginService } from '../services/authService';

interface AuthContextType {
  authToken: string | null;
  errorMessage: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const authToken = localStorage.getItem('authToken');
  const [errorMessage, setErrorMessage] = useState('');

  const login = async (email: string, password: string) => {
    try {
      const tokens = await loginService(email, password);
      localStorage.setItem('authToken', tokens.access);
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Error logging in. Invalid data.');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ authToken, errorMessage, login, logout }}>
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
