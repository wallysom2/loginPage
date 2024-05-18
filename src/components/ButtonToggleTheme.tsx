import { useState, useEffect } from 'react';
import light from '../assets/images/light.svg';
import dark from '../assets/images/dark.svg';

type ButtonToggleThemeProps = {
  className?: string;
};

const ButtonToggleTheme: React.FC<ButtonToggleThemeProps> = ({ className }) => {
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains('dark'),
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleClick = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute left-10 top-0 m-2 w-[50px] rounded-[18px] bg-blue-100 p-3 opacity-60 shadow-outline ${className} `}
    >
      <img src={darkMode ? light : dark} alt="theme icon" />
    </button>
  );
};

export default ButtonToggleTheme;
