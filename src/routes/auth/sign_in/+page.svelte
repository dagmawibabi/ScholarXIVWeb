<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Circle } from 'svelte-loading-spinners';
	import BetterAuthRemark from '../../../components/remarks/better_auth_remark.svelte';
	import Title from '../../../components/title.svelte';
	import { authClient } from '$lib/auth_client';

	import logo from '$lib/assets/logo/logo.png';
	import { Github, Twitter } from 'lucide-svelte';

	import huggingface from '$lib/assets/icons/huggingface.png';
	import twitter from '$lib/assets/icons/twitter.png';
	import google from '$lib/assets/icons/google.png';
	import youtube from '$lib/assets/icons/youtube.png';

	let isLogingInWithGithub = $state(false);
	let isLogingInWithGoogle = $state(false);
	let isLogingInWithHuggingFace = $state(false);
	let isLogingInWithTwitter = $state(false);
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
					<div class="flex items-center gap-x-2">
						<img src={google} alt="" class="h-4 w-4" />

						<span class="font-semibold group-hover/google:text-blue-400"> Google </span>
					</div>
				{/if}
			</Button>

			<div class="flex space-x-2">
				<!-- GitHub Login -->
				<Button
					type="button"
					class="group/github w-full"
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
						<div class="flex items-center gap-x-2">
							<Github size="22" />
							<span class="font-semibold"> GitHub </span>
						</div>
					{/if}
				</Button>

				<!-- Twitter Login -->
				<Button
					type="button"
					class="group/twitter w-full"
					onclick={async () => {
						isLogingInWithTwitter = !isLogingInWithTwitter;
						await authClient.signIn.social({
							provider: 'twitter',
							callbackURL: '/homepage'
						});
					}}
				>
					{#if isLogingInWithTwitter === true}
						<Circle size="22" color="#ffffff" duration="1s" />
					{:else}
						<div class="flex items-center gap-x-2">
							<img src={twitter} alt="" class="h-4 w-4" />
							<span class="font-semibold group-hover/twitter:text-cyan-300"> X (Twitter) </span>
						</div>
					{/if}
				</Button>
			</div>

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
				{#if isLogingInWithHuggingFace === true}
					<Circle size="22" color="#ffffff" duration="1s" />
				{:else}
					<div class="flex items-center gap-x-2">
						<img src={huggingface} alt="" class="h-4 w-4" />
						<span class="font-semibold group-hover/huggingface:text-yellow-300">
							Hugging Face
						</span>
					</div>
				{/if}
			</Button>
		</div>
	</Card.Root>

	<!-- Better Auth Remark -->
	<BetterAuthRemark />

	<!-- Demo -->
	<div class="flex items-center gap-x-2 pt-10">
		<img src={youtube} alt="" class="h-4" />
		<a
			href="https://youtu.be/-GlxZRCfxYA"
			target="_blank"
			class="font-sm underline-offset-4 hover:text-blue-500 hover:underline">Demo Video</a
		>
	</div>
</div>
