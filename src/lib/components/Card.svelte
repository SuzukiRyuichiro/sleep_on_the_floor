<script lang="ts">
	export let title: string;
	export let imageUrl: string;
	export let price: number;
	export let rating: number;
	export let location: string;
</script>

<div
	class="w-full rounded-xl overflow-hidden shadow-sm transition-transform duration-200 cursor-pointer hover:scale-102"
>
	<div class="relative w-full pb-[100%]">
		<img src={imageUrl} alt={title} class="absolute top-0 left-0 w-full h-full object-cover" />
	</div>
	<div class="p-3">
		<div class="flex justify-between items-center mb-1">
			<h3 class="m-0 text-base font-semibold">{title}</h3>
			<div class="flex items-center gap-1">
				<span>★</span>
				<span>{rating}</span>
			</div>
		</div>
		<p class="text-secondary text-sm my-1">{location}</p>
		<p class="font-semibold my-1">${price} night</p>
	</div>
</div>
