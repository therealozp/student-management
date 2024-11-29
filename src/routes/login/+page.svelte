<script>
	import LoginForm from '$lib/components/custom/authentication/LoginForm.svelte';
	import { page } from '$app/stores';

	console.log($page.data.session);
</script>

<div class="flex h-screen min-h-screen items-center justify-center">
	<LoginForm />
</div>
