<script lang="ts">
	import ProfileAvatar from './profile_avatar.svelte';
	import Title from './title.svelte';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import NavigationButtons from './navigation_buttons.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Bookmark, Compass, Heart } from 'lucide-svelte';

	import { page } from '$app/state';
	import { authClient } from '$lib/auth_client';
	import { handleSignOut } from '$lib/auth_functions';

	const session = authClient.useSession();
</script>

<div class="flex items-center justify-between">
	<!-- Title -->
	<Title />

	<!-- Navigation Buttons and Profile -->

	<div class="flex items-start justify-center gap-x-3">
		<!-- Navigation Buttons -->
		<div class="flex items-start justify-center gap-x-3">
			{#if page.url.pathname == '/homepage'}
				{#if $session.data}
					<div class="flex">
						<!-- Liked Papers -->
						<NavigationButtons icon={Heart} size={16} link={'/liked_papers_page'} />
						<!-- Bookmarks -->
						<NavigationButtons icon={Bookmark} size={16} link={'/bookmarks_page'} />
					</div>
				{/if}
			{:else if page.url.pathname == '/bookmarks_page'}
				<div class="flex">
					{#if $session.data}
						<!-- Discover -->
						<NavigationButtons icon={Compass} size={18} link={'/homepage'} />
					{/if}
					<!-- Liked Papers -->
					<NavigationButtons icon={Heart} size={16} link={'/liked_papers_page'} />
				</div>
			{:else if page.url.pathname == '/liked_papers_page'}
				<div class="flex">
					{#if $session.data}
						<!-- Discover -->
						<NavigationButtons icon={Compass} size={18} link={'/homepage'} />
					{/if}
					<!-- Bookmarks -->
					<NavigationButtons icon={Bookmark} size={16} link={'/bookmarks_page'} />
				</div>
			{:else}
				<div class="flex gap-x-2">
					{#if $session.data}
						<!-- Discover -->
						<NavigationButtons icon={Compass} size={18} link={'/homepage'} />
					{/if}

					<!-- Liked Papers -->
					<NavigationButtons icon={Heart} size={16} link={'/liked_papers_page'} />

					<!-- Bookmarks -->
					<NavigationButtons icon={Bookmark} size={16} link={'/bookmarks_page'} />
				</div>
			{/if}
		</div>

		{#if $session.data}
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
		{/if}
	</div>
</div>
