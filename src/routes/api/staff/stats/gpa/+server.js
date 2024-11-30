import { initializeConnection } from '$lib/backend/initializeConnection';
import { json, error } from '@sveltejs/kit';

export const GET = async () => {
	const conn = await initializeConnection();

	try {
		const query = `
      SELECT major, 
             MAX(gpa) AS highest_gpa, 
             MIN(gpa) AS lowest_gpa, 
             AVG(gpa) AS average_gpa
      FROM students
      GROUP BY major;
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
