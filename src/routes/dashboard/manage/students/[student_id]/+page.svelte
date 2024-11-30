<script>
	import Header from '$lib/components/custom/dashboard/Header.svelte';
	import StudentView from '$lib/components/custom/dashboard/StudentView.svelte';
	import { page } from '$app/stores';

	const student_id = $page.params.student_id;
</script>

<Header content="Student Information - Advisor's View" />
<StudentView user={{ user_id: student_id }} limitedPermissions />
