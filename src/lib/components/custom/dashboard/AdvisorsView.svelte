<script>
	import { goto } from '$app/navigation';
	const selections = [
		{ section: 'Enrollment Management', url: 'manage/courses' },
		{ section: 'Student Report', url: 'manage/students' },
		{ section: 'What-if GPA', url: '/what-if-gpa' },
		{ section: 'Department Statistics', url: 'department-statistics' }
	];
</script>

<div class="grid gap-10 p-[5%] pt-[4%]" style="grid-template-columns: 1fr 3fr">
	<div class="flex h-full flex-col items-center rounded-md border-2 border-stone-200 p-8">
		<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Today's Schedule</h4>
	</div>
	<div class="grid grid-cols-2 gap-10">
		{#each selections as link}
			<button
				class="duration-300hover:brightness-110 flex h-[20%] min-h-[250px] items-center justify-center rounded-md border-2 border-stone-200 transition hover:bg-neutral-800"
				on:click={() => {
					goto(link.url);
				}}
				on:keydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						goto(link.url);
					}
				}}
				role="link"
				aria-label={link.section}
			>
				<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
					{link.section}
				</h4>
			</button>
		{/each}
	</div>
</div>
