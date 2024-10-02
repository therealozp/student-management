<script>
	import Card from '$lib/components/ui/card/card.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	const items = [
		'Manage Courses',
		'Manage Instructors',
		'Manage Students',
		'Department Statistics',
		'View Reports',
		'Audit Logs'
	];
</script>

<div class="grid grid-cols-3 gap-10 p-[5%]">
	{#each items as item}
		<div
			class="duration-300hover:brightness-110 flex h-[20%] min-h-[250px] items-center justify-center rounded-md border-2 border-stone-200 transition hover:bg-neutral-800"
		>
			<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">{item}</h4>
		</div>
	{/each}
</div>
