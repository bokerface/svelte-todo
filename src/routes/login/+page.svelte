<script lang="ts">
	export let data;

	import { loginSchema } from '$lib/validation.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input/index';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import * as Alert from '$lib/components/ui/alert/index.js';

	const { form, errors, message } = superForm(data.form, {
		validators: loginSchema as any
	});
</script>

<div class="container mx-auto py-20">
	<div class="mx-auto mb-3 w-full max-w-sm space-x-2">
		<h1 class="mb-4 text-5xl font-bold text-slate-500">Login</h1>

		<div class="mx-auto mb-3 w-full items-center">
			<!-- <SuperDebug {data} /> -->
			{#if $message}
				<Alert.Root variant="destructive">
					<CircleAlert class="h-4 w-4" />
					<Alert.Title>Error</Alert.Title>
					<Alert.Description>{$message}</Alert.Description>
				</Alert.Root>
			{/if}
			<form class="my-2" method="POST" use:enhance>
				<div class="mb-3">
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
				<div class="mb-3">
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

				<Button type="submit" class="w-full">Login</Button>
			</form>

			<small>
				Don't have an account? register <a href="/register" class="text-blue-500">here</a>
			</small>
		</div>
	</div>
</div>
