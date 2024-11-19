<script>
	import * as Table from '$lib/components/ui/table/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { createTable, Subscribe, Render } from 'svelte-headless-table';
	import { addTableFilter, addPagination } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import courses from '$lib/dummy_data/fake_schedule.json';

	// Convert course data to readable store
	const tableData = createTable(readable(courses), {
		paginate: addPagination()
	});

	const columns = tableData.createColumns([
		tableData.column({ accessor: 'CRN', header: 'CRN' }),
		tableData.column({ accessor: 'course_name', header: 'Course Name' }),
		tableData.column({ accessor: 'prefix', header: 'Course Code' }),
		tableData.column({ accessor: 'course_number', header: 'Course Number' }),
		tableData.column({ accessor: 'instructor', header: 'Instructor' }),
		tableData.column({ accessor: 'capacity', header: 'Capacity' }),
		tableData.column({ accessor: 'enrolled', header: 'Enrolled' }),
		tableData.column({ accessor: 'waitlisted', header: 'Waitlisted' })
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		tableData.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.paginate;
</script>

<div class="flex w-full flex-col space-y-4">
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
