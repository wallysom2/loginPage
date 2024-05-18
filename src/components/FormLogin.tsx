import { Formik, Form } from 'formik';
import CustomButton from './ButtonCustom';
import { CustomField } from './FieldCustom';

interface LoginFormProps {
  initialValues: { email: string; password: string };
  validationSchema: any;
  onSubmit: (values: { email: string; password: string }) => void;
  errorMessage: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  errorMessage,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ errors, touched }) => (
      <Form>
        <CustomField
          type="text"
          id="email"
          name="email"
          placeholder="@gmail.com"
          label="Email"
          errors={errors}
          touched={touched}
        />
        <CustomField
          type="password"
          id="password"
          name="password"
          placeholder="********"
          label="Password"
          errors={errors}
          touched={touched}
        />
        <CustomButton type="submit" label="Sign In"></CustomButton>
        <div
          className={`pt-1 text-center text-sm text-red-500 ${
            errorMessage ? 'visible' : 'invisible'
          }`}
        >
          {errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <p style={{ color: 'transparent' }}>Error</p>
          )}
        </div>
      </Form>
    )}
  </Formik>
);
