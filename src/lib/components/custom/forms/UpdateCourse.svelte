<script>
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select';
	import Button from '$lib/components/ui/button/button.svelte';
	import Layout from '../ui/Layout.svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	export let crn;
	export let user;

	async function fetchCourseByCRN(crn) {
		const res = await fetch(`/api/courses/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ crn })
		});
		const course = await res.json();
		console.log(course);
		return course[0];
	}

	async function fetchInstructors() {
		const res = await fetch(`/api/staff/instructors/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ staff_id: user.user_id })
		});
		const instructors = await res.json();
		const instructorSelections = instructors.map((ins) => {
			return { value: ins.user_id, label: ins.name };
		});
		return instructorSelections;
	}

	let courseInformation = {
		CRN: '',
		course_name: '',
		prefix: '',
		course_number: '',
		capacity: 0,
		current_instructor: ''
	};

	let name = '';
	let capacity = 0;
	let prefix = '';
	let courseNumber = '';
	let currentInstructor;
	let instructors = [];

	// Load data on mount
	onMount(async () => {
		const course = await fetchCourseByCRN(crn);
		if (course) {
			courseInformation = course;
			name = course.course_name;
			capacity = course.capacity;
			prefix = course.prefix;
			courseNumber = course.course_number;
			currentInstructor = {
				value: course.instructor_id,
				label: course.instructor_name
			};
		}

		instructors = await fetchInstructors();
	});

	async function saveChanges() {
		const updatedCourse = {
			crn: courseInformation.CRN,
			course_name: name,
			prefix,
			course_number: courseNumber,
			capacity,
			instructor_id: currentInstructor.value
		};
		console.log(updatedCourse);
		const res = await fetch(`/api/staff/courses/update`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updatedCourse)
		});

		if (res.ok) {
			toast.success('Course updated successfully.');
		} else {
			toast.error('You are a failure.');
		}
	}
</script>

<Layout>
	<div>
		<h2 class="mb-8 text-4xl font-semibold">Edit Course Information</h2>
		<div class="my-4 grid grid-cols-2">
			<div>CRN</div>
			<Input value={courseInformation.CRN} readonly disabled />
		</div>
		<div class="my-4 grid grid-cols-2">
			<div>Course Name</div>
			<Input bind:value={name} />
		</div>
		<div class="my-4 grid grid-cols-2">
			<div>Prefix</div>
			<Input bind:value={prefix} />
		</div>
		<div class="my-4 grid grid-cols-2">
			<div>Course Number</div>
			<Input bind:value={courseNumber} />
		</div>
		<div class="my-4 grid grid-cols-2">
			<div>Instructor</div>
			<Select.Root bind:selected={currentInstructor}>
				<Select.Trigger>
					<Select.Value placeholder={currentInstructor} />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Instructors</Select.Label>
						{#each instructors as ins}
							<Select.Item value={ins.value} label={ins.label} />
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="Instructor" />
			</Select.Root>
		</div>
		<div class="my-4 grid grid-cols-2">
			<div>Capacity</div>
			<Input type="number" min="0" bind:value={capacity} />
		</div>
		<div>
			<Button class="font-bold" on:click={saveChanges}>Save Changes</Button>
			<Button class="font-bold" variant="outline">Discard Changes</Button>
		</div>
	</div>
</Layout>
