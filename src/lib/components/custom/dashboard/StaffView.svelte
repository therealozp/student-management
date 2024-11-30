<script>
	import { goto } from '$app/navigation';

	const items = [
		{ name: 'Manage Courses', link: '/dashboard/manage/courses' },
		{ name: 'Manage Instructors', link: '/dashboard/manage/instructors' },
		{ name: 'Manage Students', link: '/dashboard/manage/students' },
		{ name: 'Department Statistics', link: '/dashboard/statistics/department' },
		{ name: 'Major Ranking Statistics', link: '/dashboard/statistics/major' },
		{ name: 'Instructor Statistics', link: '/dashboard/statistics/instructor' },
		{ name: 'Semester Statistics', link: '/dashboard/statistics/semester' },
		{ name: 'Audit Logs', link: '/admin/logs' }
	];
</script>

<div class="grid grid-cols-3 gap-10 p-[5%]">
	{#each items as item, i}
		<div
			class="duration-300hover:brightness-110 flex h-[20%] min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-stone-200 transition hover:bg-neutral-800"
			on:click={() => {
				goto(item.link);
			}}
			on:keydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					goto(item.link);
				}
			}}
			role="button"
			tabindex={i}
		>
			<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">{item.name}</h4>
		</div>
	{/each}
</div>
