<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Circle } from 'svelte-loading-spinners';
	import LabelAndInputBox from './label_and_input_box.svelte';
	import { authClient } from '$lib/auth_client';

	let isSavingAPIKey = $state();
	let apiKey = $state();

	async function saveAPIKey() {
		isSavingAPIKey = true;

		await fetch('/api/save_ai_api_key', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				apiKey: apiKey
			})
		});

		isSavingAPIKey = false;
	}

	let session = authClient.useSession();
</script>

<Dialog.Content>
	<Dialog.Header>
		<Dialog.Title>API Key</Dialog.Title>
		<Dialog.Description>Enter your Gemini API Key</Dialog.Description>
	</Dialog.Header>
	<LabelAndInputBox
		bind:state={apiKey}
		label=""
		placeholder={$session.data ? '$session.data.user.apiKey' : 'API Key ...'}
	/>

	<Dialog.Footer>
		<div class="flex w-full gap-x-2 pt-3">
			{#if isSavingAPIKey == true}
				<div>
					<div
						class="flex h-full w-36 items-center justify-center rounded-lg border border-zinc-400 bg-zinc-100 px-5 py-1"
					>
						<Circle size="22" color="#000000" duration="1s" />
					</div>
				</div>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="w-36 cursor-pointer rounded-lg border border-zinc-400 bg-zinc-100 px-6 py-1 hover:border-zinc-500 hover:bg-black hover:text-white"
					onclick={() => saveAPIKey()}
				>
					Save API Key
				</div>
			{/if}

			<!-- Get API Key -->
			<a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
				<div
					class="w-fit cursor-pointer rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-1 hover:border-blue-500 hover:text-blue-500"
				>
					Get API Key
				</div>
			</a>
		</div>
	</Dialog.Footer>
</Dialog.Content>
