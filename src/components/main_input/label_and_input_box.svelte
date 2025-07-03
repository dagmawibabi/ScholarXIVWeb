<script lang="ts">
	let {
		label = '',
		placeholder = '',
		state = $bindable(),
		type = 'text',
		hasError = false
	} = $props();
</script>

<div class="flex flex-row items-center gap-x-1">
	<div
		class="w-full overflow-clip rounded-lg border bg-white hover:border-zinc-400 {hasError
			? 'border-red-500'
			: 'border-zinc-200'}"
	>
		<input
			{type}
			class="w-full bg-white px-3 py-1 text-sm outline-none"
			{placeholder}
			bind:value={state}
		/>
	</div>

	{#if label}
		<div class="line-clamp-1 w-24 pl-2 text-left text-sm">{label}</div>
	{/if}
</div>
