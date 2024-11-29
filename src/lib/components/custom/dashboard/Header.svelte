<script>
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { signOut } from '@auth/sveltekit/client';
	export let content;

	function logout() {
		signOut({ callbackUrl: '/' });
	}
</script>

<div class="min-w-screen">
	<Button
		class="absolute right-[5%] top-4"
		on:click={() => {
			logout();
		}}>Logout</Button
	>
	<div class="ml-[5%] flex h-[200px] items-center">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
			{content ? content : 'Welcome, [Name]'}
		</h1>
	</div>
	<Separator class="ml-[5%] w-[90%] bg-white" />
</div>
