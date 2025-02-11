<script lang="ts">
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Layers, Trash2 } from 'lucide-svelte';
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	function unselectPaper(paper: any) {
		aiConversationState.selectedPapersList = aiConversationState.selectedPapersList.filter(
			(eachPaper) => eachPaper.extractedID != paper.extractedID
		);
		aiConversationState.selectedPapersIDList = aiConversationState.selectedPapersIDList.filter(
			(eachPaperID) => eachPaperID != paper.extractedID
		);
	}
</script>

<!-- Selected Papers -->
<Popover.Root>
	<Popover.Trigger class="bg-transparent outline-none"
		><div class="flex cursor-pointer items-center gap-x-2 text-xs text-zinc-500 hover:text-black">
			<Layers size={14} />
			<span>{aiConversationState.selectedPapersList.length} papers selected</span>
		</div></Popover.Trigger
	>
	{#if aiConversationState.selectedPapersList.length > 0}
		<Popover.Content class="w-80 border bg-transparent p-1 text-sm drop-shadow backdrop-blur-lg">
			<div class="grid gap-4">
				<div class="space-y-1">
					{#each aiConversationState.selectedPapersList as eachSelectedPaper}
						<div
							class="flex cursor-default items-center overflow-clip rounded-sm border hover:border-black hover:bg-white"
						>
							<div class="line-clamp-2 w-full px-2 py-1 text-xs">
								<span> {eachSelectedPaper['title']} </span>
							</div>
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div
								class="flex w-10 cursor-pointer items-center border-l px-3 py-3 text-zinc-500 hover:bg-zinc-100 hover:text-red-500"
								onclick={() => unselectPaper(eachSelectedPaper)}
							>
								<Trash2 size={15} />
							</div>
						</div>
					{/each}
				</div>
			</div>
		</Popover.Content>
	{/if}
</Popover.Root>
