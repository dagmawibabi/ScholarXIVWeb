<script lang="ts">
	import { onMount } from 'svelte';
	import { paperListState } from '../../state/papers_list.svelte';
	import { authClient } from '$lib/auth_client';
	import Navigation from '../../components/navigation.svelte';
	import { CircleCheckBig, Settings2 } from 'lucide-svelte';
	import FeedSkeletons from '../../components/skeleton/feed_skeletons.svelte';
	import EachPaper from '../../components/each_paper/each_paper.svelte';
	import Footer from '../../components/footer.svelte';
	import { Toaster } from 'svelte-sonner';
	import { aiConversationState } from '../../state/ai_conversation_state.svelte';
	import SelectAll from '../../components/select_all.svelte';

	paperListState.bookmarkList = [];
	async function getBookmarkedPapers() {
		paperListState.isGettingBookmarkedPapers = true;
		const response = await fetch('/api/get_bookmarked_papers');
		const data = await response.json();
		paperListState.bookmarkList = data;
		paperListState.isGettingBookmarkedPapers = false;
	}

	let isAllSelected = $state(false);
	aiConversationState.selectedPapersList = [];
	aiConversationState.selectedPapersIDList = [];

	try {
		getBookmarkedPapers();
	} catch (error) {}
</script>

<div class="m-auto w-full px-3 md:w-2/3 lg:w-2/4 lg:px-0 xl:w-2/5 xl:px-0 2xl:w-2/5 2xl:px-0">
	<!-- Title and Profile -->
	<Navigation />

	<!-- Paper List -->
	<div>
		<!-- STATUS TEXTS AND FEED AND SELECT ALL-->
		<div class="flex justify-between pb-2 pr-2 pt-6">
			<!-- Status -->
			<div class="pl-2 font-semibold">Bookmarked Papers</div>

			<!-- Select All -->
			<SelectAll
				paperList={paperListState.bookmarkList}
				loadingState={paperListState.isGettingBookmarkedPapers}
			/>
		</div>

		<!-- Bookmark List -->
		<div class="flex flex-col gap-y-4 pb-3 pt-3">
			{#if paperListState.isGettingBookmarkedPapers == true}
				<FeedSkeletons />
			{:else}
				{#each paperListState.bookmarkList as eachPaper}
					<EachPaper paper={eachPaper} />
				{/each}
			{/if}
		</div>
	</div>

	<!-- Space -->
	<div class="h-16"></div>

	<!-- Paper Count -->
	<div class="text-center text-xs">
		<span> Showing {paperListState.bookmarkList.length} Papers.</span>
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
