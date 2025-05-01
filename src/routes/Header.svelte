<script lang="ts">
	import { page } from '$app/state';
	let showMenu = false;
</script>

<header class="border-b border-gray-200">
	<div class="mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<a href="/" class="text-2xl">
					<span>🏕️</span>
					<span class="hidden sm:inline">Sleep on the Floor</span>
				</a>
			</div>

			<!-- Navigation -->
			<nav class="flex items-center space-x-4">
				<div class="relative">
					<input
						type="text"
						placeholder="Search..."
						class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 sm:w-64"
					/>
				</div>

				<!-- Desktop links -->
				<div class="hidden md:flex items-center space-x-4">
					<a
						href="/contribute"
						class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
						class:font-semibold={page.url.pathname === '/contribute'}
					>
						Contribute
					</a>
					<a
						href="/about"
						class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
						class:font-semibold={page.url.pathname === '/about'}
					>
						About
					</a>
				</div>

				<!-- Hamburger for mobile -->
				<div class="md:hidden flex items-center">
					<button
						type="button"
						aria-label="Toggle menu"
						class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
						on:click={() => (showMenu = !showMenu)}
					>
						<svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			</nav>
		</div>
		<!-- Mobile menu, show/hide based on menu state. -->
		{#if showMenu}
			<div class="md:hidden mt-2 space-y-1 bg-white shadow rounded-lg p-2">
				<a
					href="/contribute"
					class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
					>Contribute</a
				>
				<a
					href="/about"
					class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
					>About</a
				>
			</div>
		{/if}
	</div>
</header>
