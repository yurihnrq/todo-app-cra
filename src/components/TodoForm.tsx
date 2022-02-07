import React, { FormEventHandler, useState } from 'react';
import Button from './layout/Button';
import Input from './layout/Input';
import { PlusIcon } from './Icons';
import styles from './styles/TodoForm.module.css';

interface IForm {
	action: (todo: string) => void
}

const Form: React.FC<IForm> = ({ action }) => {

	const [text, setText] = useState<string>('');
	const [warning, setWarning] = useState<boolean>(false);

	const formHandler: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		if (text.length < 2)
			setWarning(true);
		else {
			setWarning(false);
			action(text);
			setText('');
		}
	};

	return (
		<form className={styles.Form} onSubmit={formHandler}>
			<div>
				<Input
					id='todo' type='text' value={text} onChange={e => setText(e.target.value)}
					placeholder='Insira seu a fazer aqui...' maxLength={45}
				/>
				{warning ? (
					<span className='dark:text-red-400'>
						Você deve inserir ao menos dois caracteres.
					</span>
				) : null}
			</div>
			<Button className={`${styles.addButton} ml-3`} color='green' label='Add Todo'>
				{PlusIcon}
				Adicionar
			</Button>
		</form >
	);
};

export default Form;
