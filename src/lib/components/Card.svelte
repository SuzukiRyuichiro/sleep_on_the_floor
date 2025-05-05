<script lang="ts">
	export let title: string;
	export let imageUrl: string;
	export let price: number;
	export let rating: number;
	export let location: string;
</script>

<a
	href="#"
	class="card preset-filled-surface-100-900 border-[1px] border-surface-200-800 card-hover divide-surface-200-800 block max-w-md divide-y overflow-hidden"
>
	<header>
		<img src={imageUrl} class="aspect-[21/9] w-full object-cover" alt={title} />
	</header>
	<article class="space-y-4 p-4">
		<div>
			<h3 class="h6">{title}</h3>
		</div>
		<p class="text-sm opacity-60">{location}</p>
	</article>
	<footer class="flex items-center justify-between gap-4 p-4">
		<small class="opacity-60">${price} night</small>
		<small class="opacity-60">★ {rating}</small>
	</footer>
</a>
