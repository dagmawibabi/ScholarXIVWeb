<script lang="ts">
	let props = $props();
</script>

<div class="pt-3">
	<div class="p-2 hover:bg-zinc-200 rounded-full w-fit h-fit">
		<a href={props.link}>
			<!-- <Compass size={18} /> -->
			<props.icon size={props.size} />
		</a>
	</div>
</div>
