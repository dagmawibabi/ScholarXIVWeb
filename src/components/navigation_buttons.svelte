<script lang="ts">
	let props = $props();
</script>

<a href={props.link}>
	<div class="pt-3">
		<div class="h-fit w-fit rounded-full p-2 hover:bg-zinc-100">
			<div class="hidden md:flex lg:flex xl:flex 2xl:flex">
				<props.icon size={props.size} />
			</div>
			<div class="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
				<props.icon size={18} />
			</div>
		</div>
	</div>
</a>
