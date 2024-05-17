// Profile.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Profile from './Profile';

describe('Profile', () => {
  it('renders without crashing when profile is not provided', () => {
    expect(() => {
      render(
        <MemoryRouter>
          <Profile />
        </MemoryRouter>,
      );
    }).not.toThrow();
  });

  it('does not display the profile name when profile is not provided', () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );
    const profileNameElement = screen.queryByText('Name');
    expect(profileNameElement).not.toBeInTheDocument();
  });

  it('does not display the profile email when profile is not provided', () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );
    const profileEmailElement = screen.queryByText('Email');
    expect(profileEmailElement).not.toBeInTheDocument();
  });
});