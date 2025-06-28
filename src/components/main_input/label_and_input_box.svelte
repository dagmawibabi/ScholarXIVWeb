<script lang="ts">
	let { label, placeholder, state = $bindable() } = $props();
</script>

<div class="flex flex-row items-center gap-x-1">
	<div
		class="w-full overflow-clip rounded-lg border border-zinc-200 bg-white hover:border-zinc-400"
	>
		<input
			type="text"
			class="w-full bg-white px-3 py-1 text-sm outline-none"
			{placeholder}
			bind:value={state}
		/>
	</div>

	{#if label}
		<div class="line-clamp-1 w-24 pl-2 text-left text-sm">{label}</div>
	{/if}
</div>
