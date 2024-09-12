import { message, superValidate } from 'sveltekit-superforms';
import { fail, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/validation';
import prisma from '$lib/prisma';
import argon2 from 'argon2';
import { lucia } from '$lib/server/auth.js';

export const load = async () => {
	const form = await superValidate(zod(loginSchema));

	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginSchema));
		// console.log(form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const user = await prisma.user.findFirst({
			where: {
				email: form.data.email
			}
		});

		// @ts-ignore
		if (!user || !(await argon2.verify(user?.password_hash, form.data.password))) {
			console.log(
				message(form, 'Invalid email or password', {
					status: 400
				})
			);
			return message(form, 'Invalid email or password', {
				status: 400
			});
		}

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');

		// return { form };
	}
};
