<script>
	let navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Services', href: '/services' },
		{ name: 'Contact', href: '/contact' }
	];
</script>

<nav class="fixed left-0 top-0 z-50 w-full bg-white shadow-lg">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<!-- Logo -->
			<div class="flex flex-shrink-0 items-center">
				<a href="/" class="text-xl font-semibold">MyWebsite</a>
			</div>

			<!-- Links -->
			<div class="hidden items-center space-x-8 md:flex">
				<!-- {#each navLinks as link}
					<a
						href={link.href}
						class="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-500"
					>
						{link.name}
					</a>
				{/each} -->
				<a
					href=""
					class="rounded-md border border-slate-500 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-500"
					>Logout</a
				>
			</div>

			<!-- Mobile Menu Button -->
			<div class="-mr-2 flex items-center md:hidden">
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
				>
					<svg
						class="block h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</nav>
