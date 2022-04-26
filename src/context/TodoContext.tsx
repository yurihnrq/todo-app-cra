import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import TodoCollection from '../backend/database/TodoCollection';
import Todo from '../core/Todo';
import { useAuthContext } from './AuthContext';

interface ITodoContext {
  todos: Todo[];
  error: string | null;
  addTodo: (todo: string) => void;
  getTodos: () => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

const initialContext: ITodoContext = {
  todos: [],
  error: null,
  addTodo: () => {
    return;
  },
  getTodos: () => {
    return;
  },
  updateTodo: () => {
    return;
  },
  deleteTodo: () => {
    return;
  }
};

const TodoContext = createContext<ITodoContext>(initialContext);

export const useTodoContext = () => useContext<ITodoContext>(TodoContext);

const TodoProvider: React.FC = ({ children }) => {
  const { user } = useAuthContext();
  const dataCollection = new TodoCollection();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos();
    return () => {
      setTodos([]);
    };
  }, []);

  const getTodos = useCallback(() => {
    try {
      dataCollection.getAll(user).then(todos => {
        setTodos(todos);
      });
      if (error !== null) setError(null);
    } catch (err) {
      setError('Erro: ' + err);
      console.error(error);
    }
  }, [user, error]);

  const addTodo = useCallback(
    (todo: string) => {
      try {
        const todoObj = new Todo(todo, false, new Date());
        dataCollection.save(todoObj, user);
        getTodos();
        if (error !== null) setError(null);
      } catch (err) {
        setError('Erro: ' + err);
        console.error(error);
      }
    },
    [user, getTodos, error]
  );

  const deleteTodo = useCallback(
    (todo: Todo) => {
      try {
        dataCollection.delete(todo, user);
        getTodos();
        if (error !== null) setError(null);
      } catch (err) {
        setError('Erro: ' + err);
        console.error(error);
      }
    },
    [user, getTodos, error]
  );

  const updateTodo = useCallback(
    (todo: Todo) => {
      try {
        dataCollection.update(todo, user);
        getTodos();
        if (error !== null) setError(null);
      } catch (err) {
        setError('Erro: ' + err);
        console.error(error);
      }
    },
    [user, getTodos, error]
  );

  return (
    <TodoContext.Provider
      value={{
        todos,
        error,
        addTodo,
        getTodos,
        updateTodo,
        deleteTodo
      }}>
      {children}
    </TodoContext.Provider>
  );
};

export default {
  Provider: TodoProvider,
  Consumer: TodoContext.Consumer
};
