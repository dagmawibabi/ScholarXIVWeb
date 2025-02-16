<script lang="ts">
	import ProfileAvatar from './profile_avatar.svelte';
	import Title from './title.svelte';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import NavigationButtons from './navigation_buttons.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Bookmark, Compass } from 'lucide-svelte';

	import { page } from '$app/state';
	import { authClient } from '$lib/auth_client';
	import { handleSignOut } from '$lib/auth_functions';

	const session = authClient.useSession();
</script>

<div class="flex items-center justify-between">
	<!-- Title -->
	<Title />

	<!-- Navigation Buttons and Profile -->
	<div class="flex items-center justify-center gap-x-3">
		<!-- Navigation Buttons -->
		<div>
			{#if page.url.pathname == '/homepage'}
				<!-- Bookmarks -->
				<NavigationButtons icon={Bookmark} size={16} link={'/bookmarks_page'} />
			{:else if page.url.pathname == '/bookmarks_page'}
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

		<!-- Profile -->
		<div class="pr-2 pt-2">
			{#if $session.data}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<ProfileAvatar session={$session} />
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<!-- Profile -->
							<DropdownMenu.Item
								><ProfileAvatar session={$session} fullInfo={true} /></DropdownMenu.Item
							>

							<div class="py-1">
								<Separator />
							</div>
							<!-- Logout -->
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<DropdownMenu.Item
								><div
									class="w-full cursor-pointer text-center hover:text-red-500"
									onclick={() => handleSignOut()}
								>
									Logout
								</div></DropdownMenu.Item
							>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
		</div>
	</div>
</div>
