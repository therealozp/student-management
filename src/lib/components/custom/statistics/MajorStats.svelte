<script>
	import * as Select from '$lib/components/ui/select';
	import Layout from '$lib/components/custom/ui/Layout.svelte';

	import Button from '$lib/components/ui/button/button.svelte';
	import StudentsCourses from '../dashboard/StudentsCourses.svelte';

	import { createTable } from 'svelte-headless-table';
	import { addPagination, addSortBy } from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	let majors = writable([]);
	let studentRankings = writable([]);

	async function fetchAllMajors() {
		const response = await fetch(`/api/staff/get_all_majors`);
		const data = await response.json();
		majors.set(data);
		console.log(data);
	}

	async function fetchStudentRankings() {
		const response = await fetch(`/api/staff/stats/major_rankings`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ major: selectedMajor.value })
		});
		const data = await response.json();
		studentRankings.set(data);
	}

	let selectedMajor = { value: '', label: '' };
	$: console.log(selectedMajor);
	const tableData = createTable(studentRankings, {
		paginate: addPagination()
	});

	const columns = tableData.createColumns([
		tableData.column({
			accessor: 'name',
			header: 'Student Name'
		}),
		tableData.column({
			accessor: 'major',
			header: 'Major'
		}),
		tableData.column({
			accessor: 'year',
			header: 'Years in University',
			filter: {
				exclude: true
			}
		}),
		tableData.column({
			accessor: 'gpa',
			header: 'GPA',
			cell: ({ value }) => {
				return value.toFixed(2);
			}
		}),
		tableData.column({
			accessor: 'total_credits',
			header: 'Total Credits'
		})
	]);

	onMount(() => {
		fetchAllMajors();
	});
</script>

<Layout>
	<div>
		<div class="mb-6">
			<h3 class="mb-2 text-2xl font-semibold">Select Major</h3>
			<div class="flex">
				<Select.Root bind:selected={selectedMajor}>
					<Select.Trigger class="w-[300px]">
						<Select.Value placeholder="Choose a major" />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each $majors as majorObject}
								<Select.Item value={majorObject.major} label={majorObject.major}
									>{majorObject.major}</Select.Item
								>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
				<Button on:click={fetchStudentRankings} class="ml-4">Get Rankings</Button>
			</div>
		</div>
		<div>
			<h3 class="mb-4 text-2xl font-semibold">Rankings</h3>
			<StudentsCourses {tableData} {columns} />
		</div>
	</div></Layout
>
