import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
	CheckIcon,
	MenuIcon,
	CloseIcon,
	MoonIcon,
	SunIcon
} from '../Icons';
import styles from './styles/Header.module.css';
import useTheme from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
	const { user, logout } = useAuth();
	const [theme, setTheme] = useTheme();
	const [sideNav, setSideNav] = useState<boolean>(false);

	return (
		<header className={styles.Header}>
			<Link to='/' className={styles.logo}>
				<div>
					{CheckIcon}
					<span>
						ToDo App
					</span>
				</div>
			</Link>
			<div className={styles.buttonContainer}>
				<button
					className='p-0 sm:mr-4' aria-label='Change theme'
					onClick={() => theme === 'light' ? setTheme('dark') : setTheme('light')}
				>
					{theme === 'light' ? (MoonIcon) : (SunIcon)}
				</button>
				<button
					aria-label='Open mobile navbar'
					onClick={() => setSideNav(!sideNav)}
				>
					{MenuIcon}
				</button>
			</div>
			{
				!sideNav ? (
					<nav className={styles.nav}>
						<button
							className='p-0 sm:mr-4' aria-label='Change theme'
							onClick={() => theme === 'light' ? setTheme('dark') : setTheme('light')}
						>
							{theme === 'light' ? (MoonIcon) : (SunIcon)}
						</button>
						<Link to='/'>
							Inicio
						</Link>
						<Link to='/sobre'>
							Sobre
						</Link>
						{user ? (
							<Link to='/login' onClick={() => { if (logout) logout(); }} >
								Sair
							</Link>
						) : (
							<Link to='/login'>
								Login
							</Link>
						)}
					</nav>
				) : (
					<div className={styles.sideNav}>
						<div>
							<button
								aria-label='Close mobile navbar'
								onClick={() => setSideNav(!sideNav)}
							>
								{CloseIcon}
							</button>
						</div>
						<nav>
							<Link to='/' onClick={() => setSideNav(!sideNav)}>
								Inicio
							</Link>
							<Link to='/sobre' onClick={() => setSideNav(!sideNav)}>
								Sobre
							</Link>
							{user ? (
								<Link to='/login' onClick={() => { if (logout) logout(); }} >
									Sair
								</Link>
							) : (
								<Link to='/login' onClick={() => setSideNav(!sideNav)}>
									Login
								</Link>
							)}
						</nav>
					</div>
				)
			}
		</header >
	);
};

export default Header;
