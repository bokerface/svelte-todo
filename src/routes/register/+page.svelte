<script lang="ts">
	export let data: PageData;

	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { registrationSchema } from '$lib/validation';
	import { Button } from '$lib/components/ui/button/index.js';
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input/index';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';

	const { form, errors } = superForm(data.form, {
		validators: registrationSchema as any
	});
</script>

<div class="container mx-auto py-20">
	<div class="mx-auto mb-3 w-full max-w-sm space-x-2">
		<h1 class="mb-4 text-5xl font-bold text-slate-500">Register</h1>

		<div class="mx-auto mb-3 w-full items-center">
			<SuperDebug data={$form} />
			<form class="my-2" method="POST" use:enhance>
				<div class="mb-2">
					<Input
						type="email"
						name="email"
						bind:value={$form.email}
						placeholder="Email"
						autocomplete="off"
						class="mb-1 w-full p-2 {$errors.email ? 'border-red-500' : ''}"
					/>
					{#if $errors.email}
						<div class="flex items-center text-xs text-red-500">
							<CircleAlert class="mr-1 h-4 w-4" />
							{$errors.email}
						</div>
					{/if}
				</div>
				<div class="mb-2">
					<Input
						type="name"
						name="name"
						bind:value={$form.name}
						placeholder="Fullname"
						autocomplete="off"
						class="mb-1 w-full p-2 {$errors.name ? 'border-red-500' : ''}"
					/>
					{#if $errors.name}
						<div class="flex items-center text-xs text-red-500">
							<CircleAlert class="mr-1 h-4 w-4" />
							{$errors.name}
						</div>
					{/if}
				</div>
				<div class="mb-2">
					<Input
						type="username"
						name="username"
						bind:value={$form.username}
						placeholder="Username"
						autocomplete="off"
						class="mb-1 w-full p-2 {$errors.username ? 'border-red-500' : ''}"
					/>
					{#if $errors.username}
						<div class="flex items-center text-xs text-red-500">
							<CircleAlert class="mr-1 h-4 w-4" />
							{$errors.username}
						</div>
					{/if}
				</div>
				<div class="mb-2">
					<Input
						type="password"
						name="password"
						bind:value={$form.password}
						placeholder="Password"
						autocomplete="off"
						class="mb-1 w-full p-2 {$errors.password ? 'border-red-500' : ''}"
					/>
					{#if $errors.password}
						<div class="flex items-center text-xs text-red-500">
							<CircleAlert class="mr-1 h-4 w-4" />
							{$errors.password}
						</div>
					{/if}
				</div>
				<div class="mb-2">
					<Input
						type="password"
						name="passwordConfirmation"
						bind:value={$form.passwordConfirmation}
						placeholder="Confirm Password"
						autocomplete="off"
						class="mb-1 w-full p-2 {$errors.passwordConfirmation ? 'border-red-500' : ''}"
					/>
					{#if $errors.passwordConfirmation}
						<div class="flex items-center text-xs text-red-500">
							<CircleAlert class="mr-1 h-4 w-4" />
							{$errors.passwordConfirmation}
						</div>
					{/if}
				</div>

				<Button type="submit" class="w-full">Register</Button>
			</form>

			<small>
				Already have an account? login <a href="/login" class="text-blue-500">here</a>
			</small>
		</div>
	</div>
</div>
