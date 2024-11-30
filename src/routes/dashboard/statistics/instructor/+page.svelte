<script>
	import Header from '$lib/components/custom/dashboard/Header.svelte';
	import { page } from '$app/stores';
	import InstructorStats from '$lib/components/custom/statistics/InstructorStats.svelte';

	const userToken = $page.data?.session?.user;
</script>

<Header content="Major Statistics" />
<InstructorStats user={userToken} />
