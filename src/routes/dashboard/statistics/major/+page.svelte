<script>
	import * as Select from '$lib/components/ui/select';
	import * as Table from '$lib/components/ui/table/index';
	import Layout from '$lib/components/custom/ui/Layout.svelte';
	import Header from '$lib/components/custom/dashboard/Header.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	import Input from '$lib/components/ui/input/input.svelte';

	import { createTable, Subscribe, Render } from 'svelte-headless-table';
	import { addPagination, addTableFilter, addSortBy } from 'svelte-headless-table/plugins';
	import { readable, writable } from 'svelte/store';

	let majors = [
		'Computer Science',
		'Electrical Engineering',
		'Mechanical Engineering',
		'Mathematics',
		'Physics',
		'Chemistry',
		'Biology'
	];

	let studentRankings = [
		{ name: 'Alice Smith', gpa: 4.0, major: 'Computer Science', yearsInUni: 4 },
		{ name: 'Bob Johnson', gpa: 3.9, major: 'Mathematics', yearsInUni: 3 },
		{ name: 'Charlie Davis', gpa: 3.8, major: 'Physics', yearsInUni: 2 },
		{ name: 'Diana Evans', gpa: 3.7, major: 'Biology', yearsInUni: 4 },
		{ name: 'Edward Taylor', gpa: 3.6, major: 'Chemistry', yearsInUni: 1 },
		{ name: 'Fiona Green', gpa: 3.9, major: 'Computer Science', yearsInUni: 2 },
		{ name: 'George Brown', gpa: 3.5, major: 'Mathematics', yearsInUni: 4 },
		{ name: 'Hannah Wilson', gpa: 4.0, major: 'Biology', yearsInUni: 3 },
		{ name: 'Ian Adams', gpa: 3.4, major: 'Physics', yearsInUni: 1 },
		{ name: 'Julia Clark', gpa: 3.7, major: 'Mathematics', yearsInUni: 2 },
		{ name: 'Kevin Harris', gpa: 3.2, major: 'Chemistry', yearsInUni: 4 },
		{ name: 'Laura Martinez', gpa: 3.8, major: 'Biology', yearsInUni: 3 },
		{ name: 'Michael Lee', gpa: 3.5, major: 'Computer Science', yearsInUni: 1 },
		{ name: 'Nancy Lopez', gpa: 3.9, major: 'Mathematics', yearsInUni: 2 },
		{ name: 'Oscar Hall', gpa: 3.3, major: 'Physics', yearsInUni: 4 },
		{ name: 'Patricia Allen', gpa: 4.0, major: 'Biology', yearsInUni: 3 },
		{ name: 'Quentin Wright', gpa: 3.8, major: 'Chemistry', yearsInUni: 2 },
		{ name: 'Rachel King', gpa: 3.6, major: 'Computer Science', yearsInUni: 4 },
		{ name: 'Sam Scott', gpa: 3.7, major: 'Physics', yearsInUni: 3 },
		{ name: 'Tina Moore', gpa: 3.5, major: 'Mathematics', yearsInUni: 2 },
		{ name: 'Ulysses White', gpa: 3.2, major: 'Biology', yearsInUni: 4 },
		{ name: 'Vanessa Hill', gpa: 3.9, major: 'Computer Science', yearsInUni: 3 },
		{ name: 'William Baker', gpa: 3.4, major: 'Physics', yearsInUni: 1 },
		{ name: 'Xavier Rivera', gpa: 3.6, major: 'Chemistry', yearsInUni: 2 },
		{ name: 'Yasmine Young', gpa: 3.8, major: 'Mathematics', yearsInUni: 4 },
		{ name: 'Zachary Carter', gpa: 3.5, major: 'Biology', yearsInUni: 3 },
		{ name: 'Abigail Turner', gpa: 3.7, major: 'Physics', yearsInUni: 2 },
		{ name: 'Brandon Perez', gpa: 3.9, major: 'Computer Science', yearsInUni: 4 },
		{ name: 'Cynthia Ross', gpa: 4.0, major: 'Mathematics', yearsInUni: 3 },
		{ name: 'David Foster', gpa: 3.8, major: 'Biology', yearsInUni: 2 },
		{ name: 'Eleanor Simmons', gpa: 3.6, major: 'Chemistry', yearsInUni: 4 },
		{ name: 'Frank Kelly', gpa: 3.5, major: 'Physics', yearsInUni: 3 },
		{ name: 'Grace Butler', gpa: 3.7, major: 'Mathematics', yearsInUni: 2 },
		{ name: 'Henry Barnes', gpa: 3.3, major: 'Biology', yearsInUni: 4 },
		{ name: 'Isabel Morgan', gpa: 3.9, major: 'Computer Science', yearsInUni: 3 },
		{ name: 'Jack Sanders', gpa: 3.4, major: 'Physics', yearsInUni: 1 },
		{ name: 'Katie Ross', gpa: 4.0, major: 'Chemistry', yearsInUni: 2 },
		{ name: 'Leo Price', gpa: 3.8, major: 'Mathematics', yearsInUni: 4 },
		{ name: 'Megan Bailey', gpa: 3.6, major: 'Biology', yearsInUni: 3 },
		{ name: 'Nathaniel Wood', gpa: 3.5, major: 'Computer Science', yearsInUni: 2 },
		{ name: 'Olivia Jenkins', gpa: 3.9, major: 'Mathematics', yearsInUni: 4 },
		{ name: 'Paul Reed', gpa: 3.7, major: 'Physics', yearsInUni: 3 },
		{ name: 'Quinn Watson', gpa: 3.4, major: 'Biology', yearsInUni: 1 },
		{ name: 'Rose Hughes', gpa: 3.9, major: 'Computer Science', yearsInUni: 2 },
		{ name: 'Sarah Bryant', gpa: 3.5, major: 'Chemistry', yearsInUni: 4 },
		{ name: 'Tom Griffin', gpa: 3.6, major: 'Mathematics', yearsInUni: 3 },
		{ name: 'Uma Powell', gpa: 3.2, major: 'Physics', yearsInUni: 4 },
		{ name: 'Victor Sullivan', gpa: 3.8, major: 'Biology', yearsInUni: 3 },
		{ name: 'Wendy Myers', gpa: 4.0, major: 'Chemistry', yearsInUni: 2 },
		{ name: 'Xena James', gpa: 3.7, major: 'Mathematics', yearsInUni: 4 },
		{ name: 'Yosef Clark', gpa: 3.5, major: 'Biology', yearsInUni: 3 },
		{ name: 'Zoe Mitchell', gpa: 3.8, major: 'Computer Science', yearsInUni: 2 }
	];

	let selectedMajor = { value: '', label: '' };
	$: console.log(selectedMajor);
	// const tableHeaders = Object.keys(studentRankings[0]); // Get keys from first student
	const tableData = createTable(writable(studentRankings), {
		paginate: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.includes(filterValue)
		})
	});

	const columns = tableData.createColumns([
		tableData.column({
			accessor: 'name',
			header: 'Name',
			filter: { exclude: true }
		}),
		tableData.column({
			accessor: 'gpa',
			header: 'GPA',
			filter: {
				exclude: true
			}
		}),
		tableData.column({
			accessor: 'major',
			header: 'Major'
		}),
		tableData.column({
			accessor: 'yearsInUni',
			header: 'Years in University',
			filter: {
				exclude: true
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		tableData.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.paginate;
	const { filterValue } = pluginStates.filter;
	$: $filterValue = selectedMajor.value;
</script>

<Header content="Major Statistics" />
<Layout>
	<div>
		<div class="mb-6">
			<h3 class="mb-2 text-2xl font-semibold">Select Major</h3>
			<Select.Root bind:selected={selectedMajor}>
				<Select.Trigger class="w-[300px]">
					<Select.Value placeholder="Choose a major" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each majors as major}
							<Select.Item value={major} label={major}>{major}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</div>
		<div>
			<h3 class="mb-4 text-2xl font-semibold">Rankings</h3>
			<div>
				<Table.Root {...$tableAttrs}>
					<Table.Header>
						{#each $headerRows as headerRow}
							<Subscribe rowAttrs={headerRow.attrs()} let:attrs>
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
	</div></Layout
>
