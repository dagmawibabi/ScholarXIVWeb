<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { ScanSearch, ScanText, Settings2, SlidersHorizontal } from 'lucide-svelte';
	import AdvancedSearch from './advanced_search.svelte';
	import AiSettings from './ai_settings.svelte';
	let { isAIMode } = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger class="outline-none">
		<div class="cursor-pointer rounded-full p-2 text-zinc-600 hover:bg-zinc-100 hover:text-black">
			{#if isAIMode}
				<SlidersHorizontal size={17} />
			{:else}
				<ScanText size={17} />
			{/if}
		</div>
	</Dialog.Trigger>

	{#if isAIMode}
		<AiSettings />
	{:else}
		<AdvancedSearch />
	{/if}
</Dialog.Root>
