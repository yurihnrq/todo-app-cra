import React from "react";
import Layout from "../components/Layout";
import { PlusIcon } from "../components/Icons";

import styles from "./ToDo.module.css";
import Table from "../components/Table";
import ToDo from "../core/ToDo";

const Home: React.FC = () => {

	const todos: ToDo[] = [];
	todos.push(new ToDo("Testar app", false, new Date(), "8h3h3cna693xlp"));
	todos.push(new ToDo("Implementar componente Table", false, new Date(), "8h3h3cna693plp"));
	todos.push(new ToDo("Terminar projeto", false, new Date(), "8h3h3cna693tnt"));
	todos.push(new ToDo("Utilizar TypeScript", false, new Date(), "8h3h3cna693kgp"));

	return (
		<Layout>
			<section className={styles.ToDo}>
				<Table todos={todos} />
				<button className={styles.addButton}>
					<div>
						<span>Add ToDo</span>
						{PlusIcon}
					</div>
				</button>
			</section>
		</Layout>
	);
};

export default Home;
