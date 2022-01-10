import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.css";

interface ILayout {
	children: React.ReactNode
}

const Layout = ({ children }: ILayout) => {
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
