<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Circle } from 'svelte-loading-spinners';
	import BetterAuthRemark from '../../../components/remarks/better_auth_remark.svelte';
	import Title from '../../../components/title.svelte';
	import { authClient } from '$lib/auth_client';

	import logo from '$lib/assets/logo/logo.png';

	let isLogingInWithGithub = $state(false);
	let isLogingInWithGoogle = $state(false);
	let isLogingInWithHuggingFace = $state(false);
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<Card.Root class="-mt-56 w-full max-w-sm border-0">
		<!-- Logo -->
		<div class="flex justify-center">
			<img src={logo} alt=" " class="h-56 w-56" />
		</div>

		<!-- Title -->
		<Title useAsHome={false} showTitle={true} />

		<div class="mt-5 space-y-2">
			<!-- Google Login -->
			<Button
				type="button"
				class="group/google w-full"
				onclick={async () => {
					isLogingInWithGoogle = !isLogingInWithGoogle;
					await authClient.signIn.social({
						provider: 'google',
						callbackURL: '/homepage'
					});
				}}
			>
				{#if isLogingInWithGoogle === true}
					<Circle size="22" color="#ffffff" duration="1s" />
				{:else}
					<span class="font-semibold group-hover/google:text-blue-400"> Login with Google </span>
				{/if}
			</Button>

			<!-- GitHub Login -->
			<Button
				type="button"
				class="w-full"
				onclick={async () => {
					isLogingInWithGithub = !isLogingInWithGithub;
					await authClient.signIn.social({
						provider: 'github',
						callbackURL: '/homepage'
					});
				}}
			>
				{#if isLogingInWithGithub === true}
					<Circle size="22" color="#ffffff" duration="1s" />
				{:else}
					<span class="font-semibold"> Login with GitHub </span>
				{/if}
			</Button>

			<!-- HuggingFace Login -->
			<Button
				type="button"
				class="group/huggingface w-full"
				onclick={async () => {
					isLogingInWithHuggingFace = !isLogingInWithHuggingFace;
					await authClient.signIn.social({
						provider: 'huggingface',
						callbackURL: '/homepage'
					});
				}}
			>
				{#if isLogingInWithGithub === true}
					<Circle size="22" color="#ffffff" duration="1s" />
				{:else}
					<span class="font-semibold group-hover/huggingface:text-yellow-300">
						Login with Hugging Face
					</span>
				{/if}
			</Button>
		</div>
	</Card.Root>

	<!-- Better Auth Remark -->
	<BetterAuthRemark />
</div>
