<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index';
	let {
		session,
		fullInfo = false
	}: {
		session: any;
		fullInfo?: boolean;
	} = $props();
</script>

<div>
	<div class="flex cursor-pointer items-center gap-x-2">
		<Avatar.Root class="border border-zinc-300 drop-shadow-md hover:shadow-lg">
			<Avatar.Image src={session.data?.user.image} />
			<Avatar.Fallback>
				{session.data?.user.name[0].toString().toUpperCase()}
			</Avatar.Fallback>
		</Avatar.Root>
		{#if fullInfo == true}
			<div class="flex flex-col">
				<span class="text-xs font-semibold">
					{session.data?.user.name}
				</span>
				<span class="text-xs">
					{session.data?.user.email}
				</span>
			</div>
		{/if}
	</div>
</div>
