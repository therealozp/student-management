<script>
	import StudentView from '$lib/components/custom/dashboard/StudentView.svelte';
	import AdvisorsView from '$lib/components/custom/dashboard/AdvisorsView.svelte';
	import FacultyView from '$lib/components/custom/dashboard/FacultyView.svelte';
	import StaffView from '$lib/components/custom/dashboard/StaffView.svelte';
	import Header from '$lib/components/custom/dashboard/Header.svelte';
	import { page } from '$app/stores';

	const userToken = $page.data?.session?.user;
</script>

<Header content={'Welcome, ' + userToken?.name} />
{#if userToken.role === 'student'}
	<StudentView user={userToken} />
{:else if userToken.role === 'advisor'}
	<AdvisorsView user={userToken} />
{:else if userToken.role === 'instructor'}
	<FacultyView user={userToken} />
{:else if userToken.role === 'staff'}
	<StaffView user={userToken} />
{:else}
	{null}
{/if}
