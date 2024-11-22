import { persisted } from 'svelte-persisted-store';

export const userToken = persisted('user-token', {});
