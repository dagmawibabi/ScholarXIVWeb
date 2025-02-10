<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import MainInput from '../components/main_input/main_input.svelte';
</script>

<!-- <div
	class="no-scrollbar m-auto h-screen w-full overflow-scroll
		px-3 pt-6 md:w-2/3 md:px-0 lg:w-2/4
		lg:px-0 xl:w-2/5 xl:px-0 2xl:w-2/5 2xl:px-0
		"
>
	<MainInput />
	{@render children()}
</div> -->

<div class="no-scrollbar m-auto h-screen w-full overflow-scroll pt-6">
	{@render children()}
	<MainInput />
</div>
