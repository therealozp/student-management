<script>
	import Header from '$lib/components/custom/dashboard/Header.svelte';
	import { page } from '$app/stores';
	import WhatIfGpa from '$lib/components/custom/whatifGPA/WhatIfGPA.svelte';

	const student_id = $page.params.student_id;
</script>

<Header content="What-if GPA - Advisor's View" />
<WhatIfGpa user={{ user_id: student_id }} />
