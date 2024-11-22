<script>
	import StudentView from '$lib/components/custom/dashboard/StudentView.svelte';
	import AdvisorsView from '$lib/components/custom/dashboard/AdvisorsView.svelte';
	import FacultyView from '$lib/components/custom/dashboard/FacultyView.svelte';
	import StaffView from '$lib/components/custom/dashboard/StaffView.svelte';
	import Header from '$lib/components/custom/dashboard/Header.svelte';

	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;
	let userToken = data.token;
	// onMount(() => {
	// 	if (!data.token) {
	// 		toast.error('Please login to access this page.');
	// 		goto('/');
	// 	}
	// });
	const role = userToken?.role;
</script>

<Header content={'Welcome, ' + userToken?.name} />
{#if role === 'student'}
	<StudentView />
{:else if role === 'advisor'}
	<AdvisorsView />
{:else if role === 'instructor'}
	<FacultyView />
{:else if role === 'staff'}
	<StaffView />
{:else}
	{null}
{/if}
