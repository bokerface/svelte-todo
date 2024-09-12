<script lang="ts">
	export let data;

	import LoginForm from '$lib/components/form/login-form.svelte';
</script>

<div class="container mx-auto py-20">
	<div class="mx-auto mb-3 w-full max-w-sm space-x-2">
		<h1 class="mb-4 text-5xl font-bold text-slate-500">Login</h1>

		<div class="mx-auto mb-3 w-full items-center">
			<LoginForm data={data.form} />
			<!-- <form class="mb-2" method="POST" use:enhance>
				<Input
					type="email"
					name="email"
					placeholder="Email"
					autocomplete="off"
					class="mb-3 w-full border-red-500"
				/>
				<Input
					type="password"
					name="password"
					placeholder="Password"
					autocomplete="off"
					class="mb-3 w-full"
				/>
				<Button type="submit" class="w-full">Login</Button>
			</form> -->
		</div>
		<small>
			Don't have an account? register <a href="/register" class="text-blue-500">here</a>
		</small>
	</div>
</div>
