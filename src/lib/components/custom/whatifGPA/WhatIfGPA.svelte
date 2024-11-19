<script>
	import * as Table from '$lib/components/ui/table';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Slider from '$lib/components/ui/slider/slider.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index';

	import { createTable, Subscribe, Render } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import { addPagination } from 'svelte-headless-table/plugins';

	const gradeToGPA = {
		'A+': 4.0,
		A: 4.0,
		'A-': 3.7,
		'B+': 3.3,
		B: 3.0,
		'B-': 2.7,
		'C+': 2.3,
		C: 2.0,
		'C-': 1.7,
		'D+': 1.3,
		D: 1.0,
		'D-': 0.7,
		F: 0.0,
		S: 4.0, // Satisfactory grade treated as highest GPA
		U: 0.0, // Unsatisfactory grade treated as lowest GPA
		P: null, // Pass grades typically don't affect GPA
		NP: null, // No Pass grades typically don't affect GPA
		I: null, // Incomplete, not factored into GPA
		W: null, // Withdrawal, not factored into GPA
		WF: 0.0 // Withdrawal Failing, treated as an F
	};

	const courses = [
		{
			CRN: 24593,
			course_code: 'COT',
			course_number: '3100',
			name: 'Discrete Mathematics',
			credits: 3,
			grade: 'B'
		},
		{
			CRN: 20382,
			course_code: 'COP',
			course_number: '4020',
			name: 'Programming Languages',
			credits: 3,
			grade: 'B'
		},
		{
			CRN: 57177,
			course_code: 'COP',
			course_number: '4020',
			name: 'Programming Languages',
			credits: 3,
			grade: 'D'
		},
		{
			CRN: 62296,
			course_code: 'CIS',
			course_number: '4930',
			name: 'Special Topics in CS',
			credits: 3,
			grade: 'B-'
		},
		{
			CRN: 46778,
			course_code: 'CDA',
			course_number: '3100',
			name: 'Computer Organization',
			credits: 3,
			grade: 'C+'
		},
		{
			CRN: 99452,
			course_code: 'CDA',
			course_number: '3100',
			name: 'Computer Organization',
			credits: 3,
			grade: 'D'
		},
		{
			CRN: 40621,
			course_code: 'CIS',
			course_number: '4930',
			name: 'Special Topics in CS',
			credits: 3,
			grade: 'B-'
		},
		{
			CRN: 28720,
			course_code: 'CAP',
			course_number: '4601',
			name: 'Artificial Intelligence',
			credits: 3,
			grade: 'B-'
		},
		{
			CRN: 49982,
			course_code: 'COP',
			course_number: '3330',
			name: 'Introduction to Programming',
			credits: 3,
			grade: 'B-'
		},
		{
			CRN: 92659,
			course_code: 'CDA',
			course_number: '3100',
			name: 'Computer Organization',
			credits: 3,
			grade: 'B+'
		}
	];

	const tableData = createTable(readable(courses), {
		paginate: addPagination()
	});

	const columns = tableData.createColumns([
		tableData.column({ accessor: 'CRN', header: 'CRN' }),
		tableData.column({ accessor: 'course_code', header: 'Course Code' }),
		tableData.column({ accessor: 'course_number', header: 'Course Number' }),
		tableData.column({ accessor: 'name', header: 'Course Name' }),
		tableData.column({ accessor: 'credits', header: 'Credits' }),
		tableData.column({ accessor: 'grade', header: 'Grade' })
	]);

	// Extract view model for rendering
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		tableData.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.paginate;

	// State for GPA calculations
	let numCredits = courses.reduce((accumulator, course) => accumulator + course.credits, 0);
	let maxCredits = [120];
	let remainingCredits;
	$: remainingCredits = maxCredits - numCredits;
	let targetGPA;
	let currentGPA =
		courses.reduce(
			(accumulator, course) => accumulator + gradeToGPA[course.grade] * course.credits,
			0
		) / numCredits;
	let dialogOpen = false;

	// Placeholder for calculation results
	let calculationResult = null;

	function calculateWhatIfGPA(current_gpa, total_credits) {
		if (!targetGPA || targetGPA < 0 || targetGPA > 4) {
			calculationResult = { error: 'Invalid Target GPA. Please provide a value between 0 and 4.' };
			return;
		}

		if (currentGPA >= targetGPA) {
			calculationResult = { error: 'You have already surpassed your target GPA.' };
			return;
		}

		// Constants for GPA calculation
		const max_grade = 4.0; // Assuming A is the highest grade
		let additionalCredits = 0;
		let totalGPA = current_gpa * total_credits;

		// Calculate how many additional credits are needed
		while (true) {
			additionalCredits++;
			const newTotalCredits = total_credits + additionalCredits;
			const newGPA = (totalGPA + max_grade * additionalCredits) / newTotalCredits;

			if (newGPA >= targetGPA) {
				calculationResult = {
					success: `You need to take ${additionalCredits} more credit(s) (e.g., ${additionalCredits / 3} course(s)) with an average grade of A to achieve your target GPA of ${targetGPA}.`
				};
				break;
			}

			// Break if it's impossible to reach target GPA
			if (additionalCredits > maxCredits) {
				calculationResult = { error: 'Target GPA cannot be reached with realistic course limits.' };
				break;
			}
		}
	}
