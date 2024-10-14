<script>
	import Header from '../dashboard/Header.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Layout from '../ui/Layout.svelte';

	let courseInformation = {
		course_name: 'Object-Oriented Programming',
		course_prefix: 'COP',
		course_number: '1231',
		course_description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illum eum dolorum quasi vel assumenda repellendus facere ex, ab excepturi fugit esse quis unde aperiam facilis laudantium repellat doloremque beatae.',
		CRN: 95314,
		capacity: 81,
		overridable: false,
		waitlisted: 2,
		current_instructor: 'Instructor 2',
		section_number: '001',
		is_offered: true
	};

	let name = courseInformation.course_name;
	let capacity = courseInformation.capacity;
	let currentCode = courseInformation.course_prefix;

	let courseNumber = courseInformation.course_number;
	let availableCodes = ['CAP', 'COP', 'CDA', 'COT', 'CEN'];

	// should be instructors in the same department e.g. CSE
	let currentInstructor = courseInformation.current_instructor;
	let instructors = ['ins 1', 'ins 2', 'ins 3', 'ins 4'];

	let currentlyOffered = courseInformation.is_offered;
	let currentDescription = courseInformation.course_description;
</script>

<Layout>
	<div>
		<div class="my-4 grid grid-cols-2">
			<div class="w-[300px]">
				<h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">CRN</h2>
			</div>
			<Input value={courseInformation.CRN} readonly disabled />
		</div>
		<div class="my-4 grid grid-cols-2">
			<div class="w-[300px]">
				<h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
					Offered?
				</h2>
			</div>
			<div class="flex items-center">
				<Checkbox bind:checked={currentlyOffered} class="mr-4" />
				<p>{currentlyOffered ? 'Yes' : 'No'}</p>
			</div>
		</div>
		<div class="my-4 grid grid-cols-2">
			<div class="w-[300px]">
				<h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
					Course Name
				</h2>
			</div>
			<Input bind:value={name} />
		</div>
		<div class="my-4 grid grid-cols-2">
			<div class="w-[300px]">
				<h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
					Course Code
				</h2>
			</div>
			<div class="flex items-center">
				<Select.Root bind:selected={currentCode}>
					<Select.Trigger class="w-[180px]">
						<Select.Value placeholder={currentCode} />
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
				<Input bind:value={courseNumber} />
			</div>
		</div>
		<div class="my-4 grid grid-cols-2">
			<div class="w-[300px]">
				<h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
					Course Description
				</h2>
			</div>
			<Input bind:value={currentDescription} />
		</div>
		<div class="my-4 grid grid-cols-2">
			<div class="w-[300px]">
				<h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
					Instructor
				</h2>
			</div>
			<Select.Root bind:selected={currentInstructor}>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder={currentInstructor} />
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
			<Input type="number" min="0" max="999" step="1" bind:value={capacity} />
		</div>
		<div>
			<Button class="font-bold">Save changes</Button>
			<Button class="font-bold" variant="outline">Discard Changes</Button>
		</div>
	</div>
</Layout>
