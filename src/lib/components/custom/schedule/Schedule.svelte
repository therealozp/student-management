<script>
	import * as Table from '$lib/components/ui/table';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import courses from '$lib/dummy_data/fake_schedule.json';
	import Header from '../dashboard/Header.svelte';
</script>

<Header content="Search results" />
<div class="grid gap-10 p-[5%] pt-[4%]">
	<div>
		<Table.Root>
			<Table.Caption>Search Results</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head>CRN</Table.Head>
					<Table.Head>Course Dept.</Table.Head>
					<Table.Head>Course Number</Table.Head>
					<Table.Head>Name</Table.Head>

					<Table.Head>Instructor</Table.Head>
					<Table.Head>Available</Table.Head>
					<Table.Head>Capacity</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each courses as course, i (i)}
					<Table.Row>
						<Table.Cell class="font-medium">{course.CRN}</Table.Cell>
						<Table.Cell>{course.prefix}</Table.Cell>
						<Table.Cell>{course.course_number}</Table.Cell>
						<Table.Cell>{course.course_name}</Table.Cell>

						<Table.Cell>{course.instructor}</Table.Cell>
						<Table.Cell>{course.capacity - course.enrolled}</Table.Cell>
						<Table.Cell>{course.capacity}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
