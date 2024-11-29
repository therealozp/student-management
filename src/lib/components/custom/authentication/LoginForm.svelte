<script>
	import Card from '../../ui/card/card.svelte';
	import Button from '../../ui/button/button.svelte';
	import Input from '../../ui/input/input.svelte';
	import Checkbox from '../../ui/checkbox/checkbox.svelte';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { signIn } from '@auth/sveltekit/client';

	let email = '';
	let password = '';
	let error_message = '';

	async function login() {
		error_message = '';
		const email_data = email.includes('@') ? email : `${email}@zzz.edu`;
		const response = await signIn('credentials', {
			email: email_data,
			password,
			callbackUrl: '/dashboard'
		});
		console.log(response);
		if (response.ok) {
			const data = await response.json();
			console.log(data);
			toast.success('Login successful! Redirecting...');
			userToken.set(data.token);
			setInterval(() => {
				goto('/dashboard');
			}, 1000);
		} else {
			console.error('Login failed');
			// error_message = 'Login failed. Please try again.';
			toast.error('Login failed. Please try again.');
		}
	}
</script>

<Card class="flex h-[460px] flex-col items-center justify-center md:w-[720px]">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Welcome back.</h1>
	<form class="flex w-full flex-col items-center" on:submit|preventDefault={() => login()}>
		<div class="m-8 w-3/5">
			<p class="leading-7 [&:not(:first-child)]:mt-6">NetID</p>
			<Input bind:value={email} name="email" />
		</div>
		<div class="mb-8 w-3/5">
			<p class="leading-7 [&:not(:first-child)]:mt-6">Password</p>
			<Input type="password" bind:value={password} name="password" />
			<div class="mt-2 flex items-center">
				<Checkbox class="mr-2" />
				<p>Remember me</p>
				{#if error_message}
					<p class="ml-4 text-sm text-red-500">{error_message}</p>
				{/if}
			</div>
		</div>
		<div>
			<Button type="submit">Log In</Button>
		</div>
	</form>
</Card>
