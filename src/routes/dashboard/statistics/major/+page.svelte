<script>
	import Header from '$lib/components/custom/dashboard/Header.svelte';
	import { page } from '$app/stores';
	import MajorStats from '$lib/components/custom/statistics/MajorStats.svelte';

	const userToken = $page.data?.session?.user;
</script>

<Header content="Major Statistics" />
<MajorStats user={userToken} />
