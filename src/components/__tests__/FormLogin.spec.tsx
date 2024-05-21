import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { LoginForm } from '../FormLogin';

describe('LoginForm', () => {
  const initialValues = { email: '', password: '' };
  const validationSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Required'),
    password: yup.string().required('Required'),
  });
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the login form with email and password fields', () => {
    render(
      <Formik initialValues={initialValues} onSubmit={mockOnSubmit}>
        <LoginForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={mockOnSubmit}
        />
      </Formik>,
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('displays validation errors for empty fields', async () => {
    render(
      <Formik initialValues={initialValues} onSubmit={mockOnSubmit}>
        <LoginForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={mockOnSubmit}
        />
      </Formik>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      const errorElements = screen.getAllByText(/Required/i);
      expect(errorElements).toHaveLength(2);
    });
  });

  it('displays error message when provided', async () => {
    render(
      <Formik initialValues={initialValues} onSubmit={mockOnSubmit}>
        <LoginForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={mockOnSubmit}
          errorMessage="Authentication failed"
        />
      </Formik>,
    );

    expect(screen.getByText('Authentication failed')).toBeInTheDocument();
  });

  it('does not display error message initially', async () => {
    render(
      <Formik initialValues={initialValues} onSubmit={mockOnSubmit}>
        <LoginForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={mockOnSubmit}
        />
      </Formik>,
    );

    const errorMessageElement = screen.getByTestId('query-error-message');
    expect(errorMessageElement).toHaveClass('invisible'); // Verifica se a mensagem de erro está oculta inicialmente
  });
});
