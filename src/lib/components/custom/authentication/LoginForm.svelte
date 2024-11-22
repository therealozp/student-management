<script>
	import Card from '../../ui/card/card.svelte';
	import Button from '../../ui/button/button.svelte';
	import Input from '../../ui/input/input.svelte';
	import Checkbox from '../../ui/checkbox/checkbox.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { sessionStore } from '$lib/store/userStore';
	import { get } from 'svelte/store';

	let email = '';
	let password = '';
	let error_msg = '';

	async function login() {
		const res = await fetch('http://localhost:8080/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email, password })
		});

		if (res.ok) {
			const data = await res.json();
			console.log('Login successful', data);
			sessionStore.set(data);
			goto('/dashboard');
		} else {
			const error = await res.json();
			console.error('Login failed', error);
			error_msg = 'An error occurred. Please try again.';
		}
	}

	// Fetch user data from the cookie
	onMount(() => {
		const user_token = get(sessionStore);
		if (Object.keys(user_token).length !== 0) {
			// goto('/dashboard');
			console.log('User data found in user store.');
			console.log(user_token);
		} else {
			console.log('No user data in user store.');
		}
	});
</script>

<Card class="flex h-[460px] flex-col items-center justify-center md:w-[720px]">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Welcome back.</h1>
	<div class="m-8 w-3/5">
		<p class="leading-7 [&:not(:first-child)]:mt-6">Email</p>
		<Input bind:value={email} />
	</div>
	<div class="mb-8 w-3/5">
		<p class="leading-7 [&:not(:first-child)]:mt-6">Password</p>
		<Input type="password" bind:value={password} />
		<div class="mt-2 flex items-center">
			<Checkbox class="mr-2" />
			<p>Remember me</p>
			{#if error_msg}
				<p class="ml-4 text-sm text-red-700">{error_msg}</p>
			{/if}
		</div>
	</div>
	<div>
		<Button
			on:click={() => {
				login();
			}}>Log In</Button
		>
	</div>
</Card>
