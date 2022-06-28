import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import FirebaseTodoRepository from '../backend/repositories/FirebaseTodoRepository';
import Todo from '../core/Todo';
import { ITodoRepository } from '../core/ITodoRepository';
import { useAuthContext } from './AuthContext';
import ICategoryRepository from '../core/ICategoryRepository';
import FirebaseCategoryRepository from '../backend/repositories/FirebaseCategoryRepository';
import usePersistentState from '../hooks/usePersistentState';

interface ITodoContext {
  todos: Todo[];
  loading: boolean;
  categories: string[];
  selectedCategory: string;
  error: string | null;
  addTodo: (todo: string) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  selectCategory: (category: string) => void;
}

const initialContext: ITodoContext = {
  todos: [],
  loading: true,
  categories: [],
  selectedCategory: 'default',
  error: null,
  addTodo: () => {
    return;
  },
  updateTodo: () => {
    return;
  },
  deleteTodo: () => {
    return;
  },
  addCategory: () => {
    return;
  },
  deleteCategory: () => {
    return;
  },
  selectCategory: () => {
    return;
  }
};

const TodoContext = createContext<ITodoContext>(initialContext);

export const useTodoContext = () => useContext<ITodoContext>(TodoContext);

const TodoProvider: React.FC = ({ children }) => {
  const { user } = useAuthContext();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = usePersistentState<string>('category', 'default');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const todoRepository: ITodoRepository = new FirebaseTodoRepository();
  const categoryRepository: ICategoryRepository = new FirebaseCategoryRepository();

  useEffect(() => {
    if (categories.length === 0) addCategory('default');
    if (categories.length > 1 && !categories.includes(selectedCategory))
      setSelectedCategory('default');
  }, [categories]);

  useEffect(() => {
    if (user) {
      getCategories();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getTodos();
    }
  }, [user, selectedCategory]);

  const getTodos = useCallback(async () => {
    if (!user) return;

    try {
      const todos = await todoRepository.getAll(user, selectedCategory);

      setTodos(todos);

      if (error !== null) setError(null);
    } catch (err) {
      setError('Erro: ' + err);
      console.error(error);
    }

    setLoading(false);
  }, [user, error, selectedCategory]);

  const addTodo = useCallback(
    async (todo: string) => {
      if (!user) return;

      try {
        const todoObj = new Todo(todo, false, new Date(), selectedCategory);
        await todoRepository.save(todoObj, user);

        setTodos(prevState => [todoObj, ...prevState]);

        if (error !== null) setError(null);
      } catch (err) {
        setError('Erro: ' + err);
        console.error(error);
      }
    },
    [user, getTodos, error, selectedCategory]
  );

  const deleteTodo = useCallback(
    async (todo: Todo) => {
      if (!user) return;

      try {
        await todoRepository.delete(todo, user);

        setTodos(prevState => prevState.filter(t => t.id !== todo.id));

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

        setTodos(prevState => prevState.map(t => (t.id === todo.id ? todo : t)));

        if (error !== null) setError(null);
      } catch (err) {
        setError('Erro: ' + err);
        console.error(error);
      }
    },
    [user, getTodos, error]
  );

  const getCategories = useCallback(async () => {
    if (!user) return;

    try {
      const categories = await categoryRepository.getAll(user);

      setCategories(categories);

      if (error !== null) setError(null);
    } catch (err) {
      setError('Erro: ' + err);
      console.error(error);
    }
  }, [user, setCategories]);

  const addCategory = useCallback(
    async (category: string) => {
      if (!user) return;

      try {
        if (await categoryRepository.doesCategoryExist(category, user)) return;
        await categoryRepository.save(category, user);

        setCategories(prevState => [...prevState, category]);

        if (error !== null) setError(null);
      } catch (err) {
        setError('Erro: ' + err);
        console.error(error);
      }
    },
    [user, getCategories]
  );

  const deleteCategory = useCallback(
    async (category: string) => {
      if (!user) return;

      try {
        await todoRepository.deleteByCategory(user, category);

        await categoryRepository.delete(category, user);

        setCategories(prevState => prevState.filter(c => c !== category));

        if (error !== null) setError(null);
      } catch (err) {
        setError('Erro: ' + err);
        console.error(error);
      }
    },
    [user, getCategories]
  );

  const selectCategory = useCallback(
    (category: string) => {
      setSelectedCategory(category);
    },
    [categories]
  );

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        categories,
        selectedCategory,
        error,
        addTodo,
        updateTodo,
        deleteTodo,
        addCategory,
        deleteCategory,
        selectCategory
      }}>
      {children}
    </TodoContext.Provider>
  );
};

export default {
  Provider: TodoProvider,
  Consumer: TodoContext.Consumer
};
