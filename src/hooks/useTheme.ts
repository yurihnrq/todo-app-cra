import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && storedTheme === 'dark') return 'dark';
    return 'light';
  });

  useEffect(() => {
    const root = document.querySelector('html');

    if (theme === 'dark') {
      localStorage.setItem('theme', 'dark');
      root?.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      root?.classList.remove('dark');
    }
  }, [theme]);

  return [theme, setTheme] as const;
};

export default useTheme;
