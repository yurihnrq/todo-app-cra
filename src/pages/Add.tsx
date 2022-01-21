import React, { FormEventHandler } from 'react';

import Layout from '../components/Layout';

const Add: React.FC = () => {

	const handleSubmit: FormEventHandler = (event) => {
		event.preventDefault();

		const form = event.target;

		console.log(form);
	};

	return (
		<Layout>
			<form onSubmit={handleSubmit}>
				{/* TODO inputs for ToDo Item */}
				<button>
					Adicionar
				</button>
			</form>
		</Layout>
	);
};

export default Add;

