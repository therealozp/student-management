<script>
	import * as Select from '$lib/components/ui/select';
	import Layout from '$lib/components/custom/ui/Layout.svelte';

	import Button from '$lib/components/ui/button/button.svelte';
	import StudentsCourses from '../dashboard/StudentsCourses.svelte';

	import { createTable } from 'svelte-headless-table';
	import { addPagination, addSortBy } from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	let instructors = writable([]);
	let teachingInfo = writable([]);

	async function fetchAllInstructors() {
		const response = await fetch(`/api/staff/instructors/all`);
		const data = await response.json();
		const returningData = data.map((instructor) => {
			return {
				value: instructor.user_id,
				label: instructor.name
			};
		});
		instructors.set(returningData);
	}

	async function fetchAllTeachingInfo() {
		const response = await fetch(`/api/staff/stats/enrollments_by_instructor`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ instructor_id: selectedInstructor.value })
		});
		const data = await response.json();
		teachingInfo.set(data);
		console.log(data);
	}

	let selectedInstructor = { value: '', label: '' };
	$: console.log(selectedInstructor);
	const tableData = createTable(teachingInfo, {
		paginate: addPagination()
	});

	const columns = tableData.createColumns([
		tableData.column({
			accessor: 'course_name',
			header: 'Course Taught'
		}),
		tableData.column({
			accessor: 'student_major',
			header: 'Major Enrolling in Course'
		}),
		tableData.column({
			accessor: 'total_students',
			header: 'Total Students for this Major'
		})
	]);

	onMount(() => {
		fetchAllInstructors();
	});
</script>

<Layout>
	<div>
		<div class="mb-6">
			<h3 class="mb-2 text-2xl font-semibold">Select Instructor</h3>
			<div class="flex">
				<Select.Root bind:selected={selectedInstructor}>
					<Select.Trigger class="w-[300px]">
						<Select.Value placeholder="Choose an instructor" />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each $instructors as instructorObject}
								<Select.Item value={instructorObject.value} label={instructorObject.label}
									>{instructorObject.label}</Select.Item
								>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
				<Button on:click={fetchAllTeachingInfo} class="ml-4">Get Teaching Info</Button>
			</div>
		</div>
		<div>
			<h3 class="mb-4 text-2xl font-semibold">Teaching Info</h3>
			<StudentsCourses {tableData} {columns} />
		</div>
	</div>
</Layout>
