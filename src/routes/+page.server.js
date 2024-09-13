// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';

import prisma from '$lib/prisma.ts';
import { supabase } from '$lib/supabaseClient.js';

export const load = async (event) => {
	if (!event.locals.user) redirect(302, '/login');

	// const data = await prisma.todo.findMany();
	const { data } = await supabase.from('todos').select('*');

	console.log(data);

	return {
		todos: data
	};
};

export const actions = {
	create: async ({ request }) => {
		await new Promise((fulfil) => setTimeout(fulfil, 1000));

		const data = await request.formData();

		if (data.get('description') === '') {
			// throw new Error('description cannot be empty');
			return fail(422, { message: 'description cannot be empty' });
		}

		const todos = await prisma.todo.findMany();

		// console.log(todos.find((todo) => todo.description === data.get('description')));

		if (todos.find((todo) => todo.description === data.get('description'))) {
			// throw new Error('todo already exists');
			return fail(422, { message: 'todo already exists' });
		}

		try {
			// await prisma.todo.create({
			// 	data: {
			// 		description: data.get('description')
			// 	}
			// });
			await supabase.from('todos').insert({
				description: data.get('description')
			});
		} catch (error) {
			return fail(422, {
				description: data.get('description'),
				error: error.message
			});
		}
	},

	delete: async ({ request }) => {
		await new Promise((fulfil) => setTimeout(fulfil, 1000));

		const data = await request.formData();

		await supabase.from('todos').delete().eq('id', JSON.parse(data.get('id')));

		// await prisma.todo.delete({
		// 	where: {
		// 		id: JSON.parse(data.get('id'))
		// 	}
		// });
	},

	update: async ({ request }) => {
		const data = await request.formData();

		await supabase.from('todos').update({
			done: JSON.parse(data.get('done'))
		}).eq('id', JSON.parse(data.get('id')));

		// await prisma.todo.update({
		// 	where: {
		// 		id: JSON.parse(data.get('id'))
		// 	},
		// 	data: {
		// 		done: JSON.parse(data.get('done'))
		// 	}
		// });
	}
};
