import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import FirebaseTodoRepository from '../backend/repositories/FirebaseTodoRepository';
import Todo from '../core/Todo';
import { ITodoRepository } from '../core/ITodoRepository';
import { useAuthContext } from './AuthContext';
import ICategoryRepository from '../core/ICategoryRepository';
import FirebaseCategoryRepository from '../backend/repositories/FirebaseCategoryRepository';

interface ITodoContext {
  todos: Todo[];
  error: string | null;
  addTodo: (todo: string) => void;
  getTodos: () => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
  getCategories: () => Promise<string[]>;
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
  },
  getCategories: () => {
    return Promise.resolve([]);
  }
};

const TodoContext = createContext<ITodoContext>(initialContext);

export const useTodoContext = () => useContext<ITodoContext>(TodoContext);

const TodoProvider: React.FC = ({ children }) => {
  const { user } = useAuthContext();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const todoRepository: ITodoRepository = new FirebaseTodoRepository();
  const categoryRepository: ICategoryRepository = new FirebaseCategoryRepository();

  useEffect(() => {
    if (user) getTodos();
  }, [user]);

  const getTodos = useCallback(async () => {
    if (!user) return;

    try {
      const todos = await todoRepository.getAll(user);

      setTodos(todos);

      if (error !== null) setError(null);
    } catch (err) {
      setError('Erro: ' + err);
      console.error(error);
    }
  }, [user, error]);

  const addTodo = useCallback(
    async (todo: string, category = 'default') => {
      if (!user) return;

      try {
        if (!categoryRepository.doesCategoryExist(category, user)) {
          await categoryRepository.save(category, user);
        }

        const todoObj = new Todo(todo, false, new Date(), category);
        await todoRepository.save(todoObj, user);

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
    async (todo: Todo) => {
      if (!user) return;

      try {
        await todoRepository.delete(todo, user);

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
    async (todo: Todo) => {
      if (!user) return;

      try {
        await todoRepository.update(todo, user);

        getTodos();

        if (error !== null) setError(null);
      } catch (err) {
        setError('Erro: ' + err);
        console.error(error);
      }
    },
    [user, getTodos, error]
  );

  const getCategories = useCallback(async () => {
    if (!user) return [];

    try {
      const categories = await categoryRepository.getAll(user);

      if (error !== null) setError(null);

      return categories;
    } catch (err) {
      setError('Erro: ' + err);
      console.error(error);

      return [];
    }
  }, [user]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        error,
        addTodo,
        getTodos,
        updateTodo,
        deleteTodo,
        getCategories
      }}>
      {children}
    </TodoContext.Provider>
  );
};

export default {
  Provider: TodoProvider,
  Consumer: TodoContext.Consumer
};
