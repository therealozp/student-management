<script>
	import * as Table from '$lib/components/ui/table/index.js';
	import Header from '../dashboard/Header.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	import courses from '$lib/dummy_data/fake_enrollment_sections.json';
	import { createTable, Subscribe, Render } from 'svelte-headless-table';
	import { addPagination, addTableFilter } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import { goto } from '$app/navigation';

	const tableHeaders = Object.keys(courses[0]);
	const tableData = createTable(readable(courses), {
		paginate: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columns = tableData.createColumns([
		tableData.column({
			accessor: 'CRN',
			header: 'CRN'
		}),
		tableData.column({
			accessor: 'course_code',
			header: 'Course Code'
		}),
		tableData.column({
			accessor: 'course_name',
			header: 'Course Name'
		}),
		tableData.column({
			accessor: 'capacity',
			header: 'Capacity'
		}),
		tableData.column({
			accessor: 'waitlisted',
			header: 'Waitlisted'
		}),
		tableData.column({
			accessor: 'overridable',
			header: 'Can Override'
		}),
		tableData.column({
			accessor: 'current_instructor',
			header: 'Instructor'
		}),
		tableData.column({
			accessor: 'section_number',
			header: 'Section'
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		tableData.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.paginate;

	const { filterValue } = pluginStates.filter;
</script>

<Header content="Manage Courses" />
<div class="p-[5%]">
	<div class="flex items-center py-4">
		<Input class="max-w-sm" placeholder="Search..." type="text" bind:value={$filterValue} />
		<Button class="ml-8" on:click={() => goto('/dashboard/manage/courses/new/')}
			>Add a new Course</Button
		>
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
						<Table.Row
							{...rowAttrs}
							on:click={() => {
								goto('/dashboard/manage/courses/' + row.original['CRN']);
							}}
							class="cursor-pointer"
						>
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
