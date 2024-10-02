<script>
	import Separator from '$lib/components/ui/separator/separator.svelte';
	export let content;
</script>

<div class="min-w-screen">
	<div class="ml-[5%] flex h-[200px] items-center">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
			{content ? content : 'Welcome, [Name]'}
		</h1>
	</div>
	<Separator class="ml-[5%] w-[90%] bg-white" />
</div>
