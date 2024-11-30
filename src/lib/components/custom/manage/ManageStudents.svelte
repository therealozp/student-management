<script>
	import Header from '../dashboard/Header.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	import { createTable, createRender } from 'svelte-headless-table';
	import { addPagination } from 'svelte-headless-table/plugins';
	import StudentsCourses from '../dashboard/StudentsCourses.svelte';
	import { writable } from 'svelte/store';

	import StudentTableActions from './StudentTableActions.svelte';

	export let user;

	const tableStore = writable([]);
	let tableData;
	let columns;

	let searchQuery = '';

	const fetchStudents = async () => {
		const response = await fetch(`/api/advisor/students`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user_id: user.user_id, searchQuery })
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
			accessor: 'dob',
			header: 'Date of Birth',
			cell: ({ value }) => {
				return new Date(value).toLocaleDateString();
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
			accessor: 'year',
			header: 'Year'
		}),
		tableData.column({
			accessor: 'major',
			header: 'Major'
		}),
		tableData.column({
			accessor: ({ user_id }) => user_id,
			header: '',
			cell: ({ value }) => {
				return createRender(StudentTableActions, { student_id: value });
			}
		})
	]);
</script>

<Header content="Manage Students - Advisor's View" />
<div class="px-[5%] py-16">
	<div class="flex items-center py-4">
		<Input class="max-w-sm" placeholder="Search..." type="text" bind:value={searchQuery} />
		<Button class="ml-4" on:click={() => fetchStudents()}>Search</Button>
	</div>
	<div>
		<StudentsCourses {tableData} {columns} />
	</div>
</div>
