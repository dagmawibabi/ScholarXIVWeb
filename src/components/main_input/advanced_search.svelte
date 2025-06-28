<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import axios from 'axios';
	import { inputState } from '../../state/input_state.svelte';
	import { paperListState } from '../../state/papers_list.svelte';
	import LabelAndInputBox from './label_and_input_box.svelte';
	import { Circle } from 'svelte-loading-spinners';

	async function resetAdvancedSearch() {
		inputState.advancedSearch = false;
		inputState.id = '';
		inputState.ti = '';
		inputState.au = '';
		inputState.abs = '';
		inputState.co = '';
		inputState.jr = '';
		inputState.cat = '';
		inputState.rn = '';
		inputState.sortBy = 'Sort By';
		inputState.sortOrder = 'Sort Order';
		inputState.maxResults = 10;
		inputState.startIndex = 0;
		inputState.isSearching = true;
		const response = await axios.post('/api/search_papers', {
			searchFilterString: {
				all: 'electron'
			}
		});
		paperListState.paperList = [];
		paperListState.paperList = [];
		paperListState.paperList = response.data;
		inputState.isSearching = false;
		inputState.lastSearch = 'electron';
	}

	async function advancedSearchPaper() {
		inputState.isSearching = true;
		inputState.advancedSearch = true;
		paperListState.paperList = [];
		const response = await axios.post('/api/search_papers', {
			startIndex: 0,
			maxResults: inputState.maxResults || 10,
			searchFilterString: {
				id: inputState.id,
				ti: inputState.ti.replace(':', ''),
				au: inputState.au,
				abs: inputState.abs,
				co: inputState.co,
				jr: inputState.jr,
				cat: inputState.cat,
				rn: inputState.rn
			},
			sortBy: inputState.sortBy == 'Sort By' ? 'relevance' : inputState.sortBy,
			sortOrder: inputState.sortOrder == 'Sort Order' ? 'ascending' : inputState.sortOrder
		});
		// inputState.lastSearch = inputState.searchContent;
		paperListState.paperList = response.data;
		inputState.isSearching = false;
	}
</script>

<Dialog.Content>
	<Dialog.Header>
		<Dialog.Title>Advanced Search</Dialog.Title>
		<Dialog.Description>Fill out only the information you want below</Dialog.Description>
	</Dialog.Header>

	<div class="flex flex-col gap-y-2">
		<LabelAndInputBox bind:state={inputState.id} label="ID" placeholder="ID ..." />
		<LabelAndInputBox bind:state={inputState.ti} label="Title" placeholder="title ..." />
		<LabelAndInputBox
			bind:state={inputState.au}
			label="Authors"
			placeholder="separated by comma ..."
		/>
		<LabelAndInputBox bind:state={inputState.abs} label="Abstract" placeholder="abstract ..." />
		<LabelAndInputBox bind:state={inputState.co} label="Comment" placeholder="comment ..." />
		<LabelAndInputBox bind:state={inputState.jr} label="Journal" placeholder="journal number ..." />
		<LabelAndInputBox
			bind:state={inputState.cat}
			label="Category"
			placeholder="physics, maths ..."
		/>
		<LabelAndInputBox bind:state={inputState.rn} label="Rn" placeholder="rn ..." />

		<div class="flex flex-col gap-y-2">
			<div class="flex gap-x-3">
				<Select.Root type="single" bind:value={inputState.sortBy}>
					<Select.Trigger
						class="w-[170px] rounded-lg border border-zinc-200 hover:border-zinc-400 focus:outline-none focus:ring-0"
						>{inputState.sortBy}</Select.Trigger
					>
					<Select.Content>
						<Select.Item value="relevance">Relevance</Select.Item>
						<Select.Item value="lastUpdatedDate">Last Updated Date</Select.Item>
						<Select.Item value="submittedDate">Submitted Date</Select.Item>
					</Select.Content>
				</Select.Root>
				<Select.Root type="single" bind:value={inputState.sortOrder}>
					<Select.Trigger
						class="w-[130px] rounded-lg border border-zinc-200 hover:border-zinc-400 focus:outline-none focus:ring-0"
						>{inputState.sortOrder}</Select.Trigger
					>
					<Select.Content>
						<Select.Item value="ascending">Ascending</Select.Item>
						<Select.Item value="descending">Descending</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
			<div class="flex items-center gap-x-2">
				<div class="line-clamp-1 pl-2 text-left text-sm">Max Result</div>
				<div class="overflow-clip rounded-lg border border-zinc-200 bg-white hover:border-zinc-400">
					<input
						type="number"
						min="1"
						max="100"
						defaultValue="1"
						bind:value={inputState.maxResults}
						class="w-fit bg-white px-3 py-1 text-sm outline-none"
						placeholder="number ..."
					/>
				</div>
			</div>
		</div>
	</div>

	<Dialog.Footer>
		<div class="flex w-full gap-x-2 pt-3">
			{#if inputState.isSearching == true}
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
					class="w-fit cursor-pointer rounded-lg border border-zinc-400 bg-zinc-100 px-6 py-1 hover:border-zinc-500 hover:bg-black hover:text-white"
					onclick={() => advancedSearchPaper()}
				>
					Search Paper
				</div>
			{/if}

			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="w-fit cursor-pointer rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-1 hover:border-red-500 hover:text-red-500"
				onclick={() => resetAdvancedSearch()}
			>
				Reset
			</div>
		</div>
	</Dialog.Footer>
</Dialog.Content>
