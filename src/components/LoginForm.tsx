import React, { FormEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from './layout/Input';
import Button from './layout/Button';
import Form from './layout/Form';
import Alert from './layout/Alert';
import { useAuth } from '../context/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const formHandler: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();

    if (login)
      try {
        await login(email, password);
      } catch (error) {
        setError('Usuário ou senha incorretos. Tente novamente.');
        console.log(error);
      }
  };

  return (
    <Form onSubmit={formHandler}>
      {error !== null ? <Alert color='red'>{error}</Alert> : null}
      <label htmlFor='email'>Email</label>
      <Input
        id='email'
        type='email'
        value={email}
        required
        onChange={e => setEmail(e.target.value)}
        placeholder='email@dominio.com'
      />
      <label htmlFor='password'>Senha</label>
      <Input
        id='password'
        type='password'
        value={password}
        required
        onChange={e => setPassword(e.target.value)}
        placeholder='Insira sua senha...'
        minLength={6}
      />
      <Button color='blue' label='Realizar login'>
        Entrar
      </Button>
      <hr className='my-4 bg-slate-300' />
      <span className='text-sm text-center'>
        Esqueceu sua senha? &nbsp;
        <Link to='/recuperacao'>Clique aqui</Link>
      </span>
      <span className='text-sm text-center'>
        Não possui uma conta? &nbsp;
        <Link to='/cadastro'>Cadastre-se</Link>
      </span>
    </Form>
  );
};

export default LoginForm;
