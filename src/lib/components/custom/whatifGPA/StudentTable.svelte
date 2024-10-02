<script>
	import * as Table from '$lib/components/ui/table';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	const courses = [
		{
			CRN: 24593,
			code: 'COT3100',
			name: 'Discrete Mathematics',
			credits: 3,
			grade: 'B'
		},
		{
			CRN: 20382,
			code: 'COP4020',
			name: 'Programming Languages',
			credits: 3,
			grade: 'B'
		},
		{
			CRN: 57177,
			code: 'COP4020',
			name: 'Programming Languages',
			credits: 3,
			grade: 'D'
		},
		{
			CRN: 62296,
			code: 'CIS4930',
			name: 'Special Topics in CS',
			credits: 3,
			grade: 'B-'
		},
		{
			CRN: 46778,
			code: 'CDA3100',
			name: 'Computer Organization',
			credits: 3,
			grade: 'C+'
		},
		{
			CRN: 99452,
			code: 'CDA3100',
			name: 'Computer Organization',
			credits: 3,
			grade: 'D'
		},
		{
			CRN: 40621,
			code: 'CIS4930',
			name: 'Special Topics in CS',
			credits: 3,
			grade: 'B-'
		},
		{
			CRN: 28720,
			code: 'CAP4601',
			name: 'Artificial Intelligence',
			credits: 3,
			grade: 'B-'
		},
		{
			CRN: 49982,
			code: 'COP3330',
			name: 'Introduction to Programming',
			credits: 3,
			grade: 'B-'
		},
		{
			CRN: 92659,
			code: 'CDA3100',
			name: 'Computer Organization',
			credits: 3,
			grade: 'B+'
		}
	];

	let numCredits = courses.reduce((accumulator, course) => accumulator + course.credits, 0);
	let remainingCredits = 120 - numCredits;
	let targetGPA;
</script>

<div class="min-w-screen">
	<div class="ml-[5%] flex h-[200px] items-center">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">What-if GPA</h1>
	</div>
	<Separator class="ml-[5%] w-[90%] bg-white" />
</div>

<div class="grid gap-10 p-[5%] pt-[4%]" style="grid-template-columns: 3fr 1fr">
	<div>
		<Table.Root>
			<Table.Caption>A list of courses you have taken so far</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head>CRN</Table.Head>
					<Table.Head>Course Code</Table.Head>
					<Table.Head>Course Name</Table.Head>
					<Table.Head>Credits</Table.Head>
					<Table.Head>Grade</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each courses as course, i (i)}
					<Table.Row>
						<Table.Cell class="font-medium">{course.CRN}</Table.Cell>
						<Table.Cell>{course.code}</Table.Cell>
						<Table.Cell>{course.name}</Table.Cell>
						<Table.Cell>{course.credits}</Table.Cell>
						<Table.Cell>{course.grade}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex h-full flex-col items-center rounded-md border-2 border-stone-200 p-8">
		<h2
			class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
		>
			GPA
		</h2>
		<div class="m-8">
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">3.86</h1>
		</div>
		<div class="w-full p-4">
			<p>
				<strong>Credits Taken: </strong>{numCredits}
			</p>
			<p>
				<strong>Credits Remaining: </strong>{remainingCredits}
			</p>
			<div class="mt-2 flex items-center">
				<strong>Target GPA: </strong>
				<Input class="w-30 ml-2" type="number" min="0" max="4" step="0.01" bind:value={targetGPA} />
			</div>
		</div>
		<Button class="mt-auto justify-self-end">Calculate</Button>
	</div>
</div>
