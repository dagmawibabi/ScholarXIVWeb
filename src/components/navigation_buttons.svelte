<script lang="ts">
	let props = $props();
</script>

<a href={props.link}>
	<div class="pt-3">
		<div class="h-fit w-fit rounded-full p-2 hover:bg-zinc-200">
			<!-- <Compass size={18} /> -->
			<props.icon size={props.size} />
		</div>
	</div>
</a>
