<script lang="ts">
	// @ts-nocheck
	export let data;
	export let form;
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import 'iconify-icon';
	import { enhance } from '$app/forms';
	import { fly, slide } from 'svelte/transition';
	import { supabase } from '$lib/supabaseClient.js';
	import { onMount } from 'svelte';

	let todos = [];

	onMount(async () => {
		await fetchTodos();
	});

	async function fetchTodos() {
		const response = await fetch('/api/todo');
		const data = await response.json();
		todos = data;
	}

	const handleInserts = async (payload) => {
		await payload;
		fetchTodos(); // Make fetchTodos awaitable
	};

	supabase
		.channel('todos')
		.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'todos' }, handleInserts)
		.subscribe();

	let creating = false;
	let deleting = [];
</script>

<div class="container mx-auto py-20">
	<div class="mx-auto mb-3 w-full max-w-sm space-x-2">
		<h1 class="mb-4 text-5xl font-bold text-slate-500">Admin...</h1>

		<div class="mx-auto mb-3 w-full items-center">
			<ul class="w-full">
				<ScrollArea class="h-[300px]">
					<!-- {#each todos.filter((todo) => !deleting.includes(todo.id)) as todo} -->
					{#each todos as todo}
						<div class="flex items-center justify-end px-5">
							<li
								in:fly={{ y: 20 }}
								out:slide
								class="my-2 rounded bg-slate-700 p-2 text-lg text-white"
								style="width: fit-content;"
							>
								<input type="hidden" name="id" value={todo.id} />
								<span>{todo.description}</span>
							</li>
						</div>
					{/each}
				</ScrollArea>
			</ul>
			{#if creating}
				<div class="flex w-full items-center space-x-4">
					<div class="flex w-full flex-col items-center space-y-2">
						<Skeleton class="h-4 w-full bg-slate-400" />
						<Skeleton class="h-4 w-[250px] bg-slate-400" />
					</div>
				</div>
			{/if}
		</div>

		{#if form?.message}
			<Alert.Root variant="destructive">
				<Alert.Title>Error</Alert.Title>
				<Alert.Description>{form.message}</Alert.Description>
			</Alert.Root>
		{/if}

		<form
			method="POST"
			action="/api/supa-send"
			class="mx-auto my-3 flex w-full items-center space-x-2"
			use:enhance={() => {
				creating = true;

				return async ({ update }) => {
					const response = await update();
					const responseData = await response.json();
					console.log(responseData); // Log the response from the API call
					creating = false;
				};
			}}
		>
			<Input
				disabled={creating}
				type="text"
				name="description"
				placeholder="Type here..."
				autocomplete="off"
				class="max-w-xs"
			/>
			<Button disabled={creating} type="submit">Send</Button>
		</form>
	</div>
</div>
