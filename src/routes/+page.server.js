// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';

import { supabase } from '$lib/supabaseClient.js';

export const load = async (event) => {
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
			return fail(422, { message: 'description cannot be empty' });
		}

		const { data: existingTodos } = await supabase.from('todos').select('*').eq('description', data.get('description'));
		if (existingTodos.length > 0) {
			return fail(422, { message: 'todo already exists' });
		}

		try {
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
	},

	update: async ({ request }) => {
		const data = await request.formData();

		await supabase.from('todos').update({
			done: JSON.parse(data.get('done'))
		}).eq('id', JSON.parse(data.get('id')));
	}
};
