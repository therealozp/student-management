<script>
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Layout from '../ui/Layout.svelte';
	import * as Select from '$lib/components/ui/select/index';
	import { toast } from 'svelte-sonner';

	export let user;

	let studentEmail = '';
	let courseCRN = '';
	let enrolling_semester;

	const semester_options = [
		{ value: 'S24', label: 'Spring 2024' },
		{ value: 'F24', label: 'Fall 2024' },
		{ value: 'S25', label: 'Spring 2025' }
	];

	async function enrollStudent() {
		if (studentEmail && courseCRN && enrolling_semester) {
			const res = await fetch('/api/advisor/enroll_student', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					teacher_id: user.user_id,
					student_email: studentEmail.includes('@') ? studentEmail : studentEmail + '@zzz.edu',
					course_crn: courseCRN,
					enrolling_semester: enrolling_semester.value
				})
			});

			if (res.ok) {
				toast.success('Student enrolled successfully!');
			} else {
				const err = await res.json();
				toast.error('Failed to enroll student. Encountered error: ' + err.error_code);
			}
		} else {
			toast.error('Please provide all required fields.');
		}
	}

	function dropStudent() {
		if (studentEmail && courseCRN) {
			fetch('/api/advisor/drop_student', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					teacher_id: user.user_id,
					student_email: studentEmail.includes('@') ? studentEmail : studentEmail + '@zzz.edu',
					course_crn: courseCRN
				})
			})
				.then((res) => {
					if (res.ok) {
						toast.success('Successfully dropped student from course ' + courseCRN);
					} else {
						res.json().then((err) => {
							toast.error('Failed to drop student. Encountered error: ' + err.error_code);
						});
					}
				})
				.catch((err) => {
					toast.error('Failed to drop student. Encountered error: ' + err);
				});
		} else {
			toast.error('Please provide all required fields.');
		}
	}
</script>

<Layout>
	<div>
		<div class="my-4 grid grid-cols-2">
			<h2 class="w-[200px] scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
				Student Email
			</h2>
			<Input placeholder="Enter student email" bind:value={studentEmail} />
		</div>
		<div class="my-4 grid grid-cols-2">
			<h2 class="w-[200px] scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
				Course CRN
			</h2>
			<Input type="number" placeholder="Enter course CRN" bind:value={courseCRN} />
		</div>
		<div class="my-4 grid grid-cols-2">
			<h2 class="w-[200px] scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
				Semester
			</h2>
			<Select.Root bind:selected={enrolling_semester}>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Select a major" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each semester_options as semop}
							<Select.Item value={semop.value} label={semop.label}>{semop.label}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="Semester" />
			</Select.Root>
		</div>
		<div>
			<Button class="font-bold" on:click={enrollStudent}>Enroll</Button>
			<Button class="ml-4 font-bold" on:click={dropStudent} variant="destructive">Drop</Button>
		</div>
	</div>
</Layout>
