<script>
	import Header from '../dashboard/Header.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Layout from '../ui/Layout.svelte';

	let newCourse = {
		course_name: '',
		course_prefix: '',
		course_number: '',
		course_description: '',
		CRN: '', // Optional; typically generated server-side
		capacity: 0,
		overridable: false,
		waitlisted: 0,
		current_instructor: '',
		section_number: '',
		is_offered: false
	};

	let availableCodes = ['CAP', 'COP', 'CDA', 'COT', 'CEN'];
	let instructors = ['Instructor 1', 'Instructor 2', 'Instructor 3', 'Instructor 4'];
</script>

<Layout>
	<div>
		<div class="my-4 grid grid-cols-2">
			<div class="w-[300px]">
				<h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
					Offered?
				</h2>
			</div>
			<div class="flex items-center">
				<Checkbox bind:checked={newCourse.is_offered} class="mr-4" />
				<p>{newCourse.is_offered ? 'Yes' : 'No'}</p>
			</div>
		</div>
		<div class="my-4 grid grid-cols-2">
			<div class="w-[300px]">
				<h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
					Course Name
				</h2>
			</div>
			<Input bind:value={newCourse.course_name} placeholder="Enter course name" />
		</div>
		<div class="my-4 grid grid-cols-2">
			<div class="w-[300px]">
				<h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
					Course Code
				</h2>
			</div>
			<div class="flex items-center">
				<Select.Root bind:selected={newCourse.course_prefix}>
					<Select.Trigger class="w-[180px]">
						<Select.Value placeholder="Select Code" />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Label>Codes</Select.Label>
							{#each availableCodes as code}
								<Select.Item value={code} label={code} />
							{/each}
						</Select.Group>
					</Select.Content>
					<Select.Input name="Course Code" />
				</Select.Root>
				<Input bind:value={newCourse.course_number} placeholder="Course Number" />
			</div>
		</div>
		<div class="my-4 grid grid-cols-2">
			<div class="w-[300px]">
				<h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
					Course Description
				</h2>
			</div>
			<Input bind:value={newCourse.course_description} placeholder="Enter course description" />
		</div>
		<div class="my-4 grid grid-cols-2">
			<div class="w-[300px]">
				<h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
					Instructor
				</h2>
			</div>
			<Select.Root bind:selected={newCourse.current_instructor}>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Select Instructor" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Faculty</Select.Label>
						{#each instructors as ins}
							<Select.Item value={ins} label={ins} />
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="Faculty" />
			</Select.Root>
		</div>
		<div class="my-4 grid grid-cols-2">
			<div class="w-[300px]">
				<h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
					Capacity
				</h2>
			</div>
			<Input
				type="number"
				min="0"
				max="999"
				step="1"
				bind:value={newCourse.capacity}
				placeholder="Enter capacity"
			/>
		</div>
		<div>
			<Button class="font-bold">Add Course</Button>
			<Button class="ml-4 font-bold" variant="outline">Cancel</Button>
		</div>
	</div>
</Layout>
