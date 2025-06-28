<script lang="ts">
	import { Trash2, Minimize, Maximize } from 'lucide-svelte';

	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	const plugins = [gfmPlugin()];
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	import SelectedPapers from './selected_papers.svelte';
	import axios from 'axios';

	let minimizeConversation = $state(false);
	let examplePrompts = [
		'Summarize this paper for me?',
		'When was this paper published?',
		'Explain this paper in simple terms?',
		'What are the key points of this paper?',
		'Compare and contrast these papers in table format?',
		'Do you know anything about the authors?',
		'Make a joke based on this paper',
		'What is the pdf link?'
	];

	async function chatWithAI(promptContent: any) {
		aiConversationState.conversation.push({
			from: 'user',
			content: promptContent
		});
		aiConversationState.conversation.push({
			from: 'system',
			content: 'thinking ...'
		});
		const response = await axios.post('/api/ai_chat', {
			apiKey: '',
			selectedPapers: JSON.stringify(aiConversationState.selectedPapersList),
			conversation: JSON.stringify(aiConversationState.conversation),
			prompt: promptContent
		});

		aiConversationState.conversation.pop();
		aiConversationState.conversation.push({
			from: 'ai',
			content: response.data
		});
	}
</script>

<div
	class={minimizeConversation == true
		? 'no-scrollbar max-h-8 min-h-8 overflow-clip p-3'
		: 'no-scrollbar max-h-[600px] min-h-10 overflow-clip p-3'}
>
	<!-- AI Options -->
	<div class="flex w-full items-center justify-between pb-2">
		<!-- Selected Papers -->
		<SelectedPapers />

		<!-- Clear / Minimize Conversation -->
		<div class="flex cursor-pointer items-center gap-2 pr-2 text-zinc-500">
			<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
				<Trash2
					size={14}
					class="hover:text-black"
					onclick={() => (aiConversationState.conversation = [])}
				/>
			</div>
			<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
				<Trash2
					size={16}
					class="hover:text-black"
					onclick={() => (aiConversationState.conversation = [])}
				/>
			</div>
			{#if minimizeConversation == true}
				<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
					<Maximize
						size={14}
						class="hover:text-black"
						onclick={() => (minimizeConversation = !minimizeConversation)}
					/>
				</div>
				<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
					<Maximize
						size={16}
						class="hover:text-black"
						onclick={() => (minimizeConversation = !minimizeConversation)}
					/>
				</div>
			{:else}
				<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
					<Minimize
						size={14}
						class="hover:text-black"
						onclick={() => (minimizeConversation = !minimizeConversation)}
					/>
				</div>
				<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
					<Minimize
						size={16}
						class="hover:text-black"
						onclick={() => (minimizeConversation = !minimizeConversation)}
					/>
				</div>
			{/if}
		</div>
	</div>

	<!-- Chats -->
	<div
		class={aiConversationState.conversation.length > 0
			? 'no-scrollbar max-h-[580px] overflow-scroll pb-24 pt-4'
			: 'no-scrollbar pb-0'}
	>
		{#if aiConversationState.conversation.length > 0}
			{#each aiConversationState.conversation as eachMessage}
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
			{/each}
		{:else}
			<div
				class={'no-scrollbar flex max-h-[580px] w-full flex-col items-center justify-center gap-y-2 overflow-scroll py-1 pb-24 pt-14'}
			>
				{#each examplePrompts as eachPrompt}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="no-scrollbar w-fit max-w-[80%] cursor-pointer rounded-xl border bg-white px-3 py-1 text-sm hover:border-zinc-400"
						onclick={() => chatWithAI(eachPrompt)}
					>
						<Markdown md={eachPrompt} {plugins} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
