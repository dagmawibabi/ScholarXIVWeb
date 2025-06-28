<script>
	import {
		CalendarDays,
		Delete,
		DeleteIcon,
		Heart,
		MessageCircle,
		Trash2Icon,
		User
	} from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { createEventDispatcher } from 'svelte';
	import * as Avatar from '$lib/components/ui/avatar/index';

	const dispatch = createEventDispatcher();

	import moment from 'moment';
	import { authClient } from '$lib/auth_client';
	let { comment } = $props();

	// Readable Time
	const timestamp = comment['createdAt'];
	const now = moment();
	const commentTime = moment(timestamp);
	let readableTime = $state();

	if (now.isSame(commentTime, 'day')) {
		readableTime = commentTime.format('h:mm A'); // Show time only if today
	} else if (now.diff(commentTime, 'days') <= 30) {
		readableTime = now.diff(commentTime, 'days') + ' days ago'; // Show days ago if recent
	} else {
		readableTime = commentTime.format('MMM Do YYYY'); // Show month, day, year if older than a month
	}

	const session = authClient.useSession();

	const isCurrentUserComment = $derived($session.data?.user.email === comment.commenter.email);
	let isDeleting = $state(false);

	async function deleteComment() {
		if (isDeleting) return; // Prevent multiple clicks

		isDeleting = true;
		try {
			const response = await fetch('/api/delete_comment', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					commentId: comment._id,
					extractedID: comment.extractedID
				})
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || 'Failed to delete comment');
			}

			// Dispatch an event to notify the parent component to update the comments list
			dispatch('commentDeleted', { commentId: comment._id });
		} catch (error) {
			console.error('Error deleting comment:', error);
			// Dispatch an error event that parent can listen to
			// dispatch('deleteError', { message: error.message });
		} finally {
			isDeleting = false;
		}
	}
</script>

<div class="inline-flex items-start gap-x-3">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<div class="flex cursor-pointer items-center gap-x-2">
				<Avatar.Root class="border border-zinc-300 drop-shadow-md hover:shadow-lg">
					<Avatar.Image src="" />
					<Avatar.Fallback>
						{comment.commenter.name.includes(' ')
							? comment.commenter.name
									.split(' ')
									.map((/** @type {any[]} */ n) => n[0])
									.join('')
									.toUpperCase()
							: comment.commenter.name[0].toString().toUpperCase()}
					</Avatar.Fallback>
				</Avatar.Root>
			</div>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Item
					class="flex cursor-pointer justify-center gap-1.5 text-xs hover:text-red-500"
				>
					<span class="text-xs font-semibold">
						{comment.commenter.name}
					</span>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>

	<div
		class="w-fit cursor-pointer items-center gap-x-3 rounded-xl border border-zinc-300 bg-white pb-1 pr-4 pt-2 text-zinc-800 drop-shadow-md transition-all duration-300 ease-in-out hover:drop-shadow-lg group-hover:border-black group-hover:text-black"
	>
		<!-- Commenter and Date -->
		<div class="flex justify-between gap-x-4 pl-4 text-xs">
			<div class="flex items-center gap-x-1">
				<User size={12} />
				<span class="pb-[1px]">
					{comment.commenter.name}
				</span>
			</div>
			<div class="flex items-center">
				<CalendarDays size={12} />
				<span class="pl-1">
					{readableTime}
				</span>
			</div>

			{#if isCurrentUserComment}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<div class="flex cursor-pointer items-center hover:text-red-500">
							<Trash2Icon size={12} />
						</div>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Item
								class="flex cursor-pointer items-center gap-1.5 text-xs hover:text-red-500"
								onclick={deleteComment}
								disabled={isDeleting}
							>
								{#if isDeleting}
									<svg
										class="-ml-1 mr-1 h-3 w-3 animate-spin text-red-500"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											class="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
										></circle>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Deleting...
								{:else}
									<Trash2Icon size={12} class="mr-0.5" />
									Delete
								{/if}
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
		</div>

		<!-- Content -->
		<div class="max-w-full py-3 pl-4 text-sm">
			<span class="break-words">{comment.comment}</span>
			<!-- <span> {eachCommentState.comment['comment']}</span> -->
		</div>
	</div>
</div>
