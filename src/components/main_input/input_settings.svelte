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
				<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
					<SlidersHorizontal size={17} />
				</div>
				<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
					<SlidersHorizontal size={19} />
				</div>
			{:else}
				<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
					<ScanText size={17} />
				</div>
				<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
					<ScanText size={19} />
				</div>
			{/if}
		</div>
	</Dialog.Trigger>

	{#if isAIMode}
		<AiSettings />
	{:else}
		<AdvancedSearch />
	{/if}
</Dialog.Root>
