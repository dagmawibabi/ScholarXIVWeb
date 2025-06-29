<script lang="ts">
	import Navigation from '../../components/navigation.svelte';
	import FeedSkeletons from '../../components/skeleton/feed_skeletons.svelte';
	import Footer from '../../components/footer.svelte';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import EachPaper from '../../components/each_paper/each_paper.svelte';
	import { Toaster } from 'svelte-sonner';
	import { paperListState } from '../../state/papers_list.svelte';
	import { inputState } from '../../state/input_state.svelte';
	import {
		ChevronLeft,
		ChevronRight,
		CircleCheckBig,
		Library,
		Settings,
		Settings2
	} from 'lucide-svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { suggestedPaperTitles } from '$lib/constants';
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	import { authClient } from '$lib/auth_client';
	import SelectAll from '../../components/select_all.svelte';

	async function searchPaper(onPurpose: boolean = false) {
		if (inputState.searchContent.trim().length > 0 || onPurpose == true) {
			inputState.isSearching = true;
			inputState.statusText = `Searching for `;
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
			inputState.lastSearch = inputState.searchContent;
			inputState.isSearching = false;
			inputState.statusText = `Results for `;
		}
	}

	// Constants for default values
	const SORT_BY_DEFAULT = 'relevance';
	const SORT_ORDER_DEFAULT = 'ascending';

	inputState.searchContent = '';
	// inputState.lastSearch = '';

	async function randomSearch(onPurpose: boolean = false): Promise<void> {
		try {
			if (inputState.lastSearch === '' || onPurpose) {
				inputState.statusText = 'Recommended keyword';
				// Filter out current search term to avoid repetition
				const availableTopics = suggestedPaperTitles.filter(
					(topic) => topic !== inputState.lastSearch
				);
				// If no other topics available, use current one, otherwise pick a random one from filtered list
				const randomTopic =
					availableTopics.length > 0
						? availableTopics[Math.floor(Math.random() * availableTopics.length)]
						: suggestedPaperTitles[Math.floor(Math.random() * suggestedPaperTitles.length)];
				inputState.searchContent = randomTopic;
				inputState.lastSearch = inputState.searchContent;
				inputState.isSearching = true;

				const response = await axios.post('/api/search_papers', {
					startIndex: inputState.startIndex,
					maxResults: inputState.maxResults,
					searchFilterString: {
						all: inputState.searchContent
					},
					sortBy: inputState.sortBy === 'Sort By' ? SORT_BY_DEFAULT : inputState.sortBy,
					sortOrder:
						inputState.sortOrder === 'Sort Order' ? SORT_ORDER_DEFAULT : inputState.sortOrder
				});

				// Update the paper list directly since paperListState is not a Svelte store
				paperListState.paperList = response.data;
				inputState.lastSearch = inputState.searchContent;
			}
		} catch (error) {
			console.error('Failed to fetch random papers:', error);
			inputState.statusText = 'Failed to load recommendations. ';
			// You might want to show a user-friendly error message here
		} finally {
			inputState.isSearching = false;
		}
	}

	let isfeedControlsOn = $state(false);

	aiConversationState.selectedPapersList = [];
	aiConversationState.selectedPapersIDList = [];

	randomSearch();

	const session = authClient.getSession();
</script>

<svelte:head>
	<title>ScholarXIV</title>
	<meta property="og:title" content="ScholarXIV" />
	<meta property="og:description" content="Open-source & AI powered research paper explorer" />
	<meta
		property="og:image"
		content="https://www.dagmawi.dev/_app/immutable/assets/ScholarXIV.BLhCS-yg.png"
	/>
	<meta property="og:url" content="https://scholarxiv.com" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="ScholarXIV" />
</svelte:head>

