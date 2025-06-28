<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
</script>

<div class="flex gap-x-3">
	<div class="pt-2">
		<Skeleton class="h-10 w-10 rounded-full border border-zinc-200" />
	</div>

	<div class="border border-zinc-200 p-3 rounded-xl bg-white drop-shadow-sm w-full">
		<div class="flex gap-x-2">
			<Skeleton class="h-4 w-36 rounded-xl border border-zinc-200" />
			<Skeleton class="h-4 w-24 rounded-xl border border-zinc-200" />
		</div>
		<div class="py-2">
			<Skeleton class="h-6 w-full rounded-md border border-zinc-200" />
		</div>

		<div class="flex pt-1 gap-x-2">
			<Skeleton class="h-6 w-20 rounded-xl border border-zinc-200" />
			<Skeleton class="h-6 w-20 rounded-xl border border-zinc-200" />
			<Skeleton class="h-6 w-20 rounded-xl border border-zinc-200" />
		</div>
	</div>
</div>
