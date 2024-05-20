import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { LoginForm } from '@/components/FormLogin';
import GoogleButton from '@/components/ButtonGoogle';
import FacebookButton from '@/components/ButtonFacebook';
import ButtonToggleTheme from '@/components/ButtonToggleTheme';
import b2bitLogo from '@images/b2bit-logo.svg';
import b2bitLogoWhite from '@images/b2bit-logo-light.svg';

const Login = () => {
  const { handleLogin, errorMessage, authToken } = useAuth();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

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
  const [logo, setLogo] = useState(b2bitLogo);
  useEffect(() => {
    setLogo(darkMode ? b2bitLogoWhite : b2bitLogo);
  }, [darkMode]);

  useEffect(() => {
    if (authToken) {
      navigate('/profile');
    }
  }, [authToken, navigate]);

  return (
    <div className="flex min-h-screen min-w-full items-center justify-center bg-whitegray dark:bg-bgdarkcard">
      <ButtonToggleTheme className="absolute top-10" />
      {''}
      <div
        className="flex h-[620px] w-[438px] flex-col items-center justify-items-center rounded-[18px] bg-[#ffffff] p-12 dark:bg-gradiente"
        style={{ boxShadow: '0px 0px 64px 0px rgba(0, 0, 0, 0.25)' }}
      >
        <img
          src={logo}
          alt="B2Bit Logo"
          className="md-6 relative mb-8 h-[94.81px] w-[309.6px]"
        />
        <LoginForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          errorMessage={errorMessage}
        />
        <div className="ml-[-8px] mt-[-10px] flex w-[385px] items-stretch justify-between self-auto">
          <GoogleButton />
          <FacebookButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
