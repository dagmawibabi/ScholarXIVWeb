<script lang="ts">
	import { ExternalLink } from 'lucide-svelte';
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	import { page } from '$app/state';

	// Props
	let { paperState } = $props();
</script>

<!-- Title -->
<a
	href={paperState.paper['pdfLink']}
	target="_blank"
	rel="noopener noreferrer"
	download
	class={aiConversationState.selectedPapersIDList.includes(paperState.paper['extractedID']) == true
		? 'group/title font-semibold text-emerald-600 transition-all duration-300 ease-in-out'
		: paperState.isFirstInList == true && page.url.pathname != '/bookmarks_page'
			? 'font-semibold text-black'
			: paperState.isReadingSummary
				? 'font-semibold text-black'
				: 'group/title font-semibold text-zinc-500 transition-all duration-300 ease-in-out group-hover:text-black'}
>
	<span class={'decoration-zinc-400 decoration-1 underline-offset-4 hover:underline'}>
		{paperState.paper['title']}
	</span>
	<div class="hidden group-hover/title:inline-block">
		<ExternalLink size={12} />
	</div>
</a>
