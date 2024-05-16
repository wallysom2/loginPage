// components/Input.tsx
import { ChangeEvent, FC } from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="focus:shadow-outline mb-9 mt-2 h-[54.25px] w-[345.88px] gap-[13.5px] rounded-[9px] bg-[rgba(241,241,241,1)] p-[18px] pb-[20.25px] text-gray-700 shadow focus:outline-none"
  />
);
