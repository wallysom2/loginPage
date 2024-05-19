import { ButtonHTMLAttributes } from 'react';
import { ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

interface CustomFieldProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  label: string;
  errors: any;
  touched: any;
}

interface LoginFormProps {
  initialValues: { email: string; password: string };
  validationSchema: any;
  onSubmit: (values: { email: string; password: string }) => void;
  errorMessage: string;
}

interface AuthContextType {
  authToken: string | null;
  errorMessage: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export type { ButtonProps, CustomFieldProps, LoginFormProps, AuthContextType, AuthProviderProps };