import Todo from './Todo';
import { User } from 'firebase/auth';

export interface ITodoRepository {
	save(todo: Todo, user: User | null): Promise<Todo>;
	delete(todo: Todo, user: User | null): Promise<void>;
	update(todo: Todo, user: User | null): Promise<void>;
	getAll(user: User | null): Promise<Todo[]>;
}
