<script>
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';

	import { goto } from '$app/navigation';

	export let student_id;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item on:click={() => goto('/dashboard/manage/students/' + student_id)}>
			View Profile
		</DropdownMenu.Item>
		<DropdownMenu.Item
			on:click={() => goto('/dashboard/manage/students/' + student_id + '/what-if-gpa')}
			>Perform What-If analysis</DropdownMenu.Item
		>
	</DropdownMenu.Content>
</DropdownMenu.Root>
