import { useState } from 'react';
import { loginService } from '../services/authService';

export const useAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [authToken, setAuthToken] = useState<string | null>(null);


  const handleLogin = async (email: string, password: string) => {
    setErrorMessage('');
    try {
      const tokens = await loginService(email, password);
      localStorage.setItem('authToken', tokens.access);
      setAuthToken(tokens.access);
    } catch (error) {
      setErrorMessage('Error logging in. Invalid data.');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    errorMessage,
    setErrorMessage,
    authToken,
  };
};
