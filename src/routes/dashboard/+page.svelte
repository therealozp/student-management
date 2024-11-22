<script>
	import StudentView from '$lib/components/custom/dashboard/StudentView.svelte';
	import AdvisorsView from '$lib/components/custom/dashboard/AdvisorsView.svelte';
	import FacultyView from '$lib/components/custom/dashboard/FacultyView.svelte';
	import StaffView from '$lib/components/custom/dashboard/StaffView.svelte';
	import ErrorPage from '$lib/components/custom/ErrorPage.svelte';
	import Header from '$lib/components/custom/dashboard/Header.svelte';
	import { sessionStore } from '$lib/store/userStore';

	let user = $sessionStore;
	console.log(user);
</script>

<Header content={'Welcome, ' + user.name} />
{#if user.role === 'student'}
	<StudentView />
{:else if user.role === 'advisor'}
	<AdvisorsView />
{:else if user.role === 'instructor'}
	<FacultyView />
{:else if user.role === 'staff'}
	<StaffView />
{:else}
	<ErrorPage />
{/if}
