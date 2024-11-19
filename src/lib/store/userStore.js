import { writable } from 'svelte/store';

export let userObject = writable({
	name: 'Jane Doe',
	email: 'janedoe@zzz.edu',
	role: 'advisor',
	uNumber: 'U12930212',
	department: 'Computer Science',
	college: 'Engineering',
	yearsInSystem: 3,
	coursesTaken: [],
	coursesTaking: [],
	gpa: 4.0
});
