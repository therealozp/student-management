import { initializeConnection } from '$lib/backend/initializeConnection';
import { json, error } from '@sveltejs/kit';

export const GET = async () => {
	const conn = await initializeConnection();

	try {
		const query = `
        SELECT DISTINCT major
        FROM students;
        `;

		const [result] = await conn.execute(query);

		return json(result);
	} catch (err) {
		console.error(err);
		return error(500, { message: 'Internal Server Error', error_code: 'SERVER_ERROR' });
	} finally {
		conn.end();
	}
};
