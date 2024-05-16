// hooks/useAuth.tsx
import { useState } from 'react';
import { loginService } from '../services/authService';

export const useAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const tokens = await loginService(email, password);
      localStorage.setItem('authToken', tokens.access);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return { email, setEmail, password, setPassword, handleLogin };
};