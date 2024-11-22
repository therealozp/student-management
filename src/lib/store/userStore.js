import { persisted } from 'svelte-persisted-store';

export const sessionStore = persisted('session', {});
