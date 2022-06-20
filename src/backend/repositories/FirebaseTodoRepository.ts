import Todo from '../../core/Todo';
import { ITodoRepository } from '../../core/ITodoRepository';
import { database } from '../firebase';
import { User } from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  where
} from 'firebase/firestore';

class FirebaseTodoRepository implements ITodoRepository {
  async save(todo: Todo, user: User): Promise<void> {
    await addDoc(collection(database, 'todos', user.uid, todo.category), {
      id: todo.id,
      description: todo.description,
      done: todo.done,
      createdAt: todo.createdAt.toJSON(),
      category: todo.category
    });
  }

  async delete(todo: Todo, user: User): Promise<void> {
    const todoQuery = query(
      collection(database, 'todos', user.uid, todo.category),
      where('id', '==', todo.id)
    );

    const todoSnapshot = await getDocs(todoQuery);

    todoSnapshot.forEach(doc => {
      deleteDoc(doc.ref);
    });
  }

  async deleteByCategory(user: User, category: string): Promise<void> {
    const todoQuery = query(
      collection(database, 'todos', user.uid, category),
      where('category', '==', category)
    );

    const todoSnapshot = await getDocs(todoQuery);

    todoSnapshot.forEach(doc => {
      deleteDoc(doc.ref);
    });
  }

  async update(todo: Todo, user: User): Promise<void> {
    const todoQuery = query(
      collection(database, 'todos', user.uid, todo.category),
      where('id', '==', todo.id)
    );

    const todoSnapshot = await getDocs(todoQuery);
    const todoDoc = todoSnapshot.docs[0];

    await updateDoc(todoDoc.ref, {
      description: todo.description,
      done: todo.done,
      createdAt: todo.createdAt.toJSON(),
      category: todo.category
    });
  }

  async getAll(user: User, category: string): Promise<Todo[]> {
    const todos: Todo[] = [];

    const dataQuery = query(
      collection(database, 'todos', user.uid, category),
      orderBy('createdAt', 'desc')
    );
    const todosSnapshot = await getDocs(dataQuery);

    todosSnapshot.forEach(doc => {
      const todo = doc.data();
      todos.push(
        new Todo(todo.description, todo.done, new Date(todo.createdAt), todo.category, todo.id)
      );
    });

    return todos;
  }
}

export default FirebaseTodoRepository;
