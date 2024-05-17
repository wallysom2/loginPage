// contexts/AuthContext.tsx
import { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';
import { loginService } from '../services/authService';
import { GoogleOAuthProvider } from '@react-oauth/google';

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

  console.log('authToken:', authToken);

  const login = async (email: string, password: string) => {
    try {
      const tokens = await loginService(email, password);
      localStorage.setItem('authToken', tokens.access);
      console.log('authToken:', tokens.access);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Erro ao fazer login. Por favor, tente novamente.');
    }
  };

  <GoogleOAuthProvider clientId="77257897780-4094murki6vb8uhdc5gss2q5d01hakph.apps.googleusercontent.com">
    ...
  </GoogleOAuthProvider>;

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
