<script lang="ts">
	import { handleSignIn } from '$lib/auth_functions';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Circle } from 'svelte-loading-spinners';
	import BetterAuthRemark from '../../../components/remarks/better_auth_remark.svelte';
	import Title from '../../../components/title.svelte';

	let email = $state('');
	let password = $state('');
	let isLogingIn = $state(false);
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<div
		class="w-full pb-4 text-center md:w-fit md:text-start lg:w-fit lg:text-start xl:w-fit xl:text-start 2xl:w-fit 2xl:text-start"
	>
		<Title />
	</div>
	<Card.Root class="mx-auto max-w-md">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your email and password to login to your account</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						type="email"
						placeholder="max@example.com"
						required
						bind:value={email}
					/>
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a href="/auth/forget_password" class="ml-auto inline-block text-sm hover:underline">
							Forgot your password?
						</a>
					</div>
					<Input id="password" type="password" required bind:value={password} />
				</div>
				<Button
					type="button"
					class="w-full"
					onclick={async () => {
						isLogingIn = !isLogingIn;
						await handleSignIn(email.trim(), password.trim());
					}}
				>
					{#if isLogingIn === true}
						<Circle size="22" color="#ffffff" duration="1s" />
					{:else}
						<span class="font-semibold"> Login </span>
					{/if}
				</Button>
			</div>
			<a href="/auth/sign_up" class="underline-offset-4 hover:underline">
				<div class="mt-4 text-center text-sm">Don't have an account? Sign up</div>
			</a>
		</Card.Content>
	</Card.Root>
	<BetterAuthRemark />
</div>
