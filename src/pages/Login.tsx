import { Formik, Field, Form, FormikHelpers, FormikErrors } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
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
  const [formSubmitted, setFormSubmitted] = useState(false);

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
      <div
        className="flex h-[534px] w-[438px] flex-col items-center justify-center rounded-[18px]"
        style={{ boxShadow: '0px 0px 64px 0px rgba(0, 0, 0, 0.25)' }}
      >
        <img
          src={b2bitLogo}
          alt="B2Bit Logo"
          className="relative mb-8 h-[94.81px] w-[309.6px]"
        />
        <div className="flex h-[288px] w-[385.88px] flex-col items-center rounded-[9px]">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form className="mb-4 h-[54.25px] w-[385.88px] gap-[13.5px] rounded-tl-[9px] p-[18px] pb-[20.25px]">
                <label
                  htmlFor="email"
                  className="font-nunito text-left text-lg font-semibold leading-[22.5px] tracking-[0.03em] text-[#262626]"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="@gmail.com"
                  className="focus:shadow-outline mb-4 h-[54.25px] w-[345.88px] gap-[13.5px] rounded-[9px] bg-[rgba(241,241,241,1)] p-[18px] pb-[20.25px] text-gray-700 shadow focus:outline-none"
                />
                {formSubmitted && errors.email && <div>{errors.email}</div>}
                <label
                  htmlFor="password"
                  className="font-nunito text-left text-lg font-semibold leading-[22.5px] tracking-[0.03em] text-[#262626]"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="************"
                  className="focus:shadow-outline mb-4 h-[54.25px] w-[345.88px] gap-[13.5px] rounded-[9px] bg-[rgba(241,241,241,1)] p-[18px] pb-[20.25px] text-gray-700 shadow focus:outline-none"
                />
                {formSubmitted && errors.password && (
                  <div>{errors.password}</div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => setFormSubmitted(true)}
                  className="focus:shadow-outline font-nunito h-[54px] w-[345.88px] rounded-[9px] bg-[rgba(2,39,79,1)] text-center text-[18px] font-semibold text-[rgba(250,250,250,1)] transition duration-300 ease-out hover:bg-blue-700 focus:outline-none"
                >
                  Sign In
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
