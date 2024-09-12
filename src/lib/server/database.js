// @ts-nocheck
const db = new Map();

export function getTodos(userId) {
	if (!db.get(userId)) {
		db.set(userId, [
			{
				id: crypto.randomUUID(),
				description: 'learn sveltekit',
				done: false
			}
		]);
	}

	return db.get(userId);
}

export function createTodo(userId, description) {
	if (description === '') {
		throw new Error('description cannot be empty');
	}

	const todos = db.get(userId);

	if (todos.find((todo) => todo.description === description)) {
		throw new Error('todo already exists');
	}

	todos.push({
		id: crypto.randomUUID(),
		description,
		done: false
	});
}

export function toggleTodo(userId, id, done) {
	const todos = db.get(userId);
	const todo = todos.find((todo) => todo.id === id);
	todo.done = JSON.parse(done.toLowerCase());
}

export function deleteTodo(userId, todoId) {
	const todos = db.get(userId);
	const index = todos.findIndex((todo) => todo.id === todoId);

	if (index > -1) {
		todos.splice(index, 1);
	}
}
