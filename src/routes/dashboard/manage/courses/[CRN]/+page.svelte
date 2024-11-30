<script>
	import Header from '$lib/components/custom/dashboard/Header.svelte';
	import UpdateCourse from '$lib/components/custom/forms/UpdateCourse.svelte';
	import { page } from '$app/stores';

	const { CRN } = $page.params;
	const userToken = $page.data?.session?.user;
</script>

<Header content="Update Course" />
<UpdateCourse crn={CRN} user={userToken} />
