import { render, screen } from '@testing-library/react';
import Profile from '../Profile';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('@/hooks/useProfile', () => ({
  useProfile: () => ({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: {
      image_high_url: 'high_quality_image_url',
      image_medium_url: 'medium_quality_image_url',
      image_low_url: 'low_quality_image_url',
    },
  }),
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

test('renders Profile correctly', () => {
  render(<Profile />);

  expect(screen.getByText('Logout')).toBeInTheDocument();
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Email')).toBeInTheDocument();
});
