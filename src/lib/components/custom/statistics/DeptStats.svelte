<script>
	import { createTable, createRender } from 'svelte-headless-table';
	import { addPagination } from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';

	import StudentsCourses from '../dashboard/StudentsCourses.svelte';
	import { onMount } from 'svelte';

	export let user;

	const tableStore = writable([]);
	let tableData;
	let columns;

	const fetchStats = async () => {
		const response = await fetch(`/api/staff/stats/department_rankings`);
		const data = await response.json();
		tableStore.set(data);
		console.log(tableStore);
	};

	tableData = createTable(tableStore, {
		paginate: addPagination()
	});

	columns = tableData.createColumns([
		tableData.column({
			accessor: 'department_id',
			header: 'Department ID'
		}),
		tableData.column({
			accessor: 'department_name',
			header: 'Department Name'
		}),
		tableData.column({
			accessor: 'average_gpa',
			header: 'Average GPA',
			cell: ({ value }) => {
				return value.toFixed(3);
			}
		})
	]);

	onMount(() => {
		fetchStats();
	});
</script>

<div class="px-[5%] py-16">
	<div>
		<StudentsCourses {tableData} {columns} />
	</div>
</div>
