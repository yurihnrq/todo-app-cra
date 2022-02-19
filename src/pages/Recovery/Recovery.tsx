import React, { FormEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import Form from '../../components/layout/Form';
import Input from '../../components/layout/Input';
import Button from '../../components/layout/Button';
import Alert from '../../components/layout/Alert';
import { useAuth } from '../../context/AuthContext';

const Recovery: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [verify, setVerify] = useState<boolean>(false);
  const { requestPasswordReset } = useAuth();

  const submitHandler: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (requestPasswordReset) {
      requestPasswordReset(email);
      setVerify(true);
    } else setError('Erro inesperado. Tente novamente mais tarde.');

    setError(null);
  };

  return (
    <Layout>
      <Form onSubmit={submitHandler}>
        {error !== null ? <Alert color='red'>{error}</Alert> : null}
        {verify ? (
          <Alert color='blue'>
            Verifique seu email. Caso ele exista, você receberá um link para criar uma nova senha.
          </Alert>
        ) : null}
        <label htmlFor='email'>Email:</label>
        <Input
          onChange={({ target }) => setEmail(target.value)}
          id='email'
          value={email}
          type='email'
          placeholder='Insira seu email aqui...'
        />
        <Button disabled={verify} color='red' label='Botão recuperar senha' className='mb-4'>
          Recuperar senha
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

export default Recovery;
