<script>
	import Card from '../../ui/card/card.svelte';
	import Button from '../../ui/button/button.svelte';
	import Input from '../../ui/input/input.svelte';
	import Checkbox from '../../ui/checkbox/checkbox.svelte';
	import { goto } from '$app/navigation';
</script>

<Card class="flex h-[460px] w-1/3 flex-col items-center justify-center">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Welcome back.</h1>
	<div class="m-8 w-3/5">
		<p class="leading-7 [&:not(:first-child)]:mt-6">NetID</p>
		<Input />
	</div>
	<div class="mb-8 w-3/5">
		<p class="leading-7 [&:not(:first-child)]:mt-6">Password</p>
		<Input />
		<div class="mt-2 flex">
			<Checkbox class="mr-2" />
			<p>Remember me</p>
		</div>
	</div>
	<div>
		<Button
			on:click={() => {
				goto('/dashboard/advisor');
			}}>Log In</Button
		>
	</div>
</Card>
