import { FiMoon, FiSun } from 'react-icons/fi';
import { useDarkMode } from '@/hooks/useDarkMode';

export const DarkModeToggle = () => {
  const { isDark, toggle } = useDarkMode();
  
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? <FiMoon className="w-4 h-4" /> : <FiSun className="w-4 h-4" />}
    </button>
  );
};
