<script>
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select';
	import Button from '$lib/components/ui/button/button.svelte';
	import Layout from '../ui/Layout.svelte';

	import { goto } from '$app/navigation';

	let crn;
	let name;
	let prefix;
	let method;

	let courseNumber;

	function generateQueryString() {
		const params = new URLSearchParams();

		if (crn) params.append('crn', crn);
		if (name) params.append('name', name);
		if (prefix) params.append('prefix', prefix);
		if (courseNumber) params.append('courseNumber', courseNumber);
		if (method) params.append('method', method);

		// Log or use the query string
		return params.toString();
	}
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
					Course Name
				</h2>
			</div>
			<Input bind:value={name} />
		</div>
		<div class="my-4 grid grid-cols-2">
			<div class="w-[300px]">
				<h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
					Course code (prefix)
				</h2>
			</div>
			<div class="flex items-center">
				<Input bind:value={prefix} />
			</div>
		</div>
		<div class="my-4 grid grid-cols-2">
			<div class="w-[300px]">
				<h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors">
					Course Number
				</h2>
			</div>
			<div class="flex items-center">
				<Input bind:value={courseNumber} />
			</div>
		</div>
		<div>
			<Button
				class="font-bold"
				on:click={() => goto(`/dashboard/schedule/search?${generateQueryString()}`)}>Search</Button
			>
		</div>
	</div>
</Layout>
