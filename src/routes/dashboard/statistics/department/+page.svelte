<script>
	import Header from '$lib/components/custom/dashboard/Header.svelte';
	import { page } from '$app/stores';
	import DeptStats from '$lib/components/custom/statistics/DeptStats.svelte';

	const userToken = $page.data?.session?.user;
</script>

<Header content="Department Statistics" />
<DeptStats user={userToken} />
