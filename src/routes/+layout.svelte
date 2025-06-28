<script lang="ts">
	import MainInput from '../components/main_input/main_input.svelte';
	import '../app.css';
	import { page } from '$app/state';
	let { children } = $props();

	const path = page.url.pathname.split('/').pop();
</script>

<div class="no-scrollbar m-auto h-screen w-full overflow-scroll pt-6">
	{@render children()}

	<!-- {#if path == 'homepage' || path == 'bookmarks_page' || path == 'liked_papers_page' || path == 'comments'} -->
	<!-- {#if path != 'sign_up' && path != 'sign_in' && path != ''} -->

	{#if page.url.pathname == '/homepage' || page.url.pathname == '/bookmarks_page' || page.url.pathname == '/liked_papers_page'}
		<MainInput />
	{/if}
</div>
