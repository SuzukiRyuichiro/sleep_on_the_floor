<script lang="ts">
	import { page } from '$app/state';
</script>

<header class="border-b border-gray-200">
	<div class="mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<a href="/" class="text-2xl">🏕️</a>
			</div>

			<!-- Navigation -->
			<nav class="flex items-center space-x-4">
				<div class="relative">
					<input
						type="text"
						placeholder="Search..."
						class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
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
			</nav>
		</div>
	</div>
</header>
