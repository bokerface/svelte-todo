<script lang="ts">
	import '../app.css';
	import { Button } from '$lib/components/ui/button/index.js';

	export let data;
</script>

<main class="flex min-h-screen flex-col items-center bg-gray-100 text-gray-900">
	{#if data?.session}
		<nav class="fixed left-0 top-0 z-50 w-full bg-white shadow-lg">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex h-16 justify-between">
					<!-- Logo -->
					<div class="flex flex-shrink-0 items-center">
						<a href="/" class="text-xl font-semibold">MyWebsite</a>
					</div>

					<!-- Links -->
					<div class="items-center space-x-8 md:flex">
						<!-- <Button on:click={logout} variant="outline">Logout</Button> -->
						<!-- <a
							href="/logout"
							class="rounded-md border border-slate-500 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-500"
						>
							Logout
						</a> -->
						<form action="/logout" method="POST">
							<Button variant="outline" type="submit">Logout</Button>
						</form>
					</div>
				</div>
			</div>
		</nav>
	{/if}
	<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-900">
		<slot />
	</div>
</main>

<!-- <slot></slot> -->

<style>
	main {
		font-family: 'Inter', sans-serif;
	}
</style>
