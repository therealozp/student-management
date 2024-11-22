<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { goto } from '$app/navigation';
	import { sessionStore } from '$lib/store/userStore';

	export let content;
	function logout() {
		sessionStore.reset();
		goto('/');
	}
</script>

<div class="min-w-screen">
	<Button
		on:click={() => {
			logout();
		}}
		class="absolute right-[5%] top-0 mt-4">Logout</Button
	>
	<div class="ml-[5%] flex h-[200px] items-center">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
			{content ? content : 'Welcome, [Name]'}
		</h1>
	</div>
	<Separator class="ml-[5%] w-[90%] bg-white" />
</div>
