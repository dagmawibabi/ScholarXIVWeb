<script lang="ts">
	import ProfileAvatar from './profile_avatar.svelte';
	import Title from './title.svelte';
	// import { useSession } from '$lib/auth_client';

	import { Bookmark, Compass } from 'lucide-svelte';
	// import { Separator } from '$lib/components/ui/separator';
	// import { handleLogout } from '$lib/auth_functions';
	// import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { page } from '$app/stores';
	import NavigationButtons from './navigation_buttons.svelte';

	// let session = useSession()
</script>

<div class="flex items-center justify-between">
	<!-- Title -->
	<Title />

	<div class="flex items-center justify-center gap-x-3">
		<!-- Navigation Buttons -->
		{#if $page.url.pathname == '/homepage'}
			<!-- Bookmarks -->
			<NavigationButtons icon={Bookmark} size={16} link={'/bookmarks_page'} />
		{:else if $page.url.pathname == '/bookmarks_page'}
			<!-- Discover -->
			<NavigationButtons icon={Compass} size={18} link={'/homepage'} />
		{:else}
			<div class="flex gap-x-2">
				<!-- Discover -->
				<NavigationButtons icon={Compass} size={18} link={'/homepage'} />

				<!-- Bookmarks -->
				<NavigationButtons icon={Bookmark} size={16} link={'/bookmarks_page'} />
			</div>
		{/if}
	</div>
</div>
