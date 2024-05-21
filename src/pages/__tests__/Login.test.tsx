import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    handleLogin: vi.fn(),
    errorMessage: null,
    authToken: null,
  }),
}));

vi.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({ darkMode: false }),
}));

test('renders login form and elements correctly', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
  });

  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  expect(screen.getByAltText(/B2Bit Logo/i)).toBeInTheDocument();
});
