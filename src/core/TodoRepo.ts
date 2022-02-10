import Todo from './Todo';
import { User } from 'firebase/auth';

interface TodoRepo {
	save(todo: Todo, user: User | null): Promise<true | string>;
	delete(todoID: string): Promise<true | string>;
	update(todo: Todo, userID: string): Promise<true | string>
	getAll(userId: string): Promise<Todo[]>;
}

export default TodoRepo;
