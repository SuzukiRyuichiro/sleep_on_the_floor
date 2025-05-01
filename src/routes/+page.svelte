<script lang="ts">
	import mapbox from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { onMount, onDestroy } from 'svelte';
	import { PUBLIC_MAPBOX_API_KEY } from '$env/static/public';
	import Card from '$lib/components/Card.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { listings } from '$lib/data/listings';

	const { Map } = mapbox;

	let map: mapbox.Map | undefined;
	let mapContainer: HTMLDivElement | undefined;
	let lng = -71.224518;
	let lat = 42.213995;
	let zoom = 9;

	let initialState = { lng, lat, zoom };

	let showMobileCards = false;

	onMount(() => {
		if (mapContainer) {
			map = new Map({
				container: mapContainer,
				accessToken: PUBLIC_MAPBOX_API_KEY,
				center: [initialState.lng, initialState.lat],
				zoom: initialState.zoom
			});
		}
	});

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main class="flex h-full">
	<!-- Desktop/Tablet: Sidebar Cards -->
	<div class="hidden md:flex w-2/5 flex-col overflow-y-scroll">
		<div class="flex-1 overflow-y-auto p-6">
			<div class="grid grid-cols-2 gap-6 mb-4">
				{#each listings as listing}
					<Card {...listing} />
				{/each}
			</div>
			<Footer>
				<p>
					Made by <a href="https://ryuichirosuzuki.com" class="font-bold">Scooter</a> 🛵
				</p>
			</Footer>
		</div>
	</div>

	<!-- Map: always visible, full screen on mobile -->
	<div class="w-full md:w-3/5 sticky top-0 grow-1" bind:this={mapContainer}></div>

	<!-- Mobile: Scrollable Card Overlay (Drawer) -->
	<div class="fixed inset-0 z-30 flex flex-col justify-end md:hidden pointer-events-none">
		<div class="flex-1 pointer-events-none"></div>
		<div
			class="bg-white rounded-t-2xl shadow-2xl max-h-[80vh] min-h-12 h-12 overflow-y-auto p-0 pointer-events-auto transition-all duration-300"
		>
			<div class="flex flex-col items-center">
				<div class="w-12 h-1.5 bg-gray-300 rounded-full mt-2 mb-2"></div>
			</div>
			<div class="flex flex-col gap-4 px-4 pb-4 pt-0">
				{#each listings as listing}
					<Card {...listing} />
				{/each}
			</div>
			<div class="mt-4 px-4">
				<Footer>
					<p>
						Made by <a href="https://ryuichirosuzuki.com" class="font-bold">Scooter</a> 🛵
					</p>
				</Footer>
			</div>
		</div>
	</div>
</main>
