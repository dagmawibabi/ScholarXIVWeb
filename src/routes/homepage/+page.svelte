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
	import { ChevronLeft, ChevronRight, Settings, Settings2 } from 'lucide-svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import Settings_2 from 'lucide-svelte/icons/settings-2';

	async function searchPaper() {
		if (inputState.searchContent.trim().length > 0) {
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

	let recommendedPapers = [
		'electron',
		'Attention is all you need',
		'Cats',
		'Dogs',
		'Cores',
		'Elephants',
		'Sulphur'
	];
	inputState.searchContent = '';
	inputState.lastSearch = '';
	async function randomSearch() {
		inputState.statusText = `Recommended keyword `;
		inputState.searchContent =
			recommendedPapers[Math.floor(Math.random() * recommendedPapers.length)];
		inputState.lastSearch = inputState.searchContent;
		inputState.isSearching = true;
		const response = await axios.post('/api/search_papers', {
			startIndex: inputState.startIndex,
			maxResults: inputState.maxResults,
			searchFilterString: {
				all: inputState.searchContent
			},
			sortBy: inputState.sortBy == 'Sort By' ? 'relevance' : inputState.sortBy,
			sortOrder: inputState.sortOrder == 'Sort Order' ? 'ascending' : inputState.sortOrder
		});

		paperListState.paperList = [];
		paperListState.paperList = response.data;
		inputState.lastSearch = inputState.searchContent;
		inputState.isSearching = false;
	}

	let isfeedControlsOn = $state(true);

	onMount(async () => {
		await randomSearch();
	});
</script>

<div class="m-auto w-full px-3 md:w-2/3 lg:w-2/4 lg:px-0 xl:w-2/5 xl:px-0 2xl:w-2/5 2xl:px-0">
	<!-- Title and Profile -->
	<Navigation />

	<!-- Paper List -->
	<div>
		<!-- STATUS TEXTS -->
		<div class="flex justify-between pb-2 pr-2 pt-6">
			<div class="pl-2">
				{inputState.statusText}
				<span class="font-semibold italic">
					"{inputState.lastSearch}"
				</span>
			</div>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="rounded-full p-1 hover:bg-zinc-100"
				onclick={() => (isfeedControlsOn = !isfeedControlsOn)}
			>
				<Settings2 size={18} class="cursor-pointer" />
			</div>
		</div>

		<!-- FEED CONTROL -->
		{#if isfeedControlsOn}
			<div
				class="mx-auto flex w-fit items-center justify-center gap-x-2 rounded-full bg-zinc-100 py-1 pl-3 pr-1"
			>
				<!-- SORT BY-->
				<Select.Root type="single" bind:value={inputState.sortBy} onValueChange={searchPaper}>
					<Select.Trigger
						class="w-[170px] rounded-lg border border-zinc-200 text-sm hover:border-zinc-400 focus:outline-none focus:ring-0"
						>{inputState.sortBy}</Select.Trigger
					>
					<Select.Content>
						<Select.Item value="relevance">Relevance</Select.Item>
						<Select.Item value="lastUpdatedDate">Last Updated Date</Select.Item>
						<Select.Item value="submittedDate">Submitted Date</Select.Item>
					</Select.Content>
				</Select.Root>

				<!-- SORT ORDER -->
				<Select.Root type="single" bind:value={inputState.sortOrder} onValueChange={searchPaper}>
					<Select.Trigger
						class="w-[130px] rounded-lg border border-zinc-200 text-sm hover:border-zinc-400 focus:outline-none focus:ring-0"
						>{inputState.sortOrder}</Select.Trigger
					>
					<Select.Content>
						<Select.Item value="ascending">Ascending</Select.Item>
						<Select.Item value="descending">Descending</Select.Item>
					</Select.Content>
				</Select.Root>

				<!-- PAGINATION -->
				<div class="flex items-center gap-x-1 text-sm">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="cursor-pointer rounded-full p-1 hover:bg-zinc-200"
						onclick={async () => {
							if (inputState.startIndex > 0) {
								inputState.startIndex -= 1;
								await searchPaper();
							}
						}}
					>
						<ChevronLeft size={20} />
					</div>
					Page {inputState.startIndex + 1}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="cursor-pointer rounded-full p-1 hover:bg-zinc-200"
						onclick={async () => {
							inputState.startIndex += 1;
							await searchPaper();
						}}
					>
						<ChevronRight size={20} />
					</div>
				</div>

				<!-- MAX RESULTS -->
				<div class="flex items-center gap-x-1 text-sm">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="cursor-pointer rounded-full p-1 hover:bg-zinc-200"
						onclick={async () => {
							if (inputState.maxResults > 2) {
								inputState.maxResults -= 1;
								await searchPaper();
							}
						}}
					>
						<ChevronLeft size={20} />
					</div>
					Results {inputState.maxResults}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="cursor-pointer rounded-full p-1 hover:bg-zinc-200"
						onclick={async () => {
							inputState.maxResults += 1;
							await searchPaper();
						}}
					>
						<ChevronRight size={20} />
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
	<div class="h-16"></div>

	<!-- Paper Count -->
	<div class="text-center text-xs">
		<span> Showing {paperListState.paperList.length} Papers.</span>
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
