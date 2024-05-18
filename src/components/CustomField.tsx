import { Field, ErrorMessage } from 'formik';

interface CustomFieldProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  label: string;
  errors: any;
  touched: any;
}

export const CustomField: React.FC<CustomFieldProps> = ({
  type,
  id,
  name,
  placeholder,
  label,
  errors,
  touched,
}) => (
  <>
    <label
      htmlFor={id}
      className="text-left font-nunito text-lg font-semibold leading-[22.5px] tracking-[0.03em] text-[#262626]"
    >
      {label}
    </label>
    <Field
      type={type}
      id={id}
      name={name}
      className={`mt-2 h-[54px] w-[385px] flex-col gap-[13.5px] rounded-[9px] bg-[rgba(241,241,241,1)] p-[18px] pb-[20.25px] text-gray-700 shadow focus:outline-none ${
        errors[name] && touched[name] ? 'border-2 border-red-200' : ''
      }`}
      placeholder={placeholder}
    />
    <div
      className={`mb-4 pr-4 pt-1 text-end text-sm text-red-500 ${
        errors[name] && touched[name] ? 'visible' : 'invisible'
      }`}
    >
      {errors[name] && touched[name] ? (
        <ErrorMessage name={name} component="div" />
      ) : (
        <div style={{ color: 'transparent' }}>Error</div>
      )}
    </div>
  </>
);
