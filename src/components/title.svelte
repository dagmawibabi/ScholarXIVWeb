<script lang="ts">
	const { useAsHome = true } = $props();
</script>

<div class="flex flex-col px-2">
	{#if useAsHome == true}
		<a href="/homepage" class="cursor-pointer text-xl font-semibold"> ScholarXIV </a>
	{:else}
		<span class="text-xl font-semibold"> ScholarXIV </span>
	{/if}
	<span>
		Explore academic papers
		<span class="hidden md:inline lg:inline xl:inline 2xl:inline">
			from the arXiv repository.
		</span>
	</span>
</div>
