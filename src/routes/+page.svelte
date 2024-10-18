<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<div class="fixed top-0 flex w-screen items-center justify-between p-4">
		<div class="logo">Derviasians</div>
		<div class="flex items-center space-x-8">
			<div>Home</div>
			<div>Features</div>
			<div>Plans</div>
			<div>Support</div>
		</div>
		<div><Button on:click={() => goto('/login')}>Login</Button></div>
	</div>
	<div class="flex flex-col items-center justify-center">
		<h1 class="text-5xl font-black">Df(x)</h1>
		<h2 class="text-2xl font-bold">a Derivasians product</h2>
		<p class="text-stone-300">Your one-stop shop for academic management</p>
	</div>
</div>
