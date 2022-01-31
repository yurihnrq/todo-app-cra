import { useEffect, useState } from 'react';

const useTheme = () => {


	const [theme, setTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		if (window) {
			if (localStorage.getItem('theme') === 'dark')
				setTheme('dark');
			else
				setTheme('light');
		}
	}, []);

	useEffect(() => {
		const root = document.querySelector('html');

		if (window) {
			if (theme === 'dark') {
				localStorage.setItem('theme', 'dark');
				root?.classList.add('dark');
			} else {
				localStorage.setItem('theme', 'light');
				root?.classList.remove('dark');
			}
		}
	}, [theme]);

	return [theme, setTheme] as const;

};

export default useTheme;
