<script>
	import Header from '../dashboard/Header.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	import { createTable, createRender } from 'svelte-headless-table';
	import { addPagination } from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';

	import StudentsCourses from '../dashboard/StudentsCourses.svelte';
	import InstructorTableActions from './InstructorTableActions.svelte';
	import { onMount } from 'svelte';

	export let user;

	const tableStore = writable([]);
	let tableData;
	let columns;

	let searchQuery = '';

	const fetchInstructors = async () => {
		const response = await fetch(`/api/staff/instructors/query`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ staff_id: user.user_id, searchQuery })
		});
		const data = await response.json();
		tableStore.set(data);
		console.log(tableStore);
	};

	tableData = createTable(tableStore, {
		paginate: addPagination()
	});

	columns = tableData.createColumns([
		tableData.column({
			accessor: 'name',
			header: 'Name'
		}),
		tableData.column({
			accessor: 'u_number',
			header: 'U Number'
		}),
		tableData.column({
			accessor: 'email',
			header: 'Email'
		}),
		tableData.column({
			accessor: 'department_name',
			header: 'Department'
		}),
		tableData.column({
			accessor: ({ user_id }) => user_id,
			header: '',
			cell: ({ value }) => {
				return createRender(InstructorTableActions, { instructor_id: value });
			}
		})
	]);

	onMount(() => {
		fetchInstructors();
	});
</script>

<Header content="Manage Instructors" />
<div class="px-[5%] py-16">
	<div class="flex items-center py-4">
		<Input class="max-w-sm" placeholder="Search..." type="text" bind:value={searchQuery} />
		<Button class="ml-4" on:click={() => fetchInstructors()}>Search</Button>
	</div>
	<div>
		<StudentsCourses {tableData} {columns} />
	</div>
</div>
