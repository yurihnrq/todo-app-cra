import Todo from '../../core/Todo';
import TodoRepo from '../../core/TodoRepo';
import { database } from '../config';
import { User } from 'firebase/auth';
import { collection, doc, addDoc, getDocs, deleteDoc, updateDoc, query, where } from 'firebase/firestore';

class TodoCollection implements TodoRepo {
	async save(todo: Todo, user: User | null): Promise<true | string> {
		try {
			if (!user)
				throw new Error('Usuário não instanciado.');

			await addDoc(collection(database, 'todos'), {
				userID: user.uid,
				description: todo.description,
				done: todo.done,
				createdAt: todo.createdAt.toJSON()
			});

			return true;
		} catch (e) {
			return 'Erro inesperado: ' + e;
		}
	}

	async delete(todoID: string): Promise<true | string> {
		try {
			const todoRef = doc(database, 'todos', todoID);
			await deleteDoc(todoRef);

			return true;
		} catch (e) {
			return 'Erro inesperado: ' + e;
		}
	}

	async update(todo: Todo, userID: string): Promise<true | string> {
		try {
			const todoRef = doc(database, 'todos', todo.id || '');
			await updateDoc(todoRef, {
				userID: userID,
				description: todo.description,
				done: todo.done,
				createdAt: todo.createdAt.toJSON()
			});

			return true;
		} catch (e) {
			return 'Erro inesperado: ' + e;
		}
	}

	async getAll(userID: string): Promise<Todo[]> {
		const todos: Todo[] = [];
		try {
			const todosRef = collection(database, 'todos');
			const todosSnapshop = await getDocs(query(todosRef, where('userID', '==', userID)));
			todosSnapshop.forEach(doc => {
				const todo = doc.data();
				console.log(todo);
				if (todo.userID === userID)
					todos.push(new Todo(todo.userID, todo.description, todo.done, new Date(todo.createdAt), doc.id));
			});
		} catch (e) {
			console.error('Erro inesperado: ' + e);
		}
		return todos;
	}
}

export default TodoCollection;
