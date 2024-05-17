// signIn.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from './SignIn';

describe('SignIn', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <Router>
          <SignIn />
        </Router>,
      );
    }).not.toThrow();
  });
  it('renders the login button', () => {
    render(
      <Router>
        <SignIn />
      </Router>
    );
    const loginButton = screen.getByText('Sign In');
    expect(loginButton).toBeInTheDocument();
  });
});