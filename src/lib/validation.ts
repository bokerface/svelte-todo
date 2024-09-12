import Zod, { z } from 'zod';
import prisma from './prisma';

// Login Form Validation
export const loginSchema = Zod.object({
	email: z.string().email({ message: 'Please enter your email' }),
	password: z.string().min(1, { message: 'Please enter your password' })
});
export type LoginSchema = typeof loginSchema;

// Registration Form Validation
export const registrationSchema = Zod.object({
	email: z.string().email({ message: 'Please enter valid email address' }),
	name: z.string().min(1, { message: 'Name is required' }),
	username: z.string().min(1, { message: 'Username is required' }),
	password: z.string().min(1, { message: 'Password can not be empty' }),
	passwordConfirmation: z.string().min(1, { message: 'Please confirm your password' })
})
	.superRefine(({ password, passwordConfirmation }, ctx) => {
		if (password !== passwordConfirmation) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['passwordConfirmation']
			});
		}
	})
	.superRefine(async ({ email }, ctx) => {
		if (await prisma.user.findUnique({ where: { email } })) {
			ctx.addIssue({
				code: 'custom',
				message: 'Email already taken',
				path: ['email']
			});
		}
	})
	.superRefine(async ({ username }, ctx) => {
		if (await prisma.user.findUnique({ where: { username } })) {
			ctx.addIssue({
				code: 'custom',
				message: 'Username already taken',
				path: ['username']
			});
		}
	});
export type RegistrationSchema = typeof registrationSchema;
