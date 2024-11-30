<script>
	import ManageStudents from '$lib/components/custom/manage/ManageStudents.svelte';
	import { page } from '$app/stores';

	const userToken = $page.data?.session?.user;
</script>

<ManageStudents user={userToken} />
