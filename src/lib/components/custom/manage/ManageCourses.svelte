<script>
	import Header from '../dashboard/Header.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	import { createTable, createRender } from 'svelte-headless-table';
	import { addPagination } from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';

	import CoursesTableActions from './CoursesTableActions.svelte'; // Optional for any specific actions on courses.
	import StudentsCourses from '../dashboard/StudentsCourses.svelte';
	import { onMount } from 'svelte';

	export let user;

	const tableStore = writable([]); // Initialize table store with writable.
	let tableData;
	let columns;

	let searchQuery = '';

	// Fetch all courses and populate the table, defaulting to no filter when searchQuery is empty.
	const fetchCourses = async () => {
		const response = await fetch(`/api/staff/courses`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user_id: user.user_id, searchQuery })
		});
		const data = await response.json();
		tableStore.set(data); // Update store.
		console.log(data); // Verify fetched data.
	};

	// Create the table instance with pagination.
	tableData = createTable(tableStore, {
		paginate: addPagination()
	});

	// Define columns.
	columns = tableData.createColumns([
		tableData.column({
			accessor: 'CRN',
			header: 'CRN'
		}),
		tableData.column({
			accessor: 'course_name',
			header: 'Course Name'
		}),
		tableData.column({
			accessor: 'prefix',
			header: 'Prefix'
		}),
		tableData.column({
			accessor: 'course_number',
			header: 'Course Number'
		}),
		tableData.column({
			accessor: 'capacity',
			header: 'Capacity'
		}),
		tableData.column({
			accessor: 'enrolled',
			header: 'Enrolled'
		}),
		tableData.column({
			accessor: 'instructor_name',
			header: 'Instructor'
		}),
		tableData.column({
			accessor: 'department_name',
			header: 'Department'
		}),
		tableData.column({
			accessor: 'section_number',
			header: 'Section'
		}),
		tableData.column({
			accessor: ({ CRN }) => CRN,
			header: '',
			cell: ({ value }) => createRender(CoursesTableActions, { crn: value }) // Optional action buttons for each course.
		})
	]);

	onMount(() => {
		fetchCourses(); // Fetch courses on mount.
	});
</script>

<Header content="Manage Courses" />
<div class="px-[5%] py-16">
	<div class="flex items-center py-4">
		<Input class="max-w-sm" placeholder="Search Courses..." type="text" bind:value={searchQuery} />
		<Button class="ml-4" on:click={() => fetchCourses()}>Search</Button>
	</div>
	<div>
		<StudentsCourses {tableData} {columns} />
		<!-- Table rendering for courses -->
	</div>
</div>
