<script lang="ts">
	// import MainInput from '../components/main_input/main_input.svelte';
	import '../../../../app.css';
	import { page } from '$app/state';
	import MainInput from '../../../../components/main_input/main_input.svelte';
	let { children } = $props();

	const path = page.url.pathname.split('/').pop();
</script>

<div class="no-scrollbar m-auto h-screen w-full overflow-scroll pt-6">
	{@render children()}

	<!-- {#if path == 'homepage' || path == 'bookmarks_page' || path == 'liked_papers_page' || path == 'comments'} -->
	<!-- {#if path != 'sign_up' && path != 'sign_in' && path != ''} -->

	<MainInput isCommentMode={true} />
</div>
