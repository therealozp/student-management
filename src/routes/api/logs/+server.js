import { initializeConnection } from '$lib/backend/initializeConnection';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const conn = await initializeConnection();

	// Query to fetch logs from your database (update with your actual log table)
	const [rows] = await conn.execute(`
    SELECT * FROM logs ORDER BY timestamp DESC LIMIT 100;
  `);

	conn.end();

	return json(rows, { status: 200 });
};
