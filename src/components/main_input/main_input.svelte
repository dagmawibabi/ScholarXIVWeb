<script lang="ts">
	import { Search, Sparkles } from 'lucide-svelte';
	import { inputState } from '../../state/input_state.svelte';
	import axios from 'axios';
	import { paperListState } from '../../state/papers_list.svelte';
	import { Circle } from 'svelte-loading-spinners';
	import AiChat from '../ai_chat/ai_chat.svelte';
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';

	async function searchPaper() {
		if (inputState.searchContent.length > 0) {
			inputState.isSearching = true;
			paperListState.paperList = [];
			const response = await axios.post('/api/search_papers', {
				startIndex: 0,
				maxResults: 20,
				searchFilterString: {
					all: inputState.searchContent
				},
				sortBy: 'relevance',
				sortOrder: 'ascending'
			});
			inputState.lastSearch = inputState.searchContent;
			paperListState.paperList = response.data;
			inputState.isSearching = false;
		}
	}

	let isAIMode = $state(false);
</script>

<div
	class="no-scrollbar absolute bottom-0 left-0 right-0 m-auto h-fit w-full rounded-tl-xl rounded-tr-xl border-t border-zinc-200 pb-4
	backdrop-blur-md md:w-2/3 lg:w-2/4 xl:w-2/5 2xl:w-2/5"
>
	{#if isAIMode == true}
		<AiChat />
	{/if}

	<!-- Main Input Box -->
	<div class="no-scrollbar flex flex-col bg-transparent px-2 pt-2">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="group flex overflow-clip rounded-3xl border border-zinc-400 bg-white">
			<!-- Input Box -->
			<div class="flex w-full items-center gap-x-2 px-3 py-2">
				{#if isAIMode == true}
					<Sparkles size={18} class="text-zinc-400" />
					<input
						type="text"
						class="w-full bg-white pb-1 outline-none"
						placeholder={`Chat with ${aiConversationState.currentModel.name} ...`}
						bind:value={inputState.aiInput}
					/>
				{:else}
					<Search size={18} class="text-zinc-400" />
					<input
						type="text"
						class="w-full bg-white pb-1 outline-none"
						placeholder="Search ..."
						bind:value={inputState.searchContent}
					/>
				{/if}
			</div>

			<!-- AI Toggle -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="m-auto pr-1">
				<div
					class="cursor-pointer rounded-full p-2 text-zinc-600 hover:bg-zinc-200 hover:text-black"
					onclick={() => (isAIMode = !isAIMode)}
				>
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					{#if isAIMode}
						<Search size={14} />
					{:else}
						<Sparkles size={14} />
					{/if}
				</div>
			</div>

			<!-- Search Button -->
			{#if inputState.isSearching == true}
				<div>
					<div class="flex h-full w-20 items-center justify-center border-l">
						<Circle size="22" color="#000000" duration="1s" />
					</div>
				</div>
			{:else}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="group/search group-hover:bg-zinc-200"
					onclick={async () => {
						await searchPaper();
					}}
				>
					<div
						class="flex h-full w-20 cursor-pointer items-center justify-center border-l group-hover/search:bg-black group-hover/search:text-white"
					>
						<span> {isAIMode == true ? 'Send' : 'Search'} </span>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
