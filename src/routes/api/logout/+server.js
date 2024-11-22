import { json } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
	cookies.delete('user-token', { path: '/' });
	return json({ message: 'Logged out' });
};
