<script lang="ts">
	export let title: string;
	export let imageUrl: string;
	export let category: string;
	export let location: string;
	export let href: string;
</script>

<a {href} class="block group cursor-pointer">
	<div class="flex flex-col items-start max-w-md">
		<img
			src={imageUrl}
			alt={title}
			class="w-full aspect-[21/9] object-cover rounded-2xl mb-3 group-hover:opacity-90 transition"
		/>
		<h3 class="h6 mb-1">{title}</h3>
		<p class="text-sm opacity-60 mb-2">{location}</p>
		{#if category === 'Camp Site'}
			<span
				class="inline-flex items-center gap-1 rounded-full bg-primary/20 text-primary px-3 py-1 text-xs font-semibold"
			>
				⛺️ Camp Site
			</span>
		{:else if category === 'Park'}
			<span
				class="inline-flex items-center gap-1 rounded-full bg-secondary/20 text-secondary px-3 py-1 text-xs font-semibold"
			>
				🌳 Park
			</span>
		{:else if category === 'Pergola'}
			<span
				class="inline-flex items-center gap-1 rounded-full bg-accent/20 text-accent px-3 py-1 text-xs font-semibold"
			>
				🏕️ Pergola
			</span>
		{:else}
			<span
				class="inline-flex items-center gap-1 rounded-full bg-muted/20 text-muted px-3 py-1 text-xs font-semibold"
			>
				{category}
			</span>
		{/if}
	</div>
</a>
