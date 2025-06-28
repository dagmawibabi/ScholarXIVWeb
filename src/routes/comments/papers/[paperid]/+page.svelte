<script lang="ts">
	import { page } from '$app/state';
	import { Toaster } from 'svelte-sonner';
	import EachPaper from '../../../../components/each_paper/each_paper.svelte';
	import Footer from '../../../../components/footer.svelte';
	import Navigation from '../../../../components/navigation.svelte';
	import FeedSkeletons from '../../../../components/skeleton/feed_skeletons.svelte';
	import CommentsSkeleton from '../../../../components/skeleton/comments_skeleton.svelte';
	import SkeletonPaper from '../../../../components/skeleton/skeleton_paper.svelte';
	import { commentState } from '../../../../state/comment_state.svelte';
	import EachComment from '../../../../components/each_comment/each_comment.svelte';

	async function getPaperComments() {
		commentState.isGettingComments = true;
		const extractedID = page.url.pathname.split('/').pop();
		const response = await fetch('/api/get_paper_comments', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ extractedID })
		});
		const data = await response.json();
		commentState.paper = data.paper;
		commentState.comments = data.comments;
		commentState.isGettingComments = false;
	}

	getPaperComments();
</script>

<div class="m-auto w-full px-3 md:w-2/3 lg:w-2/4 lg:px-0 xl:w-2/5 xl:px-0 2xl:w-2/5 2xl:px-0">
	<!-- Title and Profile -->
	<Navigation />

	<!-- Paper -->
	<div class="pt-6">
		{#if commentState.isGettingComments == true}
			<SkeletonPaper />
		{:else}
			<EachPaper paper={commentState.paper} />
		{/if}
	</div>

	<!-- Paper List -->
	<div>
		<!-- STATUS TEXTS AND FEED AND SELECT ALL-->
		<div class="flex justify-between pb-2 pr-2 pt-6">
			<!-- Status -->
			<div class="pl-2 font-semibold">Comments</div>
		</div>

		<!-- Comment List -->
		<div class="flex flex-col gap-y-4 pb-3 pt-3">
			{#if commentState.isGettingComments == true}
				<CommentsSkeleton />
			{:else}
				{#each commentState.comments as eachComment}
					<!-- <EachPaper paper={eachComment} /> -->
					<EachComment comment={eachComment} />
				{/each}
			{/if}
		</div>
	</div>

	<!-- Space -->
	<div class="h-16"></div>

	<!-- Comment Count -->
	<div class="text-center text-xs">
		<span> Showing {commentState.comments.length} Comments.</span>
	</div>

	<!-- Toaster -->
	<div class="block md:hidden lg:hidden xl:hidden 2xl:hidden">
		<Toaster position="top-right" expand={true} />
	</div>
	<div class="hidden md:block lg:block xl:block 2xl:block">
		<Toaster expand={true} />
	</div>
</div>
