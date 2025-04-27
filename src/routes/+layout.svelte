<script lang="ts">
	import Header from './Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';

	let { children, data } = $props();
</script>

<div class="flex flex-col min-h-screen bg-primary h-screen max-h-screen">
	<Header />

	<main class="flex-1 flex flex-col w-full h-100 mx-auto box-border">
		{@render children()}
	</main>
</div>
