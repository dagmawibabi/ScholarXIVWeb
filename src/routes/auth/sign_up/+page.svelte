<script lang="ts">
	import { handleSignUp } from '$lib/auth_functions';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Circle } from 'svelte-loading-spinners';
	import BetterAuthRemark from '../../../components/remarks/better_auth_remark.svelte';
	import Title from '../../../components/title.svelte';

	let email = $state('');
	let password = $state('');
	let firstName = $state('');
	let lastName = $state('');
	let isSigningUp = $state(false);
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<div
		class="w-full pb-4 text-center md:w-fit md:text-start lg:w-fit lg:text-start xl:w-fit xl:text-start 2xl:w-fit 2xl:text-start"
	>
		<Title useAsHome={false} />
	</div>
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-xl">Create Account</Card.Title>
			<Card.Description>Fill in your details to create an account</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
				<div class="flex gap-2">
					<div>
						<Label for="name">First Name</Label>
						<Input id="name" placeholder="First Name" required bind:value={firstName} />
					</div>
					<div>
						<Label for="name">Last Name</Label>
						<Input id="name" placeholder="Last Name" required bind:value={lastName} />
					</div>
				</div>

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
					</div>
					<Input id="password" type="password" required bind:value={password} />
				</div>
				<Button
					type="button"
					class="w-full"
					onclick={async () => {
						isSigningUp = !isSigningUp;
						await handleSignUp(firstName.trim(), lastName.trim(), email.trim(), password.trim());
					}}
				>
					<!-- handleSignUp(firstName.trim(), lastName.trim(), email.trim(), password.trim()); -->
					{#if isSigningUp === true}
						<Circle size="22" color="#ffffff" duration="1s" />
					{:else}
						<span class="font-semibold"> Sign Up </span>
					{/if}
				</Button>
			</div>
			<a href="/auth/sign_in" class="underline-offset-4 hover:underline">
				<div class="mt-4 text-center text-sm">
					Already have an account?{' '}
					Sign In
				</div>
			</a>
		</Card.Content>
	</Card.Root>
	<BetterAuthRemark />
</div>
