<script>
	import Layout from '../ui/Layout.svelte';
	import KeyValue from '../ui/KeyValue.svelte';

	import StudentsCourses from './StudentsCourses.svelte';
	import { createTable } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import { addPagination } from 'svelte-headless-table/plugins';

	let courses;
	let coursesTableData;
	let coursesTableColumns;

	export let limitedPermissions = false;
	export let user;
	const fetchUserData = async () => {
		const response = await fetch(`/api/student`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json' // Ensure Content-Type is JSON
			},
			body: JSON.stringify({
				user_id: user.user_id
			})
		});
		const data = await response.json();
		return data;
	};

	const fetchUserEnrollments = async () => {
		const response = await fetch(`/api/student/enrollments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user_id: user.user_id })
		});
		const data = await response.json();

		courses = data;
		coursesTableData = createTable(readable(courses), {
			paginate: addPagination()
		});

		coursesTableColumns = coursesTableData.createColumns([
			coursesTableData.column({
				accessor: 'CRN',
				header: 'CRN'
			}),
			coursesTableData.column({
				accessor: 'prefix',
				header: 'Course Code'
			}),
			coursesTableData.column({
				accessor: 'course_number',
				header: 'Course Number'
			}),
			coursesTableData.column({
				accessor: 'course_name',
				header: 'Course Name'
			}),
			coursesTableData.column({
				accessor: 'credits',
				header: 'Credits'
			}),
			coursesTableData.column({
				accessor: 'grade',
				header: 'Grade',
				cell: ({ value }) => (value ? value : 'IP')
			}),
			coursesTableData.column({
				accessor: 'instructor'
			})
		]);

		return { data, coursesTableData, coursesTableColumns };
	};
</script>

{#await fetchUserData()}
	<div>Fetching data...</div>
{:then userObject}
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
						{userObject.gpa.toFixed(2)}
					</h2>
				</div>
				<a
					href={limitedPermissions
						? `/dashboard/manage/students/${user.user_id}/what-if-gpa`
						: '/dashboard/what-if-gpa'}
					><p class="absolute bottom-4 right-4 text-sm text-muted-foreground underline">
						what-if GPA
					</p></a
				>
			</div>
			<div class="p-8">
				<div class="grid grid-cols-3 gap-8">
					<div>
						<KeyValue key="Name" value={userObject.name} />
						<KeyValue key="U-Number" value={userObject.u_number} />
						<KeyValue key="DOB" value={Date(userObject.dob)} />
						<KeyValue key="Department" value={userObject.department_name} />
						<KeyValue key="Major" value={userObject.major} />
					</div>
					<div>
						<!-- <KeyValue key="Class" value={classStanding} /> -->
						<KeyValue key="Credits Taken" value={userObject.creditsTaken} />
					</div>
				</div>
			</div>
		</div>
		<h2
			class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
		>
			Courses
		</h2>
		{#await fetchUserEnrollments() then { coursesData, coursesTableData, coursesTableColumns }}
			<StudentsCourses
				tableData={coursesTableData}
				columns={coursesTableColumns}
				containerStyles="p-[5%]"
			/>
		{/await}
	</Layout>
{/await}
