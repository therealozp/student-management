<script>
	import Header from '$lib/components/custom/dashboard/Header.svelte';
	import { page } from '$app/stores';
	import SemesterStats from '$lib/components/custom/statistics/SemesterStats.svelte';

	const userToken = $page.data?.session?.user;
</script>

<Header content="Semesterly Statistics" />
<SemesterStats user={userToken} />
