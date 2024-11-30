<script>
	import WhatIfGPA from '$lib/components/custom/whatifGPA/WhatIfGPA.svelte';
	import Header from '$lib/components/custom/dashboard/Header.svelte';
	import { page } from '$app/stores';

	const userToken = $page.data?.session?.user;
</script>

<Header content="What-If GPA" />
<WhatIfGPA user={userToken} />
