import { useEffect } from 'react';
import usePersistentState from './usePersistentState';

const useTheme = () => {
  const [theme, setTheme] = usePersistentState<'light' | 'dark'>('theme', 'light');

  useEffect(() => {
    const root = document.querySelector('html');
    root?.classList.remove('light', 'dark');
    root?.classList.add(theme);
  }, [theme]);

  return [theme, setTheme] as const;
};

export default useTheme;
