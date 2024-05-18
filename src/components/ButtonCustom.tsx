import { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const CustomButton: FC<ButtonProps> = ({ label, ...props }) => (
  <button
    type="submit"
    className="mt-2 h-[54px] w-[385.88px] rounded-[9px] bg-[rgba(2,39,79,1)] text-center font-nunito text-[18px] font-semibold text-[rgba(250,250,250,1)] transition duration-300 ease-out hover:bg-blue-700 focus:shadow-outline focus:outline-none"
    {...props}
  >
    {label}
  </button>
);

export default CustomButton;