</script>

<div class="min-w-screen">
	<div class="ml-[5%] flex h-[200px] items-center">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">What-if GPA</h1>
	</div>
	<Separator class="ml-[5%] w-[90%] bg-white" />
</div>

<div class="grid gap-10 p-[5%] pt-[4%]" style="grid-template-columns: 3fr 1fr">
	<!-- Course Table -->
	<div>
		<Table.Root {...$tableAttrs}>
			<Table.Caption>A list of courses you have taken so far</Table.Caption>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Head {...attrs}>
										<Render of={cell.render()} />
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
		<div class="flex items-center justify-end space-x-4 py-4">
			<Button
				variant="outline"
				size="sm"
				on:click={() => ($pageIndex = $pageIndex - 1)}
				disabled={!$hasPreviousPage}>Previous</Button
			>
			<Button
				variant="outline"
				size="sm"
				disabled={!$hasNextPage}
				on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
			>
		</div>
	</div>

	<!-- GPA Input Panel -->
	<div class="flex h-full flex-col items-center rounded-md border-2 border-stone-200 p-8">
		<h2
			class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
		>
			GPA
		</h2>
		<div class="m-8">
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{currentGPA}</h1>
		</div>
		<div class="w-full p-4">
			<p><strong>Credits Taken: </strong>{numCredits}</p>
			<p><strong>Maximum Credits: </strong>{maxCredits}</p>
			<div class="flex items-center">
				<Slider class="my-4 w-full" bind:value={maxCredits} min={90} max={144} step={1} />
			</div>
			<p><strong>Credits Remaining: </strong>{remainingCredits}</p>
			<div class="mt-2 flex items-center">
				<strong>Target GPA: </strong>
				<Input class="w-30 ml-2" type="number" min="0" max="4" step="0.01" bind:value={targetGPA} />
			</div>
		</div>
		<Button
			class="mt-auto justify-self-end"
			disabled={!targetGPA}
			on:click={() => {
				calculateWhatIfGPA(currentGPA, numCredits);
				dialogOpen = true;
			}}>Calculate</Button
		>
	</div>
</div>

<!-- Result Dialog -->
<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>What-If GPA Calculation</Dialog.Title>
		</Dialog.Header>
		<Dialog.Description>
			<div>
				{#if calculationResult?.success}
					<p>{calculationResult.success}</p>
				{:else if calculationResult?.error}
					<p class="text-red-500">{calculationResult.error}</p>
				{/if}
			</div>
		</Dialog.Description>
		<Dialog.Footer>
			<Button on:click={() => (dialogOpen = false)}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
