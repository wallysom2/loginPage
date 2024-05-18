import { useState } from 'react';
import light from '../assets/images/light.svg';
import dark from '../assets/images/dark.svg';

type ButtonToggleThemeProps = {
  className?: string;
};

const ButtonToggleTheme: React.FC<ButtonToggleThemeProps> = ({ className }) => {
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={handleClick}
      className={`w-[50px] bg-blue-100 rounded-[18px] p-3 shadow-outline ${className}`}    >
      <img src={darkMode ? dark : light} alt="theme icon" />
    </button>
  );
};

export default ButtonToggleTheme;