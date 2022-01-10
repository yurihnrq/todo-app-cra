import React from "react";

import { CheckIcon } from "./Icons";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";


const Header = () => {
	return (
		<header className={styles.Header}>
			<div className={styles.logo}>
				{CheckIcon}
				<Link to="/">
					<span>
						ToDo App
					</span>
				</Link>
			</div>
			<nav className={styles.nav}>
				<Link className={styles.link} to="/">
					<span>Home</span>
				</Link>
				<Link className={styles.link} to="/sobre">
					<span>Sobre</span>
				</Link>
			</nav>
		</header>
	);
};

export default Header;
