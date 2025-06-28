<script lang="ts">
	import SignIn from './auth/sign_in/+page.svelte';
	import { authClient } from '$lib/auth_client';
	import HomePage from './homepage/+page.svelte';

	const session = authClient.useSession();
</script>

<svelte:head>
	<title>ScholarXIV</title>
</svelte:head>

<div class="m-auto w-full px-3 md:w-2/3 lg:w-2/4 lg:px-0 xl:w-2/5 xl:px-0 2xl:w-2/5 2xl:px-0">
	{#if $session.data}
		<HomePage />
	{:else}
		<SignIn />
	{/if}
</div>
