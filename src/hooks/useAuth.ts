import { useState, useEffect } from 'react';
import { loginService } from '../services/authService';

export const useAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [authToken, setAuthToken] = useState<string | null>(() =>
    localStorage.getItem('authToken'),
  );

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

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleLogout,
    errorMessage,
    setErrorMessage,
    authToken,
  };
};
