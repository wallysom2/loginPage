import { render, screen } from '@testing-library/react';
import { GoogleProfile } from '../GoogleProfile';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
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

test('renders GoogleProfile correctly', () => {
  // Mock user data for testing
  const user = {
    picture: 'profile_picture_url',
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  localStorage.setItem('user', JSON.stringify(user));

  render(<GoogleProfile />);

  expect(screen.getByText('Logout')).toBeInTheDocument();
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Email')).toBeInTheDocument();
});
