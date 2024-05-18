// Gprofile.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import GoogleProfile from './GoogleProfile';

describe('Gprofile', () => {
  it('displays the user email', () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/',
            state: { user: { name: 'Test User', email: 'test@example.com' } },
          },
        ]}
      >
        <GoogleProfile />
      </MemoryRouter>,
    );
    const userEmailElement = screen.getByText('test@example.com');
    expect(userEmailElement).toBeInTheDocument();
  });

  it('renders without crashing when user state is not provided', () => {
    expect(() => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <GoogleProfile />
        </MemoryRouter>,
      );
    }).not.toThrow();
  });

  it('does not display the user name when user state is not provided', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <GoogleProfile />
      </MemoryRouter>,
    );
    const userNameElement = screen.queryByText('Test User');
    expect(userNameElement).not.toBeInTheDocument();
  });
});
