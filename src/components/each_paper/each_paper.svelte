<script lang="ts">
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	import Interactions from './interactions.svelte';
	import PublishedDateAndID from './published_date_and_id.svelte';
	import PaperTitle from './paper_title.svelte';
	import Authors from './authors.svelte';
	import Summary from './summary.svelte';
	import { EachPaper } from '../../state/each_paper_state.svelte';
	import { paperListState } from '../../state/papers_list.svelte';
	import { page } from '$app/state';

	// Props
	let { paper } = $props();

	// Select or Deselect Paper
	function selectPaper() {
		if (aiConversationState.selectedPapersIDList.indexOf(paper.extractedID) == -1) {
			aiConversationState.selectedPapersList.push(paper);
			aiConversationState.selectedPapersIDList.push(paper.extractedID);
		} else {
			aiConversationState.selectedPapersList = aiConversationState.selectedPapersList.filter(
				(eachPaper) => eachPaper.extractedID != paper.extractedID
			);
			aiConversationState.selectedPapersIDList = aiConversationState.selectedPapersIDList.filter(
				(eachPaperID) => eachPaperID != paper.extractedID
			);
		}
	}

	///
	let paperState = new EachPaper(paper);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="no-scrollbar group" onclick={() => selectPaper()}>
	<div
		class={aiConversationState.selectedPapersIDList.includes(paper.extractedID) == true
			? 'no-scrollbar relative flex cursor-pointer flex-col overflow-scroll rounded-xl border border-emerald-500 bg-white py-3 text-black shadow-emerald-500 drop-shadow-xl transition-all duration-300 ease-in-out'
			: paperState.isFirstInList == true && page.url.pathname != '/bookmarks_page'
				? 'no-scrollbar relative flex cursor-pointer flex-col overflow-scroll rounded-xl border border-black bg-white py-3 text-black drop-shadow-xl transition-all duration-300 ease-in-out'
				: paperState.isReadingSummary == true
					? 'no-scrollbar relative flex cursor-pointer flex-col overflow-scroll rounded-xl border border-black bg-white py-3 text-black drop-shadow-xl transition-all duration-300 ease-in-out'
					: 'no-scrollbar relative flex cursor-pointer flex-col overflow-scroll rounded-xl border border-zinc-300 bg-white py-3 text-zinc-600 drop-shadow-xl transition-all duration-300 ease-in-out group-hover:border-black group-hover:text-black'}
	>
		<div class="px-4">
			<!-- Published Date and ID -->
			<PublishedDateAndID paper={paperState.paper} />

			<!-- Title -->
			<PaperTitle {paperState} />

			<!-- Authors -->
			<Authors paper={paperState.paper} />

			<!-- Interactions -->
			<Interactions {paperState} />
		</div>

		<!-- Summary -->
		<Summary {paperState} />
	</div>
</div>
