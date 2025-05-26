<script lang="ts">
	import mapbox from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { onMount, onDestroy } from 'svelte';
	import { PUBLIC_MAPBOX_API_KEY } from '$env/static/public';
	import Card from '$lib/components/Card.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { listings } from '$lib/data/listings';

	const { Map, Marker } = mapbox;

	let map: mapbox.Map | undefined;
	let mapContainer: HTMLDivElement | undefined;
	let markers: mapbox.Marker[] = [];
	let bounds: mapbox.LngLatBounds | undefined;

	let showMobileCards = false;

	onMount(() => {
		// Dynamically import Intercom only on the client
		if (typeof window !== 'undefined') {
			import('@intercom/messenger-js-sdk').then((module) => {
				const Intercom = module.default;
				if (typeof Intercom === 'function') {
					Intercom({
						app_id: 'ayhkrqtb'
					});
				}
			});
		}

		if (mapContainer) {
			map = new Map({
				container: mapContainer,
				accessToken: PUBLIC_MAPBOX_API_KEY,
				style: 'mapbox://styles/mapbox/outdoors-v12',
				center: [138.0, 36.0], // Center of Nagano prefecture
				zoom: 8,
				pitch: 0, // Disable 3D tilt
				bearing: 0, // Disable rotation
				dragRotate: false, // Disable rotation with drag
				touchPitch: false, // Disable pitch on touch devices
				touchZoomRotate: {
					around: 'center',
					rotate: false // Disable rotation on touch devices
				}
			});

			// Wait for map to load
			map.on('load', () => {
				// Create bounds object
				bounds = new mapbox.LngLatBounds();

				// Add markers for each listing with coordinates
				listings.forEach((listing) => {
					if (listing.coordinates) {
						const { lat, lng } = listing.coordinates;
						const el = document.createElement('div');
						el.className = 'marker';
						el.innerHTML = '⛺️';
						el.style.fontSize = '24px';
						el.style.cursor = 'pointer';

						const marker = new Marker({ element: el })
							.setLngLat([lng, lat])
							.setPopup(
								new mapbox.Popup({ offset: 25 }).setHTML(`
										<div class="w-48">
											<img src="${listing.imageUrl}" alt="${listing.title}" class="w-full h-32 object-cover rounded-t-lg" />
											<div class="p-2">
												<h3 class="font-bold text-sm">${listing.title}</h3>
											</div>
										</div>
									`)
							)
							.addTo(map!);

						markers.push(marker);
						bounds!.extend([lng, lat]);
					}
				});

				// Fit map to show all markers with padding
				if (bounds && !bounds.isEmpty()) {
					map!.fitBounds(bounds, {
						padding: 50,
						maxZoom: 12
					});
				}
			});
		}
	});

	onDestroy(() => {
		if (map) {
			// Remove all markers
			markers.forEach((marker) => marker.remove());
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
