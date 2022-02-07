import React from 'react';
import Footer from './Footer';
import Header from './Header';
import styles from './styles/Layout.module.css';

const Layout: React.FC = ({ children }) => {
	return (
		<div className={styles.Layout}>
			<Header />
			<main className={styles.content}>
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
