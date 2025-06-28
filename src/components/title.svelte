<script lang="ts">
	const { useAsHome = true } = $props();
</script>

<div class="flex flex-col px-2 pb-0">
	{#if useAsHome == true}
		<a href="/homepage" class="cursor-pointer text-xl font-semibold"> ScholarXIV </a>
	{:else}
		<span class="text-xl font-semibold"> ScholarXIV </span>
	{/if}
	<span>
		{#if useAsHome == true}
			<span class=" md:inline lg:inline xl:inline 2xl:inline">
				Explore academic papers
				<span class="hidden md:inline lg:inline xl:inline 2xl:inline">
					from the arXiv repository.
				</span>
			</span>
		{:else}
			<span> Explore academic papers from the arXiv repository. </span>
		{/if}

		<!-- SOURCE CODE -->
		{#if useAsHome == true}
			<br />
			<span
				class="inline text-xs md:inline md:text-base lg:inline lg:text-base xl:inline xl:text-base 2xl:inline 2xl:text-base"
			>
				AI powered and fully
				<a
					href="https://github.com/dagmawibabi/ScholarXIVWeb"
					target="_blank"
					class="underline underline-offset-4 hover:text-blue-500">open-source</a
				>.
			</span>
		{:else}
			<span>
				AI powered and fully
				<a
					href="https://github.com/dagmawibabi/ScholarXIVWeb"
					target="_blank"
					class="underline underline-offset-4 hover:text-blue-500">open-source</a
				>.
			</span>
		{/if}
	</span>
</div>
