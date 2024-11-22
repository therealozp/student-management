import { writable } from 'svelte/store';

export let userObject = writable({
	name: 'Jane Doe',
	email: 'janedoe@zzz.edu',
	role: 'student',
	dob: '01/01/2000',
	uNumber: 'U12930212',
	department: 'CSE',
	college: 'Engineering',
	major: 'Computer Science',
	years: 3,
	coursesTaken: [10101, 10202, 10303, 10404],
	coursesTaking: [20101, 20202, 20303],
	gpa: 4.0
});
