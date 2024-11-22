import { initializeConnection } from '$lib/backend/initializeConnection';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	console.log('GET /api/student/+server.js');
	const conn = await initializeConnection();

	const [rows] = await conn.execute('SELECT * FROM users');

	conn.end();

	return json(rows);
};
