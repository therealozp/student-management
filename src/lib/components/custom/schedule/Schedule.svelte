<script>
	import { createTable, Subscribe, Render } from 'svelte-headless-table';
	import { addPagination } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import StudentsCourses from '../dashboard/StudentsCourses.svelte';

	export let crn;
	export let name;
	export let prefix;
	export let courseNumber;

	let courses;

	async function fetchCourses() {
		const res = await fetch('/api/courses', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				crn,
				name,
				prefix,
				courseNumber
			})
		});

		if (res.ok) {
			courses = await res.json();
			const tableData = createTable(readable(courses), {
				paginate: addPagination()
			});

			const columns = tableData.createColumns([
				tableData.column({ accessor: 'CRN', header: 'CRN' }),
				tableData.column({ accessor: 'course_name', header: 'Course Name' }),
				tableData.column({ accessor: 'prefix', header: 'Course Code' }),
				tableData.column({ accessor: 'course_number', header: 'Course Number' }),
				tableData.column({ accessor: 'instructor_id', header: 'Instructor' }),
				tableData.column({ accessor: 'capacity', header: 'Capacity' }),
				tableData.column({ accessor: 'enrolled', header: 'Enrolled' }),
				tableData.column({
					accessor: 'schedule',
					header: 'Schedule',
					cell: ({ value }) => {
						console.log(value);
						return value
							.map((session) => {
								return `${session.day} ${session.start}-${session.end}`;
							})
							.join(', ');
					}
				}),
				tableData.column({
					accessor: 'section_number',
					header: 'Section'
				})
			]);

			return { tableData, columns };
		}

		return { tableData: null, columns: null };
	}
</script>

{#await fetchCourses()}
	<div>Fetching data</div>
{:then { tableData, columns }}
	<div class="flex w-full flex-col space-y-4">
		<StudentsCourses {tableData} {columns} />
	</div>
{/await}
