import React, { FormEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from './layout/Input';
import Button from './layout/Button';
import styles from './styles/Form.module.css';
import { useAuth } from '../context/AuthContext';

const LoginForm: React.FC = () => {

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const { login } = useAuth();

	const formHandler: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		if (login)
			try {
				await login(email, password);
			} catch (error) {
				console.error('Usuário não encontrado');
			}
	};

	return (
		<form onSubmit={formHandler} className={styles.Form}>
			<label htmlFor='email'>
				Email
			</label>
			<Input
				id='email' type='email' value={email} required
				onChange={(e) => setEmail(e.target.value)}
				placeholder='email@dominio.com'
			/>
			<label htmlFor='password'>
				Senha
			</label>
			<Input
				id='password' type='password' value={password} required
				onChange={(e) => setPassword(e.target.value)}
				placeholder='Insira sua senha...' minLength={6}
			/>
			<Button color='blue' label='Realizar login'>
				Entrar
			</Button>
			<hr className='my-4 bg-slate-300' />
			<span className='text-sm text-center'>
				Não possui uma conta? &nbsp;
				<Link to='/cadastro' className={styles.link}>
					Cadastre-se
				</Link>
			</span>
		</form>
	);
};

export default LoginForm;
