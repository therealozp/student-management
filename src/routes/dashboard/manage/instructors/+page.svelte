<script>
	import ManageInstructors from '$lib/components/custom/manage/ManageInstructors.svelte';
	import { page } from '$app/stores';

	const userToken = $page.data?.session?.user;
</script>

<ManageInstructors user={userToken} />
