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

	// Drawer state management
	let drawerElement: HTMLDivElement | undefined;
	let isDrawerExpanded = false;
	let isDragging = false;
	let startY = 0;
	let startHeight = 0;
	let currentHeight = 80; // Initial collapsed height in pixels

	const minHeight = 80;
	let maxHeight = 600; // Default value for SSR

	function handleTouchStart(event: TouchEvent) {
		isDragging = true;
		startY = event.touches[0].clientY;
		startHeight = currentHeight;
		event.preventDefault();
	}

	function handleTouchMove(event: TouchEvent) {
		if (!isDragging) return;
		
		const deltaY = startY - event.touches[0].clientY;
		const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY));
		currentHeight = newHeight;
		
		// Update expanded state based on height
		isDrawerExpanded = currentHeight > minHeight + 50;
		event.preventDefault();
	}

	function handleTouchEnd() {
		if (!isDragging) return;
		isDragging = false;
		
		// Snap to collapsed or expanded state
		if (currentHeight < maxHeight * 0.3) {
			currentHeight = minHeight;
			isDrawerExpanded = false;
		} else {
			currentHeight = maxHeight;
			isDrawerExpanded = true;
		}
	}

	function toggleDrawer() {
		if (isDrawerExpanded) {
			currentHeight = minHeight;
			isDrawerExpanded = false;
		} else {
			currentHeight = maxHeight;
			isDrawerExpanded = true;
		}
	}

	onMount(() => {
		// Set maxHeight based on actual window height
		maxHeight = window.innerHeight * 0.8;
		currentHeight = minHeight;

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

	<!-- Mobile: Pullable Drawer Overlay -->
	<div class="fixed inset-x-0 bottom-0 z-30 md:hidden pointer-events-none">
		<div
			bind:this={drawerElement}
			class="bg-white rounded-t-2xl shadow-2xl pointer-events-auto transition-all duration-300 flex flex-col"
			style="height: {currentHeight}px"
		>
			<!-- Drawer Handle -->
			<button 
				class="flex flex-col items-center cursor-pointer select-none py-2 flex-shrink-0 w-full bg-transparent border-none"
				on:touchstart={handleTouchStart}
				on:touchmove={handleTouchMove}
				on:touchend={handleTouchEnd}
				on:click={toggleDrawer}
				aria-label="Toggle location list"
			>
				<div class="w-12 h-1.5 bg-gray-300 rounded-full"></div>
				<div class="text-sm text-gray-600 mt-1 font-medium">
					{isDrawerExpanded ? 'Locations' : `${listings.length} locations`}
				</div>
			</button>

			<!-- Scrollable Content -->
			<div class="flex-1 overflow-y-auto px-4 pb-4">
				<div class="flex flex-col gap-4">
					{#each listings as listing}
						<Card {...listing} />
					{/each}
				</div>
				<div class="mt-4">
					<Footer>
						<p>
							Made by <a href="https://ryuichirosuzuki.com" class="font-bold">Scooter</a> 🛵
						</p>
					</Footer>
				</div>
			</div>
		</div>
	</div>
</main>
