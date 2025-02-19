<script lang="ts">
	import { CircleCheckBig } from 'lucide-svelte';
	import { aiConversationState } from '../state/ai_conversation_state.svelte';

	const { paperList, loadingState } = $props();

	function selectAll() {
		if (aiConversationState.selectedPapersList.length == length && loadingState == false) {
			aiConversationState.selectedPapersList = [];
			aiConversationState.selectedPapersIDList = [];
			paperList.forEach((eachPaper: any) => {
				aiConversationState.selectedPapersList.push(eachPaper);
				aiConversationState.selectedPapersIDList.push(eachPaper['extractedID']);
			});
		} else {
			aiConversationState.selectedPapersList = [];
			aiConversationState.selectedPapersIDList = [];
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={aiConversationState.selectedPapersList.length > 0
		? 'flex h-7 w-14 items-center justify-center rounded-full px-1 hover:bg-zinc-100'
		: 'flex h-7 w-14 items-center justify-center rounded-full p-1 hover:bg-zinc-100'}
	onclick={() => selectAll()}
>
	<div
		class={aiConversationState.selectedPapersList.length > 0
			? 'px-1 pb-1 font-semibold text-emerald-500'
			: 'px-1 pb-1 font-semibold text-zinc-400'}
	>
		{aiConversationState.selectedPapersList.length}
	</div>
	<CircleCheckBig
		size={18}
		class={aiConversationState.selectedPapersList.length == paperList.length &&
		loadingState == false &&
		paperList.length > 0
			? 'cursor-pointer text-emerald-500'
			: 'cursor-pointer'}
	/>
</div>
