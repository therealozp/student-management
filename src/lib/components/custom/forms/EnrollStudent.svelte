<script>
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Layout from '../ui/Layout.svelte';

	let studentEmail = '';
	let courseCRN = '';

	function enrollStudent() {
		if (studentEmail && courseCRN) {
			// Logic for enrolling the student using the email and CRN
			console.log(`Enrolling ${studentEmail} into course CRN ${courseCRN}`);
			alert(`Student ${studentEmail} enrolled into course CRN ${courseCRN}`);
		} else {
			alert('Please provide both the student email and the course CRN.');
		}
	}
	function dropStudent() {
		if (studentEmail && courseCRN) {
			console.log(`dropping ${studentEmail} into course CRN ${courseCRN}`);
			alert(`Student ${studentEmail} dropped into course CRN ${courseCRN}`);
		} else {
			alert('Please provide both the student email and the course CRN.');
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
		<div>
			<Button class="font-bold" on:click={enrollStudent}>Enroll</Button>
			<Button class="ml-4 font-bold" on:click={dropStudent} variant="destructive">Drop</Button>
		</div>
	</div>
</Layout>
