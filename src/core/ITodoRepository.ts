import Todo from './Todo';
import { User } from 'firebase/auth';

export interface ITodoRepository {
  save(todo: Todo, user: User): Promise<void>;
  delete(todo: Todo, user: User): Promise<void>;
  deleteByCategory(user: User, category: string): Promise<void>;
  update(todo: Todo, user: User): Promise<void>;
  getAll(user: User, category: string): Promise<Todo[]>;
}
