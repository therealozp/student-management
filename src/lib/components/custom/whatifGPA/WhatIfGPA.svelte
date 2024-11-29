<script>
	import * as Table from '$lib/components/ui/table';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Slider from '$lib/components/ui/slider/slider.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import Header from '../dashboard/Header.svelte';

	import StudentsCourses from '../dashboard/StudentsCourses.svelte';

	import { createTable, Subscribe, Render } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import { addPagination } from 'svelte-headless-table/plugins';

	const gradeToGPA = {
		A: 4.0,
		B: 3.0,
		C: 2.0,
		D: 1.0,
		F: 0.0,
		S: 4.0, // Satisfactory grade treated as highest GPA
		U: 0.0, // Unsatisfactory grade treated as lowest GPA
		P: null, // Pass grades typically don't affect GPA
		NP: null, // No Pass grades typically don't affect GPA
		I: null, // Incomplete, not factored into GPA
		W: null, // Withdrawal, not factored into GPA
		WF: 0.0, // Withdrawal Failing, treated as an F
		null: null
	};

	export let user;

	let numCredits;
	let maxCredits = [120];
	let remainingCredits;
	$: remainingCredits = maxCredits - numCredits;

	let targetGPA;
	let currentGPA;

	const fetchEnrollments = async () => {
		const response = await fetch(`/api/student/enrollments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user_id: user.user_id })
		});
		const data = await response.json();
		const courses = data;

		const tableData = createTable(readable(courses), {
			paginate: addPagination()
		});

		const columns = tableData.createColumns([
			tableData.column({ accessor: 'CRN', header: 'CRN' }),
			tableData.column({ accessor: 'prefix', header: 'Course Code' }),
			tableData.column({ accessor: 'course_number', header: 'Course Number' }),
			tableData.column({ accessor: 'course_name', header: 'Course Name' }),
			tableData.column({ accessor: 'credits', header: 'Credits' }),
			tableData.column({ accessor: 'grade', header: 'Grade' })
		]);

		numCredits = courses.reduce((accumulator, course) => {
			if (course.grade) {
				return accumulator + course.credits;
			} else {
				return accumulator;
			}
		}, 0);

		currentGPA =
			courses.reduce((accumulator, course) => {
				if (course.grade) {
					return accumulator + gradeToGPA[course.grade] * course.credits;
				} else {
					return accumulator;
				}
			}, 0) / numCredits;

		return {
			tableData,
			columns
		};
	};

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

<Header content="What-If GPA" />

{#await fetchEnrollments()}
	<div>Fetching data...</div>
{:then { tableData, columns }}
	<div class="grid gap-10 p-[5%] pt-[4%]" style="grid-template-columns: 3fr 1fr">
		<div>
			<StudentsCourses {tableData} {columns} />
		</div>

		<!-- GPA Input Panel -->
		<div class="flex h-full flex-col items-center rounded-md border-2 border-stone-200 p-8">
			<h2
				class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				GPA
			</h2>
			<div class="m-8">
				<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					{currentGPA}
				</h1>
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
					<Input
						class="w-30 ml-2"
						type="number"
						min="0"
						max="4"
						step="0.01"
						bind:value={targetGPA}
					/>
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
{/await}

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
