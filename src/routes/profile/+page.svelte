<script lang="ts">
	import { Input } from '$lib/components/ui/input/index';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<div class="container mx-auto py-20">
	<h1 class="mb-4 text-5xl font-bold text-slate-500">Edit Profile</h1>
	<form class="space-y-6"> <!-- Increased space between form elements -->
		<div class="mb-4"> <!-- Increased margin bottom -->
			<label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
			<Input
				type="text"
				id="name"
				name="name"
				placeholder="Full Name"
				class="mt-1 block w-full"
			/>
		</div>
		<div class="mb-4"> <!-- Increased margin bottom -->
			<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
			<Input
				type="text"
				id="username"
				name="username"
				placeholder="Username"
				class="mt-1 block w-full"
			/>
		</div>
		<div class="mb-4"> <!-- Increased margin bottom -->
			<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
			<Input
				type="email"
				id="email"
				name="email"
				placeholder="Email"
				class="mt-1 block w-full"
			/>
		</div>
		<div class="mb-4"> <!-- Increased margin bottom -->
			<label for="password" class="block text-sm font-medium text-gray-700">New Password</label>
			<Input
				type="password"
				id="password"
				name="password"
				placeholder="New Password"
				class="mt-1 block w-full"
			/>
		</div>
		<div class="mb-4"> <!-- Increased margin bottom -->
			<label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
			<Input
				type="password"
				id="confirm-password"
				name="confirm-password"
				placeholder="Confirm Password"
				class="mt-1 block w-full"
			/>
		</div>
		<Button
			type="submit"
			class="w-full py-3 px-5 font-extrabold rounded-md shadow-lg transition duration-200"
		>
			Save Changes
		</Button>
	</form>
</div>
