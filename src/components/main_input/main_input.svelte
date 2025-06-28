<script lang="ts">
	let { isCommentMode = false } = $props();
	import { MessageCircle, Search, Settings2, Sparkles } from 'lucide-svelte';
	import { inputState } from '../../state/input_state.svelte';
	import axios from 'axios';
	import { paperListState } from '../../state/papers_list.svelte';
	import { Circle } from 'svelte-loading-spinners';
	import AiChat from '../ai_chat/ai_chat.svelte';
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	import InputSettings from './input_settings.svelte';
	import SelectedPapers from '../ai_chat/selected_papers.svelte';
	import { authClient } from '$lib/auth_client';
	import { page } from '$app/state';
	import { commentState } from '../../state/comment_state.svelte';

	async function searchPaper() {
		if (inputState.searchContent.trim().length > 0) {
			inputState.isSearching = true;
			inputState.statusText = `Searching for `;
			inputState.lastSearch = inputState.searchContent;
			inputState.advancedSearch = false;
			paperListState.paperList = [];
			const response = await axios.post('/api/search_papers', {
				startIndex: inputState.startIndex,
				maxResults: inputState.maxResults,
				searchFilterString: {
					all: inputState.searchContent.replace(':', '')
				},
				sortBy: inputState.sortBy == 'Sort By' ? 'relevance' : inputState.sortBy,
				sortOrder: inputState.sortOrder == 'Sort Order' ? 'ascending' : inputState.sortOrder
			});
			paperListState.paperList = [];
			paperListState.paperList = response.data;
			inputState.isSearching = false;
			inputState.statusText = `Results for `;
		}
	}

	async function chatWithAI() {
		if (inputState.aiInput.trim().length > 0) {
			aiConversationState.conversation.push({
				from: 'user',
				content: inputState.aiInput
			});
			inputState.aiInput = '';
			aiConversationState.conversation.push({
				from: 'system',
				content: 'thinking ...'
			});
			const response = await axios.post('/api/ai_chat', {
				selectedPapers: JSON.stringify(aiConversationState.selectedPapersList),
				conversation: JSON.stringify(aiConversationState.conversation),
				prompt:
					aiConversationState.conversation[aiConversationState.conversation.length - 2].content
			});
			aiConversationState.conversation.pop();
			aiConversationState.conversation.push({
				from: 'ai',
				content: response.data
			});
		}
	}

	async function commentOnPaper() {
		if (commentState.comment.trim().length > 0) {
			commentState.isCommenting = true;
			const extractedID = page.url.pathname.split('/').pop();
			const response = await fetch('/api/comment_on_paper', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					parentID: null,
					extractedID: extractedID,
					comment: commentState.comment
				})
			});
			const data = await response.json();
			console.log(data);
			commentState.comment = '';
			commentState.comments = data;
			commentState.isCommenting = false;
		}
	}

	function handleEnter(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (isAIMode == true) {
				chatWithAI();
			} else if (isCommentMode == true) {
				commentOnPaper();
			} else {
				searchPaper();
			}
		}
	}

	let isAIMode = $state(false);

	// const isCommentMode = $state(page.url.pathname.split('/')[1] == 'comments');
	let session = authClient.useSession();
</script>

<div
	class="no-scrollbar absolute bottom-0 left-0 right-0 m-auto h-fit w-full rounded-tl-xl rounded-tr-xl border-t border-zinc-200 pb-4
	backdrop-blur-lg md:w-2/3 lg:w-2/4 xl:w-2/5 2xl:w-2/5"
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
						onkeydown={handleEnter}
					/>
				{:else if isCommentMode == true}
					<MessageCircle size={18} class="text-zinc-400" />
					<input
						type="text"
						class="w-full bg-white pb-1 outline-none"
						placeholder="Comment ..."
						bind:value={commentState.comment}
						onkeydown={handleEnter}
					/>
				{:else}
					<Search size={18} class="text-zinc-400" />
					<input
						type="text"
						class="w-full bg-white pb-1 outline-none"
						placeholder="Search ..."
						bind:value={inputState.searchContent}
						onkeydown={handleEnter}
					/>
				{/if}
			</div>

			<!-- Settings and AI Toggle -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="m-auto flex items-center pr-1">
				{#if isCommentMode == false}
					<InputSettings {isAIMode} />
				{/if}
				{#if isAIMode}
					<div
						class="cursor-pointer rounded-full p-2 text-zinc-600 hover:bg-zinc-100 hover:text-black"
						onclick={() => (isAIMode = !isAIMode)}
					>
						{#if isCommentMode == false}
							<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
								<Search size={14} />
							</div>
							<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
								<Search size={17} />
							</div>
						{:else}
							<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
								<MessageCircle size={14} />
							</div>
							<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
								<MessageCircle size={17} />
							</div>
						{/if}
					</div>
				{:else if $session.data}
					<div
						class="cursor-pointer rounded-full p-2 text-zinc-600 hover:bg-zinc-100 hover:text-black"
						onclick={() => (isAIMode = !isAIMode)}
					>
						<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
							<Sparkles size={14} />
						</div>
						<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
							<Sparkles size={17} />
						</div>
					</div>
				{/if}
			</div>

			<!-- Search Button -->
			{#if inputState.isSearching == true || commentState.isCommenting == true}
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
						if (isAIMode == true) {
							await chatWithAI();
						} else if (isCommentMode == true) {
							await commentOnPaper();
						} else {
							await searchPaper();
						}
					}}
				>
					<div
						class="flex h-full w-24 cursor-pointer items-center justify-center border-l group-hover/search:bg-black group-hover/search:text-white"
					>
						<span>
							{isAIMode == true ? 'Send' : isCommentMode == true ? 'Comment' : 'Search'}
						</span>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
