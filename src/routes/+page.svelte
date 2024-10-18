<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
</script>

<div class="main-image flex h-screen w-screen flex-col items-center justify-center">
	<div class="fixed top-0 flex w-screen items-center justify-between p-4">
		<img src="short-logo-white.png" alt="Long logo" class="w-[5%]" />
		<div class="flex items-center space-x-8">
			<div>Home</div>
			<div>Features</div>
			<div>Plans</div>
			<div>Support</div>
		</div>
		<div><Button on:click={() => goto('/login')}>Login</Button></div>
	</div>
	<div class="flex flex-col items-center justify-center">
		<img src="long-logo-white.png" alt="Long logo" class="mb-8 w-[50%]" />
		<div class="flex items-center justify-center">
			<h2 class="text-2xl font-bold">a</h2>
			<img src="derivasians-white.png" alt="Logo" class="mx-6 mb-4 w-[20%]" />
			<h2 class="text-2xl font-bold">product</h2>
		</div>
		<p class="text-stone-300">Your one-stop shop for academic management</p>
	</div>
</div>
