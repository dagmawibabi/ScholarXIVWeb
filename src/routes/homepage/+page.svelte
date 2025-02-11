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

	onMount(async () => {
		inputState.isSearching = true;
		const response = await axios.post('/api/search_papers', {
			searchFilterString: {
				all: 'electron'
			}
		});
		paperListState.paperList = [];
		paperListState.paperList = response.data;
		inputState.isSearching = false;
	});
</script>

<div class="m-auto w-full px-3 md:w-2/3 lg:w-2/4 lg:px-0 xl:w-2/5 xl:px-0 2xl:w-2/5 2xl:px-0">
	<!-- Title and Profile -->
	<Navigation />

	<!-- Paper List -->
	<div class="flex flex-col gap-y-4 pb-3 pt-6">
		{#if paperListState.paperList.length == 0 && inputState.isSearching == false}
			<div class="pl-2">
				Searched for
				<span class="font-semibold italic">
					"{inputState.lastSearch}"
				</span>
				but found no results.
			</div>
		{:else if paperListState.paperList.length < 1 && inputState.isSearching == true}
			{#if inputState.searchContent != '' && inputState.isSearching}
				<div class="pl-2">
					Searching for
					<span class="font-semibold italic">
						"{inputState.searchContent}"
					</span>
				</div>
			{/if}
			<FeedSkeletons />
		{:else}
			{#if inputState.lastSearch != ''}
				<div class="pl-2">
					Results for
					<span class="font-semibold italic">
						"{inputState.lastSearch}"
					</span>
				</div>
			{/if}
			{#each paperListState.paperList as eachPaper}
				<EachPaper paper={eachPaper} />
			{/each}
		{/if}
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
	<Toaster />
</div>
