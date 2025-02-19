<script>
	import { CalendarDays, Heart, MessageCircle, User } from 'lucide-svelte';

	import moment from 'moment';

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
</script>

<div
	class="flex cursor-pointer items-center gap-x-3 overflow-scroll rounded-xl border border-zinc-300 bg-white pb-1 pr-4 pt-2 text-zinc-600 drop-shadow-md transition-all duration-300 ease-in-out hover:drop-shadow-lg group-hover:border-black group-hover:text-black"
>
	<div>
		<!-- Commenter and Date -->
		<div class="flex gap-x-4 pl-4 text-xs">
			<div class="flex items-center gap-x-1">
				<User size={12} />
				<span class="pb-[1px]">
					Dagmawi Babi
					<!-- {eachCommentState.comment['commenter']['name']} -->
				</span>
			</div>
			<div class="flex items-center">
				<CalendarDays size={12} />
				<span class="pl-1">
					{readableTime}
				</span>
			</div>
		</div>

		<!-- Content -->
		<div class="py-1 pl-4 text-sm">
			<span> {comment.comment}</span>
			<!-- <span> {eachCommentState.comment['comment']}</span> -->
		</div>

		<!-- Interactions  -->
		<div class="pl-2">
			<div class="flex gap-x-2 text-xs">
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="flex w-fit items-center gap-x-2 rounded-2xl border border-transparent px-2 py-1 transition-all duration-200 ease-in-out hover:bg-zinc-200 hover:text-black"
				>
					<!-- onclick={() => eachCommentState.likeComment()} -->
					<Heart size={15} />
					<!-- fill={eachCommentState.isLiked == true ? 'red' : 'white'}
							class={eachCommentState.isLiked == true ? 'text-red-500' : ''} -->
					<span class="flex pb-[2px]">
						0
						<!-- {eachCommentState.likeCount} -->
					</span>
				</div>
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<a href="/comments/trailing/{comment['_id']}">
					<div
						class="flex w-fit items-center gap-x-1 rounded-xl border border-transparent px-2 py-1 transition-all duration-200 ease-in-out hover:bg-zinc-200 hover:text-black"
					>
						<MessageCircle size={12} />
						<span class="flex pl-1">
							0
							<!-- {eachCommentState.comment['trailingCommentCount']} -->
						</span>
					</div>
				</a>
			</div>
		</div>
	</div>
</div>
