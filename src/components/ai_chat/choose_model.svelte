<script lang="ts">
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { ChevronsUpDown } from 'lucide-svelte';
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
</script>

<!-- Choose Model -->
<Popover.Root>
	<Popover.Trigger class="bg-transparent"
		><div class="flex cursor-pointer items-center gap-x-2 text-xs text-zinc-500 hover:text-black">
			<span> {aiConversationState.currentModel.model} </span>
			<ChevronsUpDown size={14} />
		</div></Popover.Trigger
	>
	<Popover.Content class="w-30 border bg-transparent p-1 text-sm drop-shadow backdrop-blur-lg ">
		<div class="grid space-y-1">
			{#each aiConversationState.models as eachModel}
				<div class="flex items-center rounded-sm border">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="cursor-pointer pl-1 text-zinc-500 hover:text-black"
						onclick={() => (aiConversationState.currentModel = eachModel)}
					>
						<div class="px-2 py-1 text-xs">
							<span> {eachModel.model} </span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</Popover.Content>
</Popover.Root>
