<script>
	import { userObject } from '$lib/store/userStore';
	import StudentView from '$lib/components/custom/dashboard/StudentView.svelte';
	import AdvisorsView from '$lib/components/custom/dashboard/AdvisorsView.svelte';
	import FacultyView from '$lib/components/custom/dashboard/FacultyView.svelte';
	import StaffView from '$lib/components/custom/dashboard/StaffView.svelte';
	import ErrorPage from '$lib/components/custom/ErrorPage.svelte';
	import Header from '$lib/components/custom/dashboard/Header.svelte';
</script>

<Header content={'Welcome, ' + $userObject.name} />
{#if $userObject.role === 'student'}
	<StudentView />
{:else if $userObject.role === 'advisor'}
	<AdvisorsView />
{:else if $userObject.role === 'faculty'}
	<FacultyView />
{:else if $userObject.role === 'staff'}
	<StaffView />
{:else}
	<ErrorPage />
{/if}
