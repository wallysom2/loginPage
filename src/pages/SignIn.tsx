import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import b2bitLogo from '../assets/images/b2bit-logo.svg';
import GoogleButton from '../components/ButtonGoogle';
import * as Yup from 'yup';
import { LoginForm } from '../components/FormLogin';
import ButtonToggleTheme from '../components/ButtonToggleTheme';

const Login = () => {
  const { handleLogin, errorMessage, authToken } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  interface FormValues {
    email: string;
    password: string;
  }

  const onSubmit = async (values: FormValues) => {
    if (values.email && values.password) {
      await handleLogin(values.email, values.password);
    }
  };

  useEffect(() => {
    if (authToken) {
      navigate('/profile');
    }
  }, [authToken, navigate]);

  return (
    <div className="flex min-h-screen min-w-full items-center justify-center bg-whitegray dark:bg-gradiente">
      <ButtonToggleTheme className="absolute left-0 top-0 m-12" />{' '}
      <div
        className="flex h-[620px] w-[438px] flex-col items-center rounded-[18px] bg-white p-12"
        style={{ boxShadow: '0px 0px 64px 0px rgba(0, 0, 0, 0.25)' }}
      >
        <img
          src={b2bitLogo}
          alt="B2Bit Logo"
          className="md-6 relative mb-8 h-[94.81px] w-[309.6px]"
        />
        <LoginForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          errorMessage={errorMessage}
        />
        <GoogleButton />
      </div>
    </div>
  );
};

export default Login;

//<html lang="en" class="dark">
