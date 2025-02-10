<script lang="ts">
	import axios from 'axios';
	import moment from 'moment';
	import {
		Frame,
		CalendarDays,
		ExternalLink,
		User,
		Bookmark,
		BookmarkCheck,
		Download,
		Link2,
		Sparkles,
		Scroll,
		Heart,
		MessageCircle
	} from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { toast } from 'svelte-sonner';
	import EachPaperState from '../state/each_paper_state.svelte';

	// Paper
	let { paper }: { paper: any } = $props();
	let eachPaperState = new EachPaperState(paper);

	// Readable Time
	const timestamp = paper['published'];
	const readableTime = moment(timestamp).format('MMM Do YYYY');

	// Function to handle download
	async function handleDownload(paper: any) {
		console.log('downloading...');
		const response = await axios({
			url: paper['pdfLink'],
			method: 'GET',
			responseType: 'blob'
		});

		console.log(response.data);
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', paper['id'].split('/').pop() + '.pdf');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	// Function to copy to clipboard
	function copyToClipboard(type: string, paper: any) {
		let whatToCopy: string;

		const copyMap: any = {
			All: () =>
				`ID: ${paper['id']}\nPublished Date: ${readableTime}\n\nTitle: ${paper['title']}\n\nAuthors: ${paper['authors'].join(', ')}\n\nSummary: ${paper['summary']}\n\nPDF Link: ${paper['pdfLink']}`,
			ID: () => paper['id'],
			Title: () => paper['title'],
			Authors: () => paper['authors'].join(', '),
			'PDF Link': () => paper['pdfLink'],
			Summary: () => {
				const sentences = paper['summary'].split('. ');
				return sentences.slice(0, 1).join('. ') + (sentences.length > 2 ? '...' : '');
			},
			'Published Date': () => readableTime
		};

		whatToCopy = copyMap[type] ? copyMap[type]() : '';

		// Copy to Clipboard
		navigator.clipboard.writeText(type === 'Summary' ? paper['summary'] : whatToCopy);

		// Show Toast
		toast.success(`Copied ${type} Successfully!`, {
			description: whatToCopy
		});
	}

	//
	let isReadingSummary = $state(false);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="no-scrollbar group">
	<div
		class={'no-scrollbar relative flex cursor-pointer flex-col overflow-scroll rounded-xl border border-zinc-300 bg-white py-3 text-zinc-600 drop-shadow-xl transition-all duration-300 ease-in-out group-hover:border-black group-hover:text-black'}
	>
		<div class="px-4">
			<!-- Date and ID -->
			<div class="flex items-center justify-between pb-1">
				<div class="flex gap-x-4">
					<div class="flex items-center text-xs">
						<CalendarDays size={12} />
						<span class="pl-1">
							{readableTime}
						</span>
					</div>

					<div class="flex items-center text-xs">
						<Frame size={12} />
						<span class="pb-[1px] pl-1">
							{paper['extractedID']}
						</span>
					</div>

					<!-- {#each selectedPapersState.selectedPapersID as id}
						{id}
					{/each} -->
				</div>
				<!-- <div class={$isBookmarked ? 'w-2 h-2 rounded-full bg-emerald-300' : ''}></div> -->
			</div>

			<!-- Title -->
			<a
				href={paper['pdfLink']}
				target="_blank"
				rel="noopener noreferrer"
				download
				class={'group/title font-semibold text-zinc-500 transition-all duration-300 ease-in-out group-hover:text-black '}
			>
				<span class="decoration-zinc-400 decoration-1 underline-offset-4 hover:underline">
					{paper['title']}
				</span>
				<div class="hidden group-hover/title:inline-block">
					<ExternalLink size={12} />
				</div>
			</a>

			<!-- Authors -->
			<div class="no-scrollbar flex items-center gap-x-1 overflow-scroll pb-2 pt-1">
				<User size={12} />
				{#each paper['authors'] as eachAuthor}
					<div class="no-scrollbar linc w-fit pb-[1px] text-xs italic">
						<span>
							{eachAuthor},
						</span>
					</div>
				{/each}
			</div>

			<!-- Interactions -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="flex justify-between gap-x-2 pt-1
			text-xs md:justify-start lg:justify-start xl:justify-start 2xl:justify-start
			"
			>
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					class="flex w-fit items-center gap-x-2 rounded-2xl border border-transparent px-2 py-1 transition-all duration-200 ease-in-out hover:bg-zinc-200 hover:text-black"
					onclick={() => eachPaperState.likePaper()}
				>
					<Heart
						size={15}
						fill={eachPaperState.isLiked == true ? 'red' : 'white'}
						class={eachPaperState.isLiked == true ? 'text-red-500' : ''}
					/>
					<span class="flex pb-[2px]">
						{eachPaperState.likes}
					</span>
				</div>

				<a href="/comments/paper/{paper['extractedID']}">
					<div
						class="flex w-fit items-center gap-x-1 rounded-xl border border-transparent px-2 py-1 transition-all duration-200 ease-in-out hover:bg-zinc-200 hover:text-black"
					>
						<MessageCircle size={15} />
						<span class="flex pl-1">
							{eachPaperState.commentCount}
						</span>
					</div>
				</a>

				<div
					class="flex w-fit items-center gap-x-1 rounded-xl border border-transparent px-2 py-1 transition-all duration-200 ease-in-out hover:bg-zinc-200 hover:text-black"
					onclick={() => (isReadingSummary = !isReadingSummary)}
				>
					<Scroll size={14} />
					<span class="hidden md:flex lg:flex xl:flex 2xl:flex"> Summary </span>
				</div>

				<div
					class="flex w-fit items-center gap-x-1 rounded-xl border border-transparent px-2 py-1 transition-all duration-200 ease-in-out hover:bg-zinc-200 hover:text-black"
				>
					<Download size={15} />
					<span class="hidden md:flex lg:flex xl:flex 2xl:flex"> Download </span>
				</div>

				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					class="flex w-fit items-center gap-x-1 rounded-xl border border-transparent px-2 py-1 transition-all duration-200 ease-in-out hover:bg-zinc-200 hover:text-black"
					onclick={() => eachPaperState.bookmarkPaper()}
				>
					<Bookmark
						size={15}
						fill={eachPaperState.isBookmarked == true ? 'lightGreen' : 'white'}
						class={eachPaperState.isBookmarked == true ? 'text-emerald-500' : ''}
					/>

					<span class="hidden md:flex lg:flex xl:flex 2xl:flex">
						{eachPaperState.isBookmarked ? 'Unbookmark' : 'Bookmark'}
					</span>
				</div>

				<div>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<div
								class="flex w-fit items-center gap-x-1 rounded-xl border border-transparent px-2 py-1 transition-all duration-200 ease-in-out hover:bg-zinc-200 hover:text-black"
							>
								<Link2 size={15} />
								<span class="hidden md:flex lg:flex xl:flex 2xl:flex"> Copy </span>
							</div>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Group>
								<DropdownMenu.Item
									class="text-xs"
									on:click={(event) => {
										event.stopPropagation();
										copyToClipboard('All', paper);
									}}>All</DropdownMenu.Item
								>
								<DropdownMenu.Item
									class="text-xs"
									on:click={(event) => {
										event.stopPropagation();
										copyToClipboard('ID', paper);
									}}>ID</DropdownMenu.Item
								>
								<DropdownMenu.Item
									class="text-xs"
									on:click={(event) => {
										event.stopPropagation();
										copyToClipboard('Title', paper);
									}}>Title</DropdownMenu.Item
								>
								<DropdownMenu.Item
									class="text-xs"
									on:click={(event) => {
										event.stopPropagation();
										copyToClipboard('Authors', paper);
									}}>Authors</DropdownMenu.Item
								>
								<DropdownMenu.Item
									class="text-xs"
									on:click={(event) => {
										event.stopPropagation();
										copyToClipboard('PDF Link', paper);
									}}>PDF Link</DropdownMenu.Item
								>
								<DropdownMenu.Item
									class="text-xs"
									on:click={(event) => {
										event.stopPropagation();
										copyToClipboard('Summary', paper);
									}}>Summary</DropdownMenu.Item
								>
								<DropdownMenu.Item
									class="text-xs"
									on:click={(event) => {
										event.stopPropagation();
										copyToClipboard('Published Date', paper);
									}}>Published Date</DropdownMenu.Item
								>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
		</div>

		<!-- Summary -->
		<div class="px-3">
			<div class={'hidden pt-3 text-sm transition-all duration-300 ease-in-out group-hover:flex'}>
				<div class="pt-3 text-sm transition-all duration-300 ease-in-out">
					<div
						class="rounded-lg rounded-bl-md rounded-br-md border border-zinc-300 px-3 pb-3 pt-2 shadow-lg drop-shadow-xl transition-all duration-300 ease-in-out hover:shadow-xl"
					>
						<div class="flex items-center gap-x-1 pb-1 text-xs text-zinc-600">
							<Scroll size={12} />
							<span class="pb-[2.5px]"> Summary </span>
						</div>
						<span class="text-zinc-800">
							{paper['summary']},
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
