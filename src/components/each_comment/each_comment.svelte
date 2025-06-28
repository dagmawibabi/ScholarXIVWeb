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
	class="inline-flex w-fit cursor-pointer items-center gap-x-3 rounded-xl border border-zinc-300 bg-white pb-1 pr-4 pt-2 text-zinc-800 drop-shadow-md transition-all duration-300 ease-in-out hover:drop-shadow-lg group-hover:border-black group-hover:text-black"
>
	<div>
		<!-- Commenter and Date -->
		<div class="flex gap-x-4 pl-4 text-xs">
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
		</div>

		<!-- Content -->
		<div class="max-w-full py-3 pl-4 text-sm">
			<span class="break-words">{comment.comment}</span>
			<!-- <span> {eachCommentState.comment['comment']}</span> -->
		</div>
	</div>
</div>