<div class="m-auto w-full px-3 md:w-2/3 lg:w-2/4 lg:px-0 xl:w-2/5 xl:px-0 2xl:w-2/5 2xl:px-0">
	<!-- Title and Profile -->
	<Navigation />

	<!-- Paper List -->
	<div>
		<!-- STATUS TEXTS AND FEED AND SELECT ALL-->
		<div class="flex justify-between pb-2 pr-2 pt-6">
			<!-- Status -->
			<div class="pl-2">
				<span class="hidden md:inline lg:inline xl:inline 2xl:inline">
					{inputState.statusText}
				</span>
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<span
					class="cursor-pointer font-semibold italic underline-offset-4 hover:underline"
					onclick={() => randomSearch(true)}
				>
					"{inputState.lastSearch}"
				</span>
			</div>

			<!-- Feed Control Toggle and Select All -->
			<div class="flex items-center">
				<!-- Feed Control -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="rounded-full p-1 hover:bg-zinc-100"
					onclick={() => (isfeedControlsOn = !isfeedControlsOn)}
				>
					<Settings2 size={18} class="cursor-pointer" />
				</div>

				<!-- Select All -->
				<SelectAll paperList={paperListState.paperList} loadingState={inputState.isSearching} />
			</div>
		</div>

		<!-- FEED CONTROL -->
		{#if isfeedControlsOn}
			<div
				class="mx-auto flex w-fit flex-col items-center justify-center gap-x-2 gap-y-2 rounded-3xl border-zinc-200 bg-zinc-50 px-[6px] py-1 md:flex-row md:rounded-full lg:flex-row lg:rounded-full xl:flex-row xl:rounded-full 2xl:flex-row 2xl:rounded-full"
			>
				<div class="flex items-center gap-x-2">
					<!-- SORT BY-->
					<Select.Root
						type="single"
						bind:value={inputState.sortBy}
						onValueChange={() => searchPaper(true)}
					>
						<Select.Trigger
							class="w-[170px] rounded-full border border-zinc-200 text-sm hover:border-zinc-400 focus:outline-none focus:ring-0"
							>{inputState.sortBy}</Select.Trigger
						>
						<Select.Content>
							<Select.Item value="relevance">Relevance</Select.Item>
							<Select.Item value="lastUpdatedDate">Last Updated Date</Select.Item>
							<Select.Item value="submittedDate">Submitted Date</Select.Item>
						</Select.Content>
					</Select.Root>

					<!-- SORT ORDER -->
					<Select.Root
						type="single"
						bind:value={inputState.sortOrder}
						onValueChange={() => searchPaper(true)}
					>
						<Select.Trigger
							class="w-[130px] rounded-full border border-zinc-200 text-sm hover:border-zinc-400 focus:outline-none focus:ring-0"
							>{inputState.sortOrder}</Select.Trigger
						>
						<Select.Content>
							<Select.Item value="ascending">Ascending</Select.Item>
							<Select.Item value="descending">Descending</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>

				<div class="flex items-center gap-x-2">
					<!-- PAGINATION -->
					<div
						class="flex items-center gap-x-1 rounded-full border border-zinc-200 bg-white px-1 py-1 text-sm hover:border-zinc-400"
					>
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="cursor-pointer rounded-full p-1 hover:bg-zinc-100"
							onclick={async () => {
								if (inputState.startIndex > 0) {
									inputState.startIndex -= 1;
									await searchPaper(true);
								}
							}}
						>
							<ChevronLeft size={20} />
						</div>
						Page {inputState.startIndex + 1}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="cursor-pointer rounded-full p-1 hover:bg-zinc-100"
							onclick={async () => {
								inputState.startIndex += 1;
								await searchPaper(true);
							}}
						>
							<ChevronRight size={20} />
						</div>
					</div>

					<!-- MAX RESULTS -->
					<div
						class="flex items-center gap-x-1 rounded-full border border-zinc-200 bg-white px-1 py-1 text-sm hover:border-zinc-400"
					>
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="cursor-pointer rounded-full p-1 hover:bg-zinc-100"
							onclick={async () => {
								if (inputState.maxResults > 2) {
									inputState.maxResults -= 1;
									await searchPaper(true);
								}
							}}
						>
							<ChevronLeft size={20} />
						</div>
						Results {inputState.maxResults}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="cursor-pointer rounded-full p-1 hover:bg-zinc-100"
							onclick={async () => {
								inputState.maxResults += 1;
								await searchPaper();
							}}
						>
							<ChevronRight size={20} />
						</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- Paper List -->
		<div class="flex flex-col gap-y-4 pb-3 pt-3">
			{#if inputState.isSearching == true}
				<FeedSkeletons />
			{:else}
				{#each paperListState.paperList as eachPaper}
					<EachPaper paper={eachPaper} />
				{/each}
			{/if}
		</div>
	</div>

	<!-- Space -->
	<div class="h-24"></div>

	<!-- Paper Count -->
	<div class="text-center text-xs">
		<!-- Result Count -->
		<div class="pb-4">Showing {paperListState.paperList.length} Papers.</div>

		<!-- PAGINATION -->
		<div
			class="mx-auto flex w-fit items-center gap-x-1 rounded-full border border-zinc-200 bg-white px-1 py-1 text-sm hover:border-zinc-400"
		>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="cursor-pointer rounded-full p-1 hover:bg-zinc-100"
				onclick={async () => {
					if (inputState.startIndex > 0) {
						inputState.startIndex -= 1;
						await searchPaper(true);
					}
				}}
			>
				<ChevronLeft size={20} />
			</div>
			Page {inputState.startIndex + 1}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="cursor-pointer rounded-full p-1 hover:bg-zinc-100"
				onclick={async () => {
					inputState.startIndex += 1;
					await searchPaper(true);
				}}
			>
				<ChevronRight size={20} />
			</div>
		</div>
	</div>

	<!-- Footer -->
	<div class="pb-96 pt-56">
		<Footer />
	</div>

	<!-- Toaster -->
	<div class="block md:hidden lg:hidden xl:hidden 2xl:hidden">
		<Toaster position="top-right" expand={true} />
	</div>
	<div class="hidden md:block lg:block xl:block 2xl:block">
		<Toaster expand={true} />
	</div>
</div>
