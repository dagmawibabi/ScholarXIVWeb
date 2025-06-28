<script lang="ts">
	import moment from 'moment';
	import { CalendarDays, Frame } from 'lucide-svelte';

	// Props
	let { paper } = $props();

	// Readable Time
	const timestamp = paper['published'];
	const readableTime = moment(timestamp).format('MMM Do YYYY');
</script>

<!-- Published Date and ID -->
<div class="flex items-center justify-between pb-1">
	<div class="flex gap-x-4">
		<!-- PUBLISHED DATE -->
		<div class="flex items-center text-xs">
			<CalendarDays size={12} />
			<span class="pl-1">
				{readableTime}
			</span>
		</div>

		<!-- ID -->
		<div class="flex items-center text-xs">
			<Frame size={12} />
			<span class="pb-[1px] pl-1">
				{paper['extractedID']}
			</span>
		</div>
	</div>
</div>
