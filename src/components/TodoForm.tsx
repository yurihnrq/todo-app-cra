import React, { FormEventHandler, useState } from 'react';
import Button from './base/Button';
import Input from './base/Input';
import { PlusIcon } from './base/Icons';
import styles from './styles/TodoForm.module.css';
import { useTodoContext } from '../context/TodoContext';
import Alert from './base/Alert';

const Form: React.FC = () => {
  const { addTodo } = useTodoContext();
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const formHandler: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (text.length < 2) {
      setError('Você deve inserir ao menos dois caracteres.');
      return;
    }

    if (text.length > 60) {
      setError('Você não pode inserir mais de 60 caracteres.');
      return;
    }

    setError(null);
    addTodo(text);
    setText('');
  };

  return (
    <form className={styles.Form} onSubmit={formHandler}>
      <div>
        <Input
          id='todo'
          type='text'
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder='Insira seu a fazer aqui...'
          maxLength={60}
        />
        <Button className={styles.addButton} color='green' label='Add Todo'>
          <PlusIcon />
          <span>Adicionar</span>
        </Button>
      </div>
      {error ? <Alert color='red'>{error}</Alert> : null}
    </form>
  );
};

export default Form;
