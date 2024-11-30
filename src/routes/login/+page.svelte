<script>
	import LoginForm from '$lib/components/custom/authentication/LoginForm.svelte';
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';

	if ($page.data.session) {
		redirect(302, '/dashboard');
	}
</script>

<div class="flex h-screen min-h-screen items-center justify-center">
	<LoginForm />
</div>
