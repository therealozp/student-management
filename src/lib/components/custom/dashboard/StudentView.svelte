<script>
	import Layout from '../ui/Layout.svelte';
	import KeyValue from '../ui/KeyValue.svelte';
	import { userObject } from '$lib/store/userStore';

	import { courseDatabase } from '$lib/store/courseStore';
	import StudentsCourses from './StudentsCourses.svelte';
	import { createTable } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import { addPagination } from 'svelte-headless-table/plugins';

	const coursesTaking = courseDatabase.filter((course) =>
		$userObject.coursesTaking.includes(course.CRN)
	);

	const coursesTaken = courseDatabase.filter((course) =>
		$userObject.coursesTaken.includes(course.CRN)
	);

	const coursesTakingTableData = createTable(readable(coursesTaking), {
		paginate: addPagination()
	});

	const coursesTakingTableColumns = coursesTakingTableData.createColumns([
		coursesTakingTableData.column({
			accessor: 'CRN',
			header: 'CRN'
		}),
		coursesTakingTableData.column({
			accessor: 'prefix',
			header: 'Course Code'
		}),
		coursesTakingTableData.column({
			accessor: 'course_number',
			header: 'Course Number'
		}),
		coursesTakingTableData.column({
			accessor: 'course_name',
			header: 'Course Name'
		}),
		coursesTakingTableData.column({
			accessor: 'credits',
			header: 'Credits'
		}),
		coursesTakingTableData.column({
			accessor: 'grade',
			header: 'Grade',
			cell: ({ value }) => (value ? value : 'IP')
		}),
		coursesTakingTableData.column({
			accessor: 'instructor',
			header: 'Instructor'
		})
	]);

	const coursesTakenTableData = createTable(readable(coursesTaken), {
		paginate: addPagination()
	});
	const coursesTakenTableColumns = coursesTakenTableData.createColumns([
		coursesTakingTableData.column({
			accessor: 'CRN',
			header: 'CRN'
		}),
		coursesTakingTableData.column({
			accessor: 'prefix',
			header: 'Course Code'
		}),
		coursesTakenTableData.column({
			accessor: 'course_number',
			header: 'Course Number'
		}),
		coursesTakingTableData.column({
			accessor: 'course_name',
			header: 'Course Name'
		}),
		coursesTakingTableData.column({
			accessor: 'credits',
			header: 'Credits'
		}),
		coursesTakingTableData.column({
			accessor: 'grade',
			header: 'Grade'
		}),
		coursesTakingTableData.column({
			accessor: 'instructor',
			header: 'Instructor'
		})
	]);

	let classStanding =
		$userObject.years >= 4
			? 'Senior'
			: $userObject.years == 3
				? 'Junior'
				: $userObject.years == 2
					? 'Sophomore'
					: 'Freshman';
</script>

<Layout>
	<div class=" flex h-[300px] w-full rounded-md border-2 border-stone-200">
		<div
			class="relative flex w-[500px] items-center justify-center border-r-2 border-stone-200 p-8"
		>
			<h2
				class=" absolute left-4 top-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors"
			>
				Current GPA
			</h2>
			<div
				class="flex h-[140px] w-[140px] items-center justify-center rounded-full border-8 border-stone-200"
			>
				<h2 class="absolute scroll-m-20 text-3xl font-black tracking-tight transition-colors">
					{$userObject.gpa}
				</h2>
			</div>
			<a href="/what-if-gpa"
				><p class="absolute bottom-4 right-4 text-sm text-muted-foreground underline">
					what-if GPA
				</p></a
			>
		</div>
		<div class="p-8">
			<div class="grid grid-cols-3 gap-8">
				<div>
					<KeyValue key="Name" value={$userObject.name} />
					<KeyValue key="U-Number" value={$userObject.uNumber} />
					<KeyValue key="DOB" value={$userObject.dob} />
					<KeyValue key="Department" value={$userObject.department} />
					<KeyValue key="Major" value={$userObject.major} />
				</div>
				<div>
					<KeyValue
						key="Academic Standing"
						value={$userObject.academicStanding == 4 ? 'Good' : 'Bad'}
					/>
					<KeyValue key="Class" value={classStanding} />
					<KeyValue key="Credits Taken" value={$userObject.creditsTaken} />
				</div>
			</div>
		</div>
	</div>
	<h2
		class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
	>
		In Progress
	</h2>
	<StudentsCourses tableData={coursesTakingTableData} columns={coursesTakingTableColumns} />
	<h2
		class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
	>
		Taken
	</h2>
	<StudentsCourses tableData={coursesTakenTableData} columns={coursesTakenTableColumns} />
</Layout>
