<script lang="ts">
	// @ts-nocheck
	export let data;
	export let form;
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import 'iconify-icon';
	import { enhance } from '$app/forms';
	import { fly, slide } from 'svelte/transition';
	import { supabase } from '$lib/supabaseClient.js';

	// let mbelek = false;

	async function fetchTodos() {
		// const { data } = await supabase.from('todos').select('*');
		// return data;
		// if (mbelek) {
		// 	return data.todos;
		// } else {
		// 	return [];
		// }
		const { data: todosData } = await supabase.from('todos').select('*');
		data.todos = todosData; // Update the data variable
		console.log(data.todos);
		// return data.todos;
	}

	const handleInserts = async (payload) => {
		console.log('Change received!', payload);
		await fetchTodos(); // Make fetchTodos awaitable
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
		<h1 class="mb-4 text-5xl font-bold text-slate-500">Todo...</h1>

		{#if form?.message}
			<Alert.Root variant="destructive">
				<Alert.Title>Error</Alert.Title>
				<Alert.Description>{form.message}</Alert.Description>
			</Alert.Root>
		{/if}

		<!-- <pre>
			{JSON.stringify(form)}
		</pre> -->

		<form
			method="POST"
			action="?/create"
			class="mx-auto my-3 flex w-full items-center space-x-2"
			use:enhance={() => {
				creating = true;

				return async ({ update }) => {
					await update();
					creating = false;
				};
			}}
		>
			<Input
				disabled={creating}
				type="text"
				name="description"
				placeholder="New todo"
				autocomplete="off"
				class="max-w-xs"
			/>
			<Button type="submit">Add Todo</Button>
		</form>

		<div class="mx-auto mb-3 w-full items-center">
			<ul class="w-full">
				{#each data.todos.filter((todo) => !deleting.includes(todo.id)) as todo}
					<!-- {#each dadadodos as todo} -->
					<li in:fly={{ y: 20 }} out:slide class="my-2 rounded bg-slate-500 p-2 text-lg text-white">
						<form
							method="POST"
							action="?/delete"
							class="flex items-center justify-between"
							use:enhance={() => {
								deleting = [...deleting, todo.id];
								return async ({ update }) => {
									await update();
									console.log(deleting.filter((id) => id !== todo.id));
									deleting = deleting.filter((id) => id !== todo.id);
								};
							}}
						>
							<input type="hidden" name="id" value={todo.id} />
							<Checkbox
								id="terms"
								checked={todo.done}
								onCheckedChange={async (e) => {
									const done = e;

									const formData = {
										id: todo.id,
										done: done
									};

									const urlEncodedData = new URLSearchParams(formData);

									await fetch(`?/update`, {
										method: 'POST',
										body: urlEncodedData,
										headers: {
											'Content-Type': 'application/x-www-form-urlencoded'
										}
									});
								}}
							/>
							<span>{todo.description}</span>
							<button class="flex items-center">
								<iconify-icon icon="basil:trash-outline"></iconify-icon>
							</button>
						</form>
					</li>
				{/each}
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
	</div>
</div>
