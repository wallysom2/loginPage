import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest'; // Import vi from Vitest
import { useAuthContext, AuthProvider } from '../AuthContext';

// Mock localStorage
vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
});

// Mock loginService using Vitest
vi.mock('@/services/authService', () => ({
  loginService: vi.fn(),
}));

class LocalStorageMock {
  private store: { [key: string]: string } = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }
}

(global as any).localStorage = new LocalStorageMock();

// A simple test component to use the AuthContext
const TestComponent = () => {
  const { authToken, errorMessage, login, logout } = useAuthContext();

  return (
    <div>
      <p data-testid="authToken">{authToken}</p>
      <p data-testid="errorMessage">{errorMessage}</p>
      <button
        onClick={() => login('test@example.com', 'password')}
        data-testid="loginButton"
      >
        Login
      </button>
      <button onClick={logout} data-testid="logoutButton">
        Logout
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  test('logout clears authToken', async () => {
    localStorage.setItem('authToken', 'someAuthToken');

    const { rerender } = render(
      // Use 'rerender' for forced updates
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(screen.getByTestId('authToken').textContent).toBe('someAuthToken'); // Check initial value

    fireEvent.click(screen.getByTestId('logoutButton'));

    await waitFor(() => {
      // Wait for async updates and state change
      // Force re-render to update the UI after state change
      rerender(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );
    });

    expect(localStorage.getItem('authToken')).toBe(null);
    expect(screen.getByTestId('authToken').textContent).toBe(''); // Check after logout
  });
});
