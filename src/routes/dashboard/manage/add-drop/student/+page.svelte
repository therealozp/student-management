<script>
	import EnrollStudent from '$lib/components/custom/forms/EnrollStudent.svelte';
	import Header from '$lib/components/custom/dashboard/Header.svelte';
	import { page } from '$app/stores';

	const userToken = $page.data?.session?.user;
</script>

<Header content="Add or Drop a Student" />
<EnrollStudent user={userToken} />
