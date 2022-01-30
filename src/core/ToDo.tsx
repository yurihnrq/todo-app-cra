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

}

export default ToDo;
