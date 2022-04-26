import React, { FormEventHandler, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import Form from '../../components/layout/Form';
import Input from '../../components/layout/Input';
import Button from '../../components/layout/Button';
import Alert from '../../components/layout/Alert';
import { useAuthContext } from '../../context/AuthContext';

const Reset: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const { setNewPassword } = useAuthContext();

  const submitHandler: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    const code = searchParams.get('oobCode');
    if (!code) {
      setError('Não foi possível obter o código de recuperação.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não são iguais.');
      return;
    }

    if (setNewPassword && code) {
      setNewPassword(code, password)
        .then(() => {
          setSuccess(true);
        })
        .catch(({ message }) => {
          if (message === 'Firebase: Error (auth/invalid-action-code).')
            setError('Código de recuperação inválido.');
        });
    } else {
      setError('Erro inesperado. Tente novamente mais tarde.');
      return;
    }

    setError(null);
  };

  return (
    <Layout>
      <Form onSubmit={submitHandler}>
        {error !== null ? <Alert color='red'>{error}</Alert> : null}
        {success ? (
          <Alert color='green'>
            Senha atualizada com sucesso. {<Link to='/login'>Clique aqui</Link>} para fazer login.
          </Alert>
        ) : null}
        <label htmlFor='password'>Nova senha:</label>
        <Input
          onChange={({ target }) => setPassword(target.value)}
          id='password'
          value={password}
          type='password'
          placeholder='Insira sua nova senha aqui...'
          disabled={success}
        />
        <label htmlFor='confirmPassword'>Confirmar ova senha:</label>
        <Input
          onChange={({ target }) => setConfirmPassword(target.value)}
          id='confirmPassword'
          value={confirmPassword}
          type='password'
          placeholder='Confirme sua nova senha aqui...'
          disabled={success}
        />
        <Button disabled={success} color='green' label='Confirmar nova senha' className='mb-4'>
          Confirmar nova senha
        </Button>
        <hr />
        <span className='text-sm text-center mt-4'>
          Deseja realizar login? <Link to='/login'>Clique aqui</Link>
        </span>
        <span className='text-sm text-center'>
          Deseja realizar cadastro? <Link to='/login'>Clique aqui</Link>
        </span>
      </Form>
    </Layout>
  );
};

export default Reset;
