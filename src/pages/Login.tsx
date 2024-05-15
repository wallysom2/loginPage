import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FormikHelpers,
  FormikErrors,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import b2bitLogo from '../assets/images/b2bit-logo.svg';

interface LoginValues {
  email: string;
  password: string;
}
interface FormikErrorWithAPI extends FormikErrors<LoginValues> {
  api?: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('Este campo é obrigatório.'),
  password: Yup.string().required('Este campo é obrigatório.'),
});

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting, setErrors }: FormikHelpers<LoginValues>,
  ) => {
    try {
      const response = await axios.post(
        'https://api.homologation.cliqdrive.com.br/auth/login/',
        values,
      );
      localStorage.setItem('access_token', response.data.tokens.access);
      navigate('/profile');
    } catch (error) {
      setErrors({ api: 'E-mail ou senha inválidos.' } as FormikErrorWithAPI);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen min-w-full items-center justify-center">
      <div className="flex h-[534px] w-[438px] flex-col items-center space-y-0 rounded-tl-lg p-[55px] pb-[40.13px] pl-[25.88px] pt-[26.25px] shadow-2xl shadow-md">
        <img
          src={b2bitLogo}
          alt="B2Bit Logo"
          className="relative -left-2 top-[10.59px] h-[94.81px] w-[309.6px]"
        />{' '}
        <div className="flex flex-col items-center">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form className="mb-4 rounded bg-white px-8 pb-8 pt-6 ">
                <Field
                  type="email"
                  name="email"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <ErrorMessage name="email" component="div" />
                <Field
                  type="password"
                  name="password"
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <ErrorMessage name="password" component="div" />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                >
                  Entrar
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
