<script lang="ts">
	import { Trash2, Sparkles, Layers, Minimize, Maximize } from 'lucide-svelte';

	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	const plugins = [gfmPlugin()];
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	import SelectedPapers from './selected_papers.svelte';

	let minimizeConversation = $state(false);
</script>

<div
	class={minimizeConversation == true
		? 'no-scrollbar max-h-10 min-h-10 overflow-clip p-2'
		: 'no-scrollbar max-h-[600px] min-h-10 overflow-clip p-2'}
>
	<!-- AI Options -->
	<div class="flex w-full items-center justify-between pb-2">
		<!-- Selected Papers -->
		<SelectedPapers />

		<!-- Clear / Minimize Conversation -->
		<div class="flex cursor-pointer items-center gap-2 pr-2 text-zinc-500">
			<Trash2
				size={14}
				class="hover:text-black"
				onclick={() => (aiConversationState.conversation = [])}
			/>
			{#if minimizeConversation == true}
				<Maximize
					size={14}
					class="hover:text-black"
					onclick={() => (minimizeConversation = !minimizeConversation)}
				/>
			{:else}
				<Minimize
					size={14}
					class="hover:text-black"
					onclick={() => (minimizeConversation = !minimizeConversation)}
				/>
			{/if}
		</div>
	</div>

	<!-- Chats -->
	<div
		class={aiConversationState.conversation.length > 0
			? 'no-scrollbar max-h-[580px] overflow-scroll pb-24'
			: 'no-scrollbar pb-0'}
	>
		<!-- {#each aiConversationState.conversation as eachMessage}
					<div
						class={eachMessage.from == 'user'
							? 'no-scrollbar flex w-full justify-end py-1'
							: 'no-scrollbar flex w-full justify-start py-1'}
					>
						<div
							class={eachMessage.from == 'system'
								? 'no-scrollbar max-w-[80%] animate-pulse rounded-xl border bg-white px-3 py-1 text-sm'
								: 'no-scrollbar max-w-[80%] rounded-xl border bg-white px-3 py-1 text-sm'}
						>
							<Markdown md={eachMessage['content']} {plugins} />
						</div>
					</div>
				{/each} -->
	</div>
</div>
