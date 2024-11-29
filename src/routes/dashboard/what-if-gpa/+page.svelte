<script>
	import WhatIfGPA from '$lib/components/custom/whatifGPA/WhatIfGPA.svelte';
	import { page } from '$app/stores';

	const userToken = $page.data?.session?.user;
</script>

<WhatIfGPA user={userToken} />
