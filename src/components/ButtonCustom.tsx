// CustomButton.tsx
import { FC } from 'react';
import { ButtonProps } from '@/types/userTypes';

const CustomButton: FC<ButtonProps> = ({ label, ...props }) => (
  <button
    type="submit"
    className="mb-2 me-2 mt-2 h-[54px] w-[385.88px] rounded-[9px] bg-[rgba(2,39,79,1)] px-5 py-2.5 text-center font-nunito text-[18px] text-sm font-semibold text-white transition duration-300 ease-out hover:bg-blue-700 focus:ring-yellow-300 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 dark:focus:ring-yellow-900"
    {...props}
  >
    {label}
  </button>
);

export default CustomButton;
