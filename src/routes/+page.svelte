<script lang="ts">
	import SignIn from './auth/sign_in/+page.svelte';
	import { authClient } from '$lib/auth_client';
	import HomePage from './homepage/+page.svelte';

	const session = authClient.useSession();
</script>

<svelte:head>
	<title>ScholarXIV</title>
	<meta property="og:title" content="ScholarXIV" />
	<meta property="og:description" content="Open-source & AI powered research paper explorer" />
	<meta
		property="og:image"
		content="https://www.dagmawi.dev/_app/immutable/assets/ScholarXIV.BLhCS-yg.png"
	/>
	<meta property="og:url" content="https://scholarxiv.com" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="ScholarXIV" />
</svelte:head>

{#if $session.data}
	<HomePage />
{:else}
	<div class="m-auto w-full px-3 md:w-2/3 lg:w-2/4 lg:px-0 xl:w-2/5 xl:px-0 2xl:w-2/5 2xl:px-0">
		<SignIn />
	</div>
{/if}
