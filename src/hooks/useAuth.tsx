// hooks/useAuth.tsx
import { useState } from 'react';
import { loginService } from '../services/authService';

export const useAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [authToken, setAuthToken] = useState<string | null>(null);

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      const tokens = await loginService(email, password);
      localStorage.setItem('authToken', tokens.access);
      setAuthToken(tokens.access);
      console.log('authToken:', tokens.access);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Erro ao fazer login. Por favor, tente novamente.');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    errorMessage,
    authToken,
  };
};
