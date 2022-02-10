import React, { FormEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from './layout/Input';
import Button from './layout/Button';
import styles from './styles/Form.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignupForm: React.FC = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [
		passwordConfirm,
		setPasswordConfirm
	] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const { signup } = useAuth();

	const formHandler: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		if (password.length < 6) {
			setError('A deve conter pelo menos 6 caracteres.');
			return;
		}

		if (password !== passwordConfirm) {
			setError('As senhas não correspondem.');
			return;
		}

		try {
			setError(null);
			setLoading(true);
			if (signup)
				await signup(email, password);
		} catch (error) {
			setError('Falha ao realizar cadastro. Tente novamente mais tarde.');
		}

		setLoading(false);
		navigate('/');
	};



	return (
		<form className={styles.Form} onSubmit={formHandler}>
			{error !== null ? (
				<span className={styles.warning}>Erro: {error}</span>
			) : (
				null
			)}
			<label htmlFor='email'>
				Email
			</label>
			<Input
				id='email' value={email} type='email'
				onChange={({ target }) => setEmail(target.value)}
				placeholder='Digite seu email' required
			/>
			<label htmlFor='password'>
				Senha
			</label>
			<Input
				id='password' value={password} type='password'
				onChange={({ target }) => setPassword(target.value)}
				placeholder='Digite sua senha' required minLength={6}
			/>
			<label htmlFor='passwordConfirm'>
				Confirmar senha
			</label>
			<Input
				id='passwordConfirm' value={passwordConfirm}
				type='password' onChange={({ target }) => setPasswordConfirm(target.value)}
				placeholder='Digite sua senha novamente' required minLength={6}
			/>
			<Button color='blue' label='Realizar cadastro' disabled={loading}>
				Cadastrar-se
			</Button>
			<hr className='my-4 bg-slate-300' />
			<span className='text-sm text-center'>
				Já é cadastrado? &nbsp;
				<Link to='/login' className={styles.link}>
					Realize login
				</Link>
			</span>
		</form>
	);
};

export default SignupForm;
