import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { CheckIcon, MenuIcon, CloseIcon } from './Icons';
import styles from './Header.module.css';


const Header: React.FC = () => {

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
			<button
				className={styles.navButton} aria-label='Open mobile navbar'
				onClick={() => setSideNav(!sideNav)}
			>
				{MenuIcon}
			</button>
			{
				!sideNav ? (
					<nav className={styles.nav}>
						<Link to='/'>
							Home
						</Link>
						<Link to='/sobre'>
							Sobre
						</Link>
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
								Home
							</Link>
							<Link to='/sobre' onClick={() => setSideNav(!sideNav)}>
								Sobre
							</Link>
						</nav>
					</div>
				)
			}
		</header>
	);
};

export default Header;
