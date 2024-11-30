<script>
	import Schedule from '$lib/components/custom/schedule/Schedule.svelte';
	import Header from '$lib/components/custom/dashboard/Header.svelte';
	import Layout from '$lib/components/custom/ui/Layout.svelte';

	import { page } from '$app/stores';

	const crn = $page.url.searchParams.get('crn');
	const name = $page.url.searchParams.get('name');
	const prefix = $page.url.searchParams.get('prefix');
	const courseNumber = $page.url.searchParams.get('courseNumber');

	const userToken = $page.data?.session?.user;
</script>

<Header content="Schedule" />
<Layout>
	<Schedule {crn} {name} {prefix} {courseNumber} user={userToken} />
</Layout>
