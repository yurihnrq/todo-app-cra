import React, { FormEventHandler, useState } from 'react';
import Button from './base/Button';
import Input from './base/Input';
import { PlusIcon } from './base/Icons';
import styles from './styles/TodoForm.module.css';
import { useTodoContext } from '../context/TodoContext';

const Form: React.FC = () => {
  const { addTodo } = useTodoContext();
  const [text, setText] = useState<string>('');
  const [warning, setWarning] = useState<string | null>(null);

  const formHandler: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (text.length < 2) {
      setWarning('Você deve inserir ao menos dois caracteres.');
      return;
    }

    if (text.length > 60) {
      setWarning('Você não pode inserir mais de 60 caracteres.');
      return;
    }

    setWarning(null);
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
        <Button className={styles.addButton} color='green' label='Add Todo' icon={PlusIcon}>
          <span>Adicionar</span>
        </Button>
      </div>
      {warning ? <span className={styles.warning}>{warning}</span> : null}
    </form>
  );
};

export default Form;
