<script lang="ts">
	import axios from 'axios';
	import moment from 'moment';
	import { toast } from 'svelte-sonner';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Bookmark, Download, Heart, Link2, MessageCircle, Scroll } from 'lucide-svelte';
	import { authClient } from '$lib/auth_client';

	// Props
	let { paperState } = $props();

	// Readable Time
	const timestamp = paperState.paper['published'];
	const readableTime = moment(timestamp).format('MMM Do YYYY');

	// Function to handle download
	async function handleDownload(paper: any) {
		// Show Toast
		toast.loading(`Downloading paper...`);

		// Download
		const response = await axios({
			url: paper['pdfLink'],
			method: 'GET',
			responseType: 'blob'
		});

		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', paper['id'].split('/').pop() + '.pdf');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		// Show Toast
		toast.success(`Downloaded "${paper.title}" successfully! `);
	}

	// Function to copy to clipboard
	function copyToClipboard(type: string, paper: any) {
		let whatToCopy: string;

		// All: () => `ID: ${paper['id']}\nPublished Date: ${readableTime}\n\nTitle: ${paper['title']}\n\nAuthors: ${paper['authors'].join(', ')}\n\nSummary: ${paper['summary']}\n\nPDF Link: ${paper['pdfLink']}`,

		const copyMap: any = {
			All: () => `Paper: ${paper['id']} — ${paper['title']}...`,
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

	// async function bookmarkPaper() {}
	const session = authClient.useSession();
</script>

<!-- Interactions -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="flex justify-between gap-x-2 pt-1
			text-xs md:justify-start lg:justify-start xl:justify-start 2xl:justify-start
			"
>
	{#if $session.data}
		<!-- LIKE -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="flex w-fit items-center gap-x-2 rounded-2xl border border-transparent px-2 py-1 transition-all duration-200 ease-in-out hover:bg-zinc-100 hover:text-black"
			onclick={(e) => {
				paperState.toggleLike($session.data?.user.id, paperState.paper.extractedID);
				e.stopPropagation();
			}}
		>
			<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
				<Heart
					size={15}
					fill={paperState.isLiked == true ? 'red' : 'white'}
					class={paperState.isLiked == true ? 'text-red-500' : ''}
				/>
			</div>
			<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
				<Heart
					size={18}
					fill={paperState.isLiked == true ? 'red' : 'white'}
					class={paperState.isLiked == true ? 'text-red-500' : ''}
				/>
			</div>

			<span class="flex pb-[2px]">
				{paperState.likeCount}
			</span>
		</div>

		<!-- COMMENT -->
		<a href="/comments/papers/{paperState.paper['extractedID']}">
			<div
				class="flex w-fit items-center gap-x-1 rounded-xl border border-transparent px-2 py-1 transition-all duration-200 ease-in-out hover:bg-zinc-100 hover:text-black"
			>
				<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
					<MessageCircle size={15} />
				</div>
				<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
					<MessageCircle size={18} />
				</div>
				<span class="hidden md:flex lg:flex xl:flex 2xl:flex"> Comments </span>
			</div>
		</a>
	{/if}
	<!-- SUMMARY -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="flex w-fit items-center gap-x-1 rounded-xl border border-transparent px-2 py-1 transition-all duration-200 ease-in-out hover:bg-zinc-100 hover:text-black"
		onclick={(e) => {
			paperState.toggleSummary();
			e.stopPropagation();
		}}
	>
		<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
			<Scroll size={14} />
		</div>
		<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
			<Scroll size={17} />
		</div>

		<span class="hidden md:flex lg:flex xl:flex 2xl:flex"> Summary </span>
	</div>

	<!-- DOWNLOAD -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="flex w-fit items-center gap-x-1 rounded-xl border border-transparent px-2 py-1 transition-all duration-200 ease-in-out hover:bg-zinc-100 hover:text-black"
		onclick={() => handleDownload(paperState.paper)}
	>
		<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
			<Download size={15} />
		</div>
		<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
			<Download size={18} />
		</div>
		<span class="hidden md:flex lg:flex xl:flex 2xl:flex"> Download </span>
	</div>

	{#if $session.data}
		<!-- BOOKMARK -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="flex w-fit items-center gap-x-1 rounded-xl border border-transparent px-2 py-1 transition-all duration-200 ease-in-out hover:bg-zinc-100 hover:text-black"
			onclick={(e) => {
				paperState.toggleBookmark($session.data?.user.id, paperState.paper.extractedID);
				e.stopPropagation();
			}}
		>
			<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
				<Bookmark
					size={15}
					fill={paperState.isBookmarked == true ? 'lightGreen' : 'white'}
					class={paperState.isBookmarked == true ? 'text-emerald-500' : ''}
				/>
			</div>
			<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
				<Bookmark
					size={18}
					fill={paperState.isBookmarked == true ? 'lightGreen' : 'white'}
					class={paperState.isBookmarked == true ? 'text-emerald-500' : ''}
				/>
			</div>

			<span class="hidden md:flex lg:flex xl:flex 2xl:flex">
				{paperState.isBookmarked ? 'Unbookmark' : 'Bookmark'}
			</span>
		</div>
	{/if}

	<!-- COPY -->
	<div>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<div
					class="flex w-fit items-center gap-x-1 rounded-xl border border-transparent px-2 py-1 transition-all duration-200 ease-in-out hover:bg-zinc-100 hover:text-black"
				>
					<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
						<Link2 size={15} />
					</div>
					<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
						<Link2 size={18} />
					</div>
					<span class="hidden md:flex lg:flex xl:flex 2xl:flex"> Copy </span>
				</div>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Item
						class="cursor-pointer text-xs"
						onclick={(event) => {
							event.stopPropagation();
							copyToClipboard('All', paperState.paper);
							console.log('allhere');
						}}>All</DropdownMenu.Item
					>
					<DropdownMenu.Item
						class="cursor-pointer text-xs"
						onclick={(event) => {
							event.stopPropagation();
							copyToClipboard('ID', paperState.paper);
						}}>ID</DropdownMenu.Item
					>
					<DropdownMenu.Item
						class="cursor-pointer text-xs"
						onclick={(event) => {
							event.stopPropagation();
							copyToClipboard('Title', paperState.paper);
						}}>Title</DropdownMenu.Item
					>
					<DropdownMenu.Item
						class="cursor-pointer text-xs"
						onclick={(event) => {
							event.stopPropagation();
							copyToClipboard('Authors', paperState.paper);
						}}>Authors</DropdownMenu.Item
					>
					<DropdownMenu.Item
						class="cursor-pointer text-xs"
						onclick={(event) => {
							event.stopPropagation();
							copyToClipboard('PDF Link', paperState.paper);
						}}>PDF Link</DropdownMenu.Item
					>
					<DropdownMenu.Item
						class="cursor-pointer text-xs"
						onclick={(event) => {
							event.stopPropagation();
							copyToClipboard('Summary', paperState.paper);
						}}>Summary</DropdownMenu.Item
					>
					<DropdownMenu.Item
						class="cursor-pointer text-xs"
						onclick={(event) => {
							event.stopPropagation();
							copyToClipboard('Published Date', paperState.paper);
						}}>Published Date</DropdownMenu.Item
					>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>
