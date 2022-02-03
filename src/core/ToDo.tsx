class ToDo {
	#id: string | null;
	#description: string;
	#done: boolean;
	#createdAt: Date;

	constructor(description: string, done: boolean, createdAt: Date, id: string | null = null) {
		this.#id = id;
		this.#description = description;
		this.#done = done;
		this.#createdAt = createdAt;
	}

	get id() {
		return this.#id;
	}

	get description() {
		return this.#description;
	}

	get done() {
		return this.#done;
	}

	set done(done: boolean) {
		this.#done = done;
	}

	get createdAt() {
		return this.#createdAt;
	}

	// Função utilizada por JSON.stringify().
	// JSON.stringfy() utiliza uma função toJSON() do objeto caso ela exista.
	// Para mais detalhes: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#tojson_behavior.
	// Aqui, passo um objeto JavaScript para o JSON.stringfy(), associo cada atributo do objeto com o atributo correspodente da classe ToDo.
	public toJSON(): string {
		return JSON.stringify({
			id: this.id,
			description: this.description,
			done: this.done,
			createdAt: this.createdAt
		});
	}

	// Funçao que retorna um objeto do tipo ToDo bease em uma string JSON recebida como argumento.
	public static fromJSON(serialized: string): ToDo {
		const todo = JSON.parse(serialized);
		// Note que devemos passar todo.createdAt como argumento para criação de um novo objeto Date.
		// Isso deve ser feito pois na conversão para JSON, todo o objeto Date foi serializado.
		return new ToDo(todo.description, todo.done, new Date(todo.createdAt), todo.id);
	}
}

export default ToDo;
