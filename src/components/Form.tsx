import React, { useState } from 'react';
import Button from './Button';

import { PlusIcon } from './Icons';
import styles from './Form.module.css';

interface IForm {
	action: (todo: string) => void
}

const Form: React.FC<IForm> = ({ action }) => {

	const [text, setText] = useState<string>('');
	const [warning, setWarning] = useState<boolean>(false);

	const handleInput = () => {
		if (text.length < 2)
			setWarning(true);
		else {
			setWarning(false);
			action(text);
			setText('');
		}
	};

	return (
		<form className={styles.Form} onSubmit={e => e.preventDefault()}>
			<div>
				<input
					className={`${styles.todoInput} dark:bg-slate-500 dark:text-white`} 
					id='todo' type='text' value={text} onChange={e => setText(e.target.value)}
					placeholder='Insira seu a fazer aqui...' maxLength={45}
				/>
				{warning ? (
					<span className='dark:text-red-400'>
						Você deve inserir ao menos dois caracteres.
					</span>
				) : null}
			</div>
			<Button onClick={() => handleInput()} className={`${styles.addButton} ml-3`} color='green' label='Add Todo'>
				{PlusIcon}
				Adicionar
			</Button>
		</form >
	);
};

export default Form;
