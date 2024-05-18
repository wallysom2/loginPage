import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { useAuth } from './useAuth';
import { loginService } from '../services/authService';

vi.mock('../services/authService');



  const MockComponent = () => {
    const { handleLogin, authToken, errorMessage } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  

  const handleClick = () => {
    handleLogin(email, password);
  };

  return (
    <div>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick}>Login</button>
      {authToken && <div>Logged in with token: {authToken}</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

describe('useAuth hook', () => {
  it('deve fazer login com sucesso', async () => {
    const mockLoginService = loginService as jest.Mock;
    const mockTokens = { access: 'mockAccessToken' };
    mockLoginService.mockResolvedValueOnce(mockTokens);

    render(<MockComponent />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(localStorage.getItem('authToken')).toBe('mockAccessToken');
      expect(screen.getByText('Logged in with token: mockAccessToken')).toBeInTheDocument();
    });
  });

  it('deve lidar com falha no login', async () => {
    const mockLoginService = loginService as jest.Mock;
    mockLoginService.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(<MockComponent />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('Error logging in. Invalid data.')).toBeInTheDocument();
    });
  });
});