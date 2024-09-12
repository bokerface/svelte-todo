import { fail, message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { registrationSchema } from '$lib/validation';
import argon2 from 'argon2';
import prisma from '$lib/prisma';

export const load = (async () => {
	const form = await superValidate(zod(registrationSchema));
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(registrationSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// TODO: Add registration logic
		const passwordHash = await argon2.hash(form.data.password, {
			type: argon2.argon2id
		});
		console.log(passwordHash);

		try {
			await prisma.user.create({
				data: {
					email: form.data.email,
					name: form.data.name,
					username: form.data.username,
					password_hash: passwordHash
				}
			});
		} catch (error) {
			return fail(422, {
				error: 'Something went wrong while creating your account. Please try again.'
			});
		}

		return message(form, 'Registration successful!.');
	}
};
