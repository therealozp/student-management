<script>
	import Header from '../dashboard/Header.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Layout from '../ui/Layout.svelte';

	let crn;
	let name;
	let currentCode;
	let method;

	let courseNumber;
	let availableCodes = ['CAP', 'COP', 'CDA', 'COT', 'CEN'];

	// should be instructors in the same department e.g. CSE
	let currentInstructor;
	let instructors = ['ins 1', 'ins 2', 'ins 3', 'ins 4'];

	let registableOnly = true;
</script>

<Layout>
	<div>
		<div class="my-4 grid grid-cols-2">
			<div class="w-[300px]">
				<h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">CRN</h2>
			</div>
			<Input bind:value={crn} />
		</div>
		<div class="my-4 grid grid-cols-2">
			<div class="w-[300px]">
				<h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
					Show registable only?
				</h2>
			</div>
			<div class="flex items-center">
				<Checkbox bind:checked={registableOnly} class="mr-4" />
				<p>{registableOnly ? 'Yes' : 'No'}</p>
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
					Learning Method
				</h2>
			</div>
			<div class="flex items-center">
				<Select.Root bind:selected={method}>
					<Select.Trigger class="w-[180px]">
						<Select.Value placeholder={method} />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Label>Methods</Select.Label>
							{#each ['In-person', 'Online', 'Hybrid', 'Primary DL'] as mth}
								<Select.Item value={mth} label={mth} />
							{/each}
						</Select.Group>
					</Select.Content>
					<Select.Input name="Course Code" />
				</Select.Root>
			</div>
		</div>
		<div class="my-4 grid grid-cols-2">
			<div class="w-[300px]">
				<h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
					Instructor
				</h2>
			</div>
			<Select.Root bind:selected={currentInstructor}>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Select..." />
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
		<div>
			<Button class="font-bold">Search</Button>
		</div>
	</div>
</Layout>
