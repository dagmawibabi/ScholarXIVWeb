<script lang="ts">
	import { page } from '$app/state';
	import { Scroll } from 'lucide-svelte';

	// Props
	let { paperState } = $props();
</script>

<!-- Summary -->
<div class="px-3">
	<div
		class={paperState.isReadingSummary == true
			? 'pt-3 text-sm transition-all duration-300 ease-in-out'
			: paperState.isFirstInList == true &&
				  paperState.isReadingSummary == false &&
				  page.url.pathname != '/bookmarks_page'
				? 'hidden pt-3 text-sm transition-all duration-300 ease-in-out md:flex lg:flex xl:flex 2xl:flex'
				: 'hidden pt-3 text-sm transition-all duration-300 ease-in-out'}
	>
		<div class="text-sm transition-all duration-300 ease-in-out">
			<div
				class="rounded-lg rounded-bl-md rounded-br-md border border-zinc-300 px-3 pb-3 pt-2 shadow-lg drop-shadow-xl transition-all duration-300 ease-in-out hover:shadow-xl"
			>
				<div class="flex items-center gap-x-1 pb-1 text-xs text-zinc-600">
					<Scroll size={12} />
					<span class="pb-[2.5px]"> Summary </span>
				</div>
				<span class="text-zinc-800">
					{paperState.paper['summary']},
				</span>
			</div>
		</div>
	</div>
</div>
