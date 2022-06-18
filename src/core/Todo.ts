import { v4 as uuid } from 'uuid';

class Todo {
  #id: string;
  #description: string;
  #done: boolean;
  #createdAt: Date;
  #category: string;

  constructor(
    description: string,
    done: boolean,
    createdAt: Date,
    id = uuid(),
    category = 'default'
  ) {
    this.#id = id;
    this.#description = description;
    this.#done = done;
    this.#createdAt = createdAt;
    this.#category = category;
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

  get category() {
    return this.#category;
  }
}

export default Todo;
