import React from "react";

import { CheckIcon } from "./Icons";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";


const Header: React.FC = () => {
	return (
		<header className={styles.Header}>
			<Link to="/" className={styles.logo}>
				<div>
					{CheckIcon}
					<span>
						ToDo App
					</span>
				</div>
			</Link>
			<nav className={styles.nav}>
				<Link to="/">
					Home
				</Link>
				<Link to="/sobre">
					Sobre
				</Link>
			</nav>
		</header>
	);
};

export default Header;
