<script>
	import ManageStudents from '$lib/components/custom/manage/ManageStudents.svelte';
	const student = {
		name: 'Jane Doe',
		uid: 'U123456789',
		email: 'janedoe@zzz.com',
		currentlyEnrolledCourses: [98123, 98124, 98125]
	};
</script>

<ManageStudents />
