import Todo from '../../core/Todo';
import TodoRepo from '../../core/TodoRepo';
import { database } from '../config';
import { User } from 'firebase/auth';
import { collection, doc, addDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

class TodoCollection implements TodoRepo {
	async save(todo: Todo, user: User | null): Promise<void> {
		if (!user)
			throw new Error('Usuário não instanciado.');

		await addDoc(collection(database, `todos\\${user.uid}`), {
			description: todo.description,
			done: todo.done,
			createdAt: todo.createdAt.toJSON()
		});
	}

	async delete(todo: Todo, user: User | null): Promise<void> {
		if (!user)
			throw new Error('Usuário não instanciado.');
		if (!todo || !todo.id)
			throw new Error('Objeto Todo não existe.');

		const todoRef = doc(database, `todos\\${user.uid}`, todo.id);
		await deleteDoc(todoRef);
	}

	async update(todo: Todo, user: User | null): Promise<void> {
		if (!user)
			throw new Error('Usuário não instanciado.');

		const todoRef = doc(database, `todos\\${user.uid}`, todo.id || '');
		await updateDoc(todoRef, {
			description: todo.description,
			done: todo.done,
			createdAt: todo.createdAt.toJSON()
		});
	}

	async getAll(user: User | null): Promise<Todo[]> {
		const todos: Todo[] = [];
		if (!user)
			throw new Error('Usuário não instanciado.');

		const todosSnapshop = await getDocs(collection(database, `todos\\${user.uid}`));

		todosSnapshop.forEach(doc => {
			const todo = doc.data();
			todos.push(new Todo(todo.description, todo.done, new Date(todo.createdAt), doc.id));
		});

		return todos;
	}
}

export default TodoCollection;