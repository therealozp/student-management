<script>
	import { onMount } from 'svelte';

	let logs = [];
	let loading = true;
	let error = null;

	// Fetch logs when the component mounts
	onMount(async () => {
		try {
			const response = await fetch('/api/logs');

			// Check if response is ok
			if (!response.ok) {
				throw new Error('Failed to fetch logs');
			}

			// Parse the response data
			logs = await response.json();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<div class="loading">Loading logs...</div>
{:else if error}
	<div class="error">{error}</div>
{:else}
	<div class="logs">
		{#each logs as log}
			{log.timestamp} - {log.user_id} - {log.operation_type} - {log.entity_type} - {JSON.stringify(
				log.old_value
			)} ->
			{JSON.stringify(log.new_value)} <br />
		{/each}
	</div>
{/if}

<style>
	.logs {
		white-space: pre-wrap;
		word-wrap: break-word;
		font-family: monospace;
		padding: 1rem;
		border-radius: 5px;
		margin-top: 1rem;
	}

	.loading {
		text-align: center;
		font-size: 1.5rem;
		padding: 2rem;
	}

	.error {
		color: red;
		font-weight: bold;
		text-align: center;
		padding: 1rem;
	}
</style>
