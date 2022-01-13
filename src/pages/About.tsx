import React from "react";
import Layout from "../components/Layout";
import styles from "./About.module.css";

const About: React.FC = () => {
	return (
		<Layout>
			<section className={styles.About}>
				<h1>Tecnologias utilizadas</h1>
				<p>
					Este app foi construído utilizando as seguintes tecnologias:
				</p>
				<ul>
					<li>
						React.js;
					</li>
					<li>
						Typescript;
					</li>
					<li>
						Tailwind CSS;
					</li>
					<li>
						CSS Modules;
					</li>
					<li>
						ESLint.
					</li>
				</ul>
			</section>
		</Layout>
	);
};

export default About;
