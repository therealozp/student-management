<script>
	import ManageCourses from '$lib/components/custom/manage/ManageCourses.svelte';
	import { page } from '$app/stores';

	const userToken = $page.data?.session?.user;
</script>

<ManageCourses user={userToken} />
