import React from 'react';
import Layout from '../components/layout/Layout';
import styles from './About.module.css';

const About: React.FC = () => {
	return (
		<Layout>
			<section className={styles.About}>
				<h1>Sobre este projeto</h1>
				<h2>Autor</h2>
				<p>Este projeto foi desenvolvido por Yuri Henrique B. Maciel, discente de Ciência da Computação na Universidade Federal de Uberlândia.</p>
				<p>
					<q>
						Sou apaixonado por computação e a ideia de que podemos utilizar o mundo digital para solucionar problemas do mundo real me fascina.
					</q>
				</p>
				<h2>Tecnologias utilizadas</h2>
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
