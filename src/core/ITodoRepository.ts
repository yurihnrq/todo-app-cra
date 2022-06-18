import Todo from './Todo';
import { User } from 'firebase/auth';

export interface ITodoRepository {
	save(todo: Todo, user: User): Promise<Todo>;
	delete(todo: Todo, user: User): Promise<void>;
	update(todo: Todo, user: User): Promise<void>;
	getAll(user: User): Promise<Todo[]>;
}
