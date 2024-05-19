import { useState, useEffect } from 'react';
import light from '../assets/images/light.svg';
import dark from '../assets/images/dark.svg';

type ButtonToggleThemeProps = {
  className?: string;
};

const ButtonToggleTheme: React.FC<ButtonToggleThemeProps> = ({ className }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleClick = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute left-10 top-0 m-2 w-[50px] rounded-[18px] bg-blue-100 p-3 opacity-75 shadow-outline ${className} `}
    >
      <img src={darkMode ? light : dark} alt="theme icon" />
    </button>
  );
};

export default ButtonToggleTheme;
