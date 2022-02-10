import Todo from './Todo';
import { User } from 'firebase/auth';

interface TodoRepo {
	save(todo: Todo, user: User | null): Promise<void>;
	delete(todo: Todo, user: User | null): Promise<void>;
	update(todo: Todo, user: User | null): Promise<void>
	getAll(user: User | null): Promise<Todo[]>;
}

export default TodoRepo;
