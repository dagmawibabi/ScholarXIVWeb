<script>
	import { User } from 'lucide-svelte';

	// Props
	let { paper } = $props();
</script>

<!-- Authors -->
<div class="no-scrollbar flex items-center gap-x-1 overflow-scroll pb-2 pt-1">
	<User size={12} />
	{#each paper['authors'] as eachAuthor}
		<div class="no-scrollbar linc w-fit pb-[1px] text-xs italic">
			<span>
				{eachAuthor},
			</span>
		</div>
	{/each}
</div>
