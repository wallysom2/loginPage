// ButtonToggleTheme.tsx
import { useTheme } from '@/contexts/ThemeContext';
import lightIcon from '@/assets/images/icon-light-theme.svg';
import darkIcon from '@/assets/images/icon-dark-theme.svg';

type ButtonToggleThemeProps = {
  className?: string;
};

const ButtonToggleTheme: React.FC<ButtonToggleThemeProps> = ({ className }) => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`absolute left-10 top-0 m-2 w-[50px] rounded-[18px] bg-blue-100 p-3 opacity-75 shadow-outline ${className} `}
    >
      <img src={darkMode ? lightIcon : darkIcon} alt="theme icon" />
    </button>
  );
};

export default ButtonToggleTheme;
