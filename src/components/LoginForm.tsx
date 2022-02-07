import React, { FormEventHandler, useState } from 'react';
import Input from './layout/Input';
import styles from './styles/LoginForm.module.css';

const LoginForm: React.FC = () => {

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const formHandler: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
	};

	return (
		<form onSubmit={formHandler} className={styles.Form}>
			<label htmlFor='email'>
				Email
			</label>
			<Input
				id='email' type='email' value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder='email@dominio.com' className='mb-4'
			/>
			<label htmlFor='password'>
				Senha
			</label>
			<Input
				id='password' type='password' value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder='Insira sua senha...'
			/>
		</form>
	);
};

export default LoginForm;
