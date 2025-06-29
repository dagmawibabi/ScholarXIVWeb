<script>
	import ArxivRemark from './remarks/arxiv_remark.svelte';
	import youtube from '$lib/assets/icons/youtube.png';
</script>

<div class="flex flex-col text-center text-xs">
	<!-- Demo and Source-->
	<span class="pb-5 pt-2">
		Checkout the
		<a
			href="https://youtu.be/-GlxZRCfxYA"
			target="_blank"
			class="underline underline-offset-4 hover:text-blue-500">Demo Video</a
		>
		and
		<a
			href="https://github.com/dagmawibabi/ScholarXIVWeb"
			target="_blank"
			class="underline underline-offset-4 hover:text-blue-500">Star the Project</a
		>
		✨
	</span>

	<!-- Remarks -->
	<ArxivRemark />
	<span> Made with 🖤 by Dream Intelligence </span>
</div>
