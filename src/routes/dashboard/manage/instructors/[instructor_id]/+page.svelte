<script>
	import FacultyView from '$lib/components/custom/dashboard/FacultyView.svelte';
	import Header from '$lib/components/custom/dashboard/Header.svelte';
	import { page } from '$app/stores';

	const instructor_id = $page.params.instructor_id;
</script>

<Header content="Instructor Schedule - Staff View" />
<FacultyView user={{ user_id: instructor_id }} />
