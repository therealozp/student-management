<script>
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import Header from '../dashboard/Header.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	import students from '$lib/dummy_data/fake_student_data_usf.json';
	import { createTable, Subscribe, Render } from 'svelte-headless-table';
	import { addPagination, addTableFilter } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';

	const tableHeaders = Object.keys(students[0]);
	const tableData = createTable(readable(students), {
		paginate: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columns = tableData.createColumns([
		tableData.column({
			accessor: 'name',
			header: 'Name'
		}),
		tableData.column({
			accessor: 'uid',
			header: 'USF ID'
		}),
		tableData.column({
			accessor: 'email',
			header: 'Email'
		}),
		tableData.column({
			accessor: 'dob',
			header: 'DOB',
			cell: ({ value }) => {
				const date = new Date(value);
				return date.toLocaleDateString();
			},
			filter: {
				exclude: true
			}
		}),
		tableData.column({
			accessor: 'enrolled_courses',
			header: 'Enrolled Courses',
			filter: {
				exclude: true
			}
		}),
		tableData.column({
			accessor: 'GPA',
			header: 'GPA',
			filter: {
				exclude: true
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		tableData.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.paginate;
	// console.log(students);
	// console.log(tableHeaders);
	const { filterValue } = pluginStates.filter;
</script>

<Header content="Manage Students" />
<div class="px-[5%] py-16">
	<div>
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/dashboard/advisor">Dashboard</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/manage-students">Manage Students</Breadcrumb.Link>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>
	<div class="flex items-center py-4">
		<Input class="max-w-sm" placeholder="Filter emails..." type="text" bind:value={$filterValue} />
	</div>
	<div>
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
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
	</div>
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
