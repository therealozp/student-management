<script>
	import * as Select from '$lib/components/ui/select';
	import Layout from '$lib/components/custom/ui/Layout.svelte';

	import Button from '$lib/components/ui/button/button.svelte';
	import StudentsCourses from '../dashboard/StudentsCourses.svelte';

	import { createTable } from 'svelte-headless-table';
	import { addPagination } from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	let semesters = [
		{ value: 'F24', label: 'Fall 2024' },
		{ value: 'S24', label: 'Spring 2024' }
	];
	let semesterStats = writable([]);

	async function fetchSemesterStatistics() {
		const response = await fetch(`/api/staff/stats/gpa_by_semester`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ semester: selectedSemester.value })
		});
		const data = await response.json();
		semesterStats.set(data);
	}

	let selectedSemester = { value: '', label: '' };
	$: console.log(selectedSemester);
	const tableData = createTable(semesterStats, {
		paginate: addPagination()
	});

	const columns = tableData.createColumns([
		tableData.column({
			accessor: 'crn',
			header: 'CRN'
		}),
		tableData.column({
			accessor: 'prefix',
			header: 'Course Code'
		}),
		tableData.column({
			accessor: 'course_number',
			header: 'Course Number'
		}),
		tableData.column({
			accessor: 'course_name',
			header: 'Course Name'
		}),
		tableData.column({
			accessor: 'total_enrollments',
			header: 'Enrollments'
		}),
		tableData.column({
			accessor: 'average_grade',
			header: 'Average Grade'
		}),
		tableData.column({
			accessor: 'semester',
			header: 'Semester'
		})
	]);

	onMount(() => {
		fetchAllMajors();
	});
</script>

<Layout>
	<div>
		<div class="mb-6">
			<h3 class="mb-2 text-2xl font-semibold">Select Semester</h3>
			<div class="flex">
				<Select.Root bind:selected={selectedSemester}>
					<Select.Trigger class="w-[300px]">
						<Select.Value placeholder="Choose a major" />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each semesters as semesterObject}
								<Select.Item value={semesterObject.value} label={semesterObject.label}
									>{semesterObject.label}</Select.Item
								>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
				<Button on:click={fetchSemesterStatistics} class="ml-4">Get Rankings</Button>
			</div>
		</div>
		<div>
			<h3 class="mb-4 text-2xl font-semibold">{selectedSemester.label} Statistics</h3>
			<StudentsCourses {tableData} {columns} />
		</div>
	</div></Layout
>
